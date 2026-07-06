# Solvio website — rules for Claude sessions

Two people (+ their Claudes) work on this repo in parallel. Every push to `main`
auto-deploys to production (https://sauceeegit.github.io/solvio-website/) in ~3–4 min.
These rules exist because features have been accidentally destroyed during redesigns.

## Golden rules — never break these

1. **Pull before you touch anything**: `git pull --rebase origin main`. Someone else
   probably pushed since your last session. Push promptly when done — don't sit on
   local commits.

2. **Never remove pages, routes, nav links, sections, or features unless the user
   explicitly asks you to remove them.** If something looks empty, broken, or unused —
   it probably isn't. Run it (`npm run dev`) and check, or ask the user. (A previous
   session deleted the Rooftop System nav tab believing the page was "empty" — it had a
   full video page behind it.)

3. **Redesign the look, keep the behavior.** When restyling a component, preserve its
   existing functionality: horizontal snap-scrollers, hover effects, anchors/ids,
   `imgClass` per-item overrides, sticky positioning. (A previous redesign silently
   turned two horizontal product scrollers into static grids and dropped price
   formatting.)

4. **Verify before pushing**: `npm run build` must pass. If you changed anything
   visual, look at it in the dev server first. Remember: pushing = deploying to
   production.

## Conventions

- **Prices**: always render through `baht()` from `src/lib/format.js` (→ `฿3,990`).
  Store prices as plain numbers in data files.
- **Assets in `/public`**: always reference through `asset()` from `src/lib/format.js`
  — raw `/foo.png` paths 404 on GitHub Pages (subpath hosting). Prefer WebP for images;
  compress videos (~720p CRF 25 works well) before committing.
- **Content lives in data files** (`src/data/landing.js`, `src/data/product.js`),
  components render it. Don't hardcode content into components. (Exception that already
  exists: nav links are hardcoded in `src/components/landing/LandingNav.jsx`.)
- **Routing**: `HashRouter` — in-app URLs look like `/#/balcony-system`. Use `Link`/
  `NavLink`, never `<a href>` full reloads for internal navigation.
- **Icons**: import from the named registry `src/lib/icons.js` when picking by string
  name; never `import * as Icons from 'lucide-react'` (kills tree-shaking, ~500 kB).

## Context

- `HANDOFF.md` has the full project tour (structure, calculator logic, deploy details).
- Stack: React 19 + Vite + Tailwind v3, framer-motion, lucide-react, react-router-dom.
- Brand: orange `#FC4302` = the Tailwind token named `lime` (historical quirk).
