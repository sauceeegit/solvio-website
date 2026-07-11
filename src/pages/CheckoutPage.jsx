import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ChevronRight, ShoppingBag, Sun, Home, ArrowLeft, Shield, Truck, Zap, MessageCircle } from 'lucide-react';
import Header from '../components/landing/Header';
import Footer from '../components/Footer';
import { usePageMeta } from '../hooks/usePageMeta';
import { baht } from '../lib/format';

// ── Demo order state (replace with real cart context later) ──────────────────
const DEMO_ITEMS = [
  {
    id: 'balcony-kit',
    type: 'product',
    name: 'Balcony Solar Kit',
    variant: '4 × Dark Feather + Venus A 2.12 kWh',
    qty: 1,
    price: 52160,
    img: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'cable-15m',
    type: 'addon',
    name: '15 m AC cable',
    variant: null,
    qty: 1,
    price: 790,
    img: null,
  },
];

const SHIPPING = 0; // free
const VAT_RATE = 0.07;

const STEPS = ['Cart', 'Details', 'Review'];

const DIAL_CODES = [
  { code: '+66', flag: '🇹🇭' },
  { code: '+1',  flag: '🇺🇸' },
  { code: '+44', flag: '🇬🇧' },
  { code: '+61', flag: '🇦🇺' },
  { code: '+49', flag: '🇩🇪' },
  { code: '+33', flag: '🇫🇷' },
  { code: '+31', flag: '🇳🇱' },
  { code: '+65', flag: '🇸🇬' },
  { code: '+60', flag: '🇲🇾' },
  { code: '+81', flag: '🇯🇵' },
];

// ── Sub-components ────────────────────────────────────────────────────────────

function StepBar({ step }) {
  return (
    <ol className="flex items-center justify-center gap-0">
      {STEPS.map((label, i) => {
        const done = i < step;
        const active = i === step;
        return (
          <li key={label} className="flex items-center">
            <span className={`flex items-center gap-2 text-sm font-semibold transition-colors ${active ? 'text-lime-dark' : done ? 'text-lime' : 'text-ink/30'}`}>
              <span className={`grid h-7 w-7 place-items-center rounded-full text-xs font-bold transition-colors ${active ? 'bg-lime-dark text-white' : done ? 'bg-lime text-white' : 'bg-ink/10 text-ink/40'}`}>
                {done ? <Check size={13} strokeWidth={3} /> : i + 1}
              </span>
              <span className="hidden sm:inline">{label}</span>
            </span>
            {i < STEPS.length - 1 && (
              <ChevronRight size={16} className="mx-2 shrink-0 text-ink/20" />
            )}
          </li>
        );
      })}
    </ol>
  );
}

function TrustBadges() {
  return (
    <div className="mt-6 grid grid-cols-3 gap-3 rounded-xl border border-ink/[0.07] bg-surface p-4">
      {[
        { icon: Shield, label: '2-year warranty' },
        { icon: Truck, label: 'Free delivery' },
        { icon: Zap, label: 'Fast installation' },
      ].map(({ icon: Icon, label }) => (
        <div key={label} className="flex flex-col items-center gap-1.5 text-center">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-lime/10 text-lime-dark">
            <Icon size={15} />
          </span>
          <span className="text-[11px] font-semibold text-ink/60">{label}</span>
        </div>
      ))}
    </div>
  );
}

