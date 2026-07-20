import { useState } from 'react';
import { Building2, Layers, Home } from 'lucide-react';
import { asset } from '../lib/format';
import Reveal from './Reveal';

const TABS = ['Balcony & Facade', 'Lightweight Roof'];

const CARDS = {
  'Balcony & Facade': [
    {
      icon: Building2,
      title: 'Balcony Installation',
      body: 'Perfect for apartments and urban living. Generate clean electricity without modifying your roof.',
      img: asset('/balcony-power-plants.jpg'),
      alt: 'Black solar panels on a modern apartment balcony railing',
    },
    {
      icon: Layers,
      title: 'Facade Installation',
      body: 'Turn unused wall space into energy. The all-black design integrates beautifully into contemporary architecture.',
      img: asset('/dark-feather-1800.jpg'),
      alt: 'Solvio Black Feather panels mounted on a building facade',
    },
  ],
  'Lightweight Roof': [
    {
      icon: Home,
      title: 'Lightweight Roof Installation',
      body: 'When every kilogram matters. At only 6 kg/m², The Black Feather is engineered for lightweight structures.',
      img: asset('/rooftop-solar.jpg'),
      alt: 'Solvio Black Feather panels on a lightweight residential roof',
    },
  ],
};

// SVG chart — 24-hour solar production vs household consumption
// All coordinates are in a 1000×280 viewBox.
const CHART_W = 1000;
const CHART_H = 280;
const PAD_L = 10;
const PAD_R = 10;
const PAD_T = 20;
const PAD_B = 40;
const PLOT_W = CHART_W - PAD_L - PAD_R;
const PLOT_H = CHART_H - PAD_T - PAD_B;

// Map hour (0-24) → x, fraction (0-1) → y (inverted — 0 = top)
const px = (h) => PAD_L + (h / 24) * PLOT_W;
const py = (f) => PAD_T + PLOT_H * (1 - f);

// Solar bell: 0 before 5, rises to peak at 12, falls to 0 after 19
const solarPath =
  `M ${px(0)} ${py(0)}` +
  ` C ${px(4)} ${py(0)}, ${px(6)} ${py(0.05)}, ${px(7)} ${py(0.25)}` +
  ` C ${px(9)} ${py(0.7)}, ${px(10)} ${py(0.95)}, ${px(12)} ${py(1)}` +
  ` C ${px(14)} ${py(0.95)}, ${px(15)} ${py(0.7)}, ${px(17)} ${py(0.25)}` +
  ` C ${px(18)} ${py(0.05)}, ${px(19.5)} ${py(0)}, ${px(24)} ${py(0)}`;

// Household: base ~0.28, morning bump ~7 (0.55), midday dip ~12 (0.3), evening peak ~19 (0.65)
const housePath =
  `M ${px(0)} ${py(0.3)}` +
  ` C ${px(2)} ${py(0.28)}, ${px(5)} ${py(0.32)}, ${px(7)} ${py(0.55)}` +
  ` C ${px(9)} ${py(0.38)}, ${px(11)} ${py(0.3)}, ${px(12)} ${py(0.3)}` +
  ` C ${px(13)} ${py(0.3)}, ${px(15)} ${py(0.35)}, ${px(17)} ${py(0.5)}` +
  ` C ${px(18.5)} ${py(0.65)}, ${px(20)} ${py(0.65)}, ${px(22)} ${py(0.55)}` +
  ` C ${px(23)} ${py(0.42)}, ${px(23.5)} ${py(0.35)}, ${px(24)} ${py(0.3)}`;

// Filled area (solar > household): roughly hours 8–17
const selfGenArea =
  `M ${px(8)} ${py(0.3)}` +
  ` C ${px(9)} ${py(0.7)}, ${px(10)} ${py(0.95)}, ${px(12)} ${py(1)}` +
  ` C ${px(14)} ${py(0.95)}, ${px(15)} ${py(0.7)}, ${px(17)} ${py(0.3)}` +
  ` C ${px(15)} ${py(0.35)}, ${px(13)} ${py(0.3)}, ${px(12)} ${py(0.3)}` +
  ` C ${px(11)} ${py(0.3)}, ${px(9)} ${py(0.35)}, ${px(8)} ${py(0.3)} Z`;

const HOURS = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24];

