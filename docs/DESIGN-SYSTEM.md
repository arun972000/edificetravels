# Edifice Travels Design System

## Version 3: Postcards (12 October 2026, current)

The owner asked for white pages instead of cream, an entirely new layout, a phone experience without faults, professional and emotional motion, and a less formal, more interactive language and country picker with real flags. Images and fonts stay as approved. Sections 1 onward below describe version 2 and are kept for history. Where they disagree with this section, this section and `src/styles/global.css` win.

**References studied.** Seven travel sites were captured at phone and desktop sizes: Black Tomato, Jacada, Scott Dunn, Eloura Journeys, Tourlane, Intrepid and Much Better Adventures. The last one blocked automated visits. Patterns taken:
- **Bottom bar:** a planning bar fixed to the bottom of the phone screen (Jacada, Scott Dunn).
- **Chips:** for choosing (Black Tomato, Tourlane).
- **Swipe rows:** with the next card peeking in (Intrepid).
- **Numbered steps:** for how planning works (Eloura, Tourlane).
- **Photos:** in rounded frames on white (Intrepid).

**Tokens**
- **Page:** white #ffffff, muted panels #f4f5f7, lines #e6e8ec.
- **Text:** ink #1b1d21, soft #464b54, muted #656b76.
- **Brand:** saffron #ed7717 for action fills with dark text. The deeper orange #9c4b0a is used for text and the logo word, at 5.9:1 on white.
- **Night:** #16181b for dark panels, which stay dark in both themes.
- **Radii:** 10, 18, 26 and 34 px, plus pills. Photos use 26 to 36 px. Chips and buttons are pills.
- **Type:** Fraunces at weight 380 for headings, Manrope for everything else, with 16 px body text on phones.

**Phone patterns**
- **Header:** white with a blur. The original round Edifice Travels badge with the wordmark beside it (on a white disc in dark mode). The locale chip shows the visitor's flag flying from a slim pole with a saffron tip, and the language code. The menu is a light dropdown card.
- **Dock:** "Plan your trip" and WhatsApp fixed at the bottom. It appears after the first screen, hides while typing, and shows a green dot during India office hours. Journey pages pass their own label.
- **Swipe rows:** used for journeys, promises, reviews and guides. Any row without links inside is focusable for keyboard users.
- **Section chips:** a sticky row on journey pages and the guide index that follows the reader.
- **Planner:** a segmented progress bar, large option tiles, and Back and Continue fixed at the bottom.

**Motion.** The easing is cubic-bezier(0.16, 1, 0.3, 1) throughout, and everything respects reduced motion.
- **Home hero:** the postcard opens to the full screen as you scroll.
- **Photos:** develop from a slightly inset frame.
- **Text:** headings rise word by word, and blocks settle up out of a soft blur.
- **Day in India:** postcards stack, each one easing back as the next arrives.
- **Timelines:** the planning steps and the itinerary rail draw themselves.
- **Feeling chips:** the journey cards re-deal.
- **Stay styles:** a sliding switch.
- **Picker:** the country sheet rises from the bottom with its tiles staggering in.

**Country and language popover** (13 October 2026, replacing the full sheet, which the owner found too big). A 320px card opens under the flag chip.
- **Flags fly** (`components/FlagWave.astro`, 13 October 2026). Each flag is cut into 3 px strips that rise and fall in turn, so a wave runs away from the pole, with light and shade following it. The chosen flag waves; the rest rest with a soft curl and lift on hover or focus. When a country is picked, its flag flies in an arc from the list to the header pole, the old flag is lowered, and the new one is raised. Reduced motion shows still flags and skips the flight.
- **Language:** five flag buttons; one tap switches language.
- **Country:** a search box over a short list of countries with real flags; one tap sets the country.
- **Clocks:** two small lines show the visitor's time and India's.
- **No buttons:** there is no Save or Cancel. The popover closes on Escape or an outside tap.

The same lightening was applied elsewhere:
- **Phone menu:** a dropdown card instead of a full-screen panel.
- **First-visit language suggestion:** a one-line pill with a flag.
- **Cookie notice:** a compact strip.

**Traditional decorations** (`src/components/decor/`, switched on and off with `site.decor` in `src/data/site.ts`):
- **Toran:** a marigold and mango-leaf garland hung at the top of the footer, as a doorway welcome.
- **Rangoli:** draws itself faintly behind the manifesto.
- **Diya:** a lamp with a breathing flame above the manifesto.
- **Buta:** a paisley divider used at three section breaks.

None of them sit on a photograph.

