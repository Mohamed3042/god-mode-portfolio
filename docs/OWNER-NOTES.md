# Owner Notes

## 2026-08-23 — calm-ui: calm interface + undo and motion

**Status:** in progress

**Owner answers (verbatim):** “1. YES is there more though ? or just those ? 2. why not 3. b 4. a 5. a 6. b 7. c 8. c   mk-editor -> cake --> spaceframe -->reclaim -->quotation locker --> quotation builder -> rest doesnt matter”

### Decisions for this repository

- Ship one major `2.0.0` calm-interface release across the hub and all seven identity pages.
- Keep each identity’s accent, typography, voice, wordmark treatment, and tribute-only rule; do not add lifted logos or trademarks.
- Freeze profile facts, project numbers, and site logic. This pass changes hierarchy, navigation, reading measure, reduced-motion behavior, performance, and metadata only.
- The hub answers “Which world?” and each identity page answers “Who is he, in this voice?” with no more than five primary blocks above the fold and no more than five navigation items.
- Fix the canonical/sitemap/Open Graph host to `https://mohamed3042.github.io` while retaining the existing Astro GitHub Pages workflow.
- Website exception: no classic-mode switch and no undo stack; Git history is the fallback, as defined by calm-ui SPEC §6.
- Google Fonts may remain if self-hosting would weaken an identity. Any retained runtime font dependency must not cause layout shift.
- Work only on branch `calm-pass/2.0.0`. The owner merges; this branch must never push directly to `main`.

