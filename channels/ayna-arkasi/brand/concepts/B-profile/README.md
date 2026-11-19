# Ayna Arkası — Concept B: "Profile & Reflection" (Profil & Yansıma)

## Rationale
- A woman's profile (solid plum) faces her reflection (a single plum line) inside a dusty-pink hand-mirror oval; the pink space between them forms a vase: the space where the channel's questions live.
- The ponytail breaks out of the mirror and flips to pink: she literally steps "behind the mirror" (aynanın arkasına).
- The front face is the polished image; the reflection is only an unretouched line: the real, simpler self. The gold tie is the one small detail of craft.
- Wordmark: "Ayna" upright and "Arkası" italic, so the type repeats the front/reflection idea.
- Inclusive by design: no eyes, makeup, skin tone or ethnic cues; a soft, ordinary, non-idealised profile.

## Files
- `mark.svg` (for dark backgrounds), `mark-light.svg` (berry ponytail for light backgrounds)
- `lockup-horizontal.svg` / `lockup-stacked.svg` (dark bg), `*-light.svg` variants (light bg). Text is outlined to paths, so no font is needed to display them.
- `avatar.svg`, `avatar-800.png`: circle-safe, thicker reflection line, no frame
- `lockup-dark-2000x600.png`, `lockup-light-2000x600.png`, `sheet.png`
- `src/`: the Python generators (mark geometry, text-to-path via HarfBuzz)

## Fonts (all SIL Open Font License 1.1, full Turkish glyphs verified with fontTools)
- Fraunces 500 Medium + 500 Medium Italic: wordmark (`fonts/`, license in `fonts/Fraunces-OFL.txt`)
- Be Vietnam Pro Medium: slogan, tracked caps "AYNANIN ARKASINA BAK."

## Do
- Use plum #1C1424 (or the light pink #F6E1E3 with the light variants) as the background. Dusty pink #E8B4B8 stays the dominant colour of the mark.
- On dusty pink, all text is plum.
- Use `avatar-800.png` for the YouTube profile picture. It reads as a silhouette with a ponytail down to 48 px.
- Keep clear space of at least the ponytail's width around the mark.

## Don't
- Don't put white or ink text on dusty pink (1.8:1).
- Don't add facial features, skin tones, lashes or lipstick to the profile.
- Don't recolour the head pink or drop the ponytail; the colour flip at the mirror edge is the idea.
- Don't stretch the mark, add shadows or gradients, or set the wordmark in another font.
