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
            <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight sm:text-4xl" style={{ color: '#C29848' }}>
              Our most popular systems
            </h2>
          </div>
        </Reveal>

        <div className="mt-10 flex snap-x gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:grid sm:gap-6 sm:overflow-visible sm:pb-0 sm:grid-cols-2 lg:grid-cols-3">
          {bestsellers.map((p, i) => {
            const dimmed = hoveredIdx !== null && hoveredIdx !== i;
            return (
              <Reveal key={p.id} delay={i * 0.06} className="max-sm:w-[78%] max-sm:shrink-0 max-sm:snap-start">
                <div
                  className="card flex h-full flex-col overflow-hidden transition-all duration-500 ease-out"
                  style={{
                    filter: dimmed ? 'brightness(0.82)' : hoveredIdx === i ? 'brightness(1.04)' : 'brightness(1)',
                    transform: hoveredIdx === i ? 'scale(1.025) translateY(-4px)' : 'scale(1) translateY(0)',
                    boxShadow: hoveredIdx === i ? '0 20px 50px -12px rgba(12,30,26,0.25)' : undefined,
                  }}
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
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
                      <h3 className="font-display text-xl font-extrabold text-ink">{p.name}</h3>
                      <p className="mt-0.5 text-[15px] text-ink/60">{p.tagline}</p>
                    </div>

                    <ul className="flex flex-col gap-1.5">
                      {p.specs.map((s) => (
                        <li key={s} className="flex items-start gap-2 text-[15px] text-ink/75">
                          <Check size={15} className="mt-0.5 shrink-0 text-lime" strokeWidth={3} />
                          {s}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto flex items-end justify-between gap-3 pt-5">
                      <div>
                        <p className="font-mono text-[11px] uppercase tracking-wider text-slatey-600">From</p>
                        <p className="font-display text-2xl font-extrabold text-price">{baht(p.price)}</p>
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
