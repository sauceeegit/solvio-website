import Reveal from '../Reveal';

const stats = [
  { value: '5,000+', label: 'Happy Customers' },
  { value: '18 MW+', label: 'Installed' },
  { value: '98%', label: 'Customer Satisfaction' },
  { value: '25 Yrs', label: 'Performance Warranty' },
];

export default function SocialProof() {
  return (
    <section className="border-y border-ink/[0.07] bg-white py-5 sm:py-10">
      <div className="container-x">
        <Reveal>
          <div className="grid grid-cols-4 gap-3 sm:gap-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-display text-xl font-extrabold sm:text-3xl" style={{ color: '#C29848' }}>{s.value}</p>
                <p className="mt-1 text-[11px] font-medium text-ink/55 sm:text-[13px]">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
