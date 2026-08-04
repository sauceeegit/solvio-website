import { motion } from 'framer-motion';

// True under headless prerender (react-snap/puppeteer). whileInView never
// fires for below-fold sections in a snapshot, so without this guard the
// static HTML would ship content stuck at opacity:0. Real visitors are
// unaffected — webdriver is only set by automation.
const PRERENDER = typeof navigator !== 'undefined' && navigator.webdriver;

export default function Reveal({ children, delay = 0, y = 16, className = '' }) {
  if (PRERENDER) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
