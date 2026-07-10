import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, ShoppingCart, ArrowRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import Logo from '../Logo';

const BGREENIE_URL = 'https://bgreenie.me/';

const links = [
  { label: 'Rooftop Solar', to: '/rooftop-system', sub: 'For Homeowner' },
  { label: 'Balcony Solar', to: '/balcony-system', sub: 'For Tenant' },
  { label: 'Portable Solar', to: '/portable-system' },
  { label: 'Solar Panel', to: '/solar-panel' },
  { label: 'FAQs', to: '/faqs' },
];

// Small green star pinned to the top-right of the Bgreenie label.
function StarBadge() {
  return (
    <span aria-hidden="true" className="absolute -right-3 -top-1.5 text-[10px] leading-none text-[#16A34A]">
      ★
    </span>
  );
}

export default function LandingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [bgOpen, setBgOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!bgOpen) return undefined;
    const onKey = (e) => e.key === 'Escape' && setBgOpen(false);
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [bgOpen]);

  const openBgreenie = () => {
    setOpen(false);
    setBgOpen(true);
  };

  return (
    <header
      className={`border-b transition-all duration-300 ${
        scrolled ? 'border-ink/10 bg-white/90 shadow-soft backdrop-blur-md' : 'border-transparent bg-white'
      }`}
    >
      <nav className="container-x flex h-16 items-center justify-between">
        <Logo href="/" />

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.label}>
              <NavLink
                to={l.to}
                className={({ isActive }) =>
                  `group flex flex-col leading-tight transition ${
                    isActive ? 'text-lime' : 'text-ink/75 hover:text-lime'
                  }`
                }
              >
                <span className="font-display text-[17px] font-semibold">{l.label}</span>
                {l.sub && (
                  <span className="font-display text-[11px] font-medium text-ink/40 group-hover:text-lime/70">
                    {l.sub}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          {/* Bgreenie Membership — sits just left of Shop now; opens the intro popup. */}
          <button
            type="button"
            onClick={openBgreenie}
            className="relative hidden font-display text-[17px] font-semibold text-ink/75 transition hover:text-lime md:inline-flex"
          >
            Bgreenie Membership
            <StarBadge />
          </button>
          <Link
            to="/balcony-system"
            className="hidden items-center gap-2 rounded-full bg-lime px-4 py-2.5 font-display text-sm font-bold text-white transition hover:bg-lime-dark sm:inline-flex"
          >
            <ShoppingCart size={16} /> Shop now
          </Link>
          <button
            onClick={() => setOpen(true)}
            className="grid h-10 w-10 place-items-center rounded-full text-ink/70 transition hover:bg-ink/[0.05] md:hidden"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </nav>

      {createPortal(
        <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] bg-ink md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="container-x flex h-16 items-center justify-between">
              <Logo dark href="/" />
              <button
                onClick={() => setOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-full text-white/80 hover:bg-white/10"
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>
            <div className="container-x mt-6">
              {/* Product categories — compact, all on one row */}
              <div className="grid grid-cols-3 gap-2">
                {links.slice(0, 3).map((l, i) => (
                  <motion.div
                    key={l.label}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * i }}
                  >
                    <NavLink
                      to={l.to}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `flex h-full flex-col rounded-xl border px-2.5 py-3 text-center font-display transition ${
                          isActive ? 'border-lime bg-lime text-white' : 'border-white/15 text-white'
                        }`
                      }
                    >
                      <span className="text-sm font-semibold leading-tight">{l.label}</span>
                      {l.sub && (
                        <span className="mt-1 text-[11px] font-medium text-white/50">{l.sub}</span>
                      )}
                    </NavLink>
                  </motion.div>
                ))}
              </div>

              {/* Remaining links + Bgreenie */}
              <ul className="mt-2 flex flex-col">
                {links.slice(3).map((l, i) => (
                  <motion.li
                    key={l.label}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * (i + 3) }}
                  >
                    <NavLink
                      to={l.to}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `block border-b border-white/10 py-4 font-display ${
                          isActive ? 'text-lime' : 'text-white'
                        }`
                      }
                    >
                      <span className="text-2xl font-semibold">{l.label}</span>
                    </NavLink>
                  </motion.li>
                ))}
                <motion.li
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * links.length }}
                >
                  <button
                    type="button"
                    onClick={openBgreenie}
                    className="block w-full border-b border-white/10 py-4 text-left font-display text-white"
                  >
                    <span className="relative text-2xl font-semibold">
                      Bgreenie Membership
                      <StarBadge />
                    </span>
                  </button>
                </motion.li>
              </ul>
            </div>
          </motion.div>
        )}
        </AnimatePresence>,
        document.body,
      )}

      {/* Bgreenie Membership intro popup */}
      {createPortal(
        <AnimatePresence>
          {bgOpen && (
            <motion.div
              className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/70 p-4 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setBgOpen(false)}
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
                  onClick={() => setBgOpen(false)}
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
                    onClick={() => setBgOpen(false)}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-lime px-5 py-3 font-display text-sm font-bold text-white transition hover:bg-lime-dark"
                  >
                    Continue to Bgreenie <ArrowRight size={16} />
                  </a>
                  <button
                    type="button"
                    onClick={() => setBgOpen(false)}
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
    </header>
  );
}
