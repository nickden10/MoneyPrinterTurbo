# 001 · Kaynaklar (K-09)
| # | İddia | Kaynak | Durum |
|---|---|---|---|
| 1 | MediaPipe Face Landmarker yüzde **478** adet 3B nokta tahmin eder | [Google AI Edge, Face landmark detection guide](https://ai.google.dev/mediapipe/solutions/vision/face_landmarker) | ✅ arama ile doğrulandı · ⏳ sayfa insan tarafından açılmalı |
| 2 | Cilt yumuşatma, kenarı koruyan filtrelerle yapılır (bilateral filtre) | [Tomasi & Manduchi (1998), ICCV, Bilateral filtering](https://doi.org/10.1109/ICCV.1998.710815) · [OpenCV belgesi](https://docs.opencv.org/4.x/d4/d13/tutorial_py_filtering.html) | ⏳ insan kontrolü |
| 3 | Yüz şekli, noktalarla yönlendirilen görüntü esnetmeyle (warp) değiştirilir | [Schaefer vd. (2006), Image Deformation Using MLS, ACM TOG](https://doi.org/10.1145/1141911.1141920) · [arXiv:1910.13671 (ön baskı)](https://arxiv.org/abs/1910.13671) · [Intel patenti US10152778B2](https://patents.google.com/patent/US10152778) | ⏳ insan kontrolü |
| 4 | 30 kare/sn'de bir kare ≈ 33 ms | Aritmetik (1000/30) | ✅ |

> K-10: Ajan ağ kısıtı nedeniyle bazı sayfaları doğrudan açamadı. Yayından önce bir insan bu sayfaları açıp ilgili cümleleri görmeli.
> Ekranda "mesh warp" değil, "görüntü esnetme" yazılır.
