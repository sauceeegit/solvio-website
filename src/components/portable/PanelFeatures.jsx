import { asset } from '../../lib/format';
import Reveal from '../Reveal';
import { useLanguage } from '../../context/LanguageContext';

// Feature collage — images carry their own baked-in text; we just lay them out
// in the bento and round the corners.
const R = 'rounded-2xl';

export default function PanelFeatures() {
  const { lang } = useLanguage();
  const th = lang === 'th';
  return (
    <section className="bg-white py-16">
      <div className="container-x">
        <Reveal>
          <div className="grid gap-3 lg:grid-cols-3">
            {/* Left — expandable (wide) + two squares */}
            <div className="flex flex-col gap-3">
              <img loading="lazy"
                src={asset('/feat-expandable.jpg')}
                alt={th ? 'ขยายได้ไม่จำกัด — เพิ่มแผงเพื่อเพิ่มพลังงาน' : 'Expandable without limits — add more panels for more power'}
                className={`aspect-[2/1] w-full ${R} object-cover`}
              />
              <div className="grid grid-cols-2 gap-3">
                <img loading="lazy"
                  src={asset('/feat-multidevice.jpg')}
                  alt={th ? 'ชาร์จหลายอุปกรณ์ — พอร์ต USB-A, USB-C และ DC5525' : 'Multi-device charging — USB-A, USB-C and DC5525 ports'}
                  className={`aspect-square w-full ${R} object-cover`}
                />
                <img loading="lazy"
                  src={asset('/feat-outdoor.jpg')}
                  alt={th ? 'พร้อมใช้งานกลางแจ้ง — กันฝุ่นและน้ำระดับ IP65' : 'Outdoor ready — IP65 dust-proof and water-resistant'}
                  className={`aspect-square w-full ${R} object-cover`}
                />
              </div>
            </div>

            {/* Center — high-efficient energy conversion */}
            <img loading="lazy"
              src={asset('/feat-efficiency.jpg')}
              alt={th ? 'แปลงพลังงานประสิทธิภาพสูง — แผงพรีเมียมสูงสุด 22%' : 'High-efficient energy conversion — premium panels up to 22%'}
              className={`aspect-square w-full ${R} object-cover`}
            />

            {/* Right — portable */}
            <img loading="lazy"
              src={asset('/feat-portable.jpg')}
              alt={th ? 'พกพาได้ — มีหูหิ้วในตัวและตัวล็อกแม่เหล็ก' : 'Portable — integrated carrying handle and magnetic closure'}
              className={`aspect-square w-full ${R} object-cover`}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
