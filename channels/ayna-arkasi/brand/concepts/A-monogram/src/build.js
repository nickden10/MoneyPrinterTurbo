const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const {C,mark,avatar}=require('./mark.js');const g=require('./glyphs.json');
const OUT='/home/user/harry0703/moneyprinterturbo/channels/ayna-arkasi/brand/concepts/A-monogram/';
fs.mkdirSync(OUT,{recursive:true});
const SP=g.space.w-g.ayna.w; // word space at size 100
// wordmark group at size f*100, baseline y=0, x=0. returns {svg,w}
function wordmark(f,theme){
  const c1=theme==='dark'?C.INK:C.PL, c2=theme==='dark'?C.P:C.B;
  const w=(g.ayna.w+SP+g.arkasi.w)*f;
  return {w,cap:g.ayna.cap*f,svg:`<g transform="scale(${f})"><path d="${g.ayna.d}" fill="${c1}"/><path transform="translate(${g.ayna.w+SP} 0)" d="${g.arkasi.d}" fill="${c2}"/></g>`};
}
function slogan(sz,theme){const f=sz/100;return {w:g.slogan.w*f,cap:g.slogan.cap*f,svg:`<g transform="scale(${f})"><path d="${g.slogan.d}" fill="${theme==='dark'?C.MU:theme==='pink'?C.PL:C.B}"/></g>`};}
const markSvg=(theme,o={})=>mark({variant:theme==='dark'?'dark':'light',...o});
// horizontal lockup in its own coords; returns {svg,w,h}
function lockH(theme){
  const s=1.75, mw=200*s, mh=240*s, headC=96*s;
  const wm=wordmark(1.62,theme), sl=slogan(25,theme), gap=78, x=mw+gap, sg=0.3*162+22;
  const block=wm.cap+sg+sl.cap, top=headC-block/2, base=top+wm.cap, sbase=base+sg+sl.cap;
  const w=x+Math.max(wm.w,sl.w);
  return {w,h:mh,svg:`<g transform="scale(${s})">${markSvg(theme,{id:'h'+theme})}</g><g transform="translate(${x} ${base})">${wm.svg}</g><g transform="translate(${x+4} ${sbase})">${sl.svg}</g>`};
}
function lockS(theme){
  const s=1.6, mw=200*s, mh=240*s; const wm=wordmark(1.3,theme), sl=slogan(22,theme);
  const W=Math.max(wm.w,mw,sl.w); const base=mh+60+wm.cap, sbase=base+0.3*130+34+sl.cap;
  return {w:W,h:sbase,svg:`<g transform="translate(${(W-mw)/2} 0) scale(${s})">${markSvg(theme,{id:'s'+theme})}</g><g transform="translate(${(W-wm.w)/2} ${base})">${wm.svg}</g><g transform="translate(${(W-sl.w)/2} ${sbase})">${sl.svg}</g>`};
}
const pad=40;
const wrap=(o,bg)=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${-pad} ${-pad} ${(o.w+2*pad).toFixed(1)} ${(o.h+2*pad).toFixed(1)}" width="${(o.w+2*pad).toFixed(0)}" height="${(o.h+2*pad).toFixed(0)}">${bg?`<rect x="${-pad}" y="${-pad}" width="100%" height="100%" fill="${bg}"/>`:''}${o.svg}</svg>`;
fs.writeFileSync(OUT+'mark.svg',`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 240" width="200" height="240"><title>Ayna Arkası — işaret (koyu zemin)</title>${mark({id:'mk'})}</svg>`);
fs.writeFileSync(OUT+'mark-light.svg',`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 240" width="200" height="240"><title>Ayna Arkası — işaret (açık / pembe zemin)</title>${mark({id:'mkl',variant:'light'})}</svg>`);
const LH=lockH('dark'),LHl=lockH('light'),LS=lockS('dark'),LSl=lockS('light');
fs.writeFileSync(OUT+'lockup-horizontal.svg',wrap(LH));fs.writeFileSync(OUT+'lockup-horizontal-light.svg',wrap(LHl));
fs.writeFileSync(OUT+'lockup-stacked.svg',wrap(LS));fs.writeFileSync(OUT+'lockup-stacked-light.svg',wrap(LSl));
// canvas helpers
const canvas=(W,H,bg,o,scale=1)=>`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><rect width="${W}" height="${H}" fill="${bg}"/><g transform="translate(${(W-o.w*scale)/2} ${(H-o.h*scale)/2}) scale(${scale})">${o.svg}</g></svg>`;
const FONTS=`@font-face{font-family:BV;src:url(file:///home/user/harry0703/moneyprinterturbo/channels/ayna-arkasi/brand/fonts/BeVietnamPro-Medium.ttf);font-weight:500}@font-face{font-family:BV;src:url(file:///home/user/harry0703/moneyprinterturbo/channels/ayna-arkasi/brand/fonts/BeVietnamPro-Bold.ttf);font-weight:700}`;
function endcard(){
  const W=1080,H=1920; const wm=wordmark(1.42,'dark'), sl=slogan(30,'dark'); const ms=2.2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><style>${FONTS}</style>
<rect width="${W}" height="${H}" fill="${C.PL}"/>
<circle cx="540" cy="560" r="420" fill="${C.P}" opacity="0.06"/>
<g transform="translate(${540-100*ms} 300) scale(${ms})">${mark({id:'ec'})}</g>
<g transform="translate(${(W-wm.w)/2} 1000)">${wm.svg}</g><g transform="translate(${(W-sl.w)/2} 1072)">${sl.svg}</g>
<rect x="340" y="1150" width="400" height="104" rx="52" fill="${C.P}"/><text x="540" y="1218" text-anchor="middle" font-family="BV" font-weight="700" font-size="40" fill="${C.PL}">Takip et</text>
${[0,1].map(i=>`<rect x="${90+i*470}" y="1380" width="430" height="300" rx="28" fill="none" stroke="${C.P}" stroke-opacity="0.55" stroke-width="3" stroke-dasharray="14 10"/><text x="${305+i*470}" y="1540" text-anchor="middle" font-family="BV" font-weight="500" font-size="32" fill="${C.INK}" opacity="0.8">${i?'Bunu da izle':'Sıradaki video'}</text>`).join('')}
<text x="540" y="1790" text-anchor="middle" font-family="BV" font-weight="500" font-size="28" fill="${C.MU}">Güzellik standartlarının tarihi, teknolojisi ve pazarlaması</text></svg>`;
}
function lum(h){const v=[1,3,5].map(i=>parseInt(h.substr(i,2),16)/255).map(c=>c<=0.03928?c/12.92:((c+0.055)/1.055)**2.4);return .2126*v[0]+.7152*v[1]+.0722*v[2];}
const cr=(a,b)=>{const x=lum(a),y=lum(b);return ((Math.max(x,y)+.05)/(Math.min(x,y)+.05)).toFixed(1);};
function sheet(){
  const W=2400,H=1600; const tokens=[['Toz pembe',C.P,'ANA'],['Plum',C.PL,''],['Açık pembe',C.LP,''],['Ink',C.INK,''],['Berry',C.B,''],['Gold',C.G,''],['Mint',C.M,'']];
  const ld=lockH('dark'), ll=lockH('light'), st=lockS('pink');
  const cw=940,ch=330, sc=Math.min((cw-120)/ld.w,(ch-80)/ld.h);
  const ecs=0.355;
  return `<!doctype html><html><head><meta charset="utf-8"><style>${FONTS}body{margin:0}text{font-family:BV}</style></head><body>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<rect width="${W}" height="${H}" fill="#140E1A"/>
<text x="80" y="78" font-size="26" font-weight="700" fill="${C.P}" letter-spacing="4">AYNA ARKASI · KONSEPT A — MONOGRAM “ARKA YÜZ”</text>
<text x="80" y="112" font-size="20" font-weight="500" fill="${C.MU}">Bir el aynası, dikey eksende ikiye: solda cam (yansıma), sağda aynanın arkası. Aynı “A” iki tarafta ters renkte.</text>
<!-- avatar 800 actual -->
<g transform="translate(80 150)">${avatar(800,{square:false}).replace('<svg ','<svg x="0" y="0" ')}</g>
<text x="80" y="985" font-size="18" font-weight="500" fill="${C.MU}">Avatar · 800 px (gerçek boyut)</text>
<g transform="translate(80 1010)">${avatar(96,{detail:false})}</g><text x="80" y="1135" font-size="16" fill="${C.MU}">96 px</text>
<g transform="translate(200 1034)">${avatar(48,{detail:false,glint:false})}</g><text x="200" y="1135" font-size="16" fill="${C.MU}">48 px</text>
<g transform="translate(290 1034)">${avatar(48,{bg:C.P,variant:'light',detail:false,glint:false})}</g><text x="290" y="1135" font-size="16" fill="${C.MU}">48 · pembe</text>
<g transform="translate(400 1034)">${avatar(48,{bg:C.LP,variant:'light',detail:false,glint:false})}</g><text x="400" y="1135" font-size="16" fill="${C.MU}">48 · açık</text>
<g transform="translate(520 1010)">${avatar(96,{bg:C.P,variant:'light',detail:false})}</g>
<text x="520" y="1135" font-size="16" fill="${C.MU}">96 · pembe</text><g transform="translate(640 1010)">${avatar(96,{bg:'#ffffff',variant:'light',detail:false})}</g><text x="640" y="1135" font-size="16" fill="${C.MU}">96 · beyaz UI</text>
<!-- color chips -->
${tokens.map((t,i)=>`<g transform="translate(${80+i*112} 1190)"><rect width="100" height="120" rx="14" fill="${t[1]}" stroke="#ffffff22"/><text x="0" y="150" font-size="16" font-weight="700" fill="${C.INK}">${t[0]}</text><text x="0" y="172" font-size="15" fill="${C.MU}">${t[1]}</text>${t[2]?`<text x="10" y="26" font-size="13" font-weight="700" fill="${C.PL}">${t[2]}</text>`:''}</g>`).join('')}
<text x="80" y="1420" font-size="16" fill="${C.MU}">Kontrast: plum/pembe ${cr(C.PL,C.P)}:1 · ink/plum ${cr(C.INK,C.PL)}:1 · berry/açık pembe ${cr(C.B,C.LP)}:1 · beyaz/pembe ${cr('#FFFFFF',C.P)}:1 (YASAK)</text>
<!-- lockups -->
<g transform="translate(960 150)"><rect width="${cw}" height="${ch}" rx="24" fill="${C.PL}" stroke="#ffffff14"/><g transform="translate(${(cw-ld.w*sc)/2} ${(ch-ld.h*sc)/2}) scale(${sc})">${ld.svg}</g></g>
<g transform="translate(960 510)"><rect width="${cw}" height="${ch}" rx="24" fill="${C.LP}"/><g transform="translate(${(cw-ll.w*sc)/2} ${(ch-ll.h*sc)/2}) scale(${sc})">${ll.svg.replace(/id="h/g,'id="q').replace(/#h/g,'#q')}</g></g>
<g transform="translate(960 870)"><rect width="${cw}" height="${590}" rx="24" fill="${C.P}"/><g transform="translate(${(cw-st.w*0.6)/2} ${(590-st.h*0.6)/2}) scale(0.6)">${st.svg}</g></g>
<text x="960" y="1500" font-size="18" font-weight="500" fill="${C.MU}">Yatay kilit · koyu / açık   ·   Dikey kilit · toz pembe zemin (plum işaret)</text>
<!-- end card -->
<g transform="translate(${2340-1080*ecs} 150) scale(${ecs})">${endcard().replace(/<style>.*?<\/style>/s,'').replace(/id="ec/g,'id="ed').replace(/#ec/g,'#ed')}</g>
<rect x="${2340-1080*ecs}" y="150" width="${1080*ecs}" height="${1920*ecs}" rx="18" fill="none" stroke="#ffffff22" stroke-width="2"/>
${[['YAP','Açık/pembe zeminde konturlu sürüm.'],['YAP','96 px altı: parıltı ve ince çizgi kapalı.'],['YAPMA','Pembe üstüne beyaz metin (1.8:1).'],['YAPMA','Ekseni kaydırma, A’yı döndürme.'],['YAPMA','Gölge, gradyan, metalik efekt.']].map((d,i)=>`<text x="${2340-1080*ecs}" y="${150+1920*ecs+90+i*34}" font-size="16" fill="${C.INK}"><tspan font-weight="700" fill="${d[0]==='YAP'?C.M:C.P}">${d[0]}</tspan>  ${d[1]}</text>`).join('')}<text x="${2340-1080*ecs}" y="${150+1920*ecs+34}" font-size="18" font-weight="500" fill="${C.MU}">Shorts bitiş kartı · 1080×1920</text>
</svg></body></html>`;
}
(async()=>{
  const b=await chromium.launch();const p=await b.newPage({deviceScaleFactor:1});
  async function shot(html,file,w,h){await p.setViewportSize({width:w,height:h});fs.writeFileSync('/tmp/claude-0/-home-user/d80e6aab-1402-588e-9a3c-c687f55b5d1d/scratchpad/work/_r.html',html.startsWith('<!doctype')?html:`<!doctype html><html><head><meta charset="utf-8"><style>body{margin:0}</style></head><body>${html}</body></html>`);await p.goto('file:///tmp/claude-0/-home-user/d80e6aab-1402-588e-9a3c-c687f55b5d1d/scratchpad/work/_r.html',{waitUntil:'load'});await p.evaluate(()=>document.fonts.ready);await p.screenshot({path:file,clip:{x:0,y:0,width:w,height:h},omitBackground:false});}
  await shot(avatar(800,{square:true}),OUT+'avatar-800.png',800,800);
  await shot(canvas(2000,600,C.PL,LH),OUT+'lockup-dark-2000x600.png',2000,600);
  await shot(canvas(2000,600,C.LP,LHl),OUT+'lockup-light-2000x600.png',2000,600);
  await shot(`<!doctype html><html><head><meta charset="utf-8"><style>body{margin:0}</style></head><body>${endcard()}</body></html>`,OUT+'endcard-1080x1920.png',1080,1920);
  await shot(sheet(),OUT+'sheet.png',2400,1600);
  // small-size checks
  await shot(`<div style="display:flex;gap:10px;padding:10px;background:#888">${avatar(48,{detail:false,glint:false})}${avatar(48,{bg:C.P,variant:'light',detail:false,glint:false})}${avatar(32,{detail:false,glint:false})}</div>`,'small.png',200,70);
  await b.close();
})();
