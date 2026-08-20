import { useState } from 'react';
import { Mail, Phone, MapPin, MessageCircle, Send, Check } from 'lucide-react';
import Reveal from './Reveal';
import { asset } from '../lib/format';
import { useLanguage } from '../context/LanguageContext';

const contactCopy = {
  en: {
    eyebrow: 'Get in touch',
    heading: <>Talk to a Solvio<br />solar advisor</>,
    tagline: "Tell us about your home or business and what you're looking for. We'll get back to you with honest, no-pressure advice.",
    whatsapp: 'Chat on WhatsApp',
  },
  th: {
    eyebrow: 'ติดต่อเรา',
    heading: <>พูดคุยกับที่ปรึกษา<br />โซลาร์ของ Solvio</>,
    tagline: 'บอกเราเกี่ยวกับบ้านหรือธุรกิจของคุณและสิ่งที่คุณต้องการ เราจะติดต่อกลับด้วยคำแนะนำที่ซื่อสัตย์โดยไม่มีแรงกดดัน',
    whatsapp: 'แชทบน WhatsApp',
  },
};

// Where every enquiry is sent.
const SALES_EMAIL = 'sales@solvio.solar';
// The form delivers here (the inbox that owns the Web3Forms access key below).
const FORM_INBOX = 'info@solvio.solar';
const WHATSAPP = 'https://wa.me/66843488428';

// Web3Forms delivers the contact form straight to FORM_INBOX with no backend
// (static site). Get a free access key at https://web3forms.com by verifying
// info@solvio.solar, then set VITE_WEB3FORMS_KEY (or paste it below). Until a
// real key is set, submit shows a "email us directly" fallback (never opens the
// visitor's mail client).
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || 'YOUR_WEB3FORMS_ACCESS_KEY';
// Our Phuket location (place "Solvio Solar").
const MAP_LINK = 'https://maps.app.goo.gl/ffZ6JUvEEBZjsb3g9';
const MAP_EMBED = 'https://maps.google.com/maps?q=7.8894748,98.3009435&z=16&output=embed';

const PROPERTY_TYPES = ['Residential', 'Commercial'];
const INTERESTS = ['Rooftop', 'Balcony', 'Portable'];

// Country dial codes for the phone field (Thailand first / default).
const DIAL_CODES = [
  { code: '+66', label: '🇹🇭 Thailand' },
  { code: '+1', label: '🇺🇸 USA / Canada' },
  { code: '+44', label: '🇬🇧 UK' },
  { code: '+61', label: '🇦🇺 Australia' },
  { code: '+49', label: '🇩🇪 Germany' },
  { code: '+33', label: '🇫🇷 France' },
  { code: '+31', label: '🇳🇱 Netherlands' },
  { code: '+41', label: '🇨🇭 Switzerland' },
  { code: '+46', label: '🇸🇪 Sweden' },
  { code: '+7', label: '🇷🇺 Russia' },
  { code: '+86', label: '🇨🇳 China' },
  { code: '+81', label: '🇯🇵 Japan' },
  { code: '+82', label: '🇰🇷 South Korea' },
  { code: '+852', label: '🇭🇰 Hong Kong' },
  { code: '+65', label: '🇸🇬 Singapore' },
  { code: '+60', label: '🇲🇾 Malaysia' },
  { code: '+62', label: '🇮🇩 Indonesia' },
  { code: '+63', label: '🇵🇭 Philippines' },
  { code: '+84', label: '🇻🇳 Vietnam' },
  { code: '+855', label: '🇰🇭 Cambodia' },
  { code: '+856', label: '🇱🇦 Laos' },
  { code: '+95', label: '🇲🇲 Myanmar' },
  { code: '+91', label: '🇮🇳 India' },
  { code: '+971', label: '🇦🇪 UAE' },
];

