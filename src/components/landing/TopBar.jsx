import { Phone, CalendarCheck } from 'lucide-react';
import { topBar } from '../../data/landing';

function Social({ label, href = '#', children }) {
  const external = href.startsWith('http');
  return (
    <a
      href={href}
      aria-label={label}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="grid h-7 w-7 place-items-center rounded-md bg-white/15 text-white transition hover:bg-white/25"
    >
      {children}
    </a>
  );
}

export default function TopBar() {
  return (
    <div className="bg-ink text-white">
      <div className="container-x flex flex-wrap items-center justify-between gap-3 py-2.5">
        <div className="flex items-center gap-3">
          <a
            href={`tel:${topBar.phone.replace(/\s/g, '')}`}
            className="inline-flex items-center gap-2 rounded-full bg-lime px-3.5 py-1.5 font-display text-sm font-bold text-ink"
          >
            <Phone size={14} /> {topBar.phone}
          </a>
          <button className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3.5 py-1.5 font-display text-sm font-semibold text-white transition hover:bg-white/10">
            <CalendarCheck size={14} className="text-lime" />
            <span className="hidden sm:inline">{topBar.cta}</span>
            <span className="sm:hidden">Book a call</span>
          </button>
        </div>
        <div className="flex items-center gap-2">
          <Social label="WhatsApp" href="https://wa.me/66843488428">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.978-1.105zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
          </Social>
          <Social label="Facebook">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </Social>
        </div>
      </div>
    </div>
  );
}
