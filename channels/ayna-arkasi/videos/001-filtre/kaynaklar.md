# 001 · Kaynaklar (K-09)
| # | İddia | Kaynak | Durum |
|---|---|---|---|
| 1 | Google'ın açık kaynak yüz modeli (MediaPipe Face Landmarker) yüzde **478** adet 3B nokta tahmin eder | [Google AI Edge, Face landmark detection guide](https://ai.google.dev/mediapipe/solutions/vision/face_landmarker) (erişim 2026-11-19) | ✅ doğrulandı |
| 2 | Cilt yumuşatma, kenarları koruyarak dokuyu silen filtrelerle yapılır (ör. bilateral filtre) | [OpenCV, Smoothing Images (bilateralFilter)](https://docs.opencv.org/4.x/d4/d13/tutorial_py_filtering.html) | ⏳ insan kontrolü gerekli |
| 3 | Yüz şekli, noktaların yer değiştirmesiyle görüntünün esnetilmesiyle (mesh warp) değiştirilir | Genel teknik açıklama, birincil kaynak eklenecek | ⏳ **kaynak bulunmadan bu cümle yayınlanmaz** |
| 4 | 30 kare/sn'de bir kare ≈ 33 ms | Aritmetik (1000/30) | ✅ |

> Not: "478 nokta" belirli bir model içindir. Seslendirmede "telefonun" yerine "**bir yüz modeli**" denmesi daha doğru olur. Ekrandaki kanca cümlesi SPEC aşamasında buna göre düzeltilecek.
