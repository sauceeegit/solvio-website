import { useEffect, useRef, useState } from 'react';
import Header from '../components/landing/Header';
import SolarPanelFeatures from '../components/SolarPanelFeatures';
import Footer from '../components/Footer';
import { solarPanelVideo } from '../data/landing';

export default function SolarPanelPage() {
  const videoRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);

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
      <Header />
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
              onTimeUpdate={(e) => {
                const v = e.currentTarget;
                if (v.duration) setProgress((v.currentTime / v.duration) * 100);
              }}
            />

            {/* Orange playback progress bar tracking the loop's duration */}
            <div className="absolute inset-x-0 bottom-0 z-10 h-1.5 bg-white/15">
              <div
                className="h-full bg-lime transition-[width] duration-150 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </section>

        <SolarPanelFeatures />
      </main>
      <Footer />
    </div>
  );
}
