const o=require('opentype.js'),fs=require('fs');
const E='node_modules/@expo-google-fonts/';const BR='/home/user/harry0703/moneyprinterturbo/channels/ayna-arkasi/brand/';
const OUT=BR+'concepts/C-wordmark/';
const load=p=>{const b=fs.readFileSync(p);return o.parse(b.buffer.slice(b.byteOffset,b.byteOffset+b.length))};
const DM=load(E+'dm-serif-display/400Regular/DMSerifDisplay_400Regular.ttf');
const DMI=load(E+'dm-serif-display/400Regular_Italic/DMSerifDisplay_400Regular_Italic.ttf');
const BV=load(BR+'fonts/BeVietnamPro-Medium.ttf');
const r=n=>Math.round(n*100)/100;
function txt(F,s,x,y,size,ls=0){ // ls = letterspacing in em
  let cx=x,ds=[],gl=F.stringToGlyphs(s);
  gl.forEach((g,i)=>{ds.push(pd(g.getPath(cx,y,size)));let adv=g.advanceWidth*size/F.unitsPerEm;
    if(i<gl.length-1)adv+=F.getKerningValue(g,gl[i+1])*size/F.unitsPerEm;cx+=adv+ls*size});
  return {d:ds.join(''),w:cx-x-ls*size};
}
const pd=p=>p.commands.map(c=>c.type==='Z'?'Z':c.type+[c.x1,c.y1,c.x2,c.y2,c.x,c.y].filter(v=>v!==undefined).map(v=>(Math.round(v*100)/100).toString()).join(' ')).join('');
const wid=(F,s,size,ls)=>txt(F,s,0,0,size,ls).w;
const star=(cx,cy,R)=>{const k=R*0.16;return `M${r(cx)} ${r(cy-R)}C${r(cx+k*0.3)} ${r(cy-k)} ${r(cx+k)} ${r(cy-k*0.3)} ${r(cx+R)} ${r(cy)}C${r(cx+k)} ${r(cy+k*0.3)} ${r(cx+k*0.3)} ${r(cy+k)} ${r(cx)} ${r(cy+R)}C${r(cx-k*0.3)} ${r(cy+k)} ${r(cx-k)} ${r(cy+k*0.3)} ${r(cx-R)} ${r(cy)}C${r(cx-k)} ${r(cy-k*0.3)} ${r(cx-k*0.3)} ${r(cy-k)} ${r(cx)} ${r(cy-R)}Z`};
const P={plum:'#1C1424',pink:'#E8B4B8',lpink:'#F6E1E3',ink:'#F7EFF3',berry:'#8E3B5A',gold:'#E9C46A',mint:'#7FC8C2'};
// palettes: dark (on plum), pink (on dusty pink)
const PAL={
 dark:{bg:P.plum,top:P.pink,refl:'#A8818A',line:P.gold,glint:P.gold,sub:'#CDBCC6'},
 pink:{bg:P.pink,top:P.plum,refl:P.berry,line:P.plum,glint:P.ink,sub:'#3A2A40'}};
module.exports={txt,wid,star,P,PAL,DM,DMI,BV,OUT,r};
