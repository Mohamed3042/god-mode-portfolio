/**
 * themes.ts — per-theme metadata + framing copy.
 * The truthful CONTENT lives in profile.ts; this file only reframes it
 * into each brand's metaphor (Razer loadout, Netflix titles, Spotify tracks…).
 * Never the company name — the person is Mohamed; every wordmark spells MOHAMED.
 */

export type ThemeId = 'hub' | 'razer' | 'disney' | 'cod' | 'netflix' | 'spotify' | 'apple' | 'samsung';

export interface ThemeMeta {
  id: ThemeId;
  /** switcher dock label */
  label: string;
  /** route path (without base) */
  route: string;
  /** primary accent (hex, for JS-driven canvas / transitions / cursor) */
  accent: string;
  accent2: string;
  /** Google Fonts stylesheet href — loaded only on this theme's page */
  fontsHref: string;
  /** signature switch-in transition */
  transition: {
    /** overlay headline */
    text: string;
    /** which transition routine to run */
    kind: 'boot' | 'zoom' | 'deploy' | 'warp' | 'bleed' | 'hub' | 'spot' | 'ring';
  };
  copy: {
    kicker: string;
    /** framing banner near the wordmark, e.g. "Operator: Mohamed" */
    banner: string;
    lede: string;
    teamTitle: string;
    flagTitle: string;
    /** metaphor label stamped on each stat card */
    cardLabel: string;
    /** metaphor label stamped on each flagship tile */
    flagLabel: string;
    cta1: string;
    cta2: string;
  };
}

