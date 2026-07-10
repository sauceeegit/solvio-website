import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

// Wraps a section so it collapses on mobile behind a tappable header row.
// On md+ screens the content is always visible (no toggle).
export default function MobileCollapse({ title, children }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle row — hidden on desktop */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex w-full items-center justify-between border-b border-ink/[0.08] bg-white px-5 py-5 transition-colors duration-200 md:hidden ${open ? 'border-b-0' : ''}`}
      >
        <span className={`font-display font-semibold transition-colors ${open ? 'text-lg text-lime-dark' : 'text-base text-ink'}`}>{title}</span>
        <ChevronDown
          size={20}
          className={`shrink-0 transition-all duration-300 ${open ? 'rotate-180 text-lime' : 'text-ink/40'}`}
        />
      </button>

      {/* Mobile: animated expand/collapse */}
      <div className="md:hidden">
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop: always visible */}
      <div className="hidden md:block">{children}</div>
    </>
  );
}
