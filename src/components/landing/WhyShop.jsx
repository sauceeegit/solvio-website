import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { icons } from '../../lib/icons';
import { whyShop } from '../../data/landing';
import Reveal from '../Reveal';

function SolvioCoin({ size = 104 }) {
  const r = size / 2;
  const cx = r, cy = r;
  const edgeR = r - 1;
  const faceR = edgeR - 5;
  const rimR = faceR - 6;

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      overflow="visible"
      aria-hidden="true"
      style={{ display: 'block' }}
    >
      <defs>
        {/* Main face: angled brushed gold — direction gives the CNC-machined feel */}
        <linearGradient id="sc-face" x1="15%" y1="0%" x2="85%" y2="100%">
          <stop offset="0%"   stopColor="#E4CC8C" />
          <stop offset="22%"  stopColor="#C9A660" />
          <stop offset="48%"  stopColor="#B8924E" />
          <stop offset="72%"  stopColor="#C4A060" />
          <stop offset="100%" stopColor="#D4B870" />
        </linearGradient>

        {/* Edge bevel: bright top-left, dark bottom-right */}
        <linearGradient id="sc-edge" x1="15%" y1="5%" x2="85%" y2="95%">
          <stop offset="0%"   stopColor="#EDD898" />
          <stop offset="40%"  stopColor="#B8924E" />
          <stop offset="100%" stopColor="#8A6828" />
        </linearGradient>

        {/* Specular catch-light — one thin diagonal band */}
        <linearGradient id="sc-spec" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="rgba(255,248,220,0.32)" />
          <stop offset="40%"  stopColor="rgba(255,248,220,0.10)" />
          <stop offset="100%" stopColor="rgba(255,248,220,0)" />
        </linearGradient>

        {/* Subtle cross-light for depth */}
        <linearGradient id="sc-cross" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="rgba(255,240,190,0.10)" />
          <stop offset="100%" stopColor="rgba(80,50,10,0.10)" />
        </linearGradient>

        {/* Clip to coin face */}
        <clipPath id="sc-clip">
          <circle cx={cx} cy={cy} r={faceR} />
        </clipPath>

        {/* Brushed lines: horizontal micro-texture */}
        <pattern id="sc-brush" patternUnits="userSpaceOnUse" x="0" y="0" width={size} height="3">
          <rect width={size} height="1"   fill="rgba(255,255,255,0.045)" />
          <rect width={size} height="0.5" y="1.5" fill="rgba(0,0,0,0.025)" />
        </pattern>
      </defs>

      {/* Contact shadow — very soft ellipse below */}
      <ellipse
        cx={cx + 3} cy={size + 6}
        rx={faceR * 0.78} ry={4}
        fill="rgba(100,65,15,0.13)"
      />

      {/* Ambient drop shadow on the whole coin */}
      <circle
        cx={cx + 1} cy={cy + 3}
        r={edgeR}
        fill="rgba(90,60,15,0.15)"
        style={{ filter: 'blur(5px)' }}
      />

      {/* Outer edge ring — the machined bevel */}
      <circle cx={cx} cy={cy} r={edgeR} fill="url(#sc-edge)" />

      {/* Thin dark groove separating edge from face */}
      <circle cx={cx} cy={cy} r={faceR + 1} fill="none" stroke="rgba(60,35,5,0.35)" strokeWidth="0.8" />

      {/* Main coin face */}
      <circle cx={cx} cy={cy} r={faceR} fill="url(#sc-face)" />

      {/* Brushed micro-texture */}
      <circle cx={cx} cy={cy} r={faceR} fill="url(#sc-brush)" clipPath="url(#sc-clip)" />

      {/* Cross-light overlay */}
      <circle cx={cx} cy={cy} r={faceR} fill="url(#sc-cross)" clipPath="url(#sc-clip)" />

      {/* Inner recessed rim groove */}
      <circle cx={cx} cy={cy} r={rimR + 0.8} fill="none" stroke="rgba(70,42,8,0.40)" strokeWidth="0.7" />
      <circle cx={cx} cy={cy} r={rimR}       fill="none" stroke="rgba(255,228,140,0.18)" strokeWidth="0.5" />

      {/* Specular catch-light */}
      <ellipse
        cx={cx - faceR * 0.22} cy={cy - faceR * 0.28}
        rx={faceR * 0.38} ry={faceR * 0.22}
        fill="url(#sc-spec)"
        transform={`rotate(-38 ${cx - faceR * 0.22} ${cy - faceR * 0.28})`}
        clipPath="url(#sc-clip)"
      />

      {/* Engraved "S" — debossed: dark fill + hairline highlight */}
      <text
        x={cx} y={cy + faceR * 0.36}
        textAnchor="middle"
        fontFamily="-apple-system, 'SF Pro Display', 'Helvetica Neue', sans-serif"
        fontSize={faceR * 0.62}
        fontWeight="700"
        letterSpacing="-1"
        fill="rgba(80,50,12,0.50)"
      >
        S
      </text>
      <text
        x={cx - 0.6} y={cy + faceR * 0.36 - 0.8}
        textAnchor="middle"
        fontFamily="-apple-system, 'SF Pro Display', 'Helvetica Neue', sans-serif"
        fontSize={faceR * 0.62}
        fontWeight="700"
        letterSpacing="-1"
        fill="rgba(255,235,155,0.20)"
      >
        S
      </text>
    </svg>
  );
}

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

