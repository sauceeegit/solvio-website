import { Truck, Percent, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const items = [
  { icon: Truck, text: 'Free carbon-neutral shipping', textTh: 'จัดส่งฟรี ลดคาร์บอน' },
  { icon: Percent, text: '0% financing over 24 months', textTh: 'ผ่อน 0% นาน 24 เดือน' },
  { icon: ShieldCheck, text: '30-year performance warranty', textTh: 'รับประกันประสิทธิภาพ 30 ปี' },
];

export default function AnnouncementBar() {
  const { lang } = useLanguage();
  return (
    <div className="bg-ink text-white">
      <div className="container-x flex h-9 items-center justify-center gap-8 overflow-hidden">
        {items.map(({ icon: Icon, text, textTh }, i) => (
          <span
            key={text}
            className={`flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-white/80 ${
              i > 0 ? 'hidden sm:flex' : ''
            }`}
          >
            <Icon size={13} className="text-lime" />
            {lang === 'th' ? textTh : text}
          </span>
        ))}
      </div>
    </div>
  );
}
