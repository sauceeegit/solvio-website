import { useEffect, useRef } from 'react';
import { hero } from '../../data/landing';
import PhuketClock from './PhuketClock';

export default function Hero() {
  const videoRef = useRef(null);

  // Ensure the loop autoplays muted (React can drop the muted attribute).
  useEffect(() => {
    const v = videoRef.current;
    if (v) {
      v.muted = true;
      v.play?.().catch(() => {});
    }
  }, []);

  return (
    // Full-bleed: no container, no frame — the video spans the entire width.
    <section className="relative w-full">
      {hero.videoSrc ? (
        <video
          ref={videoRef}
          className="block h-auto w-full"
          src={hero.videoSrc}
          poster={hero.poster}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        />
      ) : (
        <img src={hero.poster} alt={hero.caption} className="block h-auto w-full object-cover" />
      )}

      {/* Slogan across the top of the looping video */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10">
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-ink/45 to-transparent sm:h-40" />
        <p className="relative px-4 pt-[clamp(0.75rem,3.4vw,2.5rem)] text-center font-display text-[clamp(1.25rem,4.5vw,3rem)] font-extrabold tracking-tight text-white [text-shadow:0_2px_16px_rgba(0,0,0,0.5)]">
          Solvio <span className="text-lime">—</span> Sun. Sorted.
        </p>
      </div>

      <PhuketClock />
    </section>
  );
}
