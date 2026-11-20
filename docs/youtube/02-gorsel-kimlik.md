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

### Renk token'ları (final: palet 05 · Toz Pembe & Adaçayı)
Açık ve ferah sistem: keten zemin, toz pembe kahraman yüzey, koyu renk yalnızca metin olarak az miktarda.
| Token | Hex | Kullanım | Kontrast |
|---|---|---|---|
| `--toz-pembe` | `#F2D3D1` | **Kahraman renk**: avatar, kapak, büyük yüzeyler | mürekkep metin üstünde 8.55:1 ✅ |
| `--keten` | `#F8F4EC` | Ana zemin (video, bitiş kartı) | mürekkep metin üstünde 10.90:1 ✅ |
| `--adacayi` | `#BCC5B0` | İkincil yüzey (bant, kart) | mürekkep metin üstünde 6.69:1 ✅ |
| `--murekkep` | `#2C3A31` | Yaprak mürekkebi: **tüm metin ve logo** | keten 10.90 · toz pembe 8.55 · adaçayı 6.69 ✅ |
| `--koyu-adacayi` | `#4D6A55` | Vurgu: keten üstünde metin, çizgi, grafik | keten 5.46:1 ✅ · toz pembe 4.28:1 (yalnız çizgi/grafik, ≥3) |
| `--caption-text` | `#F8F4EC` | Altyazı metni (hap üstünde) | 8.63:1 (keten sahne) · 8.95:1 (toz pembe sahne) ✅ |
| `--caption-active` | `#F2D3D1` | Altyazı aktif kelime | 6.77:1 (keten sahne) · 7.02:1 (toz pembe sahne) ✅ |
| `--caption-pill` | `rgba(44,58,49,.92)` | Altyazı hapı (mürekkep %92) | sahneye karşı 8.63 (keten) · 7.02 (toz pembe) |

- ❌ Toz pembe zeminde metin `--koyu-adacayi` olmaz (4.28:1). Toz pembe ve adaçayı zeminde metin her zaman `--murekkep`.
- ❌ Açık (keten) logo adaçayı zeminde kullanılmaz (1.63:1). Açık logo yalnızca mürekkep (10.90:1) ve koyu adaçayı (5.46:1) zeminde.
- Degrade, gölge, parıltı, süs yok. Oranlar WCAG 2.x ile hesaplandı: `brand/final/src/contrast.py`, `brand/final/src/build/checks.json`.
- Tek kaynak: `channels/ayna-arkasi/brand/brand.css`. Final varlıklar: `channels/ayna-arkasi/brand/final/`.

### Tipografi
| Rol | Font | Ayar |
|---|---|---|
| Logo (konturlu SVG) | Fraunces | wght 600 · opsz 144 · **SOFT 100** · WONK 0, elle ayarlanmış çift aralıkları |
| Avatar / filigran "A" | Fraunces | wght 640 · opsz 72 · SOFT 100 (küçük boyutta ince çizgiler kaybolmasın diye) |
| Başlık kartı | Fraunces (`.ayna-display`) | 600 · SOFT 100 · opsz 144, en fazla 6 kelime |
| Altyazı | Be Vietnam Pro Bold | 72px, koyu hap içinde |
| Gövde, slogan, etiket | Be Vietnam Pro Medium | 40px |

- Charm artık kullanılmaz (yerini Fraunces SOFT aldı).

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
3. **Kanallar arası ayrım:** A krem/geometrik, B keten-toz pembe/adaçayı (zarif, editoryal), C açık/laboratuvar. Paletler karıştırılmaz. A'nın çocuk paleti B/C'de **asla** kullanılmaz (çocuk-yetişkin kitle karışmasın).
4. **Çakışma kontrolü (K-14):** Adlar açılmadan önce TÜRKPATENT ve YouTube aramasıyla kontrol edilir. Yedek adlar: A → "Merak Kutusu", "Minik Adımlar"; B → "Filtresiz", "Ayna Ayna"; C → "İçindekiler", "Şişenin Arkası".
