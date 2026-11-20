// Ayna Arkası v4 — çizim işaretleri: SVG'leri yazar, konsept sayfalarını ve panoyu Playwright ile PNG'ye çevirir.
// Çalıştır: node build.js   (bu klasörden)
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const { marks, C } = require('./marks');

const ROOT = path.join(__dirname, '..');
const BUILD = path.join(__dirname, 'build');
fs.mkdirSync(BUILD, { recursive: true });
fs.mkdirSync(path.join(ROOT, 'svg'), { recursive: true });

const wmRaw = fs.readFileSync(path.join(__dirname, 'wordmark.svg'), 'utf8');
const wmInner = wmRaw.replace(/^[\s\S]*?<\/title>/, '').replace(/<\/svg>\s*$/, '');
const WM_W = 1000, WM_H = 201.222;
const wordmark = (w) => `<svg viewBox="0 0 ${WM_W} ${WM_H}" width="${w}" height="${(w * WM_H) / WM_W}" aria-label="Ayna Arkası">${wmInner}</svg>`;

const AV = { 160: 11, 48: 15 }; // avatar çizgi kalınlığı (400 birimde)
const markSvg = (m, size, o = { sw: 3 }) => `<svg viewBox="0 0 400 400" width="${size}" height="${size}">${m.draw(o)}</svg>`;
const avatar = (m, d) => `<div class="av" style="width:${d}px;height:${d}px">${markSvg(m, Math.round(d * 0.8), { sw: AV[d], av: true })}</div>`;
// kilit: işaret, kelime logosunun yanında daha kalın çizgi (sw 5) ve kırpılmış viewBox ile durur
const lockup = (m, h, ww) => `<div class="lk" style="gap:${Math.round(h * 0.12)}px"><svg viewBox="26 26 348 348" width="${h}" height="${h}">${m.draw({ sw: 5 })}</svg>${wordmark(ww)}</div>`;

const css = `
@font-face { font-family: 'BVP'; src: url(../fonts/BeVietnamPro-Medium.ttf); font-weight: 500; }
* { box-sizing: border-box; margin: 0; padding: 0; }
body { background: ${C.krem}; color: ${C.murekkep}; font-family: 'BVP', sans-serif; font-weight: 500; }
.av { border-radius: 50%; background: ${C.toz}; display: flex; align-items: center; justify-content: center; flex: none; }
.lk { display: flex; align-items: center; gap: 0; }
.lbl { font-size: 20px; letter-spacing: 0.02em; color: ${C.koyu}; }
.lbl b { font-weight: 500; color: ${C.murekkep}; margin-right: 10px; }
.cap { font-size: 15px; color: ${C.koyu}; opacity: .85; letter-spacing: .04em; }
`;
const page = (body, w, h) => `<!doctype html><html lang="tr"><head><meta charset="utf-8"><style>${css}
html,body{width:${w}px;height:${h}px;overflow:hidden}</style></head><body>${body}</body></html>`;

// --- tek konsept sayfası 1600×1000
const concept = (m) => page(`
<div style="position:absolute;left:72px;top:60px" class="lbl"><b>${m.id}</b>${m.name}</div>
<div style="position:absolute;left:40px;top:120px;width:760px;height:760px;display:flex;align-items:center;justify-content:center">${markSvg(m, 600)}</div>
<div style="position:absolute;left:860px;top:250px">${lockup(m, 190, 420)}</div>
<div style="position:absolute;left:880px;top:560px;display:flex;align-items:flex-end;gap:56px">
  <div>${avatar(m, 160)}<div class="cap" style="margin-top:14px;text-align:center">160 px</div></div>
  <div>${avatar(m, 48)}<div class="cap" style="margin-top:14px;text-align:center">48 px</div></div>
</div>
<div style="position:absolute;left:880px;top:820px;width:620px;font-size:19px;line-height:1.5;color:${C.koyu}">${m.meaning}</div>
`, 1600, 1000);

// --- pano 3000×2400, 3×2
const cell = (m) => `<div style="position:relative;width:860px;height:1000px">
  <div class="lbl" style="position:absolute;left:0;top:0"><b>${m.id}</b>${m.name}</div>
  <div style="position:absolute;left:0;top:60px;width:860px;height:560px;display:flex;align-items:center;justify-content:center">${markSvg(m, 500)}</div>
  <div style="position:absolute;left:30px;top:680px">${lockup(m, 136, 330)}</div>
  <div style="position:absolute;left:30px;top:850px;display:flex;align-items:center;gap:36px">${avatar(m, 160)}${avatar(m, 48)}</div>
</div>`;
const board = page(`
<div style="position:absolute;left:150px;top:90px;display:flex;justify-content:space-between;width:2700px" class="lbl">
  <span><b>Ayna Arkası</b>Çizim işaretleri · v4</span><span>Krem zemin · toz pembe · adaçayı · mürekkep</span></div>
<div style="position:absolute;left:150px;top:220px;display:grid;grid-template-columns:repeat(3,860px);column-gap:60px;row-gap:100px">
${marks.map(cell).join('')}
</div>`, 3000, 2400);

(async () => {
  // SVG dosyaları
  for (const m of marks) {
    fs.writeFileSync(path.join(ROOT, 'svg', `${m.id}-mark.svg`),
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400"><title>Ayna Arkası — ${m.name}</title>${m.draw({ sw: 3 })}</svg>\n`);
    fs.writeFileSync(path.join(ROOT, 'svg', `${m.id}-avatar.svg`),
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400"><title>Ayna Arkası — ${m.name} (avatar)</title><circle cx="200" cy="200" r="200" fill="${C.toz}"/><g transform="translate(40 40) scale(0.8)">${m.draw({ sw: 11, av: true })}</g></svg>\n`);
  }
  const jobs = marks.map(m => [`concept-${m.id}`, concept(m), 1600, 1000, `${m.id}.png`]);
  jobs.push(['board', board, 3000, 2400, 'cizimler.png']);
  const browser = await chromium.launch();
  for (const [name, html, w, h, out] of jobs) {
    const f = path.join(BUILD, name + '.html');
    fs.writeFileSync(f, html);
    const p = await browser.newPage({ viewport: { width: w, height: h } });
    await p.goto('file://' + f);
    await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: path.join(ROOT, out) });
    await p.close();
    console.log('✓', out);
  }
  await browser.close();
})();
