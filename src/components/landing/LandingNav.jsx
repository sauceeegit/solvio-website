import { useEffect, useState } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Logo from '../Logo';

const links = [
  { label: 'How it works', href: '#how' },
  { label: 'Products', href: '#product' },
  { label: 'Storage', href: '#related' },
  { label: 'Savings', href: '#calculator' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
];

export default function LandingNav({ cartCount = 0 }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/85 shadow-soft backdrop-blur-md' : 'bg-white'
      }`}
    >
      <nav className="container-x flex h-16 items-center justify-between">
        <Logo href="/" />

        <ul className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="font-display text-sm font-medium text-ink/70 transition hover:text-ink"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            to="/balcony-system"
            className="hidden items-center gap-2 rounded-full bg-lime px-4 py-2.5 font-display text-sm font-bold text-white transition hover:bg-lime-dark sm:inline-flex"
          >
            Shop now
          </Link>
          <button className="relative grid h-10 w-10 place-items-center rounded-full text-ink/70 transition hover:bg-ink/[0.05] hover:text-ink">
            <ShoppingCart size={19} />
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-lime px-1 font-mono text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setOpen(true)}
            className="grid h-10 w-10 place-items-center rounded-full text-ink/70 transition hover:bg-ink/[0.05] lg:hidden"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 bg-ink/95 backdrop-blur-md lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="container-x flex h-16 items-center justify-between">
              <Logo dark />
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
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-white/10 py-4 font-display text-2xl font-semibold text-white"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
