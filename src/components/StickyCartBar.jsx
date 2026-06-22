import { useEffect, useState } from 'react';
import { ShoppingCart, Check } from 'lucide-react';
import { baht } from '../lib/format';

// Mobile-only sticky bar that mirrors the live configured price.
export default function StickyCartBar({ derived, onAddToCart, added }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-white/95 backdrop-blur-md transition-transform duration-300 lg:hidden ${
        show ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="container-x flex items-center justify-between gap-3 py-3">
        <div className="min-w-0">
          <p className="truncate font-display text-sm font-bold text-ink">Balcony System</p>
          <p className="text-xs text-slatey-500">
            {derived.wp} Wp · {derived.storage.label}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-display text-lg font-extrabold text-ink tabular-nums">
            {baht(derived.total)}
          </span>
          <button
            onClick={onAddToCart}
            className={`flex items-center gap-1.5 rounded-full px-4 py-3 font-display text-sm font-bold transition ${
              added ? 'bg-ink text-lime' : 'bg-lime text-ink'
            }`}
          >
            {added ? <Check size={17} strokeWidth={3} /> : <ShoppingCart size={17} />}
            {added ? 'Added' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
}
