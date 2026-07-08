import { ArrowRight } from 'lucide-react';
import Reveal from './Reveal';

// Horizontal "7 steps to going solar" timeline (rebuilt from the branded infographic).
const STEPS = [
  { n: 1, title: 'Request a free consultation', desc: 'Get in touch via website, phone, LINE, or a visit.', color: '#FF6700' },
  { n: 2, title: 'Site survey & custom design', desc: 'We inspect your roof and design a custom system.', color: '#FF6700' },
  { n: 3, title: 'Choose payment or financing', desc: 'Pay in full, in installments, or via a partner bank loan.', color: '#FF6700' },
  { n: 4, title: 'Permits & grid application', desc: 'We handle ERC and PEA/MEA permits and paperwork.', color: '#1C4537' },
  { n: 5, title: 'Professional installation', desc: 'Certified techs install panels, inverter & wiring.', color: '#1C4537' },
  { n: 6, title: 'Connection, testing & handover', desc: 'Meter change, testing, app setup, and full handover.', color: '#1C4537' },
  { n: 7, title: 'Warranty & maintenance', desc: 'Monitoring, cleaning, and responsive warranty care.', color: '#F4B740', dark: true },
];

export default function RooftopSteps() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container-x">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">How it works</p>
            <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Your 7 steps to going solar
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative mt-12">
            {/* connecting line behind the number circles (desktop only) */}
            <div className="absolute left-[7%] right-[7%] top-6 hidden h-0.5 bg-ink/10 lg:block" />
            <ol className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 lg:grid-cols-7 lg:gap-x-3">
              {STEPS.map((s) => (
                <li key={s.n} className="flex flex-col items-center text-center">
                  <span
                    className="relative z-10 grid h-12 w-12 place-items-center rounded-full font-display text-lg font-bold shadow-sm ring-4 ring-white"
                    style={{ backgroundColor: s.color, color: s.dark ? '#0C1E1A' : '#FFFFFF' }}
                  >
                    {s.n}
                  </span>
                  <h3 className="mt-4 font-display text-sm font-bold leading-snug text-ink">{s.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-slatey-500">{s.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mx-auto mt-12 flex max-w-3xl flex-col items-center justify-between gap-4 rounded-xl2 bg-[#FFF1E8] px-6 py-5 text-center sm:flex-row sm:text-left">
            <p className="font-display font-semibold text-[#B84D00]">
              Ready to go solar? Get your free consultation from Solvio today.
            </p>
            <a
              href="tel:+66843488428"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-lime px-6 py-3 font-display text-sm font-bold text-white transition hover:bg-lime-dark"
            >
              Free consultation <ArrowRight size={16} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
