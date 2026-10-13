/**
 * /llms.txt: a plain-text map of the site for answer engines and AI
 * assistants (https://llmstxt.org). Built from the content collections, so it
 * changes whenever a journey, place or guide does.
 */
import type { APIRoute } from 'astro';
import { site } from '../data/site';
import { allJourneys, allRegions, allDestinations, allGuides } from '../lib/content';

const url = (path: string) => new URL(path, site.url).toString();

export const GET: APIRoute = async () => {
  const [journeys, regions, destinations, guides] = await Promise.all([allJourneys(), allRegions(), allDestinations(), allGuides()]);
  const lines = [
    `# ${site.name}`,
    '',
    `> ${site.description}`,
    '',
    `${site.name} is based in ${site.basedIn}. Every journey is private and planned around the traveller. Prices are not published: each traveller receives an itemised written quote within 48 hours of enquiring, with every hotel named. Enquiries come by WhatsApp (+${site.whatsapp}), email (${site.email}) or the trip planner.`,
    '',
    '## Journeys',
    '',
    ...journeys.map(j => `- [${j.data.title}](${url(`/journeys/${j.id}`)}): ${j.data.seo.description}`),
    '',
    '## Regions',
    '',
    ...regions.map(r => `- [${r.data.title}](${url(`/regions/${r.id}`)}): ${r.data.seo.description}`),
    '',
    '## Destinations',
    '',
    ...destinations.map(d => `- [${d.data.title}](${url(`/destinations/${d.id}`)}): ${d.data.seo.description}`),
    '',
    '## Travel guide',
    '',
    ...guides.map(g => `- [${g.data.title}](${url(`/guide/${g.id}`)}): ${g.data.description}`),
    '',
    '## Company',
    '',
    `- [About ${site.name}](${url('/about')}): who plans the journeys and how we work`,
    `- [How booking works](${url('/how-booking-works')}): from first message to flight home, deposits and payment`,
    `- [Booking terms](${url('/booking-terms')}): deposit, changes, cancellation and refunds`,
    `- [Plan a trip](${url('/plan')}): six short questions, answered by a specialist`,
    `- [Contact](${url('/contact')}): WhatsApp, email and phone`,
    '',
    '## Languages',
    '',
    `The home, trip planner, about and contact pages are also published in German (${url('/de')}), French (${url('/fr')}), Spanish (${url('/es')}) and Italian (${url('/it')}).`,
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
