import Reveal from './Reveal';
import { asset } from '../lib/format';

const features = [
  {
    id: 'aesthetics',
    img: asset('/sp-feature-house.webp'),
    imgAlt: 'Modern home with Solvio Black Feather solar panels on the roof and balcony railing',
    aspect: 'aspect-[3/2]',
    imageSide: 'left',
    valign: 'center',
    title: 'The Black Feather. Made for Real Homes.',
    body: 'All-black, ultra-slim, and built to complement your home — not just sit on top of it. Solar that looks like it belongs.',
  },
  {
    id: 'lightweight',
    img: asset('/sp-feature-2.webp'),
    imgAlt: 'Close-up of the thin, lightweight Solvio Dark Feather panel',
    aspect: 'aspect-[4/3]',
    objectPos: 'object-[50%_72%]',
    imageSide: 'right',
    valign: 'start',
    title: "So light, your roof won't feel it.",
    body: 'Weight only 6kg/m² and 4.5mm thick.',
  },
];

export default function SolarPanelFeatures() {
  return (
    <section className="bg-white">
      {/* Full-bleed intro banner (full composed artwork) above the first row.
          Mobile uses a portrait version; desktop uses the wide banner. */}
      <Reveal>
        <picture>
          <source media="(min-width: 640px)" srcSet={asset('/sp-feature-top.webp')} />
          <img loading="lazy"
            src={asset('/sp-feature-top-mobile.webp')}
            alt="Solvio Dark Feather — Ultra Black, Ultra Thin, Ultra Light"
            className="block w-full"
          />
        </picture>
      </Reveal>

      <div className="container-x">
        {features.map((f, i) => (
          <Reveal key={f.id}>
            <div
              className={`grid gap-8 lg:grid-cols-2 lg:gap-14 ${
                f.valign === 'start' ? 'items-center lg:items-start' : 'items-center'
              } ${i === 0 ? 'pt-8 pb-2 sm:pt-10 sm:pb-3' : 'pt-2 pb-12 sm:pt-3 sm:pb-16'}`}
            >
              {/* image */}
              <div
                className={`overflow-hidden rounded-xl2 shadow-soft ${f.aspect} ${
                  f.imageSide === 'right' ? 'lg:order-2' : ''
                }`}
              >
                <img loading="lazy"
                  src={f.img}
                  alt={f.imgAlt}
                  className={`h-full w-full object-cover ${f.objectPos || ''}`}
                />
              </div>

              {/* text */}
              <div
                className={`${f.imageSide === 'right' ? 'lg:order-1' : ''} ${
                  f.valign === 'start' ? 'lg:pt-8' : ''
                }`}
              >
                <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-price sm:text-4xl">
                  {f.title}
                </h2>
                <p className="mt-5 max-w-md text-lg text-slatey-500">{f.body}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
