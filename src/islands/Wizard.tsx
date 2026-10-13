/**
 * Plan-your-trip wizard. Six short steps, client-side only, posts to a form
 * endpoint (Web3Forms) and hands the visitor straight to WhatsApp with the
 * summary pre-filled. All copy comes from the locale dictionary. Without an
 * access key (local review) the email step is skipped and the flow completes.
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import type { Dict } from '../i18n/en';

type W = Dict['wizard'];

interface Props {
  endpoint: string;
  accessKey: string;
  whatsappNumber: string;
  toEmail: string;
  journeys: { id: string; title: string; en: string; days: number }[];
  countries: { code: string; name: string; en: string }[];
  locale: string;
  t: W;
  /** English copy: the summary sent to the team is always in English. */
  tEn: W;
  daysLabel: string;
  browseHref: string;
  privacyHref: string;
}

type Form = {
  regions: string[];
  month: number; // 0-11, or 12 for "not sure"
  year: string;
  duration: number; // index into durations
  adults: number;
  children: number;
  occasion: number; // index into occasions
  tier: string;
  budget: string;
  interests: number[]; // indices into interests
  journey: string;
  name: string;
  email: string;
  country: string; // ISO code or 'OTHER'
  whatsapp: string;
  contact: 'WhatsApp' | 'Email';
  message: string;
  consent: boolean;
  botcheck: string;
};

const fill = (s: string, v: Record<string, string | number>) => s.replace(/\{(\w+)\}/g, (m, k) => (k in v ? String(v[k]) : m));

