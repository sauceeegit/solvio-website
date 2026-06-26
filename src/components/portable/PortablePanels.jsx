import { useRef } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { portablePanels } from '../../data/landing';
import { baht } from '../../lib/format';
import Reveal from '../Reveal';

// "Portable Panels" — foldable solar panels, shown as a horizontal snap-scroller
// matching the Portable Battery section above it.
export default function PortablePanels() {
  const trackRef = useRef(null);

  const scrollByCard = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector('article');
    const gap = 20; // gap-5
    const step = card ? card.offsetWidth + gap : el.clientWidth * 0.7;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  return (
    <section id="portable-panels" className="container-x scroll-mt-20 py-16">
      <div className="flex items-end justify-between gap-4">
        <Reveal>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Portable Panels<span className="text-lime-dark">.</span>
          </h2>
          <p className="mt-2 max-w-xl text-[15px] text-slatey-500">
            Foldable solar panels — pair them with any Solvio power station to recharge anywhere.
          </p>
        </Reveal>

        <div className="hidden shrink-0 gap-2 sm:flex">
          <button
            onClick={() => scrollByCard(-1)}
            aria-label="Previous panels"
            className="grid h-11 w-11 place-items-center rounded-full border border-ink/15 text-ink transition hover:border-ink/40 hover:bg-ink/[0.04] active:scale-95"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scrollByCard(1)}
            aria-label="Next panels"
            className="grid h-11 w-11 place-items-center rounded-full border border-ink/15 text-ink transition hover:border-ink/40 hover:bg-ink/[0.04] active:scale-95"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-3"
      >
        {portablePanels.map((p) => (
          <article
            key={p.id}
            className="group flex w-[82%] shrink-0 snap-start flex-col overflow-hidden rounded-xl2 border border-ink/[0.07] bg-white shadow-soft transition hover:shadow-lift sm:w-[47%] lg:w-[calc((100%-2.5rem)/3)]"
          >
            <div className="relative aspect-[16/9] overflow-hidden bg-white">
              <img
                src={p.img}
                alt={`Solvio ${p.name} foldable solar panel`}
                className={`absolute inset-0 h-full w-full object-contain p-4 transition-transform duration-500 ease-out ${p.imgClass ?? 'group-hover:scale-105'}`}
              />
            </div>
            <div className="flex flex-1 flex-col p-5">
              <span className="font-mono text-[11px] font-medium uppercase tracking-wider text-lime-dark">
                {p.watt}
              </span>
              <h3 className="mt-1 font-display text-lg font-bold text-ink">{p.name}</h3>
              <p className="mt-0.5 text-sm text-slatey-500">Foldable solar panel</p>
              <div className="mt-5 flex items-center justify-between">
                <span className="font-display text-xl font-extrabold text-ink tabular-nums">
                  {baht(p.price)}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-lime px-4 py-2 font-display text-sm font-bold text-ink transition group-hover:bg-lime-dark">
                  View <ArrowRight size={15} />
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
