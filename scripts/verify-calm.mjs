#!/usr/bin/env node

import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { launch as launchChrome } from 'chrome-launcher';

const ROUTES = [
  { id: 'hub', path: '/' },
  { id: 'razer', path: '/razer' },
  { id: 'disney', path: '/disney' },
  { id: 'cod', path: '/cod' },
  { id: 'netflix', path: '/netflix' },
  { id: 'spotify', path: '/spotify' },
  { id: 'apple', path: '/apple' },
  { id: 'samsung', path: '/samsung' },
];

const FALLBACK_BLOCK_SELECTORS = {
  hub: ['.gm-kicker', '.gm-wordmark', '.gm-banner', '.gm-lede', '.gm-herostats', '.gm-cta', '#identities', '.hub-card'],
  razer: ['.rz-kicker', '.rz-wordmark', '.rz-banner', '.rz-lede', '.rz-hud', '.rz-bench', '.rz-cta', '#rz-specs'],
  disney: ['.dz-kicker', '.dz-wordmark', '.dz-banner', '.dz-logline', '.dz-rating', '.dz-cta', '#dz-originals'],
  cod: ['.cod-file-head', '.cod-radar', '.cod-kicker', '.cod-wordmark', '.cod-banner', '.cod-lede', '.cod-killstreak', '.cod-stats', '.cod-cta'],
  netflix: ['.nf-ribbon', '.nf-kicker', '.nf-wordmark', '.nf-banner', '.nf-logline', '.nf-meta', '.nf-cta', '#nf-rows'],
  spotify: ['.sp-sidebar', '.sp-avatar', '.sp-verified', '.sp-title', '.sp-listeners', '.sp-tagline', '.sp-controls', '#sp-tracks'],
  apple: ['.ap-wordmark', '.ap-head', '.ap-sub', '.ap-links', '.ap-keynote', '#ap-team'],
  samsung: ['.sm-kicker', '.sm-wordmark', '.sm-head', '.sm-sub', '.sm-cta', '.sm-strip', '#sm-specs'],
};

const GATE_VIEWPORTS = [
  { name: 'phone', width: 390, height: 844, mobile: true },
  { name: 'desktop', width: 1440, height: 900, mobile: false },
];

const SCREENSHOT_VIEWPORTS = [
  ...GATE_VIEWPORTS,
  { name: 'tablet', width: 768, height: 1024, mobile: true },
];

function option(name, fallback = '') {
  const prefix = `--${name}=`;
  return process.argv.find((arg) => arg.startsWith(prefix))?.slice(prefix.length) ?? fallback;
}

const mode = process.argv.includes('--baseline') ? 'baseline' : 'final';
const baseUrl = option('base-url', 'http://127.0.0.1:4321/god-mode-portfolio').replace(/\/$/, '');
const reportPath = option('report', `docs/evidence/2.0.0-calm-ui/${mode}/verify-calm.json`);
const screenshotDir = option('screenshot-dir', `docs/evidence/2.0.0-calm-ui/${mode}/screens`);
const captureScreenshots = process.argv.includes('--screenshots');
const expectedHost = 'mohamed3042.github.io';
const chromePath = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

class CdpClient {
  constructor(url) {
    this.url = url;
    this.nextId = 1;
    this.pending = new Map();
  }

  async connect() {
    this.socket = new WebSocket(this.url);
    await new Promise((resolve, reject) => {
      this.socket.addEventListener('open', resolve, { once: true });
      this.socket.addEventListener('error', reject, { once: true });
    });
    this.socket.addEventListener('message', (event) => {
      const payload = JSON.parse(String(event.data));
      if (!payload.id) return;
      const waiter = this.pending.get(payload.id);
      if (!waiter) return;
      this.pending.delete(payload.id);
      if (payload.error) waiter.reject(new Error(`${waiter.method}: ${payload.error.message}`));
      else waiter.resolve(payload.result);
    });
  }

  send(method, params = {}) {
    const id = this.nextId++;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject, method });
      this.socket.send(JSON.stringify({ id, method, params }));
    });
  }

  close() {
    this.socket?.close();
  }
}

function routeUrl(routePath) {
  return `${baseUrl}${routePath === '/' ? '/' : routePath}`;
}

