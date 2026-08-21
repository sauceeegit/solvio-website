import { asset } from '../lib/format';
import Reveal from './Reveal';
import { useLanguage } from '../context/LanguageContext';

// Bottom feature bar icons (inline SVG, orange outline)
function IconBox() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF5A00" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    </svg>
  );
}
function IconStar() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF5A00" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
function IconWrench() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF5A00" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  );
}
function IconHeadset() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF5A00" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
    </svg>
  );
}

// Individual product image slot — neutral bg when image is missing
function ProductImg({ src, alt, style = {} }) {
  return (
    <div
      className="relative flex w-full items-center justify-center h-[116px] sm:h-40"
      style={{ background: '#F4F4F2', borderRadius: 16, overflow: 'hidden', ...style }}
    >
      {src ? (
        <img loading="lazy"
          src={src}
          alt={alt}
          style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
        />
      ) : (
        <div style={{ width: '100%', height: '100%', background: '#EFEFED' }} />
      )}
    </div>
  );
}

// Orange quantity badge
function Badge({ label }) {
  return (
    <span
      className="inline-flex items-center justify-center font-display font-bold"
      style={{
        background: '#FF5A00',
        color: '#fff',
        borderRadius: 10,
        fontSize: 13,
        padding: '3px 10px',
        lineHeight: 1.4,
        minWidth: 32,
      }}
    >
      {label}
    </span>
  );
}

