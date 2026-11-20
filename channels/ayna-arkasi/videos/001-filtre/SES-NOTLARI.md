# 001 · Ses notları (v2: müşterinin kendi sesi, TR + EN)

> **Ses = müşterinin kendi ElevenLabs ses klonu** ("deno tr", voice_id `oZLkvX3OQ4An5lUhNiUt`, kategori: cloned, Türkçe). AI ses klonu, sahibinin izniyle kullanılıyor. Açıklamadaki beyan bunu söylemeli: "Seslendirme: kanal sahibinin AI ses klonu." edge-tts taslağı artık kullanılmıyor. Eski dosyalar `proje/assets/_eski-edge/` ve `ses/parcalar/` altında duruyor (silinmedi).

Hazırlayan: Voice AI Integration Engineer rolü · Tarih: 2026-11-20

## 1. Ayarlar

| Ayar | Değer |
|---|---|
| Ses | "deno tr" · `oZLkvX3OQ4An5lUhNiUt` (başka ses kullanılmadı) |
| Model | `eleven_multilingual_v2` (v3'e gerek kalmadı: sayılar ve "bilateral" hizalamada düzgün) |
| Uç nokta | `POST /v1/text-to-speech/{voice_id}/with-timestamps?output_format=mp3_44100_128` (ses + karakter hizalaması) |
| voice_settings | stability 0,5 · similarity_boost 0,8 · style 0,2 · use_speaker_boost açık · **speed 1,0** (EN B5: 1,1) |
| Tutarlılık | `seed` 1001. Her vuruşta `previous_text` / `next_text` verildi (vuruşlar arası tonlama kopmasın diye) |
| Üretim | Vuruş başına bir istek, B1…B9b: `araclar/el_parcalar.py` (metin `araclar/metin.py`) → `ses/el/` (TR), `ses/el-en/` (EN) |
| Kelime saatleri | Karakter hizalaması → kelime (boşluk ve noktalama böler; noktalamanın süresi kelimeye katılmaz). İlk kelime 0,00'a sabit geldiği için ilk sese kırpıldı |
| Birleştirme | `araclar/ses_birlestir.py`: her parçanın sessizliği kırpıldı (öncesi 30 ms, sonrası 120 ms pay), SENARYO'daki nefes aralarıyla dizildi. 48 kHz, mono, 16 bit |
| Ses yüksekliği | ffmpeg `loudnorm` iki geçiş, hedef −14 LUFS / −1,5 dBTP |
| Kredi | TR 1 tam alım (+ B4 için 1 deneme) · EN 1 tam alım (+ B5 yeniden). 401/402/kota hatası yok |

**Tempo kararı ("ses saattir"):** Müşterinin doğal temposu korundu (speed 1,0, hızlandırma yok). Konuşma 0,20–42,73 sn. Video bu yüzden **44,63 sn** (1339 kare): son cümle ≥ 2 sn tutuluyor, bitiş kartı onun altında geliyor. Hedef aralık 33–45 sn, sınır 59 sn: ikisine de uyuyor.

## 2. Çıktılar

| Dosya | İçerik |
|---|---|
| `proje/assets/voice.wav` | TR, 43,54 sn, ölçülen −14,7 LUFS / −1,5 dBTP (yalnız ses) |
| `proje/assets/words.json` | TR, 89 kelime, eski şemanın aynısı (`beat, text, start, end, id`), sıra SENARYO §2 ile birebir |
| `proje/assets/voice-en.wav` | EN, 43,61 sn, −14,8 LUFS / −1,5 dBTP |
| `proje/assets/words-en.json` | EN, 106 kelime |
| `ses/el/beats.json`, `ses/el-en/beats.json` | Vuruş başı/sonu |
| `onizleme/001-ses-en.m4a` | YouTube çok dilli ses izi: EN miks (ses + aynı 4 SFX), AAC 48 kHz stereo, **44,633 sn = TR videonun süresi**, TR zaman çizelgesine hizalı |
| `onizleme/001-tr.srt`, `onizleme/001-en.srt` | Kelime saatlerinden altyazı (35'er öbek, B1 ve B9b dahil) |

**Miks (render edilmiş dosyada ölçüldü):** TR **−14,0 LUFS**, gerçek tepe −2,9 dBTP, LRA 2,6 LU · EN **−14,0 LUFS**, tepe −2,3 dBTP. Kazanç: TR 0,767, EN 0,776 (mono ses stereo'ya açılınca yükseliyor; ilk v2 render −14,3 ölçüldü, +0,3 dB düzeltildi).

## 3. Vuruş süreleri (TR, video saati)

| Vuruş | Başlangıç (sn) | Bitiş (sn) | Sonraki ara (sn) |
|---|---|---|---|
| B1 Kanca | 0,20 | 4,96 | 0,30 |
| B2 Hesap | 5,26 | 9,94 | 0,30 |
| B3 Dalış | 10,24 | 12,33 | 0,20 |
| B4 478 nokta | 12,53 | 18,83 | 0,30 |
| B5 Yumuşatma | 19,13 | 26,83 | 0,25 |
| B6 Esnetme | 27,08 | 31,44 | 0,20 |
| B7 Işık | 31,64 | 34,28 | 0,30 |
| B8 Geri çekilme | 34,58 | 37,40 | 0,35 |
| B9a Ödül | 37,75 | 40,11 | 0,30 |
| B9b Kanal cümlesi | 40,41 | 43,04 (son kelime "da" 42,73'te biter) | — |

Bitiş değerleri parçanın kuyruğunu (nefes/sönüm) içeriyor. Anahtar kelimeler (kesmeler bunlara bağlı, `araclar/build.py`): "Saniyede" 5,26 · "Yakından" 10,24 · "Önce" 12,53 · "Midiya Payp" 14,32 · "nokta" 17,28 · "Sonra" 19,12 · "doku" 23,12 · "noktalar" 27,64 · "ışık" 32,09 · "otuz kez" 35,35 · "hesaplanmış" 38,83 · "Gerçek" 40,41 · "doku" 41,23.

**EN yerleşimi:** Her EN vuruşu TR vuruşunun başladığı anda başlar (uzun gelen vuruş varsa bir öncekinin bitişinden 0,15 sn sonra). B9a 0,22 sn, B9b 0,67 sn geç başlıyor (B8 ve B9a İngilizcede biraz uzun). Sahne içi açılışlar ve altyazılar EN kelimelerine bağlanıyor, sahne kesmeleri TR saatinde kalıyor. EN konuşma 42,78 sn'de biter, video 44,63 sn.

## 4. Telaffuz (hizalamaya göre; **kulakla dinlenmedi**)

| Öğe | Karar | Hizalamada görülen |
|---|---|---|
| MediaPipe (TR) | **"Midiya Payp" yazımı kullanıldı** | İki biçim de denendi (B4). "Midiya" 0,32 sn + "Payp" 0,34 sn, ardından virgüle rağmen yalnızca 0,09 sn ara: akıcı. "MediaPipe" tek kelime 0,84 sn ve arkasından 0,30 sn duraklama getirdi (vuruş 0,5 sn uzadı), ortasında da 0,10 sn sessizlik var ("Media … Pipe"). Fonetik yazımda da "Midiya" ile "Payp" arasında 0,10 sn sessizlik var: iki ayrı kelime gibi duyulabilir. ⚠️ Dinlenmeli |
| MediaPipe (EN) | Özgün yazım | 0,62 sn, doğal |
| 33 → "otuz üç milisaniyeden" | ✅ | "otuz" 2,51 · "üç" 2,90 · "milisaniyeden" 3,10: tek nefes, ayrı duraklama yok |
| 478 → "dört yüz yetmiş sekiz" | ✅ | 15,98–17,21, dört kelime eşit tempoda; "yüzde" yok ("yüzün üstünde") |
| bilateral | ⚠️ dinlenmeli | 0,62 sn, komşularla aynı tempo. Vurgunun "-ral"a kayıp kaymadığı hizalamadan anlaşılmaz |
| EN sayılar | ✅ | "thirty-three" 0,49 sn, "four hundred seventy-eight" 1,19 sn |
| "Yakından bak" davet tonu, "vardır" vurgusu, "olmalı da" yumuşaklığı | ⚠️ | SSML yok. Ton müşterinin klonundan geliyor. Dinleyip gerekirse yalnızca o vuruş yeniden üretilmeli (`python3 araclar/el_parcalar.py ses/el B9b`) |

## 5. Yeniden üretmek

```bash
python3 araclar/el_parcalar.py ses/el                    # TR (Midiya Payp)
python3 araclar/el_parcalar.py ses/el-en --lang en       # EN (B5 speed 1.1)
python3 araclar/ses_birlestir.py ses/el <tmp>/voice-raw.wav proje/assets/words.json ses/el/beats.json char
python3 araclar/ses_birlestir.py ses/el-en <tmp>/voice-en-raw.wav proje/assets/words-en.json ses/el-en/beats.json char ses/el/beats.json
# loudnorm iki geçiş -> proje/assets/voice.wav / voice-en.wav
python3 araclar/build.py --lang tr     # ya da --lang en
python3 araclar/srt.py onizleme
```
