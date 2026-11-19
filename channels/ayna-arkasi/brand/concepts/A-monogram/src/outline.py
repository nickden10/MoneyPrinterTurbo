import json, io, sys, uharfbuzz as hb
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
FS='/tmp/claude-0/-home-user/d80e6aab-1402-588e-9a3c-c687f55b5d1d/scratchpad/fonts/node_modules/@fontsource/fraunces/files/'
BV='/home/user/harry0703/moneyprinterturbo/channels/ayna-arkasi/brand/fonts/'
def load(p):
    f=TTFont(p); b=io.BytesIO(); f.flavor=None; f.save(b); return f, b.getvalue()
def outline(path,text,size,track=0.0):
    f,data=load(path); upem=f['head'].unitsPerEm
    face=hb.Face(data); font=hb.Font(face); buf=hb.Buffer(); buf.add_str(text); buf.guess_segment_properties()
    hb.shape(font,buf,{"kern":True,"liga":True})
    gs=f.getGlyphSet(); order=f.getGlyphOrder(); s=size/upem; x=0; d=''
    for info,pos in zip(buf.glyph_infos,buf.glyph_positions):
        name=order[info.codepoint]; pen=SVGPathPen(gs)
        tp=TransformPen(pen,(s,0,0,-s,x+pos.x_offset*s,-pos.y_offset*s)); gs[name].draw(tp); d+=pen.getCommands()
        x+=pos.x_advance*s+track*size
    x-=track*size
    asc=f['OS/2'].sCapHeight*s
    return {'d':d,'w':round(x,2),'cap':round(asc,2),'xh':round(f['OS/2'].sxHeight*s,2)}
out={
 'ayna':outline(FS+'fraunces-latin-600-normal.woff2','Ayna',100),
 'arkasi':outline(FS+'fraunces-latin-600-italic.woff2','Arkası',100),
 'aynaArkasi':outline(FS+'fraunces-latin-600-normal.woff2','Ayna Arkası',100),
 'slogan':outline(BV+'BeVietnamPro-Medium.ttf','AYNANIN ARKASINA BAK.',100,0.2),
 'space':outline(FS+'fraunces-latin-600-normal.woff2','Ayna ',100),
}
json.dump(out,open('glyphs.json','w'))
print({k:(v['w'],v['cap'],v['xh']) for k,v in out.items()})
