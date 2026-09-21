import { AlertTriangle, ChevronDown, ExternalLink } from 'lucide-react';
import { asset } from '../../lib/format';

// One catalogue card. `data-model` carries the exact approved model identifier —
// QA matches on it, so it must stay verbatim (suffixes like "(21A)" included).
export default function InverterCard({ item, th }) {
  const L = (o) => (th ? o.th : o.en);
  const labelId = `inv-${item.id}-title`;

  return (
    <article
      id={item.id}
      data-model={item.model}
      aria-labelledby={labelId}
      className="inv-card flex scroll-mt-[168px] flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-soft lg:scroll-mt-28"
    >
      <div className="inv-stage border-b border-ink/[0.07]">
        <img src={asset(item.img)} alt={L(item.caption)} loading="lazy" decoding="async" />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap gap-1.5">
          {L(item.badges).map((b) => (
            <span
              key={b}
              className="rounded-full bg-lime/10 px-2.5 py-0.5 font-display text-[11px] font-semibold text-lime-dark"
            >
              {b}
            </span>
          ))}
        </div>

        <div>
          <h3 id={labelId} className="font-display text-lg font-bold text-ink">
            {item.model}
          </h3>
          <p className="mt-0.5 font-mono text-xs text-ink/55">{L(item.rated)}</p>
        </div>

        <p className="text-sm leading-relaxed text-ink/75">{L(item.desc)}</p>

        {item.flag && (
          <p className="flex gap-2 rounded-xl bg-[#FFF4E8] p-3 text-[12.5px] leading-relaxed text-[#7a3d06]">
            <AlertTriangle size={15} className="mt-0.5 shrink-0 text-lime-dark" aria-hidden="true" />
            <span>{L(item.flag)}</span>
          </p>
        )}

        {item.specs.length > 0 && (
          <details className="inv-specs rounded-xl border border-ink/10">
            <summary className="flex items-center justify-between gap-2 rounded-xl px-3.5 py-2.5 font-display text-[13px] font-semibold text-ink/85 transition hover:bg-ink/[0.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime">
              {th ? 'ข้อมูลจำเพาะ' : 'Specifications'}
              <ChevronDown size={16} className="inv-chevron text-ink/50" aria-hidden="true" />
            </summary>
            <dl className="border-t border-ink/10 px-3.5 py-3 text-[13px]">
              {item.specs.map((s) => (
                <div key={s.field} className="flex flex-wrap justify-between gap-x-4 gap-y-0.5 py-1.5">
                  <dt className="text-ink/55">{L(s.label)}</dt>
                  <dd className="font-mono text-ink/90">{s.value}</dd>
                </div>
              ))}
            </dl>
          </details>
        )}

        <p className="text-[12px] leading-relaxed text-ink/50">{L(item.caption)}</p>

        {item.notes.length > 0 && (
          <ul className="space-y-1 text-[12px] leading-relaxed text-ink/55">
            {item.notes.map((n) => (
              <li key={n.en} className="flex gap-1.5">
                <span aria-hidden="true">·</span>
                <span>{L(n)}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-2">
          <a
            href="#contact"
            className="inv-cta inline-flex max-w-full items-center rounded-full bg-lime px-4 py-2 text-left font-display text-[13px] font-bold text-white transition hover:bg-lime-dark"
          >
            {th ? `ขอใบเสนอราคา ${item.model}` : `Request a quote for ${item.model}`}
          </a>
          {item.source.officialPage && (
            <a
              href={item.source.officialPage}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-display text-[12.5px] font-semibold text-ink/55 transition hover:text-lime"
            >
              {th ? 'หน้าผลิตภัณฑ์ทางการ' : 'Official product page'}
              <ExternalLink size={13} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
