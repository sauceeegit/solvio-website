import { useEffect, useMemo, useState } from 'react';
import { Sun, Wallet, Leaf, Clock, ArrowRight, Check } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { orientations, calculatorDefaults, computeConfig, defaultConfig, MODULE_WP } from '../data/product';
import { baht, num } from '../lib/format';
import Reveal from './Reveal';
import { useLanguage } from '../context/LanguageContext';

const orientationsTh = ['ทิศใต้', 'ทิศตะวันออก / ตะวันตก', 'มีร่มบางส่วน'];

const YIELD_PER_WP = 1.5; // kWh per Wp per year, south-facing (Thailand, ~5 peak sun-hours)
const CO2_PER_KWH = 0.5; // kg avoided per kWh (Thai grid emission factor)
const DAY_SHARE = 0.5; // share of household consumption that falls in solar hours
const BATT_KWH_CYCLES = 330; // useful battery cycles/yr (~365 days × ~90% usable)
const EXPORT_RATE = 2.2; // ฿/kWh — PEA net-billing credit (requires MEA/PEA registration)

// Fallback system when no live configurator is supplied (e.g. on the landing page).
const DEFAULT_DERIVED = computeConfig(defaultConfig);

// Card-only "Basic" calculator. The surrounding section, heading and Basic/Advanced
// toggle are provided by CalculatorSection.


