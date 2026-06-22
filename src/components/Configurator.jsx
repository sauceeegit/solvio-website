import { Check, Plus, Image as ImageIcon } from 'lucide-react';
import { locations, panelOptions, panelThb, storageOptions, cableOptions } from '../data/product';
import { baht, bahtDelta, whFmt } from '../lib/format';

function SectionHead({ step, title, hint }) {
  return (
    <div className="mb-3">
      <p className="mb-1 font-mono text-[11px] uppercase tracking-wider text-lime-dark">{step}</p>
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-display text-base font-bold leading-snug text-ink">{title}</h3>
        {hint && <span className="shrink-0 font-mono text-[11px] text-slatey-400">{hint}</span>}
      </div>
    </div>
  );
}

/* Solid-fill button with a corner check — used for the AC cable step */
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
        <span
          className={`mt-0.5 font-mono text-[11px] leading-none ${
            selected ? 'text-white/85' : 'text-slatey-400'
          }`}
        >
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

/* Large image card — used for the module/performance step */
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
        <span className="absolute left-2 top-2 rounded-full bg-ink/85 px-2 py-0.5 font-mono text-[10px] font-medium text-lime backdrop-blur">
          {panel.wp} Wp · bifacial
        </span>
        <span
          className={`absolute right-2 top-2 grid h-5 w-5 place-items-center rounded-full border ${
            selected
              ? 'border-lime-dark bg-lime-dark text-ink'
              : 'border-white/70 bg-white/80 text-transparent'
          }`}
        >
          {selected && <Check size={12} strokeWidth={3} />}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-3">
        <div className="flex items-baseline justify-between gap-2">
          <span className="font-display text-sm font-bold text-ink">{panel.label}</span>
          <span className="font-mono text-xs font-semibold text-ink">{baht(panelThb(panel.id))}</span>
        </div>
        <span className="text-xs text-slatey-500">{panel.sub}</span>
        <span className="mt-2 border-t border-ink/[0.06] pt-2 font-mono text-[11px] leading-relaxed text-slatey-400">
          {panel.dims}
          <br />
          {panel.weight} · per panel
        </span>
      </div>
    </button>
  );
}

/* Product card with image placeholder — used for the storage step */
function StorageCard({ selected, onClick, opt }) {
  const hasBattery = opt.wh > 0;
  return (
    <button
      onClick={onClick}
      className={`flex flex-col rounded-xl border p-2 text-left transition ${
        selected
          ? 'border-lime bg-lime text-white shadow-sm'
          : 'border-ink/12 bg-white text-ink hover:border-ink/30'
      }`}
    >
      {/* framed product image — placeholder until a real photo is set */}
      <div
        className={`relative aspect-[16/10] overflow-hidden rounded-lg border ${
          selected ? 'border-white/20 bg-white/[0.08]' : 'border-ink/[0.07] bg-surface'
        }`}
      >
        {/* selection badge */}
        <span
          className={`absolute right-2 top-2 z-10 grid h-5 w-5 place-items-center rounded-full border ${
            selected
              ? 'border-white bg-white text-lime-dark'
              : 'border-ink/20 bg-white/80 text-transparent'
          }`}
        >
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

      {/* content */}
      <div className="flex flex-1 flex-col px-1 pt-3">
        {opt.brand && (
          <span
            className={`font-mono text-[11px] uppercase tracking-wide ${
              selected ? 'text-white/55' : 'text-slatey-400'
            }`}
          >
            {opt.brand}
          </span>
        )}
        <span className="font-display text-[15px] font-bold leading-tight">{opt.name}</span>

        <ul
          className={`mt-2 space-y-1 text-xs ${selected ? 'text-white/75' : 'text-slatey-500'}`}
        >
          {opt.specs.map((s) => (
            <li key={s} className="flex gap-1.5">
              <span className={selected ? 'text-white/80' : 'text-lime-dark'}>·</span>
              <span>{s}</span>
            </li>
          ))}
        </ul>

        {/* footer — capacity + price */}
        <div
          className={`mt-3 flex items-center justify-between border-t pt-2.5 ${
            selected ? 'border-white/15' : 'border-ink/[0.07]'
          }`}
        >
          {hasBattery ? (
            <span className="inline-flex items-center gap-1.5 font-mono text-[13px] font-bold">
              <span
                className={`grid h-4 w-4 place-items-center rounded-full ${
                  selected ? 'bg-white text-lime-dark' : 'bg-ink text-white'
                }`}
              >
                <Plus size={11} strokeWidth={3} />
              </span>
              {whFmt(opt.wh)}
            </span>
          ) : (
            <span
              className={`font-mono text-[13px] ${selected ? 'text-white/55' : 'text-slatey-400'}`}
            >
              No battery
            </span>
          )}
          <span className="font-mono text-[13px] font-semibold">
            {opt.price === 0 ? 'Included' : bahtDelta(opt.price)}
          </span>
        </div>
      </div>
    </button>
  );
}

