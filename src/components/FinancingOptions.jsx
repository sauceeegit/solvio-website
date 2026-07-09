import { useState } from 'react';
import {
  Home,
  Building2,
  Landmark,
  FileText,
  BadgeCheck,
  ClipboardList,
  Wallet,
  CalendarClock,
  Percent,
} from 'lucide-react';
import Reveal from './Reveal';

/**
 * FinancingOptions — owner-focused financing section.
 *
 * Shows the three ways to pay Solvio, then a Home / Business toggle listing
 * green-energy loans from Thai banks that customers can use to finance a
 * Solvio rooftop installation. Rates and terms are indicative and set by
 * each bank, so keep the disclaimer intact if you edit the copy.
 *
 * Data lives in this file for easy pasting; move `payWays`, `loans`, and
 * `bankReadyPack` into src/data/product.js later if you prefer the
 * site-wide pattern.
 */

const payWays = [
  {
    icon: 'Wallet',
    title: 'Pay in full',
    body: 'One payment, lowest total cost. Your system starts earning from day one.',
  },
  {
    icon: 'CalendarClock',
    title: 'Instalments with Solvio',
    body: 'Split your project into monthly payments arranged directly with us.',
  },
  {
    icon: 'Landmark',
    title: 'Bank financing',
    body: 'Use a green loan from a Thai bank. We prepare every document the bank asks for.',
  },
];

const loans = {
  home: [
    {
      bank: 'Bangkok Bank',
      product: 'Bualuang Poonphol Green',
      rate: 'from MRR − 1%',
      amount: 'Up to ฿10M',
      tenor: 'Up to 10 years',
      note: 'Home-equity loan for clean-energy upgrades. Works with a mortgage-free home, an existing Bangkok Bank mortgage, or a refinance with a top-up.',
    },
    {
      bank: 'GSB (Government Savings Bank)',
      product: 'GSB Go Green',
      rate: 'promo rates from 1.99%',
      amount: 'Up to ฿5M secured · ฿500K unsecured',
      tenor: 'Up to 10 years',
      note: 'Personal loan made for solar rooftops and EV chargers. The unsecured option needs no property collateral at all.',
    },
    {
      bank: 'GH Bank (ธอส.)',
      product: 'Solar Roof Loan',
      rate: 'fixed intro rates',
      amount: 'Per quotation',
      tenor: 'Up to 10 years',
      note: 'For homeowners installing through a registered company using TIS/IEC-certified panels — which every Solvio installation is.',
    },
  ],
  business: [
    {
      bank: 'Kasikornbank',
      product: 'K-Solar Rooftop Financing',
      rate: 'from MLR − 1%',
      amount: '100% of project value',
      tenor: 'Up to 8 years',
      note: 'Long-term loan or leasing for businesses cutting energy costs with solar. Repayments are designed to be covered by your electricity savings.',
    },
    {
      bank: 'Krungsri',
      product: 'SME Solar Rooftop',
      rate: 'special SME rates',
      amount: '100% of project value',
      tenor: 'Up to 8 years',
      note: 'Solar loan for SMEs using Tier-1 equipment from vetted installers.',
    },
    {
      bank: 'SME D Bank',
      product: 'Green business loans',
      rate: 'from 3% fixed (first 3 yrs)',
      amount: 'Up to ฿10M+',
      tenor: 'Up to 10 years',
      note: 'Development-bank lending for green investments, with grace periods on principal in some programmes.',
    },
  ],
};

const bankReadyPack = [
  { icon: 'FileText', label: 'Formal quotation (ใบเสนอราคา)' },
  { icon: 'ClipboardList', label: 'Installation contract' },
  { icon: 'BadgeCheck', label: 'TIS / IEC equipment certificates' },
  { icon: 'Building2', label: 'Company registration documents' },
];

const icons = {
  Wallet,
  CalendarClock,
  Landmark,
  FileText,
  ClipboardList,
  BadgeCheck,
  Building2,
};

