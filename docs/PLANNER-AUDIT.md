# Planner audit

Audited 13 October 2026, updated 21 October 2026, against `docs/PLANNER.md` (6 October 2026, with the decision log of 12 October) and the requirements given during the build. Every line below was checked on the built site in `dist/` or in the source, not from memory.

Status key:

- **Met**: done and checked.
- **Partly met**: some of it is done. The note says what is missing.
- **Not met**: not done yet.
- **Changed by decision**: the planner recommended it, and a later decision replaced it.
- **Needs you**: the site is ready, but only the business can supply the fact or do the task.

## Update, 21 October 2026

The client asked for more of the logo's colours and for fuller, more detailed pages. This round:

- **Colour.** The site now uses the logo's own orange (#ea651f) and black (#1c1b1a) as surfaces: a black footer, orange and black panels on every long page, orange chips, numerals and card details, and the badge's pyramid as a graphic device. See DESIGN-SYSTEM.md, version 4. axe reports no violations, light and dark.
- **Theme hubs.** Eight pages under `/themes`: heritage, wildlife, wellness, spiritual, slow travel, food, family and the mountains, each with journeys, places, a map, the season, reading and FAQs.
- **Kashmir.** A ten-day "Lakes and Meadows of Kashmir" journey and a Srinagar destination page, with honest government-advice and insurance wording. Both real Google reviews now sit on the journey they describe, and the old Srinagar URLs redirect to it.
- **Guides.** Three new: a festival calendar, dress and etiquette, and a packing list. Twelve in all.
- **Fuller pages.** How booking works, responsible travel, reviews, thank-you, contact, about and the 404 page were rebuilt with steps, figures, panels and FAQs. Journey and destination pages gained a month strip and links to theme hubs; region pages a numbered "where to go" panel.
- **Destination guides.** Every one of the 32 destination pages is now a full guide: the main sights with time to allow, what we arrange, where to stay with the hotels from our journeys by style, what to eat, when to go season by season, getting there by air, rail and road with drive times, a day-by-day plan, a map of nearby places, photographs where we have them, and six to eight questions answered. About 1,000 to 1,600 words each, checked by a test so a new destination cannot be added half done.
- **Hindi and one country choice.** Home, planner, about and contact are now also in Hindi, at /hi. The language row was removed from the country panel: visitors pick a country only, and India offers English or हिंदी under its name (Canada and Switzerland likewise offer their languages).
- **Map as signature.** The home page now has every destination on one map, with the promise in numbers beside it.
- **Photographs.** Nine new Commons photographs, credited on /credits. Coorg, Chettinad, Kolkata, Dharamshala and Shimla had been showing photographs of other places, and now show their own.
- **Lead capture.** The planner now sends UTM tags (kept from the landing page for the session) and the visitor's time zone.
- **Itinerary PDF.** Journey pages print cleanly, with every day expanded, and can be saved as a PDF from the print dialog.

## Summary

| | Count |
|---|---|
| Met | 79 |
| Partly met | 13 |
| Not met | 4 |
| Changed by decision | 4 |
| Needs you | 17 |

Of the planner's ten decisions in section 15, five are decided, three are open and one is settled for now (interim photos). The tenth, the theme, was settled through the design rounds.

The site meets the planner's core: an inbound-first, private-journey site with WhatsApp and email leads, a stated reply time, deep journey pages, six languages with hreflang, static pages that are fast and accessible, and no invented facts.

The gaps fall into three groups:

1. **Things only the business has.** These are real team names and photographs, the LLPIN and GSTIN, more reviews, a professional photo shoot and the operating rota behind the 12-hour promise.
2. **Planned later phases that are not built yet.** These are the B2B page and the domestic and outbound hub. Theme hubs and printable itineraries were added on 21 October 2026.
3. **Two deliberate design deviations.** These are the autoplaying home slides, which have a pause button, and page HTML that is over 100 KB before compression (30 to 38 KB once compressed).

## Requirements from the build conversations

