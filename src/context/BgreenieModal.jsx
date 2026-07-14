import { createContext, useContext } from 'react';

const BgreenieCtx = createContext(() => {});

export function BgreenieProvider({ children }) {
  return <BgreenieCtx.Provider value={() => {}}>{children}</BgreenieCtx.Provider>;
}

export const useBgreenie = () => useContext(BgreenieCtx);
