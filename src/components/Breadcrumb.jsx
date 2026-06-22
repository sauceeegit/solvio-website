import { ChevronRight } from 'lucide-react';

const crumbs = ['Home', 'Balcony solar', 'Balcony System'];

export default function Breadcrumb() {
  return (
    <div className="container-x py-3">
      <nav className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-slatey-400">
        {crumbs.map((c, i) => (
          <span key={c} className="flex items-center gap-1.5">
            <span className={i === crumbs.length - 1 ? 'text-ink' : 'transition hover:text-ink'}>
              {c}
            </span>
            {i < crumbs.length - 1 && <ChevronRight size={12} />}
          </span>
        ))}
      </nav>
    </div>
  );
}
