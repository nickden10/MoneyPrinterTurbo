// Ayna Arkası — v4 çizim işaretleri. Her işaret 400×400 viewBox'ta elle yazılmış kübik Bézier yollarıdır.
// draw({sw, av}) -> SVG iç içeriği. sw = çizgi kalınlığı, av = avatar (sadeleştirilmiş) sürüm.
const C = {
  krem: '#F8F4EC', toz: '#F2D3D1', adacayi: '#BCC5B0', murekkep: '#2C3A31', koyu: '#4D6A55',
};
const L = (sw) => `fill="none" stroke="${C.murekkep}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"`;
const F = (fill, sw) => `fill="${fill}" stroke="${C.murekkep}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"`;

const marks = [];

/* 01 — Pudra kutusu */
marks.push({
  id: '01', name: 'Pudra kutusu',
  meaning: 'Açık pudralık: kapağı ayna, içi toz pembe — makyajın ve aynanın aynı kutuda durduğu an.',
  draw({ sw = 3, av = false }) {
    return `
    <circle cx="200" cy="132" r="100" ${F(C.krem, sw)}/>
    <circle cx="200" cy="132" r="82" ${F(C.adacayi, sw)}/>
    ${av ? '' : `<path d="M146 104 C156 84 172 70 192 64" ${L(sw)} stroke="${C.krem}"/>`}
    <path d="M186 228 L186 248 M214 228 L214 248" ${L(sw)}/>
    <path d="M78 296 L78 312 C78 337 133 356 200 356 C267 356 322 337 322 312 L322 296" ${F(C.krem, sw)}/>
    <ellipse cx="200" cy="296" rx="122" ry="44" ${F(C.krem, sw)}/>
    <ellipse cx="200" cy="298" rx="96" ry="31" ${F(C.toz, sw)}/>
    ${av ? '' : `<path d="M150 300 C150 282 172 274 200 274 C228 274 250 282 250 300 C250 312 228 318 200 318 C172 318 150 312 150 300 Z" ${F(C.krem, sw)}/>
    <path d="M162 290 C180 283 220 283 238 290" ${L(sw)}/>`}
    `;
  },
});

/* 02 — El aynası + şakayık (aynanın arkası) */
function peony(cx, cy, s, sw, av) {
  // 3/4 görünüşte çanak şakayık: arka fırfır, iki yan yaprak, ön yaprak
  const T = (d) => d.replace(/(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)/g, (_, x, y) => `${(cx + (x - 200) * s).toFixed(1)} ${(cy + (y - 150) * s).toFixed(1)}`);
  const petals = [
    'M200 84 C226 98 232 136 220 168 L180 168 C168 136 174 98 200 84 Z',
    'M146 108 C176 108 196 136 198 174 L160 178 C144 158 138 132 146 108 Z',
    'M254 108 C224 108 204 136 202 174 L240 178 C256 158 262 132 254 108 Z',
    'M118 146 C150 136 186 156 198 192 C168 204 136 194 124 174 C119 164 117 155 118 146 Z',
    'M282 146 C250 136 214 156 202 192 C232 204 264 194 276 174 C281 164 283 155 282 146 Z',
    'M162 174 C176 158 224 158 238 174 C236 196 220 208 200 208 C180 208 164 196 162 174 Z',
  ];
  let o = '';
  (av ? [petals[0], petals[3], petals[4], petals[5]] : petals).forEach(p => (o += `<path d="${T(p)}" ${F(C.toz, sw)}/>`));
  if (!av) o += `<path d="${T('M200 168 C196 182 196 194 200 206')}" ${L(sw * 0.7)}/>`;
  return o;
}
marks.push({
  id: '02', name: 'El aynası ve nilüfer',
  meaning: 'Aynayı arkasından görüyoruz: sırtına işlenmiş bir çiçek — yüzü değil, ardındaki hikâyeyi gösteren kanal adının birebir çizimi.',
  draw({ sw = 3, av = false }) {
    return `
    <path d="M186 262 C186 276 182 284 182 292 L218 292 C218 284 214 276 214 262" ${F(C.krem, sw)}/>
    <ellipse cx="200" cy="301" rx="15" ry="9" ${F(C.krem, sw)}/>
    <path d="M190 310 C188 330 189 352 192 370 L208 370 C211 352 212 330 210 310 Z" ${F(C.krem, sw)}/>
    <circle cx="200" cy="378" r="9" ${F(C.krem, sw)}/>
    <ellipse cx="200" cy="148" rx="104" ry="122" ${F(C.krem, sw)}/>
    ${av ? '' : `<ellipse cx="200" cy="148" rx="90" ry="108" ${L(sw)}/>`}
    ${av ? '' : `<path d="M182 200 C160 202 140 214 132 234 C158 236 176 224 182 200 Z" ${F(C.adacayi, sw)}/>
    <path d="M218 200 C240 202 260 214 268 234 C242 236 224 224 218 200 Z" ${F(C.adacayi, sw)}/>
    <path d="M180 206 C166 216 150 226 136 232 M220 206 C234 216 250 226 264 232" ${L(sw * 0.7)}/>`}
    ${peony(200, av ? 136 : 130, av ? 1.1 : 1, sw, av)}
    `;
  },
});

