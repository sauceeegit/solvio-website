import { Star } from 'lucide-react';

export default function Stars({ value = 5, size = 16, className = '' }) {
  return (
    <div className={`flex items-center gap-0.5 ${className}`} aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          style={i <= Math.round(value) ? { fill: '#FFD700', color: '#FFD700' } : { fill: 'rgba(9,50,27,0.1)', color: 'rgba(9,50,27,0.1)' }}
        />
      ))}
    </div>
  );
}
