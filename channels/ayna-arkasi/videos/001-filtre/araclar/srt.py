"""Ayna Arkası 001: subtitle files from the word timings, one cue per caption group (+ B9b, which has no
burned caption because the closing headline is the line).  usage: python3 araclar/srt.py OUT_DIR"""
import os
import sys

OUT = os.path.abspath(sys.argv[1])
HERE = os.path.dirname(os.path.abspath(__file__))
B9B = {"tr": [("Gerçek ciltte doku", (83, 85)), ("vardır, olmalı da.", (86, 88))],
       "en": [("Real skin has texture.", (100, 103)), ("It should.", (104, 105))]}


def ts(t):
    ms = int(round(t * 1000))
    return f"{ms // 3600000:02d}:{ms // 60000 % 60:02d}:{ms // 1000 % 60:02d},{ms % 1000:03d}"


for lang in ("tr", "en"):
    sys.argv = ["build.py", "--lang", lang]
    g = {"__file__": os.path.join(HERE, "build.py"), "__name__": "srt"}
    exec(open(os.path.join(HERE, "build.py")).read(), g)
    W = g["W"]
    groups = g["GROUPS"] if lang == "tr" else g["groups_en"]()
    cues = [(" ".join(t for t, _ in grp), W[grp[0][1][0]]["start"], W[grp[-1][1][-1]]["end"]) for grp in groups]
    if lang == "en":   # B9b word ids are positions in words-en.json
        assert W[100]["text"] == "Real" and W[105]["text"] == "should"
    cues += [(txt, W[a]["start"], W[b]["end"]) for txt, (a, b) in B9B[lang]]
    out = []
    for i, (txt, a, b) in enumerate(cues):
        nxt = cues[i + 1][1] - 0.05 if i + 1 < len(cues) else b + 1.0
        end = min(b + 0.4, nxt - 0.02)
        out.append(f"{i + 1}\n{ts(a - 0.05)} --> {ts(end)}\n{txt}\n")
    open(os.path.join(OUT, f"001-{lang}.srt"), "w").write("\n".join(out))
    print(lang, len(cues), "cues")
