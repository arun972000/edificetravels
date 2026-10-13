## Code Review: Jharokha redesign, language flow and planner

Produced with the engineering plugin's code-review skill on 12 October 2026. Scope: `src/components/home/*`, `src/scripts/locale.ts`, `src/i18n/index.ts`, `src/i18n/config.ts`, `src/islands/Wizard.tsx`, `src/islands/RouteMap.tsx`, `src/layouts/BaseLayout.astro`, `src/styles/global.css`. Static Astro site; no server, no database, no authentication.

### Summary
Small, focused client scripts with no third-party runtime dependencies beyond React for two islands. Four defects were found and fixed in this pass; the remaining items are suggestions for launch.

### Critical Issues
| # | File | Issue | Severity | Status |
|---|---|---|---|---|
| 1 | Wizard.tsx | Clearing the adults or children field produced `NaN` in the enquiry summary sent to the team | High | Fixed: values fall back to 1 and 0 and are clamped |
| 2 | BaseLayout.astro, HeroWindow.astro, FeelingFinder.astro | Inline JSON (JSON-LD, boot data) was not escaped, so content containing a closing script tag could break out of the element | Medium (content is trusted today, but editors may add a CMS later) | Fixed: `src/lib/json.ts` escapes `<`, `>`, `&`, U+2028 and U+2029 |
| 3 | JourneyIndex.astro | The preview caption was read through a styling class selector, so a class rename would silently break it | Low | Fixed: reads `[data-index-meta]` |
| 4 | DayPath.astro | The sun's path was pinned below the header, leaving a gap when the header slides away on scroll | Low | Fixed: pinned to the top edge |

### Suggestions
| # | File | Suggestion | Category |
|---|---|---|---|
| 1 | Wizard.tsx | Add Cloudflare Turnstile to the planner before launch. The Web3Forms key is public by design, so a honeypot alone will not stop determined spam | Security |
| 2 | HeroWindow.astro | Scroll work is one rAF-throttled handler writing one CSS variable; keep it that way and avoid adding listeners per section | Performance |
| 3 | locale.ts | The country guess uses the time zone only; a visitor travelling abroad sees the wrong local time until they choose. Acceptable, because the picker is one click away | Correctness |
| 4 | RouteMap.tsx | Label width is estimated from character count; very long place names could still touch. Measure with `getComputedTextLength` if new journeys add long names | Correctness |
| 5 | global.css | The arch mask uses container query units. Browsers without them simply show rectangular photographs, which is an acceptable fallback | Compatibility |
| 6 | i18n/index.ts | Missing translation keys fall back to English through a deep merge; keep the key-parity test in CI so this stays a safety net rather than a habit | Maintainability |

### What Looks Good
- No secrets in the repository; the form key is read from `PUBLIC_FORM_ACCESS_KEY` at build time.
- Every client script guards `localStorage` access, so private browsing never throws.
- Images for the hero, the journey index and the planner load on demand; only one hero image is fetched with the page.
- Motion is driven by transforms and opacity only and stops under reduced motion.
- The language flow never redirects automatically, which matches Google's guidance for international sites.

### Verdict
Approve, with suggestion 1 (Turnstile) required before the planner goes live.
