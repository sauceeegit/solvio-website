import { Routes, Route } from 'react-router-dom';
import { BgreenieProvider } from './context/BgreenieModal';
import ScrollToTop from './components/ScrollToTop';
import LandingPage from './pages/LandingPage';
import ProductPage from './pages/ProductPage';
import PortablePage from './pages/PortablePage';
import SolarPanelPage from './pages/SolarPanelPage';
import RooftopSystemPage from './pages/RooftopSystemPage';
import AboutPage from './pages/AboutPage';
import FaqsPage from './pages/FaqsPage';

export default function App() {
  return (
    <BgreenieProvider>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/balcony-system" element={<ProductPage />} />
        <Route path="/portable-system" element={<PortablePage />} />
        <Route path="/solar-panel" element={<SolarPanelPage />} />
        <Route path="/rooftop-system" element={<RooftopSystemPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/faqs" element={<FaqsPage />} />
      </Routes>
    </BgreenieProvider>
  );
}
