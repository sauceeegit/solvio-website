import TopBar from '../components/landing/TopBar';
import LandingNav from '../components/landing/LandingNav';
import HeaderCarousel from '../components/portable/HeaderCarousel';
import PortableBatteries from '../components/portable/PortableBatteries';
import Footer from '../components/Footer';
import { portableHeaderSlides } from '../data/landing';

export default function PortablePage() {
  return (
    <div id="top" className="min-h-screen bg-surface">
      <TopBar />
      <LandingNav />
      <main>
        <HeaderCarousel slides={portableHeaderSlides} />
        <PortableBatteries />
      </main>
      <Footer />
    </div>
  );
}
