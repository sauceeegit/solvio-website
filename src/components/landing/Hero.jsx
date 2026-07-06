import { useEffect, useRef, useState } from 'react';
import { hero } from '../../data/landing';
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
        </div>
      ) : (
        <img src={hero.poster} alt={hero.caption} className="block h-auto w-full object-cover" />
      )}

      <PhuketClock />
    </section>
  );
}
