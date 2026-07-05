import { X, Zap } from 'lucide-react';
import { useState } from 'react';

export default function TopBar() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="relative bg-ink px-4 py-2.5 text-center text-sm text-white">
      <span className="inline-flex items-center gap-2">
        <Zap size={14} className="text-lime" />
        <span>
          Summer deal: get{' '}
          <strong>free installation support</strong> on all orders over ฿10,000
        </span>
        <a
          href="#bestsellers"
          className="inline-flex items-center gap-2 rounded-full bg-lime px-3.5 py-1.5 font-display text-sm font-bold text-white"
        >
          Shop now
        </a>
      </span>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 hover:bg-white/10"
        aria-label="Close"
      >
        <X size={14} />
      </button>
    </div>
  );
}
