# SPEC · 001 · C · "Bir selfie'nin 33 milisaniyesi"

Biçim: HyperFrames `references/spec.md`. Her sıfat bir sayıya çevrildi. Metin ve zamanlar: `SENARYO.md`. Onaylı görsel yön: `storyboards/C/`. Proje: `proje/`.
Ses saattir: aşağıdaki kare numaraları plan değerleridir. TTS'nin kelime zaman damgaları gelince her kesme, bağlı olduğu kelimeye (⟂ ile gösterildi) kaydırılır.

```text
GOAL:    İzleyici, bir filtrenin yüzü tek bir karenin içinde dört adımda (nokta → yumuşatma → esnetme → ışık)
         hesapladığını görür ve şu cümleyle ayrılır: "Gerçek ciltte doku vardır, olmalı da."
OUTPUT:  HyperFrames, 1080 x 1920, 30 fps, H.264 High CRF 18, yuv420p, Rec.709, AAC 48 kHz 192 kbps
TIME:    37,5 sn x 30 fps = 1125 kare (0–1124). Müzik yok, BPM yok. Ses saati: TTS (tr-TR-EmelNeural, Azure)
```

---

## 1. LOOK

### 1.1 Renk token'ları (palet 05 · Toz Pembe & Adaçayı, kesinleşmek üzere)

`brand.css` henüz eski değerlerde. Proje, aşağıdaki token'ları `proje/` içinde tanımlar. Marka dosyası güncellenince oradan alır.

| Token | Hex | Bu filmde ne taşır |
|---|---|---|
| `--toz-pembe` | `#F2D3D1` | Yumuşatma/esnetme/ışık dünyasının zemini · koyu zeminde 478 nokta · taşıyıcı nokta |
| `--keten` | `#F8F4EC` | Ana zemin (telefon dünyası, kapanış) · koyu zeminde birincil metin |
| `--adacayi` | `#BCC5B0` | Telefon ekranının arka planı · 30 kare şeridi · koyu zeminde pasif altyazı |
| `--murekkep` | `#2C3A31` | Bütün metin (açık zeminde) · telefon gövdesi · piksel/nokta dünyasının zemini |
| `--koyu-adacayi` | `#4D6A55` | **Tek vurgu.** Bir shot'ta en fazla bir öbek: "33 milisaniyeden", aktif altyazı kelimesi, "Filtresiz", kapanışta "doku" |

