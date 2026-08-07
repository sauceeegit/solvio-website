import { useState } from 'react';
import { Plus } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { faqs } from '../data/product';
import Reveal from './Reveal';

function Item({ q, a, open, onToggle }) {
  return (
    <div className={`rounded-xl overflow-hidden transition-all ${open ? 'bg-white shadow-soft ring-1 ring-ink/10' : 'bg-ink/[0.06]'}`}>
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className={`font-display text-base font-semibold transition-colors ${open ? 'text-ink' : 'text-ink'}`}>{q}</span>
        <span
          className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border transition ${
            open
              ? 'rotate-45 border-ink/20 bg-ink text-white'
              : 'border-ink/15 bg-white text-ink'
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
            <p className="px-5 pb-5 pt-1 text-[15px] leading-relaxed text-ink/75 max-sm:text-sm">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ({
  items = faqs,
  eyebrow = 'Questions',
  heading = 'FAQ',
  subtitle = 'Still unsure? Our solar advisors answer in plain language, Monday to Friday.',
  bg,
}) {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className={`scroll-mt-20 py-20 ${bg ? '' : 'bg-white'}`} style={bg ? { background: bg } : undefined}>
      <div className="container-x grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            {heading}
          </h2>
          <p className="mt-3 text-ink/70">{subtitle}</p>
          <a
            href="https://wa.me/66843488428?text=Hi%20Solvio%20%E2%80%94%20I%27d%20like%20to%20talk%20to%20an%20advisor."
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center rounded-full bg-lime px-5 py-2.5 font-display text-sm font-bold text-white transition hover:bg-lime-dark"
          >
            Talk to an advisor
          </a>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="space-y-2">
            {items.map((f, i) => (
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
