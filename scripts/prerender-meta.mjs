// Post-build (after prerender-snap.mjs): patch route-specific
// <title>/description/canonical/OG tags into every dist/<route>/index.html,
// so GitHub Pages serves deep links with HTTP 200 (not the 404.html fallback)
// and crawlers/link-unfurlers that don't run JS still see the right meta.
// Each route's OWN snapshot is patched in place — never copy one route's HTML
// over another's (that would destroy the per-route body content react-snap
// just created). Routes without a snapshot (noindexed /checkout) fall back to
// the home page HTML. Runs automatically via `npm run build`.
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE, routeMeta } from '../src/data/seo.js';

const dist = resolve(dirname(fileURLToPath(import.meta.url)), '../dist');
const template = readFileSync(join(dist, 'index.html'), 'utf8');

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

// Extra JSON-LD injected per route (balcony page gets Product schema).
//
// ⚠️ KEEP THESE PRICES IN SYNC WITH THE PAGE. They mirror the "From" row of the
// Comparison table in src/data/product.js — 2 / 4 / 6 White Feather panels plus
// the ฿11,950 micro-inverter (฿30,750 / ฿49,550 / ฿68,350). Structured data that
// advertises a price the visitor can't actually configure is a Merchant Center
// disqualifier, so re-check this whenever panel or inverter pricing moves.
// (These were ฿12,990–43,800 until 2026-08-04 — stale since the July repricing.)
const productJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Solvio Balcony System',
  brand: { '@type': 'Brand', name: 'Solvio' },
  description: routeMeta['/balcony-system'].description,
  image: `${SITE}/og-image.jpg`,
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'THB',
    lowPrice: '30750',
    highPrice: '68350',
    availability: 'https://schema.org/InStock',
    url: `${SITE}/balcony-system/`,
  },
};
const extraJsonLd = {
  '/balcony-system': `<script type="application/ld+json">${JSON.stringify(productJsonLd)}</script>`,
};

function renderRoute(route, meta, html) {
  // Trailing slash matches the URL GitHub Pages actually serves (it 301s
  // /route -> /route/), so canonicals point at the final URL, no redirect hop.
  const url = route === '/' ? `${SITE}/` : `${SITE}${route}/`;
  html = html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(meta.title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(meta.description)}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(meta.title)}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${esc(meta.description)}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${esc(meta.title)}$2`)
    .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${esc(meta.description)}$2`);
  if (meta.noindex) {
    html = html.replace('</head>', '<meta name="robots" content="noindex, follow" />\n  </head>');
  }
  if (extraJsonLd[route]) html = html.replace('</head>', `${extraJsonLd[route]}\n  </head>`);
  return html;
}

for (const [route, meta] of Object.entries(routeMeta)) {
  const routeFile =
    route === '/' ? join(dist, 'index.html') : join(dist, route.slice(1), 'index.html');
  const base = existsSync(routeFile) ? readFileSync(routeFile, 'utf8') : template;
  const html = renderRoute(route, meta, base);
  if (route === '/') {
    writeFileSync(join(dist, 'index.html'), html);
  } else {
    const dir = join(dist, route.slice(1));
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, 'index.html'), html);
  }
  console.log(`prerendered ${route}`);
}
