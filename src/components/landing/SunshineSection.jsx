import { asset } from '../../lib/format';
import Reveal from '../Reveal';

const features = [
  {
    title: 'Plug & Play Simplicity',
    body: 'Install your system in minutes and start generating clean electricity right away.',
  },
  {
    title: 'Lower Your Energy Bills',
    body: 'Use the power of the sun to reduce your monthly electricity costs—every single day.',
  },
  {
    title: 'Premium Black Solar Panels',
    body: 'High-efficiency monocrystalline modules with a sleek all-black design for maximum performance\nand modern aesthetics.',
  },
  {
    title: 'Designed for Every Home',
    body: 'Perfect for balconies, terraces, gardens, apartments, and small outdoor spaces.',
  },
  {
    title: 'Built for Every Season',
    body: 'Engineered to withstand sun, rain, wind, and changing weather for years of dependable performance.',
  },
  {
    title: 'Long-Term Value',
    body: 'Enjoy clean energy, minimal maintenance, and reliable savings for many years to come.',
  },
];

export default function SunshineSection() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container-x">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">

          {/* Image */}
          <Reveal>
            <div className="overflow-hidden rounded-2xl">
              <img
                src={asset('/solvio-savings.webp')}
                alt="Solvio balcony solar system installed on a modern home"
                className="w-full object-cover object-top"
                style={{ maxHeight: '520px' }}
                loading="lazy"
              />
            </div>
          </Reveal>

          {/* Text */}
          <Reveal delay={0.1}>
            <div>
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                Turn Sunshine Into Savings.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink/65">
                Solvio makes solar energy simple. Our premium plug-and-play balcony solar systems let you generate your own clean electricity in minutes—no complicated installation, no expensive renovations, just reliable energy and lower electricity bills.
              </p>

              <ul className="mt-8 space-y-5">
                {features.map((f) => (
                  <li key={f.title} className="flex items-start gap-3.5">
                    {/* Orange circle with white checkmark */}
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-lime">
                      <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
                        <path d="M1 4L4.5 7.5L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <div>
                      <p className="font-display text-[15px] font-bold text-ink">{f.title}</p>
                      <p className="mt-0.5 whitespace-pre-line text-[13px] leading-relaxed text-ink/60">{f.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
