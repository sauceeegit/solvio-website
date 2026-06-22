export const euro = (n) =>
  new Intl.NumberFormat('en-IE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(n);

export const baht = (n) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'THB',
    currencyDisplay: 'narrowSymbol', // renders the ฿ glyph instead of "THB"
    maximumFractionDigits: 0,
  }).format(n);

export const num = (n) => new Intl.NumberFormat('en-IE').format(Math.round(n));

// Signed price delta for configurator option rows: "incl." / "+฿x" / "−฿x".
export const bahtDelta = (n) =>
  n === 0 ? 'incl.' : n > 0 ? `+${baht(n)}` : `−${baht(Math.abs(n))}`;

// Battery capacity: 3840 → "3.84 kWh", 2400 → "2.4 kWh", 0 → "—".
export const whFmt = (n) =>
  n <= 0 ? '—' : n >= 1000 ? `${(n / 1000).toFixed(2).replace(/\.?0+$/, '')} kWh` : `${n} Wh`;
