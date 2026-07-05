/**
 * profile.ts — THE single source of truth for all content.
 * Every theme renders from this object. No hardcoded copy in components.
 *
 * TRUTHFULNESS SPINE (do not alter without Mohamed's sign-off):
 *  - 45 active leads (NOT 207).  0 closed sales (lead-gen, not revenue).
 *  - 1M growth + 2025 ad figures are SELF-REPORTED → rendered with an asterisk.
 *  - Shipped software is spec-driven / AI-assisted / architected by Mohamed.
 *  - The person is Mohamed Mahmoud ("Mohamed"). Never the company name anywhere.
 */

export interface HeroStat {
  value: string;
  label: string;
  /** self-reported metric → show the asterisk + footnote */
  selfReported?: boolean;
}

export interface TeamCard {
  id: string;
  /** the "role" you replace */
  role: string;
  /** short punchy headline */
  headline: string;
  /** supporting detail sentence */
  detail: string;
  /** the single big number for this card */
  metric: string;
  metricLabel: string;
  /** 0–100, drives level/XP/benchmark bars */
  level: number;
  selfReported?: boolean;
}

export interface Flagship {
  id: string;
  tag: string;
  name: string;
  detail: string;
  stack: string;
  /** short metric chips */
  metrics: string[];
}

export interface Profile {
  identity: {
    name: string;
    short: string;
    role: string;
    roleShort: string;
    tagline: string;
    location: string;
    experience: string;
    education: string;
    languages: string;
    contact: {
      phone: string;
      email: string;
      linkedin: string;
      linkedinUrl: string;
    };
  };
  heroLine: string;
  heroStats: HeroStat[];
  team: TeamCard[];
  flagships: Flagship[];
  about: {
    /** the AI-assisted honesty framing (must appear on the page) */
    honesty: string;
    /** the truthfulness footnote (leads / sales / self-reported) */
    truth: string;
    /** short bio paragraph */
    bio: string;
  };
  footer: {
    tribute: string;
    line: string;
  };
}

export const profile: Profile = {
  identity: {
    name: 'Mohamed Mahmoud',
    short: 'Mohamed',
    role: 'Digital Marketing Specialist — Paid Social · Content · Marketing-Ops & AI Automation',
    roleShort: 'Digital Marketing Specialist',
    tagline: 'A whole marketing team in one hire.',
    location: 'Kuwait',
    experience: '~4 years social & content + ~1 year full-stack solo marketer',
    education: 'BSc Artificial Intelligence — Egyptian Russian University (2020–2024)',
    languages: 'Arabic (native) · English (fluent) — bilingual, RTL-ready',
    contact: {
      phone: '+965 9933 8996',
      email: 'medo433447@gmail.com',
      linkedin: '/in/mohamed-mahmoud-5a748b243',
      linkedinUrl: 'https://www.linkedin.com/in/mohamed-mahmoud-5a748b243',
    },
  },

  heroLine: '1,000,000+ followers grown · $0.84 per lead · 1 person',

  heroStats: [
    { value: '1,000,000+', label: 'Followers grown', selfReported: true },
    { value: '$0.84', label: 'Cost per lead' },
    { value: '1', label: 'Person · a full team' },
  ],

  team: [
    {
      id: 'media-buyer',
      role: 'Media Buyer',
      headline: 'Meta ads → $0.84 / lead',
      detail:
        '~878K cumulative impressions and 420+ WhatsApp leads from paid social. Best campaign hit $0.50 per lead.',
      metric: '$0.84',
      metricLabel: 'cost per lead',
      level: 92,
    },
    {
      id: 'social',
      role: 'Social Media Manager',
      headline: '9.2K → 1M+ followers',
      detail:
        "Grew the Al-Ma'ali channel across platforms — Instagram 50K · TikTok 33K · YouTube 43K and beyond.",
      metric: '1M+',
      metricLabel: 'followers',
      level: 100,
      selfReported: true,
    },
    {
      id: 'content',
      role: 'Content / Creative',
      headline: '~254 production files',
      detail:
        'Including ~144 videos plus a full bilingual AR/EN brand and design system built from scratch.',
      metric: '254',
      metricLabel: 'assets shipped',
      level: 85,
    },
    {
      id: 'ops',
      role: 'Marketing Ops / Analyst',
      headline: '12-tab bilingual CRM',
      detail:
        'Designed and built from scratch. 45 active leads and 22 offers tracked across a full ad → lead funnel.',
      metric: '45',
      metricLabel: 'active leads',
      level: 88,
    },
    {
      id: 'manager',
      role: 'Marketing Manager',
      headline: '30-day campaign plan',
      detail:
        'Budget, placement, audience and country analysis authored from real CSV performance data.',
      metric: '30',
      metricLabel: 'day plan',
      level: 80,
    },
    {
      id: 'automation',
      role: 'Automation Engineer',
      headline: '7 scripts · 3 jobs · live site',
      detail:
        'Custom AI assistants, scheduled automations and a live company website. The rare marketer who ships software.',
      metric: '7',
      metricLabel: 'python scripts',
      level: 90,
    },
  ],

  flagships: [
    {
      id: 'website',
      tag: 'Live',
      name: 'Company Website',
      detail: 'Bilingual AR/EN marketing site, designed and shipped end-to-end.',
      stack: 'Astro · TypeScript · Tailwind',
      metrics: ['Lighthouse 96–98 / 100 / 100 / 100', 'Live in production'],
    },
    {
      id: 'hr',
      tag: 'Automation',
      name: 'HR Résumé Pipeline',
      detail: 'Automated intake that de-duplicates and ranks candidates from raw résumés.',
      stack: '7 Python scripts · 3 scheduled jobs',
      metrics: ['142 résumés → 100 deduped candidates', 'Runs unattended'],
    },
    {
      id: 'sheep',
      tag: 'Desktop App',
      name: 'Sheep Flock Manager',
      detail: 'Offline-first bilingual desktop app for livestock records.',
      stack: 'Python · SQLite',
      metrics: ['59 / 59 tests passing', 'CI-built for Windows + macOS'],
    },
    {
      id: 'rfq',
      tag: 'Ops',
      name: 'RFQ / Quotation Pipeline',
      detail: 'Consolidated six months of tender email into one actionable pipeline.',
      stack: 'Python · email parsing',
      metrics: ['23 tenders consolidated', 'Recovered 4 missed live tenders'],
    },
  ],

  about: {
    honesty:
      "The shipped software here is spec-driven and AI-assisted. I'm the architect, decision-maker, reviewer and operator — I direct AI build tools (like Claude Code) to ship real, working software under my direction. I don't claim to hand-code every line; I claim the results.",
    truth:
      '*Real, verified numbers only. 45 active leads — this is lead generation, so 0 closed sales (deals are closed downstream by the sales engineer). 1M+ follower growth and 2025 ad figures are self-reported.',
    bio:
      'One person operating as a whole marketing department: paid social, content and creative, a hand-built CRM, campaign strategy, and the automation and software that ties it all together. Four years growing social channels, plus a year running the full stack solo — with a BSc in Artificial Intelligence underneath it.',
  },

  footer: {
    tribute: 'A design tribute / style study — not affiliated with these brands.',
    line: 'Mohamed Mahmoud · Digital Marketing Specialist · Kuwait',
  },
};

export default profile;
