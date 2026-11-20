#!/usr/bin/env python3
"""Ayna Arkası 001: writes proje/index.html, proje/compositions/*.html from the real voice clock.

Ses saattir: every cut and reveal below is tied to a word of proje/assets/words.json.
Re-run after a new voice take:  python3 araclar/build.py
Hand edits made in Studio to the generated files are overwritten by a re-run.
"""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent / "proje"
W = json.load(open(ROOT / "assets/words.json"))
TOTAL = 37.5


def w(i):
    return W[i]


def r2(x):
    return round(x, 3)


# ---------------------------------------------------------------- scene clock (absolute seconds)
S = {}
S["s1"] = 0.0
S["s2"] = r2(w(22)["start"] - 0.06)          # cut just before "Yakından"
S["s3"] = r2(w(34)["start"] - 0.50)          # points start stamping, land on "nokta"
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

BASE_CSS = """
      #root { position: absolute; inset: 0; overflow: hidden; background: __BG__;
        --toz-pembe: #F2D3D1; --keten: #F8F4EC; --adacayi: #BCC5B0; --murekkep: #2C3A31; --koyu-adacayi: #4D6A55; }
      #root .title { position: absolute; left: 60px; top: 228px; width: 880px; margin: 0; z-index: 5;
        font-family: "Fraunces", Georgia, serif; font-weight: 600; font-size: 72px; line-height: 1.12;
        letter-spacing: -0.005em; font-variation-settings: "SOFT" 100, "WONK" 0, "opsz" 72; color: __INK__; }
      #root .title .ln { display: block; width: fit-content; white-space: nowrap; }
      #root .acc { color: var(--koyu-adacayi); }
      #root .src { position: absolute; left: 60px; width: 880px; top: 1106px; margin: 0; z-index: 5;
        font: 500 30px/1.3 "Be Vietnam Pro", sans-serif; color: __SRC__; }
      #root .src span { display: block; width: fit-content; }"""


