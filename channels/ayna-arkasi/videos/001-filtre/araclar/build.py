#!/usr/bin/env python3
"""Ayna Arkası 001 (v2): writes proje/index.html, proje/compositions/*.html from the real voice clock.

Ses saattir: every cut and reveal below is tied to a word of proje/assets/words.json.
Re-run after a new voice take:  python3 araclar/build.py [--lang tr|en]   (default tr; one language at a time)
Hand edits made in Studio to the generated files are overwritten by a re-run.

v2 layout (client feedback "too empty, slide-like"): full-bleed hero on the whole 1080x1920 frame,
kinetic Fraunces headlines and hero numbers in the top band (y 180-640), captions as an overlay
pill (v4: y 1500-1600, below the chin, never over eyes/nose/mouth), one continuous camera: push into the cheek dot (S1->S2, S3->S4), same-ground
title cuts riding LEFT (S4->S5->S6), pull back into the phone (S6->S7), inverse zoom on the payoff.
v1 generator: araclar/_v1/build-v1.py.
"""
import json
import math
import os
import re
import sys
import wave
from pathlib import Path

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from metin import BEATS_TR, BEATS_EN  # noqa: E402

LANG = sys.argv[sys.argv.index("--lang") + 1] if "--lang" in sys.argv else "tr"
assert LANG in ("tr", "en"), "--lang tr|en"
ROOT = Path(__file__).resolve().parent.parent / "proje"
# The picture runs on ONE clock, the Turkish take (WM): scene cuts and the video length never change
# with the language. In-scene reveals and captions follow the words of the language being built (W);
# the English beats were placed on the Turkish beat starts (ses_birlestir.py, 6th argument).
WM = json.load(open(ROOT / "assets/words.json"))
W = WM if LANG == "tr" else json.load(open(ROOT / "assets/words-en.json"))
VOICE_FILE = "voice.wav" if LANG == "tr" else "voice-en.wav"
assert len(WM) == 89, "words.json must hold the 89 tts words of SENARYO §2"
FPS = 30
TOTAL = math.ceil((WM[88]["end"] + 1.9) * FPS) / FPS          # last line holds >= 2 s, end card under it
assert W[-1]["end"] < TOTAL - 1.0, "the second-language voice must end inside the picture"
with wave.open(str(ROOT / "assets" / VOICE_FILE)) as wf_:
    VOICE_LEN = wf_.getnframes() / wf_.getframerate()

# ---- anchors: the word each reveal is tied to, per language (TR index | EN (beat, word))
ANCH = {
    "scan0": (6, ("B1", "thirty-three")), "scan1": (8, ("B1", "milliseconds")),
    "b2": (12, ("B2", "Thirty")), "cells": (13, ("B2", "frames")), "calc": (18, ("B2", "thirty-three")),
    "s2k": (22, ("B3", "Look")), "s2px": (24, ("B3", "pixels")),
    "src3": (30, ("B4", "MediaPipe")), "land": (38, ("B4", "points")),
    "bil": (41, ("B5", "bilateral")), "sweep0": (42, ("B5", "like")), "doku4": (49, ("B5", "texture")),
    "sweep1": (52, ("B5", "freckles")),
    "pts5": (56, ("B6", "points")), "grid5": (58, ("B6", "image")), "eye5": (61, ("B6", "grow")), "jaw5": (63, ("B6", "narrows")),
    "isik": (66, ("B7", "light")), "gol": (68, ("B7", "shadows")),
    "sny": (71, ("B8", "this")), "kez": (72, ("B8", "thirty")),
    "hes": (80, ("B9a", "calculated")), "ger": (83, ("B9b", "Real")), "doku8": (85, ("B9b", "texture")),
    "last": (88, None),
}


def K(name, end=False):
    tr, en = ANCH[name]
    if LANG == "tr":
        x = W[tr]
    elif en is None:
        x = W[-1]
    else:
        x = next(v for v in W if v["beat"] == en[0] and v["text"].lower() == en[1].lower())
    return x["end"] if end else x["start"]


# ---- every on-screen string, per language (brand wordmark stays "Ayna Arkası")
T = {
    "tr": dict(title="Ayna Arkası 001 · Bir selfie'nin 33 milisaniyesi",
               k1="Bir kare için", k2="Saniyede", u2="kare", calc="Hesap, ölçüm değil",
               s2k="Yakından bak:", s2t="pikseller.",
               unit="nokta", sub="{F} yüz + {I} iris noktası", src3="Kaynak: Google MediaPipe Face Landmarker",
               t4="Yumuşatma", t4b="bilateral filtre", labL="← doku silindi", labR="doku duruyor →", src4="Kaynak: Tomasi & Manduchi 1998",
               t5="Esnetme", t5b="(warp)", src5="Kaynak: Schaefer vd. 2006 · US 10152778",
               t6="Işık", t6b="eklenir", src6="Kaynak: US 10152778",
               k7="Saniyede", u7="kez",
               kA="Filtredeki yüz,", tA="hesaplanmış", tB1="Gerçek ciltte", tB2="doku", tB3="vardır, olmalı da.",
               chip="Filtresiz", more="Kaynaklar açıklamada", slogan=""),
    "en": dict(title="Ayna Arkası 001 · 33 milliseconds of a selfie",
               k1="Per frame:", k2="Per second", u2="frames", calc="Arithmetic, not a measurement",
               s2k="Look closer:", s2t="pixels.",
               unit="points", sub="{F} face + {I} iris points", src3="Source: Google MediaPipe Face Landmarker",
               t4="Smoothing", t4b="bilateral filter", labL="← texture wiped", labR="texture kept →", src4="Source: Tomasi & Manduchi 1998",
               t5="Warping", t5b="(points shift)", src5="Source: Schaefer et al. 2006 · US 10152778",
               t6="Light", t6b="is added", src6="Source: US 10152778",
               k7="Per second", u7="times",
               kA="The face in the filter:", tA="calculated", tB1="Real skin has", tB2="texture.", tB3="It should.",
               chip="No filter", more="Sources in the description", slogan="Look behind the mirror."),
}[LANG]


def h(s):
    return s.replace("&", "&amp;")


def w(i):
    """master (Turkish) clock: scene boundaries only"""
    return WM[i]


def r2(x):
    return round(x, 3)


# ---------------------------------------------------------------- scene clock (absolute seconds)
S = {}
S["s1"] = 0.0
S["s2"] = r2(w(22)["start"] - 0.06)          # dive lands just before "Yakından"
S["s3"] = r2(w(25)["start"] - 0.06)          # "Önce bir yüz modeli": points start stamping
S["s4"] = r2(w(40)["start"] - 0.03)          # cut on "Sonra"
S["s5"] = r2(w(54)["end"] + 0.02)            # after "tüyler"
S["s6"] = r2(w(64)["start"] - 0.06)          # "En son ışık"
S["s7"] = r2(w(70)["start"] - 0.14)          # "Bunu saniyede"
S["s8"] = r2(w(78)["start"] - 0.10)          # "Filtredeki yüz"
ORDER = ["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8"]
DUR = {k: r2((S[ORDER[i + 1]] if i + 1 < len(ORDER) else TOTAL) - S[k]) for i, k in enumerate(ORDER)}


def loc(scene, t):
    return r2(t - S[scene])


FONTS = """
      @font-face { font-family: "Fraunces"; font-style: normal; font-weight: 100 900; font-display: block;
        src: url("assets/fonts/fraunces-latin-full-normal.woff2") format("woff2");
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD; }
      @font-face { font-family: "Fraunces"; font-style: normal; font-weight: 100 900; font-display: block;
        src: url("assets/fonts/fraunces-latin-ext-full-normal.woff2") format("woff2");
        unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF; }
      @font-face { font-family: "Be Vietnam Pro"; font-weight: 500; font-display: block; src: url("assets/fonts/BeVietnamPro-Medium.ttf") format("truetype"); }
      @font-face { font-family: "Be Vietnam Pro"; font-weight: 700; font-display: block; src: url("assets/fonts/BeVietnamPro-Bold.ttf") format("truetype"); }"""