// Site-wide contact form. Rendered at the foot of every page; the footer
// "Contact" link scrolls here via the #contact anchor. With no backend yet, the
// form opens the visitor's mail client pre-addressed to sales@solvio.solar with
// all fields filled in — swap in a real form endpoint later if desired.
export default function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [imApp, setImApp] = useState('LINE'); // messaging app: LINE or Telegram
  const [imId, setImId] = useState('');
  const [dialCode, setDialCode] = useState('+66');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState(false);
  const [propertyType, setPropertyType] = useState('Residential');
  const [interests, setInterests] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const { lang } = useLanguage();
  const ct = contactCopy[lang] || contactCopy.en;

  const toggleInterest = (v) =>
    setInterests((prev) => (prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]));

  const submit = async (e) => {
    e.preventDefault();
    // At least one reachable contact is required: a valid email OR a messaging ID.
    if (!email.trim() && !imId.trim()) {
      setError('Please add your email or a LINE/Telegram ID so we can reply.');
      return;
    }
    setError('');
    setSending(true);
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Website enquiry${name ? ` — ${name}` : ''}`,
          from_name: name || 'Solvio website visitor',
          // Web3Forms uses `email` as reply-to; fall back so it always validates.
          email: email || FORM_INBOX,
          Name: name,
          Email: email || '—',
          [`${imApp} ID`]: imId || '—',
          Phone: phone ? `${dialCode} ${phone}${whatsapp ? ' (WhatsApp)' : ''}` : '—',
          'Property type': propertyType,
          'Interested in': interests.length ? interests.join(', ') : '—',
          Message: message || '—',
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSent(true);
      } else {
        setError(
          `Sorry — the message didn't go through. Please email us directly at ${FORM_INBOX}.`,
        );
      }
    } catch {
      setError(
        `Sorry — the message didn't go through. Please email us directly at ${FORM_INBOX}.`,
      );
    } finally {
      setSending(false);
    }
  };

  const fieldCls =
    'w-full rounded-xl border border-ink/12 bg-white px-4 py-3 font-body text-[15px] text-ink placeholder:text-ink/55 focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime/40';

  return (
    <section id="contact" className="scroll-mt-20" style={{ backgroundColor: '#fafafa' }}>
      {/* Main grid — photo left, form right */}
      <div className="container-x py-20">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10 lg:items-stretch">

          {/* Left — white card with text on left, photo on right */}
          <Reveal className="h-full">
            <div className="relative flex h-full overflow-hidden rounded-3xl bg-white shadow-lift">
              {/* Photo — desktop only (hidden on mobile so text has full width) */}
              <img
                src={asset('/contact-advisor.webp')}
                alt="Solvio solar advisor"
                className="absolute inset-0 h-full w-full object-cover object-center max-lg:hidden"
              />
              {/* white fade on left so text stays readable — desktop only */}
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent max-lg:hidden" style={{ width: '65%' }} />
              <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent max-lg:hidden" />

              {/* Text content — full width on mobile, 52% on desktop */}
              <div className="relative z-10 flex w-full flex-col justify-between p-8 lg:w-[52%] lg:p-10">
                {/* top */}
                <div>
                  <p className="eyebrow font-bold">{ct.eyebrow}</p>
                  <h2 className="mt-2 text-2xl font-bold leading-tight tracking-tight text-price sm:text-3xl" style={{ fontFamily: '"Space Grotesk", system-ui, sans-serif' }}>
                    {ct.heading}
                  </h2>
                  <p className="mt-3 text-[14px] leading-relaxed text-ink/80">
                    {ct.tagline}
                  </p>
                </div>

                {/* bottom — contacts pinned to bottom of card */}
                <ul className="space-y-4 text-sm mt-8">
                  <li className="flex items-center gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-white" style={{ backgroundColor: '#1d3d2e' }}>
                      <Mail size={17} />
                    </span>
                    <a href={`mailto:${SALES_EMAIL}`} className="font-semibold text-ink/85 hover:text-lime-dark">
                      {SALES_EMAIL}
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-white" style={{ backgroundColor: '#1d3d2e' }}>
                      <Phone size={17} />
                    </span>
                    <a href="tel:+66843488428" className="font-semibold text-ink/85 hover:text-lime-dark">
                      +66 84 348 8428
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-white" style={{ backgroundColor: '#1d3d2e' }}>
                      <MessageCircle size={17} />
                    </span>
                    <a href={WHATSAPP} target="_blank" rel="noreferrer" className="font-semibold text-ink/85 hover:text-lime-dark">
                      {ct.whatsapp}
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-white" style={{ backgroundColor: '#1d3d2e' }}>
                      <MapPin size={17} />
                    </span>
                    <span className="font-semibold text-ink/85">Patongo, Pa Tong,<br />Kathu District, Phuket 83150</span>
                  </li>
                </ul>
              </div>
            </div>
          </Reveal>

          {/* Right — form */}
          <Reveal delay={0.1}>
            <div className="rounded-3xl border border-ink/[0.07] bg-white p-6 shadow-soft sm:p-8">
              {sent ? (
                <div className="flex h-full flex-col items-center justify-center py-10 text-center">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-lime/15 text-lime-dark">
                    <Check size={28} strokeWidth={3} />
                  </span>
                  <h3 className="mt-4 font-display text-xl font-bold text-ink">Thanks — message sent</h3>
                  <p className="mt-2 max-w-sm text-sm text-ink/70">
                    Your enquiry is on its way to our team. We&apos;ll get back to you within an hour.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="mt-5 font-display text-sm font-semibold text-lime-dark hover:underline"
                  >
                    ← Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-5">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block font-display text-sm font-semibold text-ink">Name</label>
                      <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className={fieldCls} />
                    </div>
                    <div>
                      <label className="mb-1.5 block font-display text-sm font-semibold text-ink">Phone number</label>
                      <div className="flex gap-2">
                        <select
                          value={dialCode}
                          onChange={(e) => setDialCode(e.target.value)}
                          aria-label="Country code"
                          className="w-[5.5rem] shrink-0 rounded-xl border border-ink/12 bg-white px-2 py-3 font-body text-sm text-ink focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime/40"
                        >
                          {DIAL_CODES.map((c) => (
                            <option key={c.code} value={c.code} title={c.label}>
                              {`${c.label.split(' ')[0]} ${c.code}`}
                            </option>
                          ))}
                        </select>
                        <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="81 234 5678" className={fieldCls} />
                      </div>
                      <label className="mt-2 flex items-center gap-2 text-xs font-medium text-ink/75">
                        <input
                          type="checkbox"
                          checked={whatsapp}
                          onChange={(e) => setWhatsapp(e.target.checked)}
                          className="h-4 w-4 rounded border-ink/25 text-lime accent-lime focus:ring-lime/40"
                        />
                        WhatsApp is enabled on this number
                      </label>
                    </div>
                  </div>

                  {/* Email + a messaging ID share a row; at least one is required. */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block font-display text-sm font-semibold text-ink">
                        <span className="font-normal text-ink/70">or </span>Email
                      </label>
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" className={fieldCls} />
                    </div>
                    <div>
                      <label className="mb-1.5 block font-display text-sm font-semibold text-ink">
                        <span className="font-normal text-ink/70">or </span>LINE / Telegram ID
                      </label>
                      <div className="flex gap-2">
                        <select
                          value={imApp}
                          onChange={(e) => setImApp(e.target.value)}
                          aria-label="Messaging app"
                          className="w-[6.5rem] shrink-0 rounded-xl border border-ink/12 bg-white px-2 py-3 font-body text-sm text-ink focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime/40"
                        >
                          <option value="LINE">LINE</option>
                          <option value="Telegram">Telegram</option>
                        </select>
                        <input value={imId} onChange={(e) => setImId(e.target.value)} placeholder="Your ID" className={fieldCls} />
                      </div>
                    </div>
                  </div>
                  <p className="-mt-2 text-xs text-ink/75">
                    Add your email or a LINE/Telegram ID — whichever you prefer, we reply on.
                  </p>

                  <div>
                    <label className="mb-1.5 block font-display text-sm font-semibold text-ink">Property type</label>
                    <div className="flex flex-wrap gap-2">
                      {PROPERTY_TYPES.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setPropertyType(t)}
                          className={`rounded-full border px-4 py-2 font-display text-sm font-semibold transition ${
                            propertyType === t
                              ? 'border-lime bg-lime text-white'
                              : 'border-ink/12 text-ink/80 hover:border-ink/30'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block font-display text-sm font-semibold text-ink">
                      Interested in <span className="font-normal text-ink/70">· choose any</span>
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {INTERESTS.map((t) => {
                        const active = interests.includes(t);
                        return (
                          <button
                            key={t}
                            type="button"
                            onClick={() => toggleInterest(t)}
                            className={`flex items-center justify-center gap-1.5 rounded-full border px-2 py-2 text-center font-display text-sm font-semibold transition ${
                              active ? 'border-lime bg-lime text-white' : 'border-ink/12 text-ink/80 hover:border-ink/30'
                            }`}
                          >
                            {active && <Check size={14} strokeWidth={3} className="shrink-0" />}
                            {t} Solar
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block font-display text-sm font-semibold text-ink">Message</label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                      placeholder="Tell us a little about your roof, balcony or energy needs…"
                      className={`${fieldCls} resize-none`}
                    />
                  </div>

                  {error && (
                    <p className="rounded-lg bg-red-50 px-3 py-2 text-center text-sm font-medium text-red-600">
                      {error}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={sending}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-lime px-6 py-3.5 font-display text-base font-bold text-white transition hover:bg-lime-dark disabled:opacity-70"
                  >
                    {sending ? 'Sending…' : 'Send message'} <Send size={16} />
                  </button>
                  <p className="text-center font-display text-sm font-semibold text-lime-dark">
                    We will get in touch within 1 hour
                  </p>
                  <p className="text-center text-xs text-ink/70">
                    Your details are sent straight to {FORM_INBOX}. We never share them.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>

      {/* Map strip — full width below the grid */}
      <a
        href={MAP_LINK}
        target="_blank"
        rel="noreferrer"
        className="relative block overflow-hidden border-t border-ink/[0.06]"
        aria-label="View Solvio on Google Maps"
      >
        <iframe
          title="Solvio Solar location"
          src={MAP_EMBED}
          className="block h-64 w-full border-0 sm:h-80"
          style={{ filter: 'grayscale(100%) contrast(0.9) brightness(1.05)' }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        {/* Custom orange pin overlaid at the map centre (embed always centres on the coords) */}
        <span
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2"
          style={{ marginTop: '-44px' }}
          aria-hidden="true"
        >
          <svg width="36" height="48" viewBox="0 0 36 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 0C8.059 0 0 8.059 0 18c0 12.75 18 30 18 30s18-17.25 18-30C36 8.059 27.941 0 18 0z" fill="#FF6700"/>
            <circle cx="18" cy="18" r="7" fill="white"/>
          </svg>
        </span>
      </a>
    </section>
  );
}