def scene(sid, bg, ink, src, css, body, script, variables=None):
    var_attr = ""
    if variables:
        var_attr = " data-composition-variables='" + json.dumps(variables, ensure_ascii=False).replace("'", "&#39;") + "'"
    base = BASE_CSS.replace("__BG__", bg).replace("__INK__", ink).replace("__SRC__", src)
    return f"""<template id="{sid}-template">
  <div id="root" data-composition-id="{sid}" data-width="1080" data-height="1920"{var_attr}>
    <style>{FONTS}{base}{css}
    </style>
{body}
    <script>
      (function () {{
        const A = window.AYNA, C = A.C;
        const tl = gsap.timeline({{ paused: true }});
        const wipe = (sel, t, d) => tl.fromTo(sel, {{ clipPath: "inset(0% 100% 0% 0%)" }}, {{ clipPath: "inset(0% 0% 0% 0%)", duration: d || 0.333, ease: "power2.out", stagger: 0.1 }}, t);
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


# ---------------------------------------------------------------- S1 telefon / kanca
def s1():
    sid, D = "s1", DUR["s1"]
    t_calc = loc(sid, w(12)["start"] - 0.03)        # "Saniyede"
    t_strip = loc(sid, w(14)["start"] - 0.1)        # "kare"
    t_dive = r2(D - 0.77)
    css = """
      #root #s1-calc { top: 566px; font: 500 34px/1.3 "Be Vietnam Pro", sans-serif; color: var(--murekkep); }
      #s1-cam { position: absolute; inset: 0; z-index: 2; }
      #s1-phone { position: absolute; left: 382px; top: 616px; width: 316px; height: 520px; border-radius: 56px;
        background: var(--murekkep); box-shadow: 0 24px 48px rgba(44, 58, 49, 0.18); }
      #s1-power { position: absolute; left: 316px; top: 150px; width: 6px; height: 72px; border-radius: 0 3px 3px 0; background: var(--murekkep); }
      #s1-screen { position: absolute; left: 14px; top: 14px; width: 288px; height: 492px; border-radius: 42px; overflow: hidden; background: var(--adacayi); }
      #s1-status { position: absolute; left: 0; top: 0; width: 288px; height: 46px; background: var(--adacayi); z-index: 2; }
      #s1-cam-hole { position: absolute; left: 137px; top: 14px; width: 14px; height: 14px; border-radius: 50%; background: #0F1511; }
      #s1-ms { position: absolute; right: 26px; top: 6px; font: 700 30px/1.1 "Be Vietnam Pro", sans-serif; color: var(--murekkep); }
      #s1-shutter { position: absolute; left: 116px; top: 418px; width: 56px; height: 56px; border-radius: 50%; border: 5px solid var(--keten); box-sizing: border-box; z-index: 2; }
      #s1-strip { position: absolute; left: 60px; top: 1440px; width: 880px; height: 84px; display: flex; gap: 6px; z-index: 1; }
      #s1-strip i { flex: 1; height: 84px; border: 2px solid rgba(44, 58, 49, 0.4); border-radius: 6px; box-sizing: border-box; }"""
    cells = "".join(f'<i id="s1-c{i}"></i>' for i in range(30))
    body = "\n".join([
        clip("s1-title", 0, D, '<span class="ln" data-var-text="hook1">Canlı filtrenin</span>'
             '<span class="ln" data-var-text="hook2">bir kareyi bitirmek için</span>'
             '<span class="ln acc" data-var-text="hook3">33 milisaniyeden</span>'
             '<span class="ln" data-var-text="hook4">az vakti var.</span>', "title"),
        clip("s1-calc", t_calc, D - t_calc, '<span id="s1-calc-t" data-var-text="calc">Hesap: 1000 ÷ 30 ≈ 33 ms (ölçüm değil)</span>', "src"),
        '    <div id="s1-cam"><div id="s1-phone"><div id="s1-power"></div><div id="s1-screen"><div id="s1-face"></div>'
        '<div id="s1-status"><div id="s1-cam-hole"></div><div id="s1-ms">33 ms</div></div><div id="s1-shutter"></div></div></div></div>',
        f'    <div id="s1-strip" data-layout-ignore>{cells}</div>',
    ])
    script = f"""
        document.getElementById("s1-face").innerHTML = A.face({{ id: "s1f", viewBox: "30 52 340 580", w: 288, h: 492, bg: C.adacayi,
          dot: {{ px: 288 / 340, ring: C.murekkep }}, reticle: {{ px: 288 / 340 }} }});
        const ms = Math.round(window.AYNA_DATA.FRAME_MS);
        document.getElementById("s1-ms").textContent = ms + " ms";
        // dot sits at canvas (497.6, 826.5): every camera move is centred on it
        const O = "497.6px 826.5px";
        tl.fromTo("#s1-cam", {{ scale: 1 }}, {{ scale: 1.12, duration: {t_dive}, ease: "none", transformOrigin: O }}, 0);
        tl.to("#s1-cam", {{ scale: 7, duration: 0.77, ease: "power3.in", transformOrigin: O }}, {t_dive});
        // the hook leaves with the camera move (blur-out), so no text sits over the magnified screen
        tl.to(["#s1-title .ln", "#s1-calc-t", "#s1-strip"], {{ opacity: 0, filter: "blur(8px)", duration: 0.25, ease: "power2.in", stagger: 0.03 }}, {t_dive});
        tl.fromTo("#s1f-ret", {{ opacity: 0, scale: 1.6, svgOrigin: "150 284" }}, {{ opacity: 1, scale: 1, svgOrigin: "150 284", duration: 0.4, ease: "power3.out" }}, 2.0);
        wipe("#s1-calc-t", {t_calc});
        tl.fromTo("#s1-strip i", {{ scale: 0 }}, {{ scale: 1, duration: 0.133, ease: "back.out(1.4)", stagger: 0.0667 }}, {t_strip});
"""
    v = [var("hook1", "Kanca 1", "Canlı filtrenin"), var("hook2", "Kanca 2", "bir kareyi bitirmek için"),
         var("hook3", "Kanca 3 (vurgu)", "33 milisaniyeden"), var("hook4", "Kanca 4", "az vakti var."),
         var("calc", "Hesap satırı", "Hesap: 1000 ÷ 30 ≈ 33 ms (ölçüm değil)")]
    return scene(sid, "var(--keten)", "var(--murekkep)", "var(--murekkep)", css, body, script, v)


# ---------------------------------------------------------------- S2/S3 shared picture
PIC_VB = "-130.9 60 661.8 380"   # 1.632 px per face unit, 1080 x 620 at y 470
PIC_PX = 1080 / 661.8
PIC_CSS = """
      #__P__-pic { position: absolute; left: 0; top: 470px; width: 1080px; height: 620px; overflow: hidden; z-index: 1; }
      #__P__-cam { position: absolute; inset: 0; }"""


def s2():
    sid, D = "s2", DUR["s2"]
    t_title = loc(sid, w(22)["start"])
    css = PIC_CSS.replace("__P__", sid)
    body = "\n".join([
        clip("s2-title", t_title, D - t_title, '<span class="ln" data-var-text="t1">Her selfie</span><span class="ln" data-var-text="t2">piksellerden oluşur</span>', "title"),
        '    <div id="s2-pic"><div id="s2-cam"></div></div>',
    ])
    script = f"""
        document.getElementById("s2-cam").innerHTML = A.face({{ id: "s2f", viewBox: "{PIC_VB}", w: 1080, h: 620, bg: C.adacayi,
          pixel: {{ cell: 10, line: {2 / PIC_PX:.3f} }}, dot: {{ px: {PIC_PX:.4f}, ring: C.keten }} }});
        const O = "458.4px 365.6px";
        tl.fromTo("#s2-cam", {{ scale: 1.45 }}, {{ scale: 1, duration: 0.6, ease: "expo.out", transformOrigin: O }}, 0);
        wipe("#s2-title .ln", {t_title});
        tl.fromTo(["#s2f-content", "#s2f-pgr"], {{ opacity: 1 }}, {{ opacity: 0.35, duration: 0.67, ease: "power2.inOut" }}, {r2(D - 0.67)});
"""
    v = [var("t1", "Başlık 1", "Her selfie"), var("t2", "Başlık 2", "piksellerden oluşur")]
    return scene(sid, "var(--murekkep)", "var(--keten)", "var(--adacayi)", css, body, script, v)


