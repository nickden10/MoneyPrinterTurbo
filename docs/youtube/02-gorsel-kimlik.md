# 02 · Görsel Kimlik: Renk, Font, Ton
*Persona: **Brand Guardian** (agency-agents/design/design-brand-guardian.md)*

## 0. Ortak çerçeve (üç kanal için)
- **Font ailesi:** **Be Vietnam Pro** (SIL OFL, ticari kullanıma açık). Repoda `resource/fonts/` altında hazır. Türkçe karakterlerin tamamı (ğ Ğ ş Ş ı İ ç Ç ö Ö ü Ü â) doğrulandı ✅.
  - Ağırlıklar: Bold (başlık, altyazı), Medium (gövde, etiket).
  - ❌ `UTM Kabel KT.ttf` **Türkçe karakter desteklemiyor**, kullanılmaz.
- **Kontrast tabanı:** Metin/zemin ≥ 4.5:1, büyük metin (≥ 60px) ve grafik ≥ 3:1 (WCAG). Aşağıdaki oranlar ölçülmüştür.
- **Güvenli alan (1080×1920, HyperFrames vertical rehberi):** üst 168px boş (durum ve arama çubuğu). Tüm yazı ve ana öğe **y: 168–1330** bandında kalır, 1330px altına yalnızca doku ve dekor girer. Sağ 140px'te (beğen/yorum rayı) yazı olmaz.
- **Logo:** Üç kanalda da **yazı karakterli logo** kullanılır (wordmark, ikon ya da maskot yok). Taklit ve tescil riskini azaltır.

---

## Kanal A · **Minik Merak** 🧒 (3–6 yaş)
**Amaç:** Küçük çocuklara temel kavramları sakin, doğru ve sevgiyle öğretmek.
**Kişilik:** Şefkatli · sabırlı · neşeli ama gürültüsüz.
**Marka vaadi:** "Yavaş, net, güvenli." Ebeveyne verilen söz: "Gönül rahatlığıyla açabilirsin."

### Renk token'ları (açık, sıcak krem zemin)
| Token | Hex | Kullanım | Kontrast (zemine) |
|---|---|---|---|
| `--bg` | `#FFF6E5` | Zemin | — |
| `--ink` | `#2B2D42` | **Tüm metin**, şekil konturu (4px) | 12.6:1 ✅ |
| `--coral` | `#E5484D` | Şekil dolgusu | 3.7:1 (yalnız dolgu + kontur) |
| `--teal` | `#0E8C7F` | Şekil dolgusu | 3.9:1 (yalnız dolgu + kontur) |
| `--sky` | `#2F6FDB` | Şekil dolgusu | 4.4:1 (yalnız dolgu + kontur) |
| `--sun` | `#F2A900` | Şekil dolgusu | 1.9:1 ⚠️ **mutlaka `--ink` konturla** |
| `--plum` | `#6B5B95` | Şekil dolgusu, ikincil metin | 5.5:1 ✅ |

- Renkler doygun ama "neon" değil. Floresan ve yanıp sönen gradyan kullanılmaz (F-05).
- Renk öğretilirken renk adı **her zaman yazıyla ve sesle** de verilir (renk körü çocuklar için).

### Tipografi
| Rol | Font | Boyut |
|---|---|---|
| Öğretilen kelime/sayı | Be Vietnam Pro Bold | 200–260px |
| Altyazı | Be Vietnam Pro Bold | 80px, cümle düzeni (BÜYÜK HARF yok, harf tanımayı bozar) |

### Karakterler
- 3 sabit karakter, hepsi geometrik SVG: **Top** (yuvarlak, merakçı), **Kare** (sakin, düşünür), **Üçgen** (hareketli, şakacı).
- Cinsiyetsiz, insan olmayan karakterler (F-07). Göz ve ağız basit, ifade yalnızca 4 duyguyla sınırlı (mutlu, şaşkın, üzgün, sakin).
- Hiçbir mevcut çizgi film karakterine benzemez (F-04, K-12).

### Ton ve dil
- Kısa ve somut cümleler kurulur (en fazla 6 kelime). Doğrudan, sıcak hitap edilir: "Haydi sayalım!"
- Yeni kelime 3 kez tekrarlanır (öğrenme). Soru sorulduktan sonra **2 sn sessizlik** bırakılır (çocuk cevap verir).
- ❌ "Sakın kaçırma!", "Annene söyle alsın!" (F-06)
- **Slogan:** "Birlikte merak edelim."

---

## Kanal B · **Ayna Arkası** 🪞 (Kadın 18+)
**Amaç:** Güzellik algısının arkasındaki tarihi, teknolojiyi ve pazarlamayı göstermek.
**Kişilik:** Zeki arkadaş · samimi · eleştirel ama yargılamayan · zarif.
**Marka vaadi:** "Seçim senin, ama arkasını bil."

