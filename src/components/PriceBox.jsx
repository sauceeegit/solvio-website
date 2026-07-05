import { useState } from 'react';
import { Check, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { baht } from '../lib/format';

const guarantees = [
  { icon: ShieldCheck, text: '2-year product warranty' },
  { icon: Truck, text: 'Free shipping on all orders' },
  { icon: RotateCcw, text: '30-day hassle-free returns' },
];

export default function PriceBox({ product, onAddToCart }) {
  const [added, setAdded] = useState(false);

  function handleAdd() {
    setAdded(true);
    onAddToCart?.();
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="card sticky top-24 p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-extrabold text-ink">{product.name}</h2>
          <p className="mt-0.5 text-sm text-ink/60">{product.tagline}</p>
        </div>
        {product.badge && (
          <span className="shrink-0 rounded-full bg-lime/10 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-lime-dark">
            {product.badge}
          </span>
        )}
      </div>

      <div className="mt-4">
        <p className="font-mono text-xs uppercase tracking-wider text-slatey-400">From</p>
        <p className="mt-0.5 font-display text-3xl font-extrabold text-ink">{baht(product.price)}</p>
      </div>

      {product.specs && (
        <ul className="mt-4 flex flex-col gap-2">
          {product.specs.map((s) => (
            <li key={s} className="flex items-start gap-2 text-sm text-ink/75">
              <Check size={15} className="mt-0.5 shrink-0 text-lime" strokeWidth={3} />
              {s}
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={handleAdd}
        className={`mt-4 flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 font-display text-base font-bold transition active:scale-[0.99] ${
          added ? 'bg-ink text-lime' : 'bg-lime text-white hover:bg-lime-dark'
        }`}
      >
        {added ? (
          <>
            <Check size={20} strokeWidth={3} /> Added to cart
          </>
        ) : (
          'Add to cart'
        )}
      </button>

      <div className="mt-4 flex items-start gap-2 rounded-xl bg-lime/10 p-3.5 text-sm text-ink">
        <ShieldCheck size={16} className="mt-0.5 shrink-0 text-lime-dark" />
        <p>Order today and get free installation support via video call.</p>
      </div>

      <ul className="mt-5 flex flex-col gap-3">
        {guarantees.map(({ icon: Icon, text }) => (
          <li key={text} className="flex items-center gap-2.5 text-sm text-ink/70">
            <Icon size={15} className="shrink-0 text-lime" />
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
}
