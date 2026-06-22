import { Star } from 'lucide-react';

export default function Stars({ value = 5, size = 16, className = '' }) {
  return (
    <div className={`flex items-center gap-0.5 ${className}`} aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          className={i <= Math.round(value) ? 'fill-amber text-amber' : 'fill-ink/10 text-ink/10'}
        />
      ))}
    </div>
  );
}