function OrderSummary({ items, editable, onQtyChange }) {
  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
  const vat = Math.round(subtotal * VAT_RATE);
  const total = subtotal + SHIPPING + vat;

  return (
    <div className="rounded-xl2 border border-ink/[0.07] bg-white p-5 shadow-soft">
      <h2 className="font-display text-base font-bold text-ink">Order summary</h2>

      <ul className="mt-4 space-y-4">
        {items.map((item) => (
          <li key={item.id} className="flex gap-3">
            {item.img ? (
              <img src={item.img} alt={item.name} className="h-16 w-16 shrink-0 rounded-lg object-cover" />
            ) : (
              <span className="grid h-16 w-16 shrink-0 place-items-center rounded-lg bg-surface">
                <Zap size={20} className="text-ink/30" />
              </span>
            )}
            <div className="flex flex-1 flex-col justify-between">
              <div>
                <p className="font-display text-sm font-semibold text-ink">{item.name}</p>
                {item.variant && <p className="mt-0.5 text-xs text-slatey-400">{item.variant}</p>}
              </div>
              <div className="flex items-center justify-between">
                {editable ? (
                  <div className="flex items-center gap-2 rounded-lg border border-ink/12 px-1">
                    <button
                      type="button"
                      onClick={() => onQtyChange(item.id, item.qty - 1)}
                      className="px-2 py-1 text-sm font-bold text-ink/50 transition hover:text-ink disabled:opacity-30"
                      disabled={item.qty <= 1}
                    >
                      −
                    </button>
                    <span className="min-w-[1.5rem] text-center font-display text-sm font-semibold text-ink">
                      {item.qty}
                    </span>
                    <button
                      type="button"
                      onClick={() => onQtyChange(item.id, item.qty + 1)}
                      className="px-2 py-1 text-sm font-bold text-ink/50 transition hover:text-ink"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <span className="text-xs text-slatey-400">Qty {item.qty}</span>
                )}
                <span className="font-display text-sm font-bold text-ink">{baht(item.price * item.qty)}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-5 space-y-2 border-t border-ink/[0.07] pt-4 text-sm">
        <div className="flex justify-between text-ink/60">
          <span>Subtotal</span><span>{baht(subtotal)}</span>
        </div>
        <div className="flex justify-between text-ink/60">
          <span>Shipping</span>
          <span className="font-semibold text-lime-dark">Free</span>
        </div>
        <div className="flex justify-between text-ink/60">
          <span>VAT (7%)</span><span>{baht(vat)}</span>
        </div>
        <div className="flex justify-between border-t border-ink/[0.07] pt-3 font-display text-base font-bold text-ink">
          <span>Total</span><span>{baht(total)}</span>
        </div>
      </div>

      <TrustBadges />
    </div>
  );
}

// ── Step 0 — Cart ─────────────────────────────────────────────────────────────
function StepCart({ items, onQtyChange, onNext }) {
  return (
    <div className="space-y-6">
      <div className="rounded-xl2 border border-ink/[0.07] bg-white p-5 shadow-soft">
        <h2 className="font-display text-base font-bold text-ink">Your cart</h2>

        {/* Product type toggle */}
        <div className="mt-4 grid grid-cols-2 gap-2 rounded-xl bg-surface p-1">
          {[
            { icon: ShoppingBag, label: 'Balcony / Shop', active: true },
            { icon: Home, label: 'Rooftop quote', active: false },
          ].map(({ icon: Icon, label, active }) => (
            <button
              key={label}
              type="button"
              className={`flex items-center justify-center gap-2 rounded-lg py-2.5 font-display text-sm font-semibold transition ${active ? 'bg-white text-ink shadow-sm' : 'text-ink/40 hover:text-ink/60'}`}
            >
              <Icon size={15} /> {label}
            </button>
          ))}
        </div>

        <ul className="mt-5 space-y-4">
          {items.map((item) => (
            <li key={item.id} className="flex gap-3">
              {item.img ? (
                <img src={item.img} alt={item.name} className="h-20 w-20 shrink-0 rounded-xl object-cover" />
              ) : (
                <span className="grid h-20 w-20 shrink-0 place-items-center rounded-xl bg-surface">
                  <Zap size={22} className="text-ink/30" />
                </span>
              )}
              <div className="flex flex-1 flex-col justify-between py-0.5">
                <div>
                  <p className="font-display text-sm font-bold text-ink">{item.name}</p>
                  {item.variant && <p className="mt-0.5 text-xs text-slatey-400">{item.variant}</p>}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 rounded-lg border border-ink/12 px-1">
                    <button
                      type="button"
                      onClick={() => onQtyChange(item.id, item.qty - 1)}
                      disabled={item.qty <= 1}
                      className="px-2 py-1.5 text-sm font-bold text-ink/40 transition hover:text-ink disabled:opacity-30"
                    >−</button>
                    <span className="min-w-[1.75rem] text-center font-display text-sm font-semibold">{item.qty}</span>
                    <button
                      type="button"
                      onClick={() => onQtyChange(item.id, item.qty + 1)}
                      className="px-2 py-1.5 text-sm font-bold text-ink/40 transition hover:text-ink"
                    >+</button>
                  </div>
                  <span className="font-display text-sm font-bold text-ink">{baht(item.price * item.qty)}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Rooftop upsell nudge */}
        <div className="mt-5 flex items-center gap-3 rounded-xl bg-[#EEF5FC] px-4 py-3">
          <Sun size={18} className="shrink-0 text-lime-dark" />
          <p className="text-xs text-ink/70">
            <span className="font-semibold text-ink">Own your roof?</span>{' '}
            <Link to="/rooftop-system" className="font-semibold text-lime-dark underline-offset-2 hover:underline">
              Get a free rooftop quote →
            </Link>
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onNext}
        className="w-full rounded-full bg-lime py-4 font-display text-base font-bold text-white shadow-sm transition hover:bg-lime-dark"
      >
        Continue to details →
      </button>

      <p className="text-center text-xs text-slatey-400">
        Questions?{' '}
        <a href="https://wa.me/66843488428" target="_blank" rel="noreferrer" className="font-semibold text-lime-dark hover:underline">
          Chat with us on WhatsApp
        </a>
      </p>
    </div>
  );
}

// ── Step 1 — Details ──────────────────────────────────────────────────────────
function StepDetails({ onNext, onBack }) {
  const [dialCode, setDialCode] = useState('+66');
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', district: '', province: 'Phuket', postcode: '',
    note: '', imApp: 'LINE', imId: '',
  });

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const fieldCls = 'w-full rounded-xl border border-ink/12 bg-white px-4 py-3 font-body text-sm text-ink placeholder:text-slatey-400 focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime/40';
  const labelCls = 'mb-1.5 block font-display text-xs font-semibold uppercase tracking-wide text-ink/50';

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Contact */}
      <div className="rounded-xl2 border border-ink/[0.07] bg-white p-5 shadow-soft">
        <h2 className="font-display text-base font-bold text-ink">Contact info</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelCls}>First name</label>
            <input required value={form.firstName} onChange={set('firstName')} placeholder="Gunter" className={fieldCls} />
          </div>
          <div>
            <label className={labelCls}>Last name</label>
            <input required value={form.lastName} onChange={set('lastName')} placeholder="Smith" className={fieldCls} />
          </div>
          <div>
            <label className={labelCls}>Email</label>
            <input required type="email" value={form.email} onChange={set('email')} placeholder="you@email.com" className={fieldCls} />
          </div>
          <div>
            <label className={labelCls}>Phone</label>
            <div className="flex gap-2">
              <select
                value={dialCode}
                onChange={(e) => setDialCode(e.target.value)}
                aria-label="Country code"
                className="w-20 shrink-0 rounded-xl border border-ink/12 bg-white px-2 py-3 font-body text-sm text-ink focus:border-lime focus:outline-none"
              >
                {DIAL_CODES.map((c) => (
                  <option key={c.code} value={c.code}>{c.flag} {c.code}</option>
                ))}
              </select>
              <input value={form.phone} onChange={set('phone')} placeholder="84 348 8428" className={fieldCls} />
            </div>
          </div>
        </div>

        {/* Messaging */}
        <div className="mt-4">
          <label className={labelCls}>LINE / Telegram ID <span className="font-normal normal-case text-slatey-400">(optional)</span></label>
          <div className="flex gap-2">
            <select value={form.imApp} onChange={set('imApp')} className="w-24 shrink-0 rounded-xl border border-ink/12 bg-white px-2 py-3 font-body text-sm text-ink focus:border-lime focus:outline-none">
              <option value="LINE">LINE</option>
              <option value="Telegram">Telegram</option>
            </select>
            <input value={form.imId} onChange={set('imId')} placeholder="Your ID" className={fieldCls} />
          </div>
        </div>
      </div>

      {/* Delivery */}
      <div className="rounded-xl2 border border-ink/[0.07] bg-white p-5 shadow-soft">
        <h2 className="font-display text-base font-bold text-ink">Delivery address</h2>
        <div className="mt-4 space-y-4">
          <div>
            <label className={labelCls}>Street address</label>
            <input required value={form.address} onChange={set('address')} placeholder="123 Moo 5, Soi Banzaan" className={fieldCls} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelCls}>District / Subdistrict</label>
              <input required value={form.district} onChange={set('district')} placeholder="Pa Tong" className={fieldCls} />
            </div>
            <div>
              <label className={labelCls}>Province</label>
              <input required value={form.province} onChange={set('province')} placeholder="Phuket" className={fieldCls} />
            </div>
            <div>
              <label className={labelCls}>Postcode</label>
              <input required value={form.postcode} onChange={set('postcode')} placeholder="83150" className={`${fieldCls} sm:max-w-[160px]`} />
            </div>
          </div>
          <div>
            <label className={labelCls}>Delivery note <span className="font-normal normal-case text-slatey-400">(optional)</span></label>
            <textarea
              value={form.note}
              onChange={set('note')}
              rows={2}
              placeholder="Gate code, building access, preferred delivery time…"
              className={`${fieldCls} resize-none`}
            />
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button type="button" onClick={onBack} className="flex items-center gap-1.5 rounded-full border border-ink/15 px-5 py-3.5 font-display text-sm font-semibold text-ink/60 transition hover:border-ink/30 hover:text-ink">
          <ArrowLeft size={15} /> Back
        </button>
        <button type="submit" className="flex-1 rounded-full bg-lime py-3.5 font-display text-base font-bold text-white shadow-sm transition hover:bg-lime-dark">
          Review order →
        </button>
      </div>
    </form>
  );
}

