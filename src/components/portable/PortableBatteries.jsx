import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { portableBatteries } from '../../data/landing';
import { baht } from '../../lib/format';
import Reveal from '../Reveal';

export default function PortableBatteries() {
  const trackRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);

  const updateScrollState = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateScrollState, { passive: true });
    return () => el.removeEventListener('scroll', updateScrollState);
  }, []);

  const scrollByCard = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector('[data-card]');
    const gap = 24;
    const step = card ? card.offsetWidth + gap : el.clientWidth * 0.7;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  return (
    <section className="py-16" style={{ background: '#FFF7E9' }}>
      <div className="container-x">
        <div className="flex items-end justify-between gap-4">
          <Reveal>
            <div className="max-w-2xl">
              <p className="eyebrow">Portable Power</p>
              <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                Portable Batteries
              </h2>
              <p className="mt-3 text-base text-ink/80">
                Take your power anywhere. Compact, lightweight, and powerful.
              </p>
            </div>
          </Reveal>

          <div className="hidden shrink-0 gap-2 sm:flex">
            <button
              onClick={() => scrollByCard(-1)}
              aria-label="Previous"
              className={`grid h-11 w-11 place-items-center rounded-full transition active:scale-95 ${
                canScrollLeft
                  ? 'bg-lime text-white hover:bg-lime-dark'
                  : 'bg-ink/8 text-ink/40'
              }`}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scrollByCard(1)}
              aria-label="Next"
              className="grid h-11 w-11 place-items-center rounded-full bg-lime text-white transition hover:bg-lime-dark active:scale-95"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-3"
        >
          {portableBatteries.map((p, i) => (
            <Reveal
              key={p.id}
              delay={i * 0.06}
              className="w-[82%] shrink-0 snap-start sm:w-[47%] lg:w-[calc((100%-3rem)/3)]"
            >
              <div data-card className="group card flex h-full flex-col overflow-hidden">
                <div className="relative aspect-[4/3] overflow-hidden bg-surface">
                  <img loading="lazy"
                    src={p.img}
                    alt={p.name}
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${p.imgScale || ''} ${
                      p.sideImg ? 'group-hover:opacity-0' : ''
                    }`}
                  />
                  {p.sideImg && (
                    <img loading="lazy"
                      src={p.sideImg}
                      alt={`${p.name} — side view`}
                      className={`absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${p.imgScale || ''}`}
                    />
                  )}
                </div>

                <div className="flex flex-1 flex-col gap-3 p-5">
                  <div>
                    <h3 className="font-display text-[1.35rem] font-extrabold text-ink">{p.name}</h3>
                    <p className="mt-0.5 text-[15px] font-medium" style={{ color: '#477296' }}>{p.tagline ?? `${p.capacity} portable power station`}</p>
                  </div>

                  <div className="mt-auto flex items-end justify-between gap-3">
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-wider text-slatey-600">From</p>
                      <p className="font-display text-2xl font-extrabold text-price tabular-nums">{baht(p.price)}</p>
                    </div>
                    <Link to={p.href ?? '/portable-system'}>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-lime px-4 py-2 font-display text-sm font-bold text-white transition group-hover:bg-lime-dark">
                        See details <ArrowRight size={15} />
                      </span>
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