**Performance** (13 October 2026):
- **Islands:** run on Preact in React-compatible mode. The route map and planner load about 40 KB of script instead of about 220 KB.
- **Prefetching:** links prefetch on hover or tap instead of whenever they scroll into view.
- **Fonts:** unused italic font files were removed, and the two main fonts are preloaded.

**Checks.**
- **Accessibility:** axe reports no violations on 13 audited pages and screen sizes.
- **Overflow:** no sideways scrolling at 360, 390 or 768 px.
- **Tests:** a build test confirms that every country in the picker has a flag.

## Version 2 (history)

Version 2.0, 12 October 2026 (cinematic redesign, no published prices, five languages). Version 1.0, 10 October 2026. Built with the design plugin's design-system workflow. Tokens are implemented in `src/styles/global.css` (Tailwind v4 `@theme`) and must be used instead of hardcoded values anywhere in `src/`.

Direction: "editorial cinematic, map-led" (see `docs/PLANNER.md` Section 5). Photography carries emotion, typography carries the premium feel, the route map carries identity, motion is restrained.

Brand source: the only thing taken from the old site (edificetravels.com) is its colour pair, saffron orange `#ed7717` with its deep shade `#c25f0f`, plus the near-black of the logo wordmark. Everything else is new.

---

## 1. Design tokens

### 1.1 Colour

Semantic tokens first; raw values second. Components reference the semantic names only.

| Token | Light | Dark | Use |
|---|---|---|---|
| `--color-bg` | `#faf7f2` (warm ivory) | `#121110` | Page background |
| `--color-bg-elevated` | `#ffffff` | `#1b1917` | Cards, panels |
| `--color-bg-muted` | `#f1ebe2` (sand) | `#242120` | Alternating sections, facts bars |
| `--color-ink` | `#1c1917` | `#f5f0e8` | Headings |
| `--color-ink-soft` | `#4a4440` | `#cfc7bc` | Body text |
| `--color-ink-muted` | `#7d746c` | `#9a918a` | Captions, meta |
| `--color-line` | `#e6ddd1` | `#2f2b28` | Borders, dividers |
| `--color-brand` | `#ed7717` | `#f08a35` | Primary actions, accents, the route line |
| `--color-brand-deep` | `#c25f0f` | `#d9741f` | Hover, pressed, emphasis text on light |
| `--color-brand-soft` | `#fdebd9` | `#3a2416` | Tints, badges, selected states |
| `--color-indigo` | `#2f3a63` | `#8b97c9` | Secondary accent (night skies, map water), links in long text |
| `--color-success` | `#2e7d4f` | `#6cc492` | Form success, "replied within" |
| `--color-warning` | `#b7791f` | `#e0a83f` | Provisional notices |
| `--color-danger` | `#b3261e` | `#f2726b` | Errors |
| `--color-whatsapp` | `#25d366` | `#25d366` | WhatsApp button only (brand rule) |
| `--color-overlay` | `rgb(28 25 23 / 0.55)` | `rgb(0 0 0 / 0.6)` | Gradient over hero photography |

Rules:
- Orange is an accent, never a background for whole sections. Maximum one orange element per viewport besides the sticky call to action.
- Text on orange uses `#1c1917` for small text (contrast 4.6:1 on `#ed7717`) and white only at display sizes 24 px bold or larger.
- Contrast: body text on `--color-bg` is 10.9:1 (light) and 12.5:1 (dark).

### 1.2 Typography

| Token | Value |
|---|---|
| `--font-display` | "Fraunces Variable", Georgia, serif. Optical size axis on; `font-variation-settings: "SOFT" 30, "WONK" 0` |
| `--font-sans` | "Manrope Variable", system-ui, sans-serif |

Scale (fluid, clamp between 360 px and 1440 px viewports):

| Token | Size | Line height | Font | Use |
|---|---|---|---|---|
| `--text-display` | clamp(2.75rem, 2rem + 4vw, 6rem) | 0.98 | display, weight 400 | Hero headline |
| `--text-h1` | clamp(2.25rem, 1.6rem + 2.6vw, 4rem) | 1.05 | display 400 | Page titles |
| `--text-h2` | clamp(1.75rem, 1.3rem + 1.6vw, 2.75rem) | 1.1 | display 400 | Section titles |
| `--text-h3` | clamp(1.25rem, 1.1rem + 0.6vw, 1.625rem) | 1.2 | display 500 | Card titles, day titles |
| `--text-lead` | clamp(1.125rem, 1.05rem + 0.4vw, 1.375rem) | 1.5 | sans 400 | Intros |
| `--text-body` | 1.0625rem | 1.65 | sans 400 | Body |
| `--text-small` | 0.9375rem | 1.5 | sans 400 | Meta, captions |
| `--text-eyebrow` | 0.75rem | 1.2 | sans 600, tracking 0.14em, uppercase | Labels above headings |

