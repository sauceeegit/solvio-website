import Header from '../components/landing/Header';
import HeaderCarousel from '../components/portable/HeaderCarousel';
import PortableBatteries from '../components/portable/PortableBatteries';
import PortablePanels from '../components/portable/PortablePanels';
import PanelFeatures from '../components/portable/PanelFeatures';
import Footer from '../components/Footer';
import { portableHeaderSlides } from '../data/landing';

export default function PortablePage() {
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
