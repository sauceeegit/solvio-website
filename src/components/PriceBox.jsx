import { useState } from 'react';
import { ShoppingCart, Check, Zap, Mail } from 'lucide-react';
import { baht, bahtDelta } from '../lib/format';

export default function PriceBox({ derived, onAddToCart, added }) {
  const { total, wp, storage, cable, location, modules, panel, perPanel } = derived;
  const monthly = Math.round(total / 24);

  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const submitQuote = (e) => {
    e.preventDefault();
    // TODO: not wired to a backend yet — capture { email, derived } so a sales
    // agent can follow up and the customer gets their saved configuration.
    setSent(true);
  };

  return (
    <div className="rounded-xl2 border border-ink/[0.07] bg-white p-5 shadow-soft">
      {/* live summary */}
      <div className="mb-4 rounded-xl bg-surface p-3">
        <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-slatey-400">
          Your configuration
        </p>
        <ul className="space-y-1 text-sm text-ink/80">
          <li className="flex justify-between">
            <span>{modules} × {panel.label} · {wp} Wp</span>
            <span className="font-mono">{baht(perPanel * modules)}</span>
          </li>
          <li className="flex justify-between">
            <span>Mounting · {location.label}</span>
            <span className="font-mono">incl.</span>
          </li>
          <li className="flex justify-between">
            <span>{storage.label}</span>
            <span className="font-mono">{bahtDelta(storage.price)}</span>
          </li>
          <li className="flex justify-between">
            <span>{cable.label}</span>
            <span className="font-mono">{bahtDelta(cable.price)}</span>
          </li>
        </ul>
      </div>

      <div className="flex items-end justify-between">
        <div>
          <p className="font-display text-4xl font-extrabold tracking-tight text-ink tabular-nums">
            {baht(total)}
          </p>
          <p className="mt-0.5 text-xs text-slatey-500">
            incl. 0% VAT · or {baht(monthly)}/mo over 24 months
          </p>
        </div>
        <span className="mb-1 inline-flex items-center gap-1.5 rounded-full bg-lime/15 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-lime-dark">
          <Zap size={12} className="fill-lime-dark" /> In stock
        </span>
      </div>

      <button
        onClick={onAddToCart}
        className={`mt-4 flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 font-display text-base font-bold transition active:scale-[0.99] ${
          added ? 'bg-ink text-lime' : 'bg-lime text-ink hover:bg-lime-dark'
        }`}
      >
        {added ? (
          <>
            <Check size={20} strokeWidth={3} /> Added to cart
          </>
        ) : (
          <>
            <ShoppingCart size={20} /> Add to cart
          </>
        )}
      </button>

      {/* email capture — save the configuration + sales follow-up (not wired yet) */}
      {sent ? (
        <div className="mt-4 flex items-start gap-2 rounded-xl bg-lime/10 p-3.5 text-sm text-ink">
          <Check size={16} strokeWidth={3} className="mt-0.5 shrink-0 text-lime-dark" />
          <span>
            Thanks! We&apos;ve saved this configuration and a Solvio sales agent will reach out shortly.
          </span>
        </div>
      ) : (
        <form onSubmit={submitQuote} className="mt-4">
          <label htmlFor="quote-email" className="mb-1.5 block text-xs font-medium text-slatey-500">
            Email me this configuration &amp; talk to a sales agent
          </label>
          <div className="flex gap-2">
            <input
              id="quote-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="min-w-0 flex-1 rounded-full border border-ink/15 bg-white px-4 py-3 text-sm text-ink placeholder:text-slatey-400 focus:border-lime-dark focus:outline-none focus:ring-1 focus:ring-lime/40"
            />
            <button
              type="submit"
              className="flex shrink-0 items-center gap-1.5 rounded-full bg-ink px-4 py-3 font-display text-sm font-bold text-white transition hover:bg-ink/90 active:scale-[0.99]"
            >
              <Mail size={15} /> Send
            </button>
          </div>
          <p className="mt-1.5 text-[11px] text-slatey-400">
            We&apos;ll save your options and a Solvio agent will follow up — no spam.
          </p>
        </form>
      )}
    </div>
  );
}
