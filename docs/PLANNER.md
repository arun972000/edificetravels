# India Inbound Tourism Website: Strategic Planner

> **Decision log, 12 October 2026.** The business has decided not to publish prices online; journeys are quoted personally after an enquiry. Sections 3.2, 4.5 and 5.4 below still describe the original transparent-pricing recommendation for reference. The site now promises an itemised written quote within 48 hours instead. The site is also available in German, French, Spanish and Italian (home, planner, about, contact) with a country picker.

Prepared 6 October 2026. Status: planning only. No site code exists yet and none should be written until the decisions in Section 15 are made.

Companion file: `COMPETITOR-AUDIT.md` holds the per-competitor detail that this planner summarises.

---

## 0. How to read this document

- Sections 1 to 3 are the verdicts: what to do, what not to do, and why.
- Sections 4 to 11 are the plan itself: positioning, visual approach, site architecture, lead capture, content, technology, legal, operations.
- Sections 12 to 15 are roadmap, metrics, risks and the decisions only you can make.
- Anything marked **(uncertain)** could not be verified from an official source. Anything marked **(not measured)** could not be tested with the tools available today.

What was researched: 15 India-based inbound operators, 13 mainstream Indian travel majors, 10 global luxury/specialist operators, the two 3D-template vendors you named, award-winning travel sites 2024 to 2026, Ministry of Tourism and parliamentary data, Indian and EU legal requirements, and Google's current technical standards. Cholan Tours was audited directly, including its sitemap, markup and sister brand.

---

## 1. Executive summary

**The market.** India received about 9.95 million foreign tourist arrivals in 2024 and roughly 9.1 million in 2025 (a decline driven by Bangladesh visa restrictions). Arrivals are recovering in 2026 (January to August up 3.7%, August alone up 10.6%). The high-value markets are the USA, UK, Australia, Canada, Germany and France. These travellers stay 20 to 31 days on average, and 43% of all arrivals land between November and February. Leisure is 45% of visits; diaspora visits are 28%.

**The competition splits into three tiers, and the middle tier is weak online.**

| Tier | Who | Web quality | Inbound focus |
|---|---|---|---|
| Global specialists | Audley, Enchanting Travels, Jacada, Black Tomato, Scott Dunn, Shanti Travel | Excellent | Yes, but foreign-owned, UK/US/France-centric phones, EUR or USD only |
| India-based inbound operators | Cholan Tours, India Someday, Le Passage to India, Indian Holiday, Tour My India, India By Car and Driver, plus 20 or so Jaipur/Delhi agencies | Mostly template-driven, heavy, opaque on price, stale trust badges | Yes, but diluted with domestic, outbound and car rental |
| Mainstream Indian majors | MakeMyTrip, Thomas Cook, SOTC, Yatra, EaseMyTrip, Veena World, Kesari, TravelTriangle, Thrillophilia, Holidify, Cox & Kings | Catalogue/OTA style, discount-led | No. INR only, India-departure only. Not a factor for foreigners |

**Nobody in India combines** global-standard design, transparent multi-currency pricing, real localised pages, a named specialist at the point of enquiry, a stated reply time, and a fast mobile site. That combination is the opening.

**Cholan Tours** (your named competitor) has strong offline credentials: 27 years, Ministry of Tourism approval, Lufthansa City Center affiliation, 12 to 14 offices, 150-plus vehicles, five National Tourism Awards. Its website is where it is beatable: no prices anywhere, a cosmetic 11-language switcher with no real translated pages (all language URLs return 404, no hreflang), a 464 KB homepage, Organization-only structured data, itinerary pages with no map, hotels, reviews or sticky call to action, and a brand diluted across inbound, domestic, outbound, car rental and bus rental on one domain. You cannot match their credentials in year one. You can beat their web experience in year one.

**3D template sites: not as a foundation.** motionsites.ai sells AI prompts (not templates) to paste into Lovable or Bolt; scrolltide.co sells scroll-driven single-page scaffolds (React, Three.js, GSAP, Lenis) from a solo maker with no reviews and no refunds. None of the ten global leaders uses WebGL or 3D. Google's crawler cannot render WebGL. A Three.js hero alone weighs 0.6 to 3 MB, more than a typical complete mobile page, and the travel buyer demographic (45 to 70) has the highest rate of motion sensitivity. Google's own data shows a 0.1-second speed gain lifts travel-site conversions by about 10%. Use these vendors, at most, as mood references for one isolated section.

**Recommended visual approach:** "editorial cinematic, map-led". Photography and short muted video loops carry the emotion; typography and whitespace carry the premium feel; an SVG map of India with scroll-drawn route lines carries the "standalone" identity; motion is restrained and respects reduced-motion settings. Your theme (to be shared later) should be applied within the guardrails in Section 5.

**Recommended positioning:** an inbound-first "India journey designer" for independent travellers from the USA, UK, Australia, Canada, Germany and France, selling private 10 to 21 day journeys at a premium-mid price band (roughly USD 150 to 350 per person per day, with a luxury tier above), with transparent "from" prices in four currencies, a named specialist beside every enquiry form, WhatsApp-native concierge, and a public reply-time promise. Domestic and outbound products live in a clearly separated section, not on the homepage.

**Recommended stack:** Astro, Tailwind, GSAP for a few reveals, content in Markdown or a lightweight headless CMS, Cloudflare Pages hosting, Cloudflare Images or Cloudinary for media, Web3Forms or a Cloudflare Pages Function for email leads, wa.me links for WhatsApp, GA4 plus Microsoft Clarity. No backend is required for anything in Phases 1 to 3.

**Timeline estimate:** 2 to 3 weeks of foundation work (brand, products, pricing, photography, legal, WhatsApp and review profiles), then 5 to 7 weeks to build and launch an English site with 12 to 16 priced journeys, then an ongoing content engine, then German and French pages around month 4 to 6.

---

## 2. Market reality and what it means for the site

### 2.1 The numbers

