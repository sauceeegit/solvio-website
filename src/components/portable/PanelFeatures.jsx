import { asset } from '../../lib/format';
import Reveal from '../Reveal';

// Feature collage — images carry their own baked-in text; we just lay them out
// in the bento and round the corners.
const R = 'rounded-2xl';

export default function PanelFeatures() {
  return (
    <section className="bg-white py-16">
      <div className="container-x">
        <Reveal>
          <div className="grid gap-3 lg:grid-cols-3">
            {/* Left — expandable (wide) + two squares */}
            <div className="flex flex-col gap-3">
              <img
                src={asset('/feat-expandable.jpg')}
                alt="Expandable without limits — add more panels for more power"
                className={`aspect-[2/1] w-full ${R} object-cover`}
              />
              <div className="grid grid-cols-2 gap-3">
                <img
                  src={asset('/feat-multidevice.jpg')}
                  alt="Multi-device charging — USB-A, USB-C and DC5525 ports"
                  className={`aspect-square w-full ${R} object-cover`}
                />
                <img
                  src={asset('/feat-outdoor.jpg')}
                  alt="Outdoor ready — IP65 dust-proof and water-resistant"
                  className={`aspect-square w-full ${R} object-cover`}
                />
              </div>
            </div>

            {/* Center — high-efficient energy conversion */}
            <img
              src={asset('/feat-efficiency.jpg')}
              alt="High-efficient energy conversion — premium panels up to 22%"
              className={`aspect-square w-full ${R} object-cover`}
            />

            {/* Right — portable */}
            <img
              src={asset('/feat-portable.jpg')}
              alt="Portable — integrated carrying handle and magnetic closure"
              className={`aspect-square w-full ${R} object-cover`}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
