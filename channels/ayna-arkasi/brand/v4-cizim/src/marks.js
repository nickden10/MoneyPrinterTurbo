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
    <path d="M162 290 C180 283 220 283 238 290" ${L(sw)}/>
    <path d="M246 296 C256 292 266 294 268 302 C262 306 254 306 248 304" ${F(C.krem, sw)}/>`}
    `;
  },
});

/* 02 — El aynası + şakayık (aynanın arkası) */
function peony(cx, cy, s, sw, av) {
  // 3/4 görünüşte çanak şakayık: arka fırfır, iki yan yaprak, ön yaprak
  const T = (d) => d.replace(/(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)/g, (_, x, y) => `${(cx + (x - 200) * s).toFixed(1)} ${(cy + (y - 150) * s).toFixed(1)}`);
  const sil = 'M138 132 C142 104 166 94 182 106 C188 90 212 88 220 104 C236 94 260 104 262 132 C274 154 264 188 230 198 C214 208 186 208 170 198 C136 188 126 154 138 132 Z';
  let o = `<path d="${T(sil)}" ${F(C.toz, sw)}/>`;
  if (av) return o;
  [
    'M138 132 C150 128 166 132 174 142',
    'M262 132 C250 128 234 132 226 142',
    'M170 198 C172 176 184 160 200 158 C216 160 228 176 230 198',
    'M174 142 C182 128 194 128 200 138 C206 128 218 128 226 142',
    'M182 106 C186 116 192 122 200 124 C208 122 214 116 220 104',
    'M150 160 C156 174 162 186 170 198',
    'M250 160 C244 174 238 186 230 198',
  ].forEach(p => (o += `<path d="${T(p)}" ${L(sw)}/>`));
  return o;
}
marks.push({
  id: '02', name: 'El aynası ve şakayık',
  meaning: 'Aynayı arkasından görüyoruz: yüzü değil, ardındaki hikâyeyi — kanalın adı birebir.',
  draw({ sw = 3, av = false }) {
    return `
    <path d="M186 262 C186 276 182 284 182 292 L218 292 C218 284 214 276 214 262" ${F(C.krem, sw)}/>
    <ellipse cx="200" cy="301" rx="15" ry="9" ${F(C.krem, sw)}/>
    <path d="M190 310 C188 330 189 352 192 370 L208 370 C211 352 212 330 210 310 Z" ${F(C.krem, sw)}/>
    <circle cx="200" cy="378" r="9" ${F(C.krem, sw)}/>
    <ellipse cx="200" cy="148" rx="104" ry="122" ${F(C.krem, sw)}/>
    ${av ? '' : `<ellipse cx="200" cy="148" rx="90" ry="108" ${L(sw)}/>`}
    ${av ? '' : `<path d="M200 204 C196 220 194 234 196 246" ${L(sw)}/>
    <path d="M178 202 C156 206 140 220 134 238 C156 240 172 226 178 202 Z" ${F(C.adacayi, sw)}/>
    <path d="M222 202 C244 206 260 220 266 238 C244 240 228 226 222 202 Z" ${F(C.adacayi, sw)}/>`}
    ${peony(200, av ? 150 : 140, av ? 1.25 : 1, sw, av)}
    `;
  },
});

/* 03 — Tek çizgi: profil aynanın kenarı olur */
marks.push({
  id: '03', name: 'Tek çizgi profil',
  meaning: 'Tek bir çizgi bir kadının profilini çizip kesilmeden karşısındaki aynaya dönüşüyor: bakan ile bakılan aynı çizgi.',
  draw({ sw = 3, av = false }) {
    return `
    <path d="M302 172 m-62 0 a62 86 0 1 0 124 0 a62 86 0 1 0 -124 0" fill="${C.toz}"/>
    <path d="M86 332 C86 300 82 276 72 258
      ${av ? 'C56 240 54 214 62 190' : 'C52 252 42 230 52 212 C62 196 86 198 92 214 C96 230 78 240 70 228 C58 210 58 196 62 186'}
      C68 146 92 108 128 96 C160 86 186 98 194 124
      C198 136 196 146 200 156
      C206 168 214 180 220 192 C222 198 218 202 210 202
      C214 208 214 212 210 216 C206 220 214 224 212 230
      C210 236 206 238 206 244
      C206 254 200 260 190 262
      C178 264 172 268 170 280 C168 300 168 318 172 336
      C180 356 236 358 270 352 C292 348 302 340 302 320 L302 258
      C268 258 240 220 240 172 C240 124 268 86 302 86 C336 86 364 124 364 172 C364 220 336 258 302 258" ${L(sw)}/>
    `;
  },
});

