import Reveal from './Reveal';
import { asset } from '../lib/format';

/* Support agent on a headset — infographic for the "Lifetime support" tile */
function SupportAgent({ className = '' }) {
  return (
    <div className={`flex items-center justify-center bg-[#d6d3ba] ${className}`}>
      <svg
        viewBox="0 0 100 100"
        className="h-full w-full p-2"
        role="img"
        aria-label="Support agent wearing a headset"
      >
        {/* figure silhouette */}
        <circle cx="50" cy="40" r="13" fill="#12281F" />
        <path d="M30 82c0-13 9-21 20-21s20 8 20 21v3H30z" fill="#12281F" />
        {/* headset band + ear cups (brand orange) */}
        <path d="M34 40a16 16 0 0 1 32 0" fill="none" stroke="#FC4302" strokeWidth="4" strokeLinecap="round" />
        <rect x="30" y="36" width="7" height="13" rx="3.5" fill="#FC4302" />
        <rect x="63" y="36" width="7" height="13" rx="3.5" fill="#FC4302" />
        {/* boom mic */}
        <path d="M34 49q-1 8 10 7" fill="none" stroke="#FC4302" strokeWidth="3" strokeLinecap="round" />
        <circle cx="45" cy="56" r="2.6" fill="#FC4302" />
        {/* speech bubble — "talking" */}
        <g>
          <rect x="68" y="16" width="22" height="15" rx="5" fill="#FC4302" />
          <path d="M74 31l-2 5 6-4z" fill="#FC4302" />
          <circle cx="74" cy="23.5" r="1.6" fill="#fff" />
          <circle cx="79" cy="23.5" r="1.6" fill="#fff" />
          <circle cx="84" cy="23.5" r="1.6" fill="#fff" />
        </g>
      </svg>
    </div>
  );
}

/* Radiating semicircle gauge (annual yield) */
function Gauge() {
  const N = 22;
  return (
    <svg viewBox="0 0 200 104" className="w-44" style={{ color: '#FC4302' }}>
      {Array.from({ length: N }).map((_, i) => {
        const a = Math.PI * (i / (N - 1));
        const cos = Math.cos(a);
        const sin = Math.sin(a);
        return (
          <line
            key={i}
            x1={(100 - 92 * cos).toFixed(1)}
            y1={(100 - 92 * sin).toFixed(1)}
            x2={(100 - 66 * cos).toFixed(1)}
            y2={(100 - 66 * sin).toFixed(1)}
            stroke="currentColor"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
}

/* 30% donut ring */
function Donut() {
  const r = 30;
  const c = 2 * Math.PI * r;
  const pct = 30;
  return (
    <svg viewBox="0 0 80 80" className="h-[86px] w-[86px] -rotate-90">
      <circle cx="40" cy="40" r={r} fill="none" stroke="rgba(255,103,0,.18)" strokeWidth="9" />
      <circle
        cx="40"
        cy="40"
        r={r}
        fill="none"
        stroke="#FC4302"
        strokeWidth="9"
        strokeDasharray={`${((pct / 100) * c).toFixed(1)} ${c.toFixed(1)}`}
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Highlights() {
  return (
    <section className="bg-white py-20">
      <div className="container-x">
        <Reveal>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:grid-rows-2 lg:h-[600px]">
            {/* A — annual yield gauge (dark) */}
            <div className="flex h-full min-h-[260px] flex-col items-center justify-center rounded-xl2 p-6 text-center text-white lg:col-span-2 lg:col-start-1 lg:row-start-1" style={{ backgroundColor: '#2e5b44' }}>
              <Gauge />
              <p className="mt-3 text-[11px] font-medium uppercase tracking-wide text-white/55">Up to</p>
              <p className="font-display text-3xl font-extrabold text-lime">
                1,720 kWh<span className="align-super text-base">*</span>
              </p>
              <p className="text-xs text-white/70">generated per year</p>
            </div>

            {/* B — savings (orange overlay on placeholder) */}
            <div className="relative h-full min-h-[260px] overflow-hidden rounded-xl2 lg:col-span-2 lg:col-start-1 lg:row-start-2">
              <img loading="lazy"
                src={asset('/savings-bg.jpg')}
                alt="A couple on a balcony at sunset with Solvio panels on the railing"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute bottom-0 left-0 max-w-[90%] rounded-tr-xl2 bg-lime p-5 text-white">
                <p className="text-[11px] font-medium uppercase tracking-wide text-white/85">More than</p>
                <p className="font-display text-3xl font-extrabold leading-none">฿65k</p>
                <p className="mt-1.5 text-xs font-semibold">saved in 10 years, per module</p>
              </div>
            </div>

            {/* C — Plug & Play: photo with a corner caption that expands to fill on hover */}
            <div className="group relative h-full min-h-[340px] overflow-hidden rounded-xl2 lg:col-span-2 lg:col-start-3 lg:row-span-2 lg:row-start-1">
              <img loading="lazy"
                src={asset('/plugplay-photo.jpg')}
                alt="Easy installation — connecting a panel by hand in the garden"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute bottom-0 right-0 flex h-[40%] w-[74%] flex-col justify-center rounded-tl-xl2 p-6 transition-all duration-500 ease-out group-hover:h-full group-hover:w-full" style={{ backgroundColor: '#ffb64d' }}>
                <p className="text-center font-display text-[18px] font-bold text-ink/70">
                  Plug &amp; Play:
                </p>
                <p className="mt-1 text-center font-display text-[23px] font-extrabold leading-snug text-ink">
                  Easy installation
                  <br />
                  without an electrician
                </p>
              </div>
            </div>

            {/* D — brand block (dark) */}
            <div className="flex h-full min-h-[160px] items-center justify-center rounded-xl2 bg-black p-6 lg:col-span-2 lg:col-start-5 lg:row-start-1">
              <img loading="lazy"
                src={asset('/solvio-logo-full.webp')}
                alt="Solvio"
                className="h-20 w-auto object-contain sm:h-24 lg:h-32"
              />
            </div>

            {/* E1 — yield donut (orange) */}
            <div className="flex h-full min-h-[160px] flex-col items-center justify-center rounded-xl2 p-5 text-center lg:col-span-1 lg:col-start-5 lg:row-start-2" style={{ backgroundColor: 'rgba(255,103,0,0.10)' }}>
              <div className="relative">
                <Donut />
                <span className="absolute inset-0 flex items-center justify-center font-display text-xl font-extrabold text-ink">
                  30%
                </span>
              </div>
              <p className="mt-2 text-[11px] font-semibold leading-snug text-ink/70">
                More yield
                <br />
                per module
              </p>
            </div>

            {/* E2 — optional support (cream + placeholder) */}
            <div className="flex h-full min-h-[160px] flex-col rounded-xl2 p-4 lg:col-span-1 lg:col-start-6 lg:row-start-2" style={{ backgroundColor: '#d6d3ba' }}>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-slatey-400">Optional</p>
              <SupportAgent className="mt-2 flex-1 rounded-lg" />
              <p className="mt-2 font-display text-sm font-bold leading-snug text-ink">Lifetime support</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
