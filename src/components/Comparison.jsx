import { Check, X } from 'lucide-react';
import { comparison } from '../data/product';
import Reveal from './Reveal';

function Cell({ value, highlight }) {
  if (value === true)
    return <Check size={18} className="mx-auto text-lime-dark" strokeWidth={3} />;
  if (value === false) return <X size={18} className="mx-auto" style={{ color: 'rgba(255,255,255,0.2)' }} />;
  return (
    <span className={`text-sm max-sm:text-xs ${highlight ? 'font-semibold text-white' : ''}`} style={!highlight ? { color: 'rgba(255,255,255,0.5)' } : undefined}>
      {value}
    </span>
  );
}

export default function Comparison() {
  const { columns, rows, highlightIndex } = comparison;

  return (
    <section className="py-20" style={{ backgroundColor: '#040f08' }}>
      <div className="container-x">
        <Reveal>
          <div className="mx-auto max-w-xl text-center">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-lime">Compare the range</p>
            <h2 className="mt-3 font-display text-3xl font-black tracking-tight text-white sm:text-4xl">
              Pick the kit that fits your home
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-xl2" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
            <table className="w-full border-collapse text-center max-sm:table-fixed">
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <th className="p-4 text-left font-mono text-[11px] uppercase tracking-wider max-sm:p-2" style={{ color: 'rgba(255,255,255,0.3)' }}>
                    Feature
                  </th>
                  {columns.map((c, i) => (
                    <th
                      key={c}
                      className={`p-4 font-display text-sm font-bold max-sm:p-2 max-sm:text-xs ${i === highlightIndex ? 'bg-lime/10 text-white' : ''}`}
                      style={i !== highlightIndex ? { color: 'rgba(255,255,255,0.5)' } : undefined}
                    >
                      {i === highlightIndex && (
                        <span className="mb-1 block font-mono text-[10px] uppercase tracking-wider text-lime">
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
                  <tr key={row.label} style={{ borderTop: '1px solid rgba(255,255,255,0.06)', backgroundColor: ri % 2 ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
                    <td className="p-4 text-left text-sm max-sm:p-2 max-sm:text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>{row.label}</td>
                    {row.values.map((v, ci) => (
                      <td
                        key={ci}
                        className={`p-4 max-sm:p-2 ${ci === highlightIndex ? 'bg-lime/[0.07]' : ''}`}
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
        <p className="mt-4 text-center text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
          *Estimated annual yield for a south-facing installation in central Europe.
        </p>
      </div>
    </section>
  );
}
