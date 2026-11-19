const {avatar,stacked,mark,horizontal,svg,PAL,P}=require('./comp');const fs=require('fs');const {OUT}=require('./build');
const D={...PAL.dark,wk:P.ink};
const L={...PAL.pink,wk:P.plum,glint:P.ink};
const MK={top:P.plum,refl:P.berry,line:P.plum,glint:P.gold};
const AV={k:0.585,th:0.024,stroke:0.012,gap:0.07};
// SVG deliverables
fs.writeFileSync(OUT+'mark.svg',svg(mark(MK,400),24));
fs.writeFileSync(OUT+'mark-avatar.svg',svg(avatar(PAL.pink,800,AV)));
fs.writeFileSync(OUT+'lockup-horizontal.svg',svg(horizontal(D,200),70,P.plum));
fs.writeFileSync(OUT+'lockup-stacked.svg',svg(stacked(PAL.dark,300,{slogan:1}),80,P.plum));
fs.writeFileSync(OUT+'lockup-horizontal-pink.svg',svg(horizontal(L,200),70,P.pink));
fs.writeFileSync(OUT+'lockup-stacked-pink.svg',svg(stacked(PAL.pink,300,{slogan:1}),80,P.pink));
const fit=(c,W,H,frac=0.8)=>{const sc=Math.min(W*frac/c.w,H*frac/c.h);return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><g transform="translate(${(W-c.w*sc)/2} ${(H-c.h*sc)/2}) scale(${sc})">${c.g}</g></svg>`};
const page=(body,bg)=>`<html><body style="margin:0;background:${bg}">${body}</body></html>`;
fs.writeFileSync('p-avatar.html',page(svg(avatar(PAL.pink,800,AV)),P.pink));
fs.writeFileSync('p-dark.html',page(fit(horizontal(D,200),2000,600,0.78),P.plum));
fs.writeFileSync('p-light.html',page(fit(horizontal(L,200),2000,600,0.78),P.pink));
// end card 1080x1920
const st=stacked(PAL.dark,300,{slogan:1});
const endcard=(sc=1)=>`<div style="width:1080px;height:1920px;background:radial-gradient(ellipse at 50% 38%,#2E2238 0%,${P.plum} 65%);position:relative;transform:scale(${sc});transform-origin:0 0;font-family:BV">
 <div style="position:absolute;top:120px;width:100%;text-align:center;color:${P.pink};font:500 34px BV;letter-spacing:.32em">SIRADAKİ BÖLÜM</div>
 <div style="position:absolute;left:0;top:400px">${fit(st,1080,880,0.9)}</div>
 <div style="position:absolute;top:1370px;width:100%;text-align:center"><span style="display:inline-block;background:${P.pink};color:${P.plum};font:700 48px BV;padding:30px 72px;border-radius:999px">Abone ol</span></div>
 <div style="position:absolute;top:1520px;width:100%;text-align:center;color:#CDBCC6;font:500 34px BV">Filtre değil, bilgi. Her gün bir kısa.</div>
 <div style="position:absolute;bottom:90px;width:100%;text-align:center;color:${P.gold};font:500 28px BV;letter-spacing:.2em">@AYNAARKASI</div></div>`;
const FONTS=`<style>@font-face{font-family:BV;src:url(/home/user/harry0703/moneyprinterturbo/channels/ayna-arkasi/brand/fonts/BeVietnamPro-Medium.ttf);font-weight:500}@font-face{font-family:BV;src:url(/home/user/harry0703/moneyprinterturbo/channels/ayna-arkasi/brand/fonts/BeVietnamPro-Bold.ttf);font-weight:700}</style>`;
fs.writeFileSync('p-endcard.html',FONTS+page(endcard(1),P.plum));
// sheet 2400x1600
const avs=svg(avatar(PAL.pink,800,AV));
const circ=n=>`<div style="width:${n}px;height:${n}px;border-radius:50%;overflow:hidden;box-shadow:0 0 0 1px rgba(255,255,255,.08)">${avs.replace('width="800" height="800"',`width="${n}" height="${n}"`)}</div>`;
const chip=(c,n,t)=>`<div style="display:flex;align-items:center;gap:12px"><div style="width:44px;height:44px;border-radius:10px;background:${c};box-shadow:inset 0 0 0 1px rgba(255,255,255,.12)"></div><div style="font:500 17px BV;color:#CDBCC6;line-height:1.3"><b style="color:${P.ink};font-weight:700">${n}</b><br>${t||c}</div></div>`;
const lab=t=>`<div style="font:500 15px BV;letter-spacing:.24em;color:#9C8A98;margin-bottom:14px">${t}</div>`;
const sheet=`${FONTS}<html><body style="margin:0;background:#150F1B;width:2400px;height:1600px;font-family:BV;overflow:hidden">
<div style="position:absolute;left:80px;top:56px;color:${P.ink};font:700 30px BV">Ayna Arkası <span style="color:${P.pink};font-weight:500">— Konsept C · Aynalı Yazı</span></div>
<div style="position:absolute;right:80px;top:62px;color:#9C8A98;font:500 20px BV">Aynanın arkasına bak.</div>
<div style="position:absolute;left:80px;top:130px;width:660px;height:860px;background:${P.pink};border-radius:28px;display:flex;align-items:center;justify-content:center;flex-direction:column">
 ${svg(mark(MK,430),0)}<div style="font:500 16px BV;letter-spacing:.24em;color:${P.plum};margin-top:34px;opacity:.75">İŞARET · A + YANSIMASI</div></div>
<div style="position:absolute;left:780px;top:130px;width:1000px">
 ${lab('YATAY · KOYU')}<div style="border-radius:22px;overflow:hidden">${fit(horizontal(D,200),1000,300,0.8).replace('<svg ','<svg style="display:block;background:'+P.plum+'" ')}</div>
 <div style="height:26px"></div>${lab('YATAY · TOZ PEMBE')}<div style="border-radius:22px;overflow:hidden">${fit(horizontal(L,200),1000,300,0.8).replace('<svg ','<svg style="display:block;background:'+P.pink+'" ')}</div></div>
<div style="position:absolute;left:780px;top:840px;width:1000px;height:150px;display:flex;gap:30px;align-items:center">
 ${circ(150)}${circ(96)}${circ(48)}<div style="font:500 17px BV;color:#9C8A98;line-height:1.5;margin-left:12px">Avatar 800 / 96 / 48 px<br>daire içinde test edildi</div></div>
<div style="position:absolute;left:1830px;top:130px">${lab('SHORTS BİTİŞ KARTI')}<div style="width:486px;height:864px;overflow:hidden;border-radius:22px">${endcard(0.45)}</div></div>
<div style="position:absolute;left:80px;top:1040px;width:1100px;height:480px;background:${P.plum};border-radius:28px;display:flex;align-items:center;justify-content:center">${fit(stacked(PAL.dark,300,{slogan:1}),1100,480,0.84)}</div>
<div style="position:absolute;left:1220px;top:1040px;width:560px;height:480px;background:${P.pink};border-radius:28px;display:flex;align-items:center;justify-content:center">${fit(stacked(PAL.pink,300,{}),560,480,0.8)}</div>
<div style="position:absolute;left:1830px;top:1060px;display:grid;grid-template-columns:1fr 1fr;gap:22px 26px;width:500px">
 ${chip(P.pink,'Toz pembe','#E8B4B8 · ana')}${chip(P.plum,'Mürdüm','#1C1424')}${chip(P.lpink,'Açık pembe','#F6E1E3')}${chip(P.ink,'Mürekkep','#F7EFF3')}${chip(P.berry,'Böğürtlen','#8E3B5A')}${chip(P.gold,'Altın','#E9C46A · parıltı')}${chip(P.mint,'Mint','#7FC8C2')}${chip('#A8818A','Yansıma','#A8818A · koyuda')}</div>
<div style="position:absolute;left:1830px;top:1450px;width:500px;font:500 15px BV;color:#7E6E7C;line-height:1.5">DM Serif Display (OFL) · Be Vietnam Pro (OFL)<br>Pembe üstünde yazı daima mürdüm.</div>
</body></html>`;
fs.writeFileSync('p-sheet.html',sheet);
