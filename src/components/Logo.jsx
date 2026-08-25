// Solvio brand logo — orange "Solvio" wordmark on a transparent background
// (/public/solvio-logo.webp), so it sits cleanly on light or dark headers.
import { Link } from 'react-router-dom';
import { asset } from '../lib/format';
import { useLanguage } from '../context/LanguageContext';

export default function Logo({ className = '', href = '#top', size = 'h-9' }) {
  const { lang } = useLanguage();
  const homeLabel = lang === 'th' ? 'หน้าแรก Solvio' : 'Solvio home';
  const classes = `inline-flex items-center ${className}`;
  const img = (
    <img
      src={asset('/solvio-logo.webp')}
      alt="Solvio"
      className={`${size} w-auto`}
    />
  );

  // Route paths (e.g. "/") use client-side navigation so they respect the app's
  // base path and don't full-reload; in-page anchors (e.g. "#top") stay as <a>.
  return href.startsWith('/') ? (
    <Link to={href} className={classes} aria-label={homeLabel}>
      {img}
    </Link>
  ) : (
    <a href={href} className={classes} aria-label={homeLabel}>
      {img}
    </a>
  );
}