def s3():
    sid, D = "s3", DUR["s3"]
    t_land = loc(sid, w(38)["start"])                 # "nokta": counter lands on 478
    css = PIC_CSS.replace("__P__", sid) + """
      #root #s3-head { font-variation-settings: "SOFT" 100, "WONK" 0, "opsz" 144; line-height: 1; top: 220px; }
      #s3-n { font-size: 168px; color: var(--toz-pembe); font-variant-numeric: tabular-nums; letter-spacing: -0.01em; }
      #s3-nokta { font-size: 72px; color: var(--keten); font-variation-settings: "SOFT" 100, "WONK" 0, "opsz" 72; }
      #root #s3-sub { top: 404px; font: 500 34px/1.3 "Be Vietnam Pro", sans-serif; color: var(--keten); }"""
    body = "\n".join([
        clip("s3-head", 0, D, '<span class="ln"><span id="s3-n">0</span> <span id="s3-nokta" data-var-text="unit">nokta</span></span>', "title"),
        clip("s3-sub", 0.4, D - 0.4, '<span id="s3-sub-t" data-var-text="sub">468 yüz + 10 iris noktası</span>', "src"),
        clip("s3-src", 0, D, '<span data-var-text="src">Kaynak: Google MediaPipe Face Landmarker</span>', "src"),
        '    <div id="s3-pic"><div id="s3-cam"></div></div>',
    ])
    script = f"""
        const DATA = window.AYNA_DATA;
        document.getElementById("s3-sub-t").textContent = DATA.FACE + " yüz + " + DATA.IRIS + " iris noktası";
        document.getElementById("s3-cam").innerHTML = A.face({{ id: "s3f", viewBox: "{PIC_VB}", w: 1080, h: 620, bg: C.adacayi,
          pixel: {{ cell: 10, line: {2 / PIC_PX:.3f} }}, dot: {{ px: {PIC_PX:.4f}, ring: C.keten }},
          points: {{ r: {4 / PIC_PX:.3f}, fill: C.toz }} }});
        document.getElementById("s3f-content").setAttribute("opacity", "0.35");
        document.getElementById("s3f-pgr").setAttribute("opacity", "0.35");
        const pts = document.querySelectorAll("#s3f-pts circle"), N = pts.length, LAND = {t_land}, STAMP = 0.133;
        pts.forEach((c, i) => tl.fromTo(c, {{ scale: 0 }}, {{ scale: 1, duration: STAMP, ease: "back.out(1.4)", transformOrigin: "50% 50%" }}, ((LAND - STAMP) * i) / (N - 1)));
        const cnt = {{ n: 0 }}, nEl = document.getElementById("s3-n");
        tl.fromTo(cnt, {{ n: 0 }}, {{ n: N, duration: LAND, ease: "none", onUpdate: () => (nEl.textContent = Math.round(cnt.n)) }}, 0);
        wipe("#s3-sub-t", 0.4);
        tl.to("#s3-cam", {{ scale: 4, duration: 0.6, ease: "power3.in", transformOrigin: "458.4px 365.6px" }}, {r2(D - 0.6)});
"""
    v = [var("unit", "Sayaç birimi", "nokta"), var("sub", "Alt başlık", "468 yüz + 10 iris noktası"),
         var("src", "Kaynak", "Kaynak: Google MediaPipe Face Landmarker")]
    return scene(sid, "var(--murekkep)", "var(--keten)", "var(--adacayi)", css, body, script, v)


# ---------------------------------------------------------------- S4–S6 deri yakını (box y 400–1060)
BOX_CSS = """
      #__P__-box { position: absolute; left: 0; top: 400px; width: 1080px; height: 660px; overflow: hidden; z-index: 1; }"""
VB4 = (80, 194, 176, 107.56)       # 6.136 px/u
VB5 = (43.3, 210.4, 293.3, 179.3)  # 3.68 px/u: eyes, cheeks, jaw
VB6 = (-111, 60, 622, 380)         # whole face


def vbs(v):
    return "{ x: %s, y: %s, w: %s, h: %s }" % v


