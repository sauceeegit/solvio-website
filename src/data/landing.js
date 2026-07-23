// Content for the Solvio main landing page (modeled on the supplied concept layout).
import { asset } from '../lib/format';

export const topBar = {
  phone: '+66 84 348 8428',
  cta: 'Book a consultation appointment',
};

export const landingNav = [
  { label: 'Balcony Solar', to: '/balcony-system' },
  { label: 'Portable Solar', to: '/portable-system' },
  { label: 'Solar Panel', to: '/solar-panel' },
];

// Full-bleed looping videos (served from /public).
export const solarPanelVideo = asset('/solar-panel-loop.mp4');
export const rooftopVideo = asset('/rooftop-loop.mp4');

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
    sub: 'For Homeowner',
    blurb: 'Power your whole home with a rooftop array — get a free estimate now.',
    img: asset('/rooftop-solar.jpg'),
    imgClass: 'brightness-110',
    to: '/rooftop-system',
  },
  {
    id: 'balcony',
    title: 'Balcony Solar',
    sub: 'For Renter',
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
    price: 35900,
    img: asset('/white-feather-900.jpg'),
    fit: 'contain',
    bg: '#F84F01',
    specs: [
      '2 solar modules of 450 W each, 900 Wp',
      'Determine the assembly location yourself',
      'Expandable Solvio Venus A storage, 2.12–6.36 kWh',
    ],
  },
  {
    id: 'dark-900',
    name: 'Dark Feather 900W',
    subtitle: 'Duo set with inverter and smart meter',
    price: 37990,
    featured: true,
    img: asset('/dark-feather-900.jpg'),
    fit: 'contain',
    bg: '#FB5804',
    specs: [
      '2 solar modules of 450 W each, 900 Wp',
      'Determine the assembly location yourself',
      'Expandable Solvio Venus A storage, 2.12–6.36 kWh',
    ],
  },
  {
    id: 'dark-1800',
    name: 'Dark Feather 1800W',
    subtitle: 'Quattro set with battery, inverter and smart meter',
    price: 93900,
    img: asset('/dark-feather-1800.jpg'),
    fit: 'contain',
    bg: '#FA4700',
    specs: [
      '4 solar modules of 450 W each, 1800 Wp',
      'Determine the assembly location yourself',
      'Expandable Solvio Venus A storage, 2.12–6.36 kWh',
    ],
  },
];

export const founder = {
  heading: 'Solar in Thailand. Why Now?',
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
    q: 'How much does solar cost in Thailand?',
    a: 'Balcony kits start at ฿30,750 plug-and-play (2 panels + inverter); full rooftop systems are sized to your home and priced transparently in Baht after a free assessment. No hidden fees.',
  },
  {
    q: 'How fast does it pay for itself?',
    a: 'Both balcony kits and full rooftop installations typically pay back in about 5–7 years, depending on your usage and orientation. After that, the electricity is essentially free for decades — panels carry a 30-year performance warranty.',
  },
  {
    q: 'Rooftop or balcony — which is right for me?',
    a: 'Balcony is the fast start: plug-and-play from ฿30,750, no permits, no electrician, and it moves with you — ideal for condos, renters and smaller bills. Rooftop is the full solution: sized to your roof, it can cover most of your home’s usage for the biggest long-term savings. Own your roof and want maximum impact? Go rooftop. Want solar today with zero hassle? Start with balcony — you can always add rooftop later.',
  },
  {
    q: 'Do I need permission to install solar?',
    a: 'Balcony and portable kits plug straight in — no permits needed. For rooftop systems that feed the grid, MEA/PEA registration is required, and we handle the paperwork for you.',
  },
  {
    q: 'I rent / live in a condo. Can I still use solar?',
    a: 'Yes — that is exactly what the balcony kit is for. It clamps on without drilling, nothing touches the building, and it moves with you when you relocate.',
  },
  {
    q: 'What happens during rainy season?',
    a: 'Panels still generate on overcast days, just less. Over a full Thai year the sunshine more than compensates — and a battery stores daytime surplus for evenings.',
  },
  {
    q: 'Will the panels survive Thai heat and storms?',
    a: 'The glass-glass modules are IP68 weatherproof and rated for high heat, heavy rain and coastal air.',
  },
  {
    q: 'What maintenance is needed?',
    a: 'Almost none. An occasional rinse to clear dust, and the app flags anything unusual. Panels have no moving parts.',
  },
];

