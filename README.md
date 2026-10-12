# God Mode Portfolio — Mohamed Mahmoud

One portfolio that fully transforms into **seven distinct brand-styled worlds** — Razer, Disney+,
Call of Duty, Netflix, Spotify, Apple and Samsung — plus a neutral **Hub** that lets you choose an identity.
Same real story, seven distinct voices: color, type, hierarchy and atmosphere all shift while the facts stay fixed.

> **A design tribute / style study — not affiliated with these brands.**
> Every wordmark is an original **MOHAMED** mark drawn in each brand's *aesthetic* — no lifted logos.

**Live:** https://mohamed3042.github.io/god-mode-portfolio/

## The seven identities

| Route | Framing | Visual language |
|---|---|---|
| `/` | **God Mode** hub | Calm seven-world selector followed by shared proof |
| `/razer` | **Mohamed // Loadout** | Chroma sweep · gaming grid · border trace · restrained glitch |
| `/disney` | **Mohamed Originals** | Royal starfield · gold typography · premium Originals cards |
| `/cod` | **Operator: Mohamed** | Classified operator file · radar · blips · rain · target-lock |
| `/netflix` | **Now Watching: Mohamed** | Cinematic billboard · content rows · Top-10 |
| `/spotify` | **This Is Mohamed** | Pinned now-playing bar · equalizer · morphing blob · text-sheen · color-bleed |
| `/apple` | **Think Different** | Floating orbs · gradient headline · glass cards · titanium operator card · bento builds |
| `/samsung` | **Mohamed Ultra** | Cosmic ring · orbiting particles · starfield · spec-sheet rows · glowing model cards |

## Stack & architecture

- **Astro 5 + TypeScript** — static output, one content model → seven skins.
- **CSS-custom-property theme engine** — `[data-theme="…"]` swaps a full token set
  (`--bg`, `--accent`, `--font-d`, `--radius`, `--shadow`, …). See `src/styles/global.css`.
- **Vanilla JS / Canvas atmosphere** — lightweight starfields and restrained parallax on the
  identity pages, with no load gate or count-up choreography. Every effect honors
  `prefers-reduced-motion` with an immediate static fallback.
- **Per-theme fonts loaded on demand** — each route pulls only its own Google Fonts.
- **Persistent calm switcher + orientation strip** — previous/current/next at a glance,
  all eight routes in a two-step disclosure, and a visible question/next-action line.

### Key files
- `src/data/profile.ts` — the single source of truth (all real content). No hardcoded copy in components.
- `src/lib/themes.ts` — per-theme metadata + framing copy.
- `src/lib/wordmarks.ts` — the seven inline MOHAMED wordmarks.
- `src/layouts/Base.astro` — shared shell, public metadata, and asynchronous per-theme fonts.
- `src/components/{Hub,Netflix,Spotify,Razer,Cod,Disney,Apple,Samsung}.astro` — the bespoke per-theme worlds.

## Content & truthfulness guardrails

All numbers are Mohamed's real, verified data — never inflated:
- Hero: **1,000,000+** followers grown · **$0.84** per lead · **1** person.
- **45 active leads** (lead generation → **0 closed sales**; deals are closed downstream).
- 1M+ follower growth and 2025 ad figures are **self-reported** → rendered with an asterisk.
- Shipped software is **spec-driven / AI-assisted** — Mohamed architects and directs the build.

## Develop

```bash
npm ci
npm run dev      # http://localhost:4321/god-mode-portfolio/
npm run build    # → dist/
npm run preview
```

## Deploy

Pushes to `main` build and publish to **GitHub Pages** via `.github/workflows/deploy.yml`
(`withastro/action` → `actions/deploy-pages`). `site` + `base` are set in `astro.config.mjs`.
