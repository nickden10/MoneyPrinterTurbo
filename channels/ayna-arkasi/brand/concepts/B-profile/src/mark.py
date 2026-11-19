from geo import tf
P,PK,LP,INK,GOLD,BERRY,MINT="#1C1424","#E8B4B8","#F6E1E3","#F7EFF3","#E9C46A","#8E3B5A","#7FC8C2"
FRONT=("M150,148 C172,160 183,190 184,224 C186,229 186,234 184,240 C186,252 191,264 197,276 "
 "C199,280 197,284 191,287 C190,291 191,295 189,299 C191,303 191,308 188,312 C187,315 187,318 187,322 "
 "C192,330 190,338 182,342 C176,345 170,348 168,356 C166,380 168,420 168,450 L168,560")
BACK="L98,560 L98,450 C104,400 108,340 106,300 C104,276 94,262 84,244 C70,220 66,184 82,160 C96,138 128,134 150,148 Z"
s=0.86; cx,cy=197,276
sc=lambda x,y:(cx+(x-cx)*s, cy+(y-cy)*s)
FACE=tf("M136,147 C141,146 146,146 150,148 "+FRONT.replace("M150,148 ","C"[:0]+"").replace("C172,160","C172,160",1),sc); HEAD=tf(FRONT+' '+BACK,sc)
PONY="M132,160 C116,118 66,104 38,126 C14,146 20,192 38,222 C52,246 54,272 42,300 C70,276 84,250 92,224 L120,200 Z"
TIE="M101,170 L121,146"
OV='cx="200" cy="250" rx="140" ry="190"'
def mark_group(uid="m",pony_col=None,sw=5,frame=False,tie=True,frame_col=PK,line_col=P,head_col=P,mirror_col=PK):
    t=f'<path d="{TIE}" stroke="{GOLD}" stroke-width="7" stroke-linecap="round" fill="none"/>' if tie else ''
    fr=f'<ellipse cx="200" cy="250" rx="156" ry="206" fill="none" stroke="{frame_col}" stroke-width="2.5"/>' if frame else ''
    return f'''<defs><clipPath id="{uid}c"><ellipse {OV}/></clipPath></defs>{fr}
<ellipse {OV} fill="{mirror_col}"/><path d="{PONY}" fill="{pony_col or mirror_col}"/>
<g clip-path="url(#{uid}c)"><path d="{HEAD}" fill="{head_col}"/><path d="{PONY}" fill="{head_col}"/>{t}
<path d="{FACE}" transform="translate(400,0) scale(-1,1)" fill="none" stroke="{line_col}" stroke-width="{sw}" stroke-linecap="round" stroke-linejoin="round"/></g>'''
# mark bbox: x 12..356, y 44..456 with frame
