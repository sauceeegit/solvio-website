// Full-width hero-height YouTube video section — used at the top of /solar-panel
export default function PlugPlayVideo() {
  return (
    <section className="w-full bg-ink" style={{ height: '82svh', minHeight: 480 }}>
      <iframe
        src="https://www.youtube.com/embed/HXFWIwgacsg?rel=0"
        title="Easy Plug & Play — Solvio balcony solar"
        className="h-full w-full border-0"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </section>
  );
}
