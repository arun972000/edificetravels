# Edifice Travels website

Static, inbound-first tourism site for Edifice Travels in six languages (English, Hindi, German, French, Spanish, Italian), built with Astro 7, Tailwind 4 and two small Preact islands. Leads go to WhatsApp and email. There is no backend, and no prices are published.

## Run

```sh
npm install
npm run dev          # http://localhost:4321
npm run build        # static output in dist/
npm run preview
npm test             # unit and content tests (fast, no build needed)
npm run test:build   # builds, then checks the output: SEO basics, hreflang, schema, redirects
```

Node 22 or newer. Copy `.env.example` to `.env` and add the Web3Forms key before the planner can send email.

## What the tests protect

- **Dictionaries:** every language has every English key, array length and `{placeholder}`.
- **Content rules:** no prices of ours, no generated-text symbols (em dash, middle dot, ellipsis, arrow), and SEO descriptions of 160 characters or fewer.
- **Built pages:** each indexable page has a title of 60 characters or fewer, a description, one h1, a canonical URL and alt on every image. Structured data parses, and no Offer or Product markup exists.
- **Redirects:** every old Shopify URL in `public/_redirects` lands on a page that exists.

## Design

Version 4, "Postcards" in the logo's colours. The badge's orange (#ea651f) and black (#1c1b1a) carry whole panels, the footer, chips, numerals and card details, with the pyramid from the badge as a graphic device. White pages, photographs in soft rounded frames, Fraunces headings with Manrope text, and a phone-first layout. A planning dock is fixed to the bottom of the phone screen, rows swipe sideways, choices are chips, and section chips stick to the top of long pages. The country picker is a small popover with real flags and live clocks. Motion is quick and light (every entrance under 0.7 s, nothing tied to the scroll position): photos develop, headlines rise word by word, and timelines draw themselves. Country and language are one choice in the header: pick a country, its language follows and the page reloads. Read `docs/DESIGN-SYSTEM.md` (version 4, then version 3) before adding a page; it has the contrast rules for text on orange and `docs/BRAND-VOICE.md` before writing copy.

## Where things live

| Path | What |
|---|---|
| `docs/PLANNER.md` | Strategy, roadmap and decision log |
| `docs/PLANNER-AUDIT.md` | Every planner requirement checked against the built site |
| `docs/DESIGN-SYSTEM.md` | The current design: tokens, type, motion, components |
| `docs/DESIGN-DIRECTION.md` | A retired direction, kept as a record |
| `docs/BRAND-VOICE.md` | Voice, tone by context, terminology, humanisation rules |
| `docs/SEO-AUDIT.md` | Latest SEO audit and what is still open |
| `docs/ACCESSIBILITY-AUDIT.md` | Contrast, axe results, keyboard and motion notes |
| `docs/LAUNCH-CHECKLIST.md` | Placeholders and decisions before go-live |
| `docs/REQUIREMENTS-FROM-YOU.md` | Material and decisions only the business can provide |
| `src/data/site.ts` | Company facts, contacts, navigation |
| `src/data/countries.ts` | Countries in the picker: language, time zone, typical flight time |
| `src/data/photo-alt.ts` | What each photograph shows, used as alt text |
| `src/i18n/` | Locale dictionaries (en, de, fr, es, it), routing helpers, translated content names |
| `src/views/` | Page bodies shared by every language (home, plan, contact, about) |
| `src/content/` | Journeys, regions, destinations, guides and theme hubs (Markdown), specialists and reviews (JSON) |
| `src/content.config.ts` | Schemas. A bad field fails the build |
| `src/assets/photos/` | Photography by slug. Replace a file to replace an image everywhere |
| `src/components/home/` | Home sections: postcard hero, trip starter, journey finder, day stack, region mosaic, how it works |
| `src/components/MobileDock.astro`, `SectionTabs.astro` | Phone planning dock; sticky section chips for long pages |
| `src/components/Pyramid.astro`, `BrandStats.astro`, `MonthStrip.astro` | The badge's pyramid as a graphic; the promise in numbers (counted from content); best months as twelve cells |
| `src/pages/themes/` | Theme hubs (travel by interest), built from `src/content/themes` |
| `public/flags/` | Country flags for the picker (`npm run flags` refreshes them from country-flag-icons, MIT) |
| `src/islands/` | Preact islands (React-compatible API): RouteMap, Wizard |
| `src/components/decor/` | Traditional decorations: toran, rangoli, diya, buta. `site.decor` turns them off |
| `src/scripts/locale.ts` | Country and language flow, local time and flight lines |
| `src/styles/global.css` | Design tokens, chips, swipe rows, frames, motion (rise, develop, split, lit) |
| `src/pages/llms.txt.ts` | Plain-text site map for AI assistants, generated from content |
| `public/_redirects`, `public/_headers` | Cloudflare Pages redirects from the old site, and response headers |
| `tests/` | Vitest suites: unit, content, build |

## Adding a journey

Copy any file in `src/content/journeys/`, change the frontmatter, write the day-by-day, and run `npm run build`. The journey appears in the index, the region page, the feeling finder, the sitemap, `llms.txt` and the structured data with no other changes. Run `npm test` to check the copy rules.

## Hosting note

Pages are built as files (`about.html`), not folders (`about/index.html`). Cloudflare Pages serves a file at `/about` but redirects a folder to `/about/`, which would contradict the canonical URLs. Keep `build.format: 'file'` in `astro.config.mjs`.
