# Ayna Arkası: Logo Konseptleri Değerlendirmesi

Değerlendirme: UI Finish-Gate Reviewer + Brand Guardian ölçütleri
Tarih: 2026-11-19
İncelenen: `A-monogram/`, `B-profile/`, `C-wordmark/` (tüm PNG'ler, SVG'ler, README'ler). Kaynak dosyalara dokunulmadı.

## Ürün merceği (eleştiriden önce)

- **Kullanıcı ve iş:** 18–34 yaş kadın izleyici, Shorts akışında baş parmağıyla kaydırıyor. Logo bu kişiye 0,5 saniyede "bu kanalı tanıyorum" dedirtmeli ve kanala sadece "güzellik kanalı" değil, *güzelliğin arkasındaki mekanizmayı anlatan akıllı bir editoryal ses* dedirtmeli.
- **İlk okunan nesne:** 48 px'lik yuvarlak avatar (yorumlar, akış, abonelikler). Lockup ve bitiş kartı ikincil.
- **Yasak varsayılanlar:** kuaför/spa kliparti (kadın profili + at kuyruğu, el aynası), "AI parıltısı" ✦ gibi jenerik semboller, rötuşu/filtreyi yücelten parlak efektler, tek bir beden/yüz idealini temsil eden figürler.
- **Ölçüm yöntemi:** Her `avatar-800.png` Playwright/Chromium ile `border-radius:50%` daire içinde 48 px ve 24 px olarak, hem beyaz (#FFFFFF) hem YouTube koyu modu (#0F0F0F) zemininde, 1x ve 2x DPR'de render edilip incelendi. Kontrastlar WCAG formülüyle hesaplandı.

## Puan tablosu (1–10)

| Ölçüt | A · Monogram "Arka Yüz" | B · Profil & Yansıma | C · Aynalı Yazı |
|---|:-:|:-:|:-:|
| Akılda kalıcılık | 7 | 5 | **8** |
| Konsept–kanal uyumu | 7 | 6 | **9** |
| Küçük boyut okunurluğu (48 px avatar) | 6 | 4 | **9** |
| İşçilik (boşluk, glif çakışması, kontur tutarlılığı) | 6 | 5 | **7** |
| Özgünlük / marka tescil riski (düşük risk = yüksek puan) | 6 | 3 | **7** |
| Kapsayıcılık / beden algısı güvenliği | **9** | 6 | **9** |
| Çok yönlülük (koyu/açık, Shorts bitiş kartı) | 6 | 5 | **8** |
| **TOPLAM (70 üzerinden)** | **47** | **34** | **57** |

**Karar: C kazanır.** Kapı durumu: **HOLD.** Aşağıdaki zorunlu düzeltmeler yapılınca PASS.

---

## Konsept A: Monogram "Arka Yüz" (47/70)

**Tutan kararlar**
- Ortadan ikiye bölünmüş ayna, "cam/arka yüz" fikrini tek bir görsel hamlede anlatıyor. Didone "A" editoryal ve premium.
- "Ayna" düz, "Arkası" italik + vurgu rengi: ikiliği tipografi de taşıyor. Fraunces'ın sıcak italiği markanın "sıcak, yargısız" tonuna uyuyor.
- Figür yok, beden yok: kapsayıcılık açısından risksiz.

**Kusurlar (konumlu)**
1. **Avatar, kendi kuralını çiğniyor.** README "96 px altında altın parıltı ve ince çizgi kapalı" diyor, ama `avatar-800.png`'de ikisi de açık (parıltı ≈ x250–290, y210–315; ince çizgi sağ yarıda halka boyunca). YouTube tek bir dosyayı küçültür, bu yüzden 48 px'te parıltı sarı bir lekeye, halka da gri bir gürültüye dönüşüyor (48 px render'da görüldü).
2. **Sap daire dışına taşıyor.** Avatarda sap y≈665'ten aşağı kenara kadar iniyor ve daire maskesiyle kesiliyor. 48 px'te "lolipop/raket" gibi okunuyor, ayna boyutu ise küçülüyor (oval ≈ çapın %60'ı).
3. **"A"nın tepesi kırık görünüyor.** Eksen (x=400) apeksten geçip kalın gövdeyi boyuna ikiye kesiyor. Sol tarafta pembe bir "bayrak" (apeks, ≈x330–400, y255–300), sağda plum gövde var. Büyükte zekice duruyor, 48 px'te A'nın sağ bacağı inceliyor ve harf asimetrik bir kamaya dönüşüyor.
4. **Bitiş kartında çakışma:** `endcard-1080x1920.png`'de arka plandaki hale dairesinin alt kenarı "Arkası" kelimesinin içinden geçiyor (≈y940–975).
5. **Bitiş kartı metni yanlış:** CTA "Takip et" yazıyor. YouTube Türkçe arayüzünde karşılığı "Abone ol". Ayrıca kesikli "Sıradaki video / Bunu da izle" kutuları, Shorts'ta olmayan bitiş ekranı öğelerini ima ediyor. Alttaki açıklama satırı (y≈1780) de Shorts'un kanal adı/açıklama katmanının altında kalıyor.
6. **Tek renk sürümü yok:** fikir iki rengin yer değiştirmesine dayandığı için filigran/tek renk baskıda konsept kayboluyor.
7. **Konumlandırma riski:** "El aynası + harf" sembolü kuaför/kozmetik markası kodu taşıyor. Kanalı eleştirel bir medya markası yerine bir güzellik salonu gibi gösterebilir.
8. Koyu modda plum avatar zemini (#1C1424) ile YouTube zemini (#0F0F0F) arasındaki kontrast 1,07:1. Daire kayboluyor, ayna havada kalıyor. Kabul edilebilir ama bilinçli bir karar olmalı.

---

## Konsept B: Profil & Yansıma (34/70)

**Tutan kararlar**
- Ön yüz dolu, yansıma tek çizgi: "rötuşlu imaj ve yalın gerçek" ayrımı fikir olarak güçlü. README'deki kapsayıcılık niyeti (göz, makyaj, ten rengi yok) doğru.
- Yazı logosu A ile aynı sistemde ve iyi.

**Kusurlar (konumlu)**
1. **48 px'te okunmuyor.** 48 px render'da figür koyu bir leke, at kuyruğu kulak/kapüşon gibi görünüyor. Yansıma çizgisi ≈1 px'e iniyor ve kayboluyor. 24 px'te tamamen anlamsız. Avatar en önemli temas noktası olduğu için bu tek başına eleyici bir kusur.
2. **Jenerik ve tescil riski yüksek.** Rubin vazosu (yüz-yüz) kamu malı ve çok kullanılan bir motif. "At kuyruklu kadın profili" de kuaför/spa/estetik klinik logolarının en yaygın klişesi. Ayırt edicilik zayıf, benzer tescilli şekil markalarıyla karışma riski yüksek.
3. **Yanlış okuma riski:** burunlar temas ediyor (avatar ≈x425, y440). Küçük boyutta "öpüşen iki yüz" okuması baskın hale geliyor. Boyun ve omuz geçişleri (≈x390–480, y530–700) **şişe** silüeti gibi okunuyor, pembe ara boşluk da parfüm şişesine benziyor.
4. **Beden algısı riski:** "rötuşsuz gerçek ben" olarak sunulan yansıma çizgisi dudak ve çenede tümsekli, düzensiz (≈x440–520, y450–560), ön yüz ise pürüzsüz. Mesaj farkında olmadan "gerçek hâlin pürüzlü, rötuşlu hâlin düzgün" diye okunabilir; bu, kanalın yargısız tonunun tersi. Ayrıca uzun saç + at kuyruğu + ince boyun tek bir kadınlık kodunu öne çıkarıyor.
5. **İşçilik:** oval kenarında, plum figürün plum zeminle buluştuğu yerde ince açık renkli bir **dikiş/sızıntı çizgisi** var (avatar ≈x300–390, y640–690; lockup'larda da görünüyor). At kuyruğu ucu sivri kesik (≈x185, y478). Yansıma çizgisinin kalınlığı boyunca değişiyor ve tepedeki kıvrım (≈x520, y265) bir kanca gibi bitiyor.
6. **Eksik teslim:** README bitiş kartından bahsediyor ama klasörde `endcard-1080x1920.png` yok; kart yalnızca `sheet.png` içinde bir küçük görsel olarak var.
7. Koyu modda plum zemin YouTube #0F0F0F ile birleşiyor (1,07:1). Pembe at kuyruğu ve oval yüzüyor, başın arka kenarı tanımsız kalıyor.

---

## Konsept C: Aynalı Yazı (57/70)

**Tutan kararlar**
- **İsim logoyu taşıyor:** "Ayna" çizginin üstünde, "Arkası" altında ters yansıma olarak duruyor. Logo, kanalın adını anlatmak yerine canlandırıyor. Üç konsept içinde isimle en güçlü bağ bu.
- **Avatar (A + ters A)**, 48 px'te üç konsept içinde açık ara en net olanı. Elmas/kum saati siluetini 24 px'te bile koruyor. Pembe daire beyaz ve koyu modda kendi kenarını çiziyor (pembe/#0F0F0F 10,6:1).
- DM Serif Display'in yüksek kontrastı + toz pembe/plum, "premium editoryal dergi" tonunu en net veren kombinasyon. Figür olmadığı için beden algısı açısından nötr.
- Tek renge en kolay inen sistem bu: yansıma ton veya opaklıkla ayrılabiliyor.

**Kusurlar (konumlu)**
1. **Glif hatası: serif çentiği.** Sol ayak serifinin iç ucunda küçük bir basamak var (avatar ≈x315, y362–368; yansımada simetriği ≈x315, y430–436). Hata `mark-avatar.svg` kaynağında da var: SVG büyütülerek render edildiğinde görülüyor. Path birleştirme/kesme hatası, büyük boyutlarda (bitiş kartı, banner) fark ediliyor.
2. **Kahraman kullanımda kanal adı okunmuyor.** Dikey kilitte ve bitiş kartında "Arkası" baş aşağı (`endcard-1080x1920.png`, y≈850–1070). Adın yarısı, en önemli marka anında (Shorts sonu) okunamıyor. Okunur ad yalnızca en alttaki `@AYNAARKASI`'da var, o da Shorts arayüzünün kapladığı bölgede (y≈1810).
3. **Jenerik parıltı:** dört köşeli ✦ yıldız bugün "AI/sihir" ikonunun evrensel işareti. Bu hem ayırt ediciliği düşürüyor hem de filtre/rötuş eleştirisi yapan kanal için yanlış bir çağrışım. Avatarda #F7EFF3 parıltı, pembe üstünde 1,6:1 kontrastla 48 px'te görünmüyor. Yatay lockup'ta parıltı A'nın apeksine çok yakın (≈x370, y185; boşluk ≈10 px).
4. **"y" kuyruğu ayna çizgisine teğet** (bitiş kartı ≈x420, y770; dikey lockup'larda da). Teğet temas küçük boyutta bir "çakışma" gibi okunuyor. Ya açıkça kesişmeli ya da en az çizgi kalınlığı kadar boşluk bırakmalı.
5. **Avatar daire içinde sıkışık:** apeks y≈55, ters A'nın ucu y≈745. 800 px dairede kenara ≈55 px (48 px'te ≈3 px) kalıyor. 48 px render'da tepe ve dip daire kenarına neredeyse değiyor.
6. **Renk mantığı tutarsız:** koyu yatay lockup'ta "Ayna" pembe, "Arkası" mürekkep beyazı (vurgu "Ayna"da). A ve B'de vurgu "Arkası"ndaydı ve konsept gereği vurgu orada olmalı. Pembe sürümde ise iki kelime de plum. Kural yazılı değil.
7. **Bitiş kartı güvenli alanı:** altın çizgi neredeyse kenardan kenara uzanıyor (x≈55–1040) ve parıltı sağ kenara ≈40 px uzaklıkta, Shorts'un sağdaki aksiyon sütununa çok yakın. "Filtre değil, bilgi…" (y≈1540) ve `@AYNAARKASI` (y≈1810) alttaki başlık/kanal katmanının içinde. "Abone ol" tıklanabilir bir düğme gibi çizilmiş, ama Shorts'ta tıklanmaz.
8. Ters "Arkası" (x≈90–985), "Ayna"dan (x≈185–895) belirgin şekilde geniş ve ağır, bu yüzden kompozisyonun ağırlığı alta kayıyor.
9. Hem DM Serif Display hem Fraunces yaygın Google Fonts yüzleri. Yazı logosu tek başına tescilde zayıf kalır. Tescil, ayırt edici A/∀ işareti üzerinden kurulmalı.

---

## Tavsiye

**Kazanan: Konsept C.** Kullanım haritası şöyle olmalı:

- **Avatar:** C'nin A + ters A işareti (parıltısız).
- **Birincil lockup:** C'nin yatay kilidi (okunur ad + işaret).
- **Dikey ters-yazı kilidi:** yalnızca dekoratif/ikincil kullanım (intro animasyonu, banner). Okunur ad ve el her zaman yanında yer almalı.
- A'dan alınacak tek şey: **"Arkası" vurgu renginde** kuralı (yazı rengi mantığı için).

B elenir: 48 px'te okunmuyor ve tescil/klişe riski yüksek.

### Kesinleşmeden önce yapılması zorunlu düzeltmeler (PASS koşulları)

1. **Serif çentiğini düzelt.** `mark.svg`, `mark-avatar.svg` ve lockup'lardaki A'nın sol ayak serifindeki basamağı (ve yansımadaki simetriğini) temiz tek bir path'e çevir.
   *Doğrulama:* SVG'yi 3200 px'te render et, ayak serifinde kırık kalmasın.
2. **Bitiş kartında okunur ad.** Kartın kahramanı yatay lockup ya da okunur "Ayna Arkası" olsun. Ters yazı kullanılacaksa yanında okunur ad bulunsun. `@aynaarkasi` ve slogan, Shorts güvenli alanına taşınsın: alttan ≈%20 (y < 1500) ve sağdan ≈140 px içeride.
   *Doğrulama:* Kartın üstüne Shorts arayüz katmanı bindirilmiş bir maket.
3. **Parıltıyı değiştir.** Jenerik ✦ yerine markaya özgü bir ışıltı kullan (ör. A konseptindeki gibi iki kısa çapraz cam yansıması veya A/∀ elmasından türeyen küçük bir eşkenar dörtgen). A ile arasında en az bir kontur kalınlığı boşluk bırak.
   *Doğrulama:* 1:1 lockup'ta apeks ile parıltı arası ≥ ana kontur kalınlığı.
4. **Avatarı parıltısız ve nefes alan hâle getir.** A/∀ dikey yüksekliğini daire çapının ≈%75'ine indir (kenarda ≥ %12 boşluk). 48 px için ayrı, parıltısız bir dosya üret, çünkü YouTube tek dosyayı küçültür.
   *Doğrulama:* 48 px ve 24 px daire render'ı, beyaz ve #0F0F0F zeminde.
5. **"y" kuyruğu ile ayna çizgisi ilişkisini netleştir.** Ya kuyruk çizgiyi bilinçli olarak kessin ya da en az çizgi kalınlığı kadar boşluk kalsın; teğet olmasın.
6. **Renk kuralını yaz ve uygula.** Vurgu her zaman "Arkası"nda olsun (koyu: "Ayna" mürekkep, "Arkası" toz pembe; pembe zemin: "Ayna" plum, "Arkası" berry #8E3B5A, kontrast 3,99:1, yalnızca büyük yazıda). Bu kuralı README'ye ekle.
7. **Eksik sürümleri üret.** Tek renk (plum ve beyaz) işaret, Shorts köşe filigranı (≈64–96 px), favicon 16/32 px.
8. **Tescil ön araştırması.** TÜRKPATENT ve EUIPO'da "Ayna Arkası" kelime markası ve A/∀ şekil markası için 38 ve 41. sınıflarda ön araştırma yap. A'nın serif detayına küçük, özgün bir müdahale ekleyerek font glifinden ayrıştır.

**Opsiyonel iyileştirmeler:**
- Ters "Arkası"nı "Ayna" genişliğine yakınlaştıracak şekilde ölçekle veya harf aralığını ayarla.
- Bitiş kartındaki "Abone ol"u düğme yerine metin işaretine çevir (ör. "Abone ol ↓"), çünkü Shorts'ta tıklanmaz.
