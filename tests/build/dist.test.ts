/**
 * Checks on the built site (run `npm run test:build`). Skipped when dist/
 * does not exist, so `npm test` stays fast. Pages are built as files
 * (about.html), so Cloudflare Pages serves /about without a redirect.
 */
import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const DIST = join(__dirname, '..', '..', 'dist');
const has = existsSync(join(DIST, 'index.html'));
const read = (p: string) => readFileSync(join(DIST, p), 'utf8');
const pages = has
  ? readdirSync(DIST, { recursive: true, withFileTypes: true })
      .filter(d => d.isFile() && d.name.endsWith('.html') && d.name !== '404.html')
      .map(d => join(d.parentPath ?? (d as unknown as { path: string }).path, d.name).slice(DIST.length + 1).replace(/\\/g, '/'))
  : [];

describe.skipIf(!has)('built site', () => {
  it('has every translated home page', () => {
    for (const l of ['de', 'fr', 'es', 'it']) expect(existsSync(join(DIST, `${l}.html`))).toBe(true);
  });

  it('declares hreflang alternates on translated pages', () => {
    const html = read('de/plan.html');
    for (const l of ['en', 'de', 'fr', 'es', 'it', 'x-default']) expect(html).toContain(`hreflang="${l}"`);
  });

  it.each(['index.html', 'journeys/forts-deserts-and-the-taj.html', 'guide/india-e-visa-guide.html', 'destinations/jaipur.html'])('%s has structured data that parses', page => {
    const html = read(page);
    const blocks = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([^<]*)<\/script>/g)].map(m => m[1]);
    expect(blocks.length).toBeGreaterThan(0);
    for (const b of blocks) expect(() => JSON.parse(b)).not.toThrow();
  });

  it('never publishes Offer or Product markup (prices are private)', () => {
    const html = read('journeys/forts-deserts-and-the-taj.html');
    expect(html).not.toContain('"@type":"Offer"');
    expect(html).not.toContain('"@type":"Product"');
  });

  it('shows no prices outside the travel guide', () => {
    const offenders = pages
      .filter(p => !p.startsWith('guide/'))
      .filter(p => /₹ ?\d|INR ?\d{2}|US\$ ?\d/.test(read(p)));
    expect(offenders).toEqual([]);
  });

  describe('search basics on every indexable page', () => {
    const indexable = pages.filter(p => !/name="robots" content="noindex/.test(read(p)));
    it.each(indexable)('%s', page => {
      const html = read(page);
      const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '';
      const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '';
      expect(title.length, 'title').toBeGreaterThan(0);
      expect(title.length, `title "${title}"`).toBeLessThanOrEqual(60);
      expect(desc.length, 'description').toBeGreaterThan(0);
      expect(desc.length, 'description').toBeLessThanOrEqual(160);
      expect(html.match(/<h1[\s>]/g)?.length, 'one h1').toBe(1);
      expect(html).toContain('rel="canonical"');
      for (const img of html.match(/<img\b[^>]*>/g) ?? []) expect(img, 'img has alt').toMatch(/\balt(=|\s|>)/);
    });
  });

  it('publishes llms.txt with every journey', () => {
    const txt = read('llms.txt');
    expect(txt).toContain('# Edifice Travels');
    expect(txt).toContain('/journeys/forts-deserts-and-the-taj');
    expect(txt).not.toMatch(/₹ ?\d|INR ?\d{2}|US\$ ?\d/);
  });

  it('builds pages as files, not folders, and canonicals have no slash or extension', () => {
    expect(existsSync(join(DIST, 'about.html'))).toBe(true);
    expect(existsSync(join(DIST, 'about', 'index.html'))).toBe(false);
    expect(read('about.html')).toContain('<link rel="canonical" href="https://edificetravels.com/about"');
    expect(read('de/plan.html')).toContain('<link rel="canonical" href="https://edificetravels.com/de/plan"');
    expect(read('de/plan.html')).toContain('lang="de"');
  });

  it('sends every old-site redirect to a page that exists', () => {
    const rules = read('_redirects').split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('#')).map(l => l.split(/\s+/));
    expect(rules.length).toBeGreaterThan(30);
    for (const [from, to, status] of rules) {
      expect(status, from).toBe('301');
      if (to.includes(':splat')) continue;
      const file = to === '/' ? 'index.html' : `${to.slice(1)}.html`;
      expect(existsSync(join(DIST, file)), `${from} -> ${to}`).toBe(true);
    }
  });

  it('publishes a real flag for every country in the picker', () => {
    const src = readFileSync(join(__dirname, '..', '..', 'src', 'data', 'countries.ts'), 'utf8');
    const codes = [...src.matchAll(/code: '([A-Z]{2})'/g)].map(m => m[1].toLowerCase());
    expect(codes.length).toBeGreaterThan(10);
    for (const c of [...codes, 'in']) expect(existsSync(join(DIST, 'flags', `${c}.svg`)), c).toBe(true);
  });

  it('lists localised pages in the sitemap, with their language alternates', () => {
    const map = read('sitemap-0.xml');
    expect(map).toContain('/de</loc>');
    expect(map).toContain('/fr/plan</loc>');
    expect(map).toContain('hreflang="de"');
    expect(map).toMatch(/guide\/india-e-visa-guide<\/loc><lastmod>/);
  });

  it('gives every indexable page a page node, a share image with alt text and full search previews', () => {
    for (const page of pages) {
      const html = read(page);
      if (html.includes('content="noindex')) continue;
      const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
      expect(html, page).toContain(`"@id":"${canonical}#webpage"`);
      expect(html, page).toContain('max-image-preview:large');
      expect(html, page).toMatch(/<meta property="og:image:alt" content="[^"]+"/);
    }
  });

  it('describes the company fully: logo, address, opening hours and map', () => {
    const org = read('index.html').match(/<script type="application\/ld\+json">(\{"@context":"https:\/\/schema.org","@type":\["Organization"[^<]*)<\/script>/)?.[1];
    expect(org).toBeTruthy();
    const o = JSON.parse(org!);
    expect(o.logo.url).toMatch(/logo\.png$/);
    expect(o.address.streetAddress).toBeTruthy();
    expect(o.openingHoursSpecification[0].opens).toBe('09:00');
    expect(o.hasMap).toMatch(/^https:\/\/www\.google\.com\/maps/);
  });

  it('keeps the thank-you page out of every crawler group in robots.txt', () => {
    const groups = read('robots.txt').split(/\r?\n\s*\r?\n/).filter(g => /^User-agent:/m.test(g));
    expect(groups.length).toBeGreaterThan(1);
    for (const g of groups) expect(g).toContain('Disallow: /thank-you');
    expect(read('robots.txt')).toMatch(/User-agent: OAI-SearchBot/);
  });

  it('publishes llms-full.txt with every journey and guide in full, and no prices', () => {
    const txt = read('llms-full.txt');
    const short = read('llms.txt');
    for (const m of short.matchAll(/^- \[([^\]]+)\]\(https:\/\/edificetravels\.com\/(?:journeys|guide)\//gm)) expect(txt, m[1]).toContain(`## ${m[1]}`);
    expect(txt).toContain('Edifice Travel Solutions LLP');
    expect(txt).toContain('Day 1:');
    expect(txt).not.toMatch(/₹ ?\d|US\$ ?\d/);
  });
});
