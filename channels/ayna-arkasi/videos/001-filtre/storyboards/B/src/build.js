// Storyboard B · "Ayna ikiye bölünür" — 4 key frames (1080x1920) + contact sheet.
// Run: node build.js [--guides]
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const { face } = require('./face');

const SRC = __dirname;
const OUT = path.resolve(SRC, '..');
const GUIDES = process.argv.includes('--guides');
const CX = 470; // content centre: 0..940 (right 140 px rail kept empty)

const ORIG = { tex: true, eye: 1, jaw: 0, light: false };

function mirror(right, { scale = 1, top = 430, ghost = false, id = 'm' } = {}) {
  const W = 600 * scale, H = 720 * scale;
  return `
  <svg class="mirror" viewBox="0 0 600 720" style="position:absolute;left:${CX - W / 2}px;top:${top}px;width:${W}px;height:${H}px;overflow:visible">
    <defs>
      <clipPath id="${id}o"><ellipse cx="300" cy="360" rx="294" ry="354"/></clipPath>
      <clipPath id="${id}l"><rect x="0" y="0" width="300" height="720"/></clipPath>
      <clipPath id="${id}r"><rect x="300" y="0" width="300" height="720"/></clipPath>
    </defs>
    <g clip-path="url(#${id}o)">
      <rect width="600" height="720" fill="#271C32"/>
      <g clip-path="url(#${id}l)">${face(ORIG, id + 'a')}</g>
      <g clip-path="url(#${id}r)">${face(right, id + 'b')}</g>
      ${ghost ? `<line x1="210" y1="0" x2="210" y2="720" stroke="#F7EFF3" stroke-width="3" opacity=".22" stroke-dasharray="10 10"/>` : ''}
      <line x1="300" y1="0" x2="300" y2="720" stroke="#F7EFF3" stroke-width="5"/>
    </g>
    <path d="M 300 6 A 294 354 0 0 0 300 714" fill="none" stroke="var(--mint)" stroke-width="10"/>
    <path d="M 300 6 A 294 354 0 0 1 300 714" fill="none" stroke="var(--toz-pembe)" stroke-width="10"/>
    <g transform="translate(300 668)">
      <circle r="32" fill="#F7EFF3" stroke="#1C1424" stroke-width="4"/>
      <path d="M -9 -11 L -19 0 L -9 11 M 9 -11 L 19 0 L 9 11" fill="none" stroke="#1C1424" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
  </svg>`;
}

function labels(top = 400, scale = 1) {
  const q = 150 * scale;
  return `
  <div class="pill mint" style="left:${CX - q}px;top:${top}px">Filtresiz</div>
  <div class="pill pink" style="left:${CX + q}px;top:${top}px">Hesaplanmış</div>`;
}

function caption(words, active) {
  return `<div class="cap">${words.map((w, i) => `<span${i === active ? ' class="on"' : ''}>${w}</span>`).join(' ')}</div>`;
}

function steps(done) {
  const names = ['Doku', 'Göz · çene', 'Işık'];
  return `<div class="steps">${names.map((n, i) =>
    `<span class="st ${i < done ? 'done' : ''} ${i === done - 1 ? 'now' : ''}">${i + 1} · ${n}</span>`).join('')}</div>`;
}

const css = `
*{margin:0;box-sizing:border-box}
html,body{width:1080px;height:1920px;overflow:hidden}
body{background:var(--plum);color:var(--ink);font-family:'Be Vietnam Pro';position:relative}
.abs{position:absolute}
.hook{position:absolute;left:0;width:940px;top:176px;text-align:center;font-family:Charm;font-weight:700;font-size:96px;line-height:1.08}
.h2{position:absolute;left:0;width:940px;text-align:center;font-weight:700}
.pill{position:absolute;transform:translate(-50%,-50%);font-weight:700;font-size:32px;letter-spacing:.06em;text-transform:uppercase;
  padding:10px 22px;border-radius:40px;color:var(--plum);white-space:nowrap}
.pill.mint{background:var(--mint)} .pill.pink{background:var(--toz-pembe)}
.src{position:absolute;left:0;width:940px;text-align:center;font-weight:500;font-size:32px;color:var(--muted)}
.cap{position:absolute;left:0;width:940px;top:1214px;text-align:center;font-weight:700;font-size:72px;line-height:1.2;
  color:#F7EFF3;-webkit-text-stroke:12px rgba(0,0,0,.7);paint-order:stroke fill;white-space:nowrap}
.cap .on{color:var(--toz-pembe)}
.steps{position:absolute;left:0;width:940px;top:184px;display:flex;justify-content:center;gap:14px}
.st{font-weight:500;font-size:30px;padding:8px 20px;border-radius:30px;border:2px solid #4A3D57;color:var(--muted)}
.st.done{border-color:var(--toz-pembe);color:var(--toz-pembe)}
.st.now{background:var(--toz-pembe);color:var(--plum);font-weight:700}
.chips{position:absolute;left:40px;width:860px;top:330px;text-align:center;font-weight:500;font-size:30px;color:var(--muted)}
.guides{position:absolute;inset:0;pointer-events:none}
`;

