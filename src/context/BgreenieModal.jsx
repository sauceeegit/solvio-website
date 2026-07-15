import { createContext, useContext, useState, useEffect } from 'react';
import { X, Star, Gift, Zap } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const BgreenieCtx = createContext(() => {});

export function BgreenieProvider({ children }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <BgreenieCtx.Provider value={() => setOpen(true)}>
      {children}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: 'spring', damping: 24, stiffness: 280 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-lime px-6 py-8 text-center">
                <p className="font-mono text-xs font-bold uppercase tracking-widest text-white/70">
                  Solvio Rewards
                </p>
                <h2 className="mt-1 font-display text-3xl font-extrabold text-white">
                  Bgreenie Membership
                </h2>
                <p className="mt-2 text-sm text-white/80">
                  Earn points on every purchase. Redeem for exclusive rewards.
                </p>
              </div>

              {/* Benefits */}
              <div className="space-y-4 p-6">
                {[
                  { icon: Star, title: 'Earn points', body: 'Get points with every Solvio purchase — the more you buy, the more you earn.' },
                  { icon: Gift, title: 'Redeem rewards', body: 'Redeem points for discounts, exclusive products and member-only benefits.' },
                  { icon: Zap, title: 'Members-only deals', body: 'Get early access to new products and special pricing before anyone else.' },
                ].map(({ icon: Icon, title, body }) => (
                  <div key={title} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lime/10">
                      <Icon size={18} className="text-lime" />
                    </div>
                    <div>
                      <p className="font-display text-sm font-bold text-ink">{title}</p>
                      <p className="text-xs leading-relaxed text-slatey-500">{body}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="border-t border-ink/[0.07] px-6 pb-6 pt-4">
                <a
                  href="mailto:hello@solvio.co?subject=Bgreenie Membership"
                  className="block w-full rounded-full bg-lime py-3 text-center font-display text-sm font-bold text-white transition hover:bg-lime-dark"
                >
                  Join Bgreenie — it's free
                </a>
                <p className="mt-2 text-center text-xs text-slatey-400">
                  Contact us to get started. No subscription required.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-white/20 text-white transition hover:bg-white/30"
              >
                <X size={16} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </BgreenieCtx.Provider>
  );
}

export const useBgreenie = () => useContext(BgreenieCtx);