def s4():
    sid, D = "s4", DUR["s4"]
    t_doku = loc(sid, w(49)["start"])
    sweep0, sweep1 = loc(sid, w(42)["start"]), loc(sid, w(52)["end"])   # "gibi" .. "çiller"
    px = 1080 / VB4[2]
    # settle: start 1.3x closer, carrier dot fixed on screen
    fx, fy = (150 - VB4[0]) / VB4[2], (284 - VB4[1]) / VB4[3]
    w0, h0 = VB4[2] / 1.3, VB4[3] / 1.3
    VB4a = (round(150 - fx * w0, 3), round(284 - fy * h0, 3), round(w0, 3), round(h0, 3))
    css = BOX_CSS.replace("__P__", sid) + """
      #s4-win { position: absolute; left: 60px; top: 676px; width: 168px; height: 168px; z-index: 3; }
      #root .lab { position: absolute; top: 1064px; margin: 0; z-index: 5; font: 700 32px/1.25 "Be Vietnam Pro", sans-serif; color: var(--murekkep); }
      #s4-labL { left: 60px; }
      #s4-labR { left: 540px; width: 400px; text-align: right; }
      #root #s4-src { top: 1110px; }"""
    body = "\n".join([
        clip("s4-title", 0, D, '<span class="ln" data-var-text="t1">Yumuşatma</span><span class="ln" data-var-text="t2">bilateral filtre</span>', "title"),
        '    <div id="s4-box"></div>',
        '    <svg id="s4-win" viewBox="0 0 168 168" data-layout-ignore><rect x="2" y="2" width="164" height="164" rx="12" fill="none" stroke="#2C3A31" stroke-width="4" stroke-dasharray="14 10"/></svg>',
        clip("s4-labL", t_doku, D - t_doku, '<span data-var-text="labL">← doku silindi</span>', "lab"),
        clip("s4-labR", t_doku + 0.1, D - t_doku - 0.1, '<span data-var-text="labR">doku duruyor →</span>', "lab"),
        clip("s4-src", 0, D, '<span data-var-text="src">Kaynak: Tomasi &amp; Manduchi 1998</span>', "src"),
    ])
    script = f"""
        document.getElementById("s4-box").innerHTML = A.face({{ id: "s4f", viewBox: "{' '.join(map(str, VB4a))}", w: 1080, h: 660, bg: C.toz,
          lineW: 3, dot: {{ px: {px:.4f}, ring: C.murekkep }} }});
        const cam = {vbs(VB4a)};
        A.cam("s4f", cam, 1080);
        tl.fromTo(cam, {vbs(VB4a)}, {{ ...{vbs(VB4)}, duration: 0.5, ease: "expo.out", onUpdate: () => A.cam("s4f", cam, 1080) }}, 0);
        wipe("#s4-title .ln", 0.05);
        // smoothing window: sweeps left to right; texture is gone left of its centre, edges stay sharp
        const sw = {{ cx: 144 }};
        const upd = () => {{ gsap.set("#s4-win", {{ x: sw.cx - 144 }}); A.apply("s4f", {{ texX: {VB4[0]} + sw.cx / {px:.4f} }}); }};
        tl.fromTo("#s4-win", {{ opacity: 0 }}, {{ opacity: 1, duration: 0.25, ease: "power2.out" }}, {r2(sweep0 - 0.25)});
        tl.fromTo(sw, {{ cx: 144 }}, {{ cx: 856, duration: {r2(sweep1 - sweep0)}, ease: "none", onUpdate: upd, onStart: upd }}, {sweep0});
        tl.to("#s4-win", {{ opacity: 0, duration: 0.2, ease: "power2.in" }}, {r2(sweep1 + 0.05)});
        const tx = {{ v: 1 }};
        tl.fromTo(tx, {{ v: 1 }}, {{ v: 0, duration: 0.35, ease: "power2.inOut", onUpdate: () => A.apply("s4f", {{ tex: tx.v }}) }}, {r2(sweep1 + 0.05)});
        wipe("#s4-labL span", {t_doku}, 0.25);
        wipe("#s4-labR span", {r2(t_doku + 0.1)}, 0.25);
"""
    v = [var("t1", "Başlık 1", "Yumuşatma"), var("t2", "Başlık 2", "bilateral filtre"),
         var("labL", "Etiket sol", "← doku silindi"), var("labR", "Etiket sağ", "doku duruyor →"),
         var("src", "Kaynak", "Kaynak: Tomasi & Manduchi 1998")]
    return scene(sid, "var(--toz-pembe)", "var(--murekkep)", "var(--murekkep)", css, body, script, v)


