'use client';

import { SessionProvider } from 'next-auth/react';
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Dictionary, Locale } from '@/types';
import en from '@/dictionaries/en';
import ne from '@/dictionaries/ne';

const dictionaries: Record<Locale, Dictionary> = { en, ne };

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Dictionary;
}

const LocaleContext = createContext<LocaleContextType>({
  locale: 'en',
  setLocale: () => {},
  t: en,
});

export const useLocale = () => useContext(LocaleContext);

function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');

  useEffect(() => {
    const saved = localStorage.getItem('healthdocx-locale') as Locale;
    if (saved && dictionaries[saved]) {
      setLocaleState(saved);
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('healthdocx-locale', newLocale);
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t: dictionaries[locale] }}>
      {children}
    </LocaleContext.Provider>
  );
}

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <LocaleProvider>{children}</LocaleProvider>
    </SessionProvider>
  );
}
