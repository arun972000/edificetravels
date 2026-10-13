/**
 * Site-wide facts. Everything a template needs to know about the company lives
 * here, so a changed phone number is one edit. Contact details, address and
 * social links come from the old edificetravels.com site. Values marked
 * PLACEHOLDER must be confirmed before launch (see docs/LAUNCH-CHECKLIST.md).
 */
export const site = {
  name: 'Edifice Travels',
  /** Edifice Travels is a unit of this registered entity. */
  legalName: 'Edifice Travel Solutions LLP',
  url: 'https://edificetravels.com',
  tagline: 'Private India journeys, designed by people who live here.',
  description:
    'Tailor-made private journeys across India for travellers from around the world: one team in New Delhi, an itemised written quote within 48 hours, and one WhatsApp line from first message to flight home.',
  basedIn: 'New Delhi, India',
  address: {
    street: 'V-218, Ground Floor, Rajouri Garden',
    locality: 'New Delhi',
    region: 'Delhi',
    postalCode: '110027',
    country: 'IN',
  },
  email: 'connect@edificetravels.com',
  phoneDisplay: '+91 99107 02531',
  phoneTel: '+919910702531',
  landlineDisplay: '+91 80695 10700',
  landlineTel: '+918069510700',
  /** Digits only, country code first. Used in wa.me links. */
  whatsapp: '919910702531',
  replyHours: 12,
  officeHours: { start: '09:00', end: '20:00', tz: 'Asia/Kolkata', label: '9 am to 8 pm IST, seven days a week' },
  /** Registration identifiers shown in the footer. Empty strings are hidden. */
  /** LLP identification number from the MCA register (an LLP has an LLPIN, not a CIN). */
  llpin: '', // PLACEHOLDER
  gstin: '', // PLACEHOLDER
  /** Only list memberships actually held. Empty until confirmed. */
  memberships: [] as { name: string; url?: string }[],
  social: {
    instagram: 'https://www.instagram.com/edifice_travels/',
    facebook: 'https://www.facebook.com/Edifice-Travels-107684834739310',
    twitter: 'https://twitter.com/edificetravels',
    youtube: 'https://www.youtube.com/channel/UCwlvmLJMHAisLgCFCaaSIig',
  },
  /** Opens the Google listing where guests leave reviews. */
  googleReviews: 'https://www.google.com/maps/search/?api=1&query=Edifice+Travels+Rajouri+Garden+New+Delhi',
  /** Form endpoint for the plan-your-trip wizard. Web3Forms access key goes in PUBLIC_FORM_ACCESS_KEY. */
  formEndpoint: 'https://api.web3forms.com/submit',
  /** Google Analytics 4 measurement id. Empty disables analytics entirely. */
  ga4: '',
  defaultOgImage: '/og-default.jpg',
  /** Traditional decorations (toran, rangoli, diya, paisley). Set to false to remove them all. */
  decor: true as boolean,
  languages: [{ code: 'en', label: 'English' }],
} as const;

export const nav = [
  { label: 'Journeys', href: '/journeys' },
  { label: 'Destinations', href: '/destinations' },
  { label: 'Travel guide', href: '/guide' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;

export const footerNav = {
  journeys: [
    { label: 'All journeys', href: '/journeys' },
    { label: 'Rajasthan', href: '/regions/rajasthan' },
    { label: 'South India', href: '/regions/south' },
    { label: 'North India', href: '/regions/north' },
    { label: 'Himalaya', href: '/regions/himalaya' },
    { label: 'East and Northeast', href: '/regions/east-northeast' },
  ],
  company: [
    { label: 'Our story', href: '/about' },
    { label: 'Your specialists', href: '/about#specialists' },
    { label: 'How booking works', href: '/how-booking-works' },
    { label: 'Responsible travel', href: '/responsible-travel' },
    { label: 'Guest reviews', href: '/reviews' },
    { label: 'Contact', href: '/contact' },
  ],
  help: [
    { label: 'Plan your trip', href: '/plan' },
    { label: 'India e-Visa guide', href: '/guide/india-e-visa-guide' },
    { label: 'What a trip costs', href: '/guide/what-a-private-india-trip-costs' },
    { label: 'Best time to visit', href: '/guide/best-time-to-visit-india' },
    { label: 'Travel guide', href: '/guide' },
  ],
  legal: [
    { label: 'Privacy policy', href: '/privacy' },
    { label: 'Cookie policy', href: '/cookies' },
    { label: 'Terms and conditions', href: '/terms' },
    { label: 'Booking and cancellation', href: '/booking-terms' },
    { label: 'Accessibility', href: '/accessibility' },
    { label: 'Photo credits', href: '/credits' },
  ],
} as const;