function EnergyChart() {
  return (
    <div className="mt-12 rounded-2xl border border-ink/[0.07] bg-white p-6 shadow-soft">
      {/* Legend */}
      <div className="mb-6 flex flex-wrap gap-x-6 gap-y-2 text-[13px]">
        <span className="flex items-center gap-2">
          <span className="inline-block h-[3px] w-8 rounded bg-lime" />
          Solar Energy Production
        </span>
        <span className="flex items-center gap-2">
          <span className="inline-block h-[3px] w-8 rounded bg-ink/60" />
          Household Energy Consumption
        </span>
        <span className="flex items-center gap-2">
          <span
            className="inline-block h-[3px] w-8 rounded"
            style={{ background: 'repeating-linear-gradient(90deg,#FF6700 0,#FF6700 6px,transparent 6px,transparent 10px)' }}
          />
          Self-generated solar energy
        </span>
        <span className="flex items-center gap-2">
          <span className="inline-block h-[3px] w-8 rounded bg-ink/20" />
          Less electricity purchased from the grid
        </span>
      </div>

      <svg
        viewBox={`0 0 ${CHART_W} ${CHART_H}`}
        className="w-full"
        aria-label="Energy production and consumption over 24 hours"
      >
        {/* Self-generated fill */}
        <path d={selfGenArea} fill="#FF6700" fillOpacity="0.15" />

        {/* "Less electricity" label */}
        <text x={px(19.5)} y={py(0.56)} fontSize="22" fill="#444" textAnchor="middle" fontFamily="DM Sans, sans-serif">
          Less electricity
        </text>
        <text x={px(19.5)} y={py(0.44)} fontSize="22" fill="#444" textAnchor="middle" fontFamily="DM Sans, sans-serif">
          purchased from
        </text>
        <text x={px(19.5)} y={py(0.32)} fontSize="22" fill="#444" textAnchor="middle" fontFamily="DM Sans, sans-serif">
          the grid
        </text>
        {/* arrow */}
        <path d={`M ${px(18.8)} ${py(0.38)} Q ${px(17.5)} ${py(0.42)} ${px(17)} ${py(0.5)}`}
          fill="none" stroke="#555" strokeWidth="1.5" markerEnd="url(#arr)" />

        {/* Self-generated label */}
        <text x={px(12)} y={py(0.78)} fontSize="26" fontWeight="bold" fill="#FF6700" textAnchor="middle" fontFamily="Space Grotesk, sans-serif">
          Self-generated
        </text>
        <text x={px(12)} y={py(0.63)} fontSize="26" fontWeight="bold" fill="#FF6700" textAnchor="middle" fontFamily="Space Grotesk, sans-serif">
          solar energy
        </text>

        {/* Household line */}
        <path d={housePath} fill="none" stroke="#333" strokeWidth="3" strokeLinecap="round" />

        {/* Solar line */}
        <path d={solarPath} fill="none" stroke="#FF6700" strokeWidth="3.5" strokeLinecap="round" />

        {/* Dashed solar line (self-gen visual) */}
        <path d={solarPath} fill="none" stroke="#FF6700" strokeWidth="2" strokeDasharray="8 5" strokeLinecap="round" opacity="0.4" />

        {/* Arrow marker */}
        <defs>
          <marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#555" />
          </marker>
        </defs>

        {/* X-axis */}
        <line x1={px(0)} y1={py(0)} x2={px(24)} y2={py(0)} stroke="#ddd" strokeWidth="1" />
        {HOURS.map((h) => (
          <g key={h}>
            <line x1={px(h)} y1={py(0)} x2={px(h)} y2={py(0) + 6} stroke="#ccc" strokeWidth="1" />
            <text x={px(h)} y={py(0) + 22} fontSize="20" fill="#999" textAnchor="middle" fontFamily="JetBrains Mono, monospace">
              {h}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

export default function SolarYourWay() {
  const [tab, setTab] = useState(TABS[0]);
  const cards = CARDS[tab];

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container-x">
        {/* Heading */}
        <Reveal>
          <div className="text-center">
            <h2 className="font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
              Solar. Your way.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-ink/70">
              Choose how you bring clean energy into your home. Whether on your balcony, facade
              or lightweight roof, Solvio makes premium solar possible where conventional panels simply don&apos;t fit.
            </p>
          </div>
        </Reveal>

        {/* Tabs */}
        <Reveal delay={0.08}>
          <div className="mt-8 flex justify-center">
            <div className="inline-flex rounded-full border border-ink/10 bg-light p-1">
              {TABS.map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`rounded-full px-6 py-2.5 font-display text-sm font-bold transition ${
                    tab === t
                      ? 'bg-lime text-white shadow-sm'
                      : 'text-ink/60 hover:text-ink'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Installation cards */}
        <div className={`mt-10 grid gap-6 ${cards.length === 1 ? 'max-w-lg mx-auto' : 'sm:grid-cols-2'}`}>
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08}>
              <div className="flex flex-col gap-4">
                {/* Icon + text */}
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-lime">
                    <c.icon size={22} className="text-white" strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-extrabold text-ink">{c.title}</h3>
                    <p className="mt-1 text-[14px] leading-relaxed text-ink/65">{c.body}</p>
                  </div>
                </div>
                {/* Photo */}
                <div className="overflow-hidden rounded-xl aspect-[4/3] bg-surface">
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
