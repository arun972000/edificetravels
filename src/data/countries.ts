/**
 * Countries offered in the country picker. Country never changes prices (none
 * are published); it sets the default language, the local-time conversions,
 * a typical flight time and the e-Visa note.
 *
 * Flight times are typical scheduled durations to Delhi, non-stop where one
 * exists, otherwise via a hub, and are always shown as "about". Re-check them
 * once a year (docs/LAUNCH-CHECKLIST.md).
 */
import type { Locale } from '../i18n/config';

export interface Country {
  code: string; // ISO 3166-1 alpha-2
  lang: Locale;
  tz: string; // IANA zone for the main population centre
  hub: string; // departure city shown in the flight line
  h: number; // flight hours
  m: number; // flight minutes
  stops: 0 | 1;
  eVisa: boolean;
}

export const COUNTRIES: Country[] = [
  { code: 'US', lang: 'en', tz: 'America/New_York', hub: 'New York', h: 14, m: 0, stops: 0, eVisa: true },
  { code: 'GB', lang: 'en', tz: 'Europe/London', hub: 'London', h: 8, m: 45, stops: 0, eVisa: true },
  { code: 'CA', lang: 'en', tz: 'America/Toronto', hub: 'Toronto', h: 14, m: 0, stops: 0, eVisa: true },
  { code: 'AU', lang: 'en', tz: 'Australia/Sydney', hub: 'Sydney', h: 12, m: 30, stops: 0, eVisa: true },
  { code: 'NZ', lang: 'en', tz: 'Pacific/Auckland', hub: 'Auckland', h: 17, m: 0, stops: 1, eVisa: true },
  { code: 'IE', lang: 'en', tz: 'Europe/Dublin', hub: 'Dublin', h: 11, m: 0, stops: 1, eVisa: true },
  { code: 'DE', lang: 'de', tz: 'Europe/Berlin', hub: 'Frankfurt', h: 7, m: 45, stops: 0, eVisa: true },
  { code: 'AT', lang: 'de', tz: 'Europe/Vienna', hub: 'Wien', h: 9, m: 0, stops: 1, eVisa: true },
  { code: 'CH', lang: 'de', tz: 'Europe/Zurich', hub: 'Zürich', h: 8, m: 0, stops: 0, eVisa: true },
  { code: 'FR', lang: 'fr', tz: 'Europe/Paris', hub: 'Paris', h: 8, m: 30, stops: 0, eVisa: true },
  { code: 'BE', lang: 'fr', tz: 'Europe/Brussels', hub: 'Bruxelles', h: 10, m: 0, stops: 1, eVisa: true },
  { code: 'ES', lang: 'es', tz: 'Europe/Madrid', hub: 'Madrid', h: 11, m: 0, stops: 1, eVisa: true },
  { code: 'MX', lang: 'es', tz: 'America/Mexico_City', hub: 'Ciudad de México', h: 20, m: 0, stops: 1, eVisa: true },
  { code: 'IT', lang: 'it', tz: 'Europe/Rome', hub: 'Milano', h: 8, m: 0, stops: 0, eVisa: true },
  { code: 'NL', lang: 'en', tz: 'Europe/Amsterdam', hub: 'Amsterdam', h: 8, m: 30, stops: 0, eVisa: true },
  { code: 'SE', lang: 'en', tz: 'Europe/Stockholm', hub: 'Stockholm', h: 10, m: 0, stops: 1, eVisa: true },
  { code: 'SG', lang: 'en', tz: 'Asia/Singapore', hub: 'Singapore', h: 5, m: 45, stops: 0, eVisa: true },
  { code: 'AE', lang: 'en', tz: 'Asia/Dubai', hub: 'Dubai', h: 3, m: 30, stops: 0, eVisa: true },
];

/** Time zone → country, for a first-visit guess. */
export const TZ_TO_COUNTRY: Record<string, string> = Object.fromEntries([
  ...COUNTRIES.map(c => [c.tz, c.code]),
  ['America/Chicago', 'US'], ['America/Denver', 'US'], ['America/Los_Angeles', 'US'], ['America/Phoenix', 'US'], ['America/Anchorage', 'US'], ['Pacific/Honolulu', 'US'],
  ['America/Vancouver', 'CA'], ['America/Edmonton', 'CA'], ['America/Winnipeg', 'CA'], ['America/Halifax', 'CA'],
  ['Australia/Melbourne', 'AU'], ['Australia/Brisbane', 'AU'], ['Australia/Perth', 'AU'], ['Australia/Adelaide', 'AU'], ['Australia/Hobart', 'AU'],
  ['Europe/Belfast', 'GB'],
]);
