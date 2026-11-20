"""Assemble per-beat TTS clips (edge-tts or ElevenLabs, same {text,start,end} json) into one 48 kHz voice track with planned gaps; emit words.json."""
import json, re, subprocess, sys
import numpy as np

SRC, OUT_WAV, OUT_WORDS, OUT_BEATS = sys.argv[1:5]
SR = 48000
BEATS = ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9a", "B9b"]
GAPS = [0.30, 0.30, 0.20, 0.30, 0.25, 0.20, 0.30, 0.35, 0.30]
START = 0.20
TOTAL = 60.0  # work buffer; the file is cut to speech end + TAIL
TAIL = 0.5
PRE, POST = 0.03, 0.12
ALIGN = sys.argv[5] if len(sys.argv) > 5 else "boundary"  # "char" for ElevenLabs alignment
# optional 6th arg: a master beats.json (e.g. the Turkish take). Each beat then starts at the master's
# speech_start (a second language rides the same picture), or MIN_GAP after the previous beat if that runs long.
MASTER = {b["beat"]: b["speech_start"] for b in json.load(open(sys.argv[6]))} if len(sys.argv) > 6 else None
MIN_GAP = 0.15  # keep a little breath/tail around the detected speech


def decode(path):
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", path, "-ac", "1", "-ar", str(SR), "-f", "f32le", "-"],
                         capture_output=True, check=True).stdout
    return np.frombuffer(raw, dtype=np.float32)


def extents(path):
    """first and last sound (s): leading silence only if it starts at 0, trailing only if it runs to the end"""
    o = subprocess.run(["ffmpeg", "-i", path, "-af", "silencedetect=noise=-45dB:d=0.08", "-f", "null", "-"],
                       capture_output=True, text=True).stderr
    dur = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", path],
                               capture_output=True, text=True).stdout)
    ss = [float(x) for x in re.findall(r"silence_start: (-?[\d.]+)", o)]
    se = [float(x) for x in re.findall(r"silence_end: ([\d.]+)", o)]
    on = se[0] if ss and ss[0] <= 0.01 and se else 0.0
    off = ss[-1] if ss and (len(se) < len(ss) or se[-1] >= dur - 0.02) else dur
    return on, off


out = np.zeros(int(TOTAL * SR), dtype=np.float32)
words, beats = [], []
t = START
for i, b in enumerate(BEATS):
    if MASTER:
        t = max(MASTER[b], t if i == 0 else prev_end + MIN_GAP)
    a = decode(f"{SRC}/{b}.mp3")
    on, off = extents(f"{SRC}/{b}.mp3")
    wb = json.load(open(f"{SRC}/{b}.json"))
    # edge-tts: boundary clock lags the decoded mp3 by its priming, measured on the first word.
    # ElevenLabs (ALIGN=char): character alignment is already on the audio clock (checked against
    # inner silences, about +20 ms); only the first word, pinned to 0.00, is clamped to the first sound.
    delta = 0.0 if ALIGN == "char" else on - wb[0]["start"]
    if ALIGN == "char":
        wb[0]["start"] = max(wb[0]["start"], on)
    lo = int((on - PRE) * SR)
    seg = a[max(lo, 0): int((off + POST) * SR)].copy()
    if lo < 0:  # speech starts at file time 0 (ElevenLabs): pad the breath in front with silence
        seg = np.concatenate([np.zeros(-lo, dtype=np.float32), seg])
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
    prev_end = t
    if i < len(GAPS):
        t += GAPS[i]

out = out[:int((t + TAIL) * SR)]
for i, w in enumerate(words):
    w["id"] = f"w{i}"
pcm = (np.clip(out, -1, 1) * 32767).astype("<i2").tobytes()
subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "s16le", "-ar", str(SR), "-ac", "1", "-i", "-", OUT_WAV],
               input=pcm, check=True)
json.dump(words, open(OUT_WORDS, "w"), ensure_ascii=False, indent=1)
json.dump(beats, open(OUT_BEATS, "w"), ensure_ascii=False, indent=1)
print(json.dumps(beats, ensure_ascii=False))
print("speech end", round(beats[-1]["speech_end"], 3))
