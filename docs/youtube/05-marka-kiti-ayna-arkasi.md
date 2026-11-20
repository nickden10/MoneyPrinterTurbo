# 05 · Marka Kiti: Ayna Arkası

> Final dosyalar: `channels/ayna-arkasi/brand/final/` · Kaynak: `brand/final/src/` (`build.py` + `render.js`) · Token'lar: `brand/brand.css`
> Eski denemeler (`brand/png/`, `brand/concepts/`, `v2-yonler/`, `v3-renkler/`) yalnızca arşivdir, kullanılmaz.

## Kimlik
| | |
|---|---|
| **Kanal adı** | Ayna Arkası |
| **Slogan** | Aynanın arkasına bak. |
| **@handle önerileri** | `@aynaarkasi` · `@aynaarkasi.tr` · `@aynanin.arkasi` (müsaitlik YouTube'da kontrol edilmeli) |
| **Palet** | Toz pembe `#F2D3D1` (kahraman) · Keten `#F8F4EC` (zemin) · Adaçayı `#BCC5B0` (ikincil yüzey) · Yaprak mürekkebi `#2C3A31` (metin, logo) · Koyu adaçayı `#4D6A55` (vurgu) |
| **Fontlar** | Fraunces değişken, SOFT 100 (logo, avatar, başlık) · Be Vietnam Pro Bold/Medium (slogan, gövde, altyazı), ikisi de OFL |
| **İşaret** | Fraunces SOFT "A": toz pembe daire içinde mürekkep (avatar), mürekkep daire içinde toz pembe (filigran). Sembol, kliparti ve süs yok |

> ⚠️ **Ad kontrolü (K-14):** Web aramasında "Ayna Arkası" adlı bir YouTube kanalı bulunamadı (en yakın: "Medya Arkası", farklı bir ad). Kanalı açmadan önce **YouTube içi arama** ve **TÜRKPATENT marka araması** (sınıf 41) yapılmalı.

## Dosyalar ve kullanım (`brand/final/`)
| Dosya | Boyut | Nereye |
|---|---|---|
| `wordmark.svg` | vektör, konturlu | Kelime logosu, mürekkep `#2C3A31`. Font gerekmez. Keten, toz pembe, adaçayı zeminde |
| `wordmark-light.svg` | vektör, konturlu | Keten `#F8F4EC` logo. **Yalnızca** mürekkep (10.90:1) ve koyu adaçayı (5.46:1) zeminde; adaçayında yasak (1.63:1) |
| `avatar.svg` · `avatar-800.png` | 800×800 | Kanal profil fotoğrafı. A çapın %62'si, 48 px'te okunur (test edildi) |
| `banner-2560x1440.png` | 2560×1440 | Kanal kapağı, toz pembe zemin. Yazı 1546×423 güvenli alanında (x 790–1770, y 567–873) |
| `watermark-150.png` · `watermark.svg` | 150×150, şeffaf | YouTube Studio → Özelleştirme → Video filigranı. Mürekkep daire, toz pembe A (8.55:1) |
| `lockup-horizontal.svg` | 2000×600 vektör, şeffaf | Logo + slogan (Be Vietnam Pro Medium, konturlu), koyu adaçayı ayırıcı çizgi |
| `lockup-horizontal-keten.svg` · `lockup-horizontal-keten-2000x600.png` | 2000×600 | Keten zeminde yatay lockup |
| `lockup-horizontal-toz.svg` · `lockup-horizontal-toz-2000x600.png` | 2000×600 | Toz pembe zeminde yatay lockup |
| `endcard-1080x1920.png` | 1080×1920 | Shorts bitiş kartı: avatar + logo + slogan, keten zemin. Tüm öğeler x 160–920, y 514–1022 (izin: x 60–940, y 168–1330) |
| `sheet.png` | 3200×2400 | Kimlik sunum panosu |
| `../brand.css` | — | Renk ve altyazı token'ları + @font-face. **Tüm videolar bu dosyayı kullanır** |
| `../fonts/` | — | `fraunces-latin(-ext)-full-normal.woff2` (değişken), BeVietnamPro-Bold/Medium (OFL) |

Yeniden üretmek için `brand/final/src` içinde `python3 build.py && node render.js` çalıştırılır (fontTools + uharfbuzz + Playwright). Kontrast eşiğini geçmeyen bir çift varsa `build.py` hata verir; ölçülen oranlar `src/build/checks.json` dosyasına yazılır.

## Renk ve yazı
| Token | Hex | Rol |
|---|---|---|
| `--toz-pembe` | `#F2D3D1` | Kahraman yüzey |
| `--keten` | `#F8F4EC` | Ana zemin |
| `--adacayi` | `#BCC5B0` | İkincil yüzey |
| `--murekkep` | `#2C3A31` | Metin ve logo (keten 10.90 · toz pembe 8.55 · adaçayı 6.69) |
| `--koyu-adacayi` | `#4D6A55` | Vurgu (keten üstünde metin 5.46; toz pembe üstünde yalnız çizgi 4.28) |
| `--caption-text` / `--caption-active` / `--caption-pill` | `#F8F4EC` / `#F2D3D1` / `rgba(44,58,49,.92)` | Altyazı: metin 8.63–8.95:1, aktif kelime 6.77–7.02:1 |

- **Logo:** Fraunces wght 600 · opsz 144 · SOFT 100 · WONK 0, kelime arası ve "Ay", "yn", "rk", "ka", "as", "sı" çiftleri elle ayarlandı; noktasız ı korunur.
- **Avatar "A":** Fraunces wght 640 · opsz 72 · SOFT 100 (küçük gösterim için daha sağlam ince çizgi).
- **Slogan / gövde / altyazı:** Be Vietnam Pro Medium / Bold.

## Logo kuralları
- ✅ Logonun çevresinde en az "A" yüksekliği kadar boşluk bırakılır. Avatar daire içinde başka öğe olmaz.
- ✅ Açık zeminde (keten, toz pembe, adaçayı) mürekkep logo · koyu zeminde (mürekkep, koyu adaçayı) keten logo.
- ❌ Logo yeniden yazılmaz (font ile dizilmez), SVG kullanılır. Döndürülmez, harf aralığı değiştirilmez, gölge, parıltı, degrade eklenmez.
- ❌ Toz pembe zeminde koyu adaçayı metin ve adaçayı zeminde keten logo kullanılmaz (eşik altı).
- ❌ Videoda köşeye yapışık sabit logo konmaz. Logo yalnızca bitiş kartında bir kez görünür (filigranı YouTube kendisi ekler). Bitiş kartında "abone ol" çağrısı ya da ok işareti yok.

## Kanal metinleri (taslak)
**Açıklama (Hakkında):**
> Güzellik standartları nereden geliyor? Filtre yüzüne ne yapıyor? Reklam fotoğrafındaki o ışık nasıl kuruluyor? Ayna Arkası'nda güzellik algısının tarihine, teknolojisine ve pazarlamasına bakıyoruz. Yargı yok, kusur yok, yalnızca merak var.
> Her videonun kaynakları açıklamada.
> Seslendirmelerde yapay zekâ destekli ses kullanılır, metinler insan tarafından yazılır ve doğrulanır.

**Anahtar kelimeler:** güzellik algısı, güzellik standartları, filtre, rötuş, makyaj tarihi, medya okuryazarlığı, özgüven, kozmetik tarihi

**Video açıklama şablonu:**
```
{1–2 cümle özet}

Kaynaklar:
1. {Kurum/Yazar, Başlık, Yıl}: {URL}
2. …

Seslendirme yapay zekâ destekli sesle yapılmıştır. Görseller illüstrasyondur.
#güzellik #filtre #aynaarkasi
```

## YouTube Studio ilk ayarlar
- Kitle: **"Hayır, çocuklar için yapılmadı"** (K-08)
- Yapay/sentetik içerik: gerçekçi AI görsel yok, kutu **hayır**. AI sesi açıklamada beyan edilir (K-17)
- Ücretli tanıtım: hayır (sponsor gelene kadar)
- Yorumlar: "Uygunsuz olabilecek yorumları incelemeye al" açık, engellenen kelimeler listesine hakaret ve beden yorumları (ör. "şişman", "çirkin") eklenir (G-01)
- Varsayılan kategori: **Eğitim**
