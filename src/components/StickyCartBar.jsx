import { ShoppingCart, Check } from 'lucide-react';
import { product } from '../data/product';
import { baht } from '../lib/format';
import { useLanguage } from '../context/LanguageContext';

export default function StickyCartBar({ derived, onAddToCart, added }) {
  const { lang } = useLanguage();
  const th = lang === 'th';
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-ink/10 bg-white/95 px-4 py-3 backdrop-blur-md lg:hidden">
      <div className="mx-auto flex max-w-lg items-center justify-between gap-3">
        <div>
          <p className="font-display text-sm font-extrabold text-ink">{product.name}</p>
          <p className="font-display text-base font-extrabold text-price">{baht(derived?.total ?? 0)}</p>
        </div>
        <button
          onClick={onAddToCart}
          className={`flex items-center gap-1.5 rounded-full px-4 py-3 font-display text-sm font-bold transition ${
            added ? 'bg-ink text-lime' : 'bg-lime text-white'
          }`}
        >
          {added ? (
            <><Check size={16} strokeWidth={3} /> {th ? 'เพิ่มแล้ว' : 'Added'}</>
          ) : (
            <><ShoppingCart size={16} /> {th ? 'เพิ่มในตะกร้า' : 'Add to cart'}</>
          )}
        </button>
      </div>
    </div>
  );
}
