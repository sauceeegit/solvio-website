import { Truck, Percent, ShieldCheck } from 'lucide-react';

const items = [
  { icon: Truck, text: 'Free carbon-neutral shipping' },
  { icon: Percent, text: '0% financing over 24 months' },
  { icon: ShieldCheck, text: '30-year performance warranty' },
];

export default function AnnouncementBar() {
  return (
    <div className="bg-ink text-white">
      <div className="container-x flex h-9 items-center justify-center gap-8 overflow-hidden">
        {items.map(({ icon: Icon, text }, i) => (
          <span
            key={text}
            className={`flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-white/80 ${
              i > 0 ? 'hidden sm:flex' : ''
            }`}
          >
            <Icon size={13} className="text-lime" />
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
