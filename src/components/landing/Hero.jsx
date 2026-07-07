import { useEffect, useRef, useState } from 'react';
import { hero } from '../../data/landing';
import MediaLoader from '../MediaLoader';
import PhuketClock from './PhuketClock';

export default function Hero() {
  const videoRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (v) {
      v.muted = true;
      v.play?.().catch(() => {});
      if (v.readyState >= 2) setReady(true);
    }
  }, []);

  return (
    <section className="relative w-full">
      {hero.videoSrc ? (
        <div className="relative aspect-video w-full overflow-hidden bg-ink">
          <video
            ref={videoRef}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              ready ? 'opacity-100' : 'opacity-0'
            }`}
            src={hero.videoSrc}
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
      ) : (
        <img src={hero.poster} alt={hero.caption} className="block h-auto w-full object-cover" />
      )}

      {/* Slogan across the top of the looping video */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10">
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-ink/45 to-transparent sm:h-40" />
        <p className="relative px-4 pt-[clamp(0.75rem,3.4vw,2.5rem)] text-center font-display text-[clamp(1.25rem,4.5vw,3rem)] font-extrabold tracking-tight text-white">
          Solvio <span className="text-lime">—</span> Sun. Sorted.
        </p>
      </div>

      <PhuketClock />
    </section>
  );
}
