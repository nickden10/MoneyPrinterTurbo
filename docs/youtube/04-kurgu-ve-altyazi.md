# 04 · Kurgu ve Altyazı Stili
*Persona: **Short-Video Editing Coach** (agency-agents/marketing/marketing-short-video-editing-coach.md)*

> İlke: **Her kare yerini hak eder.** Shorts'ta izleyici ilk 1–2 saniyede kalmaya ya da kaydırmaya karar verir.

## 1. Anlatı iskeleti (tüm kanallar)
| Zaman | Bölüm | Amaç | Örnek (Rakamla, *rakamlar temsilîdir, doğrulanmadı*) |
|---|---|---|---|
| 0,0–1,5 sn | **Kanca** | Soru + görsel şok, **ilk karede metin** | "Türkiye günde kaç bardak çay içiyor?" + kahraman rakam belirmeye başlar |
| 1,5–6 sn | **Bağlam** | Neden önemli, kıyas noktası | "Tahmin et: 50 milyon mu, 100 milyon mu?" |
| 6–22 sn | **Açılış** | Veri/mekanizma adım adım, en fazla 3 adım | Çubuk grafik: TR, İngiltere, İrlanda… |
| 22–28 sn | **Ödül** | Akılda kalan tek cümle | "Yani her saniye ~2.700 bardak." |
| 28–30 sn | **Döngü** | Son cümle ilk kareye bağlanır (tekrar izleme) | "…peki bu çay nereden geliyor?" → ilk kare |

**Süre hedefleri:** A 25–35 sn · B 35–45 sn · C 40–50 sn. 60 saniye asla aşılmaz.
**CTA:** sözlü "abone ol" kullanılmaz. Yalnızca son 1 sn'de küçük bir yazı ("Yarın: ___") yer alır.

## 2. Tempo
- Görsel değişim **her 1,5–3 sn'de** bir olur: kesme, grafik adımı, zoom veya metin. Bu süre 3 sn'yi aşarsa izleyici kaybedilir.
- Kesmeler seslendirmenin **nefes ve noktalama** yerlerine oturtulur, kelime ortasında kesme yapılmaz.
- **Geçişler:** varsayılan sert kesme. Sahne değişiminde 8–12 karelik "push"/kaydırma kullanılabilir. Dönme, sayfa çevirme, glitch, flash **yasak** (marka dışı ve ucuz görünür).
- Kanal C (stok görüntü): klip başına 2–3 sn (`video_clip_duration = 3`), hafif Ken Burns (%104 zoom). Aynı klip bir videoda iki kez kullanılmaz.
- Kanca karesi statik olmaz, hareket ilk karede başlar.

## 3. Altyazı stili
Altyazı zorunludur, çünkü izleyicilerin önemli bir kısmı Shorts'u sessiz izler.

| Özellik | Değer |
|---|---|
| Font | Be Vietnam Pro Bold |
| Boyut | 72px (A, B) · 70px (C) |
| Satır | **en fazla 2 satır**, satırda en fazla 18 karakter |
| Gruplama | 2–4 kelimelik öbekler, anlam bütünlüğüne göre bölünür ("3,4 milyon" ve "kişi başı" bölünmez) |
| Konum | Ekranın **%62–70** yüksekliği (y ≈ 1200–1340). Alt UI'nin üstünde, grafik alanının altında |
| Renk | A: `#F4F1EA`, aktif kelime `#FFB000` · B: `#1A1A1A`, aktif kelime `#D93A0B` · C: `#FFF8EE`, aktif kelime `#F2C14E` |
| Kontur/gölge | A, C: 6px `#000` kontur (%70) · B: kontur yok, `#F5F1E8` %90 hap şeklinde arka plan |
| Animasyon | Öbek girişi: 4 karede %92→%100 ölçek ve opaklık. Aktif kelime renk değiştirir. Zıplama veya sallanma kullanılmaz |
| Yazım | Rakamlar rakamla yazılır ("3,4 milyon"). Vurgu için BÜYÜK HARF yerine renk kullanılır. Emoji yok |
| Senkron | Kelime zaman damgası seslendirmeden alınır, kayma ±80 ms'yi geçmez |

### MPT eşlemesi (stok tabanlı kanal C ve yedek hat)
```toml
# webui/API parametreleri
font_name          = "BeVietnamPro-Bold.ttf"
font_size          = 70
text_fore_color    = "#FFF8EE"
stroke_color       = "#000000"
stroke_width       = 4
subtitle_position  = "custom"
custom_position    = 66     # % yükseklik
video_aspect       = "9:16"
video_clip_duration = 3
voice_name         = "tr-TR-EmelNeural"   # veya tr-TR-AhmetNeural
voice_rate         = 1.08
bgm_volume         = 0.12
```
> MPT altyazısı tek renklidir. "Aktif kelime vurgusu" yalnızca HyperFrames hattında yapılır (A ve B'nin ana hattı).

## 4. Ses
| Öğe | Hedef |
|---|---|
| Toplam ses yüksekliği | **-14 LUFS** entegre, tepe ≤ **-1 dBTP** (YouTube normalizasyonu) |
| Müzik (BGM) | Konuşma altında -18 ile -22 dB arası, konuşma boşluğunda -12 dB'ye çıkar (ducking) |
| Seslendirme hızı | TR ~155–170 kelime/dk · EN ~160–175 kelime/dk |
| Ses efekti | Rakam belirmesinde kısa "tık"/"whoosh", video başına en fazla 4 adet, lisanslı (K-13) |
| Telaffuz | Sayılar, kısaltmalar (TÜİK, km, %) ve özel adlar render öncesi dinlenir. Sorun çıkarsa **Voice AI Integration Engineer** devreye girer (Aşama 2) |

## 5. Kapak (thumbnail) ve ilk kare
- Shorts kapağı **ilk karenin kendisidir**, ayrı ve yanıltıcı kapak hazırlanmaz (K-18).
- İlk karede: en fazla 5 kelimelik soru + kahraman öğe (rakam, nesne veya tabak). Güvenli alanın içinde yer alır.

## 6. Export
| Ayar | Değer |
|---|---|
| Çözünürlük | 1080×1920, 30 fps (B'de yumuşak mekanizma için 60 fps opsiyonel) |
| Codec | H.264 High, CRF 18 / ~12–16 Mbps, yuv420p |
| Ses | AAC 48 kHz, 192 kbps |
| Renk | Rec.709, SDR |

## 7. Kurgu kontrol listesi (render öncesi)
```
□ İlk 1,5 sn'de soru metni ve hareket var
□ 3 sn'den uzun "ölü" kare yok
□ Altyazı güvenli alanda ve grafikle çakışmıyor
□ Altyazıda yazım ve Türkçe karakter kontrolü (İ/ı, ğ, ş) yapıldı
□ Telaffuz dinlendi: rakam, kısaltma, özel ad
□ -14 LUFS / -1 dBTP ölçüldü
□ Son cümle döngüyü kuruyor
□ 01-degismez-kurallar.md F bölümü geçildi
```