function BenefitCard({ item, big }) {
  const Icon = icons[item.icon] ?? icons.Check;
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`flex h-full min-h-[150px] flex-col justify-between rounded-xl2 bg-white p-5 transition-all duration-300 ${big ? 'flex-row items-center gap-6 sm:flex-row' : ''}`}
      style={{
        boxShadow: hovered
          ? '0 12px 40px rgba(15,43,36,0.13)'
          : '0 2px 16px rgba(15,43,36,0.06)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={big ? 'flex items-center gap-5 flex-1' : 'flex flex-col gap-3 flex-1'}>
        <span
          className="inline-flex shrink-0 items-center justify-center rounded-xl"
          style={{
            width: big ? 52 : 40,
            height: big ? 52 : 40,
            background: 'rgba(15,43,36,0.06)',
          }}
        >
          <Icon size={big ? 26 : 20} strokeWidth={1.6} style={{ color: '#0F2B24' }} />
        </span>
        <div>
          <h3
            className="font-display font-bold leading-snug"
            style={{ fontSize: big ? 15 : 13, color: '#0F2B24' }}
          >
            {item.title}
          </h3>
          {item.sub && (
            <p className="mt-0.5 text-[12px] leading-relaxed" style={{ color: '#888' }}>
              {item.sub}
            </p>
          )}
        </div>
      </div>
      <ArrowRight
        size={15}
        className={`shrink-0 transition-all duration-300 ${big ? '' : 'mt-3 self-end'} ${hovered ? 'translate-x-1' : ''}`}
        style={{ color: hovered ? '#FC4302' : '#ccc' }}
      />
    </div>
  );
}

export default function WhyShop() {
  return (
    <section style={{ background: '#FFFDF9' }} className="py-16">
      <div className="container-x">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">The Solvio difference</p>
            <h2
              className="mt-2 font-display text-3xl font-extrabold tracking-tight sm:text-4xl"
              style={{ color: '#0F2B24' }}
            >
              Why choose Solvio?
            </h2>
            <p className="mt-3 text-[15px]" style={{ color: '#888' }}>
              Trusted by thousands of homeowners across Thailand.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-5 lg:grid-rows-2">
          {whyShop.map((item, i) => {
            const big = i === 0 || i === 5;
            return (
              <Reveal key={item.title} delay={(i % 5) * 0.05} className={`h-full ${cellClass[i]}`}>
                {item.img ? (
                  /* Rewards hero card — premium coin layout */
                  <div
                    className="group relative h-full min-h-[150px] rounded-xl2 bg-white p-6"
                    style={{
                      boxShadow: '0 2px 16px rgba(15,43,36,0.06)',
                      overflow: 'visible',
                    }}
                  >
                    {/* LEFT: text stack */}
                    <div className="flex h-full flex-col justify-between" style={{ paddingRight: '38%' }}>
                      <div className="flex flex-col gap-4">
                        {/* Badge */}
                        <span
                          className="inline-block self-start rounded-full font-mono text-[9px] font-bold uppercase tracking-[0.14em]"
                          style={{
                            color: '#FC4302',
                            border: '1px solid rgba(252,67,2,0.28)',
                            padding: '4px 10px',
                          }}
                        >
                          Solvio Rewards
                        </span>

                        {/* Headline */}
                        <h3
                          className="font-display font-extrabold leading-tight"
                          style={{ fontSize: 'clamp(16px,2.2cqw,22px)', color: '#0F2B24' }}
                        >
                          Earn Solvio<br />Rewards
                        </h3>

                        {/* Description */}
                        <p
                          className="text-[12px] leading-relaxed"
                          style={{ color: '#888' }}
                        >
                          Collect points with every purchase. Redeem for discounts, exclusive products and member-only benefits.
                        </p>
                      </div>

                      {/* CTA */}
                      <a
                        href="#"
                        className="inline-flex items-center gap-1.5 font-display text-[13px] font-bold transition-all duration-300 group-hover:gap-2.5"
                        style={{ color: '#FC4302' }}
                      >
                        Learn more <ArrowRight size={13} />
                      </a>
                    </div>

                    {/* RIGHT: coin — absolutely positioned, slightly overflowing right edge */}
                    <div
                      className="pointer-events-none absolute"
                      style={{
                        right: '-10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                      }}
                    >
                      <SolvioCoin size={104} />
                    </div>
                  </div>
                ) : (
                  <BenefitCard item={item} big={big} />
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
