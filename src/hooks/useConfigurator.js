import { useMemo, useState } from 'react';
import { computeConfig, defaultConfig } from '../data/product';

// Lifted configurator state so the price box, summary and sticky cart bar
// all derive from one place.
export function useConfigurator() {
  const [config, setConfig] = useState(defaultConfig);

  const set = (key, value) => setConfig((c) => ({ ...c, [key]: value }));

  const derived = useMemo(() => computeConfig(config), [config]);

  return { config, set, ...derived };
}