/* 03 — Parfüm şişesi (tek çizgi profil 3 denemede amatör kaldı; yerine) */
marks.push({
  id: '03', name: 'Parfüm şişesi',
  meaning: 'Şişede satılan güzellik: etiketi bir ayna ovali — güzellik pazarlamasının ambalajını açıp içine bakıyoruz.',
  draw({ sw = 3, av = false }) {
    const body = 'M200 176 C252 176 290 214 290 270 C290 326 252 364 200 364 C148 364 110 326 110 270 C110 214 148 176 200 176 Z';
    return `
    <clipPath id="pf${av ? 'a' : 'm'}"><path d="${body}"/></clipPath>
    <path d="${body}" fill="${C.krem}"/>
    <g clip-path="url(#pf${av ? 'a' : 'm'})">
      <path d="M100 252 C150 249 250 249 300 252 L300 380 L100 380 Z" fill="${C.toz}"/>
      ${av ? '' : `<path d="M100 252 C150 249 250 249 300 252" ${L(sw)}/>`}
    </g>
    <path d="${body}" ${L(sw)}/>
    <rect x="182" y="154" width="36" height="24" ${F(C.krem, sw)}/>
    <rect x="170" y="144" width="60" height="14" rx="4" ${F(C.krem, sw)}/>
    <path d="M200 44 C230 62 240 104 220 144 L180 144 C160 104 170 62 200 44 Z" ${F(C.adacayi, sw)}/>
    ${av ? '' : `<path d="M200 50 L200 142" ${L(sw * 0.7)}/>`}
    <ellipse cx="200" cy="284" rx="${av ? 40 : 36}" ry="${av ? 50 : 46}" ${F(C.krem, sw)}/>
    ${av ? '' : `<ellipse cx="200" cy="284" rx="27" ry="37" ${L(sw * 0.7)}/>`}
    `;
  },
});

/* 04 — Göz ve kirpik */
const bz = (p, t) => { const u = 1 - t; return [0, 1].map(k => u*u*u*p[0][k] + 3*u*u*t*p[1][k] + 3*u*t*t*p[2][k] + t*t*t*p[3][k]); };
const bzd = (p, t) => { const u = 1 - t; return [0, 1].map(k => 3*u*u*(p[1][k]-p[0][k]) + 6*u*t*(p[2][k]-p[1][k]) + 3*t*t*(p[3][k]-p[2][k])); };
const LID = [[64, 206], [132, 116], [270, 108], [336, 194]];
marks.push({
  id: '04', name: 'Göz ve kirpik',
  meaning: 'Güzellik bakanın gözünde: irisin içindeki minik oval ayna, gördüğümüzün hep bir yansıma olduğunu hatırlatır.',
  draw({ sw = 3, av = false }) {
    const f = (n) => n.toFixed(1);
    let lashes = '';
    if (!av) {
      [0.30, 0.43, 0.56, 0.68, 0.79, 0.89].forEach((t, i) => {
        const [x, y] = bz(LID, t), [dx, dy] = bzd(LID, t), m = Math.hypot(dx, dy);
        const nx = dy / m, ny = -dx / m, tx = dx / m, ty = dy / m; // normal dışa (yukarı)
        const len = 22 + i * 5, bend = 8 + i * 3;
        const ex = x + nx * len + tx * bend, ey = y + ny * len + ty * bend;
        const c1x = x + nx * len * 0.55, c1y = y + ny * len * 0.55;
        lashes += `<path d="M${f(x)} ${f(y)} Q${f(c1x)} ${f(c1y)} ${f(ex)} ${f(ey)}" ${L(sw)}/>`;
      });
    }
    const lid = `M64 206 C132 116 270 108 336 194`;
    return `
    ${av ? '' : `<path d="M78 188 C136 86 270 76 328 184 C262 114 136 118 78 188 Z" fill="${C.toz}"/>`}
    <clipPath id="eye${av ? 'a' : 'm'}"><path d="${lid} C292 250 248 276 200 276 C150 276 104 254 64 206 Z"/></clipPath>
    <g clip-path="url(#eye${av ? 'a' : 'm'})">
      <circle cx="198" cy="200" r="${av ? 64 : 58}" ${F(C.adacayi, sw)}/>
      <circle cx="198" cy="200" r="${av ? 28 : 23}" fill="${C.murekkep}"/>
      <ellipse cx="216" cy="182" rx="${av ? 10 : 7}" ry="${av ? 14 : 10}" fill="${C.krem}" ${av ? '' : `stroke="${C.murekkep}" stroke-width="${sw * 0.6}"`}/>
    </g>
    <path d="${lid}" ${L(sw * 1.25)}/>
    <path d="M88 226 C122 258 160 276 200 276 C246 276 286 256 318 220" ${L(sw)}/>
    ${lashes}
    `;
  },
});

