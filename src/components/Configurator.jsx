import { Check, Plus, Image as ImageIcon } from 'lucide-react';
import { locations, panelOptions, panelThb, storageOptions, cableOptions } from '../data/product';
import { baht, bahtDelta, whFmt } from '../lib/format';
import { useLanguage } from '../context/LanguageContext';

const locationsTh = ['ระเบียง', 'สวน', 'หลังคาแบน', 'ผนังอาคาร'];
const storageSpecsTh = {
  none: ['ส่งพลังงานโซลาร์ตรงสู่กริด', 'ไมโครอินเวอร์เตอร์ 800 W มาตรฐาน', 'เพิ่มแบตเตอรี่ได้ในภายหลัง'],
  venus2: ['4 ช่อง MPPT สูงสุด 2.4 kW', 'อินเวอร์เตอร์ 1500 W ในตัว', 'ควบคุมการส่งไฟเกิน'],
  venus4: ['4 ช่อง MPPT สูงสุด 2.4 kW', 'อินเวอร์เตอร์ 1500 W ในตัว', 'ควบคุมการส่งไฟเกิน'],
  venus6: ['4 ช่อง MPPT สูงสุด 2.4 kW', 'อินเวอร์เตอร์ 1500 W ในตัว', 'ควบคุมการส่งไฟเกิน'],
};

function SectionHead({ step, title, hint, hintMobileHide }) {
  return (
    <div className="mb-3">
      <p className="mb-1 font-display text-sm font-bold uppercase tracking-wider text-lime">{step}</p>
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-display text-base font-bold leading-snug text-ink">{title}</h3>
        {hint && (
          <span className={`shrink-0 font-body text-xs font-medium text-slatey-400 ${hintMobileHide ? 'max-sm:hidden' : ''}`}>
            {hint}
          </span>
        )}
      </div>
    </div>
  );
}

function CableButton({ selected, onClick, opt }) {
  return (
    <button
      onClick={onClick}
      className={`relative flex min-h-[58px] w-full flex-col items-center justify-center rounded-xl border px-3 py-3 text-center transition ${
        selected
          ? 'border-lime bg-lime text-white shadow-sm'
          : 'border-ink/12 bg-white text-ink hover:border-ink/30'
      }`}
    >
      <span className="font-display text-[15px] font-bold leading-tight">{opt.short}</span>
      {opt.price !== 0 && (
        <span className={`mt-0.5 font-body text-xs font-medium leading-none ${selected ? 'text-white/85' : 'text-slatey-400'}`}>
          {bahtDelta(opt.price)}
        </span>
      )}
      {selected && (
        <span className="absolute right-3 top-3 grid h-5 w-5 place-items-center rounded-full bg-white text-lime-dark">
          <Check size={12} strokeWidth={3} />
        </span>
      )}
    </button>
  );
}

