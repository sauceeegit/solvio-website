import { useEffect, useRef, useState } from 'react';
import Header from '../components/landing/Header';
import SolarPanelFeatures from '../components/SolarPanelFeatures';
import SolarYourWay from '../components/SolarYourWay';
import PanelComparison from '../components/PanelComparison';
import FAQ from '../components/FAQ';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import MediaLoader from '../components/MediaLoader';
import { panelFaqs } from '../data/landing';
import { usePageMeta } from '../hooks/usePageMeta';
import { asset } from '../lib/format';

function FeatherVideo() {
  const videoRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.play?.().catch(() => {});
    if (v.readyState >= 2) setReady(true);
  }, []);

  return (
    <section className="relative aspect-video w-full overflow-hidden bg-ink">
      <video
        ref={videoRef}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${ready ? 'opacity-100' : 'opacity-0'}`}
        src={asset('/feather-loop.mp4')}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onLoadedData={() => setReady(true)}
        onCanPlay={() => setReady(true)}
      />
      <MediaLoader show={!ready} label="Loading video" />
    </section>
  );
}

export default function SolarPanelPage() {
  usePageMeta('/solar-panel');

  return (
    <div id="top" className="min-h-screen bg-surface">
      <Header />
      <main>
        <h1 className="sr-only">Dark Feather 450 Wp solar panel — glass-glass, IP68</h1>
        <SolarPanelFeatures />
        <FeatherVideo />
        <SolarYourWay />
        <PanelComparison />
        <FAQ
          items={panelFaqs}
          eyebrow="Panel tech"
          heading="FAQ"
          subtitle="The engineering behind Solvio panels — cells, build, and how they hold up in Thai heat."
        />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