# text block: left 60, inside the 60-940 column (right rail free), top band 180-640
BASE_CSS = """
      #root { position: absolute; inset: 0; overflow: hidden; background: __BG__;
        --toz-pembe: #F2D3D1; --keten: #F8F4EC; --adacayi: #BCC5B0; --murekkep: #2C3A31; --koyu-adacayi: #4D6A55; }
      #root .tx { position: absolute; left: 60px; width: 880px; margin: 0; z-index: 6; color: __INK__; }
      #root .tx .w { display: inline-block; }
      #root .fr { font-family: "Fraunces", Georgia, serif; font-weight: 600; font-variation-settings: "SOFT" 100, "WONK" 0, "opsz" 144; }
      #root .kick { font-size: 88px; line-height: 1.04; letter-spacing: -0.01em; }
      #root .hero { line-height: 0.86; letter-spacing: -0.03em; white-space: nowrap; }
      #root .hero .n { font-size: 330px; font-variant-numeric: lining-nums; }
      #root .hero .u { font-size: 140px; margin-left: 18px; letter-spacing: -0.01em; }
      #root .big { font-size: 150px; line-height: 0.95; letter-spacing: -0.02em; white-space: nowrap; }
      #root .sub { font-size: 72px; line-height: 1.05; }
      #root .note { font: 500 34px/1.3 "Be Vietnam Pro", sans-serif; }
      #root .src { font: 500 32px/1.3 "Be Vietnam Pro", sans-serif; }
      #root .acc { color: __ACC__; }"""


def scene(sid, bg, ink, acc, css, body, script, variables=None):
    var_attr = ""
    if variables:
        var_attr = " data-composition-variables='" + json.dumps(variables, ensure_ascii=False).replace("'", "&#39;") + "'"
    base = BASE_CSS.replace("__BG__", bg).replace("__INK__", ink).replace("__ACC__", acc)
    return f"""<template id="{sid}-template">
  <div id="root" data-composition-id="{sid}" data-width="1080" data-height="1920"{var_attr}>
    <style>{FONTS}{base}{css}
    </style>
{body}
    <script>
      (function () {{
        const A = window.AYNA, C = A.C;
        const tl = gsap.timeline({{ paused: true }});
        const Q = (s) => Array.from(document.querySelectorAll(s));
        const wipe = (sel, t, d) => tl.fromTo(sel, {{ clipPath: "inset(0% 100% 0% 0%)" }}, {{ clipPath: "inset(0% 0% 0% 0%)", duration: d || 0.333, ease: "power2.out", stagger: 0.1, immediateRender: t <= 0 }}, t);
        const hide = (sel) => tl.set(sel, {{ opacity: 0 }}, 0);
        // waterfall entry (cut-the-curve §6): from below, binary opacity, power4.out, gaps shrink x0.84
        const wf = (sel, t, dy) => {{ let at = t, gap = 0.07; Q(sel).forEach((el, i) => {{ hide(el);
          const heavy = el.classList.contains("n") || el.closest(".big") || el.closest(".hero");
          tl.set(el, {{ opacity: 1 }}, at);
          tl.fromTo(el, {{ y: heavy ? (dy || 80) : 46 }}, {{ y: 0, duration: heavy ? 0.2 : 0.15, ease: "power4.out", immediateRender: false }}, at);
          at += gap; gap *= 0.84; }}); }};
        // zoom-through (+1 push) / inverse zoom-through (-1 pull) between two text groups (cut-the-curve §1/§2)
        const zt = (out, inn, t, sg) => {{ const e1 = sg > 0 ? 1.2 : 0.8, s0 = sg > 0 ? 0.75 : 1.25;
          hide(inn);
          tl.to(out, {{ scale: e1, filter: "blur(10px)", duration: 0.2, ease: "power3.in" }}, t - 0.2);
          tl.to(out, {{ opacity: 0.15, duration: 0.2, ease: "none" }}, t - 0.2);
          tl.set(out, {{ opacity: 0 }}, t);
          tl.fromTo(inn, {{ scale: s0, filter: "blur(10px)" }}, {{ scale: 1, filter: "blur(0px)", duration: 0.5, ease: "expo.out", immediateRender: false }}, t);
          tl.fromTo(inn, {{ opacity: 0.15 }}, {{ opacity: 1, duration: 0.5, ease: "expo.out", immediateRender: false }}, t); }};
        // cut-the-curve LEFT, word by word (§4): exit power4.in -230 px, entry +230 -> 0 power4.out from 0.35
        const cOut = (sel, t) => {{ const els = Q(sel), n = els.length; els.forEach((el, i) => {{ const a = t - 0.34 - (n - 1 - i) * 0.022;
          tl.to(el, {{ x: -230, duration: 0.34, ease: "power4.in" }}, a);
          tl.to(el, {{ opacity: 0, duration: 0.18, ease: "none" }}, a + 0.14); }}); }};
        const cIn = (sel, t) => {{ let at = t, gap = 0.05; Q(sel).forEach((el) => {{ hide(el);
          tl.fromTo(el, {{ x: 230 }}, {{ x: 0, duration: 0.3, ease: "power4.out", immediateRender: false }}, at);
          tl.fromTo(el, {{ opacity: 0.35 }}, {{ opacity: 1, duration: 0.12, ease: "none", immediateRender: false }}, at);
          at += gap; gap *= 0.84; }}); }};
{script}
        window.__timelines["{sid}"] = tl;
      }})();
    </script>
  </div>
</template>
"""


def clip(cid, start, dur, inner, cls="", extra=""):
    c = f' class="clip {cls}"'.replace(" \"", "\"")
    return f'    <div id="{cid}"{c} data-start="{r2(start)}" data-duration="{r2(dur)}"{extra}>{inner}</div>'


def var(i, label, default):
    return {"id": i, "type": "string", "label": label, "default": default}


def ws(text, cls="w"):
    """split a line into word spans for per-word motion"""
    return " ".join(f'<span class="{cls}">{t}</span>' for t in text.split(" "))


# ---------------------------------------------------------------- portrait camera (S1-S3)
# 3.4 px per face unit: face 74 % of frame width, eyes at y 1000, hair fills the top band (dark
# ground for light type), shirt runs off the bottom edge: full-bleed.
PX = 3.4
VB_P = (41.2, -48.4, round(1080 / PX, 3), round(1920 / PX, 3))   # v4: face 57 px higher, mouth ends y 1470 (caption below the chin)
DOT_S = (round((150 - VB_P[0]) * PX, 1), round((284 - VB_P[1]) * PX, 1))   # cheek dot on screen
VBS = " ".join(map(str, VB_P))
CAM_CSS = """
      #__P__-cam { position: absolute; inset: 0; z-index: 1; }
      #__P__-scrim { position: absolute; left: 0; top: 0; width: 1080px; height: 600px; z-index: 5; pointer-events: none;
        background: linear-gradient(180deg, rgba(44,58,49,0.94) 0%, rgba(44,58,49,0.9) 68%, rgba(44,58,49,0) 100%); }"""
# v3: blonde hair under the type band -> an ink scrim keeps the light type readable (contrast)
SCRIM = '    <div id="__P__-scrim" data-layout-ignore></div>'