def s5():
    sid, D = "s5", DUR["s5"]
    t_pts = loc(sid, w(56)["start"])                   # "noktalar"
    t_grid = loc(sid, w(58)["start"] - 0.3)            # "görüntü esner"
    t_eye = loc(sid, w(61)["start"] - 0.3)             # "büyür"
    t_jaw = loc(sid, w(63)["start"] - 0.25)            # "daralır"
    px5 = 1080 / VB5[2]
    css = BOX_CSS.replace("__P__", sid)
    body = "\n".join([
        clip("s5-title", 0.13, D - 0.13, '<span class="ln" data-var-text="t1">Esnetme (warp)</span>', "title"),
        '    <div id="s5-box"></div>',
        clip("s5-src", 0.13, D - 0.13, '<span data-var-text="src">Kaynak: Schaefer vd. 2006 · US 10152778</span>', "src"),
    ])
    script = f"""
        document.getElementById("s5-box").innerHTML = A.face({{ id: "s5f", viewBox: "{' '.join(map(str, VB4))}", w: 1080, h: 660, bg: C.toz,
          lineW: 3, dot: {{ px: {1080 / VB4[2]:.4f}, ring: C.murekkep }}, grid: true, arrows: {{ px: {px5:.4f} }},
          points: {{ r: {3 / px5:.3f}, fill: C.murekkep }} }});
        A.apply("s5f", {{ tex: 0 }});
        const cam = {vbs(VB4)};
        A.cam("s5f", cam, 1080);
        tl.fromTo(cam, {vbs(VB4)}, {{ ...{vbs(VB5)}, duration: 0.8, ease: "power3.out", onUpdate: () => A.cam("s5f", cam, 1080) }}, 0);
        wipe("#s5-title .ln", 0.13);
        const pts = document.querySelectorAll("#s5f-pts circle"), N = pts.length;
        pts.forEach((c, i) => tl.fromTo(c, {{ scale: 0 }}, {{ scale: 1, duration: 0.133, ease: "back.out(1.4)", transformOrigin: "50% 50%" }}, {t_pts} + (0.4 * i) / (N - 1)));
        tl.fromTo("#s5f-gcr", {{ attr: {{ height: 0 }} }}, {{ attr: {{ height: 190 }}, duration: 0.6, ease: "power2.inOut" }}, {t_grid});
        tl.fromTo("#s5f-arrows", {{ opacity: 0 }}, {{ opacity: 1, duration: 0.15, ease: "power2.out" }}, {t_eye});
        const k = {{ eye: 0, jaw: 0 }};
        tl.fromTo(k, {{ eye: 0 }}, {{ eye: 1, duration: 0.6, ease: "power2.inOut", onUpdate: () => A.apply("s5f", {{ eye: k.eye }}) }}, {t_eye});
        tl.fromTo(k, {{ jaw: 0 }}, {{ jaw: 1, duration: 0.6, ease: "power2.inOut", onUpdate: () => A.apply("s5f", {{ jaw: k.jaw }}) }}, {t_jaw});
"""
    v = [var("t1", "Başlık", "Esnetme (warp)"), var("src", "Kaynak", "Kaynak: Schaefer vd. 2006 · US 10152778")]
    return scene(sid, "var(--toz-pembe)", "var(--murekkep)", "var(--murekkep)", css, body, script, v)


def s6():
    sid, D = "s6", DUR["s6"]
    t_isik = loc(sid, w(66)["start"])
    t_gol = loc(sid, w(68)["start"])
    px5 = 1080 / VB5[2]
    css = BOX_CSS.replace("__P__", sid)
    body = "\n".join([
        clip("s6-title", t_isik, D - t_isik, '<span class="ln" data-var-text="t1">Işık eklenir</span>', "title"),
        '    <div id="s6-box"></div>',
        clip("s6-src", t_isik, D - t_isik, '<span data-var-text="src">Kaynak: US 10152778</span>', "src"),
    ])
    script = f"""
        document.getElementById("s6-box").innerHTML = A.face({{ id: "s6f", viewBox: "{' '.join(map(str, VB5))}", w: 1080, h: 660, bg: C.toz,
          lineW: 3, dot: {{ px: {px5:.4f}, ring: C.murekkep }}, grid: true, arrows: {{ px: {px5:.4f} }},
          points: {{ r: {3 / px5:.3f}, fill: C.murekkep }} }});
        A.apply("s6f", {{ tex: 0, eye: 1, jaw: 1 }});
        document.getElementById("s6f-gcr").setAttribute("height", "190");
        const cam = {vbs(VB5)};
        A.cam("s6f", cam, 1080);
        tl.fromTo(["#s6f-pts", "#s6f-grid", "#s6f-arrows"], {{ opacity: 1 }}, {{ opacity: 0, duration: 0.3, ease: "power2.in" }}, 0);
        tl.fromTo(cam, {vbs(VB5)}, {{ ...{vbs(VB6)}, duration: 0.7, ease: "power3.out", onUpdate: () => A.cam("s6f", cam, 1080) }}, 0);
        wipe("#s6-title .ln", {t_isik});
        const L = {{ hi: 0, sh: 0.3 }};
        tl.fromTo(L, {{ hi: 0 }}, {{ hi: 0.35, duration: 0.6, ease: "power2.inOut", onUpdate: () => A.apply("s6f", {{ hi: L.hi }}) }}, {t_isik});
        tl.fromTo(L, {{ sh: 0.3 }}, {{ sh: 0.08, duration: 0.6, ease: "power2.inOut", onUpdate: () => A.apply("s6f", {{ sh: L.sh }}) }}, {t_gol});
"""
    v = [var("t1", "Başlık", "Işık eklenir"), var("src", "Kaynak", "Kaynak: US 10152778")]
    return scene(sid, "var(--toz-pembe)", "var(--murekkep)", "var(--murekkep)", css, body, script, v)


