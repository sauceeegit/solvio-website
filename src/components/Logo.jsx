// Solvio brand logo (the real artwork lives at /public/solvio-logo.jpg).
// The cream-on-orange lockup reads well on both light and dark backgrounds.
export default function Logo({ className = '', href = '#top', size = 'h-9' }) {
  return (
    <a href={href} className={`inline-flex items-center ${className}`} aria-label="Solvio home">
      <img
        src="/solvio-logo.jpg"
        alt="Solvio"
        className={`${size} w-auto rounded-md`}
      />
    </a>
  );
}
