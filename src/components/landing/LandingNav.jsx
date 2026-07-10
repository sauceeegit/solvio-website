import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import Logo from '../Logo';

const links = [
  { label: 'Rooftop Solar', to: '/rooftop-system', sub: 'For Homeowner' },
  { label: 'Balcony Solar', to: '/balcony-system', sub: 'For Tenant' },
  { label: 'Portable Solar', to: '/portable-system' },
  { label: 'Solar Panel', to: '/solar-panel' },
  { label: 'FAQs', to: '/faqs' },
  { label: 'Bgreenie Membership', href: 'https://bgreenie.me/', star: true },
];

// Small green star pinned to the top-right of a nav label.
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
              {l.href ? (
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col leading-tight text-ink/75 transition hover:text-lime"
                >
                  <span className="relative font-display text-[17px] font-semibold">
                    {l.label}
                    {l.star && <StarBadge />}
                  </span>
                </a>
              ) : (
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
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
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
            <ul className="container-x mt-6 flex flex-col gap-1">
              {links.map((l, i) => (
                <motion.li
                  key={l.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  {l.href ? (
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setOpen(false)}
                      className="block border-b border-white/10 py-4 font-display text-white"
                    >
                      <span className="relative text-2xl font-semibold">
                        {l.label}
                        {l.star && <StarBadge />}
                      </span>
                    </a>
                  ) : (
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
                      {l.sub && (
                        <span className="ml-2 align-middle text-sm font-medium text-white/45">
                          {l.sub}
                        </span>
                      )}
                    </NavLink>
                  )}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
        </AnimatePresence>,
        document.body,
      )}
    </header>
  );
}
