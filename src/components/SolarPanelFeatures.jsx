import Reveal from './Reveal';
import { asset } from '../lib/format';

const features = [
  {
    id: 'aesthetics',
    img: asset('/sp-feature-1.png'),
    imgAlt: 'Solvio Dark Feather solar roof on a modern Thai villa at sunset',
    aspect: 'aspect-[3/2]',
    imageSide: 'left',
    title: 'The Perfect Fusion of Aesthetics and Technology',
    body: 'Efficiency meets elegance. The Solvio Dark Feather turns clean energy into a design statement.',
  },
  {
    id: 'lightweight',
    img: asset('/sp-feature-2.png'),
    imgAlt: 'Close-up of the thin, lightweight Solvio Dark Feather panel',
    aspect: 'aspect-[4/3]',
    imageSide: 'right',
    title: "So light, your roof won't feel it.",
    body: 'Weight only 6kg/m² and 4.5mm thick.',
  },
];

export default function SolarPanelFeatures() {
  return (
    <section className="bg-white">
      <div className="container-x">
        {features.map((f, i) => (
          <Reveal key={f.id}>
            <div
              className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-14 ${
                i === 0 ? 'pt-12 pb-6 sm:pt-16 sm:pb-8' : 'pt-6 pb-12 sm:pt-8 sm:pb-16'
              }`}
            >
              {/* image */}
              <div
                className={`overflow-hidden rounded-xl2 shadow-soft ${f.aspect} ${
                  f.imageSide === 'right' ? 'lg:order-2' : ''
                }`}
              >
                <img src={f.img} alt={f.imgAlt} className="h-full w-full object-cover" />
              </div>

              {/* text */}
              <div className={f.imageSide === 'right' ? 'lg:order-1' : ''}>
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
