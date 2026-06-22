import { useState } from 'react';
import { Plus } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { faqs } from '../data/product';
import Reveal from './Reveal';

function Item({ q, a, open, onToggle }) {
  return (
    <div className="border-b border-ink/[0.08]">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span className="font-display text-base font-semibold text-ink">{q}</span>
        <span
          className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-ink/15 transition ${
            open ? 'rotate-45 bg-ink text-lime' : 'text-ink'
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
            <p className="pb-5 pr-12 text-[15px] leading-relaxed text-slatey-500">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="scroll-mt-20 bg-surface py-20">
      <div className="container-x grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal>
          <p className="eyebrow">Questions</p>
          <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Everything you wanted to ask
          </h2>
          <p className="mt-3 text-slatey-500">
            Still unsure? Our solar advisors answer in plain language, Monday to Friday.
          </p>
          <a href="#top" className="btn-ghost mt-5">
            Talk to an advisor
          </a>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-xl2 border border-ink/[0.07] bg-white px-6 shadow-soft">
            {faqs.map((f, i) => (
              <Item
                key={f.q}
                q={f.q}
                a={f.a}
                open={open === i}
                onToggle={() => setOpen(open === i ? -1 : i)}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
