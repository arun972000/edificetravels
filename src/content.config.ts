/**
 * Content collections. Every page type on the site is driven by one of these,
 * so a missing price, a bad month or a typo in a region id fails the build
 * instead of going live.
 */
import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

export const REGION_IDS = ['north', 'rajasthan', 'south', 'east-northeast', 'himalaya'] as const;
export const THEMES = [
  'heritage', 'wildlife', 'wellness', 'spiritual', 'rail', 'slow-travel',
  'family', 'solo-women', 'culinary', 'beach', 'adventure',
] as const;
export const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'] as const;
export const PACES = ['relaxed', 'moderate', 'active'] as const;

const month = z.enum(MONTHS);
const photo = z.string().regex(/^[a-z0-9-]+$/, 'photo slug: lowercase letters, digits and dashes only');

const stop = z.object({
  name: z.string(),
  lat: z.number(),
  lng: z.number(),
  nights: z.number().int().min(0),
});

// Prices are deliberately not published: they are quoted on enquiry.
const tier = z.object({
  hotels: z.array(z.string()).min(1),
  vehicle: z.string(),
  note: z.string().optional(),
});

const day = z.object({
  day: z.number().int().positive(),
  title: z.string(),
  location: z.string(),
  drive: z.string().optional(),
  text: z.string(),
  stay: z
    .object({ comfort: z.string(), premium: z.string(), luxury: z.string() })
    .optional(),
  image: photo.optional(),
});

const faq = z.object({ q: z.string(), a: z.string() });

const journeys = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/journeys' }),
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    region: z.enum(REGION_IDS),
    themes: z.array(z.enum(THEMES)).min(1).max(4),
    days: z.number().int().min(3).max(30),
    routeSummary: z.string(),
    destinations: z.array(z.string()).min(1),
    stops: z.array(stop).min(2),
    pace: z.enum(PACES),
    bestMonths: z.array(month).min(1),
    tiers: z.object({ comfort: tier, premium: tier, luxury: tier }),
    highlights: z.array(z.string()).min(3).max(7),
    itinerary: z.array(day).min(3),
    inclusions: z.array(z.string()).min(3),
    exclusions: z.array(z.string()).min(2),
    faqs: z.array(faq).min(3).max(8),
    specialist: z.string(),
    heroImage: photo,
    gallery: z.array(photo).max(8).default([]),
    featured: z.boolean().default(false),
    order: z.number().int().default(100),
    seo: z.object({ title: z.string().optional(), description: z.string().max(170) }),
  }),
});

const regions = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/regions' }),
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    heroImage: photo,
    whereToGo: z.array(z.object({ name: z.string(), blurb: z.string(), destination: z.string().optional() })).min(3),
    whenToGo: z.array(z.object({ months: z.string(), note: z.string() })).min(2),
    bestFor: z.array(z.string()).min(2),
    specialist: z.string(),
    order: z.number().int().default(100),
    seo: z.object({ title: z.string().optional(), description: z.string().max(170) }),
  }),
});