def s1():
    sid, D = "s1", DUR["s1"]
    t_scan = loc(sid, K("scan0"))                 # "otuz üç milisaniyeden": the scan runs
    t_scan_d = r2(K("scan1", True) - K("scan0"))
    t_b2 = loc(sid, K("b2"))                  # "Saniyede": 30 kare
    t_cells = loc(sid, K("cells"))               # "otuz kare": 30 cells fill in one second
    t_b2b = loc(sid, K("calc"))                 # "otuz üç milisaniye": hesap
    t_dive = r2(D - 0.77)
    css = CAM_CSS.replace("__P__", sid) + """
      #s1-g1 { top: 176px; } #s1-g2 { top: 176px; } #s1-g3 { top: 150px; }
      #s1-g1 .kick, #s1-g2 .kick, #s1-g3 .kick { color: var(--keten); }
      #s1-g3 .note { color: var(--keten); margin-bottom: 4px; }
      #s1-ret { position: absolute; left: 190px; top: 640px; width: 700px; height: 940px; z-index: 3; }
      #s1-scan { position: absolute; left: 140px; top: 640px; width: 800px; height: 6px; border-radius: 3px; z-index: 4;
        background: var(--toz-pembe); box-shadow: 0 0 24px 6px rgba(242, 211, 209, 0.55); opacity: 0; }
      #s1-shutter { position: absolute; left: 485px; top: 1745px; width: 110px; height: 110px; border-radius: 50%;
        border: 8px solid var(--keten); box-sizing: border-box; z-index: 3; }
      #s1-strip { position: absolute; left: 60px; top: 1640px; width: 880px; height: 56px; display: flex; gap: 6px; z-index: 3; }
      #s1-strip i { flex: 1; height: 56px; border: 3px solid rgba(248, 244, 236, 0.75); border-radius: 6px; box-sizing: border-box; }"""
    cells = "".join(f'<i id="s1-c{i}"></i>' for i in range(30))
    br = 'stroke="#F8F4EC" stroke-width="8" fill="none" stroke-linecap="round"'
    ret = (f'<svg id="s1-ret" viewBox="0 0 700 960" data-layout-ignore><path d="M8 110 V8 H110" {br}/><path d="M590 8 H692 V110" {br}/>'
           f'<path d="M692 850 V952 H590" {br}/><path d="M110 952 H8 V850" {br}/></svg>')
    body = "\n".join([
        '    <div id="s1-cam"></div>',
        SCRIM.replace("__P__", sid),
        ret,
        '    <div id="s1-scan" data-layout-ignore></div>',
        f'    <div id="s1-strip" data-layout-ignore>{cells}</div>',
        '    <div id="s1-shutter"></div>',
        # frame 0 = thumbnail: "Bir kare için / 33 ms" over the dark hair, the face below
        clip("s1-g1", 0, t_b2, f'<p class="fr kick" data-var-text="k1">{T["k1"]}</p>'
             '<p class="fr hero acc"><span class="n s1-ms-n">33</span><span class="u">ms</span></p>', "tx"),
        clip("s1-g2", t_b2 - 0.2, D - t_b2 + 0.2, f'<p class="fr kick" data-var-text="k2">{T["k2"]}</p>'
             f'<p class="fr hero acc"><span class="n" id="s1-fps">30</span><span class="u" data-var-text="u2">{T["u2"]}</span></p>', "tx"),
        clip("s1-g3", t_b2b - 0.2, D - t_b2b + 0.2, f'<p class="note" data-var-text="calc">{T["calc"]}</p>'
             '<p class="fr kick">1000 ÷ <span class="s1-fps2">30</span> ≈</p>'
             '<p class="fr hero acc"><span class="n s1-ms-n">33</span><span class="u">ms</span></p>', "tx"),
    ])
    script = f"""
        const D = window.AYNA_DATA;
        document.getElementById("s1-cam").innerHTML = A.face({{ id: "s1f", viewBox: "{VBS}", w: 1080, h: 1920, bg: C.murekkep,
          dot: {{ px: {PX}, ring: C.keten }} }});
        Q(".s1-ms-n").forEach((e) => (e.textContent = Math.round(D.FRAME_MS)));
        document.getElementById("s1-fps").textContent = D.FPS;
        Q(".s1-fps2").forEach((e) => (e.textContent = D.FPS));
        const O = "{DOT_S[0]}px {DOT_S[1]}px";
        // face tracking locks on (pull, settles), then the filter scans the face on "otuz üç milisaniyeden"
        tl.fromTo("#s1-ret", {{ opacity: 0, scale: 1.18 }}, {{ opacity: 1, scale: 1, duration: 0.45, ease: "power3.out", transformOrigin: "50% 50%" }}, 0.4);
        tl.set("#s1-scan", {{ opacity: 1 }}, {t_scan});
        tl.fromTo("#s1-scan", {{ y: 0 }}, {{ y: 1010, duration: {t_scan_d}, ease: "none", immediateRender: false }}, {t_scan});
        tl.set("#s1-scan", {{ opacity: 0 }}, {r2(t_scan + t_scan_d)});
        // B2: hero numbers swap by zoom-through (push), the 30 frames of one second fill
        zt("#s1-g1", "#s1-g2", {t_b2}, 1);
        for (let i = 0; i < 30; i++) tl.fromTo("#s1-c" + i, {{ backgroundColor: "rgba(242,211,209,0)" }}, {{ backgroundColor: "rgba(242,211,209,1)", duration: 0.033, ease: "none", immediateRender: false }}, {t_cells} + i / 30);
        zt("#s1-g2", "#s1-g3", {t_b2b}, 1);
        // the dive: the camera pushes into the cheek dot; type and UI blur away with it
        tl.to("#s1-cam", {{ scale: 7, duration: 0.77, ease: "power3.in", transformOrigin: O }}, {t_dive});
        tl.to("#s1-cam", {{ filter: "blur(18px)", duration: 0.25, ease: "power2.in" }}, {r2(D - 0.25)});
        tl.to(["#s1-g3", "#s1-ret", "#s1-strip", "#s1-shutter", "#s1-scrim"], {{ scale: 1.2, filter: "blur(10px)", duration: 0.25, ease: "power3.in", transformOrigin: O }}, {t_dive});
        tl.to(["#s1-g3", "#s1-ret", "#s1-strip", "#s1-shutter", "#s1-scrim"], {{ opacity: 0, duration: 0.25, ease: "none" }}, {t_dive});
"""
    v = [var("k1", "Kanca üst satır", T["k1"]), var("k2", "B2 üst satır", T["k2"]),
         var("u2", "B2 birim", T["u2"]), var("calc", "Hesap notu", T["calc"])]
    return scene(sid, "var(--murekkep)", "var(--keten)", "var(--toz-pembe)", css, body, script, v)


def s2():
    sid, D = "s2", DUR["s2"]
    t_k = loc(sid, K("s2k"))                   # "Yakından bak:"
    t_px = loc(sid, K("s2px"))                  # "pikseller": the image breaks into pixels
    css = CAM_CSS.replace("__P__", sid) + """
      #s2-smooth { position: absolute; inset: 0; z-index: 2; }
      #s2-t { top: 176px; }
      #s2-t .kick { color: var(--keten); }
      #s2-t .big { font-size: 190px; }"""
    body = "\n".join([
        '    <div id="s2-cam"><div id="s2-px"></div><div id="s2-smooth"></div></div>',
        SCRIM.replace("__P__", sid),
        clip("s2-t", 0, D, f'<p class="fr kick">{ws(T["s2k"])}</p><p class="fr big acc"><span class="w" data-var-text="t2">{T["s2t"]}</span></p>', "tx"),
    ])
    script = f"""
        document.getElementById("s2-px").innerHTML = A.face({{ id: "s2f", viewBox: "{VBS}", w: 1080, h: 1920, bg: C.murekkep,
          pixel: {{ cell: 10, line: {2 / PX:.3f} }}, dot: {{ px: {PX}, ring: C.keten }} }});
        document.getElementById("s2-smooth").innerHTML = A.face({{ id: "s2s", viewBox: "{VBS}", w: 1080, h: 1920, bg: C.murekkep,
          dot: {{ px: {PX}, ring: C.keten }} }});
        const O = "{DOT_S[0]}px {DOT_S[1]}px";
        // arrival of the dive: still pushing (scale grows 0.8 -> 1), blur clears: same Z sign as S1's exit
        tl.fromTo("#s2-cam", {{ scale: 0.8, filter: "blur(18px)" }}, {{ scale: 1, filter: "blur(0px)", duration: 0.6, ease: "expo.out", transformOrigin: O }}, 0);
        wf("#s2-t .kick .w", {t_k});
        // "pikseller": the smooth layer drops away, the 10-unit pixel grid shows
        tl.fromTo("#s2-smooth", {{ opacity: 1 }}, {{ opacity: 0, duration: 0.25, ease: "power2.in", immediateRender: false }}, {r2(t_px - 0.1)});
        tl.fromTo("#s2f-pgr", {{ opacity: 0 }}, {{ opacity: 1, duration: 0.25, ease: "power2.out" }}, {r2(t_px - 0.1)});
        wf("#s2-t .big .w", {t_px}, 90);
        // the picture dims for the landmark pass; the title leaves on the film's current (LEFT)
        tl.fromTo(["#s2f-content", "#s2f-pgr"], {{ opacity: 1 }}, {{ opacity: 0.35, duration: 0.6, ease: "power2.inOut", immediateRender: false }}, {r2(D - 0.6)});
        cOut("#s2-t .w", {D});
"""
    v = [var("t2", "Başlık", T["s2t"])]
    return scene(sid, "var(--murekkep)", "var(--keten)", "var(--toz-pembe)", css, body, script, v)


