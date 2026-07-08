import { Check, Plus, Image as ImageIcon } from 'lucide-react';
import { locations, panelOptions, panelThb, storageOptions, cableOptions } from '../data/product';
import { baht, bahtDelta, whFmt } from '../lib/format';

function SectionHead({ step, title, hint }) {
  return (
    <div className="mb-3">
      <p className="mb-1 font-display text-sm font-bold uppercase tracking-wider text-lime">{step}</p>
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-display text-base font-bold leading-snug text-ink">{title}</h3>
        {hint && <span className="shrink-0 font-body text-xs font-medium text-slatey-400">{hint}</span>}
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
      className={`flex flex-col overflow-hidden rounded-xl border text-left transition ${
        selected ? 'border-lime-dark ring-1 ring-lime/50' : 'border-ink/10 hover:border-ink/25'
      }`}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-surface">
        <img src={panel.img} alt={panel.label} className="h-full w-full object-cover" />
        <span className="absolute left-2 top-2 rounded-full bg-ink/85 px-2 py-0.5 font-body text-[10px] font-semibold text-lime backdrop-blur">
          {panel.wp} Wp
        </span>
        <span className={`absolute right-2 top-2 grid h-5 w-5 place-items-center rounded-full border ${selected ? 'border-lime-dark bg-lime-dark text-white' : 'border-white/70 bg-white/80 text-transparent'}`}>
          {selected && <Check size={12} strokeWidth={3} />}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-3 bg-white">
        <div className="flex items-baseline justify-between gap-2">
          <span className="font-display text-sm font-bold text-ink">{panel.label}</span>
          <span className="font-body text-xs font-semibold text-ink">{baht(panelThb(panel.id))}</span>
        </div>
        <span className="font-body text-xs text-slatey-500">{panel.sub}</span>
        <span className="mt-2 border-t border-ink/[0.06] pt-2 font-body text-xs font-medium leading-relaxed text-slatey-500">
          {panel.dims}<br />{panel.weight} · per panel
        </span>
      </div>
    </button>
  );
}

function StorageCard({ selected, onClick, opt }) {
  const hasBattery = opt.wh > 0;
  return (
    <button
      onClick={onClick}
      className={`flex flex-col rounded-xl border p-2 text-left transition ${
        selected
          ? 'border-lime bg-lime text-white shadow-sm'
          : 'border-ink/12 bg-[#fffbf5] text-ink hover:border-ink/30'
      }`}
    >
      <div className={`relative aspect-[16/10] overflow-hidden rounded-lg border ${selected ? 'border-white/20 bg-white/[0.08]' : 'border-ink/[0.07] bg-[#fffbf5]'}`}>
        <span className={`absolute right-2 top-2 z-10 grid h-5 w-5 place-items-center rounded-full border ${selected ? 'border-white bg-white text-lime-dark' : 'border-ink/20 bg-white/80 text-transparent'}`}>
          <Check size={12} strokeWidth={3} />
        </span>
        {opt.img ? (
          <img src={opt.img} alt={opt.name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <ImageIcon size={26} className={selected ? 'text-white/25' : 'text-ink/15'} />
          </div>
        )}
      </div>

      <div className={`flex flex-1 flex-col px-1 pt-3 ${selected ? '' : 'bg-[#fffbf5]'}`}>
        {opt.brand && (
          <span className={`font-body text-[11px] font-semibold uppercase tracking-wide ${selected ? 'text-white/55' : 'text-slatey-400'}`}>
            {opt.brand}
          </span>
        )}
        <span className="font-display text-[15px] font-bold leading-tight">{opt.name}</span>

        <ul className={`mt-2 space-y-1 font-body text-sm font-semibold ${selected ? 'text-white/85' : 'text-slatey-500'}`}>
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
              No battery
            </span>
          )}
          <span className="font-body text-sm font-semibold">
            {opt.price === 0 ? 'Included' : bahtDelta(opt.price)}
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
  const panel = panelOptions.find((p) => p.id === config.panel) ?? panelOptions[0];

  return (
    <div className="space-y-7">
      <div>
        <SectionHead step="Step 1 — Location" title="Where do you want to install your system?" hint="Mount included" />
        <div className="grid grid-cols-2 gap-2.5">
          {locations.map((l) => (
            <LocationButton key={l.id} selected={config.location === l.id} onClick={() => set('location', l.id)} label={l.label} />
          ))}
        </div>
      </div>

      <div>
        <SectionHead step="Step 2 — Module" title="What module size and performance do you want to install?" hint={`${panel.wp} Wp each`} />
        <div className="grid grid-cols-2 gap-2.5">
          {panelOptions.map((p) => (
            <ModuleCard key={p.id} selected={config.panel === p.id} onClick={() => set('panel', p.id)} panel={p} />
          ))}
        </div>
        <div className="mt-2.5 flex items-center justify-between gap-3 rounded-xl border border-ink/12 bg-white px-4 py-3">
          <div>
            <p className="font-display text-sm font-bold text-ink">Number of modules</p>
            <p className="font-body text-xs text-slatey-400">{baht(panelThb(panel.id))} each</p>
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

      <div>
        <SectionHead step="Step 3 — Storage" title="What storage option do you want to add?" hint="Optional" />
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {storageOptions.map((s) => (
            <StorageCard key={s.id} selected={config.storage === s.id} onClick={() => set('storage', s.id)} opt={s} />
          ))}
        </div>
      </div>

      <div>
        <SectionHead step="Step 4 — AC cable" title="Which AC connection cable do you need?" hint="To reach your socket" />
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
