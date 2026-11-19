// Render: node render.js   (playwright gerekli; NODE_PATH ile verilebilir)
const { chromium } = require('playwright');
const path = require('path');

const SRC = __dirname;
const OUT = path.resolve(SRC, '..');
const page = 'file://' + path.join(SRC, 'page.html');

(async () => {
  const browser = await chromium.launch();
  const jobs = [{ q: '', out: 'yonler.png', w: 3000, h: 2200 }];
  for (let i = 1; i <= 6; i++) jobs.push({ q: `?d=${i}`, out: `0${i}.png`, w: 1600, h: 1000 });
  for (const j of jobs) {
    const p = await browser.newPage({ viewport: { width: j.w, height: j.h }, deviceScaleFactor: 1 });
    await p.goto(page + j.q);
    await p.evaluate(() => document.fonts.ready);
    await p.waitForFunction(() => document.body.dataset.ready === '1');
    await p.waitForTimeout(200);
    await p.screenshot({ path: path.join(OUT, j.out) });
    await p.close();
    console.log('ok', j.out);
  }
  await browser.close();
})();
