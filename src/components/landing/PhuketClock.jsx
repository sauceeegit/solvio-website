import { useEffect, useRef, useState } from 'react';
import { Sunrise, Sun, Moon } from 'lucide-react';

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
    <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center p-4 sm:p-6">
      <div className="flex origin-center scale-[.7] items-center gap-3 rounded-full bg-ink/55 px-5 py-2.5 ring-1 ring-white/15 backdrop-blur-md lg:scale-100 lg:gap-5 lg:px-10 lg:py-5">
        <Icon className="h-4 w-4 text-lime lg:h-7 lg:w-7" strokeWidth={2} aria-label={label} />
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/70 lg:text-xl">
          Thailand
        </span>
        <span className="font-mono text-base font-semibold tabular-nums text-white sm:text-lg lg:text-4xl">
          {hms}
          <span className="text-white/55">.{cs}</span>
        </span>
      </div>
    </div>
  );
}
