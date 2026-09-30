# Platform layout refinement

- Larger editorial imagery on discovery routes, with shorter headers for search and the reader.
- Enlarged image viewer uses the existing native dialog, traps focus, closes with Escape, and restores focus to the trigger.
- Homepage pathways and collection previews use distinct existing garden, infusion, and reading artwork.
- Shared responsive gutters, more space between cards, three-column desktop herb grid, and single-column mobile cards.
- Larger text in result excerpts, roomier source cards, improved alphabetical navigation targets, and mobile form text sized to avoid input zoom.
- Existing search, source records, reader behavior, optional context, and APIs are unchanged.
- Existing local imagery is reused; no new generated assets or external image dependencies.

Implementation: src/platform.css, src/components/BotanicalBanner.tsx, src/components/Sheet.tsx, src/main.tsx.

Verification: TypeScript, production build, existing regression suite, and scripts/verify-codex.cjs. Browser coverage includes image enlargement, Escape and focus restoration, image loading, 72 route/viewport combinations, existing navigation and search flows, reduced motion, and dark mode.
