import Header from '../components/landing/Header';
import HeaderCarousel from '../components/portable/HeaderCarousel';
import PortableBatteries from '../components/portable/PortableBatteries';
import PortablePanels from '../components/portable/PortablePanels';
import PanelFeatures from '../components/portable/PanelFeatures';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import { portableHeaderSlides } from '../data/landing';
import { usePageMeta } from '../hooks/usePageMeta';
import { useLanguage } from '../context/LanguageContext';

export default function PortablePage() {
  usePageMeta('/portable-system');
  const { lang } = useLanguage();
  return (
    <div id="top" className="min-h-screen bg-surface">
      <Header />
      <main>
        {/* Visually hidden — this page leads with a video carousel, so the H1
            lives here for crawlers/screen readers without changing the design. */}
        <h1 className="sr-only">{lang === 'th' ? 'แบตเตอรี่พกพาและแผงโซลาร์พับได้ในประเทศไทย' : 'Portable power stations and foldable solar panels in Thailand'}</h1>
        <HeaderCarousel slides={portableHeaderSlides} />
        <PortableBatteries />
        <PortablePanels />
        <PanelFeatures />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
