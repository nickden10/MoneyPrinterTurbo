/* Ayna Arkası · 001 · Hikâye A "478 nokta" · storyboard key frames.
   Line-art portrait (illustration, no real person) + 478 landmark dots + mesh.
   Colors come from brand.css tokens; skin/hair values are illustration colors. */
(function () {
  const NS = 'http://www.w3.org/2000/svg';
  const SKIN = '#8A5A3C', SKIN_SHADE = '#6E4530', LINE = '#2A1A1E', FRECKLE = '#5A3424';
  const HAIR = '#2B1C24', HAIR_LINE = '#7A5C6C';

  function rng(seed) { return function () { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }

  const FACE = 'M0,-232 C100,-232 172,-170 174,-70 C176,20 165,95 140,140 C115,185 70,222 0,230 C-70,222 -115,185 -140,140 C-165,95 -176,20 -174,-70 C-172,-170 -100,-232 0,-232 Z';
  const BROW_R = 'M36,-84 C60,-98 100,-102 134,-88';
  const BROW_L = 'M-36,-84 C-60,-98 -100,-102 -134,-88';
  const EYE_R = 'M42,-34 C58,-52 96,-54 114,-34 C96,-20 60,-18 42,-34 Z';
  const EYE_L = 'M-42,-34 C-58,-52 -96,-54 -114,-34 C-96,-20 -60,-18 -42,-34 Z';
  const NOSE = 'M-14,-40 C-16,0 -26,30 -38,52 C-44,64 -30,74 -18,68 C-10,76 10,76 18,68 C30,74 44,64 38,52 C26,30 16,0 14,-40';
  const LIP_OUT = 'M-56,126 C-36,110 -14,108 0,116 C14,108 36,110 56,126 C36,148 -36,148 -56,126 Z';
  const LIP_MID = 'M-56,126 C-30,130 30,130 56,126';

  function el(tag, attrs, parent) { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); if (parent) parent.appendChild(e); return e; }
  function sample(d, n, closed) { const p = el('path', { d }); const svg = el('svg', {}); svg.appendChild(p); document.body.appendChild(svg); const L = p.getTotalLength(); const out = []; for (let i = 0; i < n; i++) { const pt = p.getPointAtLength(L * i / (closed ? n : n - 1)); out.push([pt.x, pt.y]); } svg.remove(); return out; }

  /* 478 landmark points: features first, then sunflower fill clipped to the face path. */
  function landmarks() {
    const fixed = [].concat(
      sample(FACE, 36, true), sample(BROW_R, 10), sample(BROW_L, 10), sample(EYE_R, 16, true), sample(EYE_L, 16, true),
      [[78, -36], [78, -48], [78, -24], [66, -36], [90, -36], [-78, -36], [-78, -48], [-78, -24], [-66, -36], [-90, -36]],
      sample(NOSE, 18), sample(LIP_OUT, 24, true), sample(LIP_MID, 16));
    const svg = el('svg', {}); const fp = el('path', { d: FACE }, svg); document.body.appendChild(svg);
    const need = 478 - fixed.length; let N = need, fill = [];
    while (fill.length < need) {
      fill = [];
      for (let i = 0; i < N; i++) {
        const r = Math.sqrt((i + 0.5) / N), a = i * 2.39996323;
        const x = r * 166 * Math.cos(a), y = -2 + r * 226 * Math.sin(a);
        const pt = new DOMPoint(x, y);
        if (!fp.isPointInFill(pt)) continue;
        if (fixed.some(f => (f[0] - x) ** 2 + (f[1] - y) ** 2 < 100)) continue;
        fill.push([x, y]);
      }
      N += 8;
    }
    svg.remove();
    return fixed.concat(fill.slice(0, need));
  }

  /* Bowyer-Watson Delaunay (small n, O(n^2) is fine) */
  function delaunay(pts) {
    const P = pts.map(p => p.slice()); const big = [[-3000, -3000], [3000, -3000], [0, 3000]];
    const all = P.concat(big); const n = P.length; let tris = [[n, n + 1, n + 2]];
    function circ(t) { const [a, b, c] = t.map(i => all[i]); const d = 2 * (a[0] * (b[1] - c[1]) + b[0] * (c[1] - a[1]) + c[0] * (a[1] - b[1]));
      const ux = ((a[0] ** 2 + a[1] ** 2) * (b[1] - c[1]) + (b[0] ** 2 + b[1] ** 2) * (c[1] - a[1]) + (c[0] ** 2 + c[1] ** 2) * (a[1] - b[1])) / d;
      const uy = ((a[0] ** 2 + a[1] ** 2) * (c[0] - b[0]) + (b[0] ** 2 + b[1] ** 2) * (a[0] - c[0]) + (c[0] ** 2 + c[1] ** 2) * (b[0] - a[0])) / d;
      return [ux, uy, (a[0] - ux) ** 2 + (a[1] - uy) ** 2]; }
    let cc = tris.map(circ);
    for (let i = 0; i < n; i++) {
      const [x, y] = all[i]; const bad = [], keep = [], keepC = [];
      tris.forEach((t, k) => { const c = cc[k]; ((x - c[0]) ** 2 + (y - c[1]) ** 2 < c[2]) ? bad.push(t) : (keep.push(t), keepC.push(c)); });
      const edges = {}; bad.forEach(t => [[t[0], t[1]], [t[1], t[2]], [t[2], t[0]]].forEach(e => { const k = Math.min(...e) + '_' + Math.max(...e); edges[k] = (edges[k] || 0) + 1; }));
      tris = keep; cc = keepC;
      Object.keys(edges).forEach(k => { if (edges[k] === 1) { const [a, b] = k.split('_').map(Number); const t = [a, b, i]; tris.push(t); cc.push(circ(t)); } });
    }
    return tris.filter(t => t.every(i => i < n));
  }

  /* Portrait. opts: {x, y, s, texture:'full'|'sweep'|'none', sweepX, glow, dots, trails, mesh, dotOpacity, meshOpacity, mintTexture} */
  function portrait(svg, o) {
    const g = el('g', { transform: `translate(${o.x},${o.y}) scale(${o.s})` }, svg);
    const r = rng(7);
    const defs = el('defs', {}, g);
    const cp = el('clipPath', { id: 'faceclip' }, defs); el('path', { d: FACE }, cp);
    const neckClip = el('clipPath', { id: 'neckclip' }, defs); el('path', { d: 'M-60,150 C-60,240 -64,290 -70,330 L70,330 C64,290 60,240 60,150 Z' }, neckClip);
    if (o.texture === 'sweep') { const sc = el('clipPath', { id: 'texclip' }, defs); el('rect', { x: o.sweepX, y: -400, width: 800, height: 900 }, sc); }
    const blur = el('filter', { id: 'soft', x: '-50%', y: '-50%', width: '200%', height: '200%' }, defs); el('feGaussianBlur', { stdDeviation: 18 }, blur);

    // back hair: layered curls
    const curls = [];
    [[1.0, 32], [0.9, 30], [0.8, 28]].forEach(([k, rad], li) => {
      for (let th = -118; th <= 118; th += 13 - li * 1.5) {
        const t = (th + r() * 5) * Math.PI / 180;
        curls.push([Math.sin(t) * 238 * k, -40 - Math.cos(t) * 262 * k, rad + r() * 6]);
      }
    });
    const hairG = el('g', {}, g);
    curls.forEach(([x, y, rad]) => {
      el('circle', { cx: x, cy: y, r: rad, fill: HAIR, stroke: HAIR_LINE, 'stroke-width': 3 }, hairG);
      el('path', { d: `M${x - rad * 0.45},${y + rad * 0.1} a${rad * 0.45},${rad * 0.45} 0 1 1 ${rad * 0.5},${rad * 0.35}`, fill: 'none', stroke: HAIR_LINE, 'stroke-width': 2.2, 'stroke-linecap': 'round' }, hairG);
    });
    el('ellipse', { cx: 0, cy: -60, rx: 215, ry: 240, fill: HAIR }, hairG);

    // shoulders + neck
    el('path', { d: 'M-330,470 C-322,392 -210,350 -92,330 C-60,372 60,372 92,330 C210,350 322,392 330,470 Z', fill: '#3A2A46', stroke: 'var(--muted)', 'stroke-width': 3, 'stroke-linejoin': 'round' }, g);
    el('path', { d: 'M-60,150 C-60,240 -64,290 -70,330 C-40,352 40,352 70,330 C64,290 60,240 60,150 Z', fill: SKIN, stroke: LINE, 'stroke-width': 4 }, g);
    if (o.shadows !== false) el('ellipse', { cx: 0, cy: 205, rx: 90, ry: 40, fill: SKIN_SHADE, opacity: 0.75, 'clip-path': 'url(#neckclip)' }, g);
    el('path', { d: 'M-92,330 C-60,372 60,372 92,330', fill: 'none', stroke: 'var(--muted)', 'stroke-width': 3 }, g);

    // ears
    [-1, 1].forEach(sx => el('path', { d: `M${sx * 168},-40 C${sx * 200},-58 ${sx * 206},10 ${sx * 168},34`, fill: SKIN, stroke: LINE, 'stroke-width': 4 }, g));

    // face
    el('path', { d: FACE, fill: SKIN, stroke: LINE, 'stroke-width': 4.5 }, g);
    const inFace = el('g', { 'clip-path': 'url(#faceclip)' }, g);
    if (o.shadows !== false) { // natural shading (light step would remove it; colour of skin never changes)
      el('ellipse', { cx: -150, cy: 20, rx: 50, ry: 170, fill: SKIN_SHADE, opacity: 0.55, filter: 'url(#soft)' }, inFace);
      el('ellipse', { cx: 150, cy: 20, rx: 50, ry: 170, fill: SKIN_SHADE, opacity: 0.55, filter: 'url(#soft)' }, inFace);
      el('ellipse', { cx: 0, cy: -205, rx: 180, ry: 40, fill: SKIN_SHADE, opacity: 0.55, filter: 'url(#soft)' }, inFace);
    }

    // features
    const F = el('g', { fill: 'none', stroke: LINE, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
    [BROW_R, BROW_L].forEach(d => el('path', { d, 'stroke-width': 11 }, F));
    [[1], [-1]].forEach(([sx]) => { for (let i = 0; i < 9; i++) { const x = sx * (44 + i * 10); el('path', { d: `M${x},${-88 - (i % 3)} l${sx * 7},-7`, 'stroke-width': 2.2, stroke: '#1E1216' }, F); } });
    [EYE_R, EYE_L].forEach(d => el('path', { d, fill: '#F3E6DF', 'stroke-width': 4 }, F));
    [78, -78].forEach(x => { el('circle', { cx: x, cy: -36, r: 13, fill: '#3B2418', stroke: 'none' }, F); el('circle', { cx: x, cy: -36, r: 6, fill: '#140C0F', stroke: 'none' }, F); el('circle', { cx: x + 4, cy: -40, r: 3, fill: '#F7EFF3', stroke: 'none' }, F); });
    [[42, 114, 1], [-42, -114, -1]].forEach(([a, b]) => el('path', { d: `M${a},-34 C${a + (b - a) * 0.22},-54 ${a + (b - a) * 0.76},-56 ${b},-34`, 'stroke-width': 6 }, F));
    [[1], [-1]].forEach(([sx]) => el('path', { d: `M${sx * 48},-55 C${sx * 66},-64 ${sx * 96},-64 ${sx * 112},-50`, 'stroke-width': 2.5, opacity: 0.7 }, F)); // lid crease
    el('path', { d: NOSE, 'stroke-width': 4 }, F);
    el('path', { d: LIP_OUT, fill: '#6A3B2D', 'stroke-width': 3.5 }, F);
    el('path', { d: LIP_MID, 'stroke-width': 3 }, F);

    // texture: freckles, pores, fine hairs (neutral, not "flaws")
    const texParent = o.texture === 'sweep' ? el('g', { 'clip-path': 'url(#texclip)' }, g) : g;
    if (o.texture !== 'none') {
      const T = el('g', {}, texParent); const rt = rng(42);
      const tcol = o.mintTexture ? 'var(--mint)' : FRECKLE;
      for (let i = 0; i < 70; i++) { // freckles across nose bridge + cheeks
        const side = rt() < 0.5 ? -1 : 1; const x = side * (10 + rt() * 120), y = -8 + rt() * 70 - Math.abs(x) * 0.12;
        if (Math.abs(x) < 24 && y > 20) continue;
        el('circle', { cx: x, cy: y, r: 1.8 + rt() * 2.4, fill: FRECKLE, opacity: 0.85 }, T);
      }
      for (let i = 0; i < 160; i++) { // pores
        const x = (rt() - 0.5) * 300, y = -160 + rt() * 320; const pt = new DOMPoint(x, y);
        if (Math.abs(x) < 125 && y > -60 && y < -10) continue; if (Math.abs(x) < 64 && y > 104 && y < 150) continue;
        el('circle', { cx: x, cy: y, r: 1.1, fill: '#4A2C20', opacity: 0.55 }, T);
      }
      for (let i = 0; i < 26; i++) { // fine hairs at temples/sideburns
        const side = i % 2 ? 1 : -1; const y = -150 + (i / 26) * 200; const x = side * (150 + rt() * 14 - Math.max(0, y + 40) * 0.05);
        el('path', { d: `M${x},${y} l${-side * (6 + rt() * 4)},${8 + rt() * 4}`, stroke: '#3A2218', 'stroke-width': 1.6, 'stroke-linecap': 'round', fill: 'none', opacity: 0.9 }, T);
      }
      for (let i = 0; i < 18; i++) { // forehead micro texture lines (skin grain)
        const x = (rt() - 0.5) * 220, y = -170 + rt() * 50;
        el('path', { d: `M${x},${y} q6,-2 12,0`, stroke: '#5A3424', 'stroke-width': 1.3, fill: 'none', opacity: 0.6 }, T);
      }
    }

    // front fringe curls
    for (let x = -150; x <= 150; x += 26) {
      const y = -226 + Math.pow(Math.abs(x) / 150, 2) * 70 + r() * 6; const rad = 22 + r() * 6;
      el('circle', { cx: x, cy: y - 14, r: rad, fill: HAIR, stroke: HAIR_LINE, 'stroke-width': 3 }, g);
      el('path', { d: `M${x - rad * 0.4},${y - 10} a${rad * 0.42},${rad * 0.42} 0 1 1 ${rad * 0.5},${rad * 0.3}`, fill: 'none', stroke: HAIR_LINE, 'stroke-width': 2.2, 'stroke-linecap': 'round' }, g);
    }

    // smoothing sweep band (step 1)
    if (o.texture === 'sweep') {
      const band = el('g', { 'clip-path': 'url(#faceclip)' }, g);
      el('rect', { x: o.sweepX - 70, y: -260, width: 70, height: 520, fill: 'var(--toz-pembe)', opacity: 0.22, filter: 'url(#soft)' }, band);
      el('line', { x1: o.sweepX, y1: -250, x2: o.sweepX, y2: 250, stroke: 'var(--toz-pembe)', 'stroke-width': 3, 'stroke-dasharray': '2 10', 'stroke-linecap': 'round' }, band);
    }

    // landmark mesh + dots
    if (o.mesh || o.dots) {
      const pts = landmarks(); window.__count = pts.length;
      if (o.mesh) {
        const M = el('g', { stroke: 'var(--toz-pembe)', 'stroke-width': 1.3 / o.s, fill: 'none', opacity: o.meshOpacity ?? 0.4 }, g);
        const seen = {}; let dpath = '';
        delaunay(pts).forEach(t => [[t[0], t[1]], [t[1], t[2]], [t[2], t[0]]].forEach(([a, b]) => {
          const k = Math.min(a, b) + '_' + Math.max(a, b); if (seen[k]) return; seen[k] = 1;
          const [p, q] = [pts[a], pts[b]]; if ((p[0] - q[0]) ** 2 + (p[1] - q[1]) ** 2 > 70 ** 2) return;
          dpath += `M${p[0].toFixed(1)},${p[1].toFixed(1)}L${q[0].toFixed(1)},${q[1].toFixed(1)}`; }));
        el('path', { d: dpath }, M);
      }
      if (o.dots) {
        const D = el('g', { fill: 'var(--toz-pembe)', opacity: o.dotOpacity ?? 1 }, g); const rr = rng(3);
        pts.forEach(([x, y], i) => {
          if (o.trails && rr() < 0.16) {
            const len = 40 + rr() * 110;
            el('line', { x1: x, y1: y - len, x2: x, y2: y - 4, stroke: 'var(--toz-pembe)', 'stroke-width': 2.2 / o.s, 'stroke-linecap': 'round', opacity: 0.45 }, D);
          }
          el('circle', { cx: x, cy: y, r: 3.4 / o.s }, D);
        });
        if (o.rain) for (let i = 0; i < 46; i++) { // still falling
          const x = (rr() - 0.5) * 360, y = -330 - rr() * 120;
          el('line', { x1: x, y1: y - 60, x2: x, y2: y, stroke: 'var(--toz-pembe)', 'stroke-width': 2.2 / o.s, 'stroke-linecap': 'round', opacity: 0.4 }, D);
          el('circle', { cx: x, cy: y, r: 3.4 / o.s }, D);
        }
        if (o.drift) for (let i = 0; i < 70; i++) { // rewind: dots leaving upward
          const x = (rr() - 0.5) * 420, y = -260 - rr() * 200;
          el('circle', { cx: x, cy: y, r: (1.5 + rr() * 2.5) / o.s, opacity: 0.15 + rr() * 0.45 }, D);
        }
      }
    }
    return g;
  }

  window.AA = { portrait, el, NS };
})();
