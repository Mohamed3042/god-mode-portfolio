/**
 * Prefix an internal path with the configured base (for GitHub Pages project site).
 * withBase('/razer') -> '/god-mode-portfolio/razer'
 * withBase('/')      -> '/god-mode-portfolio/'
 */
export function withBase(path: string): string {
  const raw = import.meta.env.BASE_URL || '/';
  const base = raw.endsWith('/') ? raw.slice(0, -1) : raw;
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${base}${p}`;
}
