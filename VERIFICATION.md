# Mulika frontend redesign — verification

Implemented inside the supplied React/Vite/Express repository. The original archive remains untouched.

## Automated checks

- TypeScript (`tsc --noEmit`, also the configured lint command): passed using the bundled Node runtime. React type definitions were added so component contracts are checked.
- Production build: passed; browser and Express bundles generated. The reader is lazy-loaded. Vite still warns about the initial bundle size (approximately 300 kB gzip), largely due to the existing corpus and reference data shipped in the client.
- Existing safety/provenance suite: 10 passed.
- Existing Gold Corpus suite: 8 passed.
- Existing cross-source comparison suite: 11 passed.
- Existing Codex/deep-link suite: 10 passed.
- New frontend rendering suite: passed. Covers SUPPORTED, INFERRED, UNKNOWN even with contradictory attached content, explicit abstention, source actions, community distinction, and missing safety information.

## Browser checks

- Home checked at 360, 390, 430, 768, 1024, 1280, and 1440 pixels, with no page-level horizontal overflow.
- Herbs, conditions, reference tools, community, sources, and reader checked across the same widths. Comparison has its own horizontal scrolling area.
- Acidity returns the authoritative INFERRED state. Avise returns SUPPORTED. An unmatched query returns UNKNOWN with no formulation, dosage, modern-reference synthesis, or dietary recommendation.
- Acidity → View source opens `#codex?book=mulika&page=64&entry=mulika-p64-1&return=search`. Return restores the previous search results.
- Direct link to Prakruti page 126 selects page 126.
- Tulsi alias search → profile → comparison shows the existing canonical Tulasi comparison and its botanical ambiguity notice.
- Saving Tippateega survives reload and opens from My Library.
- Provenance sheet: Escape closes it and restores focus to View evidence. Native dialog contains keyboard focus. Retained dialogs use a focus trap and Escape handling.
- Light/dark appearance works and persists through reload; device preference is supported.
- With the local server stopped, search displays a retry error and no medical conclusion. Restart + Retry restores results.
- Community note submission and voting work against the actual existing API. Returned legacy/new field shapes are rendered correctly.
- Browser console inspected. A stale lazy chunk error occurred while rebuilding beneath an open tab; reload resolved it. The final app includes an error boundary for failed view loading. Intentional offline testing produces the expected network error. A fresh tab on the final production build had no console errors or warnings.

This is focused functional and visual QA, not a full independent WCAG conformance audit or exhaustive browser/device certification.

## Preserved architecture

37 protected files were compared byte-for-byte against the supplied ZIP; changed protected files: [].

The Express server, Gemini integration, source corpus, domain types, provenance adapter, citation validators, comparison logic, Gold Corpus definitions, and original tests remain unchanged. Existing saved and recent-search storage keys and record shapes are preserved.

## Existing backend/data issues deliberately left unchanged

- Community submissions and votes are held in server memory and reset when the server restarts. Persistent storage needs backend work.
- The note-creation endpoint does not retain all submitted herb, condition, and reference metadata. The frontend displays fields actually returned; it does not invent them.
- Server deterministic synthesis supplies generic modern-evidence and dietary language for some unmatched metadata. This requires domain/backend review; the frontend renders authoritative returned content in separate labeled sections.
- Some Gold Corpus enrichment records conflict with their associated formulation text. Example: `chitkalu-p50-1` is a Tulasi fever formulation but its enrichment lists Vepa/alum gargle ingredients and dosage. Editorial correction is needed; those records were not modified.
- Botanical confidence is absent from some herb profiles. The UI says confidence is unavailable, without borrowing or inferring a verification state.
- Physical manuscript scans are not in the supplied project. The reader displays indexed transcriptions and clearly explains scan availability.
- Live Gemini generation was not verified without an API key; deterministic server search was exercised.

## Environment notes

The host initially ran out of memory during dependency installation, compiler checks, and browser startup. A clean lockfile installation with limited npm concurrency and separate checks completed successfully. No unrelated applications or user files were closed or deleted.
