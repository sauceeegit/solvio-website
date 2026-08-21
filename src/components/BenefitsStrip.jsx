import { icons } from '../lib/icons';
import { benefits } from '../data/product';
import Reveal from './Reveal';
import { useLanguage } from '../context/LanguageContext';

const benefitsTh = [
  { title: 'คืนสินค้า 30 วัน', sub: 'เปลี่ยนใจ? ส่งคืนได้ฟรี' },
  { title: 'จัดส่งใน 5–7 วัน', sub: 'ติดตามพัสดุได้ คาร์บอนนิวทรัล' },
  { title: 'ประหยัดได้ถึง ฿8,000/ปี', sub: 'ชุด 1.8 kWp หันทิศใต้ ใช้ไฟที่บ้าน' },
  { title: 'คืนทุน 5–7 ปี', sub: 'หลังจากนั้นเป็นไฟฟ้าฟรี' },
  { title: 'ผ่อน 0%', sub: 'แบ่ง 24 งวด ไม่มีดอกเบี้ย' },
  { title: 'รับประกัน 30 ปี', sub: 'ประสิทธิภาพและโครงสร้างแผง' },
];

export default function BenefitsStrip() {
  const { lang } = useLanguage();
  const th = lang === 'th';
  return (
    <section className="border-y border-ink/[0.07] bg-white">
      <div className="container-x grid grid-cols-2 gap-x-6 gap-y-7 py-10 md:grid-cols-3 lg:grid-cols-6">
        {benefits.map((b, i) => {
          const Icon = icons[b.icon] ?? icons.Check;
          const label = th ? benefitsTh[i] : b;
          return (
            <Reveal key={b.title} delay={i * 0.07}>
              <div className="flex flex-col items-center gap-2 text-center">
                <span className="grid h-14 w-14 place-items-center rounded-full border-2 border-lime bg-white text-lime">
                  <Icon size={26} />
                </span>
                <p className="font-display text-sm font-bold text-ink">{label.title}</p>
                <p className="text-xs leading-snug text-slatey-700">{label.sub}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
