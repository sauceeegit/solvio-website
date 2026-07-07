import { useEffect, useState } from 'react';

// On-brand loading overlay shown inside a media box (a looping video or the
// 3D-model iframe) until that element is ready. It sits on top of the media,
// fades out when `show` flips to false, then unmounts — so it never blocks
// interaction once the content is in. Mirrors the site's full-page splash:
// a pulsing orange lightning-bolt on the dark ink backdrop.
export default function MediaLoader({ show, label = 'Loading' }) {
  // Keep the node mounted through the fade-out, then remove it. Remount
  // immediately if `show` flips back on (React's "adjust state on prop change
  // during render" pattern — no setState inside the effect).
  const [mounted, setMounted] = useState(show);
  const [prevShow, setPrevShow] = useState(show);
  if (show !== prevShow) {
    setPrevShow(show);
    if (show) setMounted(true);
  }

  useEffect(() => {
    if (show) return undefined;
    const t = setTimeout(() => setMounted(false), 550);
    return () => clearTimeout(t);
  }, [show]);

  if (!mounted) return null;

  return (
    <div
      aria-hidden={!show}
      className={`pointer-events-none absolute inset-0 z-20 grid place-items-center bg-ink transition-opacity duration-500 ${
        show ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <span className="solvio-media-loader__mark">
        <svg viewBox="0 0 32 32" className="solvio-media-loader__badge" aria-hidden="true">
          <rect x="1" y="1" width="30" height="30" rx="7.5" fill="#FC4302" />
          <path d="M14 4 L8 18 H14 L12 28 L24 13 H17 L20 4 Z" fill="#F4F0E4" />
          <path
            pathLength="1"
            className="solvio-media-loader__trace"
            d="M14 4 L8 18 H14 L12 28 L24 13 H17 L20 4 Z"
          />
        </svg>
      </span>
      <span className="sr-only">{label}</span>
    </div>
  );
}
