"""Ayna Arkası 001: the narration per beat, as sent to the voice (numbers spelled out).

TR = SENARYO.md §2 `tts` column. EN = SCRIPT-EN.md. Shared by el_parcalar.py (voice) and build.py
(caption display text: punctuation and digits). MediaPipe is spelled "Midiya Payp" for the Turkish voice.
"""
MP = "Midiya Payp"
BEATS_TR = [
    ("B1", "Canlı filtrenin bir kareyi bitirmek için otuz üç milisaniyeden az vakti var."),
    ("B2", "Saniyede otuz kare, kare başına yaklaşık otuz üç milisaniye demek."),
    ("B3", "Yakından bak: pikseller."),
    ("B4", f"Önce bir yüz modeli, örneğin {MP}, yüzün üstünde dört yüz yetmiş sekiz nokta işaretler."),
    ("B5", "Sonra bilateral gibi bir filtre cildi tarar: kenarlar kalır, doku silinir. Gözenekler, çiller, ince tüyler."),
    ("B6", "Ardından noktalar kaydırılır, görüntü esner: gözler büyür, çene daralır."),
    ("B7", "En son ışık eklenir, gölgeler yumuşar."),
    ("B8", "Bunu saniyede otuz kez yapar, her karede yeniden."),
    ("B9a", "Filtredeki yüz, hesaplanmış bir yüz."),
    ("B9b", "Gerçek ciltte doku vardır, olmalı da."),
]
BEATS_EN = [  # SCRIPT-EN.md: same beats, numbers spelled out for the voice
    ("B1", "A live filter has less than thirty-three milliseconds to finish one frame."),
    ("B2", "Thirty frames a second means about thirty-three milliseconds per frame."),
    ("B3", "Look closer: pixels."),
    ("B4", "First, a face model, for example MediaPipe, marks four hundred seventy-eight points on the face."),
    ("B5", "Then a filter like a bilateral filter scans the skin: edges stay, texture is wiped. Pores, freckles, fine hairs."),
    ("B6", "Next, the points are shifted and the image stretches: eyes grow, the jaw narrows."),
    ("B7", "Last, light is added and shadows soften."),
    ("B8", "It does this thirty times a second, fresh on every frame."),
    ("B9a", "The face in the filter is a calculated face."),
    ("B9b", "Real skin has texture. It should."),
]
