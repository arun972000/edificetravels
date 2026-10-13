# Launch checklist

Everything marked here is either a placeholder in the code or a decision the site cannot make for you. Work through it top to bottom before the domain points at this build.

## 1. Company facts (`src/data/site.ts`)

- [x] `legalName`: Edifice Travel Solutions LLP, taken from the old site ("Edifice Travels, a unit of Edifice Travel Solutions LLP"). Check it matches the LLP certificate exactly.
- [x] `address.street`: V-218, Ground Floor, Rajouri Garden, New Delhi 110027, from the old site.
- [ ] `llpin` and `gstin`: fill in. An LLP has an LLPIN, not a CIN. Both appear in the footer and are a trust signal for foreign guests.
- [x] `social`: Instagram, Facebook, X and YouTube links from the old site. Check each account is still active.
- [ ] No founding year is shown anywhere. Add one to `site.ts` and `organizationLd()` in `src/lib/seo.ts` only if you want it published.
- [ ] Two other numbers appear on the old site's flyers (+91 97171 30134 and +91 99530 24399). Tell us if either should be published.
- [ ] `whatsapp`: confirm the number that will actually be answered (currently +91 99107 02531 from the old site). WhatsApp Business app installed, greeting and away messages set, hours matching `officeHours`.
- [ ] `replyHours`: 12 is promised on every page. Only keep it if the rota can deliver it seven days a week, including US and UK evenings.
- [ ] `memberships`: leave empty until held. Never display Ministry of Tourism or IATO badges before recognition.

## 2. People and proof

- [ ] `src/content/specialists/specialists.json` holds one honest entry, "The Edifice Travels team", because the old site names no individual planners. Add real people (name, role, languages, years, `portrait` slug) when you are ready, and point journeys, regions and guides at them with `specialist:` or `author:`. A portrait goes in `src/assets/photos/`; without one a person gets a monogram and the team gets the logo mark, never a stock face.
- [x] `src/content/reviews/reviews.json` holds the two Google reviews shown on the old site, quoted exactly. Add new ones the same way, with `source: "Google"` and the wording untouched. No star rating is published in structured data, because Google does not allow reviews copied from its own listings to be marked up.
- [ ] Replace `googleReviews` in `src/data/site.ts` (currently a Google Maps search) with the share link of your Google Business Profile, and add that link to `sameAs` in `src/lib/seo.ts`.
- [ ] Create Trustpilot and TripAdvisor listings so new reviews have more than one public home.
- [x] A content test fails the build if a demonstration profile or review, an unknown team member, or a photo without a credit and alt text appears.

## 3. Prices (none published, by decision of 12 October 2026)

No prices appear anywhere on the site, in structured data or in the planner. Pages promise "an itemised written quote within 48 hours" instead.

- [ ] Confirm the team can meet the 48-hour quote promise in peak season; change the wording in `src/i18n/*.ts` and the journey pages if not.
- [ ] Confirm the named hotels per style (Comfort, Premium, Luxury) in each `src/content/journeys/*.md` are ones you contract.
- [ ] Prepare the quote template your specialists send (named hotels, inclusions, GST, deposit, cancellation terms).

## 3a. Languages and countries

- [ ] Native-speaker review of `src/i18n/de.ts`, `fr.ts`, `es.ts`, `it.ts` and `src/i18n/content.ts`.
- [ ] Flight times in `src/data/countries.ts` are typical durations shown as "about"; re-check them once a year.
- [ ] If the team can reply in German, French, Spanish or Italian, say so; until then no page promises it.

## 3b. Facts corrected during the October 2026 rewrite

The content was rewritten to remove machine-sounding phrasing, and about fifty factual slips were corrected along the way. Have a specialist read these before launch:

- [ ] Journeys: Mehtab Bagh credited to Babur; Ranthambore placed between Agra and Jaipur; Pattadakal dated to the eighth century; Mopa named as the airport for north Goa; a fifth safari added to Tea Hills day 9; the Kathputli puppeteers moved to Delhi.
- [ ] Destinations: the claim that Mehrangarh was never taken removed (Sher Shah took Jodhpur in 1544); Udaipur's 1615 treaty acknowledged; Madurai counted at about 33,000 sculptures; Bom Jesus dated 1624; Mysore Palace described as state property since 1998.
- [ ] Drive times: Jaisalmer to Udaipur via Ranakpur is now "a full day on the road". Check this and every other `drive:` line against your drivers' real times.
- [ ] Varkala's cliff height was removed because two pages disagreed. Add the right figure back if you know it.

## 4. Policies (`src/pages/*.astro`)