### Renk token'ları (revize: **toz pembe ana renk**)
| Token | Hex | Kullanım | Kontrast |
|---|---|---|---|
| `--plum` | `#1C1424` | Video zemini (koyu) | — |
| `--toz-pembe` | `#E8B4B8` | **ANA MARKA RENGİ**: logo, aktif kelime, vurgu | 9.9:1 (erik üstü) ✅ |
| `--toz-pembe-acik` | `#F6E1E3` | Açık zemin (açık logo, kapak varyantı) | — |
| `--ink` | `#F7EFF3` | Koyu zeminde metin | 15.8:1 ✅ |
| `--berry` | `#8E3B5A` | Açık zeminde vurgu metni | 5.8:1 (açık pembe üstü) ✅ |
| `--gold` | `#E9C46A` | Dönem/tarih etiketi | 10.7:1 ✅ |
| `--mint` | `#7FC8C2` | "Gerçek/filtresiz" vurgusu | 9.3:1 ✅ |
| `--muted` | `#A89BB0` | Kaynak, eksen | 6.8:1 ✅ |

- ❌ **Beyaz metin toz pembe zemin üstünde yasak** (1.8:1). Toz pembe zeminde metin her zaman `--plum` olur.
- Tek kaynak: `channels/ayna-arkasi/brand/brand.css`.

### Tipografi
- Başlık: **Charm Bold** 96px (OFL, Türkçe ✅). Yalnızca dönem adı ve başlık kartında, en fazla 4 kelime.
- Altyazı/gövde: Be Vietnam Pro Bold 72px / Medium 40px.

### Görsel kurallar
- Yüzler **illüstrasyon** (çizgi portre, siluet) ya da **kamu malı tarihî eser** olarak gösterilir. Gerçek kişinin fotoğrafı ve AI ile üretilmiş yüz kullanılmaz (G-02, K-06).
- Filtre/rötuş anlatımı şematik yapılır: "ışık kaynağı → gölge → yumuşatma katmanı" diyagramı.
- Farklı ten renklerinden çizim örnekleri dengeli dağıtılır (G-08).

### Ton ve dil
- ✅ "1920'lerde ince kaş moda oldu. Peki neden? Cevap sinema ışıklarında."
- ✅ "Bu fotoğraftaki cilt dokusu 4 katmanla siliniyor. Gerçek ciltte doku vardır, olmalı da."
- ❌ "Kusurlarını gizlemenin 5 yolu", "Erkekler bunu fark ediyor" (G-01, G-07)
- **Slogan:** "Aynanın arkasına bak."

---

## Kanal C · **Etiketi Oku** 🧴 (Kadın 18+)
**Amaç:** Kozmetik etiketlerini anlaşılır kılmak, kaynakla ve tavsiye vermeden.
**Kişilik:** Titiz · açık sözlü · laboratuvar sakinliği · sade.
**Marka vaadi:** "Pazarlama değil, içerik listesi."

### Renk token'ları (açık, temiz "laboratuvar" zemin)
| Token | Hex | Kullanım | Kontrast |
|---|---|---|---|
| `--bg` | `#F7F7F4` | Zemin | — |
| `--ink` | `#1E2A2F` | Metin, etiket | 13.7:1 ✅ |
| `--green` | `#0F7A60` | Etken madde vurgusu | 4.9:1 ✅ |
| `--lilac` | `#6A4C9C` | 2. kategori (nemlendirici, koruyucu…) | 6.3:1 ✅ |
| `--rust` | `#B5452B` | "Mit" etiketi / dikkat | 5.1:1 ✅ |
| `--muted` | `#5E6B70` | Kaynak, INCI listesi | 5.1:1 ✅ |

### Tipografi
Be Vietnam Pro: başlık Bold 84px, madde adı Bold 96px, INCI listesi Medium 36px.

### Görsel kurallar
- Ürün ambalajı **markasız** olur (beyaz şişe illüstrasyonu ya da logosuz stok görsel) (G-05).
- "Mit/gerçek" kartı kullanılır: üst kısımda `--rust` "MİT", altta `--green` "KAYNAĞA GÖRE".
- Her videonun son karesi sabittir: "Cilt sorunun varsa bir dermatoloğa danış." (G-04)

### Ton ve dil
- ✅ "Niasinamid, B3 vitamininin bir formu. Kozmetikte bariyer desteği için kullanılıyor (kaynak: …)."
- ❌ "Sivilceyi 3 günde yok eder", "En iyi serum bu" (G-04, G-05)
- **Slogan:** "Önce etiketi oku."

---

## Marka koruma ve denetim
1. **Token tek kaynaktan gelir:** HyperFrames kompozisyonları renkleri CSS değişkenlerinden okur, kodda serbest hex yazılmaz.
2. **Haftalık denetim:** Son 7 videonun ilk kareleri yan yana konur. Renk, font ve güvenli alan sapmasıyla birlikte **ton denetimi** de yapılır: B/C'de yargılayıcı kelime var mı (G-01), A'da tempo kurala uyuyor mu (F-05)?
3. **Kanallar arası ayrım:** A krem/geometrik, B koyu erik/zarif, C açık/laboratuvar. Paletler karıştırılmaz. A'nın çocuk paleti B/C'de **asla** kullanılmaz (çocuk-yetişkin kitle karışmasın).
4. **Çakışma kontrolü (K-14):** Adlar açılmadan önce TÜRKPATENT ve YouTube aramasıyla kontrol edilir. Yedek adlar: A → "Merak Kutusu", "Minik Adımlar"; B → "Filtresiz", "Ayna Ayna"; C → "İçindekiler", "Şişenin Arkası".
