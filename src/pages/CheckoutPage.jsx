import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Check, ChevronRight, ShoppingBag, Home, ArrowLeft,
  Shield, Truck, Zap, MessageCircle, Tag, Sun, Lock,
  Phone, Mail, MapPin,
} from 'lucide-react';
import Header from '../components/landing/Header';
import Footer from '../components/Footer';
import { usePageMeta } from '../hooks/usePageMeta';
import { baht, asset } from '../lib/format';

// ─── Demo data (swap with real cart context later) ────────────────────────────
const DEMO_ITEMS = [
  {
    id: 'balcony-kit',
    type: 'product',
    name: 'Balcony Solar Kit',
    variant: '4 × Dark Feather · Venus A 2.12 kWh',
    qty: 1,
    price: 52160,
    img: asset('/4xPanels.png'),
    badge: 'Best seller',
  },
  {
    id: 'cable-15m',
    type: 'addon',
    name: '15 m AC Cable',
    variant: 'Routes to a more distant outlet',
    qty: 1,
    price: 790,
    img: asset('/kit-cable-2m.png'),
  },
];

const VAT_RATE = 0.07;
const STEPS = ['Cart', 'Details', 'Review'];

const DIAL_CODES = [
  { code: '+66', flag: '🇹🇭' }, { code: '+1',  flag: '🇺🇸' },
  { code: '+44', flag: '🇬🇧' }, { code: '+61', flag: '🇦🇺' },
  { code: '+49', flag: '🇩🇪' }, { code: '+33', flag: '🇫🇷' },
  { code: '+65', flag: '🇸🇬' }, { code: '+60', flag: '🇲🇾' },
  { code: '+81', flag: '🇯🇵' },
];

// ─── Shared helpers ───────────────────────────────────────────────────────────
function calcTotals(items) {
  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
  const vat = Math.round(subtotal * VAT_RATE);
  return { subtotal, vat, total: subtotal + vat };
}

// ─── Step progress bar ────────────────────────────────────────────────────────
function StepBar({ step }) {
  return (
    <ol className="flex items-center justify-center">
      {STEPS.map((label, i) => {
        const done = i < step;
        const active = i === step;
        return (
          <li key={label} className="flex items-center">
            <span className={`flex items-center gap-2 text-sm font-semibold transition-colors
              ${active ? 'text-ink' : done ? 'text-lime-dark' : 'text-ink/30'}`}>
              <span className={`grid h-8 w-8 place-items-center rounded-full text-xs font-bold transition-all
                ${active ? 'bg-ink text-white shadow-md' : done ? 'bg-lime text-white' : 'bg-ink/8 text-ink/30'}`}>
                {done ? <Check size={13} strokeWidth={3} /> : i + 1}
              </span>
              <span className="hidden sm:inline">{label}</span>
            </span>
            {i < STEPS.length - 1 && (
              <ChevronRight size={15} className={`mx-3 shrink-0 ${i < step ? 'text-lime' : 'text-ink/15'}`} />
            )}
          </li>
        );
      })}
    </ol>
  );
}

