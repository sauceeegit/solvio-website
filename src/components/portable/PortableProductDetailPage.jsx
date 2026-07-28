import { useEffect } from 'react';
import { ArrowLeft, ArrowRight, Check, ChevronDown, MessageCircle, Zap, Plug, Smartphone, Weight, Sun, Shield, Battery, PlugZap, Maximize2, Minimize2, Cable, Clock } from 'lucide-react';

const SPEC_ICONS = { Battery, Zap, ZapFast: Zap, Smartphone, Plug, PlugZap, Weight, Sun, Shield, Maximize2, Minimize2, Cable, Clock };
import { Link, useSearchParams } from 'react-router-dom';
import Header from '../landing/Header';
import ContactSection from '../ContactSection';
import Footer from '../Footer';
import ProductGallery from './ProductGallery';
import { baht } from '../../lib/format';
import { usePageMeta } from '../../hooks/usePageMeta';

export default function PortableProductDetailPage({ products, defaultProduct, metaPath }) {
  usePageMeta(metaPath);
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedModel = searchParams.get('model');
  const product = products.find((item) => item.id === requestedModel) ?? defaultProduct;
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
                <ProductGallery media={product.media} />
              </div>

              <aside className="self-start lg:sticky lg:top-32">
                <p className="eyebrow">{product.category}</p>
                <h1 className="mt-3 font-display text-3xl font-black tracking-[-0.03em] text-ink sm:text-4xl">
                  {product.name}
                </h1>
                <p className="mt-1 font-display text-base font-semibold text-ink/70">{product.tagline}</p>

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
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/85">{product.metricLabel}</p>
                    <p className="mt-1 font-display text-2xl font-extrabold text-ink">{product.metricValue}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/65">From</p>
                    <p className="mt-1 font-display text-2xl font-extrabold text-price">{baht(product.price)}</p>
                  </div>
                </div>

                <p className="mt-6 text-base leading-relaxed text-ink/90">{product.description}</p>

                <ul className="mt-6 space-y-3">
                  {product.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-ink/90">
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
                    className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-lime bg-surface px-6 py-3.5 font-display text-sm font-semibold text-lime transition hover:bg-white active:scale-95"
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

        {/* Key features icon strip */}
        <section id="details" className="border-y border-ink/[0.07] bg-white py-10 sm:py-14">
          <div className="container-x">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {product.featureStrip.map(({ icon, label, sub }) => {
                const Icon = SPEC_ICONS[icon];
                return (
                <div key={sub} className="flex flex-col items-center gap-2 rounded-2xl border border-ink/[0.07] p-4 text-center">
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-white text-ink shadow-soft">
                    <Icon size={30} strokeWidth={1.75} />
                  </span>
                  <p className="font-display text-sm font-extrabold text-ink leading-tight">{label}</p>
                  <p className="text-[11px] text-ink/50 leading-tight">{sub}</p>
                </div>
                );
              })}
            </div>
          </div>
        </section>

        {product.heroImg && (
          <section className="aspect-video w-full overflow-hidden">
            <img
              src={product.heroImg.src}
              alt={`${product.name} lifestyle`}
              className="h-full w-full object-cover"
              style={product.heroImg.objectPosition ? { objectPosition: product.heroImg.objectPosition } : undefined}
            />
          </section>
        )}

        <section className="py-16 sm:py-24" style={{ backgroundColor: '#040f08' }}>
          <div className="container-x">
            <div className="text-center">
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#fffbf5' }}>Specifications</p>
              <h2 className="mt-3 font-display text-4xl font-black tracking-tight text-white sm:text-5xl">
                {product.shortName} at a glance
              </h2>
              <p className="mt-3 text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>{product.specificationIntro}</p>
            </div>

            <dl className="mx-auto mt-12 grid max-w-5xl grid-cols-1 sm:grid-cols-2">
              {product.specifications.map((specification, index) => (
                <div
                  key={`${product.id}-${specification.label}-${index}`}
                  className="grid grid-cols-2 items-baseline gap-4 py-5 px-2"
                >
                  <dt
                    className="text-sm pb-4"
                    style={{ color: 'rgba(255,255,255,0.45)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}
                  >
                    {specification.label}:
                  </dt>
                  <dd
                    className="font-display text-sm font-bold text-white text-right pb-4"
                    style={{ borderBottom: '2px solid rgba(255,255,255,0.25)' }}
                  >
                    {specification.value}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.3)' }}>
              {product.note}
            </p>
          </div>
        </section>

        <section className="bg-surface py-16 sm:py-24">
          <div className="container-x max-w-5xl">
            <div className="text-center">
              <p className="eyebrow">Good to know</p>
              <h2 className="mt-3 font-display text-4xl font-black tracking-[-0.035em] text-ink sm:text-5xl">
                FAQ
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
