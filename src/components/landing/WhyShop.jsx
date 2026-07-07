import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
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
                  <div className="group relative h-full min-h-[150px] overflow-hidden rounded-xl2">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071a13]/92 via-[#071a13]/40 to-transparent" />
                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                      <span
                        className="mb-3 inline-block self-start rounded-full px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest"
                        style={{
                          background: 'rgba(252,67,2,0.18)',
                          color: '#FC4302',
                          backdropFilter: 'blur(6px)',
                          border: '1px solid rgba(252,67,2,0.25)',
                        }}
                      >
                        Solvio Rewards
                      </span>
                      <h3 className="font-display text-xl font-extrabold leading-tight text-white sm:text-2xl">
                        Earn Solvio<br />Rewards
                      </h3>
                      <p className="mt-2 text-[13px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
                        Collect points with every purchase. Redeem for discounts, exclusive products and member-only benefits.
                      </p>
                      <a
                        href="#"
                        className="mt-4 inline-flex items-center gap-1.5 font-display text-sm font-bold transition-all duration-300 group-hover:gap-2.5"
                        style={{ color: '#FC4302' }}
                      >
                        Learn more <ArrowRight size={14} />
                      </a>
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
