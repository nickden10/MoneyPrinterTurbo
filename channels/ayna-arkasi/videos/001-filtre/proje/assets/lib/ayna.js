// Ayna Arkası · 001 · shared drawing library for every scene.
// Line-art portrait from storyboards/C/src/face.js (illustration, not a real person; v3: blonde, fair skin), re-coloured
// to the final brand palette, split into named parts so the filter steps (smoothing, warp, light)
// can be driven as a pure function of timeline time. Face coordinates: viewBox 0 0 400 500.
(function () {
  "use strict";
  const C = {
    toz: "#F2D3D1", keten: "#F8F4EC", adacayi: "#BCC5B0", murekkep: "#2C3A31", koyu: "#4D6A55",
    // portrait colours are locked (SPEC §1.1, G-03): skin never changes in any frame.
    // v3 (client revision): fair skin, warm golden blonde loose waves; the dark ink outline keeps the
    // face separate from light grounds. Texture stays visible: freckles, pores, fine (peach) hairs.
    SKIN: "#EDC6A6", LINE: "#3A2418", HAIR: "#D9AE62", HAIRD: "#A8783A", HAIRL: "#ECCB86", BROW: "#8F6234",
    IRIS: "#5B7C8A", LIPU: "#B66F66", LIPL: "#C98479",
    EYE: "#FBF3EC", FRECKLE: "#A9623D", FUZZ: "#B68757", PORE: "#C9906F", SHIRT: "#4D6A55", HI: "#FFF6EC",
  };
  const P = {
    face: "M200 72 C292 72 322 150 318 232 C315 322 280 398 200 420 C120 398 85 322 82 232 C78 150 108 72 200 72 Z",
    browL: "M124 196 Q150 176 184 188", browR: "M216 188 Q250 176 276 196",
    eyeL: "M134 230 Q158 210 184 230 Q158 244 134 230 Z", eyeR: "M216 230 Q242 210 266 230 Q242 244 216 230 Z",
    lidL: "M136 224 Q158 204 182 222", lidR: "M218 222 Q242 204 264 224",
    nose: "M206 238 Q210 270 218 294",
    nostril: "M184 296 Q170 314 188 316 M216 296 Q230 314 212 316 M193 319 Q200 322 207 319",
    lipU: "M164 352 Q182 338 200 345 Q218 338 236 352 Q200 360 164 352 Z",
    lipL: "M164 352 Q200 384 236 352 Q200 360 164 352 Z",
    jaw: "M140 372 Q150 392 168 404",
  };
  const EYES = [[159, 229], [241, 229]];
  const DOT = [150, 284]; // carrier dot, left cheek, same place on every layer

  function rng(seed) { let s = seed >>> 0; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); }
  const f1 = (v) => v.toFixed(1);

  // ---- geometry: warp (eyes grow, jaw narrows); k in 0..1 -------------------------------
  const WARP_R = 62, WARP_K = 0.32, EYE_SCALE = 0.22, JAW = 0.06;
  // ke: eyes grow (radial bulge, x1.22 at the eye edge) · kj: jaw narrows by 6 %
  function warpPt(x, y, ke, kj) {
    let dx = 0, dy = 0;
    if (ke) for (const [cx, cy] of EYES) {
      const ex = x - cx, ey = y - cy, r = Math.hypot(ex, ey);
      if (r < WARP_R) { const f = WARP_K * ke * (1 - (r / WARP_R) ** 2) ** 2; dx += ex * f; dy += ey * f; }
    }
    let t = Math.min(1, Math.max(0, (y - 300) / 110)); t = t * t * (3 - 2 * t);
    return [(x + dx - 200) * (1 - JAW * (kj || 0) * t) + 200, y + dy];
  }
  function jawOnly(d, k) { // jaw narrowing without the eye bulge (face outline)
    return d.replace(/(-?\d+(?:\.\d+)?)\s+(-?\d+(?:\.\d+)?)/g, (m, a, b) => {
      const x = +a, y = +b; let t = Math.min(1, Math.max(0, (y - 300) / 110)); t = t * t * (3 - 2 * t);
      return f1((x - 200) * (1 - JAW * k * t) + 200) + " " + f1(y);
    });
  }
  function gridD(ke, kj) {
    const x0 = 92, x1 = 308, y0 = 172, y1 = 340, st = 8; let d = "";
    for (let x = x0; x <= x1; x += st) { for (let y = y0; y <= y1; y += 3) { const [p, q] = warpPt(x, y, ke, kj); d += (y === y0 ? "M" : "L") + f1(p) + " " + f1(q); } }
    for (let y = y0; y <= y1; y += st) { for (let x = x0; x <= x1; x += 3) { const [p, q] = warpPt(x, y, ke, kj); d += (x === x0 ? "M" : "L") + f1(p) + " " + f1(q); } }
    return d;
  }

  // ---- texture (freckles, pores, fine hair) ------------------------------------------------
  function texture(seed) {
    const r = rng(seed || 7); let s = "";
    const zones = [[150, 280, 48, 30], [250, 280, 48, 30], [200, 262, 26, 20]];
    for (let i = 0; i < 120; i++) { const z = zones[i % 3]; const a = r() * 6.283, d = Math.sqrt(r());
      s += `<circle cx="${f1(z[0] + Math.cos(a) * z[2] * d)}" cy="${f1(z[1] + Math.sin(a) * z[3] * d)}" r="${(0.9 + r() * 1.5).toFixed(2)}" fill="${C.FRECKLE}" opacity="${(0.55 + r() * 0.4).toFixed(2)}"/>`; }
    for (let i = 0; i < 160; i++) { const x = 110 + r() * 180, y = 250 + r() * 110; if (Math.abs(x - 200) < 22 && y < 330) continue;
      s += `<circle cx="${f1(x)}" cy="${f1(y)}" r="0.8" fill="${C.PORE}" opacity=".8"/>`; }
    for (let i = 0; i < 46; i++) { const left = i % 2 === 0; const x = left ? 94 + r() * 20 : 286 + r() * 20, y = 190 + r() * 120, dx = left ? -3 : 3;
      s += `<path d="M${f1(x)} ${f1(y)} q${dx} 4 ${dx * 1.6} 9" stroke="${C.FUZZ}" stroke-width="0.9" fill="none" opacity=".7"/>`; }
    s += `<path d="M140 248 Q158 256 178 248 M222 248 Q242 256 260 248" stroke="${C.FRECKLE}" stroke-width="1.4" fill="none" opacity=".6"/>` +
      `<path d="M170 312 Q160 330 164 344 M230 312 Q240 330 236 344" stroke="${C.FRECKLE}" stroke-width="1.6" fill="none" opacity=".55"/>`;
    for (let i = 0; i < 18; i++) { const x = 128 + r() * 144, y = 262 + r() * 50; if (Math.abs(x - 200) < 30) continue;
      s += `<path d="M${f1(x)} ${f1(y)} q4 -1.5 8 0" stroke="${C.FRECKLE}" stroke-width="1" fill="none" opacity=".45"/>`; }
    return s;
  }
  function hair() {
    // back mass: loose waves from the crown to the shoulders, behind the face and neck
    const back = "M200 44 C296 40 350 112 350 214 C350 290 338 352 352 410 Q362 440 344 462 Q318 476 292 462 " +
      "Q300 420 296 360 L296 214 Q200 168 104 214 L104 360 Q100 420 108 462 Q82 476 56 462 Q38 440 48 410 " +
      "C62 352 50 290 50 214 C50 112 104 48 200 44 Z";
    let s = `<path d="${back}" fill="${C.HAIR}" stroke="${C.HAIRD}" stroke-width="3" stroke-linejoin="round"/>`;
    const strands = ["M78 150 Q58 230 70 300 Q80 360 64 430", "M92 196 Q78 270 88 340 Q96 400 84 452",
      "M322 150 Q342 230 330 300 Q320 360 336 430", "M308 196 Q322 270 312 340 Q304 400 316 452",
      "M62 250 Q54 300 60 350", "M338 250 Q346 300 340 350", "M120 70 Q84 100 70 160", "M280 70 Q316 100 330 160"];
    s += strands.map((d) => `<path d="${d}" stroke="${C.HAIRD}" stroke-width="2.6" fill="none" stroke-linecap="round" opacity=".85"/>`).join("");
    s += `<path d="M70 210 Q62 260 72 300 M330 210 Q338 260 328 300" stroke="${C.HAIRL}" stroke-width="5" fill="none" stroke-linecap="round" opacity=".8"/>`;
    return s;
  }
  function curls() {
    // front: the parting and a few strands over the hair cap (no curls: loose waves)
    return `<path d="M196 74 Q170 96 150 112 M204 74 Q232 96 252 110 M176 82 Q140 100 116 140 M226 82 Q262 100 286 140" ` +
      `stroke="${C.HAIRD}" stroke-width="2.4" fill="none" stroke-linecap="round" opacity=".85"/>` +
      `<path d="M190 80 Q160 98 136 126 M212 80 Q246 98 270 126" stroke="${C.HAIRL}" stroke-width="4" fill="none" stroke-linecap="round" opacity=".75"/>`;
  }

  // ---- 478 landmark points (SPEC §2): contour, brows, eyes+lids, iris, nose, lips, fill ----
  let PTS = null;
  function points() {
    if (PTS) return PTS;
    const NS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(NS, "svg");
    svg.setAttribute("viewBox", "0 0 400 500");
    svg.setAttribute("style", "position:absolute;left:-9999px;top:0;width:400px;height:500px");
    (document.body || document.documentElement).appendChild(svg);
    const mk = (d) => { const p = document.createElementNS(NS, "path"); p.setAttribute("d", d); svg.appendChild(p); return p; };
    const pts = [];
    const sample = (d, n, closed, group) => { const p = mk(d), L = p.getTotalLength();
      for (let i = 0; i < n; i++) { const q = p.getPointAtLength((L * i) / (closed ? n : n - 1)); pts.push([q.x, q.y, group]); } p.remove(); };
    sample(P.face, 36, true, 0);
    sample(P.browL, 10, false, 1); sample(P.browR, 10, false, 1);
    sample(P.eyeL, 16, true, 2); sample(P.eyeR, 16, true, 2); sample(P.lidL, 8, false, 2); sample(P.lidR, 8, false, 2);
    EYES.forEach(([x, y]) => { pts.push([x, y, 3]); for (let k = 0; k < 4; k++) { const a = (k * Math.PI) / 2; pts.push([x + Math.cos(a) * 10, y + Math.sin(a) * 10, 3]); } });
    sample(P.nose, 12, false, 4); sample("M184 296 Q170 314 188 316", 8, false, 4); sample("M216 296 Q230 314 212 316", 8, false, 4);
    sample(P.lipU, 24, true, 5); sample(P.lipL, 20, true, 5);
    const fp = mk(P.face); let s = 1; const r = () => ((s = (s * 16807) % 2147483647) / 2147483647); let guard = 0;
    const q = svg.createSVGPoint();
    while (pts.length < window.AYNA_DATA.LANDMARKS && guard++ < 40000) {
      const x = 88 + r() * 226, y = 80 + r() * 336; q.x = x; q.y = y;
      if (!fp.isPointInFill(q)) continue;
      if (pts.some(([a, b]) => (a - x) ** 2 + (b - y) ** 2 < 64)) continue;
      pts.push([x, y, 6]);
    }
    svg.remove();
    if (pts.length !== window.AYNA_DATA.LANDMARKS) throw new Error("478 nokta üretilemedi: " + pts.length);
    PTS = pts; return pts;
  }

  // ---- the portrait --------------------------------------------------------------------------
  // o: {id, viewBox, bg, pixel:{cell,line}, points:{r, fill}, grid:true, arrows:{px}, reticle:{px}, dot:{px, ring}}
  function face(o) {
    const p = o.id, lw = o.lineW || 4;
    const st = `stroke="${C.LINE}" stroke-linecap="round" stroke-linejoin="round" fill="none"`;
    let defs = `<clipPath id="${p}-fc"><path id="${p}-fcp" d="${P.face}"/></clipPath>` +
      `<clipPath id="${p}-tc"><rect id="${p}-tcr" x="-1000" y="-1000" width="3000" height="3000"/></clipPath>` +
      `<filter id="${p}-blur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="10"/></filter>`;
    let pixelOpen = "", pixelGrid = "";
    if (o.pixel) {
      const c = o.pixel.cell, o0 = -400;
      defs += `<filter id="${p}-px" filterUnits="userSpaceOnUse" primitiveUnits="userSpaceOnUse" x="${o0}" y="${o0}" width="1200" height="1300">` +
        `<feFlood x="${o0 + c / 2 - 0.5}" y="${o0 + c / 2 - 0.5}" width="1" height="1" flood-color="#000"/>` +
        `<feComposite x="${o0}" y="${o0}" width="${c}" height="${c}"/><feTile result="a"/>` +
        `<feComposite in="SourceGraphic" in2="a" operator="in"/><feMorphology operator="dilate" radius="${c / 2}"/></filter>` +
        `<pattern id="${p}-pg" patternUnits="userSpaceOnUse" x="${o0}" y="${o0}" width="${c}" height="${c}">` +
        `<path d="M${c} 0 L0 0 0 ${c}" fill="none" stroke="${C.murekkep}" stroke-width="${o.pixel.line}"/></pattern>`;
      pixelOpen = ` filter="url(#${p}-px)"`;
      pixelGrid = `<rect id="${p}-pgr" x="-400" y="-400" width="1200" height="1300" fill="url(#${p}-pg)"/>`;
    }
    const bg = o.bg ? `<rect id="${p}-bg" x="-2000" y="-2000" width="4400" height="4500" fill="${o.bg}"/>` : "";
    const eye = (side, path, lid, [cx, cy]) =>
      `<g id="${p}-eye${side}"><path d="${path}" fill="${C.EYE}" stroke="${C.LINE}" stroke-width="${lw}"/>` +
      `<circle cx="${cx}" cy="${cy}" r="10" fill="${C.IRIS}" stroke="${C.LINE}" stroke-width="1.6"/><circle cx="${cx}" cy="${cy}" r="4.6" fill="${C.LINE}"/><circle cx="${cx + 3}" cy="${cy - 3}" r="2.6" fill="${C.EYE}"/>` +
      `<path d="${lid}" ${st} stroke-width="2" opacity=".7"/></g>`;
    let body =
      hair() +
      `<path d="M150 392 L152 470 Q200 492 248 470 L250 392 Z" fill="${C.SKIN}" stroke="${C.LINE}" stroke-width="${lw}"/>` +
      `<ellipse class="${p}-shd" cx="200" cy="410" rx="46" ry="14" fill="${C.FRECKLE}" opacity=".3"/>` +
      `<path d="M40 520 Q60 456 152 448 Q200 476 248 448 Q340 456 360 520 Z" fill="${C.SHIRT}" stroke="${C.LINE}" stroke-width="${lw}"/>` +
      `<ellipse cx="84" cy="240" rx="16" ry="30" fill="${C.SKIN}" stroke="${C.LINE}" stroke-width="${lw}"/>` +
      `<ellipse cx="316" cy="240" rx="16" ry="30" fill="${C.SKIN}" stroke="${C.LINE}" stroke-width="${lw}"/>` +
      `<path id="${p}-face" d="${P.face}" fill="${C.SKIN}" stroke="${C.LINE}" stroke-width="${lw}"/>` +
      `<g clip-path="url(#${p}-fc)">` +
      `<g clip-path="url(#${p}-tc)"><g id="${p}-tex">${texture(7)}</g></g>` +
      `<ellipse class="${p}-shd" cx="200" cy="324" rx="24" ry="6" fill="${C.FRECKLE}" opacity=".3"/>` +
      `<g id="${p}-hi" opacity="0" fill="${C.HI}" filter="url(#${p}-blur)">` +
      `<ellipse cx="200" cy="140" rx="60" ry="25"/><ellipse cx="146" cy="268" rx="45" ry="20"/>` +
      `<ellipse cx="254" cy="268" rx="45" ry="20"/><ellipse cx="210" cy="262" rx="10" ry="35"/></g></g>` +
      `<path d="M100 156 Q112 76 200 72 Q288 76 300 156 Q284 120 248 110 Q226 126 202 114 Q176 128 154 112 Q118 124 100 156 Z" fill="${C.HAIR}" stroke="${C.HAIRD}" stroke-width="2.4" stroke-linejoin="round"/>` +
      curls() +
      `<path d="${P.browL}" stroke="${C.BROW}" stroke-linecap="round" fill="none" stroke-width="9"/><path d="${P.browR}" stroke="${C.BROW}" stroke-linecap="round" fill="none" stroke-width="9"/>` +
      `<path d="M130 192 l4 -6 M142 186 l4 -7 M156 182 l3 -7 M170 182 l3 -6 M230 182 l-3 -6 M244 182 l-3 -7 M258 186 l-4 -7 M270 192 l-4 -6" stroke="${C.BROW}" stroke-width="2" stroke-linecap="round"/>` +
      eye("L", P.eyeL, P.lidL, EYES[0]) + eye("R", P.eyeR, P.lidR, EYES[1]) +
      `<path d="${P.nose}" ${st} stroke-width="3"/><path d="${P.nostril}" ${st} stroke-width="3.4"/>` +
      `<path d="${P.lipU}" fill="${C.LIPU}" stroke="${C.LINE}" stroke-width="3"/><path d="${P.lipL}" fill="${C.LIPL}" stroke="${C.LINE}" stroke-width="3"/>` +
      `<path d="M168 352 Q200 356 232 352" ${st} stroke-width="2.4"/>` +
      `<path id="${p}-jaw" d="${P.jaw}" ${st} stroke-width="${lw}"/>`;
    let extra = "";
    if (o.grid) {
      defs += `<clipPath id="${p}-gc"><rect id="${p}-gcr" x="80" y="160" width="240" height="0"/></clipPath>`;
      extra += `<g clip-path="url(#${p}-fc)"><g clip-path="url(#${p}-gc)"><path id="${p}-grid" d="${gridD(0, 0)}" fill="none" stroke="${C.murekkep}" stroke-opacity=".5" stroke-width="2" vector-effect="non-scaling-stroke"/></g></g>`;
    }
    if (o.arrows) {
      const u = 1 / o.arrows.px, w = 3 * u, h = 12 * u, col = `stroke="${C.murekkep}" stroke-opacity=".45"`;
      const arrow = (x1, y1, x2, y2) => { const a = Math.atan2(y2 - y1, x2 - x1), b = 0.5;
        return `<path d="M${f1(x1)} ${f1(y1)} L${f1(x2)} ${f1(y2)} M${f1(x2 - h * Math.cos(a - b))} ${f1(y2 - h * Math.sin(a - b))} L${f1(x2)} ${f1(y2)} L${f1(x2 - h * Math.cos(a + b))} ${f1(y2 - h * Math.sin(a + b))}" ${col} stroke-width="${w.toFixed(2)}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`; };
      extra += `<g id="${p}-arrows" opacity="0">` +
        arrow(159, 203, 159, 186) + arrow(159, 255, 159, 272) + arrow(127, 229, 110, 229) + arrow(191, 229, 202, 229) +
        arrow(241, 203, 241, 186) + arrow(241, 255, 241, 272) + arrow(273, 229, 290, 229) +
        arrow(108, 372, 124, 372) + arrow(292, 372, 276, 372) + `</g>`;
    }
    if (o.points) {
      const pts = points();
      extra += `<g id="${p}-pts" fill="${o.points.fill}" data-count="${pts.length}">` +
        pts.map(([x, y, g], i) => `<circle id="${p}-pt${i}" data-g="${g}" cx="${f1(x)}" cy="${f1(y)}" r="${o.points.r}"/>`).join("") + `</g>`;
    }
    if (o.reticle) {
      const s = 44 / o.reticle.px;
      extra += `<rect id="${p}-ret" x="${f1(DOT[0] - s / 2)}" y="${f1(DOT[1] - s / 2)}" width="${f1(s)}" height="${f1(s)}" rx="${f1(6 / o.reticle.px)}" fill="none" stroke="${C.murekkep}" stroke-width="2" vector-effect="non-scaling-stroke" opacity="0"/>`;
    }
    if (o.dot) {
      extra += `<circle id="${p}-dot" cx="${DOT[0]}" cy="${DOT[1]}" r="${f1(11 / o.dot.px)}" fill="${C.toz}" stroke="${o.dot.ring}" stroke-width="4" vector-effect="non-scaling-stroke"/>`;
    }
    return `<svg xmlns="http://www.w3.org/2000/svg" id="${p}-svg" viewBox="${o.viewBox}" width="${o.w}" height="${o.h}" preserveAspectRatio="xMidYMid slice" style="display:block;overflow:hidden">` +
      `<defs>${defs}</defs><g id="${p}-content"${pixelOpen}>${bg}${body}</g>${pixelGrid}${extra}</svg>`;
  }

  // ---- state: everything the filter does, as a pure function --------------------------------
  // st: {eye 0..1, jaw 0..1, texX (face units, texture visible right of it), tex 0..1, hi 0..0.35, sh 0.3..0.08}
  const STATE = {};
  function apply(p, st) {
    const $ = (s) => document.getElementById(p + "-" + s);
    const cur = (STATE[p] = STATE[p] || { eye: 0, jaw: 0 });
    if (st.eye !== undefined || st.jaw !== undefined) {
      if (st.eye !== undefined) cur.eye = st.eye;
      if (st.jaw !== undefined) cur.jaw = st.jaw;
      const k = cur.eye, kj = cur.jaw, s = 1 + EYE_SCALE * k;
      EYES.forEach(([cx, cy], i) => { const e = $(i ? "eyeR" : "eyeL");
        if (e) e.setAttribute("transform", `translate(${cx} ${cy}) scale(${s.toFixed(4)}) translate(${-cx} ${-cy})`); });
      const fd = jawOnly(P.face, kj);
      ["face", "fcp"].forEach((n) => { const e = $(n); if (e) e.setAttribute("d", fd); });
      const j = $("jaw"); if (j) j.setAttribute("d", jawOnly(P.jaw, kj));
      const g = $("grid"); if (g) g.setAttribute("d", gridD(k, kj));
      const pg = $("pts");
      if (pg && st.movePoints !== false) {
        const pts = points();
        for (let i = 0; i < pts.length; i++) { const [x, y] = warpPt(pts[i][0], pts[i][1], k, kj); const c = pg.children[i]; c.setAttribute("cx", f1(x)); c.setAttribute("cy", f1(y)); }
      }
    }
    if (st.texX !== undefined) { const r = $("tcr"); if (r) r.setAttribute("x", st.texX.toFixed(2)); }
    if (st.tex !== undefined) { const t = $("tex"); if (t) t.setAttribute("opacity", st.tex.toFixed(3)); }
    if (st.hi !== undefined) { const h = $("hi"); if (h) h.setAttribute("opacity", st.hi.toFixed(3)); }
    if (st.sh !== undefined) document.querySelectorAll("." + p + "-shd").forEach((e) => e.setAttribute("opacity", st.sh.toFixed(3)));
  }

  // ---- camera: viewBox {x,y,w,h}; keeps the carrier dot a constant pixel size ---------------
  function cam(p, vb, pxWidth) {
    const svg = document.getElementById(p + "-svg");
    svg.setAttribute("viewBox", `${vb.x.toFixed(3)} ${vb.y.toFixed(3)} ${vb.w.toFixed(3)} ${vb.h.toFixed(3)}`);
    const scale = pxWidth / vb.w;
    const d = document.getElementById(p + "-dot"); if (d) d.setAttribute("r", (11 / scale).toFixed(3));
    return scale;
  }
  function vbFrom(str) { const [x, y, w, h] = str.split(/\s+/).map(Number); return { x, y, w, h }; }

  window.AYNA = { C, P, EYES, DOT, face, apply, cam, vbFrom, points, warpPt };
})();