The booking terms use defaults that must be confirmed with your accountant and lawyer:

- [ ] Deposit 25%, balance 45 days before travel.
- [ ] Cancellation ladder: 60+ days deposit, 31 to 60 days 50%, 15 to 30 days 75%, 14 days or fewer 100%.
- [ ] Complaint window 28 days; acknowledgement 48 hours; resolution 30 days.
- [ ] Privacy policy: data retention periods (24 months enquiries, 8 years bookings) and the named grievance officer.
- [ ] Governing law and jurisdiction (New Delhi).

## 5. Photography

- [ ] Images currently come from Wikimedia Commons under open licences; attribution is generated on `/credits` from `src/data/photo-credits.json`. Keep that page live for as long as any of those images is in use.
- [ ] Plan a professional shoot for the November to February season on two or three signature routes and replace images slug by slug (same filename, no code change).
- [ ] `public/og-default.jpg`: a 1200 x 630 social image. Until then pages fall back to the hero image.
- [x] The original logo is in `src/assets/brand/` (the untouched file plus a copy with the light background removed), with `public/logo.png` for structured data and `public/apple-touch-icon.png`. The artwork is only 180 px wide; send a larger or vector version if you have one and replace the PNG, same filename.

## 6. Forms and analytics

- [ ] Create a Web3Forms account (free tier, 250 submissions a month) and put the access key in `.env` as `PUBLIC_FORM_ACCESS_KEY`. Without it the planner still completes and hands the visitor to WhatsApp, but no email is sent. Enquiry summaries always arrive in English, whatever language the visitor used.
- [ ] Set `ga4` in `src/data/site.ts` to the GA4 measurement id. Analytics loads only after cookie consent. Conversion events already fire: `whatsapp_click`, `plan_click`, `enquiry_submit`.
- [ ] Add Microsoft Clarity if you want session recordings (gate it behind the same consent).
- [ ] Verify the domain in Google Search Console and Bing Webmaster Tools, and submit `/sitemap-index.xml`.
- [ ] `/llms.txt` is published for AI assistants. Nothing to do unless you add a new section of the site.

## 7. Hosting

- [ ] Cloudflare Pages (recommended): build command `npm run build`, output `dist`, Node 22+. Add the environment variable above. Run `npm test` in CI before each deploy, or as a build step: `npm test && npm run build`.
- [ ] Keep `build.format: 'file'` in `astro.config.mjs`. It makes Cloudflare serve `/about` directly instead of redirecting to `/about/`.
- [ ] `public/_redirects` sends all 28 URLs in the old Shopify sitemap, plus Shopify's standard paths, to the closest new page with a 301. Before switching DNS, export any other URLs from Shopify (Online Store, Navigation, URL redirects) and add them.
- [ ] Point `edificetravels.com` at Cloudflare, then cancel the Shopify plan only after the redirects are confirmed working: request three old URLs and check each returns 301 to the right page.
- [ ] `public/_headers` sets security headers and a one-year cache on hashed assets. Turn on HSTS in Cloudflare (SSL/TLS, Edge Certificates) once every subdomain serves HTTPS.
- [ ] Optional: Cloudflare Turnstile on the planner form if spam arrives.
- [ ] After the first deploy, run PageSpeed Insights on the home page and one journey page. Targets: LCP under 2.0 s, INP under 200 ms, CLS under 0.05, Lighthouse mobile 90+.

## 8. Design tools

- [ ] Figma and Canva plugins are installed but not yet authorised. Connect them in claude.ai connector settings, or with `/mcp` in an interactive Claude Code session, to export the design tokens to Figma or produce social templates in Canva.

## 9. Content gaps to fill over time

- [ ] Regions and destinations exist for the five regions; add Sikkim, Meghalaya, Orchha, Khajuraho, Lucknow and Spiti as destination pages when journeys use them.
- [ ] The old site also sold Kashmir (Delhi, Agra and Srinagar), Shimla and Manali, Sikkim, Andaman and a Kerala monsoon trip. Both real reviews are about Kashmir, so a Kashmir journey is the most useful addition. Send the itinerary you actually run.
- [ ] `docs/PLANNER-AUDIT.md` lists every planner requirement and its status. Work through its "Needs you" lines.
- [ ] A luxury train journey (Maharajas' Express or Palace on Wheels) once contracted.
- [ ] German and French versions of the home page, top journeys, visa and cost guides (planner Phase 3). The folder structure under `src/pages` is ready for `/de/` and `/fr/`.
- [ ] A "For travellers from India" hub for domestic and outbound (planner Phase 4).
