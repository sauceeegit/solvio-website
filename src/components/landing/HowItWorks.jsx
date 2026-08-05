import { ShoppingCart, CalendarCheck, PiggyBank } from 'lucide-react';
import Reveal from '../Reveal';

const steps = [
  { icon: ShoppingCart, title: 'Choose Your System', body: 'Pick the kit that fits your home and budget. Not sure? We help you choose — for free.' },
  { icon: CalendarCheck, title: 'Schedule Installation', body: 'Our certified team installs your system fast. Usually within a week of your order.' },
  { icon: PiggyBank, title: 'Start Saving', body: 'Your panels go live and your electricity bill drops — from day one.', iconColor: '#16a34a' },
];

export default function HowItWorks() {
  return (
    <section className="py-20 sm:py-28" style={{ backgroundColor: '#f5f5f7' }}>
      <div className="container-x">
        <Reveal>
          <h2 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl mb-10 sm:mb-14">
            Up and running<br className="hidden sm:block" /> in 3 steps.
          </h2>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.1}>
              <div className="flex h-full flex-col rounded-3xl bg-white p-8" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                <div
                  className="mb-6 flex h-12 w-12 items-center justify-center rounded-full"
                  style={{ backgroundColor: s.iconColor ? '#dcfce7' : '#1c1c1e' }}
                >
                  <s.icon size={22} strokeWidth={2} style={{ color: s.iconColor || '#fff' }} />
                </div>
                <h3 className="font-display text-xl font-semibold text-ink leading-snug">{s.title}.</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink/55">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
