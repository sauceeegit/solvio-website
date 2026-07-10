import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Check, Mail, Battery, Zap, MapPin, Layers } from 'lucide-react';
import { baht, whFmt } from '../lib/format';
import { MODEL_ORIGIN, MODEL_URL } from './Gallery';
import MediaLoader from './MediaLoader';

// "Save Configuration" popup for the balcony configurator. Shows a snapshot-style
// preview of the configured array (built from the live config), the chosen
// storage option, a summary, and an email field to send the report.
export default function SaveConfigModal({ open, onClose, derived }) {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const frameRef = useRef(null);
  const [frameReady, setFrameReady] = useState(false);

  // Keep the latest config in a ref so the (stable) sender reads current values.
  const cfg = derived
    ? { location: derived.location?.id, panel: derived.panel?.id, modules: derived.modules }
    : null;
  const cfgRef = useRef(cfg);
  cfgRef.current = cfg;

  const send = useCallback(() => {
    const c = cfgRef.current;
    if (!c || !frameRef.current?.contentWindow) return;
    frameRef.current.contentWindow.postMessage({ type: 'solvio-config', ...c }, MODEL_ORIGIN);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  // The model pings 'solvio-ready' once its WebGL scene is up — push the config
  // then and reveal it. Reset the loader each time the modal reopens.
  useEffect(() => {
    if (!open) {
      setFrameReady(false);
      return undefined;
    }
    const onMsg = (e) => {
      if (e.origin === MODEL_ORIGIN && e.data?.type === 'solvio-ready') {
        send();
        setFrameReady(true);
      }
    };
    window.addEventListener('message', onMsg);
    const t = setTimeout(() => setFrameReady(true), 8000); // safety reveal
    return () => {
      window.removeEventListener('message', onMsg);
      clearTimeout(t);
    };
  }, [open, send]);

  if (!derived) return null;

  const { location, modules, panel, wp, storage, cable, total } = derived;
  const hasBattery = (storage?.wh ?? 0) > 0;

  const submit = (e) => {
    e.preventDefault();
    if (email) setSent(true);
  };

  const rows = [
    { icon: MapPin, label: 'Install location', value: location?.label },
    { icon: Layers, label: 'Modules', value: `${modules} × ${panel?.wp} Wp (${panel?.label})` },
    { icon: Zap, label: 'System size', value: `${wp.toLocaleString()} Wp` },
    { icon: Battery, label: 'Storage', value: hasBattery ? `${storage?.name} · ${whFmt(storage?.wh)}` : 'No battery' },
  ];

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/70 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl2 bg-white shadow-lift"
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.94, opacity: 0 }}
            transition={{ type: 'spring', damping: 24, stiffness: 280 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-ink/[0.07] px-5 py-3.5">
              <p className="font-display text-base font-extrabold text-ink">Your Solvio configuration</p>
              <button type="button" onClick={onClose} aria-label="Close" className="grid h-8 w-8 place-items-center rounded-full text-ink/60 transition hover:bg-ink/[0.06]">
                <X size={18} />
              </button>
            </div>

            {/* Snapshot preview — the live, configured 3D model */}
            <div className="relative overflow-hidden bg-white">
              {open && (
                <iframe
                  ref={frameRef}
                  src={MODEL_URL}
                  title="Solvio balcony panel — configured 3D model"
                  className="block aspect-[16/10] w-full border-0"
                  onLoad={send}
                  allow="fullscreen; xr-spatial-tracking; accelerometer; gyroscope"
                  allowFullScreen
                />
              )}
              <span className="pointer-events-none absolute left-4 top-4 rounded-full px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-wider text-[#111]" style={{ background: '#FFB330' }}>
                {wp.toLocaleString()} Wp · {location?.label}
              </span>
              <MediaLoader show={!frameReady} label="Loading 3D model" />
            </div>

            {/* Summary */}
            <div className="px-5 py-5">
              <ul className="space-y-2.5">
                {rows.map((r) => (
                  <li key={r.label} className="flex items-center justify-between gap-4 text-sm">
                    <span className="inline-flex items-center gap-2 text-slatey-500">
                      <r.icon size={15} className="shrink-0 text-lime-dark" /> {r.label}
                    </span>
                    <span className="text-right font-semibold text-ink">{r.value}</span>
                  </li>
                ))}
                <li className="flex items-center justify-between gap-4 border-t border-ink/[0.07] pt-3 text-sm">
                  <span className="text-slatey-500">AC cable</span>
                  <span className="font-semibold text-ink">{cable?.label}</span>
                </li>
              </ul>

              <div className="mt-4 flex items-center justify-between rounded-xl bg-lime/10 px-4 py-3">
                <span className="font-display text-sm font-bold text-ink">Total</span>
                <span className="font-display text-2xl font-extrabold text-ink">{baht(total ?? 0)}</span>
              </div>

              {/* Email the report */}
              <div className="mt-5 border-t border-ink/[0.07] pt-5">
                {sent ? (
                  <p className="flex items-center gap-2 font-display text-sm font-semibold text-[#1A8F66]">
                    <Check size={18} strokeWidth={3} /> Saved! Your configuration report is on its way to {email}.
                  </p>
                ) : (
                  <>
                    <label className="mb-1.5 block font-display text-sm font-semibold text-ink">
                      Email me this configuration
                    </label>
                    <form onSubmit={submit} className="flex flex-col gap-2.5 sm:flex-row">
                      <div className="flex flex-1 items-center gap-2 rounded-full border border-ink/15 bg-white px-4">
                        <Mail size={16} className="shrink-0 text-slatey-400" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@email.com"
                          className="w-full min-w-0 bg-transparent py-3 font-display text-sm text-ink placeholder:text-slatey-400 focus:outline-none"
                        />
                      </div>
                      <button type="submit" className="shrink-0 rounded-full bg-lime px-6 py-3 font-display text-sm font-bold text-white transition hover:bg-lime-dark">
                        Send report
                      </button>
                    </form>
                    <p className="mt-2 text-xs text-slatey-400">
                      We&apos;ll email your saved configuration and a follow-up quote from sales@solvio.solar.
                    </p>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
