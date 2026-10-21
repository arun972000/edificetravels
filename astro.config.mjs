// @ts-check
import { defineConfig } from 'astro/config';

import preact from '@astrojs/preact';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { readFileSync, readdirSync } from 'node:fs';

// Guides carry an "updated" date; the sitemap passes it on as lastmod so
// search engines know when a visa or cost page was last checked.
const GUIDES = './src/content/guides';
const guideUpdated = Object.fromEntries(
  readdirSync(GUIDES).filter(f => f.endsWith('.md')).map(f => [
    f.replace(/\.md$/, ''),
    readFileSync(`${GUIDES}/${f}`, 'utf8').match(/^updatedAt:\s*(\S+)/m)?.[1],
  ]),
);

// https://astro.build/config
export default defineConfig({
  // Canonical URL. Used by the sitemap, canonical tags and JSON-LD.
  site: 'https://edificetravels.com',
  trailingSlash: 'never',
  // about.html, not about/index.html: Cloudflare Pages serves a file at /about
  // but redirects a folder index to /about/, which would contradict the canonicals.
  build: { format: 'file' },
  integrations: [
    // Preact in React-compatible mode: the islands keep React's API at a fraction of the size.
    preact({ compat: true }),
    sitemap({
      filter: page => !page.includes('/thank-you') && !page.includes('/404'),
      // Home, planner, about and contact exist in six languages: list each
      // version with its alternates, as the hreflang tags on the pages do.
      i18n: { defaultLocale: 'en', locales: { en: 'en', de: 'de', fr: 'fr', es: 'es', it: 'it', hi: 'hi' } },
      serialize(item) {
        const guide = item.url.match(/\/guide\/([^/]+)$/)?.[1];
        if (guide && guideUpdated[guide]) item.lastmod = new Date(guideUpdated[guide]).toISOString();
        return item;
      },
    }),
  ],
  image: {
    // Modern formats by default; the Image component picks the smallest.
    responsiveStyles: true,
    // WebP at quality 72 (sharp's default is 80): about a quarter lighter,
    // with no visible change on photographs under a gradient overlay.
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: { webp: { quality: 72, smartSubsample: true }, jpeg: { quality: 76, mozjpeg: true } },
    },
  },
  // Prefetch a page when a visitor hovers or taps its link. Prefetching every
  // link in view cost phone visitors a dozen page downloads on the home page.
  // With clientPrerender, Chrome and Edge go further and prerender the page
  // (photographs included) during the hover, so the click opens instantly;
  // other browsers fall back to a plain prefetch.
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
  experimental: {
    clientPrerender: true,
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