/* 04 — Göz ve kirpik */
marks.push({
  id: '04', name: 'Göz ve kirpik',
  meaning: 'Güzellik bakanın gözünde: irisin içindeki minik ayna, gördüğümüzün hep bir yansıma olduğunu hatırlatır.',
  draw({ sw = 3, av = false }) {
    const lashes = av ? '' : [
      'M122 158 C116 146 114 138 116 128',
      'M150 140 C147 128 147 120 151 110',
      'M182 132 C182 120 184 112 190 103',
      'M216 131 C220 120 224 113 232 106',
      'M250 139 C258 129 264 124 274 120',
      'M280 155 C291 148 299 146 310 146',
    ].map(p => `<path d="${p}" ${L(sw)}/>`).join('');
    return `
    <path d="M68 206 C112 150 160 126 206 126 C252 126 296 152 334 196 C312 156 268 100 204 100 C148 100 100 138 68 206 Z" fill="${C.toz}"/>
    <path d="M90 176 C126 120 172 100 206 100 C252 100 300 130 328 186" ${L(sw)} ${av ? 'opacity="0"' : ''}/>
    <clipPath id="eye${av ? 'a' : 'm'}"><path d="M66 208 C110 150 160 126 206 126 C254 126 300 154 334 198 C300 248 254 272 204 272 C150 272 102 248 66 208 Z"/></clipPath>
    <g clip-path="url(#eye${av ? 'a' : 'm'})">
      <circle cx="202" cy="196" r="${av ? 62 : 56}" ${F(C.adacayi, sw)}/>
      <circle cx="202" cy="196" r="${av ? 26 : 22}" fill="${C.murekkep}"/>
      <ellipse cx="220" cy="178" rx="${av ? 9 : 7}" ry="${av ? 13 : 10}" fill="${C.krem}"/>
    </g>
    <path d="M66 208 C110 150 160 126 206 126 C254 126 300 154 334 198" ${L(sw * 1.2)}/>
    <path d="M92 222 C126 254 166 272 204 272 C248 272 290 252 320 214" ${L(sw)}/>
    ${lashes}
    `;
  },
});

/* 05 — Ruj ve yansıması */
marks.push({
  id: '05', name: 'Ruj ve yansıması',
  meaning: 'Üstte gerçek, kullanılmış ruj; aynadaki yansıması kusursuz ve hiç dokunulmamış — gerçek ile ideal arasındaki fark.',
  draw({ sw = 3, av = false }) {
    const real = `
      <path d="M170 156 L170 100 C170 88 178 76 192 66 C206 58 226 62 230 72 L230 156 Z" ${F(C.toz, sw)}/>
      <rect x="160" y="152" width="80" height="34" rx="3" ${F(C.krem, sw)}/>
      <rect x="150" y="184" width="100" height="78" rx="4" ${F(C.krem, sw)}/>
      ${av ? '' : `<path d="M150 206 L250 206" ${L(sw)}/>`}`;
    const k = C.koyu, s2 = sw * 0.8;
    const LL = `fill="none" stroke="${k}" stroke-width="${s2}" stroke-linecap="round" stroke-linejoin="round"`;
    const refl = av ? '' : `
      <path d="M170 368 L170 412 C170 432 186 448 200 452 C214 448 230 432 230 412 L230 368" ${LL}/>
      <path d="M160 338 L160 368 L240 368 L240 338" ${LL}/>
      <path d="M150 266 L150 336 Q150 338 152 338 L248 338 Q250 338 250 336 L250 266" ${LL}/>
      <path d="M150 318 L250 318" ${LL}/>`;
    return `
    <g transform="translate(0 -8)">
    ${real}
    <path d="M${av ? 110 : 96} 262 L${av ? 290 : 304} 262" ${L(sw)}/>
    ${refl ? `<clipPath id="rf"><rect x="0" y="264" width="400" height="${av ? 0 : 118}"/></clipPath><g clip-path="url(#rf)">${refl}</g>` : ''}
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