| Requirement | Status | Evidence |
|---|---|---|
| Inbound first, then domestic and outbound | Partly met | Inbound is the whole site. The domestic and outbound hub is not built yet. |
| Leads by WhatsApp or email | Met | `wa.me` links with page-specific text, plus a six-step planner that posts to Web3Forms. It needs `PUBLIC_FORM_ACCESS_KEY` to send email. |
| No prices online until enquiry | Met | A content test fails the build if a price appears. Pages promise an itemised written quote within 48 hours. |
| No Ministry of Tourism or IATO badges until held | Met | `memberships` is empty, so nothing displays. |
| No promise of replies in other languages | Met | No page promises a reply in German, French, Spanish or Italian. |
| No stranger portraits | Met | The team card shows the logo mark. A real photo replaces it when one is added. |
| No AI tells (em dashes, middle dots, arrows, "not X but Y", exclamation marks, clichés) | Met | The voice scan of all 90 built pages finds 0 hits. Content tests block the symbols. |
| White design, phone first, professional motion | Met | Postcards v3. No sideways overflow at 360, 390 or 768 px. Motion is off when reduced motion is set. |
| Country and language picker with real flags, small and light | Met | A 320 by 439 px popover with 19 flags. |
| Traditional Indian decorations | Met | Toran, rangoli, diya and paisley. `site.decor` switches them all off. |
| Real, high-quality, emotional images, no placeholders | Met | 43 Wikimedia Commons photographs at 2560 px, each credited on `/credits` with its licence. A new test checks every photo has a file, a credit and alt text. |
| Real reviews from the old site, no fake data | Met | The two Google reviews from edificetravels.com are quoted exactly. Invented reviews, invented people and the invented founding story are gone. A test blocks demonstration data. |
| Reuse what exists on the old site | Met | Legal name, address, phones, email, social links, the About text and the reviews all come from edificetravels.com. 301 redirects cover the 28 old Shopify URLs. |

## Planner section 4: positioning and trust

| Planner item | Status | Note |
|---|---|---|
| Private, tailor-made journeys of 10 to 21 days for long-haul travellers | Met | 11 journeys of 9 to 21 days |
| Markets: USA, UK, Australia, Canada, Germany, France | Met | The country picker shows local time and typical flight time. Pages exist in English, Hindi, German, French, Spanish and Italian. Visitors in India choose English or Hindi. |
| Promise in one sentence on the home page, proven within one scroll | Met | Hero line plus three promise cards: a real person replies, the quote comes in writing, one driver door to door |
| Named specialist beside every enquiry | Partly met | The team card sits beside every enquiry point. No named person, because the old site names none. |
| Public reply-time promise | Met | 12 hours, with office hours shown in the visitor's own time |
| Registered name and address in the footer | Met | Edifice Travels, a unit of Edifice Travel Solutions LLP, V-218, Ground Floor, Rajouri Garden, New Delhi 110027 |
| LLPIN and GSTIN in the footer | Needs you | The fields are ready in `src/data/site.ts`. The label now reads LLPIN, because an LLP has no CIN. |
| Founder and specialist names with photographs | Needs you | |
| IATO allied membership, state accreditation | Needs you | Nothing displays until it is held |
| "How booking and payment work" page | Met | `/how-booking-works` |
| "No hidden costs" with inclusions and exclusions on every journey | Met | The schema requires at least 3 inclusions and 2 exclusions |
| Driver and hotel standards described specifically | Partly met | Described on the responsible travel and booking pages. Confirm the vehicle age, licensing and insurance you actually require. |
| Google Business Profile, Trustpilot, TripAdvisor | Partly met | The Google listing exists and is linked from the home and reviews pages. Trustpilot and TripAdvisor need you. |
| Transparent "from" prices, currency toggle, priced tiers, GST note | Changed by decision | No prices (12 October). Comfort, Premium and Luxury remain as stay styles with named hotels. |
| Honest cost guide | Met | "What shapes the cost of a private India trip" explains the factors without our prices |
| Domestic and outbound in a separate hub | Not met | Planned for phase 4. The old site's Maldives package belongs there. |

## Planner section 5: visual approach and performance

