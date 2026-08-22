import { createContext, useContext, useEffect, useState } from 'react';

const LanguageContext = createContext(null);

const STORAGE_KEY = 'solvio-lang';

// localStorage throws (SecurityError) when site data is blocked — private
// windows, embedded/sandboxed frames, strict cookie settings. Guard both sides
// so a blocked browser silently falls back to English instead of crashing the
// language toggle.
function readLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === 'th' || saved === 'en' ? saved : 'en';
  } catch {
    return 'en';
  }
}

function persistLang(lang) {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    /* storage unavailable — language still applies for this page view */
  }
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(readLang);

  // Keep <html lang> in sync so screen readers, browser translate prompts and
  // search engines see the language the visitor is actually reading.
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const toggle = () =>
    setLang((current) => {
      const next = current === 'en' ? 'th' : 'en';
      persistLang(next);
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
