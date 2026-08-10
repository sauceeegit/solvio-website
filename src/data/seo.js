// Single source of truth for per-route SEO meta.
// Used by BOTH the client-side usePageMeta hook and scripts/prerender-meta.mjs
// (a plain node script) — so keep this file free of vite-specific imports.
//
// Location keywords: "Phuket" belongs in titles for the pages where we actually
// sell locally (home, rooftop, balcony, about) — the local competitors all rank
// with city-rich titles. The portable/panel product pages ship nationwide, so
// they say "Thailand" instead. Don't put Phuket in all nine — that reads as
// stuffing and dilutes the pages where it's true.

// Canonical origin for the live site (custom domain).
export const SITE = 'https://solvio.solar';

export const routeMeta = {
  '/': {
    title: 'Solar Phuket & Thailand — Rooftop, Balcony, Portable | Solvio',
    description:
      'Solvio makes solar simple for every Thai home — plug-and-play balcony kits, rooftop systems and portable power stations. Based in Phuket. Transparent Baht pricing, free sizing advice.',
  },
  '/balcony-system': {
    title: 'Balcony Solar Kit Thailand — Plug and Play, No Electrician | Solvio',
    description:
      'Configure your Solvio balcony solar kit in minutes: up to 1800 Wp, optional battery storage, tool-light setup in under 30 minutes. Live pricing in Thai Baht, delivered across Thailand.',
  },
  '/portable-system': {
    title: 'Portable Power Stations & Foldable Solar Panels | Solvio',
    description:
      'Solvio portable power stations with 100 W to 2,400 W output and 76.8 Wh to 2,160 Wh LiFePO₄ batteries, plus foldable solar panels for Thailand.',
  },
  '/portable-system/d100': {
    title: 'Solvio D100 Portable Power Station — Product Details | Solvio',
    description:
      'Explore the compact Solvio D100 portable power station, including its 100 Wh capacity, visible connection options and portable design.',
  },
  '/portable-system/panel': {
    title: 'Solvio 60W Portable Solar Panel — Product Details | Solvio',
    description:
      'Explore Solvio foldable portable solar panels from 60 W to 400 W, with model-specific pricing, imagery and technical information.',
  },
  '/solar-panel': {
    title: 'Dark Feather 450 Wp Solar Panel — Glass-Glass, IP68 | Solvio',
    description:
      'Meet the Solvio Dark Feather solar module: 450 Wp, weatherproof glass-glass build and sleek all-black design for balconies and rooftops.',
  },
  '/rooftop-system': {
    title: 'Rooftop Solar Installation Phuket — Free Estimate | Solvio',
    description:
      'Power your whole home with a Solvio rooftop solar array, installed in Phuket and across Thailand. Free system sizing, transparent Baht pricing and app-based monitoring — get your estimate today.',
  },
  '/about': {
    title: 'About Solvio — Solar Company in Phuket, Thailand',
    description:
      'Solvio makes solar simple in Thailand: rooftop systems for homeowners, plug-and-play balcony kits for renters, and portable power for the road. Meet the Phuket team behind the sun.',
  },
  '/projects': {
    title: 'Solar Projects — Rooftop, Facade, Curved Roof & BIPV | Solvio',
    description:
      'Reference solar installations behind Solvio technology: 68 MW steel-plant PV, curved granary and coal-shed roofs, building facades, BIPV greenhouses, hospital walkways and solar street lighting.',
  },
  '/faqs': {
    title: 'Solar FAQs Thailand — Rooftop, Balcony & Panel Questions | Solvio',
    description:
      'Answers to the most common questions about rooftop, balcony and portable solar in Thailand — costs, permits, warranties, installation and more.',
  },
  // Demo-only checkout: hard-coded cart, no backend, nothing links to it.
  // Given its own meta so it stops inheriting the homepage's, and noindex'd so a
  // stray crawl can't surface a fake order page. NOT in sitemap.xml — deliberately.
  // Note: do NOT also disallow /checkout in robots.txt. Blocking the crawl would
  // stop Google from ever reading this noindex, which is the opposite of the goal.
  '/checkout': {
    title: 'Checkout | Solvio',
    description: 'Solvio checkout.',
    noindex: true,
  },
};
