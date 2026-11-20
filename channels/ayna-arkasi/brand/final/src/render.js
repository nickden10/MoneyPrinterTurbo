// build.py'nin ürettiği sayfaları Playwright/Chromium ile PNG'ye çevirir.
const { chromium } = require('playwright');
const path = require('path');
const B = p => path.join(__dirname, 'build', p + '.html');
const O = p => path.join(__dirname, '..', p);
const jobs = [
  ['avatar-800', 800, 800, 'avatar-800.png'],
  ['watermark-150', 150, 150, 'watermark-150.png', true],
  ['banner-2560x1440', 2560, 1440, 'banner-2560x1440.png'],
  ['lockup-horizontal-keten-2000x600', 2000, 600, 'lockup-horizontal-keten-2000x600.png'],
  ['lockup-horizontal-toz-2000x600', 2000, 600, 'lockup-horizontal-toz-2000x600.png'],
  ['endcard-1080x1920', 1080, 1920, 'endcard-1080x1920.png'],
  ['caption-demo', 1080, 1920, 'src/build/caption-demo.png'],
  ['sheet', 3200, 2400, 'sheet.png'],
];
const only = process.argv.slice(2);
(async () => {
  const browser = await chromium.launch();
  for (const [name, w, h, out, transparent] of jobs) {
    if (only.length && !only.includes(name)) continue;
    const page = await browser.newPage({ viewport: { width: w, height: h } });
    await page.goto('file://' + B(name));
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(() => Promise.all([...document.images].map(i => i.complete || new Promise(r => (i.onload = i.onerror = r)))));
    await page.screenshot({ path: O(out), omitBackground: !!transparent });
    await page.close();
    console.log('✓', out);
  }
  await browser.close();
})();
