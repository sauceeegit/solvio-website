import { Star } from 'lucide-react';
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
  { label: 'Max module efficiency', values: ['23.1%', '22.02%', '~22%', '22.0%'], lead: true },
  { label: 'Power density (W/m²)', values: ['230.6', '220.2', '220.2', '220.2'], lead: true },
  { label: 'Temp coefficient (Pmax)', values: ['-0.29%/°C', '-0.29%/°C', '-0.29%/°C', '-0.30%/°C'] },
  { label: 'Annual degradation', values: ['-0.40%', '-0.40%', '~-0.4%', '0.4%'] },
  { label: 'Laminate thickness', values: ['4.75 mm', '30 mm framed', '30 mm framed', '30 mm framed'], lead: true },
  {
    label: 'Weight',
    values: ['~4.8–5.9 kg/m² (≈9.5–11.8 kg/panel)', '~22 kg', '20.8 kg', '21.0 kg'],
    lead: true,
  },
];

export default function PanelComparison() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow">Solvio EZ Solar · panel technology comparison</p>
          <h2 className="mt-2 max-w-3xl font-display text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
            Firm-Light PLUS vs. Top-Tier Residential Modules
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-8 overflow-x-auto rounded-xl2 border border-ink/[0.08] shadow-soft">
            <table className="w-full min-w-[760px] border-collapse text-center">
              <thead>
                <tr>
                  {/* top-left corner */}
                  <th className="sticky left-0 z-20 bg-white p-4" />
                  {COLUMNS.map((col) => (
                    <th
                      key={col.name}
                      className={`p-4 align-top ${
                        col.solvio
                          ? 'border-x-2 border-lime bg-lime text-white'
                          : 'bg-ink text-white/90'
                      }`}
                    >
                      <span className="block font-display text-sm font-bold leading-snug">{col.name}</span>
                      <span className={`mt-0.5 block font-mono text-[11px] ${col.solvio ? 'text-white/85' : 'text-white/55'}`}>
                        {col.sub}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row, ri) => (
                  <tr key={row.label} className={ri % 2 ? 'bg-[#FFF6F1]' : 'bg-white'}>
                    <td
                      className={`sticky left-0 z-10 border-t border-ink/[0.07] p-4 text-left font-display text-sm font-semibold text-ink ${
                        ri % 2 ? 'bg-[#FFF6F1]' : 'bg-white'
                      }`}
                    >
                      {row.label}
                    </td>
                    {row.values.map((v, ci) => {
                      const isSolvio = ci === 0;
                      return (
                        <td
                          key={ci}
                          className={`border-t p-4 text-sm ${
                            isSolvio
                              ? 'border-x-2 border-lime/30 border-t-lime/20 bg-lime/[0.07] font-bold text-ink'
                              : 'border-ink/[0.07] text-ink/70'
                          } ${ri === ROWS.length - 1 && isSolvio ? 'border-b-2 border-b-lime/30' : ''}`}
                        >
                          <span className="inline-flex items-center justify-center gap-1.5">
                            {v}
                            {isSolvio && row.lead && (
                              <Star size={13} className="shrink-0 fill-lime-dark text-lime-dark" aria-label="category-leading" />
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

          <p className="mt-3 text-xs text-slatey-400 sm:hidden">Swipe the table sideways to compare →</p>
          <p className="mt-4 max-w-3xl text-xs leading-relaxed text-slatey-400">
            <Star size={11} className="mb-0.5 mr-1 inline fill-lime-dark text-lime-dark" /> = category-leading in
            this set. Efficiency and power-density figures reflect the 460 W top bin. Temp coefficient shown is
            parity with the best n-type modules.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
