// Post-build: create dist/<route>/index.html for every route with route-specific
// <title>/description/canonical/OG tags, so GitHub Pages serves deep links with
// HTTP 200 (not the 404.html fallback) and crawlers/link-unfurlers that don't run
// JS still see the right meta. Runs automatically via `npm run build`.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE, routeMeta } from '../src/data/seo.js';

const dist = resolve(dirname(fileURLToPath(import.meta.url)), '../dist');
const template = readFileSync(join(dist, 'index.html'), 'utf8');

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

// Extra JSON-LD injected per route (balcony page gets Product schema).
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
    lowPrice: '12990',
    highPrice: '43800',
    availability: 'https://schema.org/InStock',
  },
};
const extraJsonLd = {
  '/balcony-system': `<script type="application/ld+json">${JSON.stringify(productJsonLd)}</script>`,
};

function renderRoute(route, meta) {
  const url = route === '/' ? `${SITE}/` : `${SITE}${route}`;
  let html = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(meta.title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(meta.description)}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(meta.title)}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${esc(meta.description)}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${esc(meta.title)}$2`)
    .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${esc(meta.description)}$2`);
  if (extraJsonLd[route]) html = html.replace('</head>', `${extraJsonLd[route]}\n  </head>`);
  return html;
}

for (const [route, meta] of Object.entries(routeMeta)) {
  const html = renderRoute(route, meta);
  if (route === '/') {
    writeFileSync(join(dist, 'index.html'), html);
  } else {
    const dir = join(dist, route.slice(1));
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, 'index.html'), html);
  }
  console.log(`prerendered ${route}`);
}
