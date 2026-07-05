# God Mode Portfolio — Mohamed Mahmoud

One portfolio that fully transforms into **five distinct brand-styled worlds** — Razer, Disney+,
Call of Duty, Netflix and Spotify — plus a neutral **Hub** that lets you choose an identity.
Same real story, five completely different bodies: colors, type, motion, cursor and transitions all swap.

> **A design tribute / style study — not affiliated with these brands.**
> Every wordmark is an original **MOHAMED** mark drawn in each brand's *aesthetic* — no lifted logos.

**Live:** https://engineeringprojectswork-droid.github.io/god-mode-portfolio/

## The five identities

| Route | Framing | Signature motion |
|---|---|---|
| `/` | **God Mode** hub | Character-select of the five identities + hero number |
| `/razer` | **Mohamed // Loadout** | Chroma RGB sweep · scanline boot · grid parallax · border-trace · count-up · glitch |
| `/disney` | **Mohamed Originals** | Castle + gold arc-sweep + fireworks boot · starfield parallax · shimmer-swipe reveals |
| `/cod` | **Operator: Mohamed** | "DEPLOYING…" bar + coordinate typing · radar + blips · tracers · rain · target-lock · screen-shake |
| `/netflix` | **Now Watching: Mohamed** | "Who's watching?" profile gate → zoom · Ken Burns billboard · rows · Top-10 |
| `/spotify` | **This Is Mohamed** | Pinned now-playing bar · equalizer · morphing blob · text-sheen · color-bleed |

## Stack & architecture

- **Astro 5 + TypeScript** — static output, one content model → five skins.
- **CSS-custom-property theme engine** — `[data-theme="…"]` swaps a full token set
  (`--bg`, `--accent`, `--font-d`, `--radius`, `--shadow`, …). See `src/styles/global.css`.
- **Vanilla JS / Canvas motion** — IntersectionObserver reveals, `requestAnimationFrame`
  canvases (starfield, fireworks), scroll parallax. No heavy animation library → tiny bundle,
  high Lighthouse. Every effect honors `prefers-reduced-motion` with a static fallback.
- **Per-theme fonts loaded on demand** — each route pulls only its own Google Fonts.
- **Persistent switcher dock** + **custom per-theme cursor**; each theme plays its own
  signature boot/switch-in transition on navigation.

### Key files
- `src/data/profile.ts` — the single source of truth (all real content). No hardcoded copy in components.
- `src/lib/themes.ts` — per-theme metadata + framing copy.
- `src/lib/wordmarks.ts` — the five inline MOHAMED wordmarks.
- `src/layouts/Base.astro` — shell, fonts, cursor, boot dismissal, reveal/count-up controller.
- `src/components/{Hub,Netflix,Spotify,Razer,Cod,Disney}.astro` — the bespoke per-theme worlds.

## Content & truthfulness guardrails

All numbers are Mohamed's real, verified data — never inflated:
- Hero: **1,000,000+** followers grown · **$0.84** per lead · **1** person.
- **45 active leads** (lead generation → **0 closed sales**; deals are closed downstream).
- 1M+ follower growth and 2025 ad figures are **self-reported** → rendered with an asterisk.
- Shipped software is **spec-driven / AI-assisted** — Mohamed architects and directs the build.

## Develop

```bash
npm install
npm run dev      # http://localhost:4321/god-mode-portfolio/
npm run build    # → dist/
npm run preview
```

## Deploy

Pushes to `main` build and publish to **GitHub Pages** via `.github/workflows/deploy.yml`
(`withastro/action` → `actions/deploy-pages`). `site` + `base` are set in `astro.config.mjs`.
