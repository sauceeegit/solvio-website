import { useRef } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonials, product } from '../data/product';
import Stars from './Stars';
import Reveal from './Reveal';

export default function Testimonials() {
  const scroller = useRef(null);

  const scrollBy = (dir) => {
    const el = scroller.current;
    if (el) el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: 'smooth' });
  };

  return (
    <section id="reviews" className="scroll-mt-20 bg-white py-20">
      <div className="container-x">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Reviews</p>
              <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                Loved on balconies everywhere
              </h2>
              <div className="mt-3 flex items-center gap-2.5">
                <Stars value={product.rating} />
                <span className="font-display text-sm font-semibold text-ink">
                  {product.rating} / 5
                </span>
                <span className="text-sm text-slatey-500">
                  · {product.reviewCount.toLocaleString()} verified buyers
                </span>
              </div>
            </div>
            <div className="hidden gap-2 sm:flex">
              <button
                onClick={() => scrollBy(-1)}
                className="grid h-10 w-10 place-items-center rounded-full border border-ink/15 text-ink transition hover:bg-ink/[0.04]"
                aria-label="Previous reviews"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => scrollBy(1)}
                className="grid h-10 w-10 place-items-center rounded-full border border-ink/15 text-ink transition hover:bg-ink/[0.04]"
                aria-label="Next reviews"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </Reveal>

        <div
          ref={scroller}
          className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2"
        >
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex w-[300px] shrink-0 snap-start flex-col rounded-xl2 border border-ink/[0.07] bg-[#F5F5F5] p-6 sm:w-[360px]"
            >
              <Quote size={26} className="text-lime-dark" />
              <blockquote className="mt-3 flex-1 text-[15px] leading-relaxed text-ink/80">
                {t.text}
              </blockquote>
              <figcaption className="mt-5 flex items-center justify-between border-t border-ink/[0.07] pt-4">
                <div>
                  <p className="font-display text-sm font-bold text-ink">{t.name}</p>
                  <p className="text-xs text-slatey-500">{t.city}</p>
                </div>
                <Stars value={t.rating} size={14} />
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
