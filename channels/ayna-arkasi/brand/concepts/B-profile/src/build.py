import os,sys
from mark import *
from txt import text_path
OUT="/home/user/harry0703/moneyprinterturbo/channels/ayna-arkasi/brand/concepts/B-profile"
FD=OUT+"/fonts/"
FR=FD+"Fraunces_500Medium.ttf"; FI=FD+"Fraunces_500Medium_Italic.ttf"; BV=FD+"BeVietnamPro-Medium.ttf"
def svg(body,vb,w=None,h=None,title="Ayna Arkası"):
    a=f' width="{w}" height="{h}"' if w else ''
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}"{a} role="img"><title>{title}</title>{body}</svg>'
MVB="8 52 340 396"   # mark bbox
def wordmark(x,base,size,c1,c2,sl_col,sl_size,sl_gap,align="left",cxw=None):
    d1,w1=text_path(FR,"Ayna",size); d2,w2=text_path(FI,"Arkası",size)
    sp=size*0.24; W=w1+sp+w2
    ds,ws=text_path(BV,"AYNANIN ARKASINA BAK.",sl_size,track=0.28)
    if align=="center": x0=cxw-W/2; xs=cxw-ws/2
    else: x0=x; xs=x+size*0.03
    g=f'<path transform="translate({x0:.1f},{base})" d="{d1}" fill="{c1}"/>'
    g+=f'<path transform="translate({x0+w1+sp:.1f},{base})" d="{d2}" fill="{c2}"/>'
    g+=f'<path transform="translate({xs:.1f},{base+sl_gap})" d="{ds}" fill="{sl_col}"/>'
    return g,max(W,ws)
THEMES={"dark":dict(c1=INK,c2=PK,sl=PK,pony=None),"light":dict(c1=P,c2=BERRY,sl=BERRY,pony=BERRY)}
def horiz(theme,uid):
    t=THEMES[theme]
    g=f'<g transform="translate(-8,-52)">{mark_group(uid,pony_col=t["pony"])}</g>'
    wm,W=wordmark(410,230,150,t["c1"],t["c2"],t["sl"],30,92)
    return g+wm, f"0 0 {410+W+6:.0f} 396"
def stacked(theme,uid):
    t=THEMES[theme]
    d1,w1=text_path(FR,"Ayna",150)
    W=900
    g=f'<g transform="translate({W/2-170-8},-52)">{mark_group(uid,pony_col=t["pony"])}</g>'
    wm,ww=wordmark(0,560,150,t["c1"],t["c2"],t["sl"],30,84,"center",W/2)
    return g+wm, f"0 0 {W} 680"
os.makedirs(OUT,exist_ok=True)
open(OUT+"/mark.svg","w").write(svg(mark_group("m"),MVB))
open(OUT+"/mark-light.svg","w").write(svg(mark_group("ml",pony_col=BERRY),MVB))
for th in ("dark","light"):
    b,vb=horiz(th,"h"+th); suf="" if th=="dark" else "-light"
    open(OUT+f"/lockup-horizontal{suf}.svg","w").write(svg(b,vb))
    b,vb=stacked(th,"s"+th)
    open(OUT+f"/lockup-stacked{suf}.svg","w").write(svg(b,vb))
# avatar svg (circle-safe, thicker reflection line)
AV=f'<rect width="800" height="800" fill="{P}"/><g transform="translate(400,400) scale(1.58) translate(-178,-250)">{mark_group("av",sw=9)}</g>'
open(OUT+"/avatar.svg","w").write(svg(AV,"0 0 800 800"))
print(open(OUT+"/lockup-horizontal.svg").read()[:200])
