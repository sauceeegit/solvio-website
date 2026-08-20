import { useState } from 'react';
import Reveal from './Reveal';
import SavingsCalculator from './SavingsCalculator';
import EarningsCalculator from './landing/EarningsCalculator';
import { useLanguage } from '../context/LanguageContext';

const MODES = {
  en: [{ id: 'basic', label: 'Basic' }, { id: 'advanced', label: 'Advanced' }],
  th: [{ id: 'basic', label: 'พื้นฐาน' }, { id: 'advanced', label: 'ขั้นสูง' }],
};

export default function CalculatorSection({ derived }) {
  const [mode, setMode] = useState('basic');
  const { lang } = useLanguage();
  const modes = MODES[lang] || MODES.en;

  return (
    <section id="calculator" className="scroll-mt-20 py-16" style={{ backgroundColor: '#f5f5f7' }}>
      <div className="container-x">
        <Reveal>
          <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow">{lang === 'th' ? 'คำนวณตัวเลข' : 'Run the numbers'}</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-price sm:text-3xl" style={{ fontFamily: '"Space Grotesk", system-ui, sans-serif' }}>
                {lang === 'th' ? 'ดูว่าคุณจะประหยัดได้เท่าไหร่' : "See what you'd save with solar"}
              </h2>
              <p className="mt-3 max-w-xl text-slatey-700">
                {mode === 'basic'
                  ? (lang === 'th' ? 'ประมาณการเร็วจากขนาดระบบและการใช้ไฟของคุณ' : 'A quick estimate from your system size and electricity use.')
                  : (lang === 'th' ? 'ใส่ค่าไฟและสัดส่วนที่ต้องการ — เราจะคำนวณขนาดระบบและแสดงกราฟคืนทุน' : 'Set your bill and coverage — we size the system and chart your payback.')}
              </p>
              {mode === 'advanced' && (
                <p className="mt-1 max-w-xl text-sm text-slatey-600">
                  {lang === 'th' ? `ราคาคำนวณแบบระบบหลังคาติดตั้งมืออาชีพ${derived ? ' — ราคาชุดอยู่ในเครื่องคำนวณด้านบน' : ''}` : `Priced as a professionally installed rooftop system${derived ? ' — kit prices are in the configurator above' : ''}.`}
                </p>
              )}
            </div>

            {/* Basic / Advanced toggle */}
            <div
              role="tablist"
              aria-label="Calculator detail level"
              className="inline-flex shrink-0 rounded-full border border-ink/10 bg-white p-1"
            >
              {modes.map((t) => (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={mode === t.id}
                  onClick={() => setMode(t.id)}
                  className={`rounded-full px-4 py-1.5 font-display text-sm font-semibold transition ${
                    mode === t.id
                      ? 'bg-lime text-white shadow-sm'
                      : 'text-slatey-700 hover:text-ink'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-2">
          {/* Export credit defaults ON for rooftop-scale (landing) and OFF where the
              calculator sits next to the plug-in kit configurator (balcony page). */}
          {mode === 'basic' ? (
            <SavingsCalculator derived={derived} />
          ) : (
            <EarningsCalculator exportDefault={!derived} />
          )}
        </div>
      </div>
    </section>
  );
}
