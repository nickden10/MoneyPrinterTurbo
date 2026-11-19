# 001 · "Filtre yüzüne ne yapıyor?": uyum incelemesi

**İnceleme tarihi:** 2026-11-19
**Bakış açıları:** Hukuki uyum denetimi (YouTube politikası, Türk mevzuatı, kanal kuralları) + kültürel zekâ (Türkçe ton, beden algısı, temsil)
**İncelenen dosyalar:** `STORYLINES.md`, `kaynaklar.md`, `docs/youtube/01-degismez-kurallar.md`, `docs/youtube/02-gorsel-kimlik.md` (Kanal B)
**Not:** Bu inceleme genel bilgilendirme amaçlıdır, hukuki danışmanlık yerine geçmez (kurallar dosyasındaki ⚖️ notu geçerlidir). `STORYLINES.md` ve `kaynaklar.md` değiştirilmedi. Öneriler SPEC aşamasında uygulanmalıdır.

---

## Özet karar

| Hikâye | Karar | Tek cümle |
|---|---|---|
| **A · "478 nokta"** | ⚠️ **düzeltmeyle** | En güvenli ve en net seçenek. Kanca cümlesi düzeltilmeli, "ışık boyanır" adımı ten açma (G-03) gibi okunmamalı. |
| **B · "Ayna ikiye bölünür"** | ⚠️ **düzeltmeyle** | Kapanış cümlesi ("İkisi de sen değil mi? Biri sadece matematik.") hem çelişkili hem yargılayıcı. Renk ataması filtreli yüzü daha "çekici" gösteriyor. |
| **C · "33 milisaniye"** | ⚠️ **düzeltmeyle** (en riskli) | Kanca cümlesi "33 ms"yi ölçülmüş bir süre gibi sunuyor (K-09, K-18). Kanalın ana cümlesi ("Gerçek ciltte doku vardır") hikâyede yok. |

**Öneri:** A ile ilerlenmeli. Aşağıdaki 1, 2, 3, 5 ve 7 numaralı düzeltmeler uygulandıktan sonra yayın kapısına (H bölümü) hazır olur.

**Kırmızı bölge taraması (K-01…K-08):** Üç hikâye de temiz. Siyaset, din, toplumsal cinsiyet tartışması, gerçek kişi ya da çocuk hedefleme yok. Yüzler illüstrasyon (G-02 ✅).

---

## 1. Ortak bulgular (üç hikâye için geçerli)

**O-1 · AI seslendirme lisansı: edge-tts (K-12/K-13 ruhu, K-17)** ⚠️
- **Satır:** "Türkçe AI seslendirme (edge-tts `tr-TR-EmelNeural`, ücretsiz)"
- **Sorun:** `edge-tts`, Microsoft Edge'in "Sesli Oku" servisine resmî olmayan yoldan bağlanan bir kütüphanedir. Bu servisin ticari (para kazanan kanal) kullanım için açık bir lisansı yoktur. Kanal kuralları "lisansı belgelenmiş varlık" mantığıyla kurulduğu için bu nokta lisans kaydına bağlanamaz.
- **Öneri:** Aynı ses (`tr-TR-EmelNeural`) resmî **Azure AI Speech** üzerinden kullanılmalı (ücretsiz katmanı var, ticari kullanım koşulları yazılı) ya da lisansı açıkça ticari kullanıma izin veren bir yerel TTS modeli seçilmeli. Seçilen yolun koşulları lisans kaydına eklenmeli. AI ses kullanımı açıklamada belirtilmeli (K-17): "Seslendirme yapay zekâ ile üretilmiştir."

**O-2 · YouTube "altered or synthetic content" kutusu (K-17)** ✅ bilgi
- YouTube'un kendi açıklamasına göre açıkça gerçek dışı içerik (animasyon) ile renk/ışık ve güzellik filtreleri bu beyanı gerektirmez. Çizgi-portre ve şematik anlatım bu kapsamdadır. Gerçekçi bir insan sesini taklit eden ses yoksa kutu zorunlu değildir.
- **Ancak** K-17'nin "şüphede işaretle" ilkesi ve AI ses beyanı geçerlidir. Öneri: kutu işaretlenmesin (gerçekçi değil), açıklamaya AI ses beyanı yazılsın. İleride yarı-gerçekçi bir yüz çizimi kullanılırsa kutu işaretlensin.

