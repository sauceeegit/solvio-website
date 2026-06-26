import { useState, useEffect, useRef } from 'react';

// Header banners for the portable page.
// - Mobile (< 640px): a hand-swipeable, snap-scrolling track of portrait banners.
// - Desktop (≥ 640px): an auto-advancing, infinitely looping crossfade.
export default function HeaderCarousel({ slides, interval = 3375 }) {
  const [i, setI] = useState(0); // desktop crossfade index
  const [active, setActive] = useState(0); // mobile scroll index (for the dots)
  const trackRef = useRef(null);

  // Desktop auto-advance.
  useEffect(() => {
    if (slides.length <= 1) return;
    const t = setInterval(() => setI((p) => (p + 1) % slides.length), interval);
    return () => clearInterval(t);
  }, [slides.length, interval]);

  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    setActive(Math.round(el.scrollLeft / el.clientWidth));
  };

  const scrollToSlide = (idx) => {
    const el = trackRef.current;
    if (el) el.scrollTo({ left: idx * el.clientWidth, behavior: 'smooth' });
  };

  return (
    <>
      {/* MOBILE — swipe by hand */}
      <div className="relative sm:hidden">
        <div
          ref={trackRef}
          onScroll={onScroll}
          className="no-scrollbar flex aspect-[3/4] w-full snap-x snap-mandatory overflow-x-auto bg-[#F2A03D]"
        >
          {slides.map((s) => (
            <img
              key={s.mobile}
              src={s.mobile}
              alt="Solvio portable power stations"
              draggable={false}
              className="h-full w-full shrink-0 snap-center object-cover"
            />
          ))}
        </div>

        <div className="pointer-events-none absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToSlide(idx)}
              aria-label={`Show banner ${idx + 1}`}
              className={`pointer-events-auto h-2 rounded-full transition-all ${
                idx === active ? 'w-6 bg-white' : 'w-2 bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>

      {/* DESKTOP — auto crossfade */}
      <div className="relative hidden overflow-hidden bg-[#F2A03D] sm:block sm:h-[clamp(190px,38vw,620px)]">
        {slides.map((s, idx) => (
          <img
            key={s.desktop}
            src={s.desktop}
            alt="Solvio portable power stations"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1100ms] ease-in-out ${
              idx === i ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}

        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Show banner ${idx + 1}`}
              className={`h-2 rounded-full transition-all ${
                idx === i ? 'w-6 bg-ink/80' : 'w-2 bg-ink/30 hover:bg-ink/50'
              }`}
            />
          ))}
        </div>
      </div>
    </>
  );
}