// ── Step 2 — Review & place ───────────────────────────────────────────────────
function StepReview({ items, onBack, onPlace }) {
  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
  const vat = Math.round(subtotal * VAT_RATE);
  const total = subtotal + vat;

  return (
    <div className="space-y-5">
      <div className="rounded-xl2 border border-ink/[0.07] bg-white p-5 shadow-soft">
        <h2 className="font-display text-base font-bold text-ink">Review your order</h2>

        <ul className="mt-4 divide-y divide-ink/[0.06]">
          {items.map((item) => (
            <li key={item.id} className="flex items-center gap-3 py-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-surface">
                {item.img
                  ? <img src={item.img} alt="" className="h-full w-full rounded-lg object-cover" />
                  : <Zap size={16} className="text-ink/30" />}
              </span>
              <div className="flex-1">
                <p className="font-display text-sm font-semibold text-ink">{item.name}</p>
                {item.variant && <p className="text-xs text-slatey-400">{item.variant}</p>}
              </div>
              <span className="font-display text-sm font-bold text-ink">{baht(item.price * item.qty)}</span>
            </li>
          ))}
        </ul>

        <div className="mt-4 space-y-1.5 border-t border-ink/[0.07] pt-4 text-sm">
          <div className="flex justify-between text-ink/60"><span>Subtotal</span><span>{baht(subtotal)}</span></div>
          <div className="flex justify-between text-ink/60"><span>Shipping</span><span className="font-semibold text-lime-dark">Free</span></div>
          <div className="flex justify-between text-ink/60"><span>VAT (7%)</span><span>{baht(vat)}</span></div>
          <div className="flex justify-between border-t border-ink/[0.07] pt-3 font-display text-base font-bold text-ink">
            <span>Total due</span><span className="text-lime-dark">{baht(total)}</span>
          </div>
        </div>
      </div>

      {/* Delivery summary */}
      <div className="rounded-xl2 border border-ink/[0.07] bg-white p-5 shadow-soft">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-sm font-bold text-ink">Delivering to</h2>
          <button type="button" onClick={onBack} className="font-display text-xs font-semibold text-lime-dark hover:underline">Edit</button>
        </div>
        <p className="mt-2 text-sm text-slatey-500">123 Moo 5, Soi Banzaan · Pa Tong · Phuket 83150</p>
      </div>

      {/* Payment method placeholder */}
      <div className="rounded-xl2 border border-ink/[0.07] bg-white p-5 shadow-soft">
        <h2 className="font-display text-sm font-bold text-ink">Payment</h2>
        <div className="mt-3 space-y-2">
          {['Pay by bank transfer', 'Cash on delivery', 'Installment (0% interest)'].map((opt, i) => (
            <label key={opt} className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3.5 transition ${i === 0 ? 'border-lime bg-lime/5' : 'border-ink/10 hover:border-ink/20'}`}>
              <span className={`grid h-4 w-4 shrink-0 place-items-center rounded-full border-2 ${i === 0 ? 'border-lime' : 'border-ink/20'}`}>
                {i === 0 && <span className="h-2 w-2 rounded-full bg-lime" />}
              </span>
              <span className="font-display text-sm font-semibold text-ink">{opt}</span>
              {i === 0 && <span className="ml-auto rounded-full bg-lime/10 px-2 py-0.5 font-display text-[10px] font-bold text-lime-dark">Recommended</span>}
            </label>
          ))}
          <p className="pt-1 text-[11px] text-slatey-400">Card & PromptPay coming soon. Our team will confirm payment details after you place the order.</p>
        </div>
      </div>

      <div className="flex gap-3">
        <button type="button" onClick={onBack} className="flex items-center gap-1.5 rounded-full border border-ink/15 px-5 py-3.5 font-display text-sm font-semibold text-ink/60 transition hover:border-ink/30 hover:text-ink">
          <ArrowLeft size={15} /> Back
        </button>
        <button type="button" onClick={onPlace} className="flex-1 rounded-full bg-lime py-3.5 font-display text-base font-bold text-white shadow-sm transition hover:bg-lime-dark">
          Place order →
        </button>
      </div>

      <p className="flex items-center justify-center gap-1.5 text-center text-xs text-slatey-400">
        <Shield size={12} /> Your details are safe and never shared.
      </p>
    </div>
  );
}

// ── Confirmation ──────────────────────────────────────────────────────────────
function Confirmation() {
  return (
    <div className="mx-auto max-w-md py-10 text-center">
      <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-lime/10">
        <Check size={30} strokeWidth={2.5} className="text-lime-dark" />
      </span>
      <h1 className="mt-5 font-display text-2xl font-extrabold tracking-tight text-ink">
        Order received!
      </h1>
      <p className="mt-3 text-slatey-500">
        Thank you — our team will confirm your order and payment details within 1 hour.
      </p>

      <div className="mt-8 rounded-xl2 border border-ink/[0.07] bg-white p-5 text-left shadow-soft">
        <p className="font-display text-sm font-bold text-ink">What happens next</p>
        <ul className="mt-3 space-y-3">
          {[
            'We confirm your order by email & WhatsApp',
            'You receive payment instructions',
            'Free delivery within 3–5 business days',
            'Installation booked at your convenience',
          ].map((step) => (
            <li key={step} className="flex items-start gap-2.5 text-sm text-ink/70">
              <Check size={14} strokeWidth={3} className="mt-0.5 shrink-0 text-lime-dark" />
              {step}
            </li>
          ))}
        </ul>
      </div>

      <a
        href="https://wa.me/66843488428"
        target="_blank"
        rel="noreferrer"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-lime px-6 py-3.5 font-display text-sm font-bold text-white transition hover:bg-lime-dark"
      >
        <MessageCircle size={16} /> Chat with our team
      </a>

      <Link to="/" className="mt-4 block font-display text-sm font-semibold text-lime-dark hover:underline">
        ← Back to home
      </Link>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function CheckoutPage() {
  usePageMeta('/');
  const [step, setStep] = useState(0);
  const [placed, setPlaced] = useState(false);
  const [items, setItems] = useState(DEMO_ITEMS);

  const handleQtyChange = (id, qty) => {
    if (qty < 1) return;
    setItems((prev) => prev.map((it) => it.id === id ? { ...it, qty } : it));
  };

  if (placed) {
    return (
      <div className="min-h-screen bg-surface">
        <Header />
        <main className="container-x py-16">
          <Confirmation />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      <Header />
      <main className="container-x py-10">
        {/* Step bar */}
        <div className="mx-auto mb-8 max-w-xs">
          <StepBar step={step} />
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_380px] lg:items-start xl:gap-12">
          {/* Left — active step */}
          <div>
            {step === 0 && (
              <StepCart items={items} onQtyChange={handleQtyChange} onNext={() => setStep(1)} />
            )}
            {step === 1 && (
              <StepDetails onNext={() => setStep(2)} onBack={() => setStep(0)} />
            )}
            {step === 2 && (
              <StepReview items={items} onBack={() => setStep(1)} onPlace={() => setPlaced(true)} />
            )}
          </div>

          {/* Right — sticky summary (hidden on cart step where it's inline) */}
          {step > 0 && (
            <div className="lg:sticky lg:top-24">
              <OrderSummary items={items} editable={false} />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