export const THEMES: Record<ThemeId, ThemeMeta> = {
  hub: {
    id: 'hub',
    label: '◇ Hub',
    route: '/',
    accent: '#7c5cff',
    accent2: '#3ad1ff',
    fontsHref:
      'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap',
    transition: { text: 'GOD MODE', kind: 'hub' },
    copy: {
      kicker: 'GOD MODE · CHOOSE AN IDENTITY',
      banner: 'MOHAMED',
      lede:
        'One portfolio. Five completely different worlds — each with its own colors, type, motion and transitions. Same real story. Pick an identity.',
      teamTitle: 'The team you replace',
      flagTitle: 'Shipped systems',
      cardLabel: 'ROLE',
      flagLabel: 'BUILD',
      cta1: '▶ View Work',
      cta2: '+ Hire Me',
    },
  },

  razer: {
    id: 'razer',
    label: 'Razer',
    route: '/razer',
    accent: '#44D62C',
    accent2: '#00E0FF',
    fontsHref:
      'https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@400;500;600;700&family=Share+Tech+Mono&display=swap',
    transition: { text: 'CHROMA ENABLED', kind: 'boot' },
    copy: {
      kicker: 'PERFORMANCE MARKETING // ONE OPERATOR',
      banner: 'Mohamed // Loadout',
      lede:
        'A one-operator performance rig. Paid social, content, CRM and automation — overclocked and tuned like a gaming machine.',
      teamTitle: 'Loadout · Specs',
      flagTitle: 'Installed Modules',
      cardLabel: 'SPEC',
      flagLabel: 'MODULE',
      cta1: '⚡ Run Benchmark',
      cta2: '+ Add to Rig',
    },
  },

  disney: {
    id: 'disney',
    label: 'Disney+',
    route: '/disney',
    accent: '#00A8E1',
    accent2: '#E8C87A',
    fontsHref:
      'https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800&family=Mulish:wght@400;600;700&display=swap',
    transition: { text: '✦ Mohamed Originals ✦', kind: 'warp' },
    copy: {
      kicker: 'MOHAMED ORIGINALS',
      banner: 'Mohamed Originals',
      lede:
        'A premium catalog of Originals — every role a featured series, every system a season. A whole marketing team in one hire.',
      teamTitle: 'Featured Originals',
      flagTitle: 'Featured Series',
      cardLabel: 'ORIGINAL',
      flagLabel: 'SERIES',
      cta1: '▶ Play',
      cta2: '+ Watchlist',
    },
  },

  cod: {
    id: 'cod',
    label: 'Call of Duty',
    route: '/cod',
    accent: '#FF7A00',
    accent2: '#8FA31E',
    fontsHref:
      'https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600&family=Saira+Stencil+One&family=Share+Tech+Mono&display=swap',
    transition: { text: 'DEPLOYING…', kind: 'deploy' },
    copy: {
      kicker: 'OPERATOR FILE · CLASSIFIED',
      banner: 'Operator: Mohamed',
      lede:
        'Callsign Mohamed. Class: full-stack marketer. Missions completed, killstreak confirmed, systems shipped under fire.',
      teamTitle: 'Missions Complete',
      flagTitle: 'Ops Completed',
      cardLabel: 'DOG TAG',
      flagLabel: 'OP',
      cta1: '▣ DEPLOY',
      cta2: '+ SQUAD',
    },
  },

  netflix: {
    id: 'netflix',
    label: 'Netflix',
    route: '/netflix',
    accent: '#E50914',
    accent2: '#ff4d57',
    fontsHref:
      'https://fonts.googleapis.com/css2?family=Anton&family=Archivo:wght@400;600;700;900&display=swap',
    transition: { text: 'MOHAMED', kind: 'zoom' },
    copy: {
      kicker: 'NEW · TOP 10 THIS WEEK',
      banner: 'Now Watching: Mohamed',
      lede:
        'Now watching: a whole marketing team in one hire. Grew a channel past a million. Leads under a dollar. Ships its own software.',
      teamTitle: 'Top 10 Wins This Year',
      flagTitle: 'Mohamed Originals',
      cardLabel: 'TITLE',
      flagLabel: 'ORIGINAL',
      cta1: '▶ Play',
      cta2: '+ My List',
    },
  },

  spotify: {
    id: 'spotify',
    label: 'Spotify',
    route: '/spotify',
    accent: '#1DB954',
    accent2: '#1ed760',
    fontsHref:
      'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap',
    transition: { text: '▶ This Is Mohamed', kind: 'bleed' },
    copy: {
      kicker: 'VERIFIED ARTIST',
      banner: 'This Is Mohamed',
      lede:
        '1,000,000+ monthly listeners*. Top tracks: $0.84 per lead, 1M+ follower growth, 142 résumés parsed. On repeat all year.',
      teamTitle: 'Popular · Top Skills',
      flagTitle: 'Shipped Systems',
      cardLabel: 'TRACK',
      flagLabel: 'TRACK',
      cta1: '▶ Play',
      cta2: 'Follow',
    },
  },

  apple: {
    id: 'apple',
    label: 'Apple',
    route: '/apple',
    accent: '#2997ff',
    accent2: '#a86bff',
    // Apple uses the native system font stack — no web font to load.
    fontsHref: '',
    transition: { text: 'Think Different', kind: 'spot' },
    copy: {
      kicker: 'THINK DIFFERENT',
      banner: 'Think Different',
      lede:
        'Media buying, organic growth, creative, ops, strategy and automation. One operator. Bilingual AR / EN, based in Kuwait.',
      teamTitle: 'Get to know the operator.',
      flagTitle: 'Shipped. Live. Yours to see.',
      cardLabel: 'OPERATOR',
      flagLabel: 'BUILD',
      cta1: 'Watch the reel ›',
      cta2: 'Learn more ›',
    },
  },

  samsung: {
    id: 'samsung',
    label: 'Samsung',
    route: '/samsung',
    accent: '#3562ff',
    accent2: '#12b6ff',
    fontsHref: 'https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&display=swap',
    transition: { text: 'Mohamed Ultra', kind: 'ring' },
    copy: {
      kicker: 'GALAXY · MOHAMED ULTRA',
      banner: 'Mohamed Ultra',
      lede:
        'One operator engineered for scale — paid, organic, creative, ops, strategy and automation, in a single hire.',
      teamTitle: 'Full specifications',
      flagTitle: 'The lineup',
      cardLabel: 'SPEC',
      flagLabel: 'MODEL',
      cta1: 'Discover ›',
      cta2: 'See the specs ›',
    },
  },
};

export const THEME_ORDER: ThemeId[] = ['hub', 'razer', 'disney', 'cod', 'netflix', 'spotify', 'apple', 'samsung'];

/** the 7 switchable brand identities (excludes hub) */
export const BRAND_THEMES: ThemeId[] = ['razer', 'disney', 'cod', 'netflix', 'spotify', 'apple', 'samsung'];

export function getTheme(id: ThemeId): ThemeMeta {
  return THEMES[id];
}
