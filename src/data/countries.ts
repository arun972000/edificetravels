/**
 * Countries offered in the country picker. Country never changes prices (none
 * are published); it sets the language, the local-time conversions, a typical
 * flight time and the e-Visa note. The country is the only choice a visitor
 * makes: where a country reads more than one of our languages (India: English
 * and Hindi), the picker shows each one under the country's name.
 *
 * Flight times are typical scheduled durations to Delhi, non-stop where one
 * exists, otherwise via a hub, and are always shown as "about". Re-check them
 * once a year (docs/LAUNCH-CHECKLIST.md).
 */
import type { Locale } from '../i18n/config';

export interface Country {
  code: string; // ISO 3166-1 alpha-2
  langs: Locale[]; // the site's languages for this country, the usual one first
  tz: string; // IANA zone for the main population centre
  hub?: string; // departure city shown in the flight line (none for India itself)
  h?: number; // flight hours
  m?: number; // flight minutes
  stops?: 0 | 1;
  eVisa: boolean;
}

export const COUNTRIES: Country[] = [
  { code: 'IN', langs: ['en', 'hi'], tz: 'Asia/Kolkata', eVisa: false },
  { code: 'US', langs: ['en'], tz: 'America/New_York', hub: 'New York', h: 14, m: 0, stops: 0, eVisa: true },
  { code: 'GB', langs: ['en'], tz: 'Europe/London', hub: 'London', h: 8, m: 45, stops: 0, eVisa: true },
  { code: 'CA', langs: ['en', 'fr'], tz: 'America/Toronto', hub: 'Toronto', h: 14, m: 0, stops: 0, eVisa: true },
  { code: 'AU', langs: ['en'], tz: 'Australia/Sydney', hub: 'Sydney', h: 12, m: 30, stops: 0, eVisa: true },
  { code: 'NZ', langs: ['en'], tz: 'Pacific/Auckland', hub: 'Auckland', h: 17, m: 0, stops: 1, eVisa: true },
  { code: 'IE', langs: ['en'], tz: 'Europe/Dublin', hub: 'Dublin', h: 11, m: 0, stops: 1, eVisa: true },
  { code: 'DE', langs: ['de'], tz: 'Europe/Berlin', hub: 'Frankfurt', h: 7, m: 45, stops: 0, eVisa: true },
  { code: 'AT', langs: ['de'], tz: 'Europe/Vienna', hub: 'Wien', h: 9, m: 0, stops: 1, eVisa: true },
  { code: 'CH', langs: ['de', 'fr', 'it'], tz: 'Europe/Zurich', hub: 'Zürich', h: 8, m: 0, stops: 0, eVisa: true },
  { code: 'FR', langs: ['fr'], tz: 'Europe/Paris', hub: 'Paris', h: 8, m: 30, stops: 0, eVisa: true },
  { code: 'BE', langs: ['fr'], tz: 'Europe/Brussels', hub: 'Bruxelles', h: 10, m: 0, stops: 1, eVisa: true },
  { code: 'ES', langs: ['es'], tz: 'Europe/Madrid', hub: 'Madrid', h: 11, m: 0, stops: 1, eVisa: true },
  { code: 'MX', langs: ['es'], tz: 'America/Mexico_City', hub: 'Ciudad de México', h: 20, m: 0, stops: 1, eVisa: true },
  { code: 'IT', langs: ['it'], tz: 'Europe/Rome', hub: 'Milano', h: 8, m: 0, stops: 0, eVisa: true },
  { code: 'NL', langs: ['en'], tz: 'Europe/Amsterdam', hub: 'Amsterdam', h: 8, m: 30, stops: 0, eVisa: true },
  { code: 'SE', langs: ['en'], tz: 'Europe/Stockholm', hub: 'Stockholm', h: 10, m: 0, stops: 1, eVisa: true },
  { code: 'SG', langs: ['en'], tz: 'Asia/Singapore', hub: 'Singapore', h: 5, m: 45, stops: 0, eVisa: true },
  { code: 'AE', langs: ['en'], tz: 'Asia/Dubai', hub: 'Dubai', h: 3, m: 30, stops: 0, eVisa: true },
];

/** Time zone → country, for a first-visit guess. */
export const TZ_TO_COUNTRY: Record<string, string> = Object.fromEntries([
  ...COUNTRIES.map(c => [c.tz, c.code]),
  ['America/Chicago', 'US'], ['America/Denver', 'US'], ['America/Los_Angeles', 'US'], ['America/Phoenix', 'US'], ['America/Anchorage', 'US'], ['Pacific/Honolulu', 'US'],
  ['America/Vancouver', 'CA'], ['America/Edmonton', 'CA'], ['America/Winnipeg', 'CA'], ['America/Halifax', 'CA'],
  ['Australia/Melbourne', 'AU'], ['Australia/Brisbane', 'AU'], ['Australia/Perth', 'AU'], ['Australia/Adelaide', 'AU'], ['Australia/Hobart', 'AU'],
  ['Europe/Belfast', 'GB'],
  ['Asia/Calcutta', 'IN'],
]);
