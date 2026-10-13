# Competitor Audit: India Tourism (Inbound Lens)

Audited 6 October 2026. Companion to `PLANNER.md`. Design observations marked "(inferred)" come from markup inspection (CMS, slider libraries, image counts, page weight), not from a rendered screenshot. Load times are single-sample fetch timings from one location and are indicative only. Lighthouse and CrUX scores could not be measured today (PageSpeed API quota exhausted); re-run before build.

---

## Part 1. Cholan Tours (named competitor), audited directly

**Identity.** Cholan Tours Pvt Ltd, headquartered in Trichy, Tamil Nadu. CIN U31100TN2010PTC078389 (incorporated as a private company in 2010; the brand claims 1999 on the homepage, 2000 on the DMC page, and 1995 on the sister site, so the founding story is inconsistent across their own properties). CMD: Pandian Kumaravel. Lufthansa City Center franchise partner. Sister consumer brand for foreigners: Indian Panorama (indianpanorama.in, "a unit of Cholan Tours Pvt Ltd", TripAdvisor Travellers' Choice 2026 badge, English only, no prices). Also lists on TourRadar and sells bus tickets on redBus.

**Offline strength.** Ministry of Tourism approved; "5-time National Tourism Award winner"; "50+ honours"; 12 to 14 offices; 300 to 400 staff; 150-plus vehicles; "100% solar, paperless"; women-chauffeur programme announced February 2026 (press release). Google ratings on third-party listings: 4.6 to 4.8 from roughly 30 to 45 reviews per office listing (small counts).

**Positioning.** Headline "India's Most Trusted Tour & Travel Company"; tagline "Experience India Like a Local". Serves domestic and international travellers, plus car rental, bus rental, MICE, luxury trains, international holidays (Sri Lanka, Bhutan, Hong Kong, Malaysia, Mauritius, Cambodia, Vietnam, China) on the same domain. Claims "1M+ travellers served", "64,000+ discerning global guests", "4.9 average traveller rating" with no named source.

**Website technology.** Next.js with image optimisation, assets on cdn.cholantours.com, blog on WordPress under /blog/. Homepage HTML 464 KB with 20 external scripts. JSON-LD limited to Organization and PostalAddress. robots.txt allows everything and references an llms.txt; the llms.txt still contains the generator's note "Refined draft generated from your current file. Review before publishing."

**Languages.** Header lists 11 languages with flags (English, Chinese Simplified, Dutch, French, German, Hebrew, Italian, Portuguese (Brazil), Russian, Spanish, Arabic). No hreflang tags. /fr, /de, /es and /zh-cn all return 404. No translation widget script detected in the initial HTML. Conclusion: cosmetic switcher; no indexable localised content.

**Content scale (sitemap, 1,693 URLs).** 546 under /india (state and city pages), 409 under /packages, 367 blog posts, 268 car-rental pages, 58 trek pages, 12 luxury-train pages, 8 international pages. Destination copy (for example the Kerala hub) is reasonably expert, mentioning Nilgiri Biosphere Reserve and nalukettu houses. Package naming is generic ("Explore Munnar Thekkady Alleppey in a Memorable Kerala 5 Days 4 Nights").

**Homepage structure.** Hero banner images, metrics strip, value props (ground mastery, tailor-made, private chauffeur, 24/7 concierge), destination carousel, region tiles, Sri Lanka/Nepal/Bhutan, 15-plus-day journeys, group tours, luxury trains, trust block, Sri Lanka packages, Ayurveda, services grid, women chauffeurs, sustainability, testimonials header, CTA, accreditation logos. About 20 sections; many competing CTAs (Plan My Journey, Talk to a Travel Expert, Enquire Now, WhatsApp, toll-free, office phone).

**Lead capture.** Enquiry form that asks for a phone number only. WhatsApp wa.me/919677355555. Toll-free 1800 123 2255. No reply-time promise. No named specialist.

**Itinerary page (Kerala 5D/4N sample).** Hero carousel, nights-per-place summary with inclusion icons, overview paragraph, day by day without hotel names, 5 FAQs, phone-only enquiry, 3 similar packages. Missing: price, map, gallery, reviews, PDF, share, sticky CTA.

**Destination page (Kerala).** Hero, long intro, geography, 10 packages with durations and no prices, thematic tours, things to do, 40-plus attraction cards, phone enquiry, empty testimonials header. No FAQ, no map, no best-time block.

**B2B page (/indian-dmc).** Targets foreign tour operators: customised itineraries across India, Nepal, Bhutan, Sri Lanka; hotel and transport logistics; owned fleet; MICE; proprietary tech platform; "12 offices", "400+ professionals".

**Where Cholan is strong.** Credentials, fleet and offices, award history, LCC network, content volume, B2B.

**Where Cholan is beatable on the web.** No pricing; fake multilingual; diluted positioning; shallow itinerary pages; unsourced claims and inconsistent founding dates; heavy homepage; minimal schema; phone-only form; no human face; generic package naming; unreviewed AI output in production.

---

## Part 2. India-based inbound specialists

### Enchanting Travels (enchantingtravels.com, India section)
- Positioning: luxury custom FIT; US, Canada, Australia toll-free numbers; English and German with hreflang. Brand is international; India operations exist.
- Design (inferred): custom WordPress, Cloudinary images, responsive srcset, no slider libraries; editorial. 326 KB HTML, about 2.4 s fetch.
- Leads: 2-step "Start planning" (region, interests, duration, month, travellers, budget per person; then contact and preferred contact time); phone; newsletter; print magazine. No WhatsApp, no reply-time promise.
- Trust: Trustpilot 4.9 from 3,000-plus; named consultants with photos; "98% satisfied guests".
- Pricing: most transparent of the luxury set, "From USD 7,590 per person" with two hotel tiers; FAQ states India trips typically USD 3,000 to 10,000-plus per person.
- Content: region hubs, 8 India itineraries, best-time, safety, travel guide, blog, 7 to 8 FAQs per page; schema TravelAgency, TouristTrip, FAQPage, ItemList, Person.
- Gaps: no WhatsApp or chat; no reply SLA; only 8 India itineraries; English and German only; no Indian presence shown.

### India Someday (indiasomeday.com)
- Positioning: independent FIT planning for all budgets, strong solo-female angle; Mumbai; 7 languages with hreflang (en, de, fr, es, it, nl, pl).
- Design (inferred): custom WordPress but heavy: 1.06 MB HTML, Slick carousels, many animation markers. About 2.7 s.
- Leads: persistent "Plan my trip" form; client portal; phone on services page only. No visible WhatsApp CTA, no SLA.
- Trust: Feefo 4.8 from 1,234; TripAdvisor Travellers' Choice 2023 and 2025; named testimonials; team page.
- Pricing: no trip prices; transparent planning-fee model (USD 500 for up to 2 weeks and 2 adults; plus USD 200 per extra week; plus USD 100 per adult; 25% solo discount; 50% off under 25).
- Content: 9 "About India" guides (trains, costs, solo female, best time), sizeable blog, 8-topic FAQ with schema.
- Gaps: heavy pages; fee model may deter price-shoppers; no WhatsApp; no USD trip prices; phone hidden.

### Shanti Travel (shantitravel.com)
- Positioning: French-founded, Paris office, Atout France licence IM075190042; "80 local experts"; FIT and small groups; mid-to-premium; FR/EN/DE with hreflang; India is one of about 10 Asian destinations.
- Design (inferred): Next.js, CloudFront, Swiper, responsive images, 11 YouTube embeds; fastest fetch of the set (0.64 s, 395 KB). Most modern build.
- Leads: "Create your trip" 7-step wizard with "Free quote, no commitment", Trustpilot 4.8 from 1,913 and "80 local experts / 20 years" beside the form; Paris phone; email; named India expert on the India page. No WhatsApp, no India phone, no SLA.
- Trust: Trustpilot, Atout France certification, expert gallery, sustainability coordinator.
- Pricing: EUR "From" prices on trip cards (India from EUR 1,130 for 11 days to about EUR 2,380).
- Content: 6 featured plus "17+" India trips, 6 guides, climate chart, journal.
- Gaps: France-centric (phone, EUR only); no WhatsApp; India diluted among 10 countries; no FAQ.

### Creative Travel (creative.travel)
- B2B DMC since 1977, Gurgaon; MICE and leisure via overseas operators; 6 languages via WPML with hreflang.
- Design (inferred): WordPress, Slider Revolution, corporate brochure. 146 KB, about 2 s.
- Leads: phone, form, partner portal. No WhatsApp.
- Trust: "36 World Travel Awards", 15-plus association logos (IATO, PATA, ASTA, DRV, ICCA, Travelife).
- Pricing and itineraries: none public. Not a direct B2C competitor.

### SITA (sita.in)
- B2B DMC (Thomas Cook group), 63 years, 30 offices, 12 language versions with hreflang.
- Design (inferred): custom WordPress, very lean (74 KB, 0.8 s).
- Trust: "Most awarded travel company in South Asia", Travelife, TourCert, PATA, USTOA, WTTC, IATO.
- Zero consumer funnel; competes with you only through its overseas clients.

### Le Passage to India (lepassagetoindia.com)
- Dual B2B/B2C, luxury, India plus 4 countries; EN/DE/IT pages without hreflang.
- Design (inferred): WordPress plus Elementor (thousands of Elementor classes), Slick and Swiper, one hero video; 589 KB.
- Leads: "Plan Your Journey", "Customise Your Trip", phone, email, newsletter, apps. No WhatsApp.
- Trust: WTA "India's Leading DMC", GSTC certified, "dual financial protection", specialist profiles.
- Pricing bug: India itineraries all show "From $39.00" placeholder.
- Content: 12-plus India itineraries, traveller FAQ (visa, solo female, vaccines, currency), blog.
- Gaps: placeholder prices, no hreflang, heavy build, mixed B2B/B2C messaging, staging subdomain leaking in image URLs (unverified).

### Banyan Tours (banyantours.com)
- B2B luxury DMC, Virtuoso; Wix site (809 KB); minimal nav; no itineraries, blog or FAQ. Brochure only.

### Indian Holiday Pvt Ltd (indianholiday.com)
- Mid-market; "four paths" (inbound, outbound, domestic, luxury trains); Delhi; English only.
- Design (inferred): WordPress plus WooCommerce, no responsive srcset; 4.1 s fetch; dated.
- Leads: phone, email capture, destination search; no WhatsApp link; no SLA. Blocks non-browser user agents (403), a crawler risk.
- Trust: "2-time National Tourism Award", IATO, MoT, Trustpilot 4.7 from 170.
- Pricing: none.
- Content: very large theme by destination taxonomy, FAQs, month-by-month pages; schema WebPage and ContactPoint only.
- Gaps: no prices, no WhatsApp, dilution, slow, bot-blocking.

### Tour My India (tourmyindia.com)
- Mass-market content portal, Noida; domestic-leaning but sells to foreigners; English only.
- Design (inferred): custom PHP, 634 KB homepage with 263 images, no srcset; directory look.
- Leads: "Let's plan your trip" modal (name, country, email, description, dates, duration, persons, phone); 24-hour phone; WhatsApp-only number. No SLA.
- Trust: TripAdvisor embeds, "20+ years", "10,000+ tours", "80,000+ contracted hotels"; no IATO or MoT badges seen.
- Pricing: INR on homepage cards; none on Golden Triangle hub.
- Content: enormous (70-plus wildlife, 75-plus hill station, 65-plus pilgrimage packages, state guides, visa page, maps, active blog).
- Gaps: not foreigner-focused; INR; thin itinerary pages; heavy pages.

### Indian Excursions Co (indianexcursions.co)
- Boutique luxury, Rajasthan only, since 2009, "a handful of guests a month"; English only.
- Design (inferred): WordPress plus Elementor Pro, lean (86 KB), editorial tone, luxury hotel photography.
- Leads: enquiry form, phone, email; WhatsApp group only for booked guests; no SLA.
- Trust: IATO accredited; Trustpilot link without score.
- Pricing: the best model among India-based operators: "INR 343,500 (USD 4,005; AUD 6,649; GBP 3,109) per person based on 2 sharing".
- Content: 9 to 10 journeys, inspiration blog, Rajasthan tips; no FAQ, map or reviews on itinerary pages.

### Trans India Holidays (transindiaholidays.com)
- "Best value" mid to upper-mid; India plus neighbours; luxury trains; USD.
- Design (inferred): in-house CMS, fast (0.43 s, 99 KB), conventional.
- Leads: "Enquire Now" modal with budget tier, dates, travellers; "24x7 customer care". No WhatsApp link, no chat.
- Trust: Glasgow Declaration logo; no review platform; no IATO or MoT badge seen.
- Pricing: partial USD "from" on some cards (USD 1,251 to 6,025); listing pages load packages via JavaScript (indexing risk).
- Gaps: no social proof, JS-rendered listings, thin itineraries.

### Travelogy India (travelogyindia.com)
- Mid-market luxury trains and South Asia; German and Spanish sister sites without hreflang.
- Design (inferred): custom backend, BunnyCDN, 230 KB, 0.65 s; OTA-style cart and "Book Now".
- Leads: WhatsApp icon in header, "Enquire Now", email; no SLA.
- Trust: MoT approved, IATO active, IRCTC agent; TripAdvisor badge dated 2017 (stale).
- Pricing: none on itinerary pages.
- Content: 16 itineraries, 80-plus hotel pages, blog; itinerary page has inclusions and exclusions but no FAQ, reviews, map or JSON-LD.

### India By Car and Driver (indiabycaranddriver.com)
- Jaipur; car-and-driver private tours; also Nepal, Sri Lanka, Dubai, Egypt (dilution).
- Design (inferred): WordPress, Slider Revolution, Slick and Swiper, 343 KB with 202 images; busy.
- Leads: deepest form of the set (hotel category, vehicle type, travellers, days, dates), repeated twice per page; calling hours shown; tawk.to chat; HubSpot; WhatsApp. No SLA.
- Trust: MoT and IATO logos, TripAdvisor widget, Trustpilot, Google, two offices, LocalBusiness schema with opening hours.
- Pricing: none.
- Content: 40-plus packages; itinerary page has quick facts (distances, best season, UNESCO sites, tips), day by day with gallery, 3 FAQs, route map, form. The best itinerary anatomy among India-based sites, minus prices.

### Swan Tours (swantour.com)
- Delhi, since 1995; domestic plus outbound plus some inbound; INR; Drupal 10; WhatsApp and phones; FAQPage and Review schema; "Starting @ INR 8,750". Not an inbound brand.

### India-tours.com (Services International)
- Delhi, 35-plus years; IATA, TAAI, IATO, MoT, FIEO logos; TripAdvisor Certificate of Excellence; WhatsApp; itinerary builder; 24 themes by 14 regions; no prices; no FAQ; "change language" with no options; a placeholder.pics development image left in production. Dated and opaque.

### Smaller operators that rank in US search results
- Top Indian Holidays (Jaipur): WhatsApp-first, "we reply within 12 hours", MoT approved, 22-question FAQ schema, cost-guide blogs ("Rajasthan Tour Cost 2027-28"); no prices; agency template.
- YoYo Trips India (Delhi): US-targeted copy, USD "from $185 per person", 24-hour response promise, best-price guarantee; budget tier.
- Leisure India Holidays (Jaipur): USD "from $995 to $5,195", MoT, IATO, ISO 9001:2008 (outdated), published cancellation ladder and payment terms.
- Premium India Tours (Jaipur): founder-led WhatsApp ("Chat with Shaan Saxena"), "reply within 24 hours", 40-plus testimonials; claims "transparent pricing" but shows none.
- Bespoke India Holidays (Nashik, US toll-free): ASTA, TripAdvisor; 1.17 MB homepage with 39 YouTube embeds; no prices.
- Elefantastic (Jaipur): an elephant sanctuary (TripAdvisor 5.0 from 4,550-plus) that ranks first to third for "best India tour companies for foreign tourists" with listicles; fixed INR pricing "One price. Printed here."
- Also visible: Star India Tours, Driver India Tour, Max Holidays, Golden Triangle Package Tours, India Custom Tours, Tour-India.net, India Travel Etc, Target Tours, Truly India Tours, HTO India, Crystal India Holidays, Noble House Tours.

### Foreign operators and aggregators that rank for India queries
Audley, Wild Frontiers, Greaves, Ampersand (from GBP 4,050), Pettitts, Harji's, Jacada, Scott Dunn, Wexas (from GBP 3,350), Cox & Kings UK, Intrepid, G Adventures (Golden Triangle from USD 699), Goway, Memphis Tours (USD 885), Encounters Travel, Authentic India Tours, Adventure World, Responsible Travel; aggregators TourRadar, Viator, Travelstride, TripAdvisor. The Golden Triangle results are dominated by aggregators and Delhi/Jaipur agencies at USD 150 to 700.

### Ranking: strength for the foreign B2C market

| Rank | Operator | Why |
|---|---|---|
| 1 | Enchanting Travels | 3,000-plus Trustpilot 4.9, USD prices by hotel tier, rich schema, 2-step planner, best-time and safety hubs |
| 2 | Shanti Travel | Modern build, EUR prices, 7-step wizard with trust beside form, 3 languages, licence number, named experts |
| 3 | India Someday | 7 languages, Feefo 1,234 plus TripAdvisor awards, transparent fee model, portal, solo-female content |
| 4 | Cholan Tours / Indian Panorama | Credentials, offices, fleet, content volume; weak web funnel |
| 5 | Leisure India Holidays | USD prices, MoT, IATO, 16 FAQs, published terms; template design |
| 6 | Indian Excursions Co | Multi-currency pricing, luxury editorial; tiny inventory |
| 7 | Top Indian Holidays / YoYo Trips | Best lead mechanics (WhatsApp plus 12/24-hour SLA, FAQ schema, USD); budget perception |
| 8 | India By Car and Driver | Best enquiry form and itinerary anatomy; no prices, bloated |
| 9 | Le Passage to India | Strongest credentials; placeholder prices, no hreflang, heavy |
| 10 | Indian Holiday | Awards and badges; opaque, slow, bot-blocking, diluted |
| 11 | Travelogy India | Badges plus WhatsApp; stale badge, no prices, no schema |
| 12 | Trans India Holidays | Fast, partial USD; no reviews, JS-loaded listings |
| 13 | Tour My India / Swan Tours | Domestic content juggernauts; INR, not foreigner-positioned |
| B2B | SITA / Creative / Banyan | Trade trust; no consumer funnel |

### Common navigation and itinerary patterns (India-based B2C)
- Navigation: destinations by region or state, tours by theme (Golden Triangle almost always its own item), hotels, travel info or blog, about, contact; a header pill CTA; phone in top bar.
- Itinerary pages: hero or carousel, title with "X Nights / Y Days" and route string, overview, highlights, day by day, inclusions and exclusions (about half), hotels (rare), price (rare), enquiry form, related packages. FAQ, map and reviews are exceptions.
- Enquiry forms: name, email, phone, country, arrival date, travellers, duration, hotel category, vehicle type, free text. Only Shanti and Enchanting break the pattern with wizards.

---

## Part 3. Mainstream Indian majors

MakeMyTrip and Yatra pages timed out under bot protection; their entries rely on search snippets and are marked uncertain. Search results reflect a US searcher, not google.co.in.

| Player | Model and segments | Serves foreign inbound? | Design (inferred) | Leads | Trust | Pricing | Content | Weakness |
|---|---|---|---|---|---|---|---|---|
| MakeMyTrip holidays | OTA; domestic and outbound; 1,751 India packages; No-Cost EMI | Partial: multi-currency payment for flights and hotels only; packages INR, India-departure | Dense catalogue, strike-through prices, coupons, app nudges (uncertain) | Query form, callback, app, chat | Card ratings, brand scale | INR per person, EMI, coupons | Huge programmatic city-by-destination pages | No inbound narrative, anonymous supplier packages |
| Thomas Cook India | Integrated travel plus forex; 645-plus domestic from INR 7,999, 500-plus international; group plus DIY | No; inbound is B2B via SITA and TCI | Hero carousel, card modules, 15-plus sections, heavy SEO footer | 1800 number, form, app QR, WhatsApp (forex only) | "Since 1881", "1M+ travellers", "50+ awards", PCI-DSS, named tour managers | INR from-prices; B1G1 promos; Kerala 5N/6D INR 34,900 to 57,600 | Destination guides, best-time pages, FAQs, blog | Template heaviness, deal-first, generic imagery |
| SOTC | Sister of Thomas Cook; 1,000-plus holidays; Darshans; cruises | No | Carousel plus cards; 160-plus footer links; chatbot | "Plan My Tour" form, chatbot, toll-free | "75 years", "5 million+ customers", PCI-DSS | Kerala from INR 13,400; EMI; bank discounts | 50-plus guides, 100-plus attraction pages | Near-clone of Thomas Cook; promo-stacked |
| Yatra holidays | OTA (uncertain) | No | Typical OTA listing (uncertain) | Callback | App downloads | Kerala from INR 12,500 | Thin | Weak holiday brand |
| EaseMyTrip holidays | OTA; themed | Partial: currency selector only | Clean card grid, less cluttered | Search form, modal, WhatsApp login | Trustpilot widgets, 24/7 | Kerala from INR 7,599 | Thin | Undifferentiated |
| Veena World | Group-tour specialist; women's and seniors' specials | Partial: NRI and foreign-national desk; INR only | Dense nav, carousels, promo banners | Toll-free, callback, forms; business hours | "9.9 lakh+ guests", "15,000+ reviews", IATO/TAAI/IATA | Kerala from INR 35,000; Rajasthan from INR 43,000 | Catalogue, blog, podcast (uncertain) | Indian-family group aesthetic |
| Kesari Tours | Group tours; women-only, seniors, spiritual; MICE | No | Carousels, icon cards, heavy footer | Two toll-free lines, WhatsApp, email, apps | "42 years", "10,00,000+ guests", 400-plus tour leaders | Kerala 6N/7D from INR 38,990; EMI; INR 2,500 seat-lock | Moderate | Opaque pricing, dated UX |
| TravelTriangle | Marketplace of 650-plus agents quoting on customised trips | No | High clutter, layered filters, app CTA | Callback, "customise and get quotes" on every card | "40 lakh+ travellers", 4.3 from 11,287, "23-step vetting" | Kerala from INR 8,370; typical 5 to 7 days INR 15,000 to 30,000 | Thousands of listicles | Agent lottery, SEO-farm feel |
| Thrillophilia | Curated package marketplace | No | Cleanest OTA: video collage hero, live-traveller counter, photo testimonials, strike-throughs everywhere | "Get a callback", "connect with an expert" | "3M+ customers", "1M+ reviews", 4.8 Google/TripAdvisor | Rajasthan 7 to 10 days INR 31,779 to 49,925; "29% OFF" | Large blog, state hubs | Discount theatre, urgency counters |
| Pickyourtrail | Tech-led customised outbound; departure-city pages | No | Hero video, traveller-type filters, "recently booked" ticker | "Start planning" builder, WhatsApp, email, phone | 4.6 from 9,070-plus, celebrity testimonials, tourism-board logos | Bali from INR 40,000 (6N) | Moderate | Outbound only; growth-hack UI |
| Holidify | Content site monetised via 3-agent quotes | Partial: currency switcher only | Tabbed, card-based, cleaner than TravelTriangle | Quote form, WhatsApp, phone | "1,00,000+ booked", 4.5 from 23,190 | Rajasthan 7 to 10 days INR 24,499 to 35,000 | Largest editorial footprint among Indian consumer sites | Agent-handoff trust gap |
| Cox & Kings (relaunched) | Bought from insolvency by Wilson & Hughes (2024); premium outbound; franchise push (300 targeted) | No; INR; UK Cox & Kings is a separate company | Most editorial of the set: whitespace, journey cards, low clutter | WhatsApp enquire, schedule a call, chat | "Since 1758", 4.5 from 2,400-plus, 18 award logos | Outbound INR 72,450 to 9,21,101 | Thin, domestic section empty (uncertain) | Thin inventory; insolvency memory |
| Incredible India (government) | Relaunched Sept 2024 as a digital portal; Content Hub of about 5,000 assets; AI trip planner; 200-plus destinations; English, Hindi, Chinese, Arabic, Spanish | Yes as information, no sales | Editorial, hero video, photography-first | None | Government | None | Large | Not a competitor; the reference aesthetic foreigners meet first and a free asset source |

Scores (1 to 5): design, trust, content depth.

| Player | Inbound ready | Design | Trust | Content |
|---|---|---|---|---|
| MakeMyTrip | Partial | 3 | 3 | 4 |
| Thomas Cook India | No | 3 | 5 | 4 |
| SOTC | No | 3 | 4 | 4 |
| Yatra | No | 2 (uncertain) | 3 | 2 |
| EaseMyTrip | Partial | 3 | 2 | 2 |
| Veena World | Partial | 2 | 4 | 3 |
| Kesari | No | 2 | 4 | 3 |
| TravelTriangle | No | 2 | 3 | 4 |
| Thrillophilia | No | 4 | 4 | 4 |
| Pickyourtrail | No | 3 | 4 | 3 |
| Holidify | Partial | 3 | 3 | 5 |
| Cox & Kings | No | 4 | 3 | 2 |
| Incredible India | Information only | 4 | 5 | 4 |
| Tour My India / India-tours.com | Yes, no prices | 2 | 3 | 4 |

---

## Part 4. Global benchmark operators

| Site | Stack (observed) | Hero and motion | Lead capture | Trust |
|---|---|---|---|---|
| Black Tomato | WordPress plus Cloudflare Images | Text-led hero "Every journey starts with a feeling"; editorial sans, pink accent; CSS-only motion | Persistent "Enquire Now", UK and US phones, newsletter | B Corp, ABTA, ATOL, IATA, Virtuoso, Trustpilot, press logos |
| Jacada Travel | Next.js plus headless WordPress | "Exceptional Journeys" plus destination search; fade carousels, accordions | "Start Planning" three times, phone, email | Trustpilot 2,594 "Excellent", Travel + Leisure 2026, Conde Nast Traveller 2025; 12-person team with faces |
| Scott Dunn | Sitecore | "Tell us about your travel plans" prompt; one video | "Enquire Now", phone in header, plan-your-trip page | Conde Nast Top Specialists 14 years, dated testimonials |
| Audley Travel (India) | Contentful, Swiper | "Tailor-made India holidays shaped around your passions"; no video | "Start planning" five times, "Call us" five times, brochure request, "Speak to a certified India specialist" | Specialist-led; TravelAgency, Product and AggregateOffer schema |
| andBeyond | WordPress, YouTube, Zoho chat, Microsoft Clarity | Photo and video-led, "Dream Board" | "Plan my trip", enquire, chat, phone | Conservation impact story |
| Remote Lands | Vimeo-heavy, Swiper | Vimeo hero loop | "Enquire" 17 times, New York and Bangkok phones | TravelMole best website award, Virtuoso |
| Abercrombie & Kent | Next.js plus Sanity | Image-led | "Contact us" 23 times, multi-region phones | Heritage since 1962 |
| Enchanting Travels | WordPress plus Cloudinary | Full-bleed photo, serif with italic emphasis; one video | Phone, "Start Planning", "Inspire Me" | Trustpilot 4.9 from 3,000-plus; 11 JSON-LD blocks |
| Intrepid (India) | Custom | Copy-led "Go beyond the bucket list" | Trip filters, "Build my trip", live chat | 4.9 from 5,893 reviews, B Corp |
| Exoticca | Next.js | Promo banner plus price and discount cards | Search, phone, WhatsApp, Messenger, chat | ASTA, seller-of-travel licences |

None of the ten uses 3D or WebGL. Motion is fades, carousels, hover and occasional muted video. Premium is created by typography, photography, pacing, specialists' faces, awards, review counts and a persistent enquiry plus phone.

Region and trip page template (Jacada India, Audley "Luxurious Rajasthan"): hero, intro, trip cards (duration, "From $X pp", theme), "where to go" with 30-plus places, when-to-go month grid, specialist-picked experiences, specialist quote and team faces, hotels, "why book with us" three pillars, Trustpilot reviews, guides, CTA. Trip page: highlights, when to go, other tours, "speak to a specialist", "why travel with us".

Award-winning travel sites 2024 to 2026: Spain Collection Travel (Awwwards honourable mention, Oct 2025: full-bleed video loops, serif and italic editorial type, cream palette, no WebGL); Travel Next Level (Awwwards Site of the Day, Dec 2024: Webflow plus GSAP, AVIF imagery, drag carousels, no 3D); Explore Primland (Nuxt plus Three.js terrain flythrough, a bespoke resort sales tool, Awwwards status uncertain); Hedwig Curated Travel (honourable mention Apr 2026 on Readymag, serves no crawlable content, a cautionary example); Made for Spain and Portugal (2025 DMC redesign with an interactive map to browse itineraries by region).

---

## Part 5. The two 3D-template vendors

### motionsites.ai
- Sells pre-made AI website prompts for Lovable, Bolt, Cursor or Claude; third-party listing counts 364 landing-page prompts, 159 looping video backgrounds, 40 Lovable templates.
- Own site is Webflow plus Mux video (one script, one video element, no canvas).
- Tech of outputs is whatever the AI generates each run; nothing disclosed.
- Pricing page returned 404; stork.ai listing shows Go Unlimited USD 149 per year or 239 one-time, Power USD 239 per year or 349 one-time; an older listing says USD 10 per month (conflicting, unverified).
- Product Hunt launch around March 2026 with zero reviews; comments raised mobile performance and load speed concerns. No Trustpilot presence.
- No travel or tourism template in the 38-template listing.
- Lovable and Vite output is a client-rendered single-page app by default, which is an SEO risk unless pre-rendered.

### scrolltide.co
- 111 scroll-driven templates (4 free), 26 components, 55 shaders, 18 sections, 14 UI screens, delivered as prompts plus source code; "production-ready Next.js output".
- Tech: React, Vite or Next.js, Tailwind, Framer Motion, GSAP, Three.js and WebGL shaders, Lenis smooth scroll, scroll-scrubbed canvas image sequences.
- Pricing: USD 29 per month (core library, 10 premium copies per week), USD 108 per year (3D templates only on yearly or lifetime), USD 239 lifetime; "personal and client use"; "all sales are final, no refunds".
- Template pages show MP4 previews, not live demos, so real mobile performance cannot be tested before paying (live demos behind the paywall unverified).
- Own site: Next.js on Vercel, 14 JS chunks, 871 KB raw or 277 KB compressed JavaScript, 464 KB HTML, GSAP and Lenis present.
- No reviews found anywhere; links point to one maker's Instagram. A single-person product.
- Travel-adjacent templates ("Midnight Sun" sea kayak, "Marlin" jetski) are single-page mood pieces with no itinerary or enquiry structure. No SEO, mobile or accessibility statements.

### Category context
- Framer marketplace 3D category: USD 29 to 129, mostly Spline embeds or video, no travel templates.
- Spline scenes: documented as slow on mobile, laggy or crashing on phones, blank for 2 to 5 seconds; keep under 50k polygons.
- 21st.dev: drop-in React WebGL shader heroes.
- Studios doing real 3D travel pieces (Lusion, Little Workshop, Unseen, Outpost Design) are bespoke, five-figure-plus engagements. Awwwards' Three.js collection of 119 sites contains no travel or tourism site.

### Evidence base for the verdict
- Three.js core about 600 KB minified before any scene; with helpers, post-processing and a model, past 3 MB; Lighthouse scores in the 30s reported. Median mobile page is 2.3 MB total with 558 KB JavaScript (Web Almanac 2024).
- INP is where animation-heavy sites fail most, from continuous animation loops and smooth-scroll libraries.
- Googlebot does not support WebGL and does not scroll or click; canvas content has no DOM text, headings or links.
- Google and Deloitte "Milliseconds Make Millions": 0.1 s faster gave travel sites about 10.1% more conversions and lead-gen sites 21.6% more form-page progression; 53% of mobile visits abandon after 3 s.
- WCAG 2.3.3 and technique C39: interaction-triggered motion must be disable-able via prefers-reduced-motion. About 35% of US adults over 40 have vestibular dysfunction (NHANES).
- Nielsen Norman Group: scroll-triggered animations slow users and create frustration; parallax often creates usability issues; scrolljacking contradicts user control. Baymard: 46% of homepage carousels have usability issues.
- No credible study found showing a 3D or WebGL hero lifts lead-gen conversion.
