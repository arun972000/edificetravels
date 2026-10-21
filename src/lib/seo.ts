/**
 * JSON-LD builders. Organization and TravelAgency sitewide, TouristTrip on
 * journeys (never Product or Offer: prices stay private until someone
 * enquires), TouristDestination on places, Article on guides, BreadcrumbList everywhere,
 * FAQPage where FAQs exist (kept for readers and answer engines; Google no
 * longer shows FAQ rich results).
 */
import { site } from '../data/site';

const abs = (path: string) => new URL(path, site.url).toString();
const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${site.address.street}, ${site.address.locality} ${site.address.postalCode}, India`)}`;
const LANGS = ['en', 'de', 'fr', 'es', 'it'];

export function organizationLd() {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'TravelAgency'],
    '@id': abs('/#organization'),
    name: site.name,
    legalName: site.legalName,
    description: site.description,
    slogan: site.tagline,
    url: site.url,
    logo: { '@type': 'ImageObject', '@id': abs('/#logo'), url: abs('/logo.png'), width: 180, height: 180, caption: site.name },
    image: abs(site.defaultOgImage),
    email: site.email,
    telephone: site.phoneTel,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    hasMap: mapUrl,
    openingHoursSpecification: [{
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: site.officeHours.start,
      closes: site.officeHours.end,
    }],
    areaServed: { '@type': 'Country', name: 'India' },
    knowsAbout: [
      'Private tours of India', 'Tailor-made India itineraries', 'Rajasthan', 'Kerala', 'The Golden Triangle',
      'Ladakh', 'South India temples', 'Ayurveda in Kerala', 'Wildlife safaris in India', 'India e-Visa',
    ],
    knowsLanguage: ['en', 'hi'],
    sameAs: [site.social.instagram, site.social.facebook, site.social.twitter, site.social.youtube].filter(Boolean),
    contactPoint: [{
      '@type': 'ContactPoint',
      contactType: 'sales',
      telephone: site.phoneTel,
      email: site.email,
      availableLanguage: ['English', 'Hindi'],
    }],
  };
}

export function websiteLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': abs('/#website'),
    url: site.url,
    name: site.name,
    publisher: { '@id': abs('/#organization') },
    description: site.description,
    inLanguage: LANGS,
  };
}

export type PageType = 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage' | 'ItemPage';

/**
 * The page itself, tied to the site and the company, so search and answer
 * engines can read what each URL is, in which language, and how fresh it is.
 */
export function webPageLd(p: {
  url: string;
  name: string;
  description: string;
  type?: PageType;
  locale?: string;
  image?: string;
  published?: Date;
  modified?: Date;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': p.type ?? 'WebPage',
    '@id': `${p.url}#webpage`,
    url: p.url,
    name: p.name,
    description: p.description,
    inLanguage: p.locale ?? 'en',
    isPartOf: { '@id': abs('/#website') },
    about: { '@id': abs('/#organization') },
    ...(p.image ? { primaryImageOfPage: { '@type': 'ImageObject', url: p.image } } : {}),
    ...(p.published ? { datePublished: p.published.toISOString() } : {}),
    ...(p.modified ? { dateModified: p.modified.toISOString() } : {}),
  };
}

/** An ordered list of the pages a hub links to (journeys, places, guides). */
export function itemListLd(name: string, items: { name: string; href: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    numberOfItems: items.length,
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, url: abs(it.href) })),
  };
}

export function breadcrumbLd(items: { name: string; href: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: abs(it.href),
    })),
  };
}

export function faqLd(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export interface JourneyLdInput {
  id: string;
  title: string;
  description: string;
  days: number;
  image: string;
  itinerary: { day: number; title: string; location: string }[];
  themes: string[];
}

/**
 * TouristTrip only. Prices are quoted on enquiry, so there is deliberately no
 * Offer or Product markup (Google requires a price for those).
 */
export function journeyLd(j: JourneyLdInput) {
  const url = abs(`/journeys/${j.id}`);
  return [{
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    '@id': `${url}#trip`,
    name: j.title,
    description: j.description,
    url,
    image: abs(j.image),
    touristType: j.themes,
    provider: { '@id': abs('/#organization') },
    itinerary: {
      '@type': 'ItemList',
      numberOfItems: j.itinerary.length,
      itemListElement: j.itinerary.map(d => ({
        '@type': 'ListItem',
        position: d.day,
        name: `Day ${d.day}: ${d.title}`,
        item: { '@type': 'TouristDestination', name: d.location },
      })),
    },
  }];
}

export function destinationLd(d: {
  id: string;
  title: string;
  description: string;
  image: string;
  lat: number;
  lng: number;
  state: string;
  highlights: string[];
  /** Named sights; preferred over highlights for the attraction list when present. */
  sights?: { name: string; text: string }[];
}) {
  const url = abs(`/destinations/${d.id}`);
  const attractions = d.sights?.length
    ? d.sights.map(s => ({ '@type': 'TouristAttraction', name: s.name, description: s.text }))
    : d.highlights.map(h => ({ '@type': 'TouristAttraction', name: h }));
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    '@id': `${url}#place`,
    name: d.title,
    description: d.description,
    url,
    image: abs(d.image),
    geo: { '@type': 'GeoCoordinates', latitude: d.lat, longitude: d.lng },
    containedInPlace: { '@type': 'AdministrativeArea', name: `${d.state}, India` },
    includesAttraction: attractions,
  };
}

export function articleLd(a: {
  id: string;
  title: string;
  description: string;
  image: string;
  section?: string;
  authorName: string;
  /** True when the author is the company team rather than one named person. */
  authorIsTeam?: boolean;
  publishedAt: Date;
  updatedAt: Date;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: a.title,
    description: a.description,
    image: abs(a.image),
    url: abs(`/guide/${a.id}`),
    mainEntityOfPage: { '@id': `${abs(`/guide/${a.id}`)}#webpage` },
    ...(a.section ? { articleSection: a.section } : {}),
    datePublished: a.publishedAt.toISOString(),
    dateModified: a.updatedAt.toISOString(),
    author: a.authorIsTeam
      ? { '@id': abs('/#organization') }
      : { '@type': 'Person', name: a.authorName, worksFor: { '@id': abs('/#organization') } },
    publisher: { '@id': abs('/#organization') },
    inLanguage: 'en',
  };
}
