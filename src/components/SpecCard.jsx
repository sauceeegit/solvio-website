import { Sun, BadgeCheck } from 'lucide-react';
import { spec } from '../data/product';
import Reveal from './Reveal';

export default function SpecCard() {
  return (
    <section className="container-x py-20">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div className="relative overflow-hidden rounded-xl2 border border-ink/[0.07] shadow-soft">
            <img
              src="https://images.unsplash.com/photo-1611365892117-00ac5ef43c90?auto=format&fit=crop&w=1000&q=80"
              alt="Detail of a high-efficiency monocrystalline solar module"
              className="aspect-[4/5] w-full object-cover sm:aspect-[16/11]"
            />
            <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-xl bg-white/90 p-3 backdrop-blur">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-lime text-ink">
                <Sun size={20} />
              </span>
              <div>
                <p className="font-display text-sm font-bold text-ink">{spec.model}</p>
                <p className="text-xs text-slatey-500">N-type bifacial · 22.4% efficiency</p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="eyebrow">The module</p>
          <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Built to outlast your mortgage
          </h2>
          <p className="mt-3 text-slatey-500">
            Frameless glass-glass construction and N-type bifacial cells squeeze power from both
            sides of the panel — and keep doing it for three decades.
          </p>

          <dl className="mt-7 divide-y divide-ink/[0.07] overflow-hidden rounded-xl2 border border-ink/[0.07] bg-white">
            {spec.rows.map((r) => (
              <div key={r.label} className="flex items-center justify-between px-4 py-3">
                <dt className="text-sm text-slatey-500">{r.label}</dt>
                <dd className="flex items-center gap-1.5 font-display text-sm font-semibold text-ink">
                  {r.value}
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-4 flex items-center gap-2 text-sm text-ink/70">
            <BadgeCheck size={16} className="text-lime-dark" />
            TÜV-certified and tested to IEC 61215 &amp; 61730.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