// ─── Order summary sidebar ────────────────────────────────────────────────────
function OrderSummary({ items, editable, onQtyChange }) {
  const [promoInput, setPromoInput] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const { subtotal, vat, total } = calcTotals(items);
  const discount = promoApplied ? Math.round(subtotal * 0.05) : 0;

  return (
    <div className="overflow-hidden rounded-2xl border border-ink/[0.07] bg-white shadow-soft">
      {/* Header */}
      <div className="border-b border-ink/[0.06] bg-[#EEF5FC] px-5 py-4">
        <p className="font-display text-sm font-bold uppercase tracking-wide text-ink/60">Order summary</p>
      </div>

      {/* Items */}
      <ul className="divide-y divide-ink/[0.05] px-5">
        {items.map((item) => (
          <li key={item.id} className="flex gap-3 py-4">
            <div className="relative h-[60px] w-[60px] shrink-0 overflow-hidden rounded-xl border border-ink/[0.07] bg-[#f5f5f3]">
              <img src={item.img} alt={item.name} className="h-full w-full object-contain p-1" />
              <span className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-ink font-display text-[10px] font-bold text-white">
                {item.qty}
              </span>
            </div>
            <div className="flex flex-1 flex-col justify-center gap-0.5">
              <p className="font-display text-sm font-semibold leading-snug text-ink">{item.name}</p>
              {item.variant && <p className="text-[11px] leading-snug text-slatey-400">{item.variant}</p>}
              {editable && (
                <div className="mt-1.5 flex items-center gap-1.5 rounded-lg border border-ink/10 bg-surface px-1.5 py-0.5 self-start">
                  <button type="button" disabled={item.qty <= 1} onClick={() => onQtyChange(item.id, item.qty - 1)}
                    className="px-1.5 py-0.5 font-bold text-ink/40 transition hover:text-ink disabled:opacity-30 text-sm">−</button>
                  <span className="min-w-[1.25rem] text-center font-display text-xs font-bold text-ink">{item.qty}</span>
                  <button type="button" onClick={() => onQtyChange(item.id, item.qty + 1)}
                    className="px-1.5 py-0.5 font-bold text-ink/40 transition hover:text-ink text-sm">+</button>
                </div>
              )}
            </div>
            <span className="font-display text-sm font-bold text-ink">{baht(item.price * item.qty)}</span>
          </li>
        ))}
      </ul>

      {/* Promo code */}
      <div className="border-t border-ink/[0.06] px-5 py-4">
        {promoApplied ? (
          <div className="flex items-center gap-2 rounded-xl bg-lime/10 px-3 py-2.5 text-sm font-semibold text-lime-dark">
            <Tag size={14} /> WELCOME5 applied — 5% off!
          </div>
        ) : (
          <div className="flex gap-2">
            <input
              value={promoInput}
              onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
              placeholder="Promo code"
              className="min-w-0 flex-1 rounded-xl border border-ink/12 bg-surface px-3 py-2.5 font-body text-sm text-ink placeholder:text-slatey-400 focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime/30"
            />
            <button
              type="button"
              onClick={() => promoInput === 'WELCOME5' && setPromoApplied(true)}
              className="rounded-xl border border-ink/12 px-4 py-2.5 font-display text-sm font-semibold text-ink transition hover:border-lime hover:text-lime-dark"
            >
              Apply
            </button>
          </div>
        )}
      </div>

      {/* Totals */}
      <div className="border-t border-ink/[0.06] px-5 py-4 space-y-2">
        <div className="flex justify-between text-sm text-ink/60">
          <span>Subtotal</span><span>{baht(subtotal)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-sm font-semibold text-lime-dark">
            <span>Promo (WELCOME5)</span><span>− {baht(discount)}</span>
          </div>
        )}
        <div className="flex justify-between text-sm text-ink/60">
          <span>Shipping</span>
          <span className="font-semibold text-lime-dark">Free</span>
        </div>
        <div className="flex justify-between text-sm text-ink/60">
          <span>VAT (7%)</span><span>{baht(vat)}</span>
        </div>
        <div className="flex justify-between border-t border-ink/[0.07] pt-3 font-display text-lg font-extrabold text-ink">
          <span>Total</span>
          <span className="text-lime-dark">{baht(total - discount)}</span>
        </div>
      </div>

      {/* Trust row */}
      <div className="border-t border-ink/[0.06] bg-[#EEF5FC] px-5 py-4">
        <div className="grid grid-cols-3 gap-2 text-center">
          {[
            { icon: Shield, label: '2-yr warranty' },
            { icon: Truck,  label: 'Free delivery' },
            { icon: Lock,   label: 'Secure order' },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-1.5">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-lime-dark shadow-sm">
                <Icon size={14} />
              </span>
              <span className="text-[10px] font-bold leading-tight text-ink/60">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Step 0: Cart ─────────────────────────────────────────────────────────────
function StepCart({ items, onQtyChange, onNext }) {
  const [tab, setTab] = useState('shop');

  return (
    <div className="space-y-4">
      {/* Type toggle */}
      <div className="grid grid-cols-2 gap-2 rounded-2xl border border-ink/[0.07] bg-white p-1.5 shadow-soft">
        {[
          { id: 'shop', icon: ShoppingBag, label: 'Balcony & Shop' },
          { id: 'rooftop', icon: Home, label: 'Rooftop quote' },
        ].map(({ id, icon: Icon, label }) => (
          <button key={id} type="button" onClick={() => setTab(id)}
            className={`flex items-center justify-center gap-2 rounded-xl py-3 font-display text-sm font-bold transition-all
              ${tab === id ? 'bg-[#a0896a] text-white shadow-sm' : 'text-ink/40 hover:text-ink/70'}`}>
            <Icon size={15} />{label}
          </button>
        ))}
      </div>

      {/* Item cards — styled like the kit component cards */}
      <ul className="grid gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item.id} className="flex flex-col overflow-hidden rounded-3xl border border-ink/[0.07] bg-white shadow-soft">
            {/* Image area */}
            <div className="relative bg-[#f2f0eb] px-6 pt-8 pb-4">
              {/* Orange qty badge */}
              <span className="absolute left-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-lime font-display text-sm font-extrabold text-white shadow-sm">
                {item.qty}×
              </span>
              {item.badge && (
                <span className="absolute right-4 top-4 rounded-full bg-ink px-2.5 py-1 font-display text-[10px] font-bold uppercase tracking-wide text-white">
                  {item.badge}
                </span>
              )}
              <img src={item.img} alt={item.name} className="mx-auto h-36 w-full object-contain" />
            </div>

            {/* Info + stepper */}
            <div className="flex flex-1 flex-col justify-between p-5">
              <div>
                <p className="font-display text-base font-extrabold leading-snug text-ink">{item.name}</p>
                {item.variant && (
                  <div className="mt-1.5 space-y-0.5">
                    {item.variant.split(' · ').map((line) => (
                      <p key={line} className="text-sm text-ink/50">{line}</p>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-5 flex items-center justify-between">
                {/* Stepper */}
                <div className="flex items-center gap-1 rounded-2xl bg-[#f2f0eb] p-1">
                  <button type="button" disabled={item.qty <= 1} onClick={() => onQtyChange(item.id, item.qty - 1)}
                    className="grid h-8 w-8 place-items-center rounded-xl bg-white font-bold text-ink shadow-sm transition hover:bg-ink hover:text-white disabled:opacity-30">
                    −
                  </button>
                  <span className="min-w-[2rem] text-center font-display text-sm font-bold text-ink">{item.qty}</span>
                  <button type="button" onClick={() => onQtyChange(item.id, item.qty + 1)}
                    className="grid h-8 w-8 place-items-center rounded-xl bg-white font-bold text-ink shadow-sm transition hover:bg-ink hover:text-white">
                    +
                  </button>
                </div>
                <span className="font-display text-xl font-extrabold text-ink">{baht(item.price * item.qty)}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Upsell nudge */}
      <div className="rounded-2xl border border-ink/[0.07] bg-[#EEF5FC] px-5 py-4 shadow-soft">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-lime-dark shadow-sm">
            <Sun size={16} />
          </span>
          <p className="text-sm text-ink/70">
            <span className="font-semibold text-ink">Own your roof?</span>{' '}
            <Link to="/rooftop-system" className="font-semibold text-lime-dark hover:underline">
              Get a free rooftop solar quote →
            </Link>
          </p>
        </div>
      </div>

      {/* CTA */}
      <button type="button" onClick={onNext}
        className="w-full rounded-2xl bg-lime py-4 font-display text-base font-bold text-white shadow-md transition hover:bg-lime-dark active:scale-[0.99]">
        Continue to details →
      </button>

      <p className="flex items-center justify-center gap-2 text-center text-xs text-slatey-400">
        <Lock size={11} /> Secure checkout ·{' '}
        <a href="https://wa.me/66843488428" target="_blank" rel="noreferrer"
          className="font-semibold text-lime-dark hover:underline">
          Need help? Chat on WhatsApp
        </a>
      </p>
    </div>
  );
}

// ─── Step 1: Details ──────────────────────────────────────────────────────────
function StepDetails({ onNext, onBack }) {
  const [dialCode, setDialCode] = useState('+66');
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', district: '', province: 'Phuket', postcode: '',
    note: '', imApp: 'LINE', imId: '',
  });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const fieldCls = 'w-full rounded-xl border border-ink/12 bg-white px-4 py-3 font-body text-sm text-ink placeholder:text-slatey-400 focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime/30 transition';
  const labelCls = 'mb-1.5 block font-display text-[11px] font-bold uppercase tracking-wider text-ink/40';

  return (
    <form onSubmit={(e) => { e.preventDefault(); onNext(); }} className="space-y-4">
      {/* Contact card */}
      <div className="overflow-hidden rounded-2xl border border-ink/[0.07] bg-white shadow-soft">
        <div className="border-b border-ink/[0.06] bg-surface px-5 py-3.5 flex items-center gap-2">
          <Mail size={14} className="text-lime-dark" />
          <p className="font-display text-sm font-bold uppercase tracking-wide text-ink/50">Contact info</p>
        </div>
        <div className="space-y-4 p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div><label className={labelCls}>First name</label>
              <input required value={form.firstName} onChange={set('firstName')} placeholder="Gunter" className={fieldCls} /></div>
            <div><label className={labelCls}>Last name</label>
              <input required value={form.lastName} onChange={set('lastName')} placeholder="Smith" className={fieldCls} /></div>
          </div>
          <div><label className={labelCls}>Email</label>
            <input required type="email" value={form.email} onChange={set('email')} placeholder="you@email.com" className={fieldCls} /></div>
          <div>
            <label className={labelCls}>Phone number</label>
            <div className="flex gap-2">
              <select value={dialCode} onChange={(e) => setDialCode(e.target.value)} aria-label="Country code"
                className="w-[4.5rem] shrink-0 rounded-xl border border-ink/12 bg-white px-2 py-3 font-body text-sm text-ink focus:border-lime focus:outline-none">
                {DIAL_CODES.map((c) => <option key={c.code} value={c.code}>{c.flag} {c.code}</option>)}
              </select>
              <input value={form.phone} onChange={set('phone')} placeholder="84 348 8428" className={fieldCls} />
            </div>
          </div>
          <div>
            <label className={labelCls}>LINE / Telegram <span className="font-normal normal-case text-slatey-400">· optional</span></label>
            <div className="flex gap-2">
              <select value={form.imApp} onChange={set('imApp')} className="w-[5.5rem] shrink-0 rounded-xl border border-ink/12 bg-white px-2 py-3 font-body text-sm focus:border-lime focus:outline-none">
                <option value="LINE">LINE</option>
                <option value="Telegram">Telegram</option>
              </select>
              <input value={form.imId} onChange={set('imId')} placeholder="Your ID" className={fieldCls} />
            </div>
          </div>
        </div>
      </div>

      {/* Delivery card */}
      <div className="overflow-hidden rounded-2xl border border-ink/[0.07] bg-white shadow-soft">
        <div className="border-b border-ink/[0.06] bg-surface px-5 py-3.5 flex items-center gap-2">
          <MapPin size={14} className="text-lime-dark" />
          <p className="font-display text-sm font-bold uppercase tracking-wide text-ink/50">Delivery address</p>
        </div>
        <div className="space-y-4 p-5">
          <div><label className={labelCls}>Street address</label>
            <input required value={form.address} onChange={set('address')} placeholder="123 Moo 5, Soi Banzaan" className={fieldCls} /></div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div><label className={labelCls}>District</label>
              <input required value={form.district} onChange={set('district')} placeholder="Pa Tong" className={fieldCls} /></div>
            <div><label className={labelCls}>Province</label>
              <input required value={form.province} onChange={set('province')} placeholder="Phuket" className={fieldCls} /></div>
          </div>
          <div className="sm:max-w-[180px]"><label className={labelCls}>Postcode</label>
            <input required value={form.postcode} onChange={set('postcode')} placeholder="83150" className={fieldCls} /></div>
          <div><label className={labelCls}>Delivery note <span className="font-normal normal-case text-slatey-400">· optional</span></label>
            <textarea value={form.note} onChange={set('note')} rows={2}
              placeholder="Gate code, building access, preferred time…"
              className={`${fieldCls} resize-none`} /></div>
        </div>
      </div>

      <div className="flex gap-3 pt-1">
        <button type="button" onClick={onBack}
          className="flex items-center gap-2 rounded-2xl border border-ink/12 px-5 py-3.5 font-display text-sm font-semibold text-ink/60 transition hover:border-ink/25 hover:text-ink">
          <ArrowLeft size={15} /> Back
        </button>
        <button type="submit"
          className="flex-1 rounded-2xl bg-lime py-3.5 font-display text-base font-bold text-white shadow-md transition hover:bg-lime-dark">
          Review order →
        </button>
      </div>
    </form>
  );
}

// ─── Step 2: Review ───────────────────────────────────────────────────────────
function StepReview({ items, onBack, onPlace }) {
  const [payMethod, setPayMethod] = useState('transfer');
  const { subtotal, vat, total } = calcTotals(items);

  const payOptions = [
    { id: 'transfer', label: 'Bank transfer', sub: 'We send account details after order', icon: '🏦', recommended: true },
    { id: 'cod',      label: 'Cash on delivery', sub: 'Pay when your kit arrives', icon: '💵', recommended: false },
    { id: 'install',  label: 'Installment · 0% interest', sub: 'Spread payments over 10 months', icon: '📅', recommended: false },
  ];

  return (
    <div className="space-y-4">
      {/* Items recap */}
      <div className="overflow-hidden rounded-2xl border border-ink/[0.07] bg-white shadow-soft">
        <div className="border-b border-ink/[0.06] bg-surface px-5 py-3.5">
          <p className="font-display text-sm font-bold uppercase tracking-wide text-ink/50">Your items</p>
        </div>
        <ul className="divide-y divide-ink/[0.05]">
          {items.map((item) => (
            <li key={item.id} className="flex items-center gap-3 px-5 py-4">
              <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-ink/[0.07] bg-surface">
                <img src={item.img} alt={item.name} className="h-full w-full object-cover" />
              </div>
              <div className="flex-1">
                <p className="font-display text-sm font-semibold text-ink">{item.name}</p>
                {item.variant && <p className="text-[11px] text-slatey-400">{item.variant}</p>}
              </div>
              <span className="font-display text-sm font-bold text-ink">{baht(item.price * item.qty)}</span>
            </li>
          ))}
        </ul>
        <div className="border-t border-ink/[0.06] bg-surface px-5 py-3 flex justify-between font-display text-sm">
          <span className="text-ink/50">Subtotal</span>
          <span className="font-bold text-ink">{baht(subtotal)}</span>
        </div>
      </div>

      {/* Delivery */}
      <div className="overflow-hidden rounded-2xl border border-ink/[0.07] bg-white shadow-soft">
        <div className="flex items-center justify-between border-b border-ink/[0.06] bg-surface px-5 py-3.5">
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-lime-dark" />
            <p className="font-display text-sm font-bold uppercase tracking-wide text-ink/50">Delivering to</p>
          </div>
          <button type="button" onClick={onBack} className="font-display text-xs font-bold text-lime-dark hover:underline">Edit</button>
        </div>
        <div className="px-5 py-4">
          <p className="text-sm text-ink/80">123 Moo 5, Soi Banzaan</p>
          <p className="text-sm text-ink/50">Pa Tong · Phuket 83150</p>
          <p className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-lime/10 px-2.5 py-1 font-display text-[11px] font-bold text-lime-dark">
            <Truck size={11} /> Free delivery · 3–5 business days
          </p>
        </div>
      </div>

      {/* Payment */}
      <div className="overflow-hidden rounded-2xl border border-ink/[0.07] bg-white shadow-soft">
        <div className="border-b border-ink/[0.06] bg-surface px-5 py-3.5 flex items-center gap-2">
          <Lock size={14} className="text-lime-dark" />
          <p className="font-display text-sm font-bold uppercase tracking-wide text-ink/50">Payment method</p>
        </div>
        <div className="space-y-2 p-4">
          {payOptions.map((opt) => (
            <label key={opt.id}
              className={`flex cursor-pointer items-center gap-3.5 rounded-xl border-2 p-4 transition-all
                ${payMethod === opt.id ? 'border-lime bg-lime/5' : 'border-ink/8 hover:border-ink/15'}`}>
              <input type="radio" name="payment" value={opt.id} checked={payMethod === opt.id}
                onChange={() => setPayMethod(opt.id)} className="sr-only" />
              <span className="text-xl">{opt.icon}</span>
              <div className="flex-1">
                <p className="font-display text-sm font-bold text-ink">{opt.label}</p>
                <p className="text-xs text-slatey-400">{opt.sub}</p>
              </div>
              {opt.recommended && (
                <span className="shrink-0 rounded-full bg-lime px-2.5 py-0.5 font-display text-[10px] font-bold text-white">
                  Popular
                </span>
              )}
              <span className={`grid h-4 w-4 shrink-0 place-items-center rounded-full border-2 transition
                ${payMethod === opt.id ? 'border-lime' : 'border-ink/20'}`}>
                {payMethod === opt.id && <span className="h-2 w-2 rounded-full bg-lime" />}
              </span>
            </label>
          ))}
          <p className="pt-1 text-[11px] text-slatey-400 flex items-center gap-1.5">
            <Lock size={10} /> Card & PromptPay coming soon. We'll confirm payment details right after.
          </p>
        </div>
      </div>

      {/* Total */}
      <div className="rounded-2xl border border-lime/20 bg-lime/5 px-5 py-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-display text-sm font-semibold text-ink/60">Total due today</p>
            <p className="font-display text-2xl font-extrabold text-lime-dark">{baht(total)}</p>
          </div>
          <div className="text-right text-xs text-ink/40">
            <p>Includes VAT ({baht(vat)})</p>
            <p>Free shipping</p>
          </div>
        </div>
      </div>

      <div className="flex gap-3 pt-1">
        <button type="button" onClick={onBack}
          className="flex items-center gap-2 rounded-2xl border border-ink/12 px-5 py-3.5 font-display text-sm font-semibold text-ink/60 transition hover:border-ink/25 hover:text-ink">
          <ArrowLeft size={15} /> Back
        </button>
        <button type="button" onClick={onPlace}
          className="flex-1 rounded-2xl bg-lime py-3.5 font-display text-base font-bold text-white shadow-md transition hover:bg-lime-dark active:scale-[0.99]">
          Place order →
        </button>
      </div>

      <p className="flex items-center justify-center gap-1.5 text-center text-xs text-slatey-400">
        <Shield size={11} /> Your details are safe and never shared with third parties.
      </p>
    </div>
  );
}

// ─── Confirmation ─────────────────────────────────────────────────────────────
function Confirmation({ items }) {
  const { total } = calcTotals(items);
  return (
    <div className="mx-auto max-w-lg py-6">
      {/* Success banner */}
      <div className="overflow-hidden rounded-2xl bg-lime text-white">
        <div className="flex flex-col items-center px-6 py-10 text-center">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-white/20">
            <Check size={30} strokeWidth={2.5} />
          </span>
          <h1 className="mt-4 font-display text-2xl font-extrabold">Order received!</h1>
          <p className="mt-2 max-w-sm text-sm text-white/80">
            Order #SOL-2024-0042 · {baht(total)} · Confirmation sent to your email
          </p>
        </div>
        <div className="grid grid-cols-3 divide-x divide-white/20 border-t border-white/20 text-center">
          {[['3–5 days', 'Delivery'], ['Free', 'Shipping'], ['2 years', 'Warranty']].map(([val, lab]) => (
            <div key={lab} className="py-3">
              <p className="font-display text-sm font-extrabold">{val}</p>
              <p className="text-[10px] text-white/60">{lab}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Next steps */}
      <div className="mt-4 overflow-hidden rounded-2xl border border-ink/[0.07] bg-white shadow-soft">
        <div className="border-b border-ink/[0.06] bg-surface px-5 py-3.5">
          <p className="font-display text-sm font-bold uppercase tracking-wide text-ink/50">What happens next</p>
        </div>
        <ul className="divide-y divide-ink/[0.05]">
          {[
            { icon: Mail,         text: 'Order confirmation sent to your email', time: 'Right now' },
            { icon: MessageCircle,text: 'Our team confirms via WhatsApp',         time: 'Within 1 hr' },
            { icon: Phone,        text: 'Payment instructions sent to you',       time: 'Within 1 hr' },
            { icon: Truck,        text: 'Kit dispatched & tracking shared',       time: '1–2 days' },
            { icon: Zap,          text: 'Installation booked at your convenience', time: 'Your schedule' },
          ].map(({ icon: Icon, text, time }) => (
            <li key={text} className="flex items-center gap-3 px-5 py-3.5">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-lime/10 text-lime-dark">
                <Icon size={14} />
              </span>
              <p className="flex-1 text-sm text-ink/80">{text}</p>
              <span className="shrink-0 font-display text-[11px] font-bold text-ink/30">{time}</span>
            </li>
          ))}
        </ul>
      </div>

      <a href="https://wa.me/66843488428" target="_blank" rel="noreferrer"
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-lime py-4 font-display text-base font-bold text-white shadow-md transition hover:bg-lime-dark">
        <MessageCircle size={18} /> Chat with our team on WhatsApp
      </a>

      <Link to="/" className="mt-4 block text-center font-display text-sm font-semibold text-lime-dark hover:underline">
        ← Back to Solvio home
      </Link>
    </div>
  );
}

// ─── Page shell ───────────────────────────────────────────────────────────────
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
        <main className="container-x py-12"><Confirmation items={items} /></main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      <Header />
      <main className="container-x py-10 pb-20">
        {/* Step bar */}
        <div className="mx-auto mb-8 max-w-sm">
          <StepBar step={step} />
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start xl:gap-10">
          {/* Left — active step */}
          <div>
            {step === 0 && <StepCart items={items} onQtyChange={handleQtyChange} onNext={() => setStep(1)} />}
            {step === 1 && <StepDetails onNext={() => setStep(2)} onBack={() => setStep(0)} />}
            {step === 2 && <StepReview items={items} onBack={() => setStep(1)} onPlace={() => setPlaced(true)} />}
          </div>

          {/* Right — sticky summary (always visible) */}
          <div className="lg:sticky lg:top-24">
            <OrderSummary items={items} editable={step === 0} onQtyChange={handleQtyChange} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
