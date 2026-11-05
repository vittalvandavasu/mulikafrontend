# Conversational discovery and external research

## Connected experience

Search now starts with a plain-language answer, up to three source-linked observations, and safety or ingredient responses tailored to the question. Exact source-page actions, record cards, evidence drawers, preparation, buying availability and consultation remain connected to the canonical records.

Follow-up questions retain the current topic. Naming a different subject starts a new topic. Up to six questions can be revisited in the current session with their result, filters and optional demographic snapshot. Recent follow-ups store their resolved query so they can be searched independently. Consultation carries both a follow-up question and its subject; opening a journey from a herb or ailment uses that selection rather than an unrelated earlier search. Unsupported Make links are omitted when no records exist.

This is source-grounded conversational presentation and deterministic topic handling, not an unrestricted medical chatbot. It does not promise Google-level coverage or validated treatment recommendations.

## Retrieval consistency

Server and static-hosting fallback share `searchUnderstanding.ts`: Unicode-preserving normalization, conversational stop-word removal, whole-term matching, canonical English/regional herb aliases, and limited explicit topic synonym groups. It does not diagnose or equate every symptom with a disease. Source/category filters still apply to manuscript retrieval. Search requests time out to the bundled corpus and superseded requests are cancelled.

Removed generic scientific-constituent and dietary fallback claims, and institutional homepages previously emitted as if they were claim-specific scientific references. AI synthesis can no longer populate ungrounded modern, dietary or safety fields. Existing manuscript citation validation remains in place.

## Beyond manuscripts

A separate, working Europe PMC integration retrieves PubMed-indexed publication metadata and source-linked abstract excerpts. Users review/edit a topic and select **Search published research**, or jump there directly from the conversational answer. A missing manuscript match never disables this search. Results are publication matches, not clinically appraised evidence and never promote a manuscript evidence tier.

Only the displayed research topic is sent. Age, gender and consultation notes are not transmitted. No external request happens until the user searches. No API key is needed; public API responses support browser CORS, allowing the feature to work on static deployments. There are distinct loading, empty, failure and retry states, a 12-second timeout, cancellation on unmount, schema checks, duplicate removal and fixed-provider source URLs. External markup is rendered as plain text.

Provider documentation: https://europepmc.org/RestfulWebService

## Verification

- TypeScript and production build.
- Existing provenance, corpus, comparison, deep-link and rendering suites.
- New retrieval, aliases, follow-up, filtering, no-match, research validation, failure and cancellation tests.
- Production API vs bundled-corpus consistency checks using `npx tsx scripts/verify-search-server.ts` after building.
- Browser tests cover conversation restoration, topic transfer to consultation, source links, intentional external search, research errors without losing local results, no-match recovery and 90 responsive route checks.
- Live Europe PMC request verified HTTP 200, valid publication metadata and CORS support; automated browser fixtures keep regressions independent of third-party uptime.

Search relevance is not a measured quality benchmark. Current retrieval uses a bounded corpus and explicit aliases, not semantic embeddings or automatic correction of arbitrary misspellings. Shopping and physician booking remain unavailable integrations. The existing large-bundle warning remains.
