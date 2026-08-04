import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
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
      {/* hairline top gradient — just for text legibility */}
      <div className="absolute inset-x-0 top-0 h-[35%] bg-gradient-to-b from-black/30 to-transparent" />

      {/* subtle dim on non-hovered cards */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{ opacity: dimmed ? 0.2 : 0, backgroundColor: '#000' }}
      />

      <div className="absolute inset-x-0 top-0 p-5 pr-14">
        {c.sub && (
          <p className="mb-1 font-display text-sm font-semibold uppercase tracking-widest text-white/70">{c.sub}</p>
        )}
        <h3
          className={`font-display text-[28px] font-extrabold leading-tight max-sm:text-2xl transition-colors duration-300 ${dimmed ? 'text-white/50' : 'text-white'}`}
          style={{ textShadow: '0 2px 12px rgba(0,0,0,0.35)' }}
        >{c.title}</h3>
      </div>

      {/* + button bottom right like Apple */}
      <div className="absolute bottom-5 right-5">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-white/20 backdrop-blur-sm text-white ring-1 ring-white/40 transition group-hover:bg-lime group-hover:ring-lime">
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
    <section id="categories" className="scroll-mt-20 py-14 max-lg:pt-10" style={{ backgroundColor: '#140e0b' }}>
      <div className="container-x">
      <Reveal>
        <h2 className="font-display text-2xl font-medium text-lime sm:text-3xl">
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
      </div>
    </section>
  );
}
