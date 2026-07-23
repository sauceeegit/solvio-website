import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, ArrowRight } from 'lucide-react';
import { categories } from '../../data/landing';
import Reveal from '../Reveal';

function CardInner({ c, dimmed, lightOverlay }) {
  return (
    <>
      <img loading="lazy"
        src={c.img}
        alt={c.title}
        className={`absolute inset-0 h-full w-full transition duration-700 group-hover:scale-105 ${
          c.fit === 'contain' ? 'object-contain' : 'object-cover'
        } ${c.imgClass || ''}`}
      />
      <div className={`absolute inset-x-0 top-0 h-[55%] bg-gradient-to-b to-transparent ${lightOverlay ? 'from-black/40 via-black/15' : 'from-black/75 via-black/35'}`} />
      <div className={`absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t to-transparent ${lightOverlay ? 'from-black/30' : 'from-black/70'}`} />

      {/* dim overlay — visible on non-hovered cards */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{ opacity: dimmed ? 1 : 0, backgroundColor: lightOverlay ? 'rgba(0,0,0,0.15)' : 'rgba(0,0,0,0.55)' }}
      />

      <span className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-lime text-white transition group-hover:rotate-90">
        <Plus size={18} />
      </span>

      <div className="absolute inset-x-0 top-0 p-5 pr-16">
        <h3 className="font-display text-[31px] font-extrabold leading-tight text-white max-sm:text-2xl">{c.title}</h3>
        {c.sub && (
          <p className="mt-1 font-display text-lg font-bold text-lime max-sm:text-base">{c.sub}</p>
        )}
        <p className="mt-1.5 text-sm text-white/80 max-sm:hidden">{c.blurb}</p>
      </div>

      {/* Explore pill button */}
      <div className="absolute inset-x-0 bottom-0 p-5">
        <span className="inline-flex items-center gap-2 rounded-full border-2 border-white/70 px-5 py-2 font-display text-base font-bold text-white transition duration-300 group-hover:border-lime group-hover:bg-lime">
          Explore <ArrowRight size={16} />
        </span>
      </div>
    </>
  );
}

export default function CategoryGrid() {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    // Mobile top padding lives in LandingPage's spacer (the hero's sticky
    // freeze distance) so the heading meets the frozen video exactly.
    <section id="categories" className="container-x scroll-mt-20 py-14 max-lg:pt-10">
      <Reveal>
        <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          From Rooftop to Backpack
        </h2>
      </Reveal>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {categories.map((c, i) => {
          const internal = c.to?.startsWith('/');
          const cls =
            'group relative block aspect-[5/4] overflow-hidden rounded-xl2 shadow-soft sm:aspect-[16/10] md:aspect-[3/4]';
          const dimmed = hoveredIdx !== null && hoveredIdx !== i;
          const handlers = {
            onMouseEnter: () => setHoveredIdx(i),
            onMouseLeave: () => setHoveredIdx(null),
          };
          return (
            <Reveal key={c.title} delay={i * 0.08}>
              {internal ? (
                <Link to={c.to} className={cls} style={c.bg ? { backgroundColor: c.bg } : undefined} {...handlers}>
                  <CardInner c={c} dimmed={dimmed} lightOverlay={c.id === 'portable'} />
                </Link>
              ) : (
                <a href={c.to} className={cls} style={c.bg ? { backgroundColor: c.bg } : undefined} {...handlers}>
                  <CardInner c={c} dimmed={dimmed} lightOverlay={c.id === 'portable'} />
                </a>
              )}
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
