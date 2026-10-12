# Mulika product experience overhaul

## Audit findings

The application uses React 19, TypeScript, Vite, Express, hash navigation and component state. Existing CSS and the botanical editorial identity are reused. The local canonical corpus, herb monographs, ailment records, books and Gold Corpus supply data. Search uses scored record matching with filters, citation validation and optional Gemini synthesis; static hosting uses a bundled deterministic fallback. Partial text, Telugu and existing aliases remain available, but general spelling correction is not advertised.

The Codex, exact book/page/entry links, cross-source comparisons, saved records and community interfaces remain in place. Source verification is distinct from medical effectiveness. No commerce catalogue, physician verification, appointment booking, authentication service or conversion analytics were found for the new workflows. The existing large Vite chunk warning remains.

## Implemented experience

- Main navigation: Discover, Make Yourself, Buy, Consult a Physician. All legacy destinations remain in the menu and old routes continue to resolve.
- Search starts directly, with a shorter hero and optional demographic disclosure. Query, recent searches and search context are preserved when returning.
- Results lead with identity and a short attributed description. A shared contextual action component immediately follows the description.
- Source summary, full recorded preparation, citations, provenance, dietary information, modern references and community detail use progressive disclosure. Safety and verification remain visible.
- Canonical herb catalogue matches have their own presentation and are distinguished from claim-level source evidence, including when the source search abstains.
- Initial preparation results are limited to three with a working expansion control.
- Make Yourself shows canonical preparation records, documented ingredients, missing-data statements and exact source links. Exact aliases or explicit botanical identity can link ingredients to herb records. An ingredient can carry directly into Buy.
- Herb and ailment preparation actions are shown only when linked corpus records exist.
- Buy is a distinct product destination using a typed commerce contract. Current availability is explicitly unavailable, with no invented prices, stock or purchase confirmation.
- Consult is a distinct destination reachable from navigation, results and herb/ailment details. Concern, age/gender and optional health notes can be reviewed locally. No booking or sharing is simulated. Health text is not persisted or transmitted and clears on leaving.
- Mobile heroes are smaller, search stays near the top, shared actions wrap into touch targets, and input text remains readable.

## Files

Core: src/App.tsx, src/components/Navbar.tsx, src/components/SearchHero.tsx, src/components/SearchResultsView.tsx, src/components/ContextActions.tsx, src/components/ExperiencePage.tsx, src/lib/experience.ts, src/discovery.css, src/main.tsx.

Detail entry points: src/components/HerbEncyclopedia.tsx, src/components/AilmentDirectory.tsx, src/components/BotanicalHome.tsx.

Verification: scripts/verify-codex.cjs plus existing npm test suites.

The previous local order draft is superseded by the separate Buy and Consult destinations. The old ResultJourney component is retained for compatibility but no longer part of the primary results UI.

## Integration boundaries

CommerceGateway.products accepts selected entity IDs, query and ingredient context and returns typed availability or products. Real integration must supply stock, prices, pack sizes, product URLs and checkout/fulfilment; source mentions cannot establish stock.

ConsultationGateway defines physician and appointment lookup. Production needs verified credentials, real schedules, booking and confirmation endpoints, secure health-context handling, and explicit consent before sharing. The default adapter returns unavailable. No endpoint or credentials are fabricated.

No analytics baseline exists, so no speed or conversion improvement is claimed. Search/action/source expansion metrics can be added to the existing analytics service when one is chosen, excluding health text and demographic values.

## Validation

Run npm run lint, npm run build, npm test, and scripts/verify-codex.cjs with Playwright/Chromium. Browser coverage includes source disclosure, distinct journeys, query/context retention, health-note clearing, empty integrations, ingredient context, old navigation, saved content, dark/reduced-motion modes and responsive routes.
