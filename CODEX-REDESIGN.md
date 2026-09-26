# Editorial Codex redesign

Mulika now opens at a visual index with direct routes into the existing collection. Search remains available in the header and mobile navigation. The Index panel provides a filterable list of destinations and opens with Control/Command K.

## Navigation

- Home: seven labeled visual destinations, real collection counts, and direct source-page links.
- A–Z: recorded English/common, scientific, Sanskrit, Telugu, and regional names, with initial-letter filtering.
- Families: browsing by the exact family labels stored in the records; no inferred taxonomic hierarchy.
- Herb dossiers: recorded identity and names, an internal contents navigation, and prominent source references.
- Reader and comparison: existing folio and comparison behavior retained inside the editorial shell.
- Browser Back/Forward: hash routes now create history entries. Existing source/page/entry links are preserved.

Geographic browsing and source scan imagery are not added because the available data does not support them.

## Verification

TypeScript, production build, and all existing tests pass.

The headless-browser regression script checks the visual index, scientific-name filtering, dossier anchors without hash changes, browser Back, keyboard destination finder, family filtering, comparison-to-reader navigation, folio routes, and search on a static host without an API. It also checks horizontal overflow across six routes at 360, 390, 768, 1024, and 1440 pixels, captures desktop/mobile/dark screenshots, and fails on browser page errors.

Run after building:

```sh
node scripts/verify-codex.cjs
```

Requires Playwright and a browser installation. Set PLAYWRIGHT_MODULE to an existing Playwright module path and BROWSER_EXECUTABLE to an installed browser if these are not on the default paths.

The build retains the existing large-bundle warning. This change does not alter corpus data or evidence validation.
