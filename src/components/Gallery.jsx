import { useCallback, useEffect, useRef, useState } from 'react';
import MediaLoader from './MediaLoader';

const MODEL_URL = 'https://sauceeegit.github.io/solvio-panel-3d/';
const MODEL_ORIGIN = 'https://sauceeegit.github.io';

// Interactive 3D model of the panel, embedded in the hero slot. The live
// configurator drives it: location -> scene, module -> panel style, count ->
// number of panels (see the postMessage API in the solvio-panel-3d project).
export default function Gallery({ derived }) {
  const frameRef = useRef(null);
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

  return (
    <div className="lg:sticky lg:top-24 lg:self-start">
      <div className="relative overflow-hidden rounded-xl2 border border-ink/[0.07] bg-white shadow-soft">
        <iframe
          ref={frameRef}
          src={MODEL_URL}
          title="Solvio balcony panel — interactive 3D model"
          className="block aspect-[10/9] w-full border-0"
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
