"""Ayna Arkası final kimlik: SVG'leri yazar, PNG'ler için HTML sayfaları üretir.
Çalıştırma (brand/final/src içinde):  python3 build.py && node render.js"""
import json, os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from outline import path
from contrast import ratio, over

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.dirname(HERE)                      # brand/final
PAGES = os.path.join(HERE, 'build'); os.makedirs(PAGES, exist_ok=True)
FONTS = os.path.join(HERE, '..', '..', 'fonts')

TOZ, KETEN, ADACAYI, MUREKKEP, KOYU = '#F2D3D1', '#F8F4EC', '#BCC5B0', '#2C3A31', '#4D6A55'

# --- Kelime logosu: Fraunces wght 600 · opsz 144 · SOFT 100 · WONK 0 -------------------------
WM_AXES = {'wght': 600, 'opsz': 144, 'SOFT': 100, 'WONK': 0}
WM_TRACK = -12                                   # font birimi (UPM 2000) = -0.006em
WM_KERN = {                                      # elle ayarlanmış çiftler (font birimi)
    'Ay': -10,   # A'nın sağ çaprazı ile y kolu: optik olarak "na" ile eşit hava
    'yn': 30,    # y'nin sağ kol serifi n'nin bayrağına değiyordu, açıldı
    'a ': -25, ' A': -25,                        # kelime arası display ölçüsüne indirildi
    'Ar': 5,     # iki taban serifi arasında nefes
    'rk': -35,   # r kolunun altındaki boşluk büyüktü, k gövdesine yaklaştırıldı
    'ka': 25,    # k bacağının ayak serifi a'nın göbeğine değiyordu
    'as': 15,    # a kuyruğu ile s arasında açık hava
    'sı': -10,   # noktasız ı dar; s ile ı arası diğer yuvarlak-düz çiftlerle eşitlendi
}
# Avatar/filigran "A": küçük gösterim için opsz 72 (ince çizgiler 48 px'te kaybolmaz), wght 640
AV_AXES = {'wght': 640, 'opsz': 72, 'SOFT': 100, 'WONK': 0}
AV_HEIGHT = 0.62                                 # A yüksekliği / daire çapı
AV_DY = -0.0075                                  # optik merkez: üçgen kütlesi için hafif yukarı

SLOGAN = 'Aynanın arkasına bak.'
BVP_M = os.path.join(FONTS, 'BeVietnamPro-Medium.ttf')

wm_d, wm_b, _, _ = path('Ayna Arkası', WM_AXES, WM_KERN, WM_TRACK)
a_d, a_b, _, _ = path('A', AV_AXES)
sl_d, sl_b, _, _ = path(SLOGAN, {}, None, 10, font_path=BVP_M)   # +10/1000 = +0.01em

def fmt(v): return ('%.3f' % v).rstrip('0').rstrip('.')

def place(d, b, fill, x=None, y=None, w=None, h=None, cx=None, cy=None, baseline=None):
    """Bir path'i ölçekleyip yerleştirir. w ya da h ile ölçek; cx/cy ile ortalama ya da x/baseline."""
    bw, bh = b[2] - b[0], b[3] - b[1]
    s = w / bw if w else h / bh
    tx = (cx - (b[0] + bw / 2) * s) if cx is not None else (x - b[0] * s)
    if baseline is not None: ty = baseline
    elif cy is not None: ty = cy - (b[1] + bh / 2) * s
    else: ty = y - b[1] * s
    box = (tx + b[0] * s, ty + b[1] * s, tx + b[2] * s, ty + b[3] * s)
    return f'<path fill="{fill}" transform="translate({fmt(tx)} {fmt(ty)}) scale({fmt(s)})" d="{d}"/>', box, s

def svg(w, h, body, bg=None, title=''):
    r = f'<rect width="{w}" height="{h}" fill="{bg}"/>' if bg else ''
    t = f'<title>{title}</title>' if title else ''
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {fmt(w)} {fmt(h)}" '
            f'width="{fmt(w)}" height="{fmt(h)}">{t}{r}{body}</svg>')

