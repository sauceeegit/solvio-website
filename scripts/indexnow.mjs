// IndexNow ping — submits all public routes to Bing/Yandex for fast re-crawl.
// Run manually after content changes:  node scripts/indexnow.mjs
// Key file must exist at https://solvio.solar/<KEY>.txt (see public/).
import { SITE, routeMeta } from '../src/data/seo.js';

const KEY = 'cb872d129e6941b6722a11f51c006406';

const urls = Object.entries(routeMeta)
  .filter(([, meta]) => !meta.noindex) // never ping noindexed routes (e.g. /checkout)
  .map(([r]) => (r === '/' ? `${SITE}/` : `${SITE}${r}/`));

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host: 'solvio.solar',
    key: KEY,
    keyLocation: `${SITE}/${KEY}.txt`,
    urlList: urls,
  }),
});

console.log(`IndexNow ${res.status} — submitted ${urls.length} URLs`);
urls.forEach((u) => console.log(' ', u));
// 200 = accepted, 202 = accepted pending key check, 4xx = fix key/host mismatch.
