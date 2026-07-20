import { useState } from 'react';
import { Building2, Layers, Home } from 'lucide-react';
import { asset } from '../lib/format';
import Reveal from './Reveal';

const TABS = ['Balcony & Facade', 'Lightweight Roof'];

const ALL_CARDS = [
  {
    icon: Building2,
    title: 'Balcony Installation',
    body: 'Perfect for apartments and urban living. Generate clean electricity without modifying your roof.',
    img: asset('/balcony-power-plants.jpg'),
    alt: 'Black solar panels on a modern apartment balcony railing',
    tabs: ['Balcony & Facade'],
  },
  {
    icon: Layers,
    title: 'Facade Installation',
    body: 'Turn unused wall space into energy. The all-black design integrates beautifully into contemporary architecture.',
    img: asset('/sp-feature-2.webp'),
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
    <div className="mt-12 overflow-hidden rounded-2xl border border-ink/[0.07] bg-white shadow-soft">
      {/* Legend */}
      <div className="flex flex-wrap gap-x-7 gap-y-2 border-b border-ink/[0.07] px-6 py-4 text-[13px] text-ink/70">
        <span className="flex items-center gap-2.5">
          <span className="inline-block h-[3px] w-7 rounded-full bg-lime" />
          Solar Energy Production
        </span>
        <span className="flex items-center gap-2.5">
          <span className="inline-block h-[3px] w-7 rounded-full bg-ink/50" />
          Household Energy Consumption
        </span>
        <span className="flex items-center gap-2.5">
          <span
            className="inline-block h-[3px] w-7"
            style={{ background: 'repeating-linear-gradient(90deg,#FF6700 0,#FF6700 5px,transparent 5px,transparent 9px)' }}
          />
          Self-generated solar energy
        </span>
        <span className="flex items-center gap-2.5">
          <span className="inline-block h-[3px] w-7 rounded-full bg-ink/15" />
          Less electricity purchased from the grid
        </span>
      </div>

      <div className="px-4 pb-2 pt-4">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full"
          aria-label="Solar energy production vs household consumption over 24 hours"
        >
          <defs>
            <marker id="arrowhead" markerWidth="7" markerHeight="7" refX="4" refY="3.5" orient="auto">
              <path d="M0,0 L7,3.5 L0,7 Z" fill="#555" />
            </marker>
          </defs>

          {/* Grey fill — total household consumption area */}
          <path d={HOUSE_FILL} fill="#e0e0e0" fillOpacity="0.55" />

          {/* Orange fill — self-generated solar (where solar > household) */}
          <path d={SELF_FILL} fill="#FF6700" fillOpacity="0.18" />

          {/* Household consumption line */}
          <path d={HOUSE} fill="none" stroke="#444" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

          {/* Solar production line */}
          <path d={SOLAR} fill="none" stroke="#FF6700" strokeWidth="3.5" strokeLinecap="round" />

          {/* Dashed outline on solar line for the "self-generated" legend cue */}
          <path d={SOLAR} fill="none" stroke="#FF6700" strokeWidth="1.5" strokeDasharray="7 5" strokeLinecap="round" opacity="0.35" />

          {/* "Self-generated solar energy" label */}
          <text x={x(12)} y={y(0.60)} fontSize="22" fontWeight="700" fill="#FF6700" textAnchor="middle" fontFamily="Space Grotesk, sans-serif">
            Self-generated
          </text>
          <text x={x(12)} y={y(0.46)} fontSize="22" fontWeight="700" fill="#FF6700" textAnchor="middle" fontFamily="Space Grotesk, sans-serif">
            solar energy
          </text>

          {/* "Less electricity purchased" label + arrow */}
          <text x={x(21)} y={y(1.02)} fontSize="18" fill="#555" textAnchor="middle" fontFamily="DM Sans, sans-serif">Less electricity</text>
          <text x={x(21)} y={y(0.90)} fontSize="18" fill="#555" textAnchor="middle" fontFamily="DM Sans, sans-serif">purchased from</text>
          <text x={x(21)} y={y(0.78)} fontSize="18" fill="#555" textAnchor="middle" fontFamily="DM Sans, sans-serif">the grid</text>
          <path
            d={`M ${x(19.8)},${y(0.84)} Q ${x(19)},${y(0.80)} ${x(18.8)},${y(0.74)}`}
            fill="none" stroke="#666" strokeWidth="1.5" markerEnd="url(#arrowhead)"
          />

          {/* X-axis baseline */}
          <line x1={x(0)} y1={y(0)} x2={x(24)} y2={y(0)} stroke="#e0e0e0" strokeWidth="1.5" />

          {/* Hour ticks + labels */}
          {HOURS.map((h) => (
            <g key={h}>
              <line x1={x(h)} y1={y(0)} x2={x(h)} y2={y(0) + 7} stroke="#ccc" strokeWidth="1.2" />
              <text x={x(h)} y={y(0) + 26} fontSize="19" fill="#aaa" textAnchor="middle" fontFamily="JetBrains Mono, monospace">
                {h}
              </text>
            </g>
          ))}
        </svg>
      </div>
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

        {/* Tabs */}
        <Reveal delay={0.08}>
          <div className="mt-8 flex justify-center">
            <div className="inline-flex rounded-full border border-ink/10 bg-light p-1 gap-1">
              {TABS.map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`rounded-full px-6 py-2.5 font-display text-sm font-bold transition ${
                    tab === t
                      ? 'bg-lime text-white shadow-sm'
                      : 'text-ink/55 hover:text-ink'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
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
              <div className="flex flex-col gap-4">
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
