import { Check } from 'lucide-react';
import Gallery from './Gallery';
import Configurator from './Configurator';
import PriceBox from './PriceBox';
import Stars from './Stars';
import { product } from '../data/product';

export default function ProductHero({ cfg, onAddToCart, added }) {
  // Mobile: the 3D model stays pinned while the shopper scrolls Steps 1–2;
  // Gallery itself releases it smoothly once Step 3 (#cfg-step-3) touches its
  // bottom edge (scroll-tracked sticky top — no snap-away).
  return (
    <section id="product" className="container-x scroll-mt-20 pb-16 pt-2">
      <div className="grid grid-cols-1 gap-8 lg:ml-[calc(50%-50vw+1.5rem)] lg:grid-cols-[1.55fr_1fr] lg:gap-10">
        {/* Left — gallery */}
        <Gallery derived={cfg} />

        {/* Right — details */}
        <div>
          <p className="eyebrow mb-2">Solvio · Balcony solar</p>
          <h1 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-2 max-w-md font-body text-[15px] font-medium text-slatey-500">{product.tagline}</p>

          <div className="mt-3 flex items-center gap-2.5">
            <Stars value={product.rating} />
            <span className="font-display text-sm font-semibold text-ink">{product.rating}</span>
            <a href="#reviews" className="font-body text-sm font-medium text-slatey-500 underline-offset-2 hover:underline">
              {product.reviewCount.toLocaleString()} reviews
            </a>
          </div>

          <ul className="mt-5 grid gap-2">
            {product.highlights.map((h) => (
              <li key={h} className="flex items-center gap-2.5 font-body text-[15px] font-medium text-ink/80">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-lime">
                  <Check size={13} strokeWidth={3} className="text-white" />
                </span>
                {h}
              </li>
            ))}
          </ul>

          <div className="mt-6 space-y-6">
            <Configurator config={cfg.config} set={cfg.set} />
            <PriceBox derived={cfg} onAddToCart={onAddToCart} added={added} />
          </div>
        </div>
      </div>
    </section>
  );
}
