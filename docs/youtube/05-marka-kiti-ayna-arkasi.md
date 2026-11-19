# 05 · Marka Kiti: Ayna Arkası

> Dosyalar: `channels/ayna-arkasi/brand/` · Kaynak HTML: `brand/src/` · Çıktılar: `brand/png/`

## Kimlik
| | |
|---|---|
| **Kanal adı** | Ayna Arkası |
| **Slogan** | Aynanın arkasına bak. |
| **@handle önerileri** | `@aynaarkasi` · `@aynaarkasi.tr` · `@aynanin.arkasi` (müsaitlik YouTube'da kontrol edilmeli) |
| **Ana renk** | Toz pembe `#E8B4B8` |
| **Fontlar** | Charm Bold (logo, başlık) · Be Vietnam Pro Bold/Medium (her şey), ikisi de OFL |
| **İşaret** | Ayna ovali: sol yarı **ön yüz** (çizgi), sağ yarı **arka yüz** (dolu). Kanalın vaadini anlatır: görünenin arkası |

> ⚠️ **Ad kontrolü (K-14):** Web aramasında "Ayna Arkası" adlı bir YouTube kanalı bulunamadı (en yakın: "Medya Arkası", farklı bir ad). Kanalı açmadan önce **YouTube içi arama** ve **TÜRKPATENT marka araması** (sınıf 41) yapılmalı.

## Dosyalar ve kullanım
| Dosya | Boyut | Nereye |
|---|---|---|
| `png/avatar.png` | 800×800 | Kanal profil fotoğrafı (YouTube daire kırpar, işaret ortada güvende) |
| `png/banner.png` | 2560×1440 | Kanal kapağı. Yazı, 1546×423 güvenli alanının içinde (telefonda kesilmez) |
| `png/watermark.png` | 150×150, şeffaf | YouTube Studio → Özelleştirme → Video filigranı |
| `png/logo-dark.png` | 2000×600 | Koyu zeminde yatay logo (video bitiş kartı, sunumlar) |
| `png/logo-light.png` | 2000×600 | Açık zeminde yatay logo (sponsor dosyası, beyaz kâğıt) |
| `logo-mark.svg` | vektör | Her boyutta işaret |
| `brand.css` | — | Renk token'ları + @font-face. **Tüm videolar bu dosyayı kullanır** |
| `fonts/` | — | Charm-Bold, BeVietnamPro-Bold/Medium (OFL) |

Yeniden üretmek için `brand/src/*.html` düzenlenir ve Playwright ile tekrar ekran görüntüsü alınır.

## Logo kuralları
- ✅ İşaret ve yazı arasında en az işaret genişliğinin ⅓'ü kadar boşluk bırakılır.
- ✅ Koyu zeminde toz pembe işaret ve `--ink` yazı · açık zeminde `--berry` işaret ve `--plum` yazı.
- ❌ Logo döndürülmez, gölge, parıltı ve gradyan eklenmez. Toz pembe zeminde beyaz logo kullanılmaz.
- ❌ Videoda köşeye yapışık sabit logo konmaz. Logo yalnızca bitiş kartında bir kez görünür (filigranı YouTube kendisi ekler).

## Kanal metinleri (taslak)
**Açıklama (Hakkında):**
> Güzellik standartları nereden geliyor? Filtre yüzüne ne yapıyor? Reklam fotoğrafındaki o ışık nasıl kuruluyor? Ayna Arkası'nda güzellik algısının tarihine, teknolojisine ve pazarlamasına bakıyoruz. Yargı yok, kusur yok, yalnızca merak var.
> Her videonun kaynakları açıklamada.
> Seslendirmelerde yapay zekâ destekli ses kullanılır, metinler insan tarafından yazılır ve doğrulanır.

**Anahtar kelimeler:** güzellik algısı, güzellik standartları, filtre, rötuş, makyaj tarihi, medya okuryazarlığı, özgüven, kozmetik tarihi

**Video açıklama şablonu:**
```
{1–2 cümle özet}

Kaynaklar:
1. {Kurum/Yazar, Başlık, Yıl}: {URL}
2. …

Seslendirme yapay zekâ destekli sesle yapılmıştır. Görseller illüstrasyondur.
#güzellik #filtre #aynaarkasi
```

## YouTube Studio ilk ayarlar
- Kitle: **"Hayır, çocuklar için yapılmadı"** (K-08)
- Yapay/sentetik içerik: gerçekçi AI görsel yok, kutu **hayır**. AI sesi açıklamada beyan edilir (K-17)
- Ücretli tanıtım: hayır (sponsor gelene kadar)
- Yorumlar: "Uygunsuz olabilecek yorumları incelemeye al" açık, engellenen kelimeler listesine hakaret ve beden yorumları (ör. "şişman", "çirkin") eklenir (G-01)
- Varsayılan kategori: **Eğitim**
