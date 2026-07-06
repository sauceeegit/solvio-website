import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import { bestsellers } from '../../data/landing';
import { baht } from '../../lib/format';
import Reveal from '../Reveal';

export default function Bestsellers() {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <section id="bestsellers" className="scroll-mt-20 bg-white py-16">
      <div className="container-x">
        <Reveal>
          <div className="text-center">
            <p className="eyebrow">Bestsellers</p>
            <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Our most popular systems
            </h2>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {bestsellers.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.06}>
              <div
                className="card relative flex h-full flex-col overflow-hidden"
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* dark overlay for non-hovered cards */}
                <div
                  className="pointer-events-none absolute inset-0 z-10 bg-ink transition-opacity duration-300"
                  style={{ opacity: hoveredIdx !== null && hoveredIdx !== i ? 0.6 : 0 }}
                />

                <div className="relative aspect-[4/3] bg-lime">
                  <img src={p.img} alt={p.name} className="h-full w-full object-cover" />
                  {p.badge && (
                    <span className="absolute left-3 top-3 rounded-full bg-lime px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-white">
                      {p.badge}
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col gap-4 p-5">
                  <div>
                    <h3 className="font-display text-lg font-extrabold text-ink">{p.name}</h3>
                    <p className="mt-0.5 text-sm text-ink/60">{p.tagline}</p>
                  </div>

                  <ul className="flex flex-col gap-1.5">
                    {p.specs.map((s) => (
                      <li key={s} className="flex items-start gap-2 text-[13px] text-ink/75">
                        <Check size={14} className="mt-0.5 shrink-0 text-lime" strokeWidth={3} />
                        {s}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex items-end justify-between gap-3">
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-wider text-slatey-400">From</p>
                      <p className="font-display text-2xl font-extrabold text-ink">{baht(p.price)}</p>
                    </div>
                    <Link
                      to="/balcony-system"
                      className="inline-flex items-center gap-1.5 rounded-full bg-lime px-4 py-2.5 font-display text-sm font-bold text-white transition hover:bg-lime-dark"
                    >
                      See details <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
