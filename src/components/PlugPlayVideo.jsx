import { useState } from 'react';
import { Play } from 'lucide-react';

const VIDEO_ID = 'HXFWIwgacsg';
const POSTER = `https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`;

// Full-width hero-height click-to-play section — used at the top of /solar-panel
export default function PlugPlayVideo() {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="relative w-full bg-ink overflow-hidden" style={{ height: '82svh', minHeight: 480 }}>
      {playing ? (
        <iframe
          className="absolute inset-0 h-full w-full border-0"
          src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
          title="Easy Plug & Play — Solvio balcony solar"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label="Play video"
          className="group absolute inset-0 w-full h-full"
        >
          {/* poster image */}
          <img loading="lazy"
            src={POSTER}
            alt="Solvio balcony solar installation guide"
            className="absolute inset-0 h-full w-full object-cover object-top transition duration-700 group-hover:scale-[1.02]"
          />
          {/* dark overlay */}
          <div className="absolute inset-0 bg-black/30 transition duration-300 group-hover:bg-black/20" />
          {/* play button */}
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 grid h-20 w-20 place-items-center rounded-full bg-white/15 backdrop-blur-sm ring-1 ring-white/30 transition duration-300 group-hover:scale-110 group-hover:bg-white/25">
            <Play size={32} className="ml-1.5 fill-white text-white" />
          </span>
        </button>
      )}
    </section>
  );
}
