import { useEffect, useRef, useState } from 'react';
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
  const videoRef = useRef(null);
  const brandVideoRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [brandReady, setBrandReady] = useState(false);
  // Height of the sticky site header, so the tagline can freeze just below it.
  const [headerH, setHeaderH] = useState(0);

  // Ensure the loop autoplays muted (React can drop the muted attribute).
  useEffect(() => {
    const v = videoRef.current;
    if (v) {
      v.muted = true;
      v.play?.().catch(() => {});
      if (v.readyState >= 2) setReady(true);
    }
    const b = brandVideoRef.current;
    if (b) {
      b.muted = true;
      b.play?.().catch(() => {});
      if (b.readyState >= 2) setBrandReady(true);
    }
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
          <div className="relative aspect-video w-full overflow-hidden bg-ink">
            <video
              ref={brandVideoRef}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                brandReady ? 'opacity-100' : 'opacity-0'
              }`}
              src={asset('/solvio-brand.mp4')}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              onLoadedData={() => setBrandReady(true)}
              onCanPlay={() => setBrandReady(true)}
            />
            <MediaLoader show={!brandReady} label="Loading video" />
          </div>
        </section>

        {/* Full-bleed hero video with overlaid headline */}
        <section className="relative w-full">
          <div className="relative aspect-video w-full overflow-hidden bg-ink">
            <video
              ref={videoRef}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                ready ? 'opacity-100' : 'opacity-0'
              }`}
              src={rooftopVideo}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              onLoadedData={() => setReady(true)}
              onCanPlay={() => setReady(true)}
            />
            <MediaLoader show={!ready} label="Loading video" />

            {/* Gradients + text overlay */}
            <div className="pointer-events-none absolute inset-0 z-10">
              <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/50 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 container-x pb-[clamp(1.25rem,4vw,3.5rem)]">
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-white/70">Rooftop Solar Thailand</p>
                <h1 className="mt-2 font-display text-[clamp(1.5rem,3.5vw,3rem)] font-medium leading-[1.1] tracking-tight text-white max-w-2xl" style={{ fontFamily: '"Space Grotesk", system-ui, sans-serif' }}>
                  Thailand&apos;s complete residential and commercial solar solution.
                </h1>
              </div>
            </div>
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
                  <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-lime">Rooftop Solar</p>
                  <h2 className="mt-3 font-display text-3xl font-medium leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl">
                    Big Roof?<br />Build Big.
                  </h2>
                  <p className="mt-5 max-w-md text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                    Every square metre of unused roof is money left on the table. If you&apos;ve got the space, we&apos;ve got the system to fill it — sized to your building, your load, and your ambitions.
                  </p>
                  <ul className="mt-6 grid max-w-md grid-cols-2 gap-x-4 gap-y-3">
                    {[
                      'Standing Seam Metal',
                      'Asphalt Shingle',
                      'Clay Tile Roofs',
                      'Flat Concrete Roofs',
                    ].map((x) => (
                      <li key={x} className="flex items-center gap-2 font-display text-sm font-semibold text-white">
                        <Check size={15} strokeWidth={3} className="shrink-0 text-lime" /> {x}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 max-w-md font-mono text-xs font-bold uppercase tracking-[0.12em]" style={{ color: 'rgba(255,255,255,0.3)' }}>
                    Engineered for 99% of rooftops · Ultra-lightweight · Exclusively Solvio
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
                  <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-lime">Our team</p>
                  <h2 className="mt-3 font-display text-3xl font-medium leading-[1.1] tracking-tight text-white sm:text-4xl">
                    Designed and installed by people who&apos;ve done it before
                  </h2>
                  <p className="mt-4 max-w-md text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                    Our team brings years of hands-on experience and state-of-the-art design to every rooftop we take on.
                  </p>
                  <ul className="mt-6 grid grid-cols-2 gap-3">
                    {[
                      { label: 'Resort', icon: Layers },
                      { label: 'Hotel', icon: Hotel },
                      { label: 'Commercial Block', icon: Building2 },
                      { label: 'Condo', icon: Landmark },
                      { label: 'House', icon: Home },
                      { label: 'Mobile unit', icon: Truck },
                    ].map(({ label, icon: Icon }) => (
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
          eyebrow="Rooftop FAQs"
          heading="FAQ"
          subtitle="Roof suitability, timelines, permits and warranties — the questions Thai homeowners ask us most."
        />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