function page(body) {
  const g = GUIDES ? `<div class="guides">
    <div class="abs" style="left:0;right:0;top:168px;border-top:2px dashed #0f0"></div>
    <div class="abs" style="left:0;right:0;top:1330px;border-top:2px dashed #0f0"></div>
    <div class="abs" style="top:0;bottom:0;left:940px;width:140px;background:rgba(255,0,0,.18)"></div></div>` : '';
  return `<!doctype html><html lang="tr"><head><meta charset="utf-8">
<link rel="stylesheet" href="../../../../../brand/brand.css"><style>${css}</style></head><body>${body}${g}</body></html>`;
}

const frames = [
  {
    id: 'f1',
    t: '0:00 – 0:03',
    what: 'Ayna ovali açılır. İki yarıda aynı çizim, aynı ten rengi. Sürgü tam ortada.',
    vo: '“Bu iki yarı aynı çizim. Biri filtresiz, biri hesaplanmış.”',
    sfx: 'ses efekti yok · sessiz açılış',
    html: page(`
      <div class="hook">Biri <span style="color:var(--mint)">filtresiz.</span><br>Biri <span style="color:var(--toz-pembe)">hesaplanmış.</span></div>
      ${mirror(ORIG, { top: 440, id: 'a' })}
      ${labels(440)}
      ${caption(['biri', 'hesaplanmış.'], 1)}
    `),
  },
  {
    id: 'f2',
    t: '0:05 – 0:11',
    what: 'Sürgü 1 sola kayar ve ortada durur (click). Sağda doku silinir: çil, gözenek, ince tüy. Şekil ve ışık aynı.',
    vo: '“Önce doku silinir: gözenekler, çiller, ince tüyler.”',
    sfx: 'sürgü durunca: click',
    html: page(`
      ${steps(1)}
      <div class="h2" style="top:262px;font-size:68px">Doku silindi</div>
      ${mirror({ tex: false, eye: 1, jaw: 0, light: false }, { top: 440, ghost: true, id: 'b' })}
      ${labels(440)}
      <div class="src" style="top:1168px">Kaynak: Tomasi &amp; Manduchi 1998</div>
      ${caption(['gözenekler,', 'çiller'], 1)}
    `),
  },
  {
    id: 'f3',
    t: '0:17 – 0:24',
    what: 'Sürgü 3 ortada kalır: üç fark birden görünür. Sağda doku yok, göz büyütülmüş, çene daraltılmış, gölgeler silinip parlama eklenmiş. Ten rengi iki yarıda aynı.',
    vo: '“Son olarak ışık eklenir: gölgeler silinir, yüze yapay bir parlaklık gelir. Ten rengi aynı kalır.”',
    sfx: 'sürgü durunca: click',
    html: page(`
      ${steps(3)}
      <div class="h2" style="top:262px;font-size:68px">Işık eklendi</div>
      <div class="chips" style="top:356px">gölgeler silindi · göz büyütüldü · çene daraltıldı</div>
      ${mirror({ tex: false, eye: 1.28, jaw: 1, light: true }, { top: 440, id: 'c' })}
      ${labels(440)}
      <div class="src" style="top:1168px">Kaynak: Schaefer vd. 2006; US 10152778</div>
      ${caption(['yapay', 'bir', 'parlaklık'], 2)}
    `),
  },
  {
    id: 'f4',
    t: '0:27 – 0:34',
    what: 'Ayna küçülür, sürgü ortada durur. Kapanış cümlesi; altında “Ayna Arkası” yazısı (logo yok). Kaynaklar açıklamada.',
    vo: '“Soldaki çizildi. Sağdaki hesaplandı. Filtreyi kullanmak senin seçimin, neyi değiştirdiğini bilmek de hakkın.”',
    sfx: 'yazı belirince: chime',
    html: page(`
      <div class="h2" style="top:184px;font-size:66px;line-height:1.25">Soldaki <span style="color:var(--mint)">çizildi.</span><br>Sağdaki <span style="color:var(--toz-pembe)">hesaplandı.</span></div>
      ${mirror({ tex: false, eye: 1.28, jaw: 1, light: true }, { top: 410, scale: 0.6, id: 'd' })}
      <div class="h2" style="top:860px;font-family:Charm;font-size:128px;line-height:1.1">Ayna Arkası</div>
      <div class="src" style="top:1044px;font-size:38px">Aynanın arkasına bak.</div>
      <div class="src" style="top:1110px">Kaynaklar açıklamada</div>
      ${caption(['bilmek', 'de', 'hakkın.'], 2)}
    `),
  },
];

