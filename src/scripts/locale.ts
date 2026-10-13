/**
 * Country and language preferences, client side.
 *
 * - Preferences live in localStorage. Nothing is sent anywhere.
 * - First visit: the country is guessed from the time zone. If that country
 *   reads another language we have, a small suggestion appears. We never
 *   redirect automatically (Google's guidance, and good manners).
 * - Country fills the local-time, flight and visa lines marked [data-local].
 * - Language switches to the same page in that language where it exists;
 *   English-only pages stay put and show a notice.
 */
type Country = { code: string; lang: string; tz: string; hub: string; h: number; m: number; stops: 0 | 1; eVisa: boolean };
type LocaleCopy = {
  name: string; inline: string; notice: string; back: string; home: string;
  suggestTitle: string; suggestAction: string; suggestDismiss: string;
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

const KEY_COUNTRY = 'edifice.country';
const KEY_LANG = 'edifice.lang';
const KEY_DISMISS = 'edifice.suggest-dismissed';

const boot: Boot | null = (() => {
  const el = document.getElementById('locale-boot');
  try { return el?.textContent ? (JSON.parse(el.textContent) as Boot) : null; } catch { return null; }
})();

const store = {
  get(k: string) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k: string, v: string) { try { localStorage.setItem(k, v); } catch { /* private mode */ } },
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

function timeIn(tz: string, locale: string, d = new Date()): string {
  const out = new Intl.DateTimeFormat(locale, { hour: 'numeric', minute: '2-digit', timeZone: tz }).format(d);
  // Match the copy ("9 am to 8 pm"): browsers print "4:30 AM", sometimes with a narrow space.
  return locale.startsWith('en') ? out.replace(/[\s ]*(AM|PM)$/i, (_m, p: string) => ` ${p.toLowerCase()}`) : out;
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
        put(fill(t, { time: timeIn(userTz, loc) }));
        break;
      case 'reply-window':
        put(fill(t, { start: indiaHourToLocal(9, userTz, loc), end: indiaHourToLocal(20, userTz, loc) }));
        break;
      case 'flight':
        if (!c) { el.hidden = true; break; }
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
  document.querySelectorAll<HTMLElement>('[data-locale-label]').forEach(el => {
    el.textContent = b.copy[loc]?.name ?? loc;
  });
  // Planner: pre-select the country if the field is still empty.
  window.dispatchEvent(new CustomEvent('edifice:country', { detail: c ? c.code : '' }));
}

function goTo(b: Boot, lang: string) {
  const target = b.translated ? b.routes[lang] : null;
  if (target && target !== location.pathname.replace(/\/+$/, '') && lang !== b.locale) {
    location.href = target + location.search + location.hash;
    return true;
  }
  return false;
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

function suggest(b: Boot) {
  if (store.get(KEY_LANG) || store.get(KEY_DISMISS)) return;
  const code = guessCountry(b);
  const c = b.countries.find(x => x.code === code);
  if (!c || c.lang === b.locale || c.lang === 'en' || !b.copy[c.lang]) return;
  const box = document.getElementById('locale-suggest');
  if (!box) return;
  const copy = b.copy[c.lang];
  box.lang = c.lang;
  box.querySelector<HTMLElement>('[data-suggest-title]')!.textContent = fill(copy.suggestTitle, { country: regionName(c.code, c.lang) });
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
    store.set(KEY_LANG, c.lang);
    if (!goTo(b, c.lang)) location.href = b.homes[c.lang];
  });
  stay.addEventListener('click', () => {
    store.set(KEY_DISMISS, '1');
    store.set(KEY_COUNTRY, c.code);
    box.classList.remove('is-in');
    setTimeout(() => { box.hidden = true; }, 300);
  });
}

