# Botanical imagery across Mulika

BotanicalBanner provides decorative, labelled editorial scenes across all main routes and Saved records. Existing page headings, forms, records, source scans, and search behavior are preserved. Search and reader headers are compact. Images have empty alt text because adjacent editorial captions communicate their purpose; they are not identification images or manuscript evidence. Print views omit them.

Assets are generated with the built-in image-generation tool and optimized into local WebP files, with separate 768px mobile versions. No remote image service is needed.

Files: src/components/BotanicalBanner.tsx, src/botanical-pages.css, src/App.tsx, src/main.tsx, src/components/SavedRemediesDrawer.tsx, scripts/verify-codex.cjs, and public/images/{garden,infusion,reading}{,-mobile}.webp.

## Final prompts

Each prompt starts: “Create one landscape 1536x1024 premium photographic editorial image for Mulika herbal knowledge website.”

- garden: “A lush quiet botanical garden detail, layered green leaves with dew and soft morning light, earthy muted sage forest green palette, photographic editorial natural texture, no identifiable species claim.”
- infusion: “A warm ivory linen tabletop with amber glass infusion bottle, ceramic bowl, dried leaves, roots and wooden spoon, soft sunlit shadows, tactile premium botanical editorial still life.”
- reading: “An open blank handmade paper notebook beside dried leaves, a pencil and folded linen on warm dark wood, soft natural light, contemporary botanical reading atelier, no writing or printed text.”

Each ends: “Spacious refined composition, authentic material textures, warm restrained colour, no logos, no lettering, no collage, no medical claims. Decorative illustrative scene.”

Community reuses the existing preparation-editorial.png homepage image. Replace generated artwork with commissioned or licensed photography when available; no backend changes are needed.
