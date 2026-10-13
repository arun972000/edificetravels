# Design critique

Produced with the design plugin's critique framework.

## Round 2: cinematic redesign (12 October 2026)

Reviewed from visitor's-eye frames captured while scrolling (desktop 1440 px, mobile 390 px, light and dark, English, German and French), not from static full-page renders, because the design relies on scroll behaviour.

### Overall impression
The site now reads as a story rather than a template: a cinematic hero with real photography, a manifesto that lights up as it is read, a pinned "day in India" that marks the moment happening in India right now, and editorial typography throughout. The biggest remaining opportunity is owned photography and a short film; the structure is ready for them.

### Usability
| Finding | Severity | Recommendation | Status |
|---|---|---|---|
| Labels over hero photos rendered in deep orange instead of the light accent (selector missed `.chapter.on-dark`) | Critical | Match both selector forms | Fixed |
| Unselected feeling words at 22% ink were too faint to read as buttons (large-text contrast under 3:1) | Moderate | Raise to 52% ink, 78% on hover | Fixed |
| Inactive "day in India" steps at 28% opacity on dark failed text contrast | Moderate | Raise to 50% | Fixed |
| "This page is in English" bar overlapped the fixed header | Moderate | Bar now lives inside the header and reserves its height | Fixed |
| Mobile hero caption bar crowded the WhatsApp button | Moderate | More bottom room, place name only on phones | Fixed |
| Route map cramped regional routes and overlapped close labels | Moderate | Tighter zoom, height follows route shape, collision-aware labels, repeated stops labelled once | Fixed |
| Photos started downloading only when the clip-path curtain opened | Critical (perceived speed) | Curtain is now a sliding cover panel; lazy-loading unaffected | Fixed |
| Manifesto scroll-lighting never ran (minifier folded `animation-timeline` into the shorthand) | Moderate | Timeline in its own, more specific rule | Fixed |

### Visual hierarchy
- First look: the headline over the Taj at dawn, then "Plan your trip". Correct for the goal.
- Reading flow: eight numbered chapters alternating light and dark, image-led and type-led, so each section feels like a page turn rather than another block.
- Emphasis: the orange italic is now reserved for one word per hero and the closing line; chapter numerals and outlined day numbers carry the editorial rhythm instead.

### Consistency
| Element | Note |
|---|---|
| Chapter markers | Same component on home, journey and about pages |
| Buttons | Primary sweeps to deep orange; secondary sweeps to ink; WhatsApp is green on light, glass on photography |
| Image reveals | One curtain behaviour sitewide |
| Language | Every visible string on translated pages comes from the locale dictionary |

### Accessibility
- Contrast: body 8.9:1; hero labels on photography now light peach on dark gradients; feeling words and day steps raised to pass large-text contrast.
- Motion: every effect stops under reduced motion; the hero slideshow has a visible pause control and pauses when the tab is hidden.
- Keyboard: dialog (native), rail (arrow keys), feeling words, region panels (focus opens), voices (buttons).

### What works well
- Live, local details create emotion without gimmicks: India time and the visitor's time in the hero, "Happening now in India" on the matching moment of the day.
- The language flow is honest: a suggestion, never a redirect, and English-only pages say so.
- No prices anywhere, but the promise of an itemised quote within 48 hours is repeated wherever a price would have been.

### Priority recommendations
1. Owned photography and a 20 to 30 second muted hero film (see docs/REQUIREMENTS-FROM-YOU.md).
2. Real specialist portraits and three to five verified guest stories with photos.
3. Native-speaker review of the four translations before launch.

## Round 1: first build (10 October 2026)
Findings from the first build (header contrast, cookie card position, card rows overflowing, headline italic overuse, muted text contrast) were all fixed at the time.
