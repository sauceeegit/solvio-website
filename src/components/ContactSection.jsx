import { useState } from 'react';
import { Mail, Phone, MapPin, MessageCircle, Send, Check } from 'lucide-react';
import Reveal from './Reveal';

// Where every enquiry is sent.
const SALES_EMAIL = 'sales@solvio.solar';
const WHATSAPP = 'https://wa.me/66843488428';
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
  const [sent, setSent] = useState(false);

  const toggleInterest = (v) =>
    setInterests((prev) => (prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]));

  const submit = (e) => {
    e.preventDefault();
    // At least one reachable contact is required: a valid email OR a messaging ID.
    if (!email.trim() && !imId.trim()) {
      setError('Please add your email or a LINE/Telegram ID so we can reply.');
      return;
    }
    setError('');
    const body = [
      `Name: ${name}`,
      `Email: ${email || '—'}`,
      `${imApp} ID: ${imId || '—'}`,
      `Phone: ${phone ? `${dialCode} ${phone}${whatsapp ? ' (WhatsApp)' : ''}` : '—'}`,
      `Property type: ${propertyType}`,
      `Interested in: ${interests.length ? interests.join(', ') : '—'}`,
      '',
      message,
    ].join('\n');
    const subject = `Website enquiry${name ? ` — ${name}` : ''}`;
    window.location.href = `mailto:${SALES_EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const fieldCls =
    'w-full rounded-xl border border-ink/12 bg-white px-4 py-3 font-body text-sm text-ink placeholder:text-slatey-400 focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime/40';

  return (
    <section id="contact" className="scroll-mt-20 bg-[#FFF7E9] py-20">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Left — heading + direct contact details */}
          <Reveal>
            <p className="eyebrow">Get in touch</p>
            <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Talk to a Solvio solar advisor
            </h2>
            <p className="mt-3 max-w-md text-slatey-500">
              Tell us about your home or business and what you&apos;re looking for. We&apos;ll get
              back to you with honest, no-pressure advice.
            </p>

            <ul className="mt-8 space-y-4 text-sm">
              <li className="flex items-center gap-3 text-ink/80">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-lime/10 text-lime-dark">
                  <Mail size={18} />
                </span>
                <a href={`mailto:${SALES_EMAIL}`} className="font-semibold hover:text-lime-dark">
                  {SALES_EMAIL}
                </a>
              </li>
              <li className="flex items-center gap-3 text-ink/80">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-lime/10 text-lime-dark">
                  <Phone size={18} />
                </span>
                <a href="tel:+66843488428" className="font-semibold hover:text-lime-dark">
                  +66 84 348 8428
                </a>
              </li>
              <li className="flex items-center gap-3 text-ink/80">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-lime/10 text-lime-dark">
                  <MessageCircle size={18} />
                </span>
                <a href={WHATSAPP} target="_blank" rel="noreferrer" className="font-semibold hover:text-lime-dark">
                  Chat on WhatsApp
                </a>
              </li>
              <li className="flex items-center gap-3 text-ink/80">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-lime/10 text-lime-dark">
                  <MapPin size={18} />
                </span>
                Patongo, Pa Tong, Kathu District, Phuket 83150
              </li>
            </ul>

            {/* Map to our address */}
            <a
              href={MAP_LINK}
              target="_blank"
              rel="noreferrer"
              className="mt-6 block overflow-hidden rounded-xl2 border border-ink/[0.07] shadow-soft"
            >
              <iframe
                title="Solvio Solar location"
                src={MAP_EMBED}
                className="block aspect-[16/10] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </a>
          </Reveal>

          {/* Right — form */}
          <Reveal delay={0.1}>
            <div className="rounded-xl2 border border-ink/[0.07] bg-white p-6 shadow-soft sm:p-8">
              {sent ? (
                <div className="flex h-full flex-col items-center justify-center py-10 text-center">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-lime/15 text-lime-dark">
                    <Check size={28} strokeWidth={3} />
                  </span>
                  <h3 className="mt-4 font-display text-xl font-bold text-ink">Thanks — message ready to send</h3>
                  <p className="mt-2 max-w-sm text-sm text-slatey-500">
                    We&apos;ve opened your email app with everything filled in. Just hit send and
                    our team will be in touch shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="mt-5 font-display text-sm font-semibold text-lime-dark hover:underline"
                  >
                    ← Edit your details
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
                      <label className="mt-2 flex items-center gap-2 text-xs font-medium text-slatey-500">
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
                        <span className="font-normal text-slatey-400">or </span>Email
                      </label>
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" className={fieldCls} />
                    </div>
                    <div>
                      <label className="mb-1.5 block font-display text-sm font-semibold text-ink">
                        <span className="font-normal text-slatey-400">or </span>LINE / Telegram ID
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
                  <p className="-mt-2 text-xs text-slatey-400">
                    Add your email or a LINE/Telegram ID — whichever you prefer we reply on.
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
                              : 'border-ink/12 text-ink/70 hover:border-ink/30'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block font-display text-sm font-semibold text-ink">
                      Interested in <span className="font-normal text-slatey-400">· choose any</span>
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
                              active ? 'border-lime bg-lime text-white' : 'border-ink/12 text-ink/70 hover:border-ink/30'
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
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-lime px-6 py-3.5 font-display text-base font-bold text-white transition hover:bg-lime-dark"
                  >
                    Send message <Send size={16} />
                  </button>
                  <p className="text-center font-display text-sm font-semibold text-lime-dark">
                    We will get in touch within 1 hour
                  </p>
                  <p className="text-center text-xs text-slatey-400">
                    Your details are sent straight to {SALES_EMAIL}. We never share them.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
