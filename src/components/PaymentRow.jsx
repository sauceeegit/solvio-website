// Payment method logos as inline SVGs — no external requests (CSP-safe).
function Visa() {
  return (
    <svg viewBox="0 0 48 16" className="h-4 w-auto" aria-label="Visa" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.3 1.2L14.8 14.8h-3.3L15 1.2h3.3zm13.9 8.8l1.7-4.8.98 4.8h-2.68zm3.7 4.8h3.1L36.5 1.2h-2.87c-.65 0-1.2.38-1.44.96L27.1 14.8H30.3l.65-1.8h4l.95 1.8zm-7.7-4.5c.01-3.1-4.3-3.27-4.27-4.65.01-.42.41-.87 1.29-.98.44-.06 1.64-.1 3.01.53l.54-2.5A8.2 8.2 0 0 0 25.6 2c-3 0-5.12 1.6-5.14 3.88-.02 1.69 1.51 2.63 2.66 3.19 1.18.58 1.58.95 1.57 1.47-.01.79-.94 1.14-1.81 1.15-1.52.02-2.4-.41-3.1-.74l-.55 2.57c.71.32 2.01.6 3.36.62 3.17 0 5.25-1.57 5.26-4zm-12.5-9.1L11.9 14.8H8.6L6.1 3.7c-.15-.6-.28-.82-.74-1.07C4.6 2.3 3.3 1.96 2.2 1.74l.08-.54h5.13c.65 0 1.24.43 1.39 1.18l1.27 6.74 3.14-7.92h3.18z" fill="#1A1F71"/>
    </svg>
  );
}

function Mastercard() {
  return (
    <svg viewBox="0 0 38 24" className="h-5 w-auto" aria-label="Mastercard" xmlns="http://www.w3.org/2000/svg">
      <circle cx="13" cy="12" r="10" fill="#EB001B"/>
      <circle cx="25" cy="12" r="10" fill="#F79E1B"/>
      <path d="M19 4.93A10 10 0 0 1 22.57 12 10 10 0 0 1 19 19.07 10 10 0 0 1 15.43 12 10 10 0 0 1 19 4.93z" fill="#FF5F00"/>
    </svg>
  );
}

function PayPal() {
  return (
    <svg viewBox="0 0 80 20" className="h-4 w-auto" aria-label="PayPal" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.5 2H5.2C4.9 2 4.6 2.2 4.5 2.5L2.8 13c-.1.3.1.5.4.5h2.1c.3 0 .6-.2.6-.5l.5-2.9c.1-.3.3-.5.6-.5h1.3c2.7 0 4.3-1.3 4.7-3.9.2-1.1 0-2-.5-2.6-.6-.7-1.6-1.1-3-1.1z" fill="#003087"/>
      <path d="M10.2 5.9c-.2 1.5-1.2 2.5-2.8 2.5H6.3c-.3 0-.5.2-.6.5L5.2 11l-.3 1.7c0 .2.1.4.3.4H7c.3 0 .5-.2.5-.4l.5-2.7c.1-.3.3-.4.5-.4h.3c2.1 0 3.7-1 4.1-3.8v-.4c-.1-1.1-.7-1.7-2.7-1.5z" fill="#009CDE"/>
      <path d="M16.5 2h-4.3c-.3 0-.5.2-.6.5L9.9 13c-.1.3.1.5.4.5h2.3c.2 0 .4-.1.4-.4l.5-3.1c.1-.3.3-.5.6-.5h1.3c2.7 0 4.3-1.3 4.7-3.9.2-1.1 0-2-.5-2.6-.7-.7-1.7-1.1-3.1-1z" fill="#003087"/>
      {/* PayPal text */}
      <text x="26" y="15" fontFamily="Arial" fontSize="12" fontWeight="bold" fill="#003087">Pay</text>
      <text x="44" y="15" fontFamily="Arial" fontSize="12" fontWeight="bold" fill="#009CDE">Pal</text>
    </svg>
  );
}

function ApplePay() {
  return (
    <svg viewBox="0 0 60 24" className="h-5 w-auto" aria-label="Apple Pay" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.5 5.5c.7-.9 1.2-2.1 1-3.3-1 .1-2.2.7-2.9 1.6-.6.8-1.2 2-.1 3.3 1-.1 2.2-.7 3-1.6z" fill="#000"/>
      <path d="M14.7 7.2c-1.6-.1-3 .9-3.8.9-.8 0-2-.9-3.3-.8C6 7.4 4.5 8.3 3.7 9.7c-1.7 2.9-.4 7.2 1.2 9.5.8 1.2 1.8 2.5 3 2.4 1.2-.1 1.6-.8 3-.8s1.8.8 3 .7c1.3-.1 2.1-1.2 2.9-2.4.9-1.4 1.3-2.7 1.3-2.8-.1 0-2.4-1-2.5-3.7 0-2.3 1.9-3.4 2-3.5-.9-1.4-2.5-1.9-2.9-1.9z" fill="#000"/>
      <text x="22" y="17" fontFamily="-apple-system,sans-serif" fontSize="10" fontWeight="600" fill="#000">Pay</text>
    </svg>
  );
}

function Klarna() {
  return (
    <svg viewBox="0 0 52 20" className="h-4 w-auto" aria-label="Klarna" xmlns="http://www.w3.org/2000/svg">
      <rect width="52" height="20" rx="4" fill="#FFB3C7"/>
      <text x="7" y="14" fontFamily="Arial" fontSize="10" fontWeight="bold" fill="#17120E">klarna</text>
    </svg>
  );
}

function Sepa() {
  return (
    <svg viewBox="0 0 52 20" className="h-4 w-auto" aria-label="SEPA" xmlns="http://www.w3.org/2000/svg">
      <rect width="52" height="20" rx="4" fill="#003399"/>
      <text x="8" y="14" fontFamily="Arial" fontSize="9" fontWeight="bold" fill="#FFCC00">SEPA</text>
      {/* Stars row simplified */}
      <circle cx="40" cy="7" r="1.2" fill="#FFCC00"/>
      <circle cx="44" cy="10" r="1.2" fill="#FFCC00"/>
      <circle cx="40" cy="13" r="1.2" fill="#FFCC00"/>
    </svg>
  );
}

const PAYMENT_ICONS = [
  { key: 'visa',       label: 'Visa',       Icon: Visa },
  { key: 'mc',         label: 'Mastercard', Icon: Mastercard },
  { key: 'paypal',     label: 'PayPal',     Icon: PayPal },
  { key: 'applepay',   label: 'Apple Pay',  Icon: ApplePay },
  { key: 'klarna',     label: 'Klarna',     Icon: Klarna },
  { key: 'sepa',       label: 'SEPA',       Icon: Sepa },
];

export default function PaymentRow() {
  return (
    <div className="container-x flex flex-wrap items-center justify-center gap-x-2 gap-y-2 py-6">
      <span className="mr-1 font-mono text-[11px] uppercase tracking-wider text-slatey-400">
        Secure checkout
      </span>
      {PAYMENT_ICONS.map(({ key, label, Icon }) => (
        <span
          key={key}
          title={label}
          className="flex h-9 items-center justify-center rounded-xl border border-ink/10 bg-white px-3 shadow-sm"
        >
          <Icon />
        </span>
      ))}
    </div>
  );
}
