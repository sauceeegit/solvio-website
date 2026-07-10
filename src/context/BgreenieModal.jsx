import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, ArrowRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const BGREENIE_URL = 'https://bgreenie.me/';

const BgreenieContext = createContext(() => {});

// Hook returning a function that opens the shared Bgreenie intro popup.
export const useBgreenie = () => useContext(BgreenieContext);

// Provider that renders the single Bgreenie popup and exposes an opener via
// context, so the nav and the "Earn Solvio rewards" CTA share one modal.
export function BgreenieProvider({ children }) {
  const [open, setOpen] = useState(false);
  const openBgreenie = useCallback(() => setOpen(true), []);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <BgreenieContext.Provider value={openBgreenie}>
      {children}
      {createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/70 p-4 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            >
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-label="Bgreenie Membership"
                className="relative w-full max-w-md rounded-xl2 bg-white p-7 text-center shadow-lift sm:p-8"
                initial={{ scale: 0.94, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.94, opacity: 0 }}
                transition={{ type: 'spring', damping: 24, stiffness: 280 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full text-ink/50 transition hover:bg-ink/[0.06]"
                >
                  <X size={18} />
                </button>

                <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[#16A34A]/12 text-2xl leading-none text-[#16A34A]">
                  ★
                </span>
                <h3 className="mt-4 font-display text-xl font-extrabold text-ink">
                  Bgreenie Membership
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-slatey-500">
                  Solvio has teamed up with Bgreenie to democratize solar energy. Members get
                  exclusive discounts on solar products and access to community revenue-sharing
                  opportunities.
                </p>

                <div className="mt-6 flex flex-col gap-2.5 sm:flex-row-reverse">
                  <a
                    href={BGREENIE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-lime px-5 py-3 font-display text-sm font-bold text-white transition hover:bg-lime-dark"
                  >
                    Continue to Bgreenie <ArrowRight size={16} />
                  </a>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="inline-flex flex-1 items-center justify-center rounded-full border border-ink/15 px-5 py-3 font-display text-sm font-bold text-ink/70 transition hover:border-ink/30 hover:text-ink"
                  >
                    Stay
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </BgreenieContext.Provider>
  );
}
