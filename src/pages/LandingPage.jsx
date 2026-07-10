import Header from '../components/landing/Header';
import Hero from '../components/landing/Hero';
import CategoryGrid from '../components/landing/CategoryGrid';
import Bestsellers from '../components/landing/Bestsellers';
import CalculatorSection from '../components/CalculatorSection';
import LandingFAQ from '../components/landing/LandingFAQ';
import FounderVideo from '../components/landing/FounderVideo';
import WhyShop from '../components/landing/WhyShop';
import Community from '../components/landing/Community';
import GuidePopup from '../components/GuidePopup';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import { usePageMeta } from '../hooks/usePageMeta';

export default function LandingPage() {
  usePageMeta('/');
  return (
    <div id="top" className="min-h-screen bg-surface">
      <Header />
      <main>
        <Hero />
        <CategoryGrid />
        <Bestsellers />
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
