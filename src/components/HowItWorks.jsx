import * as Icons from 'lucide-react';
import { howItWorks } from '../data/product';
import Reveal from './Reveal';

export default function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-20 bg-ink py-20 text-white">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow">Plug &amp; play</p>
          <h2 className="mt-2 max-w-xl font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            From box to balcony in four simple steps
          </h2>
          <p className="mt-3 max-w-lg text-white/60">
            No drilling, no electrician, no paperwork headaches. If you can hang a picture frame,
            you can install a Solvio kit.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {howItWorks.map((s, i) => {
            const Icon = Icons[s.icon] ?? Icons.Sun;
            return (
              <Reveal key={s.step} delay={i * 0.08}>
                <div className="relative h-full overflow-hidden rounded-xl2 border border-white/10 bg-white/[0.04] p-6">
                  <span className="absolute right-4 top-3 font-display text-5xl font-extrabold text-white/[0.06]">
                    {s.step}
                  </span>
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-lime text-ink">
                    <Icon size={22} />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/60">{s.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
