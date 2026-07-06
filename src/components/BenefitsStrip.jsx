import * as Icons from 'lucide-react';
import { benefits } from '../data/product';

export default function BenefitsStrip() {
  return (
    <section className="border-y border-ink/[0.07] bg-white">
      <div className="container-x grid grid-cols-2 gap-x-6 gap-y-7 py-10 md:grid-cols-3 lg:grid-cols-6">
        {benefits.map((b) => {
          const Icon = Icons[b.icon] ?? Icons.Check;
          return (
            <div key={b.title} className="flex flex-col items-center gap-2 text-center">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-ink text-lime">
                <Icon size={20} />
              </span>
              <p className="font-display text-sm font-bold text-ink">{b.title}</p>
              <p className="text-xs leading-snug text-slatey-500">{b.sub}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
