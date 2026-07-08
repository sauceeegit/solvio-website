import { useMemo, useState } from 'react';
import { Sun, Wallet, Leaf, Clock, ArrowRight, Check } from 'lucide-react';
import { orientations, calculatorDefaults, computeConfig, defaultConfig } from '../data/product';
import { baht, num } from '../lib/format';
import Reveal from './Reveal';

const YIELD_PER_WP = 1.5; // kWh per Wp per year, south-facing (Thailand, ~5 peak sun-hours)
const CO2_PER_KWH = 0.5; // kg avoided per kWh (Thai grid emission factor)
const SC_BASE = 0.65; // share of solar used at home without a battery (daytime AC/fridge load)
const SC_MAX = 0.95; // even a big battery loses a little to conversion & full days
const BATT_KWH_CYCLES = 330; // useful battery cycles/yr (~365 days × ~90% usable)
const EXPORT_RATE = 2.2; // ฿/kWh — PEA net-billing credit (requires MEA/PEA registration)

// Fallback system when no live configurator is supplied (e.g. on the landing page).
const DEFAULT_DERIVED = computeConfig(defaultConfig);

// Card-only "Basic" calculator. The surrounding section, heading and Basic/Advanced
// toggle are provided by CalculatorSection.
export default function SavingsCalculator({ derived = DEFAULT_DERIVED }) {
  const [orientation, setOrientation] = useState('south');
  const [household, setHousehold] = useState(calculatorDefaults.household);
  const [rate, setRate] = useState(calculatorDefaults.rate);
  // Off by default: plug-in kits usually can't register for PEA net-billing.
  const [exportOn, setExportOn] = useState(false);
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const submitQuote = (e) => {
    e.preventDefault();
    if (email) setSent(true);
  };

  const factor = orientations.find((o) => o.id === orientation)?.factor ?? 1;

  const { annualYield, savings, payback, co2, selfUse } = useMemo(() => {
    const y = derived.wp * YIELD_PER_WP * factor;
    // self-consumption: ~65% base; a configured battery shifts surplus to the evening
    const battKwh = (derived.storage?.wh ?? 0) / 1000;
    const sc = Math.min(SC_MAX, SC_BASE + (y > 0 ? (battKwh * BATT_KWH_CYCLES) / y : 0));
    const usable = Math.min(y * sc, household); // can't save more than you use
    // surplus (not offset at the retail rate) earns the PEA credit when enabled
    const exportRev = exportOn ? Math.max(0, y - usable) * EXPORT_RATE : 0;
    const s = usable * rate + exportRev; // ฿
    return {
      annualYield: y,
      savings: s,
      payback: s > 0 ? derived.total / s : 0,
      co2: y * CO2_PER_KWH,
      selfUse: sc,
    };
  }, [derived.wp, derived.total, derived.storage?.wh, factor, household, rate, exportOn]);

  const stats = [
    { icon: Sun, label: 'Annual yield', value: `${num(annualYield)} kWh`, tint: 'text-amber-dark' },
    { icon: Wallet, label: 'You save / year', value: baht(savings), tint: 'text-lime-dark' },
    { icon: Clock, label: 'Pays back in', value: `${payback.toFixed(1)} yrs`, tint: 'text-ink' },
    { icon: Leaf, label: 'CO₂ avoided / yr', value: `${num(co2)} kg`, tint: 'text-lime-dark' },
  ];

  return (
    <>
      <p className="mx-auto mb-5 max-w-4xl text-sm text-slatey-500">
        Sized for {derived.modules} module{derived.modules > 1 ? 's' : ''} ({num(derived.wp)} Wp). Adjust
        the sliders to match your home.
      </p>

      <Reveal delay={0.1}>
        <div className="mx-auto grid max-w-4xl gap-6 rounded-xl2 border border-ink/[0.07] bg-white p-6 shadow-soft md:grid-cols-2 md:p-8">
            {/* controls */}
            <div className="space-y-6">
              <div>
                <label className="mb-2 block font-display text-sm font-semibold text-ink">
                  Roof / railing orientation
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {orientations.map((o) => (
                    <button
                      key={o.id}
                      onClick={() => setOrientation(o.id)}
                      className={`rounded-lg border px-2 py-2.5 text-xs font-semibold transition ${
                        orientation === o.id
                          ? 'border-lime bg-lime text-white'
                          : 'border-ink/10 text-slatey-500 hover:border-ink/25'
                      }`}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-1 flex items-center justify-between">
                  <label className="font-display text-sm font-semibold text-ink">
                    Household use
                  </label>
                  <span className="font-mono text-sm font-semibold text-ink">
                    {num(household)} kWh/yr
                  </span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="15000"
                  step="100"
                  value={household}
                  onChange={(e) => setHousehold(Number(e.target.value))}
                  className="w-full accent-lime"
                />
              </div>

              <div>
                <div className="mb-1 flex items-center justify-between">
                  <label className="font-display text-sm font-semibold text-ink">
                    Electricity price
                  </label>
                  <span className="font-mono text-sm font-semibold text-ink">฿{rate}/kWh</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="10"
                  step="0.5"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="w-full accent-lime"
                />
              </div>

              <div>
                <label className="mb-2 block font-display text-sm font-semibold text-ink">
                  Surplus export credit
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { v: false, label: 'None (plug-in kit)' },
                    { v: true, label: `PEA ฿${EXPORT_RATE.toFixed(2)}/unit` },
                  ].map((o) => (
                    <button
                      key={o.label}
                      onClick={() => setExportOn(o.v)}
                      className={`rounded-lg border px-2 py-2.5 text-xs font-semibold transition ${
                        exportOn === o.v
                          ? 'border-lime bg-lime text-white'
                          : 'border-ink/10 text-slatey-500 hover:border-ink/25'
                      }`}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
                <p className="mt-1.5 text-xs text-slatey-400">
                  {exportOn
                    ? 'Surplus sells to the grid at PEA net-billing rates — requires MEA/PEA registration.'
                    : 'Surplus earns nothing — typical for unregistered plug-in kits.'}
                </p>
              </div>
            </div>

            {/* results */}
            <div className="grid grid-cols-2 gap-3">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="flex flex-col justify-between rounded-xl border border-ink/[0.07] bg-[#f0f8ff] p-4 max-sm:p-3"
                >
                  <s.icon size={18} className={s.tint} />
                  <div className="mt-6 max-sm:mt-2">
                    <p className="font-display text-2xl font-extrabold tracking-tight text-ink tabular-nums max-sm:text-xl">
                      {s.value}
                    </p>
                    <p className="text-xs text-slatey-500">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* quote by email */}
            <div className="border-t border-ink/[0.07] pt-5 md:col-span-2">
              {sent ? (
                <p className="flex items-center gap-2 font-display text-sm font-semibold text-[#1A8F66]">
                  <Check size={18} strokeWidth={3} /> Thanks! Your quote is on its way to {email}.
                </p>
              ) : (
                <form onSubmit={submitQuote} className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    className="w-full flex-1 rounded-full border border-ink/15 bg-white px-5 py-3 font-display text-sm text-ink placeholder:text-slatey-400 focus:border-lime-dark focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-lime px-6 py-3 font-display text-sm font-bold text-white transition hover:bg-lime-dark"
                  >
                    Email me my quote <ArrowRight size={16} />
                  </button>
                </form>
              )}
              <p className="mt-2 text-sm text-slatey-500">
                We&apos;ll send your estimate and follow up with a tailored quote.
              </p>
            </div>
          </div>
        </Reveal>

      <p className="mx-auto mt-4 max-w-2xl text-center text-xs text-slatey-400">
        Estimates only. Payback uses your <strong>kit price (self-installed)</strong>. Assumes ~
        {Math.round(selfUse * 100)}% of generation is used at home
        {(derived.storage?.wh ?? 0) > 0 ? ' (raised by your configured battery)' : ' (a battery raises this)'},
        surplus {exportOn ? `exported at ฿${EXPORT_RATE.toFixed(2)}/kWh (PEA net-billing)` : 'unpaid'},
        Thai grid CO₂ {CO2_PER_KWH} kg/kWh. Actual yield depends on location, shading, tilt and weather.
      </p>
    </>
  );
}
