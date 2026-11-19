# 03 · Grafik Standartları
*Persona: **Data Visualization Engineer** (agency-agents/engineering/engineering-data-visualization-engineer.md)*

> Temel ilke: **Her grafik tek bir soruya cevap verir ve izleyici bu cevabı ilk 3 saniyede görür.** Telefon ekranında, 30 saniyelik bir Short'ta "keşif" yapılmaz. Grafik bir mesaj taşır.

## 1. Soru → grafik türü
| Soru | Kullan | Kullanma |
|---|---|---|
| "Hangisi daha büyük?" (≤ 6 kalem) | **Sıralı yatay çubuk** | Pasta, 3B çubuk |
| "Zamanla nasıl değişti?" | **Çizgi** (≤ 3 seri) | Alan yığını, çift eksen |
| "Bütünün ne kadarı?" (≤ 3 parça) | **Tek yığın çubuk / 10×10 birim ızgara** | 4+ dilimli pasta |
| "Ne kadar büyük?" (ölçek, tek rakam) | **Kahraman rakam + gündelik kıyas** ("= 4 futbol sahası") | Soyut balon/alan |
| "Nerede?" | **Basit sınır haritası + nokta/renk** | 3B küre, uydu görüntüsü |
| "Kaç kat?" | **Yan yana birim ikon dizisi** (ör. 1 vs 12 kutu) | Ölçeği yanlış alanlı ikon |
| "Nasıl çalışır?" (Kanal B) | **Kesit diyagramı + numaralı adımlar** | Fotoğraf üstü ok yığını |

## 2. Dürüstlük kontrol listesi (render öncesi zorunlu, K-11)
```
□ Çubuklar SIFIRDAN başlıyor. Çizgi ekseninde sıfır yoksa eksende kırık işareti ve not var
□ Nicelik konum/uzunlukla gösteriliyor. Alan, açı ve 3B kullanılmıyor
□ Çift eksen YOK
□ Dikey kadrajda (9:16) çizgi eğimi abartılmıyor: grafik alanı en boy oranı 1:1 ile 4:3 arası
□ Ortalama dağılımı gizlemiyor ("ortalama" diyorsak medyanı da kontrol ettik)
□ Yuvarlama tutarlı, yüzdeler toplamı 100 (±0,1 notlu)
□ Birim her rakamın yanında (TL, km, ton, kişi). Nominal mi reel mi belirtildi
□ Başlık eğilimi söylüyor: ❌ "Çay tüketimi" → ✅ "Türkiye kişi başı çayda dünya 1.si"
□ Ekranda kaynak etiketi: "Kaynak: Kurum, Yıl" (K-09)
□ Karşılaştırılan veriler aynı yıl, aynı tanım ve aynı kaynaktan. Değilse açıkça yazılı
```

## 3. Renk: veri olarak renk
- **Kategorik (renk körlüğüne uygun, Okabe-Ito alt kümesi).** Shorts'ta **en fazla 4 seri** kullanılır. Sıra:

| Sıra | Kanal A (koyu zemin) | Kontrast | Kanal B (kâğıt zemin) | Kontrast |
|---|---|---|---|---|
| 1 | `#FFB000` (marka amber) | 10.3 | `#D93A0B` (marka turuncu) | 4.1 |
| 2 | `#56B4E9` | 8.2 | `#2B59C3` | 5.6 |
| 3 | `#009E73` | 5.5 | `#0072B2` | 4.6 |
| 4 | `#CC79A7` | 6.2 | `#1A1A1A` (kesikli çizgi) | 15.4 |

  - ❌ `#F0E442` sarı kâğıt zeminde 1.2:1 kontrast verir, **Kanal B'de yasak**.
- **Vurgu kuralı:** Bir grafikte tek bir hikâye öğesi renkli olur, geri kalanı `--muted` (gri) kalır. "Türkiye" çubuğu amber, diğer ülkeler gri.
- **Sıralı (sequential) harita/ısı:** tek ton açık → koyu (viridis veya marka renginin %20–100 tonları). Gökkuşağı (rainbow/jet) **yasak**.
- **Iraksak (diverging):** yalnızca anlamlı bir orta nokta varsa (0, ortalama) kullanılır. Mavi ↔ turuncu.
- **Renk tek başına anlam taşımaz:** her seri doğrudan etiketlenir (legend yerine çizginin ucuna isim yazılır).

## 4. Ölçüler (1080×1920)
| Öğe | Değer |
|---|---|
| Grafik alanı | x: 60–940 (880px), y: 520–1400 |
| Eksen etiketi | 40px Medium, `--muted` |
| Veri etiketi | 48px Bold, serinin rengi |
| Kahraman rakam | 220–320px Bold |
| Çubuk kalınlığı | ≥ 64px, aralık = kalınlığın %40'ı |
| Çizgi kalınlığı | 8px (ana), 4px (bağlam) |
| Izgara | en fazla 4 yatay çizgi, 2px, `--grid` |
| Kalem sayısı | çubukta ≤ 6, çizgide ≤ 3 seri |

## 5. Sayı biçimi
- TR: `1.250.000` · `3,4` · `%42` (yüzde işareti önde) · `₺12,5 milyar`
- EN: `1,250,000` · `3.4` · `42%` · `$12.5B`
- Büyük sayıda kısaltma kullanılır (TR: bin, milyon, milyar; EN: K, M, B), ancak ilk geçişte tam yazılır.
- Sayaç animasyonu **tam değerde** durur. Ara değerlerde yuvarlama tutarlı olur.

## 6. Animasyon kuralları (HyperFrames)
- Çubuk **sıfır tabanından** büyür. Çizgi soldan sağa çizilir. Süre 0,6–1,0 sn, ease `power2.out`.
- Animasyon bitince son durum **en az 1,5 sn sabit** kalır ve seslendirme rakamı bu sırada söyler.
- Bir anda yalnızca **bir** şey hareket eder. Göz takibi dağılmaz.
- Sahne geçişinde grafik "sıçramaz". Eksen ölçeği değişecekse bu animasyonla gösterilir ve seslendirmede belirtilir.
- Zamanlama deterministik olur: tüm animasyon tek GSAP timeline'a bağlanır, `Math.random()` ve gerçek zaman kullanılmaz (HyperFrames kare kare yakalama yapar).

## 7. Teknik
- 1.000 öğenin altında **SVG/HTML** kullanılır, üstündeyse Canvas. Shorts için neredeyse her zaman SVG yeterli.
- Veri, kompozisyonun içinde `const DATA = [...]` olarak ve kaynak URL yorum satırıyla tutulur. Ayrıca `kaynaklar.md` ile eşleşir.
- Harita verisi kamu malı/açık lisanslı kaynaktan alınır (Natural Earth, Public Domain). Tartışmalı sınırlar gösterilmez, gerekirse yalnız nokta işaretleri kullanılır (K-07).
