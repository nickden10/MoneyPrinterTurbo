# 04 · Kurgu ve Altyazı Stili
*Persona: **Short-Video Editing Coach** (agency-agents/marketing/marketing-short-video-editing-coach.md)*

> İlke: **Her kare yerini hak eder.** Shorts'ta izleyici ilk 1–2 saniyede kalmaya ya da kaydırmaya karar verir.

## 1. Anlatı iskeleti (tüm kanallar)
| Zaman | Bölüm | Amaç | Örnek (Ayna Arkası, *temsilî*) |
|---|---|---|---|
| 0,0–1,5 sn | **Kanca** | Soru + görsel şok, **ilk karede metin** | "Bu kaşlar neden bu kadar inceydi?" + 1920'ler portre çizimi |
| 1,5–6 sn | **Bağlam** | Neden önemli, kıyas noktası | "Cevap ne moda ne makyaj: sinema ışığı." |
| 6–22 sn | **Açılış** | Veri/mekanizma adım adım, en fazla 3 adım | Zaman şeridi: siyah-beyaz film → sert ışık → ince kaş |
| 22–28 sn | **Ödül** | Akılda kalan tek cümle | "İdeal, ışığın göstermek istediği şeydi." |
| 28–30 sn | **Döngü** | Son cümle ilk kareye bağlanır (tekrar izleme) | "…peki bugünün ışığı ne? Telefon filtresi." → ilk kare |

**Süre hedefleri:** A 30–60 sn (+ haftalık 3–5 dk derleme) · B 35–45 sn · C 30–40 sn. Shorts 60 saniyeyi asla aşmaz.

### Kanal A (3–6 yaş) farkları: çocuk tempo kuralı
- İskelet farklıdır: **Selam → Tanıt → Tekrar et (3 kez) → Birlikte yap (soru + 2 sn bekleme) → Kutla.** "Kanca/şok" yoktur.
- Kesme aralığı ≥ 2,5 sn, görsel değişim yumuşak (fade 12 kare). Hızlı zoom ve sarsıntı kullanılmaz (F-05).
- Ses temposu yavaş: ~110–125 kelime/dk, `voice_rate = 0.92`.
- Altyazı tek satır, tek kelime vurgulu, 80px. Altyazı okumaktan çok **kelime tanıma** içindir.
**CTA:** sözlü "abone ol" kullanılmaz. Yalnızca son 1 sn'de küçük bir yazı ("Yarın: ___") yer alır.

## 2. Tempo
- Görsel değişim **her 1,5–3 sn'de** bir olur: kesme, grafik adımı, zoom veya metin. Bu süre 3 sn'yi aşarsa izleyici kaybedilir.
- Kesmeler seslendirmenin **nefes ve noktalama** yerlerine oturtulur, kelime ortasında kesme yapılmaz.
- **Geçişler:** varsayılan sert kesme. Sahne değişiminde 8–12 karelik "push"/kaydırma kullanılabilir. Dönme, sayfa çevirme, glitch, flash **yasak** (marka dışı ve ucuz görünür).
- Kanal C (stok doku/ürün görüntüsü): klip başına 2–3 sn (`video_clip_duration = 3`), hafif Ken Burns (%104 zoom). Aynı klip bir videoda iki kez kullanılmaz.
- Kanca karesi statik olmaz, hareket ilk karede başlar.

## 3. Altyazı stili
Altyazı zorunludur, çünkü izleyicilerin önemli bir kısmı Shorts'u sessiz izler.

| Özellik | Değer |
|---|---|
| Font | Be Vietnam Pro Bold |
| Boyut | 80px (A) · 72px (B, C) |
| Satır | **en fazla 2 satır**, satırda en fazla 18 karakter |
| Gruplama | 2–4 kelimelik öbekler, anlam bütünlüğüne göre bölünür ("3,4 milyon" ve "kişi başı" bölünmez) |
| Konum | Yazı bandının altı: **y ≈ 1140–1320** (1330px altına inmez). Grafik alanının altında |
| Renk | A: `#2B2D42`, aktif kelime `#E5484D` · B: `--caption-text` `#F8F4EC`, aktif kelime `--caption-active` `#F2D3D1` (toz pembe) · C: `#1E2A2F`, aktif kelime `#0F7A60` |
| Kontur/gölge | Kontur ve gölge yok. B: `--caption-pill` `rgba(44,58,49,.92)` (mürekkep %92) koyu hap, köşe 24px. Metin 8.63:1 / aktif 6.77:1 (keten sahne), 8.95:1 / 7.02:1 (toz pembe sahne) · A, C: zemin renginde %90 hap şeklinde arka plan |
| Animasyon | Öbek girişi: 4 karede %92→%100 ölçek ve opaklık. Aktif kelime renk değiştirir. Zıplama veya sallanma kullanılmaz |
| Yazım | Rakamlar rakamla yazılır ("SPF 30", "1920'ler"). Vurgu için BÜYÜK HARF yerine renk kullanılır. Emoji yok |
| Senkron | Kelime zaman damgası seslendirmeden alınır, kayma ±80 ms'yi geçmez |

### MPT eşlemesi (Kanal C stok hattı ve yedek hat)
```toml
# webui/API parametreleri
font_name          = "BeVietnamPro-Bold.ttf"
font_size          = 72
text_fore_color    = "#1E2A2F"   # Kanal C
stroke_color       = "#000000"
stroke_width       = 0
text_background_color = "#F7F7F4"
subtitle_position  = "custom"
custom_position    = 62     # % yükseklik (altyazı 1330px'i geçmesin)
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
| Ses efekti | Kısa "tık"/"whoosh", video başına en fazla 4 adet, lisanslı (K-13). Kanal A: yumuşak "ding", ani yüksek ses yok, tepe ≤ -3 dBTP (F-05) |
| Telaffuz | Sayılar, kısaltmalar (TÜİK, km, %) ve özel adlar render öncesi dinlenir. Sorun çıkarsa **Voice AI Integration Engineer** devreye girer (Aşama 2) |

## 5. Kapak (thumbnail) ve ilk kare
- Shorts kapağı **ilk karenin kendisidir**, ayrı ve yanıltıcı kapak hazırlanmaz (K-18).
- İlk karede: en fazla 5 kelimelik soru + kahraman öğe (A: karakter + öğretilen kelime, B: dönem portresi çizimi, C: markasız şişe + madde adı). Güvenli alanın içinde yer alır.

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
□ 01-degismez-kurallar.md H bölümü (yayın öncesi kapı) geçildi
```