/* Solid-fill button with a corner check badge — used for the location step */
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
      {/* Step 1 — Location */}
      <div>
        <SectionHead
          step="Step 1 — Location"
          title="Where do you want to install your system?"
          hint="Mount included"
        />
        <div className="grid grid-cols-2 gap-2.5">
          {locations.map((l) => (
            <LocationButton
              key={l.id}
              selected={config.location === l.id}
              onClick={() => set('location', l.id)}
              label={l.label}
            />
          ))}
        </div>
      </div>

      {/* Step 2 — Module size & performance */}
      <div>
        <SectionHead
          step="Step 2 — Module"
          title="What module size and performance do you want to install?"
          hint={`${panel.wp} Wp each`}
        />
        <div className="grid grid-cols-2 gap-2.5">
          {panelOptions.map((p) => (
            <ModuleCard
              key={p.id}
              selected={config.panel === p.id}
              onClick={() => set('panel', p.id)}
              panel={p}
            />
          ))}
        </div>
        {/* quantity — priwatt-style buttons showing the price change from the 4-module base */}
        <div className="mt-2.5 grid grid-cols-4 gap-2.5">
          {[1, 2, 3, 4].map((n) => {
            const selected = config.modules === n;
            const delta = (n - 4) * panelThb(panel.id);
            return (
              <button
                key={n}
                onClick={() => set('modules', n)}
                aria-label={`${n} module${n > 1 ? 's' : ''}`}
                className={`flex min-h-[60px] flex-col items-center justify-center rounded-xl border px-2 py-3 transition ${
                  selected
                    ? 'border-lime bg-lime text-white shadow-sm'
                    : 'border-ink/12 bg-white text-ink hover:border-ink/30'
                }`}
              >
                <span className="font-display text-base font-bold leading-none">{n}</span>
                {delta !== 0 && (
                  <span
                    className={`mt-1.5 font-mono text-[11px] leading-none ${
                      selected ? 'text-white/85' : 'text-slatey-400'
                    }`}
                  >
                    −{baht(Math.abs(delta))}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 3 — Storage */}
      <div>
        <SectionHead
          step="Step 3 — Storage"
          title="What storage option do you want to add?"
          hint="Optional"
        />
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {storageOptions.map((s) => (
            <StorageCard
              key={s.id}
              selected={config.storage === s.id}
              onClick={() => set('storage', s.id)}
              opt={s}
            />
          ))}
        </div>
      </div>

      {/* Step 4 — AC cable */}
      <div>
        <SectionHead
          step="Step 4 — AC cable"
          title="Which AC connection cable do you need?"
          hint="To reach your socket"
        />
        <div className="space-y-2.5">
          <div className="grid grid-cols-2 gap-2.5">
            {cableOptions
              .filter((c) => c.id !== 'none')
              .map((c) => (
                <CableButton
                  key={c.id}
                  selected={config.cable === c.id}
                  onClick={() => set('cable', c.id)}
                  opt={c}
                />
              ))}
          </div>
          {cableOptions
            .filter((c) => c.id === 'none')
            .map((c) => (
              <CableButton
                key={c.id}
                selected={config.cable === c.id}
                onClick={() => set('cable', c.id)}
                opt={c}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