def write(name, text):
    with open(os.path.join(OUT, name), 'w') as f: f.write(text)

def disc(size, ground, ink):
    """Daire içinde A (avatar/filigran)."""
    r = size / 2
    p, _, _ = place(a_d, a_b, ink, h=size * AV_HEIGHT, cx=r, cy=r + size * AV_DY)
    return f'<circle cx="{fmt(r)}" cy="{fmt(r)}" r="{fmt(r)}" fill="{ground}"/>' + p

checks = []
def check(label, fg, bg, need):
    r = ratio(fg, bg); checks.append((label, fg, bg, r, need))
    assert r >= need, f'{label}: {fg}/{bg} {r:.2f} < {need}'

# --- 1. Kelime logosu ------------------------------------------------------------------------
WM_W = 1000                                      # SVG genişliği (px); yükseklik orana göre
bw, bh = wm_b[2] - wm_b[0], wm_b[3] - wm_b[1]
WM_H = WM_W * bh / bw
for name, ink in (('wordmark.svg', MUREKKEP), ('wordmark-light.svg', KETEN)):
    p, _, _ = place(wm_d, wm_b, ink, x=0, y=0, w=WM_W)
    write(name, svg(WM_W, WM_H, p, title='Ayna Arkası'))
check('Logo (koyu) / keten', MUREKKEP, KETEN, 4.5)
check('Logo (koyu) / toz pembe', MUREKKEP, TOZ, 4.5)
check('Logo (koyu) / adaçayı', MUREKKEP, ADACAYI, 4.5)
check('Logo (açık) / mürekkep', KETEN, MUREKKEP, 4.5)
check('Logo (açık) / koyu adaçayı', KETEN, KOYU, 4.5)
LIGHT_ON_ADACAYI = ratio(KETEN, ADACAYI)        # 1.63: yasak, adaçayında koyu logo kullanılır

# --- 2. Avatar ---------------------------------------------------------------------------------
write('avatar.svg', svg(800, 800, disc(800, TOZ, MUREKKEP), title='Ayna Arkası avatar'))
check('Avatar A / toz pembe', MUREKKEP, TOZ, 4.5)

# --- 4. Filigran -------------------------------------------------------------------------------
write('watermark.svg', svg(150, 150, disc(150, MUREKKEP, TOZ), title='Ayna Arkası filigran'))
check('Filigran A / mürekkep', TOZ, MUREKKEP, 4.5)

# --- 5. Yatay lockup (2000×600) -------------------------------------------------------------
def lockup(ground, ink, rule):
    W, H = 2000, 600
    wm_w = 1000
    s = wm_w / bw
    cap = 1400 * s                               # Fraunces büyük harf yüksekliği (px)
    sl_h_px = 38                                 # slogan büyük harf yüksekliği → ~51 px punto
    sl_s = sl_h_px / 740
    sl_w = (sl_b[2] - sl_b[0]) * sl_s
    gap = 76
    total = wm_w + gap * 2 + 2 + sl_w
    x0 = (W - total) / 2
    base = H / 2 + cap / 2                       # büyük harfler optik olarak dikey ortada
    p1, box, _ = place(wm_d, wm_b, ink, x=x0, baseline=base, w=wm_w)
    rx = x0 + wm_w + gap
    r = f'<rect x="{fmt(rx)}" y="{fmt(base - cap)}" width="2" height="{fmt(cap)}" fill="{rule}"/>'
    # slogan x-yüksekliği ortası = büyük harf ortası
    sl_base = base - cap / 2 + sl_h_px / 2
    p2, _, _ = place(sl_d, sl_b, ink, x=rx + 2 + gap, baseline=sl_base, h=(sl_b[3] - sl_b[1]) * sl_s)
    return W, H, p1 + r + p2
