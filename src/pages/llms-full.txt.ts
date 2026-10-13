/**
 * /llms-full.txt: the whole site as one plain Markdown file for AI
 * assistants and answer engines, so they can quote journeys, places and
 * guides accurately without crawling every page. Built from the same
 * content collections as the pages.
 */
import type { APIRoute } from 'astro';
import { site } from '../data/site';
import { allJourneys, allRegions, allDestinations, allGuides } from '../lib/content';
import { companyFacts, url } from '../lib/llms';

const list = (items: string[]) => items.map(x => `- ${x}`);
const body = (md?: string) => (md ?? '').trim();
const date = (d: Date) => d.toISOString().slice(0, 10);

export const GET: APIRoute = async () => {
  const [journeys, regions, destinations, guides] = await Promise.all([allJourneys(), allRegions(), allDestinations(), allGuides()]);
  const out: string[] = [
    `# ${site.name}: the full site`,
    '',
    `> ${site.description}`,
    '',
    `Source: ${site.url}. Short index: ${url('/llms.txt')}.`,
    '',
    ...(await companyFacts()),
    '',
    '# Journeys',
    '',
  ];

  for (const j of journeys) {
    const d = j.data;
    out.push(
      `## ${d.title}`,
      '',
      `URL: ${url(`/journeys/${j.id}`)}`,
      '',
      d.tagline,
      '',
      `- Length: ${d.days} days`,
      `- Route: ${d.routeSummary}`,
      `- Pace: ${d.pace}`,
      `- Best months: ${d.bestMonths.join(', ')}`,
      `- Themes: ${d.themes.join(', ')}`,
      `- Price: quoted personally, in writing, within 48 hours of an enquiry`,
      '',
      '### Why this journey',
      '',
      ...list(d.highlights),
      '',
      '### Day by day',
      '',
    );
    for (const day of d.itinerary) {
      out.push(`**Day ${day.day}: ${day.title}** (${day.location}${day.drive ? `; ${day.drive}` : ''})`, '', day.text.trim());
      if (day.stay) out.push('', `Stay: Comfort, ${day.stay.comfort}. Premium, ${day.stay.premium}. Luxury, ${day.stay.luxury}.`);
      out.push('');
    }
    out.push(
      '### Styles of stay',
      '',
      ...(['comfort', 'premium', 'luxury'] as const).map(k => {
        const t = d.tiers[k];
        return `- ${k[0].toUpperCase() + k.slice(1)}: ${t.hotels.join('; ')}. Vehicle: ${t.vehicle}.${t.note ? ` ${t.note}` : ''}`;
      }),
      '',
      '### Included',
      '',
      ...list(d.inclusions),
      '',
      '### Not included',
      '',
      ...list(d.exclusions),
      '',
      '### Questions',
      '',
      ...d.faqs.flatMap(f => [`**${f.q}**`, '', f.a, '']),
    );
    if (body(j.body)) out.push('### More about this journey', '', body(j.body), '');
  }

  out.push('# Regions', '');
  for (const r of regions) {
    const d = r.data;
    out.push(
      `## ${d.title}`,
      '',
      `URL: ${url(`/regions/${r.id}`)}`,
      '',
      d.tagline,
      '',
      '### Where to go',
      '',
      ...list(d.whereToGo.map(w => `${w.name}: ${w.blurb}`)),
      '',
      '### When to go',
      '',
      ...list(d.whenToGo.map(w => `${w.months}: ${w.note}`)),
      '',
      `Best for: ${d.bestFor.join(', ')}.`,
      '',
    );
    if (body(r.body)) out.push(body(r.body), '');
  }

  out.push('# Destinations', '');
  for (const p of destinations) {
    const d = p.data;
    out.push(
      `## ${d.title}, ${d.state}`,
      '',
      `URL: ${url(`/destinations/${p.id}`)}`,
      '',
      d.tagline,
      '',
      `- Best months: ${d.bestMonths.join(', ')}`,
      `- Ideal stay: ${d.idealNights}`,
      '',
      '### Highlights',
      '',
      ...list(d.highlights),
      '',
      '### Experiences',
      '',
      ...d.experiences.flatMap(e => [`**${e.title}**`, '', e.text, '']),
      ...(d.tips.length ? ['### Good to know', '', ...list(d.tips), ''] : []),
    );
    if (body(p.body)) out.push(body(p.body), '');
  }

  out.push('# Travel guide', '');
  for (const g of guides) {
    const d = g.data;
    out.push(
      `## ${d.title}`,
      '',
      `URL: ${url(`/guide/${g.id}`)}. Updated ${date(d.updatedAt)}.`,
      '',
      d.description,
      '',
      body(g.body),
      '',
      ...(d.faqs.length ? ['### Questions', '', ...d.faqs.flatMap(f => [`**${f.q}**`, '', f.a, ''])] : []),
    );
  }

  return new Response(out.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
