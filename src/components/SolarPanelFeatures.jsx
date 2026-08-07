import Reveal from './Reveal';
import { asset } from '../lib/format';

const cards = [
  {
    id: 'aesthetics',
    img: asset('/sp-feature-house.webp'),
    imgAlt: 'Modern home with Solvio Black Feather solar panels on the roof',
    title: 'The Black Feather.\nMade for Real Homes.',
    body: 'All-black, ultra-slim, and built to complement your home — not just sit on top of it. Solar that looks like it belongs.',
    bg: '#09321B',
    textColor: '#fff',
    subtextColor: 'rgba(255,255,255,0.65)',
    imgPosition: 'object-top',
  },
  {
    id: 'lightweight',
    img: asset('/sp-feature-2.webp'),
    imgAlt: 'Ultra-thin Solvio Dark Feather panel floating above a mountain landscape',
    title: 'So light, your roof\nwon\'t feel it.',
    body: 'Weight only 6 kg/m² and 4.5 mm thick — the slimmest glass-glass panel on the market.',
    bg: '#f5f5f7',
    textColor: '#09321B',
    subtextColor: 'rgba(9,50,27,0.6)',
    imgPosition: 'object-center',
  },
];

export default function SolarPanelFeatures() {
  return (
    <section className="bg-white py-6 sm:py-8">
      <div className="container-x">
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
          {cards.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.08}>
              <div
                className="relative flex flex-col overflow-hidden rounded-3xl"
                style={{ backgroundColor: c.bg, minHeight: 560 }}
              >
                {/* image — top 60% */}
                <div className="relative h-[62%] w-full overflow-hidden" style={{ minHeight: 300 }}>
                  <img
                    loading="lazy"
                    src={c.img}
                    alt={c.imgAlt}
                    className={`absolute inset-0 h-full w-full object-cover ${c.imgPosition}`}
                  />
                </div>

                {/* text — bottom */}
                <div className="flex flex-1 flex-col justify-end p-7 sm:p-8">
                  <h2
                    className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl"
                    style={{ color: c.textColor, fontFamily: '"Space Grotesk", system-ui, sans-serif', whiteSpace: 'pre-line' }}
                  >
                    {c.title}
                  </h2>
                  <p className="mt-3 text-[15px] leading-relaxed" style={{ color: c.subtextColor }}>
                    {c.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
