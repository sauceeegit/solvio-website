import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { hero } from '../../data/landing';
import MediaLoader from '../MediaLoader';
import PhuketClock from './PhuketClock';

const EASE = [0.16, 1, 0.3, 1];

export default function Hero() {
  const videoRef = useRef(null);
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
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/50 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 container-x pb-[clamp(1.25rem,5vw,4rem)] flex items-end justify-between gap-4">
          <div>
            <motion.h1
              className="font-display text-[clamp(1.55rem,7.5vw,3.25rem)] font-medium leading-[1.08] tracking-tight text-white max-w-xl"
              initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1, delay: 0.3, ease: EASE }}
            >
              Clean Energy<span className="text-lime">.</span><br />Made Simple<span className="text-lime">.</span>
            </motion.h1>
            <motion.p
              className="mt-4 font-display text-[clamp(0.85rem,1.4vw,1rem)] font-medium tracking-wide text-white/90 max-w-sm"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.6, ease: EASE }}
            >
              Premium solar for every Thai home.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9, ease: EASE }}
          >
            <PhuketClock />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
