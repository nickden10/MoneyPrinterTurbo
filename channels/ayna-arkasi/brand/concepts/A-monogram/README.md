# Konsept A — Monogram "Arka Yüz"

## Fikir
Art Deco esintili bir el aynası, dikey eksende ikiye bölünmüş. Sol yarı **cam** (plum zemin, toz pembe "A" = yansıma), sağ yarı **aynanın arkası** (toz pembe zemin, plum "A"). Aynı harf iki tarafta ters renkte duruyor: kanal da tam bunu yapıyor, aynanın gördüğün yüzünü ve arkasındaki makineyi aynı anda gösteriyor.
"A", hem **A**yna hem **A**rkası. Kontrastlı, kıvrık destekli serifleri olan bir Didone harfi; elle çizildi, font değil.
Camdaki küçük altın parıltı filtre ve rötuşa gönderme yapıyor, büyük boyutlarda kullanılıyor. Toz pembe hem çerçevede hem arka yüzde baskın renk.
Yazı logosunda "Ayna" düz, "Arkası" italik ve vurgu renginde: tek bakışta okunan editoryal bir ikilik.

## Dosyalar
- `mark.svg` (koyu zemin), `mark-light.svg` (açık veya toz pembe zemin, plum konturlu)
- `lockup-horizontal.svg` / `-light.svg`, `lockup-stacked.svg` / `-light.svg` (pembe zeminde de kullanılır; slogan plum)
- `avatar-800.png`, `lockup-dark-2000x600.png`, `lockup-light-2000x600.png`, `endcard-1080x1920.png`, `sheet.png`
- `src/`: üretim betikleri (`mark.js` işaret geometrisi, `outline.py` yazıyı path'e çevirir, `build.js` tüm çıktıları üretir; mutlak yollar oturuma özel, gerekirse düzenle)

## Font ve lisans
- Yazı logosu: **Fraunces SemiBold 600 + SemiBold Italic** (Undercase Type, SIL OFL 1.1). Türkçe glifler (ı İ ş Ş ğ Ğ ç Ç ö Ö ü Ü) fontTools ile doğrulandı. Tüm SVG'lerde yazı **path'e çevrildi**, font gerekmez. Metin olarak kullanmak için `fonts/fraunces.css` + woff2 dosyaları (latin + latin-ext alt kümeleri; @fontsource kaynaklı). Lisans: `fonts/OFL-Fraunces.txt`.
- Slogan: **Be Vietnam Pro Medium** (OFL, mevcut `brand/fonts/`), büyük harf, %20 harf aralığı, path olarak gömülü.

## Yap
- Koyu zeminde `mark.svg`, açık veya toz pembe zeminde `mark-light.svg` kullan.
- 96 px ve altında altın parıltıyı ve arka yüzdeki ince çizgiyi kapat (avatar `detail:false, glint:false`).
- Pembe zeminde metin her zaman plum olsun. Açık zeminde vurgu berry.
- İşaretin çevresinde en az bir "A" yüksekliği kadar boşluk bırak.

## Yapma
- Toz pembe üstüne beyaz metin kullanma (1.8:1).
- Ekseni kaydırma, "A"yı döndürme, renkleri iki tarafta aynı yapma (fikir ölür).
- Gölge, gradyan, metalik veya parlak efekt ekleme; işareti esnetme.
- Sapı tek başına ikon olarak kullanma; işaret her zaman bütün halde kalsın.
