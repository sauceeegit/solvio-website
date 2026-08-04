// Post-build SSG: render every indexable route in headless Chromium and write
// the resulting DOM into dist/<route>/index.html, so crawlers/link unfurlers
// that don't execute JS still see the full page content (H1s, copy, links).
// Runs after `vite build`, BEFORE scripts/prerender-meta.mjs (which then fixes
// canonical/OG tags on top of the snapshot).
import { existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import { routeMeta } from '../src/data/seo.js';

const require = createRequire(import.meta.url);
const { run } = require('react-snap');

// On this VPS the Chromium bundled with puppeteer can't run (no GTK, no root),
// so we keep a GTK-free chrome-headless-shell in the persistent toolchain.
// On GitHub Actions runners the bundled Chromium works — only override the
// executable when our local binary actually exists.
const LOCAL_CHROME = '/opt/data/toolchain/chromium/chrome-headless-shell/chrome-headless-shell';

const include = Object.entries(routeMeta)
  .filter(([, meta]) => !meta.noindex) // skip /checkout — noindexed demo
  .map(([route]) => route);

await run({
  source: 'dist',
  destination: 'dist',
  include,
  waitFor: 1500, // let mount animations finish + splash screen remove itself
  puppeteerArgs: ['--no-sandbox', '--disable-setuid-sandbox'],
  skipThirdPartyRequests: true, // fonts/YouTube/Maps iframes not needed in snapshot
  // Keep source attribute order — scripts/prerender-meta.mjs regex-patches
  // tags like `<meta name="description" content="…">` after this step and
  // would silently miss attribute-sorted markup.
  minifyHtml: {
    collapseBooleanAttributes: true,
    collapseWhitespace: true,
    decodeEntities: true,
    keepClosingSlash: true,
    sortAttributes: false,
    sortClassName: false,
  },
  ...(existsSync(LOCAL_CHROME) ? { puppeteerExecutablePath: LOCAL_CHROME } : {}),
});

console.log(`react-snap: snapshotted ${include.length} routes`);