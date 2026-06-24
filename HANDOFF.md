# Solvio — Project handoff / continuation notes

_Last updated: 2026-06-24. Read this first to continue the project on another computer._

## ⭐ Continue on another computer (start here)
The project now lives on **GitHub**, so a second machine just clones it:
- **Repo (public):** https://github.com/sauceeegit/solvio-website  (account `sauceeegit`)
- **Live site (GitHub Pages):** https://sauceeegit.github.io/solvio-website/

```bash
git clone https://github.com/sauceeegit/solvio-website.git
cd solvio-website
npm install        # needs Node.js 18+ (https://nodejs.org)
npm run dev        # local preview at http://localhost:5173
```
Then open a fresh Claude Code session in the folder and tell it to read this HANDOFF.md.
Commit + `git push origin main` and the site **auto-deploys** (see below). The Claude Code
chat transcript itself does NOT sync between machines — this file is the handoff.

## Deployment — GitHub Pages (automatic on push)
- `.github/workflows/deploy.yml` builds the site in CI and deploys to GitHub Pages on every
  push to `main` (~3–4 min). Watch runs at https://github.com/sauceeegit/solvio-website/actions
  (or `gh run watch`). No Node needed locally just to deploy — CI builds it.
- **Pages serves from a subpath** (`/solvio-website/`), which required three things (already done):
  1. `vite.config.js` reads `base` from `process.env.VITE_BASE` (CI sets it to `/<repo>/`);
     defaults to `/` for local dev and root hosts (Netlify).
  2. `src/main.jsx` sets `<BrowserRouter basename={import.meta.env.BASE_URL …}>`.
  3. The workflow copies `dist/index.html` → `dist/404.html` so deep links / refresh on
     `/balcony-system` work (Pages serves 404.html, the SPA boots and routes correctly — a
     404 HTTP status on that path is normal and harmless).
- ⚠️ **Asset path rule:** any file in `/public` (images, video, logo) MUST be referenced via the
  `asset()` helper in `src/lib/format.js`, e.g. `asset('/hero-loop.mp4')` — NOT a root-absolute
  string like `'/hero-loop.mp4'`. Root-absolute strings 404 under the Pages subpath. (External
  URLs like Unsplash/YouTube are fine as-is.)
- **This machine has no Node installed** and the GitHub CLI (`gh`) was installed here; the build
  is done entirely by GitHub Actions. On a machine with Node you can also `npm run build` locally.

