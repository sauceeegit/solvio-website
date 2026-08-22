import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { asset } from '../lib/format';
import { useLanguage } from '../context/LanguageContext';

const SLIDES = [
  {
    src: asset('/savings-bg.jpg'),
    alt: 'Couple on a balcony with Solvio solar panels on the railing at sunset',
    caption: 'Solar on every balcony',
    sub: 'Save over ฿79k in 10 years — with a 4-panel kit',
    captionTh: 'โซลาร์ทุกระเบียง',
    subTh: 'ประหยัดกว่า ฿79k ใน 10 ปี — ชุด 4 แผง',
  },
  {
    src: asset('/plugplay-photo.jpg'),
    alt: 'Easy plug & play installation — connecting a panel by hand',
    caption: 'Plug & Play in minutes',
    sub: 'No electrician needed',
    captionTh: 'ปลั๊กแอนด์เพลย์ ใน​ไม่กี่นาที',
    subTh: 'ไม่ต้องใช้ช่างไฟฟ้า',
  },
  {
    src: asset('/balcony-power-plants.webp'),
    alt: 'Balcony with Solvio solar panels overlooking the sea',
    caption: 'Power your home from your balcony',
    sub: 'Works in any apartment or condo',
    captionTh: 'ผลิตไฟจากระเบียงบ้านคุณ',
    subTh: 'ใช้ได้กับทุกอพาร์ทเมนท์และคอนโด',
  },
  {
    src: asset('/sp-balcony.webp'),
    alt: 'Solvio balcony solar installation',
    caption: 'Balcony Solar',
    sub: 'Plug & play · no drilling · moves with you',
    captionTh: 'โซลาร์ระเบียง',
    subTh: 'ปลั๊กแอนด์เพลย์ · ไม่ต้องเจาะ · พกพาได้',
  },
  {
    src: asset('/sp-facade.webp'),
    alt: 'Solvio facade solar installation',
    caption: 'Facade Solar',
    sub: 'Sleek all-black panels integrated into your facade',
    captionTh: 'โซลาร์ผนังอาคาร',
    subTh: 'แผงสีดำล้วนดีไซน์เรียบ ติดตั้งบนผนังอาคาร',
  },
];

const INTERVAL = 4000;

export default function PhotoBanner() {
  const { lang } = useLanguage();
  const th = lang === 'th';
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
    <section className="overflow-hidden py-0" style={{ backgroundColor: '#140e0b' }}>
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
              <img loading="lazy"
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
          <div className="absolute bottom-0 left-0 right-0 z-10 px-6 pb-7 sm:px-10 sm:pb-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, delay: 0.15 }}
              >
                <p className="font-display text-2xl font-extrabold text-white drop-shadow-md sm:text-4xl">
                  {th ? SLIDES[current].captionTh : SLIDES[current].caption}
                </p>
                {SLIDES[current].sub && (
                  <p className="mt-1.5 font-display text-sm font-semibold text-white/70 sm:text-base">
                    {th ? SLIDES[current].subTh : SLIDES[current].sub}
                  </p>
                )}
              </motion.div>
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

        {/* Thumbnail strip */}
        <div className="flex items-center justify-center gap-3 px-4 py-4" style={{ backgroundColor: '#140e0b' }}>
          {SLIDES.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => go(i, i > current ? 1 : -1)}
              aria-label={`Go to slide ${i + 1}`}
              className="relative shrink-0 overflow-hidden rounded-xl transition-all duration-300"
              style={{ width: i === current ? 88 : 56, height: 56 }}
            >
              <img loading="lazy"
                src={slide.src}
                alt=""
                className="h-full w-full object-cover transition-all duration-300"
                style={{ opacity: i === current ? 1 : 0.5, filter: i === current ? 'none' : 'saturate(0.6)' }}
              />
              {i === current && (
                <span className="absolute inset-0 rounded-xl ring-2 ring-lime ring-offset-1 ring-offset-[#140e0b]" />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
