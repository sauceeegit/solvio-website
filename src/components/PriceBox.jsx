import { useState } from 'react';
import { Bookmark } from 'lucide-react';
import { baht } from '../lib/format';
import { product } from '../data/product';
import SaveConfigModal from './SaveConfigModal';
import RefundPolicyConsent from './RefundPolicyConsent';
import { useLanguage } from '../context/LanguageContext';
import { checkoutCopy } from '../data/checkout';
export default function PriceBox({ derived, onAddToCart, consent, onConsent }) {
  const [saveOpen, setSaveOpen] = useState(false);
  const { lang } = useLanguage();
  const t = checkoutCopy[lang];
  return <div className="rounded-xl2 border border-ink/[0.07] bg-white p-6 shadow-soft" data-balcony-purchase>
    <h2 className="font-display text-xl font-extrabold">{product.name}</h2>
    <p className="mt-4 text-sm">{t.subtotal}</p><p className="text-3xl font-bold">{baht(derived?.total ?? 0)}</p>
    <p className="mt-4 text-sm">{t.gate}</p><p className="mt-3 text-sm">{t.goods}</p>
    <RefundPolicyConsent checked={consent} onChange={onConsent} />
    <button data-checkout-cta disabled={!consent} onClick={onAddToCart} className="btn-primary w-full disabled:opacity-50">{lang === 'th' ? 'ไปยังคำขอสั่งซื้อ' : 'Continue to checkout'}</button>
    <button onClick={() => setSaveOpen(true)} className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-ink/15 px-6 py-3.5 font-bold"><Bookmark size={18} />{lang === 'th' ? 'บันทึกการตั้งค่า' : 'Save Configuration'}</button>
    <SaveConfigModal open={saveOpen} onClose={() => setSaveOpen(false)} derived={derived} />
  </div>;
}
