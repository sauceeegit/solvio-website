import { useState } from 'react';
import Reveal from './Reveal';
import SavingsCalculator from './SavingsCalculator';
import EarningsCalculator from './landing/EarningsCalculator';

const MODES = [
  { id: 'basic', label: 'Basic' },
  { id: 'advanced', label: 'Advanced' },
];

export default function CalculatorSection({ derived }) {
  const [mode, setMode] = useState('basic');

  return (
    <section id="calculator" className="scroll-mt-20 bg-white py-16">
      <div className="container-x">
        <Reveal>
          <div className="mx-auto flex max-w-4xl flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow">Run the numbers</p>
              <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                See what you&apos;d save with solar
              </h2>
              <p className="mt-3 max-w-xl text-slatey-500">
                {mode === 'basic'
                  ? 'A quick estimate from your system size and electricity use.'
                  : 'Set your bill and coverage — we size the system and chart your payback.'}
              </p>
              {mode === 'advanced' && (
                <p className="mt-1 max-w-xl text-sm text-slatey-400">
                  Priced as a professionally installed rooftop system{derived ? ' — kit prices are in the configurator above' : ''}.
                </p>
              )}
            </div>

            {/* Basic / Advanced toggle */}
            <div
              role="tablist"
              aria-label="Calculator detail level"
              className="inline-flex shrink-0 rounded-full border border-ink/10 bg-white p-1"
            >
              {MODES.map((t) => (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={mode === t.id}
                  onClick={() => setMode(t.id)}
                  className={`rounded-full px-4 py-1.5 font-display text-sm font-semibold transition ${
                    mode === t.id
                      ? 'bg-lime text-white shadow-sm'
                      : 'text-slatey-500 hover:text-ink'
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
