import React from 'react';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import de from 'javascript-time-ago/locale/de';
import deCH from './timeAgo/de-CH.json';
import { i18n } from './i18n/i18n';

TimeAgo.addLocale(en);
TimeAgo.addLocale(de);
// @ts-ignore
TimeAgo.addLocale(deCH);

export enum Language {
  deCH = 'de-CH',
  de = 'de',
  en = 'en',
}

interface LanguageContextValue {
  language: Language;
  changeLanguage: (lang: Language) => void;
  i18n: typeof i18n;
  timeAgo: TimeAgo;
}

const LanguageContext = React.createContext<LanguageContextValue | undefined>(
  undefined
);

export const useLanguage = (): LanguageContextValue => {
  const contextValue = React.useContext(LanguageContext);
  if (contextValue === undefined)
    throw new Error('useLanguage must be used within LanguageContext provider');
  return contextValue;
};

function getInitialLanguage(): Language {
  return (window.localStorage.getItem('lang') || 'de-CH') as Language;
}

export const LanguageProvider: React.FC = ({ children }) => {
  const [language, setLanguage] = React.useState<Language>(() =>
    getInitialLanguage()
  );

  function changeLanguage(lang: Language) {
    setLanguage(lang);
    window.localStorage.setItem('lang', lang);
    i18n.changeLanguage(lang);
  }

  const timeAgo = new TimeAgo(language);

  return (
    <LanguageContext.Provider
      value={{
        language,
        changeLanguage,
        i18n,
        timeAgo,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
