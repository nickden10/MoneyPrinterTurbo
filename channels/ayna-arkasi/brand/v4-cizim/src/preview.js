// Çizim iterasyonu için hızlı önizleme: node preview.js [id...] -> scratch PNG
const { chromium } = require('playwright');
const { marks, C } = require('./marks');
const out = process.env.OUT || '/tmp/preview.png';
const only = process.argv.slice(2);
const list = marks.filter(m => !only.length || only.includes(m.id));
const svg = (m, o, size) => `<svg viewBox="0 0 400 400" width="${size}" height="${size}">${m.draw(o)}</svg>`;
const html = `<html><body style="margin:0;background:${C.krem};display:flex;flex-wrap:wrap;gap:20px;padding:20px;width:1960px">
${list.map(m => `<div style="width:620px">${svg(m, { sw: 3 }, 600)}
<div style="display:flex;gap:20px;align-items:center">
<div style="width:160px;height:160px;border-radius:50%;background:${C.toz};display:flex;align-items:center;justify-content:center">${svg(m, { sw: 5, av: true }, 128)}</div>
<div style="width:48px;height:48px;border-radius:50%;background:${C.toz};display:flex;align-items:center;justify-content:center">${svg(m, { sw: 7, av: true }, 40)}</div>
<b style="font:20px sans-serif">${m.id}</b></div></div>`).join('')}
</body></html>`;
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 2000, height: 400 } });
  await p.setContent(html);
  await p.screenshot({ path: out, fullPage: true });
  await b.close();
})();
