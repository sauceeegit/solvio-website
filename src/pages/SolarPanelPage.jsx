import { useEffect, useRef, useState } from 'react';
import Header from '../components/landing/Header';
import SolarPanelFeatures from '../components/SolarPanelFeatures';
import Footer from '../components/Footer';
import { solarPanelVideo } from '../data/landing';

export default function SolarPanelPage() {
  const videoRef = useRef(null);
  const barRef = useRef(null);
  const [ready, setReady] = useState(false);

  // Ensure the loop autoplays muted (React can drop the muted attribute), and
  // drive the progress bar every animation frame for smooth (non-laggy) motion —
  // the video's `timeupdate` event only fires ~4×/sec, which looks choppy.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.play?.().catch(() => {});
    if (v.readyState >= 2) setReady(true);

    let raf;
    const tick = () => {
      if (v.duration && barRef.current) {
        barRef.current.style.width = `${(v.currentTime / v.duration) * 100}%`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
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
            />

            {/* Orange playback progress bar tracking the loop's duration */}
            <div className="absolute inset-x-0 bottom-0 z-10 h-1.5 bg-white/15">
              <div ref={barRef} className="h-full bg-lime" style={{ width: '0%' }} />
            </div>
          </div>
        </section>

        <SolarPanelFeatures />
      </main>
      <Footer />
    </div>
  );
}
