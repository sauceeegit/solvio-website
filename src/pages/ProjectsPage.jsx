import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { X, ChevronLeft, ChevronRight, MapPin, Zap, ArrowRight } from 'lucide-react';
import MediaLoader from '../components/MediaLoader';
import { rooftopVideo, rooftopVideoPoster } from '../data/landing';
import { AnimatePresence, motion } from 'framer-motion';
import Header from '../components/landing/Header';
import Footer from '../components/Footer';
import ContactSection from '../components/ContactSection';
import Reveal from '../components/Reveal';
import { asset } from '../lib/format';
import { usePageMeta } from '../hooks/usePageMeta';

// Reference projects delivered with our manufacturing partner (Cando Solar).
// Photos extracted from the partner project deck — see /public/projects.
const CATEGORIES = ['All', 'Rooftop', 'Curved roof', 'Facade', 'BIPV', 'Infrastructure', 'Product range'];
const CATEGORIES_TH = ['ทั้งหมด', 'หลังคา', 'หลังคาโค้ง', 'ผนังอาคาร', 'BIPV', 'โครงสร้างพื้นฐาน', 'ผลิตภัณฑ์'];

const PROJECTS = [
  {
    id: 'zenith',
    title: 'Zenith Steel Group',
    place: 'Changzhou, Jiangsu',
    scale: '68 MW installed',
    cat: 'Rooftop',
    blurb:
      'A multi-scenario installation combining ground-mount, rooftop and facade PV across a working steel plant. Over 50 MW delivered in 2025 alone, with more under design and construction.',
    blurbTh: 'การติดตั้งหลายรูปแบบผสมผสานระหว่างกราวด์เมาท์ หลังคา และผนังอาคาร PV ในโรงงานเหล็กที่ยังดำเนินการอยู่ ส่งมอบกว่า 50 MW ในปี 2568 เพียงปีเดียว พร้อมส่วนที่กำลังออกแบบและก่อสร้างเพิ่มเติม',
    tags: ['Ground + Rooftop + Facade', 'Since 2022'],
    tagsTh: ['กราวด์ + หลังคา + ผนัง', 'ตั้งแต่ปี 2565'],
    images: ['proj-zenith-1', 'proj-zenith-2', 'proj-zenith-3'],
    featured: true,
  },
  {
    id: 'ci-rooftop',
    title: 'Commercial & Industrial rooftops',
    place: 'Changzhou & Guangdong Yunfu',
    scale: '7.43 MW + 6.2 MW',
    cat: 'Rooftop',
    blurb:
      'Large-span factory rooftops fitted with ultra-lightweight Firm-Light modules — full production capacity turned into generating capacity without structural reinforcement.',
    blurbTh: 'หลังคาโรงงานขนาดใหญ่ติดตั้งโมดูล Firm-Light น้ำหนักเบาพิเศษ แปลงกำลังการผลิตเต็มรูปแบบให้เป็นกำลังผลิตไฟฟ้า โดยไม่ต้องเสริมโครงสร้าง',
    tags: ['Firm-Light PV', 'C&I'],
    tagsTh: ['Firm-Light PV', 'อุตสาหกรรม-พาณิชย์'],
    images: ['proj-ci-rooftop-1', 'proj-ci-rooftop-2'],
    featured: true,
  },
  {
    id: 'granary',
    title: 'Curved granary rooftop',
    place: 'Shiyan, Hubei',
    scale: '2.55 MW',
    cat: 'Curved roof',
    blurb:
      'Extra-long-span curved granary roofs covered edge to edge. No roof reinforcement required, with an anti-dust surface suited to grain handling.',
    blurbTh: 'หลังคาโค้งโกดังข้าวช่วงกว้างพิเศษ คลุมจากขอบถึงขอบ ไม่ต้องเสริมโครงสร้างหลังคา พร้อมผิวกันฝุ่นเหมาะกับพื้นที่จัดเก็บธัญพืช',
    tags: ['Curved rooftop', 'No reinforcement'],
    tagsTh: ['หลังคาโค้ง', 'ไม่ต้องเสริมโครงสร้าง'],
    images: ['proj-granary-1', 'proj-granary-2'],
  },
  {
    id: 'coalshed',
    title: 'Curved coal shed rooftop',
    place: 'Yulin, Shaanxi',
    scale: '2.1 MW',
    cat: 'Curved roof',
    blurb:
      'Flexible modules laid across deeply curved industrial shed roofs — surfaces conventional rigid panels simply cannot follow.',
    blurbTh: 'โมดูลยืดหยุ่นปูบนหลังคาโค้งลึกของโรงงานอุตสาหกรรม พื้นผิวที่แผงแข็งทั่วไปไม่สามารถตามได้',
    tags: ['Curved rooftop', 'Industrial'],
    tagsTh: ['หลังคาโค้ง', 'อุตสาหกรรม'],
    images: ['proj-coalshed-1', 'proj-coalshed-2', 'proj-coalshed-3'],
  },
  {
    id: 'opple',
    title: 'Opple factory rooftop',
    place: 'Zhongshan, Guangdong',
    scale: 'Patterned PV',
    cat: 'Rooftop',
    blurb:
      'Patented PV pattern technology: fully customisable module patterns and graphics with minimal loss of efficiency — branding and generation on the same roof.',
    blurbTh: 'เทคโนโลยีลวดลาย PV สิทธิบัตร: ปรับแต่งลวดลายและกราฟิกโมดูลได้อย่างสมบูรณ์ สูญเสียประสิทธิภาพน้อยที่สุด — แบรนด์และการผลิตไฟบนหลังคาเดียวกัน',
    tags: ['Patented pattern tech', 'Customisable'],
    tagsTh: ['เทคโนโลยีลวดลายสิทธิบัตร', 'ปรับแต่งได้'],
    images: ['proj-opple-1'],
  },
  {
    id: 'pattern-residential',
    title: 'Residential & transport PV',
    place: 'Maoshan Changzhou · Meizhou Guangdong',
    scale: 'Pattern series',
    cat: 'Rooftop',
    blurb:
      'The same patterned-module technology applied to residential rooftops and to transport infrastructure land alongside a motorway interchange.',
    blurbTh: 'เทคโนโลยีโมดูลลวดลายเดียวกันนำไปใช้กับหลังคาที่พักอาศัยและโครงสร้างพื้นฐานการขนส่งข้างทางแยกทางหลวง',
    tags: ['Residential', 'Transportation'],
    tagsTh: ['ที่พักอาศัย', 'การขนส่ง'],
    images: ['proj-pattern-residential-1', 'proj-transport-1', 'proj-transport-2'],
  },
  {
    id: 'facade',
    title: 'Solar facade (BAPV)',
    place: 'Jiujiang, Jiangxi · Jintan, Changzhou',
    scale: 'Vertical arrays',
    cat: 'Facade',
    blurb:
      'Vertically installed modules that turn whole building elevations into generating surfaces — maximising use of facade area where roof space runs out.',
    blurbTh: 'โมดูลติดตั้งแนวตั้งที่เปลี่ยนผนังอาคารทั้งหมดให้เป็นพื้นผิวผลิตไฟฟ้า ใช้ประโยชน์สูงสุดจากพื้นที่ผนังเมื่อพื้นที่หลังคาไม่เพียงพอ',
    tags: ['Vertical install', 'Government project'],
    tagsTh: ['ติดตั้งแนวตั้ง', 'โครงการภาครัฐ'],
    images: ['proj-facade-1', 'proj-facade-2', 'proj-facade-3'],
  },
  {
    id: 'greenhouse',
    title: 'BIPV greenhouse',
    place: 'Agricultural PV',
    scale: 'Dual-value output',
    cat: 'BIPV',
    blurb:
      'Transparent bifacial panels balance daylight for the crops inside with clean power generated outside — agriculture and energy from the same footprint, with zero extra land.',
    blurbTh: 'แผงโปร่งแสงสองหน้าสร้างสมดุลแสงธรรมชาติสำหรับพืชภายในกับพลังงานสะอาดที่ผลิตได้ภายนอก เกษตรกรรมและพลังงานจากพื้นที่เดียวกัน โดยไม่ใช้ที่ดินเพิ่ม',
    tags: ['Transparent bifacial', 'Agri-PV'],
    tagsTh: ['แผงโปร่งแสงสองหน้า', 'เกษตร-PV'],
    images: ['proj-greenhouse-1', 'proj-greenhouse-2', 'proj-greenhouse-3'],
  },
  {
    id: 'walkway',
    title: 'Hospital glass walkway',
    place: 'Kunshan Hospital, Suzhou',
    scale: '4–6 kg/m²',
    cat: 'BIPV',
    blurb:
      'Firm-Light PV bonded onto a glass hospital walkway using a glue-and-rail mounting system — zero disruption to daily operations and no added load risk.',
    blurbTh: 'PV Firm-Light ติดบนทางเดินกระจกโรงพยาบาลด้วยระบบกาวและรางยึด ไม่รบกวนการดำเนินงานประจำวัน และไม่เพิ่มความเสี่ยงด้านน้ำหนัก',
    tags: ['Public building', 'Zero load risk'],
    tagsTh: ['อาคารสาธารณะ', 'ไม่เพิ่มน้ำหนัก'],
    images: ['proj-walkway-1'],
  },
  {
    id: 'streetlight',
    title: 'Solar street lighting',
    place: 'Guangxi',
    scale: 'Municipal scale',
    cat: 'Infrastructure',
    blurb:
      'Firm-Light modules integrated directly into street-light systems — a self-powered lighting solution that cuts the urban carbon footprint.',
    blurbTh: 'โมดูล Firm-Light รวมเข้ากับระบบไฟถนนโดยตรง เป็นโซลูชันไฟถนนพลังงานตัวเองที่ลดรอยเท้าคาร์บอนในเมือง',
    tags: ['Municipal', 'Integrated lighting'],
    tagsTh: ['ระดับเทศบาล', 'ไฟรวมระบบ'],
    images: ['proj-streetlight-1', 'proj-streetlight-2', 'proj-streetlight-3'],
  },
  {
    id: 'fence',
    title: 'PV fence series',
    place: 'Product range',
    scale: '>90% bifacial',
    cat: 'Product range',
    blurb:
      'N-type bifacial fencing that generates all day: busbar-free design for less shading and better crack resistance, with a temperature coefficient as low as 0.24%.',
    blurbTh: 'รั้วสองหน้า N-type ผลิตไฟตลอดวัน ออกแบบไร้บัสบาร์เพื่อลดเงาและเพิ่มความทนทานต่อรอยแตก ค่าสัมประสิทธิ์อุณหภูมิต่ำถึง 0.24%',
    tags: ['N-type', 'Busbar-free'],
    tagsTh: ['N-type', 'ไร้บัสบาร์'],
    images: ['proj-fence-1', 'proj-fence-2', 'proj-fence-3'],
  },
  {
    id: 'canopy',
    title: 'PV sunshade & canopy',
    place: 'Product range',
    scale: 'Customisable',
    cat: 'Product range',
    blurb:
      'Waterproof, UV- and impact-resistant canopies in customisable colours — load-bearing, wind-resistant, and able to power signage and entrance lighting.',
    blurbTh: 'หลังคากันสาดกันน้ำ ทน UV และทนแรงกระแทก ปรับแต่งสีได้ — รับน้ำหนักได้ ทนลม และจ่ายไฟให้ป้ายและไฟทางเข้าได้',
    tags: ['Weatherproof', 'Load-bearing'],
    tagsTh: ['กันสภาพอากาศ', 'รับน้ำหนักได้'],
    images: ['proj-canopy-1', 'proj-canopy-2'],
  },
];

