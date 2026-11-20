# 001 · Ses notları (v3: tek parça okuma, müşterinin kendi sesi, TR + EN)

> **Ses = müşterinin kendi ElevenLabs ses klonu** ("deno tr", voice_id `oZLkvX3OQ4An5lUhNiUt`, cloned, Türkçe). AI ses klonu, sahibinin izniyle. Açıklamaya şu beyan girmeli: "Seslendirme: kanal sahibinin AI ses klonu."
> Önceki sürümler silinmedi: v1 edge-tts → `proje/assets/_eski-edge/`, `ses/parcalar/` · v2 vuruş vuruş ElevenLabs → `proje/assets/_v2/`, `ses/el/`, `ses/el-en/`.

Hazırlayan: Voice AI Integration Engineer rolü · Tarih: 2026-11-20

## 1. Neden değişti (müşteri: "sesim yapay geliyor")

v2'de her vuruş ayrı istekle üretilmişti. Her cümle "soğuk" başlıyordu, tonlama vuruşlar arasında kopuyordu. Ayrıca stability 0,5 yüksekti ve "Midiya Payp" fonetik yazımı robotik duruyordu. v3'te:
- **Bütün metin dil başına TEK istekle** okundu (`araclar/el_tam.py`). Vuruşlar arasına v2'nin `<break time="0,35s" />` etiketi kondu: okuma yeniden başlamıyor, cümle aralarında nefes alınıyor.
- **"MediaPipe" normal yazıldı.** Hizalamada sorun görünmedi (aşağıda).
- Vuruş ve kelime saatleri sonradan karakter hizalamasından çıkarıldı.

## 2. Alımlar (TR: 3 / 3 hak, EN: 1 / 3 hak). 401/402/kota hatası yok

| Alım | Model | Ayarlar | Konuşma | Tempo | Vuruş araları | Sonuç |
|---|---|---|---|---|---|---|
| TR A | `eleven_multilingual_v2` | stab 0,38 · sim 0,85 · style 0,35 · speed 1,0 · boost | 41,0 sn | 130 k/dk | 0,07–0,56 sn. B1→B2, B4→B5 ve B5→B6 arası yalnızca 0,07 sn | ✗ Cümleler birbirine yapışıyor, nefes yok |
| TR B | `eleven_v3` | stab 0,5 ("Natural") · sim 0,85 · style 0,35 | 50,6 sn | 105 k/dk | 0,30–0,52 sn | ✗ Yavaş (video ≈ 52,7 sn). **Hizalama sese göre ≈ 0,3 sn erken**: sessizlik algılamayla karşılaştırıldı (ör. "Yakından" hizalamada 9,88, seste 10,17). Altyazı kayardı |
| **TR C ✅** | `eleven_multilingual_v2` + vuruş arası `<break time="0.35s" />` | stab 0,38 · sim 0,85 · style 0,35 · speed 1,0 · boost | **44,3 sn** | 120 k/dk | **0,44–0,81 sn** (doğal nefes) | **Seçildi.** Cümle içi en uzun ara 0,33 sn ("silinir." → "Gözenekler"), acele edilmiş kelime yok. Hizalama sessizliklerle ±0,05 sn tutuyor |
| **EN A ✅** | aynı (v2 + break) | aynı | 42,4 sn | 150 k/dk | 0,43–0,79 sn | Seçildi (tek alım yetti) |

**Kazanan: `eleven_multilingual_v2`, stability 0,38 · similarity_boost 0,85 · style 0,35 · use_speaker_boost açık · speed 1,0, tek istek, vuruş arası 0,35 sn break etiketi, seed 1001.**

## 3. Çıktılar ve süre

