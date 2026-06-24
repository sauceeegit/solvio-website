// Solvio brand logo (the real artwork lives at /public/solvio-logo.jpg).
// The cream-on-orange lockup reads well on both light and dark backgrounds.
import { Link } from 'react-router-dom';
import { asset } from '../lib/format';

export default function Logo({ className = '', href = '#top', size = 'h-9' }) {
  const classes = `inline-flex items-center ${className}`;
  const img = (
    <img
      src={asset('/solvio-logo.jpg')}
      alt="Solvio"
      className={`${size} w-auto rounded-md`}
    />
  );

  // Route paths (e.g. "/") use client-side navigation so they respect the app's
  // base path and don't full-reload; in-page anchors (e.g. "#top") stay as <a>.
  return href.startsWith('/') ? (
    <Link to={href} className={classes} aria-label="Solvio home">
      {img}
    </Link>
  ) : (
    <a href={href} className={classes} aria-label="Solvio home">
      {img}
    </a>
  );
}
