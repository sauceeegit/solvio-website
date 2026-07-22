// Single source of truth for per-route SEO meta.
// Used by BOTH the client-side usePageMeta hook and scripts/prerender-meta.mjs
// (a plain node script) — so keep this file free of vite-specific imports.

// Canonical origin for the live site (custom domain).
export const SITE = 'https://solvio.solar';

export const routeMeta = {
  '/': {
    title: 'Solvio | Rooftop, Balcony & Portable Solar in Thailand',
    description:
      'Solvio makes solar simple for every Thai home — plug-and-play balcony kits, rooftop systems and portable power stations. Transparent Baht pricing, free sizing advice.',
  },
  '/balcony-system': {
    title: 'Balcony Solar System — Plug-and-Play Kit, No Electrician | Solvio',
    description:
      'Configure your Solvio balcony solar kit in minutes: up to 1800 Wp, optional battery storage, tool-light setup in under 30 minutes. Live pricing in Thai Baht.',
  },
  '/portable-system': {
    title: 'Portable Power Stations & Foldable Solar Panels | Solvio',
    description:
      'Solvio portable power stations from 100 Wh to 2400 Wh plus foldable solar panels — clean power for camping, markets and off-grid weekends in Thailand.',
  },
  '/solar-panel': {
    title: 'Dark Feather 450 Wp Solar Panel — Glass-Glass, IP68 | Solvio',
    description:
      'Meet the Solvio Dark Feather solar module: 450 Wp, weatherproof glass-glass build and sleek all-black design for balconies and rooftops.',
  },
  '/rooftop-system': {
    title: 'Rooftop Solar for Thai Homes — Free Estimate | Solvio',
    description:
      'Power your whole home with a Solvio rooftop solar array. Free system sizing, transparent Baht pricing and app-based monitoring — get your estimate today.',
  },
  '/about': {
    title: 'About Solvio — Clean Energy for Every Thai Home',
    description:
      'Solvio makes solar simple in Thailand: rooftop systems for homeowners, plug-and-play balcony kits for renters, and portable power for the road. Meet the team behind the sun.',
  },
  '/faqs': {
    title: 'Solar FAQs — Rooftop, Balcony & Panel Questions | Solvio',
    description:
      'Answers to the most common questions about rooftop, balcony and portable solar in Thailand — costs, permits, warranties, installation and more.',
  },
};