| Dosya | İçerik |
|---|---|
| `proje/assets/voice.wav` | TR, 44,97 sn, 48 kHz mono. Okuma bütün bırakıldı, yalnızca konuşma 0,20 sn'de başlasın diye kaydırıldı. −14,6 LUFS / −1,5 dBTP |
| `proje/assets/words.json` | TR, 89 kelime, aynı şema. "MediaPipe" karakter saatinde "Media" + "Pipe" olarak bölündü (89'luk sıra korunsun diye) |
| `proje/assets/voice-en.wav`, `words-en.json` | EN, 106 kelime. Okuma vuruş aralarındaki nefesin ortasından kesildi, her vuruş TR vuruşunun başına kondu. Vuruş içine dokunulmadı. −14,8 LUFS |
| `ses/v3-tr/`, `ses/v3-en/` | Bütün alımlar (mp3, ham hizalama, istek, kelimeler) + `beats.json` |
| `onizleme/001-ses-en.m4a` | YouTube çok dilli ses izi: EN miks (ses + aynı 4 SFX), AAC 48 kHz, **46,400 sn = TR video**, TR zaman çizelgesine hizalı |
| `onizleme/001-tr.srt`, `001-en.srt` | 35'er öbek, kelime saatlerinden |

**Süre:** Konuşma 0,20–44,28 sn ("da"). **Video 46,40 sn** (1392 kare): son cümle ≥ 2 sn, bitiş kartı altında. Sınır 55 sn. EN konuşma 44,20 sn'de biter.
**Miks (render'da ölçüldü):** TR −14,0 LUFS / −2,5 dBTP · EN −14,0 LUFS / −2,5 dBTP (kazanç TR 0,758, EN 0,776).

## 4. Vuruşlar (TR, video saati) ve EN yerleşimi

| Vuruş | TR başı–sonu (sn) | EN başı–sonu (sn) |
|---|---|---|
| B1 | 0,20–4,66 | 0,20–4,50 |
| B2 | 5,36–9,59 | 5,36–9,22 |
| B3 | 10,22–12,02 | 10,22–12,07 |
| B4 | 12,54–18,39 | 12,54–18,23 |
| B5 | 18,87–26,31 | 18,87–26,01 |
| B6 | 26,93–32,06 | 26,93–31,58 |
| B7 | 32,63–35,17 | 32,63–34,90 |
| B8 | 35,75–38,74 | 35,75–39,22 |
| B9a | 39,18–41,34 | 39,42–42,01 (B8 İngilizcede 0,25 sn uzun) |
| B9b | 42,15–44,47 | 42,21–44,20 |

Anahtar kelimeler (kesmeler bunlara bağlı): "Saniyede" 5,36 · "Yakından" 10,22 · "Önce" 12,54 · "MediaPipe" 14,32 · "nokta" 17,20 · "Sonra" 18,87 · "doku" 22,70 · "noktalar" 27,51 · "ışık" 33,13 · "otuz kez" 36,53 · "hesaplanmış" 40,13 · "Gerçek" 42,15 · "doku" 43,04.

## 5. Telaffuz (hizalamaya göre; **kulakla dinlenmedi**)

| Öğe | Durum |
|---|---|
| MediaPipe (TR, normal yazım) | 14,32–15,00 (0,69 sn). Ortasında sessizlik yok, ardından virgül için 0,06 sn. Komşu kelimelerle aynı tempoda ✅. Türkçe sesin İngilizce "midiəpaɪp" mi, harf harf mi okuduğunu hizalama göstermez: ⚠️ dinlenmeli |
| 33 / 30 / 478 | "otuz üç milisaniyeden" tek nefes. "dört yüz yetmiş sekiz" eşit tempoda ✅ |
| bilateral | 19,24–19,88 (0,64 sn), tempo düzgün. Vurgu ⚠️ dinlenmeli |
| EN sayılar, MediaPipe | düzgün ✅ |

## 6. Yeniden üretmek

```bash
EL_JOIN=' <break time="0.35s" /> ' python3 araclar/el_tam.py tr ses/v3-tr C-v2-break
EL_JOIN=' <break time="0.35s" /> ' python3 araclar/el_tam.py en ses/v3-en A-v2-break
python3 araclar/ses_tam.py ses/v3-tr/C-v2-break.mp3 ses/v3-tr/C-v2-break.words.json <tmp>/tr.wav proje/assets/words.json ses/v3-tr/beats.json
python3 araclar/ses_tam.py ses/v3-en/A-v2-break.mp3 ses/v3-en/A-v2-break.words.json <tmp>/en.wav proje/assets/words-en.json ses/v3-en/beats.json ses/v3-tr/beats.json
# loudnorm iki geçiş (−14 LUFS / −1,5 dBTP) -> proje/assets/voice.wav, voice-en.wav
python3 araclar/build.py --lang tr   # ya da en
python3 araclar/srt.py onizleme
```
