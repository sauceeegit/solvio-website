import { payments } from '../data/product';

export default function PaymentRow() {
  return (
    <div className="container-x flex flex-wrap items-center justify-center gap-x-3 gap-y-2 py-7">
      <span className="font-mono text-[11px] uppercase tracking-wider text-slatey-400">
        Secure checkout
      </span>
      {payments.map((p) => (
        <span
          key={p}
          className="rounded-lg border border-ink/10 bg-white px-3 py-1.5 font-display text-xs font-bold text-ink/70 shadow-sm"
        >
          {p}
        </span>
      ))}
    </div>
  );
}
