import { useState } from 'react';
import { Building2, Layers, Home } from 'lucide-react';
import { asset } from '../lib/format';
import Reveal from './Reveal';

const TABS = ['Balcony & Facade'];

const ALL_CARDS = [
  {
    icon: Building2,
    title: 'Balcony Installation',
    body: 'Perfect for apartments and urban living. Generate clean electricity without modifying your roof.',
    img: asset('/sp-balcony.webp'),
    alt: 'Black solar panels on a modern apartment balcony railing',
    tabs: ['Balcony & Facade'],
  },
  {
    icon: Layers,
    title: 'Facade Installation',
    body: 'Turn unused wall space into energy. The all-black design integrates beautifully into contemporary architecture.',
    img: asset('/sp-facade.webp'),
    alt: 'Solvio Black Feather panels on a building facade',
    tabs: ['Balcony & Facade'],
  },
  {
    icon: Home,
    title: 'Lightweight Roof Installation',
    body: 'When every kilogram matters. At only 6 kg/m², The Black Feather is engineered for lightweight structures.',
    img: asset('/rooftop-feature.webp'),
    alt: 'Solvio Black Feather panels on a lightweight residential roof',
    tabs: ['Balcony & Facade', 'Lightweight Roof'],
  },
];

// ── SVG Energy Chart ────────────────────────────────────────────────────────
// viewBox: 1000 × 300
const W = 1000, H = 300, PL = 14, PR = 14, PT = 16, PB = 44;
const PW = W - PL - PR, PH = H - PT - PB;
const x = (h) => PL + (h / 24) * PW;
const y = (f) => PT + PH * (1 - f);

// Solar bell: 0 at ~6am, peaks at noon (~72% height), back to 0 at ~18:30
const SOLAR =
  `M ${x(0)},${y(0)}` +
  ` C ${x(5)},${y(0)} ${x(6.5)},${y(0.03)} ${x(7.5)},${y(0.14)}` +
  ` C ${x(9.5)},${y(0.52)} ${x(11)},${y(0.7)} ${x(12)},${y(0.72)}` +
  ` C ${x(13)},${y(0.7)} ${x(14.5)},${y(0.52)} ${x(16.5)},${y(0.14)}` +
  ` C ${x(17.5)},${y(0.03)} ${x(19)},${y(0)} ${x(24)},${y(0)}`;

// Household: base ~12%, morning bump ~8 (peak 48%), midday dip ~12 (26%), evening peak ~20 (88%), falls
const HOUSE =
  `M ${x(0)},${y(0.12)}` +
  ` C ${x(2)},${y(0.10)} ${x(5)},${y(0.11)} ${x(6.5)},${y(0.18)}` +
  ` C ${x(7.2)},${y(0.30)} ${x(7.6)},${y(0.44)} ${x(8)},${y(0.48)}` +
  ` C ${x(9)},${y(0.34)} ${x(10.5)},${y(0.26)} ${x(12)},${y(0.26)}` +
  ` C ${x(13.5)},${y(0.26)} ${x(15)},${y(0.30)} ${x(17)},${y(0.44)}` +
  ` C ${x(18.5)},${y(0.70)} ${x(19.5)},${y(0.88)} ${x(20.5)},${y(0.88)}` +
  ` C ${x(22)},${y(0.88)} ${x(23)},${y(0.65)} ${x(24)},${y(0.40)}`;

// Grey fill under the whole household curve (total consumption footprint)
const HOUSE_FILL =
  HOUSE +
  ` L ${x(24)},${y(0)} L ${x(0)},${y(0)} Z`;

// Orange fill: where solar > household (roughly 9am → 16pm, between the two curves)
const SELF_FILL =
  `M ${x(9)},${y(0.26)}` +
  ` C ${x(10)},${y(0.52)} ${x(11)},${y(0.70)} ${x(12)},${y(0.72)}` +
  ` C ${x(13)},${y(0.70)} ${x(14.5)},${y(0.52)} ${x(16)},${y(0.26)}` +
  // back along household
  ` C ${x(14.5)},${y(0.30)} ${x(13.5)},${y(0.26)} ${x(12)},${y(0.26)}` +
  ` C ${x(10.5)},${y(0.26)} ${x(9.5)},${y(0.30)} ${x(9)},${y(0.26)} Z`;

const HOURS = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24];

function EnergyChart() {
  return (
    <div className="mt-12 hidden overflow-hidden rounded-2xl border border-ink/[0.07] bg-white shadow-soft sm:block">
      <img
        src={asset('/solar-energy-chart.png')}
        alt="Solar energy production vs household consumption over 24 hours"
        className="w-full"
      />
    </div>
  );
}

export default function SolarYourWay() {
  const [tab, setTab] = useState(TABS[0]);
  const cards = ALL_CARDS.filter((c) => c.tabs.includes(tab));

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container-x">
        {/* Heading */}
        <Reveal>
          <div className="text-center">
            <h2 className="font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
              Solar. Your way.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-ink/65">
              Choose how you bring clean energy into your home. Whether on your balcony, facade
              or lightweight roof, Solvio makes premium solar possible where conventional panels simply don&apos;t fit.
            </p>
          </div>
        </Reveal>


        {/* Installation cards — 3-col when all 3 visible, 1-col for single */}
        <div className={`mt-10 grid gap-6 ${
          cards.length === 3 ? 'sm:grid-cols-3' :
          cards.length === 2 ? 'sm:grid-cols-2' :
          'max-w-md mx-auto'
        }`}>
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.07}>
              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-lime">
                    <c.icon size={20} className="text-white" strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="font-display text-[1.05rem] font-extrabold text-ink">{c.title}</h3>
                    <p className="mt-1 text-[13px] leading-relaxed text-ink/60">{c.body}</p>
                  </div>
                </div>
                <div className="aspect-[4/3] overflow-hidden rounded-xl bg-surface">
                  <img
                    src={c.img}
                    alt={c.alt}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Energy chart */}
        <Reveal delay={0.1}>
          <EnergyChart />
        </Reveal>
      </div>
    </section>
  );
}