# ---------------------------------------------------------------- S7/S8 phone again (keten)
def full_vb(vb, box_top, box_left=0, box_w=1080):
    x, y, ww, hh = vb
    s = box_w / ww
    return (round(x - box_left / s, 3), round(y - box_top / s, 3), round(1080 / s, 3), round(1920 / s, 3))


VB7a = full_vb(VB6, 400)
VB7b = full_vb((30, 52, 340, 580), 434, 396, 288)
CLIP_A = "inset(400px 0px 860px 0px round 0px)"
CLIP_B = "inset(434px 396px 994px 396px round 42px)"
PHONE_CSS = """
      #__P__-svgwrap { position: absolute; inset: 0; z-index: 2; }
      #__P__-phone { position: absolute; left: 382px; top: 420px; width: 316px; height: 520px; border-radius: 56px; z-index: 1;
        background: var(--murekkep); box-shadow: 0 24px 48px rgba(44, 58, 49, 0.18); }
      #__P__-power { position: absolute; left: 316px; top: 150px; width: 6px; height: 72px; border-radius: 0 3px 3px 0; background: var(--murekkep); }
      #__P__-ui { position: absolute; left: 396px; top: 434px; width: 288px; height: 492px; z-index: 3; }
      #__P__-status { position: absolute; left: 0; top: 0; width: 288px; height: 46px; border-radius: 42px 42px 0 0; background: var(--adacayi); }
      #__P__-hole { position: absolute; left: 137px; top: 14px; width: 14px; height: 14px; border-radius: 50%; background: #0F1511; }
      #__P__-ms { position: absolute; right: 26px; top: 6px; font: 700 30px/1.1 "Be Vietnam Pro", sans-serif; color: var(--murekkep); }
      #__P__-shutter { position: absolute; left: 116px; top: 418px; width: 56px; height: 56px; border-radius: 50%; border: 5px solid var(--keten); box-sizing: border-box; }
      #__P__-strip { position: absolute; left: 60px; top: 1440px; width: 880px; height: 84px; display: flex; gap: 6px; z-index: 1; }
      #__P__-strip i { flex: 1; height: 84px; border: 2px solid rgba(44, 58, 49, 0.4); border-radius: 6px; box-sizing: border-box; }
      #root .lab { position: absolute; left: 60px; width: 880px; top: 958px; margin: 0; z-index: 5; text-align: center;
        font: 700 32px/1.25 "Be Vietnam Pro", sans-serif; color: var(--murekkep); }
      #root .lab span { display: inline-block; }"""


def phone_markup(p):
    cells = "".join(f'<i id="{p}-c{i}"></i>' for i in range(30))
    return (f'    <div id="{p}-phone"><div id="{p}-power"></div></div>\n'
            f'    <div id="{p}-svgwrap"></div>\n'
            f'    <div id="{p}-ui"><div id="{p}-status"><div id="{p}-hole"></div><div id="{p}-ms">33 ms</div></div><div id="{p}-shutter"></div></div>\n'
            f'    <div id="{p}-strip" data-layout-ignore>{cells}</div>')