for gname, g, rule in (('keten', KETEN, KOYU), ('toz', TOZ, KOYU)):
    W, H, body = lockup(g, MUREKKEP, rule)
    if gname == 'keten':
        write('lockup-horizontal.svg', svg(W, H, body, title='Ayna Arkası yatay lockup'))
    write(f'lockup-horizontal-{gname}.svg', svg(W, H, body, bg=g, title='Ayna Arkası yatay lockup'))
check('Slogan / keten', MUREKKEP, KETEN, 4.5)
check('Slogan / toz pembe', MUREKKEP, TOZ, 4.5)
check('Ayırıcı çizgi / keten', KOYU, KETEN, 3)
check('Ayırıcı çizgi / toz pembe', KOYU, TOZ, 3)

# --- 3. Banner 2560×1440 (güvenli alan 1546×423, x 507–2053, y 508.5–931.5) ------------------
def stacked(W, H, cx, cy, wm_w, sl_cap, gap, ink):
    s = wm_w / bw
    wm_h = bh * s
    sl_s = sl_cap / 740
    sl_hh = (sl_b[3] - sl_b[1]) * sl_s
    total = wm_h + gap + sl_hh
    top = cy - total / 2
    p1, box1, _ = place(wm_d, wm_b, ink, cx=cx, y=top, w=wm_w)
    p2, box2, _ = place(sl_d, sl_b, ink, cx=cx, y=box1[3] + gap, h=sl_hh)
    return p1 + p2, (min(box1[0], box2[0]), box1[1], max(box1[2], box2[2]), box2[3])
body, box = stacked(2560, 1440, 1280, 720, 980, 34, 64, MUREKKEP)
safe = (507, 508.5, 2053, 931.5)
assert box[0] >= safe[0] and box[2] <= safe[2] and box[1] >= safe[1] and box[3] <= safe[3], box
banner_box = box
write_banner = svg(2560, 1440, body, bg=TOZ)

# --- 6. Bitiş kartı 1080×1920 ------------------------------------------------------------------
# Yazı alanı x 60–940, y 168–1330; sağ 140 px boş. Kompozisyon ekran ortasında (x=540) ve 940'ı aşmaz.
ec_body, ec_box = stacked(1080, 1920, 540, 900, 760, 30, 52, MUREKKEP)
av_size = 168
av = disc(av_size, TOZ, MUREKKEP)
av_y = ec_box[1] - 96 - av_size
ec_svg_body = f'<g transform="translate({fmt(540 - av_size / 2)} {fmt(av_y)})">{av}</g>' + ec_body
ec_all = (min(ec_box[0], 540 - av_size / 2), av_y, max(ec_box[2], 540 + av_size / 2), ec_box[3])
assert ec_all[0] >= 60 and ec_all[2] <= 940 and ec_all[1] >= 168 and ec_all[3] <= 1330, ec_all
endcard = svg(1080, 1920, ec_svg_body, bg=KETEN)

# --- Altyazı ----------------------------------------------------------------------------------
CAP_PILL_A = 0.92
for scene in (KETEN, TOZ):
    pill = over(MUREKKEP, scene, CAP_PILL_A)
    check(f'Altyazı metni / hap ({scene} sahne)', KETEN, pill, 4.5)
    check(f'Altyazı aktif kelime / hap ({scene} sahne)', TOZ, pill, 4.5)
    check(f'Hap / sahne {scene}', pill, scene, 3)

# --- PNG sayfaları -----------------------------------------------------------------------------
def page(name, w, h, inner, bg='transparent', extra=''):
    html = (f'<!doctype html><html><head><meta charset="utf-8">'
            f'<link rel="stylesheet" href="../../../brand.css">'
            f'<style>html,body{{margin:0;width:{w}px;height:{h}px;background:{bg};overflow:hidden}}'
            f'svg{{display:block}}{extra}</style></head><body>{inner}</body></html>')
    with open(os.path.join(PAGES, name + '.html'), 'w') as f: f.write(html)

