import Reveal from './Reveal';
import { asset } from '../lib/format';

const cards = [
  {
    id: 'aesthetics',
    img: asset('/sp-feature-house.webp'),
    imgAlt: 'Modern home with Solvio Black Feather solar panels on the roof',
    title: 'The Black Feather.\nMade for Real Homes.',
    body: 'All-black, ultra-slim, built to complement your home — not just sit on top of it.',
    bg: '#ffffff',
    imgPosition: 'object-top',
  },
  {
    id: 'lightweight',
    img: asset('/sp-feature-2.webp'),
    imgAlt: 'Ultra-thin Solvio Dark Feather panel floating above a mountain landscape',
    title: "So light, your roof\nwon't feel it.",
    body: 'Just 6 kg/m² and 4.5 mm thin — the slimmest glass-glass panel on the market.',
    bg: '#f5f5f7',
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
                className="flex flex-col overflow-hidden rounded-3xl"
                style={{
                  backgroundColor: c.bg,
                  boxShadow: '0 2px 24px rgba(0,0,0,0.08)',
                  minHeight: 520,
                }}
              >
                {/* text — top */}
                <div className="px-7 pb-4 pt-8 sm:px-8 sm:pt-9">
                  <h2
                    className="text-[1.7rem] font-semibold leading-tight tracking-tight text-ink sm:text-3xl"
                    style={{ fontFamily: '"Space Grotesk", system-ui, sans-serif', whiteSpace: 'pre-line' }}
                  >
                    {c.title}
                  </h2>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink/50">
                    {c.body}
                  </p>
                </div>

                {/* image — fills remaining space, bleeds to edges */}
                <div className="relative mt-2 flex-1 overflow-hidden">
                  <img
                    loading="lazy"
                    src={c.img}
                    alt={c.imgAlt}
                    className={`absolute inset-0 h-full w-full object-cover ${c.imgPosition}`}
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
