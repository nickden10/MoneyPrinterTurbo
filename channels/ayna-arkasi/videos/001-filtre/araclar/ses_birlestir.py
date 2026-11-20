"""Assemble per-beat edge-tts clips into one 48 kHz voice track with planned gaps; emit words.json."""
import json, re, subprocess, sys
import numpy as np

SRC, OUT_WAV, OUT_WORDS, OUT_BEATS = sys.argv[1:5]
SR = 48000
BEATS = ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9a", "B9b"]
GAPS = [0.30, 0.30, 0.20, 0.30, 0.25, 0.20, 0.30, 0.35, 0.30]
START = 0.20
TOTAL = 37.5
PRE, POST = 0.03, 0.12  # keep a little breath/tail around the detected speech


def decode(path):
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", path, "-ac", "1", "-ar", str(SR), "-f", "f32le", "-"],
                         capture_output=True, check=True).stdout
    return np.frombuffer(raw, dtype=np.float32)


def extents(path):
    o = subprocess.run(["ffmpeg", "-i", path, "-af", "silencedetect=noise=-45dB:d=0.08", "-f", "null", "-"],
                       capture_output=True, text=True).stderr
    ends = [float(x) for x in re.findall(r"silence_end: ([\d.]+)", o)]
    starts = [float(x) for x in re.findall(r"silence_start: ([\d.]+)", o)]
    return ends[0], starts[-1]


out = np.zeros(int(TOTAL * SR), dtype=np.float32)
words, beats = [], []
t = START
for i, b in enumerate(BEATS):
    a = decode(f"{SRC}/{b}.mp3")
    on, off = extents(f"{SRC}/{b}.mp3")
    wb = json.load(open(f"{SRC}/{b}.json"))
    delta = on - wb[0]["start"]  # mp3 priming offset between boundary clock and decoded audio
    seg = a[int((on - PRE) * SR): int((off + POST) * SR)].copy()
    n = len(seg)
    fade = int(0.01 * SR)
    seg[:fade] *= np.linspace(0, 1, fade)
    seg[-int(0.06 * SR):] *= np.linspace(1, 0, int(0.06 * SR))
    pos = int((t - PRE) * SR)
    out[pos:pos + n] += seg
    shift = t - on  # file time -> timeline time
    for w in wb:
        words.append({"beat": b, "text": w["text"],
                      "start": round(w["start"] + delta + shift, 3),
                      "end": round(w["end"] + delta + shift, 3)})
    beats.append({"beat": b, "speech_start": round(t, 3), "speech_end": round(t + off - on, 3),
                  "speech_dur": round(off - on, 3)})
    t += (off - on)
    if i < len(GAPS):
        t += GAPS[i]

for i, w in enumerate(words):
    w["id"] = f"w{i}"
pcm = (np.clip(out, -1, 1) * 32767).astype("<i2").tobytes()
subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "s16le", "-ar", str(SR), "-ac", "1", "-i", "-", OUT_WAV],
               input=pcm, check=True)
json.dump(words, open(OUT_WORDS, "w"), ensure_ascii=False, indent=1)
json.dump(beats, open(OUT_BEATS, "w"), ensure_ascii=False, indent=1)
print(json.dumps(beats, ensure_ascii=False))
print("speech end", round(beats[-1]["speech_end"], 3))