def s3():
    sid, D = "s3", DUR["s3"]
    t_land = loc(sid, K("land"))                 # "nokta": counter lands on 478
    t_src = loc(sid, K("src3"))                  # "Midiya Payp": source label
    t_sub = r2(t_land + 0.36)                         # "işaretler": the breakdown, after a beat of stillness
    css = CAM_CSS.replace("__P__", sid) + """
      #s3-head { top: 214px; }
      #s3-head .u { color: var(--keten); }
      #root #s3-sub { top: 480px; color: var(--keten); }
      #root #s3-src { top: 548px; color: var(--adacayi); }"""
    body = "\n".join([
        '    <div id="s3-cam"></div>',
        SCRIM.replace("__P__", sid),
        clip("s3-head", 0, D, f'<p class="fr hero acc"><span class="n" id="s3-n">0</span><span class="u" data-var-text="unit">{T["unit"]}</span></p>', "tx"),
        clip("s3-sub", t_sub, D - t_sub, f'<p class="note"><span id="s3-sub-t" data-var-text="sub">{T["sub"].format(F=468, I=10)}</span></p>', "tx"),
        clip("s3-src", t_src, D - t_src, f'<p class="src"><span id="s3-src-t" data-var-text="src">{h(T["src3"])}</span></p>', "tx"),
    ])
    script = f"""
        const DATA = window.AYNA_DATA;
        document.getElementById("s3-sub-t").textContent = {json.dumps(T["sub"], ensure_ascii=False)}.replace("{{F}}", DATA.FACE).replace("{{I}}", DATA.IRIS);
        document.getElementById("s3-cam").innerHTML = A.face({{ id: "s3f", viewBox: "{VBS}", w: 1080, h: 1920, bg: C.murekkep,
          pixel: {{ cell: 10, line: {2 / PX:.3f} }}, dot: {{ px: {PX}, ring: C.keten }},
          points: {{ r: {5 / PX:.3f}, fill: C.toz }} }});
        document.getElementById("s3f-content").setAttribute("opacity", "0.35");
        document.getElementById("s3f-pgr").setAttribute("opacity", "0.35");
        // 478 landmarks stamp on, contour first; the hero counter is the visual of the beat
        const pts = Q("#s3f-pts circle"), N = pts.length, LAND = {t_land}, STAMP = 0.133;
        pts.forEach((c, i) => tl.fromTo(c, {{ scale: 0 }}, {{ scale: 1, duration: STAMP, ease: "back.out(1.4)", transformOrigin: "50% 50%" }}, ((LAND - STAMP) * i) / (N - 1)));
        const cnt = {{ n: 0 }}, nEl = document.getElementById("s3-n");
        tl.fromTo(cnt, {{ n: 0 }}, {{ n: N, duration: LAND, ease: "power1.in", onUpdate: () => (nEl.textContent = Math.round(cnt.n)) }}, 0);
        cIn("#s3-head .n, #s3-head .u", 0);
        tl.fromTo("#s3-head .n", {{ scale: 1 }}, {{ scale: 1.08, duration: 0.12, ease: "power2.out", transformOrigin: "0% 100%", immediateRender: false }}, LAND);
        tl.to("#s3-head .n", {{ scale: 1, duration: 0.3, ease: "power2.out" }}, {r2(t_land + 0.12)});
        wipe("#s3-src-t", {t_src}, 0.3);
        wipe("#s3-sub-t", {t_sub}, 0.3);
        // the second dive: push into the cheek, into the skin
        const O = "{DOT_S[0]}px {DOT_S[1]}px";
        tl.to("#s3-cam", {{ scale: 4, duration: 0.6, ease: "power3.in", transformOrigin: O }}, {r2(D - 0.6)});
        tl.to("#s3-cam", {{ filter: "blur(18px)", duration: 0.25, ease: "power2.in" }}, {r2(D - 0.25)});
        tl.to(["#s3-head", "#s3-sub", "#s3-src", "#s3-scrim"], {{ scale: 1.2, filter: "blur(10px)", duration: 0.25, ease: "power3.in", transformOrigin: O }}, {r2(D - 0.25)});
        tl.to(["#s3-head", "#s3-sub", "#s3-src", "#s3-scrim"], {{ opacity: 0, duration: 0.23, ease: "none" }}, {r2(D - 0.25)});
"""
    v = [var("unit", "Sayaç birimi", T["unit"]), var("sub", "Alt satır", T["sub"].format(F=468, I=10)),
         var("src", "Kaynak", T["src3"])]
    return scene(sid, "var(--murekkep)", "var(--keten)", "var(--toz-pembe)", css, body, script, v)


# ---------------------------------------------------------------- S4-S6 skin close-up (band 0-560, box 560-1920 full width)
BOX_T, BOX_H = 560, 1360
BOX_CSS = """
      #__P__-box { position: absolute; left: 0; top: 560px; width: 1080px; height: 1360px; overflow: hidden; z-index: 1; }
      #root .bandt { top: 176px; }
      #root .bandt .sub { color: var(--murekkep); opacity: 0.86; }
      #root .bsrc { top: 470px; color: var(--murekkep); }"""
VB4 = (70, 165, 260, round(260 * BOX_H / 1080, 3))       # both cheeks, eyes to lips: 4.15 px/u
VB5 = (50, 130, 300, round(300 * BOX_H / 1080, 3))       # eyes, cheeks and jaw: 3.6 px/u (bottom 508 < shirt end 520)
VB6 = (-20, 10, 440, round(440 * BOX_H / 1080, 3))       # the whole face: 2.45 px/u; v4: mouth ends y 1475


def vbs(v):
    return "{ x: %s, y: %s, w: %s, h: %s }" % v


def band_title(sid, big, sub, t_big, t_sub, dur, big_var, sub_var):
    return clip(f"{sid}-title", 0, dur, f'<p class="fr big"><span class="w" data-var-text="{big_var}">{big}</span></p>'
                f'<p class="fr sub"><span class="w" data-var-text="{sub_var}">{sub}</span></p>', "tx bandt")


def s4():
    sid, D = "s4", DUR["s4"]
    t_bil = loc(sid, K("bil"))                         # "bilateral"
    t_doku = loc(sid, K("doku4"))
    sweep0, sweep1 = loc(sid, K("sweep0")), loc(sid, K("sweep1", True))   # "gibi" .. "çiller"
    px = 1080 / VB4[2]
    fx, fy = (150 - VB4[0]) / VB4[2], (284 - VB4[1]) / VB4[3]
    w0, h0 = VB4[2] * 1.3, VB4[3] * 1.3                       # entry starts wider and pushes in (Z +)
    VB4a = (round(150 - fx * w0, 3), round(284 - fy * h0, 3), round(w0, 3), round(h0, 3))
    WIN = 300
    win_y = round((280 - VB4[1]) * px - WIN / 2)               # window centred on the cheek line
    css = BOX_CSS.replace("__P__", sid) + f"""
      #s4-win {{ position: absolute; left: 0; top: {win_y}px; width: {WIN}px; height: {WIN}px; z-index: 3; }}
      #root .lab {{ position: absolute; top: 600px; margin: 0; z-index: 5; font: 700 36px/1 "Be Vietnam Pro", sans-serif;
        color: var(--keten); background: rgba(44, 58, 49, 0.92); border-radius: 18px; padding: 12px 20px 14px; }}
      #s4-labL {{ left: 60px; }}
      #s4-labR {{ right: 140px; }}"""
    body = "\n".join([
        band_title(sid, T["t4"], T["t4b"], 0, t_bil, D, "t1", "t2"),
        clip("s4-src", 0.3, D - 0.3, f'<p class="src"><span data-var-text="src">{h(T["src4"])}</span></p>', "tx bsrc"),
        f'    <div id="s4-box"><svg id="s4-win" viewBox="0 0 {WIN} {WIN}" data-layout-ignore><rect x="4" y="4" width="{WIN - 8}" height="{WIN - 8}" rx="18" fill="none" stroke="#F8F4EC" stroke-width="7" stroke-dasharray="22 14"/></svg></div>',
        clip("s4-labL", t_doku, D - t_doku, f'<span data-var-text="labL">{T["labL"]}</span>', "lab"),
        clip("s4-labR", t_doku + 0.1, D - t_doku - 0.1, f'<span data-var-text="labR">{T["labR"]}</span>', "lab"),
    ])
    script = f"""
        const box = document.getElementById("s4-box");
        box.insertAdjacentHTML("afterbegin", A.face({{ id: "s4f", viewBox: "{' '.join(map(str, VB4a))}", w: 1080, h: {BOX_H}, bg: C.adacayi,
          lineW: 3, dot: {{ px: {px:.4f}, ring: C.murekkep }} }}));
        const cam = {vbs(VB4a)};
        A.cam("s4f", cam, 1080);
        tl.fromTo(cam, {vbs(VB4a)}, {{ ...{vbs(VB4)}, duration: 0.6, ease: "expo.out", onUpdate: () => A.cam("s4f", cam, 1080) }}, 0);
        tl.fromTo("#s4-box", {{ filter: "blur(18px)" }}, {{ filter: "blur(0px)", duration: 0.5, ease: "expo.out" }}, 0);
        wf("#s4-title .big .w", 0.05, 90);
        wf("#s4-title .sub .w", {t_bil});
        wipe("#s4-src span", 0.3, 0.3);
        // the smoothing window sweeps left to right; texture is gone behind it, edges stay sharp
        const sw = {{ cx: {WIN // 2} }};
        const upd = () => {{ gsap.set("#s4-win", {{ x: sw.cx - {WIN // 2} }}); A.apply("s4f", {{ texX: {VB4[0]} + sw.cx / {px:.4f} }}); }};
        tl.fromTo("#s4-win", {{ opacity: 0 }}, {{ opacity: 1, duration: 0.25, ease: "power2.out" }}, {r2(sweep0 - 0.25)});
        tl.fromTo(sw, {{ cx: {WIN // 2} }}, {{ cx: {1080 - WIN // 2}, duration: {r2(sweep1 - sweep0)}, ease: "none", onUpdate: upd, onStart: upd }}, {sweep0});
        tl.to("#s4-win", {{ opacity: 0, duration: 0.2, ease: "power2.in" }}, {r2(sweep1 + 0.05)});
        const tx = {{ v: 1 }};
        tl.fromTo(tx, {{ v: 1 }}, {{ v: 0, duration: 0.35, ease: "power2.inOut", onUpdate: () => A.apply("s4f", {{ tex: tx.v }}) }}, {r2(sweep1 + 0.05)});
        wipe("#s4-labL span", {t_doku}, 0.25);
        wipe("#s4-labR span", {r2(t_doku + 0.1)}, 0.25);
        cOut("#s4-title .w, #s4-src p", {D});
        tl.to(["#s4-labL", "#s4-labR"], {{ opacity: 0, duration: 0.2, ease: "power2.in" }}, {r2(D - 0.22)});
"""
    v = [var("t1", "Başlık", T["t4"]), var("t2", "Alt başlık", T["t4b"]),
         var("labL", "Etiket sol", T["labL"]), var("labR", "Etiket sağ", T["labR"]),
         var("src", "Kaynak", T["src4"])]
    return scene(sid, "var(--adacayi)", "var(--murekkep)", "var(--koyu-adacayi)", css, body, script, v)


