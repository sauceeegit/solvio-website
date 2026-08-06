import { useState } from 'react';
import { Plus, HelpCircle, ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { landingFaqs } from '../../data/landing';
import Reveal from '../Reveal';

const MOBILE_SHOW = 3;

export default function LandingFAQ() {
  const [open, setOpen] = useState(0);
  const [showAll, setShowAll] = useState(false);

  return (
    <section id="faq" className="scroll-mt-20 bg-white py-16">
      <div className="container-x">
        <Reveal>
          <h2 className="text-2xl font-medium tracking-tight text-price sm:text-3xl" style={{ fontFamily: '"Space Grotesk", system-ui, sans-serif' }}>
            FAQ
          </h2>
        </Reveal>

        <div className="mt-8 grid gap-6 lg:grid-cols-[280px_1fr] lg:gap-10">
          {/* side tab */}
          <Reveal>
            <div className="flex flex-col justify-center rounded-xl2 bg-ink p-6 text-white sm:p-8 lg:self-start">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-lime text-white">
                <HelpCircle size={22} />
              </span>
              <h3 className="mt-4 font-display text-xl font-extrabold">About Solvio</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                <span className="max-sm:hidden">
                  Everything from one source — from a single balcony panel to a full rooftop array.{' '}
                </span>
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
            <div className="space-y-2">
              {landingFaqs.map((f, i) => {
                const hiddenOnMobile = i >= MOBILE_SHOW && !showAll;
                return (
                  <div
                    key={f.q}
                    className={`rounded-xl overflow-hidden transition-all ${hiddenOnMobile ? 'hidden sm:block' : ''} ${open === i ? 'bg-white shadow-soft ring-1 ring-ink/10' : 'bg-ink/[0.06]'}`}
                  >
                    <button
                      onClick={() => setOpen(open === i ? -1 : i)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    >
                      <span className="font-display text-base font-semibold text-ink">{f.q}</span>
                      <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border transition ${open === i ? 'rotate-45 border-ink/20 bg-ink text-white' : 'border-ink/15 bg-white text-ink'}`}>
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
                          <p className="px-5 pb-5 pt-1 text-[15px] leading-relaxed text-ink/65 max-sm:text-sm">
                            {f.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Mobile-only "Show more" button */}
            {!showAll && (
              <button
                type="button"
                onClick={() => setShowAll(true)}
                className="mx-auto mt-4 flex items-center gap-2 rounded-full border border-ink/30 bg-white px-5 py-2.5 font-display text-sm font-semibold text-ink transition hover:border-ink/50 sm:hidden"
              >
                Show more questions <ChevronDown size={16} />
              </button>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
