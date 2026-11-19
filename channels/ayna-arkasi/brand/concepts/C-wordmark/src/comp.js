const {txt,wid,star,P,PAL,DM,DMI,BV,OUT,r}=require('./build');
// Stacked wordmark: "Ayna" over a mirror line, "Arkası" as its reflection
function stacked(pal,S=300,o={}){
  const wA=wid(DM,'Ayna',S),wK=wid(DM,'Arkası',S);const W=Math.max(wA,wK);
  const ext=0.10*S, B=0.70*S, L=B+0.245*S, th=Math.max(1.5,0.007*S);
  const a=txt(DM,'Ayna',ext+(W-wA)/2,B,S), k=txt(DM,'Arkası',ext+(W-wK)/2,B,S);
  const TW=W+2*ext, bottom=2*L-B+0.70*S;
  let g=`<path fill="${pal.top}" d="${a.d}"/>`+
   `<path fill="${pal.refl}" transform="translate(0 ${r(2*L)}) scale(1 -1)" d="${k.d}"/>`+
   `<rect fill="${pal.line}" x="0" y="${r(L-th/2)}" width="${r(TW)}" height="${r(th)}"/>`+
   `<path fill="${pal.glint}" d="${star(TW-0.02*S,L,0.075*S)}"/>`;
  let h=bottom;
  if(o.slogan){const ss=S*0.115, sw=wid(BV,'Aynanın arkasına bak.',ss,0.06);
    g+=`<path fill="${pal.sub}" d="${txt(BV,'Aynanın arkasına bak.',(TW-sw)/2,bottom+0.35*S,ss,0.06).d}"/>`;h=bottom+0.42*S}
  return {g,w:TW,h};
}
// Mark: "A" + its reflection
function mark(pal,S=300,o={}){
  const aw=wid(DM,'A',S), ext=0.16*S, B=0.662*S, gap=o.gap??0.055*S, L=B+gap, th=Math.max(1.5,(o.th??0.016)*S);
  const a=txt(DM,'A',ext,B,S);const TW=aw+2*ext;
  const st=c=>o.stroke?` stroke="${c}" stroke-width="${r(o.stroke*S)}" stroke-linejoin="round"`:'';
  let g=`<path fill="${pal.top}"${st(pal.top)} d="${a.d}"/>`+
   `<path fill="${pal.refl}"${st(pal.refl)} transform="translate(0 ${r(2*L)}) scale(1 -1)" d="${a.d}"/>`+
   `<rect fill="${pal.line}" x="0" y="${r(L-th/2)}" width="${r(TW)}" height="${r(th)}" rx="${r(th/2)}"/>`;
  if(o.glint!==false)g+=`<path fill="${pal.glint}" d="${star(ext+aw*0.86,B-0.50*S,0.11*S)}"/>`;
  return {g,w:TW,h:2*L,cy:L};
}
// Horizontal: mark | Ayna Arkası + slogan
function horizontal(pal,S=200,o={}){
  const B=0.70*S, top=B-0.662*S, slB=B+0.56*S;
  const Sm=(slB-top)/1.434; const m=mark(pal,Sm,{gap:0.055*Sm}); const gapX=0.30*S;
  const x0=m.w+gapX; const wA=wid(DM,'Ayna ',S), wK=wid(DMI,'Arkası',S);
  const a=txt(DM,'Ayna',x0,B,S), k=txt(DMI,'Arkası',x0+wA,B,S);
  const ss=S*0.16; const sl=txt(BV,'Aynanın arkasına bak.',x0+0.03*S,slB,ss,0.06);
  const TW=x0+wA+wK, H=slB+0.05*S;
  const g=`<g transform="translate(0 ${r(top)})">${m.g}</g><path fill="${pal.top}" d="${a.d}"/><path fill="${pal.wk||pal.top}" d="${k.d}"/>`+(o.slogan===false?'':`<path fill="${pal.sub}" d="${sl.d}"/>`);
  return {g,w:TW,h:H};
}
// Avatar: circle-safe square
function avatar(pal,N=800,o={}){
  const Sm=N*(o.k??0.56); const m=mark(pal,Sm,{glint:o.glint??true,th:o.th,stroke:o.stroke,gap:o.gap?o.gap*Sm:undefined});
  const tx=(N-m.w)/2, ty=N/2-m.cy;
  const g=`<rect width="${N}" height="${N}" fill="${pal.bg}"/><g transform="translate(${r(tx)} ${r(ty)})">${m.g}</g>`;
  return {g,w:N,h:N};
}
const svg=(c,pad=0,bg)=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${r(-pad)} ${r(-pad)} ${r(c.w+2*pad)} ${r(c.h+2*pad)}" width="${r(c.w+2*pad)}" height="${r(c.h+2*pad)}">${bg?`<rect x="${-pad}" y="${-pad}" width="${c.w+2*pad}" height="${c.h+2*pad}" fill="${bg}"/>`:''}${c.g}</svg>`;
module.exports={avatar,stacked,mark,horizontal,svg,PAL,P};
