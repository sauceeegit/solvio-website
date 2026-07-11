import { useState } from 'react';
import { Check, ShieldCheck, RotateCcw, Bookmark } from 'lucide-react';
import { baht } from '../lib/format';
import { product } from '../data/product';
import SaveConfigModal from './SaveConfigModal';

const guarantees = [
  { icon: ShieldCheck, text: '10-year product warranty' },
  { icon: RotateCcw, text: '30-day hassle-free returns' },
];

export default function PriceBox({ derived, onAddToCart, added: addedProp }) {
  const [added, setAdded] = useState(false);
  const [saveOpen, setSaveOpen] = useState(false);
  const isAdded = addedProp ?? added;

  function handleAdd() {
    setAdded(true);
    onAddToCart?.();
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="rounded-xl2 border border-ink/[0.07] bg-white p-6 shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-extrabold text-ink">{product.name}</h2>
          <p className="mt-0.5 text-sm text-ink/60">{product.tagline}</p>
        </div>
      </div>

      <div className="mt-4">
        <p className="font-mono text-xs uppercase tracking-wider text-slatey-400">Total</p>
        <p className="mt-0.5 font-display text-3xl font-extrabold text-ink">{baht(derived?.total ?? 0)}</p>
      </div>

      <button
        onClick={handleAdd}
        className={`mt-4 flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 font-display text-base font-bold transition active:scale-[0.99] ${
          isAdded ? 'bg-ink text-lime' : 'bg-lime text-white hover:bg-lime-dark'
        }`}
      >
        {isAdded ? (
          <><Check size={20} strokeWidth={3} /> Added to cart</>
        ) : (
          'Add to cart'
        )}
      </button>

      <button
        onClick={() => setSaveOpen(true)}
        className="mt-2.5 flex w-full items-center justify-center gap-2 rounded-full border border-ink/15 px-6 py-3.5 font-display text-base font-bold text-ink transition hover:border-ink/30 hover:bg-ink/[0.03] active:scale-[0.99]"
      >
        <Bookmark size={18} /> Save Configuration
      </button>

      <SaveConfigModal open={saveOpen} onClose={() => setSaveOpen(false)} derived={derived} />

      <div className="mt-4 flex items-start gap-2 rounded-xl bg-lime/10 p-3.5 text-sm text-ink">
        <ShieldCheck size={16} className="mt-0.5 shrink-0 text-lime-dark" />
        <p className="max-sm:text-[13px] max-sm:leading-snug">Order today and get free installation support via video call.</p>
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
