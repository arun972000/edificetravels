/**
 * Editorial rules, enforced. Prices are never published; generated-text
 * symbols never appear; SEO descriptions fit a search result (160 characters).
 */
import { describe, expect, it } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = join(__dirname, '..', '..', 'src', 'content');
const files = readdirSync(ROOT, { recursive: true, withFileTypes: true })
  .filter(d => d.isFile() && /\.(md|json)$/.test(d.name))
  .map(d => join(d.parentPath ?? (d as unknown as { path: string }).path, d.name));
const rel = (f: string) => f.slice(ROOT.length + 1).replace(/\\/g, '/');

// Third-party facts that legitimately carry amounts (fees and tips set by others).
const PRICE_ALLOW: Record<string, RegExp[]> = {
  'guides/india-e-visa-guide.md': [/USD ?\d+/],
  'guides/money-tipping-and-staying-connected.md': [/INR ?[\d,]+/, /₹ ?[\d,]+/],
  'guides/trains-flights-and-getting-around-india.md': [/INR ?[\d,]+/],
  'guides/what-a-private-india-trip-costs.md': [/INR ?1,?300/],
};

describe('content files', () => {
  it('exist', () => {
    expect(files.length).toBeGreaterThan(50);
  });

  it.each(files.map(f => [rel(f), f]))('%s publishes no prices of ours', (name, file) => {
    let text = readFileSync(file, 'utf8');
    for (const allow of PRICE_ALLOW[name] ?? []) text = text.replace(new RegExp(allow, 'g'), '');
    expect(text).not.toMatch(/₹ ?\d|INR ?\d{2}|US\$ ?\d|USD ?\d{2,}|€ ?\d|£ ?\d|per person per day/);
  });

  it.each(files.map(f => [rel(f), f]))('%s has no generated-text symbols', (_name, file) => {
    const text = readFileSync(file, 'utf8');
    for (const bad of ['—', ' · ', '…', '→']) expect(text).not.toContain(bad);
  });

  it.each(files.filter(f => f.endsWith('.md')).map(f => [rel(f), f]))('%s has an SEO description of 160 characters or fewer', (_name, file) => {
    const text = readFileSync(file, 'utf8');
    const m = text.match(/^\s*description:\s*"([^"]*)"/m);
    if (m) expect(m[1].length).toBeLessThanOrEqual(160);
  });
});

/** Nothing invented: every person, review and photo on the site must be real and traceable. */
describe('real data only', () => {
  const json = (p: string) => JSON.parse(readFileSync(join(ROOT, p), 'utf8'));
  const specialists: { id: string; sample?: boolean }[] = json('specialists/specialists.json');
  const reviews: { id: string; sample?: boolean; source?: string; country?: string }[] = json('reviews/reviews.json');

  it('has no demonstration profiles or reviews', () => {
    expect(specialists.filter(s => s.sample)).toEqual([]);
    expect(reviews.filter(r => r.sample)).toEqual([]);
  });

  it('says where every review was published', () => {
    for (const r of reviews) expect(r.source ?? r.country, r.id).toBeTruthy();
  });

  it.each(files.filter(f => f.endsWith('.md')).map(f => [rel(f), f]))('%s credits a team member who exists', (_name, file) => {
    const text = readFileSync(file, 'utf8');
    const ids = specialists.map(s => s.id);
    for (const m of text.matchAll(/^(?:specialist|author):\s*(\S+)/gm)) expect(ids).toContain(m[1]);
  });

  it('has a file, a credit and alt text for every photo', () => {
    const PHOTOS = join(__dirname, '..', '..', 'src', 'assets', 'photos');
    const onDisk = readdirSync(PHOTOS).filter(f => f.endsWith('.jpg')).map(f => f.replace(/\.jpg$/, '')).sort();
    const credits: { slug: string; author: string; license: string; sourceUrl: string }[] = JSON.parse(
      readFileSync(join(__dirname, '..', '..', 'src', 'data', 'photo-credits.json'), 'utf8'),
    );
    const alt = readFileSync(join(__dirname, '..', '..', 'src', 'data', 'photo-alt.ts'), 'utf8');
    expect(credits.map(c => c.slug).sort()).toEqual(onDisk);
    for (const c of credits) {
      expect(c.author, c.slug).toBeTruthy();
      expect(c.license, c.slug).toMatch(/CC BY|CC0|Public domain|PD/i);
      expect(c.sourceUrl, c.slug).toMatch(/^https:\/\/commons\.wikimedia\.org\//);
      expect(alt, c.slug).toContain(`'${c.slug}':`);
    }
  });
});