(async () => {
  const browser = await chromium.launch();
  const page1 = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
  for (const f of frames) {
    const file = path.join(SRC, `${f.id}.html`);
    fs.writeFileSync(file, f.html);
    await page1.goto('file://' + file);
    await page1.evaluate(() => document.fonts.ready);
    await page1.screenshot({ path: path.join(OUT, `${f.id}${GUIDES ? '-guides' : ''}.png`) });
  }

  // contact sheet
  const W = 540, H = 960;
  const cells = frames.map((f, i) => `
    <div class="cell">
      <img src="../${f.id}.png" width="${W}" height="${H}">
      <div class="meta">
        <div class="ts"><b>${i + 1}</b> ${f.t}</div>
        <div class="what">${f.what}</div>
        <div class="vo">${f.vo}</div>
        <div class="sfx">${f.sfx}</div>
      </div>
    </div>`).join('');
  const sheet = `<!doctype html><html lang="tr"><head><meta charset="utf-8">
<link rel="stylesheet" href="../../../../../brand/brand.css"><style>
*{margin:0;box-sizing:border-box}
body{background:#140E1A;color:var(--ink);font-family:'Be Vietnam Pro';padding:56px 56px 48px;width:${4 * W + 3 * 36 + 112}px}
h1{font-family:Charm;font-weight:700;font-size:64px;color:var(--toz-pembe)}
.sub{font-weight:500;font-size:24px;color:var(--muted);margin:6px 0 36px}
.row{display:flex;gap:36px;align-items:flex-start}
.cell{width:${W}px}
img{display:block;border-radius:18px;border:2px solid #3A2E45}
.meta{padding-top:20px}
.ts{font-weight:700;font-size:28px;color:var(--toz-pembe)}
.ts b{display:inline-block;width:40px;height:40px;line-height:40px;text-align:center;border-radius:50%;background:var(--toz-pembe);color:var(--plum);margin-right:8px}
.what{font-weight:500;font-size:22px;line-height:1.45;margin-top:12px;color:var(--ink)}
.vo{font-weight:700;font-size:23px;line-height:1.45;margin-top:12px;color:var(--mint)}
.sfx{font-weight:500;font-size:19px;margin-top:10px;color:var(--muted)}
.foot{margin-top:36px;font-weight:500;font-size:19px;line-height:1.6;color:var(--muted);border-top:1px solid #3A2E45;padding-top:18px}
</style></head><body>
<h1>B · Ayna ikiye bölünür</h1>
<div class="sub">001 · “Filtre bir yüzü nasıl hesaplar?” · Short 1080×1920 · ~34 sn · 4 ana kare</div>
<div class="row">${cells}</div>
<div class="foot">Arada (0:11 – 0:17): sürgü 2 · “Göz büyütüldü, çene daraltıldı” · Ses: “Sonra şekil esnetilir: gözler büyür, çene daralır.” · nötr oklar, sparkle yok.<br>
Uyum: iki yarı aynı çizim kalitesinde · renk yalnızca çerçeve ve etiketlerde (sol mint “Filtresiz”, sağ toz pembe “Hesaplanmış”) · ten rengi iki yarıda aynı (#8A5A3C), ışık yalnızca parlama ekler · etiketler filtrenin ne yaptığını yazar, “daha güzel” demez · uygulama adı yok · çizim, gerçek kişi değil · logo henüz yok.</div>
</body></html>`;
  const sheetFile = path.join(SRC, 'storyboard.html');
  fs.writeFileSync(sheetFile, sheet);
  const p2 = await browser.newPage({ viewport: { width: 4 * W + 3 * 36 + 112, height: 800 } });
  await p2.goto('file://' + sheetFile);
  await p2.evaluate(() => document.fonts.ready);
  await p2.screenshot({ path: path.join(OUT, 'storyboard.png'), fullPage: true });
  await browser.close();
  console.log('done');
})();
