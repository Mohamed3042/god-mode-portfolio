/**
 * wordmarks.ts — the 5 MOHAMED wordmarks (+ a hub mark), inline & themeable.
 * These are ORIGINAL marks styled in each brand's aesthetic — NOT lifted logos.
 * Background rects from the source SVGs are stripped so each sits on its theme bg.
 * Every mark spells MOHAMED. Never the company name.
 */
import type { ThemeId } from './themes';

export const WORDMARKS: Record<ThemeId, string> = {
  hub: `<svg class="wm" viewBox="0 0 700 150" role="img" aria-label="Mohamed" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="wm-hub" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#a48bff"/><stop offset="1" stop-color="#3ad1ff"/></linearGradient></defs><text x="8" y="104" font-family="'Space Grotesk',system-ui,sans-serif" font-weight="700" font-size="92" letter-spacing="2" fill="url(#wm-hub)">MOHAMED</text></svg>`,

  razer: `<svg class="wm" viewBox="0 0 620 140" role="img" aria-label="Mohamed" xmlns="http://www.w3.org/2000/svg"><g transform="translate(10,4)"><g transform="skewX(-7)"><text x="10" y="90" font-family="'Chakra Petch',sans-serif" font-weight="700" font-size="96" letter-spacing="3" fill="#44D62C">MOHAMED</text></g><rect x="4" y="108" width="150" height="5" fill="#44D62C"/><rect x="162" y="108" width="26" height="5" fill="#44D62C" opacity="0.5"/><rect x="196" y="108" width="10" height="5" fill="#00E0FF" opacity="0.85"/></g></svg>`,

  disney: `<svg class="wm" viewBox="0 0 720 128" role="img" aria-label="Mohamed" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="wm-gold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F6E9BE"/><stop offset="1" stop-color="#C79A45"/></linearGradient></defs><g transform="translate(8,2)"><text x="8" y="94" font-family="'Cinzel',serif" font-weight="800" font-size="80" letter-spacing="8" fill="url(#wm-gold)">MOHAMED<tspan font-size="46" dy="-28" fill="#00A8E1">+</tspan></text></g></svg>`,

  cod: `<svg class="wm" viewBox="0 0 740 118" role="img" aria-label="Mohamed" xmlns="http://www.w3.org/2000/svg"><g transform="translate(6,2)"><text x="6" y="78" font-family="'Saira Stencil One',sans-serif" font-size="66" letter-spacing="5" fill="#ECE8D6">MOHAMED</text><rect x="6" y="96" width="70" height="7" fill="#FF7A00"/><g transform="translate(548,6)"><rect width="140" height="30" fill="#0b0b07"/><rect width="6" height="30" fill="#FF7A00"/><text x="18" y="21" font-family="'Share Tech Mono',monospace" font-size="14" letter-spacing="4" fill="#9d9c83">CLASSIFIED</text></g></g></svg>`,

  netflix: `<svg class="wm" viewBox="0 0 660 168" role="img" aria-label="Mohamed" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="wm-red" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FF2A32"/><stop offset="1" stop-color="#A80009"/></linearGradient></defs><text x="10" y="132" font-family="'Anton',sans-serif" font-size="120" letter-spacing="1" fill="url(#wm-red)" transform="matrix(1,0,0,1.06,0,0)">MOHAMED</text></svg>`,

  spotify: `<svg class="wm" viewBox="0 0 700 138" role="img" aria-label="Mohamed" xmlns="http://www.w3.org/2000/svg"><text x="10" y="102" font-family="'Montserrat',sans-serif" font-weight="800" font-size="86" letter-spacing="-3" fill="#1DB954">MOHAMED</text><circle cx="648" cy="40" r="12" fill="#1DB954"/></svg>`,

  apple: `<svg class="wm" viewBox="0 0 640 118" role="img" aria-label="Mohamed" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="wm-silver" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fbfbfd"/><stop offset="1" stop-color="#b6b6bd"/></linearGradient></defs><text x="6" y="86" font-family="-apple-system,'Helvetica Neue',Helvetica,Arial,sans-serif" font-weight="600" font-size="86" letter-spacing="-4" fill="url(#wm-silver)">MOHAMED</text></svg>`,

  samsung: `<svg class="wm" viewBox="0 0 700 118" role="img" aria-label="Mohamed" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="wm-sam" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#f4f6ff"/><stop offset="1" stop-color="#3562ff"/></linearGradient></defs><text x="6" y="86" font-family="'Sora',sans-serif" font-weight="700" font-size="82" letter-spacing="1" fill="url(#wm-sam)">MOHAMED</text></svg>`,
};

export function wordmark(id: ThemeId): string {
  return WORDMARKS[id];
}
