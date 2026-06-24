import { useState, useEffect } from 'react';

// Auto-advancing, infinitely looping crossfade of the header banners.
export default function HeaderCarousel({ slides, interval = 4500 }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const t = setInterval(() => setI((p) => (p + 1) % slides.length), interval);
    return () => clearInterval(t);
  }, [slides.length, interval]);

  return (
    <div className="relative h-[clamp(190px,38vw,620px)] w-full overflow-hidden bg-[#F2A03D]">
      {slides.map((src, idx) => (
        <img
          key={src}
          src={src}
          alt="Solvio portable power stations"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1100ms] ease-in-out ${
            idx === i ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}

      {/* dots */}
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
  );
}
