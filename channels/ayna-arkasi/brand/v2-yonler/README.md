# Ayna Arkası — v2 Yazı Yönleri

Bu bir **yön seçme panosu**, final logo değil. Bir yön seçildikten sonra o yön detaylandırılacak (kilitler, slogan, kullanım kuralları).

- `yonler.png` — 6 yönün tek panosu (3000×2200)
- `01.png` … `06.png` — her yön ayrı (1600×1000)
- `src/` — `page.html` + `directions.js` (kaynak), `render.js` (Playwright ile çıktı)
- `fonts/` — yalnızca kullanılan fontlar (SIL OFL 1.1, lisans metinleri `OFL-*.txt`)

Yeniden üretmek için: `cd src && NODE_PATH=$(npm root -g) node render.js`

## Önceki turlar neden reddedildi

- **Süs ve hileler:** parıltı yıldızları, cam yansıma çizgileri, altın/mint gibi palet dışı renkler. Bunlar ucuz durur ve dikkati yazıdan uzaklaştırır.
- **Clip-art gibi duran semboller:** el aynası ikonu ve atkuyruklu profil hikâyeyi birebir çiziyor. Stok ikon gibi görünüyor ve 48 px'te okunmuyor.
- **Kalabalık panolar:** her sayfada 10–15 öğe vardı (mockup, palet, kurallar, bitiş kartı). Karar verilecek şey, yani logonun kendisi, bunların arasında kayboluyordu.
- **Tipografik özensizlik:** varsayılan aralıklar vardı, optik kerning ve dikey ortalama yoktu. Ters çevrilmiş "Arkası" okunmuyordu, ilk logodaki kaligrafik font ise amatör duruyordu.
- **Koyu zemine gömülmüş renkler:** her şey #1C1424 üstünde olduğu için toz pembenin gerçek tonu ve seçenekler arasındaki fark görülmüyordu.

## Yönler

| # | Ad | Font | His | Kime yakışır |
|---|---|---|---|---|
| 01 | Lüks minimal | Bodoni Moda | Mesafeli, moda evi sükûneti, geniş aralıklı büyük harf | Otoriter, "kurum gibi" konuşan, premium güzellik markası |
| 02 | Editoryal | Instrument Serif (düz + italik) | Dergi kapağı, zeki ve şık, "Arkası" italikle vurgulanıyor | Araştırmacı gazetecilik tonunda, hikâye anlatan kanal |
| 03 | Modern sans | Manrope | Net, çağdaş, sıkı aralıklı küçük harf | Bilim ve teknoloji odaklı, "beauty-tech" havasında, sosyal medyada yerli gibi duran marka |
| 04 | İmza | Allura | Kişisel, sıcak, bir kadının el yazısı | Sunucunun kişiliğine dayanan, samimi "abla" tonunda kanal |
| 05 | Monogram | Josefin Sans | Geometrik, sakin, "AA" tek çizgi gibi birleşiyor | Uzun ömürlü sistem isteyen marka. Avatarda en güçlü tanınırlık bu yönde |
| 06 | Yumuşak çağdaş | Fraunces (SOFT 100) | Dolgun, yuvarlatılmış serif, arkadaşça ama kaliteli | Geniş kitleye hitap eden, sıcak ama ciddiye alınan eğitici kanal |

Tüm yönlerde "Arkası" kelimesindeki noktasız **ı** doğru çiziliyor. Fontların Türkçe karakterleri (ı İ ş Ş ğ Ğ ç Ç ö Ö ü Ü) fontTools ile doğrulandı. Pembe zeminde her zaman plum yazı kullanılıyor, pembe üstünde beyaz yazı yok.