**O-3 · Ekranda kaynak etiketi yok (K-09)** ⚠️
- Hiçbir hikâyede ekran kaynak etiketi planlanmamış. "478" rakamı ve teknik iddialar (yumuşatma, esnetme) ekranda kaynak ister.
- **Öneri:** 478 sahnesinde alt köşe, `--muted`, 32–36 px: `Kaynak: Google MediaPipe Face Landmarker`. Esnetme ve yumuşatma adımlarında: `Kaynak: Tomasi & Manduchi 1998` / `Kaynak: Schaefer vd. 2006`. Kapanışta "Kaynaklar açıklamada" yazısı.

**O-4 · Uygulama adı verilmemeli (K-14, TTK m.55 haksız rekabet riski)** ✅ şu an temiz, korunmalı
- Hikâyelerde Instagram, TikTok, Snapchat gibi uygulama adı geçmiyor, bu iyi. 478 nokta yalnızca MediaPipe modeli için doğrudur. Ticari uygulamaların hangi modeli kullandığı bilinmez. "Instagram yüzünde 478 nokta görüyor" türü bir cümle hem yanlış hem de bir şirketi kötüleme riski taşır. SPEC aşamasında da uygulama adı ve logosu kullanılmamalı.

**O-5 · Türk reklam ve kozmetik mevzuatı** ✅ uygulanmıyor, bilgi
- Video sponsorsuz, ürün ve marka içermiyor. Bu yüzden Ticari Reklam ve Haksız Ticari Uygulamalar Yönetmeliği, Reklam Kurulu'nun Sosyal Medya Etkileyicileri Kılavuzu (#reklam etiketi, **filtre kullanımının açıkça belirtilmesi** yükümlülüğü) ve Kozmetik Yönetmeliği iddia kuralları tetiklenmiyor.
- **Fırsat (isteğe bağlı):** Kılavuzun, reklamlarda filtre kullanan içerik üreticilerine "filtre kullandığını açıkça belirtme" yükümlülüğü getirdiği bilgisi, kanalın media literacy amacına çok uygun bir sonraki video konusudur ("Reklamda filtre kullanan neden söylemek zorunda?"). Bu videoya eklenmemeli (tek fikir kuralı).
- Not: 2026'da etkileyici reklam kurallarının bir kısmının yönetmelik metnine taşındığına dair ikincil kaynak var, doğrulanmadı. O video yapılırsa güncel resmî metin okunmalı.

**O-6 · KVKK: izleyiciden selfie istenmemeli (K-22)** ✅ şu an temiz, korunmalı
- Kapanışta "Sen de filtreli/filtresiz selfie'ni yorumla" türü bir çağrı eklenmemeli. Yüz görüntüsü biyometrik veriye dönüşebilir (KVKK m.6, özel nitelikli kişisel veri). Ayrıca G-01'e aykırı karşılaştırma ortamı yaratır. Etkileşim çağrısı gerekiyorsa: "Sence hangi adım en çok şaşırttı: noktalar mı, doku mu, şekil mi?"

**O-7 · Temsil ve çok seslilik (G-08, kültürel zekâ)** ⚠️
- Üç hikâye de **tek bir** çizgi-portreye dayanıyor. Tek portre kaçınılmaz, ama hangi yüz seçildiği mesaj taşır. Açık tenli, ince yüzlü, "standart" bir portre seçilirse filtrenin ideali zaten yüzün kendisinde olur ve adımlar görünmez kalır.
- **Öneri:** Orta-koyu ten tonu, belirgin cilt dokusu (çil, gözenek, ince tüy çizgileri), doğal kaş ve burun hatları olan bir portre seçilmeli. Seri boyunca portreler dönüşümlü olmalı: farklı ten tonları, gözlüklü, kıvırcık saçlı, başörtülü (başörtüsü konu edilmeden, yalnızca temsil olarak; K-02 tartışmasına girmeden), farklı yaş görünümleri (yalnızca yetişkin, G-06).
- "Filtre yüzü tek bir şablona doğru iter" fikri G-08'i doğrudan karşılar. Kısa bir cümleyle eklenebilir (bkz. A-4).

**O-8 · Başlık önerisi (K-18)** ⚠️ hafif
- Çalışma başlığı "Filtre yüzüne ne yapıyor?" içerikle uyumlu, clickbait değil. Ancak "yüzüne ne yapıyor" Türkçede konuşma dilinde "yüzüne ne zarar veriyor" gibi kaygı tonuyla da okunabilir (G-07 sınırı).
- **Öneri:** "Filtre bir yüzü nasıl hesaplar?" ya da "Filtre yüzü nasıl görür?" Daha meraklı, daha az kaygılı.

