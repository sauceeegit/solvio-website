import { ShoppingCart, CalendarCheck, PiggyBank } from 'lucide-react';
import Reveal from '../Reveal';

const steps = [
  { icon: ShoppingCart, step: '01', title: 'Choose Your System', body: 'Pick the kit that fits your home and budget. Not sure? We help you choose — for free.' },
  { icon: CalendarCheck, step: '02', title: 'Schedule Installation', body: 'Our certified team installs your system fast. Usually within a week of your order.' },
  { icon: PiggyBank, step: '03', title: 'Start Saving', body: 'Your panels go live and your electricity bill drops — from day one.' },
];

export default function HowItWorks() {
  return (
    <section className="py-16 sm:py-24" style={{ backgroundColor: '#381914' }}>
      <div className="container-x">
        <Reveal>
          <div className="text-center">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-lime">Simple process</p>
            <h2 className="mt-3 font-display text-3xl font-medium tracking-tight text-white sm:text-5xl">
              Up and running in 3 steps
            </h2>
          </div>
        </Reveal>

        <div className="relative mt-16 grid gap-8 sm:grid-cols-3 sm:gap-6">
          {/* connecting line (desktop only) */}
          <div className="absolute left-0 right-0 top-8 hidden h-px sm:block" style={{ background: 'rgba(255,255,255,0.08)' }} />

          {steps.map((s, i) => (
            <Reveal key={s.step} delay={i * 0.12}>
              <div className="relative flex flex-col">
                {/* step number dot */}
                <div className="relative z-10 mb-6 flex items-center gap-4 sm:flex-col sm:items-start sm:gap-0">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-lime shadow-lg sm:mb-5">
                    <s.icon size={26} className="text-white" strokeWidth={2} />
                  </div>
                  <span className="font-display text-4xl font-black sm:hidden" style={{ color: 'rgba(255,255,255,0.15)' }}>
                    {s.step}
                  </span>
                </div>

                <span className="mb-2 hidden font-display text-4xl font-black sm:block" style={{ color: 'rgba(255,255,255,0.15)' }}>
                  {s.step}
                </span>
                <h3 className="font-display text-xl font-extrabold text-white sm:text-2xl">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
