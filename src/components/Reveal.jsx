import { motion } from 'framer-motion';

const PRERENDER = typeof navigator !== 'undefined' && navigator.webdriver;

const EASE = [0.16, 1, 0.3, 1];

export default function Reveal({ children, delay = 0, y = 16, className = '' }) {
  if (PRERENDER) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-48px' }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