## Optional alternative deploy — Netlify Drop
GitHub Pages (above) is the primary, auto-deploying host. If you ever also want a Netlify copy,
just `npm run build` and drag the resulting `dist/` folder onto https://app.netlify.com/drop.
Netlify serves at the root domain, so the `asset()` subpath fix and `base` don't matter there,
and `public/_redirects` handles SPA routing. (The old prebuilt `…\Desktop\to G\` copy was
deleted on 2026-06-24 — it was just generated output; rebuild from source when needed.)

## What this is
The marketing site for **Solvio** (solvio.solar), a Thailand-based plug-and-play solar
brand. Two pages via React Router:
- `/` — **landing page** (the main work; modeled loosely on priwatt + EcoFlow layouts,
  100% original Solvio content)
- `/balcony-system` — the original **product page** (sticky gallery + live configurator)

Stack: **React 19 + Vite + Tailwind CSS v3**, `framer-motion`, `lucide-react`,
`react-router-dom`. English copy, Thai Baht (฿) pricing.

## How to run it (on the new computer)
Needs **Node.js 18+** (https://nodejs.org). On the original Windows machine, Node was at
`C:\Program Files\nodejs\` and NOT on PATH — prepend it in PowerShell if needed:
`$env:Path = "$env:ProgramFiles\nodejs;$env:Path"`.

```bash
npm install      # first time only — node_modules does NOT sync via OneDrive
npm run dev      # open the printed http://localhost:5173 (or 5174)
npm run build    # production build into /dist
```

## Brand
- Accent = **Solvio orange `#FC4302`** (hover/text `#D63A02`), sampled from the real logo.
  It's ONE token in `tailwind.config.js` named `lime` (historical) — change those two
  hex values to re-skin everything.
- Real logo at `public/solvio-logo.jpg` (+ `solvio-logo-square.jpg`), used by
  `src/components/Logo.jsx`. Fonts: **Hanken Grotesk** (display + body — a free Google-Fonts
  stand-in for priwatt's commercial *Roobert*; loaded in `index.html`) + **JetBrains Mono** (mono).

## Landing page structure (`src/pages/LandingPage.jsx`)
TopBar (phone +66 84 348 8428, WhatsApp link, book-a-call) → sticky LandingNav →
**Hero** (full-bleed looping video `public/hero-loop.mp4` + live **Phuket clock** with
sun/moon icon, centiseconds, 70% size on mobile) → **CategoryGrid** ("From Rooftop to
Backpack": Rooftop / Balcony / Portable Solar) → **Bestsellers** (3 product cards,
horizontal snap-scroll on mobile) → **EarningsCalculator** → **LandingFAQ** →
**FounderVideo** (YouTube lightbox/pop-out) → **WhyShop** (infographic grid) →
**Community** ("Become part of Solvio") → Footer.

Most landing content lives in **`src/data/landing.js`** (one source of truth).

## The solar calculator — `src/components/landing/EarningsCalculator.jsx`
Bill-first. Inputs: monthly bill, **coverage %**, electricity **rate** (฿/kWh, default
4.5), **instalment plan** (6/12/18/24/48 mo), **instalment interest %** (default 0,
amortized when >0), and a **battery** toggle. Results: red/green break-even chart
(red before payback, green after), saving/month + saving/25yr (green text),
payback, monthly instalment, system size (kW) + ~450 W panel count, plus an
**email-capture** field (UI only — submit shows a local confirmation; NOT wired to any
service yet; see the `TODO` in `submitQuote`).

Locked assumptions (constants at top of the file):
- 5 sun-hours/day, **85% performance ratio**.
- Self-consumption: **50% without battery, 100% with battery** (savings =
  coverage × self-consumption × bill; surplus exported earns nothing).
- System cost: **18,500/kW + 79,000** (no battery) / **28,500/kW + 85,000** (battery).
- 25-yr: **flat tariff** (0% inflation), **0.5%/yr** panel degradation.
- Panels = 450 W each. Break-even runs against the **cash price** (interest deliberately
  does NOT shift break-even — that was a chosen behavior).
- Payback intentionally varies with coverage (the fixed cost amortizes over bigger
  systems) — confirmed as desired.

## The product page configurator — `/balcony-system`
`src/pages/ProductPage.jsx`: TopBar + LandingNav, then a two-column hero — a **sticky
left image** and the **Configurator + PriceBox** on the right. The whole step UI was
reworked to mirror priwatt's `priFlat Quattro` configurator (in orange, Thai Baht).

**Layout tricks (intentional):**
- Site width widened to **`max-w-[1600px]`** — one token, `container-x` in `src/index.css`.
- Hero image **bleeds into the left page margin**: `lg:ml-[calc(50%-50vw+1.5rem)]` on the
  grid container (`ProductHero.jsx`) grows the image leftward while the info column stays
  aligned to the page's right content edge. Image aspect `10/9`, ratio ≈ priwatt.
- Image is **frozen on scroll**: `lg:sticky lg:top-24 lg:self-start` on the Gallery root
  (the `self-start` is essential — without it the grid stretches the cell and sticky can't
  engage). `Gallery.jsx` shows a single image now (thumbnail strip removed).

**Configurator** (`src/components/Configurator.jsx`) — 4 steps, all data in
`src/data/product.js`:
1. **Location** — solid-fill buttons (Garden / Flat roof / Facade / Balcony); orange fill +
   white corner-check when selected (`LocationButton`).
2. **Module** — two big **portrait (3:4) image cards** White Feather (`/module-white.jpg`,
   ฿7,300) and Dark Feather (`/module-dark.jpg`, ฿8,030), both 450 Wp bifacial with dims/weight
   (`ModuleCard`; real product shots on a brand-orange backdrop). Quantity 1–4 as **priwatt-style
   buttons** showing the price delta from the 4-panel base (selected = orange).
3. **Storage** — 2-column **photo cards** (`StorageCard`; framed image panel inset ~8px). 4
   options: **No storage** (`/storage-none.jpg`, the micro-inverter) and the **Solvio Venus A**
   battery line — 2.12 / 4.24 / 6.36 kWh (`/storage-venus2|4|6.jpg`, +฿19k / +฿31k / +฿35k), each
   spec'd "4 MPPT inputs up to 2.4 kW · Integrated 1500 W inverter · Anti Feed-in Control".
   Selected card fills **orange** + white corner-check. Each option carries an `img` field; any
   without one falls back to a placeholder icon. (Prices not yet scaled to the clean 1×/2×/3×
   capacity stack.)
4. **AC cable** — solid-fill buttons, **3 m / 15 m top row + Without full-width below**
   (`CableButton`); deltas Without −฿700, 15 m +฿790, 3 m = base.

**Pricing** (`computeConfig` in `product.js`): panels priced per unit in USD→THB
(`USD_THB = 36.5`); `total = perPanel × modules + storage + cable`. Mounting is "incl." and
there's **no separate inverter line**, so per-panel quantity deltas are linear (larger than
priwatt's, which keep a big fixed base). Formatters `baht` / `bahtDelta` / `whFmt` in
`src/lib/format.js`. Old per-page euro components (`SavingsCalculator`, `Comparison`,
`RelatedProducts`, `BenefitsStrip`) still carry some € strings — convert if needed.

**Other product-page sections:** a **bento highlights** grid (`Highlights.jsx`, just after the
hero — yield gauge, savings, Plug & Play, Solvio block, 30% donut, optional support). The
**savings** tile shows `/savings-bg.jpg` behind the orange ฿7,700 box. The **Plug & Play** tile
shows `/plugplay-photo.jpg` with a corner caption (live text) that **expands to fill the cell on
hover** — center-aligned, glides via a `group-hover` width/height transition, with the heading's
2-line wrap locked by `<br>` so it doesn't reflow. The optional-support tile is still a
placeholder. (All these images use the `asset()` helper.) `IncludedItems.jsx` is the priwatt-style **"What is included in
the delivery?"** grid (image placeholders, data in `included`). `PriceBox.jsx` ends with an
**email-capture** form ("save this configuration & talk to a sales agent") — UI-only, see the
`TODO` in `submitQuote`, not wired. The old **How it works** section was removed from the page
(component file still exists, unused).

## Images (all in `public/`, optimized)
Product photos: `white-feather-900.jpg`, `dark-feather-900.jpg`, `dark-feather-1800.jpg`
(shown `object-contain` on a sampled-orange card bg in Bestsellers). Categories:
`rooftop-solar.jpg`, `balcony-power-plants.jpg`, `portable-systems.jpg`. Plus
`earn-rewards.jpg` (gold coins, used in the WhyShop "Earn Solvio rewards" cell).
To swap any image: drop a file in `public/` and update the path in `src/data/landing.js`.

## Deploy / share
Primary host is **GitHub Pages**, which rebuilds automatically on every push to `main` — see the
"Deployment — GitHub Pages" section near the top. Live at https://sauceeegit.github.io/solvio-website/.
For a one-off Netlify copy instead, `npm run build` and drag `dist/` onto https://app.netlify.com/drop.
(The old prebuilt `…\Desktop\to G\` copy was deleted 2026-06-24; rebuild from source if needed.)
**SPA routing:** `public/_redirects` (`/*  /index.html  200`) covers Netlify; the GitHub Pages
build uses a `404.html` fallback instead (created by the deploy workflow).

## Open items
1. **Wire up the quote email** (currently a placeholder) — e.g. Netlify Forms / Formspree.
2. Swap remaining placeholder imagery / copy for finals as they come.
3. Bundle size ~1 MB JS (`import * as Icons from 'lucide-react'`) — switch to named
   icon imports before a real launch if you want it smaller.

## Notes on continuing here
- The Claude Code **chat transcript does not sync** (it's local to each machine). On the
  new computer, open a fresh Claude Code session in this folder and tell it to read this
  HANDOFF.md. On the original machine you can reopen the chat with `claude --resume`.
- The dev server has been run **detached** so it survives between actions; on a fresh
  machine just use `npm run dev` in your own terminal.
