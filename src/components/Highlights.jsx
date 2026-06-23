import { Image as ImageIcon } from 'lucide-react';
import Reveal from './Reveal';
import { asset } from '../lib/format';

/* Empty image placeholder — swap in a real photo later */
function Placeholder({ className = '' }) {
  return (
    <div className={`flex items-center justify-center bg-surface ${className}`}>
      <ImageIcon size={34} className="text-ink/15" />
    </div>
  );
}

/* Radiating semicircle gauge (annual yield) */
function Gauge() {
  const N = 22;
  return (
    <svg viewBox="0 0 200 104" className="w-44 text-lime">
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
      <circle cx="40" cy="40" r={r} fill="none" stroke="rgba(255,255,255,.35)" strokeWidth="9" />
      <circle
        cx="40"
        cy="40"
        r={r}
        fill="none"
        stroke="#fff"
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
            <div className="flex h-full min-h-[260px] flex-col items-center justify-center rounded-xl2 bg-ink p-6 text-center text-white lg:col-span-2 lg:col-start-1 lg:row-start-1">
              <Gauge />
              <p className="mt-3 text-[11px] font-medium uppercase tracking-wide text-white/55">Up to</p>
              <p className="font-display text-3xl font-extrabold text-lime">
                1,720 kWh<span className="align-super text-base">*</span>
              </p>
              <p className="text-xs text-white/70">generated per year</p>
            </div>

            {/* B — savings (orange overlay on placeholder) */}
            <div className="relative h-full min-h-[260px] overflow-hidden rounded-xl2 lg:col-span-2 lg:col-start-1 lg:row-start-2">
              <Placeholder className="absolute inset-0 h-full w-full" />
              <div className="absolute bottom-0 left-0 max-w-[85%] rounded-tr-xl2 bg-lime p-5 text-white">
                <p className="text-[11px] font-medium uppercase tracking-wide text-white/85">Up to</p>
                <p className="font-display text-3xl font-extrabold leading-none">฿7,700</p>
                <p className="mt-1.5 text-xs font-semibold">saved per year</p>
              </div>
            </div>

            {/* C — Plug & Play: the orange word panel slides up on hover to reveal the photo */}
            <div className="group relative h-full min-h-[340px] overflow-hidden rounded-xl2 lg:col-span-2 lg:col-start-3 lg:row-span-2 lg:row-start-1">
              <img
                src={asset('/plugplay-photo.jpg')}
                alt="Easy installation — connecting a panel by hand in the garden"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <img
                src={asset('/plugplay-words.jpg')}
                alt="Plug & Play: easy installation without an electrician"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:-translate-y-full"
              />
            </div>

            {/* D — brand block (dark) */}
            <div className="flex h-full min-h-[160px] items-center justify-center rounded-xl2 bg-ink p-6 lg:col-span-2 lg:col-start-5 lg:row-start-1">
              <span className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                Solvio
              </span>
            </div>

            {/* E1 — bifacial donut (orange) */}
            <div className="flex h-full min-h-[160px] flex-col items-center justify-center rounded-xl2 bg-lime p-5 text-center text-white lg:col-span-1 lg:col-start-5 lg:row-start-2">
              <div className="relative">
                <Donut />
                <span className="absolute inset-0 flex items-center justify-center font-display text-xl font-extrabold">
                  30%
                </span>
              </div>
              <p className="mt-2 text-[11px] font-semibold leading-snug">
                Bifacial modules
                <br />
                more yield
              </p>
            </div>

            {/* E2 — optional support (cream + placeholder) */}
            <div className="flex h-full min-h-[160px] flex-col rounded-xl2 bg-[#FCF6EC] p-4 lg:col-span-1 lg:col-start-6 lg:row-start-2">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-slatey-400">Optional</p>
              <Placeholder className="mt-2 flex-1 rounded-lg" />
              <p className="mt-2 font-display text-sm font-bold leading-snug text-ink">Lifetime support</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
