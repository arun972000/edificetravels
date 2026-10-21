/**
 * Dictionary parity and fallback. Every locale must have the same keys,
 * the same array lengths and the same {placeholders} as English.
 */
import { describe, expect, it } from 'vitest';
import { en } from '../../src/i18n/en';
import { de } from '../../src/i18n/de';
import { fr } from '../../src/i18n/fr';
import { es } from '../../src/i18n/es';
import { it as itDict } from '../../src/i18n/it';
import { hi } from '../../src/i18n/hi';
import { getDict, fmt } from '../../src/i18n';

type Node = unknown;
function walk(a: Node, b: Node, path: string, problems: string[]) {
  if (typeof a === 'string') {
    if (typeof b !== 'string') { problems.push(`${path}: missing or not a string`); return; }
    const need = a.match(/\{\w+\}/g) ?? [];
    for (const ph of need) if (!b.includes(ph)) problems.push(`${path}: lost ${ph}`);
    return;
  }
  if (Array.isArray(a)) {
    if (!Array.isArray(b)) { problems.push(`${path}: not an array`); return; }
    if (a.length !== b.length) problems.push(`${path}: length ${b.length}, expected ${a.length}`);
    a.forEach((v, i) => walk(v, b[i], `${path}[${i}]`, problems));
    return;
  }
  if (a && typeof a === 'object') {
    for (const k of Object.keys(a as object)) walk((a as Record<string, Node>)[k], (b as Record<string, Node> | undefined)?.[k], `${path}.${k}`, problems);
  }
}

describe.each([
  ['de', de],
  ['fr', fr],
  ['es', es],
  ['it', itDict],
  ['hi', hi],
])('%s dictionary', (_code, dict) => {
  it('has every English key, array length and placeholder', () => {
    const problems: string[] = [];
    walk(en, dict, 'dict', problems);
    expect(problems).toEqual([]);
  });

  it('contains no generated-text symbols', () => {
    const text = JSON.stringify(dict);
    for (const bad of ['—', ' · ', '…', '→']) expect(text).not.toContain(bad);
  });

  it('has no exclamation marks', () => {
    expect(JSON.stringify(dict)).not.toMatch(/[!¡]/);
  });
});

describe('Hindi dictionary', () => {
  it('ends sentences with the danda, not a Latin full stop after Devanagari', () => {
    const strings: string[] = [];
    const collect = (v: unknown) => { if (typeof v === 'string') strings.push(v); else if (v && typeof v === 'object') Object.values(v).forEach(collect); };
    collect(hi);
    expect(strings.filter(x => /[ऀ-ॿ]\.(\s|$)/.test(x))).toEqual([]);
  });
});

describe('English dictionary', () => {
  it('contains no generated-text symbols', () => {
    const text = JSON.stringify(en);
    for (const bad of ['—', ' · ', '…', '→']) expect(text).not.toContain(bad);
  });
});

describe('getDict', () => {
  it('returns English for en', () => {
    expect(getDict('en')).toBe(en);
  });
  it('returns translated values for a locale', () => {
    expect(getDict('de').nav.contact).toBe(de.nav.contact);
  });
});

describe('fmt', () => {
  it('fills known placeholders and leaves unknown ones visible', () => {
    expect(fmt('{n} days in {region}', { n: 12 })).toBe('12 days in {region}');
  });
});
