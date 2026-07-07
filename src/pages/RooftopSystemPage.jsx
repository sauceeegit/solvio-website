import { useEffect, useRef, useState } from 'react';
import Header from '../components/landing/Header';
import Footer from '../components/Footer';
import MediaLoader from '../components/MediaLoader';
import Reveal from '../components/Reveal';
import { asset } from '../lib/format';
import { rooftopVideo } from '../data/landing';

export default function RooftopSystemPage() {
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

        <section className="bg-white">
          <div className="container-x">
            <Reveal>
              <div className="grid items-center gap-8 py-14 sm:py-20 lg:grid-cols-2 lg:gap-14">
                {/* image */}
                <div className="overflow-hidden rounded-xl2 shadow-soft">
                  <img
                    src={asset('/rooftop-feature.webp')}
                    alt="Aerial before and after — a villa roof fitted with a full Solvio solar array"
                    className="block w-full"
                  />
                </div>

                {/* text */}
                <div>
                  <h2 className="font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-ink sm:text-4xl lg:text-5xl">
                    Big Roof? Build Big.
                  </h2>
                  <p className="mt-5 max-w-md text-lg text-slatey-500">
                    Every square metre of unused roof is money left on the table. If you&apos;ve got
                    the space, we&apos;ve got the system to fill it — sized to your building, your
                    load, and your ambitions.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
