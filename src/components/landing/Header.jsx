import TopBar from './TopBar';
import LandingNav from './LandingNav';

// Sticky site header — the TopBar (contact/promo) and the nav row freeze
// together at the top of the viewport while the page scrolls.
export default function Header() {
  return (
    <div id="site-header" className="sticky top-0 z-50">
      <TopBar />
      <LandingNav />
    </div>
  );
}
