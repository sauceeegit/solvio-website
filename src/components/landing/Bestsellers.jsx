import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import { bestsellers } from '../../data/landing';
import { baht } from '../../lib/format';
import Reveal from '../Reveal';

export default function Bestsellers() {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <section id="bestsellers" className="scroll-mt-20 pb-16 pt-8 sm:pb-24 sm:pt-12" style={{ backgroundColor: '#f5f5f7' }}>
      <div className="container-x">
        <Reveal>
          <div className="flex items-end justify-between gap-4 mb-10">
            <h2 className="font-display text-3xl font-normal tracking-tight text-ink sm:text-4xl" style={{ fontFamily: '"Space Grotesk", system-ui, sans-serif' }}>
              Our most popular systems
            </h2>
            <Link to="/balcony-system" className="hidden whitespace-nowrap rounded-full bg-ink px-4 py-2 font-display text-[13px] font-bold text-white transition hover:bg-lime sm:inline-flex">
              Shop all →
            </Link>
          </div>
        </Reveal>

        <div className="flex snap-x gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:grid sm:gap-5 sm:overflow-visible sm:pb-0 sm:grid-cols-2 lg:grid-cols-3">
          {bestsellers.map((p, i) => {
            const isHovered = hoveredIdx === i;
            const dimmed = hoveredIdx !== null && !isHovered;
            return (
              <Reveal key={p.id} delay={i * 0.06} className="max-sm:w-[78%] max-sm:shrink-0 max-sm:snap-start">
                <div
                  className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white transition-all duration-500 ease-out"
                  style={{
                    boxShadow: isHovered
                      ? '0 20px 50px -12px rgba(0,0,0,0.18)'
                      : '0 2px 12px rgba(0,0,0,0.07)',
                    opacity: dimmed ? 0.55 : 1,
                    transform: isHovered ? 'scale(1.02) translateY(-4px)' : 'scale(1) translateY(0)',
                  }}
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  {/* image area */}
                  <div
                    className="relative aspect-[4/3] overflow-hidden transition-colors duration-500"
                    style={{ backgroundColor: isHovered && p.hoverBg ? p.hoverBg : (p.bg || '#ffffff') }}
                  >
                    {/* default image — sits behind, fades out on hover */}
                    <img
                      src={p.img}
                      alt={p.name}
                      className={`absolute inset-0 h-full w-full p-6 transition-opacity duration-500 ${p.fit === 'contain' ? 'object-contain' : 'object-cover'} ${isHovered && p.hoverImg ? 'opacity-0' : 'opacity-100'}`}
                    />
                    {/* hover image — sits on top, fades in on hover */}
                    {p.hoverImg && (
                      <img
                        src={p.hoverImg}
                        alt={p.name}
                        className={`absolute inset-0 z-10 h-full w-full p-3 transition-opacity duration-500 ${p.fit === 'contain' ? 'object-contain' : 'object-cover'} ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                      />
                    )}
                    {p.badge && (
                      <span className="absolute left-3 top-3 z-20 rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-white">
                        {p.badge}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col gap-4 p-5">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-widest text-ink/70">{p.tagline || 'Balcony Solar'}</p>
                      <h3 className="mt-1 font-display text-xl font-medium text-ink">{p.name}</h3>
                    </div>

                    <ul className="flex flex-col gap-1.5">
                      {p.specs.map((s) => (
                        <li key={s} className="flex items-start gap-2 text-[14px] text-ink/80">
                          <Check size={14} className="mt-0.5 shrink-0 text-lime" strokeWidth={3} />
                          {s}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto flex items-end justify-between gap-3 pt-4 border-t border-black/[0.06]">
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-wider text-ink/40">From</p>
                        <p className="font-display text-2xl font-medium text-price">{baht(p.price)}</p>
                      </div>
                      <Link
                        to="/balcony-system"
                        className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2.5 font-display text-sm font-medium text-white transition duration-300 group-hover:bg-lime hover:!bg-lime-dark"
                      >
                        See details <ArrowRight size={15} />
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