export default function FinancingOptions() {
  const [segment, setSegment] = useState('home');

  return (
    <section id="financing" className="scroll-mt-20 bg-white py-20">
      <div className="container-x">
        {/* Heading */}
        <Reveal>
          <p className="eyebrow">Financing</p>
          <h2 className="mt-2 max-w-2xl font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Own your roof&rsquo;s power without paying it all upfront
          </h2>
          <p className="mt-3 max-w-xl text-slatey-500">
            Thai banks offer green loans built for exactly this — and your monthly savings on
            electricity can cover most of the repayment. Here are three ways to pay, and the
            loans property owners use most.
          </p>
        </Reveal>

        {/* Three ways to pay */}
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {payWays.map((w, i) => {
            const Icon = icons[w.icon];
            return (
              <Reveal key={w.title} delay={i * 0.08}>
                <div className="card h-full p-6">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-lime/10 text-lime">
                    <Icon size={22} />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold text-ink">{w.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slatey-500">{w.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Bank loans: Home / Business toggle */}
        <Reveal className="mt-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h3 className="font-display text-xl font-bold text-ink sm:text-2xl">
              Green loans owners use with Solvio
            </h3>
            <div
              role="tablist"
              aria-label="Owner type"
              className="inline-flex rounded-full border border-ink/10 bg-light p-1"
            >
              {[
                { id: 'home', label: 'Homeowners', icon: Home },
                { id: 'business', label: 'Business owners', icon: Building2 },
              ].map((t) => {
                const active = segment === t.id;
                const Icon = t.icon;
                return (
                  <button
                    key={t.id}
                    role="tab"
                    aria-selected={active}
                    onClick={() => setSegment(t.id)}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 font-display text-sm font-semibold transition ${
                      active ? 'bg-ink text-white shadow-soft' : 'text-ink/60 hover:text-ink'
                    }`}
                  >
                    <Icon size={15} />
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          {loans[segment].map((l, i) => (
            <Reveal key={`${segment}-${l.bank}`} delay={i * 0.06}>
              <div className="card flex h-full flex-col p-6">
                <p className="font-mono text-[11px] uppercase tracking-wider text-slatey-400">
                  {l.bank}
                </p>
                <h4 className="mt-1 font-display text-lg font-bold text-ink">{l.product}</h4>

                <dl className="mt-4 space-y-2 border-t border-ink/[0.07] pt-4 text-sm">
                  <div className="flex items-center gap-2 text-ink/80">
                    <Percent size={14} className="shrink-0 text-lime" />
                    <dt className="sr-only">Interest rate</dt>
                    <dd className="font-semibold">{l.rate}</dd>
                  </div>
                  <div className="flex items-center gap-2 text-ink/80">
                    <Wallet size={14} className="shrink-0 text-lime" />
                    <dt className="sr-only">Loan amount</dt>
                    <dd>{l.amount}</dd>
                  </div>
                  <div className="flex items-center gap-2 text-ink/80">
                    <CalendarClock size={14} className="shrink-0 text-lime" />
                    <dt className="sr-only">Repayment period</dt>
                    <dd>{l.tenor}</dd>
                  </div>
                </dl>

                <p className="mt-4 flex-1 text-sm leading-relaxed text-slatey-500">{l.note}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Bank-ready pack */}
        <Reveal className="mt-12">
          <div className="rounded-xl2 bg-ink p-6 text-white sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div className="max-w-md">
                <h3 className="font-display text-xl font-bold">
                  We hand you a bank-ready pack
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  Every bank asks for the same core documents. Solvio prepares them all with
                  your quote, so your loan application is ready the day you say yes.
                </p>
              </div>
              <ul className="grid gap-2 sm:grid-cols-2">
                {bankReadyPack.map((d) => {
                  const Icon = icons[d.icon];
                  return (
                    <li
                      key={d.label}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-sm text-white/85"
                    >
                      <Icon size={15} className="shrink-0 text-lime" />
                      {d.label}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </Reveal>

        {/* Disclaimer */}
        <p className="mt-6 max-w-3xl text-xs leading-relaxed text-slatey-400">
          Rates, amounts, and terms shown are indicative, set by each bank, and change with
          bank announcements and campaigns. Loan approval is at each bank&rsquo;s sole
          discretion. Solvio is a solar installer, not a lender or financial advisor — please
          confirm current terms with the bank before applying.
        </p>
      </div>
    </section>
  );
}
