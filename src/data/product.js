// Single source of truth for the Solvio Balcony System product page.
// The configurator, price box and sticky cart bar all read from here.
import { asset } from '../lib/format';

export const MODULE_WP = 450;

export const product = {
  brand: 'Solvio',
  name: 'Balcony System',
  tagline: 'Plug-and-play balcony solar — turn your railing into a power plant.',
  rating: 4.8,
  reviewCount: 1294,
  // base price reflects the default config: 4 modules, balcony mount, no storage, no extra cable
  currency: '฿',
  images: [
    {
      src: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
      alt: 'Solar panels mounted on a sunny balcony railing',
    },
    {
      src: 'https://images.unsplash.com/photo-1545209463-e2825498edbf?auto=format&fit=crop&w=1200&q=80',
      alt: 'Close-up of monocrystalline solar cells',
    },
    {
      src: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=1200&q=80',
      alt: 'Rooftop solar installation at golden hour',
    },
    {
      src: 'https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&w=1200&q=80',
      alt: 'Solar array against a blue sky',
    },
    {
      src: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=1200&q=80',
      alt: 'Modern apartment balcony with greenery',
    },
  ],
  highlights: [
    'Tool-light setup in under 30 minutes',
    'Fits most railing and grid balconies',
    'Weatherproof glass-glass modules (IP68)',
  ],
};

// ---- Configurator options ---------------------------------------------------

export const locations = [
  { id: 'balcony', label: 'Balcony', sub: 'Railing & grid mount', icon: 'Building2' },
  { id: 'garden', label: 'Garden', sub: 'Steel ground frame', icon: 'Trees' },
  { id: 'flatroof', label: 'Flat roof', sub: 'Ballasted A-frame', icon: 'Home' },
  { id: 'facade', label: 'Facade', sub: 'Wall bracket set', icon: 'PanelTop' },
];

// Panels are priced per unit in USD and converted to THB.
export const USD_THB = 36.5; // USD → THB rate (adjust to your current rate)
export const panelOptions = [
  {
    id: 'white',
    label: 'White Feather',
    sub: 'Silver-frame',
    usd: 200,
    img: asset('/module-white.jpg'),
    wp: 450,
    dims: '1760 × 1130 × 4.75 mm',
    weight: '12.5 kg',
  },
  {
    id: 'dark',
    label: 'Dark Feather',
    sub: 'All-black',
    usd: 220,
    img: asset('/dark-feather-1800.jpg'),
    wp: 450,
    dims: '1760 × 1130 × 4.75 mm',
    weight: '12.5 kg',
  },
];
export const panelThb = (id) => {
  const p = panelOptions.find((o) => o.id === id) ?? panelOptions[0];
  return Math.round(p.usd * USD_THB);
};

// Storage lineup mirrors the reference configurator; euro prices ported to THB.
export const EUR_THB = 39; // EUR → THB rate (adjust to your current rate)
export const storageOptions = [
  {
    id: 'none',
    label: 'No storage',
    brand: '',
    name: 'No storage',
    img: asset('/storage-none.jpg'),
    specs: ['Feeds solar straight to the grid', 'Standard 800 W micro-inverter', 'Add a battery any time later'],
    wh: 0,
    expandable: false,
    price: 0,
  },
  {
    id: 'venus2',
    label: 'Solvio Venus A 2.12 kWh Battery',
    brand: 'Solvio',
    name: 'Venus A 2.12 kWh Battery',
    img: asset('/storage-venus2.jpg'),
    specs: ['4 MPPT inputs up to 2.4 kW', 'Integrated 1500 W inverter', 'Anti Feed-in Control'],
    wh: 2120,
    expandable: true,
    price: 19000,
  },
  {
    id: 'venus4',
    label: 'Solvio Venus A 4.24 kWh Battery',
    brand: 'Solvio',
    name: 'Venus A 4.24 kWh Battery',
    img: asset('/storage-venus4.jpg'),
    specs: ['4 MPPT inputs up to 2.4 kW', 'Integrated 1500 W inverter', 'Anti Feed-in Control'],
    wh: 4240,
    expandable: true,
    price: 31000,
  },
  {
    id: 'venus6',
    label: 'Solvio Venus A 6.36 kWh Battery',
    brand: 'Solvio',
    name: 'Venus A 6.36 kWh Battery',
    img: asset('/storage-venus6.jpg'),
    specs: ['4 MPPT inputs up to 2.4 kW', 'Integrated 1500 W inverter', 'Anti Feed-in Control'],
    wh: 6360,
    expandable: true,
    price: 35000,
  },
];

