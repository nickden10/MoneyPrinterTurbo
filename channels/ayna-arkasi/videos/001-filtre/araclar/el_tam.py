"""v3 voice: the WHOLE narration in ONE ElevenLabs request per language (natural prosody across beats),
then words + beat boundaries from the character alignment.

usage: python3 el_tam.py LANG OUT_DIR TAKE_NAME   (env: EL_MODEL, EL_STAB, EL_SIM, EL_STYLE, EL_SPEED)
writes OUT_DIR/TAKE.mp3, TAKE.align.json, TAKE.words.json ({beat,text,start,end} in file seconds), TAKE.req.json
Auth is added by the network proxy: no key header here.
"""
import base64, json, os, subprocess, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from metin import BEATS_TR, BEATS_EN  # noqa: E402

VOICE = "oZLkvX3OQ4An5lUhNiUt"   # "deno tr", the client's own clone
LANG, OUT, TAKE = sys.argv[1:4]
MODEL = os.environ.get("EL_MODEL", "eleven_multilingual_v2")
SETTINGS = {"stability": float(os.environ.get("EL_STAB", "0.38")), "similarity_boost": float(os.environ.get("EL_SIM", "0.85")),
            "style": float(os.environ.get("EL_STYLE", "0.35")), "use_speaker_boost": True,
            "speed": float(os.environ.get("EL_SPEED", "1.0"))}
# MediaPipe is written normally now (client revision); the phonetic spelling sounded robotic
BEATS = [(b, t.replace("Midiya Payp", "MediaPipe")) for b, t in (BEATS_TR if LANG == "tr" else BEATS_EN)]
# EL_JOIN: what goes between beats, e.g. ' <break time="0.35s" /> ' (v2 break tag: a breath between
# sentences without restarting the read). Default: a plain space.
JOIN = os.environ.get("EL_JOIN", " ")
TEXT = JOIN.join(t for _, t in BEATS)
PUNCT = set(".,:;!?…")

os.makedirs(OUT, exist_ok=True)
body = {"text": TEXT, "model_id": MODEL, "voice_settings": SETTINGS, "seed": 1001}
if MODEL != "eleven_multilingual_v2":
    body["language_code"] = LANG
req = f"{OUT}/{TAKE}.req.json"
json.dump(body, open(req, "w"), ensure_ascii=False)
r = subprocess.run(["curl", "-s", "-o", f"{OUT}/{TAKE}.resp.json", "-w", "%{http_code}", "-X", "POST",
                    f"https://api.elevenlabs.io/v1/text-to-speech/{VOICE}/with-timestamps?output_format=mp3_44100_128",
                    "-H", "Content-Type: application/json", "--data-binary", f"@{req}"], capture_output=True, text=True)
if r.stdout.strip() != "200":
    print("HTTP", r.stdout.strip(), open(f"{OUT}/{TAKE}.resp.json").read()[:600]); sys.exit(2)
j = json.load(open(f"{OUT}/{TAKE}.resp.json"))
open(f"{OUT}/{TAKE}.mp3", "wb").write(base64.b64decode(j["audio_base64"]))
al = j.get("alignment") or j["normalized_alignment"]
json.dump(al, open(f"{OUT}/{TAKE}.align.json", "w"), ensure_ascii=False)
os.remove(f"{OUT}/{TAKE}.resp.json")

ch, st, en = al["characters"], al["character_start_times_seconds"], al["character_end_times_seconds"]
# words from characters; anything inside <...> (break tags) is skipped; beats by expected word counts
words, cur, tag = [], None, False
for i, (c, s_, e) in enumerate(zip(ch, st, en)):
    if c == "<": tag = True
    if tag:
        if c == ">": tag = False
        if cur: words.append(cur); cur = None
        continue
    if c.isspace() or c in PUNCT:
        if cur: words.append(cur); cur = None
        continue
    if cur is None:
        cur = {"text": c, "start": s_, "end": e, "c0": i}
    else:
        cur["text"] += c; cur["end"] = e
if cur: words.append(cur)
exp = [(b, tok.strip(".,:;!?…")) for b, t in BEATS for tok in t.split()]
assert [x for _, x in exp] == [w_["text"] for w_ in words], "alignment words differ from the script"
for w_, (b, _) in zip(words, exp):
    w_["beat"] = b
# keep the 89-word Turkish schema: MediaPipe is split at its "P" (character time), like "Midiya Payp" was
if LANG == "tr":
    out = []
    for w_ in words:
        if w_["text"] == "MediaPipe":
            k = w_["c0"] + 5
            out.append({**w_, "text": "Media", "end": en[k - 1]})
            out.append({**w_, "text": "Pipe", "start": st[k], "c0": k})
        else:
            out.append(w_)
    words = out
for w_ in words:
    w_.pop("c0", None)
json.dump(words, open(f"{OUT}/{TAKE}.words.json", "w"), ensure_ascii=False, indent=1)
dur = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", f"{OUT}/{TAKE}.mp3"],
                           capture_output=True, text=True).stdout)
# pacing report: gaps inside beats, between beats, rate
gaps_in, gaps_b = [], []
for a, b in zip(words, words[1:]):
    g = b["start"] - a["end"]
    (gaps_in if a["beat"] == b["beat"] else gaps_b).append((round(g, 3), a["text"], b["text"]))
print(json.dumps({"take": TAKE, "model": MODEL, "settings": SETTINGS, "file_s": round(dur, 2), "words": len(words),
                  "speech_s": round(words[-1]["end"] - words[0]["start"], 2),
                  "wpm": round(len(words) / (words[-1]["end"] - words[0]["start"]) * 60, 1),
                  "max_gap_in_beat": max(gaps_in), "gaps_in_over_0.35": [g for g in gaps_in if g[0] > 0.35],
                  "beat_gaps": [g[0] for g in gaps_b],
                  "shortest_words": sorted(((round(w_["end"] - w_["start"], 3), w_["text"]) for w_ in words if len(w_["text"]) >= 4))[:5]},
                 ensure_ascii=False, indent=1))
