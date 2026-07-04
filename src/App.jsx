import { Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import LandingPage from './pages/LandingPage';
import ProductPage from './pages/ProductPage';
import PortablePage from './pages/PortablePage';
import SolarPanelPage from './pages/SolarPanelPage';
import RooftopSystemPage from './pages/RooftopSystemPage';

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/balcony-system" element={<ProductPage />} />
        <Route path="/portable-system" element={<PortablePage />} />
        <Route path="/solar-panel" element={<SolarPanelPage />} />
        <Route path="/rooftop-system" element={<RooftopSystemPage />} />
      </Routes>
    </>
  );
}
