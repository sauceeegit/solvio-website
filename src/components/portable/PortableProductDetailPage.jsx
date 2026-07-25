import { useEffect } from 'react';
import { ArrowLeft, ArrowRight, Check, ChevronDown, MessageCircle } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import Header from '../landing/Header';
import ContactSection from '../ContactSection';
import Footer from '../Footer';
import { baht } from '../../lib/format';
import { usePageMeta } from '../../hooks/usePageMeta';

function MediaPlaceholder({ item, featured = false }) {
  const imageNumber = String(item.id).padStart(2, '0');

  return (
    <div
      className={`relative flex min-h-[280px] snap-center flex-col justify-between overflow-hidden rounded-[1.5rem] border border-ink/[0.07] bg-white/70 p-5 shadow-soft sm:min-h-[340px] lg:min-h-0 ${
        featured ? 'lg:col-span-3 lg:aspect-[16/10]' : 'lg:aspect-square'
      }`}
      aria-label={item.src ? item.alt : `Image placeholder ${imageNumber}: ${item.label}`}
    >
      {item.src ? (
        <img className="absolute inset-0 h-full w-full object-cover" src={item.src} alt={item.alt} />
      ) : (
        <>
          <div className="absolute -right-5 -top-8 font-display text-[9rem] font-black leading-none text-lime/[0.08] sm:text-[12rem]">
            {imageNumber}
          </div>
          <span className="relative w-fit rounded-full bg-ink px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-white">
            Image {imageNumber}
          </span>
          <div className="relative max-w-sm">
            <p className="font-display text-xl font-extrabold text-ink">{item.label}</p>
            <p className="mt-1 text-sm leading-relaxed text-ink/60">{item.note}</p>
          </div>
        </>
      )}
    </div>
  );
}

