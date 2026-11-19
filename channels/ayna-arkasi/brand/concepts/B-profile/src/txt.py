import uharfbuzz as hb
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
_c={}
def _load(p):
    if p not in _c:
        data=open(p,'rb').read(); _c[p]=(TTFont(p),hb.Font(hb.Face(data)))
    return _c[p]
def text_path(path,s,size,x=0,y=0,track=0):
    """returns (svg path d, advance width) baseline at y"""
    tt,f=_load(path); upem=tt['head'].unitsPerEm; sc=size/upem
    buf=hb.Buffer(); buf.add_str(s); buf.guess_segment_properties(); buf.language="tr"
    hb.shape(f,buf,{"kern":True,"liga":True})
    gs=tt.getGlyphSet(); order=tt.getGlyphOrder(); pen=SVGPathPen(gs); cx=0
    for info,pos in zip(buf.glyph_infos,buf.glyph_positions):
        g=order[info.codepoint]
        tp=TransformPen(pen,(sc,0,0,-sc,x+(cx+pos.x_offset)*sc,y-pos.y_offset*sc))
        gs[g].draw(tp); cx+=pos.x_advance+track*upem
    return pen.getCommands(), (cx-track*upem)*sc
