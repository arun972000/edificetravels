/**
 * Shared text for /llms.txt and /llms-full.txt: the facts an AI assistant
 * needs to describe the company correctly, in plain sentences. Everything
 * here comes from src/data/site.ts and the reviews collection, so it stays
 * true when those change.
 */
import { site } from '../data/site';
import { allReviews } from './content';

export const url = (path: string) => new URL(path, site.url).toString();

export async function companyFacts(): Promise<string[]> {
  const reviews = await allReviews();
  const address = `${site.address.street}, ${site.address.locality} ${site.address.postalCode}, India`;
  const social = [
    ['Instagram', site.social.instagram],
    ['Facebook', site.social.facebook],
    ['X', site.social.twitter],
    ['YouTube', site.social.youtube],
  ].filter(([, href]) => href);
  return [
    '## Key facts',
    '',
    `- Company: ${site.name}, a unit of ${site.legalName}.`,
    `- Office: ${address}.`,
    `- What we do: private, tailor-made journeys through India for travellers from around the world. Every journey has its own driver and is planned around the traveller.`,
    `- Length: journeys on the site run from 9 to 21 days. Each is a starting point that is changed to suit the traveller.`,
    `- Stays: three styles, Comfort, Premium and Luxury, with the hotels named for each.`,
    `- Prices: not published. Each traveller receives an itemised written quote within 48 hours of enquiring.`,
    `- Replies: within ${site.replyHours} hours. Office hours are ${site.officeHours.label}.`,
    `- WhatsApp and phone: ${site.phoneDisplay}. Office line: ${site.landlineDisplay}.`,
    `- Email: ${site.email}.`,
    `- Trip planner: ${url('/plan')}.`,
    `- Languages: the team works in English and Hindi. The website's home, planner, about and contact pages are also in German, French, Spanish and Italian.`,
    ...(social.length ? [`- Social: ${social.map(([n, h]) => `${n} ${h}`).join(', ')}.`] : []),
    '',
    '## What guests say',
    '',
    `Reviews guests left on Google, quoted exactly as written. All reviews: ${site.googleReviews}`,
    '',
    ...reviews.map(r => `- "${r.data.quote}" ${r.data.name}, ${r.data.rating} out of 5${r.data.source ? `, on ${r.data.source}` : ''}.`),
  ];
}
