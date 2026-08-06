import { ShoppingCart, CalendarCheck, PiggyBank } from 'lucide-react';
import Reveal from '../Reveal';

const steps = [
  {
    icon: ShoppingCart,
    eyebrow: 'Step 1',
    title: 'Choose your system.',
    body: 'Pick the kit that fits your home and budget. Not sure? We help you choose — for free.',
    iconBg: '#1c1c1e',
    iconColor: '#fff',
  },
  {
    icon: CalendarCheck,
    eyebrow: 'Step 2',
    title: 'Schedule installation.',
    body: 'Our certified team installs your system fast. Usually within a week of your order.',
    iconBg: '#1c1c1e',
    iconColor: '#fff',
  },
  {
    icon: PiggyBank,
    eyebrow: 'Step 3',
    title: 'Start saving.',
    body: 'Your panels go live and your electricity bill drops — from day one.',
    iconBg: '#09321B',
    iconColor: '#fff',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 sm:py-28" style={{ backgroundColor: '#f5f5f7' }}>
      <div className="container-x">
        <Reveal>
          <h2 className="font-display text-4xl font-normal tracking-tight text-ink sm:text-5xl mb-10 sm:mb-12" style={{ fontFamily: '"Space Grotesk", system-ui, sans-serif' }}>
            Up and running<br className="hidden sm:block" /> in 3 steps.
          </h2>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.18} y={32}>
              <div
                className="flex h-full flex-col rounded-3xl bg-white overflow-hidden"
                style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
              >
                {/* text top */}
                <div className="p-8 pb-0">
                  <p className="font-display text-[12px] font-semibold uppercase tracking-widest text-ink/70 mb-3">
                    {s.eyebrow}
                  </p>
                  <h3 className="font-display text-[1.4rem] font-semibold leading-snug text-ink">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink/75">
                    {s.body}
                  </p>
                </div>

                {/* icon bottom */}
                <div className="mt-auto flex items-end justify-center p-8 pt-10">
                  <div
                    className="flex h-20 w-20 items-center justify-center rounded-full"
                    style={{ backgroundColor: s.iconBg }}
                  >
                    <s.icon size={32} strokeWidth={1.75} style={{ color: s.iconColor }} />
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
