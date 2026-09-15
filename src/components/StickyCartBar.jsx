import { baht } from '../lib/format';
import { useLanguage } from '../context/LanguageContext';
import RefundPolicyConsent from './RefundPolicyConsent';
export default function StickyCartBar({ derived, onAddToCart, consent, onConsent }) {
  const { lang } = useLanguage();
  return <div data-mobile-purchase className="fixed bottom-0 left-0 right-0 z-40 border-t border-ink/10 bg-white/95 px-4 py-2 backdrop-blur-md lg:hidden">
    <div className="mx-auto max-w-lg"><RefundPolicyConsent checked={consent} onChange={onConsent} />
      <div className="flex items-center justify-between gap-3"><p className="text-sm font-bold">Balcony Solar<br />{baht(derived?.total ?? 0)}</p>
      <button data-checkout-cta disabled={!consent} onClick={onAddToCart} className="btn-primary text-sm disabled:opacity-50">{lang === 'th' ? 'คำขอสั่งซื้อ' : 'Checkout request'}</button></div>
    </div>
  </div>;
}
