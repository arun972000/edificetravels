/**
 * JSON-LD builders. Organization and TravelAgency sitewide, TouristTrip on
 * journeys (never Product or Offer: prices stay private until someone
 * enquires), TouristDestination on places, Article on guides, BreadcrumbList everywhere,
 * FAQPage where FAQs exist (kept for readers and answer engines; Google no
 * longer shows FAQ rich results).
 */
import { site } from '../data/site';

const abs = (path: string) => new URL(path, site.url).toString();

export function organizationLd() {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'TravelAgency'],
    '@id': abs('/#organization'),
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    logo: abs('/logo.png'),
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
    areaServed: 'IN',
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
    inLanguage: 'en',
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
}) {
  const url = abs(`/destinations/${d.id}`);
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
    includesAttraction: d.highlights.map(h => ({ '@type': 'TouristAttraction', name: h })),
  };
}

export function articleLd(a: {
  id: string;
  title: string;
  description: string;
  image: string;
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
    datePublished: a.publishedAt.toISOString(),
    dateModified: a.updatedAt.toISOString(),
    author: a.authorIsTeam
      ? { '@id': abs('/#organization') }
      : { '@type': 'Person', name: a.authorName, worksFor: { '@id': abs('/#organization') } },
    publisher: { '@id': abs('/#organization') },
    inLanguage: 'en',
  };
}
