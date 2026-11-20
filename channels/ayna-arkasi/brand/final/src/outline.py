"""Fraunces (SOFT 100) kelime logosunu konturlu SVG path'e çevirir.
Kaynak: brand/fonts/fraunces-latin-full-normal.woff2 (değişken). Eksenler varLib.instancer ile sabitlenir,
HarfBuzz ile şekillendirilir (GPOS kerning dahil), sonra elle ayarlanmış çift aralıkları eklenir."""
import json, sys, os
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen
import uharfbuzz as hb

HERE = os.path.dirname(os.path.abspath(__file__))
FONT = os.path.join(HERE, '..', '..', 'fonts', 'fraunces-latin-full-normal.woff2')
CACHE = os.path.join(HERE, 'build')
os.makedirs(CACHE, exist_ok=True)

def instance(axes):
    key = '-'.join(f'{k}{v}' for k, v in sorted(axes.items()))
    p = os.path.join(CACHE, f'fraunces-{key}.ttf')
    if not os.path.exists(p):
        f = instancer.instantiateVariableFont(TTFont(FONT), axes)
        f.flavor = None
        f.save(p)
    return p

def shape(text, axes, kern=None, track=0, features=None, font_path=None):
    """Glif listesi + konumlar (font birimi). kern: {'Ay': -40, ...} çift başına ek aralık;
    track: her harf arasına eklenen sabit aralık (birim)."""
    p = font_path or instance(axes)
    tt = TTFont(p)
    face = hb.Face(hb.Blob.from_file_path(p)); font = hb.Font(face)
    buf = hb.Buffer(); buf.add_str(text); buf.guess_segment_properties()
    hb.shape(font, buf, features or {'kern': True, 'liga': True})
    names = tt.getGlyphOrder()
    out = []; x = 0
    for k, (gi, gp) in enumerate(zip(buf.glyph_infos, buf.glyph_positions)):
        ch = text[gi.cluster]
        out.append((names[gi.codepoint], x + gp.x_offset, gp.y_offset, ch))
        x += gp.x_advance
        if k < len(text) - 1:
            pair = text[gi.cluster] + text[gi.cluster + 1] if gi.cluster + 1 < len(text) else ''
            x += track + (kern or {}).get(pair, 0)
    return tt, out, x

def path(text, axes, kern=None, track=0, scale=1.0, features=None, font_path=None):
    """d, bbox (font birimi * scale, y aşağı). Taban çizgisi y=0."""
    tt, glyphs, adv = shape(text, axes, kern, track, features, font_path)
    gs = tt.getGlyphSet()
    sp = SVGPathPen(gs, lambda v: ('%.2f' % v).rstrip('0').rstrip('.'))
    bp = BoundsPen(gs)
    for name, x, y, ch in glyphs:
        t = (scale, 0, 0, -scale, x * scale, -y * scale)
        gs[name].draw(TransformPen(sp, t))
        gs[name].draw(TransformPen(bp, t))
    return sp.getCommands(), bp.bounds, adv * scale, tt

if __name__ == '__main__':
    cfg = json.loads(sys.argv[1])
    d, b, adv, _ = path(cfg['text'], cfg['axes'], cfg.get('kern'), cfg.get('track', 0), cfg.get('scale', 1))
    print(json.dumps({'d': d, 'bbox': b, 'adv': adv}))
