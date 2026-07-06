import { useMemo, useState } from 'react';
import { Wallet, ArrowRight, BatteryCharging, Plug, Check } from 'lucide-react';
import { baht, num } from '../../lib/format';
import Reveal from '../Reveal';

// Locked assumptions (confirmed):
const SUN_HOURS = 5; // peak sun hours / day
const PR = 0.85; // performance ratio (efficient)
const GEN_PER_KW = SUN_HOURS * 365 * PR; // kWh per kW per year
const DEGRADATION = 0.995; // 0.5% / yr
const TARIFF_INFLATION = 1.0; // 0% (flat)
const COST_PER_KW = 18500; // ฿ / kW (no battery)
const COST_FIXED = 79000; // ฿ base (no battery)
const COST_PER_KW_BAT = 28500; // ฿ / kW (with battery)
const COST_FIXED_BAT = 85000; // ฿ base (with battery)
const SC_NONE = 0.5; // self-consumption without battery
const SC_BAT = 1.0; // self-consumption with battery
const PANEL_W = 450; // watts per panel
const PANEL_KW = PANEL_W / 1000;
const PLANS = [6, 12, 18, 24, 48]; // instalment plan lengths (months)

const shortBaht = (n) =>
  n >= 1_000_000 ? `฿${(n / 1_000_000).toFixed(2)}m` : n >= 1000 ? `฿${Math.round(n / 1000)}k` : baht(n);

function compute({ bill, coverage, rate, months, interest, battery }) {
  const cov = coverage / 100;
  const sc = battery ? SC_BAT : SC_NONE;
  const costPerKw = battery ? COST_PER_KW_BAT : COST_PER_KW;
  const costFixed = battery ? COST_FIXED_BAT : COST_FIXED;
  const monthlyKwh = rate > 0 ? bill / rate : 0;
  const annualKwh = monthlyKwh * 12;
  const requiredGen = annualKwh * cov;
  const systemKw = requiredGen / GEN_PER_KW;
  const panels = Math.ceil(systemKw / PANEL_KW);
  const cost = costPerKw * systemKw + costFixed;

  // only the self-consumed share of solar reduces the bill; surplus is exported (no value here)
  const monthlySave = cov * sc * bill;
  const annualSave = monthlySave * 12;

  // 25-year cumulative savings (flat tariff, 0.5%/yr degradation)
  const series = [0];
  let total = 0;
  for (let y = 1; y <= 25; y++) {
    total += annualSave * DEGRADATION ** (y - 1) * TARIFF_INFLATION ** (y - 1);
    series.push(total);
  }

  // payback (search up to 40 years)
  let cum = 0;
  let payback = 99;
  for (let y = 1; y <= 40; y++) {
    const yr = annualSave * DEGRADATION ** (y - 1) * TARIFF_INFLATION ** (y - 1);
    if (cum + yr >= cost && yr > 0) {
      payback = y - 1 + (cost - cum) / yr;
      break;
    }
    cum += yr;
  }

  const rMonthly = interest / 100 / 12;
  const monthlyInstalment =
    rMonthly > 0
      ? (cost * rMonthly * (1 + rMonthly) ** months) / ((1 + rMonthly) ** months - 1)
      : cost / months;

  return {
    systemKw,
    panels,
    sc,
    cost,
    monthlySave,
    annualSave,
    series,
    life: total,
    payback,
    monthlyInstalment,
    monthlyKwh,
  };
}