export default function Wizard(p: Props) {
  const { t, tEn } = p;
  const thisYear = new Date().getFullYear();
  const monthNames = (loc: string) => Array.from({ length: 12 }, (_, i) => new Intl.DateTimeFormat(loc, { month: 'long', timeZone: 'UTC' }).format(new Date(Date.UTC(2026, i, 15))));
  const months = useMemo(() => monthNames(p.locale), [p.locale]);
  const monthsEn = useMemo(() => monthNames('en-GB'), []);
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [f, setF] = useState<Form>({
    regions: [], month: 12, year: String(thisYear + (new Date().getMonth() > 8 ? 1 : 0)), duration: 1,
    adults: 2, children: 0, occasion: 0, tier: 'Premium', budget: '', interests: [], journey: '',
    name: '', email: '', country: '', whatsapp: '', contact: 'WhatsApp', message: '', consent: false, botcheck: '',
  });
  const live = useRef<HTMLParagraphElement>(null);
  const top = useRef<HTMLFormElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (live.current) live.current.textContent = fill(t.stepOf, { n: step + 1, total: t.steps.length, name: t.steps[step] });
    if (step > 0) top.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [step, t]);

  // Pre-select: ?journey=<id> from a journey page, and the country chosen in the header flow.
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get('journey');
    if (id && p.journeys.some(j => j.id === id)) setF(prev => ({ ...prev, journey: id }));
    const fromStore = (() => { try { return localStorage.getItem('edifice.country'); } catch { return null; } })();
    if (fromStore && p.countries.some(c => c.code === fromStore)) setF(prev => (prev.country ? prev : { ...prev, country: fromStore }));
    const onCountry = (e: Event) => {
      const code = (e as CustomEvent<string>).detail;
      if (code && p.countries.some(c => c.code === code)) setF(prev => (prev.country ? prev : { ...prev, country: code }));
    };
    window.addEventListener('edifice:country', onCountry);
    return () => window.removeEventListener('edifice:country', onCountry);
  }, [p.journeys, p.countries]);

  const set = <K extends keyof Form>(k: K, v: Form[K]) => setF(prev => ({ ...prev, [k]: v }));
  const toggleRegion = (v: string) =>
    setF(prev => ({ ...prev, regions: prev.regions.includes(v) ? prev.regions.filter(x => x !== v) : [...prev.regions, v] }));
  const toggleInterest = (v: number) =>
    setF(prev => ({ ...prev, interests: prev.interests.includes(v) ? prev.interests.filter(x => x !== v) : [...prev.interests, v] }));

  const journeyTitle = p.journeys.find(j => j.id === f.journey)?.title;
  const countryEn = p.countries.find(c => c.code === f.country)?.en ?? (f.country === 'OTHER' ? 'Other' : '');

  // Built from the English dictionary: this is what the team reads.
  const enJourneyTitle = p.journeys.find(j => j.id === f.journey)?.en ?? journeyTitle;
  const en = {
    regions: f.regions.length ? f.regions.map(r => tEn.regions.find(x => x.id === r)?.label ?? r).join(', ') : tEn.summaryOpen,
    month: f.month === 12 ? tEn.notSure : `${monthsEn[f.month]} ${f.year}`,
    duration: tEn.durations[f.duration] ?? '',
    occasion: tEn.occasions[f.occasion] ?? '',
    interests: f.interests.map(i => tEn.interests[i]).filter(Boolean).join(', '),
    tier: f.tier === 'Not sure' ? tEn.notSure : f.tier,
  };
  const summary = useMemo(() => {
    const who = [fill(tEn.summaryAdults, { n: f.adults }), f.children ? fill(tEn.summaryChildren, { n: f.children }) : null].filter(Boolean).join(', ');
    const lines = [
      tEn.summaryIntro,
      enJourneyTitle ? `${tEn.summaryJourney}: ${enJourneyTitle}` : null,
      `${tEn.summaryWhere}: ${en.regions}`,
      `${tEn.summaryWhen}: ${en.month}, ${en.duration}`,
      `${tEn.summaryWho}: ${who} (${en.occasion})`,
      `${tEn.summaryComfort}: ${en.tier}`,
      f.budget ? `${tEn.summaryBudget}: ${f.budget}` : null,
      en.interests ? `${tEn.summaryInterests}: ${en.interests}` : null,
      f.message ? `${tEn.summaryNotes}: ${f.message}` : null,
      `${tEn.summaryName}: ${f.name}${countryEn ? `, ${countryEn}` : ''}`,
      p.locale !== 'en' ? `Site language: ${p.locale}` : null,
    ].filter(Boolean);
    return lines.join('\n');
  }, [f, enJourneyTitle, countryEn, tEn, en.regions, en.month, en.duration, en.occasion, en.interests, en.tier, p.locale]);

  const waHref = `https://wa.me/${p.whatsappNumber}?text=${encodeURIComponent(summary)}`;

  const validateContact = () => {
    if (!f.name.trim()) return t.errName;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) return t.errEmail;
    if (!f.country) return t.errCountry;
    if (!f.consent) return t.errConsent;
    return null;
  };

  const next = () => {
    setError(null);
    if (step === 0 && f.regions.length === 0) { setError(t.whereError); return; }
    setStep(s => Math.min(s + 1, t.steps.length - 1));
  };
  const back = () => { setError(null); setStep(s => Math.max(0, s - 1)); };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const problem = validateContact();
    if (problem) { setError(problem); return; }
    if (f.botcheck) return; // honeypot
    setStatus('sending');
    setError(null);
    const finish = () => {
      setStatus('done');
      (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag?.('event', 'enquiry_submit', { tier: f.tier, duration: en.duration, locale: p.locale });
      setTimeout(() => doneRef.current?.focus(), 50);
    };
    if (!p.accessKey) { finish(); return; }
    try {
      const res = await fetch(p.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: p.accessKey,
          subject: `Trip enquiry from ${f.name} (${countryEn || f.country})`,
          from_name: 'Edifice Travels website',
          to: p.toEmail,
          replyto: f.email,
          name: f.name,
          email: f.email,
          country: countryEn,
          site_language: p.locale,
          whatsapp: f.whatsapp,
          preferred_contact: f.contact,
          regions: en.regions,
          when: en.month,
          duration: en.duration,
          adults: f.adults,
          children: f.children,
          occasion: en.occasion,
          style: en.tier,
          budget: f.budget,
          interests: en.interests,
          journey: enJourneyTitle ?? '',
          message: f.message,
          page: typeof location !== 'undefined' ? location.href : '',
          summary,
          botcheck: f.botcheck,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && (json.success ?? true)) finish();
      else throw new Error(json.message || t.errSend);
    } catch (err) {
      setStatus('error');
      setError((err as Error).message || t.errSend);
    }
  };

  const input = 'mt-2 h-13 w-full rounded-[14px] border border-line bg-bg-elevated px-4 text-[1rem] text-ink outline-none transition-colors focus:border-ink';
  const chip = (on: boolean) => `h-11 rounded-pill border px-4 text-[0.95rem] font-semibold transition-all active:scale-95 ${on ? 'border-ink bg-ink text-bg' : 'border-line text-ink hover:border-ink/40'}`;
  const card = (on: boolean) => `flex cursor-pointer items-start gap-3 rounded-[18px] border p-4 transition-all active:scale-[0.98] ${on ? 'border-brand bg-brand-soft shadow-[0_0_0_1px_var(--c-brand)]' : 'border-line hover:border-ink/40'}`;

  if (status === 'done') {
    return (
      <div ref={doneRef} tabIndex={-1} className="rounded-[28px] bg-bg-muted p-6 outline-none sm:p-10" role="status">
        <p className="eyebrow">{fill(t.doneEyebrow, { name: f.name.split(' ')[0] })}</p>
        <h2 className="mt-2 font-display text-h2 text-ink">{t.doneTitle}</h2>
        <p className="mt-3 text-body text-ink-soft">{t.doneText}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={waHref} target="_blank" rel="noopener" data-track="whatsapp_click" data-label="wizard-done" className="inline-flex h-12 items-center gap-2 rounded-pill bg-whatsapp px-6 font-bold active:scale-95 font-semibold text-[#0b3d1f] hover:brightness-95">
            {t.doneWhatsapp}
          </a>
          <a href={p.browseHref} className="inline-flex h-12 items-center rounded-pill border border-line bg-bg-elevated px-6 font-bold text-ink active:scale-95">{t.doneBrowse}</a>
        </div>
        <pre className="mt-6 whitespace-pre-wrap rounded-[16px] bg-bg-elevated p-4 font-sans text-[0.85rem] text-ink-soft">{summary}</pre>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="rounded-[28px] border border-line bg-bg-elevated p-5 md:p-9" ref={top}>
      <p ref={live} className="sr-only" aria-live="polite" />
      <div className="mb-7">
        <p className="text-[0.9rem] font-bold text-ink">{fill(t.stepOf, { n: step + 1, total: t.steps.length, name: t.steps[step] })}</p>
        <div className="mt-3 grid gap-1.5" style={{ gridTemplateColumns: `repeat(${t.steps.length}, minmax(0, 1fr))` }} role="progressbar" aria-label={t.progress} aria-valuemin={1} aria-valuemax={t.steps.length} aria-valuenow={step + 1}>
          {t.steps.map((s, i) => <span key={s} className={`h-1.5 rounded-full transition-colors duration-500 ${i <= step ? 'bg-brand' : 'bg-bg-muted'}`} />)}
        </div>
      </div>
      <ol className="sr-only" aria-label={t.progress}>
        {t.steps.map((s, i) => (
          <li key={s} className={`flex items-center gap-2 text-[0.78rem] font-medium ${i === step ? 'text-ink' : i < step ? 'text-brand-deep' : 'text-ink-muted'}`}>
            <span className={`flex h-7 w-7 items-center justify-center rounded-pill border text-[0.72rem] transition-colors ${i === step ? 'border-ink bg-ink text-bg' : i < step ? 'border-brand bg-brand-soft' : 'border-line'}`} aria-hidden="true">{i + 1}</span>
            <span className="hidden sm:inline">{s}</span>
          </li>
        ))}
      </ol>

      <div key={step} className="wizard-step">
        {step === 0 && (
          <fieldset>
            <legend className="font-display text-[clamp(1.6rem,1.35rem+1vw,2.1rem)] leading-tight tracking-[-0.02em] text-ink">{t.whereTitle}</legend>
            <p className="mt-1 text-small text-ink-muted">{t.whereHint}</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {t.regions.map(r => {
                const on = f.regions.includes(r.id);
                return (
                  <label key={r.id} className={card(on)}>
                    <input type="checkbox" className="mt-1 h-4 w-4 accent-[#c25f0f]" checked={on} onChange={() => toggleRegion(r.id)} />
                    <span><span className="block font-semibold text-ink">{r.label}</span><span className="text-small text-ink-muted">{r.sub}</span></span>
                  </label>
                );
              })}
            </div>
            {p.journeys.length > 0 && (
              <label className="mt-6 block text-small">
                <span className="font-medium text-ink">{t.journeyQuestion}</span>
                <select value={f.journey} onChange={e => set('journey', e.target.value)} className={input}>
                  <option value="">{t.journeyNone}</option>
                  {p.journeys.map(j => <option key={j.id} value={j.id}>{j.title} ({fill(p.daysLabel, { n: j.days })})</option>)}
                </select>
              </label>
            )}
          </fieldset>
        )}

        {step === 1 && (
          <fieldset>
            <legend className="font-display text-[clamp(1.6rem,1.35rem+1vw,2.1rem)] leading-tight tracking-[-0.02em] text-ink">{t.whenTitle}</legend>
            <p className="mt-1 text-small text-ink-muted">{t.whenHint}</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="text-small"><span className="font-medium text-ink">{t.month}</span>
                <select value={f.month} onChange={e => set('month', Number(e.target.value))} className={input}>
                  {[...months, t.notSure].map((m, i) => <option key={m} value={i}>{m}</option>)}
                </select>
              </label>
              <label className="text-small"><span className="font-medium text-ink">{t.year}</span>
                <select value={f.year} onChange={e => set('year', e.target.value)} className={input}>
                  {[thisYear, thisYear + 1, thisYear + 2].map(y => <option key={y}>{y}</option>)}
                </select>
              </label>
            </div>
            <p className="mt-5 text-small font-medium text-ink">{t.duration}</p>
            <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label={t.duration}>
              {t.durations.map((d, i) => (
                <button key={d} type="button" aria-pressed={f.duration === i} onClick={() => set('duration', i)} className={chip(f.duration === i)}>{d}</button>
              ))}
            </div>
          </fieldset>
        )}

        {step === 2 && (
          <fieldset>
            <legend className="font-display text-[clamp(1.6rem,1.35rem+1vw,2.1rem)] leading-tight tracking-[-0.02em] text-ink">{t.whoTitle}</legend>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              <label className="text-small"><span className="font-medium text-ink">{t.adults}</span>
                <input type="number" min={1} max={12} value={f.adults} onChange={e => set('adults', Math.min(12, Math.max(1, Number(e.target.value) || 1)))} className={input} />
              </label>
              <label className="text-small"><span className="font-medium text-ink">{t.children}</span>
                <input type="number" min={0} max={8} value={f.children} onChange={e => set('children', Math.min(8, Math.max(0, Number(e.target.value) || 0)))} className={input} />
              </label>
              <label className="text-small"><span className="font-medium text-ink">{t.occasion}</span>
                <select value={f.occasion} onChange={e => set('occasion', Number(e.target.value))} className={input}>
                  {t.occasions.map((o, i) => <option key={o} value={i}>{o}</option>)}
                </select>
              </label>
            </div>
          </fieldset>
        )}

        {step === 3 && (
          <fieldset>
            <legend className="font-display text-[clamp(1.6rem,1.35rem+1vw,2.1rem)] leading-tight tracking-[-0.02em] text-ink">{t.comfortTitle}</legend>
            <p className="mt-1 text-small text-ink-muted">{t.comfortHint}</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {t.tiers.map(tier => {
                const on = f.tier === tier.id;
                return (
                  <label key={tier.id} className={card(on)}>
                    <input type="radio" name="tier" className="mt-1 h-4 w-4 accent-[#c25f0f]" checked={on} onChange={() => set('tier', tier.id)} />
                    <span><span className="block font-semibold text-ink">{tier.id === 'Not sure' ? t.notSure : tier.id}</span><span className="text-small text-ink-muted">{tier.sub}</span></span>
                  </label>
                );
              })}
            </div>
            <label className="mt-6 block text-small"><span className="font-medium text-ink">{t.budget}</span>
              <input type="text" value={f.budget} onChange={e => set('budget', e.target.value)} placeholder={t.budgetPlaceholder} className={input} />
            </label>
          </fieldset>
        )}

        {step === 4 && (
          <fieldset>
            <legend className="font-display text-[clamp(1.6rem,1.35rem+1vw,2.1rem)] leading-tight tracking-[-0.02em] text-ink">{t.interestsTitle}</legend>
            <p className="mt-1 text-small text-ink-muted">{t.interestsHint}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {t.interests.map((label, i) => {
                const on = f.interests.includes(i);
                return <button key={label} type="button" aria-pressed={on} onClick={() => toggleInterest(i)} className={chip(on)}>{label}</button>;
              })}
            </div>
            <label className="mt-6 block text-small"><span className="font-medium text-ink">{t.notes}</span>
              <textarea value={f.message} onChange={e => set('message', e.target.value)} rows={3} className="mt-2 w-full rounded-sm border border-line bg-bg px-3 py-2 text-ink focus:border-brand-deep" placeholder={t.notesPlaceholder} />
            </label>
          </fieldset>
        )}

        {step === 5 && (
          <fieldset>
            <legend className="font-display text-[clamp(1.6rem,1.35rem+1vw,2.1rem)] leading-tight tracking-[-0.02em] text-ink">{t.youTitle}</legend>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="text-small"><span className="font-medium text-ink">{t.name}</span>
                <input type="text" autoComplete="name" value={f.name} onChange={e => set('name', e.target.value)} required className={input} />
              </label>
              <label className="text-small"><span className="font-medium text-ink">{t.email}</span>
                <input type="email" autoComplete="email" value={f.email} onChange={e => set('email', e.target.value)} required className={input} />
              </label>
              <label className="text-small"><span className="font-medium text-ink">{t.country}</span>
                <select value={f.country} onChange={e => set('country', e.target.value)} required className={input}>
                  <option value="">{t.choose}</option>
                  {p.countries.map(c => <option key={c.code} value={c.code}>{c.name}</option>)}
                  <option value="OTHER">…</option>
                </select>
              </label>
              <label className="text-small"><span className="font-medium text-ink">{t.phone}</span>
                <input type="tel" autoComplete="tel" value={f.whatsapp} onChange={e => set('whatsapp', e.target.value)} placeholder="+44 7700 900000" className={input} />
              </label>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-2" role="group" aria-label={t.replyBy}>
              <span className="self-center text-small text-ink-muted">{t.replyBy}</span>
              {(['WhatsApp', 'Email'] as const).map(c => (
                <button key={c} type="button" aria-pressed={f.contact === c} onClick={() => set('contact', c)} className={chip(f.contact === c)}>{c === 'Email' ? t.replyEmail : c}</button>
              ))}
            </div>
            <label className="mt-6 flex items-start gap-3 text-small text-ink-soft">
              <input type="checkbox" checked={f.consent} onChange={e => set('consent', e.target.checked)} className="mt-1 h-4 w-4 accent-[#c25f0f]" required />
              <span>{t.consent} <a href={p.privacyHref} target="_blank" rel="noopener" className="underline underline-offset-2">Privacy policy</a></span>
            </label>
            <input type="text" name="botcheck" value={f.botcheck} onChange={e => set('botcheck', e.target.value)} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
          </fieldset>
        )}
      </div>

      {error && <p className="mt-5 rounded-[14px] bg-danger/10 px-4 py-3 text-small font-semibold text-danger" role="alert">{error}</p>}

      <div className="sticky bottom-0 z-10 -mx-5 mt-8 flex items-center gap-3 border-t border-line bg-bg-elevated/95 px-5 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl md:static md:mx-0 md:mt-9 md:justify-between md:bg-transparent md:px-0 md:pb-0 md:pt-6 md:backdrop-blur-none">
        <button type="button" onClick={back} disabled={step === 0} className="h-13 shrink-0 rounded-pill border border-line px-5 text-[0.95rem] font-bold text-ink active:scale-95 disabled:opacity-40">{t.back}</button>
        {step < t.steps.length - 1 ? (
          <button type="button" onClick={next} className="h-13 flex-1 rounded-pill bg-brand px-8 font-bold text-[#1b1d21] transition-all hover:bg-[#f2852b] active:scale-[0.98] md:flex-none">{t.continue}</button>
        ) : (
          <button type="submit" disabled={status === 'sending'} className="h-13 flex-1 rounded-pill bg-brand px-8 font-bold text-[#1b1d21] transition-all hover:bg-[#f2852b] active:scale-[0.98] disabled:opacity-60 md:flex-none">
            {status === 'sending' ? t.sending : t.send}
          </button>
        )}
      </div>
    </form>
  );
}
