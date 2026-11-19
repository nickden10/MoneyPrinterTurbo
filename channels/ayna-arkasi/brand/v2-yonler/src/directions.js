// Ayna Arkası — v2 yazı yönleri. Tek kaynak: her yön için wordmark + avatar tanımı.
// k(ch, em) = harf sonrası ince ayar (optik kerning, em cinsinden; negatif = sıkılaştır).
const k = (ch, em) => `<span style="letter-spacing:calc(var(--ls) + ${em}em)">${ch}</span>`;

const DIRECTIONS = [
  {
    no: '01', name: 'Lüks minimal', font: 'Bodoni Moda',
    cls: 'd1', width: 0.74, trim: 'cap',
    html: `${k('A', -0.07)}YN${k('A', 0)} ${k('A', 0)}R${k('K', -0.03)}ASI`,
    avatar: { html: 'A', cls: 'a1', size: 0.50, trim: 'cap' },
  },
  {
    no: '02', name: 'Editoryal', font: 'Instrument Serif',
    cls: 'd2', width: 0.64, trim: 'cap',
    html: `Ayna <i>Arkası</i>`,
    avatar: { html: 'A<i>a</i>', cls: 'a2', size: 0.56, trim: 'cap' },
  },
  {
    no: '03', name: 'Modern sans', font: 'Manrope',
    cls: 'd3', width: 0.62, trim: 'ex',
    html: `ayna arkası`,
    avatar: { html: 'a', cls: 'a3', size: 0.62, trim: 'ex' },
  },
  {
    no: '04', name: 'İmza', font: 'Allura',
    cls: 'd4', width: 0.64, trim: 'cap',
    html: `Ayna Arkası`,
    avatar: { html: 'A', cls: 'a4', size: 0.70, trim: 'cap' },
  },
  {
    no: '05', name: 'Monogram', font: 'Josefin Sans',
    cls: 'd5', width: 0.66, trim: 'none',
    html: `<span class="ring"><span class="aa">AA</span></span><span class="wm5">AYNA ARKASI</span>`,
    avatar: { html: '<span class="aa">AA</span>', cls: 'a5', size: 0.40, trim: 'cap' },
  },
  {
    no: '06', name: 'Yumuşak çağdaş', font: 'Fraunces (Soft)',
    cls: 'd6', width: 0.60, trim: 'ex',
    html: `ayna arkası`,
    avatar: { html: 'a', cls: 'a6', size: 0.66, trim: 'ex' },
  },
];
