// Render: node render.js   (playwright gerekli; gerekirse NODE_PATH ile verilir)
// Çıktı: ../renkler.png (3000×2400) ve ../01.png … ../06.png (1500×1100)
const { chromium } = require('playwright');
const path = require('path');

const SRC = __dirname;
const OUT = path.resolve(SRC, '..');
const url = 'file://' + path.join(SRC, 'page.html');

(async () => {
  const browser = await chromium.launch();
  const jobs = [{ q: '', out: 'renkler.png', w: 3000, h: 2400 }];
  for (let i = 1; i <= 6; i++) jobs.push({ q: `?d=${i}`, out: `0${i}.png`, w: 1500, h: 1100 });
  for (const j of jobs) {
    const p = await browser.newPage({ viewport: { width: j.w, height: j.h }, deviceScaleFactor: 1 });
    await p.goto(url + j.q);
    await p.evaluate(() => document.fonts.ready);
    await p.waitForFunction(() => document.body.dataset.ready === '1');
    const title = await p.title();
    if (title.startsWith('FAIL')) throw new Error('Kontrast hatası: ' + title);
    await p.waitForTimeout(150);
    await p.screenshot({ path: path.join(OUT, j.out) });
    await p.close();
    console.log('ok', j.out);
  }
  await browser.close();
})();
