import { Plus } from 'lucide-react';
import { related } from '../data/product';
import { euro } from '../lib/format';
import Reveal from './Reveal';

export default function RelatedProducts() {
  return (
    <section id="related" className="scroll-mt-20 bg-white py-20">
      <div className="container-x">
        <Reveal>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Complete your setup
          </h2>
          <p className="mt-2 text-slatey-500">Accessories that pair perfectly with the Balcony System.</p>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {related.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.05}>
              <div className="group flex h-full flex-col overflow-hidden rounded-xl2 border border-ink/[0.07] bg-surface transition hover:shadow-soft">
                <div className="aspect-square overflow-hidden bg-white">
                  <img
                    src={r.img}
                    alt={r.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <p className="flex-1 font-display text-sm font-semibold text-ink">{r.name}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="font-display text-base font-extrabold text-ink">
                      {euro(r.price)}
                    </span>
                    <button
                      className="grid h-9 w-9 place-items-center rounded-full bg-ink text-lime transition hover:bg-ink-700"
                      aria-label={`Add ${r.name} to cart`}
                    >
                      <Plus size={16} />
                    </button>
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