**O-9 · Işığa duyarlılık (iyi uygulama)** ✅ bilgi
- F-05 yalnızca Kanal A'ya bağlı, ama "nokta yağmuru", "sparkle" ve hızlı zoom'lar için de saniyede 3'ten fazla parlaklık değişimi olmamalı. YouTube'da uyarısız ışık çakması kötü deneyim sinyalidir.

---

## 2. Hikâye A · "478 nokta" ⚠️ düzeltmeyle

**A-1 · Kanca cümlesi olgusal olarak yanlış ve dilbilgisi olarak belirsiz (K-09, K-10)** 🔴 zorunlu
- **Satır:** `Ekranda: "Telefonun yüzünde 478 nokta görüyor."`
- **Sorun (olgu):** 478, Google'ın MediaPipe Face Landmarker modeline özgüdür (468 yüz + 10 iris noktası). "Telefon" genellemesi doğru değildir. Telefonlar ve uygulamalar farklı modeller kullanır (ör. akademik çalışmalarda 68 ve 106 nokta da yaygındır). `kaynaklar.md` notu da bunu söylüyor.
- **Sorun (dil):** "Telefonun yüzünde" ifadesi "telefonun (kendi) yüzünde" diye de okunabilir. Ayrıca "yüzünde" izleyicinin yüzünü işaret ediyor, bu da kancayı izleyicinin yüzüne bağlıyor (G-01 sınırı).
- **Öneri (ekran):** "Bir yüz modeli, bir yüzde **478** nokta görüyor."
- **Öneri (daha akıcı alternatif):** "Filtre önce yüzü **478** noktaya çevirir." + alt köşede `Kaynak: Google MediaPipe`. Seslendirme: "Google'ın açık kaynak yüz modeli, bir yüzde 478 nokta işaretliyor. Filtreler işe buradan başlar."
- Not: "Filtreler işe buradan başlar" genel bir yöntem cümlesidir (nokta tespiti → işlem). Belirli bir sayının her filtre için geçerli olduğu söylenmez.

**A-2 · "Işık boyanır (ten tonu kayar)" adımı cilt açma/beyazlatma gibi görünebilir (G-03, G-01, G-08)** 🔴 zorunlu
- **Satır:** `3. ışık boyanır (ten tonu kayar)`
- **Sorun:** Ticari güzellik filtrelerinde "face whitening / brightening" gerçekten bir adımdır (ör. Intel patenti US 10,152,778 bunu sayıyor). Ama portrenin teni açılırsa video, eleştirel bağlamda bile **cilt beyazlatma görselini** üretmiş olur. G-03 bunu açıkça yasaklıyor. Türkiye'de "beyaz ten" idealinin hâlâ güçlü olduğu düşünülünce, koyu tenli bir izleyici bu sahneyi "senin tenin düzeltiliyor" diye okuyabilir.
- **Öneri:** Adımı **ten rengini değiştirmeyen** bir ışık efektine çevir: yanaklara ve alına sıcak bir parlama ("glow") ve gölgelerin silinmesi. Ten tonunun kendisi (renk) sabit kalsın. Ekran etiketi: "3. Işık eklenir" (yerine "ten tonu kayar" yazılmasın). Seslendirme: "Sonra ışık eklenir: gölgeler silinir, yüze yapay bir parlaklık gelir."
- Alternatif: Bu adım tamamen çıkarılıp video iki adıma (doku + şekil) indirilebilir. 30–40 sn için daha rahat bir tempo da sağlar.

**A-3 · "Ten çizgileri" belirsiz, dokunun ne olduğu söylenmeli (dil, G-01)** ⚠️
- **Satır:** `1. doku silinir (ten çizgileri yumuşayıp kaybolur)`
- **Sorun:** "Ten çizgileri" Türkçede yerleşik bir ifade değil, "kırışıklık" diye de anlaşılabilir. Kırışıklık çağrışımı yaşlanma kaygısına kayar (G-07).
- **Öneri (ekran):** "1. Doku silinir"
- **Öneri (seslendirme):** "Önce doku silinir: gözenekler, çiller, ince tüyler. Hepsi yumuşayıp kaybolur." Bu öğeler nötr biçimde, "kusur" denmeden sayılır. Böylece kapanıştaki "Gerçek ciltte doku vardır" cümlesi neyi kastettiğini önceden göstermiş olur.

