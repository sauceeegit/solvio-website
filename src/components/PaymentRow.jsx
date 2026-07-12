function Visa() {
  return (
    <svg viewBox="0 0 60 24" className="h-5 w-auto" aria-label="Visa" xmlns="http://www.w3.org/2000/svg">
      <text x="50%" y="17" textAnchor="middle" fontFamily="Arial Black,Arial,sans-serif" fontSize="18" fontWeight="900" fontStyle="italic" fill="#1A1F71">VISA</text>
    </svg>
  );
}

function Mastercard() {
  return (
    <svg viewBox="0 0 44 28" className="h-6 w-auto" aria-label="Mastercard" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="14" r="11" fill="#EB001B"/>
      <circle cx="28" cy="14" r="11" fill="#F79E1B"/>
      <path d="M22 5.8A11 11 0 0 1 26 14a11 11 0 0 1-4 8.2A11 11 0 0 1 18 14a11 11 0 0 1 4-8.2z" fill="#FF5F00"/>
    </svg>
  );
}

function PayPal() {
  return (
    <svg viewBox="0 0 56 20" className="h-5 w-auto" aria-label="PayPal" xmlns="http://www.w3.org/2000/svg">
      {/* "PayPal" centered — navy "Pay" + blue "Pal" as a tspan pair */}
      <text y="15" fontFamily="Arial,sans-serif" fontSize="14" fontWeight="900" textAnchor="middle" x="28">
        <tspan fill="#003087">Pay</tspan><tspan fill="#009CDE">Pal</tspan>
      </text>
    </svg>
  );
}

function ApplePay() {
  return (
    <svg viewBox="0 0 60 22" className="h-5 w-auto" aria-label="Apple Pay" xmlns="http://www.w3.org/2000/svg">
      {/* Apple glyph centered above "Pay" — total content ~36px wide, starts at x=12 */}
      <g transform="translate(10,1) scale(0.52)">
        <path d="M16 4.2c.8-1 1.3-2.3 1.1-3.6-1.1.1-2.4.7-3.2 1.7-.7.9-1.3 2.2-.1 3.5 1.1-.1 2.4-.7 3.2-1.6z" fill="#000"/>
        <path d="M19.5 6.4c-1.8-.1-3.3 1-4.2 1-.9 0-2.2-1-3.7-.9-1.9.1-3.6 1.1-4.5 2.7-1.9 3.3-.5 8.1 1.3 10.8.9 1.3 2 2.7 3.4 2.7 1.3-.1 1.8-.9 3.4-.9 1.6 0 2 .9 3.3.8 1.5-.1 2.4-1.4 3.3-2.7 1-1.5 1.4-3 1.4-3.1-.1 0-2.7-1.1-2.8-4.2 0-2.6 2.1-3.8 2.2-3.9-1-1.6-2.8-2.2-3.1-2.3z" fill="#000"/>
      </g>
      <text x="30" y="16" fontFamily="Arial,sans-serif" fontSize="13" fontWeight="700" fill="#000" textAnchor="middle">Pay</text>
    </svg>
  );
}

function Klarna() {
  return (
    <svg viewBox="0 0 64 24" className="h-5 w-auto" aria-label="Klarna" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="1" width="64" height="22" rx="5" fill="#FFB3C7"/>
      <text x="50%" y="17" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#17120E">klarna</text>
    </svg>
  );
}

function Sepa() {
  return (
    <svg viewBox="0 0 64 24" className="h-5 w-auto" aria-label="SEPA" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="1" width="64" height="22" rx="5" fill="#003399"/>
      <text x="50%" y="17" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#FFCC00">SEPA</text>
    </svg>
  );
}

const PAYMENT_ICONS = [
  { key: 'visa',     label: 'Visa',      Icon: Visa },
  { key: 'mc',       label: 'Mastercard',Icon: Mastercard },
  { key: 'paypal',   label: 'PayPal',    Icon: PayPal },
  { key: 'applepay', label: 'Apple Pay', Icon: ApplePay },
  { key: 'klarna',   label: 'Klarna',    Icon: Klarna },
  { key: 'sepa',     label: 'SEPA',      Icon: Sepa },
];

export default function PaymentRow() {
  return (
    <div className="container-x flex flex-wrap items-center justify-center gap-x-2 gap-y-2 py-6">
      <span className="mr-2 font-display text-sm font-bold tracking-wide text-lime">
        Secure checkout
      </span>
      {PAYMENT_ICONS.map(({ key, label, Icon }) => (
        <span
          key={key}
          title={label}
          className="flex h-10 items-center justify-center rounded-xl border border-ink/10 bg-white px-4 shadow-sm"
        >
          <Icon />
        </span>
      ))}
    </div>
  );
}
