import { icons } from '../../lib/icons';
import { whyShop } from '../../data/landing';
import Reveal from '../Reveal';

const cellClass = [
  'lg:row-span-2',
  '',
  '',
  '',
  '',
  'lg:col-span-2',
  '',
  '',
];

export default function WhyShop() {
  return (
    <section className="bg-surface py-16">
      <div className="container-x">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">The Solvio difference</p>
            <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Why shop at the Solvio official store
            </h2>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-5 lg:grid-rows-2">
          {whyShop.map((item, i) => {
            const Icon = icons[item.icon] ?? icons.Check;
            const big = i === 0 || i === 5;
            return (
              <Reveal key={item.title} delay={(i % 5) * 0.05} className={`h-full ${cellClass[i]}`}>
                {item.img ? (
                  <div className="group relative h-full min-h-[150px] overflow-hidden rounded-xl2">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent" />
                    <h3 className="absolute inset-x-0 bottom-0 p-5 text-center font-display text-sm font-bold leading-snug text-[#FCF6EC] sm:text-[15px]">
                      {item.title}
                    </h3>
                  </div>
                ) : (
                  <div className="group flex h-full min-h-[150px] flex-col items-center justify-center gap-4 rounded-xl2 bg-[#acb7f9] p-5 text-center transition hover:bg-[#96a4f7]">
                    <Icon
                      size={big ? 58 : 38}
                      strokeWidth={1.6}
                      className="text-[#213c2f] transition group-hover:scale-105"
                    />
                    <h3 className="font-display text-sm font-bold leading-snug text-[#213c2f] sm:text-[15px]">
                      {item.title}
                    </h3>
                  </div>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
