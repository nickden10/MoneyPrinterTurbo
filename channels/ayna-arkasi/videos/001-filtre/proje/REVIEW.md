# REVIEW · 001 · v2 · "Bir selfie'nin 33 milisaniyesi" (TR + EN)

Durum: **iki dilde taslak önizleme hazır, teslim render'ı YAPILMADI** (müşteri onayı bekleniyor).

| Dosya | Ne |
|---|---|
| `../onizleme/001-taslak-v2-tr.mp4` | TR, draft, 1080×1920, 30 fps, **44,633 sn** (1339 kare), AAC 48 kHz stereo |
| `../onizleme/001-taslak-v2-en.mp4` | EN, aynı resim, EN ses + EN yazılar + EN altyazı, 44,633 sn |
| `../onizleme/001-ses-en.m4a` | YouTube çok dilli ses izi (EN miks), 44,633 sn, TR videoya hizalı |
| `../onizleme/001-tr.srt`, `../onizleme/001-en.srt` | Kelime saatlerinden altyazı |
| `../onizleme/kareler-v2.png` (TR), `kareler-v2-en.png` (EN) | 8 kare: 0 · 6,5 · 11,6 · 17,5 · 24,5 · 29 · 36 · 43,5 sn |

v1 (edge-tts sesi, eski düzen): `../onizleme/001-taslak.mp4`, `kareler.png`, üretici `../araclar/_v1/build-v1.py`.

## 1. Ne değişti

### Ses
- edge-tts taslağı çıktı. Yerine **müşterinin kendi ElevenLabs ses klonu** geldi ("deno tr", `eleven_multilingual_v2`, stability 0,5 / similarity 0,8 / style 0,2 / speed 1,0). Ayrıntı: `../SES-NOTLARI.md`.
- Doğal tempo korundu: konuşma 0,20–42,73 sn, video 37,5 → **44,63 sn**. Bütün kesmeler yeni kelime saatine bağlandı (`../araclar/build.py`, `assets/words.json`).
- İngilizce ses aynı klonla (`assets/voice-en.wav`, `assets/words-en.json`). Metin: `../SCRIPT-EN.md`.

### Görsel (müşteri: "alt %40 boş, kahraman küçük, slayt gibi")
1. **Tam kadraj:** Yüz artık çerçevenin %74'ü (genişlik 800 px). Gözler y 1000'de, yani gerçek dikey merkezde. Saç üst bandı dolduruyor, gömlek alt kenardan taşıyor. Boş bant kalmadı. S4–S6'da üstte toz pembe başlık bandı (0–560), altında kenardan kenara deri yakın planı (560–1920).
2. **Kahraman tipografi:** Fraunces 600 SOFT 100. Sayılar resmin kendisi: "33 ms", "30 kare", "478 nokta", "30 kez" 330 px. Başlıklar 150–190 px, üst satırlar 88 px. Sayılar `data.js`'ten geliyor (FPS, 1000/30, 478 = 468 + 10).
3. **Kare 0 = kapak:** koyu mürekkep zemin, toz pembe dev "33 ms", sıcak yüz. 0,5 sn'de okunuyor.
4. **Kesintisiz kamera** (motion-doctrine / cut-the-curve):
   - S1→S2: yanak noktasına itme. Çıkış ölçek 1→7 power3.in + 18 px bulanıklık, giriş 0,8→1 expo.out. İki taraf da büyüyor (Z işareti +).
   - S2→S3: aynı resim kararıyor. Başlık SOLA kelime kelime çıkıyor, sayaç sağdan giriyor (cut-the-curve LEFT).
   - S3→S4: ikinci itme (1→4), deri planı daha geniş viewBox'tan içeri itiyor (Z +).
   - S4→S5→S6: aynı zemin. Başlıklar SOLA kelime kelime (waterfall cut).
   - S6→S7: geri çekilme (pull). Pencere telefon ekranına dönüşüyor (varış).
   - B2'de sayı değişimleri: zoom-through. B9b kapanışı: ters zoom-through (varış/ödül).
   - Bitiş: telefon 3 evreli nudge eğrisiyle (10/65/25) geri ve aşağı çekiliyor, yazı logosu üstte açılıyor.
5. **Her 1–2 sn'de görünür değişim:** yüz takip çerçevesi (0,4), "otuz üç milisaniyeden"de yüzü tarayan çizgi, 30 kare hücresi, piksel kırılması ("pikseller"), 478 nokta + sayaç, yumuşatma penceresi, ızgara/oklar/esnetme, ışık, telefonun oluşması, geri sarma. Boşta salınım yok. Kapanıştan önceki 0,3 sn'lik ara korundu.
6. **Altyazı = katman** (captions-overlay): marka hapı, tek satır, y 1230–1330, x 60–940 (sağ ray boş). Artık B1'de de var (kapak başlığı konuşmanın birebir aynısı değil). B9b'de yok (başlık = konuşma).
7. **İki dil:** Ekrandaki bütün yazılar `build.py` içindeki `T` tablosundan geliyor, tek değişkenle seçiliyor: `python3 ../araclar/build.py --lang tr|en`. Altyazı öbekleri TR'de `GROUPS`, EN'de `GROUPS_EN`. Sahne kesmeleri ve video süresi iki dilde aynı (TR saati). Sahne içi açılışlar o dilin kelimelerine bağlı. EN bitişte "Look behind the mirror." sloganı var. Yazı logosu "Ayna Arkası" olduğu gibi kaldı. **Proje klasörü şu an TR durumunda.** EN'i Studio'da görmek için önce `--lang en` ile yeniden üretmek gerekiyor.