| Metric | Value | Source year |
|---|---|---|
| Foreign tourist arrivals (FTAs), 2019 | 10.93 million | Ministry of Tourism |
| FTAs, 2024 | 9.95 million | Rajya Sabha reply, Dec 2025 |
| FTAs, 2025 | 9.15 million or 9.02 million, two official versions circulate **(uncertain)** | Annual Tourism Snapshot 2025 |
| FTAs, Jan to Aug 2026 | 6.19 million, up 3.7% | PIB / press |
| Foreign exchange earnings, 2024 | USD 35.02 billion | India Tourism Data Compendium 2025 |
| Share of arrivals in Nov to Feb | about 43% | Monthly statistics 2025 |
| Average stay | 18 days overall; USA 24, Australia 24, Canada 31 | Compendium 2025 |
| Purpose: leisure / diaspora / business / medical | 45% / 28% / 11% / 6% | Compendium 2025 |
| Top source markets 2024 | USA 18.1%, Bangladesh 17.6%, UK 10.3%, Australia 5.2%, Canada 4.8%, then Malaysia, Sri Lanka, Germany, France, Singapore | Compendium 2025 |
| e-Visa coverage | 172 nationalities; 30-day USD 10 to 25, 1-year about USD 40, 5-year about USD 80 | Lok Sabha reply 2026 |
| Medical arrivals 2025 | 507,244 | PIB |
| True foreign leisure tourists (IATO estimate) | 2 to 3 million per year **(uncertain, industry estimate)** | Business Today, Aug 2026 |

Government direction: Budget 2025-26 funds 50 destinations in challenge mode, Buddhist circuits, "Heal in India" medical tourism and easier e-visas; Budget 2026-27 adds 15 archaeological sites as experiential destinations, nature and mountain trails, and the first Global Big Cat Summit. NITI Aayog has recommended a 90-day visa-on-arrival for selected countries, which is not yet implemented. The Incredible India portal was relaunched in September 2024 with an AI trip planner and a free Content Hub of about 5,000 images and films that licensed operators can use.

### 2.2 Implications

1. Build products for 10 to 21 days, not 5-day city breaks. Long-haul visitors stay three to four weeks.
2. Launch content and campaigns in July to October so pages are indexed before the November to February peak. Use monsoon and shoulder offers for May to September.
3. Treat diaspora visitors (28% of arrivals) and their non-Indian friends as a named segment: "bring your friends to India" content.
4. Visa guidance belongs on the homepage path, not buried. It is the top friction point named by NITI Aayog.
5. Safety and scam concerns must be answered explicitly and early: licensed drivers, women-traveller policies, 24/7 WhatsApp, transparent pricing.
6. Product pillars with proven demand: Golden Triangle plus extensions, Rajasthan heritage, Kerala and South India slow travel, Himalaya and Ladakh, wildlife, wellness and Ayurveda, spiritual and Buddhist circuits, luxury rail.
7. There is no digital nomad visa and remote work on a tourist visa is not permitted, so do not market to nomads.

---

## 3. Competitive verdict

### 3.1 What the global leaders do (the standard to match)

Audley, Jacada, Black Tomato, Scott Dunn, Enchanting Travels and Shanti Travel share one playbook:

- A text-led hero that states a promise ("Tailor-made India holidays shaped around your passions"), not a slideshow.
- A persistent "Start planning" call to action and a phone number in the header.
- Trip cards with duration, "From USD X per person" and a theme.
- Region hubs with "where to go", "when to go" month grids, specialist-picked experiences and a specialist's face and quote.
- A short "why book with us" block of three pillars, then third-party review counts (Trustpilot 3,000-plus for Enchanting, 1,913 for Shanti).
- Enquiry as a 2-step or multi-step wizard with trust signals placed beside the form.
- Motion limited to fades, hover and the occasional muted video. No 3D, no WebGL, no scroll-hijacking.

Their weaknesses from an India-based competitor's view: no WhatsApp at the premium end, no reply-time promise, phones in London, New York or Paris, EUR or USD only, and India is one of ten to forty destinations so depth is thin.

### 3.2 What India-based operators do badly (the opportunity map)

Across 15 India-based inbound operators, almost all of them share these gaps:

1. **Price opacity.** Only six show any foreign-currency price. Nobody shows a tier explainer ("what USD 200 per day buys you") or a currency toggle.
2. **WhatsApp is either absent (premium brands) or spammed (budget brands).** One tasteful, context-aware WhatsApp button with a stated reply time is uncontested.
3. **Reply-time promises are rare.** Only Top Indian Holidays (12 hours) and YoYo Trips (24 hours) state one.
4. **Multilingual is fake or thin.** Only India Someday and Shanti serve non-English consumers properly with hreflang. Cholan, Le Passage to India and Travelogy have language switchers or sister sites without proper indexable pages.
5. **Page weight and template bloat.** Ten of eighteen homepages ship no responsive images. Revolution Slider, Elementor, Wix and Betheme are everywhere. Homepages of 0.6 to 1.2 MB HTML with 200-plus images are common.
6. **Stale trust.** TripAdvisor 2017 badges, ISO 9001:2008, "WTA Nominee 2020". Nobody explains what Ministry of Tourism or IATO recognition means to a foreigner.
7. **Shallow itinerary pages.** Maps, named hotels by tier, drive times, inclusions, FAQs and reviews each appear on one to three sites. None combines them all.
8. **Fragmented practical content.** e-Visa steps, eSIM, money, tipping, women's safety, dress, trains: only India Someday and Enchanting cover these coherently.
9. **Technical SEO slips.** JavaScript-rendered listings, 403s to non-browser agents, placeholder "$39" prices, staging URLs in production, missing structured data.
10. **No human face at the enquiry.** Only Shanti, Premium India Tours and Enchanting show who will reply.
11. **Positioning dilution.** Domestic pilgrimages, Dubai packages and inbound luxury on one brand.
12. **Honest cost guides are owned by an elephant sanctuary.** Elefantastic and Top Indian Holidays rank for "best India tour companies for foreigners" and "Rajasthan tour cost" with listicles. Premium players publish none.

