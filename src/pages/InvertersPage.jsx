import { useCallback, useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Header from '../components/landing/Header';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import InverterCard from '../components/inverters/InverterCard';
import '../components/inverters/inverters.css';
import { inverterCategories, inverters } from '../data/inverters';
import { usePageMeta } from '../hooks/usePageMeta';
import { useLanguage } from '../context/LanguageContext';

const copy = {
  en: {
    eyebrow: 'Solvio energy solutions',
    h1: 'Inverter solutions for your project',
    intro:
      'From home rooftops to commercial buildings and larger solar projects, Solvio offers a wide range of inverter, energy storage and monitoring solutions. Explore on-grid and hybrid options, then talk to us about the right fit for your site and energy needs.',
    cta: 'Get a quote',
    browse: 'Browse categories',
    note: 'No pricing is shown here: inverter pricing depends on the full system design. Every enquiry is quoted individually.',
  },
  th: {
    eyebrow: 'โซลูชันพลังงานจาก Solvio',
    h1: 'โซลูชันอินเวอร์เตอร์สำหรับโครงการของคุณ',
    intro:
      'ตั้งแต่หลังคาบ้านไปจนถึงอาคารเชิงพาณิชย์และโครงการโซลาร์ขนาดใหญ่ Solvio มีโซลูชันอินเวอร์เตอร์ ระบบกักเก็บพลังงาน และการติดตามระบบให้เลือกหลากหลาย ดูตัวเลือกทั้งแบบออนกริดและไฮบริด แล้วปรึกษาเราเพื่อเลือกสิ่งที่เหมาะกับหน้างานและความต้องการพลังงานของคุณ',
    cta: 'ขอใบเสนอราคา',
    browse: 'เลือกดูตามหมวดหมู่',
    note: 'หน้านี้ไม่แสดงราคา เนื่องจากราคาอินเวอร์เตอร์ขึ้นอยู่กับการออกแบบระบบทั้งหมด เราจึงเสนอราคาเป็นรายกรณี',
  },
};

export default function InvertersPage() {
  usePageMeta('/inverters');
  const { lang } = useLanguage();
  const th = lang === 'th';
  const t = copy[lang];

  // Mobile-only (<1024px) accordion. The first category is always open and has
  // no toggle; the rest start collapsed. State lives here and is expressed as a
  // data attribute so CSS can force every body visible again on desktop —
  // cards are never unmounted, so no state or image fetch is ever destroyed.
  const [openCats, setOpenCats] = useState(() => ({}));
  const firstKey = inverterCategories[0].key;

  const revealCat = useCallback(
    (key) => setOpenCats((prev) => (prev[key] ? prev : { ...prev, [key]: true })),
    [],
  );

  // Direct hash navigation (and in-page anchors) must reveal the target too.
  useEffect(() => {
    const syncFromHash = () => {
      const raw = window.location.hash.replace('#', '');
      if (!raw) return;
      // A malformed percent-escape (e.g. #%E0) would throw out of the listener.
      let key = raw;
      try {
        key = decodeURIComponent(raw);
      } catch {
        return;
      }
      if (inverterCategories.some((c) => c.key === key)) revealCat(key);
    };
    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, [revealCat]);

  return (
    <div id="top" className="inverters-page min-h-screen bg-surface">
      <Header />
      <main>
        <section className="bg-surface">
          <div className="container-x pb-10 pt-14 lg:pb-14 lg:pt-20">
            <p className="font-mono text-[11px] uppercase tracking-wider text-lime">{t.eyebrow}</p>
            <h1 className="mt-3 max-w-3xl font-display text-3xl font-bold leading-tight text-ink lg:text-5xl">
              {t.h1}
            </h1>
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-ink/70">{t.intro}</p>
            <a
              href="#contact"
              className="mt-7 inline-flex items-center rounded-full bg-lime px-6 py-3 font-display text-sm font-bold text-white transition hover:bg-lime-dark"
            >
              {t.cta}
            </a>
          </div>
        </section>

        {/* Mobile category rail — horizontal snap-scroller of anchors. */}
        <nav
          aria-label={t.browse}
          className="sticky top-[104px] z-30 border-y border-ink/10 bg-white/95 backdrop-blur-md lg:hidden"
        >
          <ul className="inv-rail container-x flex gap-2 overflow-x-auto py-3">
            {inverterCategories.map((c) => (
              <li key={c.key}>
                <a
                  href={`#${c.key}`}
                  data-rail-link={c.key}
                  onClick={(e) => {
                    // Expand first, then scroll — otherwise the anchor jumps to
                    // a still-collapsed section and lands at the wrong offset.
                    e.preventDefault();
                    revealCat(c.key);
                    window.history.replaceState(null, '', `#${c.key}`);
                    requestAnimationFrame(() => {
                      document.getElementById(c.key)?.scrollIntoView({ block: 'start' });
                    });
                  }}
                  className="inline-block whitespace-nowrap rounded-full border border-ink/15 px-3.5 py-1.5 font-display text-[12.5px] font-semibold text-ink/75 transition hover:border-lime hover:text-lime"
                >
                  {th ? c.th : c.en}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="container-x grid gap-10 py-12 lg:grid-cols-[250px_1fr] lg:gap-12 lg:py-16">
          {/* Desktop sticky category rail. */}
          <aside className="hidden lg:block">
            <nav
              aria-label={t.browse}
              className="sticky top-24 rounded-2xl p-6 text-white"
              style={{ backgroundColor: '#040f08' }}
            >
              <p className="font-mono text-[11px] uppercase tracking-wider text-white/40">{t.browse}</p>
              <ul className="mt-4 space-y-3">
                {inverterCategories.map((c) => (
                  <li key={c.key}>
                    <a
                      href={`#${c.key}`}
                      className="block font-display text-[13.5px] font-semibold leading-snug text-white/75 transition hover:text-lime"
                    >
                      {th ? c.th : c.en}
                      <span className="ml-1.5 font-mono text-[11px] font-normal text-white/35">
                        {inverters.filter((p) => p.cat === c.key).length}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-white/10 pt-4 text-[12px] leading-relaxed text-white/45">
                {t.note}
              </p>
            </nav>
          </aside>

          <div className="inv-col min-w-0 space-y-14">
            {inverterCategories.map((c) => {
              const always = c.key === firstKey;
              const open = always || !!openCats[c.key];
              const label = th ? c.th : c.en;
              return (
                <section
                  key={c.key}
                  id={c.key}
                  data-category={c.key}
                  data-open={open ? 'true' : 'false'}
                  className="inv-cat scroll-mt-[168px] lg:scroll-mt-28"
                >
                  {always ? (
                    <h2 className="font-display text-2xl font-bold text-ink">{label}</h2>
                  ) : (
                    <h2 className="font-display text-2xl font-bold text-ink">
                      {/* Desktop: a plain label — the body is always visible there,
                          so there must be no focusable disclosure control claiming
                          aria-expanded=false. Mobile: the real toggle button. */}
                      <span className="hidden lg:block">{label}</span>
                      <button
                        type="button"
                        data-cat-toggle={c.key}
                        aria-expanded={open}
                        aria-controls={`${c.key}-body`}
                        onClick={() => setOpenCats((prev) => ({ ...prev, [c.key]: !prev[c.key] }))}
                        className="inv-cat-toggle flex w-full items-center justify-between gap-4 rounded-lg text-left font-display text-2xl font-bold text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime lg:hidden"
                      >
                        <span>{label}</span>
                        <ChevronDown
                          aria-hidden="true"
                          className="inv-cat-chevron h-5 w-5 shrink-0 text-ink/50"
                        />
                      </button>
                    </h2>
                  )}
                  <div id={`${c.key}-body`} data-cat-body={c.key} className="inv-cat-body">
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink/60">
                      {th ? c.guide_th : c.guide_en}
                    </p>
                    <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                      {inverters
                        .filter((p) => p.cat === c.key)
                        .map((item) => (
                          <InverterCard key={item.id} item={item} th={th} />
                        ))}
                    </div>
                  </div>
                </section>
              );
            })}
          </div>
        </div>

        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
