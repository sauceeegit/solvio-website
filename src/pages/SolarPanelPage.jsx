import { useEffect, useRef, useState } from 'react';
import TopBar from '../components/landing/TopBar';
import LandingNav from '../components/landing/LandingNav';
import Footer from '../components/Footer';
import { solarPanelVideo } from '../data/landing';

export default function SolarPanelPage() {
  const videoRef = useRef(null);
  const [ready, setReady] = useState(false);

  // Ensure the loop autoplays muted (React can drop the muted attribute).
  useEffect(() => {
    const v = videoRef.current;
    if (v) {
      v.muted = true;
      v.play?.().catch(() => {});
      if (v.readyState >= 2) setReady(true);
    }
  }, []);

  return (
    <div id="top" className="min-h-screen bg-surface">
      <TopBar />
      <LandingNav />
      <main>
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
              src={solarPanelVideo}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              onLoadedData={() => setReady(true)}
              onCanPlay={() => setReady(true)}
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
