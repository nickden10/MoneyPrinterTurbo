// Kullanım: node shot.js page.html out.png W H [transparent] [scale]
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const [html, out, W, H, transparent, scale] = process.argv.slice(2);
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: +W, height: +H }, deviceScaleFactor: +(scale || 1) });
  await page.goto('file://' + path.resolve(html));
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(150);
  await page.screenshot({ path: out, omitBackground: transparent === '1', clip: { x: 0, y: 0, width: +W, height: +H } });
  await browser.close();
})();
