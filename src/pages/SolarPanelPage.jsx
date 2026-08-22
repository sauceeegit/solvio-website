import Header from '../components/landing/Header';
import PlugPlayVideo from '../components/PlugPlayVideo';
import SolarPanelFeatures from '../components/SolarPanelFeatures';
import SolarYourWay from '../components/SolarYourWay';
import PanelComparison from '../components/PanelComparison';
import FAQ from '../components/FAQ';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import { panelFaqs, panelFaqsTh } from '../data/landing';
import { usePageMeta } from '../hooks/usePageMeta';
import { useLanguage } from '../context/LanguageContext';

export default function SolarPanelPage() {
  usePageMeta('/solar-panel');
  const { lang } = useLanguage();
  const th = lang === 'th';

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
          items={th ? panelFaqsTh : panelFaqs}
          eyebrow={th ? 'เทคโนโลยีแผง' : 'Panel tech'}
          heading="FAQ"
          subtitle={th ? 'วิศวกรรมเบื้องหลังแผง Solvio — เซลล์ โครงสร้าง และความทนทานต่อความร้อนในประเทศไทย' : 'The engineering behind Solvio panels — cells, build, and how they hold up in Thai heat.'}
        />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
