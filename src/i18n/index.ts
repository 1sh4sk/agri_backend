import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import hi from './locales/hi.json';
import bn from './locales/bn.json';
import gu from './locales/gu.json';
import mr from './locales/mr.json';
import or from './locales/or.json';
import pa from './locales/pa.json';
import ta from './locales/ta.json';
import te from './locales/te.json';
import ml from './locales/ml.json';

export type LanguageCode = 'en' | 'hi' | 'bn' | 'mr' | 'gu' | 'ta' | 'te' | 'ml' | 'pa' | 'or';

const resources = {
  en: { translation: en },
  hi: { translation: hi },
  bn: { translation: bn },
  gu: { translation: gu },
  mr: { translation: mr },
  or: { translation: or },
  pa: { translation: pa },
  ta: { translation: ta },
  te: { translation: te },
  ml: { translation: ml },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;