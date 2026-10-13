# Design direction: The Jharokha (retired)

> **Retired on 12 October 2026.** The owner judged that this direction ruined the images, animation and visuals they had approved. The site went back to the cinematic design in `docs/DESIGN-SYSTEM.md`. This file is kept as a record. Don't reapply it.

Version 3, 12 October 2026. Written with the frontend-design plugin's process (plan, review against the brief, build, critique). Supersedes the visual parts of DESIGN-SYSTEM.md v2.

## The idea

A jharokha is the carved stone window of a Rajput or Mughal palace: the frame from which the household watched the city, the river, the festival below. Edifice means a building. The brand's own logo is a structure. So the whole site is built as architecture: you look at India through a window someone who lives here has opened for you.

Everything visual comes from that one idea: arched windows instead of rectangles, jaali (pierced stone lattice) instead of decorative gradients, steps like a stepwell instead of card grids, plan-drawing line work instead of icons.

## Tokens

### Colour (named, from the materials)

| Name | Hex | Role |
|---|---|---|
| Indigo night | #1B2440 | Text on light; ground of the hero, footer and dark sections (replaces tinted near-black) |
| Jodhpur blue | #2E4A7D | Links on light, secondary ground, map water |
| Makrana marble | #EEEFEC | Main light ground; cool, not cream |
| Sandstone | #D9B98C | Jaali lattice, rules, plan drawings, large quiet surfaces |
| Saffron | #ED7717 | Brand action only: the primary button, the sun on the day path |
| Saffron deep | #C25F0F | Hover and pressed states |

Dark mode swaps the grounds (indigo becomes the page, marble becomes text) and keeps saffron.

### Type

- **Rozha One** (Indian Type Foundry): display only, 28 px and up. High contrast and a calligraphic Devanagari influence; it reads like a 1930s Indian railway or hotel poster. Never italic (it has none), never coloured for emphasis.
- **Mukta** (Ek Type): everything else, weights 400, 500 and 700. Text, labels, buttons and small headings.
- Scale (Bringhurst's classic progression): 14, 16, 18 (body), 21, 24, 30, 36, 48, 60, 72, 96 px. Body 18/30. Measure under 70 characters.
- Labels are sentence case at text size in Mukta 500. No tracked all-caps eyebrows.

### Shape

- The pointed Mughal arch is the only frame for photographs that carry meaning (heroes, doors, journey windows). Arch = an SVG mask so the same shape works at every size.
- Everything else is square-cornered or gently rounded (6 px) by hierarchy, not one radius everywhere.
- No drop shadows on cards. Depth comes from the arch and the lattice.

### Pattern

- One jaali: an eight-point star lattice drawn as an SVG pattern in sandstone at low contrast, used on the hero wall, the footer band and the quote panel. Never behind body text.

## Layout (home)

```
HERO: the window, on an indigo jaali wall
+----------------------------------------------------------------+
| Edifice Travels    Journeys Destinations Guide About   [Plan]  |
|                                                                |
| Some places you see.             .-~~~-.                       |
| India, you feel.                /       \     <- arch window   |
|                                 | photo of |   (India now:     |
| It is 6:42 in the morning in    | the hour |    dawn Taj,      |
| Agra. The gates open at sunrise.|          |    midday Ladakh, |
| [Plan your trip] [WhatsApp us]  |__________|    dusk Thar...)  |
+----------------------------------------------------------------+
On scroll the window grows until it fills the screen: you step through it.
```

```
MANIFESTO: marble ground, text left, a plan drawing of the window right
| Most people come to India to see it ...        [ line drawing ] |
```

```
A DAY IN INDIA: the sun's path, then six moments stepping down like a stepwell
|      05:40      09:15     13:00     17:30    19:10    22:00     |
|   .--------------------( sun )---------------------------.      |
| [arch] 05:40 Agra ...                                           |
|        [arch] 09:15 Jaipur ...                                  |
|               [arch] 13:00 Kerala ...                           |
```

```
JOURNEYS: an index, like a timetable, with the photo in a window beside it
| Forts, Deserts and the Taj      12 days  Delhi to Udaipur   [  ] |
| Spice Coast and Backwaters      10 days  Kochi to Kovalam   [arch]|
| ...                                                         [  ] |
```

```
REGIONS: five doors in a row
|  /\     /\     /\     /\     /\                                  |
| |  |   |  |   |  |   |  |   |  |                                 |
| Rajasthan  North  South  Himalaya  East                          |
```

Alignment: left-aligned text throughout; the arch windows sit right or centred as architecture, never centred text blocks except the closing invitation.

## Principles

1. One memorable moment: stepping through the window in the hero. Everything else is calm.
2. Motion only where it means something: the window opening, the sun moving with the time of day, the route line drawing a journey, and things the visitor does (opening, choosing, expanding). No fade-up on every section, no hover-lift on every card.
3. Structure encodes information: numbers only on real sequences (days of a journey, times of a day). No numbered decoration.
4. Words are plain: sentence case, active verbs, no em dashes, no middle-dot strings, no arrows tacked onto buttons, no single highlighted word.
5. Live details over adjectives: the hour in India, the visitor's own time, the drive time to the next town.

## Review against the brief (what changed and why)

| First instinct | Why it was a default | Revised to |
|---|---|---|
| Warm ivory ground with a serif and an orange accent | The single most common generated look (cream, serif, terracotta) | Cool Makrana marble and indigo night, with saffron reserved for action |
| Near-black dark sections | A default stand-in for black | Indigo, the colour of Jodhpur and of indigo dye |
| Fraunces with one italic orange word per headline | Default pairing plus the commonest headline tell | Rozha One, which has no italic, set plainly |
| All-caps eyebrows and Roman-numeral chapters | Template chrome regardless of subject | No eyebrows; headings stand alone |
| Horizontal card rail for journeys | Generic carousel | An index like a timetable, with the photo in a window |
| Expanding accordion for regions | Common travel-site pattern | Five arched doors |
| Sticky scrollytelling for the day | Seen everywhere | The sun's path across the top, moments stepping down like a stepwell |
| Fade-up on every section | Reads as generated | One orchestrated moment in the hero |
