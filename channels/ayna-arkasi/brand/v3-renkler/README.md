# Ayna Arkası — v3 · Toz pembe renk yönleri

`renkler.png` (3000×2400) tüm yönleri yan yana gösterir; `01.png`…`06.png` (1500×1100) her yön tek başına.
Her yön aynı şekilde uygulandı: Instrument Serif logo ("Ayna" düz, "Arkası" italik), 120/48 px "Aa" avatar,
270×480 Shorts karesi (1080×1920'nin %25'i; altyazı Be Vietnam Pro Bold, aktif kelime vurgu renginde), 5 renk çipi.
Degrade, gölge ve süs yok. Açık yüzeylerin kenarındaki 1 px çizgi yalnızca sunum içindir, markanın parçası değil.

## Teşhis — v2'deki pembe neden "güzel" durmadı

- **Renk yanlış:** #E8B4B8 orta açıklıkta ve gri-sıcak bir pembe. Büyük düz alanda ten ya da somon rengine kayıyor, "pudra" gibi değil "bulanık" görünüyor. Toz pembeyi güzel yapan şey daha açık ve daha temiz bir pembe ile yanına konan sıcak, açık nötrler.
- **Kontrast sert, oranlar ağır:** Pembenin yanındaki neredeyse siyah mürdüm #1C1424, yüzeyin yarısını kaplıyor. Pembe bu yüzden kirli, bütün kompozisyon da gece kulübü gibi karanlık duruyor. Premium güzellik markaları koyu rengi zemin olarak değil, metin olarak az miktarda kullanır.
- **Sistem yok, hava yok:** İki renk dışında hiçbir şey yoktu. Krem/beyaz kâğıt, ikinci bir yüzey ve gerçek bir vurgu rengi eksikti. Beyaz alan olmadığı için pembe "nefes almıyor", bu da ferah ve editoryal hissi öldürüyor.

## Kontrast kuralı

WCAG 2.x göreli parlaklık formülüyle hesaplandı (`src/palettes.js` → `contrast()`). Görsellerde kullanılan her metin/zemin çifti ölçüldü.
Logo, avatar, başlık ve altyazının hepsi büyük metin olsa da hepsine **≥4.5:1** uygulandı. Yüz çizimi gibi grafik çizgiler için eşik **≥3:1** (WCAG 1.4.11).
`render.js`, eşiği geçemeyen bir çift varsa çizim yapmadan hata verir.

## 01 · Pudra & Krem

| Rol | Ad | Hex |
|---|---|---|
| kahraman pembe | Pudra | `#F4D9D8` |
| ana zemin | Krem | `#FBF6EF` |
| ikincil kâğıt | Kum | `#F3EAE0` |
| metin | Kakao siyahı | `#3A2B27` |
| vurgu | Gül | `#9A4152` |

| Kullanım | Ön plan / zemin | Oran | Eşik |
|---|---|---|---|
| Logo "Ayna" / kahraman zemin | `#3A2B27` / `#F4D9D8` | 10.14:1 | ≥4.5 ✓ |
| Logo "Arkası" / kahraman zemin | `#3A2B27` / `#F4D9D8` | 10.14:1 | ≥4.5 ✓ |
| Logo "Ayna" / ikincil zemin | `#3A2B27` / `#F3EAE0` | 11.36:1 | ≥4.5 ✓ |
| Logo "Arkası" / ikincil zemin | `#9A4152` / `#F3EAE0` | 5.43:1 | ≥4.5 ✓ |
| Avatar "Aa" | `#3A2B27` / `#F4D9D8` | 10.14:1 | ≥4.5 ✓ |
| Shorts başlık | `#3A2B27` / `#FBF6EF` | 12.56:1 | ≥4.5 ✓ |
| Altyazı | `#3A2B27` / `#FBF6EF` | 12.56:1 | ≥4.5 ✓ |
| Altyazı aktif kelime | `#9A4152` / `#FBF6EF` | 6.01:1 | ≥4.5 ✓ |
| Yüz çizgisi / bant | `#3A2B27` / `#F4D9D8` | 10.14:1 | ≥3 ✓ |

**Duygu:** Hafif, havadar, ten gibi sıcak; sabah ışığında bir makyaj masası.  
**Kime uygun:** Yumuşak, güven veren, "arkadaş gibi uzman" bir ses isteyen kanala.

## 02 · Toz Pembe & Bordo

| Rol | Ad | Hex |
|---|---|---|
| kahraman pembe | Toz pembe | `#EDCACC` |
| ana zemin | Pembe beyaz | `#FBF5F3` |
| ikincil kâğıt | Gül tozu | `#F4E4E2` |
| metin / koyu zemin | Koyu bordo | `#4A1622` |
| vurgu | Bordo | `#8C2439` |