export default function PortableProductDetailPage({ products, defaultProduct, metaPath }) {
  usePageMeta(metaPath);
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedModel = searchParams.get('model');
  const product = products.find((item) => item.id === requestedModel) ?? defaultProduct;
  const [featured, ...supporting] = product.media.slice(0, 4);
  const whatsappMessage = encodeURIComponent(`Hi Solvio — I'd like more information about the ${product.shortName}`);

  useEffect(() => {
    document.title = product.pageTitle;
  }, [product.pageTitle]);

  const selectModel = (event) => {
    const modelId = event.target.value;
    setSearchParams(modelId === defaultProduct.id ? {} : { model: modelId }, { replace: true });
  };

  return (
    <div id="top" className="min-h-screen bg-surface">
      <Header />

      <main>
        <section className="pb-16 pt-8 sm:pt-12 lg:pb-24">
          <div className="container-x">
            <Link
              to="/portable-system"
              className="inline-flex items-center gap-2 font-display text-sm font-bold text-ink/65 transition hover:text-lime"
            >
              <ArrowLeft size={17} /> Back to portable power
            </Link>

            <div className="mt-7 grid gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(360px,0.75fr)] xl:gap-16">
              <div className="min-w-0" key={product.id}>
                <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0">
                  <div className="w-[88%] shrink-0 sm:w-[72%] lg:contents">
                    <MediaPlaceholder item={featured} featured />
                  </div>
                  {supporting.map((item) => (
                    <div key={`${product.id}-${item.id}`} className="w-[78%] shrink-0 sm:w-[46%] lg:w-auto">
                      <MediaPlaceholder item={item} />
                    </div>
                  ))}
                </div>
                <p className="mt-2 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-ink/45 lg:hidden">
                  Swipe to view {product.shortName} image positions 01–04
                </p>
              </div>

              <aside className="self-start lg:sticky lg:top-32">
                <p className="eyebrow">{product.category}</p>
                <h1 className="mt-3 font-display text-3xl font-black tracking-[-0.03em] text-ink sm:text-4xl">
                  {product.name}
                </h1>
                <p className="mt-1 font-display text-base font-semibold text-ink/50">{product.tagline}</p>

                <div className="mt-7">
                  <label htmlFor="model-selector" className="font-display text-sm font-extrabold uppercase tracking-[0.12em] text-ink">
                    {product.selectorHeading}
                  </label>
                  <div className="relative mt-2">
                    <select
                      id="model-selector"
                      value={product.id}
                      onChange={selectModel}
                      className="h-14 w-full appearance-none rounded-xl border border-ink/15 bg-white px-4 pr-12 font-display text-base font-extrabold text-ink shadow-soft outline-none transition focus:border-lime focus:ring-4 focus:ring-lime/10"
                    >
                      {products.map((model) => (
                        <option key={model.id} value={model.id}>{model.selectorLabel}</option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-lime" size={21} />
                  </div>
                </div>

                <div className="mt-5 flex items-end justify-between gap-6 border-y border-ink/10 py-5">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/70">{product.metricLabel}</p>
                    <p className="mt-1 font-display text-2xl font-extrabold text-ink">{product.metricValue}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/45">From</p>
                    <p className="mt-1 font-display text-3xl font-black text-price">{baht(product.price)}</p>
                  </div>
                </div>

                <p className="mt-6 text-base leading-relaxed text-ink/75">{product.description}</p>

                <ul className="mt-6 space-y-3">
                  {product.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-ink/80">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-lime text-white">
                        <Check size={13} strokeWidth={3} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  <a
                    href={`https://wa.me/66843488428?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary"
                  >
                    <MessageCircle size={18} /> Ask about {product.shortName}
                  </a>
                  <a href="#details" className="btn-primary">
                    Explore details <ArrowRight size={18} />
                  </a>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="border-y border-ink/[0.07] bg-white py-8 sm:py-10">
          <div className="container-x grid grid-cols-2 gap-6 lg:grid-cols-4">
            {product.facts.map((fact) => (
              <div key={fact.label} className="border-l-2 border-lime pl-4">
                <p className="font-display text-xl font-extrabold text-ink sm:text-2xl">{fact.value}</p>
                <p className="mt-1 text-sm text-ink/55">{fact.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="details" className="bg-[#FFF7E9] py-16 sm:py-24">
          <div className="container-x space-y-16 sm:space-y-24">
            {product.sections.map((section, index) => {
              const media = product.media.find((item) => item.id === section.mediaId);
              return (
                <div key={`${product.id}-${section.title}`} className="grid items-center gap-9 lg:grid-cols-2 lg:gap-16">
                  <div className={index % 2 ? 'lg:order-2' : ''}>
                    <MediaPlaceholder item={media} />
                  </div>
                  <div className={index % 2 ? 'lg:order-1' : ''}>
                    <p className="eyebrow">{section.eyebrow}</p>
                    <h2 className="mt-3 max-w-xl font-display text-4xl font-black tracking-[-0.035em] text-ink sm:text-5xl">
                      {section.title}
                    </h2>
                    <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/70">{section.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="bg-white py-16 sm:py-24">
          <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="eyebrow">Specifications</p>
              <h2 className="mt-3 font-display text-4xl font-black tracking-[-0.035em] text-ink sm:text-5xl">
                {product.shortName} at a glance
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-ink/65">{product.specificationIntro}</p>
            </div>

            <div>
              <dl className="overflow-hidden rounded-[1.5rem] border border-ink/10">
                {product.specifications.map((specification, index) => (
                  <div
                    key={`${product.id}-${specification.label}-${index}`}
                    className={`flex items-center justify-between gap-5 px-5 py-4 sm:px-7 ${index ? 'border-t border-ink/10' : ''}`}
                  >
                    <dt className="font-display font-bold text-ink">{specification.label}</dt>
                    <dd className="text-right font-mono text-sm text-ink/60">{specification.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 rounded-xl bg-amber/15 px-4 py-3 text-sm leading-relaxed text-ink/65">
                {product.note}
              </p>
            </div>
          </div>
        </section>

        <section className="bg-surface py-16 sm:py-24">
          <div className="container-x max-w-5xl">
            <div className="text-center">
              <p className="eyebrow">Good to know</p>
              <h2 className="mt-3 font-display text-4xl font-black tracking-[-0.035em] text-ink sm:text-5xl">
                {product.shortName} questions
              </h2>
            </div>
            <div className="mt-10 space-y-3">
              {product.faqs.map((item) => (
                <details key={`${product.id}-${item.question}`} className="group rounded-2xl border border-ink/10 bg-white px-5 py-1 shadow-soft sm:px-7">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 font-display text-lg font-extrabold text-ink">
                    {item.question}
                    <ChevronDown className="shrink-0 text-lime transition group-open:rotate-180" size={21} />
                  </summary>
                  <p className="max-w-3xl pb-6 text-base leading-relaxed text-ink/65">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
