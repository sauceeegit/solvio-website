import { useState } from 'react';
import TopBar from '../components/landing/TopBar';
import LandingNav from '../components/landing/LandingNav';
import Breadcrumb from '../components/Breadcrumb';
import ProductHero from '../components/ProductHero';
import BenefitsStrip from '../components/BenefitsStrip';
import PaymentRow from '../components/PaymentRow';
import Highlights from '../components/Highlights';
import SpecCard from '../components/SpecCard';
import IncludedItems from '../components/IncludedItems';
import CalculatorSection from '../components/CalculatorSection';
import Testimonials from '../components/Testimonials';
import Comparison from '../components/Comparison';
import RelatedProducts from '../components/RelatedProducts';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import StickyCartBar from '../components/StickyCartBar';
import { useConfigurator } from '../hooks/useConfigurator';

export default function ProductPage() {
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
      <TopBar />
      <LandingNav />
      <Breadcrumb />
      <main>
        <ProductHero cfg={cfg} onAddToCart={addToCart} added={added} />
        <BenefitsStrip />
        <PaymentRow />
        <Highlights />
        <SpecCard />
        <IncludedItems />
        <CalculatorSection derived={cfg} />
        <Testimonials />
        <Comparison />
        <RelatedProducts />
        <FAQ />
      </main>
      <Footer />
      <StickyCartBar derived={cfg} onAddToCart={addToCart} added={added} />
      {/* spacer so the sticky mobile bar never covers the footer end on mobile */}
      <div className="h-20 lg:hidden" />
    </div>
  );
}
