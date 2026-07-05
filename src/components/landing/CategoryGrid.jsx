import { Link } from 'react-router-dom';
import { Plus, ArrowRight } from 'lucide-react';
import { categories } from '../../data/landing';
import Reveal from '../Reveal';

function CardInner({ c }) {
  return (
    <>
      <img
        src={c.img}
        alt={c.title}
        className={`absolute inset-0 h-full w-full transition duration-700 group-hover:scale-105 ${
          c.fit === 'contain' ? 'object-contain' : 'object-cover'
        } ${c.imgClass || ''}`}
      />
      {/* darken the top (title) and the bottom (CTA) for legibility */}
      <div className="absolute inset-x-0 top-0 h-[55%] bg-gradient-to-b from-ink/85 via-ink/45 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-ink/70 to-transparent" />
      <span className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-lime text-white transition group-hover:rotate-90">
        <Plus size={18} />
      </span>
      {/* title + blurb moved to the top */}
      <div className="absolute inset-x-0 top-0 p-5 pr-16">
        <h3 className="font-display text-[31px] font-extrabold leading-tight text-white">{c.title}</h3>
        <p className="mt-1.5 text-sm text-white/80">{c.blurb}</p>
      </div>
      {/* Explore stays at the bottom */}
      <div className="absolute inset-x-0 bottom-0 p-5">
        <span className="inline-flex items-center gap-2 font-display text-lg font-bold text-white">
          Explore <ArrowRight size={18} className="text-lime" />
        </span>
      </div>
    </>
  );
}

export default function CategoryGrid() {
  return (
    <section id="categories" className="container-x scroll-mt-20 py-14">
      <Reveal>
        <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          From Rooftop to Backpack<span className="text-lime-dark">.</span>
        </h2>
      </Reveal>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {categories.map((c, i) => {
          const internal = c.to?.startsWith('/');
          const cls =
            'group relative block aspect-[5/4] overflow-hidden rounded-xl2 shadow-soft sm:aspect-[16/10] md:aspect-[3/4]';
          return (
            <Reveal key={c.id} delay={i * 0.08}>
              {internal ? (
                <Link to={c.to} className={cls} style={c.bg ? { backgroundColor: c.bg } : undefined}>
                  <CardInner c={c} />
                </Link>
              ) : (
                <a href={c.to} className={cls} style={c.bg ? { backgroundColor: c.bg } : undefined}>
                  <CardInner c={c} />
                </a>
              )}
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
