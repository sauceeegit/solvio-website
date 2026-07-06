import Reveal from './Reveal';
import { asset } from '../lib/format';

const features = [
  {
    id: 'aesthetics',
    img: asset('/sp-feature-1.webp'),
    imgAlt: 'Solvio Dark Feather solar roof on a modern Thai villa at sunset',
    aspect: 'aspect-[3/2]',
    imageSide: 'left',
    valign: 'center',
    title: 'The Perfect Fusion of Aesthetics and Technology',
    body: 'Efficiency meets elegance. The Solvio Dark Feather turns clean energy into a design statement.',
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
      {/* Full-bleed intro banner (full composed artwork) above the first row. */}
      <Reveal>
        <img
          src={asset('/sp-feature-top.webp')}
          alt="Solvio Dark Feather — Ultra Black, Ultra Thin, Ultra Light"
          className="block w-full"
        />
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
                <img
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
                <h2 className="font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-ink sm:text-4xl lg:text-5xl">
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
