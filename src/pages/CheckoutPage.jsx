import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from '../components/landing/Header';
import Footer from '../components/Footer';
import RefundPolicyConsent from '../components/RefundPolicyConsent';
import { useLanguage } from '../context/LanguageContext';
import { usePageMeta } from '../hooks/usePageMeta';
import { baht } from '../lib/format';
import { resolveCart, cartTotals, validateBuyer, buildPayload, submitRequest } from '../lib/checkout';
import { checkoutCopy, checkoutSettings as settings } from '../data/checkout';

export default function CheckoutPage() {
  usePageMeta('/checkout');
  const { search } = useLocation();
  return <CheckoutSelection key={search} search={search} />;
}
function CheckoutSelection({ search }) {
  const { lang } = useLanguage();
  const t = checkoutCopy[lang];
  let initialCart;
  try { initialCart = resolveCart(search); } catch { initialCart = null; }
  const [quantity, setQuantity] = useState(String(initialCart?.quantity ?? 1));
  const [buyer, setBuyer] = useState({name: '', phone: '', email: '', address: '', district: '', province: '', postal: '', country: 'Thailand'});
  const [consent, setConsent] = useState(false);
  const [acceptedAt, setAcceptedAt] = useState('');
  const [step, setStep] = useState('details');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [reference, setReference] = useState('');
  const [botcheck, setBotcheck] = useState('');
  const lock = useRef(false);
  const reviewHeading = useRef(null);
  const detailsInput = useRef(null);
  const previousStep = useRef(step);
  useEffect(() => {
    if (previousStep.current !== step) {
      const target = (step === 'review' ? reviewHeading : detailsInput).current;
      target?.focus({ preventScroll: true });
      target?.scrollIntoView({ behavior: 'instant', block: 'center' });
      previousStep.current = step;
    }
  }, [step]);
  let cart = null;
  try { const p = new URLSearchParams(search); p.set('qty', quantity); cart = initialCart ? resolveCart(`?${p}`) : null; } catch { /* recoverable quantity error */ }
  const totals = cartTotals(cart);
  const sending = status === 'sending';
  function changeBuyer(key, value) { setBuyer(prev => ({...prev, [key]: value})); setError(''); }
  function review(e) {
    e.preventDefault();
    try {
      validateBuyer(buyer);
      if (!cart || !consent) throw new Error('validation');
      setError(''); setStep('review');
    } catch { setError(lang === 'th' ? 'กรุณาตรวจสอบข้อมูล จำนวน และยอมรับนโยบาย' : 'Check your details, quantity and policy acceptance.'); }
  }
  async function send() {
    if (lock.current || status === 'success') return;
    lock.current = true;
    const ref = reference || `SOL-REQ-${crypto.randomUUID()}`;
    setReference(ref);
    try {
      const payload = buildPayload({cart, buyer, lang, reference: ref, consent, acceptedAt, botcheck});
      setStatus('sending'); setError('');
      await submitRequest(payload);
      setStatus('success');
    } catch { setStatus('error'); setError(t.error); }
    finally { lock.current = false; }
  }
  const fieldClass = 'mt-1 w-full rounded-xl border border-ink/25 bg-white px-4 py-3 text-ink focus:outline-orange-600';
  return <div className="min-h-screen bg-surface text-ink"><Header />
    <main className="container-x py-10 sm:py-16 max-w-6xl">
      <h1 className="font-display text-3xl sm:text-4xl font-extrabold">{t.title}</h1>
      {!initialCart ? <div className="my-8 rounded-2xl bg-white p-8"><p role="alert">{t.empty}</p><div className="mt-6 flex flex-wrap gap-4"><Link to="/balcony-system" className="btn-primary">Balcony Solar</Link><Link to="/portable-system" className="btn-primary">Portable</Link></div></div> : <>
        {status !== 'success' && <p className="my-6 rounded-xl border-l-4 border-orange-600 bg-orange-50 p-5 font-semibold" data-payment-gate>{status === 'error' ? t.error : t.gate}</p>}
        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
          <section className="rounded-2xl bg-white p-5 sm:p-8">
          {status === 'success' ? <div role="status"><h2 className="text-2xl font-bold">{t.success}</h2><p className="mt-4">{t.accepted}</p><p className="mt-4 break-all">{t.reference}: <strong>{reference}</strong></p><p className="mt-6">{t.slip}</p><a className="mt-4 inline-block underline" href={`mailto:${settings.inbox}?subject=${encodeURIComponent(`Transfer slip — ${reference}`)}`}>{settings.inbox}</a></div> : <>
            <form onSubmit={review}>
              <fieldset disabled={sending}>
                {step === 'details' ? <><h2 className="mb-6 text-xl font-bold">{lang === 'th' ? 'ข้อมูลผู้ซื้อและที่อยู่จัดส่ง' : 'Buyer & delivery details'}</h2>
                  <div className="grid gap-4 sm:grid-cols-2">{Object.keys(buyer).map(key => <label key={key} className={key === 'address' ? 'sm:col-span-2' : ''}>{t[key]} *{key === 'country' ? <><select name="country" required value={buyer.country} onChange={e => changeBuyer('country', e.target.value)} className={fieldClass}><option value="Thailand">{t.thailand}</option></select><span className="mt-1 block text-sm">{t.countryOnly}</span></> : <input ref={key === 'name' ? detailsInput : null} name={key} required type={key === 'email' ? 'email' : key === 'phone' ? 'tel' : 'text'} maxLength={key === 'address' ? 500 : 120} value={buyer[key]} onChange={e => changeBuyer(key, e.target.value)} className={fieldClass} />}</label>)}</div>
                  <p className="mt-6 text-sm text-ink/75">{t.privacy}</p>
                </> : <><h2 ref={reviewHeading} tabIndex={-1} className="text-xl font-bold focus:outline-orange-600">{t.review}</h2><dl className="mt-5 space-y-3 break-words">{Object.entries(buyer).map(([key, value]) => <div key={key}><dt className="text-xs uppercase text-ink/60">{t[key]}</dt><dd>{key === 'country' ? t.thailand : value.trim()}</dd></div>)}</dl></>}
                <div hidden aria-hidden="true"><label>Leave empty<input name="botcheck" tabIndex={-1} autoComplete="off" value={botcheck} onChange={e => setBotcheck(e.target.value)} /></label></div>
                <RefundPolicyConsent checked={consent} disabled={sending} onChange={value => {setConsent(value); setAcceptedAt(value ? new Date().toISOString() : '');}} />
                {step === 'details' ? <button type="submit" className="btn-primary mt-4 w-full" disabled={!cart || !consent}>{t.review}</button> : <div className="mt-5 grid gap-3"><button type="button" className="btn-primary disabled:opacity-50" disabled={!consent || sending} onClick={send}>{sending ? t.sending : t.send}</button><button type="button" className="rounded-full border border-ink/20 p-3" onClick={() => setStep('details')}>{t.back}</button></div>}
              </fieldset>
            </form>
            {error && <p role="alert" className="mt-5 rounded-xl bg-red-50 p-4 text-red-800">{error}</p>}
            {reference && <p className="mt-4 break-all text-sm">{t.reference}: {reference}</p>}
          </>}
          </section>
          <aside className="space-y-5">
            <section className="rounded-2xl bg-white p-6"><h2 className="text-xl font-bold">{initialCart.name}</h2><p className="mt-3 text-sm">{initialCart.configuration}</p><p className="mt-3">{baht(initialCart.unitPrice)} / {lang === 'th' ? 'ชิ้นหรือชุด' : 'unit/set'}</p>
              <label className="mt-5 block">{t.qty}<input aria-label={t.qty} type="number" min="1" max={settings.maxQuantity} step="1" value={quantity} disabled={sending || step === 'review' || status === 'success'} onChange={e => {setQuantity(e.target.value); setConsent(false); setAcceptedAt(''); setReference('');}} className={fieldClass} /></label>
              <p className="mt-5 text-sm">{t.subtotal}</p><p className="font-bold" data-subtotal>{totals ? baht(totals.subtotal) : '—'}</p><p className="mt-3 text-sm">{t.addedVat}: <span data-added-vat>{totals ? baht(totals.addedVat) : '—'}</span></p><p className="mt-3 text-sm">{t.delivery}: <span data-delivery>{totals ? baht(totals.delivery) : '—'}</span></p><p className="mt-5 font-semibold">{t.payableTotal}</p><p className="text-3xl font-bold text-price" data-payable-total>{totals ? baht(totals.payableTotal) : '—'}</p><p className="mt-4 text-xs">{t.limits}</p><p className="mt-4 text-sm">{t.goods}</p>
            </section>
            {status === 'success' && <section className="rounded-2xl border border-ink/15 p-6" data-bank-details><h2 className="font-bold">{t.bank}</h2><dl className="mt-3 space-y-2"><div><dt className="sr-only">{lang === 'th' ? 'ธนาคาร' : 'Bank'}</dt><dd>{settings.bank}</dd></div><div><dt className="sr-only">{lang === 'th' ? 'ชื่อบัญชี' : 'Account holder'}</dt><dd>{settings.holder}</dd></div><div><dt className="sr-only">{lang === 'th' ? 'เลขที่บัญชี' : 'Account number'}</dt><dd className="font-mono text-xl select-all">{settings.account}</dd></div></dl><p className="mt-4 font-semibold">{t.transfer} <strong data-transfer-amount>{baht(totals.payableTotal)}</strong></p><p className="mt-4 text-sm">{t.pending}</p></section>}
          </aside>
        </div>
      </>}
    </main><Footer /></div>;
}
