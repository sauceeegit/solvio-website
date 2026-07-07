import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { icons } from '../../lib/icons';
import { whyShop } from '../../data/landing';
import { asset } from '../../lib/format';
import Reveal from '../Reveal';

function SolvioCoin({ size = 82 }) {
  // Layout: face shifted left, bevel circle shifted right → exposes right-side rim
  const vW = 128, vH = 118;
  const fc = { x: 52, y: 58 };   // face center
  const fr = 44;                   // face radius
  const ec = { x: 58, y: 58 };   // bevel/edge center (offset right to show rim)
  const er = fr + 5;               // bevel radius

  // Radial brushed lines (concentric lathe marks)
  const latheLines = [];
  for (let rr = 5; rr < fr - 4; rr += 1.7) {
    const even = Math.round(rr / 1.7) % 2 === 0;
    latheLines.push(
      <circle key={rr} cx={fc.x} cy={fc.y} r={rr} fill="none"
              stroke={even ? 'rgba(255,238,168,0.042)' : 'rgba(0,0,0,0.030)'}
              strokeWidth="1.3" />,
    );
  }

  return (
    <div
      style={{
        display: 'inline-block',
        filter:
          'drop-shadow(0 10px 22px rgba(70,42,6,0.22)) drop-shadow(0 3px 6px rgba(70,42,6,0.16))',
      }}
    >
      <svg
        viewBox={`0 0 ${vW} ${vH}`}
        width={size}
        height={Math.round(size * vH / vW)}
        overflow="visible"
        role="img"
        aria-label="Solvio Rewards coin"
      >
        <defs>
          {/* Face: key light upper-left → shadow lower-right, PBR-like falloff */}
          <radialGradient id="sc2-face" cx="34%" cy="27%" r="78%">
            <stop offset="0%"   stopColor="#F0DC9C" />
            <stop offset="14%"  stopColor="#D8B86C" />
            <stop offset="36%"  stopColor="#C29848" />
            <stop offset="60%"  stopColor="#AA8030" />
            <stop offset="80%"  stopColor="#986C1C" />
            <stop offset="100%" stopColor="#865C0E" />
          </radialGradient>

          {/* Bevel ring: machined edge, bright top-left → dark bottom-right */}
          <linearGradient id="sc2-bevel" x1="18%" y1="8%" x2="82%" y2="92%">
            <stop offset="0%"   stopColor="#F2DC98" />
            <stop offset="28%"  stopColor="#CA9840" />
            <stop offset="62%"  stopColor="#8E6618" />
            <stop offset="100%" stopColor="#6C4800" />
          </linearGradient>

          {/* Rim strip: side of coin, darker/cooler, side-lit */}
          <linearGradient id="sc2-rim" x1="0%" y1="15%" x2="100%" y2="85%">
            <stop offset="0%"   stopColor="#BA9040" />
            <stop offset="38%"  stopColor="#8C6618" />
            <stop offset="72%"  stopColor="#664806" />
            <stop offset="100%" stopColor="#4A3203" />
          </linearGradient>

          {/* Specular #1: sharp primary reflection, angled diagonal */}
          <linearGradient id="sc2-spec1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="rgba(255,252,242,0.74)" />
            <stop offset="18%"  stopColor="rgba(255,248,232,0.32)" />
            <stop offset="48%"  stopColor="rgba(255,245,222,0.06)" />
            <stop offset="100%" stopColor="rgba(255,242,215,0.00)" />
          </linearGradient>

          {/* Specular #2: faint bounce from bottom-right (fill light) */}
          <radialGradient id="sc2-spec2" cx="80%" cy="82%" r="36%">
            <stop offset="0%"   stopColor="rgba(255,244,208,0.14)" />
            <stop offset="100%" stopColor="rgba(255,244,208,0.00)" />
          </radialGradient>

          {/* Clip to face circle */}
          <clipPath id="sc2-fclip">
            <circle cx={fc.x} cy={fc.y} r={fr} />
          </clipPath>

          {/* Mask: bevel circle minus face circle = right-side rim */}
          <mask id="sc2-rimask">
            <rect x="0" y="0" width={vW} height={vH} fill="white" />
            <circle cx={fc.x} cy={fc.y} r={fr + 0.6} fill="black" />
          </mask>

          {/* Contact shadow blur */}
          <filter id="sc2-csblur" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="4.5" />
          </filter>

          {/* Micro surface roughness: directional fractal → horizontal brushed streaks */}
          <filter id="sc2-mtl" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="1.15 0.09" numOctaves="2" seed="11" result="n" />
            <feColorMatrix type="saturate" values="0" in="n" result="ng" />
            {/* Compress noise to ±4% around 0.5 so texture is very subtle */}
            <feComponentTransfer in="ng" result="subtle">
              <feFuncR type="linear" slope="0.08" intercept="0.46" />
              <feFuncG type="linear" slope="0.08" intercept="0.46" />
              <feFuncB type="linear" slope="0.08" intercept="0.46" />
            </feComponentTransfer>
            <feBlend mode="overlay" in="SourceGraphic" in2="subtle" result="b" />
            <feComposite in="b" in2="SourceGraphic" operator="in" />
          </filter>

          {/* Engraving deboss: shadow below + highlight above text */}
          <filter id="sc2-engrave" x="-28%" y="-28%" width="156%" height="156%">
            <feGaussianBlur stdDeviation="0.52" in="SourceAlpha" result="ab" />
            <feOffset dx="0.3" dy="1.1" in="ab" result="ds" />
            <feFlood floodColor="#5C3800" floodOpacity="0.90" result="dsc" />
            <feComposite in="dsc" in2="ds" operator="in" result="dshadow" />
            <feOffset dx="-0.2" dy="-0.65" in="ab" result="hs" />
            <feFlood floodColor="#F5E092" floodOpacity="0.34" result="hsc" />
            <feComposite in="hsc" in2="hs" operator="in" result="hl" />
            <feMerge>
              <feMergeNode in="dshadow" />
              <feMergeNode in="SourceGraphic" />
              <feMergeNode in="hl" />
            </feMerge>
          </filter>
        </defs>

        {/* ── CONTACT SHADOW ── */}
        <ellipse
          cx={ec.x + 1} cy={fc.y + fr + 12}
          rx={fr * 0.68} ry={4}
          fill="rgba(55,30,2,0.15)"
          filter="url(#sc2-csblur)"
        />

        {/* ── BEVEL OUTER RING (precision machined edge) ── */}
        <circle cx={ec.x} cy={ec.y} r={er} fill="url(#sc2-bevel)" />

        {/* ── GROOVE BETWEEN BEVEL AND FACE (tooling line) ── */}
        <circle cx={fc.x} cy={fc.y} r={fr + 0.9} fill="none"
                stroke="rgba(44,22,0,0.52)" strokeWidth="1.1" />

        {/* ── RIM STRIP (right-side coin thickness) ── */}
        <circle cx={ec.x} cy={ec.y} r={er - 1.8} fill="url(#sc2-rim)" mask="url(#sc2-rimask)" />

        {/* ── MAIN FACE (PBR gold + micro-roughness) ── */}
        <circle cx={fc.x} cy={fc.y} r={fr} fill="url(#sc2-face)" filter="url(#sc2-mtl)" />

        {/* ── RADIAL BRUSHED LATHE LINES ── */}
        <g clipPath="url(#sc2-fclip)">{latheLines}</g>

        {/* ── INNER PRECISION RIM GROOVE ── */}
        <circle cx={fc.x} cy={fc.y} r={fr - 7} fill="none"
                stroke="rgba(44,22,0,0.44)" strokeWidth="1.2"
                clipPath="url(#sc2-fclip)" />
        <circle cx={fc.x} cy={fc.y} r={fr - 6.2} fill="none"
                stroke="rgba(255,228,128,0.24)" strokeWidth="0.55"
                clipPath="url(#sc2-fclip)" />

        {/* ── PRIMARY SPECULAR (sharp diagonal reflection) ── */}
        <ellipse
          cx={fc.x - fr * 0.13} cy={fc.y - fr * 0.20}
          rx={fr * 0.48} ry={fr * 0.25}
          fill="url(#sc2-spec1)"
          transform={`rotate(-34 ${fc.x - fr * 0.13} ${fc.y - fr * 0.20})`}
          clipPath="url(#sc2-fclip)"
        />

        {/* ── SECONDARY SPECULAR (fill-light bounce) ── */}
        <circle cx={fc.x} cy={fc.y} r={fr} fill="url(#sc2-spec2)"
                clipPath="url(#sc2-fclip)" />

        {/* ── ENGRAVED "Solvio" (deep deboss, centered) ── */}
        <text
          x={fc.x} y={fc.y + 3}
          textAnchor="middle" dominantBaseline="middle"
          fontFamily="Georgia, 'Palatino Linotype', 'Book Antiqua', serif"
          fontSize="17" fontWeight="600" letterSpacing="0.5"
          fill="rgba(52,28,1,0.54)"
          filter="url(#sc2-engrave)"
          clipPath="url(#sc2-fclip)"
        >Solvio</text>

        {/* ── ENGRAVED LIGHTNING BOLT (below logo) ── */}
        <text
          x={fc.x} y={fc.y + 19}
          textAnchor="middle" dominantBaseline="middle"
          fontSize="9.5" fontWeight="400"
          fill="rgba(52,28,1,0.44)"
          filter="url(#sc2-engrave)"
          clipPath="url(#sc2-fclip)"
        >⚡</text>
      </svg>
    </div>
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

                    {/* RIGHT: coin image — absolutely positioned, slightly overflowing right edge */}
                    <div
                      className="pointer-events-none absolute"
                      style={{
                        right: '-12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '52%',
                      }}
                    >
                      <img
                        src={asset('/solvio-coin.png')}
                        alt="Solvio Rewards coin"
                        style={{ width: '100%', height: 'auto', display: 'block' }}
                      />
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
