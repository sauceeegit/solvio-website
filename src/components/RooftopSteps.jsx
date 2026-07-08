import { useEffect, useState } from 'react';
import { ArrowRight, Check, MapPin, CalendarClock, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { asset } from '../lib/format';
import Reveal from './Reveal';

const MAP_LINK = 'https://maps.app.goo.gl/yhFAgAq24a4oU1cx8';
const MAP_EMBED = 'https://maps.google.com/maps?q=7.8894748,98.3009435&z=16&output=embed';
const WA_BOOK = `https://wa.me/66843488428?text=${encodeURIComponent(
  "Hi Solvio — I'd like to book a 15-minute consultation call.",
)}`;

const STEPS = [
  { n: 1, title: 'Request a free consultation', color: '#FF6700', type: 'contact' },
  { n: 2, title: 'Site survey & custom design', color: '#FF6700', desc: 'We inspect your roof and design a custom system.', img: '/rooftop-step2.webp' },
  { n: 3, title: 'Choose payment or financing', color: '#FF6700', type: 'payment' },
  { n: 4, title: 'Permits & grid application', color: '#1C4537', desc: 'We handle ERC and PEA/MEA permits and paperwork.', img: '/rooftop-step4.webp' },
  { n: 5, title: 'Professional installation', color: '#1C4537', desc: 'Certified techs install panels, inverter & wiring.', img: '/rooftop-step5.webp', note: 'Depends on size — most installs finish in 1–2 days on average.' },
  { n: 6, title: 'Connection, testing & handover', color: '#1C4537', desc: 'Meter change, testing, app setup, and full handover.', img: '/rooftop-step6.webp' },
  { n: 7, title: 'Warranty & maintenance', color: '#F4B740', dark: true, desc: 'Monitoring, cleaning, and responsive warranty care.', img: '/rooftop-step7.webp' },
];

// Thai bank brand colours (text chips — real logos can be dropped in later).
const BANKS = [
  { name: 'Krungthai', color: '#01A4E4' },
  { name: 'SCB', color: '#4E2E7F' },
  { name: 'Kasikorn', color: '#138F2D' },
  { name: 'GSB', color: '#EB1F8E' },
];

function StepImage({ src, alt }) {
  return (
    <div className="mt-3 overflow-hidden rounded-lg">
      <img loading="lazy" src={asset(src)} alt={alt} className="aspect-[3/4] w-full object-cover" />
    </div>
  );
}

function ContactOptions({ onVisit }) {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  return (
    <div className="mt-3 space-y-2">
      {sent ? (
        <p className="flex items-center gap-1.5 rounded-lg border border-lime/40 bg-lime/10 px-3 py-2 text-xs font-semibold text-lime-dark">
          <Check size={13} strokeWidth={3} /> Thanks — we&apos;ll be in touch.
        </p>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (email) setSent(true);
          }}
          className="flex items-center gap-1.5 rounded-lg border border-ink/15 bg-white p-1 pl-3"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            className="w-full min-w-0 bg-transparent text-xs text-ink placeholder:text-slatey-400 focus:outline-none"
          />
          <button type="submit" aria-label="Send email" className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-lime text-white transition hover:bg-lime-dark">
            <ArrowRight size={14} />
          </button>
        </form>
      )}
      <a href={WA_BOOK} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-lg border border-ink/12 px-3 py-2 text-xs font-semibold text-ink transition hover:border-lime hover:text-lime-dark">
        <CalendarClock size={14} className="shrink-0 text-lime-dark" /> Book a 15-min call
      </a>
      <button type="button" onClick={onVisit} className="flex w-full items-center gap-2 rounded-lg border border-ink/12 px-3 py-2 text-left text-xs font-semibold text-ink transition hover:border-lime hover:text-lime-dark">
        <MapPin size={14} className="shrink-0 text-lime-dark" /> Or visit us
      </button>
    </div>
  );
}

