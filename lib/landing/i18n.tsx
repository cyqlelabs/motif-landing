'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import en from './locales/en.json';
import es from './locales/es.json';

export type Locale = 'en' | 'es';
export type Translations = typeof en;

const locales: Record<Locale, Translations> = { en, es };
const STORAGE_KEY = 'motif-lang';
const SUPPORTED: Locale[] = ['en', 'es'];

function detect(): Locale {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && SUPPORTED.includes(saved as Locale)) return saved as Locale;
  } catch {}
  const nav = navigator.language || '';
  if (nav.startsWith('es')) return 'es';
  return 'en';
}

interface I18nContextValue {
  locale: Locale;
  t: Translations;
  setLocale: (l: Locale) => void;
}

const I18nContext = createContext<I18nContextValue>({
  locale: 'en',
  t: en,
  setLocale: () => {},
});

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');

  useEffect(() => {
    setLocaleState(detect());
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {}
    document.documentElement.lang = l;
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <I18nContext.Provider value={{ locale, t: locales[locale], setLocale }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