const STATS = [
  { value: '68 MW', label: 'Single-client installed capacity', labelTh: 'กำลังติดตั้งลูกค้ารายเดียว' },
  { value: '50 MW+', label: 'Delivered in 2025', labelTh: 'ส่งมอบในปี 2568' },
  { value: '4–6 kg/m²', label: 'Firm-Light module weight', labelTh: 'น้ำหนักโมดูล Firm-Light' },
  { value: '12+', label: 'Project types delivered', labelTh: 'ประเภทโครงการที่ส่งมอบ' },
];

// Full-screen image viewer with keyboard + arrow navigation.
function Lightbox({ project, index, onClose, onPrev, onNext }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, onPrev, onNext]);

  const many = project.images.length > 1;

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex flex-col bg-ink/95 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="flex items-start justify-between gap-4 px-5 py-4 text-white">
        <div className="min-w-0">
          <p className="font-display text-base font-bold">{project.title}</p>
          <p className="truncate text-sm text-white/60">
            {project.place} · {project.scale}
            {many && ` · ${index + 1}/${project.images.length}`}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-white/80 transition hover:bg-white/10"
        >
          <X size={22} />
        </button>
      </div>

      <div className="relative flex flex-1 items-center justify-center px-4 pb-6" onClick={(e) => e.stopPropagation()}>
        <img
          loading="lazy"
          src={asset(`/projects/${project.images[index]}.webp`)}
          alt={`${project.title} — ${project.place}`}
          className="max-h-full max-w-full rounded-xl2 object-contain"
        />
        {many && (
          <>
            <button
              type="button"
              onClick={onPrev}
              aria-label="Previous photo"
              className="absolute left-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white/30 sm:left-6"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              type="button"
              onClick={onNext}
              aria-label="Next photo"
              className="absolute right-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white/30 sm:right-6"
            >
              <ChevronRight size={22} />
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
}

function ProjectCard({ project, onOpen, lang }) {
  const th = lang === 'th';
  return (
    <button
      type="button"
      onClick={() => onOpen(project, 0)}
      className={`group flex h-full w-full flex-col overflow-hidden rounded-xl2 border border-ink/[0.07] bg-white text-left shadow-soft transition hover:shadow-lift ${
        project.featured ? 'sm:col-span-2' : ''
      }`}
    >
      <div className="relative aspect-video w-full overflow-hidden">
        <img
          loading="lazy"
          src={asset(`/projects/${project.images[0]}.webp`)}
          alt={`${project.title} — ${project.place}`}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-lime px-3 py-1 font-display text-[11px] font-bold uppercase tracking-wide text-white">
          {project.cat}
        </span>
        {project.images.length > 1 && (
          <span className="absolute right-4 top-4 rounded-full bg-ink/70 px-2.5 py-1 font-mono text-[11px] font-medium text-white backdrop-blur">
            {project.images.length} photos
          </span>
        )}
        <div className="absolute inset-x-0 bottom-0 p-4">
          <p className="font-display text-lg font-extrabold leading-tight text-white sm:text-xl">
            {project.title}
          </p>
          <p className="mt-0.5 flex items-center gap-1.5 text-[13px] font-medium text-white/80">
            <MapPin size={13} className="shrink-0" /> {project.place}
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-lime/10 px-3 py-1 font-display text-xs font-bold text-lime-dark">
          <Zap size={12} /> {project.scale}
        </span>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-slatey-500">{th ? project.blurbTh : project.blurb}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {(th ? project.tagsTh : project.tags).map((t) => (
            <span key={t} className="rounded-full border border-ink/12 px-2.5 py-1 text-[11px] font-semibold text-ink/60">
              {t}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}

export default function ProjectsPage() {
  usePageMeta('/projects');
  const { lang } = useLanguage();
  const videoRef = useRef(null);
  const [videoReady, setVideoReady] = useState(false);
  const [cat, setCat] = useState('All');

  useEffect(() => {
    const v = videoRef.current;
    if (v) { v.muted = true; v.play?.().catch(() => {}); if (v.readyState >= 2) setVideoReady(true); }
  }, []);
  const [view, setView] = useState(null); // { project, index }

  const shown = cat === 'All' ? PROJECTS : PROJECTS.filter((p) => p.cat === cat);

  const open = (project, index) => setView({ project, index });
  const close = () => setView(null);
  const step = (d) =>
    setView((v) =>
      v ? { ...v, index: (v.index + d + v.project.images.length) % v.project.images.length } : v,
    );

  return (
    <div id="top" className="min-h-screen bg-surface">
      <Header />
      <main>
        {/* Hero — full-bleed video with text overlay */}
        <section className="relative w-full">
          <div className="relative w-full overflow-hidden bg-ink" style={{ height: '82svh', minHeight: 480 }}>
            <video
              ref={videoRef}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${videoReady ? 'opacity-100' : 'opacity-0'}`}
              src={rooftopVideo}
              poster={rooftopVideoPoster}
              autoPlay loop muted playsInline preload="metadata"
              onLoadedData={() => setVideoReady(true)}
              onCanPlay={() => setVideoReady(true)}
            />
            <MediaLoader show={!videoReady} label="Loading video" />
            <div className="pointer-events-none absolute inset-0 z-10">
              <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/50 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink/80 via-ink/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 container-x pb-[clamp(1.25rem,4vw,3.5rem)]">
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-white/70">{lang === 'th' ? 'ผลงาน' : 'Projects'}</p>
                <h1 className="mt-2 font-display text-[clamp(1.5rem,3.5vw,3rem)] font-extrabold leading-[1.1] tracking-tight text-white max-w-2xl" style={{ fontFamily: '"Space Grotesk", system-ui, sans-serif' }}>
                  {lang === 'th' ? 'โซลาร์ที่เข้ากับทุกพื้นผิว' : 'Solar that fits anything it touches.'}
                </h1>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">
                  {lang === 'th' ? 'โรงงานเหล็ก หลังคาโค้ง ทางเดินโรงพยาบาล เรือนกระจก และถนนในเมือง — ส่งมอบร่วมกับพันธมิตรผู้ผลิตของเรา' : 'Steel plants, curved granary roofs, hospital walkways, greenhouses and city streets — delivered with our manufacturing partner.'}
                </p>
                <a href="#contact" className="mt-5 inline-flex items-center gap-2 rounded-full bg-lime px-6 py-3 font-display text-sm font-bold text-white transition hover:bg-lime-dark">
                  {lang === 'th' ? 'พูดคุยเกี่ยวกับโครงการของคุณ' : 'Discuss your project'} <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </div>
          <div style={{ backgroundColor: '#040f08' }}>
            <div className="container-x">
              <dl className="grid grid-cols-2 gap-x-6 gap-y-8 border-t border-white/10 py-10 lg:grid-cols-4">
                {STATS.map((s) => (
                  <div key={s.label}>
                    <dt className="font-display text-3xl font-extrabold text-lime sm:text-4xl">{s.value}</dt>
                    <dd className="mt-1.5 text-sm leading-snug text-white/60">{lang === 'th' ? s.labelTh : s.label}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* Filter + grid */}
        <section className="bg-surface py-14 sm:py-16">
          <div className="container-x">
            <Reveal>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((c, ci) => {
                  const active = c === cat;
                  return (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCat(c)}
                      className={`rounded-full border px-4 py-2 font-display text-sm font-semibold transition ${
                        active
                          ? 'border-lime bg-lime text-white shadow-soft'
                          : 'border-ink/12 bg-white text-ink/70 hover:border-ink/30'
                      }`}
                    >
                      {lang === 'th' ? CATEGORIES_TH[ci] : c}
                    </button>
                  );
                })}
              </div>
            </Reveal>

            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {shown.map((p, i) => (
                <Reveal key={p.id} delay={Math.min(i * 0.05, 0.3)}>
                  <ProjectCard project={p} onOpen={open} lang={lang} />
                </Reveal>
              ))}
            </div>

            <p className="mt-10 max-w-3xl text-xs leading-relaxed text-slatey-400">
              {lang === 'th'
                ? 'โครงการอ้างอิงที่ส่งมอบโดยพันธมิตรผู้ผลิตของ Solvio รูปภาพและกำลังการผลิตมาจากผู้ผลิตและแสดงเพื่อสาธิตเทคโนโลยีและขอบเขตการใช้งาน'
                : "Reference projects delivered by Solvio's manufacturing partner. Photos and capacities are supplied by the manufacturer and shown to illustrate the technology and the range of applications it suits."}
            </p>
          </div>
        </section>

        <ContactSection />
      </main>
      <Footer />

      <AnimatePresence>
        {view && (
          <Lightbox
            project={view.project}
            index={view.index}
            onClose={close}
            onPrev={() => step(-1)}
            onNext={() => step(1)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
