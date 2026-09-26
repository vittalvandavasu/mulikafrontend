# Mulika

Traditional knowledge, traceable to the source.

This is the redesigned original Mulika application, retaining React 19, Vite, TypeScript, Tailwind, Express, and the existing Gemini/search/provenance architecture.

## Run

```sh
npm ci
npm run dev
```

Open http://localhost:3000. The server supports deterministic corpus search without a Gemini API key. To exercise optional Gemini synthesis, provide `GEMINI_API_KEY` through the environment as the existing server expects.

## Verify and build

```sh
npm run lint
npm test
npm run build
```

Production startup:

```powershell
$env:NODE_ENV = 'production'
npm start
```

For macOS/Linux: `NODE_ENV=production npm start`.

## What changed

- Search-first home, botanical ivory/forest themes, simplified desktop navigation, mobile bottom navigation, and keyboard search shortcut.
- Compact answer presentation, explicit authoritative evidence states, safe abstention, network retry, prominent safety, and separate traditional/modern/community material.
- Responsive evidence sheet with original text when supplied, transliteration, translation, botanical confidence, editorial review, structured Gold Corpus data, citation copying, and source/compare actions.
- Shared visual tokens across herbs, conditions, tools, community, comparison and reader. Herb research links reach source records and comparison.
- Manuscript/page selectors, source metadata disclosure, text-size controls, lazy reader loading, preserved deep links, and reliable search return.
- My Library keeps the original localStorage keys and saved item format.
- Corrected frontend community endpoints and callbacks, optional-field rendering, corpus page navigation, and existing TypeScript contract errors.

No new treatment inference, authentication, commerce, practitioner, or fulfillment systems were added.

See [VERIFICATION.md](VERIFICATION.md) for tests, browser checks, and preserved backend/data limitations.