| Planner item | Status | Note |
|---|---|---|
| Photography first, real places | Met | Commons photographs of the real places. The planner prefers your own shoot or Incredible India Content Hub assets. |
| Avoid the stock Taj-at-sunrise signal | Partly met | The home hero is still a Taj sunrise. Replace it when the shoot happens; the slug stays the same. |
| Editorial typography | Met | Fraunces and Manrope, self-hosted |
| Map as signature | Met | Every journey page has an SVG route map that draws itself; tap a stop and it jumps to that day. Since 21 October the home page also shows every destination on one map. |
| Survey of India boundaries | Met | No country outline is drawn anywhere, so the rule does not come into play |
| No auto-rotating carousels | Not met (deliberate) | The home postcard advances on its own. It has a pause button (WCAG 2.2.2) and stops when reduced motion is set. Turning autoplay off is a one-line change if you prefer the planner's rule. |
| Indian colour as accent | Met | Saffron on white |
| Dark and light both designed | Met | |
| Human presence: specialist portraits, founder's letter, guest photos | Partly met | The real company story is on the About page, with a team note on the home page. Photos need you. |
| No WebGL, preloader, custom cursor or scroll-hijacking | Met | |
| View transitions, SVG route drawing, CSS motion | Met | |
| JavaScript per page: 150 KB or less, 300 KB with the map | Met | About 25 KB on a journey page and about 45 KB on the planner, uncompressed |
| Hero image 200 KB or less | Met | 40 to 65 KB at phone sizes (WebP) |
| Fonts: 2 families, 120 KB or less | Met | 89 KB for Latin |
| HTML under 100 KB per page | Partly met | 92 to 220 KB raw. 17 to 38 KB compressed, which is what visitors download. Most of the weight is utility classes and inline icons. |
| LCP 2.0 s, INP 200 ms, CLS 0.05, Lighthouse mobile 90+ | Needs you | Not measured. Run PageSpeed Insights after the first deploy. |
| None of the 12 "common site look" patterns | Met | No discount badges, tickers, vanity counters, toll-free trust or package-code names. Every review shows a name. |

## Planner section 6: site architecture

| Planner item | Status | Note |
|---|---|---|
| Navigation: Journeys, Destinations, Plan, Travel guide, About, Contact | Met | |
| Journeys filterable by region and theme | Met | Filters on `/journeys`, plus mood chips on the home page |
| Header: logo, nav, Plan button, WhatsApp icon | Met | |
| Footer: identity, memberships held, policies, languages, social | Met | X and YouTube added |
| Newsletter in the footer | Changed by decision | The site promises no newsletter unless asked |
| Home page | Met | |
| 12 to 16 journeys | Met | 12, with Kashmir added on 21 October. The old site also sold Shimla and Manali, Sikkim, Andaman and a Kerala monsoon trip; those are the natural next four. Confirm the Kashmir route and hotels match what you sell. |
| 5 to 6 region hubs | Met | 5 |
| 25 to 30 destination pages | Met | 32, each a full guide with sights, food, seasons, getting there, where to stay, a day-by-day plan and FAQs |
| 6 to 8 theme hubs | Met | 8 hubs under /themes, linked from the home page, the journeys index, the header menu, the footer, and every journey and destination that belongs to them |
| 15 to 20 guide articles | Partly met | 12. Dress and etiquette, a festival calendar and a packing list were added on 21 October. Next: eSIM and connectivity on its own, Indian trains in depth, a 21-day itinerary, and travelling with diaspora family. |
| 2 to 4 specialist profiles | Needs you | One team profile until real people are named |
| About, How booking works, Responsible travel, Reviews, Contact | Met | |
| Privacy, Cookies, Terms, Booking and cancellation, Accessibility | Met | Drafts. A lawyer should review them. |
| 404 and thank-you | Met | |
| About 80 to 100 static pages | Met | 90 |

Journey page anatomy (planner 6.3):

| Element | Status |
|---|---|
| Hero, facts bar (days, route, best months, pace, styles) | Met |
| Route map that draws, with tap-to-day | Met |
| Why this journey | Met (highlights) |
| Day by day with drive time, stays by style, images | Met |
| Inclusions and exclusions | Met |
| Price tiers | Changed by decision (stay styles without prices) |
| Specialist card with WhatsApp and pre-filled text | Met, with the team mark in place of a photo |
| 5 to 8 FAQs | Met |
| Reviews from this or a similar journey | Met (both Google reviews are on the Kashmir journey) |
| Related journeys, "make it yours" call to action | Met |
| Sticky phone bar | Met (WhatsApp and plan, no price by decision) |

Planner wizard (6.4):

| Element | Status |
|---|---|
| Six steps (where, when, who, comfort, interests, you) with progress | Met |
| Trust beside it: reply time and who replies | Met |
| Trust beside it: review count | Not met (two reviews is too few to show as a count) |
| WhatsApp hand-off pre-filled with the answers after submit | Met |

## Planner section 7: lead capture

| Planner item | Status | Note |
|---|---|---|
| WhatsApp link format and per-page pre-filled text | Met | |
| One WhatsApp entry point per screen | Met | |
| Reply hours in the visitor's local time | Met | |
| GA4 events for WhatsApp, plan and enquiry | Met | Fires once `ga4` is set and the visitor consents |
| Form fields and consent checkbox | Met | |
| Hidden page URL | Met | |
| Hidden UTM parameters and time zone | Met | UTM tags are kept for the session from the landing page and sent with the time zone |
| Spam protection | Partly met | Honeypot in place. Turnstile is optional. |
| Auto-reply, CRM routing, WhatsApp Business setup | Needs you | |
| Specialist face at every enquiry point | Needs you | |
| Microsoft Clarity | Needs you | Optional. It must sit behind the same consent. |

