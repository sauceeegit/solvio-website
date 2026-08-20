import { useState } from 'react';
import { asset } from '../../lib/format';
import Reveal from '../Reveal';
import { useLanguage } from '../../context/LanguageContext';

const copy = {
  en: {
    heading: 'Turn Sunshine Into Savings',
    body: 'Solvio makes solar energy simple. Our premium plug-and-play balcony solar systems let you generate your own clean electricity in minutes—no complicated installation, no expensive renovations, just reliable energy and lower electricity bills.',
    showMore: 'Show more',
    showLess: 'Show less',
    features: [
      { title: 'Plug & Play Simplicity', body: 'Install your system in minutes and start generating clean electricity right away.' },
      { title: 'Lower Your Energy Bills', body: 'Use the power of the sun to reduce your monthly electricity costs—every single day.' },
      { title: 'Premium Black Solar Panels', body: 'High-efficiency monocrystalline modules with a sleek all-black design for maximum performance\nand modern aesthetics.' },
      { title: 'Designed for Every Home', body: 'Perfect for balconies, terraces, gardens, apartments, and small outdoor spaces.' },
      { title: 'Built for Every Season', body: 'Engineered to withstand sun, rain, wind, and changing weather for years of dependable performance.' },
      { title: 'Long-Term Value', body: 'Enjoy clean energy, minimal maintenance, and reliable savings for many years to come.' },
    ],
  },
  th: {
    heading: 'เปลี่ยนแสงแดดให้เป็นเงินออม',
    body: 'Solvio ทำให้พลังงานโซลาร์ง่ายดาย ระบบโซลาร์ระเบียงแบบปลั๊กแอนด์เพลย์ระดับพรีเมียมของเราช่วยให้คุณผลิตไฟฟ้าสะอาดได้ภายในไม่กี่นาที — ไม่ต้องติดตั้งซับซ้อน ไม่ต้องปรับปรุงราคาแพง แค่พลังงานที่เชื่อถือได้และค่าไฟที่ลดลง',
    showMore: 'ดูเพิ่มเติม',
    showLess: 'ดูน้อยลง',
    features: [
      { title: 'เรียบง่าย แค่เสียบปลั๊ก', body: 'ติดตั้งระบบได้ในไม่กี่นาทีและเริ่มผลิตไฟฟ้าสะอาดได้ทันที' },
      { title: 'ลดค่าไฟฟ้าของคุณ', body: 'ใช้พลังงานจากดวงอาทิตย์เพื่อลดค่าไฟฟ้ารายเดือน — ทุกวัน' },
      { title: 'แผงโซลาร์สีดำระดับพรีเมียม', body: 'โมดูลโมโนคริสตัลไลน์ประสิทธิภาพสูงดีไซน์สีดำทั้งหมดเพื่อประสิทธิภาพสูงสุดและความสวยงามทันสมัย' },
      { title: 'เหมาะกับทุกบ้าน', body: 'เหมาะสำหรับระเบียง ดาดฟ้า สวน อพาร์ตเมนต์ และพื้นที่กลางแจ้งขนาดเล็ก' },
      { title: 'ทนทานทุกฤดูกาล', body: 'ออกแบบมาเพื่อทนต่อแสงแดด ฝน ลม และสภาพอากาศที่เปลี่ยนแปลงได้หลายปี' },
      { title: 'คุ้มค่าในระยะยาว', body: 'เพลิดเพลินกับพลังงานสะอาด บำรุงรักษาน้อย และประหยัดได้ต่อเนื่องหลายปี' },
    ],
  },
};

const VISIBLE_MOBILE = 2;

export default function SunshineSection() {
  const [expanded, setExpanded] = useState(false);
  const { lang } = useLanguage();
  const t = copy[lang] || copy.en;

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container-x">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">

          {/* Image */}
          <Reveal>
            <img
              src={asset('/solvio-savings.webp')}
              alt="Solvio balcony solar system installed on a modern home"
              className="mx-auto w-full max-h-[580px] rounded-2xl object-contain"
              loading="lazy"
            />
          </Reveal>

          {/* Text */}
          <div>
            <Reveal delay={0.05}>
              <h2 className="text-2xl font-semibold tracking-tight text-price sm:text-3xl" style={{ fontFamily: '"Space Grotesk", system-ui, sans-serif' }}>
                {t.heading}
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-4 text-base leading-relaxed text-ink/75">{t.body}</p>
            </Reveal>

            <ul className="mt-8 space-y-5">
              {t.features.map((f, i) => (
                <Reveal key={f.title} delay={0.1 + i * 0.07}>
                  <li className={`flex items-start gap-3.5 ${i >= VISIBLE_MOBILE && !expanded ? 'hidden sm:flex' : 'flex'}`}>
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-lime">
                      <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
                        <path d="M1 4L4.5 7.5L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <div>
                      <p className="font-display text-[15px] font-bold text-ink">{f.title}</p>
                      <p className="mt-0.5 whitespace-pre-line text-[13px] leading-relaxed text-ink/72">{f.body}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>

            {/* Show more — mobile only */}
            <Reveal delay={0.15}>
              <button
                type="button"
                onClick={() => setExpanded(!expanded)}
                className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-ink/20 px-4 py-2 font-display text-sm font-semibold text-ink transition hover:border-lime hover:text-lime sm:hidden"
              >
                {expanded ? t.showLess : t.showMore}
              </button>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}
