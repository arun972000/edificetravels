/** Formatting helpers shared by templates and islands. */

const MONTH_ORDER = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

/**
 * Collapse a month list into ranges, wrapping around the year.
 * ['Oct','Nov','Dec','Jan','Feb','Mar'] → "Oct to Mar"
 * ['Jun','Jul','Aug','Sep'] → "Jun to Sep"
 * ['Oct','Nov','Feb'] → "Oct, Nov, Feb"
 */
export function formatMonths(months: readonly string[]): string {
  if (months.length === 0) return '';
  const idx = months.map(m => MONTH_ORDER.indexOf(m)).filter(i => i >= 0).sort((a, b) => a - b);
  if (idx.length === 12) return 'All year';
  const set = new Set(idx);
  // Find a start month that is not preceded by a selected month (a run start).
  let start = idx.find(i => !set.has((i + 11) % 12));
  if (start === undefined) return 'All year';
  const runs: number[][] = [];
  let i = start;
  let guard = 0;
  while (guard++ < 12) {
    if (!set.has(i)) { i = (i + 1) % 12; continue; }
    const run = [i];
    while (set.has((run[run.length - 1] + 1) % 12) && run.length < 12) run.push((run[run.length - 1] + 1) % 12);
    runs.push(run);
    i = (run[run.length - 1] + 1) % 12;
    if (runs.flat().length === idx.length) break;
  }
  if (runs.length === 1) {
    const r = runs[0];
    return r.length === 1 ? MONTH_ORDER[r[0]] : `${MONTH_ORDER[r[0]]} to ${MONTH_ORDER[r[r.length - 1]]}`;
  }
  return runs.map(r => (r.length === 1 ? MONTH_ORDER[r[0]] : `${MONTH_ORDER[r[0]]} to ${MONTH_ORDER[r[r.length - 1]]}`)).join(', ');
}

export function daysNights(days: number): string {
  return `${days} days, ${days - 1} nights`;
}

export function slugToTitle(slug: string): string {
  return slug.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ');
}

export function formatDate(d: Date): string {
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(d);
}

export const THEME_LABEL: Record<string, string> = {
  heritage: 'Heritage',
  wildlife: 'Wildlife',
  wellness: 'Wellness',
  spiritual: 'Spiritual',
  rail: 'Rail',
  'slow-travel': 'Slow travel',
  family: 'Family',
  'solo-women': 'Solo women',
  culinary: 'Food',
  beach: 'Beach',
  adventure: 'Adventure',
};

export const REGION_LABEL: Record<string, string> = {
  north: 'North India',
  rajasthan: 'Rajasthan',
  south: 'South India',
  'east-northeast': 'East and Northeast',
  himalaya: 'Himalaya',
};

export const PACE_LABEL: Record<string, string> = {
  relaxed: 'Relaxed',
  moderate: 'Moderate',
  active: 'Active',
};