| Kullanım | Ön plan / zemin | Oran | Eşik |
|---|---|---|---|
| Logo "Ayna" / kahraman zemin | `#4A1622` / `#EDCACC` | 9.74:1 | ≥4.5 ✓ |
| Logo "Arkası" / kahraman zemin | `#4A1622` / `#EDCACC` | 9.74:1 | ≥4.5 ✓ |
| Logo "Ayna" / ikincil zemin | `#EDCACC` / `#4A1622` | 9.74:1 | ≥4.5 ✓ |
| Logo "Arkası" / ikincil zemin | `#EDCACC` / `#4A1622` | 9.74:1 | ≥4.5 ✓ |
| Avatar "Aa" | `#EDCACC` / `#4A1622` | 9.74:1 | ≥4.5 ✓ |
| Shorts başlık | `#4A1622` / `#FBF5F3` | 13.62:1 | ≥4.5 ✓ |
| Altyazı | `#4A1622` / `#FBF5F3` | 13.62:1 | ≥4.5 ✓ |
| Altyazı aktif kelime | `#8C2439` / `#FBF5F3` | 8.02:1 | ≥4.5 ✓ |
| Yüz çizgisi / bant | `#4A1622` / `#EDCACC` | 9.74:1 | ≥3 ✓ |

**Duygu:** Kadife, kararlı, editoryal; şarap rengi ruj ve pudralı yanak.  
**Kime uygun:** Daha cesur, "kendinden emin" bir duruş ve güçlü kapaklar isteyen kanala.

## 03 · Toz Pembe & Beyaz

| Rol | Ad | Hex |
|---|---|---|
| kahraman pembe (blok) | Toz pembe | `#F6CDD3` |
| ana zemin | Beyaz | `#FFFFFF` |
| ikincil kâğıt | Sis | `#F2F0EF` |
| metin | Grafit | `#25252A` |
| vurgu | Gül kırmızısı | `#C2385C` |

| Kullanım | Ön plan / zemin | Oran | Eşik |
|---|---|---|---|
| Logo "Ayna" / kahraman zemin | `#25252A` / `#F6CDD3` | 10.60:1 | ≥4.5 ✓ |
| Logo "Arkası" / kahraman zemin | `#25252A` / `#F6CDD3` | 10.60:1 | ≥4.5 ✓ |
| Logo "Ayna" / ikincil zemin | `#25252A` / `#FFFFFF` | 15.25:1 | ≥4.5 ✓ |
| Logo "Arkası" / ikincil zemin | `#C2385C` / `#FFFFFF` | 5.23:1 | ≥4.5 ✓ |
| Avatar "Aa" | `#25252A` / `#F6CDD3` | 10.60:1 | ≥4.5 ✓ |
| Shorts başlık | `#25252A` / `#FFFFFF` | 15.25:1 | ≥4.5 ✓ |
| Altyazı | `#25252A` / `#FFFFFF` | 15.25:1 | ≥4.5 ✓ |
| Altyazı aktif kelime | `#C2385C` / `#FFFFFF` | 5.23:1 | ≥4.5 ✓ |
| Yüz çizgisi / bant | `#25252A` / `#F6CDD3` | 10.60:1 | ≥3 ✓ |

**Duygu:** Temiz, ferah, güncel; bol beyaz içinde tek bir pembe renk bloğu.  
**Kime uygun:** Hızlı, net, "bilim + güzellik" anlatan modern bir kanala.

## 04 · Gül Kurusu

| Rol | Ad | Hex |
|---|---|---|
| kahraman pembe | Gül kurusu | `#CE999C` |
| ana zemin | Fildişi | `#F8F2E9` |
| ikincil kâğıt | Açık gül | `#EED9D4` |
| metin | Gül kahvesi | `#3B2124` |
| vurgu | Koyu gül | `#87434A` |

| Kullanım | Ön plan / zemin | Oran | Eşik |
|---|---|---|---|
| Logo "Ayna" / kahraman zemin | `#3B2124` / `#CE999C` | 6.06:1 | ≥4.5 ✓ |
| Logo "Arkası" / kahraman zemin | `#3B2124` / `#CE999C` | 6.06:1 | ≥4.5 ✓ |
| Logo "Ayna" / ikincil zemin | `#3B2124` / `#F8F2E9` | 13.20:1 | ≥4.5 ✓ |
| Logo "Arkası" / ikincil zemin | `#87434A` / `#F8F2E9` | 6.44:1 | ≥4.5 ✓ |
| Avatar "Aa" | `#3B2124` / `#CE999C` | 6.06:1 | ≥4.5 ✓ |
| Shorts başlık | `#3B2124` / `#F8F2E9` | 13.20:1 | ≥4.5 ✓ |
| Altyazı | `#3B2124` / `#F8F2E9` | 13.20:1 | ≥4.5 ✓ |
| Altyazı aktif kelime | `#87434A` / `#F8F2E9` | 6.44:1 | ≥4.5 ✓ |
| Yüz çizgisi / bant | `#87434A` / `#EED9D4` | 5.29:1 | ≥3 ✓ |

**Duygu:** Olgun, sofistike, nostaljik; kurutulmuş gül ve eski fildişi kâğıt.  
**Kime uygun:** Tarih ve kültür ağırlıklı, daha "dergi" tonunda içerik üreten kanala.