Rules: headlines say something ("Three weeks from the Thar to the backwaters"), never label-style ("Rajasthan Tour Package 7N/8D"). Italic Fraunces for one emphasised phrase per hero at most. Max line length 68 characters for body text.

### 1.3 Spacing

4 px base. Tokens: `--space-1` 4, `-2` 8, `-3` 12, `-4` 16, `-5` 24, `-6` 32, `-7` 48, `-8` 64, `-9` 96, `-10` 128, `-11` 160.

Section rhythm: vertical padding `--space-9` on desktop, `--space-8` on mobile. Page gutter 16 px mobile, 24 px tablet, 40 px desktop; content max width 1280 px; prose max width 68ch.

### 1.4 Radius, borders, elevation

| Token | Value |
|---|---|
| `--radius-sm` | 6 px (inputs, chips) |
| `--radius-md` | 14 px (cards) |
| `--radius-lg` | 24 px (hero panels, wizard) |
| `--radius-pill` | 999 px (buttons, tags) |
| `--border` | 1 px `--color-line` |
| `--shadow-1` | 0 1px 2px rgb(28 25 23 / .06) |
| `--shadow-2` | 0 8px 24px rgb(28 25 23 / .10) |
| `--shadow-3` | 0 24px 60px rgb(28 25 23 / .18) (sticky CTA, modals) |

### 1.5 Motion

| Token | Value |
|---|---|
| `--ease-out` | cubic-bezier(.2,.7,.2,1) |
| `--ease-in-out` | cubic-bezier(.65,0,.35,1) |
| `--dur-fast` | 160 ms (hover, focus) |
| `--dur-base` | 320 ms (reveals) |
| `--dur-slow` | 700 ms (hero fades, route draw) |

Rules: only `transform` and `opacity` animate. Reveal on scroll: 24 px rise plus fade, once, staggered 60 ms. Route lines draw with SVG stroke-dashoffset over `--dur-slow`. All motion is disabled under `prefers-reduced-motion: reduce`. No parallax, no scroll-hijack, no autoplaying carousels, no video autoplay on mobile or Save-Data.

### 1.6 Imagery

Full-bleed photography at 16:9 (hero), 4:5 (journey cards), 3:2 (destination cards), 1:1 (specialist portraits). Gradient overlay from `--color-overlay` at the bottom 55% of a hero for text legibility. Every image has descriptive alt text and a credit entry in `src/data/photo-credits.json`. Delivered as AVIF/WebP through Astro's image service with responsive widths.

---

## 2. Components

### Button

| Variant | Use |
|---|---|
| `primary` | One per view: "Plan your trip", "Send". Brand background, ink text, pill |
| `secondary` | Outline on ink, transparent background |
| `ghost` | Text with arrow, for "View all journeys" |
| `whatsapp` | WhatsApp green with the glyph, used only for click-to-chat |

Sizes `sm` 36 px, `md` 44 px, `lg` 52 px tall. Minimum target 44 px on touch. States: hover darkens 8%, focus ring 2 px `--color-brand-deep` offset 2 px, disabled 50% opacity, loading shows a spinner and keeps width.

Accessibility: real `<a>` for navigation, `<button>` for actions; visible focus; the WhatsApp link states "opens WhatsApp" for screen readers.

### Hero

Full-viewport (min 72vh) photograph, eyebrow, display headline with one italic phrase, one-line promise, primary button plus ghost link. On mobile the headline sits over the bottom third. Optional muted video loop on desktop only, with poster, lazy. Props: `image`, `alt`, `eyebrow`, `title`, `emphasis`, `lead`, `primary`, `secondary`, `video?`.

### JourneyCard

4:5 image, duration pill top-left, title (h3 display), route line text, "From INR X" with the currency island, theme tags. Whole card is one link; hover lifts 4 px and zooms the image 3% over `--dur-base`. Props: `journey` (collection entry).

### FactsBar

Horizontal strip under a journey hero: days, route, from-price, best months, pace, comfort tiers. Wraps to two rows on mobile. Background `--color-bg-muted`. Each fact has an eyebrow label and a value.

### RouteMap (React island)

Props: `stops: {name, lat, lng, day}[]`, `interactive`. Renders an SVG projection of India with a soft tinted land shape, stops as dots, the route as a line that draws on scroll, labels on hover or tap. Keyboard: Tab through stops, Enter jumps to the day. Loaded with `client:visible`. Reduced motion renders the line fully drawn.