rd = lambda n: open(os.path.join(OUT, n)).read()
page('avatar-800', 800, 800, svg(800, 800, f'<rect width="800" height="800" fill="{TOZ}"/>' + disc(800, TOZ, MUREKKEP)))
page('watermark-150', 150, 150, rd('watermark.svg'))
page('banner-2560x1440', 2560, 1440, write_banner)
page('lockup-horizontal-keten-2000x600', 2000, 600, rd('lockup-horizontal-keten.svg'))
page('lockup-horizontal-toz-2000x600', 2000, 600, rd('lockup-horizontal-toz.svg'))
page('endcard-1080x1920', 1080, 1920, endcard)

# Altyazı örneği (sunum panosu için; toz pembe sahne)
cap_demo = (f'<div style="position:absolute;inset:0;background:{TOZ}"></div>'
            f'<div class="ayna-display" style="position:absolute;left:90px;right:180px;top:300px;font-size:104px;'
            f'line-height:1.06;color:{MUREKKEP};text-align:center">Filtre bir yüzü nasıl hesaplar?</div>'
            f'<div style="position:absolute;left:60px;right:140px;top:1160px;text-align:center;line-height:1.5">'
            f'<span class="ayna-caption">ışık kaynağı, <span class="active">gölge</span></span></div>')
page('caption-demo', 1080, 1920, cap_demo)

json.dump({'checks': [dict(label=l, fg=f, bg=b, ratio=round(r, 2), need=n) for l, f, b, r, n in checks],
           'light_on_adacayi': round(LIGHT_ON_ADACAYI, 2),
           'banner_text_box': banner_box, 'endcard_text_box': ec_all,
           'wordmark_px': [WM_W, round(WM_H, 2)]},
          open(os.path.join(HERE, 'build', 'checks.json'), 'w'), indent=1)
for l, f, b, r, n in checks: print(f'{r:5.2f} ≥{n}  {l}')
print('banner box', [round(v) for v in banner_box], 'endcard box', [round(v) for v in ec_all])

# --- 8. Sunum panosu (3200×2400, nötr sayfa) ---------------------------------------------------
PAGE, META = '#ECEBE8', '#5F5F5B'                # nötr sunum zemini; META/PAGE kontrastı:
check('Pano etiketi / sayfa', META, PAGE, 4.5)
def wm_svg(w, ink):
    h = w * bh / bw
    p, _, _ = place(wm_d, wm_b, ink, x=0, y=0, w=w)
    return f'<svg width="{fmt(w)}" height="{fmt(h)}" viewBox="0 0 {fmt(w)} {fmt(h)}">{p}</svg>'
def av_svg(sz):
    return f'<svg width="{sz}" height="{sz}" viewBox="0 0 800 800">{disc(800, TOZ, MUREKKEP)}</svg>'
chips = [('Toz pembe', TOZ, 'kahraman yüzey', '--toz-pembe'), ('Keten', KETEN, 'ana zemin', '--keten'),
         ('Adaçayı', ADACAYI, 'ikincil yüzey', '--adacayi'), ('Yaprak mürekkebi', MUREKKEP, 'metin, logo', '--murekkep'),
         ('Koyu adaçayı', KOYU, 'vurgu, çizgi', '--koyu-adacayi')]
chip_html = ''.join(
    f'<div class="chip"><div class="sw" style="background:{c}"></div>'
    f'<div class="n">{n}</div><div class="m">{c} · {t}</div><div class="m">{tok}</div></div>' for n, c, r, tok in
    [(n, c, r, tok) for n, c, r, tok in chips] for t in [r])
dark_panels = [(MUREKKEP, KETEN, f'Açık logo · mürekkep · {ratio(KETEN, MUREKKEP):.2f}:1'),
               (KOYU, KETEN, f'Açık logo · koyu adaçayı · {ratio(KETEN, KOYU):.2f}:1'),
               (ADACAYI, MUREKKEP, f'Koyu logo · adaçayı · {ratio(MUREKKEP, ADACAYI):.2f}:1')]
