import { useState, useEffect } from 'react';

// Auto-advancing, infinitely looping crossfade of the header banners.
// Portrait mobile banners on phones (< 640px), wide banners on desktop.
export default function HeaderCarousel({ slides, interval = 4500 }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const t = setInterval(() => setI((p) => (p + 1) % slides.length), interval);
    return () => clearInterval(t);
  }, [slides.length, interval]);

  return (
    <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F2A03D] sm:aspect-auto sm:h-[clamp(190px,38vw,620px)]">
      {slides.map((s, idx) => (
        <picture key={s.desktop}>
          <source media="(min-width: 640px)" srcSet={s.desktop} />
          <img
            src={s.mobile}
            alt="Solvio portable power stations"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1100ms] ease-in-out ${
              idx === i ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </picture>
      ))}

      {/* dots — light on the dark mobile banner, dark on the light desktop banner */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            aria-label={`Show banner ${idx + 1}`}
            className={`h-2 rounded-full transition-all ${
              idx === i
                ? 'w-6 bg-white sm:bg-ink/80'
                : 'w-2 bg-white/50 hover:bg-white/70 sm:bg-ink/30 sm:hover:bg-ink/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
