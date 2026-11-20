# 001 · English script · "33 milliseconds of a selfie"

Translation of `SENARYO.md` §1–§2 for foreign viewers. Same beats, same facts, same tone (calm, curious, no judgment words: no "flaw", "fix", "perfect", "fake"). Spoken by the client's own ElevenLabs voice clone ("deno tr", `oZLkvX3OQ4An5lUhNiUt`), `eleven_multilingual_v2`. Voice text lives in `araclar/metin.py` (`BEATS_EN`).

**Timing rule:** one picture serves both languages. Every English beat starts at the Turkish beat start (`ses/el/beats.json`) or 0.15 s after the previous English beat if that one runs long. The English track ends at 42.78 s and the video at 44.63 s, so it never runs past the picture.

## Narration (plain)

> A live filter has less than 33 milliseconds to finish one frame. Thirty frames a second means about 33 milliseconds per frame. Look closer: pixels. First, a face model, for example MediaPipe, marks 478 points on the face. Then a filter like a bilateral filter scans the skin: edges stay, texture is wiped. Pores, freckles, fine hairs. Next, the points are shifted and the image stretches: eyes grow, the jaw narrows. Last, light is added and shadows soften. It does this 30 times a second, fresh on every frame. The face in the filter is a calculated face. Real skin has texture. It should.

## Beats

| # | Section | Written form (captions, SRT) | `tts` (sent to the voice) | Words | EN start (s) | TR start (s) |
|---|---|---|---|---|---|---|
| B1 | Hook | A live filter has less than 33 milliseconds to finish one frame. | … thirty-three milliseconds … | 12 | 0.20 | 0.20 |
| B2 | Arithmetic | 30 frames a second means about 33 milliseconds per frame. | Thirty frames … thirty-three … | 10 | 5.26 | 5.26 |
| B3 | Dive 1 | Look closer: pixels. | same | 3 | 10.24 | 10.24 |
| B4 | 478 points | First, a face model, for example MediaPipe, marks 478 points on the face. | … four hundred seventy-eight points … | 15 | 12.53 | 12.53 |
| B5 | Smoothing | Then a filter like a bilateral filter scans the skin: edges stay, texture is wiped. Pores, freckles, fine hairs. | same (read at speed 1.1) | 19 | 19.13 | 19.13 |
| B6 | Warp | Next, the points are shifted and the image stretches: eyes grow, the jaw narrows. | same | 14 | 27.08 | 27.08 |
| B7 | Light | Last, light is added and shadows soften. | same | 7 | 31.64 | 31.64 |
| B8 | Pull back | It does this 30 times a second, fresh on every frame. | … thirty times … | 11 | 34.58 | 34.58 |
| B9a | Payoff | The face in the filter is a calculated face. | same | 9 | 37.97 | 37.75 |
| B9b | Channel line | Real skin has texture. It should. | same | 6 | 41.07 | 40.41 |
| End | End card | "Ayna Arkası" wordmark · "Look behind the mirror." · "Sources in the description" | (silent) | | | |

Total: 106 words.

## Translation notes

| Turkish | English | Why |
|---|---|---|
| "yüzün üstünde 478 nokta" | "478 points on the face" | Same as TR: points *on* the face, never "478 percent". |
| "33 ms" is arithmetic | "Arithmetic, not a measurement" (on screen with 1000 ÷ 30 ≈ 33 ms) | Same disclosure as the Turkish "Hesap, ölçüm değil" (C-1). |
| "Sonra bilateral gibi bir filtre" | "Then a filter like a bilateral filter" | Keeps the hedge: bilateral is an example, not a claim about any app. |
| "doku silinir" | "texture is wiped" | Neutral; texture is not called a flaw (G-01). |
| "Gerçek ciltte doku vardır, olmalı da." | "Real skin has texture. It should." | Channel line; soft second sentence as in UYUM A-5. |
| "Filtresiz" | "No filter" | Phone label on the closing beat. |
| (no TR slogan line) | "Look behind the mirror." | End-card slogan for the English cut only; the wordmark stays "Ayna Arkası". |

On-screen English strings are in `araclar/build.py` → `T["en"]`.
