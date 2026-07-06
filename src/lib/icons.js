// Named-import icon registry. Components that pick an icon by string name
// (from data files) import this map instead of `import * as Icons from
// 'lucide-react'` — the wildcard import defeats tree-shaking and pulls the
// entire icon set (~1 MB) into the bundle. Add a line here when data references
// a new icon name.
import {
  Check,
  Coins,
  CreditCard,
  Headphones,
  RotateCcw,
  ShieldCheck,
  Package,
  Truck,
  PiggyBank,
  TrendingUp,
  UserPlus,
  Share2,
  Briefcase,
  Users,
} from 'lucide-react';

export const icons = {
  Check,
  Coins,
  CreditCard,
  Headphones,
  RotateCcw,
  ShieldCheck,
  Package,
  Truck,
  PiggyBank,
  TrendingUp,
  UserPlus,
  Share2,
  Briefcase,
  Users,
};
