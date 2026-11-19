# 02 · Görsel Kimlik: Renk, Font, Ton
*Persona: **Brand Guardian** (agency-agents/design/design-brand-guardian.md)*

## 0. Ortak çerçeve (üç kanal için)
- **Font ailesi:** **Be Vietnam Pro** (SIL OFL, ticari kullanıma açık). Repoda `resource/fonts/` altında hazır. Türkçe karakterlerin tamamı (ğ Ğ ş Ş ı İ ç Ç ö Ö ü Ü â) doğrulandı ✅.
  - Ağırlıklar: Bold (başlık, altyazı), Medium (gövde, etiket).
  - ❌ `UTM Kabel KT.ttf` **Türkçe karakter desteklemiyor**, kullanılmaz.
- **Kontrast tabanı:** Metin/zemin ≥ 4.5:1, büyük metin (≥ 60px) ve grafik ≥ 3:1 (WCAG). Aşağıdaki oranlar ölçülmüştür.
- **Güvenli alan (1080×1920):** üst 220px ve alt 380px (YouTube arayüzü), sağ 140px (beğen/yorum butonları). Kritik içerik **x: 60–940, y: 220–1540** aralığında kalır.
- **Logo:** Üç kanalda da **yazı karakterli logo** kullanılır (wordmark, ikon ya da maskot yok). Taklit ve tescil riskini azaltır.

---

## Kanal A · **Rakamla** 🇹🇷
**Amaç:** Rakamların ardındaki hikâyeyi herkes için anlaşılır kılmak.
**Kişilik:** Meraklı · net · hafif esprili · asla bilgiç değil.
**Marka vaadi:** "Kaynaklı, doğru, 30 saniye."

### Renk token'ları (koyu tema)
| Token | Hex | Kullanım | Kontrast (zemine) |
|---|---|---|---|
| `--bg` | `#0E1116` | Zemin | — |
| `--ink` | `#F4F1EA` | Ana metin | 16.8:1 ✅ |
| `--accent` | `#FFB000` | Vurgu rakam, ana seri | 10.3:1 ✅ |
| `--accent-2` | `#4DA8FF` | Karşılaştırma serisi | 7.5:1 ✅ |
| `--muted` | `#8A93A3` | Eksen, kaynak etiketi | 6.1:1 ✅ |
| `--grid` | `#232A35` | Izgara çizgisi | dekoratif |

### Tipografi
| Rol | Font | Boyut (px @1080) |
|---|---|---|
| Kahraman rakam | Be Vietnam Pro Bold | 220–320 |
| Başlık | Be Vietnam Pro Bold | 84 |
| Altyazı | Be Vietnam Pro Bold | 72 |
| Etiket/eksen | Be Vietnam Pro Medium | 40 |
| Kaynak etiketi | Be Vietnam Pro Medium | 32 |

### Ton ve dil
- Konuşma Türkçesi kullanılır, "siz" değil **"sen"** hitabı. Cümleler kısa, ortalama 10 kelimeyi geçmez.
- ✅ "Türkiye'de günde 3,4 milyon simit… bir bakalım nereden çıktı bu rakam."
- ❌ "İNANAMAYACAKSINIZ!!!", "Kimse bunu bilmiyor", korku ve öfke dili (K-18).
- Ondalık ayırıcı **virgül** (3,4), binlik ayırıcı **nokta** (1.250.000). Birimler her zaman yazılır.
- **Slogan:** "Rakamla anlatalım."

---

## Kanal B · **Inside Things** 🌍
**Amaç:** Gündelik nesnelerin içindeki zekâyı göstermek.
**Kişilik:** Meraklı mühendis · sakin · kesin · zarif.
**Marka vaadi:** "One object. One mechanism. 40 seconds."

### Renk token'ları (açık tema, "blueprint on paper")
| Token | Hex | Kullanım | Kontrast |
|---|---|---|---|
| `--bg` | `#F5F1E8` | Kâğıt zemin | — |
| `--ink` | `#1A1A1A` | Çizgi, metin | 15.4:1 ✅ |
| `--accent` | `#D93A0B` | Hareket eden parça, ok | 4.1:1 (yalnız büyük metin/grafik) ⚠️ |
| `--blue` | `#2B59C3` | Kesit, akış | 5.6:1 ✅ |
| `--muted` | `#5C5C5C` | Ölçü çizgisi, etiket | 5.9:1 ✅ |

### Tipografi
Be Vietnam Pro: başlık Bold 88px, etiket Medium 40px. Teknik etiketler BÜYÜK HARF yazılır ve harf aralığı +4% olur.

### Ton ve dil
- Basit İngilizce (B1–B2 seviyesi) kullanılır, jargon ilk geçtiği yerde açıklanır.
- ✅ "This tiny spring is why your pen clicks."
- ❌ "You won't BELIEVE what's inside…"
- **Slogan:** "See how it works."

---

## Kanal C · **Tabağın Hikâyesi** 🇹🇷
**Amaç:** Yemeğin arkasındaki yolculuğu, coğrafyayı ve bilimi anlatmak.
**Kişilik:** Sıcak · anlatıcı · saygılı · iştah açıcı.
**Marka vaadi:** "Her tabağın bir yolu var."

### Renk token'ları (sıcak koyu, stok görüntü üstü kartlar)
| Token | Hex | Kullanım | Kontrast |
|---|---|---|---|
| `--card` | `#1F1A17` | Başlık kartı, alt bant (%85 opak) | — |
| `--cream` | `#FFF8EE` | Metin | 16.3:1 ✅ |
| `--saffron` | `#F2C14E` | Vurgu kelime, harita rotası | 10.3:1 ✅ |
| `--paprika` | `#E4572E` | Nokta, pin, ikincil vurgu | 4.7:1 ✅ |

### Tipografi
- Başlık: **Charm Bold** 96px (OFL, Türkçe ✅). **Yalnızca** başlık kartında ve en fazla 5 kelimeyle kullanılır.
- Altyazı/gövde: Be Vietnam Pro Bold 70px.

### Görüntü kuralları
- Sıcak renk düzeltme (+300K), doygunluk en fazla +10. Yemek "gerçek" görünür, aşırı filtre kullanılmaz.
- Yalnız lisanslı stok kullanılır (K-12). Aynı klip bir kanalda **30 gün içinde iki kez** kullanılmaz (K-16).

### Ton ve dil
- ✅ "Kaynaklara göre bu tatlının ilk izleri 15. yüzyıl saray mutfağına uzanıyor."
- ❌ "Bu yemek aslında bizim!" (K-07)
- **Slogan:** "Her tabağın bir yolu var."

---

## Marka koruma ve denetim
1. **Token tek kaynaktan gelir:** HyperFrames kompozisyonları renkleri CSS değişkenlerinden okur, kodda serbest hex yazılmaz.
2. **Haftalık denetim:** Yayınlanan son 7 videonun kapakları yan yana konur. Renk, font veya güvenli alan sapması varsa işaretlenir.
3. **Kanallar arası ayrım:** A koyu/amber, B açık kâğıt, C sıcak/kart. Paletler karıştırılmaz.
4. **Çakışma kontrolü (K-14):** Kanal adları ve el adları (@handle) açılmadan önce TÜRKPATENT ve YouTube aramasıyla kontrol edilir. Çakışma çıkarsa yedek ad listesi: A → "Sayıyla", "Rakam Rakam"; B → "How It Clicks", "Mechanism Minute"; C → "Tabak Yolu", "Lezzetin Kökü".
