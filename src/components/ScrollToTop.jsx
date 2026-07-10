import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Reset scroll to the top whenever the route (pathname) changes, so navigating
// to a new page always starts at the top instead of keeping the previous
// page's scroll position. If the destination carries a hash (e.g. a footer
// link to "/#calculator" or "/#contact"), scroll that element into view once
// the new page has mounted instead — so cross-page anchor links land in the
// right spot even in this single-page app.
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Wait a frame so the target section exists after the route swap.
      const id = hash.replace('#', '');
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        else window.scrollTo(0, 0);
      });
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
