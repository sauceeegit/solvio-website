import { useEffect, useState } from 'react';
import Header from '../components/landing/Header';
import Hero from '../components/landing/Hero';
import CategoryGrid from '../components/landing/CategoryGrid';
import Bestsellers from '../components/landing/Bestsellers';
import CalculatorSection from '../components/CalculatorSection';
import LandingFAQ from '../components/landing/LandingFAQ';
import FounderVideo from '../components/landing/FounderVideo';
import WhyShop from '../components/landing/WhyShop';
import SunshineSection from '../components/landing/SunshineSection';
import Community from '../components/landing/Community';
import SocialProof from '../components/landing/SocialProof';
import HowItWorks from '../components/landing/HowItWorks';
import GuidePopup from '../components/GuidePopup';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import { usePageMeta } from '../hooks/usePageMeta';

export default function LandingPage() {
  usePageMeta('/');
  const [headerH, setHeaderH] = useState(0);
  useEffect(() => {
    const el = document.getElementById('site-header');
    if (!el) return undefined;
    const measure = () => setHeaderH(el.offsetHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  return (
    <div id="top" className="min-h-screen bg-surface">
      <Header />
      <main>
        <div className="relative">
          <div className="max-lg:sticky" style={{ top: headerH }}>
            <Hero />
          </div>
          <div aria-hidden="true" className="lg:hidden" />
        </div>
        <SocialProof />
        <CategoryGrid />
        <Bestsellers />
        <SunshineSection />
        <HowItWorks />
        <CalculatorSection />
        <FounderVideo />
        <LandingFAQ />
        <WhyShop />
        <Community />
        <ContactSection />
      </main>
      <Footer />
      <GuidePopup />
    </div>
  );
}
