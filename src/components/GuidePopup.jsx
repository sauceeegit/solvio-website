import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ArrowRight, Check } from 'lucide-react';
import { asset } from '../lib/format';

const SEEN_KEY = 'solvio_guide_popup_seen';

// Email-capture popup offering "The ultimate Solvio guide". Appears once per
// browser after the visitor shows interest — ~45% scroll depth, or a 30s
// fallback — instead of interrupting them right after landing.
export default function GuidePopup() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = localStorage.getItem(SEEN_KEY) === '1';
    } catch {
      seen = false;
    }
    if (seen) return undefined;

    let t;
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable > 0 && window.scrollY / scrollable >= 0.45) show();
    };
    const cleanup = () => {
      clearTimeout(t);
      window.removeEventListener('scroll', onScroll);
    };
    function show() {
      cleanup(); // fire once — never re-open after dismissal
      setOpen(true);
    }
    t = setTimeout(show, 30000);
    window.addEventListener('scroll', onScroll, { passive: true });
    return cleanup;
  }, []);

  const markSeen = () => {
    try {
      localStorage.setItem(SEEN_KEY, '1');
    } catch {
      /* ignore private-mode storage errors */
    }
  };

  const close = () => {
    setOpen(false);
    markSeen();
  };

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  const submit = (e) => {
    e.preventDefault();
    if (!email) return;
    // TODO: not wired to a backend yet — hook this to an email/lead service
    // (e.g. Formspree / Mailchimp) to actually deliver the guide and store the lead.
    setSent(true);
    markSeen();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/70 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
        >
          <motion.div
            className="relative max-h-[92vh] w-full max-w-md overflow-y-auto rounded-xl2 bg-white shadow-lift"
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.94, opacity: 0 }}
            transition={{ type: 'spring', damping: 24, stiffness: 280 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/85 text-ink shadow-sm backdrop-blur transition hover:bg-white"
            >
              <X size={18} />
            </button>

            <img loading="lazy"
              src={asset('/guide-popup.webp')}
              alt="The ultimate Solvio balcony solar guide"
              className="block w-full"
            />

            <div className="p-6 sm:p-7">
              {sent ? (
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-lime/20 text-lime-dark">
                    <Check size={18} strokeWidth={3} />
                  </span>
                  <div>
                    <p className="font-display text-lg font-bold text-ink">You&apos;re in! 🎉</p>
                    <p className="mt-1 text-sm text-slatey-500">
                      The ultimate Solvio guide is on its way to <strong>{email}</strong>.
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <p className="eyebrow">Free guide</p>
                  <h2 className="mt-2 font-display text-xl font-extrabold leading-tight text-ink sm:text-2xl">
                    Get your free copy
                  </h2>
                  <p className="mt-2 text-sm text-slatey-500">
                    Everything about your solar balcony system — sizing, savings and setup. Pop in
                    your email and we&apos;ll send it straight to your inbox.
                  </p>
                  <form onSubmit={submit} className="mt-4 space-y-2.5">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@email.com"
                      className="w-full rounded-full border border-ink/15 bg-white px-5 py-3 font-display text-sm text-ink placeholder:text-slatey-400 focus:border-lime focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-lime px-6 py-3 font-display text-sm font-bold text-white transition hover:bg-lime-dark"
                    >
                      Send me the guide <ArrowRight size={16} />
                    </button>
                  </form>
                  <p className="mt-2.5 text-xs text-slatey-400">No spam — just the guide. Unsubscribe anytime.</p>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
