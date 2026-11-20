"""Per-beat ElevenLabs TTS (client's cloned voice "deno tr") with character alignment.

Writes <OUT>/<beat>.mp3 + <beat>.json ({text,start,end} words, seconds, from character alignment)
+ <beat>.align.json (raw alignment). Auth is added by the network proxy: no key header here.
usage: python3 el_parcalar.py OUT [B1,B4,...] [--mp "MediaPipe"] [--lang en]
"""
import base64, json, os, subprocess, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

VOICE = "oZLkvX3OQ4An5lUhNiUt"   # "deno tr", cloned, Turkish (client's own voice)
MODEL = os.environ.get("EL_MODEL", "eleven_multilingual_v2")
SETTINGS = {"stability": 0.5, "similarity_boost": 0.8, "style": 0.2, "use_speaker_boost": True,
            "speed": float(os.environ.get("EL_SPEED", "1.0"))}
SEED = 1001
MP = "Midiya Payp"
args = [a for a in sys.argv[1:]]
if "--mp" in args:
    i = args.index("--mp"); MP = args[i + 1]; del args[i:i + 2]
LANG = "tr"
if "--lang" in args:
    i = args.index("--lang"); LANG = args[i + 1]; del args[i:i + 2]
OUT = args[0]
only = args[1].split(",") if len(args) > 1 else None
from metin import BEATS_TR, BEATS_EN
BEATS = [(b, t.replace("Midiya Payp", MP)) for b, t in BEATS_TR]
if LANG == "en":
    BEATS = BEATS_EN
# EN B5 is the longest English beat: read at 1.1 so it ends inside the Turkish B5 window (take 1 at 1.0: ses/el-en/_take1)
SPEED_EN = {"B5": 1.1}
PUNCT = set(".,:;!?")


def words_from_alignment(al):
    ch, st, en = al["characters"], al["character_start_times_seconds"], al["character_end_times_seconds"]
    out, cur = [], None
    for c, s, e in zip(ch, st, en):
        if c.isspace():
            if cur: out.append(cur); cur = None
            continue
        if c in PUNCT:          # punctuation closes the word but its time is pause, not speech
            if cur: out.append(cur); cur = None
            continue
        if cur is None:
            cur = {"text": c, "start": s, "end": e}
        else:
            cur["text"] += c; cur["end"] = e
    if cur: out.append(cur)
    return out


os.makedirs(OUT, exist_ok=True)
log = []
for k, (bid, text) in enumerate(BEATS):
    if only and bid not in only:
        continue
    vs = dict(SETTINGS)
    if LANG == "en" and bid in SPEED_EN and "EL_SPEED" not in os.environ:
        vs["speed"] = SPEED_EN[bid]
    body = {"text": text, "model_id": MODEL, "voice_settings": vs, "seed": SEED}
    if k > 0: body["previous_text"] = BEATS[k - 1][1]
    if k + 1 < len(BEATS): body["next_text"] = BEATS[k + 1][1]
    if MODEL != "eleven_multilingual_v2": body["language_code"] = "tr"
    req = f"{OUT}/{bid}.req.json"
    json.dump(body, open(req, "w"), ensure_ascii=False)
    r = subprocess.run(["curl", "-s", "-o", f"{OUT}/{bid}.resp.json", "-w", "%{http_code}", "-X", "POST",
                        f"https://api.elevenlabs.io/v1/text-to-speech/{VOICE}/with-timestamps?output_format=mp3_44100_128",
                        "-H", "Content-Type: application/json", "--data-binary", f"@{req}"],
                       capture_output=True, text=True)
    code = r.stdout.strip()
    if code != "200":
        print(bid, "HTTP", code, open(f"{OUT}/{bid}.resp.json").read()[:500]); sys.exit(2)
    j = json.load(open(f"{OUT}/{bid}.resp.json"))
    open(f"{OUT}/{bid}.mp3", "wb").write(base64.b64decode(j["audio_base64"]))
    al = j.get("alignment") or j["normalized_alignment"]
    json.dump(al, open(f"{OUT}/{bid}.align.json", "w"), ensure_ascii=False)
    ws = words_from_alignment(al)
    json.dump(ws, open(f"{OUT}/{bid}.json", "w"), ensure_ascii=False, indent=1)
    os.remove(f"{OUT}/{bid}.resp.json")
    print(bid, len(ws), " ".join(f"{w['text']}[{w['start']:.2f}-{w['end']:.2f}]" for w in ws))