/* 05 — Ruj ve yansıması */
marks.push({
  id: '05', name: 'Ruj ve yansıması',
  meaning: 'Üstte gerçek, eğik aşınmış ruj; alttaki yansıması el değmemiş, kusursuz — gerçek ile idealin arasındaki fark.',
  draw({ sw = 3, av = false }) {
    const real = `
      <path d="M182 104 L182 70 C182 66 184 63 188 61 L210 48 C215 45 218 47 218 52 L218 104 Z" ${F(C.toz, sw)}/>
      <rect x="176" y="102" width="48" height="30" rx="2" ${F(C.krem, sw)}/>
      <rect x="166" y="130" width="68" height="72" rx="3" ${F(C.krem, sw)}/>
      ${av ? '' : `<path d="M166 146 L234 146" ${L(sw)}/>`}`;
    const g = C.adacayi;
    const refl = av ? '' : `
      <rect x="166" y="210" width="68" height="70" rx="3" fill="${g}"/>
      <rect x="176" y="284" width="48" height="26" rx="2" fill="${g}"/>
      <path d="M182 314 L182 338 C182 352 190 362 200 364 C210 362 218 352 218 338 L218 314 Z" fill="${g}"/>
      <path d="M166 264 L234 264" stroke="${C.krem}" stroke-width="${sw}"/>`;
    return `
    <g transform="translate(0 ${av ? 50 : 0})">
    ${real}
    <path d="M${av ? 120 : 108} 206 L${av ? 280 : 292} 206" ${L(sw)}/>
    ${refl}
    </g>
    `;
  },
});

/* 06 — Şakayık tomurcuğu, ayna ovalinin içinde */
marks.push({
  id: '06', name: 'Şakayık tomurcuğu',
  meaning: 'Aynanın çerçevesine sığmayan bir tomurcuk: güzellik, aynanın gösterdiğinden fazlası.',
  draw({ sw = 3, av = false }) {
    return `
    <ellipse cx="200" cy="214" rx="112" ry="150" ${L(sw)}/>
    ${av ? '' : `<ellipse cx="200" cy="214" rx="100" ry="138" ${L(sw * 0.7)}/>`}
    <path d="M200 340 C198 300 204 250 200 178" ${L(sw)}/>
    <path d="M201 292 C224 268 254 262 270 266 C262 288 232 300 201 292 Z" ${F(C.adacayi, sw)}/>
    ${av ? '' : `<path d="M201 292 C224 280 244 274 262 270" ${L(sw * 0.7)}/>`}
    <path d="M200 248 C178 226 150 222 134 226 C142 248 172 258 200 248 Z" ${F(C.adacayi, sw)}/>
    ${av ? '' : `<path d="M200 248 C180 236 160 230 142 228" ${L(sw * 0.7)}/>`}
    <path d="M200 52 C236 70 252 110 248 140 C244 168 224 184 200 184 C176 184 156 168 152 140 C148 110 164 70 200 52 Z" fill="${C.krem}" stroke="none"/>
    <path d="M200 58 C232 74 250 108 246 138 C242 166 224 182 200 182 C176 182 158 166 154 138 C150 108 168 74 200 58 Z" ${F(C.toz, sw)}/>
    ${av ? '' : `<path d="M200 58 C188 84 184 112 192 140 C196 156 204 170 214 180" ${L(sw)}/>
    <path d="M232 92 C218 104 212 124 216 146" ${L(sw)}/>`}
    <path d="M200 184 C186 184 166 176 158 158 C172 160 188 168 200 184 C212 168 228 160 242 158 C234 176 214 184 200 184 Z" ${F(C.adacayi, sw)}/>
    `;
  },
});

module.exports = { marks, C };
