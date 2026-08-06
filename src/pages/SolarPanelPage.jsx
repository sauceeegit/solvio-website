import Header from '../components/landing/Header';
import PlugPlayVideo from '../components/PlugPlayVideo';
import SolarPanelFeatures from '../components/SolarPanelFeatures';
import SolarYourWay from '../components/SolarYourWay';
import PanelComparison from '../components/PanelComparison';
import FAQ from '../components/FAQ';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import { panelFaqs } from '../data/landing';
import { usePageMeta } from '../hooks/usePageMeta';

export default function SolarPanelPage() {
  usePageMeta('/solar-panel');

  return (
    <div id="top" className="min-h-screen bg-surface">
      <Header />
      <main>
        <h1 className="sr-only">Dark Feather 450 Wp solar panel — glass-glass, IP68</h1>
        <PlugPlayVideo />
        <SolarPanelFeatures />
        <SolarYourWay />
        <PanelComparison />
        <FAQ
          items={panelFaqs}
          eyebrow="Panel tech"
          heading="FAQ"
          subtitle="The engineering behind Solvio panels — cells, build, and how they hold up in Thai heat."
        />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
