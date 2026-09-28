# Botanical homepage

This phase replaces the homepage and refines navigation. Search, API contracts, evidence processing, saved records, community, and manuscript logic are unchanged. The former homepage remains at #index and in the menu.

## Files and components

- src/components/BotanicalHome.tsx: BotanicalHome, video-ready PreparationHero, and reduced-motion-aware Reveal.
- src/homepage.css: warm editorial homepage styles, responsive layouts, navigation refinements.
- src/App.tsx: homepage actions connect to existing search, optional context, herb profiles, and destinations.
- src/components/Navbar.tsx: simplified primary navigation and retained destination finder.
- src/main.tsx: loads the visual foundation.
- scripts/verify-codex.cjs: homepage action checks and responsive coverage including 360, 390, and 430 pixels.
- public/images/preparation-editorial.png: temporary illustrative hero/story artwork.

## Artwork and replacement

Generated using the built-in image-generation tool. The image is illustrative atmosphere, not specimen photography or a documented preparation. Replace it with licensed, authentic preparation photography or film before presenting it as documentary imagery. The same image supplies temporary crops for the three paths.

Final generation prompt:

Create a premium photographic botanical editorial website hero, landscape 1536x1024. Close-up authentic human hands gently crushing fresh green herbs with a dark stone mortar and pestle on a warm brown wooden work table. Composition: hands and mortar predominantly on RIGHT half, left half mostly dark forest-green soft shadow and out-of-focus foliage with generous quiet negative space for white website text. Subtle amber oil in a small glass bottle, a few roots and leaves, linen cloth. Natural soft side light, tactile organic detail, cinematic warm analogue photography, sophisticated contemporary botanical atelier, honest everyday preparation, no medical equipment, no text, no lettering, no logos. Not a product advertisement. Image is illustrative atmosphere, not a botanical identification guide.

PreparationHero accepts videoSrc for a future local licensed film. It provides pause/play controls and respects reduced motion. No video is currently supplied.

## Future backend work

No backend work is needed for this homepage. Customization uses the existing optional search context, which does not personalize medical recommendations. A future shop needs an actual product catalogue, inventory, pricing, checkout, and order handling. Current collection cards lead to search records and explicitly say they are not products.

## Verification

Run npm run lint, npm run build, npm test, and scripts/verify-codex.cjs with Playwright and an available Chromium browser. The existing Vite large-chunk warning remains.