// Solar Panel page FAQ — panel/cell technology questions.
export const panelFaqs = [
  {
    q: 'What kind of solar cells do Solvio panels use?',
    a: 'Solvio panels are built with N-type monocrystalline cells — the newest generation of silicon cell technology. Compared to the older P-type panels still common in budget systems, N-type cells degrade more slowly, perform better in heat, and produce more power in low light like mornings, evenings, and cloudy days.',
  },
  {
    q: 'Why do the panels look completely black with no visible grid lines?',
    a: 'The all-black cells, black encapsulation, and ultra-fine wiring create a clean, uniform surface that blends into modern balconies and facades instead of shouting "solar panel." Your neighbors — and your landlord — will appreciate it.',
  },
  {
    q: 'How thin and light are the panels?',
    a: 'The glass-glass laminate is just 4.75 mm thin — a conventional framed rooftop panel is around 30 mm. At roughly half the weight of a standard 21 kg rooftop module, a Solvio panel is easy for two people to lift, hang, and reposition. That is what makes balcony mounting practical and safe.',
  },
  {
    q: 'Are the panels durable enough for outdoor balcony use?',
    a: 'Yes. The dual-glass construction sandwiches the cells between two layers of tempered, anti-reflective glass, which resists micro-cracks, scratches, and moisture far better than plastic-backed panels. The panels are rated for wind loads of 2,400 Pa and operate reliably from -40°C to +85°C (-40°F to +185°F).',
  },
  {
    q: 'What happens to output on hot summer days?',
    a: 'All solar panels lose some output as they heat up. Solvio panels have a temperature coefficient of -0.29%/°C — matching the best N-type modules on the market — so they hold onto more of their rated power during heat waves, exactly when your air conditioning needs it.',
  },
];

// Rooftop System page FAQ — residential/commercial rooftop questions.
// NOTE: the "[X]" figures in the source copy were filled with sensible defaults
// (process 2–4 weeks; panels 25-yr, inverter 10-yr, workmanship 2-yr). Adjust
// these to Solvio's actual terms.
export const rooftopFaqs = [
  {
    q: 'Is my roof suitable for solar panels?',
    a: 'Most roofs in Thailand are. The main factors are orientation (south, east, or west-facing roofs all work well here), shading from trees or neighboring buildings, and the structural condition of the roof. During our free site survey, we assess all three and tell you honestly whether solar makes sense for your home — and if it doesn’t, we’ll tell you that too.',
  },
  {
    q: 'How long does the whole process take?',
    a: 'From signed contract to switch-on, usually 2–4 weeks. The physical installation takes only 1–3 days for most homes — the rest is permitting and the PEA/MEA meter and connection process, which we handle for you.',
  },
  {
    q: 'Do I have to pay everything upfront?',
    a: 'No. You can pay in full, split the cost into installments with us, or finance the system through one of our partner banks. Many customers find their monthly loan payment is close to what they’re already saving on electricity.',
  },
  {
    q: 'Do I need permission to install solar on my roof?',
    a: 'Yes — residential rooftop systems in Thailand require registration with the ERC and an interconnection application with PEA (or MEA in Bangkok). The good news: Solvio handles all of this paperwork for you as part of every installation.',
  },
  {
    q: 'Can I sell excess electricity back to the grid?',
    a: 'If you join the government’s rooftop solar buyback program, PEA/MEA will purchase your surplus at the official rate. We’ll advise whether it’s worthwhile for your usage pattern and handle the sign-up if you choose it. Note that program terms are set by the ERC and can change from year to year.',
  },
  {
    q: 'Will the installation damage my roof?',
    a: 'No — our certified technicians use mounting systems designed for Thai roof types (concrete tile, CPAC, metal sheet) with proper waterproofing at every anchor point. Roof penetrations are sealed and covered by our workmanship warranty.',
  },
  {
    q: 'What warranties do I get?',
    a: 'Panels typically carry a 25-year performance warranty, inverters 10 years, and our own workmanship is covered for 2 years. You receive all warranty documents at handover, and warranty claims go through us — you never have to chase a manufacturer yourself.',
  },
];

