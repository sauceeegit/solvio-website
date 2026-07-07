import { useState } from 'react';
import { ArrowRight, Mail, Phone, MapPin } from 'lucide-react';
import Logo from './Logo';

const cols = [
  { title: 'Products', links: ['Balcony Duo', 'Balcony System', 'Balcony Max', 'Core batteries', 'Accessories'] },
  { title: 'Learn', links: ['How it works', 'Savings calculator', 'Installation guide', 'Solar blog', 'Reviews'] },
  { title: 'Company', links: ['About Solvio', 'Sustainability', 'Careers', 'Press', 'Partners'] },
  { title: 'Support', links: ['Help centre', 'Track order', 'Returns', 'Warranty', 'Contact'] },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <footer className="bg-ink text-white">
      <div className="container-x py-16">
        <div className="grid gap-8 border-b border-white/10 pb-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h3 className="font-display text-2xl font-extrabold tracking-tight">
              Get sunnier inbox energy
            </h3>
            <p className="mt-2 max-w-md text-white/60">
              Solar tips, product drops and the occasional discount. No spam, unsubscribe anytime.
            </p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (email) setSent(true);
            }}
            className="flex w-full max-w-md gap-2 lg:ml-auto"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="w-full rounded-full border border-white/15 bg-white/5 px-5 py-3.5 text-sm text-white placeholder:text-white/40 focus:border-lime focus:outline-none"
            />
            <button
              type="submit"
              className="flex shrink-0 items-center gap-2 rounded-full bg-lime px-5 py-3.5 font-display text-sm font-bold text-white transition hover:bg-lime-dark"
            >
              {sent ? 'Subscribed' : 'Join'} <ArrowRight size={16} />
            </button>
          </form>
        </div>

        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <Logo dark />
            <ul className="mt-5 space-y-2 text-sm text-white/60">
              <li className="flex items-center gap-2">
                <Phone size={15} className="text-lime" /> +66 84 348 8428
              </li>
              <li className="flex items-center gap-2">
                <Mail size={15} className="text-lime" /> hello@solvio.solar
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={15} className="text-lime" /> Patongo, Pa Tong, Phuket, Thailand, 83150
              </li>
            </ul>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <p className="font-mono text-[11px] uppercase tracking-wider text-white/40">
                {c.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-white/65 transition hover:text-lime">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="font-mono text-xs text-white/40">
            © {new Date().getFullYear()} Solvio Solar GmbH. All rights reserved.
          </p>
          <div className="flex gap-5 font-mono text-xs text-white/40">
            <a href="#" className="hover:text-white">Imprint</a>
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
