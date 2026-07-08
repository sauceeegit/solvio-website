import { useState, useEffect } from 'react';
import { Play, ArrowRight, Video, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { founder } from '../../data/landing';
import Reveal from '../Reveal';

export default function FounderVideo() {
  const [open, setOpen] = useState(false);
  const hasVideo = !!founder.youtubeEmbed;

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  const openVideo = () => hasVideo && setOpen(true);

  return (
    <section className="bg-surface py-16">
      <div className="container-x grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <Reveal>
          <button
            type="button"
            onClick={openVideo}
            className="group relative block aspect-video w-full overflow-hidden rounded-xl2 bg-ink shadow-lift"
            aria-label="Play founder interview"
          >
            <img loading="lazy"
              src={founder.poster}
              alt="Founder interview"
              className="absolute inset-0 h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-ink/40" />
            <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#FF0000] text-white shadow-lift transition group-hover:scale-110">
              <Play size={26} className="ml-1 fill-white" />
            </span>
            <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-white backdrop-blur">
              <Video size={13} /> Watch the interview
            </span>
          </button>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="eyebrow">Solar in Thailand</p>
          <h2 className="mt-2 font-display text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl max-sm:text-[22px]">
            {founder.heading}
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-slatey-500">{founder.body}</p>
          <button
            type="button"
            onClick={openVideo}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-lime px-6 py-3.5 font-display text-sm font-bold text-white transition hover:bg-lime-dark"
          >
            {founder.cta} <ArrowRight size={16} />
          </button>
        </Reveal>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="relative w-full max-w-4xl"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: 'spring', damping: 24, stiffness: 280 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close video"
                className="absolute -top-11 right-0 grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
              >
                <X size={20} />
              </button>
              <div className="aspect-video w-full overflow-hidden rounded-xl2 bg-black shadow-lift">
                <iframe
                  className="h-full w-full"
                  src={`${founder.youtubeEmbed}?autoplay=1&rel=0`}
                  title="Solvio founder interview"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