// Single kit card
function KitCard({ badge, img, imgAlt, imgStyle, title, bullets }) {
  return (
    <div
      className="flex flex-col"
      style={{
        background: '#fff',
        borderRadius: 24,
        padding: '20px 20px 22px',
        boxShadow: '0 2px 12px rgba(9,50,27,0.07)',
        height: '100%',
      }}
    >
      {/* Badge */}
      <div style={{ marginBottom: 14 }}>
        <Badge label={badge} />
      </div>

      {/* Product image */}
      <ProductImg src={img} alt={imgAlt} style={imgStyle} />

      {/* Title */}
      <p
        className="font-display font-bold mt-4 leading-snug"
        style={{ fontSize: 15, color: '#09321B' }}
      >
        {title}
      </p>

      {/* Bullets */}
      <ul className="mt-2 flex flex-col gap-0.5">
        {bullets.map((b) => (
          <li key={b} style={{ fontSize: 12, color: '#666', lineHeight: 1.5 }}>
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}

// `cls` sets a mobile-only display order (desktop keeps the source order in a
// single 5-up row). On mobile the panel card leads full-width, then the inverter
// sits right beside the installation manual on the last row.
const topRow = [
  {
    badge: '4x',
    img: asset('/4xPanels.webp'),
    imgAlt: '4x 450 Wp Solar Module',
    imgStyle: { objectPosition: 'center' },
    title: '4x 450 Wp Solar Module',
    bullets: ['1760 x 1130 mm', 'Full Black – Glas-Glas', '25-Year Performance Warranty'],
    cls: 'max-sm:order-1 max-sm:col-span-2',
  },
  {
    badge: '1x',
    img: asset('/kit-inverter.webp'),
    imgAlt: '1x Micro Inverter 800 W',
    title: '1x Micro Inverter 800 W',
    bullets: ['Max. Output Power: 800 W', 'Wi-Fi Enabled', 'IP67 Waterproof'],
    cls: 'max-sm:order-4',
  },
  {
    badge: '2x',
    img: asset('/kit-ycable.webp'),
    imgAlt: '2x Y-Cable Set',
    title: '2x Y-Cable Set',
    bullets: ['Parallel Connection', 'Connects two modules to one DC input'],
    cls: 'max-sm:order-2',
  },
  {
    badge: '4x',
    img: asset('/kit-bracket.webp'),
    imgAlt: '4x Mounting Bracket',
    title: '4x Mounting Bracket',
    bullets: ['Adjustable tilt frame', 'Corrosion-resistant', 'Built for outdoor use'],
    cls: 'max-sm:order-3',
  },
  {
    badge: '1x',
    img: asset('/kit-manual.webp'),
    imgAlt: '1x Installation Manual',
    title: '1x Installation Manual',
    bullets: ['Step-by-step guide', 'Illustrated instructions', 'Easy installation'],
    cls: 'max-sm:order-5',
  },
];

const bottomRow = [
  {
    badge: '2x',
    img: asset('/kit-cable-1m.webp'),
    imgAlt: '2x DC Extension Cable – 1 m',
    title: '2x DC Extension Cable – 1 m',
    bullets: ['Connects modules to inverter / storage', 'UV-resistant, outdoor grade'],
  },
  {
    badge: '4x',
    img: asset('/kit-cable-2m.webp'),
    imgAlt: '4x DC Extension Cable – 2 m',
    title: '4x DC Extension Cable – 2 m',
    bullets: ['Connects modules to inverter / storage', 'UV-resistant, outdoor grade'],
  },
  {
    badge: '1x',
    img: asset('/kit-hardware.webp'),
    imgAlt: '1x Inverter Bracket & Hardware Kit',
    title: '1x Inverter Bracket & Hardware Kit',
    bullets: ['Fixes the inverter to the module frame', 'All tools & fasteners included'],
  },
];

const features = [
  { Icon: IconBox, title: 'Complete system', sub: 'All components included' },
  { Icon: IconStar, title: 'Premium quality', sub: 'Built to last for years' },
  { Icon: IconWrench, title: 'Easy installation', sub: 'Plug, mount and produce' },
  { Icon: IconHeadset, title: 'Lifetime support', sub: "We're here to help" },
];

const featuresTh = [
  { title: 'ครบชุด', sub: 'รวมทุกชิ้นส่วน' },
  { title: 'คุณภาพพรีเมียม', sub: 'ออกแบบให้คงทนหลายปี' },
  { title: 'ติดตั้งง่าย', sub: 'ปลั๊ก ติดตั้ง และผลิตไฟ' },
  { title: 'บริการตลอดชีพ', sub: 'เราพร้อมช่วยเสมอ' },
];

const topRowTh = [
  { title: '4x แผงโซลาร์ 450 Wp', bullets: ['1760 x 1130 mm', 'Full Black – กระจก-กระจก', 'รับประกันประสิทธิภาพ 25 ปี'] },
  { title: '1x ไมโครอินเวอร์เตอร์ 800 W', bullets: ['กำลังไฟสูงสุด: 800 W', 'รองรับ Wi-Fi', 'กันน้ำ IP67'] },
  { title: '2x ชุดสาย Y-Cable', bullets: ['ต่อขนาน', 'เชื่อมสองแผงเข้าอินพุต DC เดียว'] },
  { title: '4x ขาตั้งยึด', bullets: ['กรอบปรับมุมได้', 'ทนการกัดกร่อน', 'ใช้งานกลางแจ้ง'] },
  { title: '1x คู่มือการติดตั้ง', bullets: ['คำแนะนำทีละขั้นตอน', 'ภาพประกอบชัดเจน', 'ติดตั้งง่าย'] },
];

const bottomRowTh = [
  { title: '2x สายขยาย DC – 1 ม.', bullets: ['เชื่อมแผงกับอินเวอร์เตอร์/แบตเตอรี่', 'ทนรังสี UV เกรดกลางแจ้ง'] },
  { title: '4x สายขยาย DC – 2 ม.', bullets: ['เชื่อมแผงกับอินเวอร์เตอร์/แบตเตอรี่', 'ทนรังสี UV เกรดกลางแจ้ง'] },
  { title: '1x ขาตั้งอินเวอร์เตอร์ & ชุดอุปกรณ์', bullets: ['ยึดอินเวอร์เตอร์กับกรอบแผง', 'รวมเครื่องมือและน็อตทั้งหมด'] },
];

export default function IncludedItems() {
  const { lang } = useLanguage();
  const th = lang === 'th';
  return (
    <section style={{ background: '#FFF7E9' }} className="py-20">
      <div className="container-x">
        {/* Header */}
        <Reveal>
          <p
            className="font-display"
            style={{ fontSize: 13, color: '#FF5A00', fontWeight: 600, marginBottom: 12, letterSpacing: '0.02em' }}
          >
            Solvio
          </p>
          <h2
            className="font-display text-[26px] sm:text-[clamp(36px,4vw,50px)]"
            style={{
              fontWeight: 500,
              color: '#09321B',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              maxWidth: 560,
            }}
          >
            {th ? <>สิ่งที่รวมอยู่ใน<br />ชุดครบ Solvio ของคุณ</> : <>What's included in your<br />Solvio complete kit.</>}
          </h2>
          <p
            className="mt-3"
            style={{ fontSize: 15, color: '#555', lineHeight: 1.5 }}
          >
            {th ? <>ชิ้นส่วนพรีเมียม<br />ออกแบบมาให้ทำงานร่วมกันได้อย่างสมบูรณ์แบบ</> : <>Premium components.<br />Designed to work perfectly together.</>}
          </p>
        </Reveal>

        {/* Top row — 5 equal cards (2-up on mobile) */}
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {topRow.map((item, i) => {
            const translated = th ? { ...item, title: topRowTh[i].title, bullets: topRowTh[i].bullets } : item;
            return (
              <Reveal key={item.title} delay={i * 0.05} className={item.cls}>
                <KitCard {...translated} />
              </Reveal>
            );
          })}
        </div>

        {/* Bottom row — 3 cards (2-up on mobile) */}
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {bottomRow.map((item, i) => {
            const translated = th ? { ...item, title: bottomRowTh[i].title, bullets: bottomRowTh[i].bullets } : item;
            return (
              <Reveal key={item.title} delay={i * 0.05}>
                <KitCard {...translated} />
              </Reveal>
            );
          })}
        </div>

        {/* Feature bar */}
        <Reveal>
          <div
            className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4"
            style={{
              background: '#fff',
              borderRadius: 20,
              padding: '20px 32px',
              boxShadow: '0 1px 6px rgba(9,50,27,0.06)',
            }}
          >
            {features.map(({ Icon, title, sub }, i) => {
              const f = th ? featuresTh[i] : { title, sub };
              return (
                <div key={title} className="flex items-start gap-3">
                  <Icon />
                  <div>
                    <p className="font-display font-bold" style={{ fontSize: 13, color: '#09321B' }}>
                      {f.title}
                    </p>
                    <p style={{ fontSize: 12, color: '#888' }}>{f.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