const destinations = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/destinations' }),
  schema: z.object({
    title: z.string(),
    region: z.enum(REGION_IDS),
    state: z.string(),
    tagline: z.string(),
    heroImage: photo,
    lat: z.number(),
    lng: z.number(),
    bestMonths: z.array(month).min(1),
    idealNights: z.string(),
    highlights: z.array(z.string()).min(3).max(6),
    experiences: z.array(z.object({ title: z.string(), text: z.string() })).min(2).max(5),
    tips: z.array(z.string()).default([]),
    /** The sights worth the time, best first, with how long each takes. */
    sights: z.array(z.object({ name: z.string(), text: z.string(), time: z.string().optional() })).max(10).default([]),
    /** What to eat here, by name, with where or how it is best. */
    food: z.array(z.object({ name: z.string(), text: z.string() })).max(6).default([]),
    /** The year in this place, season by season. */
    seasons: z.array(z.object({ months: z.string(), text: z.string() })).max(5).default([]),
    /** Arriving and moving around. Times are approximate and say so. */
    gettingThere: z
      .object({
        air: z.string().optional(),
        rail: z.string().optional(),
        road: z.array(z.object({ from: z.string(), time: z.string() })).max(6).default([]),
        around: z.string().optional(),
      })
      .optional(),
    /** Where to stay: a line on the choice, then the areas. Hotel names come from the journeys. */
    stay: z.object({ intro: z.string(), areas: z.array(z.object({ name: z.string(), text: z.string() })).max(4).default([]) }).optional(),
    /** How we would spend the ideal stay, day by day. */
    plan: z.array(z.object({ title: z.string(), text: z.string() })).max(5).default([]),
    faqs: z.array(faq).max(8).default([]),
    /** Further photographs of this place only (never a lookalike). */
    gallery: z.array(photo).max(6).default([]),
    seo: z.object({ title: z.string().optional(), description: z.string().max(170) }),
  }),
});

const guides = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guides' }),
  schema: z.object({
    title: z.string(),
    /** Shorter title for search results when the headline runs past 60 characters. */
    seoTitle: z.string().max(60).optional(),
    description: z.string().max(170),
    category: z.enum(['planning', 'visa', 'money', 'safety', 'culture', 'food', 'transport', 'packing', 'wellness']),
    heroImage: photo,
    author: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    readingMinutes: z.number().int().positive(),
    faqs: z.array(faq).default([]),
    featured: z.boolean().default(false),
  }),
});

/**
 * Theme hubs: India by interest (heritage, wildlife, wellness and so on).
 * Each hub gathers the journeys tagged with its theme, the places that suit
 * it, the right season and the guides worth reading first.
 */
const themes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/themes' }),
  schema: z.object({
    /** Short name, used in cards, chips and the footer. */
    title: z.string(),
    /** The journey theme this hub gathers. */
    theme: z.enum(THEMES),
    /** The page headline: it says something, it is not a label. */
    headline: z.string(),
    tagline: z.string(),
    heroImage: photo,
    /** What we arrange for this interest, and why India does it well. */
    reasons: z.array(z.object({ title: z.string(), text: z.string() })).min(3).max(6),
    /** Destination ids that suit this interest, best first. */
    destinations: z.array(z.string()).min(2).max(8),
    /** Guide ids worth reading first. */
    guides: z.array(z.string()).default([]),
    bestMonths: z.array(month).min(1),
    seasonNote: z.string(),
    faqs: z.array(faq).min(3).max(8),
    order: z.number().int().default(100),
    seo: z.object({ title: z.string().max(60).optional(), description: z.string().max(160) }),
  }),
});

const specialists = defineCollection({
  loader: file('./src/content/specialists/specialists.json'),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    role: z.string(),
    bio: z.string(),
    languages: z.array(z.string()).min(1),
    basedIn: z.string(),
    /** A real photograph of this person. Without one the card shows the logo mark. */
    portrait: photo.optional(),
    yearsInTravel: z.number().int().positive().optional(),
    favourite: z.string().optional(),
    /** True while this is a demonstration profile that must be replaced before launch. */
    sample: z.boolean().default(false),
  }),
});

const reviews = defineCollection({
  loader: file('./src/content/reviews/reviews.json'),
  schema: z.object({
    id: z.string(),
    quote: z.string(),
    name: z.string(),
    country: z.string().optional(),
    month: month.optional(),
    year: z.number().int().optional(),
    journey: z.string().optional(),
    /** Where the review was first published, e.g. Google. Quote it exactly as written there. */
    source: z.string().optional(),
    /** The place the guest travelled to, as named in the review. Shown beside their name. */
    trip: z.string().optional(),
    rating: z.number().int().min(1).max(5),
    /** True while this is a demonstration review that must be replaced before launch. */
    sample: z.boolean().default(false),
  }),
});

export const collections = { journeys, regions, destinations, guides, themes, specialists, reviews };