export default function SavingsCalculator({ derived = DEFAULT_DERIVED }) {
  const statsRef = useRef(null);
  const inView = useInView(statsRef, { once: true, margin: '-80px' });
  const { lang } = useLanguage();
  const th = lang === 'th';
  const [orientation, setOrientation] = useState('south');
  const [household, setHousehold] = useState(calculatorDefaults.household);
  const [rate, setRate] = useState(calculatorDefaults.rate);
  // Off by default: plug-in kits usually can't register for PEA net-billing.
  const [exportOn, setExportOn] = useState(false);
  // Panel count — starts from the configurator's choice (or the 4-panel default)
  // and stays in sync with it, but can be adjusted here independently.
  const [modules, setModules] = useState(derived.modules);
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  useEffect(() => setModules(derived.modules), [derived.modules]);

  const submitQuote = (e) => {
    e.preventDefault();
    if (email) setSent(true);
  };

  const factor = orientations.find((o) => o.id === orientation)?.factor ?? 1;

  // The system being modeled: the live configurator's kit, re-priced for the
  // panel count chosen here (same panel type, storage and cable).
  const sized = useMemo(
    () =>
      modules === derived.modules
        ? derived
        : computeConfig({ ...(derived.config ?? defaultConfig), modules }),
    [modules, derived],
  );

  const { annualYield, savings, payback, co2, selfUse } = useMemo(() => {
    const y = sized.wp * YIELD_PER_WP * factor; // annual generation
    // Self-consumption is driven by how your load lines up with the sun, not a
    // fixed fraction. Without a battery, solar can only offset load that happens
    // while it's generating — roughly DAY_SHARE of your annual use — capped by
    // what the panels actually make.
    let selfUsed = Math.min(y, household * DAY_SHARE);
    // A battery time-shifts leftover surplus onto evening/night load, bounded by
    // the surplus available, the battery's yearly throughput, and remaining load.
    const battKwh = (sized.storage?.wh ?? 0) / 1000;
    const batteryShift = Math.min(
      y - selfUsed,
      battKwh * BATT_KWH_CYCLES,
      Math.max(0, household - selfUsed),
    );
    selfUsed += batteryShift;
    // surplus (not offset at the retail rate) earns the PEA credit when enabled
    const surplus = Math.max(0, y - selfUsed);
    const exportRev = exportOn ? surplus * EXPORT_RATE : 0;
    const s = selfUsed * rate + exportRev; // ฿
    return {
      annualYield: y,
      savings: s,
      payback: s > 0 ? sized.total / s : 0,
      co2: y * CO2_PER_KWH,
      selfUse: y > 0 ? selfUsed / y : 0,
    };
  }, [sized, factor, household, rate, exportOn]);

  const stats = [
    { icon: Sun, label: th ? 'พลังงานต่อปี' : 'Annual yield', value: `${num(annualYield)} kWh`, tint: 'text-lime' },
    { icon: Wallet, label: th ? 'ประหยัดต่อปี' : 'You save / year', value: baht(savings), tint: 'text-lime' },
    { icon: Clock, label: th ? 'คืนทุนใน' : 'Pays back in', value: th ? `${payback.toFixed(1)} ปี` : `${payback.toFixed(1)} yrs`, tint: 'text-lime' },
    { icon: Leaf, label: th ? 'ลด CO₂ / ปี' : 'CO₂ avoided / yr', value: `${num(co2)} kg`, tint: 'text-lime' },
  ];

  return (
    <>
      <p className="mx-auto mb-2 max-w-6xl text-sm text-slatey-700">
        {th ? 'ตั้งค่าขนาดระบบและปรับสไลเดอร์ให้ตรงกับบ้านของคุณ' : 'Set your system size and adjust the sliders to match your home.'}
      </p>

      <Reveal delay={0.1}>
        <div className="mx-auto grid max-w-6xl gap-6 rounded-3xl bg-white p-6 md:grid-cols-2 md:p-10" style={{ boxShadow: '0 2px 24px rgba(0,0,0,0.07)' }}>
            {/* controls */}
            <div className="space-y-6">
              {/* panel count */}
              <div>
                <div className="mb-2 flex items-baseline justify-between">
                  <label className="font-display text-sm font-semibold text-ink">
                    {th ? 'จำนวนแผง' : 'Number of panels'}
                  </label>
                  <span className="font-mono text-sm font-semibold text-ink">
                    {num(sized.wp)} Wp
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3 rounded-lg border border-ink/10 px-3 py-2">
                  <span className="text-sm font-medium text-slatey-600">{MODULE_WP} Wp {th ? 'ต่อแผง' : 'each'}</span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setModules(Math.max(1, modules - 1))}
                      aria-label="Remove a panel"
                      className="grid h-8 w-8 place-items-center rounded-lg border border-ink/12 text-ink transition hover:border-ink/30 disabled:opacity-40"
                      disabled={modules <= 1}
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min="1"
                      max="12"
                      inputMode="numeric"
                      value={modules}
                      onChange={(e) => {
                        const v = parseInt(e.target.value, 10);
                        setModules(Number.isFinite(v) ? Math.min(12, Math.max(1, v)) : 1);
                      }}
                      aria-label="Number of panels"
                      className="h-8 w-14 rounded-lg border border-ink/12 bg-white text-center font-display text-sm font-bold text-ink focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime/40"
                    />
                    <button
                      type="button"
                      onClick={() => setModules(Math.min(12, modules + 1))}
                      aria-label="Add a panel"
                      className="grid h-8 w-8 place-items-center rounded-lg border border-ink/12 text-ink transition hover:border-ink/30 disabled:opacity-40"
                      disabled={modules >= 12}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-2 block font-display text-sm font-semibold text-ink">
                  {th ? 'ทิศทางหลังคา / ราวระเบียง' : 'Roof / railing orientation'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {orientations.map((o, i) => (
                    <button
                      key={o.id}
                      onClick={() => setOrientation(o.id)}
                      className={`rounded-lg border px-2 py-2.5 text-xs font-semibold transition ${
                        orientation === o.id
                          ? 'border-lime bg-lime text-white'
                          : 'border-ink/10 text-slatey-700 hover:border-ink/25'
                      }`}
                    >
                      {th ? orientationsTh[i] : o.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-1 flex items-center justify-between">
                  <label className="font-display text-sm font-semibold text-ink">
                    {th ? 'การใช้ไฟในบ้าน' : 'Household use'}
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
                    {th ? 'ราคาค่าไฟฟ้า' : 'Electricity price'}
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
                  {th ? 'เครดิตไฟฟ้าส่วนเกิน' : 'Surplus export credit'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { v: false, label: th ? 'ไม่มี (ชุดปลั๊กอิน)' : 'None (plug-in kit)' },
                    { v: true, label: `PEA ฿${EXPORT_RATE.toFixed(2)}/unit` },
                  ].map((o) => (
                    <button
                      key={o.label}
                      onClick={() => setExportOn(o.v)}
                      className={`rounded-lg border px-2 py-2.5 text-xs font-semibold transition ${
                        exportOn === o.v
                          ? 'border-lime bg-lime text-white'
                          : 'border-ink/10 text-slatey-700 hover:border-ink/25'
                      }`}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
                <p className="mt-1.5 text-xs text-slatey-600">
                  {exportOn
                    ? (th ? 'ไฟส่วนเกินขายให้กริดในอัตรา PEA net-billing — ต้องลงทะเบียนกับ MEA/PEA' : 'Surplus sells to the grid at PEA net-billing rates — requires MEA/PEA registration.')
                    : (th ? 'ไฟส่วนเกินไม่ได้รับค่าตอบแทน — ปกติสำหรับชุดปลั๊กอินที่ไม่ได้ลงทะเบียน' : 'Surplus earns nothing — typical for unregistered plug-in kits.')}
                </p>
              </div>
            </div>

            {/* results */}
            <div className="flex flex-col gap-3">
              {/* overall system cost — follows the panel count */}
              <div className="flex items-center justify-between gap-3 rounded-xl bg-ink px-5 py-3.5">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-wider text-white/90">
                    {th ? 'ราคาระบบ' : 'System cost'}
                  </p>
                  <p className="font-display text-2xl font-extrabold tabular-nums text-white">
                    {baht(sized.total)}
                  </p>
                </div>
                <p className="text-right text-xs leading-relaxed text-white/85">
                  {modules} × {MODULE_WP} Wp {th ? 'แผง' : 'panels'}
                  {(sized.storage?.wh ?? 0) > 0 ? (th ? ' + แบตเตอรี่' : ' + battery') : ''}
                  <br />
                  {th ? 'รวม อินเวอร์เตอร์ & ขาตั้ง' : 'incl. inverter & mount'}
                </p>
              </div>

              <div ref={statsRef} className="grid flex-1 grid-cols-2 gap-3">
              {stats.map((s, idx) => (
                <motion.div
                  key={s.label}
                  className="flex flex-col justify-between rounded-2xl bg-white p-4 max-sm:p-3"
                  style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}
                  initial={{ opacity: 0, y: 18 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.55, delay: 0.1 + idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <s.icon size={36} className={s.tint} />
                  <div className="mt-6 max-sm:mt-2">
                    <p className="font-display text-2xl font-extrabold tracking-tight text-ink tabular-nums max-sm:text-xl">
                      {s.value}
                    </p>
                    <p className="text-sm font-medium text-slatey-700">{s.label}</p>
                  </div>
                </motion.div>
              ))}
              </div>
            </div>

            {/* quote by email */}
            <div className="border-t border-ink/[0.07] pt-5 md:col-span-2">
              {sent ? (
                <p className="flex items-center gap-2 font-display text-sm font-semibold text-[#1A8F66]">
                  <Check size={18} strokeWidth={3} /> {th ? `ขอบคุณ! ใบเสนอราคากำลังส่งไปที่ ${email}` : `Thanks! Your quote is on its way to ${email}.`}
                </p>
              ) : (
                <form onSubmit={submitQuote} className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    className="w-full flex-1 rounded-full border border-ink/15 bg-white px-5 py-3 font-display text-sm text-ink placeholder:text-slatey-600 focus:border-lime-dark focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-lime px-6 py-3 font-display text-sm font-bold text-white transition hover:bg-lime-dark"
                  >
                    {th ? 'ส่งใบเสนอราคาให้ฉัน' : 'Email me my quote'} <ArrowRight size={16} />
                  </button>
                </form>
              )}
              <p className="mt-2 text-sm text-slatey-700">
                {th ? 'เราจะส่งการประมาณการและติดตามด้วยใบเสนอราคาที่เหมาะกับคุณ' : "We'll send your estimate and follow up with a tailored quote."}
              </p>
            </div>
          </div>
        </Reveal>

      <p className="mx-auto mt-4 max-w-6xl text-center text-xs text-slatey-600">
        {th ? (
          <>ตัวเลขโดยประมาณเท่านั้น คืนทุนใช้ <strong>ราคาชุด (ติดตั้งเอง)</strong> —{' '}
          {baht(sized.total)} สำหรับ {modules} แผง สมมติว่า ~{Math.round(selfUse * 100)}% ของพลังงานที่ผลิตใช้ที่บ้าน
          {(sized.storage?.wh ?? 0) > 0 ? ' (เพิ่มขึ้นด้วยการใช้ไฟในบ้านและแบตเตอรี่)' : ' (การใช้ไฟสูงขึ้นและแบตเตอรี่จะเพิ่มตัวเลขนี้)'},
          ไฟส่วนเกิน{exportOn ? ` ส่งออกในอัตรา ฿${EXPORT_RATE.toFixed(2)}/kWh (PEA net-billing)` : 'ไม่ได้รับค่าตอบแทน'},
          CO₂ กริดไทย {CO2_PER_KWH} kg/kWh ผลผลิตจริงขึ้นอยู่กับสถานที่ ร่มเงา มุมเอียง และสภาพอากาศ</>
        ) : (
          <>Estimates only. Payback uses your <strong>kit price (self-installed)</strong> —{' '}
          {baht(sized.total)} for {modules} panel{modules > 1 ? 's' : ''}. Assumes ~
          {Math.round(selfUse * 100)}% of generation is used at home
          {(sized.storage?.wh ?? 0) > 0 ? ' (raised by your household use and configured battery)' : ' (higher household use and a battery raise this)'},
          surplus {exportOn ? `exported at ฿${EXPORT_RATE.toFixed(2)}/kWh (PEA net-billing)` : 'unpaid'},
          Thai grid CO₂ {CO2_PER_KWH} kg/kWh. Actual yield depends on location, shading, tilt and weather.</>
        )}
      </p>
    </>
  );
}