async function openPage(port) {
  const target = await fetch(`http://127.0.0.1:${port}/json/new?${encodeURIComponent('about:blank')}`, { method: 'PUT' }).then((response) => response.json());
  const client = new CdpClient(target.webSocketDebuggerUrl);
  await client.connect();
  await Promise.all([
    client.send('Page.enable'),
    client.send('Runtime.enable'),
    client.send('Network.enable'),
  ]);
  await client.send('Page.addScriptToEvaluateOnNewDocument', {
    source: `
      try {
        for (const id of ${JSON.stringify(ROUTES.map((route) => route.id))}) sessionStorage.setItem('gm-boot-' + id, '1');
        sessionStorage.setItem('gm-nf-seen', '1');
      } catch {}
    `,
  });
  return client;
}

async function evaluate(client, expression) {
  const result = await client.send('Runtime.evaluate', {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });
  if (result.exceptionDetails) {
    const detail = result.exceptionDetails.exception?.description || result.exceptionDetails.exception?.value || result.exceptionDetails.text || 'Runtime evaluation failed';
    throw new Error(String(detail));
  }
  return result.result.value;
}

async function waitForReady(client) {
  const started = Date.now();
  while (Date.now() - started < 10_000) {
    const ready = await evaluate(client, `document.readyState === 'complete'`);
    if (ready) break;
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
  await evaluate(client, `new Promise(async (resolve) => {
    try { await document.fonts.ready; } catch {}
    requestAnimationFrame(() => requestAnimationFrame(() => setTimeout(resolve, 1100)));
  })`);
}

async function configureViewport(client, viewport, reduced = false) {
  await client.send('Emulation.setDeviceMetricsOverride', {
    width: viewport.width,
    height: viewport.height,
    deviceScaleFactor: 1,
    mobile: viewport.mobile,
    screenWidth: viewport.width,
    screenHeight: viewport.height,
  });
  await client.send('Emulation.setTouchEmulationEnabled', {
    enabled: viewport.mobile,
    maxTouchPoints: viewport.mobile ? 5 : 1,
  });
  await client.send('Emulation.setEmulatedMedia', {
    media: 'screen',
    features: [{ name: 'prefers-reduced-motion', value: reduced ? 'reduce' : 'no-preference' }],
  });
}

async function navigate(client, url) {
  await client.send('Page.navigate', { url });
  await waitForReady(client);
}

async function inspectPage(client, routeId) {
  const selectors = JSON.stringify(FALLBACK_BLOCK_SELECTORS[routeId]);
  return evaluate(client, `(() => {
    const isVisible = (el) => {
      const style = getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return style.display !== 'none' && style.visibility !== 'hidden' && Number(style.opacity) > 0.01 &&
        rect.width > 0 && rect.height > 0 && rect.bottom > 0 && rect.top < innerHeight;
    };
    const explicit = Array.from(document.querySelectorAll('[data-calm-block]'));
    const fallback = ${selectors}.flatMap((selector) => Array.from(document.querySelectorAll(selector)));
    const blocks = Array.from(new Set(explicit.length ? explicit : fallback)).filter(isVisible);
    const navItems = Array.from(document.querySelectorAll('.gm-switcher > a, .gm-switcher > button, .gm-switcher > details > summary')).filter(isVisible);
    const menuRoutes = Array.from(document.querySelectorAll('.gm-world-menu a[href]'))
      .map((a) => new URL(a.getAttribute('href'), location.href).pathname.replace(/\\\/$/, ''));
    const strip = document.querySelector('.gm-strip');
    const stripStyle = strip ? getComputedStyle(strip) : null;
    const animations = document.getAnimations().filter((animation) => {
      const timing = animation.effect?.getComputedTiming?.();
      return animation.playState === 'running' && Number(timing?.duration || 0) > 50;
    });
    const links = Array.from(document.querySelectorAll('a[href]')).map((a) => {
      const raw = a.getAttribute('href') || '';
      const url = new URL(raw, location.href);
      const fragmentOk = !url.hash || url.pathname !== location.pathname || Boolean(document.querySelector(url.hash));
      return { raw, href: url.href, protocol: url.protocol, sameOrigin: url.origin === location.origin, fragmentOk };
    });
    const canonical = document.querySelector('link[rel="canonical"]')?.href || '';
    const ogUrl = document.querySelector('meta[property="og:url"]')?.content || '';
    const ogImage = document.querySelector('meta[property="og:image"]')?.content || '';
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const countups = Array.from(document.querySelectorAll('[data-countup]')).map((el) => ({
      text: el.textContent?.trim() || '',
      raw: el.getAttribute('data-countup') || '',
      prefix: el.getAttribute('data-prefix') || '',
      suffix: el.getAttribute('data-suffix') || '',
      animated: el.hasAttribute('data-done'),
    }));
    return {
      url: location.href,
      viewport: { width: innerWidth, height: innerHeight, visualWidth: visualViewport?.width || null, visualHeight: visualViewport?.height || null },
      explicitBlocks: explicit.length,
      blockCount: blocks.length,
      blockLabels: blocks.map((el) => el.getAttribute('data-calm-block') || el.id || el.className),
      navCount: navItems.length,
      navLabels: navItems.map((el) => el.textContent?.trim().replace(/\\s+/g, ' ')),
      menuRouteCount: new Set(menuRoutes).size,
      strip: strip ? {
        height: strip.getBoundingClientRect().height,
        position: stripStyle?.position,
        text: strip.textContent?.trim().replace(/\\s+/g, ' '),
      } : null,
      question: document.querySelector('[data-calm-question]')?.textContent?.trim() || '',
      horizontalOverflow: Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth),
      runningAnimations: animations.map((animation) => animation.animationName || String(animation.effect?.target?.className || 'unnamed')),
      reducedMotion,
      bootVisible: Boolean(document.querySelector('#gm-boot, #nf-gate') && isVisible(document.querySelector('#gm-boot, #nf-gate'))),
      hiddenRevealCount: Array.from(document.querySelectorAll('.rv')).filter((el) => Number(getComputedStyle(el).opacity) < 0.99).length,
      countups,
      links,
      canonical,
      ogUrl,
      ogImage,
      footerText: document.querySelector('.gm-footer')?.textContent?.trim().replace(/\\s+/g, ' ') || '',
      title: document.title,
      lang: document.documentElement.lang,
    };
  })()`);
}

async function capture(client, filePath) {
  const result = await client.send('Page.captureScreenshot', {
    format: 'png',
    fromSurface: true,
    captureBeyondViewport: false,
  });
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, Buffer.from(result.data, 'base64'));
}

