import { Image as ImageIcon } from 'lucide-react';
import { included } from '../data/product';
import Reveal from './Reveal';

export default function IncludedItems() {
  return (
    <section className="bg-white py-20">
      <div className="container-x">
        <Reveal>
          <h2 className="text-center font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            What is included in the delivery?
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-9 sm:grid-cols-3 lg:grid-cols-5">
          {included.map((item, i) => (
            <Reveal key={item.name} delay={i * 0.05}>
              <div className="flex flex-col">
                {/* image placeholder — drop a real product photo in later */}
                <div className="flex aspect-square items-center justify-center rounded-xl2 border border-ink/[0.06] bg-surface">
                  <ImageIcon size={34} className="text-ink/15" />
                </div>
                <p className="mt-3 font-display text-[15px] font-bold leading-snug text-ink">
                  {item.name}
                </p>
                <p className="mt-1 text-xs leading-snug text-slatey-500">{item.sub}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
