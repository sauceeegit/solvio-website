import TopBar from '../components/landing/TopBar';
import LandingNav from '../components/landing/LandingNav';
import Hero from '../components/landing/Hero';
import CategoryGrid from '../components/landing/CategoryGrid';
import Bestsellers from '../components/landing/Bestsellers';
import EarningsCalculator from '../components/landing/EarningsCalculator';
import LandingFAQ from '../components/landing/LandingFAQ';
import FounderVideo from '../components/landing/FounderVideo';
import WhyShop from '../components/landing/WhyShop';
import Community from '../components/landing/Community';
import Footer from '../components/Footer';

export default function LandingPage() {
  return (
    <div id="top" className="min-h-screen bg-surface">
      <TopBar />
      <LandingNav />
      <main>
        <Hero />
        <CategoryGrid />
        <Bestsellers />
        <EarningsCalculator />
        <LandingFAQ />
        <FounderVideo />
        <WhyShop />
        <Community />
      </main>
      <Footer />
    </div>
  );
}
