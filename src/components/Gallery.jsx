import { product } from '../data/product';

// Single large hero image that bleeds into the left page margin on desktop.
export default function Gallery() {
  const img = product.images[0];

  return (
    <div className="lg:sticky lg:top-24 lg:self-start">
      <div className="relative overflow-hidden rounded-xl2 border border-ink/[0.07] bg-white shadow-soft">
        <img
          src={img.src}
          alt={img.alt}
          className="aspect-[10/9] w-full object-cover"
        />
        <span className="absolute left-4 top-4 rounded-full bg-ink/85 px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-wider text-lime backdrop-blur">
          1800 Wp · Plug &amp; Play
        </span>
      </div>
    </div>
  );
}