## 2. Ölçülenler

| Kontrol | TR | EN |
|---|---|---|
| `lint` | 0 hata · 3 uyarı (`timeline_track_too_dense`) | aynı |
| `check --json` | **ok: true** · kontrast 25/25 · craft temiz (line_unread, dead_stretch, text_below_floor, first_frame_empty yok) · motion/runtime/audio temiz | **ok: true** · kontrast 24/24 · craft temiz |
| Süre (ffprobe) | 44,633 sn = kök `data-duration` (44,633) | 44,633 sn |
| Miks | **−14,0 LUFS**, tepe −2,9 dBTP | **−14,0 LUFS**, tepe −2,3 dBTP |
| m4a | — | 44,633 sn, AAC 48 kHz stereo |
| Kelime senkronu | ElevenLabs karakter hizalaması. İç sessizliklere göre yaklaşık +20 ms kayma (hedef ±80 ms) | aynı yöntem |

**Bakılanlar:** kare 0, her sahnenin ortası, 7 kesmenin ikisi (9,9 dalış, 18,9 ikinci dalış), bitiş, iki dilde ve render'dan çözülmüş 8 kare. **Kimsenin kontrol etmediği:** ses **duyulmadı** (telaffuz, "Midiya Payp" arasındaki 0,1 sn'lik sessizlik, "bilateral" vurgusu, SFX'in kulağa nasıl geldiği). Seam-gate betiği (`motion-doctrine/scripts/seam-gate.mjs`) ve `ledger.json` **çalıştırılmadı**. Kesmeler gözle ve tasarımla eşlendi, sayısal hız eşleşmesi doğrulanmadı.

## 3. Bilerek tutulan uyarılar

- **`outside_safe_zone` (29 TR / 30 EN):** CLI'nin sıkı Shorts bandı (y 288–1248). Başlıklar y 176'dan, altyazı hapının altı 1330'da. Kanal kuralına (y 168–1330, x 60–940) ve vertical.md'ye uyuldu.
- **`container_overflow` (#s1f-content, uyarı):** SVG yüz çizimi çerçeveden büyük, kamera bu yüzden tam kadraj alabiliyor. Bilinçli.
- **`text_box_overflow` / `canvas_overflow` (info, 12,398 sn):** S2 başlığı kesmede sola doğru hareket hâlinde (cut-the-curve çıkışı). Kare kesmeden 1 kare önce.
- **`timeline_track_too_dense`:** altyazı tek host'ta (kural gereği), S4/S8 küçük.

## 4. Yaratıcı kararlar ve sapmalar

1. **Altyazı yüzün üstünde:** Hap burun ucu / üst dudak hizasında (y 1230–1330). Gözler ve ağız açık kalıyor. Telefon sahnelerinde ekran yüzü aşağı alındı (gözler y 1342) ki hap gözleri kapatmasın.
2. **Kapak metni:** "Bir kare için / 33 ms". Konuşmanın tamamı artık altyazıda.
3. **B2 hesap satırı** "Hesap, ölçüm değil / 1000 ÷ 30 ≈ 33 ms" biçiminde (C-1 korunuyor).
4. **Esnetme alt başlığı** TR "(warp)", EN "(points shift)".
5. **Kaynak etiketleri** her bilim adımında görünüyor (MediaPipe, Tomasi & Manduchi, Schaefer vd. + US 10152778). Ten rengi `#8A5A3E` hiçbir karede değişmiyor (ışık ayrı katman). Yargılayan dil yok.
6. **Müzik yok** (önceki karar sürüyor). 4 SFX yeni saate kaydı.

## 5. En zayıf an ve zaman olsa ne değişirdi

- **S3 kaynak satırı** ("Kaynak: Google MediaPipe Face Landmarker", 32 px) nokta bulutunun üst kenarına değiyor. Okunuyor ama kalabalık. Altına yarı saydam mürekkep bir şerit konabilir.
- **Bitiş kartı:** telefon küçülünce ortada boşluk kalıyor (y 820–960). Kart sade ama alt yarı yine telefonla dolu.
- **EN B9b** TR'den 0,67 sn geç başlıyor. Kapanış başlığı EN'de de "Real" kelimesinde geliyor, sorun yok. Ama EN'de B8 ile B9a arasındaki nefes kısa.
- Seam-gate ile sayısal hız eşleşmesi doğrulanmalı.

## 6. Müşterinin karar vermesi gerekenler

1. **Dinleme:** "Midiya Payp" mi, "MediaPipe" mi? (alternatif alım B4 için `ses/el-test/` altında hazır), "bilateral", kapanış tonu.
2. **Süre 44,6 sn** (doğal tempo). Kısaltmak istenirse speed 1,08 ile yaklaşık 41 sn olur.
3. **Güvenli alan:** kanal kuralı mı, CLI'nin daha sıkı Shorts bandı mı?
4. **EN sloganı** "Look behind the mirror." onaylanmalı. TR'de slogan yok, istenirse `T["tr"]["slogan"]`.
5. **Beyan:** açıklamaya "Seslendirme: kanal sahibinin AI ses klonu (izinli)" eklenmeli. Bu, ACIKLAMA.md'de güncellenmedi.
6. Onaydan sonra teslim render'ı iki kez (`build.py --lang tr` → `render --quality delivery -o ../teslim/001-tr.mp4`, sonra `--lang en`). Henüz çalıştırılmadı.
