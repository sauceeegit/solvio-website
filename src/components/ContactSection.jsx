import { useState } from 'react';
import { Mail, Phone, MapPin, MessageCircle, Send, Check } from 'lucide-react';
import Reveal from './Reveal';

// Where every enquiry is sent.
const SALES_EMAIL = 'sales@solvio.solar';
const WHATSAPP = 'https://wa.me/66843488428';

const PROPERTY_TYPES = ['Residential', 'Commercial'];
const INTERESTS = ['Rooftop', 'Balcony', 'Portable'];

// Site-wide contact form. Rendered at the foot of every page; the footer
// "Contact" link scrolls here via the #contact anchor. With no backend yet, the
// form opens the visitor's mail client pre-addressed to sales@solvio.solar with
// all fields filled in — swap in a real form endpoint later if desired.
export default function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [propertyType, setPropertyType] = useState('Residential');
  const [interests, setInterests] = useState([]);
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const toggleInterest = (v) =>
    setInterests((prev) => (prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]));

  const submit = (e) => {
    e.preventDefault();
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
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
                      <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+66 ..." className={fieldCls} />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block font-display text-sm font-semibold text-ink">Email</label>
                    <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" className={fieldCls} />
                  </div>

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
                    <div className="flex flex-wrap gap-2">
                      {INTERESTS.map((t) => {
                        const active = interests.includes(t);
                        return (
                          <button
                            key={t}
                            type="button"
                            onClick={() => toggleInterest(t)}
                            className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 font-display text-sm font-semibold transition ${
                              active ? 'border-lime bg-lime text-white' : 'border-ink/12 text-ink/70 hover:border-ink/30'
                            }`}
                          >
                            {active && <Check size={14} strokeWidth={3} />}
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

                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-lime px-6 py-3.5 font-display text-base font-bold text-white transition hover:bg-lime-dark"
                  >
                    Send message <Send size={16} />
                  </button>
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
