import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ProductGallery({ media }) {
  const images = media.filter((m) => m.src);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  const goTo = (idx) => setActive((idx + images.length) % images.length);

  // Auto-advance every 3.5 s, pause on hover
  useEffect(() => {
    if (paused || images.length <= 1) return;
    timerRef.current = setInterval(() => setActive((p) => (p + 1) % images.length), 3500);
    return () => clearInterval(timerRef.current);
  }, [paused, images.length]);

  if (images.length === 0) return null;

  return (
    <div
      className="select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Main image */}
      <div className="relative overflow-hidden rounded-2xl bg-white shadow-soft aspect-[4/3]">
        {images.map((img, idx) => (
          <img
            key={img.id}
            src={img.src}
            alt={img.alt}
            loading={idx === 0 ? 'eager' : 'lazy'}
            className={`absolute inset-0 h-full w-full transition-opacity duration-700 ease-in-out ${img.imgClass ?? 'object-contain'} ${
              idx === active ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}

        {/* Prev / Next arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => goTo(active - 1)}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full bg-white/80 text-ink shadow-md backdrop-blur-sm transition hover:bg-white hover:scale-105 active:scale-95"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => goTo(active + 1)}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full bg-white/80 text-ink shadow-md backdrop-blur-sm transition hover:bg-white hover:scale-105 active:scale-95"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}

        {/* Dot indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx)}
                aria-label={`View image ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === active ? 'w-5 bg-lime' : 'w-1.5 bg-ink/25 hover:bg-ink/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {images.map((img, idx) => (
            <button
              key={img.id}
              onClick={() => goTo(idx)}
              aria-label={`View image ${idx + 1}`}
              className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-200 ${
                idx === active
                  ? 'border-lime shadow-md scale-105'
                  : 'border-transparent opacity-60 hover:opacity-100 hover:border-ink/20'
              }`}
            >
              <img loading="lazy" src={img.src} alt={img.alt} className="h-full w-full object-contain bg-white" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
