/**
 * Country and language preferences, client side.
 *
 * - Preferences live in localStorage. Nothing is sent anywhere.
 * - One choice: the visitor picks the country they travel from. That sets the
 *   country (local time, flight, visa note) and its language, and the page
 *   reloads in that language with a short note confirming what changed. A
 *   country that reads more than one of our languages (India: English and
 *   Hindi) shows a button for each, and the button pressed is the choice.
 * - First visit: the country is guessed from the time zone. If that country
 *   reads another language we have, a small suggestion appears. We never
 *   redirect on our own (Google's guidance, and good manners).
 * - English-only pages stay put and show a notice in the chosen language.
 * - Prerendered pages (hover prerendering) wait until they are shown before
 *   reading or writing anything, so hovering a link never changes a setting.
 */
type Country = { code: string; langs: string[]; tz: string; hub?: string; h?: number; m?: number; stops?: 0 | 1; eVisa: boolean };
type LocaleCopy = {
  name: string; inline: string; notice: string; back: string; home: string;
  suggestTitle: string; suggestAction: string; suggestDismiss: string;
  applied: string; appliedLanguage: string;
};
type Boot = {
  locale: string;
  base: string;
  translated: boolean;
  routes: Record<string, string>; // locale → localised path of this page (translated pages only)
  homes: Record<string, string>; // locale → home path
  copy: Record<string, LocaleCopy>;
  countries: Country[];
  tzMap: Record<string, string>;
  oneStop: string;
};
/** What the last choice changed, carried across the reload for the confirmation note. */
type Applied = { country?: string; lang: string };

const KEY_COUNTRY = 'edifice.country';
const KEY_LANG = 'edifice.lang';
const KEY_DISMISS = 'edifice.suggest-dismissed';
const KEY_APPLIED = 'edifice.applied';

const boot: Boot | null = (() => {
  const el = document.getElementById('locale-boot');
  try { return el?.textContent ? (JSON.parse(el.textContent) as Boot) : null; } catch { return null; }
})();

const store = {
  get(k: string) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k: string, v: string) { try { localStorage.setItem(k, v); } catch { /* private mode */ } },
};
const session = {
  take(k: string) { try { const v = sessionStorage.getItem(k); sessionStorage.removeItem(k); return v; } catch { return null; } },
  set(k: string, v: string) { try { sessionStorage.setItem(k, v); } catch { /* private mode */ } },
};

function guessCountry(b: Boot): string | null {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (b.tzMap[tz]) return b.tzMap[tz];
  } catch { /* ignore */ }
  const lang = (navigator.language || '').toUpperCase();
  const region = lang.split('-')[1];
  return region && b.countries.some(c => c.code === region) ? region : null;
}

function currentCountry(b: Boot): Country | null {
  const stored = store.get(KEY_COUNTRY);
  const code = stored !== null ? stored : guessCountry(b);
  return b.countries.find(c => c.code === code) ?? null;
}

const fill = (t: string, v: Record<string, string>) => t.replace(/\{(\w+)\}/g, (m, k) => v[k] ?? m);

/** A visitor whose clock is already India's: no "your time" line, no conversion. */
const inIndia = (tz: string) => tz === 'Asia/Kolkata' || tz === 'Asia/Calcutta';

function timeIn(tz: string, locale: string, d = new Date()): string {
  // Hindi names the part of the day, as people say it: "दोपहर 3:58".
  const opts: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: '2-digit', timeZone: tz };
  if (locale.startsWith('hi')) opts.dayPeriod = 'short';
  const out = new Intl.DateTimeFormat(locale, opts).format(d);
  // Match the copy ("9 am to 8 pm"): browsers print "4:30 AM", sometimes with a narrow space.
  return locale.startsWith('en') ? out.replace(/[\s ]*(AM|PM)$/i, (_m, p: string) => ` ${p.toLowerCase()}`) : out;
}

