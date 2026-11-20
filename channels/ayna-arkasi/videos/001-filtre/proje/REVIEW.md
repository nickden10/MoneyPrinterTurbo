# REVIEW · 001 · v4 · "Bir selfie'nin 33 milisaniyesi" (TR + EN)

Durum: **iki dilde taslak önizleme hazır, teslim render'ı YAPILMADI** (müşteri onayı bekleniyor).

| Dosya | Ne |
|---|---|
| `../onizleme/001-taslak-v3-tr.mp4` | TR, draft, 1080×1920, 30 fps, **46,400 sn** (1392 kare), AAC 48 kHz stereo |
| `../onizleme/001-taslak-v3-en.mp4` | EN, aynı resim, EN ses + yazılar + altyazı, 46,400 sn |
| `../onizleme/001-ses-en.m4a` | YouTube çok dilli ses izi (EN miks), 46,400 sn, TR videoya hizalı (v3 için yeniden yapıldı) |
| `../onizleme/001-tr.srt`, `001-en.srt` | Kelime saatlerinden, v3 sesine göre |
| `../onizleme/kareler-v3.png` (TR), `kareler-v3-en.png` | 8 kare: 0 · 6,5 · 11,6 · 17,6 · 24,5 · 29 · 37 · 45 sn |

v2 dosyaları (`001-taslak-v2-*.mp4`, `kareler-v2*.png`) ve v1 (`001-taslak.mp4`) karşılaştırma için duruyor.

## v4 · Altyazı yüzden çıktı (müşteri: "altyazı yüzün ortasında")

- Önizleme: `../onizleme/001-taslak-v4-tr.mp4`, `001-taslak-v4-en.mp4` (ikisi de 46,400 sn, −14,0 LUFS / −2,5 dBTP) · `kareler-v4.png`, `kareler-v4-en.png` · `001-ses-en.m4a` v4 EN'den yeniden çıkarıldı (46,400 sn). Ses, karakter, zamanlama ve SRT v3 ile aynı.
- **Altyazı hapı artık çenenin altında, boyun/gömlek üstünde:** öbek kutusu y 1430–1600, hap ≈ y 1500–1600 (alt kenar ≤ 1600), x 60–940 içinde ortalı, sağdaki 140 px ray boş.
- Hapın gözlere, burna ve ağıza değmemesi için yüzler yukarı alındı:
  - S1–S3 portre 57 px yukarı (ağız biter y ≈ 1470).
  - S6 bütün yüz kadrajı (VB6 y −10 → 10, ağız ≈ 1475).
  - Telefon ekranı yüzü (VB_SCR y −90 → 2,2: gözler 1139, ağız ≈ 1480). v3'te hapın gözlere değmesi de böylece çözüldü.
  - Gömlek çizimi aşağı uzatıldı, kadraj altında boşluk kalmıyor.
  - S1 yüz-takip çerçevesi hapın üstünde bitecek şekilde kısaltıldı (y 640–1470).
- Sahne sahne bakıldı (TR + EN snapshot): S1 kanca/hesap, S2 piksel, S3 478 nokta, S4 yumuşatma, S5 esnetme, S6 ışık, S7/S8 telefon. Hepsinde hap ağzın altında, çene/boyun üzerinde. Hap S4/S5'te alt dudağa en çok yaklaşıyor (≈ 30 px boşluk).
- `check`: iki dilde ok: true. TR kontrast 29/29. EN 24/27, 3 bulgu "texture is wiped." öbeği. Bu öbek 23,186'da başlıyor, kontrol 23,2'de, hap girerken ölçüyor.
- `outside_safe_zone` uyarısı artık hap için de çıkıyor (y > 1330). Müşterinin istediği yerleşim bu, hap alt sınırı 1600 tutuldu.

## 0. v3 müşteri revizyonu (v2'nin üstüne)

1. **Daha doğal ses:** Metin dil başına tek istekle okundu (`eleven_multilingual_v2`, stability 0,38 · similarity 0,85 · style 0,35 · speaker boost · speed 1,0). Vuruş arasına 0,35 sn break etiketi kondu. "MediaPipe" normal yazıldı. TR'de 3 alım denendi (v2 araları yapışık, v3 yavaş ve hizalaması 0,3 sn kayık), C seçildi. EN tek alım. Ayrıntı: `../SES-NOTLARI.md` §2. Konuşma 44,3 sn → **video 46,40 sn** (≤ 55). Bütün sahne/altyazı saatleri `build.py` ile yeni kelime saatine kaydı.
2. **Karakter:** Sarışın (sıcak altın sarısı, omuza inen dalgalı saç, koyu sarı tel çizgileri), açık ten `#EDC6A6`, mavi-gri göz, açık kahve kaşlar (`assets/lib/ayna.js`, eski çizim `assets/_v2/ayna-v2.js`). Doku duruyor: çiller `#A9623D`, gözenekler, açık renk ince tüyler. Ten rengi her karede sabit, açma adımı yok. Işık ayrı katman (`#FFF6EC`). İdealleştirme ya da cinselleştirme yok: aynı çizgi üslubu, aynı yüz geometrisi, sade gömlek.
3. **Kontrast:** Koyu mürekkep dış çizgi (`#3A2418`) korunuyor. Açık ten toz pembe zeminde soluyordu, bu yüzden S4–S6 zemini **adaçayı** yapıldı (toz pembe artık sayılarda ve altyazının aktif kelimesinde). S1–S3'te açık renk büyük yazılar sarı saçın üstüne düştüğü için üst banda mürekkep bir geçiş perdesi (scrim, 0–660 px) eklendi. Telefon ekranı adaçayı, bitiş keten. Hepsi dış çizgiyle ayrışıyor.

**v3 ölçümleri:** `lint` 0 hata, 3 uyarı (yoğun iz). `check --json` iki dilde **ok: true**. Kontrast TR 29/29, EN 24/27: 3 uyarı EN altyazı öbeği "texture is wiped." (23,2 sn), tek örnek, hap giriş geçişinin ortası (opaklık animasyonu). Craft, motion, runtime ve audio temiz. ffprobe iki video 46,400 sn = kök `data-duration`. Miks TR −14,0 LUFS / −2,5 dBTP, EN −14,0 LUFS / −2,5 dBTP. Kare 0, sahne ortaları ve bitiş iki dilde görüldü.

**v3 açık notları:** S7/S8 telefonunda altyazı hapının alt kenarı gözlerin üst kenarına değiyor (P2: `VB_SCR` y −90 → −110 ile çözülür, render gerektirir). S1'de scrim alnın üst kısmını hafif koyulaştırıyor. Ses kulakla dinlenmedi (MediaPipe, bilateral).

---

(Aşağısı v2 notları, düzen ve iki dil yapısı aynen geçerli. Sayılar v2'ye ait.)

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
