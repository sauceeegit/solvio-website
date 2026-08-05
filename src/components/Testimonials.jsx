import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials, product } from '../data/product';
import Stars from './Stars';
import Reveal from './Reveal';

export default function Testimonials() {
  const scroller = useRef(null);

  const scrollBy = (dir) => {
    const el = scroller.current;
    if (!el) return;
    const card = el.querySelector('[data-card]');
    const gap = 16;
    const step = card ? card.offsetWidth + gap : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  return (
    <section id="reviews" className="scroll-mt-20 py-20" style={{ backgroundColor: '#f5f5f7' }}>
      <div className="container-x">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <div>
              <p className="eyebrow mb-2">Reviews</p>
              <h2 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
                Loved on balconies<br className="hidden sm:block" /> everywhere.
              </h2>
              <div className="mt-4 flex items-center gap-2.5">
                <Stars value={product.rating} />
                <span className="font-display text-sm font-semibold text-ink">
                  {product.rating} / 5
                </span>
                <span className="text-sm text-ink/50">
                  · {product.reviewCount.toLocaleString()} verified buyers
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        <div
          ref={scroller}
          className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2"
        >
          {testimonials.map((t, i) => (
            <figure
              data-card
              key={t.name}
              className="flex w-[85vw] max-w-[340px] shrink-0 snap-start flex-col justify-between rounded-3xl bg-white p-7 sm:w-[320px]"
              style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
            >
              <div>
                <p className="font-display text-[11px] font-semibold uppercase tracking-widest text-ink/40 mb-3">
                  {t.city}
                </p>
                <blockquote className="font-display text-[1.05rem] font-medium leading-snug text-ink">
                  "{t.text}"
                </blockquote>
              </div>
              <figcaption className="mt-8 flex items-center justify-between">
                <div>
                  <p className="font-display text-sm font-semibold text-ink">{t.name}</p>
                </div>
                <Stars value={t.rating} size={13} />
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Apple-style bottom-right arrows */}
        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={() => scrollBy(-1)}
            className="grid h-10 w-10 place-items-center rounded-full bg-white text-ink shadow-sm transition hover:bg-ink hover:text-white"
            aria-label="Previous reviews"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scrollBy(1)}
            className="grid h-10 w-10 place-items-center rounded-full bg-white text-ink shadow-sm transition hover:bg-ink hover:text-white"
            aria-label="Next reviews"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
