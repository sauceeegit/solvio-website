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
      <div
        className={`absolute inset-0 ${
          c.fit === 'contain'
            ? 'bg-gradient-to-t from-ink/80 via-transparent to-transparent'
            : 'bg-gradient-to-t from-ink/85 via-ink/40 to-ink/10'
        }`}
      />
      <span className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-lime text-ink transition group-hover:rotate-90">
        <Plus size={18} />
      </span>
      <div className="absolute inset-x-0 bottom-0 p-5">
        <h3 className="font-display text-lg font-extrabold text-white">{c.title}</h3>
        <p className="mt-1 text-sm text-white/75">{c.blurb}</p>
        <span className="mt-3 inline-flex items-center gap-1.5 font-display text-sm font-bold text-lime">
          Explore <ArrowRight size={15} />
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
