import { useMemo, useState } from 'react';
import { Sun, Euro, Leaf, Clock } from 'lucide-react';
import { orientations, calculatorDefaults, computeConfig, defaultConfig } from '../data/product';
import { euro, num } from '../lib/format';
import Reveal from './Reveal';

const YIELD_PER_WP = 0.95; // kWh per Wp per year, south-facing, central Europe
const CO2_PER_KWH = 0.38; // kg avoided per kWh

// Fallback system when no live configurator is supplied (e.g. on the landing page).
const DEFAULT_DERIVED = computeConfig(defaultConfig);

// Card-only "Basic" calculator. The surrounding section, heading and Basic/Advanced
// toggle are provided by CalculatorSection.
export default function SavingsCalculator({ derived = DEFAULT_DERIVED }) {
  const [orientation, setOrientation] = useState('south');
  const [household, setHousehold] = useState(calculatorDefaults.household);
  const [rate, setRate] = useState(calculatorDefaults.rate);

  const factor = orientations.find((o) => o.id === orientation)?.factor ?? 1;

  const { annualYield, savings, payback, co2 } = useMemo(() => {
    const y = derived.wp * YIELD_PER_WP * factor;
    const usable = Math.min(y, household); // can't save more than you use
    const s = (usable * rate) / 100;
    return {
      annualYield: y,
      savings: s,
      payback: s > 0 ? derived.total / s : 0,
      co2: y * CO2_PER_KWH,
    };
  }, [derived.wp, derived.total, factor, household, rate]);

  const stats = [
    { icon: Sun, label: 'Annual yield', value: `${num(annualYield)} kWh`, tint: 'text-amber-dark' },
    { icon: Euro, label: 'You save / year', value: euro(savings), tint: 'text-lime-dark' },
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
                  max="8000"
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
                  <span className="font-mono text-sm font-semibold text-ink">{rate} ct/kWh</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="60"
                  step="1"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="w-full accent-lime"
                />
              </div>
            </div>

            {/* results */}
            <div className="grid grid-cols-2 gap-3">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="flex flex-col justify-between rounded-xl border border-ink/[0.07] bg-surface p-4"
                >
                  <s.icon size={18} className={s.tint} />
                  <div className="mt-6">
                    <p className="font-display text-2xl font-extrabold tracking-tight text-ink tabular-nums">
                      {s.value}
                    </p>
                    <p className="text-xs text-slatey-500">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

      <p className="mx-auto mt-4 max-w-2xl text-center text-xs text-slatey-400">
        Estimates only. Actual yield depends on location, shading, tilt and weather. Calculation
        assumes self-consumption of generated power up to your household demand.
      </p>
    </>
  );
}
