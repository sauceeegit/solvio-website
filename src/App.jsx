import { Routes, Route } from 'react-router-dom';
import { BgreenieProvider } from './context/BgreenieModal';
import { LanguageProvider } from './context/LanguageContext';
import ScrollToTop from './components/ScrollToTop';
import LandingPage from './pages/LandingPage';
import ProductPage from './pages/ProductPage';
import PortablePage from './pages/PortablePage';
import D100ProductPage from './pages/D100ProductPage';
import PortablePanelProductPage from './pages/PortablePanelProductPage';
import SolarPanelPage from './pages/SolarPanelPage';
import RooftopSystemPage from './pages/RooftopSystemPage';
import AboutPage from './pages/AboutPage';
import FaqsPage from './pages/FaqsPage';
import ProjectsPage from './pages/ProjectsPage';
import CheckoutPage from './pages/CheckoutPage';

export default function App() {
  return (
    <LanguageProvider>
    <BgreenieProvider>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/balcony-system" element={<ProductPage />} />
        <Route path="/portable-system" element={<PortablePage />} />
        <Route path="/portable-system/d100" element={<D100ProductPage />} />
        <Route path="/portable-system/panel" element={<PortablePanelProductPage />} />
        <Route path="/solar-panel" element={<SolarPanelPage />} />
        <Route path="/rooftop-system" element={<RooftopSystemPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/faqs" element={<FaqsPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </BgreenieProvider>
    </LanguageProvider>
  );
}