export const cableOptions = [
  { id: 'none', short: 'Without', label: 'Without AC cable', sub: 'Connect with your own cable', price: -700 },
  { id: '3m', short: '3 m', label: '3 m AC cable', sub: 'Standard — reaches a nearby socket', price: 0 },
  { id: '15m', short: '15 m', label: '15 m AC cable', sub: 'Route to a more distant outlet', price: 790 },
];

export const defaultConfig = {
  location: 'balcony',
  panel: 'white',
  modules: 4,
  storage: 'none',
  cable: '3m',
};

export function computeConfig(config) {
  const modules = config.modules;
  const panel = panelOptions.find((p) => p.id === config.panel) ?? panelOptions[0];
  const perPanel = panelThb(panel.id);
  const base = perPanel * modules;
  const storage = storageOptions.find((s) => s.id === config.storage) ?? storageOptions[0];
  const cable = cableOptions.find((c) => c.id === config.cable) ?? cableOptions[0];
  const location = locations.find((l) => l.id === config.location) ?? locations[0];
  const total = base + storage.price + cable.price;
  return {
    base,
    modules,
    panel,
    perPanel,
    wp: modules * panel.wp,
    storage,
    cable,
    location,
    total,
  };
}

// ---- Marketing data ---------------------------------------------------------

export const benefits = [
  { icon: 'RotateCcw', title: '30-day returns', sub: 'Changed your mind? Send it back, free.' },
  { icon: 'Truck', title: 'Ships in 5–7 days', sub: 'Tracked carbon-neutral delivery.' },
  { icon: 'PiggyBank', title: 'Save up to ฿8,000 / yr', sub: 'South-facing 1.8 kWp kit, power used at home.' },
  { icon: 'TrendingUp', title: '3–4 year payback', sub: 'Then it is pure free electricity.' },
  { icon: 'CreditCard', title: '0% financing', sub: 'Split into 24 interest-free payments.' },
  { icon: 'ShieldCheck', title: '30-year warranty', sub: 'On module performance & build.' },
];

export const payments = ['Visa', 'Mastercard', 'PayPal', 'Apple Pay', 'Klarna', 'SEPA'];

export const howItWorks = [
  {
    icon: 'Wrench',
    step: '01',
    title: 'Mount it',
    body: 'Hook the adjustable rails over your railing and tighten by hand. No drilling, no electrician.',
  },
  {
    icon: 'Plug',
    step: '02',
    title: 'Plug it in',
    body: 'Connect the modules to the micro-inverter, then plug the inverter into any outdoor socket.',
  },
  {
    icon: 'Sun',
    step: '03',
    title: 'Power up',
    body: 'Your kit starts feeding clean solar power into your home the moment the sun hits the glass.',
  },
  {
    icon: 'Smartphone',
    step: '04',
    title: 'Track it',
    body: 'Watch live output, savings and CO₂ avoided in the Solvio app — from anywhere.',
  },
];

export const spec = {
  model: 'Solvio QD-450',
  rows: [
    { label: 'Cell type', value: 'Monocrystalline N-type' },
    { label: 'Rated power', value: '450 Wp per module' },
    { label: 'Module efficiency', value: '22.4%' },
    { label: 'Construction', value: 'Glass-glass, frameless' },
    { label: 'Dimensions', value: '1760 × 1130 × 4.75 mm' },
    { label: 'Weight', value: '12.5 kg per module' },
    { label: 'Protection', value: 'IP68 junction box' },
    { label: 'Performance warranty', value: '30 years (87.4% output)' },
    { label: 'Temperature range', value: '−40 °C to +85 °C' },
  ],
};

export const included = [
  { name: '4 × 450 Wp solar module', sub: '1760 × 1130 mm glass-glass' },
  { name: '1 × M-800 micro-inverter', sub: '800 W, Wi-Fi enabled' },
  { name: '2 × Y-cable set', sub: 'Links two modules in parallel to one DC input' },
  { name: '4 × steel mounting bracket', sub: 'Adjustable tilt frame' },
  { name: '1 × mounting manual', sub: 'Illustrated, step by step' },
  { name: '2 × DC extension cable — 1 m', sub: 'Connects your modules to the inverter / storage' },
  { name: '4 × DC extension cable — 2 m', sub: 'Links your modules to the inverter / storage' },
  { name: '2 × inverter bracket', sub: 'Fixes the inverter to the module frame' },
];