function pushCheck(checks, name, pass, evidence) {
  checks.push({ name, pass: Boolean(pass), evidence });
}

function hostOf(value) {
  try {
    return new URL(value, 'http://relative.invalid').host;
  } catch {
    return '';
  }
}

const chrome = await launchChrome({
  chromePath,
  chromeFlags: [
    '--headless=new',
    '--disable-gpu',
    '--disable-background-networking',
    '--no-first-run',
    '--no-default-browser-check',
    '--force-color-profile=srgb',
  ],
});

const report = {
  schema: 1,
  mode,
  generatedAt: new Date().toISOString(),
  baseUrl,
  chromePath,
  routes: [],
  checks: [],
};

try {
  for (const route of ROUTES) {
    const routeReport = { id: route.id, url: routeUrl(route.path), viewports: {}, reducedMotion: null };
    const client = await openPage(chrome.port);
    try {
      for (const viewport of GATE_VIEWPORTS) {
        await configureViewport(client, viewport, false);
        await navigate(client, routeReport.url);
        const result = await inspectPage(client, route.id);
        routeReport.viewports[viewport.name] = result;

        pushCheck(report.checks, `${route.id}/${viewport.name}: no more than five primary blocks`, result.blockCount <= 5, result.blockLabels);
        pushCheck(report.checks, `${route.id}/${viewport.name}: explicit calm block instrumentation`, mode === 'baseline' || result.explicitBlocks >= 2, result.explicitBlocks);
        pushCheck(report.checks, `${route.id}/${viewport.name}: no more than five nav items`, result.navCount <= 5, result.navLabels);
        pushCheck(report.checks, `${route.id}/${viewport.name}: no horizontal overflow`, result.horizontalOverflow <= 1, result.horizontalOverflow);
        pushCheck(report.checks, `${route.id}/${viewport.name}: calm strip present and <= 40px`, Boolean(result.strip) && result.strip.height <= 40.5, result.strip);
        pushCheck(report.checks, `${route.id}/${viewport.name}: page question present`, Boolean(result.question), result.question);
        pushCheck(report.checks, `${route.id}/${viewport.name}: all eight routes in world menu`, result.menuRouteCount === ROUTES.length, result.menuRouteCount);
        pushCheck(report.checks, `${route.id}/${viewport.name}: canonical host`, hostOf(result.canonical) === expectedHost, result.canonical);
        pushCheck(report.checks, `${route.id}/${viewport.name}: Open Graph URL host`, hostOf(result.ogUrl) === expectedHost, result.ogUrl);
        pushCheck(report.checks, `${route.id}/${viewport.name}: absolute Open Graph image host`, hostOf(result.ogImage) === expectedHost, result.ogImage);
        pushCheck(report.checks, `${route.id}/${viewport.name}: visible v2.0.0 footer`, /v2\.0\.0/i.test(result.footerText), result.footerText);
        pushCheck(report.checks, `${route.id}/${viewport.name}: in-page fragments resolve`, result.links.every((link) => link.fragmentOk), result.links.filter((link) => !link.fragmentOk));
      }

      await configureViewport(client, GATE_VIEWPORTS[0], true);
      await navigate(client, routeReport.url);
      routeReport.reducedMotion = await inspectPage(client, route.id);
      const reduced = routeReport.reducedMotion;
      pushCheck(report.checks, `${route.id}/reduced: media query active`, reduced.reducedMotion, reduced.reducedMotion);
      pushCheck(report.checks, `${route.id}/reduced: no boot gate`, !reduced.bootVisible, reduced.bootVisible);
      pushCheck(report.checks, `${route.id}/reduced: no hidden reveals`, reduced.hiddenRevealCount === 0, reduced.hiddenRevealCount);
      pushCheck(report.checks, `${route.id}/reduced: no running long animations`, reduced.runningAnimations.length === 0, reduced.runningAnimations);
      pushCheck(report.checks, `${route.id}/reduced: count-ups stay static and formatted`, reduced.countups.every((item) => {
        const numeric = Number(item.raw);
        const keepsAffixes = (!item.prefix || item.text.startsWith(item.prefix)) && (!item.suffix || item.text.endsWith(item.suffix));
        const keepsGrouping = !Number.isFinite(numeric) || numeric < 1000 || item.text.includes(',');
        return !item.animated && keepsAffixes && keepsGrouping;
      }), reduced.countups);

      if (captureScreenshots) {
        for (const viewport of SCREENSHOT_VIEWPORTS) {
          await configureViewport(client, viewport, true);
          await navigate(client, routeReport.url);
          await capture(client, path.join(screenshotDir, `${route.id}-${viewport.name}-${viewport.width}x${viewport.height}.png`));
        }
      }
    } finally {
      client.close();
    }
    report.routes.push(routeReport);
  }

  for (const route of ROUTES) {
    const response = await fetch(routeUrl(route.path), { redirect: 'manual' });
    pushCheck(report.checks, `${route.id}: HTTP 200`, response.status === 200, response.status);
  }

  const sitemapResponse = await fetch(`${baseUrl}/sitemap.xml`);
  const sitemap = await sitemapResponse.text();
  pushCheck(report.checks, 'sitemap: HTTP 200', sitemapResponse.status === 200, sitemapResponse.status);
  pushCheck(report.checks, 'sitemap: canonical host', sitemap.includes(`https://${expectedHost}/god-mode-portfolio/`) && !sitemap.includes('engineeringprojectswork-droid.github.io'), sitemap.match(/https?:\/\/[^<]+/g));

  const robotsResponse = await fetch(`${baseUrl}/robots.txt`);
  const robots = await robotsResponse.text();
  pushCheck(report.checks, 'robots: HTTP 200', robotsResponse.status === 200, robotsResponse.status);
  pushCheck(report.checks, 'robots: sitemap host', robots.includes(`https://${expectedHost}/god-mode-portfolio/sitemap.xml`) && !robots.includes('engineeringprojectswork-droid.github.io'), robots.trim());
} finally {
  await chrome.kill();
}

report.summary = {
  passed: report.checks.filter((check) => check.pass).length,
  failed: report.checks.filter((check) => !check.pass).length,
  total: report.checks.length,
};

await mkdir(path.dirname(reportPath), { recursive: true });
await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`);

console.log(`verify-calm ${mode}: ${report.summary.passed}/${report.summary.total} passed; ${report.summary.failed} failed`);
for (const check of report.checks.filter((item) => !item.pass)) {
  console.log(`RED ${check.name} :: ${JSON.stringify(check.evidence)}`);
}
console.log(`report: ${reportPath}`);

if (report.summary.failed > 0) process.exitCode = 1;
