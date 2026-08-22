import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Check, Building2, Hotel, Home, Layers, Landmark, Truck } from 'lucide-react';
import Header from '../components/landing/Header';
import Footer from '../components/Footer';
import MediaLoader from '../components/MediaLoader';
import Reveal from '../components/Reveal';
import RooftopSteps from '../components/RooftopSteps';
import FinancingOptions from '../components/FinancingOptions';
import FAQ from '../components/FAQ';
import ContactSection from '../components/ContactSection';
import { asset } from '../lib/format';
import { rooftopVideo, rooftopFaqs } from '../data/landing';
import { usePageMeta } from '../hooks/usePageMeta';

export default function RooftopSystemPage() {
  usePageMeta('/rooftop-system');
  const { lang } = useLanguage();
  const brandVideoRef = useRef(null);
  const [brandReady, setBrandReady] = useState(false);
  // Height of the sticky site header, so the tagline can freeze just below it.
  const [headerH, setHeaderH] = useState(0);

  // Ensure the loop autoplays muted (React can drop the muted attribute).
  useEffect(() => {
    const b = brandVideoRef.current;
    if (b) { b.muted = true; b.play?.().catch(() => {}); if (b.readyState >= 2) setBrandReady(true); }
  }, []);

  // Track the sticky header height (varies mobile/desktop and on resize).
  useEffect(() => {
    const el = document.getElementById('site-header');
    if (!el) return undefined;
    const measure = () => setHeaderH(el.offsetHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  return (
    <div id="top" className="min-h-screen bg-surface">
      <Header />
      <main>
        {/* Brand video — full-bleed, above the hero */}
        <section className="relative w-full">
          <div className="relative w-full overflow-hidden bg-ink" style={{ height: '60svh', minHeight: 360 }}>
            <video
              ref={brandVideoRef}
              className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-700 ${brandReady ? 'opacity-100' : 'opacity-0'}`}
              src={asset('/solvio-brand.mp4')}
              poster={asset('/solvio-brand-poster.webp')}
              autoPlay loop muted playsInline preload="metadata"
              onLoadedData={() => setBrandReady(true)}
              onCanPlay={() => setBrandReady(true)}
            />
            <MediaLoader show={!brandReady} label="Loading video" />
          </div>
        </section>


        <section style={{ backgroundColor: '#040f08' }}>
          <div className="container-x">
            <Reveal>
              <div className="grid items-center gap-8 py-14 sm:py-20 lg:grid-cols-2 lg:gap-14">
                {/* image */}
                <div className="overflow-hidden rounded-xl2">
                  <img loading="lazy"
                    src={asset('/rooftop-feature.webp')}
                    alt="Aerial before and after — a villa roof fitted with a full Solvio solar array"
                    width={1448}
                    height={1086}
                    className="block w-full"
                  />
                </div>

                <div className="lg:-mt-3 lg:self-start">
                  <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-lime">{lang === 'th' ? 'โซลาร์หลังคา' : 'Rooftop Solar'}</p>
                  <h2 className="mt-3 font-display text-3xl font-medium leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl">
                    {lang === 'th' ? <>หลังคาใหญ่?<br />ลงทุนใหญ่.</> : <>Big Roof?<br />Build Big.</>}
                  </h2>
                  <p className="mt-5 max-w-md text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                    {lang === 'th'
                      ? 'ทุกตารางเมตรของหลังคาที่ว่างอยู่คือเงินที่สูญเสียไป ถ้าคุณมีพื้นที่ เรามีระบบที่พอดีกับอาคาร โหลด และเป้าหมายของคุณ'
                      : "Every square metre of unused roof is money left on the table. If you've got the space, we've got the system to fill it — sized to your building, your load, and your ambitions."}
                  </p>
                  <ul className="mt-6 grid max-w-md grid-cols-2 gap-x-4 gap-y-3">
                    {(lang === 'th'
                      ? ['หลังคาเมทัลชีท', 'หลังคากระเบื้องแอสฟัลต์', 'หลังคากระเบื้องดินเผา', 'หลังคาคอนกรีตแบน']
                      : ['Standing Seam Metal', 'Asphalt Shingle', 'Clay Tile Roofs', 'Flat Concrete Roofs']
                    ).map((x) => (
                      <li key={x} className="flex items-center gap-2 font-display text-sm font-semibold text-white">
                        <Check size={15} strokeWidth={3} className="shrink-0 text-lime" /> {x}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 max-w-md font-mono text-xs font-bold uppercase tracking-[0.12em]" style={{ color: 'rgba(255,255,255,0.3)' }}>
                    {lang === 'th' ? 'ออกแบบสำหรับหลังคา 99% · น้ำหนักเบาพิเศษ · เฉพาะ Solvio' : 'Engineered for 99% of rooftops · Ultra-lightweight · Exclusively Solvio'}
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="grid items-center gap-8 pb-14 sm:pb-20 lg:grid-cols-2 lg:gap-14">
                <div className="overflow-hidden rounded-xl2 lg:order-2">
                  <img loading="lazy"
                    src={asset('/rooftop-cta.webp')}
                    alt="Solvio technicians installing a rooftop solar array on a resort at sunset"
                    width={1448}
                    height={1086}
                    className="block w-full"
                  />
                </div>

                <div className="lg:order-1">
                  <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-lime">{lang === 'th' ? 'ทีมงานของเรา' : 'Our team'}</p>
                  <h2 className="mt-3 font-display text-3xl font-medium leading-[1.1] tracking-tight text-white sm:text-4xl">
                    {lang === 'th' ? 'ออกแบบและติดตั้งโดยผู้ที่มีประสบการณ์จริง' : "Designed and installed by people who've done it before"}
                  </h2>
                  <p className="mt-4 max-w-md text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                    {lang === 'th' ? 'ทีมงานของเรามีประสบการณ์ภาคสนามหลายปีและนำการออกแบบที่ทันสมัยมาใช้กับทุกหลังคาที่เราดูแล' : 'Our team brings years of hands-on experience and state-of-the-art design to every rooftop we take on.'}
                  </p>
                  <ul className="mt-6 grid grid-cols-2 gap-3">
                    {(lang === 'th'
                      ? [
                          { label: 'รีสอร์ท', icon: Layers },
                          { label: 'โรงแรม', icon: Hotel },
                          { label: 'อาคารพาณิชย์', icon: Building2 },
                          { label: 'คอนโด', icon: Landmark },
                          { label: 'บ้าน', icon: Home },
                          { label: 'ยูนิตเคลื่อนที่', icon: Truck },
                        ]
                      : [
                          { label: 'Resort', icon: Layers },
                          { label: 'Hotel', icon: Hotel },
                          { label: 'Commercial Block', icon: Building2 },
                          { label: 'Condo', icon: Landmark },
                          { label: 'House', icon: Home },
                          { label: 'Mobile unit', icon: Truck },
                        ]
                    ).map(({ label, icon: Icon }) => (
                      <li key={label} className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 font-display text-sm font-semibold text-white" style={{ backgroundColor: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-lime text-white">
                          <Icon size={14} strokeWidth={2} />
                        </span>
                        {label}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 7-step plan (horizontal) */}
        <RooftopSteps />
        <FinancingOptions />
        <FAQ
          items={rooftopFaqs}
          eyebrow={lang === 'th' ? 'คำถามเกี่ยวกับหลังคา' : 'Rooftop FAQs'}
          heading={lang === 'th' ? 'คำถามที่พบบ่อย' : 'FAQ'}
          subtitle={lang === 'th' ? 'ความเหมาะสมของหลังคา ระยะเวลา ใบอนุญาต และการรับประกัน — คำถามที่เจ้าของบ้านไทยถามเรามากที่สุด' : 'Roof suitability, timelines, permits and warranties — the questions Thai homeowners ask us most.'}
        />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