export const comparison = {
  columns: ['Balcony Duo', 'Balcony System', 'Balcony Max'],
  highlightIndex: 1,
  rows: [
    { label: 'Modules', values: ['2 × 450 Wp', '4 × 450 Wp', '6 × 450 Wp'] },
    { label: 'Peak power', values: ['900 Wp', '1800 Wp', '2700 Wp'] },
    { label: 'Yearly yield*', values: ['~860 kWh', '~1720 kWh', '~2580 kWh'] },
    { label: 'Best for', values: ['Singles & couples', 'Small families', 'High usage'] },
    { label: 'Plug & play', values: [true, true, true] },
    { label: 'From', values: ['฿12,990', '฿27,990', '฿39,990'] },
  ],
};

export const related = [
  {
    name: '4 mm² DC extension — 3 m',
    price: 490,
    img: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: '6 mm² DC extension — 5 m',
    price: 690,
    img: 'https://images.unsplash.com/photo-1601275276836-3e8d9b6f3a0e?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Solvio Core 800 battery',
    price: 21900,
    img: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Tilt frame — 15° set',
    price: 1490,
    img: 'https://images.unsplash.com/photo-1566093097221-ac2335b09e70?auto=format&fit=crop&w=600&q=80',
  },
];

export const testimonials = [
  { name: 'Nok S.', city: 'Bangkok', rating: 5, text: 'Mounted it on my third-floor railing in 25 minutes by myself. The app showed power flowing before I’d even put the ladder away.' },
  { name: 'Tobias K.', city: 'Phuket', rating: 5, text: 'First full month logged 168 kWh. My electricity bill dropped noticeably and the glass-glass panels look genuinely premium.' },
  { name: 'Priya S.', city: 'Chiang Mai', rating: 5, text: 'I rent, so no-drill was essential. The hooks clamp tight and nothing touches the building. Landlord had zero objections.' },
  { name: 'Marco B.', city: 'Pattaya', rating: 4, text: 'Setup was painless. Took off one star only because I wish the longer AC cable came in the box by default.' },
  { name: 'Ploy T.', city: 'Hua Hin', rating: 5, text: 'Pairing the Core 1600 battery means we run the fridge and router straight through the evening on yesterday’s sun.' },
  { name: 'Somchai P.', city: 'Krabi', rating: 5, text: 'Support walked me through registration on a Sunday. 920 kWh in my first year — paying for itself faster than promised.' },
];

export const faqs = [
  {
    q: 'Do I need an electrician to install it?',
    a: 'No. The Balcony System is a plug-and-play kit. You mount the rails by hand and plug the inverter into a standard outdoor socket. Registration with your grid operator is a simple online form we walk you through.',
  },
  {
    q: 'Will it fit my balcony?',
    a: 'The telescopic rails adjust to most railing and grid balconies between 60 mm and 130 mm bar spacing. Garden, flat-roof and facade mounting kits are available in the configurator above.',
  },
  {
    q: 'How much can I actually save?',
    a: 'A south-facing 1.8 kWp kit generates roughly 2,700 kWh per year in Thailand. With about two-thirds of that used at home (more with a battery), that is around ฿7,000–฿8,000 of avoided electricity a year, paying the kit back in 3–4 years.',
  },
  {
    q: 'What happens on cloudy days or at night?',
    a: 'The modules still produce on overcast days, just less. At night, add a Solvio Core battery to store the day’s surplus and run your essentials after sunset.',
  },
  {
    q: 'Is it weatherproof?',
    a: 'Yes. The glass-glass modules carry an IP68 junction box and are rated from −40 °C to +85 °C, tested against hail, wind and salt-mist. Everything outdoors is UV-stable.',
  },
  {
    q: 'What is covered by the warranty?',
    a: 'Modules carry a 30-year performance warranty (87.4% output at year 30) and a 15-year product warranty. The micro-inverter is covered for 12 years.',
  },
];

// ---- Savings calculator defaults -------------------------------------------

export const calculatorDefaults = {
  orientationFactor: 1.0, // south
  household: 3500, // kWh / year
  rate: 4.5, // ฿ / kWh
};

export const orientations = [
  { id: 'south', label: 'South', factor: 1.0 },
  { id: 'eastwest', label: 'East / West', factor: 0.82 },
  { id: 'shaded', label: 'Partly shaded', factor: 0.62 },
];
