import { useLanguage } from '../context/LanguageContext';
import { checkoutCopy } from '../data/checkout';
export default function PaymentRow() {
  const { lang } = useLanguage();
  return <div className="bg-white px-6 py-6 text-center text-sm text-ink"><strong>{lang === 'th' ? 'ชำระด้วยการโอนเงินเท่านั้น' : 'Bank transfer only'}</strong><p className="mt-2">{checkoutCopy[lang].gate}</p></div>;
}