## 05 · Toz Pembe & Adaçayı

| Rol | Ad | Hex |
|---|---|---|
| kahraman pembe | Toz pembe | `#F2D3D1` |
| ana zemin | Keten | `#F8F4EC` |
| ikincil yüzey | Adaçayı | `#BCC5B0` |
| metin | Yaprak mürekkebi | `#2C3A31` |
| vurgu | Koyu adaçayı | `#4D6A55` |

| Kullanım | Ön plan / zemin | Oran | Eşik |
|---|---|---|---|
| Logo "Ayna" / kahraman zemin | `#2C3A31` / `#F2D3D1` | 8.55:1 | ≥4.5 ✓ |
| Logo "Arkası" / kahraman zemin | `#2C3A31` / `#F2D3D1` | 8.55:1 | ≥4.5 ✓ |
| Logo "Ayna" / ikincil zemin | `#2C3A31` / `#BCC5B0` | 6.69:1 | ≥4.5 ✓ |
| Logo "Arkası" / ikincil zemin | `#2C3A31` / `#BCC5B0` | 6.69:1 | ≥4.5 ✓ |
| Avatar "Aa" | `#2C3A31` / `#F2D3D1` | 8.55:1 | ≥4.5 ✓ |
| Shorts başlık | `#2C3A31` / `#F8F4EC` | 10.90:1 | ≥4.5 ✓ |
| Altyazı | `#2C3A31` / `#F8F4EC` | 10.90:1 | ≥4.5 ✓ |
| Altyazı aktif kelime | `#4D6A55` / `#F8F4EC` | 5.46:1 | ≥4.5 ✓ |
| Yüz çizgisi / bant | `#4D6A55` / `#F2D3D1` | 4.28:1 | ≥3 ✓ |

**Duygu:** Doğal, taze, sakin; cilt bakımı rafı, keten ve yeşil yaprak.  
**Kime uygun:** "Doğal güzellik", cilt sağlığı ve sakin bir anlatım öne çıkacaksa.

## 06 · Toz Pembe & Mürekkep Lacivert

| Rol | Ad | Hex |
|---|---|---|
| kahraman pembe | Toz pembe | `#F3CED2` |
| açık zemin | Kâğıt | `#F8F5F1` |
| ikincil kâğıt | Taş | `#E8E4E0` |
| metin / koyu zemin | Mürekkep | `#1E2943` |
| vurgu (koyu zeminde) | Gül | `#E99BAA` |

| Kullanım | Ön plan / zemin | Oran | Eşik |
|---|---|---|---|
| Logo "Ayna" / kahraman zemin | `#1E2943` / `#F3CED2` | 10.02:1 | ≥4.5 ✓ |
| Logo "Arkası" / kahraman zemin | `#1E2943` / `#F3CED2` | 10.02:1 | ≥4.5 ✓ |
| Logo "Ayna" / ikincil zemin | `#F8F5F1` / `#1E2943` | 13.29:1 | ≥4.5 ✓ |
| Logo "Arkası" / ikincil zemin | `#F3CED2` / `#1E2943` | 10.02:1 | ≥4.5 ✓ |
| Avatar "Aa" | `#F3CED2` / `#1E2943` | 10.02:1 | ≥4.5 ✓ |
| Shorts başlık | `#F3CED2` / `#1E2943` | 10.02:1 | ≥4.5 ✓ |
| Altyazı | `#F8F5F1` / `#1E2943` | 13.29:1 | ≥4.5 ✓ |
| Altyazı aktif kelime | `#E99BAA` / `#1E2943` | 6.70:1 | ≥4.5 ✓ |
| Yüz çizgisi / bant | `#F3CED2` / `#1E2943` | 10.02:1 | ≥3 ✓ |

**Duygu:** Şık, entelektüel, gece baskısı; lacivert mürekkep üstünde pudra.  
**Kime uygun:** Araştırmacı, "perde arkası" anlatısını keskin ama zarif kurmak isteyene.

## Öneri

1. **02 · Toz Pembe & Bordo**: Toz pembeyi en "pahalı" gösteren eş bu. Bordo, mürdümün sertliği olmadan derinlik veriyor. Hem kapakta hem logoda güçlü.
2. **01 · Pudra & Krem**: Müşterinin istediği "güzel toz pembe" hissine en yakın yön. Havadar ve sıcak. Kanalın yargılamayan, sıcak sesine birebir uyuyor.

## Dosyalar

- `src/palettes.js`: paletlerin tek kaynağı (hex, roller, kullanım haritası, kontrast hesabı)
- `src/page.html`: pano ve tekli düzen (`?d=1`…`?d=6`)
- `src/render.js`: `node render.js` ile Playwright/Chromium çizimi
- `src/fonts/`: Instrument Serif (latin + latin-ext, düz + italik, OFL) ve Be Vietnam Pro. Türkçe karakterler fontTools ile doğrulandı: ı, İ, ş, ğ, ç, ö, ü iki alt kümede eksiksiz, noktasız ı latin alt kümesinde.
