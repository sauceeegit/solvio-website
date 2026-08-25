import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials } from '../data/product';
import Stars from './Stars';
import Reveal from './Reveal';
import { useLanguage } from '../context/LanguageContext';

const testimonialsTh = [
  { text: 'ติดตั้งบนราวระเบียงชั้นสามได้คนเดียวใน 25 นาที แอปแสดงกระแสไฟก่อนที่จะเก็บบันไดด้วยซ้ำ' },
  { text: 'เดือนแรกเต็มบันทึกได้ 168 kWh ค่าไฟลดลงเห็นชัด และแผงกระจก-กระจกดูพรีเมียมจริงๆ' },
  { text: 'เราเช่าบ้านเลยต้องการแบบไม่เจาะ ตะขอยึดแน่นโดยไม่แตะตัวอาคาร เจ้าของบ้านไม่ว่าอะไรเลย' },
  { text: 'ติดตั้งง่ายมาก ตัดดาวออกหนึ่งดวงเพราะอยากให้สายไฟ AC ยาวกว่านี้มาในกล่องตั้งแต่แรก' },
  { text: 'จับคู่กับแบต Core 1600 ทำให้ตู้เย็นและเราเตอร์ทำงานต่อในยามเย็นด้วยแสงอาทิตย์จากเมื่อวาน' },
  { text: 'ทีมซัพพอร์ตช่วยลงทะเบียนให้วันอาทิตย์ ปีแรกได้ 920 kWh คืนทุนเร็วกว่าที่สัญญาไว้' },
];

export default function Testimonials() {
  const { lang } = useLanguage();
  const th = lang === 'th';
  const scroller = useRef(null);

  const scrollBy = (dir) => {
    const el = scroller.current;
    if (!el) return;
    const card = el.querySelector('[data-card]');
    const gap = 16;
    const step = card ? card.offsetWidth + gap : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  return (
    <section id="reviews" className="scroll-mt-20 py-20" style={{ backgroundColor: '#f5f5f7' }}>
      <div className="container-x">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <div>
              <p className="eyebrow mb-2">{lang === 'th' ? 'รีวิว' : 'Reviews'}</p>
              <h2 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
                {lang === 'th' ? 'เสียงตอบรับจากผู้ใช้โซลาร์ระเบียง' : <>Loved on balconies<br className="hidden sm:block" /> everywhere.</>}
              </h2>
            </div>
          </div>
        </Reveal>

        <div
          ref={scroller}
          className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2"
        >
          {testimonials.map((t, i) => (
            <figure
              data-card
              key={t.name}
              className="flex w-[85vw] max-w-[340px] shrink-0 snap-start flex-col justify-between rounded-3xl bg-white p-7 sm:w-[320px]"
              style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
            >
              <div>
                <p className="font-display text-[11px] font-semibold uppercase tracking-widest text-ink/40 mb-3">
                  {th ? t.cityTh : t.city}
                </p>
                <blockquote className="font-display text-[1.05rem] font-medium leading-snug text-ink">
                  "{th ? testimonialsTh[i].text : t.text}"
                </blockquote>
              </div>
              <figcaption className="mt-8 flex items-center justify-between">
                <div>
                  <p className="font-display text-sm font-semibold text-ink">{t.name}</p>
                </div>
                <Stars value={t.rating} size={13} />
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Apple-style bottom-right arrows */}
        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={() => scrollBy(-1)}
            className="grid h-10 w-10 place-items-center rounded-full bg-white text-ink shadow-sm transition hover:bg-ink hover:text-white"
            aria-label={th ? 'รีวิวก่อนหน้า' : 'Previous reviews'}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scrollBy(1)}
            className="grid h-10 w-10 place-items-center rounded-full bg-white text-ink shadow-sm transition hover:bg-ink hover:text-white"
            aria-label={th ? 'รีวิวถัดไป' : 'Next reviews'}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
