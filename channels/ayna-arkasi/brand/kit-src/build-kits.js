// Ayna Arkası — YouTube marka kitleri (Kit 1: Pudra kutusu, Kit 2: El aynası ve nilüfer)
// Çalıştır: node build-kits.js   (bu klasörden). Playwright/Chromium ile PNG üretir.
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const { marks, C } = require('../v4-cizim/src/marks');

const BRAND = path.join(__dirname, '..');
const FONT = path.join(BRAND, 'fonts', 'BeVietnamPro-Medium.ttf');
const TMP = path.join(__dirname, 'build');
fs.mkdirSync(TMP, { recursive: true });

const SLOGAN = 'Aynanın arkasına bak.';
const KITS = [
  { id: '01', dir: 'kit-1-pudra', zip: 'Ayna-Arkasi-Kit-1-Pudra.zip', title: 'Kit 1 · Pudra kutusu' },
  { id: '02', dir: 'kit-2-ayna', zip: 'Ayna-Arkasi-Kit-2-Ayna.zip', title: 'Kit 2 · El aynası ve nilüfer' },
];

// --- kelime logosu (onaylı, dış hatlı Fraunces SOFT)
const wmRaw = fs.readFileSync(path.join(BRAND, 'final', 'wordmark.svg'), 'utf8');
const wmInner = wmRaw.replace(/^[\s\S]*?<\/title>/, '').replace(/<\/svg>\s*$/, '').trim();
const WM_W = 1000, WM_H = 201.222;
const wordmark = (w, extra = '') => `<svg viewBox="0 0 ${WM_W} ${WM_H}" width="${w}" height="${(w * WM_H / WM_W).toFixed(2)}" ${extra}>${wmInner}</svg>`;

// --- işaret çizimi: kaynak 01'deki yinelenen stroke özniteliğini temizle (XML'de geçersiz)
const draw = (m, o) => m.draw(o).replace(/(stroke="#2C3A31"[^>]*?) stroke="#F8F4EC"/g, '$1').replace(/\n\s*\n/g, '\n');
// dekor: aynı çizim, tek renk çizgi (dolgular zemin rengine boyanır ki örtüşme temiz kalsın)
const lineArt = (m, sw, stroke, ground) => draw(m, { sw }).replace(/fill="#(?!none)[0-9A-Fa-f]{6}"/g, `fill="${ground}"`).replace(/stroke="#2C3A31"/g, `stroke="${stroke}"`);