/** The visitor's local clock time for a given India-time hour today. */
function indiaHourToLocal(hour: number, tz: string, locale: string): string {
  const now = new Date();
  const ymd = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit' }).format(now);
  // India is UTC+5:30 all year.
  const utc = new Date(`${ymd}T${String(hour).padStart(2, '0')}:00:00+05:30`);
  return timeIn(tz, locale, utc);
}

function regionName(code: string, locale: string): string {
  try { return new Intl.DisplayNames([locale], { type: 'region' }).of(code) ?? code; } catch { return code; }
}

/** Point a waving flag (components/FlagWave.astro) at a country. */
function setFlag(el: HTMLElement, code: string) {
  el.style.setProperty('--flag', `url(/flags/${code.toLowerCase()}.svg)`);
}

function renderLocal(b: Boot) {
  const c = currentCountry(b);
  const loc = b.locale;
  const userTz = c?.tz ?? Intl.DateTimeFormat().resolvedOptions().timeZone;
  document.querySelectorAll<HTMLElement>('[data-local]').forEach(el => {
    const t = el.dataset.template ?? '';
    // Write into the text slot so icons and links in the element survive.
    const slot = el.querySelector<HTMLElement>('[data-local-text]') ?? el;
    const put = (text: string) => { slot.textContent = text; el.hidden = false; };
    switch (el.dataset.local) {
      case 'india-time':
        put(fill(t, { time: timeIn('Asia/Kolkata', loc) }));
        break;
      case 'your-time':
        if (inIndia(userTz)) { el.hidden = true; break; }
        put(fill(t, { time: timeIn(userTz, loc) }));
        break;
      case 'reply-window':
        // In India the plain promise already says it all; keep the server text.
        if (inIndia(userTz)) break;
        put(fill(t, { start: indiaHourToLocal(9, userTz, loc), end: indiaHourToLocal(20, userTz, loc) }));
        break;
      case 'flight':
        if (!c || !c.hub) { el.hidden = true; break; }
        put(fill(t, { hub: c.hub, duration: `${c.h} h${c.m ? ` ${c.m} min` : ''}${c.stops ? `, ${b.oneStop}` : ''}` }));
        break;
      case 'visa':
        if (!c || !c.eVisa) { el.hidden = true; break; }
        put(fill(t, { country: regionName(c.code, loc) }));
        break;
    }
  });
  // Header chip: the visitor's flag flying on its pole (a globe when there is
  // no country), and the language code.
  document.querySelectorAll<HTMLElement>('[data-locale-flag]').forEach(el => { if (c) setFlag(el, c.code); });
  document.querySelectorAll<HTMLElement>('[data-locale-pole]').forEach(el => { el.hidden = !c; });
  document.querySelectorAll<HTMLElement>('[data-locale-globe]').forEach(el => { el.hidden = !!c; });
  document.querySelectorAll<HTMLElement>('[data-locale-code]').forEach(el => { el.textContent = loc; });
  // Planner: pre-select the country if the field is still empty.
  window.dispatchEvent(new CustomEvent('edifice:country', { detail: c ? c.code : '' }));
}

/**
 * Show the page in a language: go to this page's version in that language
 * where one exists, otherwise reload so every part of the page (notices,
 * times, the planner) picks up the new setting.
 */
function apply(b: Boot, lang: string, applied: Applied) {
  session.set(KEY_APPLIED, JSON.stringify(applied));
  const target = b.translated ? b.routes[lang] : null;
  const here = location.pathname.replace(/\.html$/, '').replace(/\/+$/, '') || '/';
  if (target && target !== here) location.href = target + location.search + location.hash;
  else location.reload();
}

function englishOnlyNotice(b: Boot) {
  const lang = store.get(KEY_LANG);
  const bar = document.getElementById('locale-notice');
  if (!bar || b.translated || !lang || lang === 'en' || !b.copy[lang]) return;
  const copy = b.copy[lang];
  bar.querySelector<HTMLElement>('[data-notice-text]')!.textContent = copy.notice;
  const a = bar.querySelector<HTMLAnchorElement>('[data-notice-link]')!;
  a.textContent = copy.back;
  a.href = b.homes[lang];
  a.lang = lang;
  bar.hidden = false;
  // Reserve the bar's height so fixed-header spacing stays right.
  document.documentElement.style.setProperty('--notice-h', `${bar.offsetHeight}px`);
}

