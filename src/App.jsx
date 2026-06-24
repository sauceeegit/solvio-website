import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ProductPage from './pages/ProductPage';
import PortablePage from './pages/PortablePage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/balcony-system" element={<ProductPage />} />
      <Route path="/portable-system" element={<PortablePage />} />
    </Routes>
  );
}
