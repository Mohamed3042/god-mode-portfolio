# God Mode Portfolio 2.0.0 — calm-pass gates

Date: 2026-08-23

Branch: `calm-pass/2.0.0`

Preview under test: `http://127.0.0.1:4321/god-mode-portfolio/`

Configured public URL: `https://mohamed3042.github.io/god-mode-portfolio/`

The release branch is green and ready for the owner to merge. Per the dispatch, this work did not push `main` and did not trigger the public Pages deployment.

## Fail-first → final

| Gate | 1.0.0 baseline | 2.0.0 final | Result |
| :-- | :-- | :-- | :-- |
| `npm run check` | RED — 3 TypeScript nullability errors | 0 errors, 0 warnings, 0 hints | PASS |
| `npm run build` | 8 static routes built | 8 static routes built | PASS |
| `npm run verify:calm` | 91 / 236 passed; 145 failed | 244 / 244 passed; 0 failed | PASS |
| Mobile Lighthouse performance | 78 | 100 | PASS — budget ≥ 90 |
| Mobile Lighthouse accessibility | 94 | 100 | PASS — budget ≥ 95 |
| Mobile LCP | 3,795 ms | 794 ms | PASS — budget ≤ 2,500 ms |
| Mobile CLS | 0 | 0.000075 | PASS — budget ≤ 0.1 |
| Mobile TBT | 0 ms | 5 ms | PASS |

The final Lighthouse run used Lighthouse 13.4.1 and Chrome 151.0.7922.173 with the mobile preset. The retained Google Fonts stylesheets load off the render path, so the fallback paint is immediate and the identity faces can swap in without measurable layout shift.

## `verify:calm` coverage

| Surface | Automated coverage | Final |
| :-- | :-- | :-- |
| Route × viewport | 8 routes × phone 390×844 and desktop 1440×900 × 12 checks | 192 / 192 |
| Reduced motion | 8 routes × active query, no boot gate, no hidden reveal, no long animation, formatted static proof | 40 / 40 |
| Endpoint / public-host checks | 8 routes + `robots.txt` + `sitemap.xml` return 200; sitemap and canonical host checks | 12 / 12 |
| Total | Navigation ≤ 5, primary blocks ≤ 5, fixed strip ≤ 40 px, question present, menu reachability, no page overflow, fragments, canonical, OG URL/image, version | **244 / 244** |
| Runtime console audit | 8 routes × normal/reduced motion; page errors, console errors, and failed requests | 16 / 16 clean |

The fail-first report is [`baseline/verify-calm.json`](baseline/verify-calm.json); the green report is [`final/verify-calm.json`](final/verify-calm.json).
The final harness adds one reduced-motion number-format check per route, so its denominator is eight higher; every one of the original 236 checks remains represented.

## Visual evidence

| Evidence | Baseline | Final |
| :-- | :-- | :-- |
| Route screenshots | 24 — all 8 routes at 390×844, 768×1024, and 1440×900 | 24 — same matrix, reduced motion |
| Contact sheet | n/a | [`final/contact-sheet.png`](final/contact-sheet.png) |
| Before / after human-eye sheet | — | [`review/REVIEW_SHEET_calm-pass-v2.html`](review/REVIEW_SHEET_calm-pass-v2.html), 21 questions / 20 embedded images |

The agent review caught one clipped Samsung proof value at desktop and phone sizes. The proof row was reflowed, all 24 final screenshots were recaptured, and the complete `1,000,000+*`, `$0.84`, and `1` values are now visible. The review sheet smoke run verified numbered keyboard choices, A/B, X-ray, invert, diff, a drawn mark, the explicit nothing-to-mark path, finish, and JSON export.

The website flavour has no undoable user data, so the classic switch, undo stack, motion trace, and move→undo GIF are not applicable under calm-ui SPEC §6. Git history is the fallback.

## Release receipt

- Version: package manifest and visible footer report `2.0.0`.
- Notes: [`docs/RELEASE-NOTES-2.0.0.md`](../../RELEASE-NOTES-2.0.0.md) is in the site’s language.
- Reproducibility: a fresh `npm ci` succeeded; it reports the same baseline 8 dependency advisories (1 low, 7 high), so no out-of-scope automatic audit rewrite was applied.
- First-touch handoff: branch `calm-pass/2.0.0`; owner merge command is shown below. The existing Pages workflow will keep one configured public URL after the merge.
- Owner notes: the owner answer and decisions were committed alone first; status is flipped to complete in this branch.
- Profile facts, metrics, wordmarks, tribute boundary, and GitHub Pages workflow: unchanged.
- Deviations from FOLLOW: public deployment is intentionally pending the owner’s merge because the dispatch explicitly forbids this agent from pushing `main`.
- NEVER violations: **0**.

`RL 001: applied — exact branch and owner merge command supplied; one configured Pages URL after merge`

`RL 002: applied — the dispatch’s owner answers and every visible decision are recorded in docs/OWNER-NOTES.md; no unasked fork was silently chosen`

`RL 003: n/a — this portfolio has no record/date state; src/data/profile.ts remains byte-identical to main`

`RL 004: n/a — this is portfolio route navigation, not a repeatedly operated record table, card, form, or board`

## This one

```sh
git fetch origin calm-pass/2.0.0
git switch main
git pull --ff-only
git merge --no-ff origin/calm-pass/2.0.0
git push origin main
```