def s5():
    sid, D = "s5", DUR["s5"]
    t_pts = loc(sid, K("pts5"))                   # "noktalar"
    t_grid = loc(sid, K("grid5") - 0.3)            # "görüntü esner"
    t_eye = loc(sid, K("eye5") - 0.3)             # "büyür"
    t_jaw = loc(sid, K("jaw5") - 0.25)            # "daralır"
    px5 = 1080 / VB5[2]
    css = BOX_CSS.replace("__P__", sid)
    body = "\n".join([
        band_title(sid, T["t5"], T["t5b"], 0, 0, D, "t1", "t2"),
        clip("s5-src", 0, D, f'<p class="src"><span data-var-text="src">{h(T["src5"])}</span></p>', "tx bsrc"),
        '    <div id="s5-box"></div>',
    ])
    script = f"""
        document.getElementById("s5-box").innerHTML = A.face({{ id: "s5f", viewBox: "{' '.join(map(str, VB4))}", w: 1080, h: {BOX_H}, bg: C.adacayi,
          lineW: 3, dot: {{ px: {1080 / VB4[2]:.4f}, ring: C.murekkep }}, grid: true, arrows: {{ px: {px5:.4f} }},
          points: {{ r: {4 / px5:.3f}, fill: C.murekkep }} }});
        A.apply("s5f", {{ tex: 0 }});
        const cam = {vbs(VB4)};
        A.cam("s5f", cam, 1080);
        tl.fromTo(cam, {vbs(VB4)}, {{ ...{vbs(VB5)}, duration: 0.9, ease: "power2.inOut", onUpdate: () => A.cam("s5f", cam, 1080) }}, 0.1);
        cIn("#s5-title .w, #s5-src p", 0);
        const pts = Q("#s5f-pts circle"), N = pts.length;
        pts.forEach((c, i) => tl.fromTo(c, {{ scale: 0 }}, {{ scale: 1, duration: 0.133, ease: "back.out(1.4)", transformOrigin: "50% 50%" }}, {t_pts} + (0.4 * i) / (N - 1)));
        tl.fromTo("#s5f-gcr", {{ attr: {{ height: 0 }} }}, {{ attr: {{ height: 190 }}, duration: 0.6, ease: "power2.inOut" }}, {t_grid});
        tl.fromTo("#s5f-arrows", {{ opacity: 0 }}, {{ opacity: 1, duration: 0.15, ease: "power2.out" }}, {t_eye});
        const k = {{ eye: 0, jaw: 0 }};
        tl.fromTo(k, {{ eye: 0 }}, {{ eye: 1, duration: 0.6, ease: "power2.inOut", onUpdate: () => A.apply("s5f", {{ eye: k.eye }}) }}, {t_eye});
        tl.fromTo(k, {{ jaw: 0 }}, {{ jaw: 1, duration: 0.6, ease: "power2.inOut", onUpdate: () => A.apply("s5f", {{ jaw: k.jaw }}) }}, {t_jaw});
        cOut("#s5-title .w, #s5-src p", {D});
"""
    v = [var("t1", "Başlık", T["t5"]), var("t2", "Alt başlık", T["t5b"]), var("src", "Kaynak", T["src5"])]
    return scene(sid, "var(--adacayi)", "var(--murekkep)", "var(--koyu-adacayi)", css, body, script, v)


def s6():
    sid, D = "s6", DUR["s6"]
    t_isik = loc(sid, K("isik"))
    t_gol = loc(sid, K("gol"))
    px5 = 1080 / VB5[2]
    css = BOX_CSS.replace("__P__", sid)
    body = "\n".join([
        band_title(sid, T["t6"], T["t6b"], 0, 0, D, "t1", "t2"),
        clip("s6-src", 0, D, f'<p class="src"><span data-var-text="src">{h(T["src6"])}</span></p>', "tx bsrc"),
        '    <div id="s6-box"></div>',
    ])
    script = f"""
        document.getElementById("s6-box").innerHTML = A.face({{ id: "s6f", viewBox: "{' '.join(map(str, VB5))}", w: 1080, h: {BOX_H}, bg: C.adacayi,
          lineW: 3, dot: {{ px: {px5:.4f}, ring: C.murekkep }}, grid: true, arrows: {{ px: {px5:.4f} }},
          points: {{ r: {4 / px5:.3f}, fill: C.murekkep }} }});
        A.apply("s6f", {{ tex: 0, eye: 1, jaw: 1 }});
        document.getElementById("s6f-gcr").setAttribute("height", "190");
        const cam = {vbs(VB5)};
        A.cam("s6f", cam, 1080);
        cIn("#s6-title .w, #s6-src p", 0);
        // the scaffolding clears and the camera pulls back to the whole face as the light lands
        tl.fromTo(["#s6f-pts", "#s6f-grid", "#s6f-arrows"], {{ opacity: 1 }}, {{ opacity: 0, duration: 0.3, ease: "power2.in" }}, 0.2);
        tl.fromTo(cam, {vbs(VB5)}, {{ ...{vbs(VB6)}, duration: 0.9, ease: "power2.inOut", onUpdate: () => A.cam("s6f", cam, 1080) }}, 0.2);
        const L = {{ hi: 0, sh: 0.3 }};
        tl.fromTo(L, {{ hi: 0 }}, {{ hi: 0.35, duration: 0.6, ease: "power2.inOut", onUpdate: () => A.apply("s6f", {{ hi: L.hi }}) }}, {t_isik});
        tl.fromTo(L, {{ sh: 0.3 }}, {{ sh: 0.08, duration: 0.6, ease: "power2.inOut", onUpdate: () => A.apply("s6f", {{ sh: L.sh }}) }}, {t_gol});
        cOut("#s6-title .w, #s6-src p", {D});
"""
    v = [var("t1", "Başlık", T["t6"]), var("t2", "Alt başlık", T["t6b"]), var("src", "Kaynak", T["src6"])]
    return scene(sid, "var(--adacayi)", "var(--murekkep)", "var(--koyu-adacayi)", css, body, script, v)


