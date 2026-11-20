# REVIEW · 001 · C · "Bir selfie'nin 33 milisaniyesi"

Durum: **taslak önizleme hazır, teslim render'ı YAPILMADI** (müşteri onayı bekleniyor).
Önizleme: `../onizleme/001-taslak.mp4` (draft kalite, 1080×1920, 30 fps, **37,50 sn**, 1125 kare, AAC 48 kHz) · 8 kare: `../onizleme/kareler.png`.

## 1. Ne yapıldı

- **Ses:** edge-tts taslak, `tr-TR-EmelNeural`, +12 %. Vuruş vuruş üretildi, plandaki nefes aralarıyla birleştirildi. Konuşma 0,20–35,90 sn. Ayrıntı: `../SES-NOTLARI.md`.
- **Kompozisyon:** `index.html` (kök, 37,5 sn) + 8 sahne (`compositions/s1…s8.html`) + altyazı izi (`compositions/altyazi.html`). Bütün kesmeler gerçek kelime saatine bağlı. Dosyalar `../araclar/build.py` ile `assets/words.json`'dan üretilir. Yeni ses gelince betik yeniden çalıştırılır. ⚠️ Studio'da elle yapılan değişiklikler betik yeniden çalışınca silinir.
- **Ortak çizim:** `assets/lib/ayna.js`. Storyboard C'nin `face.js` çizgi portresi parçalara ayrıldı (doku, gözler, çene, ışık, gölge, 478 nokta, esnetme ızgarası) ve yeni palete boyandı. Gömlek `#4D6A55`. Ten `#8A5A3E` hiçbir karede değişmez: ışık ayrı bir katman. `assets/lib/data.js`: FPS, 33 ms, 478 = 468 + 10 (SPEC §6). 478 üretilemezse sahne hata verir.
- **Sahneler (mutlak sn):** S1 telefon/kanca 0–7,90 · S2 piksel 7,90–12,03 · S3 478 nokta 12,03–14,75 · S4 yumuşatma 14,75–21,60 · S5 esnetme 21,60–26,00 · S6 ışık 26,00–28,40 · S7 geri çekilme 28,40–31,50 · S8 kapanış + bitiş kartı 31,50–37,50 (`data-beat="bitis"` 35,34'te).
- **Altyazı:** marka hapı (Be Vietnam Pro Bold 72 px, `rgba(44,58,49,.92)`, metin `#F8F4EC`, aktif kelime `#F2D3D1`). 28 öbek, 1–4 kelime, tek satır, y ≈ 1203–1320. B1 ve B9b'de altyazı yok (ekrandaki başlık sesin aynısı). "33 milisaniye", "478 nokta" ve "MediaPipe" bölünmedi.
- **SFX (4):** whoosh-cinematic (7,93'teki kesme), pop (13,61'de sayaç 478), whoosh-short (14,78'deki kesme), ters whoosh-short (29,43'te telefon oturur). Her birinin tepesi resimden 1 kare sonra. Müzik yok.

## 2. Ölçülenler

| Kontrol | Sonuç |
|---|---|
| `lint` | 0 hata · 3 uyarı (`timeline_track_too_dense`, aşağıda) |
| `check --json` | **ok: true** · 0 hata · kontrast 29/29 geçti · craft (line_unread, dead_stretch, text_below_floor, first_frame_empty, film_silent) **temiz** · ses denetimi temiz |
| Süre | ffprobe 37,500 sn = kök `data-duration` · 1125 kare |
| Ses (render edilmiş dosya) | **−14,0 LUFS** entegre · gerçek tepe **−2,9 dBTP** · kırpılma yok. İlk render −11,4 LUFS ölçüldü (mono ses stereo'ya açılıyor), tüm kazançlar 0,741 ile düşürüldü |
| 478 | DOM'da `#s3f-pts[data-count="478"]`, sayaç 13,58'de 478'e oturuyor ("nokta" kelimesi) |
| Kelime senkronu | Kelime sınırları ses dalgasıyla ±10 ms içinde (hedef ±80 ms) |

**Bakılan ama ölçülmeyenler:** her sahnenin başı ve ortası, 7 kesme şeridi, telefon genişliğinde (360 px) sayfa, render'dan çözülmüş 8 kare. **Kimsenin kontrol etmediği:** ses **duyulmadı** (telaffuz, "Midiya Payp", "bilateral" vurgusu, tempo, SFX seviyesinin kulağa nasıl geldiği). SFX'lerin konuşmaya göre seviyesi yalnızca RMS ile ölçüldü. pop, konuşmanın birkaç dB üstünde.

## 3. Bilerek tutulan uyarılar

- **`outside_safe_zone` (29 uyarı):** CLI'nin YouTube Shorts bandı y 288–1248 / x 48–888. Kanalın kuralı (SPEC §1.5, vertical.md) ise y 168–1330 / x 60–940. Başlıklar y 228'de, altyazı hapının altı 1320'de. Kanal kuralına uyuldu. TikTok/Reels uyarıları bu film için geçerli değil. **Müşteri kararı:** Shorts'un yeni arayüzüne göre daha sıkı bir alan istenirse başlık bandı yaklaşık 290'a, altyazı yaklaşık 1248'e çekilmeli. Bunun için kaynak satırları da yukarı taşınmalı.
- **`timeline_track_too_dense`** (altyazı 28, S4 4, S8 6 zamanlı öğe): Altyazının tek bir host'ta toplanması kuralın gereği (captions.md). S4/S8 küçük. Bölmek kurgu okunurluğu açısından bir şey kazandırmaz.
- **`container_overflow` (info):** dalış ve kırpım kutuları amaçlı.

## 4. Yaratıcı kararlar ve SPEC'ten sapmalar (SPEC/SENARYO değiştirilmedi)

1. **Hız +12 %** (SENARYO §4 en fazla +8 % diyor). +8 % ile konuşma 37,4 sn'de bitiyor. Ayrıntı SES-NOTLARI §1'de. Tempo 162 kelime/dk, 04-kurgu'daki aralığın içinde.
2. **Gerçek ses planın ~0,4–1,5 sn önünde.** Bütün kesmeler gerçek saate kaydı (ör. S1→S2 kesmesi 10,30 değil 7,90). Bitiş kartı 35,34'te başlıyor, son satır 2,0 sn tutuluyor.
3. **Altyazı:** SPEC §3'teki "dünyaya göre renk, hap yok" yerine brief'teki **final marka hapı** kullanıldı (brand.css, 04-kurgu §3 ile aynı). "Yakından bak: pikseller." 72 px'te 880 px'e sığmadığı için iki öbeğe bölündü (harf küçültülmedi). "Ardından noktalar kaydırılır," da ikiye bölündü.
4. **Piksel/nokta resmi (S2–S3):** Tam genişlikte, y 470–1090 arasında, yüzün tamamı görünüyor. Yüz kendisi genişliğin ~%36'sı. Resim adaçayı zeminiyle birlikte tüm genişliği doldurduğu için "boşlukta yüzen küçük öğe" kalıbına düşmüyor. Pikselleme bir SVG filtresi (10 birimlik hücre + 2 px mürekkep ızgara).
5. **S2 girişi:** Dalıştan sonra piksel resim 1,45×'ten 1×'e "oturuyor" (0,6 sn, expo.out). SPEC'te S2'de yalnızca opaklık vardı.
6. **S1 dalışı:** Kanca, hesap satırı ve şerit dalışla birlikte bulanıklaşıp çıkıyor (0,25 sn). SPEC "sert kesme" diyor, ama büyüyen telefonun üstünde yazı okunmuyordu.
7. **Esnetme (S5):** Izgara opaklığı %28 yerine %50 ve yüz konturuyla kırpılı (deri üstünde %28 görünmüyordu). Noktalar 3 px. Gözler ×1,22, çene −%6, iki göz merkezli radyal şişme. Oklar nötr mürekkep %45, ödül işareti yok.
8. **Işık (S6):** Kamera SPEC'teki 0,42 yerine ~0,28 ölçeğe çekiliyor ("yüzün tamamı" 660 px'lik kutuya ancak böyle sığıyor). Parlama blur'u 10 birim.
9. **S7:** Pembe pencere telefon ekranına dönüşüyor (clip-path + viewBox). Telefon gövdesi aşağıdan kayarak değil, ekran otururken çevresinde beliriyor (0,45 sn). Kayarak gelen gövde ayrı bir nesne gibi okunuyordu.
10. **"33 ms" durum yazısı 28 değil 30 px** (`text_below_floor` sınırı 28,08 px). Saç üstünde okunmadığı için adaçayı bir durum çubuğu bandına kondu.
11. **Bitiş kartı:** `brand/final/wordmark.svg` (dış hatlı, font gerektirmez), 520 px genişlikte, y 1110. "Kaynaklar açıklamada" 30 px, y 1256.
12. **Döngü:** S1 telefonu y 616'da, son kare telefonu y 420'de (SPEC'teki gibi). Döngü konumda birebir değil, yalnızca konu olarak kuruluyor.

## 5. En zayıf an ve zaman olsa ne değişirdi

- **S2'nin alt yarısı** (y 1090–1920 boş mürekkep, 4 sn): altyazı dışında hareket yok. Craft ölçümü `dead_stretch` vermedi, ama göz için durgun. İyileştirme: resmi y 420–1130'a büyütmek ya da piksel ızgaranın hücre hücre "çözülmesini" göstermek.
- **S6 parlama elipsleri:** Yumuşatılmış hâlde bile "makyaj lekesi" gibi okunabilir. Daha sıcak ve daha düşük opaklık (0,25) denenebilir. SPEC 0,35 diyor.
- Kaynak satırları 30 px. Telefonda okunuyor, ama küçük.

## 6. Müşterinin karar vermesi gerekenler

1. **Tempo:** +12 % kabul mü? Değilse +8 % ve yaklaşık 38,7 sn'lik video, ya da MediaPipe'sız yedek cümle.
2. **Telaffuz:** "Midiya Payp" ve "bilateral" dinlenmeli (ajan sesi duyamaz).
3. **Güvenli alan:** Kanal kuralı (168–1330) mı, CLI'nin daha sıkı Shorts bandı (288–1248) mı?
4. **Müzik:** Yok (SPEC'teki varsayım). İstenirse 70–90 BPM, konuşma altında 0,14.
5. **Yayın sesi:** Azure AI Speech hesabı ve koşul kaydı (O-1). edge-tts taslağı yayınlanamaz.
6. Onaydan sonra teslim render'ı: `render --quality delivery -o ../teslim/001.mp4` (henüz çalıştırılmadı).
