/** Typed access to the collections with the sorting every page expects. */
import { getCollection, getEntry, type CollectionEntry } from 'astro:content';

export type Journey = CollectionEntry<'journeys'>;
export type Region = CollectionEntry<'regions'>;
export type Destination = CollectionEntry<'destinations'>;
export type Guide = CollectionEntry<'guides'>;
export type Specialist = CollectionEntry<'specialists'>;
export type Review = CollectionEntry<'reviews'>;

export async function allJourneys(): Promise<Journey[]> {
  const list = await getCollection('journeys');
  return list.sort((a, b) => a.data.order - b.data.order || a.data.title.localeCompare(b.data.title));
}

export async function featuredJourneys(limit = 4): Promise<Journey[]> {
  const all = await allJourneys();
  const featured = all.filter(j => j.data.featured);
  return (featured.length >= limit ? featured : all).slice(0, limit);
}

export async function journeysByRegion(region: string): Promise<Journey[]> {
  return (await allJourneys()).filter(j => j.data.region === region);
}

export async function journeysForDestination(id: string): Promise<Journey[]> {
  return (await allJourneys()).filter(j => j.data.destinations.includes(id));
}

export async function relatedJourneys(j: Journey, limit = 3): Promise<Journey[]> {
  const all = (await allJourneys()).filter(x => x.id !== j.id);
  const score = (x: Journey) =>
    (x.data.region === j.data.region ? 2 : 0) + x.data.themes.filter(t => j.data.themes.includes(t)).length;
  return all.sort((a, b) => score(b) - score(a) || a.data.order - b.data.order).slice(0, limit);
}

export async function allRegions(): Promise<Region[]> {
  const list = await getCollection('regions');
  return list.sort((a, b) => a.data.order - b.data.order);
}

export async function allDestinations(): Promise<Destination[]> {
  const list = await getCollection('destinations');
  return list.sort((a, b) => a.data.title.localeCompare(b.data.title));
}

export async function destinationsByRegion(region: string): Promise<Destination[]> {
  return (await allDestinations()).filter(d => d.data.region === region);
}

export async function destinationsByIds(ids: string[]): Promise<Destination[]> {
  const all = await allDestinations();
  return ids.map(id => all.find(d => d.id === id)).filter((d): d is Destination => Boolean(d));
}

export async function allGuides(): Promise<Guide[]> {
  const list = await getCollection('guides');
  return list.sort((a, b) => b.data.updatedAt.getTime() - a.data.updatedAt.getTime());
}

export async function featuredGuides(limit = 3): Promise<Guide[]> {
  const all = await allGuides();
  const featured = all.filter(g => g.data.featured);
  return (featured.length >= limit ? featured : all).slice(0, limit);
}

export async function specialistById(id: string): Promise<Specialist> {
  const s = await getEntry('specialists', id);
  if (s) return s;
  const all = await getCollection('specialists');
  return all[0];
}

export async function allSpecialists(): Promise<Specialist[]> {
  return getCollection('specialists');
}

export async function allReviews(): Promise<Review[]> {
  const list = await getCollection('reviews');
  return list.sort((a, b) => (b.data.year ?? 0) - (a.data.year ?? 0));
}

export async function reviewsForJourney(id: string): Promise<Review[]> {
  return (await allReviews()).filter(r => r.data.journey === id);
}

/** Only verified (non-sample) reviews count towards a published rating. */
export async function verifiedRating(): Promise<{ value: number; count: number } | null> {
  const real = (await allReviews()).filter(r => !r.data.sample);
  if (real.length === 0) return null;
  const value = Math.round((real.reduce((s, r) => s + r.data.rating, 0) / real.length) * 10) / 10;
  return { value, count: real.length };
}

/** Day number on which each stop begins, from the nights before it. */
export function stopDays(stops: { nights: number }[]): number[] {
  let day = 1;
  return stops.map(s => {
    const start = day;
    day += s.nights;
    return start;
  });
}
