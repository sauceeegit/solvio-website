# Solvio website — AI assistant handoff (for ChatGPT / Codex)

You are helping **Chady** continue building the Solvio solar marketing website while their usual
assistant is unavailable. This file is self-contained: read it fully before making changes. For the
long-form, chronological history see `HANDOFF.md` (same folder) — but **this file is the quick,
authoritative onboarding.**

---

## 1. What the project is

Marketing + light e-commerce website for **Solvio**, a Thailand-based plug-and-play **solar** brand
(rooftop systems, balcony kits, portable power, solar panels). English copy, prices in **Thai Baht (฿)**.

- **Live site:** https://solvio.solar
- **Stack:** React 19 + Vite + Tailwind CSS v3, `framer-motion`, `lucide-react`, `react-router-dom`
  (BrowserRouter). No backend — it's a **static site** hosted on GitHub Pages.

## 2. Repos & local paths (Windows machine)

| What | GitHub | Local path |
|---|---|---|
| **Website** (this repo) | `github.com/sauceeegit/solvio-website` | `C:\dev\solvio-website` |
| **3D panel model** (separate) | `github.com/sauceeegit/solvio-panel-3d` | `C:\dev\solvio-panel-3d` |

The 3D model is a **single `index.html`** (Three.js r160 via CDN importmap). It's embedded in the
balcony page through an `<iframe>`. There is also a mirror copy the user keeps at
`C:\Users\chady\OneDrive\Desktop\panel 3d model\index.html` — **after editing the model, copy the file
there too.**

Image source PNGs (to convert to WebP) live at `C:\Users\chady\OneDrive\Desktop\Solvio AI folder\images`.

## 3. Run / build / deploy

```bash
cd C:\dev\solvio-website
npm install            # first time (Node.js 18+; this machine has v24)
npm run dev            # dev server → http://localhost:5173
npm run build          # production build into /dist (also runs scripts/prerender-meta.mjs)
```
- On this machine Node may not be on PATH in PowerShell — prepend if needed:
  `$env:Path = "$env:ProgramFiles\nodejs;$env:Path"`.
- **Deploy = push to `main`.** GitHub Actions builds and publishes to Pages automatically (~3 min).
  The 3D model repo deploys the same way (legacy Pages from `main`, ~1–2 min).
- `gh` CLI is installed. Watch a deploy: `gh run watch` (or `gh run list`).

## 4. ⚠️ Non-negotiable workflow rules

1. **`git pull --rebase origin main` BEFORE editing.** Two people push in parallel (collaborator
   `GG2026chad`). Always rebase first; resolve conflicts keeping BOTH intents where possible.
2. **`npm run build` must pass BEFORE you push.** Never push a broken build.
3. **Reference `/public` assets via the `asset()` helper** (`src/lib/format.js`), e.g.
   `asset('/foo.webp')` — NOT `'/foo.webp'`. Root-absolute paths break under the base path.
4. **If you change the 3D model** (`C:\dev\solvio-panel-3d\index.html`): (a) **bump `MODEL_VERSION`**
   in `src/components/Gallery.jsx` (cache-bust — Pages caches the model HTML ~10 min), (b) push the
   model repo, (c) **mirror the file** to `…\OneDrive\Desktop\panel 3d model\index.html`.
5. Commit authored as the user is fine: `git -c user.name=sauceeegit -c user.email=chadyu246@gmail.com
   commit -m "…"`. End the working branch on `main`.
6. New images → convert to **WebP with ffmpeg** (installed), keep them small, put in `/public`.

## 5. Architecture map

**Routing** — `src/App.jsx` wraps everything in `<BgreenieProvider>` and defines routes:
`/` `LandingPage` · `/balcony-system` `ProductPage` · `/portable-system` · `/solar-panel` ·
`/rooftop-system` · `/about` · `/faqs` · `/checkout`.
Every page = `<Header/>` (sticky TopBar + nav) → `<main>` → `<Footer/>`, and most end with
`<ContactSection/>`.

**Nav** — links are **hard-coded** in `src/components/landing/LandingNav.jsx` (the `links` array). Edit
menu items there (the `landingNav` data export is dead/unused).

**Content/data (edit copy & options here):**
- `src/data/landing.js` — landing content + all FAQ sets (`landingFaqs`, `rooftopFaqs`, `panelFaqs`).
- `src/data/product.js` — the **balcony product, pricing, and configurator options** (see §6).
- `src/data/seo.js` — `SITE` (`https://solvio.solar`) + per-route `<head>` meta used by the prerender.

