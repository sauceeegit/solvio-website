import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { categories } from '../../data/landing';
import Reveal from '../Reveal';

function CardInner({ c, dimmed }) {
  return (
    <>
      <img
        loading="lazy"
        src={c.img}
        alt={c.title}
        className={`absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105 ${c.imgClass || ''}`}
      />
      {/* dim overlay for non-hovered cards */}
      <div className={`absolute inset-0 bg-black transition-opacity duration-300 ${dimmed ? 'opacity-40' : 'opacity-0'}`} />

      {/* text block — frosted pill so no overlay needed on image */}
      <div className="absolute inset-x-0 top-0 p-5 pr-14">
        {c.sub && (
          <p
            className="mb-1 font-display text-xs font-semibold uppercase tracking-widest text-white"
            style={{ textShadow: '0 1px 6px rgba(0,0,0,0.7)' }}
          >{c.sub}</p>
        )}
        <h3
          className="text-[26px] font-semibold leading-tight text-white max-sm:text-xl"
          style={{ textShadow: '0 2px 16px rgba(0,0,0,0.6)', fontFamily: '"Space Grotesk", system-ui, sans-serif' }}
        >{c.title}</h3>
      </div>

      {/* + button bottom right */}
      <div className="absolute bottom-5 right-5">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-black/25 backdrop-blur-sm text-white ring-1 ring-white/30 transition group-hover:bg-lime group-hover:ring-lime">
          <Plus size={18} />
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
    <section id="categories" className="scroll-mt-20 py-14 max-lg:pt-10" style={{ backgroundColor: '#fafafa' }}>
      <div className="container-x">
      <Reveal>
        <h2 className="text-2xl font-semibold text-ink sm:text-3xl" style={{ fontFamily: '"Space Grotesk", system-ui, sans-serif' }}>
          From Rooftop to Backpack
        </h2>
      </Reveal>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {categories.map((c, i) => {
          const internal = c.to?.startsWith('/');
          const cls =
            'group relative block aspect-[5/4] overflow-hidden rounded-xl2 sm:aspect-[16/10] md:aspect-[3/4]';
          const cardStyle = { boxShadow: '0 4px 24px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)' };
          const dimmed = hoveredIdx !== null && hoveredIdx !== i;
          const handlers = {
            onMouseEnter: () => setHoveredIdx(i),
            onMouseLeave: () => setHoveredIdx(null),
          };
          return (
            <Reveal key={c.title} delay={i * 0.08}>
              {internal ? (
                <Link to={c.to} className={cls} style={{ ...cardStyle, ...(c.bg ? { backgroundColor: c.bg } : {}) }} {...handlers}>
                  <CardInner c={c} dimmed={dimmed} />
                </Link>
              ) : (
                <a href={c.to} className={cls} style={{ ...cardStyle, ...(c.bg ? { backgroundColor: c.bg } : {}) }} {...handlers}>
                  <CardInner c={c} dimmed={dimmed} />
                </a>
              )}
            </Reveal>
          );
        })}
      </div>
      </div>
    </section>
  );
}