### DayByDay

Ordered list; each item: day number (display numeral in brand), title, drive time chip, text, stay-by-tier line (Comfort / Premium / Luxury with example hotels), optional image. Accordion on mobile below day 3 ("Show all days").

### PriceTiers

Three columns: Comfort, Premium, Luxury. Each: from-price (INR plus currency island), what changes (hotel class, vehicle, extras), example hotels. The tier the journey is written for is marked "as described".

### SpecialistCard

Portrait 1:1, name, role, "I design this journey", two-line note, WhatsApp button with pre-filled text, "Replies within 12 hours" line with local-time hint. Appears beside every enquiry point.

### WhatsAppCTA

Link to `https://wa.me/<digits>?text=<encoded>`; text is generated per page (journey name, travellers, month placeholders). Green pill with glyph, states reply hours. Also a sticky mobile bar on journey pages: from-price, WhatsApp, Plan.

### Wizard (React island)

Six steps: where, when and how long, who, comfort and budget, interests, contact. Progress indicator, back button, keyboard friendly, inline validation, consent checkbox. Submits to the form endpoint; on success routes to `/thank-you` carrying a WhatsApp link with the summary. Trust column beside it: specialist card, review count, reply promise.

### ReviewCard

Quote (display italic), guest name, country, month and journey, star row (SVG), optional photo. Grid of three on desktop, horizontal scroll with snap on mobile (no auto-rotate).

### CurrencyToggle (React island)

Shows "From INR X" and a small toggle USD, EUR, GBP, AUD. Converts with the rates in `src/data/rates.json` (dated) and labels results "approx." Persists choice in localStorage. Progressive: the INR price is in the HTML, the toggle enhances it.

### Section, Eyebrow, Prose, Breadcrumbs, Footer, Header

Layout primitives. Header: logo, nav, "Plan your trip" primary, WhatsApp icon; transparent over heroes, solid on scroll. Footer: company identity (name, CIN placeholder, GSTIN placeholder, address), memberships held, policies, languages, newsletter, photo credits link.

---

## 3. Patterns

- **Enquiry everywhere, once per screen.** Never a floating bubble on top of a form on top of a chatbot.
- **Trust beside the ask.** Every form has the specialist, the reply promise and a review count next to it.
- **Quote promise before the form.** No prices are published; wherever a price would sit, the page promises an itemised written quote within 48 hours.
- **Zero-state honesty.** Empty or missing data says so plainly.
- **Dark mode is designed, not inverted.** Photography stays, surfaces shift to warm charcoal, orange brightens one step.

## 4. Accessibility baseline

WCAG 2.2 AA: contrast as listed, focus visible everywhere, 24 px minimum targets (44 px on primary actions), skip link, landmarks, reduced motion honoured, captions on any video, forms with labels and error text tied by `aria-describedby`, map and wizard fully keyboard operable, no information by colour alone.


---

## 5. Motion system (v2)

All effects use transform, opacity or a covering panel, run once, and stop under `prefers-reduced-motion`.

| Effect | Where | How |
|---|---|---|
| Cinematic hero | Home | Four photographs cross-fade every 7 s with a slow zoom; visible pause; pauses when the tab is hidden |
| Word rise | Every section heading, heroes | Words rise from behind a mask, staggered 55 ms (`.split`) |
| Curtain reveal | Card and section images | A panel the page colour slides up off the image (`.reveal-img`, set `--reveal-bg` on dark sections) |
| Scroll-lit text | Manifesto | Each word brightens as it crosses the reading zone (CSS scroll-driven animation) |
| Pinned story | "A day in India" | Photograph pinned while six moments scroll; the moment matching India time is marked live |
| Rail | Journeys | Native horizontal scroll with snap, arrows, progress line, mouse drag |
| Accordion | Regions | Hovered or focused panel grows; vertical titles on the others |
| Route line | Journey maps | Line draws on view, a dot travels the route |
| Page transitions | Sitewide | Cross-document view transitions; card image morphs into the journey hero |
| Texture | Sitewide | One static film-grain layer |

## 6. Language and country

- Locales: English at the root, German, French, Spanish and Italian under `/de`, `/fr`, `/es`, `/it` for the home page, planner, about and contact. All other pages are English and say so to visitors who chose another language.
- Strings: `src/i18n/*.ts` (identical shape enforced by type), content names in `src/i18n/content.ts`.
- Country: chosen in the header dialog or guessed from the time zone; sets local time, reply window in the visitor's clock, typical flight time to Delhi and the e-Visa note. Country never changes content or prices.