Portre renkleri (illüstrasyon, token değil, **kilitli**): deri `#8A5A3E` · çizgi `#2B1A16` · saç `#22161B` · üst dudak `#6B3832` · alt dudak `#7A443C` · göz beyazı `#F3E6DE` · çil/doku `#5A3523`/`#4A2C20` · gömlek `#4D6A55` (storyboard'daki `#3A2A44` değişir).

**Ölçülen kontrastlar (WCAG):** mürekkep/keten 10,90 · mürekkep/toz pembe 8,55 · mürekkep/adaçayı 6,69 · keten/mürekkep 10,90 · toz pembe/mürekkep 8,55 · adaçayı/mürekkep 6,69 · koyu adaçayı/keten 5,46 · koyu adaçayı/toz pembe **4,28** (metinde kullanılmaz, yalnızca ≥3:1 gereken çizgi/alt çizgi) · koyu adaçayı/adaçayı **3,35** (metinde kullanılmaz) · deri/toz pembe 4,16 · yüz çizgisi/toz pembe 11,90.

### 1.2 Dünyalar (sonsuz zoom'un zemin kademesi)

| Dünya | Zemin | Shot | Neden |
|---|---|---|---|
| Telefon | `--keten` düz, doku yok | S1, S7–S9 | Ev sahnesi, döngü buraya döner |
| Piksel → nokta | `--murekkep` düz | S2–S3 | "Makinenin baktığı yer": bir kademe koyu. Kahraman (yüz) çerçeve genişliğinin ≥ %60'ını doldurur, boşlukta yüzen küçük öğe yok |
| Deri yakını | `--toz-pembe` düz | S4–S6 | Ciltle aynı sıcaklıkta, açık |

Degrade yok, gren yok, vinyet yok, gölge yalnızca telefonun altında: `0 24px 48px rgba(44,58,49,.18)`.

### 1.3 Tipografi

| Rol | Yazı tipi | Ölçü |
|---|---|---|
| Kanca ve shot başlıkları | **Fraunces** (OFL), `font-variation-settings: "SOFT" 100, "WONK" 0, "opsz" 72`, ağırlık 600 | 72 px / satır 1,12 / izleme −0,5 % · sol hizalı x 60 · en geniş satır 880 px. Satır sığmazsa satır yeniden bölünür, **64 px altına inilmez** |
| 478 sayacı | Fraunces 600, SOFT 100, `opsz` 144, `font-variant-numeric: tabular-nums` | 168 px / 1,0 / −1 % |
| Yazı logosu (bitiş) | Fraunces 600, SOFT 100, `opsz` 144 | 104 px / −1 % · ortalı |
| Altyazı | Be Vietnam Pro Bold | 72 px / 1,15 · ortalı · kontur yok |
| Hesap satırı, alt başlık | Be Vietnam Pro Medium | 34 px / 1,3 |
| Kaynak etiketi | Be Vietnam Pro Medium | 30 px / 1,3 |
| Sahne etiketi ("← doku silindi", "Filtresiz") | Be Vietnam Pro Bold | 32 px |
| Telefon durum çubuğu "33 ms" | Be Vietnam Pro Bold | 28 px (telefon ekranının UI metni) |

Fraunces italik **kullanılmaz**. Vurgu yalnızca renkle (`--koyu-adacayi`) yapılır, büyük harf ya da italikle yapılmaz.

### 1.4 Malzeme

Düz baskı illüstrasyon: kâğıt (düz zemin) + mürekkep (tek çizgi rengi `#2B1A16`, 4 px @ 1080 ölçeğinde) + düz dolgu. Hareket bu malzemeden gelir: başlıklar **basılır** (soldan sağa maske silmesi), solmaz. Noktalar **damgalanır** (ölçek 0→1), kamera ise görüntünün içine **dalar**.

### 1.5 Güvenli alan ve ızgara

- Bütün yazılar **y 168–1330**, **x 60–940** aralığında. **x 940–1080 (sağ 140 px ray)** içinde yazı yok.
- y 0–168: yalnızca zemin. y 1330–1920: yalnızca dekor (30 kare şeridi, y 1440–1524).
- Dikey ritim: başlık bandı y 228–560 · kahraman y 420–1130 (shot'a göre) · kaynak satırı y 1090–1140 · altyazı bandı **y 1150–1320** (alttan hizalı) · dekor şeridi y 1440–1524.

---

## 2. OBJECTS

- **Telefon:** gövde `--murekkep`, 316 × 520 px, köşe yarıçapı 56 px, çerçeve kalınlığı 14 px. Ekran köşe yarıçapı 42 px, ekran zemini `--adacayi`. Üstte ortada 14 px ön kamera deliği (`#0F1511`), sağ kenarda 6 × 72 px güç tuşu. Altta deklanşör halkası: 56 px, 5 px `--keten` kontur. Durum çubuğunda sağ üstte "33 ms" yazısı (UI metni, rozet değil). Etiket olmadan telefon olarak okunur.
- **Portre (selfie):** `storyboards/C/src/face.js` (yalnızca gömlek rengi değişir). Orta-koyu ten, kıvırcık saç, çil + gözenek + ince tüy dokusu, yetişkin. Gerçek kişi değil, AI görüntüsü değil (G-02).
- **Taşıyıcı nokta:** 22 px `--toz-pembe` dolgu + 4 px halka (açık zeminde `--murekkep`, koyu zeminde `--keten`). Bütün katmanlarda aynı yerde durur: sol yanak, yüz koordinatı (150, 284). Her dalış bu noktanın içine yapılır.
- **Piksel portre:** Portre 40 × 48 hücreye indirilip `imageSmoothing=false` ile büyütülür. Hücreler arasında 2 px `--murekkep` ızgara çizgisi var.
- **478 nokta:** `--toz-pembe`, yarıçap 4 px. Konumları storyboard f2 algoritmasıyla (kontur 36, kaşlar 20, gözler 32 + kapaklar 16, iris 10, burun 28, dudaklar 44, kalanı yüz içi dolgu) üretilir. **Sayı tam 478 olmalı** (QA).
- **Yumuşatma penceresi:** 168 × 168 px kare, 4 px `--murekkep` kesik çizgi (14/10), köşe yarıçapı 12 px. İçi boş. Fırça gibi çizilmez (C-4, G-05).
- **Esnetme ızgarası:** 8 birim aralıklı çizgiler, `--murekkep` %28, 2 px. Sol göz merkezli (159, 229) radyal şişme: R = 46, K = 0,28 (storyboard f3 fonksiyonu).
- **Oklar:** `--murekkep` %45, 3 px, ok başı 12 px. "+", yıldız ya da parıltı yok.
- **Işık katmanı:** 4 elips (alın 120×50, iki elmacık 90×40, burun sırtı 20×70, yüz koordinatı), `--keten` dolgu, opaklık 0→0,35, `feGaussianBlur stdDeviation 6` (yüz birimi). Yalnızca yüz klibinin içinde. Gölge katmanı (burun altı, boyun) `#5A3523` opaklık 0,30→0,08. **Deri dolgusu `#8A5A3E` hiçbir karede değişmez.**
- **30 kare şeridi:** 30 hücre, x 60–940, aralık 6 px, yükseklik 84 px, 2 px `--murekkep` %40 kontur, köşe yarıçapı 6 px. Dolu hücre `--adacayi`. Dekordur, metin içermez.

---

## 3. MOTION

| Rol | Eğri | Süre |
|---|---|---|
| Başlık girişi (basma) | `clip-path: inset(0 100% 0 0)` → `inset(0 0 0 0)`, `power2.out` | 10 kare |
| Başlık çıkışı | sert kesme (shot değişiminde) | 0 |
| Altyazı öbeği girişi | ölçek 0,92→1 + opaklık 0→1, `power2.out` (04-kurgu) | 4 kare |
| Altyazı öbeği çıkışı | opaklık →0 `power2.in` 4 kare + `visibility:hidden` sert kapanış (captions.md) | 4 kare |
| Aktif kelime | renk anında değişir (aşağıdaki tablo) | 0 |
| Kamera itişi (S1 yavaş) | `sine.inOut`, ölçek 1,00→1,12 | 285 kare |
| Dalış (içeri) | `power3.in`, ölçek ×1→×9 (S2) / ×1→×4 (S4), taşıyıcı nokta merkezli | 24 / 18 kare |
| Geri çekilme (dışarı) | `power3.out` | 20–30 kare |
| Damga (nokta, sayaç hücresi) | ölçek 0→1, `back.out(1.4)`. Yay yalnızca konum/ölçekte, opaklıkta değil | 4 kare |
| Esnetme | `power2.inOut` | 18–20 kare |
| Zemin geçişi | dalışın sonunda sert kesme. Parlaklık değişimi saniyede en fazla 1 (O-9) | 0 |

Kural: shot başına **tek kahraman hareketi**. İkincil hareketler kahramanın %50–70'i kadar yol alır ve 3–6 kare sonra başlar. Okunan metin hareket etmez: başlıklar ve kaynak satırları kamera katmanının **dışında** sabit bir katmandadır.

### Altyazı renkleri (dünyaya göre)

| Dünya | Pasif kelime | Aktif kelime |
|---|---|---|
| keten | `--murekkep` (10,90) | `--koyu-adacayi` (5,46) |
| mürekkep | `--adacayi` (6,69) | `--toz-pembe` (8,55) |
| toz pembe | `--murekkep` (8,55) | `--murekkep` + 8 px `--koyu-adacayi` alt çizgi, kelime genişliğinde, taban çizgisinin 10 px altında (çizgi kontrastı 4,28 ≥ 3) |

Hap/şerit arka plan yok. Düz zeminde kontrast yeterli. Öbek boyutu: `fitTextFontSize(text, {fontFamily:"Be Vietnam Pro", fontWeight:700, maxWidth:880})`, taban 72 px, en az 56 px. Taşarsa öbek bölünür, harf küçültülmez.
**Kanca (B1) ve kanal cümlesi (B9b) için altyazı yok:** İkisi de ekranda, seslendirmenin birebir aynısı olarak büyük başlıkla duruyor.

---

## 4. SHOTS

Kare aralığı · kahraman hareketi · izleyicinin okuduğu (pencere) · ses · bir sonrakine geçiş.

| Shot | Kare | Kahraman hareketi | Okunan (pencere) | Ses | Geçiş |
|---|---|---|---|---|---|
| **S1 Telefon / kanca** · keten | 0–308 | Kamera telefona doğru 1,00→1,12 yavaşça iter (0–285, `sine.inOut`). Kare 0'da hareket başlamıştır. İkincil: 60–72 arasında taşıyıcı noktanın çevresine 44 px nişangâh karesi çizilir (2 px `--murekkep`). 150–210 arasında 30 kare şeridi damgalanır (2 kare aralıkla) | Telefon x 382–698, y 616–1136. **Kare 0'dan:** başlık 4 satır y 228–551, "33 milisaniyeden" `--koyu-adacayi` (0–284). ⟂"Saniyede" 148: hesap satırı y 566–610 basılır (148–284). Durum çubuğunda "33 ms" (0–284). Altyazı 148'den | Konuşma B1, B2 | 285–308 dalış: taşıyıcı nokta merkezli ×9, `power3.in`. Kare 309'da sert kesme |
| **S2 Piksel** · mürekkep | 309–399 | Piksel portre tam genişlikte (1080 px, y 360–1150 kırpılmış). 380–400 arasında opaklık 1→0,35 | ⟂"Yakından" 312: "Her selfie / piksellerden oluşur" basılır (312–399) | **SFX 1** `whoosh-cinematic` | Kesme yok: noktalar aynı karenin üstüne gelir |
| **S3 478 nokta** · mürekkep | 400–477 | 478 nokta, kontur → kaşlar → gözler → iris → burun → dudaklar → dolgu sırasıyla damgalanır (400–446, ≈10,4 nokta/kare). Sayaç 0→478 aynı eğriyle sayar. ⟂"sekiz"/"nokta" **446**'da oturur | Başlık "478 nokta" 168/72 px (400–477) · alt başlık "468 yüz + 10 iris noktası" (412–477) · kaynak `Kaynak: Google MediaPipe Face Landmarker` y 1096 (400–477, 2,6 sn) | **SFX 2** `pop` 446 | 478–495 dalış ×4, `power3.in`. Kare 496'da sert kesme |
| **S4 Yumuşatma** · toz pembe | 496–650 | Deri yakını (yüz viewBox `80 194 176 114`), tam genişlik, y 420–1080. Yumuşatma penceresi soldan sağa doğrusal geçer: x 60→940, kare 520–640. Pencerenin solunda doku opaklığı 0, sağında 1. **Göz kenar çizgisi pencere geçerken keskin kalır** ("kenarlar kalır") | ⟂"Sonra" 490: "Yumuşatma / bilateral filtre" (490–650) · ⟂"doku" 585: sahne altı etiketleri y 1040 "← doku silindi" (x 60) ve "doku duruyor →" (sağ kenar x 940) · kaynak `Kaynak: Tomasi & Manduchi 1998` y 1096 (496–650) | **SFX 3** `whoosh-short` | Sert kesme yok. Kamera 651'de geri çekilmeye başlar |
| **S5 Esnetme** · toz pembe | 651–789 | 651–675 geri çekilme: ölçek 1→0,6 (göz, yanak ve çene görünür). ⟂"noktalar" 681–696: 478 noktanın yüz üstündekiler `--murekkep` 3 px olarak yeniden belirir. 690–710 ızgara çizilir. ⟂"büyür" 740–758: göz ölçeği 1,00→1,22, ızgara şişer. ⟂"daralır" 756–776: çene konturu içe %6. Oklar 740'ta | "Esnetme (warp)" (655–789) · kaynak `Kaynak: Schaefer vd. 2006 · US 10152778` (655–789) | — | Geri çekilme devam eder |
| **S6 Işık** · toz pembe | 790–862 | 790–810 ölçek 0,6→0,42 (yüzün tamamı). ⟂"ışık" 800–818: parlama elipsleri 0→0,35. ⟂"gölgeler" 825–843: gölge 0,30→0,08. Deri rengi sabit | "Işık eklenir" (800–862) · kaynak `Kaynak: US 10152778` (800–862) | — | 863'te geri çekilme telefona |
| **S7 Geri çekilme** · keten | 863–961 | 863–893 yüz küçülür ve telefon ekranına oturur, telefon gövdesi çerçevenin dışından gelir (`power3.out`, 30 kare). Ekrandaki yüz **filtreli** hâlde: doku yok, göz ×1,22, çene −%6, parlama açık. ⟂"otuz kez" 893–922: 30 hücre birer kare arayla dolar (birikerek, yanıp sönmez) | "Saniyede 30 kez" (875–1024) · telefon y 420–940 | **SFX 4** `whoosh-short` ters, tepe 893'te | Kesme yok |
| **S8 Geri sarma / kapanış** · keten | 962–1065 | ⟂"hesaplanmış" 987: telefon altına "Hesaplanmış" etiketi (y 960, `--murekkep`). Geri sarma 1020–1044 (her adım 8 kare, `power2.inOut`): ışık kapanır (1020–1028), şekil geri gelir (1028–1036), doku geri gelir (1036–1044). ⟂"doku" 1045: etiket "Filtresiz" olur (`--koyu-adacayi`) | ⟂"Gerçek" 1025: başlık "Gerçek ciltte doku / vardır, olmalı da." basılır, "doku" `--koyu-adacayi` (1025–1124) | — | — |
| **S9 Bitiş** · keten | 1066–1124 | "Ayna Arkası" yazı logosu y 1110–1230 soldan sağa maske silmesiyle gelir (1066–1084). Logo köşeye yapışmaz, bir kez görünür | "Kaynaklar açıklamada" y 1258, 30 px (1090–1124, altyazılar 1088'de kapandıktan sonra) | — | Son kare (keten + telefon) ilk kareye (keten + telefon) bağlanır. Döngü bilinçli bir seçim |

"Ölü kare" kontrolü: her 1,5–3 sn'de bir yeni olay var. En uzun aralık S1'deki 72–148 (2,5 sn). Bu aralık boyunca kamera itişi sürüyor.

---

## 5. SES

| # | Dosya | Bağlı olduğu olay | Yerleşim (dosya başlangıcı) | Kazanç | Not |
|---|---|---|---|---|---|
| 1 | `whoosh-cinematic.mp3` (5,54 sn, RMS tepe 2,90 sn) | S1→S2 kesmesi, kare 309 (10,30 sn) | tepe kesmeden 1 kare sonra → başlangıç **7,43 sn** (duyulur başlangıç ≈ 9,28 sn) | −12 dB | 10,6 sn'den itibaren 0,6 sn'de söner |
| 2 | `pop.mp3` (0,72 sn, tepe 0,10 sn) | Sayaç 478, kare 446 (14,87 sn) | **14,80 sn** | −10 dB | |
| 3 | `whoosh-short.mp3` (0,57 sn, tepe 0,15 sn) | S3→S4 kesmesi, kare 496 (16,53 sn) | **16,42 sn** | −8 dB | |
| 4 | `whoosh-short.mp3` + `areverse` (tepe 0,42 sn) | Telefon oturuyor, kare 893 (29,77 sn) | **29,38 sn** | −12 dB | Seslendirmenin altında kalır |

- Hepsi tek efekt şeridinde. Pixabay Content License (`media-use/audio/assets/sfx/CREDITS.md`).
- **Müzik yok** (STORYLINES ortak varsayımı). `sound.md` §1 bu uzunlukta bir müzik yatağı öneriyor. Eklenirse YouTube Ses Kütüphanesi'nden 70–90 BPM sakin bir parça seçilir, konuşma altında 0,14 ses düzeyinde kalır, lisans kaydı tutulur. Bu karar müşteriye bırakıldı.
- Seslendirme: `tr-TR-EmelNeural`, Azure AI Speech, hedef 6,1 hece/sn. Kelime zamanları TTS'nin kelime sınırı olaylarından alınır (yoksa `npx hyperframes transcribe --model small --language tr`). Kayma ±80 ms'yi geçmez.
- Miks: −14 LUFS entegre, tepe ≤ −1 dBTP. Efektler konuşmanın 3–6 dB altında. Ölçüm: `npx hyperframes audio <video> --json`.

---

## 6. VERİ

Ekrandaki her sayı tek bir modülden gelir (`proje/data.js`): `FPS = 30`, `FRAME_MS = 1000 / 30` (ekranda "≈ 33"), `LANDMARKS = 478`, `FACE = 468`, `IRIS = 10`. 478 nokta dizisinin uzunluğu `LANDMARKS`'a eşit olmazsa build hata verir.

---

## 7. BANNED

**Varsayılan yasaklar (spec.md):**
- Siyah ya da lacivert boşlukta yüzen küçük öğeler. Mürekkep dünyası (S2–S3) koyu ama kahraman genişliğin ≥ %60'ını doldurur.
- Glow, bloom, neon, lens parlaması, parlayan küre ve halkalar, dekor parçacıklar. *Tek istisna:* S6'daki parlama elipsleri. Bunlar filtrenin yaptığı şeyin kendisi, dekor değil. Yalnızca yüz klibinin içinde ve en fazla 0,35 opaklıkta kullanılır.
- Mor/mavi degradeler, mesh degrade, cam kartlar (eski mürdüm/erik zemin bu yüzden kalktı).
- Krem kâğıt + serif başlık **kalıbının** parçaları: italik vurgu kelimesi, "01 / 02" ya da "1. / 2." numaralı etiketler, küçük monospace büyük harf etiketler, hap şeklinde çipler ve düğmeler. (Keten + Fraunces markanın kendi malzemesi olduğu için kalır. Kalıbın geri kalanı yasak.)
- Her şeyin ortalanması (başlıklar sol hizalı x 60). Her şeyin aynı anda belirmesi. Her öğenin solarak yukarı kayması.
- Okunurken hareket eden metin. Yerine oturduktan sonra kaymaya devam eden başlık.
- Köşe etiketleri, çerçeve kenarlıkları, köşe parantezleri, dekor amaçlı HUD göstergeleri.
- Yan yana üç kart, KPI ızgarası, karartılmış ekran görüntüsünün üstünde başlık.
- Köşeye yapışık logo.

**Bu filme özel:**
- Storyboard'daki **breadcrumb** ("telefon › piksel › …"): 28 px'lik altı küçük etiket, beşinci metin katmanı ve HUD kalıbı oluşturuyor. Pasif hâlinde de ≥ 4,5:1 kontrastı tutmuyor. Derinliği taşıyıcı nokta ve zemin kademesi anlatıyor.
- Storyboard'daki **"33 ms" ve "Filtresiz" hap rozetleri**: yerine telefonun UI metni ve düz bir etiket geldi.
- S4'teki **kenarlıklı sahne kutusu** (4 px çerçeve): yerine tam genişlikte kırpım geldi.
- Deri renginin herhangi bir karede değişmesi, teni açma, "beyazlatma" (G-03).
- Esnetme anında `sparkle`, artı, yıldız, yeşil tik ya da başka bir "ödül" işareti (A-4). `chime`/`ding` (sound.md §4).
- Uygulama adı, logosu ya da uygulama arayüzüne benzeyen filtre düğmeleri (O-4, K-14). Makyaj fırçası çizimi (C-4).
- Gerçek fotoğraf, AI ile üretilmiş gerçekçi yüz, bölünmüş ekranda önce/sonra paneli (G-02).
- Dönme, sayfa çevirme, glitch, flaş geçişleri (04-kurgu). Saniyede 3'ten fazla parlaklık değişimi (O-9).
- Ekranda ya da seste "kusur", "kırışıklık", "düzelt", "mükemmel", "sahte".
- Ekranda ya da sabit yorumda izleyiciden selfie isteme (O-6). Sesli "abone ol" çağrısı.
- Yeni varsayılan ekleme kuralı: İlk render'dan sonra kullanılan her varsayılan adıyla bu listeye eklenir ve düzeltilir.

---

## 8. QA

| Kare | Görmesi gereken |
|---|---|
| **0** | Kapak: keten zemin, 4 satırlık kanca tamamen okunur, "33 milisaniyeden" koyu adaçayı, telefonda portre ve "33 ms". Altyazı yok, siyah değil, logo değil |
| 160 | Hesap satırı "Hesap: 1000 ÷ 30 ≈ 33 ms (ölçüm değil)" tamamen okunur ve y ≤ 610. Altyazı "Saniyede 30 kare," |
| 330 | Piksel portre tam genişlikte, taşıyıcı nokta görünüyor, "Her selfie / piksellerden oluşur" |
| 446 | Sayaç **478**, DOM'da tam 478 nokta (`data-count`), MediaPipe kaynak etiketi okunur |
| 600 | Pencere ortada: solunda doku yok, sağında var. Göz çizgisi pencerenin altında keskin. Kaynak etiketi Tomasi & Manduchi |
| 760 | Göz ×1,22, ızgara şişmiş, oklar `--murekkep` %45, ödül işareti yok |
| 845 | Parlama açık. **Yanakta parlama dışındaki bir pikselde (yüz koordinatı 120, 330) deri tam `#8A5A3E`** |
| 922 | 30 hücrenin hepsi dolu, telefon y 420–940 |
| 1050 | "Filtresiz" koyu adaçayı, doku geri gelmiş, kapanış cümlesi 2 satır |
| 1124 | "Ayna Arkası" ve "Kaynaklar açıklamada" okunur. Altyazı yok |
| Hepsi | `npm run check` temiz. Hiçbir yazı kutusu y < 168, y > 1330 ya da x > 940 değil. Altyazı ile kaynak satırı çakışmıyor. Kontrast ≥ 4,5 (metin), ≥ 3 (çizgi). Türkçe karakterler (ı İ ş ğ ç ö ü) Fraunces'ta doğru. Ses −14 LUFS / ≤ −1 dBTP, 4 efekt tepesi resmin 1 kare sonrasında |

---

## 9. Onaylı storyboard'dan sapmalar (müşteri onayı ister)

| Storyboard C | Bu SPEC | Gerekçe |
|---|---|---|
| Erik/mürdüm zemin, `#E8B4B8` pembe, mint, Charm | Palet 05 (keten / mürekkep / toz pembe), Fraunces SOFT 100 | Marka yenileniyor (v3-renkler 05). Spec'teki koyu boşluk ve mor tonlar yasağı |
| 3 adım (nokta, yumuşatma, esnetme) | + ışık adımı (S6) | Brief gereği. Ten rengi kilitli (G-03) |
| Breadcrumb, hap rozetler, kenarlıklı sahne | Kaldırıldı | §7 BANNED |
| Altyazı 6 px siyah kontur / koyu hap | Kontursuz, dünyaya göre renk | Açık zemin. 04-kurgu'daki Kanal B satırı güncellenmeli |
| Ses: 3 × whoosh + chime | whoosh-cinematic, pop, whoosh-short, ters whoosh-short | sound.md §4 (chime yok, aynı whoosh tekrarlanmaz). `whoosh` = `whoosh-short` aynı dosya |
| ~34 sn | 37,5 sn | Işık adımı ve tam kanal cümlesi |