**A-4 · Şekil adımı "iyileştirme" gibi değil, "bir şablona doğru itme" gibi anlatılmalı (G-01, G-08)** ⚠️
- **Satır:** `2. şekil esner (gözler büyür, çene daralır, oklarla)`
- **Sorun:** Büyüyen göz ve daralan çene, okla "doğru yön" gibi gösterilirse izleyiciye "küçük göz / geniş çene sorundur" alt mesajı geçer.
- **Öneri (ekran):** "2. Şekil esnetilir"
- **Öneri (seslendirme):** "Sonra şekil esnetilir: gözler büyür, çene daralır. Ne kadar büyüyeceğine filtreyi tasarlayan karar verir."
- Oklar nötr renkte (`--muted`) olsun, "artı" veya "yıldız" efektiyle ödüllendirilmesin. Esneme anında `sparkle` sesi kullanılmasın, `click-soft` yeterli.

**A-5 · Kapanış cümlesi: güçlü, korunmalı** ✅ (küçük ton notu)
- **Satır:** "Gerçek ciltte doku vardır, olmalı da."
- Marka rehberindeki onaylı cümle. Doğal, yargısız ve Türkçede akıcı. "Olmalı da" bir buyruk gibi değil, onaylayan bir arkadaş sesi gibi okunur. Seslendirmede vurgu "vardır" üzerine olmalı, "olmalı da" yumuşak ve gülümseyen bir tonla söylenmeli.
- İsteğe bağlı ek son satır (marka vaadi): "Seçim senin, ama arkasını bil." Filtre kullanan izleyiciyi suçlamadan bitirir.

**A-6 · "Geri sarma" sahnesinde "gerçek yüz" etiketi** ⚠️ küçük
- Geri sarma sonunda dönen yüz de bir çizim. "Gerçek yüz" yerine ekranda "Filtresiz" yazılması (`--mint`) daha dürüst (K-11 ruhu). Seslendirme: "Adımları geri alalım."

**A-7 · Esnetme (warp) iddiası artık kaynaklı (K-09)** ✅ çözüldü
- `kaynaklar.md` #3 "kaynak bulunmadan yayınlanmaz" durumundaydı. Birincil kaynaklar bulundu (bkz. bölüm 5, #3a–#3c). Ancak kaynaklar "mesh warp" teriminden çok "noktalarla yönlendirilen görüntü esnetme" (landmark-based warping, MLS) anlatıyor. Seslendirmede "üçgen ağ" ve "esnetme" görsel benzetme olarak kullanılabilir. Ekranda teknik terim gerekirse "warp (görüntü esnetme)" yazılmalı, "mesh warp" yazılmamalı.

**A için düzeltilmiş akış önerisi (30–35 sn):**
> (0–3 sn) Nokta yağmuru, sayaç 478. Ekran: "Filtre önce yüzü 478 noktaya çevirir." · Kaynak: Google MediaPipe
> (3–8 sn) Noktalar ağa bağlanır. Ses: "Sonra bu noktaları bir ağ gibi birbirine bağlar."
> (8–15 sn) "1. Doku silinir" · Ses: "Gözenekler, çiller, ince tüyler… hepsi yumuşayıp kaybolur."
> (15–22 sn) "2. Şekil esnetilir" · Ses: "Gözler büyür, çene daralır. Ne kadar? Buna filtreyi tasarlayan karar verir."
> (22–26 sn) "3. Işık eklenir" · Ses: "Gölgeler silinir, yapay bir parlaklık gelir." (ten rengi sabit)
> (26–31 sn) Geri sarma → "Filtresiz" (`--mint`) · Ses: "Filtredeki yüz, hesaplanmış bir yüz. Gerçek ciltte doku vardır, olmalı da."
> (31–34 sn) Bitiş kartı · "Aynanın arkasına bak." · "Kaynaklar açıklamada"

---

## 3. Hikâye B · "Ayna ikiye bölünür" ⚠️ düzeltmeyle