row2 = ''.join(f'<div><div class="panel" style="width:600px;height:340px;background:{bg}">{wm_svg(400, ink)}</div>'
               f'<div class="cap">{lab}</div></div>' for bg, ink, lab in dark_panels)
sheet = f'''
<style>
body{{font-family:"Be Vietnam Pro";font-weight:500;color:{MUREKKEP}}}
.abs{{position:absolute}} .panel{{display:flex;align-items:center;justify-content:center}}
.cap,.m{{font-size:24px;color:{META};margin-top:18px;letter-spacing:.01em}} .m{{margin-top:6px}}
.n{{font-size:28px;margin-top:22px}} .sw{{width:344px;height:240px}} .chip{{width:344px}}
.h{{font-size:30px}} .spec{{font-size:24px;color:{META};margin-top:14px}}
.lbl{{font-size:24px;color:{META}}}
</style>
<div class="abs h" style="left:120px;top:112px">Ayna Arkası · Marka kimliği</div>
<div class="abs lbl" style="right:120px;top:118px">Final · Kasım 2026</div>
<div class="abs panel" style="left:120px;top:200px;width:1880px;height:760px;background:{TOZ}">{wm_svg(1180, MUREKKEP)}</div>
<div class="abs panel" style="left:2040px;top:200px;width:1040px;height:760px;background:{KETEN};gap:64px">
  {av_svg(360)}<div style="display:flex;flex-direction:column;align-items:center;gap:40px">{av_svg(96)}{av_svg(48)}</div></div>
<div class="abs cap" style="left:2040px;top:970px">Avatar · 360 / 96 / 48 px · {ratio(MUREKKEP, TOZ):.2f}:1</div>
<div class="abs cap" style="left:120px;top:970px">Kelime logosu · Fraunces 600 · opsz 144 · SOFT 100 · konturlu · {ratio(MUREKKEP, TOZ):.2f}:1</div>
<div class="abs" style="left:120px;top:1060px;display:flex;gap:40px">{row2}</div>
<div class="abs" style="left:120px;top:1520px;display:flex;gap:40px">{chip_html}</div>
<div class="abs" style="left:120px;top:2100px;width:900px">
  <div class="ayna-display" style="font-size:96px;line-height:1">Iı İi Şş Ğğ</div>
  <div class="spec">Fraunces · wght 600 · SOFT 100 · WONK 0 · opsz 144 · logo ve başlık</div></div>
<div class="abs" style="left:1100px;top:2100px;width:900px">
  <div style="font-weight:700;font-size:56px;line-height:1.1">Aynanın arkasına bak.</div>
  <div style="font-size:34px;line-height:1.2;margin-top:6px">Gövde, slogan ve altyazı</div>
  <div class="spec">Be Vietnam Pro · Bold 700 / Medium 500</div></div>
<img class="abs" src="../../endcard-1080x1920.png" style="left:2040px;top:1060px;width:500px;height:889px">
<img class="abs" src="caption-demo.png" style="left:2580px;top:1060px;width:500px;height:889px">
<div class="abs cap" style="left:2040px;top:1952px;width:500px">Bitiş kartı</div>
<div class="abs cap" style="left:2580px;top:1952px;width:500px">Altyazı hapı · {ratio(KETEN, over(MUREKKEP, TOZ, CAP_PILL_A)):.2f}:1 / aktif {ratio(TOZ, over(MUREKKEP, TOZ, CAP_PILL_A)):.2f}:1</div>
<div class="abs" style="left:2040px;top:2060px;width:1040px;height:220px;background:{KETEN};display:flex;align-items:center;justify-content:center;gap:56px">
  <svg width="110" height="110" viewBox="0 0 150 150">{disc(150, MUREKKEP, TOZ)}</svg>
  <div><div style="font-size:28px">Filigran</div><div class="m">150 px · şeffaf · {ratio(TOZ, MUREKKEP):.2f}:1</div></div></div>
'''
page('sheet', 3200, 2400, sheet, bg=PAGE)