// "Why shop at the Solvio official store" — bento grid: index 0 is the tall
// (row-span-2) feature cell, index 5 is the wide (col-span-2) feature cell.
export const whyShop = [
  { icon: 'Coins', title: 'Earn Solvio rewards', img: asset('/earn-rewards.jpg') },
  { icon: 'PiggyBank', title: 'Own Solar Today. Pay Over Time.', sub: '0% interest, up to 12 months' },
  { icon: 'Headphones', title: 'Real Experts. Whenever You Need Them.', sub: 'Lifetime support from people who know solar' },
  { icon: 'RotateCcw', title: 'Not Happy? Send It Back.', sub: '30-day returns, no questions asked' },
  { icon: 'ShieldCheck', title: 'Built to Last. Backed by Warranty.', sub: '5-year comprehensive coverage included' },
  { icon: 'Package', title: 'Everything Included. Nothing Missing.', sub: 'Complete kits with fully matched components' },
  { icon: 'Truck', title: 'Delivered Fast. Installed Even Faster.', sub: 'At your door in 3–5 business days' },
  { icon: 'CreditCard', title: 'Pay Your Way. Securely.', sub: 'Card, bank transfer or PromptPay' },
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
  { desktop: asset('/portable-header-4.jpg'), mobile: asset('/portable-header-m4.jpg') },
];

// Capacities/prices are placeholders — adjust to the real specs.
export const portableBatteries = [
  { id: 'd100', name: 'Solvio D100', capacity: '100 Wh', price: 6990, img: asset('/portable-100.jpg'), sideImg: asset('/portable-100-side.jpg') },
  { id: 'd150', name: 'Solvio D150', capacity: '150 Wh', price: 8300, img: asset('/portable-200.jpg'), sideImg: asset('/portable-200-side.jpg') },
  { id: 'd300', name: 'Solvio D300', capacity: '300 Wh', price: 12200, img: asset('/portable-400.jpg'), sideImg: asset('/portable-400-side.jpg'), imgScale: 'scale-110' },
  { id: 'd600', name: 'Solvio D600', capacity: '600 Wh', price: 20000, img: asset('/portable-600.jpg'), sideImg: asset('/portable-600-side.jpg') },
  { id: 'd1200', name: 'Solvio D1200', capacity: '1200 Wh', price: 36000, img: asset('/portable-1200.jpg'), sideImg: asset('/portable-1200-side.jpg') },
  { id: 'd2400', name: 'Solvio D2400', capacity: '2400 Wh', price: 64900, img: asset('/portable-2400.jpg'), sideImg: asset('/portable-2400-side.jpg') },
];

// Portable foldable solar panels. Prices in Thai Baht (฿).
export const portablePanels = [
  { id: 'p60', name: '60W', watt: '60 W', price: 5000, img: asset('/w1.webp'), imgClass: 'scale-[0.6375] group-hover:scale-[0.67]' },
  { id: 'p120', name: '120W', watt: '120 W', price: 7500, img: asset('/w1.webp'), imgClass: 'scale-75 group-hover:scale-[0.79]' },
  { id: 'p200', name: '200W', watt: '200 W', price: 14000, img: asset('/w2.webp') },
  { id: 'p400', name: '400W', watt: '400 W', price: 30000, img: asset('/w3.webp') },
];
