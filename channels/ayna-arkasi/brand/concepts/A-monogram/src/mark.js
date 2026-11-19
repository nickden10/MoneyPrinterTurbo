const C={P:'#E8B4B8',PL:'#1C1424',LP:'#F6E1E3',INK:'#F7EFF3',B:'#8E3B5A',G:'#E9C46A',M:'#7FC8C2',MU:'#A89BB0'};
// Didone "A", apex axis at x=100.5, y 48..142 (hand-drawn, bracketed serifs)
const A_D=`M92 48 L110 48 L138.8 128 Q142 137 154 137 L156 137 L156 142 L108 142 L108 137 L110 137 Q122 137 119 128 L111.2 105 L77 105 L68.7 128 Q67.5 137 80 137 L82 137 L82 142 L48 142 L48 137 L50 137 Q61 137 63.2 128 Z M94.66 55.9 L109.5 100 L78.8 100 Z`;
// thin leg + thick leg as one silhouette with counter; crossbar y 98.4..104.4
let uid=0;
function mark({variant='dark',glint=true,id,detail=true}={}){
  id=id||('m'+(uid++));
  const ring = variant==='dark'?C.P:C.P;
  const handle = variant==='dark'?C.P:C.PL;
  const outline = variant==='light';
  const At=`translate(100 101) scale(0.84) translate(-101 -95)`;
  return `<defs><clipPath id="${id}L"><rect x="-10" y="-10" width="110.5" height="260"/></clipPath><clipPath id="${id}R"><rect x="100.5" y="-10" width="120" height="260"/></clipPath></defs>
${outline?`<ellipse cx="100" cy="96" rx="72.5" ry="88.5" fill="${C.PL}"/>`:''}
<path d="M92.5 182 H107.5 L104.6 219 H95.4Z" fill="${handle}"/><circle cx="100" cy="223" r="6.4" fill="${handle}"/>
<ellipse cx="100" cy="185" rx="11" ry="4.6" fill="${handle}"/>
<ellipse cx="100" cy="96" rx="70" ry="86" fill="${ring}"/>
<g clip-path="url(#${id}L)"><ellipse cx="100" cy="96" rx="61" ry="77" fill="${C.PL}"/>
${glint?`<path d="M58 66 L68 50" stroke="${C.G}" stroke-width="2.8" stroke-linecap="round"/><path d="M57.5 79 L60.5 74" stroke="${C.G}" stroke-width="2.8" stroke-linecap="round"/>`:''}
<path d="${A_D}" fill-rule="evenodd" transform="${At}" fill="${C.P}"/></g>
<g clip-path="url(#${id}R)">${detail?'':'<!--'}<ellipse cx="100" cy="96" rx="61" ry="77" fill="none" stroke="${C.PL}" stroke-width="1.6" stroke-opacity="0.55"/>${detail?'':'-->'}
<path d="${A_D}" fill-rule="evenodd" transform="${At}" fill="${C.PL}"/></g>`;
}
module.exports={C,mark,A_D};
// avatar: circle-safe crop, handle runs off bottom edge
function avatar(size,{bg=C.PL,variant='dark',glint=true,detail=true,square=false}={}){
  const id='av'+size+(uid++);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="-16 -12 232 232"><defs><clipPath id="${id}c"><circle cx="100" cy="104" r="116"/></clipPath></defs>
${square?`<rect x="-16" y="-12" width="232" height="232" fill="${bg}"/>`:`<circle cx="100" cy="104" r="116" fill="${bg}"/>`}<g clip-path="url(#${id}c)">${mark({variant,glint,id,detail})}</g></svg>`;
}
module.exports.avatar=avatar;
