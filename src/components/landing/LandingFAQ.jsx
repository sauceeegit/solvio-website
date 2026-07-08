import { useState } from 'react';
import { Plus, HelpCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { landingFaqs } from '../../data/landing';
import Reveal from '../Reveal';

export default function LandingFAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="scroll-mt-20 bg-white py-16">
      <div className="container-x">
        <Reveal>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Frequently asked questions
          </h2>
        </Reveal>

        <div className="mt-8 grid gap-6 lg:grid-cols-[280px_1fr] lg:gap-10">
          {/* side tab — fills the column height (content centred) so it doesn't leave a gap */}
          <Reveal>
            <div className="flex h-full flex-col justify-center rounded-xl2 bg-ink p-6 text-white sm:p-8">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-lime text-white">
                <HelpCircle size={22} />
              </span>
              <h3 className="mt-4 font-display text-xl font-extrabold">About Solvio</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                Everything from one source — from a single balcony panel to a full rooftop array.
                Got a question that isn&apos;t here? Our team is one message away.
              </p>
              <a
                href="#calculator"
                className="mt-6 inline-flex rounded-full bg-lime px-4 py-2.5 font-display text-sm font-bold text-white transition hover:bg-lime-dark"
              >
                Explore Solvio
              </a>
              <a
                href="https://wa.me/66843488428"
                target="_blank"
                rel="noreferrer"
                className="mt-3 block text-sm font-semibold text-white/70 transition hover:text-white"
              >
                Chat on WhatsApp →
              </a>
            </div>
          </Reveal>

          {/* accordion */}
          <Reveal delay={0.1}>
            <div className="rounded-xl2 border border-ink/[0.07] bg-surface px-6 shadow-soft">
              {landingFaqs.map((f, i) => (
                <div
                  key={f.q}
                  className={`border-b border-ink/[0.08] last:border-0 transition-colors duration-200 ${
                    open === i ? 'bg-white/70 -mx-6 px-6 rounded-xl' : ''
                  }`}
                >
                  <button
                    onClick={() => setOpen(open === i ? -1 : i)}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  >
                    <span
                      className={`font-display font-semibold transition-colors ${
                        open === i ? 'text-lg text-lime-dark' : 'text-base text-ink'
                      }`}
                    >
                      {f.q}
                    </span>
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border transition ${
                        open === i
                          ? 'rotate-45 border-lime bg-lime text-white'
                          : 'border-ink/15 text-ink'
                      }`}
                    >
                      <Plus size={16} />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-5 pr-10 text-[15px] leading-relaxed text-slatey-500">
                          {f.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
