# SEO audit report

**Site:** Edifice Travels (static Astro build, `dist/`)
**Date:** 12 October 2026
**Pages analysed:** 90 HTML pages (88 in the sitemap; the 404 and thank-you pages are excluded on purpose)
**Score:** 99 out of 100 after fixes, up from 71 before them

How it was run: a script reads every built page and checks the title, meta description, h1 count, heading order, canonical, Open Graph and Twitter tags, image alt and dimensions, JSON-LD parsing, broken internal links and orphan pages. The same checks now run in `npm run test:build`, so a regression fails the build tests.

## Search and AI search pass, 13 October 2026

Score after this pass: 99 out of 100, with no critical issues or warnings. What was added:

- **Every page describes itself.** A WebPage node (AboutPage, ContactPage or CollectionPage where it fits) ties each URL to the site and the company, with its language, share image and, for guides, published and updated dates.
- **The company record is complete.** The schema now carries the real logo (with size), the street address, opening hours (9:00 to 20:00, seven days), a Google Maps link, the description and slogan, the areas of knowledge and the social profiles.
- **Hubs list what they link to.** The journeys, destinations, travel guide and region pages publish an ItemList of their journeys, places or guides.
- **Guides read as articles.** They carry the article section, a link to their page node, and `article:published_time` and `article:modified_time` tags.
- **Search previews.** Every indexable page allows large image previews and full snippets (`max-image-preview:large`, `max-snippet:-1`), and has share-image alt text, the X handle and Open Graph language alternates on translated pages.
- **A real share card.** `public/og-default.jpg` is now a 1200 by 630 card with the badge, the line "Some places you see. India, you feel." and the address. The home page uses it.
- **Sitemap.** Translated pages list their language alternates, and guides carry their updated date as `lastmod`.
- **AI crawlers.** robots.txt names the main search and AI crawlers (Google, Bing, Apple, OpenAI, Anthropic, Perplexity, DuckDuckGo, Meta, Amazon) in one group that repeats the site rules, because a crawler that finds its own name ignores the general group.
- **`/llms.txt` and `/llms-full.txt`.** The short file now opens with the key facts: company, office, hours, reply time, how quotes work, languages and the Google reviews quoted exactly. The full file holds every journey day by day, every region, destination and guide, for assistants that want the whole picture in one fetch.
- **Tests.** The build tests check the page node, the share alt text, the company record, robots.txt groups, the sitemap alternates and the full text file.

Still to do by you: add the Search Console and Bing verification codes to `verification` in `src/data/site.ts`, submit the sitemap, add your Google Business Profile link to `sameAs`, and turn on Crawler Hints in Cloudflare (it sends IndexNow pings to Bing and others whenever a page changes).

## Critical issues

None. Every page has a title, a description, one h1, a canonical URL and structured data that parses. No internal link is broken and no page is orphaned.

## Warnings found and fixed

- [x] **Meta descriptions over 160 characters** on 23 English pages and 6 translated pages. Google cuts these off mid-sentence. All are now 160 or fewer, and the content test enforces it.
- [x] **Two guide titles over 60 characters.** Guides now take an optional `seoTitle`, used for the title tag while the page keeps its full headline.
- [x] **Duplicate title** on `/contact` and `/fr/contact`. The French page is now "Nous contacter".
- [x] **Heading jump on `/journeys`** from h1 straight to the card h3s. A section h2 now sits between them.
- [x] **Hero alt text that described the wrong photo.** The journeys page called Pangong Tso "a monastery", and several slugs name a use rather than the subject. Every photo now has a written description in `src/data/photo-alt.ts`, taken from the source image.
- [x] **The home hero's alt text** lost its base text when the window changed photo, because the script cut at the first colon. Fixed in the component.
- [x] **Short descriptions** on accessibility, cookies, credits, reviews and terms were lengthened to say what each page holds.

## Added

- **TouristDestination schema** on all 31 destination pages, with coordinates, the state, and each highlight as a TouristAttraction.
- **`/llms.txt`**, a plain-text map of every journey, region, destination and guide for AI assistants and answer engines. It is generated from the content, so it never goes stale, and it states the no-published-prices policy.
- **Alt text on content photos:** destination, region, journey and guide heroes; day-by-day photos; galleries; and the English About and Contact photos.

## Opportunities

- [ ] **Translated pages use decorative images.** Alt text exists only in English, so the German, French, Spanish and Italian pages leave photos unlabelled rather than mixing languages. Add translated descriptions when the translations are reviewed.
- [ ] **Card thumbnails stay `alt=""`** (584 images). This is correct: each sits inside a link whose text already names the journey, place or guide, and repeating it would make screen readers say everything twice.
- [ ] **No AggregateRating markup.** This is deliberate while the reviews are samples. Add it only once real, verifiable reviews exist, ideally drawn from Google.
- [ ] **Translate journey pages for the German market** if enquiries justify it. Only home, plan, about and contact are translated now, so German searches for "Rajasthan Rundreise privat" land on English pages.
- [ ] **After launch:** submit the sitemap in Google Search Console and Bing Webmaster Tools, claim the Google Business Profile for the New Delhi office, and measure Core Web Vitals from field data.

## Passing

- `robots.txt` allows everything except `/thank-you`, welcomes GPTBot, PerplexityBot, ClaudeBot and Google-Extended, and points to the sitemap.
- hreflang alternates, including x-default, on all translated routes.
- Organization and TravelAgency, WebSite, BreadcrumbList, TouristTrip with an itinerary, FAQPage and Article schema, all parsing.
- No Offer or Product markup anywhere, so no price reaches search results.
- Every image has width and height (no layout shift) and is served as responsive WebP.
- One h1 per page, and logical heading order on every page.
- Unique titles and descriptions across all indexable pages.
