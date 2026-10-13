import { describe, expect, it } from 'vitest';
import { basePath, isTranslated, localeFromPath, localizedPath, pagePath } from '../../src/i18n/config';
import { monthRange } from '../../src/i18n';
import { safeJson } from '../../src/lib/json';

describe('locale paths', () => {
  it('strips a locale prefix', () => {
    expect(basePath('/de/plan')).toBe('/plan');
    expect(basePath('/de')).toBe('/');
    expect(basePath('/journeys/x')).toBe('/journeys/x');
    expect(basePath('/plan/')).toBe('/plan');
    expect(basePath('/de/plan.html')).toBe('/plan');
    expect(basePath('/de.html')).toBe('/');
  });
  it('normalises built file paths to public paths', () => {
    expect(pagePath('/about.html')).toBe('/about');
    expect(pagePath('/index.html')).toBe('/');
    expect(pagePath('/journeys/x/')).toBe('/journeys/x');
    expect(pagePath('/')).toBe('/');
  });
  it('detects the locale', () => {
    expect(localeFromPath('/fr/contact')).toBe('fr');
    expect(localeFromPath('/journeys')).toBe('en');
  });
  it('knows which routes are translated', () => {
    expect(isTranslated('/')).toBe(true);
    expect(isTranslated('/it/about')).toBe(true);
    expect(isTranslated('/journeys')).toBe(false);
  });
  it('localises only translated routes', () => {
    expect(localizedPath('/plan', 'es')).toBe('/es/plan');
    expect(localizedPath('/', 'de')).toBe('/de');
    expect(localizedPath('/journeys', 'de')).toBe('/journeys');
    expect(localizedPath('/de/plan', 'en')).toBe('/plan');
  });
});

describe('monthRange', () => {
  it('wraps the year and joins with a word, never a dash', () => {
    const r = monthRange(['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'], 'en');
    expect(r).toBe('Oct to Mar');
    expect(r).not.toMatch(/[–—-]/);
  });
  it('lists separate runs', () => {
    expect(monthRange(['Mar', 'Apr', 'May', 'Jun', 'Sep', 'Oct', 'Nov'], 'en')).toBe('Mar to Jun, Sep to Nov');
  });
  it('uses the locale word for a range', () => {
    expect(monthRange(['Jun', 'Jul', 'Aug', 'Sep'], 'de')).toContain(' bis ');
  });
});

describe('safeJson', () => {
  it('cannot be closed by a script tag in content', () => {
    const out = safeJson({ note: '</script><script>alert(1)</script>' });
    expect(out).not.toContain('</script>');
    expect(JSON.parse(out).note).toBe('</script><script>alert(1)</script>');
  });
  it('escapes line and paragraph separators', () => {
    const out = safeJson({ s: `a${String.fromCharCode(0x2028)}b` });
    expect(out).not.toContain(String.fromCharCode(0x2028));
    expect(JSON.parse(out).s).toBe(`a${String.fromCharCode(0x2028)}b`);
  });
});
