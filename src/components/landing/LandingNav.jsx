import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import Logo from '../Logo';
import { landingNav } from '../../data/landing';

function NavItem({ item, onClick, className }) {
  if (item.to) {
    return (
      <Link to={item.to} onClick={onClick} className={className}>
        {item.label}
      </Link>
    );
  }
  return (
    <a href={item.href} onClick={onClick} className={className}>
      {item.label}
    </a>
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
    // Red-box instruction: this row freezes to the top while scrolling.
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled ? 'border-ink/10 bg-white/90 shadow-soft backdrop-blur-md' : 'border-transparent bg-white'
      }`}
    >
      <nav className="container-x flex h-16 items-center justify-between">
        <Logo href="/" />

        <ul className="hidden items-center gap-8 md:flex">
          {landingNav.map((item) => (
            <li key={item.label}>
              <NavItem
                item={item}
                className="font-display text-sm font-semibold text-ink/75 transition hover:text-lime-dark"
              />
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            to="/balcony-system"
            className="hidden items-center gap-2 rounded-full bg-lime px-4 py-2.5 font-display text-sm font-bold text-ink transition hover:bg-lime-dark sm:inline-flex"
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

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 bg-ink/95 backdrop-blur-md md:hidden"
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
              {landingNav.map((item, i) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <NavItem
                    item={item}
                    onClick={() => setOpen(false)}
                    className="block border-b border-white/10 py-4 font-display text-2xl font-semibold text-white"
                  />
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