function popover(b: Boot) {
  const pop = document.getElementById('locale-pop');
  if (!pop) return;
  const triggers = Array.from(document.querySelectorAll<HTMLElement>('[data-locale-open]'));
  const langs = Array.from(pop.querySelectorAll<HTMLButtonElement>('[data-lang]'));
  const opts = Array.from(pop.querySelectorAll<HTMLButtonElement>('[data-country]'));
  const search = pop.querySelector<HTMLInputElement>('[data-country-search]');
  const empty = pop.querySelector<HTMLElement>('[data-country-empty]');
  let opener: HTMLElement | null = null;

  const preview = () => {
    const c = currentCountry(b);
    const tz = c?.tz ?? Intl.DateTimeFormat().resolvedOptions().timeZone;
    const flag = pop.querySelector<HTMLElement>('[data-preview-flag]');
    if (flag) { if (c) setFlag(flag, c.code); flag.hidden = !c; }
    pop.querySelectorAll<HTMLElement>('[data-preview]').forEach(el => {
      const t = el.dataset.template ?? '';
      el.textContent = fill(t, { time: timeIn(el.dataset.preview === 'india-time' ? 'Asia/Kolkata' : tz, b.locale) });
    });
  };
  const mark = () => {
    const code = currentCountry(b)?.code ?? '';
    opts.forEach(o => o.setAttribute('aria-selected', String(o.dataset.country === code && (code !== '' || store.get(KEY_COUNTRY) === ''))));
    const lang = store.get(KEY_LANG) || b.locale;
    langs.forEach(l => l.setAttribute('aria-checked', String(l.dataset.lang === lang)));
  };
  const filter = () => {
    const q = (search?.value ?? '').trim().toLowerCase();
    let shown = 0;
    opts.forEach(o => {
      const li = o.parentElement as HTMLElement;
      if (o.hasAttribute('data-other')) { li.hidden = !!q; return; }
      const hit = !q || (o.dataset.name ?? '').includes(q);
      li.hidden = !hit;
      if (hit) shown++;
    });
    if (empty) empty.hidden = shown > 0;
  };
  // Sit under the chip that opened it, never off screen.
  const place = (btn: HTMLElement | null) => {
    if (!btn) return;
    const r = btn.getBoundingClientRect();
    const right = Math.max(12, window.innerWidth - r.right);
    pop.style.setProperty('--pop-right', `${Math.min(right, Math.max(12, window.innerWidth - pop.offsetWidth - 12))}px`);
  };
  const close = (focusBack = true) => {
    if (pop.hidden) return;
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
    // Keep the selected country in view inside the short list.
    pop.querySelector<HTMLElement>('[data-country][aria-selected="true"]')?.scrollIntoView({ block: 'nearest' });
    (pop.querySelector<HTMLElement>('[data-lang][aria-checked="true"]') ?? langs[0])?.focus();
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

  // One tap changes the language.
  langs.forEach(btn => btn.addEventListener('click', () => {
    const lang = btn.dataset.lang ?? b.locale;
    store.set(KEY_LANG, lang);
    store.set(KEY_DISMISS, '1');
    mark();
    if (!goTo(b, lang)) {
      renderLocal(b);
      englishOnlyNotice(b);
      setTimeout(() => close(), 180);
    }
  }));
  // The chosen flag flies from the list up to the pole in the header, and is
  // raised there. The old flag comes down first. Skipped for reduced motion.
  const flyToPole = (btn: HTMLButtonElement, land: () => void) => {
    const from = btn.querySelector<HTMLElement>('.flagwave');
    const chip = document.querySelector<HTMLElement>('#site-header [data-locale-open]');
    const pole = chip?.querySelector<HTMLElement>('[data-locale-pole]');
    const hoist = chip?.querySelector<HTMLElement>('[data-flag-hoist]');
    const globe = chip?.querySelector<HTMLElement>('[data-locale-globe]');
    if (!from || !pole || !hoist || !chip?.offsetWidth || matchMedia('(prefers-reduced-motion: reduce)').matches) { land(); return; }
    const wasEmpty = pole.hidden;
    pole.hidden = false;
    if (globe) globe.hidden = true;
    const a = from.getBoundingClientRect();
    const z = hoist.getBoundingClientRect();
    hoist.classList.remove('is-hoisting');
    if (wasEmpty) hoist.style.opacity = '0';
    else hoist.classList.add('is-lowering');

    const ghost = from.cloneNode(true) as HTMLElement;
    ghost.classList.add('fly', 'flag-ghost');
    ghost.style.left = `${a.left}px`;
    ghost.style.top = `${a.top}px`;
    document.body.append(ghost);
    // Land at the foot of the climb, then the real flag is raised to the top.
    const dx = z.left - a.left;
    const dy = z.top + 13 - a.top;
    const s = z.width / a.width;
    const flight = ghost.animate([
      { transform: 'translate(0, 0) scale(1) rotate(0deg)' },
      { transform: `translate(${dx * 0.3}px, ${dy * 0.8 - 28}px) scale(${1.5 * s}) rotate(-8deg)`, offset: 0.55 },
      { transform: `translate(${dx}px, ${dy}px) scale(${s}) rotate(0deg)` },
    ], { duration: 760, easing: 'cubic-bezier(0.45, 0, 0.2, 1)' });
    const done = () => {
      ghost.remove();
      hoist.classList.remove('is-lowering');
      hoist.style.opacity = '';
      land();
      void hoist.offsetWidth;
      hoist.classList.add('is-hoisting');
    };
    flight.finished.then(done, done);
  };
  // One tap sets the country.
  opts.forEach(btn => btn.addEventListener('click', () => {
    const code = btn.dataset.country ?? '';
    const same = (currentCountry(b)?.code ?? '') === code && store.get(KEY_COUNTRY) !== null;
    store.set(KEY_COUNTRY, code);
    store.set(KEY_DISMISS, '1');
    mark();
    preview();
    const land = () => renderLocal(b);
    if (code && !same) {
      flyToPole(btn, land);
      setTimeout(() => close(), 120);
    } else {
      land();
      setTimeout(() => close(), 260);
    }
  }));
  search?.addEventListener('input', filter);
  search?.addEventListener('keydown', e => {
    if (e.key === 'Enter') { e.preventDefault(); opts.find(o => !(o.parentElement as HTMLElement).hidden)?.click(); }
  });
}

if (boot) {
  // Visiting a localised URL directly counts as choosing that language.
  if (boot.locale !== 'en') store.set(KEY_LANG, boot.locale);
  renderLocal(boot);
  englishOnlyNotice(boot);
  suggest(boot);
  popover(boot);
  // Keep the clocks honest while the page stays open.
  setInterval(() => renderLocal(boot), 60_000);
}
