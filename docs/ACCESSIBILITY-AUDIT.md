# Accessibility audit

## Postcards redesign, 12 October 2026

The site moved to white pages with a phone dock, swipe rows and a new country sheet. axe-core 4.10 reports no violations on the same 13 pages and screen sizes. Fixes made during the pass:
- **Logo word:** "Edifice" in the logo moved to the deeper brand orange. Bright saffron was 2.9:1 on white, and is now 5.9:1.
- **Swipe rows:** rows without links inside (promises, reviews, journey facts) are now focusable and labelled for keyboard users.
- **Footer watermark:** the faint "Edifice" moved into a decorative CSS layer.
- **Dark panels:** these use a fixed night colour, so white text stays readable in dark mode.

There is no sideways scrolling at 360, 390 or 768 px. Phone inputs use 16px text so iPhones do not zoom in, and every tap target in the dock, chips and planner is 44px or larger.

## Cinematic design restored, 12 October 2026

The site returned to the cinematic design. axe-core 4.10 was run again on the same ten desktop pages and three phone pages and reports no violations. The fixes below still apply, except the rows about Rozha One, which is no longer used. Contrast on the restored palette: link and label orange #9c4b0a is 5.6:1 on the cream page and 5.0:1 on muted panels, and the hover fill behind white button text is 5.7:1.

## Jharokha redesign, 12 October 2026

**Standard:** WCAG 2.2 AA. **Method:** axe-core 4.10 in Chrome on ten pages at desktop width and three at phone width, contrast calculated for every text and background pair the pages use, and screenshots read frame by frame.

**Result:** axe reports no violations on any audited page after the fixes below. Manual keyboard and screen-reader passes are still needed before launch.

| Issue | Criterion | Fix |
|---|---|---|
| The darker brand orange used for links measured 3.7:1 on marble and 3.3:1 on the muted panels | 1.4.3 Contrast | Text orange is now #9c4b0a: 5.3:1 on marble, 4.7:1 on muted panels. The brand orange #c25f0f is unchanged elsewhere. |
| Primary button hover put light text on pale orange in dark mode | 1.4.3 Contrast | Hover background pinned to #9c4b0a in both themes |
| Footer text at 50% white was at the 4.5:1 limit, some of it at 13px | 1.4.3 Contrast | Raised to 70% |
| The sideways-scrolling review row on journey pages could not be reached by keyboard | 2.1.1 Keyboard | The row is focusable, with a region role and a label |
| On phones the hero headline started under the fixed header | 1.4.10 Reflow | The hero is top-aligned on small screens |
| Rozha One was set below its 28px floor in menus, dialogs, planner questions, review quotes and the sticky bar | 1.4.8 readability | Display uses raised to 28px. Long text moved to Mukta. |
| Most photographs had empty alt text, and some heroes described the wrong place | 1.1.1 Non-text content | Each photo has a written description in `src/data/photo-alt.ts`. Card thumbnails inside links stay decorative because the link names them. |

Contrast that passes with room to spare: body text 8.6:1, muted text 5.1:1, sand on indigo 8.2:1, indigo text on the saffron button 5.3:1, dark theme muted text 7.2:1.

Still to do by hand: tab through the planner in each language, test the country dialog with VoiceOver and NVDA, and check the hero window with reduced motion turned on in the operating system.

---

## First build, 10 October 2026
**Standard:** WCAG 2.2 AA | **Date:** 10 October 2026 | Method: code review of every component and island plus contrast calculation; manual keyboard and screen-reader passes are still required before launch.

## Summary
Issues found: 5 | Critical: 1 | Major: 1 | Minor: 3. All five fixed in this build.

## Findings

### Perceivable
| # | Issue | Criterion | Severity | Fix |
|---|---|---|---|---|
| 1 | Muted meta text (#7d746c on #faf7f2) measured 4.3:1 | 1.4.3 Contrast | Major | Darkened to #6f665e, 5.0:1 |
| 2 | Floating header's white text could sit over a bright sky | 1.4.3 Contrast | Critical | Top-of-hero scrim added under the header |

### Operable
| # | Issue | Criterion | Severity | Fix |
|---|---|---|---|---|
| 3 | Route-map stops removed the browser focus outline without a replacement | 2.4.7 Focus visible | Major | A brand-deep ring now draws on focus and hover |

### Robust
| # | Issue | Criterion | Severity | Fix |
|---|---|---|---|---|
| 4 | Route-map SVG used `role="img"`, which makes its focusable stops presentational to assistive tech | 4.1.2 Name, role, value | Critical | Changed to `role="group"` with a label; each stop is `role="button"` with a full name |
| 5 | Footer theme toggle had no pressed state | 4.1.2 | Minor | `aria-pressed` reflects dark mode |

## Colour contrast
| Element | Foreground | Background | Ratio | Required | Pass |
|---|---|---|---|---|---|
| Body text | #4a4440 | #faf7f2 | 8.9:1 | 4.5:1 | Yes |
| Headings | #1c1917 | #faf7f2 | 15.6:1 | 3:1 | Yes |
| Muted meta | #6f665e | #faf7f2 | 5.0:1 | 4.5:1 | Yes |
| Eyebrow | #c25f0f | #faf7f2 | 4.6:1 | 4.5:1 | Yes |
| Primary button | #1c1917 | #ed7717 | 5.9:1 | 4.5:1 | Yes |
| WhatsApp button | #0b3d1f | #25d366 | 6.2:1 | 4.5:1 | Yes |
| Dark mode body | #cfc7bc | #121110 | 11.3:1 | 4.5:1 | Yes |
| Dark mode muted | #9a918a | #121110 | 6.1:1 | 4.5:1 | Yes |

## Keyboard navigation
| Element | Tab | Enter/Space | Escape | Notes |
|---|---|---|---|---|
| Skip link | First stop | Jumps to main | | Visible on focus |
| Header nav, WhatsApp, Plan, menu toggle | In order | Activates | Closes menu | `aria-expanded` and `aria-controls` on toggle |
| Journey filters, currency switch, mood chips | In order | Toggles | | `aria-pressed` states, live count |
| Route map stops | In order | Jumps to day or page | | Visible ring, full accessible name |
| Day-by-day "Show all days" | In order | Expands | | `aria-expanded`; hidden days are hidden from AT until expanded |
| FAQ | In order | Opens | | Native details/summary |
| Wizard | In order | Continue/submit | | Fieldset and legend per step, live step announcement, `role="alert"` errors, consent checkbox required |
| Consent banner | After footer | Accept or decline | | `role="dialog"`, labelled and described, non-modal |
| Theme toggle | In order | Toggles | | `aria-pressed` |

## Screen reader notes
- Landmarks: banner, navigation (labelled), main, contentinfo. Breadcrumbs labelled.
- Every image has alt text or is marked decorative where the adjacent heading carries the meaning.
- Icon-only links (WhatsApp) state "opens WhatsApp".
- Prices are announced as the INR figure followed by the approximate conversion; the conversion span is plain text, not hidden.

## Still to do before launch
1. Manual pass with NVDA on Windows and VoiceOver on iOS through the planner and one journey page.
2. Zoom to 200% on the journey page facts bar and the price tiers.
3. Verify the Commons photographs' alt text once the final images are in place; hero alt text is written per page.
