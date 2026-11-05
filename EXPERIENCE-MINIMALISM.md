# Mulika experience refinement

## Findings and decisions

This is an implementation review of the existing interface and its working integrations, not a measured user study. Conversion and completion-time improvements have not been established.

- Navigation gave unavailable purchasing and booking the same priority as working discovery. Desktop now leads with Discover, Herbs and Library. Mobile has Discover, Library, Saved and More. All previous destinations and deep links remain reachable in the menu; context-specific Make, Buy and Consult actions remain on records.
- The homepage repeated discovery choices in path cards, topics, a four-column explanation and another collection grid. Removed the two redundant sections, made the three introductory paths useful immediately, and moved future services into a small, clearly labelled area. Existing botanical imagery, topics, herb profiles and source story remain.
- The empty search page competed with search through a large second onboarding experience. It now offers three short browse links and a saved-record shortcut when useful.
- Search results need reading priority. The search heading contracts, prompts disappear, and result cards use a consistent single-column reading order. Preparation is the primary action; Buy and Consult are quieter secondary actions. Safety and source verification remain visible; supporting source details remain expandable.
- Consultation previously showed an editable form and a duplicate review below it. Review now replaces the form, receives keyboard focus, and has an Edit action that preserves values and restores input focus. Optional personal context is disclosed; it opens automatically for an existing demographic selection. Notes remain in page memory only.

## Interaction and visual system

Retained the botanical palette and imagery. Added a consistent corner radius, restrained spacing, short state-entry motion, clear focus outlines, a search-clear action that retains input focus, and a search-completion status announcement. Motion respects reduced-motion preferences. Mobile navigation has four larger targets; optional controls and existing age/gender inputs remain accessible.

`src/minimalism.css` is the final refinement stylesheet; earlier design layers remain for compatibility with other platform screens. No new dependencies, generated imagery, canonical records, evidence classifications, product data or practitioner data were introduced.

## Validation

- TypeScript, production build and the existing safety, corpus, comparison, deep-link and rendering suites.
- Browser regression coverage across 15 destinations at 6 viewport widths, including dark mode, reduced motion, source disclosures, images and navigation.
- Added browser assertions for clearing search and retaining focus, the simplified browsing options, four mobile destinations, review focus, editing without losing context, and compact result state.

Live catalogue/checkout and physician booking integrations remain unavailable. The production bundle still has its existing size warning; this pass does not claim a performance optimization or conversion lift.
