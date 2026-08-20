import { ArrowRight } from 'lucide-react';
import { icons } from '../../lib/icons';
import { community } from '../../data/landing';
import Reveal from '../Reveal';
import { useLanguage } from '../../context/LanguageContext';

const communityTh = [
  { icon: 'UserPlus', title: 'เป็นสมาชิก', sub: 'สะสมเครดิต Solvio ทุกครั้งที่ซื้อและอัปเกรดเป็น PLUS เพื่อรับรางวัลมากขึ้น', cta: 'สมัครฟรี' },
  { icon: 'Share2', title: 'แนะนำเพื่อน', sub: 'ให้เพื่อนส่วนลด 10% สำหรับชุดแรก และรับเงินคืน 5% สำหรับทุกการแนะนำ', cta: 'แชร์ลิงก์ของคุณ' },
  { icon: 'Briefcase', title: 'เป็นพาร์ทเนอร์กับเรา', sub: 'ช่างติดตั้งและตัวแทนจำหน่าย: ร่วมเครือข่ายพาร์ทเนอร์ Solvio และเติบโตไปกับโซลาร์', cta: 'เป็นพาร์ทเนอร์' },
];

export default function Community() {
  const { lang } = useLanguage();
  const items = lang === 'th' ? communityTh : community;
  return (
    <section className="bg-ink py-16 text-white">
      <div className="container-x">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">{lang === 'th' ? 'ร่วมเป็นส่วนหนึ่ง' : 'Join the movement'}</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl" style={{ fontFamily: '"Space Grotesk", system-ui, sans-serif' }}>
              {lang === 'th' ? 'เป็นส่วนหนึ่งของ Solvio' : 'Become part of Solvio'}
            </h2>
            <p className="mt-3 text-white/60">
              {lang === 'th' ? 'มากกว่าร้านค้า — ชุมชนที่ขับเคลื่อนการเปลี่ยนผ่านของไทยสู่พลังงานสะอาด มีที่สำหรับทุกคน' : "More than a store — a community powering Thailand's switch to clean energy. There's a place for everyone."}
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {items.map((c, i) => {
            const Icon = icons[c.icon] ?? icons.Users;
            return (
              <Reveal key={c.title} delay={i * 0.08}>
                <div className="group flex h-full flex-col rounded-xl2 border border-white/10 bg-white/[0.04] p-6 transition hover:border-lime/50 hover:bg-white/[0.07]">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-lime text-ink">
                    <Icon size={22} />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-bold">{c.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-white/60">{c.sub}</p>
                  <a
                    href={`https://wa.me/66843488428?text=${encodeURIComponent(`Hi Solvio — I'd like to: ${c.title}`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center gap-1.5 font-display text-sm font-bold text-lime transition group-hover:gap-2.5"
                  >
                    {c.cta} <ArrowRight size={16} />
                  </a>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
