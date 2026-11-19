// Line-art portrait, drawn in a 600x720 box (the mirror oval). One drawing, two states.
// opts: tex (skin texture lines), eye (eye scale), jaw (0 = natural, 1 = narrowed), light (shadows removed + glow)
// Skin fill is one constant for every state (G-03): the filter never changes skin colour.
const SKIN = '#8A5A3C';
const LINE = '#2B1912';
const HAIR = '#221714';
const HAIR_LINE = '#5A4034';
const LIP = '#6E3D2A';
const CLOTH = '#3B2D46';

function rng(seed) { let s = seed; return () => (s = (s * 16807) % 2147483647) / 2147483647; }

function jawPath(k) {
  // natural: wider, softer jaw; k=1: narrowed toward a template
  const L = (a, b) => a + (b - a) * k;
  const cx = 300;
  const cbx = 120, cby = 360;            // cheekbone half-width
  const j1x = L(114, 98), j1y = L(470, 465);
  const j2x = L(70, 46), j2y = L(560, 568);
  const chinY = L(598, 606), chinW = L(34, 20);
  return `M ${cx - cbx} ${cby}
    C ${cx - cbx + 2} ${cby + 50}, ${cx - j1x} ${j1y - 30}, ${cx - j1x} ${j1y}
    C ${cx - j1x + 4} ${j1y + 40}, ${cx - j2x - 14} ${j2y - 20}, ${cx - j2x} ${j2y}
    C ${cx - j2x + 14} ${j2y + 22}, ${cx - chinW - 10} ${chinY}, ${cx} ${chinY}
    C ${cx + chinW + 10} ${chinY}, ${cx + j2x - 14} ${j2y + 22}, ${cx + j2x} ${j2y}
    C ${cx + j2x + 14} ${j2y - 20}, ${cx + j1x - 4} ${j1y + 40}, ${cx + j1x} ${j1y}
    C ${cx + j1x} ${j1y - 30}, ${cx + cbx - 2} ${cby + 50}, ${cx + cbx} ${cby}
    C ${cx + cbx + 6} ${cby - 120}, ${cx + 96} ${150}, ${cx} ${148}
    C ${cx - 96} ${150}, ${cx - cbx - 6} ${cby - 120}, ${cx - cbx} ${cby} Z`;
}

function eye(cx, cy, s, side) {
  const w = 34 * s, h = 15 * s;
  const lid = `M ${cx - w} ${cy} Q ${cx} ${cy - h * 1.55} ${cx + w} ${cy}`;
  const low = `M ${cx - w} ${cy} Q ${cx} ${cy + h * 1.05} ${cx + w} ${cy}`;
  const crease = `M ${cx - w * 0.85} ${cy - h * 0.95} Q ${cx} ${cy - h * 2.35} ${cx + w * 0.9} ${cy - h * 0.9}`;
  return `
  <path d="${lid} ${low.replace('M', 'L')}" fill="#F3E9E2" stroke="none"/>
  <clipPath id="ec${side}${Math.round(s * 100)}"><path d="${lid} ${low.replace('M', 'L')}"/></clipPath>
  <g clip-path="url(#ec${side}${Math.round(s * 100)})">
    <circle cx="${cx}" cy="${cy - 1}" r="${13.5 * s}" fill="#4A2A1A"/>
    <circle cx="${cx}" cy="${cy - 1}" r="${6 * s}" fill="#120A07"/>
    <circle cx="${cx + 4 * s}" cy="${cy - 5 * s}" r="${2.6 * s}" fill="#fff" opacity=".9"/>
  </g>
  <path d="${lid}" fill="none" stroke="${LINE}" stroke-width="4.5" stroke-linecap="round"/>
  <path d="${low}" fill="none" stroke="${LINE}" stroke-width="2.2" stroke-linecap="round"/>
  <path d="${crease}" fill="none" stroke="${LINE}" stroke-width="2" stroke-linecap="round" opacity=".75"/>`;
}

function brow(cx, cy, dir, tex) {
  // dir = -1 left, +1 right (outer end direction)
  const o = dir;
  let p = `<path d="M ${cx - 38 * o} ${cy + 6} Q ${cx} ${cy - 14} ${cx + 44 * o} ${cy + 2}" fill="none" stroke="${HAIR}" stroke-width="11" stroke-linecap="round"/>`;
  // individual brow hairs: kept in both states (structure, not texture)
  for (let i = 0; i < 9; i++) {
    const x = cx - 34 * o + i * 9 * o, y = cy + 2 - Math.sin(i / 8 * Math.PI) * 10;
    p += `<path d="M ${x} ${y + 6} l ${6 * o} -9" stroke="${HAIR}" stroke-width="2" stroke-linecap="round"/>`;
  }
  return p;
}

