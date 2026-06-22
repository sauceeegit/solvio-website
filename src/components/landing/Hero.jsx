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
      <PhuketClock />
    </section>
  );
}
