import { useEffect, useRef, useState } from 'react';
import { hero } from '../../data/landing';
import MediaLoader from '../MediaLoader';
import PhuketClock from './PhuketClock';

export default function Hero() {
  const videoRef = useRef(null);
  // Under headless prerender, start "ready" so the snapshot shows the poster
  // frame instead of the loading overlay (see Reveal.jsx for the same guard).
  const [ready, setReady] = useState(
    () => typeof navigator !== 'undefined' && navigator.webdriver
  );

  useEffect(() => {
    const v = videoRef.current;
    if (v) {
      v.muted = true;
      v.play?.().catch(() => {});
      if (v.readyState >= 2) setReady(true);
    }
  }, []);

  return (
    <section className="relative w-full" style={{ height: '82svh', minHeight: 480 }}>
      {hero.videoSrc ? (
        <div className="absolute inset-0 overflow-hidden bg-ink">
          <video
            ref={videoRef}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              ready ? 'opacity-100' : 'opacity-0'
            }`}
            src={hero.videoSrc}
            poster={hero.videoPoster}
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

      {/* Gradients + slogan */}
      <div className="pointer-events-none absolute inset-0 z-10">
        {/* top gradient — darkens behind the transparent nav */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/50 to-transparent" />
        {/* bottom gradient — behind the headline text */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 container-x pb-[clamp(1.25rem,5vw,4rem)]">
          <h1 className="font-display text-[clamp(1.4rem,4vw,3.25rem)] font-bold leading-[1.08] tracking-tight text-white max-w-xl">
            Clean Energy<span className="text-lime">.</span><br />Made Simple<span className="text-lime">.</span>
          </h1>
          <p className="mt-2 font-display text-[clamp(0.7rem,1.3vw,0.9rem)] font-medium text-white/75 max-w-sm">
            Premium solar for every Thai home.
          </p>
        </div>
      </div>

      <PhuketClock />
    </section>
  );
}
