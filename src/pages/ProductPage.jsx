import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkoutUrl } from '../lib/checkout';
import Header from '../components/landing/Header';
import Breadcrumb from '../components/Breadcrumb';
import ProductHero from '../components/ProductHero';
import BenefitsStrip from '../components/BenefitsStrip';
import PaymentRow from '../components/PaymentRow';
import Highlights from '../components/Highlights';
import PhotoBanner from '../components/PhotoBanner';
import IncludedItems from '../components/IncludedItems';
import CalculatorSection from '../components/CalculatorSection';
import Testimonials from '../components/Testimonials';
import Comparison from '../components/Comparison';
import FAQ from '../components/FAQ';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import StickyCartBar from '../components/StickyCartBar';
import { useConfigurator } from '../hooks/useConfigurator';
import { usePageMeta } from '../hooks/usePageMeta';

export default function ProductPage() {
  usePageMeta('/balcony-system');
  const cfg = useConfigurator();
  const navigate = useNavigate();
  const [acceptedConfig, setAcceptedConfig] = useState('');
  const [purchaseError, setPurchaseError] = useState('');
  const configKey = JSON.stringify(cfg.config);
  const consent = acceptedConfig === configKey;
  const onConsent = value => setAcceptedConfig(value ? configKey : '');
  const addToCart = () => {
    if (!consent) return;
    try { navigate(checkoutUrl('balcony', cfg.config)); }
    catch { setPurchaseError('Technical limit: 1–100 modules per set / ข้อจำกัดแบบฟอร์ม 1–100 แผงต่อชุด'); }
  };

  return (
    <div id="top" className="min-h-screen bg-surface">
      <Header />
      <Breadcrumb />
      <main>
        <ProductHero cfg={{...cfg, set: (key, value) => { setAcceptedConfig(''); setPurchaseError(''); cfg.set(key, value); }}} onAddToCart={addToCart} consent={consent} onConsent={onConsent} />
        {purchaseError && <p role="alert" className="container-x text-red-800">{purchaseError}</p>}
        <BenefitsStrip />
        <PaymentRow />
        <Highlights />
        <PhotoBanner />
        <IncludedItems />
        <CalculatorSection derived={cfg} />
        <Testimonials />
        <Comparison />
        <FAQ bg="#ffffff" />
        <ContactSection />
      </main>
      <Footer />
      <StickyCartBar derived={cfg} onAddToCart={addToCart} consent={consent} onConsent={onConsent} />
      {/* spacer so the sticky mobile bar never covers the footer end on mobile */}
      <div className="h-64 lg:hidden" />
    </div>
  );
}
