# 001 · Ses notları (seslendirme taslağı)

> ⚠️ **Bu ses bir TASLAKTIR.** `edge-tts` (Microsoft Edge'in çevrimiçi TTS servisi) ile üretildi. Yayın sürümü, UYUM **O-1** gereği aynı ses (`tr-TR-EmelNeural`) ve aynı ayarlarla **resmî Azure AI Speech** üzerinden yeniden üretilmeli, koşulları lisans kaydına girilmelidir. edge-tts çıktısı yayınlanmaz.

Hazırlayan: Voice AI Integration Engineer rolü · Tarih: 2026-11-20

## 1. Ayarlar

| Ayar | Değer |
|---|---|
| Ses | `tr-TR-EmelNeural` |
| Araç | edge-tts 7.3.1 (Python kütüphanesi, `boundary="WordBoundary"`) |
| Hız (`--rate`) | **+12 %** |
| Ses perdesi / şiddeti | varsayılan (+0 Hz, +0 %) |
| Üretim | Her vuruş (B1…B9b) ayrı dosya: `ses/parcalar/B*.mp3` + kelime sınırları `B*.json` |
| Birleştirme | Her parça kendi sessizliği kırpılarak (konuşma öncesi 30 ms, sonrası 120 ms pay, 10 ms giriş / 60 ms çıkış yumuşatması) plandaki nefes aralarıyla dizildi. 48 kHz, mono, 16 bit |
| Ses yüksekliği | ffmpeg `loudnorm` iki geçiş, hedef −14 LUFS / −1,5 dBTP |
| Ölçülen (yalnız ses) | **−14,4 LUFS** entegre, gerçek tepe **−1,5 dBTP**, LRA 2,7 LU |
| Çıktılar | `proje/assets/voice.wav` (37,50 sn) · `proje/assets/words.json` (89 kelime, sn cinsinden) · `ses/beats.json` |
| Betikler | `araclar/tts_parcalar.py` (üretim) · `araclar/ses_birlestir.py` (birleştirme + kelime saatleri) |

**Neden +12 % (SENARYO §4'teki "en fazla +8 %" sınırından sapma):** EmelNeural'ın edge-tts'teki varsayılan temposu, planın varsaydığından yavaş çıktı. Ölçümler:

| Hız | Konuşma süresi (90 kelime, aralar hariç) | Konuşma bitişi (0,2 sn başlangıç + 2,8 sn nefes aralarıyla) |
|---|---|---|
| +0 % | ≈ 37,5 sn | ≈ 40,5 sn ❌ |
| +8 % | 34,4 sn | ≈ 37,4 sn ❌ (36,2 sınırını 1,2 sn aşıyor) |
| **+12 %** | **32,9 sn** | **35,90 sn ✅** |

+12 %'de tempo **≈ 162 kelime/dk (≈ 6,5 hece/sn)**. Bu, `docs/youtube/04-kurgu-ve-altyazi.md` §4'teki Türkçe hedef aralığın (155–170 kelime/dk) içinde. Kulakla dinlenmedi. Bu yüzden tempo **müşteri onayı ister**. Alternatif: +8 % + MediaPipe'sız yedek cümle (≈ −0,8 sn). Bu seçenek yine de ≈ 36,6 sn'de biter ve videonun 38 sn'ye uzatılmasını gerektirir.

## 2. Vuruş süreleri (gerçek saat, video zaman çizelgesi)

| Vuruş | Konuşma başı (sn) | Konuşma sonu (sn) | Süre (sn) | Plan (SENARYO §2) | Sonraki ara (sn) |
|---|---|---|---|---|---|
| B1 Kanca | 0,20 | 3,93 | 3,73 | 0,2–4,6 | 0,30 |
| B2 Hesap | 4,23 | 7,66 | 3,42 | 4,9–9,2 | 0,30 |
| B3 Dalış 1 | 7,96 | 9,40 | 1,44 | 9,5–10,6 | 0,20 |
| B4 478 nokta | 9,60 | 14,48 | 4,88 | 10,8–15,9 | 0,30 |
| B5 Yumuşatma | 14,78 | 21,55 | 6,78 | 16,2–22,0 | 0,25 |
| B6 Esnetme | 21,80 | 25,86 | 4,05 | 22,2–26,1 | 0,20 |
| B7 Işık | 26,06 | 28,24 | 2,18 | 26,3–28,5 | 0,30 |
| B8 Geri çekilme | 28,54 | 31,25 | 2,72 | 28,8–31,7 | 0,35 |
| B9a Ödül | 31,60 | 33,61 | 2,01 | 32,1–33,9 | 0,30 |
| B9b Kanal cümlesi | 33,91 | **35,90** | 1,98 | 34,2–36,2 | — |

Toplam konuşma: 32,9 sn. Nefes araları: 2,80 sn (plandaki değerlerin aynısı). Son konuşma 35,90 sn'de biter. Video 37,5 sn'de biter (bitiş kartı ≈ 35,3–37,5).
B5'in içinde "silinir." ile "Gözenekler" arasında TTS'nin kendi cümle arası var (≈ 1,1 sn). Bu ara olduğu gibi bırakıldı, çünkü yumuşatma penceresi o sırada ekranda geçmeye devam ediyor.

Anahtar kelime saatleri (kesmeler bunlara bağlandı, `araclar/build.py`): "Saniyede" 4,23 · "Yakından" 7,96 · "dört yüz yetmiş sekiz" 12,53–13,58 · "nokta" 13,58 · "Sonra" 14,78 · "doku" 17,87 · "noktalar" 22,30 · "büyür" 24,87 · "daralır" 25,50 · "ışık" 26,48 · "gölgeler" 27,27 · "otuz kez" 29,30 · "hesaplanmış" 32,56 · "Gerçek" 33,91 · "doku" (kapanış) 34,66.

## 3. Kelime saatleri (words.json)

- Kaynak: edge-tts `WordBoundary` olayları (100 ns birimli ofset + süre). Ses tanıma yapılmadı, bu yüzden metin TTS'e verilen metnin aynısı.
- MP3 başlangıç gecikmesi (≈ 95 ms) her parçada ölçülüp düzeltildi: sınır saati + (sessizlik algılamayla bulunan ilk ses − ilk kelime ofseti).
- Kayma: kelime başları, birleştirilmiş ses dalgasındaki ilk sesle ±10 ms içinde (sessizlik algılama −45 dB). Hedef ±80 ms ✅.
- `words.json` TTS'in okuduğu biçimi tutar ("otuz üç", "Midiya Payp"). Altyazıdaki yazılı biçim ("33", "MediaPipe", "478") öbek tablosunda kelimelerin sırasına göre eşlenir (`araclar/build.py` → `GROUPS`).

## 4. Telaffuz kararları (SENARYO §4)

| Öğe | Karar | Gerekçe |
|---|---|---|
| MediaPipe → "Midiya Payp" | **Fonetik yazım kullanıldı.** Yedek cümleye geçilmedi | Kelime sınırları doğal hece süresi gösteriyor: "Midiya" 0,27 sn (3 hece), "Payp" 0,24 sn (1 hece, uzun ünlü). Komşu kelimelerle aynı tempoda, tuhaf bir uzama ya da sıkışma yok. **Kulakla dinlenmedi**, yayından önce bir insan dinlemeli |
| 33 → "otuz üç milisaniyeden" | Tek nefes: "otuz" ile "milisaniyeden" arasında 0,06 sn boşluk var, ayrı bir duraklama yok | ✅ |
| 478 → "dört yüz yetmiş sekiz" | "yüzün üstünde" ile kuruldu, "yüzde" yok. Söyleniş 12,53–13,58 sn | ✅ |
| bilateral | TTS düz okudu (0,53 sn). Vurgu kontrolü kulak ister | ⚠️ dinlenmeli |
| "Yakından bak" | Davet tonu SSML olmadan ayarlanamaz. edge-tts SSML prozodi etiketlerini kabul etmiyor | Azure'da `<prosody pitch="+3%">` ile denenebilir |
| "vardır" vurgusu, "olmalı da" yumuşak ton | edge-tts'te yapılamadı | Azure SSML'de `<emphasis>` ya da `mstts:express-as` ile yapılmalı |

## 5. Azure'a geçerken

1. Aynı metin, aynı ses, `rate="+12%"` (ya da müşterinin onayladığı hız), vuruş başına ayrı istek.
2. Kelime saatleri için Azure Speech SDK'nın `WordBoundary` olayları kullanılır. `araclar/ses_birlestir.py` aynı JSON biçimini bekler (`{text, offset, duration}` → saniye).
3. `python3 araclar/ses_birlestir.py ses/parcalar proje/assets/... ` → loudnorm → `python3 araclar/build.py`: bütün kesmeler yeni saate kendiliğinden kayar.
4. Yeni sesle kontrol: konuşma bitişi ≤ 36,2 sn, −14 LUFS / ≤ −1 dBTP.
