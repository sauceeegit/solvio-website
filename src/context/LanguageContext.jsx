import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('solvio-lang') || 'en');

  const toggle = () => setLang((l) => {
    const next = l === 'en' ? 'th' : 'en';
    localStorage.setItem('solvio-lang', next);
    return next;
  });

  return (
    <LanguageContext.Provider value={{ lang, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
