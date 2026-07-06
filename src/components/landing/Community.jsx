import { ArrowRight } from 'lucide-react';
import { icons } from '../../lib/icons';
import { community } from '../../data/landing';
import Reveal from '../Reveal';

export default function Community() {
  return (
    <section className="bg-ink py-16 text-white">
      <div className="container-x">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Join the movement</p>
            <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              Become part of Solvio
            </h2>
            <p className="mt-3 text-white/60">
              More than a store — a community powering Thailand’s switch to clean energy. There’s a
              place for everyone.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {community.map((c, i) => {
            const Icon = icons[c.icon] ?? icons.Users;
            return (
              <Reveal key={c.title} delay={i * 0.08}>
                <div className="group flex h-full flex-col rounded-xl2 border border-white/10 bg-white/[0.04] p-6 transition hover:border-lime/50 hover:bg-white/[0.07]">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-lime text-ink">
                    <Icon size={22} />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-bold">{c.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-white/60">{c.sub}</p>
                  <a
                    href="#"
                    className="mt-5 inline-flex items-center gap-1.5 font-display text-sm font-bold text-lime transition group-hover:gap-2.5"
                  >
                    {c.cta} <ArrowRight size={16} />
                  </a>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