/** After a reload caused by a choice: confirm it, and raise the new flag on the header pole. */
function confirmApplied(b: Boot) {
  const raw = session.take(KEY_APPLIED);
  if (!raw) return;
  let applied: Applied;
  try { applied = JSON.parse(raw) as Applied; } catch { return; }
  const toast = document.getElementById('locale-toast');
  if (!toast) return;
  // Speak the language just chosen, even on a page that is only in English.
  const lang = b.copy[applied.lang] ? applied.lang : b.locale;
  const copy = b.copy[lang];
  const language = copy?.inline ?? lang;
  const text = applied.country
    ? fill(copy?.applied ?? toast.dataset.applied ?? '', { country: regionName(applied.country, lang), language })
    : fill(copy?.appliedLanguage ?? toast.dataset.appliedLanguage ?? '', { language });
  toast.lang = lang;
  toast.querySelector<HTMLElement>('[data-toast-text]')!.textContent = text;
  const flag = toast.querySelector<HTMLElement>('[data-toast-flag]');
  if (flag) { if (applied.country) setFlag(flag, applied.country); flag.hidden = !applied.country; }
  toast.hidden = false;
  requestAnimationFrame(() => toast.classList.add('is-in'));
  const hide = () => { toast.classList.remove('is-in'); setTimeout(() => { toast.hidden = true; }, 400); };
  toast.querySelector('[data-toast-close]')?.addEventListener('click', hide);
  setTimeout(hide, 4500);
  const hoist = document.querySelector<HTMLElement>('#site-header [data-flag-hoist]');
  if (hoist && applied.country && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    hoist.classList.remove('is-hoisting');
    void hoist.offsetWidth;
    hoist.classList.add('is-hoisting');
  }
}

function suggest(b: Boot) {
  if (store.get(KEY_LANG) || store.get(KEY_DISMISS)) return;
  const code = guessCountry(b);
  const c = b.countries.find(x => x.code === code);
  // Only when none of the country's languages is the one on screen, so a
  // visitor in India reading English is never nudged.
  const lang = c?.langs[0];
  if (!c || !lang || c.langs.includes(b.locale) || lang === 'en' || !b.copy[lang]) return;
  const box = document.getElementById('locale-suggest');
  if (!box) return;
  const copy = b.copy[lang];
  box.lang = lang;
  box.querySelector<HTMLElement>('[data-suggest-title]')!.textContent = fill(copy.suggestTitle, { country: regionName(c.code, lang) });
  const go = box.querySelector<HTMLButtonElement>('[data-suggest-go]')!;
  go.textContent = fill(copy.suggestAction, { language: copy.inline });
  const stay = box.querySelector<HTMLButtonElement>('[data-suggest-stay]')!;
  const stayLabel = b.copy[b.locale]?.suggestDismiss ?? 'Stay in English';
  stay.setAttribute('aria-label', stayLabel);
  stay.title = stayLabel;
  const flag = box.querySelector<HTMLElement>('[data-suggest-flag]');
  if (flag) setFlag(flag, c.code);
  box.hidden = false;
  requestAnimationFrame(() => box.classList.add('is-in'));
  go.addEventListener('click', () => {
    store.set(KEY_COUNTRY, c.code);
    store.set(KEY_LANG, lang);
    store.set(KEY_DISMISS, '1');
    session.set(KEY_APPLIED, JSON.stringify({ country: c.code, lang }));
    location.href = (b.translated ? b.routes[lang] : null) ?? b.homes[lang];
  });
  stay.addEventListener('click', () => {
    store.set(KEY_DISMISS, '1');
    store.set(KEY_COUNTRY, c.code);
    renderLocal(b);
    box.classList.remove('is-in');
    setTimeout(() => { box.hidden = true; }, 300);
  });
}

