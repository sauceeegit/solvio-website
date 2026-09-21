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
    eyebrow: 'Solis inverters',
    h1: 'Solis inverter catalogue',
    intro:
      '12 Solis inverter variants — from a 2.5 kW single-phase rooftop string inverter up to a 350 kW utility-scale unit — plus the SolisCloud monitoring platform and 2 data loggers. Specifications are taken from the manufacturer datasheet for each exact model. Tell us your site and we will size the right one with you.',
    cta: 'Get a quote',
    browse: 'Browse categories',
    note: 'No pricing is shown here: inverter pricing depends on the full system design. Every enquiry is quoted individually.',
  },
  th: {
    eyebrow: 'อินเวอร์เตอร์ Solis',
    h1: 'แคตตาล็อกอินเวอร์เตอร์ Solis',
    intro:
      'อินเวอร์เตอร์ Solis 12 รุ่นย่อย ตั้งแต่ออนกริด 1 เฟส ขนาด 2.5 กิโลวัตต์ ไปจนถึงรุ่นระดับยูทิลิตี้ 350 กิโลวัตต์ พร้อมแพลตฟอร์มติดตามระบบ SolisCloud และดาต้าล็อกเกอร์อีก 2 รุ่น ข้อมูลจำเพาะอ้างอิงจากเอกสารของผู้ผลิตตามรุ่นนั้น ๆ แจ้งรายละเอียดหน้างานมาได้เลย เราช่วยเลือกขนาดที่เหมาะสมให้',
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
            {inverterCategories.map((c) => (
              <section key={c.key} id={c.key} className="scroll-mt-[168px] lg:scroll-mt-28">
                <h2 className="font-display text-2xl font-bold text-ink">{th ? c.th : c.en}</h2>
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
              </section>
            ))}
          </div>
        </div>

        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
