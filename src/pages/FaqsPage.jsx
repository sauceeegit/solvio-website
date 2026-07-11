import { useState } from 'react';
import { Plus } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import Header from '../components/landing/Header';
import Footer from '../components/Footer';
import ContactSection from '../components/ContactSection';
import CalculatorSection from '../components/CalculatorSection';
import Reveal from '../components/Reveal';
import { landingFaqs, rooftopFaqs, panelFaqs } from '../data/landing';
import { faqs as balconyFaqs } from '../data/product';
import { usePageMeta } from '../hooks/usePageMeta';

// One tab per product area — each opens the matching set of FAQs.
const TABS = [
  { id: 'general', label: 'General', items: landingFaqs },
  { id: 'rooftop', label: 'Rooftop Solar', items: rooftopFaqs },
  { id: 'balcony', label: 'Balcony Solar', items: balconyFaqs },
  { id: 'panels', label: 'Solar Panels', items: panelFaqs },
];

// Question background: closed = orange, opened = light orange (font unchanged).
function Item({ q, a, open, onToggle }) {
  return (
    <div>
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 rounded-xl px-5 py-4 text-left transition-colors"
        style={{ backgroundColor: open ? '#FF6700' : '#FFA05C' }}
      >
        <span className="font-display text-base font-semibold text-ink">{q}</span>
        <span
          className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-ink/15 bg-white/70 text-ink transition ${
            open ? 'rotate-45' : ''
          }`}
        >
          <Plus size={16} />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-4 pt-3 text-[15px] leading-relaxed text-slatey-500 max-sm:text-sm">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FaqsPage() {
  usePageMeta('/faqs');
  const [tab, setTab] = useState('general');
  const [open, setOpen] = useState(0);

  const active = TABS.find((t) => t.id === tab) ?? TABS[0];

  const selectTab = (id) => {
    setTab(id);
    setOpen(0);
  };

  return (
    <div id="top" className="min-h-screen bg-surface">
      <Header />
      <main>
        <section className="bg-surface py-16 sm:py-20">
          <div className="container-x">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <p className="eyebrow">Help centre</p>
                <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-5xl">
                  Frequently asked questions
                </h1>
                <p className="mt-3 text-slatey-500">
                  Everything about rooftop, balcony and portable solar — in one place. Pick a topic
                  below.
                </p>
              </div>
            </Reveal>

            {/* Tabs */}
            <Reveal delay={0.05}>
              <div
                role="tablist"
                aria-label="FAQ topics"
                className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-2"
              >
                {TABS.map((t) => {
                  const isActive = t.id === tab;
                  return (
                    <button
                      key={t.id}
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => selectTab(t.id)}
                      className={`rounded-full border px-5 py-2.5 font-display text-sm font-semibold transition ${
                        isActive
                          ? 'border-lime bg-lime text-white shadow-soft'
                          : 'border-ink/12 text-ink/70 hover:border-ink/30'
                      }`}
                    >
                      {t.label}
                    </button>
                  );
                })}
              </div>
            </Reveal>

            {/* Accordion for the active tab */}
            <div className="mx-auto mt-8 max-w-3xl">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="space-y-2.5 rounded-xl2 border border-ink/[0.07] bg-white p-3 shadow-soft"
              >
                {active.items.map((f, i) => (
                  <Item key={f.q} q={f.q} a={f.a} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        <CalculatorSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