**Shared Bgreenie popup** — `src/context/BgreenieModal.jsx` exposes `BgreenieProvider` + `useBgreenie()`
(returns an `open()` fn). The nav "Bgreenie Membership" tab and the landing "Earn Solvio rewards → Learn
more" both call it → one shared modal linking to https://bgreenie.me/. Don't add a second popup.

**The 3D model embed** — `src/components/Gallery.jsx` builds the iframe URL
(`MODEL_URL = …/solvio-panel-3d/?v=<MODEL_VERSION>&embed=1`) and drives the model via `postMessage`
(`{type:'solvio-config', location, panel, modules}`). `?embed=1` makes the model hide its own
scene/panel-type toggles (the on-page configurator drives those). On mobile the model freezes below the
header and the panel counter floats into the model's bottom-right corner.

## 6. Pricing model (real numbers — do not "placeholder" these)

In `src/data/product.js`:
- Panels priced directly in THB via `panelOptions[].thb`: **White Feather ฿9,400**, **Dark Feather ฿10,500** per panel. `panelThb(id)` returns `.thb`.
- `INVERTER_THB = 11950` is added to **every** total in `computeConfig`:
  `total = base + INVERTER_THB + storage.price + cable.price`.
- Storage `price` = **add-on over the inverter** (No storage = 0; Venus A 2.12/4.24/6.36 =
  ฿57,050 / ฿108,050 / ฿158,050).
- The default 4×White-panel kit therefore = **฿49,550**. `PriceBox`, `StickyCartBar`, `SaveConfigModal`,
  and the Basic calculator (`SavingsCalculator.jsx`) all read `computeConfig`.
- Marketing copy is aligned to this: payback **5–7 yrs**, entry **from ฿30,750**, "฿79k / 10 yrs per
  4-panel kit". Keep any new copy consistent.

## 7. What is NOT wired up (UI-only / needs work)

- **Contact form** (`ContactSection.jsx`) posts to **Web3Forms → info@solvio.solar**, but needs a real
  **access key**: set env `VITE_WEB3FORMS_KEY` or replace `YOUR_WEB3FORMS_ACCESS_KEY` in the file (get
  it free at web3forms.com by verifying info@solvio.solar). Until then it shows an "email us directly"
  fallback — it never opens a mail client.
- **`/checkout`** (`CheckoutPage.jsx`) is a **demo**: hard-coded `DEMO_ITEMS`, no cart context, promo
  `WELCOME5` (5% off), VAT 7%, payment options are placeholders. **Nothing links to it yet** — it's
  reachable only by typing the URL. To make it real: add a cart context, wire "Add to cart"/"Buy"
  buttons to it, and integrate a payment provider. It also uses `usePageMeta('/')` (should get its own
  meta in `seo.js`).
- Other UI-only forms: `GuidePopup`, the calculators, `PriceBox`/`SaveConfigModal` email capture.
- Testimonials still use placeholder German cities + an invented review count (4.8★ · 1,294).
- Footer legal links (Imprint / Privacy / Terms) are `href="#"`.
- SEO: `scripts/prerender-meta.mjs` (runs in `npm run build`) injects correct per-route `<head>` meta +
  JSON-LD, but the visible **body is still client-rendered** — non-JS crawlers see only the splash.
  Real SSG of the body is an open item.

## 8. Gotchas

- **Vite dev server can serve stale modules** after edits — restart `npm run dev` if a change doesn't
  show.
- The 3D model is **cross-origin** (github.io) when embedded, so you can't inspect the iframe's DOM from
  the parent page; test the model standalone by opening `C:\dev\solvio-panel-3d\index.html` (add
  `?embed=1` to see the embedded variant; append `&t=<random>` to bust cache).
- Tailwind color token **`lime` is actually Solvio orange `#FF6700`** (historical name). `bg-lime`,
  `text-lime-dark` etc. are orange. `ink` is the dark green.
- FAQ pills: closed = light blue `#e6eaff`, open = white `#ffffff` (in `FAQ.jsx` and `FaqsPage.jsx`).
  `LandingFAQ.jsx` is a deliberately different design (border rows + "Show more").

## 9. Suggested first move when you get a task

1. `cd C:\dev\solvio-website && git pull --rebase origin main`
2. Find the relevant component (pages in `src/pages`, shared UI in `src/components`, copy/data in
   `src/data`). Search the repo rather than guessing.
3. Make the change, `npm run build`, then push to `main` (which deploys). If you touched the 3D model,
   follow rule #4 in §4.
