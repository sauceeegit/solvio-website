import { Sun, Home, Building2, Leaf, HeartHandshake, ShieldCheck, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import Header from '../components/landing/Header';
import Footer from '../components/Footer';
import ContactSection from '../components/ContactSection';
import Reveal from '../components/Reveal';
import { asset } from '../lib/format';
import { usePageMeta } from '../hooks/usePageMeta';

const values = [
  {
    icon: Sun,
    title: 'Solar for everyone',
    titleTh: 'โซลาร์สำหรับทุกคน',
    body: 'Rooftop systems for homeowners, balcony kits for renters, portable power for the road — whoever you are, there is a Solvio way to go solar.',
    bodyTh: 'ระบบหลังคาสำหรับเจ้าของบ้าน ชุดระเบียงสำหรับผู้เช่า พลังงานพกพาสำหรับการเดินทาง — ไม่ว่าคุณจะเป็นใคร มีวิธี Solvio ให้คุณใช้โซลาร์ได้',
  },
  {
    icon: ShieldCheck,
    title: 'Honest advice',
    titleTh: 'คำแนะนำที่ซื่อสัตย์',
    body: 'We tell you the truth about your roof, your savings and your payback — even when the honest answer is “not yet.”',
    bodyTh: 'เราบอกความจริงเกี่ยวกับหลังคา การประหยัด และระยะเวลาคืนทุนของคุณ — แม้คำตอบที่ซื่อสัตย์จะเป็น “ยังไม่ถึงเวลา”',
  },
  {
    icon: Leaf,
    title: 'Built for Thailand',
    titleTh: 'ออกแบบสำหรับประเทศไทย',
    body: 'Every system is engineered for Thai heat, sun and storms, and for the PEA/MEA rules that govern connecting to the grid.',
    bodyTh: 'ทุกระบบถูกออกแบบสำหรับความร้อน แสงแดด และพายุในประเทศไทย รวมถึงกฎระเบียบ PEA/MEA ในการเชื่อมต่อกับระบบไฟฟ้า',
  },
  {
    icon: HeartHandshake,
    title: 'Here for the long run',
    titleTh: 'อยู่เคียงข้างคุณระยะยาว',
    body: 'Solar is a 25-year relationship. We handle the paperwork, the install and the warranty so you never chase a manufacturer alone.',
    bodyTh: 'โซลาร์คือความสัมพันธ์ 25 ปี เราดูแลเอกสาร การติดตั้ง และการรับประกัน เพื่อให้คุณไม่ต้องวิ่งหาผู้ผลิตคนเดียว',
  },
];

const stats = [
  { value: '25+ yrs', label: 'Panel performance warranty', labelTh: 'การรับประกันประสิทธิภาพแผง' },
  { value: '1–3 days', label: 'Typical rooftop install', labelTh: 'ระยะเวลาติดตั้งหลังคาทั่วไป' },
  { value: '100%', label: 'Permitting handled for you', labelTh: 'ดูแลใบอนุญาตครบทุกขั้นตอน' },
  { value: 'Phuket', label: 'Proudly based in Thailand', labelTh: 'ตั้งอยู่ในประเทศไทย' },
];

export default function AboutPage() {
  usePageMeta('/about');
  const { lang } = useLanguage();

  return (
    <div id="top" className="min-h-screen bg-surface">
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-ink text-white">
          <div className="container-x grid items-center gap-10 py-16 sm:py-20 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <p className="eyebrow text-lime">{lang === 'th' ? 'เกี่ยวกับ Solvio' : 'About Solvio'}</p>
              <h1 className="mt-3 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
                {lang === 'th' ? 'ทุกคนสมควรได้รับแสงอาทิตย์' : 'Everyone deserves the sun.'}
              </h1>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/70">
                {lang === 'th'
                  ? 'Solvio ทำให้พลังงานโซลาร์สะอาดและราคาเข้าถึงได้ง่ายสำหรับทุกบ้านและธุรกิจในไทย — ไม่ว่าจะเป็นเจ้าของหลังคา เช่าคอนโดที่มีระเบียง หรือต้องการพลังงานที่พกพาได้'
                  : 'Solvio makes clean, affordable solar simple for every Thai home and business — whether you own a rooftop, rent a condo with a balcony, or just want power that goes wherever you do.'}
              </p>
              <a
                href="#contact"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-lime px-6 py-3 font-display text-sm font-bold text-white transition hover:bg-lime-dark"
              >
                {lang === 'th' ? 'ติดต่อเรา' : 'Talk to us'} <ArrowRight size={16} />
              </a>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="overflow-hidden rounded-xl2 shadow-lift">
                <img
                  src={asset('/rooftop-cta.webp')}
                  alt="Solvio technicians installing a rooftop solar array in Thailand"
                  width={1448}
                  height={1086}
                  className="block w-full"
                  loading="lazy"
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* Story */}
        <section className="bg-white py-16 sm:py-20">
          <div className="container-x grid gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <p className="eyebrow">{lang === 'th' ? 'เรื่องราวของเรา' : 'Our story'}</p>
              <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                {lang === 'th' ? 'โซลาร์ โดยไม่ต้องเดาสุ่ม' : 'Solar, without the guesswork'}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="space-y-4 text-[15px] leading-relaxed text-slatey-700">
                {lang === 'th' ? (
                  <>
                    <p>Solvio เริ่มต้นจากความหงุดหนิดง่ายๆ: การติดโซลาร์ในประเทศไทยยากกว่าที่ควรจะเป็นมาก ใบเสนอราคาที่สับสน ราคาที่ไม่โปร่งใส และเอกสารที่ทำให้คนถอดใจก่อนจะได้สัมผัสกับพลังงานแสงอาทิตย์</p>
                    <p>เราจึงสร้างบริษัทที่เราอยากให้มีอยู่ — บริษัทที่กำหนดราคาทุกอย่างอย่างโปร่งใสเป็นบาท ออกแบบระบบอย่างตรงไปตรงมาตามบ้านที่อยู่ตรงหน้า และดูแลการจดทะเบียน ERC และการเชื่อมต่อ PEA/MEA แทนคุณ</p>
                    <p>วันนี้เราช่วยเจ้าของบ้านติดแผงบนหลังคา ผู้เช่าติดชุดพลักแอนด์เพลย์บนระเบียง และนักเดินทางพกพลังงานไปนอกระบบ — ทั้งหมดนี้ได้รับการสนับสนุนจากทีมเดียวกัน การรับประกันเดียวกัน และคำมั่นเดียวกัน: พลังงานสะอาดสำหรับทุกบ้านในไทย</p>
                  </>
                ) : (
                  <>
                    <p>Solvio started with a simple frustration: going solar in Thailand was far harder than it needed to be. Confusing quotes, opaque pricing, and paperwork that scared people off before they ever felt the sun on their meter.</p>
                    <p>So we built the company we wished existed — one that prices everything transparently in Baht, sizes each system honestly to the home in front of it, and handles the ERC registration and PEA/MEA connection so you don&apos;t have to.</p>
                    <p>Today we help homeowners cover their rooftops, renters clip plug-and-play kits to their balconies, and travellers carry power off-grid — all backed by the same team, the same warranties, and the same promise: clean energy for every Thai home.</p>
                  </>
                )}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Two audiences */}
        <section className="bg-[#EEF5FC] py-16 sm:py-20">
          <div className="container-x">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <p className="eyebrow">{lang === 'th' ? 'เราดูแลใคร' : 'Who we serve'}</p>
                <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                  {lang === 'th' ? 'เจ้าของหรือผู้เช่า — มี Solvio สำหรับคุณ' : "Own or rent — there's a Solvio for you"}
                </h2>
              </div>
            </Reveal>
            <div className="mx-auto mt-10 grid max-w-4xl gap-5 sm:grid-cols-2">
              <Reveal>
                <div className="card h-full p-7">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-lime/10 text-lime-dark">
                    <Home size={24} />
                  </span>
                  <h3 className="mt-4 font-display text-xl font-bold text-ink">{lang === 'th' ? 'สำหรับเจ้าของบ้าน' : 'For homeowners'}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slatey-700">
                    {lang === 'th' ? 'ระบบหลังคาเต็มรูปแบบที่ออกแบบตามบ้านของคุณ เพื่อผลผลิตสูงสุดและการประหยัดระยะยาวที่ดีที่สุด — พร้อมตัวเลือกสินเชื่อและรับซื้อไฟคืน' : 'Full rooftop systems sized to your home, designed for maximum yield and the biggest long-term savings — with financing and buyback options included.'}
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.08}>
                <div className="card h-full p-7">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-lime/10 text-lime-dark">
                    <Building2 size={24} />
                  </span>
                  <h3 className="mt-4 font-display text-xl font-bold text-ink">{lang === 'th' ? 'สำหรับผู้เช่า' : 'For renters'}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slatey-700">
                    {lang === 'th' ? 'ชุดระเบียงแบบพลักแอนด์เพลย์ที่ไม่ต้องเจาะ ไม่ต้องช่างไฟ และไม่ต้องขอใบอนุญาต — และย้ายตามคุณไปได้ทุกที่ โซลาร์ที่เริ่มได้วันนี้' : 'Plug-and-play balcony kits that need no drilling, no electrician and no permits — and move with you when you do. Solar you can start today.'}
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-white py-16 sm:py-20">
          <div className="container-x">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <p className="eyebrow">{lang === 'th' ? 'สิ่งที่เราเชื่อ' : 'What we stand for'}</p>
                <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                  {lang === 'th' ? 'ค่านิยมของเรา' : 'Our values'}
                </h2>
              </div>
            </Reveal>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((v, i) => (
                <Reveal key={v.title} delay={i * 0.06}>
                  <div className="card h-full p-6">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-lime/10 text-lime-dark">
                      <v.icon size={22} />
                    </span>
                    <h3 className="mt-4 font-display text-lg font-bold text-ink">{lang === 'th' ? v.titleTh : v.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slatey-700">{lang === 'th' ? v.bodyTh : v.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-ink py-14 text-white">
          <div className="container-x grid grid-cols-2 gap-8 text-center lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-display text-3xl font-extrabold text-lime sm:text-4xl">{s.value}</p>
                <p className="mt-1.5 text-sm text-white/60">{lang === 'th' ? s.labelTh : s.label}</p>
              </div>
            ))}
          </div>
        </section>

        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