def s7():
    sid, D = "s7", DUR["s7"]
    t_kez = loc(sid, w(72)["start"])                   # "otuz kez": the 30 cells fill
    t_title = loc(sid, w(71)["start"])                 # "saniyede"
    land = 1.0
    css = PHONE_CSS.replace("__P__", sid)
    body = "\n".join([
        clip("s7-title", t_title, D - t_title, '<span class="ln" data-var-text="t1">Saniyede 30 kez</span>', "title"),
        phone_markup(sid),
    ])
    script = f"""
        document.getElementById("s7-svgwrap").innerHTML = A.face({{ id: "s7f", viewBox: "{' '.join(map(str, VB7a))}", w: 1080, h: 1920, bg: C.toz,
          dot: {{ px: 1, ring: C.murekkep }} }});
        A.apply("s7f", {{ tex: 0, eye: 1, jaw: 1, hi: 0.35, sh: 0.08 }});
        const svg = document.getElementById("s7f-svg");
        const cam = {vbs(VB7a)};
        A.cam("s7f", cam, 1080);
        // the toz pembe window becomes the phone screen; the phone body forms around it as it lands
        tl.fromTo(cam, {vbs(VB7a)}, {{ ...{vbs(VB7b)}, duration: {land}, ease: "power3.out", onUpdate: () => A.cam("s7f", cam, 1080) }}, 0);
        tl.fromTo(svg, {{ clipPath: "{CLIP_A}" }}, {{ clipPath: "{CLIP_B}", duration: {land}, ease: "power3.out" }}, 0);
        tl.fromTo("#s7f-bg", {{ attr: {{ fill: C.toz }} }}, {{ attr: {{ fill: C.adacayi }}, duration: {land}, ease: "power2.inOut" }}, 0);
        tl.fromTo("#s7-phone", {{ opacity: 0, scale: 1.12 }}, {{ opacity: 1, scale: 1, duration: 0.45, ease: "power3.out", transformOrigin: "50% 50%" }}, 0.5);
        tl.fromTo("#s7-ui", {{ opacity: 0 }}, {{ opacity: 1, duration: 0.2, ease: "power2.out" }}, {land - 0.15});
        wipe("#s7-title .ln", {t_title});
        tl.fromTo("#s7-strip i", {{ scale: 0 }}, {{ scale: 1, duration: 0.133, ease: "back.out(1.4)", stagger: 0.0333 }}, {land - 0.2});
        for (let i = 0; i < 30; i++) tl.fromTo("#s7-c" + i, {{ backgroundColor: "rgba(188,197,176,0)" }}, {{ backgroundColor: "rgba(188,197,176,1)", duration: 0.033, ease: "none" }}, {t_kez} + i / 30);
        document.getElementById("s7-ms").textContent = Math.round(window.AYNA_DATA.FRAME_MS) + " ms";
"""
    v = [var("t1", "Başlık", "Saniyede 30 kez")]
    return scene(sid, "var(--keten)", "var(--murekkep)", "var(--murekkep)", css, body, script, v)


def s8():
    sid, D = "s8", DUR["s8"]
    t_hes = loc(sid, w(80)["start"])                   # "hesaplanmış"
    t_ger = loc(sid, w(83)["start"])                   # "Gerçek"
    t_doku = loc(sid, w(85)["start"])                  # "doku": label becomes "Filtresiz"
    step = 0.267                                       # 8 frames per rewind step
    r0 = r2(t_doku - 3 * step)
    t_end = r2(loc(sid, w(88)["end"]) - 0.55)          # end card: wordmark wipes in under the last words
    t_more = r2(D - 2.0)
    css = PHONE_CSS.replace("__P__", sid) + """
      #s8-strip i { background: var(--adacayi); }
      #s8-mark { position: absolute; left: 280px; top: 1110px; width: 520px; height: 105px; z-index: 5; }
      #s8-mark img { display: block; width: 520px; height: 105px; }
      #s8-more { position: absolute; left: 60px; width: 880px; top: 1256px; margin: 0; z-index: 5; text-align: center;
        font: 500 30px/1.3 "Be Vietnam Pro", sans-serif; color: var(--murekkep); }
      #s8-more span { display: inline-block; }
      #s8-free { color: var(--koyu-adacayi); }"""
    body = "\n".join([
        clip("s8-titleA", 0, t_ger, '<span class="ln" data-var-text="tA">Saniyede 30 kez</span>', "title"),
        clip("s8-titleB", t_ger, D - t_ger, '<span class="ln"><span data-var-text="tB1">Gerçek ciltte</span> <span class="acc" data-var-text="tB2">doku</span></span>'
             '<span class="ln" data-var-text="tB3">vardır, olmalı da.</span>', "title"),
        phone_markup(sid),
        clip("s8-hes", t_hes, t_doku - t_hes, '<span id="s8-hes-t" data-var-text="labA">Hesaplanmış</span>', "lab"),
        clip("s8-filt", t_doku, D - t_doku, '<span id="s8-free" data-var-text="labB">Filtresiz</span>', "lab"),
        clip("s8-mark", t_end, D - t_end, '<img id="s8-mark-img" src="assets/brand/wordmark.svg" alt="Ayna Arkası" />', "", " data-beat=\"bitis\""),
        clip("s8-more", t_more, D - t_more, '<span id="s8-more-t" data-var-text="more">Kaynaklar açıklamada</span>'),
    ])
    script = f"""
        document.getElementById("s8-svgwrap").innerHTML = A.face({{ id: "s8f", viewBox: "{' '.join(map(str, VB7b))}", w: 1080, h: 1920, bg: C.adacayi,
          dot: {{ px: 1, ring: C.murekkep }} }});
        const svg = document.getElementById("s8f-svg");
        svg.style.clipPath = "{CLIP_B}";
        A.cam("s8f", {vbs(VB7b)}, 1080);
        const st = {{ hi: 0.35, sh: 0.08, k: 1, tex: 0 }};
        const upd = () => A.apply("s8f", {{ hi: st.hi, sh: st.sh, eye: st.k, jaw: st.k, tex: st.tex }});
        upd();
        document.getElementById("s8-ms").textContent = Math.round(window.AYNA_DATA.FRAME_MS) + " ms";
        wipe("#s8-hes-t", {t_hes}, 0.25);
        // rewind, 8 frames a step: light off, shape back, texture back; lands on "doku"
        tl.fromTo(st, {{ hi: 0.35, sh: 0.08 }}, {{ hi: 0, sh: 0.3, duration: {step}, ease: "power2.inOut", onUpdate: upd }}, {r0});
        tl.fromTo(st, {{ k: 1 }}, {{ k: 0, duration: {step}, ease: "power2.inOut", onUpdate: upd }}, {r2(r0 + step)});
        tl.fromTo(st, {{ tex: 0 }}, {{ tex: 1, duration: {step}, ease: "power2.inOut", onUpdate: upd }}, {r2(r0 + 2 * step)});
        wipe("#s8-titleB .ln", {t_ger});
        tl.fromTo("#s8-mark-img", {{ clipPath: "inset(0% 100% 0% 0%)" }}, {{ clipPath: "inset(0% 0% 0% 0%)", duration: 0.6, ease: "power2.out" }}, {t_end});
        wipe("#s8-more-t", {t_more}, 0.3);
"""
    v = [var("tA", "Başlık A", "Saniyede 30 kez"), var("tB1", "Kapanış 1", "Gerçek ciltte"), var("tB2", "Kapanış vurgu", "doku"),
         var("tB3", "Kapanış 2", "vardır, olmalı da."), var("labA", "Etiket filtreli", "Hesaplanmış"),
         var("labB", "Etiket filtresiz", "Filtresiz"), var("more", "Bitiş satırı", "Kaynaklar açıklamada")]
    return scene(sid, "var(--keten)", "var(--murekkep)", "var(--murekkep)", css, body, script, v)