# ---------------------------------------------------------------- S7/S8 the phone again (keten), big
PH = dict(l=160, t=620, w=760, h=1240, r=90, inset=20)
SCR = dict(l=PH["l"] + PH["inset"], t=PH["t"] + PH["inset"], w=PH["w"] - 2 * PH["inset"], h=PH["h"] - 2 * PH["inset"], r=70)
SPX = 2.2                                                       # face units -> screen px
VB_SCR = (36.4, 2.2, round(SCR["w"] / SPX, 3), round(SCR["h"] / SPX, 3))   # v4: eyes y 1139, mouth ends y 1480, caption over neck/shirt


def full_vb(vb, box_top, box_left=0, box_w=1080):
    x, y, ww, hh = vb
    s = box_w / ww
    return (round(x - box_left / s, 3), round(y - box_top / s, 3), round(1080 / s, 3), round(1920 / s, 3))


VB7a = full_vb(VB6, BOX_T)
VB7b = full_vb(VB_SCR, SCR["t"], SCR["l"], SCR["w"])
CLIP_A = "inset(560px 0px 0px 0px round 0px)"
CLIP_B = f"inset({SCR['t']}px {1080 - SCR['l'] - SCR['w']}px {1920 - SCR['t'] - SCR['h']}px {SCR['l']}px round {SCR['r']}px)"
PHONE_CSS = f"""
      #__P__-stage {{ position: absolute; inset: 0; z-index: 1; }}
      #__P__-svgwrap {{ position: absolute; inset: 0; z-index: 2; }}
      #__P__-phone {{ position: absolute; left: {PH['l']}px; top: {PH['t']}px; width: {PH['w']}px; height: {PH['h']}px; border-radius: {PH['r']}px; z-index: 1;
        background: var(--murekkep); box-shadow: 0 30px 60px rgba(44, 58, 49, 0.22); }}
      #__P__-power {{ position: absolute; left: {PH['w']}px; top: 240px; width: 8px; height: 110px; border-radius: 0 4px 4px 0; background: var(--murekkep); }}
      #__P__-ui {{ position: absolute; left: {SCR['l']}px; top: {SCR['t']}px; width: {SCR['w']}px; height: {SCR['h']}px; z-index: 3; }}
      #__P__-status {{ position: absolute; left: 0; top: 0; width: {SCR['w']}px; height: 76px; border-radius: {SCR['r']}px {SCR['r']}px 0 0; background: var(--adacayi); }}
      #__P__-hole {{ position: absolute; left: {SCR['w'] // 2 - 13}px; top: 24px; width: 26px; height: 26px; border-radius: 50%; background: #0F1511; }}
      #__P__-ms {{ position: absolute; right: 56px; top: 16px; font: 700 40px/1.1 "Be Vietnam Pro", sans-serif; color: var(--murekkep); }}
      #__P__-shutter {{ position: absolute; left: {SCR['w'] // 2 - 60}px; top: {SCR['h'] - 160}px; width: 120px; height: 120px; border-radius: 50%; border: 9px solid var(--keten); box-sizing: border-box; }}
      #__P__-strip {{ position: absolute; left: 60px; top: 1876px; width: 880px; height: 30px; display: flex; gap: 5px; z-index: 1; }}
      #__P__-strip i {{ flex: 1; height: 30px; border: 3px solid rgba(44, 58, 49, 0.45); border-radius: 5px; box-sizing: border-box; }}
      #root .g {{ top: 176px; }}
      #root .g .kick {{ color: var(--murekkep); }}"""


def phone_markup(p):
    cells = "".join(f'<i id="{p}-c{i}"></i>' for i in range(30))
    return (f'    <div id="{p}-stage"><div id="{p}-phone"><div id="{p}-power"></div></div>\n'
            f'    <div id="{p}-svgwrap"></div>\n'
            f'    <div id="{p}-ui" data-layout-ignore><div id="{p}-status"><div id="{p}-hole"></div><div id="{p}-ms">33 ms</div></div><div id="{p}-shutter"></div></div>\n'
            f'    <div id="{p}-strip" data-layout-ignore>{cells}</div></div>')


def s7():
    sid, D = "s7", DUR["s7"]
    t_kez = loc(sid, K("kez"))                   # "otuz kez": hero number + the 30 cells fill
    t_title = loc(sid, K("sny"))                 # "saniyede"
    land = 1.0
    css = PHONE_CSS.replace("__P__", sid)
    body = "\n".join([
        phone_markup(sid),
        clip("s7-g", 0, D, f'<p class="fr kick"><span class="w" data-var-text="k">{T["k7"]}</span></p>'
             f'<p class="fr hero acc"><span class="n w" id="s7-fps">30</span><span class="u w" data-var-text="u">{T["u7"]}</span></p>', "tx g"),
    ])
    script = f"""
        document.getElementById("s7-svgwrap").innerHTML = A.face({{ id: "s7f", viewBox: "{' '.join(map(str, VB7a))}", w: 1080, h: 1920, bg: C.adacayi,
          dot: {{ px: 1, ring: C.murekkep }} }});
        A.apply("s7f", {{ tex: 0, eye: 1, jaw: 1, hi: 0.35, sh: 0.08 }});
        document.getElementById("s7-fps").textContent = window.AYNA_DATA.FPS;
        const svg = document.getElementById("s7f-svg");
        const cam = {vbs(VB7a)};
        A.cam("s7f", cam, 1080);
        // pull back: the toz pembe window shrinks into the phone screen and the phone forms around it
        tl.fromTo(cam, {vbs(VB7a)}, {{ ...{vbs(VB7b)}, duration: {land}, ease: "power3.out", onUpdate: () => A.cam("s7f", cam, 1080) }}, 0);
        tl.fromTo(svg, {{ clipPath: "{CLIP_A}" }}, {{ clipPath: "{CLIP_B}", duration: {land}, ease: "power3.out" }}, 0);
                tl.fromTo("#s7-phone", {{ opacity: 0, scale: 1.1 }}, {{ opacity: 1, scale: 1, duration: 0.5, ease: "power3.out", transformOrigin: "50% 50%" }}, 0.45);
        tl.fromTo("#s7-ui", {{ opacity: 0 }}, {{ opacity: 1, duration: 0.2, ease: "power2.out" }}, {land - 0.15});
        wf("#s7-g .kick .w", {t_title});
        wf("#s7-g .hero .w", {t_kez}, 90);
        tl.fromTo("#s7-strip i", {{ scale: 0 }}, {{ scale: 1, duration: 0.133, ease: "back.out(1.4)", stagger: 0.0333 }}, {land - 0.2});
        for (let i = 0; i < 30; i++) tl.fromTo("#s7-c" + i, {{ backgroundColor: "rgba(77,106,85,0)" }}, {{ backgroundColor: "rgba(77,106,85,1)", duration: 0.033, ease: "none", immediateRender: false }}, {t_kez} + i / 30);
        document.getElementById("s7-ms").textContent = Math.round(window.AYNA_DATA.FRAME_MS) + " ms";
"""
    v = [var("k", "Üst satır", T["k7"]), var("u", "Birim", T["u7"])]
    return scene(sid, "var(--keten)", "var(--murekkep)", "var(--koyu-adacayi)", css, body, script, v)


