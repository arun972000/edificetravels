// @ts-check
import { defineConfig } from 'astro/config';

import preact from '@astrojs/preact';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

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
    }),
  ],
  image: {
    // Modern formats by default; the Image component picks the smallest.
    responsiveStyles: true,
  },
  // Prefetch a page when a visitor hovers or taps its link. Prefetching every
  // link in view cost phone visitors a dozen page downloads on the home page.
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
