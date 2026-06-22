import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import { bestsellers } from '../../data/landing';
import { baht } from '../../lib/format';
import Reveal from '../Reveal';

export default function Bestsellers() {
  return (
    <section id="bestsellers" className="scroll-mt-20 bg-white py-16">
      <div className="container-x">
        <Reveal>
          <div className="text-center">
            <p className="eyebrow">Most loved</p>
            <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Our bestsellers
            </h2>
          </div>
        </Reveal>

        <div className="no-scrollbar -mx-5 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:px-6 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0">
          {bestsellers.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08} className="w-[78%] shrink-0 snap-start sm:w-[44%] md:w-auto">

              <div
                className={`flex h-full flex-col overflow-hidden rounded-xl2 border bg-surface transition hover:shadow-soft ${
                  p.featured ? 'border-lime-dark ring-1 ring-lime/40' : 'border-ink/[0.07]'
                }`}
              >
                <div
                  className={`relative aspect-square overflow-hidden ${p.fit === 'contain' ? '' : 'bg-ink'}`}
                  style={p.bg ? { backgroundColor: p.bg } : undefined}
                >
                  <img
                    src={p.img}
                    alt={p.name}
                    className={`h-full w-full ${p.fit === 'contain' ? 'object-contain' : 'object-cover'}`}
                  />
                  {p.featured && (
                    <span className="absolute left-3 top-3 rounded-full bg-lime px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-ink">
                      Bestseller
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-4">
                  <h3 className="font-display text-lg font-extrabold text-ink">{p.name}</h3>
                  <p className="text-sm text-slatey-500">{p.subtitle}</p>

                  <ul className="mt-2.5 space-y-1">
                    {p.specs.map((s) => (
                      <li key={s} className="flex items-start gap-2 text-[13px] text-ink/75">
                        <Check size={15} className="mt-0.5 shrink-0 text-lime-dark" strokeWidth={3} />
                        {s}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-3.5 flex items-end justify-between border-t border-ink/[0.07] pt-3">
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-wider text-slatey-400">
                        From
                      </p>
                      <p className="font-display text-2xl font-extrabold text-ink">{baht(p.price)}</p>
                    </div>
                    <Link
                      to="/balcony-system"
                      className="inline-flex items-center gap-1.5 rounded-full bg-lime px-4 py-2.5 font-display text-sm font-bold text-ink transition hover:bg-lime-dark"
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