### 3.3 Cholan Tours specifically

| Dimension | Cholan Tours today | Where you can win |
|---|---|---|
| Credentials | MoT approved, 5 National Tourism Awards, LCC affiliate, 12 to 14 offices, own fleet | Cannot match in year one. Do not try. Compete on web experience and specialism |
| Positioning | "India's Most Trusted Tour & Travel Company"; inbound, domestic, outbound, car rental, bus rental on one domain | Inbound-only homepage; single clear promise |
| Pricing | None anywhere | "From" prices in INR, USD, EUR, GBP, AUD by comfort tier |
| Languages | 11 flags, zero real translated pages, no hreflang | Real German and French pages with hreflang by month 6 |
| Itinerary pages | No map, no hotels, no reviews, no sticky CTA, phone-only enquiry form | Full anatomy (Section 6.3) |
| Trust presentation | "4.9 rating" with no source; "1M+ travellers"; three different founding years across their own properties (1995, 1999, 2000) | Sourced review widgets, specific verifiable claims, consistent story |
| Technical | Next.js, 464 KB homepage HTML, 20 scripts, Organization-only schema, an AI-drafted llms.txt shipped with the line "Refined draft generated from your current file. Review before publishing." still in it | Under 100 KB HTML, full TouristTrip and Product schema, reviewed content |
| Content scale | 1,693 URLs: 546 destination, 409 packages, 367 blog posts | Fewer, deeper, better-written pages aimed at foreign searchers |
| Regional strength | Trichy, Tamil Nadu; South India depth | If you are also South-India based, this is head-on. Their inbound web funnel is weak enough that a focused South India wedge is viable (see Section 15, decision 1) |

### 3.4 Mainstream majors

MakeMyTrip, Thomas Cook, SOTC, Yatra, EaseMyTrip, Veena World, Kesari, TravelTriangle, Thrillophilia, Pickyourtrail, Holidify and the relaunched Cox & Kings are not competitors for foreign travellers. They are INR-only, India-departure, discount-led catalogues. Thomas Cook's inbound business runs B2B through SITA and TCI with no consumer funnel. The only reason they matter here is as the definition of the "common site look" you want to avoid (Section 5.4), and as benchmarks if you later add a domestic section.

Indian-market price benchmarks captured in October 2026, per person twin-share:

| Product | Budget | Mid | Group/brand |
|---|---|---|---|
| Kerala 6N/7D | INR 9,999 | INR 24,000 to 33,000 | Thomas Cook INR 34,900 to 57,600; Kesari INR 38,990 to 56,990 |
| Rajasthan 8 to 10 days | INR 19,000 to 26,600 | INR 24,499 to 49,925 | Veena World from INR 43,000 |
| Golden Triangle for foreigners, 6 to 7 days private | USD 185 to 730 | USD 1,120 to 1,500 | Goway from CAD 2,139; group tours USD 1,000 to 1,600 **(uncertain)** |
| Luxury India (Enchanting Travels) | | USD 3,000 to 10,000-plus per person per trip; sample "From USD 7,590" | |

The Golden Triangle search results are a price war between Delhi and Jaipur agencies at USD 185 to 730. Do not enter that war as a new brand; sell it as an extension inside longer journeys.

---

## 4. Positioning and brand strategy

### 4.1 Three positioning options

| Option | Description | Verdict |
|---|---|---|
| A. India journey designer (premium-mid FIT) | Private, tailor-made 10 to 21 day journeys for long-haul independent travellers; transparent tiered pricing; named specialists; WhatsApp concierge | **Recommended.** Matches the biggest gaps and the highest-value visitors |
| B. Regional authority wedge | Same as A but launched as the South India specialist (Tamil Nadu, Kerala, Karnataka, Pondicherry) and expanding north in year two | **Recommended as the launch wedge if you are South-India based.** Depth beats breadth for a new brand; it also gives you a story the Delhi/Jaipur agencies cannot tell |
| C. Broad inbound catalogue | Hundreds of packages across India, Nepal, Sri Lanka, car rental, trains | Not recommended. This is Cholan's and Indian Holiday's model and it is why their sites feel generic |

### 4.2 Target segments in priority order

1. Couples 45 to 70 from USA, UK, Australia, Canada; culture, heritage, wildlife, wellness; 14 to 21 days; comfort to luxury hotels.
2. Solo women travellers 30 to 60 from the same markets; safety-first messaging, women drivers where available, 10 to 14 days.
3. German and French speakers (Germany and France are both top-10 source markets; India Someday and Shanti prove the demand); served in English at launch, in their language by month 6.
4. Diaspora families bringing non-Indian friends; "show your friends the real India" content.
5. Multi-generational families and small private groups (4 to 8) during December and January.
6. Later: foreign tour operators looking for an India ground partner (one B2B page in Phase 2).

### 4.3 Brand promise and proof

The promise should be stated in one sentence on the homepage and proven within one scroll. Suggested shape (final wording comes with your design and theme):

- Promise: a private India journey designed by people who live here, priced openly, with one specialist on WhatsApp from first message to flight home.
- Proof pillars (three, no more): transparent pricing; your named specialist; on-the-ground reliability (licensed drivers, vetted hotels, 24/7 line).

### 4.4 Trust architecture for a new company

You will have no Ministry of Tourism approval in year one (it requires one year of operation and INR 25 lakh foreign-exchange turnover), few reviews and no awards. The plan:

