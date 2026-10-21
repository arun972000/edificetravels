# What the site needs from you

The design and code are ready. What will make the site feel truly yours, and convert, is material only Edifice Travels can provide. Listed in order of impact.

## New on 21 October 2026: please check these

- **The Kashmir journey** (`src/content/journeys/lakes-and-meadows-of-kashmir.md`). It follows the Delhi, Agra and Srinagar route the old site sold, then adds Gulmarg and Pahalgam. Confirm the route, the number of nights and the hotels named in each style are ones you book.
- **The travel advice wording on Kashmir.** The journey and the Srinagar page say plainly that several governments advise against travel to Jammu and Kashmir outside Ladakh and that insurance may not cover it. Keep this wording unless your lawyer advises otherwise; it protects guests and you.
- **The eight theme hubs** (`src/content/themes/`). Each lists the destinations and journeys we recommend for that interest. Remove any place you would not send guests for that reason.
- **The three new guides**: the festival calendar, dress and etiquette, and the packing list. A quick read by someone in the team is enough.
- **Photographs.** Coorg, Chettinad, Kolkata, Dharamshala and Shimla now show photographs of their own places, from Wikimedia Commons with credits. Replace them with your own whenever you have them.

## 1. Owned photography and one short film (biggest emotional lift)

Licensed Commons photographs carry the site today, credited on /credits. They are good, but guests can tell the difference between stock India and *your* India.

- **A 20 to 30 second muted film** for the home hero, shot in the November to February light: dawn at the Taj, a driver opening a car door, chai being poured, a houseboat leaving its mooring, a guest laughing in a family kitchen, dunes at dusk. No talking, no logos. Delivered as a 1080p loop under 3 MB plus a still frame.
- **Shot list per signature journey** (12 to 20 frames each): the hotels you actually use, your drivers and cars, guides at work, real guests (with written consent).
- **Specialist portraits**: natural light, outdoors in India, looking at the camera. Replace the monogram placeholders by dropping files named `specialist-portrait-1.jpg` and `specialist-portrait-2.jpg` into `src/assets/photos/`.
- Swap images one by one by saving a new file under the same name; no code changes are needed.

## 2. Real people and real proof

- **Your team**: real names, roles, languages spoken and a two-line note each, replacing the sample profiles in `src/content/specialists/specialists.json`.
- **Founder story**: the home page has "A note from Delhi" signed by the team. If the founder signs it by name, with a photo, it becomes the most trusted paragraph on the site.
- **Five to ten verified guest stories** with first name, country, month, journey and, ideally, one photo each, replacing the six sample reviews.
- **Public reviews**: set up Google Business Profile, Trustpilot and TripAdvisor now and ask every returning guest. The site will display ratings only once real reviews exist.

## 3. Decisions only you can make

| Decision | Current setting | Why it matters |
|---|---|---|
| Prices online | None, by your decision. Every page promises an itemised written quote within 48 hours | Keep the 48-hour promise only if the team can meet it in peak season |
| Reply time | "Within 12 hours, seven days a week", shown on every page | Needs a rota covering US and UK evenings |
| Replies in other languages | The site is in German, French, Spanish and Italian, but promises replies in English only | If you hire or contract native speakers, we can add "we reply in Deutsch" and similar lines |
| Women chauffeurs | Not mentioned | If you can offer women drivers on request, it is a strong reason to choose you for solo women travellers |
| Signature experiences | Family-kitchen dinners and Bishnoi village visits appear in itineraries | Name the three experiences only you offer and we will feature them on the home page |
| Luxury trains | Mentioned, not sold | Add a journey once you have contracts |

## 4. Company facts to confirm (`src/data/site.ts`)

Legal name, CIN, GSTIN, street address, founding year, social handles and the WhatsApp number that will really be answered. Never display Ministry of Tourism or IATO badges until they are granted.

## 5. Accounts and keys

- **Web3Forms** access key in `.env` as `PUBLIC_FORM_ACCESS_KEY` so planner enquiries reach your inbox. Without it the planner still hands visitors to WhatsApp.
- **GA4** measurement id in `src/data/site.ts` (loads only after cookie consent).
- **WhatsApp Business** with greeting and away messages that match the reply promise.
- **Cloudflare Pages** for hosting, and Google Search Console once the domain points at the new site.

## 6. Translation review

German, French, Spanish and Italian copy was written to a professional standard, but have one native speaker per language read the home page, planner, about and contact pages before launch. Translated journey names live in `src/i18n/content.ts`.

## 7. Suggested next features

These fit the static, no-backend approach and the private-pricing policy:

1. **Price guide on request**: a beautiful PDF of example journeys with indicative costs, emailed only after someone enquires. It keeps prices private while giving serious travellers something to hold.
2. **Save journeys**: a heart on each journey card, kept in the visitor's browser, and a "Send my shortlist on WhatsApp" button that pre-fills the message.
3. **Downloadable itinerary PDF** per journey, generated at build time.
4. **Festival pages** for Diwali, Holi, the Pushkar fair and Hornbill, published four months ahead of each festival.
5. **Specialist voice notes**: a 30-second audio hello from each specialist on their card. It is personal, cheap to produce, and unusual in this market.
6. **Full translations of the top three journeys** in German and French, once enquiries from those markets justify it.
7. **"For travellers from India"**: a separate section for domestic and outbound holidays, as set out in the planner (Phase 4).
