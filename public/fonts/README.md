# Font Files — FK Raster Roman Compact Smooth

Place your licensed font files here with these exact filenames:

  FKRasterRomanCompactSmooth.woff2   (primary, best performance)
  FKRasterRomanCompactSmooth.woff    (fallback for older browsers)

## Where to buy
Purchase a webfont license from the official foundry:
  https://fonts.floriankarsten.com/fk-raster-roman

## How the font is loaded
The CSS @font-face declaration in `src/index.css` already points to:
  /fonts/FKRasterRomanCompactSmooth.woff2
  /fonts/FKRasterRomanCompactSmooth.woff

Once you drop your files here and restart the dev server (`npm run dev`),
the FK Raster Roman Compact Smooth font will automatically apply to the
giant footer wordmark ("LA CASA / DE PAPEL").

## Fallback chain
If the font files are not present, the browser will fall back to:
  1. Bebas Neue (Google Fonts — loaded automatically)
  2. Space Grotesk (already in the project)
  3. System sans-serif
