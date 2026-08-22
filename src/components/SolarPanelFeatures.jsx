import Reveal from './Reveal';
import { asset } from '../lib/format';
import { useLanguage } from '../context/LanguageContext';

const cards = [
  {
    id: 'aesthetics',
    img: asset('/sp-feature-house.webp'),
    imgAlt: 'Modern home with Solvio Black Feather solar panels on the roof',
    title: 'The Black Feather.\nMade for Real Homes.',
    titleTh: 'Black Feather.\nออกแบบมาเพื่อบ้านจริงๆ',
    body: 'All-black, ultra-slim, built to complement your home — not just sit on top of it.',
    bodyTh: 'สีดำล้วน บางพิเศษ สร้างมาเพื่อเสริมความสวยงามให้บ้านคุณ ไม่ใช่แค่วางทับ',
    imgPosition: 'object-top',
  },
  {
    id: 'lightweight',
    img: asset('/sp-feature-2.webp'),
    imgAlt: 'Ultra-thin Solvio Dark Feather panel floating above a mountain landscape',
    title: "So light, your roof\nwon't feel it.",
    titleTh: 'เบาจนหลังคา\nแทบไม่รู้สึก',
    body: 'Just 6 kg/m² and 4.5 mm thin — the slimmest glass-glass panel on the market.',
    bodyTh: 'เพียง 6 kg/m² และบางแค่ 4.5 mm — แผงกระจก-กระจกที่บางที่สุดในตลาด',
    imgPosition: 'object-center',
  },
];

export default function SolarPanelFeatures() {
  const { lang } = useLanguage();
  const th = lang === 'th';
  return (
    <section className="bg-white pt-14 pb-8 sm:pt-20 sm:pb-10">
      <div className="container-x">
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
          {cards.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.08}>
              <div
                className="flex flex-col overflow-hidden rounded-3xl bg-white"
                style={{ boxShadow: '0 2px 24px rgba(0,0,0,0.08)', minHeight: 520 }}
              >
                {/* image — fills top ~60% */}
                <div className="relative overflow-hidden" style={{ height: 320 }}>
                  <img
                    loading="lazy"
                    src={c.img}
                    alt={c.imgAlt}
                    className={`absolute inset-0 h-full w-full object-cover ${c.imgPosition}`}
                  />
                </div>

                {/* text — bottom */}
                <div className="flex flex-1 flex-col justify-center px-7 py-7 sm:px-8 sm:py-8">
                  <h2
                    className="text-[1.7rem] font-semibold leading-tight tracking-tight text-ink sm:text-3xl"
                    style={{ fontFamily: '"Space Grotesk", system-ui, sans-serif', whiteSpace: 'pre-line' }}
                  >
                    {th ? c.titleTh : c.title}
                  </h2>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink/70">
                    {th ? c.bodyTh : c.body}
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
