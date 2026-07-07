import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { asset } from '../lib/format';

// Full-bleed Dark Feather banner (same artwork as the Solar Panel page, under its
// looping video) with an "Explore now" CTA linking to the Solar Panel page.
export default function ModuleBanner() {
  return (
    <section className="relative w-full">
      <img
        src={asset('/sp-feature-top.webp')}
        alt="Solvio Dark Feather — Ultra Black, Ultra Thin, Ultra Light"
        className="block w-full"
      />
      <Link
        to="/solar-panel"
        className="absolute bottom-[7%] left-[5%] inline-flex items-center gap-2 rounded-full bg-lime px-5 py-2.5 font-display text-sm font-bold text-white shadow-lg transition hover:bg-lime-dark sm:px-6 sm:py-3 sm:text-base"
      >
        Explore now <ArrowRight size={16} />
      </Link>
    </section>
  );
}
