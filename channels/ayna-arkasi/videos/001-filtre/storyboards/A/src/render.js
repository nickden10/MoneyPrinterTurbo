// node render.js [guides]  -> ../f1.png … ../f4.png
const { chromium } = require('playwright'); const path = require('path');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  for (const f of ['f1', 'f2', 'f3', 'f4']) {
    await p.goto('file://' + path.join(__dirname, f + '.html')); await p.evaluate(() => document.fonts.ready);
    if (process.argv[2] === 'guides') await p.evaluate(() => document.body.classList.add('guides'));
    await p.waitForTimeout(150);
    const n = await p.evaluate(() => window.__count); console.log(f, 'landmarks:', n);
    await p.screenshot({ path: path.join(__dirname, '..', f + (process.argv[2] === 'guides' ? '-guides' : '') + '.png') });
  }
  await b.close();
})();