function popover(b: Boot) {
  const pop = document.getElementById('locale-pop');
  if (!pop) return;
  const triggers = Array.from(document.querySelectorAll<HTMLElement>('[data-locale-open]'));
  // One row per country; a row holds one button, or one per language.
  const rows = Array.from(pop.querySelectorAll<HTMLLIElement>('[data-row]'));
  const opts = Array.from(pop.querySelectorAll<HTMLButtonElement>('[data-country]'));
  /** A choice button whose country row is not filtered out by the search. */
  const shown = (o: HTMLElement) => !o.closest<HTMLElement>('[data-row]')?.hidden;
  const list = pop.querySelector<HTMLElement>('[data-country-list]');
  const search = pop.querySelector<HTMLInputElement>('[data-country-search]');
  const empty = pop.querySelector<HTMLElement>('[data-country-empty]');
  const note = pop.querySelector<HTMLElement>('[data-partial-note]');
  const switching = pop.querySelector<HTMLElement>('[data-switching]');
  let opener: HTMLElement | null = null;

  const preview = () => {
    const c = currentCountry(b);
    const tz = c?.tz ?? Intl.DateTimeFormat().resolvedOptions().timeZone;
    const flag = pop.querySelector<HTMLElement>('[data-preview-flag]');
    if (flag) { if (c) setFlag(flag, c.code); flag.hidden = !c; }
    const own = pop.querySelector<HTMLElement>('[data-preview-row="your-time"]');
    if (own) own.hidden = inIndia(tz);
    pop.querySelectorAll<HTMLElement>('[data-preview]').forEach(el => {
      const t = el.dataset.template ?? '';
      el.textContent = fill(t, { time: timeIn(el.dataset.preview === 'india-time' ? 'Asia/Kolkata' : tz, b.locale) });
    });
  };
  const mark = () => {
    const stored = store.get(KEY_COUNTRY);
    const code = currentCountry(b)?.code ?? '';
    const lang = store.get(KEY_LANG) ?? b.locale;
    // The current choice: the country, and in a country with several languages, the one in use.
    opts.forEach(o => {
      const multi = !!o.closest('[data-multi]');
      const on = stored !== null && o.dataset.country === (stored === '' ? '' : code) && (!multi || o.dataset.lang === lang);
      if (on) o.setAttribute('aria-current', 'true'); else o.removeAttribute('aria-current');
    });
    // Before any choice, the guessed country is offered first, marked as a suggestion.
    const guess = stored === null ? guessCountry(b) : null;
    rows.forEach(r => {
      const badge = r.querySelector<HTMLElement>('[data-suggest-badge]');
      if (badge) badge.hidden = !guess || r.dataset.row !== guess;
    });
    const first = rows.find(r => r.dataset.row && r.dataset.row === (guess ?? (stored ? code : '__none')));
    if (first && list) list.prepend(first);
    if (note) {
      const inline = b.copy[b.locale]?.inline ?? b.locale;
      note.textContent = fill(note.dataset.template ?? '', { language: inline });
      note.hidden = b.locale === 'en';
    }
  };
  const filter = () => {
    const q = (search?.value ?? '').trim().toLowerCase();
    let count = 0;
    rows.forEach(r => {
      if (r.hasAttribute('data-other')) { r.hidden = !!q; return; }
      const hit = !q || (r.dataset.name ?? '').includes(q);
      r.hidden = !hit;
      if (hit) count++;
    });
    if (empty) empty.hidden = count > 0;
  };
  // Sit under the chip that opened it, never off screen.
  const place = (btn: HTMLElement | null) => {
    if (!btn) return;
    const r = btn.getBoundingClientRect();
    const right = Math.max(12, window.innerWidth - r.right);
    pop.style.setProperty('--pop-right', `${Math.min(right, Math.max(12, window.innerWidth - pop.offsetWidth - 12))}px`);
  };
  const close = (focusBack = true) => {
    if (pop.hidden || pop.classList.contains('is-switching')) return;
    pop.classList.remove('is-open');
    pop.classList.add('is-closing');
    triggers.forEach(t => t.setAttribute('aria-expanded', 'false'));
    setTimeout(() => { pop.hidden = true; pop.classList.remove('is-closing'); }, 160);
    if (focusBack) opener?.focus();
  };
  const open = (btn: HTMLElement) => {
    opener = btn;
    if (search) search.value = '';
    filter();
    mark();
    preview();
    pop.hidden = false;
    place(btn);
    pop.classList.remove('is-closing');
    void pop.offsetWidth;
    pop.classList.add('is-open');
    btn.setAttribute('aria-expanded', 'true');
    list?.scrollTo({ top: 0 });
    // Keyboard users land on the search box; the list follows it.
    search?.focus({ preventScroll: true });
  };
  /** Show the choice being applied, then reload into it. */
  const commit = (lang: string, applied: Applied) => {
    pop.classList.add('is-switching');
    if (switching) switching.hidden = false;
    setTimeout(() => apply(b, lang, applied), 220);
  };

  triggers.forEach(btn => {
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-controls', 'locale-pop');
    btn.addEventListener('click', e => {
      e.stopPropagation();
      if (pop.hidden) open(btn); else close();
    });
  });
  pop.querySelectorAll('[data-locale-close]').forEach(x => x.addEventListener('click', () => close()));
  document.addEventListener('click', e => { if (!pop.hidden && !pop.contains(e.target as Node)) close(false); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !pop.hidden) close(); });
  window.addEventListener('resize', () => { if (!pop.hidden) place(opener); });

  // The only choice: a country, with its language (or the language button pressed).
  opts.forEach(btn => btn.addEventListener('click', () => {
    const code = btn.dataset.country ?? '';
    const lang = btn.dataset.lang || 'en';
    store.set(KEY_COUNTRY, code);
    store.set(KEY_LANG, lang);
    store.set(KEY_DISMISS, '1');
    opts.forEach(o => { if (o === btn) o.setAttribute('aria-current', 'true'); else o.removeAttribute('aria-current'); });
    commit(lang, code ? { country: code, lang } : { lang });
  }));
  search?.addEventListener('input', filter);
  search?.addEventListener('keydown', e => {
    // Document order, since the suggested country may have been moved to the top.
    const firstShown = () => Array.from(list?.querySelectorAll<HTMLButtonElement>('[data-country]') ?? []).find(shown);
    if (e.key === 'Enter') { e.preventDefault(); firstShown()?.click(); }
    if (e.key === 'ArrowDown') { e.preventDefault(); firstShown()?.focus(); }
  });
  // Arrow keys move through the visible countries.
  list?.addEventListener('keydown', e => {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    // Document order, since the suggested country may have been moved to the top.
    const visible = Array.from(list.querySelectorAll<HTMLButtonElement>('[data-country]')).filter(shown);
    const i = visible.indexOf(document.activeElement as HTMLButtonElement);
    if (i < 0) return;
    e.preventDefault();
    const next = visible[e.key === 'ArrowDown' ? Math.min(i + 1, visible.length - 1) : i - 1];
    if (next) next.focus(); else search?.focus();
  });
}

function start(b: Boot) {
  // Visiting a localised URL directly counts as choosing that language.
  if (b.locale !== 'en') store.set(KEY_LANG, b.locale);
  renderLocal(b);
  englishOnlyNotice(b);
  confirmApplied(b);
  suggest(b);
  popover(b);
  // Keep the clocks honest while the page stays open.
  setInterval(() => renderLocal(b), 60_000);
}

if (boot) {
  const doc = document as Document & { prerendering?: boolean };
  if (doc.prerendering) document.addEventListener('prerenderingchange', () => start(boot), { once: true });
  else start(boot);
}