function texture() {
  // freckles, pores, fine hairs, under-eye and smile lines: the "doku"
  const r = rng(7);
  let t = '';
  for (let i = 0; i < 70; i++) { // freckles across nose + cheeks
    const a = r() * Math.PI * 2, d = Math.sqrt(r());
    const x = 300 + Math.cos(a) * 120 * d, y = 425 + Math.sin(a) * 42 * d;
    if (Math.abs(x - 300) < 16 && y > 440) continue;
    t += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(1.6 + r() * 2.2).toFixed(1)}" fill="#5B341F" opacity="${(0.55 + r() * 0.4).toFixed(2)}"/>`;
  }
  for (let i = 0; i < 90; i++) { // pores on cheeks / chin / forehead
    const zone = i % 3;
    let x, y;
    if (zone === 0) { x = 300 + (r() < .5 ? -1 : 1) * (60 + r() * 50); y = 470 + r() * 50; }
    else if (zone === 1) { x = 250 + r() * 100; y = 200 + r() * 70; }
    else { x = 268 + r() * 64; y = 560 + r() * 22; }
    t += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="1.2" fill="${LINE}" opacity=".45"/>`;
  }
  // under-eye lines
  for (const s of [-1, 1]) {
    const cx = 300 + s * 56;
    t += `<path d="M ${cx - 26} 392 Q ${cx} 404 ${cx + 26} 391" fill="none" stroke="${LINE}" stroke-width="1.6" opacity=".55"/>`;
    t += `<path d="M ${cx - 18} 400 Q ${cx} 409 ${cx + 18} 399" fill="none" stroke="${LINE}" stroke-width="1.2" opacity=".4"/>`;
    // smile line
    t += `<path d="M ${300 + s * 40} 470 Q ${300 + s * 56} 505 ${300 + s * 50} 540" fill="none" stroke="${LINE}" stroke-width="1.8" opacity=".5"/>`;
    // fine cheek hairs (peach fuzz) as short strokes along jaw
    for (let k = 0; k < 8; k++) {
      const yy = 400 + k * 18, xx = 300 + s * (112 - k * 4);
      t += `<path d="M ${xx} ${yy} l ${-s * 7} 4" stroke="${LINE}" stroke-width="1.1" opacity=".4"/>`;
    }
  }
  // forehead line
  t += `<path d="M 246 236 Q 300 228 354 236" fill="none" stroke="${LINE}" stroke-width="1.4" opacity=".4"/>`;
  // upper-lip fine hairs
  for (let k = -5; k <= 5; k++) t += `<path d="M ${300 + k * 6} 505 l 0 6" stroke="${LINE}" stroke-width="1" opacity=".35"/>`;
  return t;
}

function shadows() {
  // line-art hatching = shadows
  let t = '';
  for (const s of [-1, 1]) {
    for (let k = 0; k < 7; k++) { // under cheekbone
      const x = 300 + s * (96 - k * 6), y = 452 + k * 9;
      t += `<path d="M ${x} ${y} l ${-s * 16} 12" stroke="${LINE}" stroke-width="1.6" opacity=".5" stroke-linecap="round"/>`;
    }
    for (let k = 0; k < 5; k++) { // side of nose
      const x = 300 + s * 20, y = 380 + k * 14;
      t += `<path d="M ${x} ${y} l ${s * 6} 10" stroke="${LINE}" stroke-width="1.4" opacity=".45" stroke-linecap="round"/>`;
    }
    for (let k = 0; k < 6; k++) { // temple
      const x = 300 + s * (108 - k * 2), y = 262 + k * 12;
      t += `<path d="M ${x} ${y} l ${-s * 10} 8" stroke="${LINE}" stroke-width="1.4" opacity=".4" stroke-linecap="round"/>`;
    }
  }
  t += `<path d="M 278 566 Q 300 574 322 566" fill="none" stroke="${LINE}" stroke-width="2" opacity=".5" stroke-linecap="round"/>`; // under lower lip
  for (let k = -6; k <= 6; k++) t += `<path d="M ${300 + k * 10} 628 l 8 12" stroke="${LINE}" stroke-width="1.6" opacity=".5"/>`; // neck under chin
  return t;
}

function glow(id) {
  // added highlights: white light on top, skin fill unchanged underneath
  return `
  <defs><filter id="${id}" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="16"/></filter></defs>
  <g filter="url(#${id})" fill="#FFF3EA">
    <ellipse cx="300" cy="230" rx="70" ry="30" opacity=".32"/>
    <ellipse cx="216" cy="430" rx="34" ry="20" opacity=".36"/>
    <ellipse cx="384" cy="430" rx="34" ry="20" opacity=".36"/>
    <ellipse cx="300" cy="420" rx="11" ry="46" opacity=".45"/>
    <ellipse cx="300" cy="575" rx="22" ry="12" opacity=".35"/>
  </g>`;
}

function face(o = {}, id = 'f') {
  const { tex = true, eye: es = 1, jaw = 0, light = false } = o;
  return `
  <g>
    <!-- hair, back -->
    <path d="M 300 96 C 150 96 112 220 120 360 C 126 470 104 560 92 650 C 150 668 200 650 214 610
             L 386 610 C 400 650 450 668 508 650 C 496 560 474 470 480 360 C 488 220 450 96 300 96 Z" fill="${HAIR}"/>
    <!-- neck + shoulders -->
    <path d="M 252 560 L 252 650 C 200 664 120 680 70 720 L 530 720 C 480 680 400 664 348 650 L 348 560 Z" fill="${SKIN}" stroke="${LINE}" stroke-width="3"/>
    <path d="M 60 720 C 110 690 180 676 236 668 C 262 690 338 690 364 668 C 420 676 490 690 540 720 Z" fill="${CLOTH}" stroke="${LINE}" stroke-width="3"/>
    <!-- ears -->
    <path d="M 186 350 C 160 342 158 400 182 420" fill="${SKIN}" stroke="${LINE}" stroke-width="3"/>
    <path d="M 414 350 C 440 342 442 400 418 420" fill="${SKIN}" stroke="${LINE}" stroke-width="3"/>
    <!-- face -->
    <path d="${jawPath(jaw)}" fill="${SKIN}" stroke="${LINE}" stroke-width="3.5" stroke-linejoin="round"/>
    <clipPath id="${id}fc"><path d="${jawPath(jaw)}"/></clipPath>
    ${light ? `<g clip-path="url(#${id}fc)">${glow(id + 'g')}</g>` : shadows()}
    ${tex ? texture() : ''}
    ${brow(244, 324, -1)}${brow(356, 324, 1)}
    ${eye(244, 366, es, 'L' + id)}${eye(356, 366, es, 'R' + id)}
    <!-- nose -->
    <path d="M 290 360 C 288 400 284 430 278 448" fill="none" stroke="${LINE}" stroke-width="2.4" stroke-linecap="round" opacity=".8"/>
    <path d="M 266 458 C 260 474 274 484 286 478 C 292 486 308 486 314 478 C 326 484 340 474 334 458" fill="none" stroke="${LINE}" stroke-width="3" stroke-linecap="round"/>
    <path d="M 280 474 q 4 -5 9 0 M 311 474 q 4 -5 9 0" fill="none" stroke="${LINE}" stroke-width="2.4"/>
    <!-- lips -->
    <path d="M 256 524 C 272 510 290 508 300 515 C 310 508 328 510 344 524 C 324 530 276 530 256 524 Z" fill="${LIP}" stroke="${LINE}" stroke-width="2.6" stroke-linejoin="round"/>
    <path d="M 256 524 C 270 552 330 552 344 524 C 324 530 276 530 256 524 Z" fill="${LIP}" stroke="${LINE}" stroke-width="2.6" stroke-linejoin="round"/>
    <!-- hair, front strands -->
    <path d="M 300 108 C 236 110 190 160 180 236 C 200 190 244 162 300 160 C 356 162 400 190 420 236 C 410 160 364 110 300 108 Z" fill="${HAIR}"/>
    <g fill="none" stroke="${HAIR_LINE}" stroke-width="2" stroke-linecap="round" opacity=".9">
      <path d="M 150 250 C 140 330 150 420 120 520"/><path d="M 132 300 C 124 400 128 500 110 600"/>
      <path d="M 450 250 C 460 330 450 420 480 520"/><path d="M 468 300 C 476 400 472 500 490 600"/>
      <path d="M 240 126 C 214 150 198 180 190 214"/><path d="M 360 126 C 386 150 402 180 410 214"/>
      <path d="M 290 112 C 270 130 250 146 226 160"/><path d="M 310 112 C 330 130 350 146 374 160"/>
    </g>
  </g>`;
}

module.exports = { face, SKIN };