def s8():
    sid, D = "s8", DUR["s8"]
    t_hes = loc(sid, K("hes"))                   # "hesaplanmış"
    t_ger = loc(sid, K("ger"))                   # "Gerçek": payoff arrives (inverse zoom)
    t_doku = loc(sid, K("doku8"))                  # "doku": chip becomes "Filtresiz"
    step = 0.267                                       # 8 frames per rewind step
    r0 = r2(t_doku - 3 * step)
    t_end = r2(loc(sid, K("last", True)) - 0.55)          # end card: the phone steps back, wordmark under it
    t_more = r2(t_end + 0.5)
    css = PHONE_CSS.replace("__P__", sid) + f"""
      #s8-strip i {{ background: var(--koyu-adacayi); }}
      #s8-gB .big {{ font-size: 96px; line-height: 1.04; white-space: normal; }}
      #s8-gA .big {{ font-size: 150px; }}
      #s8-chip {{ position: absolute; left: {SCR['l'] + 30}px; top: {SCR['t'] + 100}px; margin: 0; z-index: 5;
        font: 700 40px/1 "Be Vietnam Pro", sans-serif; color: var(--keten); background: rgba(44, 58, 49, 0.92); border-radius: 22px; padding: 14px 24px 16px; }}
      #s8-mark {{ position: absolute; left: 290px; top: 600px; width: 500px; height: 101px; z-index: 5; }}
      #s8-slogan {{ position: absolute; left: 60px; width: 880px; top: 724px; margin: 0; z-index: 5; text-align: center;
        font-family: "Fraunces", Georgia, serif; font-weight: 600; font-variation-settings: "SOFT" 100, "WONK" 0, "opsz" 72;
        font-size: 48px; line-height: 1.1; color: var(--koyu-adacayi); }}
      #s8-slogan span {{ display: inline-block; }}
      #s8-mark img {{ display: block; width: 500px; height: 101px; }}
      #s8-more {{ position: absolute; left: 60px; width: 880px; top: {812 if T["slogan"] else 730}px; margin: 0; z-index: 5; text-align: center;
        font: 500 34px/1.3 "Be Vietnam Pro", sans-serif; color: var(--murekkep); }}
      #s8-more span {{ display: inline-block; }}"""
    body = "\n".join([
        phone_markup(sid),
        clip("s8-g7", 0, 0.2, f'<p class="fr kick"><span class="w">{T["k7"]}</span></p>'
             f'<p class="fr hero acc"><span class="n w s8-fps">30</span><span class="u w">{T["u7"]}</span></p>', "tx g"),
        clip("s8-gA", 0, t_ger, f'<p class="fr kick">{ws(T["kA"])}</p>'
             f'<p class="fr big acc"><span class="w" data-var-text="tA">{T["tA"]}</span></p>', "tx g"),
        clip("s8-gB", t_ger - 0.2, D - t_ger + 0.2, f'<p class="fr big"><span data-var-text="tB1">{T["tB1"]}</span> <span class="acc" data-var-text="tB2">{T["tB2"]}</span></p>'
             f'<p class="fr big" data-var-text="tB3">{T["tB3"]}</p>', "tx g"),
        clip("s8-chip", t_doku, D - t_doku, f'<span id="s8-chip-t" data-var-text="labB">{T["chip"]}</span>'),
        clip("s8-mark", t_end, D - t_end, '<img id="s8-mark-img" src="assets/brand/wordmark.svg" alt="Ayna Arkası" />', "", " data-beat=\"bitis\""),
        *([clip("s8-slogan", t_more - 0.25, D - t_more + 0.25, f'<span id="s8-slogan-t" data-var-text="slogan">{T["slogan"]}</span>')] if T["slogan"] else []),
        clip("s8-more", t_more, D - t_more, f'<span id="s8-more-t" data-var-text="more">{T["more"]}</span>'),
    ])
    script = f"""
        document.getElementById("s8-svgwrap").innerHTML = A.face({{ id: "s8f", viewBox: "{' '.join(map(str, VB7b))}", w: 1080, h: 1920, bg: C.adacayi,
          dot: {{ px: 1, ring: C.murekkep }} }});
        const svg = document.getElementById("s8f-svg");
        svg.style.clipPath = "{CLIP_B}";
        A.cam("s8f", {vbs(VB7b)}, 1080);
        Q(".s8-fps").forEach((e) => (e.textContent = window.AYNA_DATA.FPS));
        Q("#s8-strip i").forEach((e) => (e.style.background = "#4D6A55"));
        const st = {{ hi: 0.35, sh: 0.08, k: 1, tex: 0 }};
        const upd = () => A.apply("s8f", {{ hi: st.hi, sh: st.sh, eye: st.k, jaw: st.k, tex: st.tex }});
        upd();
        document.getElementById("s8-ms").textContent = Math.round(window.AYNA_DATA.FRAME_MS) + " ms";
        // B9a: "Saniyede 30 kez" leaves on the current, "Filtredeki yüz, hesaplanmış" arrives
        cOut("#s8-g7 .w", 0.2);
        cIn("#s8-gA .kick .w", 0.2);
        wf("#s8-gA .big .w", {t_hes}, 90);
        // rewind, 8 frames a step: light off, shape back, texture back; lands on "doku"
        tl.fromTo(st, {{ hi: 0.35, sh: 0.08 }}, {{ hi: 0, sh: 0.3, duration: {step}, ease: "power2.inOut", onUpdate: upd }}, {r0});
        tl.fromTo(st, {{ k: 1 }}, {{ k: 0, duration: {step}, ease: "power2.inOut", onUpdate: upd }}, {r2(r0 + step)});
        tl.fromTo(st, {{ tex: 0 }}, {{ tex: 1, duration: {step}, ease: "power2.inOut", onUpdate: upd }}, {r2(r0 + 2 * step)});
        // B9b, the payoff: inverse zoom-through (arrival)
        zt("#s8-gA", "#s8-gB", {t_ger}, -1);
        wipe("#s8-chip-t", {t_doku}, 0.25);
        // end card: the phone steps back and down (nudge curve 10/65/25), the wordmark wipes in above it
        const NO = "540px {PH['t'] + PH['h']}px", s1 = 0.972, s2 = 0.79, s3 = 0.72;
        tl.fromTo("#s8-stage", {{ scale: 1 }}, {{ scale: s1, duration: 0.12, ease: "power3.in", transformOrigin: NO, immediateRender: false }}, {t_end});
        tl.to("#s8-stage", {{ scale: s2, duration: 0.11, ease: "none", transformOrigin: NO }}, {r2(t_end + 0.12)});
        tl.to("#s8-stage", {{ scale: s3, duration: 0.4, ease: "power4.out", transformOrigin: NO }}, {r2(t_end + 0.23)});
        tl.to(["#s8-strip", "#s8-chip"], {{ opacity: 0, duration: 0.15, ease: "power2.in" }}, {t_end});
        tl.fromTo("#s8-mark-img", {{ clipPath: "inset(0% 100% 0% 0%)" }}, {{ clipPath: "inset(0% 0% 0% 0%)", duration: 0.5, ease: "power2.out" }}, {r2(t_end + 0.2)});
        {"wipe('#s8-slogan-t', " + str(r2(t_more - 0.25)) + ", 0.3);" if T["slogan"] else ""}
        wipe("#s8-more-t", {t_more}, 0.3);
"""
    v = [var("tA", "B9a vurgu", T["tA"]), var("tB1", "Kapanış 1", T["tB1"]), var("tB2", "Kapanış vurgu", T["tB2"]),
         var("tB3", "Kapanış 2", T["tB3"]), var("labB", "Etiket filtresiz", T["chip"]), var("more", "Bitiş satırı", T["more"])] + ([var("slogan", "Slogan", T["slogan"])] if T["slogan"] else [])
    return scene(sid, "var(--keten)", "var(--murekkep)", "var(--koyu-adacayi)", css, body, script, v)


# ---------------------------------------------------------------- captions (brand pill, overlay rail)
# (display text, [word ids that light it]) per group; numbers as digits, "33 milisaniye" / "478 nokta" never split.
# B9b has no caption: the closing headline is the spoken line, word for word.
GROUPS = [
    [("Canlı", [0]), ("filtrenin", [1])],
    [("bir", [2]), ("kareyi", [3])],
    [("bitirmek", [4]), ("için", [5])],
    [("33", [6, 7]), ("milisaniyeden", [8])],
    [("az", [9]), ("vakti", [10]), ("var.", [11])],
    [("Saniyede", [12]), ("30", [13]), ("kare,", [14])],
    [("kare", [15]), ("başına", [16]), ("yaklaşık", [17])],
    [("33", [18, 19]), ("milisaniye", [20]), ("demek.", [21])],
    [("Yakından", [22]), ("bak:", [23])],
    [("pikseller.", [24])],
    [("Önce", [25]), ("bir", [26]), ("yüz", [27]), ("modeli,", [28])],
    [("örneğin", [29]), ("MediaPipe,", [30, 31])],
    [("yüzün", [32]), ("üstünde", [33])],
    [("478", [34, 35, 36, 37]), ("nokta", [38]), ("işaretler.", [39])],
    [("Sonra", [40]), ("bilateral", [41])],
    [("gibi", [42]), ("bir", [43]), ("filtre", [44])],
    [("cildi", [45]), ("tarar:", [46])],
    [("kenarlar", [47]), ("kalır,", [48])],
    [("doku", [49]), ("silinir.", [50])],
    [("Gözenekler,", [51]), ("çiller,", [52])],
    [("ince", [53]), ("tüyler.", [54])],
    [("Ardından", [55]), ("noktalar", [56])],
    [("kaydırılır,", [57])],
    [("görüntü", [58]), ("esner:", [59])],
    [("gözler", [60]), ("büyür,", [61])],
    [("çene", [62]), ("daralır.", [63])],
    [("En", [64]), ("son", [65]), ("ışık", [66]), ("eklenir,", [67])],
    [("gölgeler", [68]), ("yumuşar.", [69])],
    [("Bunu", [70]), ("saniyede", [71])],
    [("30", [72]), ("kez", [73]), ("yapar,", [74])],
    [("her", [75]), ("karede", [76]), ("yeniden.", [77])],
    [("Filtredeki", [78]), ("yüz,", [79])],
    [("hesaplanmış", [80]), ("bir", [81]), ("yüz.", [82])],
]


