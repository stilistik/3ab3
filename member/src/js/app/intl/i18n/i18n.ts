import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import deCH from './de-CH.json';
import de from './de.json';

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  'de-CH': deCH,
  de: de,
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: window.localStorage.getItem('lang'),

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export { i18n };
