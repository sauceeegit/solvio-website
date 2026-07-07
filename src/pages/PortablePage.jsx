import Header from '../components/landing/Header';
import HeaderCarousel from '../components/portable/HeaderCarousel';
import PortableBatteries from '../components/portable/PortableBatteries';
import PortablePanels from '../components/portable/PortablePanels';
import PanelFeatures from '../components/portable/PanelFeatures';
import Footer from '../components/Footer';
import { portableHeaderSlides } from '../data/landing';
import { usePageMeta } from '../hooks/usePageMeta';

export default function PortablePage() {
  usePageMeta(
    'Portable Power Stations & Foldable Solar Panels | Solvio',
    'Solvio portable power stations from 100 Wh to 2400 Wh plus foldable solar panels — clean power for camping, markets and off-grid weekends in Thailand.'
  );
  return (
    <div id="top" className="min-h-screen bg-surface">
      <Header />
      <main>
        <HeaderCarousel slides={portableHeaderSlides} />
        <PortableBatteries />
        <PortablePanels />
        <PanelFeatures />
      </main>
      <Footer />
    </div>
  );
}
