import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Reveal from './Reveal';

// Balcony page: a YouTube demo video (left) with a headline + blurb (right),
// placed just above the Dark Feather banner.
export default function PlugPlayVideo() {
  return (
    <section className="bg-[#eaf4fc]">
      <div className="container-x">
        <Reveal>
          <div className="grid items-center gap-8 py-14 sm:py-20 lg:grid-cols-2 lg:gap-14">
            {/* video */}
            <div className="aspect-video overflow-hidden rounded-xl2 bg-ink shadow-soft">
              <iframe
                src="https://www.youtube.com/embed/HXFWIwgacsg?rel=0"
                title="Easy Plug & Play — Solvio balcony solar"
                className="h-full w-full border-0"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            {/* text — sits a little above vertical centre */}
            <div className="lg:self-start lg:pt-8">
              <h2 className="font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-ink sm:text-4xl lg:text-5xl">
                Easy Plug &amp; Play
              </h2>
              <p className="mt-5 max-w-md text-lg text-slatey-500">
                No electrician, no mess, no stress. Solvio is designed to plug in and power up in
                under ten minutes — right out of the box.
              </p>
              <Link
                to="/"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-lime px-6 py-3.5 font-display text-sm font-bold text-white transition hover:bg-lime-dark"
              >
                See more videos <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
