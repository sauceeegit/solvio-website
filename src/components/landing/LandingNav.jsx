import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import Logo from '../Logo';
import { useBgreenie } from '../../context/BgreenieModal';
import { useLanguage } from '../../context/LanguageContext';

const links = {
  en: [
    { label: 'Rooftop Solar', to: '/rooftop-system', sub: 'For Homeowner' },
    { label: 'Balcony Solar', to: '/balcony-system', sub: 'For Tenant' },
    { label: 'Portable Solar', to: '/portable-system' },
    { label: 'Solar Panel', to: '/solar-panel' },
    { label: 'Projects', to: '/projects' },
    { label: 'FAQs', to: '/faqs' },
  ],
  th: [
    { label: 'โซลาร์หลังคา', to: '/rooftop-system', sub: 'สำหรับเจ้าของบ้าน' },
    { label: 'โซลาร์ระเบียง', to: '/balcony-system', sub: 'สำหรับผู้เช่า' },
    { label: 'โซลาร์พกพา', to: '/portable-system' },
    { label: 'แผงโซลาร์', to: '/solar-panel' },
    { label: 'ผลงาน', to: '/projects' },
    { label: 'คำถามที่พบบ่อย', to: '/faqs' },
  ],
};

function StarBadge() {
  return (
    <span aria-hidden="true" className="absolute -right-1.5 -top-1.5 text-[10px] leading-none text-[#16A34A]">
      ★
    </span>
  );
}

export default function LandingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [open, setOpen] = useState(false);
  const openModal = useBgreenie();
  const { lang, toggle: toggleLang } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const openBgreenie = () => {
    setOpen(false);
    openModal();
  };

  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const solid = !isHome || scrolled || hovered;

  return (
    <header
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`border-b transition-all duration-300 ${
        solid
          ? 'border-ink/10 bg-white/95 shadow-soft backdrop-blur-md'
          : 'border-transparent bg-transparent'
      }`}
    >
      <nav className="container-x flex h-16 items-center">
        <Logo href="/" size="h-7" />

        <ul className="hidden flex-1 items-center justify-center gap-0.5 lg:flex">
          {links[lang].map((l) => (
            <li key={l.label}>
              <NavLink
                to={l.to}
                className={({ isActive }) =>
                  `group relative block rounded-lg px-3 py-1.5 transition-all duration-200 ${
                    isActive
                      ? solid ? 'bg-ink/[0.06] text-lime' : 'bg-white/15 text-white'
                      : solid
                        ? 'text-ink/90 hover:bg-ink/[0.06] hover:text-ink'
                        : 'text-white/90 hover:bg-white/12 hover:text-white'
                  }`
                }
              >
                <span className="whitespace-nowrap font-display text-[14.5px] font-semibold">
                  {l.label}
                  {l.sub && (
                    <span className="ml-1 inline-block max-w-0 overflow-hidden align-middle font-display text-[9px] font-semibold uppercase tracking-wide text-lime transition-[max-width,opacity] duration-200 group-hover:max-w-[80px] opacity-0 group-hover:opacity-100 whitespace-nowrap">
                      {l.sub}
                    </span>
                  )}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-3">
          <button
            type="button"
            onClick={toggleLang}
            title={lang === 'en' ? 'Switch to Thai' : 'Switch to English'}
            className="flex items-center gap-1.5 rounded-full px-2.5 py-1 font-display text-[13px] font-semibold transition hover:opacity-80"
            style={{ background: 'transparent' }}
          >
            <span className="text-base leading-none">{lang === 'en' ? '🇹🇭' : '🇬🇧'}</span>
            <span className={`hidden sm:inline text-[12px] font-bold ${solid ? 'text-ink/60' : 'text-white/70'}`}>
              {lang === 'en' ? 'TH' : 'EN'}
            </span>
          </button>
          <button
            type="button"
            onClick={openBgreenie}
            className={`hidden items-center whitespace-nowrap rounded-full border px-3 py-1.5 font-display text-[13px] font-medium transition lg:inline-flex xl:px-3.5 ${solid ? 'border-ink/40 text-ink/75 hover:border-lime hover:text-lime' : 'border-white/50 text-white/90 hover:border-white hover:text-white'}`}
          >
            Bgreenie Membership
          </button>
          <Link
            to="/balcony-system"
            className="hidden items-center gap-1.5 whitespace-nowrap rounded-full bg-lime px-3.5 py-1.5 font-display text-[13px] font-bold text-white transition hover:bg-lime-dark sm:inline-flex"
          >
            <ShoppingCart size={16} /> Shop now
          </Link>
          <button
            onClick={() => setOpen(true)}
            className={`grid h-11 w-11 place-items-center rounded-full transition lg:hidden ${solid ? 'text-ink hover:bg-ink/[0.05]' : 'text-white hover:bg-white/10'}`}
            aria-label="Open menu"
          >
            <Menu size={30} strokeWidth={2.25} />
          </button>
        </div>
      </nav>

      {createPortal(
        <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] md:hidden"
            style={{ backgroundColor: '#09321B' }}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="container-x flex h-16 items-center justify-between">
              <Logo dark href="/" />
              <motion.button
                onClick={() => setOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-full text-white/80 hover:bg-white/10"
                aria-label="Close menu"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <X size={22} />
              </motion.button>
            </div>
            <ul className="container-x mt-4 flex flex-col">
              {links[lang].map((l, i) => (
                <motion.li
                  key={l.label}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.07 + 0.06 * i, ease: [0.16, 1, 0.3, 1] }}
                >
                  <NavLink
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `flex items-baseline gap-3 border-b border-white/10 py-4 font-display transition-colors hover:text-lime ${
                        isActive ? 'text-lime' : 'text-white'
                      }`
                    }
                  >
                    <span className="text-2xl font-medium">{l.label}</span>
                    {l.sub && (
                      <span className="text-sm font-medium text-lime/80">{l.sub}</span>
                    )}
                  </NavLink>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.07 + 0.06 * links[lang].length, ease: [0.16, 1, 0.3, 1] }}
              >
                <button
                  type="button"
                  onClick={openBgreenie}
                  className="block w-full border-b border-white/10 py-4 text-left font-display text-white transition-colors hover:text-lime"
                >
                  <span className="relative text-2xl font-medium">
                    Bgreenie Membership
                    <StarBadge />
                  </span>
                </button>
              </motion.li>
            </ul>

            {/* Bottom shop now button */}
            <motion.div
              className="container-x mt-8"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.07 + 0.06 * (links.length + 1), ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                to="/balcony-system"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 rounded-full bg-lime px-6 py-3.5 font-display text-base font-bold text-white transition hover:bg-lime-dark"
              >
                <ShoppingCart size={18} /> Shop now
              </Link>
            </motion.div>
          </motion.div>
        )}
        </AnimatePresence>,
        document.body,
      )}

    </header>
  );
}
