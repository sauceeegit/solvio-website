import { useState } from 'react';
import Header from '../components/landing/Header';
import Breadcrumb from '../components/Breadcrumb';
import ProductHero from '../components/ProductHero';
import BenefitsStrip from '../components/BenefitsStrip';
import PaymentRow from '../components/PaymentRow';
import Highlights from '../components/Highlights';
import PlugPlayVideo from '../components/PlugPlayVideo';
import ModuleBanner from '../components/ModuleBanner';
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
  const [cartCount, setCartCount] = useState(0);
  const [added, setAdded] = useState(false);

  const addToCart = () => {
    setCartCount((c) => c + 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div id="top" className="min-h-screen bg-surface">
      <Header />
      <Breadcrumb />
      <main>
        <ProductHero cfg={cfg} onAddToCart={addToCart} added={added} />
        <BenefitsStrip />
        <PaymentRow />
        <Highlights />
        <PlugPlayVideo />
        <PhotoBanner />
        <ModuleBanner />
        <IncludedItems />
        <CalculatorSection derived={cfg} />
        <Testimonials />
        <Comparison />
        <FAQ bg="#ffffff" />
        <ContactSection />
      </main>
      <Footer />
      <StickyCartBar derived={cfg} onAddToCart={addToCart} added={added} />
      {/* spacer so the sticky mobile bar never covers the footer end on mobile */}
      <div className="h-20 lg:hidden" />
    </div>
  );
}
