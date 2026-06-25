// Content for the Solvio main landing page (modeled on the supplied concept layout).
import { asset } from '../lib/format';

export const topBar = {
  phone: '+66 84 348 8428',
  cta: 'Book a consultation appointment',
};

export const landingNav = [
  { label: 'Rooftop System', href: '#categories' },
  { label: 'Balcony System', to: '/balcony-system' },
  { label: 'Portable System', to: '/portable-system' },
];

export const hero = {
  // Looping hero video (served from /public).
  videoSrc: asset('/hero-loop.mp4'),
  poster:
    'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1600&q=80',
  caption: 'Clean energy for every Thai home',
};

export const categories = [
  {
    id: 'rooftop',
    title: 'Rooftop Solar',
    blurb: 'Power your whole home with a rooftop array — get a free estimate now.',
    img: asset('/rooftop-solar.jpg'),
    imgClass: 'brightness-110',
    to: '#bestsellers',
  },
  {
    id: 'balcony',
    title: 'Balcony Solar',
    blurb: 'Configure your complete plug-and-play balcony solar set in minutes.',
    img: asset('/balcony-power-plants.jpg'),
    imgClass: 'object-[28%_center]',
    to: '/balcony-system',
  },
  {
    id: 'portable',
    title: 'Portable Solar',
    blurb: 'Take solar with you anywhere — camping, markets, off-grid weekends.',
    img: asset('/portable-systems.jpg'),
    imgClass: 'brightness-[.82] saturate-[.82]',
    to: '/portable-system',
  },
];

// Prices shown in Thai Baht (฿).
export const bestsellers = [
  {
    id: 'white-900',
    name: 'White Feather 900W',
    subtitle: 'Duo set with inverter and smart meter',
    price: 12990,
    img: asset('/white-feather-900.jpg'),
    fit: 'contain',
    bg: '#F84F01',
    specs: [
      '2 solar modules of 450 W each, 900 Wp',
      'Determine the assembly location yourself',
      'Flexibly expandable storage 2.4–9.6 kWh',
    ],
  },
  {
    id: 'dark-900',
    name: 'Dark Feather 900W',
    subtitle: 'Duo set with inverter and smart meter',
    price: 14990,
    featured: true,
    img: asset('/dark-feather-900.jpg'),
    fit: 'contain',
    bg: '#FB5804',
    specs: [
      '4 solar modules of 450 W each, 1800 Wp',
      'Determine the assembly location yourself',
      'Flexibly expandable storage 2.4–9.6 kWh',
    ],
  },
  {
    id: 'dark-1800',
    name: 'Dark Feather 1800W',
    subtitle: 'Quattro set with battery, inverter and smart meter',
    price: 27990,
    img: asset('/dark-feather-1800.jpg'),
    fit: 'contain',
    bg: '#FA4700',
    specs: [
      '4 solar modules of 450 W each, 1800 Wp',
      'Determine the assembly location yourself',
      'Flexibly expandable storage 3.84–23.04 kWh',
    ],
  },
];

export const founder = {
  heading: 'Why 2026 is the year to go solar in Thailand',
  body:
    'Here is our founder David Spence interviewed on the prospects of solar in Thailand — and why we think Solvio is the best partner for your energy transition.',
  cta: 'See more videos',
  // Paste a YouTube embed URL here to go live (e.g. https://www.youtube.com/embed/VIDEO_ID).
  youtubeEmbed: 'https://www.youtube.com/embed/KJ7ffvduQ_U',
  // Real thumbnail for the embedded YouTube video.
  poster: 'https://img.youtube.com/vi/KJ7ffvduQ_U/maxresdefault.jpg',
};

export const landingFaqs = [
  {
    q: 'About Solvio',
    a: 'Solvio makes clean solar power simple for everyone in Thailand — from a single balcony panel to a full rooftop array. We design, supply and support every kit so you can switch to solar without the usual hassle.',
  },
  {
    q: 'Our promise: everything from one source',
    a: 'Panels, inverters, batteries, mounting and support all come from Solvio. One partner, one warranty, one point of contact — no juggling suppliers or mismatched parts.',
  },
  {
    q: 'What we offer you for your energy transition',
    a: 'Free system sizing, transparent Baht pricing, plug-and-play installation, app-based monitoring and flexible financing. We make the path from quote to clean power short and clear.',
  },
  {
    q: 'Our services',
    a: 'Consultation and site assessment, supply of certified equipment, installation guidance, grid-registration help, and ongoing performance support for the life of your system.',
  },
  {
    q: 'What subsidies can I use at Solvio?',
    a: 'Our advisors keep up to date with the latest Thai net-metering schemes and local incentives, and will tell you exactly which apply to your address during your free consultation.',
  },
];

// "Why shop at the Solvio official store" — bento grid: index 0 is the tall
// (row-span-2) feature cell, index 5 is the wide (col-span-2) feature cell.
export const whyShop = [
  { icon: 'Coins', title: 'Earn Solvio rewards', img: asset('/earn-rewards.jpg') },
  { icon: 'CreditCard', title: 'Convenient installment plans' },
  { icon: 'Headphones', title: 'Lifetime customer support' },
  { icon: 'RotateCcw', title: '30-day returns' },
  { icon: 'ShieldCheck', title: 'Warranty protection' },
  { icon: 'Package', title: 'Comprehensive balcony solar solutions' },
  { icon: 'Truck', title: 'Fast shipping' },
  { icon: 'CreditCard', title: 'Secure multiple payments' },
];

// "Become part of Solvio" — 3 membership / community cards.
export const community = [
  {
    icon: 'UserPlus',
    title: 'Become a member',
    sub: 'Earn Solvio credits on every purchase and upgrade to PLUS for bigger rewards.',
    cta: 'Join free',
  },
  {
    icon: 'Share2',
    title: 'Refer a friend',
    sub: 'Give friends 10% off their first kit and get 5% cash back on every referral.',
    cta: 'Share your link',
  },
  {
    icon: 'Briefcase',
    title: 'Partner with us',
    sub: 'Installers and resellers: join the Solvio partner network and grow with solar.',
    cta: 'Become a partner',
  },
];

// Portable System page — looping header banners + portable battery products.
export const portableHeaderSlides = [
  { desktop: asset('/portable-header-1.jpg'), mobile: asset('/portable-header-m1.jpg') },
  { desktop: asset('/portable-header-2.jpg'), mobile: asset('/portable-header-m2.jpg') },
  { desktop: asset('/portable-header-3.jpg'), mobile: asset('/portable-header-m3.jpg') },
];

// Capacities/prices are placeholders — adjust to the real specs.
export const portableBatteries = [
  { id: 'd100', name: 'Solvio D100', capacity: '100 Wh', price: 3990, img: asset('/portable-100.jpg') },
  { id: 'd200', name: 'Solvio D200', capacity: '200 Wh', price: 5990, img: asset('/portable-200.jpg') },
  { id: 'd400', name: 'Solvio D400', capacity: '400 Wh', price: 9990, img: asset('/portable-400.jpg') },
  { id: 'd600', name: 'Solvio D600', capacity: '600 Wh', price: 14990, img: asset('/portable-600.jpg') },
  { id: 'd1200', name: 'Solvio D1200', capacity: '1200 Wh', price: 26990, img: asset('/portable-1200.jpg') },
];
