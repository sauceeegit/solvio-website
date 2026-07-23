import { ShoppingCart, CalendarCheck, Zap } from 'lucide-react';
import Reveal from '../Reveal';

const steps = [
  { icon: ShoppingCart, step: '01', title: 'Choose Your System', body: 'Pick the kit that fits your home and budget. Not sure? We help you choose — for free.' },
  { icon: CalendarCheck, step: '02', title: 'Schedule Installation', body: 'Our certified team installs your system fast. Usually within a week of your order.' },
  { icon: Zap, step: '03', title: 'Start Saving', body: 'Your panels go live and your electricity bill drops — from day one.' },
];

export default function HowItWorks() {
  return (
    <section className="bg-surface py-16 sm:py-20">
      <div className="container-x">
        <Reveal>
          <div className="text-center">
            <p className="eyebrow">Simple process</p>
            <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Up and running in 3 steps
            </h2>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.step} delay={i * 0.1}>
              <div className="relative flex flex-col gap-4 rounded-2xl border border-ink/[0.07] bg-white p-7 shadow-soft">
                {/* Step number background */}
                <span className="absolute right-5 top-5 font-display text-6xl font-extrabold text-ink/[0.04] select-none">
                  {s.step}
                </span>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-lime">
                  <s.icon size={22} className="text-white" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="font-display text-lg font-extrabold text-ink">{s.title}</h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-ink/60">{s.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