function ModuleCard({ selected, onClick, panel }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col overflow-hidden rounded-2xl text-left transition-all duration-200 ${
        selected
          ? 'shadow-[0_0_0_2.5px_#FF6700,0_8px_24px_rgba(0,0,0,0.13)]'
          : 'shadow-[0_1px_6px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)]'
      }`}
    >
      {/* image */}
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        <img loading="lazy" src={panel.img} alt={panel.label} className="h-full w-full object-cover" />
        {/* selected tint */}
        {selected && <div className="absolute inset-0 bg-lime/10 pointer-events-none" />}
        {/* check */}
        <span className={`absolute right-2.5 top-2.5 grid h-6 w-6 place-items-center rounded-full border-2 shadow-sm transition-all ${
          selected ? 'border-lime bg-lime text-white' : 'border-white/80 bg-white/80 text-transparent'
        }`}>
          {selected && <Check size={13} strokeWidth={3} />}
        </span>
      </div>

      {/* info */}
      <div className="flex flex-1 flex-col bg-white p-3.5">
        {/* prominent Wp badge */}
        <span className={`mb-2.5 inline-flex self-start rounded-full px-3 py-1 font-display text-[13px] font-extrabold tracking-tight transition-colors ${
          selected ? 'bg-lime text-white' : 'bg-ink text-white'
        }`}>
          {panel.wp} Wp
        </span>

        <div className="flex items-baseline justify-between gap-1">
          <span className="font-display text-sm font-bold text-ink leading-tight">{panel.label}</span>
          <span className="shrink-0 font-display text-sm font-bold text-ink">{baht(panelThb(panel.id))}</span>
        </div>
        <span className="font-body text-xs text-slatey-600">{panel.sub}</span>
        <span className="mt-2 border-t border-ink/[0.06] pt-2 font-body text-[11px] leading-relaxed text-slatey-600 max-sm:text-[10px]">
          {panel.dims}<br />{panel.weight} · per panel
        </span>
      </div>
    </button>
  );
}

function StorageCard({ selected, onClick, opt, lang }) {
  const hasBattery = opt.wh > 0;
  const th = lang === 'th';
  return (
    <button
      onClick={onClick}
      className={`flex flex-col rounded-xl border p-2 text-left transition max-sm:w-[78%] max-sm:shrink-0 max-sm:snap-start ${
        selected
          ? 'border-lime bg-lime text-white shadow-sm'
          : 'border-ink/12 bg-[#f8fcff] text-ink hover:border-ink/30'
      }`}
    >
      <div className={`relative aspect-[16/10] overflow-hidden rounded-lg border ${selected ? 'border-white/20 bg-white/[0.08]' : 'border-ink/[0.07] bg-[#f8fcff]'}`}>
        <span className={`absolute right-2 top-2 z-10 grid h-5 w-5 place-items-center rounded-full border ${selected ? 'border-white bg-white text-lime-dark' : 'border-ink/20 bg-white/80 text-transparent'}`}>
          <Check size={12} strokeWidth={3} />
        </span>
        {opt.img ? (
          <img loading="lazy" src={opt.img} alt={opt.name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <ImageIcon size={26} className={selected ? 'text-white/25' : 'text-ink/15'} />
          </div>
        )}
      </div>

      <div className={`flex flex-1 flex-col px-1 pt-3 ${selected ? '' : 'bg-[#f8fcff]'}`}>
        {opt.brand && (
          <span className={`font-body text-[11px] font-semibold uppercase tracking-wide ${selected ? 'text-white/55' : 'text-slatey-400'}`}>
            {opt.brand}
          </span>
        )}
        <span className="font-display text-[15px] font-bold leading-tight">{opt.name}</span>

        <ul className={`mt-2 space-y-1 font-body text-xs font-semibold ${selected ? 'text-white/85' : 'text-slatey-500'}`}>
          {opt.specs.map((s) => (
            <li key={s} className="flex gap-1.5">
              <span className={selected ? 'text-white/80' : 'text-lime-dark'}>·</span>
              <span>{s}</span>
            </li>
          ))}
        </ul>

        <div className={`mt-3 flex items-center justify-between border-t pt-2.5 ${selected ? 'border-white/15' : 'border-ink/[0.07]'}`}>
          {hasBattery ? (
            <span className="inline-flex items-center gap-1.5 font-body text-sm font-bold">
              <span className={`grid h-4 w-4 place-items-center rounded-full ${selected ? 'bg-white text-lime-dark' : 'bg-ink text-white'}`}>
                <Plus size={11} strokeWidth={3} />
              </span>
              {whFmt(opt.wh)}
            </span>
          ) : (
            <span className={`font-body text-sm font-medium ${selected ? 'text-white/70' : 'text-slatey-400'}`}>
              {th ? 'ไม่มีแบตเตอรี่' : 'No battery'}
            </span>
          )}
          <span className="font-body text-sm font-semibold">
            {opt.price === 0 ? (th ? 'รวมอยู่แล้ว' : 'Included') : bahtDelta(opt.price)}
          </span>
        </div>
      </div>
    </button>
  );
}

function LocationButton({ selected, onClick, label }) {
  return (
    <button
      onClick={onClick}
      className={`relative flex min-h-[58px] items-center rounded-xl border px-4 py-4 text-left transition ${
        selected
          ? 'border-lime bg-lime text-white shadow-sm'
          : 'border-ink/12 bg-white text-ink hover:border-ink/30'
      }`}
    >
      <span className="font-display text-[15px] font-bold leading-tight">{label}</span>
      {selected && (
        <span className="absolute right-3 top-3 grid h-5 w-5 place-items-center rounded-full bg-white text-lime-dark">
          <Check size={12} strokeWidth={3} />
        </span>
      )}
    </button>
  );
}

export default function Configurator({ config, set }) {
  const { lang } = useLanguage();
  const th = lang === 'th';
  const panel = panelOptions.find((p) => p.id === config.panel) ?? panelOptions[0];

  return (
    <div className="space-y-7">
      <div>
        <SectionHead step={th ? 'ขั้นที่ 1 — ตำแหน่ง' : 'Step 1 — Location'} title={th ? 'คุณต้องการติดตั้งระบบที่ไหน?' : 'Where do you want to install your system?'} hint={th ? 'รวมขาตั้ง' : 'Mount included'} />
        <div className="grid grid-cols-2 gap-2.5">
          {locations.map((l, i) => (
            <LocationButton key={l.id} selected={config.location === l.id} onClick={() => set('location', l.id)} label={th ? locationsTh[i] : l.label} />
          ))}
        </div>
      </div>

      <div>
        <SectionHead step={th ? 'ขั้นที่ 2 — แผง' : 'Step 2 — Module'} title={th ? 'คุณต้องการแผงขนาดและประสิทธิภาพแบบไหน?' : 'What module size and performance do you want to install?'} hint={`${panel.wp} Wp ${th ? 'ต่อแผง' : 'each'}`} hintMobileHide />
        <div className="grid grid-cols-2 gap-2.5">
          {panelOptions.map((p) => (
            <ModuleCard key={p.id} selected={config.panel === p.id} onClick={() => set('panel', p.id)} panel={p} />
          ))}
        </div>
        <div className="mt-2.5 flex items-center justify-between gap-3 rounded-xl border border-ink/12 bg-white px-4 py-3">
          <div>
            <p className="font-display text-sm font-bold text-ink">{th ? 'จำนวนแผง' : 'Number of modules'}</p>
            <p className="font-body text-xs text-slatey-400">{baht(panelThb(panel.id))} {th ? 'ต่อแผง' : 'each'}</p>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => set('modules', Math.max(1, config.modules - 1))}
              aria-label="Remove a module"
              className="grid h-9 w-9 place-items-center rounded-lg border border-ink/12 text-ink transition hover:border-ink/30 disabled:opacity-40"
              disabled={config.modules <= 1}
            >
              −
            </button>
            <input
              type="number"
              min="1"
              inputMode="numeric"
              value={config.modules}
              onChange={(e) => {
                const v = parseInt(e.target.value, 10);
                set('modules', Number.isFinite(v) && v >= 1 ? v : 1);
              }}
              aria-label="Number of modules"
              className="h-9 w-16 rounded-lg border border-ink/12 bg-white text-center font-display text-base font-bold text-ink focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime/40"
            />
            <button
              type="button"
              onClick={() => set('modules', config.modules + 1)}
              aria-label="Add a module"
              className="grid h-9 w-9 place-items-center rounded-lg border border-ink/12 text-ink transition hover:border-ink/30"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div id="cfg-step-3" style={{ scrollMarginTop: 88 }}>
        <SectionHead step={th ? 'ขั้นที่ 3 — แบตเตอรี่' : 'Step 3 — Storage'} title={th ? 'คุณต้องการเพิ่มแบตเตอรี่แบบไหน?' : 'What storage option do you want to add?'} hint={th ? 'ไม่บังคับ' : 'Optional'} />
        <div className="flex snap-x gap-2.5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0">
          {storageOptions.map((s) => {
            const opt = th && storageSpecsTh[s.id] ? { ...s, specs: storageSpecsTh[s.id], name: s.id === 'none' ? 'ไม่มีแบตเตอรี่' : s.name } : s;
            return <StorageCard key={s.id} selected={config.storage === s.id} onClick={() => set('storage', s.id)} opt={opt} lang={lang} />;
          })}
        </div>
      </div>

      <div>
        <SectionHead step={th ? 'ขั้นที่ 4 — สายไฟ AC' : 'Step 4 — AC cable'} title={th ? 'คุณต้องการสายเชื่อม AC แบบไหน?' : 'Which AC connection cable do you need?'} hint={th ? 'เพื่อเข้าถึงเต้าเสียบ' : 'To reach your socket'} />
        <div className="space-y-2.5">
          <div className="grid grid-cols-2 gap-2.5">
            {cableOptions.filter((c) => c.id !== 'none').map((c) => (
              <CableButton key={c.id} selected={config.cable === c.id} onClick={() => set('cable', c.id)} opt={c} />
            ))}
          </div>
          {cableOptions.filter((c) => c.id === 'none').map((c) => (
            <CableButton key={c.id} selected={config.cable === c.id} onClick={() => set('cable', c.id)} opt={c} />
          ))}
        </div>
      </div>
    </div>
  );
}
