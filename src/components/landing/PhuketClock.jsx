import { useEffect, useRef, useState } from 'react';
import { Sunrise, Sun, Moon } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const timeFmt = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Bangkok',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
});

const hourFmt = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Bangkok',
  hour: '2-digit',
  hourCycle: 'h23',
});

// Pick the time-of-day symbol for the current Phuket hour.
function periodIcon(now) {
  const hour = parseInt(hourFmt.format(now), 10);
  if (hour >= 5 && hour < 12) return { Icon: Sunrise, label: 'Morning' };
  if (hour >= 12 && hour < 18) return { Icon: Sun, label: 'Afternoon' };
  return { Icon: Moon, label: 'Night' };
}

// Live digital clock showing Phuket (Asia/Bangkok, UTC+7) time to the
// centisecond, overlaid at the bottom of the hero video. Twice as large on
// desktop. Updates via requestAnimationFrame so the milliseconds animate.
export default function PhuketClock() {
  const { lang } = useLanguage();
  const [now, setNow] = useState(() => new Date());
  const raf = useRef();

  useEffect(() => {
    const tick = () => {
      setNow(new Date());
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  const hms = timeFmt.format(now);
  // milliseconds are timezone-independent — take the first 2 digits (centiseconds)
  const cs = String(Math.floor(now.getMilliseconds() / 10)).padStart(2, '0');
  const { Icon, label } = periodIcon(now);

  return (
    <div className="pointer-events-none shrink-0">
      <div className="flex items-center gap-2 rounded-full bg-ink/55 px-3 py-1.5 ring-1 ring-white/15 backdrop-blur-md">
        <Icon className="h-3 w-3 text-lime" strokeWidth={2} aria-label={label} />
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/70">
          {lang === 'th' ? 'ประเทศไทย' : 'Thailand'}
        </span>
        <span className="font-mono text-sm font-semibold tabular-nums text-white">
          {hms}
          <span className="text-white/55">.{cs}</span>
        </span>
      </div>
    </div>
  );
}