**B-1 · Kapanış cümlesi çelişkili, izleyiciyi hedef alıyor ve filtre kullananı küçümsüyor (G-01, G-07, marka tonu)** 🔴 zorunlu
- **Satır:** `"İkisi de sen değil mi? Biri sadece matematik."`
- **Sorunlar:**
  1. **Çelişki:** Açılış "Biri gerçek, biri hesaplanmış" diyor, kapanış "İkisi de sen" diyor. Mesaj bulanıklaşıyor.
  2. **Yüzü izleyiciye bağlama:** "sen" kelimesi çizimi izleyicinin yüzü yapıyor. Böylece önce/sonra karşılaştırması izleyicinin kendi yüzü üzerinden kuruluyor. Bu G-01'in tam olarak kaçındığı çerçeve.
  3. **"Değil mi?":** Onay isteyen soru eki, Türkçede hafif ukala ya da imalı okunabilir ("değil mi ama?").
  4. **"Sadece matematik":** Filtre kullanan izleyiciyi saflıkla suçluyor gibi duruyor. Marka kişiliği "eleştirel ama yargılamayan" diyor. Türkiye'de filtre kullanımı çok yaygın, kitlenin büyük bölümü kendini burada "kandırılan" olarak görmek istemez.
- **Öneri:** "Soldaki çizildi. Sağdaki hesaplandı. Filtreyi kullanmak senin seçimin, neyi değiştirdiğini bilmek de hakkın."
- **Kısa alternatif:** "Filtre kötü değil. Sadece ne yaptığını bil." → marka vaadine bağlanır: "Seçim senin, ama arkasını bil."

**B-2 · Renk ataması filtreli yarıyı daha çekici ve markalı yapıyor (beden algısı, görsel dürüstlük K-11 ruhu)** 🔴 zorunlu
- **Satır:** `Sol yarı --mint çizgi, sağ yarı --toz-pembe dolgu`
- **Sorun:** Filtreli yüz ana marka rengiyle, dolgulu ve "zengin" çiziliyor. Gerçek yüz ise yalnızca çizgiyle, daha yoksul görünüyor. Önce/sonra dilinde bu, tam bir reklam "sonra"sı üretir: izleyicinin gözü filtreliyi "daha güzel" diye işaretler. Üstelik `--mint` rehberde "gerçek/filtresiz vurgusu" olarak tanımlı, ama burada eksik/sönük taraf oluyor.
- **Öneri:** İki yarı **aynı çizim kalitesinde ve aynı dolgu düzeyinde** olsun. Fark yalnızca filtre adımlarından gelsin (doku, şekil, ışık). Renk yalnızca **etiket ve çerçevede** kullanılsın: sol çerçeve `--mint` + "Filtresiz", sağ çerçeve `--toz-pembe` + "Hesaplanmış".

**B-3 · Önce/sonra biçiminin kendisi riskli bir dil (G-02 ruhu)** ⚠️
- G-02, illüstrasyonla önce/sonraya izin veriyor, bu nedenle kural ihlali yok. Ancak bölünmüş ekran ve sürgü, güzellik reklamlarının en bilinen kalıbı. İzleyici sürgüyü "iyileştirme" olarak okuyabilir.
- **Öneri:** Sürgü her durduğunda **filtrenin ne yaptığı** yazılsın, sonucun ne olduğu değil: "Doku silindi", "Göz büyütüldü, çene daraltıldı", "Gölgeler silindi". "Daha pürüzsüz", "daha ince" gibi karşılaştırma sıfatları kullanılmasın.

**B-4 · Kanca cümlesi** ✅ küçük öneri
- **Satır:** `"Biri gerçek. Biri hesaplanmış."`
- Kısa, merak uyandırıcı, yargısız. Tek sorun: her ikisi de çizim olduğu için "gerçek" biraz iddialı. Öneri: "Biri filtresiz. Biri hesaplanmış." ya da olduğu gibi kalsın, ama kapanışta B-1'deki "Soldaki çizildi" ile dengelensin.

**B-5 · "Işık" sürgüsü: A-2 ile aynı risk (G-03)** 🔴 zorunlu
- **Satır:** `sürgü 3: ışık`
- Ten rengi açılmamalı. A-2'deki çözüm uygulanmalı (ten rengi sabit, yalnızca parlama ve gölge silme).

**B-6 · Kaynaklı rakam yok, ama K-09 yine de geçerli** ⚠️
- B'de 478 gibi bir rakam yok. Bu, kaynak yükünü azaltır. Yine de "doku silinir" ve "şekil esnetilir" teknik iddialarına açıklamada kaynak verilmeli.
- Not: B'de "nasıl hesaplandığı" gösterilmiyor, yalnızca sonuç gösteriliyor. "Tek fikir"deki "yüzü noktalara çevirir" kısmı eksik kalıyor. Bu bir uyum sorunu değil, ama içerik özgünlüğü (K-16) açısından A daha güçlü.

