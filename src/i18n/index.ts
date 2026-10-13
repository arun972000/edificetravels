/**
 * Dictionary access. Locale files are discovered at build time so a missing
 * translation falls back to English instead of breaking the build.
 */
import { en, type Dict } from './en';
import { DEFAULT_LOCALE, LOCALE_TAGS, RANGE_JOINER, type Locale } from './config';

const modules = import.meta.glob<Record<string, Dict>>('./{de,fr,es,it}.ts', { eager: true });
const dicts: Partial<Record<Locale, Dict>> = { en };
for (const [path, mod] of Object.entries(modules)) {
  const code = path.replace('./', '').replace('.ts', '') as Locale;
  const dict = mod[code];
  if (dict) dicts[code] = dict;
}

/** Locale values over the English shape: a key a translation lacks falls back to English. */
function merge<T>(base: T, over: unknown): T {
  if (Array.isArray(base)) {
    if (!Array.isArray(over)) return base;
    // Arrays of objects merge item by item (so a new field falls back); arrays of strings use the translation.
    return base.map((b, i) => (over[i] === undefined ? b : typeof b === 'object' && b !== null ? merge(b, over[i]) : over[i])) as T;
  }
  if (base && typeof base === 'object') {
    const out: Record<string, unknown> = {};
    const o = (over ?? {}) as Record<string, unknown>;
    for (const k of Object.keys(base as Record<string, unknown>)) out[k] = merge((base as Record<string, unknown>)[k], o[k]);
    return out as T;
  }
  return (typeof over === typeof base ? over : base) as T;
}
const merged = new Map<Locale, Dict>();

export function getDict(locale: Locale = DEFAULT_LOCALE): Dict {
  if (locale === 'en' || !dicts[locale]) return en;
  if (!merged.has(locale)) merged.set(locale, merge(en, dicts[locale]));
  return merged.get(locale)!;
}

export function hasDict(locale: Locale): boolean {
  return Boolean(dicts[locale]);
}

/** Fill {placeholders}. Unknown names are left as-is so mistakes are visible. */
export function fmt(template: string, vars: Record<string, string | number> = {}): string {
  return template.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m));
}

/** Localised month names for a list of three-letter English month codes. */
const MONTH_INDEX: Record<string, number> = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };

export function monthName(code: string, locale: Locale, style: 'short' | 'long' = 'short'): string {
  const i = MONTH_INDEX[code];
  if (i === undefined) return code;
  return new Intl.DateTimeFormat(LOCALE_TAGS[locale], { month: style, timeZone: 'UTC' })
    .format(new Date(Date.UTC(2026, i, 15)))
    .replace(/\.$/, '');
}

/** Collapse a month list into ranges that wrap the year: Oct–Mar, Jun–Sep, or a list. */
export function monthRange(codes: readonly string[], locale: Locale): string {
  const order = Object.keys(MONTH_INDEX);
  const idx = [...new Set(codes.map(c => MONTH_INDEX[c]).filter(i => i !== undefined))].sort((a, b) => a - b);
  if (idx.length === 0) return '';
  const join = RANGE_JOINER[locale] ?? ' to ';
  if (idx.length === 12) return `${monthName('Jan', locale)}${join}${monthName('Dec', locale)}`;
  const set = new Set(idx);
  const start = idx.find(i => !set.has((i + 11) % 12)) ?? idx[0];
  const runs: number[][] = [];
  let i = start;
  for (let guard = 0; guard < 12 && runs.flat().length < idx.length; guard++) {
    if (!set.has(i)) { i = (i + 1) % 12; continue; }
    const run = [i];
    while (set.has((run[run.length - 1] + 1) % 12) && run.length < 12) run.push((run[run.length - 1] + 1) % 12);
    runs.push(run);
    i = (run[run.length - 1] + 1) % 12;
  }
  return runs
    .map(r => (r.length === 1 ? monthName(order[r[0]], locale) : `${monthName(order[r[0]], locale)}${join}${monthName(order[r[r.length - 1]], locale)}`))
    .join(', ');
}

export type { Dict };

/* ---------------------------------------------------------------------------
   Translated names for content entries (journeys, regions, specialist roles).
   Loaded lazily by glob so the build works before the file exists.
--------------------------------------------------------------------------- */
type Pair = { title: string; tagline: string };
type ContentModule = {
  journeyText?: Partial<Record<Locale, Record<string, Pair>>>;
  regionText?: Partial<Record<Locale, Record<string, Pair>>>;
  specialistRole?: Partial<Record<Locale, Record<string, string>>>;
};
const contentMods = import.meta.glob<ContentModule>('./content.ts', { eager: true });
const contentMod: ContentModule = Object.values(contentMods)[0] ?? {};

export function journeyCopy(id: string, locale: Locale, fallback: Pair): Pair {
  return contentMod.journeyText?.[locale]?.[id] ?? fallback;
}
export function regionCopy(id: string, locale: Locale, fallback: Pair): Pair {
  return contentMod.regionText?.[locale]?.[id] ?? fallback;
}
export function roleCopy(id: string, locale: Locale, fallback: string): string {
  return contentMod.specialistRole?.[locale]?.[id] ?? fallback;
}
