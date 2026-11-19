# Concept C: Aynalı Yazı ("Mirrored Wordmark")

## Rationale
- The name is the logo. "Ayna" stands on a thin mirror line. "Arkası" sits under it as its reflection, upside down: literally *behind the mirror*.
- The tail of the "y" in Ayna comes down and just touches the mirror line, like a fingertip on glass. A small gold glint sits at the end of the line (the one playful touch).
- The avatar mark is an "A" with its reflection below. Together they make a diamond/hourglass shape that is simple, ownable and readable at 48 px.
- High-contrast editorial serif + dusty pink + plum = beauty-magazine elegance, with a critical wink. Not childish, not clinical.

## Files
- `mark.svg`: A + reflection, transparent (for light/pink backgrounds). `mark-avatar.svg`: the 800×800 avatar source.
- `lockup-horizontal.svg` / `lockup-stacked.svg`: on plum. `*-pink.svg`: on dusty pink.
- `avatar-800.png`, `lockup-dark-2000x600.png`, `lockup-light-2000x600.png` (light = dusty pink background), `endcard-1080x1920.png`, `sheet.png`
- All lettering is converted to outlines (SVG paths), so no font is needed to display the SVGs. `src/` holds the generator (opentype.js; run `final.js` from a folder that has the `@expo-google-fonts/dm-serif-display` package).

## Fonts (all SIL OFL 1.1, full Turkish glyphs ı İ ş Ş ğ Ğ ç ö ü checked with fontTools)
- **DM Serif Display** Regular + Italic (wordmark): `fonts/` (license note in `fonts/OFL-DMSerifDisplay.txt`)
- **Be Vietnam Pro** Medium/Bold (slogan, UI): `../../fonts/`

## Colors
Dusty pink #E8B4B8 (main) · plum #1C1424 · berry #8E3B5A (reflection on pink) · #A8818A (reflection on plum) · gold #E9C46A (mirror line and glint on dark only) · ink #F7EFF3

## Do
- Use the stacked lockup for big moments (end card, banner, intro) and the horizontal one for headers and watermarks.
- On dusty pink, all text is plum and the reflection is berry. On plum, text is dusty pink and the line is gold.
- Leave clear space of at least one cap-height of "A" around the lockup.
- Always keep the reflection a shade dimmer than "Ayna".

## Don't
- Never put white or ink text on dusty pink (1.8:1).
- Don't add a gradient, fade or blur to the reflection, and don't flip it left-to-right. It is a crisp reflection on a horizontal surface.
- Don't rebuild the stacked wordmark in another font, and don't make "Arkası" upright inside the stacked version (use the horizontal lockup if you need it readable).
- Don't use the glint as a standalone icon, don't animate more than one glint, and keep it under 10% of the mark's height.
- Below 32 px, use the avatar mark without the glint.
