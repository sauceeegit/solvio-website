import { useEffect, useRef, useState } from 'react';
import { Check } from 'lucide-react';
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
  const [ready, setReady] = useState(false);
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
        {/* Tagline + video share a wrapper so the tagline can stay frozen (sticky
            just below the header) until the looping video has scrolled past. */}
        <div className="relative">
          {/* Tagline bar — freezes below the header while the video scrolls by. */}
          <section className="sticky z-30 bg-white" style={{ top: headerH }}>
            <div className="container-x py-6 text-center sm:py-8">
              <h1 className="font-display text-2xl font-extrabold tracking-tight text-ink sm:text-4xl">
                Thailand&apos;s complete residential and commercial solar solution.
              </h1>
            </div>
          </section>

          {/* Full-bleed looping video — spans the entire viewport width. */}
          <section className="relative w-full">
            {/* Aspect-locked, brand-dark backdrop so there's no layout jump and a
                clean fill (not a blank flash) while the loop downloads. */}
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
            </div>
          </section>
        </div>

        <section className="bg-white">
          <div className="container-x">
            <Reveal>
              <div className="grid items-center gap-8 py-14 sm:py-20 lg:grid-cols-2 lg:gap-14">
                {/* image */}
                <div className="overflow-hidden rounded-xl2 shadow-soft">
                  <img loading="lazy"
                    src={asset('/rooftop-feature.webp')}
                    alt="Aerial before and after — a villa roof fitted with a full Solvio solar array"
                    className="block w-full"
                  />
                </div>

                {/* text — nudged up just slightly relative to the image */}
                <div className="lg:-mt-3 lg:self-start">
                  <h2 className="font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-ink sm:text-4xl lg:text-5xl">
                    Big Roof? Build Big.
                  </h2>
                  <p className="mt-5 max-w-md text-lg leading-relaxed text-slatey-500">
                    Every square metre of unused roof is money left on the table. If you&apos;ve got
                    the space, we&apos;ve got the system to fill it<span className="max-sm:hidden"> — sized
                    to your building, your load, and your ambitions</span>.
                  </p>
                  {/* roof types we install on */}
                  <ul className="mt-5 grid max-w-md grid-cols-1 gap-x-4 gap-y-2.5 sm:grid-cols-2">
                    {[
                      'Standing Seam Metal Roofs',
                      'Asphalt Shingle Roofs',
                      'Clay Tile Roofs',
                      'Flat Concrete Roofs',
                    ].map((x) => (
                      <li key={x} className="flex items-center gap-2 font-display text-sm font-semibold text-ink">
                        <Check size={16} strokeWidth={3} className="shrink-0 text-lime-dark" /> {x}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="grid items-center gap-8 pb-14 sm:pb-20 lg:grid-cols-2 lg:gap-14">
                {/* image (right on desktop) */}
                <div className="overflow-hidden rounded-xl2 shadow-soft lg:order-2">
                  <img loading="lazy"
                    src={asset('/rooftop-cta.webp')}
                    alt="Solvio technicians installing a rooftop solar array on a resort at sunset"
                    className="block w-full"
                  />
                </div>

                {/* text (left on desktop) */}
                <div className="lg:order-1">
                  <h2 className="font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-ink sm:text-4xl lg:text-5xl">
                    Designed and installed by people who&apos;ve done it before
                  </h2>
                  {/* desktop copy */}
                  <p className="mt-5 max-w-md text-lg leading-relaxed text-slatey-500 max-sm:hidden">
                    Solar isn&apos;t guesswork. Our team brings years of hands-on experience and
                    state-of-the-art design to every rooftop we take on — engineering each system for
                    maximum yield, safe structural loading, and clean integration with your existing
                    power setup. Whether it&apos;s a resort, a hotel, or a commercial block, we build
                    it to perform.
                  </p>
                  {/* mobile: trimmed copy + segment checklist */}
                  <div className="mt-5 sm:hidden">
                    <p className="text-lg leading-relaxed text-slatey-500">
                      Our team brings years of hands-on experience and state-of-the-art design to
                      every rooftop we take on.
                    </p>
                    <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5">
                      {['Resort', 'Hotel', 'Commercial Block', 'Condo'].map((x) => (
                        <li key={x} className="flex items-center gap-2 font-display text-sm font-semibold text-ink">
                          <Check size={16} strokeWidth={3} className="shrink-0 text-lime-dark" /> {x}
                        </li>
                      ))}
                    </ul>
                  </div>
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
          heading="Frequently asked questions"
          subtitle="Roof suitability, timelines, permits and warranties — the questions Thai homeowners ask us most."
        />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
