// Ayna Arkası · 001 · C storyboard: çizgi-portre (illüstrasyon, gerçek kişi değil).
// Orta-koyu ten, görünür doku (çil, gözenek, ince tüy), doğal kaş/burun. Koordinatlar: viewBox 0 0 400 500.
(function(){
  const SKIN='#8A5A3E', LINE='#2B1A16', HAIR='#22161B', LIP='#6B3832', SHIRT='#3A2A44';
  function rng(seed){let s=seed>>>0;return()=>((s=(s*1664525+1013904223)>>>0)/4294967296)}
  const P={
    face:'M200 72 C292 72 322 150 318 232 C315 322 280 398 200 420 C120 398 85 322 82 232 C78 150 108 72 200 72 Z',
    browL:'M124 196 Q150 176 184 188', browR:'M216 188 Q250 176 276 196',
    eyeL:'M134 230 Q158 210 184 230 Q158 244 134 230 Z', eyeR:'M216 230 Q242 210 266 230 Q242 244 216 230 Z',
    lidL:'M136 224 Q158 204 182 222', lidR:'M218 222 Q242 204 264 224',
    nose:'M206 238 Q210 270 218 294', nostril:'M184 296 Q170 314 188 316 M216 296 Q230 314 212 316 M193 319 Q200 322 207 319',
    lipU:'M164 352 Q182 338 200 345 Q218 338 236 352 Q200 360 164 352 Z',
    lipL:'M164 352 Q200 384 236 352 Q200 360 164 352 Z',
    jaw:'M140 372 Q150 392 168 404'
  };
  // doku: çiller (koyu), gözenekler (açık), ince tüy çizgileri, göz altı çizgisi
  function texture(seed){
    const r=rng(seed||7); let s='';
    const zones=[[150,280,48,30],[250,280,48,30],[200,262,26,20]];
    for(let i=0;i<120;i++){const z=zones[i%zones.length];const a=r()*6.283,d=Math.sqrt(r());
      const x=z[0]+Math.cos(a)*z[2]*d,y=z[1]+Math.sin(a)*z[3]*d;
      s+=`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(0.9+r()*1.5).toFixed(2)}" fill="#5A3523" opacity="${(0.55+r()*0.4).toFixed(2)}"/>`;}
    for(let i=0;i<160;i++){const x=110+r()*180,y=250+r()*110; if(Math.abs(x-200)<22&&y<330)continue;
      s+=`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="0.8" fill="#B98263" opacity=".8"/>`;}
    // ince tüyler: şakaklar ve yanak kenarı
    for(let i=0;i<46;i++){const left=i%2===0;const x=left?(94+r()*20):(286+r()*20),y=190+r()*120;const dx=left?-3:3;
      s+=`<path d="M${x.toFixed(1)} ${y.toFixed(1)} q${dx} 4 ${dx*1.6} 9" stroke="#4A2C20" stroke-width="0.9" fill="none" opacity=".7"/>`;}
    // ince doku çizgileri: göz altı + yanak
    s+=`<path d="M140 248 Q158 256 178 248" stroke="#5A3523" stroke-width="1.4" fill="none" opacity=".6"/>`+
       `<path d="M222 248 Q242 256 260 248" stroke="#5A3523" stroke-width="1.4" fill="none" opacity=".6"/>`+
       `<path d="M170 312 Q160 330 164 344" stroke="#5A3523" stroke-width="1.6" fill="none" opacity=".55"/>`+
       `<path d="M230 312 Q240 330 236 344" stroke="#5A3523" stroke-width="1.6" fill="none" opacity=".55"/>`;
    for(let i=0;i<18;i++){const x=128+r()*144,y=262+r()*50; if(Math.abs(x-200)<30)continue;
      s+=`<path d="M${x.toFixed(1)} ${y.toFixed(1)} q4 -1.5 8 0" stroke="#5A3523" stroke-width="1" fill="none" opacity=".45"/>`;}
    return s;
  }
  function hair(){ // kıvırcık saç: daire kümeleri
    const r=rng(3); let s=''; const cx=200,cy=190;
    for(let i=0;i<70;i++){const a=Math.PI*(0.92+r()*1.16),R=150+r()*36;
      const x=cx+Math.cos(a)*R*1.05,y=cy+Math.sin(a)*R*0.95; s+=`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(26+r()*18).toFixed(1)}"/>`;}
    for(let i=0;i<26;i++){const side=i%2?1:-1;const x=cx+side*(120+r()*40),y=200+r()*170; s+=`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(22+r()*14).toFixed(1)}"/>`;}
    return `<g fill="${HAIR}">${s}</g>`;
  }
  function hairCurls(){ const r=rng(11); let s='';
    for(let i=0;i<40;i++){const a=Math.PI*(0.95+r()*1.1),R=165+r()*30;const x=200+Math.cos(a)*R,y=190+Math.sin(a)*R*0.9;
      s+=`<path d="M${x.toFixed(1)} ${y.toFixed(1)} a7 7 0 1 1 9 4" stroke="#4A3540" stroke-width="2" fill="none"/>`;}
    return s;}
  // opts: {texture:true, textureClip:'url(#x)', defs:'', extra:'', lineW:4, viewBox}
  window.faceSVG=function(o){o=o||{};const lw=o.lineW||4;const vb=o.viewBox||'0 0 400 500';
    const st=`stroke="${LINE}" stroke-linecap="round" stroke-linejoin="round" fill="none"`;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" width="${o.w||400}" height="${o.h||500}" preserveAspectRatio="xMidYMid slice">
    <defs>${o.defs||''}<clipPath id="faceClip"><path d="${P.face}"/></clipPath></defs>
    ${o.bg?`<rect x="-400" y="-400" width="1200" height="1300" fill="${o.bg}"/>`:''}
    ${hair()}
    <path d="M150 392 L152 470 Q200 492 248 470 L250 392 Z" fill="${SKIN}" stroke="${LINE}" stroke-width="${lw}"/>
    <path d="M40 520 Q60 456 152 448 Q200 476 248 448 Q340 456 360 520 Z" fill="${SHIRT}" stroke="${LINE}" stroke-width="${lw}"/>
    <ellipse cx="84" cy="240" rx="16" ry="30" fill="${SKIN}" stroke="${LINE}" stroke-width="${lw}"/>
    <ellipse cx="316" cy="240" rx="16" ry="30" fill="${SKIN}" stroke="${LINE}" stroke-width="${lw}"/>
    <path d="${P.face}" fill="${SKIN}" stroke="${LINE}" stroke-width="${lw}"/>
    <g clip-path="url(#faceClip)"><g ${o.textureClip?`clip-path="${o.textureClip}"`:''} opacity="${o.texture===false?0:1}">${texture(o.seed)}</g></g>
    <path d="M100 156 Q112 76 200 72 Q288 76 300 156 Q284 120 248 110 Q226 126 202 114 Q176 128 154 112 Q118 124 100 156 Z" fill="${HAIR}"/>
    ${hairCurls()}
    <path d="${P.browL}" ${st} stroke-width="9"/><path d="${P.browR}" ${st} stroke-width="9"/>
    <path d="M130 192 l4 -6 M142 186 l4 -7 M156 182 l3 -7 M170 182 l3 -6 M230 182 l-3 -6 M244 182 l-3 -7 M258 186 l-4 -7 M270 192 l-4 -6" stroke="${LINE}" stroke-width="2" stroke-linecap="round"/>
    <path d="${P.eyeL}" fill="#F3E6DE" stroke="${LINE}" stroke-width="${lw}"/><path d="${P.eyeR}" fill="#F3E6DE" stroke="${LINE}" stroke-width="${lw}"/>
    <circle cx="159" cy="229" r="10" fill="${LINE}"/><circle cx="241" cy="229" r="10" fill="${LINE}"/>
    <circle cx="162" cy="226" r="2.6" fill="#F3E6DE"/><circle cx="244" cy="226" r="2.6" fill="#F3E6DE"/>
    <path d="${P.lidL}" ${st} stroke-width="2" opacity=".7"/><path d="${P.lidR}" ${st} stroke-width="2" opacity=".7"/>
    <path d="${P.nose}" ${st} stroke-width="3"/><path d="${P.nostril}" ${st} stroke-width="3.4"/>
    <path d="${P.lipU}" fill="${LIP}" stroke="${LINE}" stroke-width="3"/><path d="${P.lipL}" fill="#7A443C" stroke="${LINE}" stroke-width="3"/>
    <path d="M168 352 Q200 356 232 352" ${st} stroke-width="2.4"/>
    ${o.extra||''}
    </svg>`;};
  window.FACE_PATHS=P;
})();
