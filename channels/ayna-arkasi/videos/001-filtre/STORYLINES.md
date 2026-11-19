# 001 · "Filtre yüzüne ne yapıyor?": üç hikâye

**Tek fikir:** Güzellik filtresi yüzü "görmez", hesaplar: yüzü noktalara çevirir, dokuyu siler, şekli esnetir, ışığı boyar.
**İzleyicide kalacak cümle:** "Filtredeki yüz, hesaplanmış bir yüz. Gerçek ciltte doku vardır, olmalı da."
**Ortak kurallar (uyum incelemesinden):** her iddiada ekranda kaynak etiketi (K-09) · portre orta-koyu tenli, dokusu görünür, seride yüzler dönüşümlü (G-08) · önerilen başlık: "Filtre bir yüzü nasıl hesaplar?" · ayrıntı: `UYUM-INCELEMESI.md`
**Ortak varsayımlar:** 1080×1920, 30 fps, 30–40 sn · Türkçe AI seslendirme (edge-tts `tr-TR-EmelNeural`, ücretsiz) · müzik yok, yalnızca Pixabay lisanslı efekt (isteğe bağlı: YouTube Ses Kütüphanesi'nden sakin bir parça, ücretsiz) · yüzler **illüstrasyon** (G-02), gerçek kişi yok.

---

## ⭐ A · "478 nokta" (öneri: en kolay takip edilen, tek yüz üzerinde adım adım ilerleyen hikâye)
**Yöntem:** Nesne açıklamanın kendisi · **Biçim:** Kendini yeniden kuran tek kare
Ekranda tek bir çizgi-portre var. Filtre onu adım adım "işler", izleyici hesaplamayı gözüyle görür. Sonunda adımlar geri sarılır ve gerçek yüz geri gelir.
- **İlk 2 sn:** Çizgi-portrenin üstüne toz pembe noktalar yağmur gibi yağar, sayaç 0'dan **478**'e koşar. Ekranda: "Filtre önce yüzü 478 noktaya çevirir." + küçük kaynak etiketi "Kaynak: Google MediaPipe"
- **Akış:** 478 nokta → noktalar üçgen ağa bağlanır → **1. doku silinir** (ten çizgileri yumuşayıp kaybolur) → **2. şekil esner** (görüntü esnetme/warp: gözler büyür, çene daralır, oklarla) → **3. ışık eklenir** (ten rengi **sabit**, yalnızca parlama eklenir ve gölgeler silinir, G-03) → geri sarma: her adım tek tek kalkar → "Gerçek ciltte doku vardır, olmalı da." → bitiş kartı (ayna işareti ikiye ayrılır)
- **Görünüm:** Erik zemin, toz pembe noktalar ve ağ, `--mint` yalnızca "gerçek" anında. Charm başlık + Be Vietnam Pro altyazı
- **Ses:** Sakin kadın sesi · nokta yağmurunda yumuşak `sparkle`, her adımda `click-soft`, geri sarmada `whoosh-short`

## B · "Ayna ikiye bölünür"
**Yöntem:** Önce ve sonra · **Biçim:** Bölünmüş ekrandan teke
Logomuzdaki ayna ovali ekranı ikiye böler: solda gerçek çizim, sağda filtreli hâli. Dikey bir sürgü her geçişte tek bir farkı ortaya çıkarır ve etiketler.
- **İlk 2 sn:** Ayna ovali açılır, iki yarıda aynı yüz. Ekranda: "Biri gerçek. Biri hesaplanmış."
- **Akış:** iki yüz → sürgü 1: doku → sürgü 2: göz/çene → sürgü 3: ışık eklenir (ten rengi sabit) → sürgü ortada durur → "Soldaki çizildi. Sağdaki hesaplandı. Filtreyi kullanmak senin seçimin, neyi değiştirdiğini bilmek de hakkın." → ayna logoya dönüşür
- **Görünüm:** İki yarı **aynı çizim kalitesinde** olur. Renk yalnızca çerçeve ve etiketlerde kullanılır (sol `--mint`, sağ `--toz-pembe`). Marka işaretinin kendisi sahne olur
- **Ses:** Sürgü her durduğunda `click`, logo kapanışında `chime`

## C · "Bir selfie'nin 33 milisaniyesi" (cesur seçenek)
**Yöntem:** Bir rakam yerine oturur · **Biçim:** Sonsuz zoom
Telefon ekranındaki bir selfie'ye dalınır. Her zoom yeni bir dünyaya açılır (piksel → nokta bulutu → yumuşatma "fırçası" → esneyen ızgara), sonunda kamera geri çekilip yine telefona döner.
- **İlk 2 sn:** Telefon ekranında çizgi-portre, köşede "33 ms" yazısı belirir. Ekranda: "Canlı filtrenin bir kareyi bitirmek için 33 milisaniyeden az vakti var."
- **Akış:** telefon → zoom: piksel → zoom: 478 nokta bulutu → zoom: yumuşatma çekirdeği dokuyu süpürür → zoom: ızgara esner → geri çekilme → "Her kare, saniyede 30 kez." → bitiş kartı
- **Görünüm:** Her zoom katmanında zemin tonu bir kademe değişir (erik → koyu → toz pembe açık), sabit taşıyıcı tek bir toz pembe nokta
- **Ses:** Zoom geçişlerinde `whoosh-cinematic`, sonda `chime`
- **Not:** "33 ms", 30 kare/sn'de bir karenin süresidir (1000 ÷ 30 ≈ 33). Bu bir hesaptır, belirli bir uygulamanın ölçümü değildir, ekranda da öyle yazılır.

---
Seçim yapıldıktan sonra: `SPEC.md` (her sahne kare kare) → seslendirme metni ve kaynak doğrulaması → HyperFrames projesi → `check` + `snapshot` → **önizleme sana gösterilir** → onay → render.
