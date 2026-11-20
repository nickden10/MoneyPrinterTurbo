# 001 · Senaryo · C · "Bir selfie'nin 33 milisaniyesi"

**Kanal:** Ayna Arkası (Kanal B) · **Biçim:** YouTube Short, 1080×1920, 30 fps · **Dil:** Türkçe, "sen" hitabı
**Hedef süre:** video **37,5 sn** (1125 kare) · konuşma 0,2–36,2 sn · bitiş kartı 35,5–37,5 sn
**Kelime sayısı:** **89 kelime** (TTS'de okunduğu biçimle, sayılar yazıyla) · ekrandaki yazılı biçimle 83 kelime
**Süre tahmini:** 89 kelime ÷ 150–165 kelime/dk = **32,4–35,6 sn konuşma** + ~2,4 sn nefes araları → konuşma bitişi ≈ 35–36,2 sn. Plan 157 kelime/dk (≈ 6,1 hece/sn, 213 hece) üzerine kuruldu.
**Görsel yön:** `storyboards/C/` (onaylı) · Ayrıntılı kare planı: `SPEC.md` · Yayın metni: `ACIKLAMA.md`
**Yazım ekibi:** Content Creator (yazar) · Cultural Intelligence Strategist ve Legal Compliance Checker (öz-denetim, bölüm 5)

> K-10: Bu metin taslaktır. Yayından önce bir insan kaynakları açıp her cümleyi kendi gözüyle doğrular, gerekirse yeniden yazar ve onaylar.

---

## 1. Seslendirme metni (düz, tek parça)

> Canlı filtrenin bir kareyi bitirmek için 33 milisaniyeden az vakti var. Saniyede 30 kare, kare başına yaklaşık 33 milisaniye demek. Yakından bak: pikseller. Önce bir yüz modeli, örneğin MediaPipe, yüzün üstünde 478 nokta işaretler. Sonra bilateral gibi bir filtre cildi tarar: kenarlar kalır, doku silinir. Gözenekler, çiller, ince tüyler. Ardından noktalar kaydırılır, görüntü esner: gözler büyür, çene daralır. En son ışık eklenir, gölgeler yumuşar. Bunu saniyede 30 kez yapar, her karede yeniden. Filtredeki yüz, hesaplanmış bir yüz. Gerçek ciltte doku vardır, olmalı da.

---

## 2. Vuruşlar: zaman, yazılı metin ve TTS metni

Zamanlar planlanan hedeftir. Gerçek kelime zaman damgaları TTS çıktısından alınınca (`SPEC.md` → Ses) bütün kesmeler o saate kaydırılır: **ses saattir**.

| # | Zaman (sn) | Kare | Bölüm | Seslendirme (yazılı biçim) | `tts` (okunacak biçim) | Kelime (tts) |
|---|---|---|---|---|---|---|
| B1 | 0,2–4,6 | 6–139 | Kanca | Canlı filtrenin bir kareyi bitirmek için 33 milisaniyeden az vakti var. | Canlı filtrenin bir kareyi bitirmek için otuz üç milisaniyeden az vakti var. | 12 |
| B2 | 4,9–9,2 | 148–276 | Hesap | Saniyede 30 kare, kare başına yaklaşık 33 milisaniye demek. | Saniyede otuz kare, kare başına yaklaşık otuz üç milisaniye demek. | 10 |
| B3 | 9,5–10,6 | 285–319 | Dalış 1 | Yakından bak: pikseller. | Yakından bak: pikseller. | 3 |
| B4 | 10,8–15,9 | 325–478 | 478 nokta | Önce bir yüz modeli, örneğin MediaPipe, yüzün üstünde 478 nokta işaretler. | Önce bir yüz modeli, örneğin Midiya Payp, yüzün üstünde dört yüz yetmiş sekiz nokta işaretler. | 15 |
| B5 | 16,2–22,0 | 487–659 | Yumuşatma | Sonra bilateral gibi bir filtre cildi tarar: kenarlar kalır, doku silinir. Gözenekler, çiller, ince tüyler. | Sonra bilateral gibi bir filtre cildi tarar: kenarlar kalır, doku silinir. Gözenekler, çiller, ince tüyler. | 15 |
| B6 | 22,2–26,1 | 666–784 | Esnetme | Ardından noktalar kaydırılır, görüntü esner: gözler büyür, çene daralır. | Ardından noktalar kaydırılır, görüntü esner: gözler büyür, çene daralır. | 9 |
| B7 | 26,3–28,5 | 790–854 | Işık | En son ışık eklenir, gölgeler yumuşar. | En son ışık eklenir, gölgeler yumuşar. | 6 |
| B8 | 28,8–31,7 | 863–952 | Geri çekilme | Bunu saniyede 30 kez yapar, her karede yeniden. | Bunu saniyede otuz kez yapar, her karede yeniden. | 8 |
| B9a | 32,1–33,9 | 962–1016 | Ödül | Filtredeki yüz, hesaplanmış bir yüz. | Filtredeki yüz, hesaplanmış bir yüz. | 5 |
| B9b | 34,2–36,2 | 1025–1085 | Kanal cümlesi | Gerçek ciltte doku vardır, olmalı da. | Gerçek ciltte doku vardır, olmalı da. | 6 |
| Son | 35,5–37,5 | 1066–1124 | Bitiş kartı | (sessiz) | — | — |
| | | | | | **Toplam** | **89** |

Nefes araları: B1→B2 0,30 · B2→B3 0,30 · B3→B4 0,20 · B4→B5 0,30 · B5→B6 0,25 · B6→B7 0,20 · B7→B8 0,30 · B8→B9a 0,35 · B9a→B9b 0,30 sn.
Anahtar kelime saatleri (plan): "otuz üç" 2,5 · "Saniyede" 4,9 · "Yakından" 9,5 · "dört yüz yetmiş sekiz" 13,95–14,9 · "kenarlar" 18,7 · "doku" 19,5 · "büyür" 25,0 · "daralır" 25,65 · "ışık" 26,7 · "gölgeler" 27,5 · "otuz kez" 29,75 · "hesaplanmış" 32,9 · "doku" (kapanış) 34,83.

---

## 3. Vuruş vuruş ekran, altyazı, kaynak ve ses

Kurallar: ekran metni satırda **≤ 6 kelime** · altyazı öbeği **2–4 kelime**, satırda ≤ 18 karakter, en fazla 2 satır, rakamlar rakamla, "33 milisaniye" ve "478 nokta" bölünmez · bütün yazılar y 168–1330 ve x 60–940 içinde (sağdaki 140 px ray boş) · ses efekti toplam **4**.

| # | Ekran metni (satır satır) | Altyazı öbekleri (başlangıç sn) | Kaynak etiketi (ekranda) | Ses efekti |
|---|---|---|---|---|
| B1 | **Kare 0'dan itibaren:** "Canlı filtrenin" / "bir kareyi bitirmek için" / "33 milisaniyeden" / "az vakti var." · telefon ekranında durum çubuğu: "33 ms" | *Altyazı yok:* ekrandaki kanca cümlesi seslendirmenin birebir aynısı. Tekrar edilmez, kapak karesi temiz kalır. | — (B2'deki hesap satırı bu iddianın kaynağıdır) | — |
| B2 | Hesap satırı: "Hesap: 1000 ÷ 30 ≈ 33 ms (ölçüm değil)" | "Saniyede 30 kare," (4,9) · "kare başına yaklaşık" (6,2) · "33 milisaniye demek." (7,6) | Hesap satırının kendisi (aritmetik, kaynaklar.md #4) | — |
| B3 | "Her selfie" / "piksellerden oluşur" | "Yakından bak: pikseller." (9,5) | — | **SFX 1** `whoosh-cinematic`: dalışın kesmesi (kare 309) |
| B4 | "478 nokta" (sayaç 0→478) / "468 yüz + 10 iris noktası" | "Önce bir yüz modeli," (10,8) · "örneğin MediaPipe," (12,0) · "yüzün üstünde" (13,1) · "478 nokta işaretler." (14,0) | `Kaynak: Google MediaPipe Face Landmarker` | **SFX 2** `pop`: sayaç 478'e oturduğunda (kare 446) |
| B5 | "Yumuşatma" / "bilateral filtre" · sahne altı etiketler: "← doku silindi" · "doku duruyor →" | "Sonra bilateral" (16,2) · "gibi bir filtre" (17,2) · "cildi tarar:" (18,0) · "kenarlar kalır," (18,7) · "doku silinir." (19,5) · "Gözenekler, çiller," (20,3) · "ince tüyler." (21,3) | `Kaynak: Tomasi & Manduchi 1998` | **SFX 3** `whoosh-short`: ikinci dalışın kesmesi (kare 496) |
| B6 | "Esnetme (warp)" | "Ardından noktalar kaydırılır," (22,2) · "görüntü esner:" (23,9) · "gözler büyür," (24,7) · "çene daralır." (25,3) | `Kaynak: Schaefer vd. 2006 · US 10152778` | — (A-4: ödül sesi yok) |
| B7 | "Işık eklenir" | "En son ışık eklenir," (26,3) · "gölgeler yumuşar." (27,5) | `Kaynak: US 10152778` | — |
| B8 | "Saniyede 30 kez" | "Bunu saniyede" (28,8) · "30 kez yapar," (29,75) · "her karede yeniden." (30,6) | — (B2 hesabının tekrarı) | **SFX 4** `whoosh-short`, **ters çevrilmiş** (`areverse`): geri çekilme telefona oturduğunda (kare 893) |
| B9a | Telefonun altında etiket: "Hesaplanmış" | "Filtredeki yüz," (32,1) · "hesaplanmış bir yüz." (32,9) | — | — |
| B9b | "Gerçek ciltte doku" / "vardır, olmalı da." · telefon etiketi "Filtresiz" olur | *Altyazı yok:* ekrandaki kapanış cümlesi seslendirmenin birebir aynısı | — | — (doku sessizce geri gelir, vurguyu ses taşır) |
| Son | "Ayna Arkası" (yazı logosu) · "Kaynaklar açıklamada" | — | "Kaynaklar açıklamada" | — |

**Neden `chime` yok:** Storyboard sonda `chime` öneriyordu. HyperFrames `sound.md` §4 "chime/ding" tonlarını yasaklıyor ve kapanış cümlesinin üstüne gelen bir zil, "ödül" gibi okunuyor (A-4 ruhu). Dördüncü efekt sayının oturduğu ana (`pop`) taşındı. Müşteri isterse `pop` çıkarılır, `chime` geri konur. Toplam yine 4 olur.
**Not:** `whoosh.mp3` ile `whoosh-short.mp3` aynı dosyadır (md5 eşit). Aynı whoosh'un iki kez duyulmaması için ikincisi ters çevrildi. Lisans (Pixabay Content License) değişiklik yapmaya izin veriyor.

---

## 4. Telaffuz ve TTS notları

| Yazılı | `tts` | Not |
|---|---|---|
| 33 | otuz üç | "otuz üç milisaniyeden" tek nefeste söylenmeli |
| 30 | otuz | |
| 478 | dört yüz yetmiş sekiz | ⚠️ "**yüzde** 478" yazılmaz: Türkçede "yüzde" hem "yüzün içinde" hem "yüzde (%)" demek. Metin "yüzün üstünde" diye kuruldu |
| MediaPipe | Midiya Payp | Render öncesi dinlenir. Ses kötü çıkarsa yedek cümle: "Önce bir yüz modeli, yüzün üstünde dört yüz yetmiş sekiz nokta işaretler." (−2 kelime, MediaPipe yalnızca ekran etiketinde kalır) |
| bilateral | bilateral | Türkçede de yerleşik ("iki taraflı"). Vurgu "-ral" üzerinde değil, düz okunmalı |
| 1000 ÷ 30 ≈ 33 ms | (okunmaz) | Yalnızca ekranda |

**Ton:** sakin, meraklı, arkadaşça. "Yakından bak" emir değil davettir, hafif yükselen tonla okunur. "Gerçek ciltte doku **vardır**": vurgu "vardır" üzerinde. "olmalı da" yumuşak ve gülümseyen bir tonla söylenir (UYUM A-5).
**Ses:** `tr-TR-EmelNeural`, **resmî Azure AI Speech** üzerinden (edge-tts değil, UYUM O-1). Hız: hedef 6,1 hece/sn. Konuşma 36,2 sn'yi geçerse hız en fazla +%8'e çıkarılır. Son cümle hiçbir zaman kısaltılmaz.

---

## 5. Öz-denetim

**Gözden geçirenler:** Legal Compliance Checker (kurallar, mevzuat, lisans) · Cultural Intelligence Strategist (Türkçe ton, beden algısı, temsil).
⚖️ Genel bilgilendirmedir, hukuki danışmanlık yerine geçmez.

### 5.1 H bölümü: yayın öncesi kapı

| Madde | Durum | Not |
|---|---|---|
| K-01…K-08 kırmızı bölge taraması | ✅ | Siyaset, din, cinsiyet tartışması, gerçek kişi, trajedi yok. Yüz bir çizim, yetişkin. Uygulama adı yok. Google/MediaPipe yalnızca kaynak olarak, nötr anılıyor |
| Tüm rakamlar kaynaklar.md'de, ekranda kaynak etiketi var (K-09) | ✅ / ⚠️ | 33 ms → ekranda hesap satırı (#4). 478 ve "468 + 10 iris" → MediaPipe etiketi (#1). Yumuşatma → Tomasi & Manduchi (#2a). Esnetme → Schaefer + US 10152778 (#3a, #3c). Işık → US 10152778 (#3c). ⚠️ "468 + 10 iris" ayrımı UYUM §5'te yazıyor ama `kaynaklar.md` #1 satırında yok. İnsan, MediaPipe sayfasında bunu gördükten sonra `kaynaklar.md`'ye eklemeli (bu dosyayı ben değiştirmedim) |
| İnsan doğrulaması ve yeniden yazım, onaylayan: ____ (K-10, K-16) | ⚠️ | Açık. Kaynak 1, 2a, 3a, 3c bir insan tarafından açılıp okunmalı. Özellikle 3c'nin "ışık/aydınlatma" adımını desteklediği ve "gölgeler yumuşar" ifadesinin bunu doğru özetlediği kontrol edilmeli. İnsan katkısı (K-16): özgün anlatı yapısı (sonsuz zoom) + el ile kurulmuş grafik ✅ |
| Grafik dürüstlük listesi (K-11) | ✅ | Grafik/eksen yok. Sayaç gerçek 478 noktayı çiziyor (storyboard kodu 478'i sayıyor). "Filtresiz" etiketi "gerçek yüz" yerine kullanıldı (A-6) |
| Her görsel/ses varlığının lisansı kayıtlı (K-12, K-13, K-15) | ⚠️ | SFX: Pixabay Content License (`CREDITS.md`) ✅. Fontlar: Be Vietnam Pro OFL ✅, **Fraunces OFL, dosya henüz projede yok**: Google Fonts'tan indirilip lisans metniyle `brand/fonts/`'a konmalı. Müzik: kullanılmıyor ✅ |
| Sentetik içerik ve AI ses beyanı (K-17) | ⚠️ | Açıklamada beyan var (`ACIKLAMA.md`). Görseller açıkça çizim, YouTube kutusu **hayır** (UYUM O-2). ⚠️ TTS yolu: edge-tts değil, resmî Azure AI Speech kullanılmalı ve koşulları lisans kaydına girmeli (O-1) |
| Başlık ve kapak içerikle uyumlu (K-18) | ✅ | Kapak = kare 0: kanca cümlesi + telefon. "33 ms" ekranda hesap olarak işaretli. Başlık "Filtre bir yüzü nasıl hesaplar?" çizgisinde |
| Kitle ayarı: B = çocuklar için yapılmadı (K-08), ücretli tanıtım hayır (K-21) | ✅ | Yükleme sırasında işaretlenecek |
| Kanal B: G-01…G-08 | ✅ | G-01: doku öğeleri nötr sayılıyor ("kusur", "kırışıklık", "düzeltmek" yok) · G-02: önce/sonra yalnızca çizim, aynı çizgi kalitesinde · G-03: ten rengi kilitli (`#8A5A3E`, SPEC QA kare 845) · G-05: marka/ürün yok · G-06: yetişkin portre · G-07: kaygı dili yok · G-08: orta-koyu ten, kıvırcık saç, görünür çil ve gözenek |

### 5.2 Bu videoya özel liste (UYUM §6)

| Madde | Durum |
|---|---|
| Kanca "telefon" genellemesi yapmıyor, 478 yalnızca "bir yüz modeli, örneğin MediaPipe" | ✅ |
| Işık adımında ten rengi değişmiyor, yalnızca parlama ve yumuşayan gölge | ✅ (SPEC: deri dolgu rengi kilitli. Parlama ayrı bir katman) |
| Doku nötr sayılıyor: gözenek, çil, ince tüy | ✅ |
| Şekil adımı ödüllendirilmiyor: nötr ok, sparkle yok | ✅ |
| Ekranda kaynak etiketleri: MediaPipe / Tomasi & Manduchi / Schaefer vd. | ✅ |
| Portre: orta-koyu ten, görünür doku, yetişkin | ✅ (storyboard `face.js`) |
| AI ses: lisansı belgelenmiş yol + beyan | ⚠️ (yukarıda) |
| Uygulama adı/logosu yok | ✅ |
| İzleyiciden selfie istenmiyor (sabit yorum dahil) | ✅ |
| Başlık: "Filtre bir yüzü nasıl hesaplar?" | ✅ |
| Kaynak 1, 2a, 3a, 3c insan tarafından okundu | ⚠️ açık |
| C-1: 33 ms "hesap" olarak sunuluyor | ✅ ekranda "(ölçüm değil)" |
| C-2: kanalın cümlesi var | ✅ B9 |
| C-3: "Her kare, saniyede 30 kez" yüklemsiz cümlesi düzeltildi | ✅ "Bunu saniyede 30 kez yapar, her karede yeniden." |
| C-4: "çekirdek" jargonu yok, "makyaj fırçası" çizimi yok | ✅ |

### 5.3 Doğruluk notları (Legal Compliance Checker)

- **"33 milisaniyeden az":** 1000 ÷ 30 = 33,3 ms. Bu süre bir karenin tamamıdır. Kamera yakalama ve ekrana çizme de bu süreden pay alır, bu yüzden filtreye kalan süre bunun **altındadır**. "Az" kelimesi bu yüzden savunulabilir. Koşul (30 kare/sn) ekranda yazılı. 60 kare/sn'de süre 16,7 ms'dir. Yorumda bu sorulursa sabit yorum bunu söylüyor (`ACIKLAMA.md`).
- **"bilateral gibi bir filtre"** ve **"örneğin MediaPipe"**: Kaynaklar yöntemin kullanıldığını gösteriyor, her filtrenin bu yöntemi kullandığını göstermiyor. Bu yüzden ikisi de "örnek" kalıbıyla kuruldu (O-4: belirli bir uygulamaya iddia yüklenmiyor).
- **"gölgeler yumuşar"**: UYUM A-2'deki "gölgeler silinir" ifadesinden daha temkinli seçildi. Aydınlatma, gölge kontrastını azaltır, gölgeyi tümden silmez.
- **Patent anmak:** Bir patenti kaynak olarak göstermek, o tekniği kullanmak değildir. Herhangi bir hak riski görülmedi. "Google" ve "MediaPipe" adları yalnızca metin olarak geçiyor, logo yok (K-14).
- **KVKK:** İzleyiciden yüz görüntüsü istenmiyor. Sabit yorum çağrısı yalnızca "hangi adım?" sorusu (O-6).

### 5.4 Kültürel ton notları (Cultural Intelligence Strategist)

- **"Sen" hitabı yalnızca eylemde:** "Yakından bak" izleyiciyi meraka davet ediyor. Hiçbir cümle izleyicinin kendi yüzünü konu etmiyor ("senin yüzün", "yüzünde" yok). Böylece filtre adımları, izleyicinin yüzüne yapılmış bir düzeltme gibi okunmuyor (UYUM A-1, B-1).
- **Filtre kullananı suçlamıyor:** Metinde "kandırmak", "sahte", "gerçek değil" yok. Filtre kötü ilan edilmiyor, yalnızca ne yaptığı anlatılıyor. Kapanış bir hüküm değil, bir onay: "Gerçek ciltte doku vardır, olmalı da."
- **Doku dili:** "Gözenekler, çiller, ince tüyler" düz bir sayım olarak okunur, acıma ya da düzeltme tonu yok. Görselde de "silindi" bir başarı gibi gösterilmiyor (nötr renk, ödül sesi yok).
- **Ten ve temsil:** Orta-koyu tenli, kıvırcık saçlı, çilli bir yetişkin portre. Işık adımı teni açmıyor. Türkiye'de güçlü olan "açık ten" idealini yeniden üretmemek için bu bilinçli bir kural (G-03). Seride sonraki portreler dönüşümlü olmalı (O-7).
- **Dil tuzakları temizlendi:** "yüzde 478" (yüzde = %) belirsizliği çıkarıldı. "yüz modeli… yüzün üstünde… dört yüz…" üçlüsü kulakta ayrışıyor, ama TTS dinlemesinde kontrol edilmeli. "Her kare, saniyede 30 kez" yüklemsiz kalıbı düzeltildi.
- **Renk anlamı:** Yeni palette adaçayı yeşili "filtresiz/doğal" etiketini taşıyor, toz pembe ise hesaplama dünyasının noktalarını. Filtreli yüz daha "zengin" renkle çizilmiyor (B-2 dersi).

### 5.5 Açık riskler

1. **TTS lisansı (O-1):** Azure AI Speech hesabı ve koşul kaydı yoksa video yayınlanamaz.
2. **K-10 insan doğrulaması:** Kaynak 1, 2a, 3a, 3c açılıp okunmadı. "468 + 10 iris" ifadesi `kaynaklar.md`'ye eklenmeli.
3. **Fraunces fontu** projede yok, lisans dosyasıyla eklenmeli. Türkçe karakterler (ı İ ş ğ ç ö ü) Fraunces'ta render'da kontrol edilmeli.
4. **Marka token'ları kesinleşmedi:** `brand.css` hâlâ eski (mürdüm/#E8B4B8) değerlerde. SPEC yeni palete göre yazıldı. `04-kurgu-ve-altyazi.md` dosyasındaki Kanal B altyazı satırı (`#F7EFF3` + siyah kontur) yeni açık zemine uymuyor, güncellenmeli.
5. **Storyboard'dan sapmalar** (SPEC'te gerekçeli): yeni palet, breadcrumb ve hap rozetlerin kaldırılması, ışık adımının eklenmesi, `chime` yerine `pop`. Müşteri onayı gerekir.
6. **Süre payı:** TTS 165 kelime/dk'nın altında okursa video 38 sn'ye yaklaşır. Yedek: MediaPipe'ı sesten çıkar (−2 kelime, ≈ −0,8 sn).