## Planner section 8: content and SEO

| Planner item | Status | Note |
|---|---|---|
| Journeys of 1,200 to 2,000 words | Met | 2,000 to 3,400 words each |
| Visa guide dated "last verified", cost guide, best time, solo women, first-timer itinerary, trains, money and connectivity, food and health, how to choose a company | Met | |
| "Updated" dates on guides | Met | |
| Author bylines with local expertise and photographs | Partly met | "By the Edifice Travels team". Named authors need you. |
| Organization and TravelAgency schema with `sameAs` | Met | Instagram, Facebook, X, YouTube. Add the Google Business Profile link once you have its share URL. |
| TouristTrip per journey, BreadcrumbList, Article, FAQ | Met | |
| Product with Offer and AggregateRating | Changed by decision | Offers need prices. Ratings copied from Google must not be marked up on our own pages. |
| Event schema for festivals | Not met | The festival calendar exists, but most dates follow the lunar calendar and move each year, so no dated Event markup is published until dates are confirmed per year |
| AI crawlers allowed, reviewed `llms.txt` | Met | |
| English at the root, language folders, hreflang with x-default, no IP redirects | Met | |
| German and French for top journeys, region hubs, visa and cost guides | Partly met | Home, planner, About and Contact exist in Hindi, German, French, Spanish and Italian. Journeys and guides are English only and say so. |
| Translations by a native travel writer | Needs you | |

## Planner sections 9 and 10: technology, accessibility, legal

| Planner item | Status | Note |
|---|---|---|
| Astro, Tailwind, Markdown content, Cloudflare Pages | Met | Astro 7 with Preact islands. `_headers`, `_redirects` and the file-format build are ready. |
| Responsive WebP, `fetchpriority` on the hero, lazy loading below the fold | Met | |
| Self-hosted fonts with swap | Met | |
| Consent banner, analytics only after consent | Met | Shown to every visitor, because location cannot be detected reliably on a static site |
| WCAG 2.2 AA | Met | axe finds no violations on 13 key pages, desktop and phone. Keyboard works on the map and wizard. There is an accessibility statement. |
| Privacy (DPDP and GDPR), cookies, terms, booking and cancellation | Partly met | Drafted. A named grievance officer and the confirmed deposit, cancellation and retention terms need you and a lawyer. |
| Legal name, LLPIN, GSTIN, address, email on the site | Partly met | Name, address and email are live. LLPIN and GSTIN need you. |
| Display only badges you hold | Met | |
| Trademark clearance | Needs you | |
| Unit tests in CI | Met | 355 unit, content and build tests pass |

## Planner sections 11 to 15: operations and decisions

These are business tasks. The site is ready for each of them.

| Item | Status |
|---|---|
| A rota that keeps the 12-hour reply promise across US and UK evenings | Needs you |
| A proposal template that meets the 48-hour quote promise | Needs you |
| Payment path after the lead (card or PayPal link, wire) | Needs you |
| Asking every guest for a Google review on the last day | Needs you |
| A photography shoot from November to February | Needs you |
| Written driver, vehicle and hotel standards | Needs you |
| Weekly measurement | Needs you |
| Decision 1, launch wedge | Decided: pan-India from New Delhi |
| Decision 2, price band | Decided: no public prices |
| Decision 3, brand and domain | Decided: Edifice Travels, edificetravels.com |
| Decision 4, domestic and outbound | Open |
| Decision 5, languages | Decided: Hindi, German, French, Spanish, Italian |
| Decision 6, reply coverage and languages | Open |
| Decision 7, photography | Interim Commons photos. Shoot open. |
| Decision 8, stack | Decided: Astro |
| Decision 9, B2B page | Open |

## What would close the most gaps

1. **Send the team's real names, roles and photos, plus the LLPIN and GSTIN.** One edit each fills the team cards, guide bylines, profile pages and footer.
2. **Confirm the Kashmir itinerary you sell, and add it as a journey.** Both real reviews would then appear on a matching journey page.
3. **Ask recent guests for Google reviews.** The home and reviews pages already link to the listing.
4. **Decide on the home slides.** Keep autoplay with the pause button, or switch to manual swiping as the planner advises.
5. **After the first deploy, run PageSpeed Insights** on the home page and one journey page, and record the scores here.
