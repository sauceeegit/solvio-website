import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Check, Mail, Battery, Zap, MapPin, Layers } from 'lucide-react';
import { baht, whFmt } from '../lib/format';

// "Save Configuration" popup for the balcony configurator. Shows a snapshot-style
// preview of the configured array (built from the live config), the chosen
// storage option, a summary, and an email field to send the report.
export default function SaveConfigModal({ open, onClose, derived }) {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

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

  if (!derived) return null;

  const { location, modules, panel, wp, storage, cable, total } = derived;
  const hasBattery = (storage?.wh ?? 0) > 0;
  // Snapshot: a row of panel thumbnails mirroring the configured array size.
  const shown = Math.min(modules, 8);

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

            {/* Snapshot preview */}
            <div className="relative overflow-hidden bg-gradient-to-b from-[#0C1E1A] to-[#123528] px-5 py-6">
              <span className="absolute left-4 top-4 rounded-full px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-wider text-[#111]" style={{ background: '#FFB330' }}>
                {wp.toLocaleString()} Wp · {location?.label}
              </span>
              <div className="mt-8 flex flex-wrap items-end justify-center gap-1.5">
                {Array.from({ length: shown }).map((_, i) => (
                  <img
                    key={i}
                    src={panel?.img}
                    alt={panel?.label}
                    className="h-24 w-[46px] rounded-sm object-cover shadow-md ring-1 ring-white/10 sm:h-28 sm:w-[54px]"
                    loading="lazy"
                  />
                ))}
                {modules > shown && (
                  <span className="ml-1 font-display text-sm font-bold text-white/80">+{modules - shown}</span>
                )}
              </div>
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
