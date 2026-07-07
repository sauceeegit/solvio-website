import { useEffect } from 'react';

// Sets the document title + meta description for a route.
// Keeps SEO/share tags per page in an SPA without extra dependencies.
export function usePageMeta(title, description) {
  useEffect(() => {
    if (title) document.title = title;
    if (description) {
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute('content', description);
    }
  }, [title, description]);
}