# ---------------------------------------------------------------- captions (brand pill, 2–4 words)
# (display text, [word ids that light it]) per group; numbers as digits, "33 milisaniye" / "478 nokta" never split
GROUPS = [
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


def captions():
    rows, tw = [], []
    spans = []
    n = 0
    for gi, g in enumerate(GROUPS):
        first = W[g[0][1][0]]["start"]
        last = W[g[-1][1][-1]]["end"]
        start = first - 0.05
        if gi + 1 < len(GROUPS):
            nxt = W[GROUPS[gi + 1][0][1][0]]["start"] - 0.05
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
      #root .grp {{ position: absolute; left: 60px; width: 880px; top: 1150px; height: 170px; display: flex; align-items: flex-end; justify-content: center; text-align: center; }}
      #root .pill {{ display: inline-block; white-space: nowrap; font: 700 72px/1.18 "Be Vietnam Pro", sans-serif; color: #F8F4EC;
        background: rgba(44, 58, 49, 0.92); border-radius: 24px; padding: 14px 30px 18px; transform-origin: 50% 100%; }}
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
        ("sfx-sayac", "assets/sfx/pop.mp3", W[38]["start"] - S["s3"] + S["s3"] + fr - 0.12, 0, 0.72, 0.316, "sayaç 478'e oturur"),
        ("sfx-dalis2", "assets/sfx/whoosh-short.mp3", S["s4"] + fr - 0.16, 0, 0.575, 0.398, "S3→S4 dalış kesmesi"),
        ("sfx-geri", "assets/sfx/whoosh-short-ters.mp3", S["s7"] + 1.0 + fr - 0.40, 0, 0.575, 0.251, "telefon oturur (ters)"),
    ]
    # voice.wav is -14 LUFS mono; the stereo mix measured -11.4 LUFS at gain 1, so every clip is trimmed by 2.6 dB
    MIX = 0.741
    aud = [f'''      <audio id="voice" class="clip" src="assets/voice.wav" data-start="0" data-duration="{TOTAL}" data-track-index="3" data-volume="{MIX}"></audio>''']
    for sid, src, st, ms, du, vol, note in sfx:
        extra = f' data-media-start="{ms}" data-fade-out="0.5"' if ms else ""
        aud.append(f'''      <!-- {note} -->
      <audio id="{sid}" class="clip" src="{src}" data-start="{r2(st)}" data-duration="{du}"{extra} data-track-index="4" data-volume="{round(vol * MIX, 3)}"></audio>''')
    return f"""<!doctype html>
<html lang="tr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1080, height=1920" />
    <title>Ayna Arkası 001 · Bir selfie'nin 33 milisaniyesi</title>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>
    <script src="assets/lib/data.js"></script>
    <script src="assets/lib/ayna.js"></script>
    <style>
      * {{ margin: 0; padding: 0; box-sizing: border-box; }}
      html, body {{ margin: 0; width: 1080px; height: 1920px; overflow: hidden; background: #F8F4EC; }}
      #main-bg {{ position: absolute; inset: 0; background: #F8F4EC; }}
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
    print(json.dumps({k: [S[k], DUR[k]] for k in ORDER}))
