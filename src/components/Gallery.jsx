import { useCallback, useEffect, useRef, useState } from 'react';
import MediaLoader from './MediaLoader';

export const MODEL_ORIGIN = 'https://sauceeegit.github.io';
// GitHub Pages caches the model HTML for 10 min, so the iframe would keep
// serving a stale build after the solvio-panel-3d repo updates. Bump this
// version tag whenever the model changes to force a fresh fetch. (Query strings
// don't affect the postMessage origin, which stays MODEL_ORIGIN.)
const MODEL_VERSION = '20260710-panelframe';
// `embed=1` tells the model it's driven by the on-page configurator, so it hides
// its own controls on mobile/tablet (fixes the model/parameter-bar overlap).
export const MODEL_URL = `${MODEL_ORIGIN}/solvio-panel-3d/?v=${MODEL_VERSION}&embed=1`;

// Interactive 3D model of the panel, embedded in the hero slot. The live
// configurator drives it: location -> scene, module -> panel style, count ->
// number of panels (see the postMessage API in the solvio-panel-3d project).
export default function Gallery({ derived, mobileFreeze = false }) {
  const frameRef = useRef(null);
  const rootRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const cfg = derived?.config;
  const wp = derived?.wp ?? 0;

  // Keep the latest config in a ref so the (stable) sender always reads current values.
  const cfgRef = useRef(cfg);
  cfgRef.current = cfg;

  const send = useCallback(() => {
    const c = cfgRef.current;
    if (!c || !frameRef.current?.contentWindow) return;
    frameRef.current.contentWindow.postMessage(
      { type: 'solvio-config', location: c.location, panel: c.panel, modules: c.modules },
      MODEL_ORIGIN,
    );
  }, []);

  // Re-send whenever the relevant config changes.
  useEffect(() => {
    send();
  }, [cfg?.location, cfg?.panel, cfg?.modules, send]);

  // The model pings 'solvio-ready' once the WebGL scene is fully up — that's the
  // real "loaded" signal (the iframe's onLoad only means the HTML arrived). Push
  // the current config then, and reveal the model (hide the loader).
  useEffect(() => {
    const onMsg = (e) => {
      if (e.origin === MODEL_ORIGIN && e.data?.type === 'solvio-ready') {
        send();
        setLoaded(true);
      }
    };
    window.addEventListener('message', onMsg);
    return () => window.removeEventListener('message', onMsg);
  }, [send]);

  // Safety cap: if 'solvio-ready' is ever missed, reveal anyway so the loader
  // can't spin forever.
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 8000);
    return () => clearTimeout(t);
  }, []);

  // Mobile freeze with a natural release: the model docks just below the sticky
  // header while the shopper scrolls Steps 1–2. The moment "Step 3 — Storage"
  // (#cfg-step-3) touches the model's bottom edge, the sticky `top` starts
  // tracking step 3, so the model is pushed up WITH the scroll (no snap-away).
  useEffect(() => {
    const el = rootRef.current;
    if (!el || !mobileFreeze) return undefined;
    let raf = 0;
    const update = () => {
      raf = 0;
      const headerH = document.getElementById('site-header')?.offsetHeight ?? 96;
      const pin = headerH + 8;
      const step3 = document.getElementById('cfg-step-3');
      const top = step3
        ? Math.min(pin, step3.getBoundingClientRect().top - el.offsetHeight - 12)
        : pin;
      el.style.setProperty('--frozen-top', `${top}px`);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [mobileFreeze]);

  return (
    <div
      ref={rootRef}
      className={`lg:sticky lg:top-24 lg:self-start ${
        mobileFreeze
          ? 'max-lg:sticky max-lg:top-[var(--frozen-top,104px)] max-lg:z-20 max-lg:max-h-[52vh] max-lg:overflow-hidden max-lg:rounded-xl2 max-lg:shadow-lift'
          : ''
      }`}
    >
      <div className="relative overflow-hidden rounded-xl2 border border-ink/[0.07] bg-white shadow-soft">
        <iframe
          ref={frameRef}
          src={MODEL_URL}
          title="Solvio balcony panel — interactive 3D model"
          className="block aspect-[10/9] w-full border-0 max-lg:aspect-[29/30]"
          onLoad={send}
          allow="fullscreen; xr-spatial-tracking; accelerometer; gyroscope"
          allowFullScreen
        />
        <span className="pointer-events-none absolute left-4 top-4 rounded-full px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-wider backdrop-blur" style={{ background: '#FFB330', color: '#111' }}>
          {wp.toLocaleString()} Wp · Plug &amp; Play
        </span>
        <MediaLoader show={!loaded} label="Loading 3D model" />
      </div>
    </div>
  );
}
