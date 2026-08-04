import { useEffect, useRef, useState } from 'react';
import Reveal from '../Reveal';

const stats = [
  { value: '5,000+', label: 'Happy Customers' },
  { value: '18 MW+', label: 'Installed' },
  { value: '98%', label: 'Customer Satisfaction' },
  { value: '25 Yrs', label: 'Performance Warranty' },
];

// Parse "5,000+" → { num: 5000, suffix: '+', prefix: '', decimals: 0 }
function parse(raw) {
  const clean = raw.replace(/,/g, '');
  const match = clean.match(/^([^0-9]*)([0-9]+(?:\.[0-9]+)?)(.*)$/);
  if (!match) return { num: 0, prefix: '', suffix: raw, decimals: 0 };
  const decimals = match[2].includes('.') ? match[2].split('.')[1].length : 0;
  return { num: parseFloat(match[2]), prefix: match[1], suffix: match[3], decimals };
}

function formatNum(n, decimals) {
  if (decimals > 0) return n.toFixed(decimals);
  return Math.round(n).toLocaleString('en-US');
}

function CountUp({ raw }) {
  const { num, prefix, suffix, decimals } = parse(raw);
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        const duration = 1400;
        const start = performance.now();
        const tick = (now) => {
          const t = Math.min((now - start) / duration, 1);
          // ease out cubic
          const eased = 1 - Math.pow(1 - t, 3);
          setDisplay(eased * num);
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [num]);

  return (
    <span ref={ref}>
      {prefix}{formatNum(display, decimals)}{suffix}
    </span>
  );
}

export default function SocialProof() {
  return (
    <section className="border-y border-ink/[0.07] bg-white pt-4 pb-4 sm:py-10 -mt-px">
      <div className="container-x">
        <Reveal>
          <div className="grid grid-cols-4 gap-3 sm:gap-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-display text-xl font-extrabold sm:text-3xl" style={{ color: '#C29848' }}>
                  <CountUp raw={s.value} />
                </p>
                <p className="mt-1 text-[11px] font-medium leading-tight text-ink/55 sm:text-[13px] sm:leading-normal">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
