import { asset } from '../lib/format';
import Reveal from './Reveal';

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
      className="relative w-full flex items-center justify-center"
      style={{ height: 160, background: '#F4F4F2', borderRadius: 16, overflow: 'hidden', ...style }}
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

const topRow = [
  {
    badge: '4x',
    img: asset('/4xPanels.png'),
    imgAlt: '4x 450 Wp Solar Module',
    imgStyle: { objectPosition: 'center' },
    title: '4x 450 Wp Solar Module',
    bullets: ['1760 x 1130 mm', 'Full Black – Glas-Glas', '25-Year Performance Warranty'],
  },
  {
    badge: '1x',
    img: asset('/kit-inverter.png'),
    imgAlt: '1x Micro Inverter 800 W',
    title: '1x Micro Inverter 800 W',
    bullets: ['Max. Output Power: 800 W', 'Wi-Fi Enabled', 'IP67 Waterproof'],
  },
  {
    badge: '2x',
    img: asset('/kit-ycable.png'),
    imgAlt: '2x Y-Cable Set',
    title: '2x Y-Cable Set',
    bullets: ['Parallel Connection', 'Connects two modules to one DC input'],
  },
  {
    badge: '4x',
    img: asset('/kit-bracket.png'),
    imgAlt: '4x Mounting Bracket',
    title: '4x Mounting Bracket',
    bullets: ['Adjustable tilt frame', 'Corrosion-resistant', 'Built for outdoor use'],
  },
  {
    badge: '1x',
    img: asset('/kit-manual.png'),
    imgAlt: '1x Installation Manual',
    title: '1x Installation Manual',
    bullets: ['Step-by-step guide', 'Illustrated instructions', 'Easy installation'],
  },
];

const bottomRow = [
  {
    badge: '2x',
    img: asset('/kit-cable-1m.png'),
    imgAlt: '2x DC Extension Cable – 1 m',
    title: '2x DC Extension Cable – 1 m',
    bullets: ['Connects modules to inverter / storage', 'UV-resistant, outdoor grade'],
  },
  {
    badge: '4x',
    img: asset('/kit-cable-2m.png'),
    imgAlt: '4x DC Extension Cable – 2 m',
    title: '4x DC Extension Cable – 2 m',
    bullets: ['Connects modules to inverter / storage', 'UV-resistant, outdoor grade'],
  },
  {
    badge: '1x',
    img: asset('/kit-hardware.png'),
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

export default function IncludedItems() {
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
            className="font-display"
            style={{
              fontSize: 'clamp(36px, 4vw, 50px)',
              fontWeight: 500,
              color: '#09321B',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              maxWidth: 560,
            }}
          >
            What's included in your<br />Solvio complete kit.
          </h2>
          <p
            className="mt-3"
            style={{ fontSize: 15, color: '#555', lineHeight: 1.5 }}
          >
            Premium components.<br />Designed to work perfectly together.
          </p>
        </Reveal>

        {/* Top row — 5 equal cards */}
        <div className="mt-10 grid gap-4" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
          {topRow.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.05}>
              <KitCard {...item} />
            </Reveal>
          ))}
        </div>

        {/* Bottom row — 3 cards, last one slightly wider on large screens */}
        <div className="mt-4 grid gap-4" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
          {bottomRow.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.05}>
              <KitCard {...item} />
            </Reveal>
          ))}
        </div>

        {/* Feature bar */}
        <Reveal>
          <div
            className="mt-8 grid grid-cols-4 gap-6"
            style={{
              background: '#fff',
              borderRadius: 20,
              padding: '20px 32px',
              boxShadow: '0 1px 6px rgba(9,50,27,0.06)',
            }}
          >
            {features.map(({ Icon, title, sub }) => (
              <div key={title} className="flex items-center gap-3">
                <Icon />
                <div>
                  <p className="font-display font-bold" style={{ fontSize: 13, color: '#09321B' }}>
                    {title}
                  </p>
                  <p style={{ fontSize: 12, color: '#888' }}>{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