// avatar/filigran için kalın çizgiye göre yeniden çizilmiş sade sürümler (v4 avatar fikrinin devamı)
const S = (fill, sw) => `fill="${fill}" stroke="${C.murekkep}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"`;
function avatarDraw(m, sw) {
  if (m.id === '01') return `
    <rect x="184" y="222" width="32" height="34" rx="6" ${S(C.krem, sw)}/>
    <circle cx="200" cy="126" r="100" ${S(C.krem, sw)}/>
    <circle cx="200" cy="126" r="74" ${S(C.adacayi, sw)}/>
    <path d="M150 112 C156 92 170 78 190 72" fill="none" stroke="${C.krem}" stroke-width="${sw * 0.8}" stroke-linecap="round"/>
    <path d="M76 290 L76 320 C76 346 132 366 200 366 C268 366 324 346 324 320 L324 290" ${S(C.krem, sw)}/>
    <ellipse cx="200" cy="290" rx="124" ry="44" ${S(C.krem, sw)}/>
    <ellipse cx="200" cy="292" rx="86" ry="25" ${S(C.toz, sw)}/>`;
  const petals = (draw(m, { sw, av: true }).match(/<path d="[^"]*" fill="#F2D3D1"[^>]*\/>/g) || []).join('');
  return `
    <rect x="186" y="284" width="28" height="74" rx="14" ${S(C.krem, sw)}/>
    <ellipse cx="200" cy="148" rx="104" ry="122" ${S(C.krem, sw)}/>
    <rect x="178" y="266" width="44" height="22" rx="8" ${S(C.krem, sw)}/>
    <g transform="translate(200 152) scale(0.9) translate(-200 -131)">${petals}</g>`;
}
const drawAny = (m, o) => (o.av ? avatarDraw(m, o.sw) : draw(m, o));

let GEO = {}; // id -> {x,y,w,h,cx,cy,r}  (400 birimlik viewBox, dolgu geometri sınırları)
const box = (id, sw, pad = 0) => { const g = GEO[id]; const p = sw / 2 + pad; return { x: g.x - p, y: g.y - p, w: g.w + 2 * p, h: g.h + 2 * p }; };
// sıkı viewBox'lı işaret; yüksekliğe göre boyutlanır
function markSvg(m, { h, sw, av = false, attrs = '', inner }) {
  const b = box(m.id, sw);
  const w = h * b.w / b.h;
  return { svg: `<svg viewBox="${b.x.toFixed(2)} ${b.y.toFixed(2)} ${b.w.toFixed(2)} ${b.h.toFixed(2)}" width="${w.toFixed(2)}" height="${h}" ${attrs}>${inner || draw(m, { sw, av })}</svg>`, w, h };
}
// daire içine yerleştirilmiş işaret: işaretin merkezden en uzak noktası R yarıçapına sığar
function circleMark(m, { D, R, sw, av, ground }) {
  const g = GEO[m.id + (av ? 'av' : '')];
  const k = R / (g.r + sw / 2);
  const tx = D / 2 - g.cx * k, ty = D / 2 - g.cy * k;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${D} ${D}" width="${D}" height="${D}">` +
    (ground ? `<circle cx="${D / 2}" cy="${D / 2}" r="${D / 2}" fill="${ground}"/>` : '') +
    `<g transform="translate(${tx.toFixed(2)} ${ty.toFixed(2)}) scale(${k.toFixed(4)})">${drawAny(m, { sw, av })}</g></svg>`;
}

const css = `
@font-face { font-family: 'BVP'; src: url('file://${FONT}'); font-weight: 500; }
* { box-sizing: border-box; margin: 0; padding: 0; }
body { color: ${C.murekkep}; font-family: 'BVP', sans-serif; font-weight: 500; position: relative; }
.slogan { font-family: 'BVP'; font-weight: 500; color: ${C.koyu}; letter-spacing: 0.01em; white-space: nowrap; }
`;
const page = (body, w, h, bg = 'transparent') => `<!doctype html><html lang="tr"><head><meta charset="utf-8"><style>${css}
html,body{width:${w}px;height:${h}px;overflow:hidden;background:${bg}}</style></head><body>${body}</body></html>`;

// ---------- parça üreticileri
const P = {
  // çizgi kalınlıkları (400 birimlik çizimde)
  avatarSW: 11, waterSW: 9, lockSW: 5.5, bannerSW: 5.5, cardSW: 5,
};

function lockupSvg(m, { H = 420, WW = 1060, gap = 72, sw = P.lockSW, bg = null, W = null, Hc = null }) {
  // tek SVG: işaret + kelime logosu, yatay kilit
  const mk = markSvg(m, { h: H, sw });
  const wmH = WW * WM_H / WM_W;
  const totalW = mk.w + gap + WW;
  const cw = W || Math.ceil(totalW), ch = Hc || H;
  const ox = (cw - totalW) / 2, oy = (ch - H) / 2;
  // kelime logosunu büyük harf gövdesine göre ortala: taban çizgisi ~151/201, büyük harf üstü ~ 10/201
  const capMid = (10 + 151) / 2 / WM_H * wmH;
  const wy = oy + H / 2 - capMid;
  const b = box(m.id, sw);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${cw} ${ch}" width="${cw}" height="${ch}"><title>Ayna Arkası</title>` +
    (bg ? `<rect width="${cw}" height="${ch}" fill="${bg}"/>` : '') +
    `<svg x="${ox.toFixed(2)}" y="${oy.toFixed(2)}" width="${mk.w.toFixed(2)}" height="${H}" viewBox="${b.x.toFixed(2)} ${b.y.toFixed(2)} ${b.w.toFixed(2)} ${b.h.toFixed(2)}">${draw(m, { sw })}</svg>` +
    `<svg x="${(ox + mk.w + gap).toFixed(2)}" y="${wy.toFixed(2)}" width="${WW}" height="${wmH.toFixed(2)}" viewBox="0 0 ${WM_W} ${WM_H}">${wmInner}</svg></svg>`;
}

function bannerHtml(m) {
  const W = 2560, H = 1440, SX = 507, SY = 508.5, SW = 1546, SH = 423;
  const decoCol = C.adacayi, decoSW = 3.2;
  const big = (cx, cy, h, rot, op = 1) => {
    const b = box(m.id, decoSW);
    const w = h * b.w / b.h;
    return `<svg style="position:absolute;left:${cx - w / 2}px;top:${cy - h / 2}px;transform:rotate(${rot}deg);opacity:${op}" width="${w}" height="${h}" viewBox="${b.x} ${b.y} ${b.w} ${b.h}">${lineArt(m, decoSW * GEO[m.id].h / h, decoCol, C.krem)}</svg>`;
  };
  const deco = m.id === '01'
    ? big(120, 600, 900, -14) + big(560, 1330, 600, 10, .75) + big(2440, 860, 900, 14) + big(2010, 110, 600, -10, .75)
    : big(170, 620, 1080, -16) + big(560, 1360, 640, 12, .75) + big(2390, 820, 1080, 16) + big(2000, 80, 640, -12, .75);
  const mk = markSvg(m, { h: 372, sw: P.bannerSW });
  const content = `<div style="position:absolute;left:${SX}px;top:${SY}px;width:${SW}px;height:${SH}px;display:flex;align-items:center;justify-content:center;gap:68px">
    ${mk.svg}
    <div style="display:flex;flex-direction:column;align-items:flex-start;padding-top:6px">
      ${wordmark(820)}
      <div class="slogan" style="font-size:40px;margin-top:18px;margin-left:6px;letter-spacing:0.18em" lang="en">BEHIND THE MIRROR</div>
      <div class="slogan" style="font-size:34px;margin-top:14px;margin-left:6px;opacity:.85">${SLOGAN} &nbsp;·&nbsp; Look behind the mirror.</div>
    </div></div>`;
  return page(deco + content, W, H, C.krem);
}

function cardHtml(m) {
  const W = 1080, H = 1920; // metin alanı x 60–940, y 168–1330
  const mk = markSvg(m, { h: 470, sw: P.cardSW });
  return page(`<div style="position:absolute;left:60px;top:168px;width:880px;height:1162px;display:flex;flex-direction:column;align-items:center;justify-content:center">
    ${mk.svg}
    <div style="margin-top:84px">${wordmark(720)}</div>
    <div class="slogan" style="font-size:50px;margin-top:40px">${SLOGAN}</div>
  </div>`, W, H, C.krem);
}

function previewHtml(kit, m, dir) {
  const f = (n) => `file://${path.join(dir, n)}`;
  const lbl = (t) => `<div style="font-size:19px;letter-spacing:.02em;color:${C.koyu};margin-bottom:14px">${t}</div>`;
  const circ = (d) => `<div style="width:${d}px;height:${d}px;border-radius:50%;overflow:hidden;flex:none"><img src="${f('1-PROFIL-FOTOGRAFI (pp) 800x800.png')}" width="${d}" height="${d}" style="display:block"></div>`;
  return page(`
  <div style="position:absolute;left:80px;top:56px;right:80px;display:flex;justify-content:space-between;font-size:22px;color:${C.koyu}">
    <span><b style="font-weight:500;color:${C.murekkep};margin-right:12px">Ayna Arkası</b>${kit.title}</span>
    <span>krem #F8F4EC · toz pembe #F2D3D1 · adaçayı #BCC5B0 · mürekkep #2C3A31</span></div>

  <div style="position:absolute;left:80px;top:130px">${lbl('2 · Kanal banner 2560×1440 (kesikli: 1546×423 güvenli alan)')}
    <div style="position:relative;width:1340px;height:753.75px;outline:1px solid ${C.adacayi}">
      <img src="${f('2-KANAL-BANNER 2560x1440.png')}" width="1340" height="753.75" style="display:block">
      <div style="position:absolute;left:${507 * 1340 / 2560}px;top:${508.5 * 1340 / 2560}px;width:${1546 * 1340 / 2560}px;height:${423 * 1340 / 2560}px;border:1.5px dashed ${C.koyu};opacity:.5"></div>
    </div></div>

  <div style="position:absolute;left:1500px;top:130px">${lbl('1 · Profil fotoğrafı (daire kırpımı)')}
    <div style="display:flex;align-items:flex-end;gap:44px">${circ(260)}
      <div style="display:flex;flex-direction:column;align-items:center;gap:10px">${circ(96)}<span style="font-size:16px;color:${C.koyu}">96 px</span></div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:10px">${circ(48)}<span style="font-size:16px;color:${C.koyu}">48 px</span></div>
    </div>
    <div style="margin-top:44px">${lbl('3 · Video filigranı 150×150 (video üzerinde)')}
      <div style="display:flex;gap:24px">
        <div style="width:400px;height:225px;background:${C.murekkep};position:relative"><img src="${f('3-VIDEO-FILIGRANI 150x150.png')}" width="75" height="75" style="position:absolute;right:14px;bottom:14px"></div>
        <div style="width:400px;height:225px;background:#cfd3cc;position:relative"><img src="${f('3-VIDEO-FILIGRANI 150x150.png')}" width="75" height="75" style="position:absolute;right:14px;bottom:14px"></div>
      </div></div>
  </div>

  <div style="position:absolute;left:80px;top:950px;display:flex;gap:40px">
    <div>${lbl('4 · Logo yatay, krem zemin')}<img src="${f('4-LOGO yatay krem zemin.png')}" width="650" height="195" style="display:block;outline:1px solid ${C.adacayi}"></div>
    <div>${lbl('5 · Logo yatay, pembe zemin')}<img src="${f('5-LOGO yatay pembe zemin.png')}" width="650" height="195" style="display:block"></div>
  </div>
  <div style="position:absolute;left:80px;top:1250px;width:1340px;font-size:19px;line-height:1.55;color:${C.koyu}">
    ${m.meaning}<br>Yazı: Fraunces SOFT (kelime logosu, dış hatlı) · Be Vietnam Pro Medium (slogan). Gradyan, parıltı, gölge yok.</div>

  <div style="position:absolute;left:1500px;top:820px">${lbl('6 · Shorts bitiş kartı 1080×1920')}
    <img src="${f('6-SHORTS-BITIS-KARTI 1080x1920.png')}" width="378" height="672" style="display:block;outline:1px solid ${C.adacayi}"></div>
  <div style="position:absolute;left:1960px;top:820px;width:360px">${lbl('logo-mark.svg')}
    <div style="height:400px;display:flex;align-items:center;justify-content:center;outline:1px solid ${C.adacayi}"><img src="${f('logo-mark.svg')}" style="height:320px;width:auto;display:block"></div>
    <div style="margin-top:28px">${lbl('logo-yatay.svg')}</div><div style="height:150px;display:flex;align-items:center;justify-content:center;outline:1px solid ${C.adacayi}"><img src="${f('logo-yatay.svg')}" style="width:310px;height:auto;display:block"></div></div>
  `, 2400, 1600, C.krem);
}

(async () => {
  const browser = await chromium.launch();
  const pg = await browser.newPage();
  // geometri: sınır kutusu + merkeze en uzak nokta (yol örnekleme)
  for (const m of marks.filter(m => KITS.some(k => k.id === m.id))) {
    for (const av of [false, true]) {
      await pg.setContent(`<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><g id="g">${drawAny(m, { sw: 3, av })}</g></svg>`);
      const g = await pg.evaluate(() => {
        const G = document.getElementById('g'); const bb = G.getBBox();
        const cx = bb.x + bb.width / 2, cy = bb.y + bb.height / 2; let r = 0;
        for (const el of G.querySelectorAll('path,circle,ellipse')) {
          const n = el.getTotalLength();
          for (let i = 0; i <= 400; i++) { const p = el.getPointAtLength(n * i / 400); r = Math.max(r, Math.hypot(p.x - cx, p.y - cy)); }
        }
        return { x: bb.x, y: bb.y, w: bb.width, h: bb.height, cx, cy, r };
      });
      GEO[m.id + (av ? 'av' : '')] = g;
    }
  }
  console.log(JSON.stringify(GEO));

  const shot = async (html, w, h, out, transparent = false) => {
    const f = path.join(TMP, path.basename(out).replace(/[^\w.-]+/g, '_') + '.html');
    fs.writeFileSync(f, html);
    const p = await browser.newPage({ viewport: { width: w, height: h } });
    await p.goto('file://' + f);
    await p.evaluate(() => document.fonts.ready);
    await p.waitForTimeout(100);
    await p.screenshot({ path: out, omitBackground: transparent });
    await p.close();
    console.log('✓', path.relative(BRAND, out));
  };

  for (const kit of KITS) {
    const m = marks.find(x => x.id === kit.id);
    const dir = path.join(BRAND, kit.dir);
    fs.rmSync(dir, { recursive: true, force: true });
    fs.mkdirSync(dir, { recursive: true });
    const o = (n) => path.join(dir, n);

    // SVG'ler
    const lm = markSvg(m, { h: 400, sw: 4 });
    fs.writeFileSync(o('logo-mark.svg'), lm.svg.replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ').replace('>', `><title>Ayna Arkası — ${m.name}</title>`) + '\n');
    fs.writeFileSync(o('logo-yatay.svg'), lockupSvg(m, {}) + '\n');

    // 1 profil
    const av = circleMark(m, { D: 800, R: 800 * 0.35, sw: P.avatarSW, av: true, ground: C.toz });
    await shot(page(av, 800, 800, C.toz), 800, 800, o('1-PROFIL-FOTOGRAFI (pp) 800x800.png'));
    // 2 banner
    await shot(bannerHtml(m), 2560, 1440, o('2-KANAL-BANNER 2560x1440.png'));
    // 3 filigran
    const wm = circleMark(m, { D: 150, R: 150 * 0.38, sw: P.waterSW, av: true, ground: C.toz });
    await shot(page(wm, 150, 150), 150, 150, o('3-VIDEO-FILIGRANI 150x150.png'), true);
    // 4–5 kilitler
    await shot(page(lockupSvg(m, { W: 2000, Hc: 600, bg: C.krem }), 2000, 600), 2000, 600, o('4-LOGO yatay krem zemin.png'));
    await shot(page(lockupSvg(m, { W: 2000, Hc: 600, bg: C.toz }), 2000, 600), 2000, 600, o('5-LOGO yatay pembe zemin.png'));
    // 6 bitiş kartı
    await shot(cardHtml(m), 1080, 1920, o('6-SHORTS-BITIS-KARTI 1080x1920.png'));
    // önizleme
    await shot(previewHtml(kit, m, dir), 2400, 1600, o('ONIZLEME.png'));
  }
  await browser.close();
})();
