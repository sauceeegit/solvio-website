import { Check, X } from 'lucide-react';
import { comparison } from '../data/product';
import Reveal from './Reveal';

function Cell({ value, highlight }) {
  if (value === true)
    return <Check size={18} className="mx-auto text-lime-dark" strokeWidth={3} />;
  if (value === false) return <X size={18} className="mx-auto text-ink/25" />;
  return (
    <span className={`text-sm ${highlight ? 'font-semibold text-ink' : 'text-ink/75'}`}>
      {value}
    </span>
  );
}

export default function Comparison() {
  const { columns, rows, highlightIndex } = comparison;

  return (
    <section className="bg-surface py-20">
      <div className="container-x">
        <Reveal>
          <div className="mx-auto max-w-xl text-center">
            <p className="eyebrow">Compare the range</p>
            <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Pick the kit that fits your home
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-xl2 border border-ink/[0.07] bg-white shadow-soft">
            <table className="w-full border-collapse text-center">
              <thead>
                <tr className="border-b border-ink/[0.07]">
                  <th className="p-4 text-left font-mono text-[11px] uppercase tracking-wider text-slatey-400">
                    Feature
                  </th>
                  {columns.map((c, i) => (
                    <th
                      key={c}
                      className={`p-4 font-display text-sm font-bold ${
                        i === highlightIndex ? 'bg-lime/10 text-ink' : 'text-ink/70'
                      }`}
                    >
                      {i === highlightIndex && (
                        <span className="mb-1 block font-mono text-[10px] uppercase tracking-wider text-lime-dark">
                          You&apos;re viewing
                        </span>
                      )}
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, ri) => (
                  <tr key={row.label} className={ri % 2 ? 'bg-surface/60' : ''}>
                    <td className="p-4 text-left text-sm text-slatey-500">{row.label}</td>
                    {row.values.map((v, ci) => (
                      <td
                        key={ci}
                        className={`p-4 ${ci === highlightIndex ? 'bg-lime/[0.07]' : ''}`}
                      >
                        <Cell value={v} highlight={ci === highlightIndex} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
        <p className="mt-4 text-center text-xs text-slatey-400">
          *Estimated annual yield for a south-facing installation in central Europe.
        </p>
      </div>
    </section>
  );
}
