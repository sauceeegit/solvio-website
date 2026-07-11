import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { asset } from '../lib/format';

const SLIDES = [
  {
    src: asset('/savings-bg.jpg'),
    alt: 'Couple on a balcony with Solvio solar panels on the railing at sunset',
    caption: 'Solar on every balcony',
  },
  {
    src: asset('/plugplay-photo.jpg'),
    alt: 'Easy plug & play installation — connecting a panel by hand',
    caption: 'Plug & Play in minutes',
  },
  {
    src: asset('/w1.webp'),
    alt: 'Solvio balcony solar panel lifestyle',
    caption: 'Clean energy for renters',
  },
  {
    src: asset('/w2.webp'),
    alt: 'Solvio balcony solar panel outdoor use',
    caption: 'Works anywhere with a plug',
  },
  {
    src: asset('/w3.webp'),
    alt: 'Solvio balcony solar panel in use',
    caption: "Thailand's most popular balcony kit",
  },
  {
    src: asset('/balcony-power-plants.jpg'),
    alt: 'Balcony with Solvio solar panels overlooking the sea',
    caption: 'Power your home from your balcony',
  },
];

const INTERVAL = 4000;

export default function PhotoBanner() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dir, setDir] = useState(1);
  const timerRef = useRef(null);

  const go = (next, direction) => {
    setDir(direction);
    setCurrent((next + SLIDES.length) % SLIDES.length);
  };

  const prev = () => go(current - 1, -1);
  const next = () => go(current + 1, 1);

  // Auto-advance
  useEffect(() => {
    if (paused) return undefined;
    timerRef.current = setInterval(() => go(current + 1, 1), INTERVAL);
    return () => clearInterval(timerRef.current);
  }, [current, paused]);

  // Drag / swipe support
  const dragRef = useRef(null);
  const handleDragEnd = (_, info) => {
    if (info.offset.x < -50) next();
    else if (info.offset.x > 50) prev();
  };

  return (
    <section className="overflow-hidden bg-ink py-0">
      <div
        className="relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Main image */}
        <div className="relative aspect-[21/9] w-full overflow-hidden max-sm:aspect-[4/3]">
          <AnimatePresence initial={false} custom={dir}>
            <motion.div
              key={current}
              custom={dir}
              variants={{
                enter: (d) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0 }),
                center: { x: 0, opacity: 1 },
                exit: (d) => ({ x: d > 0 ? '-100%' : '100%', opacity: 0 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={handleDragEnd}
              className="absolute inset-0 cursor-grab active:cursor-grabbing"
            >
              <img
                src={SLIDES[current].src}
                alt={SLIDES[current].alt}
                className="h-full w-full object-cover"
                draggable={false}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
            </motion.div>
          </AnimatePresence>

          {/* Caption */}
          <div className="absolute bottom-0 left-0 right-0 z-10 px-6 pb-6 sm:px-10 sm:pb-8">
            <AnimatePresence mode="wait">
              <motion.p
                key={current}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3, delay: 0.15 }}
                className="font-display text-xl font-extrabold text-white drop-shadow sm:text-3xl"
              >
                {SLIDES[current].caption}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Prev / Next arrows */}
          <button
            type="button"
            onClick={prev}
            aria-label="Previous photo"
            className="absolute left-3 top-1/2 z-10 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-white/20 text-white backdrop-blur-sm transition hover:bg-white/40 sm:left-5 sm:h-12 sm:w-12"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next photo"
            className="absolute right-3 top-1/2 z-10 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-white/20 text-white backdrop-blur-sm transition hover:bg-white/40 sm:right-5 sm:h-12 sm:w-12"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Dot indicators + thumbnail strip */}
        <div className="flex items-center justify-center gap-2 bg-ink px-4 py-4">
          {SLIDES.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => go(i, i > current ? 1 : -1)}
              aria-label={`Go to slide ${i + 1}`}
              className="group relative overflow-hidden rounded-lg transition-all duration-300"
              style={{ width: i === current ? 72 : 44, height: 44 }}
            >
              <img
                src={slide.src}
                alt=""
                className="h-full w-full object-cover transition-opacity"
                style={{ opacity: i === current ? 1 : 0.45 }}
              />
              {i === current && (
                <span className="absolute inset-0 rounded-lg ring-2 ring-lime ring-offset-1 ring-offset-ink" />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
