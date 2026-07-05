import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { portableBatteries } from '../../data/landing';
import Reveal from '../Reveal';

export default function PortableBatteries() {
  return (
    <section className="bg-white py-16">
      <div className="container-x">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Portable Power</p>
            <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Portable Batteries
            </h2>
            <p className="mt-3 text-base text-ink/60">
              Take your power anywhere. Compact, lightweight, and powerful.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {portableBatteries.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.06}>
              <div className="group card flex h-full flex-col overflow-hidden">
                <div className="relative aspect-[4/3] overflow-hidden bg-surface">
                  <img
                    src={p.img}
                    alt={p.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-1 flex-col gap-3 p-5">
                  <div>
                    <h3 className="font-display text-lg font-extrabold text-ink">{p.name}</h3>
                    <p className="mt-0.5 text-sm text-ink/60">{p.tagline}</p>
                  </div>

                  <div className="mt-auto flex items-end justify-between gap-3">
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-wider text-slatey-400">From</p>
                      <p className="font-display text-2xl font-extrabold text-ink">{p.price}</p>
                    </div>
                    <Link to={p.href ?? '/portable'}>
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
