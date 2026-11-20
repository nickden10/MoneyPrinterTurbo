"""v3 voice assembly from ONE continuous take (araclar/el_tam.py).

usage: python3 ses_tam.py TAKE_MP3 TAKE_WORDS OUT_WAV(raw, 48 kHz mono) OUT_WORDS OUT_BEATS [MASTER_BEATS]
- without MASTER_BEATS (the Turkish master): the read is kept whole, natural breaths included; the file
  is only offset so speech starts at LEAD s. Word times = character alignment (+ that offset); the first
  word, pinned to 0.00 by the API, is clamped to the first sound.
- with MASTER_BEATS (a second language on the same picture): the take is cut in the breath between
  beats (midpoint of the gap), and each beat starts at the master beat's start, or GAP s after the
  previous beat if that one runs long. Inside a beat nothing is touched.
"""
import json, re, subprocess, sys
import numpy as np

MP3, WIN, OUT_WAV, OUT_WORDS, OUT_BEATS = sys.argv[1:6]
MASTER = {b["beat"]: b["speech_start"] for b in json.load(open(sys.argv[6]))} if len(sys.argv) > 6 else None
SR, LEAD, GAP, TAIL = 48000, 0.2, 0.2, 0.5

a = np.frombuffer(subprocess.run(["ffmpeg", "-v", "error", "-i", MP3, "-ac", "1", "-ar", str(SR), "-f", "f32le", "-"],
                                 capture_output=True, check=True).stdout, dtype=np.float32)
o = subprocess.run(["ffmpeg", "-i", MP3, "-af", "silencedetect=noise=-45dB:d=0.05", "-f", "null", "-"], capture_output=True, text=True).stderr
ss = [float(x) for x in re.findall(r"silence_start: (-?[\d.]+)", o)]
se = [float(x) for x in re.findall(r"silence_end: ([\d.]+)", o)]
onset = se[0] if ss and ss[0] <= 0.01 and se else 0.0
W = json.load(open(WIN))
W[0]["start"] = max(W[0]["start"], onset)

beats = []
for w in W:
    if not beats or beats[-1]["beat"] != w["beat"]:
        beats.append({"beat": w["beat"], "words": []})
    beats[-1]["words"].append(w)
# cut points in file time: midpoint of the breath between beats
cuts = [0.0] + [(p["words"][-1]["end"] + n["words"][0]["start"]) / 2 for p, n in zip(beats, beats[1:])] + [len(a) / SR]

out = np.zeros(int(90 * SR), dtype=np.float32)
words, rows, prev_end = [], [], None
for k, b in enumerate(beats):
    f0, f1 = cuts[k], cuts[k + 1]
    s0 = b["words"][0]["start"]
    if MASTER is None:
        shift = LEAD - onset                      # whole read, one offset
    else:
        want = MASTER[b["beat"]] if k else LEAD
        if prev_end is not None:
            want = max(want, prev_end + GAP)
        shift = want - s0
    seg = a[int(f0 * SR): int(f1 * SR)].copy()
    fade = int(0.01 * SR)
    if MASTER is not None and len(seg) > 2 * fade:   # cut in a breath: tiny fades so no click
        seg[:fade] *= np.linspace(0, 1, fade); seg[-fade:] *= np.linspace(1, 0, fade)
    pos = int(round((f0 + shift) * SR))
    if pos < 0:
        seg, pos = seg[-pos:], 0
    out[pos:pos + len(seg)] += seg
    for w in b["words"]:
        words.append({"beat": b["beat"], "text": w["text"], "start": round(w["start"] + shift, 3), "end": round(w["end"] + shift, 3)})
    prev_end = b["words"][-1]["end"] + shift
    rows.append({"beat": b["beat"], "speech_start": round(s0 + shift, 3), "speech_end": round(prev_end, 3),
                 "speech_dur": round(prev_end - (s0 + shift), 3)})
end = max(r["speech_end"] for r in rows)
out = out[:int((end + TAIL) * SR)]
for i, w in enumerate(words):
    w["id"] = f"w{i}"
subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "f32le", "-ar", str(SR), "-ac", "1", "-i", "-", "-c:a", "pcm_s16le", OUT_WAV],
               input=np.clip(out, -1, 1).astype("<f4").tobytes(), check=True)
json.dump(words, open(OUT_WORDS, "w"), ensure_ascii=False, indent=1)
json.dump(rows, open(OUT_BEATS, "w"), ensure_ascii=False, indent=1)
print(json.dumps([(r["beat"], r["speech_start"], r["speech_end"]) for r in rows]), "speech end", end)
