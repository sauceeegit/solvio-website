// Interactive 3D model of the panel, embedded in the hero slot.
// Bleeds into the left page margin on desktop and stays sticky while the
// configurator on the right scrolls.
export default function Gallery() {
  return (
    <div className="lg:sticky lg:top-24 lg:self-start">
      <div className="relative overflow-hidden rounded-xl2 border border-ink/[0.07] bg-white shadow-soft">
        <iframe
          src="https://sauceeegit.github.io/solvio-panel-3d/"
          title="Solvio balcony panel — interactive 3D model"
          className="block aspect-[10/9] w-full border-0"
          allow="fullscreen; xr-spatial-tracking; accelerometer; gyroscope"
          allowFullScreen
        />
        <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-ink/85 px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-wider text-lime backdrop-blur">
          1800 Wp · Plug &amp; Play
        </span>
      </div>
    </div>
  );
}