function BreakEvenChart({ series, cost, payback }) {
  const W = 600;
  const H = 220;
  const padL = 48;
  const padR = 12;
  const padT = 12;
  const padB = 26;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;
  const maxY = Math.max(series[series.length - 1], cost) * 1.08 || 1;
  const x = (yr) => padL + (yr / 25) * plotW;
  const y = (v) => padT + plotH - (v / maxY) * plotH;

  const savePts = series.map((v, yr) => `${x(yr).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  const bottom = padT + plotH;
  const crossX = x(Math.min(payback, 25));
  const yCost = y(cost);
  const broke = payback <= 25;

  let redPts = null;
  let greenPts = null;
  if (!broke) {
    redPts = `${padL},${bottom} ${savePts} ${x(25)},${bottom}`;
  } else {
    const left = [];
    const right = [];
    series.forEach((v, yr) => {
      const pt = `${x(yr).toFixed(1)},${y(v).toFixed(1)}`;
      if (yr < payback) left.push(pt);
      if (yr > payback) right.push(pt);
    });
    redPts = `${padL},${bottom} ${left.join(' ')} ${crossX.toFixed(1)},${yCost.toFixed(1)} ${crossX.toFixed(1)},${bottom}`;
    greenPts = `${crossX.toFixed(1)},${bottom} ${crossX.toFixed(1)},${yCost.toFixed(1)} ${right.join(' ')} ${x(25).toFixed(1)},${bottom}`;
  }

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="Cumulative savings versus system cost over 25 years">
      {[0, maxY / 2, maxY].map((v, i) => (
        <g key={i}>
          <line x1={padL} y1={y(v)} x2={W - padR} y2={y(v)} stroke="#0C1E1A" strokeOpacity="0.08" />
          <text x={padL - 8} y={y(v) + 4} textAnchor="end" fontSize="11" fill="#7E8C84" fontFamily="monospace">
            {shortBaht(v)}
          </text>
        </g>
      ))}
      {[0, 5, 10, 15, 20, 25].map((yr) => (
        <text key={yr} x={x(yr)} y={H - 8} textAnchor="middle" fontSize="11" fill="#7E8C84" fontFamily="monospace">
          {yr}y
        </text>
      ))}
      <line x1={padL} y1={y(cost)} x2={W - padR} y2={y(cost)} stroke="#7E8C84" strokeWidth="1.5" strokeDasharray="5 4" />
      <text x={W - padR} y={y(cost) - 6} textAnchor="end" fontSize="11" fill="#5A6B62">
        System cost {shortBaht(cost)}
      </text>
      {redPts && <polygon points={redPts} fill="#E24B4A" fillOpacity="0.16" />}
      {greenPts && <polygon points={greenPts} fill="#1D9E75" fillOpacity="0.16" />}
      <polyline points={savePts} fill="none" stroke="#FC4302" strokeWidth="2.5" strokeLinejoin="round" />
      {payback <= 25 && (
        <g>
          <line x1={crossX} y1={padT} x2={crossX} y2={padT + plotH} stroke="#D63A02" strokeOpacity="0.4" strokeDasharray="3 3" />
          <circle cx={crossX} cy={y(cost)} r="5" fill="#FC4302" stroke="#fff" strokeWidth="2" />
        </g>
      )}
    </svg>
  );
}

function Metric({ label, value, valueClass = 'text-ink' }) {
  return (
    <div className="rounded-xl bg-white p-3.5">
      <p className="text-[13px] text-slatey-500">{label}</p>
      <p className={`mt-1 font-display text-2xl font-extrabold tabular-nums ${valueClass}`}>{value}</p>
    </div>
  );
}

export default function EarningsCalculator() {
  const [bill, setBill] = useState(5000);
  const [coverage, setCoverage] = useState(80);
  const [rate, setRate] = useState(4.5);
  const [months, setMonths] = useState(24);
  const [interest, setInterest] = useState(0);
  const [battery, setBattery] = useState(false);
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const r = useMemo(
    () => compute({ bill, coverage, rate, months, interest, battery }),
    [bill, coverage, rate, months, interest, battery],
  );
  const paybackLabel = r.payback > 40 ? '40+ yrs' : `${r.payback.toFixed(1)} yrs`;
  const net = Math.round(r.monthlySave - r.monthlyInstalment);

  const submitQuote = (e) => {
    e.preventDefault();
    if (!email) return;
    setSent(true);
  };

  return (
    <>
      <Reveal delay={0.1}>
        <div className="mx-auto max-w-4xl rounded-xl2 border border-ink/[0.07] bg-[#f0f8ff] p-5 shadow-soft sm:p-7">
            {/* bill */}
            <div>
              <div className="flex items-baseline justify-between">
                <label className="font-display text-sm font-semibold text-ink">
                  Average monthly electricity bill
                </label>
                <span className="font-display text-2xl font-extrabold tabular-nums text-ink">{baht(bill)}</span>
              </div>
              <input
                type="range"
                min="500"
                max="30000"
                step="100"
                value={bill}
                onChange={(e) => setBill(Number(e.target.value))}
                className="mt-2 w-full accent-lime"
              />
            </div>

            {/* coverage */}
            <div className="mt-6">
              <div className="flex items-baseline justify-between">
                <label className="font-display text-sm font-semibold text-ink">
                  How much of your usage should solar cover?
                </label>
                <span className="font-display text-2xl font-extrabold tabular-nums text-ink">{coverage}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={coverage}
                onChange={(e) => setCoverage(Number(e.target.value))}
                className="mt-2 w-full accent-lime"
              />
              <p className="mt-1.5 text-sm font-medium text-slatey-500">≈ {num(r.monthlyKwh)} kWh/month of usage</p>
            </div>

            {/* battery */}
            <div className="mt-6">
              <label className="mb-1.5 block font-display text-sm font-semibold text-ink">Battery storage</label>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { v: false, label: 'No battery', Icon: Plug },
                  { v: true, label: 'With battery', Icon: BatteryCharging },
                ].map((o) => (
                  <button
                    key={o.label}
                    onClick={() => setBattery(o.v)}
                    className={`flex items-center justify-center gap-2 rounded-xl border px-2 py-3 font-display text-sm font-semibold transition ${
                      battery === o.v
                        ? 'border-lime bg-lime text-white'
                        : 'border-ink/10 bg-white text-slatey-500 hover:border-ink/25'
                    }`}
                  >
                    <o.Icon size={17} /> {o.label}
                  </button>
                ))}
              </div>
              <p className="mt-1.5 text-sm text-slatey-500">
                {battery
                  ? '100% of your solar is used — surplus is stored for the evening.'
                  : '~50% is used live — the daytime surplus is exported/wasted.'}
              </p>
            </div>

            {/* rate + interest */}
            <div className="mt-6 grid gap-5 sm:grid-cols-2 sm:gap-8">
              <div>
                <label className="mb-1.5 block font-display text-sm font-semibold text-ink">Electricity rate</label>
                <div className="flex items-center gap-2">
                  <span className="font-display text-sm text-slatey-500">฿</span>
                  <input
                    type="number"
                    min="1"
                    max="12"
                    step="0.1"
                    value={rate}
                    onChange={(e) => setRate(Number(e.target.value) || 0)}
                    className="w-24 rounded-lg border border-ink/15 bg-white px-3 py-2 font-display text-sm font-semibold text-ink focus:border-lime-dark focus:outline-none"
                  />
                  <span className="font-display text-sm text-slatey-500">/ kWh</span>
                </div>
              </div>
              <div>
                <label className="mb-1.5 block font-display text-sm font-semibold text-ink">Instalment interest</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    max="30"
                    step="0.5"
                    value={interest}
                    onChange={(e) => setInterest(Number(e.target.value) || 0)}
                    className="w-24 rounded-lg border border-ink/15 bg-white px-3 py-2 font-display text-sm font-semibold text-ink focus:border-lime-dark focus:outline-none"
                  />
                  <span className="font-display text-sm text-slatey-500">% / yr</span>
                </div>
              </div>
            </div>

            {/* instalment plan */}
            <div className="mt-5">
              <label className="mb-1.5 block font-display text-sm font-semibold text-ink">
                Instalment plan <span className="font-normal text-slatey-400">· months</span>
              </label>
              <div className="grid grid-cols-5 gap-1.5">
                {PLANS.map((m) => (
                  <button
                    key={m}
                    onClick={() => setMonths(m)}
                    className={`rounded-lg border px-1 py-2 font-display text-sm font-semibold transition ${
                      months === m
                        ? 'border-lime bg-lime text-white'
                        : 'border-ink/10 bg-white text-slatey-500 hover:border-ink/25'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* system spec */}
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 rounded-xl bg-ink px-5 py-4">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-wider text-white/55">System size</p>
                <p className="font-display text-2xl font-extrabold text-lime">{r.systemKw.toFixed(2)} kW</p>
              </div>
              <div className="hidden h-9 w-px bg-white/15 sm:block" />
              <div>
                <p className="font-mono text-[11px] uppercase tracking-wider text-white/55">Panels needed</p>
                <p className="font-display text-2xl font-extrabold text-white">
                  ~{r.panels} <span className="text-base font-semibold text-white/70">× {PANEL_W} W</span>
                </p>
              </div>
              <div className="hidden h-9 w-px bg-white/15 sm:block" />
              <div>
                <p className="font-mono text-[11px] uppercase tracking-wider text-white/55">System cost</p>
                <p className="font-display text-2xl font-extrabold text-white">{baht(r.cost)}</p>
              </div>
            </div>

            {/* metrics */}
            <div className="mt-7 grid grid-cols-2 gap-3 lg:grid-cols-4">
              <Metric label="Saving / month" value={baht(r.monthlySave)} valueClass="text-[#1A8F66]" />
              <Metric label="Saving / 25 years" value={shortBaht(r.life)} valueClass="text-[#1A8F66]" />
              <Metric label="Pays back in" value={paybackLabel} />
              <Metric label="Monthly instalment" value={baht(r.monthlyInstalment)} />
            </div>

            {/* chart */}
            <div className="mt-6">
              <p className="mb-1 text-sm text-slatey-500">Cumulative savings vs system cost</p>
              <BreakEvenChart series={r.series} cost={r.cost} payback={r.payback} />
              <p className="mt-1 text-sm text-slatey-500">
                {r.payback <= 25
                  ? `Break-even at year ${r.payback.toFixed(1)} — then ${Math.max(0, 25 - Math.round(r.payback))}+ years of near-free electricity.`
                  : 'Break-even falls beyond 25 years at this coverage — try a higher coverage %.'}
              </p>
            </div>

            {/* cash-flow callout */}
            <div className="mt-5 flex items-center gap-3 rounded-xl bg-white p-3.5 ring-1 ring-ink/[0.06]">
              <Wallet size={22} className="shrink-0 text-lime-dark" />
              {net >= 0 ? (
                <p className="text-[13px] leading-relaxed text-slatey-500">
                  On the {months}-month plan:{' '}
                  <span className="font-semibold text-ink">{baht(r.monthlyInstalment)}/mo</span> instalment vs{' '}
                  <span className="font-semibold text-ink">{baht(r.monthlySave)}/mo</span> saved —{' '}
                  <span className="font-bold text-lime-dark">+{baht(net)}/mo in your pocket from day one</span>
                </p>
              ) : (
                <p className="text-[13px] leading-relaxed text-slatey-500">
                  Spread it over {months} months at{' '}
                  <span className="font-semibold text-ink">{baht(r.monthlyInstalment)}/mo</span>, then{' '}
                  <span className="font-bold text-lime-dark">{baht(r.monthlySave)}/mo in pure savings</span> for
                  decades.
                </p>
              )}
            </div>

            {/* quote by email */}
            <div className="mt-6 border-t border-ink/[0.07] pt-5">
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
          Estimates only. Assumes {SUN_HOURS} sun-hours/day, {Math.round(PR * 100)}% performance ratio, {PANEL_W} W
          panels, {Math.round(SC_NONE * 100)}% self-consumption without a battery / {Math.round(SC_BAT * 100)}% with
          (exported surplus earns nothing), system cost ฿{COST_PER_KW.toLocaleString()}/kW + ฿
          {COST_FIXED.toLocaleString()} (฿{COST_PER_KW_BAT.toLocaleString()}/kW + ฿{COST_FIXED_BAT.toLocaleString()}{' '}
          with battery), flat tariff and {((1 - DEGRADATION) * 100).toFixed(1)}%/yr degradation.
      </p>
    </>
  );
}