function PaymentOptions() {
  return (
    <div className="mt-3 space-y-2">
      <div className="rounded-lg border border-ink/12 px-3 py-2 text-xs font-semibold text-ink">
        Pay in full <span className="font-normal text-slatey-400">· cash discount</span>
      </div>
      <div className="rounded-lg border border-ink/12 px-3 py-2 text-xs font-semibold text-ink">
        Installment plan <span className="font-normal text-slatey-400">· 0% interest</span>
      </div>
      <div className="rounded-lg border border-ink/12 px-3 py-2">
        <p className="text-xs font-semibold text-ink">Bank loan — we help you apply</p>
        <div className="mt-1.5 flex flex-wrap gap-1">
          {BANKS.map((b) => (
            <span key={b.name} className="rounded px-1.5 py-0.5 text-[10px] font-bold text-white" style={{ backgroundColor: b.color }}>
              {b.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function RooftopSteps() {
  const [mapOpen, setMapOpen] = useState(false);

  useEffect(() => {
    if (!mapOpen) return undefined;
    const onKey = (e) => e.key === 'Escape' && setMapOpen(false);
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [mapOpen]);

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container-x">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">How it works</p>
            <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Your 7 steps to going solar
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ol className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-7">
            {STEPS.map((s) => (
              <li key={s.n} className="flex flex-col rounded-xl2 border border-ink/[0.1] bg-white p-4 shadow-sm">
                <span
                  className="grid h-10 w-10 place-items-center rounded-full font-display text-base font-bold"
                  style={{ backgroundColor: s.color, color: s.dark ? '#0C1E1A' : '#FFFFFF' }}
                >
                  {s.n}
                </span>
                <h3 className="mt-3 font-display text-sm font-bold leading-snug text-ink">{s.title}</h3>
                {s.desc && <p className="mt-1.5 text-xs leading-relaxed text-slatey-500">{s.desc}</p>}

                {s.type === 'contact' && <ContactOptions onVisit={() => setMapOpen(true)} />}
                {s.type === 'payment' && <PaymentOptions />}
                {s.img && <StepImage src={s.img} alt={s.title} />}
                {s.note && (
                  <p className="mt-3 rounded-lg bg-[#FFF1E8] px-3 py-2 text-xs font-medium text-[#B84D00]">
                    {s.note}
                  </p>
                )}
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mx-auto mt-12 flex max-w-3xl flex-col items-center justify-between gap-4 rounded-xl2 bg-[#FFF1E8] px-6 py-5 text-center sm:flex-row sm:text-left">
            <p className="font-display font-semibold text-[#B84D00]">
              Ready to go solar? Get your free consultation from Solvio today.
            </p>
            <a href="tel:+66843488428" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-lime px-6 py-3 font-display text-sm font-bold text-white transition hover:bg-lime-dark">
              Free consultation <ArrowRight size={16} />
            </a>
          </div>
        </Reveal>
      </div>

      {/* Visit-us map popup */}
      <AnimatePresence>
        {mapOpen && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/70 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMapOpen(false)}
          >
            <motion.div
              className="relative w-full max-w-lg overflow-hidden rounded-xl2 bg-white shadow-lift"
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ type: 'spring', damping: 24, stiffness: 280 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-5 py-3">
                <p className="inline-flex items-center gap-2 font-display text-sm font-bold text-ink">
                  <MapPin size={16} className="text-lime-dark" /> Visit Solvio Solar
                </p>
                <button type="button" onClick={() => setMapOpen(false)} aria-label="Close" className="grid h-8 w-8 place-items-center rounded-full text-ink/60 transition hover:bg-ink/[0.06]">
                  <X size={18} />
                </button>
              </div>
              <iframe
                title="Solvio Solar location"
                src={MAP_EMBED}
                className="aspect-[4/3] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="px-5 py-3">
                <a href={MAP_LINK} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 font-display text-sm font-bold text-lime-dark hover:underline">
                  Open in Google Maps <ArrowRight size={15} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