# English caption groups (display text; digits for numbers, "478" = four hundred seventy-eight). B9b: none.
GROUPS_EN = [
    "A live filter", "has less than", "33 milliseconds", "to finish one frame.",
    "30 frames a second", "means about", "33 milliseconds", "per frame.",
    "Look closer:", "pixels.",
    "First, a face model,", "for example MediaPipe,", "marks 478 points", "on the face.",
    "Then a filter like", "a bilateral filter", "scans the skin:", "edges stay,", "texture is wiped.", "Pores, freckles,", "fine hairs.",
    "Next, the points", "are shifted and", "the image stretches:", "eyes grow,", "the jaw narrows.",
    "Last, light is added", "and shadows soften.",
    "It does this", "30 times a second,", "fresh on every frame.",
    "The face in the filter", "is a calculated face.",
]
NWORDS = {"478": 3}


def groups_en():
    """map the display groups onto word ids in order, checking each word against words-en.json"""
    out, i = [], 0
    for g in GROUPS_EN:
        grp = []
        for tok in g.split():
            core = tok.rstrip(".,:;!?")
            n = NWORDS.get(core, 1)
            ids = list(range(i, i + n))
            if not core.isdigit():
                assert W[i]["text"] == core, (W[i]["text"], core)
            grp.append((tok, ids)); i += n
        out.append(grp)
    assert W[i]["beat"] == "B9b", "caption groups must cover B1..B9a exactly"
    return out


def captions():
    groups_ = GROUPS if LANG == "tr" else groups_en()
    rows, tw = [], []
    n = 0
    for gi, g in enumerate(groups_):
        first = W[g[0][1][0]]["start"]
        last = W[g[-1][1][-1]]["end"]
        start = first - 0.05
        if gi + 1 < len(groups_):
            nxt = W[groups_[gi + 1][0][1][0]]["start"] - 0.05
            end = min(nxt, last + 0.6)
        else:
            end = last + 0.25
        dur = end - start
        words = []
        for text, ids in g:
            a, b = W[ids[0]]["start"], W[ids[-1]]["end"]
            words.append(f'<span id="cw{n}" class="w">{text}</span>')
            tw.append(f'        tl.set("#cw{n}", {{ color: ACT }}, {r2(a)}); tl.set("#cw{n}", {{ color: TXT }}, {r2(min(b, end))});')
            n += 1
        rows.append(f'    <div id="cg{gi}" class="clip grp" data-start="{r2(start)}" data-duration="{r2(dur)}"><span id="cp{gi}" class="pill">{" ".join(words)}</span></div>')
        tw.append(f'        tl.fromTo("#cp{gi}", {{ opacity: 0, scale: 0.92 }}, {{ opacity: 1, scale: 1, duration: 0.133, ease: "power2.out" }}, {r2(start)});')
        tw.append(f'        tl.to("#cp{gi}", {{ opacity: 0, duration: 0.1, ease: "power2.in" }}, {r2(end - 0.1)});')
    return f"""<template id="altyazi-template">
  <div id="root" data-composition-id="altyazi" data-width="1080" data-height="1920">
    <style>{FONTS}
      #root {{ position: absolute; inset: 0; pointer-events: none; }}
      #root .grp {{ position: absolute; left: 60px; width: 880px; top: 1430px; height: 170px; display: flex; align-items: flex-end; justify-content: center; text-align: center; }}
      #root .pill {{ display: inline-block; white-space: nowrap; font: 700 72px/1.18 "Be Vietnam Pro", sans-serif; color: #F8F4EC;
        background: rgba(44, 58, 49, 0.92); border-radius: 24px; padding: 14px 30px 18px; transform-origin: 50% 100%;
        box-shadow: 0 10px 30px rgba(15, 21, 17, 0.25); }}
    </style>
{chr(10).join(rows)}
    <script>
      (function () {{
        const tl = gsap.timeline({{ paused: true }});
        const TXT = "#F8F4EC", ACT = "#F2D3D1";
{chr(10).join(tw)}
        window.__timelines["altyazi"] = tl;
      }})();
    </script>
  </div>
</template>
"""


# ---------------------------------------------------------------- root
def index():
    hosts = []
    for i, k in enumerate(ORDER):
        hosts.append(f'''      <div id="{k}" data-composition-id="{k}" data-composition-src="compositions/{k}.html" data-start="{S[k]}" data-duration="{DUR[k]}"
        data-track-index="1" data-track-kind="graphics" data-width="1080" data-height="1920" style="position: absolute; inset: 0; z-index: 1"></div>''')
    # SFX placement: file peak lands one frame after its picture (sound.md §4)
    fr = 1 / 30
    sfx = [
        ("sfx-dalis", "assets/sfx/whoosh-cinematic.mp3", S["s2"] + fr - 0.94, 1.6, 1.6, 0.251, "S1→S2 dalış kesmesi"),
        ("sfx-sayac", "assets/sfx/pop.mp3", K("land") + fr - 0.12, 0, 0.72, 0.316, "sayaç 478'e oturur"),
        ("sfx-dalis2", "assets/sfx/whoosh-short.mp3", S["s4"] + fr - 0.16, 0, 0.575, 0.398, "S3→S4 dalış kesmesi"),
        ("sfx-geri", "assets/sfx/whoosh-short-ters.mp3", S["s7"] + 1.0 + fr - 0.40, 0, 0.575, 0.251, "telefon oturur (ters)"),
    ]
    # mono voice at about -14.7 LUFS opens up in the stereo mix: gain set from the measured draft renders
    # (v2 TR at 0.741 -> -14.3 LUFS, so +0.3 dB; EN voice is 0.1 dB quieter than TR) -> -14.0 LUFS integrated
    MIX = {"tr": 0.758, "en": 0.776}[LANG]   # v3 voice: TR -14.6, EN -14.8 LUFS before the mix
    vdur = r2(min(TOTAL, VOICE_LEN))
    aud = [f'''      <audio id="voice" class="clip" src="assets/{VOICE_FILE}" data-start="0" data-duration="{vdur}" data-track-index="3" data-volume="{MIX}"></audio>''']
    for sid, src, st, ms, du, vol, note in sfx:
        extra = f' data-media-start="{ms}" data-fade-out="0.5"' if ms else ""
        aud.append(f'''      <!-- {note} -->
      <audio id="{sid}" class="clip" src="{src}" data-start="{r2(st)}" data-duration="{du}"{extra} data-track-index="4" data-volume="{round(vol * MIX, 3)}"></audio>''')
    return f"""<!doctype html>
<html lang="{LANG}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1080, height=1920" />
    <title>{T["title"]}</title>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>
    <script src="assets/lib/data.js"></script>
    <script src="assets/lib/ayna.js"></script>
    <style>
      * {{ margin: 0; padding: 0; box-sizing: border-box; }}
      html, body {{ margin: 0; width: 1080px; height: 1920px; overflow: hidden; background: #2C3A31; }}
      #root {{ background: #2C3A31; }}
      #main-bg {{ position: absolute; inset: 0; background: #2C3A31; }}
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="{TOTAL}" data-fps="30" data-width="1080" data-height="1920">
      <div id="main-bg"></div>
{chr(10).join(hosts)}
      <div id="altyazi" data-composition-id="altyazi" data-composition-src="compositions/altyazi.html" data-start="0" data-duration="{TOTAL}"
        data-track-index="2" data-track-kind="captions" data-width="1080" data-height="1920" style="position: absolute; inset: 0; z-index: 10"></div>
{chr(10).join(aud)}
    </div>
    <script>
      window.__timelines = window.__timelines || {{}};
      window.__timelines["main"] = gsap.timeline({{ paused: true }});
    </script>
  </body>
</html>
"""


if __name__ == "__main__":
    out = ROOT / "compositions"
    out.mkdir(exist_ok=True)
    for name, fn in [("s1", s1), ("s2", s2), ("s3", s3), ("s4", s4), ("s5", s5), ("s6", s6), ("s7", s7), ("s8", s8)]:
        (out / f"{name}.html").write_text(fn())
    (out / "altyazi.html").write_text(captions())
    (ROOT / "index.html").write_text(index())
    print(json.dumps({"lang": LANG, "TOTAL": TOTAL, **{k: [S[k], DUR[k]] for k in ORDER}}))
