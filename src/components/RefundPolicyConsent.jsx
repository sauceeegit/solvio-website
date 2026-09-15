import { useId } from 'react';
import { asset } from '../lib/format';
import { useLanguage } from '../context/LanguageContext';
import { checkoutCopy } from '../data/checkout';
export default function RefundPolicyConsent({ checked, onChange, disabled = false }) {
  const id = useId();
  const { lang } = useLanguage();
  const t = checkoutCopy[lang];
  return <div className="my-3 text-sm leading-relaxed text-ink" data-policy-consent>
    <label htmlFor={id} className="flex items-start gap-3 cursor-pointer">
      <input id={id} type="checkbox" required checked={checked} onChange={e => onChange(e.target.checked)} disabled={disabled} className="mt-1 h-5 w-5 shrink-0 accent-orange-600" />
      <span>{t.consent}</span>
    </label>
    <p className="pl-8"><a className="underline" href={asset('/policies/Solvio-Return-and-Refund-Policy-EN.pdf')} target="_blank" rel="noreferrer">Return & Refund Policy (EN)</a> · <a className="underline" href={asset('/policies/Solvio-Return-and-Refund-Policy-TH.pdf')} target="_blank" rel="noreferrer">นโยบายการคืนสินค้าและคืนเงิน (TH)</a></p>
    <p className="pl-8 text-xs">{t.prevails}</p>
  </div>;
}
