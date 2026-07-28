import { Check } from 'lucide-react';
import Reveal from './Reveal';

// Panel technology comparison — Solvio's module vs. top-tier residential modules.
// The first (Solvio) data column is highlighted; ★ marks category-leading specs.
const COLUMNS = [
  { name: 'SOLVIO Firm-Light PLUS', sub: 'T1148L', solvio: true },
  { name: 'Jinko Tiger Neo', sub: 'JKM440N-54HL4R' },
  { name: 'LONGi Hi-MO 6', sub: 'LR5-54HTD-430M' },
  { name: 'Trina Vertex S+', sub: 'TSM-440NEG9R.28' },
];

const ROWS = [
  { label: 'Cell technology', values: ['N-type, SMBB', 'N-type TOPCon', 'HPBC', 'N-type i-TOPCon'] },
  { label: 'Max module efficiency', values: ['23.1%', '22.02%', '22%', '22.0%'], lead: true },
  { label: 'Power density (W/m²)', values: ['230.6', '220.2', '220.2', '220.2'], lead: true },
  { label: 'Temp coefficient (Pmax)', values: ['-0.29%/°C', '-0.29%/°C', '-0.29%/°C', '-0.30%/°C'] },
  { label: 'Annual degradation', values: ['-0.40%', '-0.40%', '-0.40%', '-0.40%'] },
  { label: 'Laminate thickness', values: ['4.75 mm', '30 mm framed', '30 mm framed', '30 mm framed'], lead: true },
  {
    label: 'Weight',
    values: ['12kg', '22kg', '20.8 kg', '21.0 kg'],
    lead: true,
  },
];

export default function PanelComparison() {
  return (
    <section className="py-16 sm:py-20" style={{ backgroundColor: '#040f08' }}>
      <div className="container-x">
        <Reveal>
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#fffbf5' }}>
            Solvio EZ Solar · panel technology comparison
          </p>
          <h2 className="mt-3 max-w-3xl font-display text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl">
            Firm-Light PLUS vs. Top-Tier Residential Modules
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 overflow-x-auto rounded-2xl" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
            <table className="w-full min-w-[560px] border-collapse text-center sm:min-w-[780px]">
              <thead>
                <tr>
                  <th className="sticky left-0 z-20 p-4" style={{ backgroundColor: '#040f08' }} />
                  {COLUMNS.map((col) => (
                    <th
                      key={col.name}
                      className={`p-2.5 align-top sm:p-4 ${col.solvio ? 'bg-lime text-white' : ''}`}
                      style={!col.solvio ? { backgroundColor: 'rgba(255,255,255,0.06)' } : undefined}
                    >
                      <span className="block font-display text-[13px] font-bold leading-snug sm:text-base text-white">{col.name}</span>
                      <span className="mt-0.5 block font-mono text-[10px] sm:text-xs text-white/60">{col.sub}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row, ri) => (
                  <tr key={row.label} style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                    <td
                      className="sticky left-0 z-10 p-2.5 text-left font-display text-[13px] font-semibold sm:p-4 sm:text-[15px]"
                      style={{ backgroundColor: '#040f08', color: 'rgba(255,255,255,0.55)' }}
                    >
                      {row.label}
                    </td>
                    {row.values.map((v, ci) => {
                      const isSolvio = ci === 0;
                      return (
                        <td
                          key={ci}
                          className={`p-2.5 text-[13px] sm:p-4 sm:text-[15px] ${isSolvio ? 'bg-lime/10 font-bold text-white' : ''}`}
                          style={!isSolvio ? { color: 'rgba(255,255,255,0.45)' } : undefined}
                        >
                          <span className="inline-flex items-center justify-center gap-1.5">
                            {v}
                            {isSolvio && row.lead && (
                              <Check size={16} strokeWidth={3} className="shrink-0 text-lime" aria-label="category-leading" />
                            )}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-3 text-xs sm:hidden" style={{ color: 'rgba(255,255,255,0.3)' }}>Swipe the table sideways to compare →</p>
          <p className="mt-4 max-w-3xl text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.3)' }}>
            <Check size={13} strokeWidth={3} className="mb-0.5 mr-1 inline text-lime" /> = category-leading in
            this set. Efficiency and power-density figures reflect the 460 W top bin. Temp coefficient shown is
            parity with the best n-type modules.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
