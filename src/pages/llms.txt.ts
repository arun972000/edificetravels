/**
 * /llms.txt: a plain-text map of the site for answer engines and AI
 * assistants (https://llmstxt.org). Built from the content collections and
 * the company facts, so it changes whenever a journey, place or guide does.
 * The full text of every page is in /llms-full.txt.
 */
import type { APIRoute } from 'astro';
import { site } from '../data/site';
import { allJourneys, allRegions, allDestinations, allGuides, allThemes } from '../lib/content';
import { companyFacts, url } from '../lib/llms';

export const GET: APIRoute = async () => {
  const [journeys, regions, destinations, guides, themes] = await Promise.all([allJourneys(), allRegions(), allDestinations(), allGuides(), allThemes()]);
  const lines = [
    `# ${site.name}`,
    '',
    `> ${site.description}`,
    '',
    `${site.name} is a travel company in Rajouri Garden, New Delhi, India. Every journey is private and planned around the traveller. Prices are not published: each traveller receives an itemised written quote within 48 hours of enquiring, with every hotel named. Enquiries come by WhatsApp (+${site.whatsapp}), email (${site.email}) or the trip planner.`,
    '',
    ...(await companyFacts()),
    '',
    '## Journeys',
    '',
    ...journeys.map(j => `- [${j.data.title}](${url(`/journeys/${j.id}`)}): ${j.data.seo.description}`),
    '',
    '## Travel by interest',
    '',
    ...themes.map(t => `- [${t.data.title}](${url(`/themes/${t.id}`)}): ${t.data.seo.description}`),
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
    `- [About ${site.name}](${url('/about')}): who we are, where we are based and how we work`,
    `- [How booking works](${url('/how-booking-works')}): from first message to flight home, deposits and payment`,
    `- [Booking terms](${url('/booking-terms')}): deposit, changes, cancellation and refunds`,
    `- [Responsible travel](${url('/responsible-travel')}): how journeys are planned to be good for the places they pass through`,
    `- [Guest reviews](${url('/reviews')}): Google reviews, quoted as written`,
    `- [Plan a trip](${url('/plan')}): six short questions, answered by the team`,
    `- [Contact](${url('/contact')}): WhatsApp, email, phone and office address`,
    '',
    '## Languages',
    '',
    `The home, trip planner, about and contact pages are also published in Hindi (${url('/hi')}), German (${url('/de')}), French (${url('/fr')}), Spanish (${url('/es')}) and Italian (${url('/it')}).`,
    '',
    '## Optional',
    '',
    `- [Full text](${url('/llms-full.txt')}): every journey day by day, every region, destination and guide in full, in one file`,
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
