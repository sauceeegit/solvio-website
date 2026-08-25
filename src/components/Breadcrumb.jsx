import { ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const crumbs = ['Home', 'Balcony solar', 'Balcony Solar'];
const crumbsTh = ['หน้าแรก', 'โซลาร์ระเบียง', 'Balcony Solar'];

export default function Breadcrumb() {
  const { lang } = useLanguage();
  const items = lang === 'th' ? crumbsTh : crumbs;
  return (
    <div className="container-x py-3">
      <nav className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-slatey-400">
        {items.map((c, i) => (
          <span key={c} className="flex items-center gap-1.5">
            <span className={i === crumbs.length - 1 ? 'text-ink' : 'transition hover:text-ink'}>
              {c}
            </span>
            {i < items.length - 1 && <ChevronRight size={12} />}
          </span>
        ))}
      </nav>
    </div>
  );
}
