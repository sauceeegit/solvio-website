import { useEffect } from 'react';
import { SITE, routeMeta } from '../data/seo';

const set = (selector, attr, value) => {
  const el = document.querySelector(selector);
  if (el && value) el.setAttribute(attr, value);
};

// Sets the document title + description + canonical/OG/Twitter tags for a route.
// Crawlers that skip JS get the same values from the prerendered HTML
// (scripts/prerender-meta.mjs); this keeps them in sync on client-side navigation.
// Route meta lives in src/data/seo.js — shared with the prerender script.
export function usePageMeta(route) {
  useEffect(() => {
    const meta = routeMeta[route];
    if (!meta) return;
    const url = route === '/' ? `${SITE}/` : `${SITE}${route}/`;
    document.title = meta.title;
    set('meta[name="description"]', 'content', meta.description);
    set('link[rel="canonical"]', 'href', url);
    set('meta[property="og:title"]', 'content', meta.title);
    set('meta[property="og:description"]', 'content', meta.description);
    set('meta[property="og:url"]', 'content', url);
    set('meta[name="twitter:title"]', 'content', meta.title);
    set('meta[name="twitter:description"]', 'content', meta.description);

    // Routes flagged noindex (currently only the demo /checkout) get a robots
    // meta injected; every other route must have it REMOVED, otherwise a
    // client-side nav away from /checkout would leave the whole SPA noindex'd.
    const existing = document.querySelector('meta[name="robots"]');
    if (meta.noindex) {
      if (existing) {
        existing.setAttribute('content', 'noindex, follow');
      } else {
        const el = document.createElement('meta');
        el.setAttribute('name', 'robots');
        el.setAttribute('content', 'noindex, follow');
        document.head.appendChild(el);
      }
    } else if (existing) {
      existing.remove();
    }
  }, [route]);
}
