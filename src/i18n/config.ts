/**
 * Locales and routing. English lives at the root; other languages live under
 * /de, /fr, /es, /it. Only the routes in TRANSLATED_ROUTES exist in every
 * language; everything else (journeys, destinations, guides, legal) is English
 * and links there from every locale.
 */
export const LOCALES = ['en', 'de', 'fr', 'es', 'it'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';

/** Native names, shown in the language picker regardless of the current UI language. */
export const LOCALE_NAMES: Record<Locale, string> = {
  en: 'English',
  de: 'Deutsch',
  fr: 'Français',
  es: 'Español',
  it: 'Italiano',
};

/** Language names as written inside a sentence in that language (lower case in fr, es, it). */
export const LOCALE_NAMES_INLINE: Record<Locale, string> = {
  en: 'English',
  de: 'Deutsch',
  fr: 'français',
  es: 'español',
  it: 'italiano',
};

/** The word that joins a range in each language ("October to March"); never a dash. */
export const RANGE_JOINER: Record<Locale, string> = { en: ' to ', de: ' bis ', fr: ' à ', es: ' a ', it: ' a ' };

/** BCP 47 tags for <html lang>, hreflang and Intl formatting. */
export const LOCALE_TAGS: Record<Locale, string> = {
  en: 'en',
  de: 'de',
  fr: 'fr',
  es: 'es',
  it: 'it',
};

/** Routes that exist in every locale (English path, no trailing slash except root). */
export const TRANSLATED_ROUTES = ['/', '/plan', '/contact', '/about'] as const;

export function isLocale(v: string | undefined): v is Locale {
  return !!v && (LOCALES as readonly string[]).includes(v);
}

/** Strip a locale prefix: "/de/plan" → "/plan", "/de" → "/". */
/**
 * The public path of a page: no trailing slash, no ".html", no "/index".
 * Pages are built as files (about.html) so Cloudflare Pages serves them at
 * /about without a redirect, and Astro reports that path as /about.html.
 */
export function pagePath(pathname: string): string {
  return pathname.replace(/\.html$/, '').replace(/\/index$/, '').replace(/\/+$/, '') || '/';
}

export function basePath(pathname: string): string {
  const clean = pagePath(pathname);
  const seg = clean.split('/')[1];
  if (isLocale(seg) && seg !== DEFAULT_LOCALE) {
    const rest = clean.slice(seg.length + 1);
    return rest || '/';
  }
  return clean;
}

export function localeFromPath(pathname: string): Locale {
  const seg = pagePath(pathname).split('/')[1];
  return isLocale(seg) ? seg : DEFAULT_LOCALE;
}

export function isTranslated(path: string): boolean {
  return (TRANSLATED_ROUTES as readonly string[]).includes(basePath(path));
}

/** Path for a route in a locale. Untranslated routes always resolve to English. */
export function localizedPath(path: string, locale: Locale): string {
  const base = basePath(path);
  if (locale === DEFAULT_LOCALE || !isTranslated(base)) return base;
  return base === '/' ? `/${locale}` : `/${locale}${base}`;
}
