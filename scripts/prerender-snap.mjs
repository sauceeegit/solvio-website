// Post-build SSG: render every indexable route in headless Chromium and write
// the resulting DOM into dist/<route>/index.html, so crawlers/link unfurlers
// that don't execute JS still see the full page content (H1s, copy, links).
// Runs after `vite build`, BEFORE scripts/prerender-meta.mjs (which then fixes
// canonical/OG tags on top of the snapshot).
import { createWriteStream, existsSync, mkdirSync } from 'node:fs';
import { chmod } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { createRequire } from 'node:module';
import { pipeline } from 'node:stream/promises';
import { fileURLToPath } from 'node:url';
import { routeMeta } from '../src/data/seo.js';

const require = createRequire(import.meta.url);
const { run } = require('react-snap');
const extractZip = require('extract-zip'); // v1 (callback API) — wrap below

const unzip = (zipPath, dir) =>
  new Promise((resolve, reject) =>
    extractZip(zipPath, { dir }, (err) => (err ? reject(err) : resolve()))
  );

// The Chromium bundled with react-snap's old puppeteer is Chrome ~72 (2018) —
// too old to parse the Vite bundle (CI failed with "SyntaxError: Unexpected
// token '?'"). We always use a modern GTK-free chrome-headless-shell instead.
// Resolution order:
//   1. SNAP_CHROME_PATH env var
//   2. Persistent VPS toolchain copy
//   3. Download the pinned build on demand (GitHub runners, fresh machines)
// Pinned version must stay in sync with /opt/data/toolchain/chromium.
const CHS_VERSION = '153.0.7989.3';
const CHS_URL = `https://storage.googleapis.com/chrome-for-testing-public/${CHS_VERSION}/linux64/chrome-headless-shell-linux64.zip`;
const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CACHE_DIR = join(REPO_ROOT, 'node_modules', '.cache', 'chrome-headless-shell');
const CACHE_BIN = join(CACHE_DIR, 'chrome-headless-shell-linux64', 'chrome-headless-shell');

async function ensureChrome() {
  const candidates = [
    process.env.SNAP_CHROME_PATH,
    '/opt/data/toolchain/chromium/chrome-headless-shell/chrome-headless-shell',
    CACHE_BIN,
  ].filter(Boolean);
  const found = candidates.find((p) => existsSync(p));
  if (found) return found;

  console.log(`prerender-snap: downloading chrome-headless-shell ${CHS_VERSION}…`);
  mkdirSync(CACHE_DIR, { recursive: true });
  const zipPath = join(CACHE_DIR, 'chs.zip');
  const res = await fetch(CHS_URL);
  if (!res.ok) throw new Error(`chrome download failed: HTTP ${res.status}`);
  await pipeline(res.body, createWriteStream(zipPath));
  await unzip(zipPath, CACHE_DIR);
  await chmod(CACHE_BIN, 0o755);
  return CACHE_BIN;
}

const chromePath = await ensureChrome();

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
  puppeteerExecutablePath: chromePath,
});

console.log(`react-snap: snapshotted ${include.length} routes`);
