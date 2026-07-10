import { useState } from 'react';
import { Plus } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { faqs } from '../data/product';
import Reveal from './Reveal';

// Question background: closed = orange, opened = light orange. Font colour is
// left as the original ink (only the background is tinted).
function Item({ q, a, open, onToggle }) {
  return (
    <div>
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 rounded-xl px-5 py-4 text-left transition-colors"
        style={{ backgroundColor: open ? '#FFA05C' : '#FF6700' }}
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

export default function FAQ({
  items = faqs,
  eyebrow = 'Questions',
  heading = 'Everything you wanted to ask',
  subtitle = 'Still unsure? Our solar advisors answer in plain language, Monday to Friday.',
  bg,
}) {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className={`scroll-mt-20 py-20 ${bg ? '' : 'bg-surface'}`} style={bg ? { background: bg } : undefined}>
      <div className="container-x grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            {heading}
          </h2>
          <p className="mt-3 text-slatey-500">{subtitle}</p>
          <a href="#top" className="btn-ghost mt-5">
            Talk to an advisor
          </a>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="space-y-2.5 rounded-xl2 border border-ink/[0.07] bg-white p-3 shadow-soft">
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