---

## 4. Hikâye C · "Bir selfie'nin 33 milisaniyesi" ⚠️ düzeltmeyle (en riskli)

**C-1 · Kanca, bir hesabı ölçüm gibi sunuyor (K-09, K-10, K-18)** 🔴 zorunlu
- **Satır:** `Ekranda: "Filtre bu yüzü 33 milisaniyede yeniden yapıyor."`
- **Sorun:** 33 ms, 30 kare/sn'de **iki kare arasındaki süredir** (1000/30 ≈ 33,3). Filtrenin işlem süresi değildir. Gerçek işlem süresi cihaza ve modele göre değişir (daha kısa olabilir). Ayrıca birçok telefon 60 kare/sn çeker (≈16,7 ms). `STORYLINES.md` notu bunu kabul ediyor ("ekranda da öyle yazılır"), ama kanca cümlesi tam tersini söylüyor. Kancada belirsizlik giderilmezse K-18 (başlık/kapak içerikle birebir uyumlu) ve K-09 riski doğar.
- **Öneri (ekran):** "Canlı filtrenin bir kareyi bitirmek için **33 milisaniyeden** az vakti var."
- **Alt etiket:** `30 kare/sn: 1000 ÷ 30 ≈ 33 ms (hesap)`
- **Seslendirme:** "Saniyede 30 kare demek, her kare için yaklaşık 33 milisaniye demek. Filtre bütün işini bu sürenin içine sığdırmak zorunda."

**C-2 · Kanalın ana cümlesi hikâyede yok** ⚠️
- **Satır:** Akış "→ "Her kare, saniyede 30 kez." → bitiş kartı" ile bitiyor.
- **Sorun:** "İzleyicide kalacak cümle" ("Filtredeki yüz, hesaplanmış bir yüz. Gerçek ciltte doku vardır, olmalı da.") C'de geçmiyor. Video bir hız merakına dönüşüyor, beden algısı / media literacy mesajı kayboluyor. Bu, kanalın amacına uymuyor.
- **Öneri:** Geri çekilme anında: "Her kare yeniden hesaplanıyor. Filtredeki yüz, hesaplanmış bir yüz. Gerçek ciltte doku vardır, olmalı da."

**C-3 · "Her kare, saniyede 30 kez." Türkçede eksik ve doğal değil (dil)** ⚠️
- **Satır:** `"Her kare, saniyede 30 kez."`
- **Sorun:** Yüklem yok. Anlam da kayık: "her kare saniyede 30 kez" değil, "saniyede 30 kare" işleniyor.
- **Öneri:** "Ve bunu saniyede 30 kez yapıyor." ya da "Saniyede 30 kez, her karede yeniden."

**C-4 · "Yumuşatma çekirdeği" jargonu** ⚠️ küçük
- **Satır:** `zoom: yumuşatma çekirdeği dokuyu süpürür`
- "Çekirdek" (kernel) teknik terimi 18+ meraklı kitle için bile ekranda yabancı kalır. Ekran: "Yumuşatma" · Seslendirme: "Küçük bir yumuşatma penceresi cildin üstünden geçer ve dokuyu süpürür." Görsel metafor olarak "fırça" kullanılabilir, ama sahne "makyaj fırçası" gibi çizilmemeli (ürün çağrışımı, G-05 ruhu).

**C-5 · "Selfie" ve "piksel" katmanları çizim olarak kalmalı (G-02)** ⚠️
- "Telefon ekranında bir selfie" fikri, SPEC aşamasında gerçek bir fotoğraf ya da AI üretimi gerçekçi yüz kullanma eğilimi doğurabilir. Piksel katmanı da çizgi-portrenin pikselleştirilmiş hâli olmalı. Gerçekçi bir yüz kullanılırsa G-02 ihlali ve K-17 beyan yükü doğar.

**C-6 · Sonsuz zoom temposu ve anlaşılırlık** ⚠️
- 4 zoom katmanı + zemin tonu değişimi + `whoosh-cinematic` 30–40 sn'ye sığarsa her katmana ~5 sn kalır. Teknik bir fikir için bu hızlıdır ve "ışık çakması" sınırına (O-9) yaklaşabilir. Zemin değişimleri yumuşak geçişle (≥ 300 ms) yapılmalı.
- C'de "ışık" adımı yok. Bu G-03 riskini azaltıyor, olumlu.