Day one:
- Registered company name, CIN and GSTIN in the footer; registered office address; founder and specialist names with photographs.
- IATO allied or associate membership (open to new firms) and state accreditation where you operate (Kerala's is online with two-year validity).
- A plain-English "How booking and payment work" page: proposal, deposit, hotel confirmations shared, balance timing, cancellation ladder, what protection you offer.
- Public reply-time promise, for example "a named specialist replies within 12 hours, seven days a week".
- Google Business Profile, Trustpilot and TripAdvisor listings created before launch so the first ten reviews land in month one.
- A "no hidden costs" statement on every itinerary page with inclusions and exclusions.
- Partner hotel and driver standards described specifically (vehicle age, driver licensing, insurance), not as logos.

Earned later:
- Ministry of Tourism recognition after year one; then IATO active membership.
- Review counts (target 50 Google and 50 Trustpilot reviews by month 12).
- Press and award mentions only when real. Never display a badge you do not hold; misuse of the MoT logo is actionable.

### 4.5 Pricing policy

- Every journey shows "From INR X per person" with a client-side toggle to approximate USD, EUR, GBP, AUD, dated and marked as approximate. INR is the legal price (FEMA guidance discourages insisting on foreign-currency payment).
- Three comfort tiers per journey (for example Comfort, Premium, Luxury) with example hotels named per tier. This is what Enchanting Travels does and what nobody India-based does.
- One honest cost guide article ("What a two-week private India trip costs in 2026-27") because that query is currently owned by low-end agencies.
- GST at 5% on tour-operator services shown as included.

### 4.6 Domestic and outbound segments

Keep them off the inbound homepage. Recommended structure: the main site is inbound; a separate hub at a path such as `/for-indian-travellers/` (or a sub-brand later) holds domestic and international holidays for the Indian market with its own navigation and INR-first presentation. Launch it in Phase 4, not Phase 1. The tax change in the Finance Act 2026 (TCS on overseas tour packages cut to a flat 2% from 1 April 2026) is a selling point for that section when it arrives.

---

## 5. Visual approach

### 5.1 Verdict on 3D and motion-template sites

| Question | Finding |
|---|---|
| What do motionsites.ai and scrolltide.co actually sell? | motionsites.ai: a library of AI prompts to paste into Lovable, Bolt, Cursor or Claude; its own site is Webflow plus video. Pricing page returned 404; third-party listings show USD 149 to 349 **(uncertain)**. scrolltide.co: 111 scroll-driven templates as prompts plus source (React/Vite/Next.js, Three.js, GSAP, Lenis, canvas image sequences); USD 29 per month, USD 108 per year, USD 239 lifetime; 3D templates only on yearly or lifetime; "all sales are final" |
| Reviews | None found for either. Product Hunt launch for motionsites has zero reviews; comments raised mobile load concerns. scrolltide links to one maker's Instagram |
| Travel-ready structure | None. No itinerary, enquiry or multi-page structure. Travel-adjacent templates are single-page mood pieces |
| SEO | Canvas and WebGL content is invisible to Googlebot, which does not support WebGL and does not scroll. Lovable and Vite output is client-rendered by default. An Awwwards-honoured travel site (Hedwig) returns only the word "HEDWIG" to a non-JavaScript fetch |
| Performance | Three.js core is about 600 KB minified before any scene; with helpers and a model, past 3 MB. The median complete mobile page is 2.3 MB. Animation-heavy sites fail INP most often |
| Mobile | Shader compilation delays, memory limits around 100 to 200 MB per tab on iOS, thermal throttling of 30 to 50% |
| Accessibility | 35% of adults over 40 have vestibular dysfunction; WCAG requires motion to be disable-able |
| Conversion evidence | Google/Deloitte: 0.1 s faster gives travel sites about 10% more conversions and lead-gen sites 21.6% more form progression. Nielsen Norman Group: scroll animations and parallax slow users and create frustration on task-focused sites. No credible study shows a 3D hero lifts lead-gen conversion |
| Do the leaders use it? | None of the ten global operators audited. Award-winning travel sites of 2024 to 2026 use video loops, editorial type and photography. The one true 3D travel piece found (Primland resort flythrough) was a bespoke studio build for a single resort, not a tour-operator site |

Conclusion: do not build on these templates. They would cost you crawlability, speed, mobile reliability and a developer rebuild of 90% of the site anyway. They are acceptable only as inspiration for one below-the-fold section, desktop-only, lazy-loaded, with a static fallback.

### 5.2 Recommended direction: "editorial cinematic, map-led"

This is a direction, not a theme. Your theme will define colours, type and components; it must work inside these principles.

- **Photography first.** Full-bleed stills and 6 to 10 second muted video loops with poster frames. Real places, real guests, real specialists. Budget for a professional shoot or licensed Incredible India Content Hub assets; stock Taj-at-sunrise is the number one "common site" signal.
- **Editorial typography.** A display serif or high-contrast face for headlines, a humanist sans for body, large sizes, generous line-height, wide margins. Headlines that say something ("Three weeks from the Thar to the backwaters") rather than labels ("Rajasthan Tour Package 7N/8D").
- **The map is the signature.** A hand-finished SVG map of India (regions, not political borders in dispute; note Jammu and Kashmir and Arunachal boundaries must follow the Survey of India depiction when shown to Indian audiences) with hover and tap regions, route lines that draw as you scroll, and a mini route map on every journey page. This is a few kilobytes and gives the "standalone" identity 3D templates promise without their cost.
- **Pacing.** Alternate full-bleed imagery with quiet text sections. One idea per screen. No carousels that auto-rotate.
- **Human presence.** Specialist portraits beside every enquiry point; a founder's letter on the About page; guest photographs in reviews.
- **Indian colour used as accent, not wallpaper.** Saffron, indigo, sandstone or deep green as a single accent against a calm neutral base.
- **Dark and light both designed.** Many of your visitors browse at night on phones.

Reference set to show your designer: Black Tomato (editorial type), Spain Collection Travel (cinematic loops, cream palette), Made for Spain and Portugal (map-led itinerary browsing), Jacada and Audley (region hub and trip page structure), Shanti Travel (enquiry wizard with trust beside the form), Travel Next Level (restrained GSAP on Webflow).

### 5.3 Motion rules and performance budgets

Allowed:
- CSS transform and opacity transitions; CSS scroll-driven animations with no-op fallback.
- GSAP with ScrollTrigger (now free) for a few reveals, loaded only on pages that use it.
- SVG stroke animation for map routes.
- View Transitions between pages.
- Lottie or Rive for small icons only.
- One optional lazy-loaded 3D object below the fold, desktop-only, gated by prefers-reduced-motion, Save-Data and device memory, with a static poster fallback. This is a "nice to have" in Phase 4, not a launch item.

Not allowed:
- Full-viewport WebGL or shader heroes; text rendered in canvas; preloaders; custom cursors; scroll-hijacking; site-wide smooth-scroll libraries; auto-rotating carousels; entrance animations on the enquiry form; autoplay video on mobile or slow connections.

Budgets (75th percentile, real mobile users):

| Metric | Budget |
|---|---|
| Largest Contentful Paint | 2.0 s or less (Google threshold 2.5 s) |
| Interaction to Next Paint | 200 ms or less |
| Cumulative Layout Shift | 0.05 or less |
| Compressed JavaScript per content page | 150 KB or less; 300 KB on a page with the map island |
| Hero | poster 200 KB or less; video loop 2.5 MB or less; no autoplay on mobile |
| First-view page weight, mobile | 1.5 MB or less |
| Fonts | 2 families, 120 KB or less, subset |
| Lighthouse mobile performance | 90 or more |

**(not measured)**: live Lighthouse and CrUX scores for competitors could not be fetched today because the PageSpeed API quota was exhausted. Re-run before build using PageSpeed Insights in a browser.

### 5.4 The "common site look" to avoid

From the mainstream majors and template-driven operators:

1. INR "Starting from" price grids with strike-through "29% OFF" badges and coupon codes.
2. Hero carousels rotating bank offers and EMI.
3. Mega-footers with hundreds of "X packages from Y city" links.
4. Stacked lead-gen: callback form plus chatbot bubble plus app QR plus login nag plus exit modal on one page.
5. "302 travellers online" and "143 trips booked last week" tickers.
6. Identical stock imagery (houseboat, Hawa Mahal, Taj at sunrise) in uniform 16:9 cards.
7. Multi-layer filters before any story is told.
8. "40 Lac+ happy travellers" vanity counters.
9. Generic testimonials with no name, photo, date or journey.
10. Payment badges and toll-free numbers as the main trust device.
11. Package names like "Kerala Tour Package 5 Days 4 Nights".
12. A phone-number-only enquiry form (Cholan's current pattern).

---

## 6. Site architecture

### 6.1 Primary navigation (inbound-first)

- **Journeys**: by region (North, Rajasthan, South, East and Northeast, Himalaya) and by theme (Heritage, Wildlife, Wellness, Spiritual, Rail, Slow travel, Family, Solo women).
- **Destinations**: region hubs and destination pages.
- **Plan your trip**: the enquiry wizard.
- **Travel guide**: visa, when to go, costs, safety, first-timer guide, practical articles.
- **About**: story, specialists, how booking works, responsible travel, reviews.
- **Contact** (with WhatsApp, email, hours in the visitor's time zone).

Header: logo, nav, "Plan your trip" button, WhatsApp icon. No phone number clutter; one number on the contact page and in the footer.

Footer: company identity (name, CIN, GSTIN, address), memberships actually held, policies, languages, social, newsletter.

### 6.2 Page templates (Phase 1)

| Template | Count at launch | Purpose |
|---|---|---|
| Home | 1 | Promise, proof, featured journeys, map, specialists, reviews, guide teasers |
| Journey (itinerary) | 12 to 16 | The conversion page; see 6.3 |
| Region hub | 5 to 6 | Where to go, when to go, journeys, specialist |
| Destination | 25 to 30 | Place pages that feed journeys and SEO |
| Theme hub | 6 to 8 | Wildlife, wellness, etc. |
| Plan your trip | 1 | Multi-step wizard plus WhatsApp |
| Travel guide article | 15 to 20 | Visa, costs, safety, packing, trains, eSIM, tipping, festivals |
| Specialist profile | 2 to 4 | Who you will talk to |
| About, How booking works, Responsible travel, Reviews, Contact | 5 | Trust |
| Legal: Privacy, Cookies, Terms, Booking and Cancellation, Accessibility statement | 5 | Compliance |
| 404, Thank-you | 2 | Housekeeping; thank-you pages carry conversion tracking |

About 80 to 100 pages at launch, all static.

### 6.3 Journey page anatomy (combine what no competitor combines)

1. Hero: one strong still or loop, journey name, one-line promise.
2. Facts bar: days, route, "From INR X" with currency toggle, best months, pace (relaxed/moderate/active), comfort tiers.
3. Route map: SVG with the route drawn on scroll; tap a stop to jump to that day.
4. "Why this journey": three to five specific reasons written by the specialist.
5. Day by day: each day with drive time, what happens, where you sleep by tier (named example hotels), one image.
6. Inclusions and exclusions, plainly.
7. Price tiers: what changes between Comfort, Premium and Luxury.
8. Specialist card: photo, name, "I design this journey", WhatsApp button with pre-filled text, short form.
9. FAQs: 5 to 8 written for real objections (visa, safety, food, tipping, solo).
10. Reviews from guests on this or a similar journey, with name, country, month.
11. Related and extension journeys.
12. "Make it yours" call to action to the wizard.
13. Sticky bottom bar on mobile: price, WhatsApp, Plan.

### 6.4 Plan-your-trip wizard

Static, client-side, 4 to 6 steps, progress visible, trust signals beside it (specialist photo, reply time, review count):

1. Where (regions on the map, or "help me choose").
2. When and how long.
3. Who is travelling (adults, children, solo).
4. Comfort tier and budget band per person.
5. Interests (multi-select).
6. Contact: name, email, country, WhatsApp number (optional), preferred contact method, consent checkbox.

On submit: the form posts to the email service; the thank-you page offers a one-tap WhatsApp link pre-filled with the summary of their answers, so the lead can continue on WhatsApp immediately if they wish.

### 6.5 Static-site constraints and how they are met

| Need | Static answer |
|---|---|
| Email leads | Form posts to Web3Forms, Formspree, Basin or a Cloudflare Pages Function with Resend; spam protection with Turnstile and a honeypot |
| WhatsApp leads | wa.me links with per-page pre-filled text; no server needed; the visitor presses send |
| Currency display | Rates stored in the build (updated weekly via a scheduled rebuild) or fetched client-side from a free rate API; always labelled approximate and dated |
| Reviews | Trustpilot, Google or TripAdvisor widget loaded lazily, plus curated static reviews in the page for crawlers |
| Content updates | Markdown or a headless CMS (Keystatic or Sanity) triggering a rebuild; updates live in minutes |
| Itinerary PDF | Generated at build time per journey, downloadable |
| Search and filters | Client-side over a small JSON index |
| Languages | Separate static pages per language under subfolders |
| Not possible without a backend | User accounts, live availability, online payment (use Razorpay or PayPal payment links sent after the proposal instead), CRM logic (handled in the CRM, not the site) |

---

## 7. Lead capture and conversion design

### 7.1 WhatsApp specification

- Link format: `https://wa.me/91XXXXXXXXXX?text=<URL-encoded message>`; digits only, no plus sign or spaces.
- Pre-filled text per page type, for example: "Hi, I'm looking at the 16-day Rajasthan and Agra journey for 2 adults in February. Could you send a proposal?" The visitor edits and presses send.
- One WhatsApp entry point per screen, not a floating bubble on top of a form on top of a chatbot.
- Show reply hours in the visitor's local time (detected client-side) and the reply-time promise.
- WhatsApp Business app at launch (free, one number, four linked devices, labels, greeting and away messages, catalogue). Move to the WhatsApp Business Platform via a provider when volume passes roughly 20 to 30 conversations per day or you need CRM automation. Marketing broadcasts need opt-in; never request card numbers or passport numbers in chat.
- Track clicks as GA4 conversion events with page and journey as parameters.

### 7.2 Email form specification

Fields: name, email, country, travel month, days, travellers, comfort tier, message, WhatsApp number (optional), consent checkbox linking to the privacy policy. Hidden: page URL, UTM parameters, time zone.

Routing: form service sends to a shared inbox and to a CRM (HubSpot free, Zoho or Brevo). Auto-reply within one minute with the specialist's name, what happens next, and a WhatsApp link. Human reply within the promised window.

### 7.3 Conversion principles

- Reply-time promise on every enquiry point.
- Specialist face and name at every enquiry point.
- Transparent "from" price before the form, never after.
- Thank-you pages that keep the conversation going (WhatsApp link, "what to read while you wait").
- Microsoft Clarity session recordings and heatmaps to see where foreign visitors hesitate.

---

## 8. Content and SEO strategy

### 8.1 Keyword clusters (inbound, English)

| Cluster | Example queries | Page type |
|---|---|---|
| Journey intent | India private tour, custom India itinerary, India tour for Americans/Australians, luxury India tours, 2 week India itinerary, 3 week India itinerary | Journey pages, theme hubs |
| Region | Rajasthan tour, Kerala tour, South India tour, Golden Triangle tour with Varanasi, Ladakh trip, Northeast India tour | Region hubs, journeys |
| Theme | India wildlife safari, tiger safari India, Ayurveda retreat Kerala, yoga retreat Rishikesh, Buddhist circuit tour, Maharajas' Express cost | Theme hubs, journeys |
| Planning and cost | how much does a trip to India cost, India trip cost 2 weeks, best time to visit India, India e-visa for US citizens, is India safe for solo female travellers, what to pack for India | Travel guide |
| Trust | best India tour companies for foreigners, India travel agency reviews, how to choose an India tour operator | Guide plus About |
| Diaspora | planning a trip to India with foreign friends, India itinerary for first-time visitors | Guide |

Avoid competing on "Golden Triangle 6 days price" and "Kerala tour package" as standalone pages at launch; they are price wars.

### 8.2 Launch content list

- 12 to 16 signature journeys, each 1,200 to 2,000 words with the anatomy in 6.3.
- 5 to 6 region hubs and 25 to 30 destination pages (500 to 900 words each, expert tone, no filler).
- 15 to 20 guide articles, starting with: e-Visa step by step (dated "last verified"), what a private India trip costs, best time to visit by region, solo women in India, first-time 14-day and 21-day itineraries, trains and domestic flights, money and tipping, eSIM and connectivity, food and health, dress and etiquette, festivals calendar, how booking and payment work, how to choose an India tour company.
- About, specialists, responsible travel, reviews.

Cadence after launch: 4 guide articles and 1 new journey per month; refresh visa and cost pages quarterly with a visible "updated" date.

### 8.3 Answer-engine and AI search practices

AI Overviews now appear on roughly 72% of travel queries and 80% of surveyed travellers use generative AI for planning. Practices that get a tour operator cited:

- Question-style H2 and H3 headings with a direct 40 to 60 word answer under each.
- Explicit facts on journey pages: days, inclusions, "from" price, best months, group size, pace.
- Consistent entity data: Organization schema with sameAs links to Google Business Profile, Trustpilot, TripAdvisor and social profiles; a clear About page.
- Author bylines with local expertise and photographs; "updated" dates.
- Third-party corroboration: reviews on external platforms, press, Reddit and Quora mentions.
- Allow GPTBot, PerplexityBot, Google-Extended and ClaudeBot in robots.txt. An llms.txt file is optional and unproven; if you add one, review it (Cholan shipped theirs with the draft notice still inside).

### 8.4 Structured data

- Organization or TravelAgency sitewide with sameAs.
- TouristTrip per journey (itinerary, offers, provider, touristType) plus Product with Offer and AggregateRating for review snippets. Put ratings on journey pages, not on the agency entity; Google does not show review snippets for self-serving organisation reviews.
- BreadcrumbList everywhere; Article and Person on guides; Event for festivals; VideoObject where video appears.
- Keep FAQ sections for readers and AI engines, but expect no FAQ rich result; Google removed FAQ rich results in May 2026.

### 8.5 International SEO plan

- One .com domain; English at the root (one English page serves US, UK, AU and CA); German under `/de/` and French under `/fr/` in Phase 3; hreflang with x-default; never redirect by IP.
- Phase 2 language candidates chosen from enquiry data: Spanish, Italian, Dutch, Japanese.
- Translate by a native-speaking travel writer, not machine output; adapt examples (currency, holidays, flight hubs).

---

## 9. Technology and performance

### 9.1 Stack recommendation

| Layer | Choice | Reason |
|---|---|---|
| Framework | Astro 5 | Zero JavaScript by default; islands for the map, wizard and currency toggle; content collections for journeys; built-in image optimisation; best Lighthouse results among static options |
| Alternative | Next.js static export | Acceptable if your developers already live in Next.js (Jacada, Abercrombie & Kent, Exoticca and Cholan use it); it ships a React runtime on every page, so budgets get harder |
| Not recommended as the main build | Webflow, Framer | Lock-in; Webflow export loses CMS and forms; Framer is a landing-page tool at 100-plus pages |
| Styling | Tailwind with design tokens from your theme | |
| Motion | GSAP + ScrollTrigger as islands only; CSS scroll-driven animations | |
| Content | Markdown/MDX in the repo at launch; Keystatic or Sanity when non-developers need to edit | |
| Hosting | Cloudflare Pages | Free, unlimited bandwidth, global edge; Vercel or Netlify are fine alternatives |
| Media | Cloudflare Images or Cloudinary (auto format and quality); video via Cloudflare Stream, Mux or Bunny | |
| Forms | Web3Forms or a Cloudflare Pages Function with Resend; Turnstile for spam | |
| Analytics | GA4 (conversion events for WhatsApp click and form submit) plus Microsoft Clarity; Google Search Console | |
| Consent | A lightweight consent banner shown to EU and UK visitors; analytics only after consent there | |

### 9.2 Performance practices

- AVIF/WebP with responsive srcset; `fetchpriority="high"` on the hero image; lazy-load everything below the fold.
- No third-party chat widgets on initial load; lazy-load review widgets.
- Fonts self-hosted and subset; `font-display: swap`.
- Static HTML under 100 KB per page; no inlined page data blobs.
- Real-user monitoring through CrUX in Search Console after launch.

### 9.3 Accessibility

Build to WCAG 2.2 AA from the start: colour contrast, focus visible, 24 px minimum targets, keyboard-operable map and wizard, captions on video, prefers-reduced-motion respected, an accessibility statement page. A micro-enterprise is likely exempt from the European Accessibility Act, but EN 301 549 v4.1.1 makes WCAG 2.2 the EU benchmark from December 2026, and your core audience is older.

---

## 10. Legal and compliance (day-one list)

| Item | Requirement |
|---|---|
| Privacy policy | Covers India's DPDP Act 2023 and Rules 2025 (full obligations from May 2027, but write for them now) and GDPR for EU and UK visitors: what data, purpose, retention, withdrawal, rights, a named data contact and grievance process |
| Cookie consent | Required for non-essential cookies for EU and UK visitors; show the banner by geography |
| Terms and conditions, booking and cancellation policy | Cancellation ladder, payment schedule, what is and is not refundable, force majeure, insurance requirement |
| Company identity | Legal name, CIN, GSTIN, registered address, contact email on the site |
| Pricing | INR as the legal price; foreign currencies as approximate reference with date; do not insist on foreign-currency payment |
| GST | Tour-operator services at 5% without input credit (or 18% with); inbound tours performed in India are taxable even if billed in foreign currency |
| Receiving foreign payments | Through an authorised bank or RBI-licensed aggregator (Razorpay international, PayPal); keep FIRC/e-FIRC per remittance; Stripe availability in India is restricted **(uncertain)** |
| Memberships and badges | Display only what you hold; MoT recognition requires one year of operation and INR 25 lakh forex turnover; IATO allied membership is open now; state accreditation (for example Kerala) is online |
| WhatsApp | Travel is an allowed category; marketing messages need opt-in; no sensitive identifiers in chat |
| Consumer protection | Consumer Protection Act 2019 applies to Indian customers; e-commerce rules apply once you take payments online (grievance officer, acknowledgement in 48 hours, resolution in one month) |
| Map depiction | Any map of India shown must follow the Survey of India boundaries |
| Trademark | Clear the brand name against the Indian trademark registry and the main foreign markets before printing anything |

Get a lawyer to review the privacy policy and terms once drafted; the GDPR representative question (Article 27) depends on volume.

---

## 11. Operations behind the site

The site only works if the operation behind it keeps the promise.

- **Coverage.** US West Coast evening is 7 am to 10 am IST; UK evening is 10 pm to 2 am IST. A 12-hour reply promise needs at least two people covering a rota, with WhatsApp Business away messages outside hours.
- **Language.** English fluency in writing is non-negotiable for the replying specialists; German and French replies need a native or near-native colleague before those pages launch.
- **Proposal tooling.** A proposal template (PDF or web link) with day-by-day, hotels, price tiers, inclusions, cancellation terms. Target: first proposal within 48 hours of enquiry.
- **Payment path after the lead.** Deposit by international card or PayPal link, balance by wire or card; confirmations shared as hotels are booked.
- **Reviews.** Ask every guest on the last day via WhatsApp with a direct Google or Trustpilot link; aim for one review per two bookings.
- **Photography.** Plan a shoot in the November to February season for two or three signature routes; interim use of licensed Incredible India Content Hub assets.
- **Partner standards.** Written driver and vehicle standards, hotel vetting checklist, insurance; these become site content.
- **Measurement.** Weekly: leads by channel and country, reply time, proposal time, enquiry-to-booking rate, CWV status.

---

## 12. Roadmap

| Phase | Weeks (estimate) | Scope | Exit criteria |
|---|---|---|---|
| 0. Foundation | 1 to 3 | Decisions in Section 15; brand name and domain; company and GST ready; 12 to 16 journeys designed and costed with three tiers; photography plan; WhatsApp Business, Google Business Profile, Trustpilot and TripAdvisor set up; policies drafted; theme shared and reviewed against Section 5 | Priced product list, theme approved, legal drafts done |
| 1. MVP build and launch | 4 to 9 | Astro build of all Phase 1 templates; content written; map; wizard; forms and WhatsApp; schema; analytics; accessibility pass; performance budgets met; soft launch to friends in target markets for feedback | Lighthouse 90-plus mobile, all pages indexed, first 10 reviews requested |
| 2. Content engine and B2B page | 10 to 20 | 4 guides and 1 journey per month; cost guide; "how to choose" guide; one DMC page for foreign operators; Clarity-driven UX fixes; first paid tests (Google Search ads on planning queries, Meta to US/UK/AU 45-plus) | Organic sessions from target countries growing month on month |
| 3. Localisation | 16 to 26 | German and French pages for home, top journeys, region hubs, visa and cost guides; hreflang; native-speaking reply capacity | DE and FR enquiries arriving |
| 4. Tools and secondary segments | 26-plus | Trip finder by month and mood, itinerary PDF downloads, optional 3D showpiece section, "For Indian travellers" hub for domestic and outbound, WhatsApp Business Platform if volume justifies | Decided on data |

Pre-launch checklist: policies live; consent banner tested from an EU IP; forms tested end to end; WhatsApp links tested on iOS and Android; hreflang validated (Phase 3); schema validated; sitemap and robots submitted; 404 page; favicon and social preview images; CWV field data target set in Search Console.

---

## 13. KPIs

| KPI | Target by month 6 |
|---|---|
| Qualified inbound enquiries per month | 40 to 60 (set after month 2 baseline) |
| WhatsApp click rate on journey pages | 3% or more of visitors |
| Form completion rate on the wizard | 25% or more of starts |
| Median first reply time | under 2 hours in business hours, under 12 hours overall |
| Enquiry to proposal | 48 hours |
| Enquiry to booking | 5 to 10% (industry range for tailor-made FIT **(uncertain)**) |
| Core Web Vitals | all three "good" in Search Console for mobile |
| Organic sessions from USA, UK, AU, CA, DE, FR | growing 15% month on month after month 3 |
| External reviews | 50 Google plus 50 Trustpilot by month 12 |

---

## 14. Risks

| Risk | Mitigation |
|---|---|
| Inbound demand is volatile (2025 fell 8 to 9%; geopolitics, visa policy) | Diversify source markets early; keep the domestic/outbound hub as a Phase 4 hedge |
| New brand with no reviews or MoT badge | Trust architecture in 4.4; founder-led visibility; transparent pricing as the substitute for badges |
| Google AI Overviews reduce clicks on informational queries | Write for citation (8.3); concentrate on journey and planning intent pages; build email and WhatsApp lists |
| Golden Triangle price war | Do not sell it standalone; sell depth and longer journeys |
| Seasonality cash flow | Pre-sell November to February in July to October; shoulder-season products |
| WhatsApp policy or pricing changes | Keep email as the parallel channel; own the CRM data |
| Theme supplied later conflicts with performance or accessibility guardrails | Review the theme against Section 5 before build; adjust the theme, not the budgets |
| Content quality drifts to generic | Every page has a named author; editorial checklist; no AI-generated text published unreviewed |

---

## 15. Decisions needed from you before build

1. **Launch wedge.** South India specialist first (recommended if you are based there; direct contest with Cholan's home region but their inbound web funnel is weak) or pan-India from day one?
2. **Price band.** Premium-mid (about USD 150 to 350 per person per day) with a luxury tier, as recommended, or luxury-only?
3. **Brand name and domain.** Status of name, .com availability, trademark search, company registration and GST.
4. **Domestic and outbound.** Same domain in a separate hub (recommended, Phase 4) or a separate brand?
5. **Languages.** Confirm German and French as the Phase 3 languages, or substitute based on your own market knowledge.
6. **Reply coverage.** Who answers WhatsApp and email across US and UK evenings, and in which languages?
7. **Photography.** Own shoot, licensed assets, or both? Budget and timing.
8. **Stack.** Astro as recommended, or Next.js because your team prefers it?
9. **B2B.** Include one DMC page for foreign tour operators in Phase 2, yes or no?
10. **Theme.** When you share the design and theme, confirm it will be reviewed against Section 5 guardrails before any build starts.

---

## 16. Key sources

Market: India Tourism Data Compendium 2025 (via affairscloud summary); Rajya Sabha reply 11 Dec 2025 (travelmedia.in); Annual Tourism Snapshot 2025 and Monthly Tourism Statistics (tourism.gov.in; PDFs block automated fetch); PIB releases on e-visa, Chalo India, Budget 2025-26 and 2026-27; Business Today 31 Aug 2026 on IATO estimate; NITI Aayog report coverage (Business Today, 30 Jun 2026).

Legal and technical: india.gov.in guidelines for approved inbound tour operators; iato.in membership; DPDP Rules 2025 summaries (S.S. Rana, Shardul Amarchand); RBI press release on foreign-currency pricing; GST SAC 998555 guidance; developers.google.com (international sites, structured data gallery, review snippet, FAQ removal, JavaScript crawling); web.dev (Core Web Vitals, Milliseconds Make Millions); W3C WCAG 2.2; Deque on EN 301 549 v4.1.1; nngroup.com (scroll animations, parallax, scrolljacking); baymard.com (carousels); HTTP Archive Web Almanac 2024.

Competitors: cholantours.com (homepage, about, Kerala hub, DMC page, package page, sitemap, robots, llms.txt), indianpanorama.in, and the sites listed in `COMPETITOR-AUDIT.md`.

Templates and benchmarks: motionsites.ai, stork.ai listing, Product Hunt launch; scrolltide.co templates and pricing pages; awwwards.com collections; blacktomato.com, jacadatravel.com, scottdunn.com, audleytravel.com, andbeyond.com, remotelands.com, abercrombiekent.com, enchantingtravels.com, intrepidtravel.com, exoticca.com; Made for Spain and Portugal coverage (Latte Luxury News, Mar 2025).
