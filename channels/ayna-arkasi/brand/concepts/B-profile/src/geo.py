import re
def tf(d,f):
    out=[];toks=re.findall(r'[MCLZ]|-?\d+\.?\d*',d);nums=[]
    res=[]
    i=0
    while i<len(toks):
        t=toks[i]
        if t in 'MCLZ': res.append(t); i+=1; continue
        x,y=f(float(toks[i]),float(toks[i+1])); res.append(f"{x:.1f},{y:.1f}"); i+=2
    return ' '.join(res).replace(' ,',',')
FRONT="M150,148 C172,160 183,190 184,224 C186,229 186,234 184,240 C186,252 191,264 197,276 C199,280 197,284 191,287 C192,291 193,295 190,299 C193,303 193,308 189,312 C186,316 186,318 188,322 C192,330 190,338 182,342 C176,345 170,348 168,356 C166,380 168,420 168,450"
BACK="L168,520 L98,520 L98,450 C104,400 108,340 106,300 C104,276 94,262 84,244 C70,220 66,184 82,160 C96,138 128,134 150,148 Z"
s=0.86; cx,cy=197,276
sc=lambda x,y:(cx+(x-cx)*s, cy+(y-cy)*s)
FACE=tf(FRONT,sc)
HEAD=tf(FRONT+' '+BACK,sc)
PONY="M114,162 C100,118 58,104 34,126 C14,146 22,190 40,218 C54,240 54,266 44,292 C74,266 80,230 68,198 C60,174 72,160 100,172 Z"