---

## 5. Güncellenmiş kaynak tablosu

> Erişim tarihi: 2026-11-19. **Not:** Bu oturumun ağ ayarları `ai.google.dev`, `docs.opencv.org` ve `arxiv.org` adreslerinin doğrudan açılmasına izin vermedi. Aşağıdaki "🔎" işaretli satırlar arama motoru özetleri ve resmî sayfaların alternatif adresleri üzerinden doğrulandı. K-10 gereği yayından önce bir insan bu sayfaları açıp ilgili cümleyi kendi gözüyle görmeli.

| # | İddia (videoda kullanılacak biçim) | Kaynak | Durum |
|---|---|---|---|
| 1 | Google'ın açık kaynak yüz modeli (MediaPipe Face Landmarker), bir yüzde **478** adet 3B nokta tahmin eder (468 yüz + 10 iris). | [Google AI Edge, Face landmark detection guide](https://ai.google.dev/mediapipe/solutions/vision/face_landmarker) · ayna adres: [developers.google.com/edge/mediapipe/solutions/vision/face_landmarker](https://developers.google.com/edge/mediapipe/solutions/vision/face_landmarker) | ✅ doğrulandı (resmî belge "478 3D landmarks" diyor). "Telefon" genellemesi yapılmaz (A-1). |
| 1b | Aynı model, efekt çizimi için yüz noktalarını ve dönüşüm matrislerini verir (yani filtreler bu tür noktaların üzerine kurulur). | Aynı belge (Face Landmarker çıktıları: landmarks, blendshapes, transformation matrices) | 🔎 arama özetiyle doğrulandı |
| 2 | Cilt yumuşatma, kenarları koruyarak dokuyu silen filtrelerle yapılabilir (ör. bilateral filtre). | [OpenCV, Smoothing Images (bilateralFilter)](https://docs.opencv.org/4.x/d4/d13/tutorial_py_filtering.html) | ⏳ (önceki kayıt) insan kontrolü gerekli |
| 2a | **YENİ · birincil (akademik):** Bilateral filtre, yakın piksellerin hem uzaklığına hem renk benzerliğine göre ağırlıklı ortalama alarak **kenarları koruyup yüzeyi yumuşatır**. | Tomasi, C. & Manduchi, R. (1998). *Bilateral Filtering for Gray and Color Images.* ICCV 1998, s. 839–846. DOI: [10.1109/ICCV.1998.710815](https://doi.org/10.1109/ICCV.1998.710815) · [IEEE Xplore](https://ieeexplore.ieee.org/document/710815) · [Açık PDF (Duke ders sayfası)](https://courses.cs.duke.edu/spring04/cps196.1/handouts/bilateral.pdf) | 🔎 künye ve özet doğrulandı |
| 2b | **YENİ · uygulama kanıtı:** Bilateral filtre cilt yumuşatmada, bir "cilt haritası" ile yalnızca cilt bölgesine uygulanır. | US Patent 11,645,737 B2, *Skin map-aided skin smoothing of images using a bilateral filter* · [Google Patents](https://patents.google.com/patent/US11645737) | 🔎 başlık ve özet doğrulandı |
| 3 | Yüz şekli, yüz noktalarının yer değiştirmesiyle görüntünün esnetilmesiyle (warp) değiştirilir. | (önceki kayıt: birincil kaynak yoktu) | ✅ **aşağıdaki 3a–3c ile kaynaklandı**, cümle yayınlanabilir |
| 3a | **YENİ · birincil (akademik, yöntem):** Kontrol noktaları (veya çizgiler) taşındığında görüntüyü pürüzsüzce esneten "Moving Least Squares" (MLS) görüntü deformasyonu yöntemi. | Schaefer, S., McPhail, T. & Warren, J. (2006). *Image Deformation Using Moving Least Squares.* ACM Transactions on Graphics 25(3), SIGGRAPH 2006, s. 533–540. DOI: [10.1145/1141911.1141920](https://doi.org/10.1145/1141911.1141920) · [Yazarın açık PDF'i (Texas A&M)](https://people.engr.tamu.edu/schaefer/research/mls.pdf) · [SIGGRAPH arşivi](https://history.siggraph.org/?p=113538) | 🔎 künye ve özet doğrulandı |
| 3b | **YENİ · birincil (akademik, yüze uygulama):** Yüz noktaları (106 nokta) kontrol noktası olarak kullanılarak **gözler büyütülür** (bilineer enterpolasyon) ve **burun, ağız, yanaklar daraltılır** (MLS). | Facial Image Deformation Based on Landmark Detection, arXiv:1910.13671 (2019) · [arxiv.org/abs/1910.13671](https://arxiv.org/abs/1910.13671) · [ar5iv HTML](https://ar5iv.labs.arxiv.org/html/1910.13671) | 🔎 özet doğrulandı. Hakemli dergi değil (ön baskı). 3a ve 3c ile birlikte kullanılmalı |
| 3c | **YENİ · endüstri birincil kaynağı (gerçek zamanlı filtre):** Gerçek zamanlı video güzelleştirmede "büyük göz" ve "ince yüz" filtreleri, yüz noktası verisi + kullanıcının seçtiği güç ile **morfolojik esnetme (warping)** uygular. Aynı sistem cilt yumuşatma ve yüz aydınlatma/beyazlatma adımlarını da içerir. | US Patent 10,152,778 B2 (2018, Intel), *Real-time face beautification features for video images* · [Google Patents](https://patents.google.com/patent/US10152778) · devamı: US 11,328,496 B2 (2022), *Scalable real-time face beautification of video images* | 🔎 başlık, istemler ve açıklama özeti doğrulandı. Patentin varlığı tekniğin ürünlerde kullanıldığını gösterir, ama belirli bir uygulamanın bunu kullandığını kanıtlamaz (O-4) |
| 4 | 30 kare/sn'de bir kare ≈ 33 ms. Bu bir hesaptır, ölçüm değildir. | Aritmetik (1000 ÷ 30 ≈ 33,3) | ✅ Yalnızca "kare başına süre / bütçe" olarak kullanılır (C-1) |
| 5 | **YENİ · politika:** YouTube'da animasyon gibi açıkça gerçek dışı içerik ile renk/ışık ve güzellik filtreleri "altered or synthetic content" beyanı gerektirmez. | [YouTube Yardım, Disclosing use of altered or synthetic content](https://support.google.com/youtube/answer/14328491) · [YouTube Blog, How we're helping creators disclose altered or synthetic content](https://blog.youtube/news-and-events/disclosing-ai-generated-content) | 🔎 doğrulandı (O-2) |
| 6 | **YENİ · mevzuat (bilgi, bu videoda kullanılmıyor):** Ticaret Bakanlığı Reklam Kurulu'nun Sosyal Medya Etkileyicileri Kılavuzu, reklam içeriğinde filtre kullanılmasının açıkça belirtilmesini ister. | [T.C. Ticaret Bakanlığı duyurusu](https://ticaret.gov.tr/haberler/ticaret-bakanligi-sosyal-medya-etkileyicileri-icin-kilavuz-yayimladi) | 🔎 ikincil haberlerle doğrulandı. Kullanılırsa kılavuzun kendi metni okunmalı (O-5) |

**Seslendirmede kullanılabilecek, kaynakla uyumlu esnetme cümlesi:**
> "Sonra şekil esnetilir: noktalar kaydırılır, görüntü de onlarla birlikte esner. Gözler büyür, çene daralır."
> Ekran etiketi: `Kaynak: Schaefer vd. 2006; US 10152778`

---

## 6. Yayın öncesi kapı için bu videoya özel kontrol listesi

```
□ Kanca: "telefon" genellemesi yok, 478 yalnızca "bir yüz modeli" olarak (A-1)
□ Işık adımında ten rengi değişmiyor, yalnızca parlama/gölge (A-2, B-5, G-03)
□ Doku nötr sayılıyor (gözenek, çil, ince tüy), "kusur/kırışıklık" yok (A-3, G-01)
□ Şekil adımı ödüllendirilmiyor (nötr ok, sparkle yok) (A-4)
□ Ekranda kaynak etiketleri: MediaPipe / Tomasi & Manduchi / Schaefer vd. (O-3, K-09)
□ Portre: orta-koyu ten, görünür doku, yetişkin (O-7, G-06, G-08)
□ AI ses: lisansı belgelenmiş yol + açıklamada beyan (O-1, K-17)
□ Uygulama adı/logosu yok (O-4, K-14)
□ İzleyiciden selfie istenmiyor (O-6, K-22)
□ Başlık: "Filtre bir yüzü nasıl hesaplar?" (O-8, K-18)
□ Kaynak 1, 2a, 3a, 3c bir insan tarafından açılıp okundu (K-10)
```
