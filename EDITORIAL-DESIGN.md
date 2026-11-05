# Editorial botanical design

A visual refinement of the implemented minimal journeys: warm ivory, forest green and citron; oversized serif headings; an arched photographic hero; a botanical seal; staggered image-led pathways; a dark topic collection; and specimen-inspired herb cards.

Existing local imagery is reused. Decorative leaf drawings and the seal are visual motifs, not species identification or verification marks. Canonical herb names, sources and navigation behaviours are unchanged. The hero search stays ahead of photography on mobile. Entrance motion is finite and respects reduced-motion preferences; there is no autoplaying carousel or scroll interception.

Implementation: `src/components/BotanicalHome.tsx`, `src/editorial.css`, and its import in `src/main.tsx`.

Validation: TypeScript, production build, and the browser regression suite across 15 routes and six viewport widths, including dark mode and reduced motion. Existing build chunk-size warning remains.
