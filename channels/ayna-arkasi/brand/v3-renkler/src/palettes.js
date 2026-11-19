// Ayna Arkası — v3 toz pembe palet yönleri.
// Tek kaynak: page.html (tarayıcı) ve contrast.js (node) bu dosyayı okur.
// Her palet 5 renk: pink (kahraman), n1 / n2 (zemin–kâğıt), text, accent.
// Kullanım haritaları (hero / alt / avatar / frame) rol adlarıyla yazılır,
// böylece kontrast kontrolü tam olarak ekranda kullanılan çiftleri ölçer.
(function (root) {
  const PALETTES = [
    {
      id: 1, name: 'Pudra & Krem',
      mood: 'Hafif, havadar, ten gibi sıcak; sabah ışığında bir makyaj masası.',
      kime: 'Yumuşak, güven veren, "arkadaş gibi uzman" bir ses isteyen kanala.',
      colors: {
        pink:   { name: 'Pudra',        hex: '#F4D9D8', role: 'kahraman pembe' },
        n1:     { name: 'Krem',         hex: '#FBF6EF', role: 'ana zemin' },
        n2:     { name: 'Kum',          hex: '#F3EAE0', role: 'ikincil kâğıt' },
        text:   { name: 'Kakao siyahı', hex: '#3A2B27', role: 'metin' },
        accent: { name: 'Gül',          hex: '#9A4152', role: 'vurgu' },
      },
      hero:   { bg: 'pink', ayna: 'text', arkasi: 'text' },
      alt:    { bg: 'n2',   ayna: 'text', arkasi: 'accent' },
      avatar: { bg: 'pink', fg: 'text' },
      frame:  { bg: 'n1', band: 'pink', headline: 'text', face: 'text', caption: 'text', active: 'accent' },
    },
    {
      id: 2, name: 'Toz Pembe & Bordo',
      mood: 'Kadife, kararlı, editoryal; şarap rengi ruj ve pudralı yanak.',
      kime: 'Daha cesur, "kendinden emin" bir duruş ve güçlü kapaklar isteyen kanala.',
      colors: {
        pink:   { name: 'Toz pembe',    hex: '#EDCACC', role: 'kahraman pembe' },
        n1:     { name: 'Pembe beyaz',  hex: '#FBF5F3', role: 'ana zemin' },
        n2:     { name: 'Gül tozu',     hex: '#F4E4E2', role: 'ikincil kâğıt' },
        text:   { name: 'Koyu bordo',   hex: '#4A1622', role: 'metin / koyu zemin' },
        accent: { name: 'Bordo',        hex: '#8C2439', role: 'vurgu' },
      },
      hero:   { bg: 'pink', ayna: 'text', arkasi: 'text' },
      alt:    { bg: 'text', ayna: 'pink', arkasi: 'pink' },
      avatar: { bg: 'text', fg: 'pink' },
      frame:  { bg: 'n1', band: 'pink', headline: 'text', face: 'text', caption: 'text', active: 'accent' },
    },
    {
      id: 3, name: 'Toz Pembe & Beyaz',
      mood: 'Temiz, ferah, güncel; bol beyaz içinde tek bir pembe renk bloğu.',
      kime: 'Hızlı, net, "bilim + güzellik" anlatan modern bir kanala.',
      colors: {
        pink:   { name: 'Toz pembe',    hex: '#F6CDD3', role: 'kahraman pembe (blok)' },
        n1:     { name: 'Beyaz',        hex: '#FFFFFF', role: 'ana zemin' },
        n2:     { name: 'Sis',          hex: '#F2F0EF', role: 'ikincil kâğıt' },
        text:   { name: 'Grafit',       hex: '#25252A', role: 'metin' },
        accent: { name: 'Gül kırmızısı',hex: '#C2385C', role: 'vurgu' },
      },
      hero:   { bg: 'pink', ayna: 'text', arkasi: 'text' },
      alt:    { bg: 'n1',   ayna: 'text', arkasi: 'accent' },
      avatar: { bg: 'pink', fg: 'text' },
      frame:  { bg: 'n1', band: 'pink', headline: 'text', face: 'text', caption: 'text', active: 'accent' },
    },
    {
      id: 4, name: 'Gül Kurusu',
      mood: 'Olgun, sofistike, nostaljik; kurutulmuş gül ve eski fildişi kâğıt.',
      kime: 'Tarih ve kültür ağırlıklı, daha "dergi" tonunda içerik üreten kanala.',
      colors: {
        pink:   { name: 'Gül kurusu',   hex: '#CE999C', role: 'kahraman pembe' },
        n1:     { name: 'Fildişi',      hex: '#F8F2E9', role: 'ana zemin' },
        n2:     { name: 'Açık gül',     hex: '#EED9D4', role: 'ikincil kâğıt' },
        text:   { name: 'Gül kahvesi',  hex: '#3B2124', role: 'metin' },
        accent: { name: 'Koyu gül',     hex: '#87434A', role: 'vurgu' },
      },
      hero:   { bg: 'pink', ayna: 'text', arkasi: 'text' },
      alt:    { bg: 'n1',   ayna: 'text', arkasi: 'accent' },
      avatar: { bg: 'pink', fg: 'text' },
      frame:  { bg: 'n1', band: 'n2', headline: 'text', face: 'accent', caption: 'text', active: 'accent' },
    },
    {
      id: 5, name: 'Toz Pembe & Adaçayı',
      mood: 'Doğal, taze, sakin; cilt bakımı rafı, keten ve yeşil yaprak.',
      kime: '"Doğal güzellik", cilt sağlığı ve sakin bir anlatım öne çıkacaksa.',
      colors: {
        pink:   { name: 'Toz pembe',    hex: '#F2D3D1', role: 'kahraman pembe' },
        n1:     { name: 'Keten',        hex: '#F8F4EC', role: 'ana zemin' },
        n2:     { name: 'Adaçayı',      hex: '#BCC5B0', role: 'ikincil yüzey' },
        text:   { name: 'Yaprak mürekkebi', hex: '#2C3A31', role: 'metin' },
        accent: { name: 'Koyu adaçayı', hex: '#4D6A55', role: 'vurgu' },
      },
      hero:   { bg: 'pink', ayna: 'text', arkasi: 'text' },
      alt:    { bg: 'n2',   ayna: 'text', arkasi: 'text' },
      avatar: { bg: 'pink', fg: 'text' },
      frame:  { bg: 'n1', band: 'pink', headline: 'text', face: 'accent', caption: 'text', active: 'accent' },
    },
    {
      id: 6, name: 'Toz Pembe & Mürekkep Lacivert',
      mood: 'Şık, entelektüel, gece baskısı; lacivert mürekkep üstünde pudra.',
      kime: 'Araştırmacı, "perde arkası" anlatısını keskin ama zarif kurmak isteyene.',
      colors: {
        pink:   { name: 'Toz pembe',    hex: '#F3CED2', role: 'kahraman pembe' },
        n1:     { name: 'Kâğıt',        hex: '#F8F5F1', role: 'açık zemin' },
        n2:     { name: 'Taş',          hex: '#E8E4E0', role: 'ikincil kâğıt' },
        text:   { name: 'Mürekkep',     hex: '#1E2943', role: 'metin / koyu zemin' },
        accent: { name: 'Gül',          hex: '#E99BAA', role: 'vurgu (koyu zeminde)' },
      },
      hero:   { bg: 'pink', ayna: 'text', arkasi: 'text' },
      alt:    { bg: 'text', ayna: 'n1',   arkasi: 'pink' },
      avatar: { bg: 'text', fg: 'pink' },
      frame:  { bg: 'text', band: null, headline: 'pink', face: 'pink', caption: 'n1', active: 'accent' },
    },
  ];

  function lum(hex) {
    const h = hex.replace('#', '');
    return [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16) / 255)
      .map(c => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)))
      .reduce((s, c, i) => s + c * [0.2126, 0.7152, 0.0722][i], 0);
  }
  function contrast(a, b) {
    const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
    return (x + 0.05) / (y + 0.05);
  }
  // Ekranda kullanılan her metin/zemin çifti + eşik.
  // display = büyük başlık/logo (>=3), text = altyazı/küçük metin (>=4.5),
  // graphic = çizgi grafik (>=3, WCAG 1.4.11).
  function pairs(p) {
    const c = k => p.colors[k].hex;
    const f = p.frame;
    const list = [
      ['Logo "Ayna" / kahraman zemin', p.hero.ayna, p.hero.bg, 4.5],
      ['Logo "Arkası" / kahraman zemin', p.hero.arkasi, p.hero.bg, 4.5],
      ['Logo "Ayna" / ikincil zemin', p.alt.ayna, p.alt.bg, 4.5],
      ['Logo "Arkası" / ikincil zemin', p.alt.arkasi, p.alt.bg, 4.5],
      ['Avatar "Aa"', p.avatar.fg, p.avatar.bg, 4.5],
      ['Shorts başlık', f.headline, f.bg, 4.5],
      ['Altyazı', f.caption, f.bg, 4.5],
      ['Altyazı aktif kelime', f.active, f.bg, 4.5],
      ['Yüz çizgisi / bant', f.face, f.band || f.bg, 3],
    ];
    const seen = new Set();
    return list.filter(([l, a, b]) => { const k = a + b; if (seen.has(k + l)) return false; seen.add(k + l); return true; })
      .map(([label, fg, bg, min]) => {
        const r = contrast(c(fg), c(bg));
        return { label, fg: c(fg), bg: c(bg), ratio: Math.round(r * 100) / 100, min, pass: r >= min };
      });
  }
  const api = { PALETTES, contrast, pairs };
  if (typeof module !== 'undefined') module.exports = api; else root.AA = api;
})(this);
