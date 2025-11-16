// i18n/index.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import the component-specific JSON files
import roleSelection from './locales/roleSelection.json';
import login from './locales/login.json';
import signup from './locales/signup.json';
import otp from './locales/otp.json';
import  AuthLayout from './locales/authLayout.json'

export type LanguageCode = 'en' | 'hi' | 'bn' | 'mr' | 'gu' | 'ta' | 'te' | 'ml' | 'pa' | 'or';

// Combine all translations
const resources = {
  en: { 
    translation: {
      ...roleSelection.en,
      ...login.en,
      ...signup.en,
      ...otp.en,
      ...AuthLayout.en
    }
  },
  hi: { 
    translation: {
      ...roleSelection.hi,
      ...login.hi,
      ...signup.hi,
      ...otp.hi,
      ...AuthLayout.hi
    }
  },
  bn: { 
    translation: {
      ...roleSelection.bn,
      ...login.bn,
      ...signup.bn,
      ...otp.bn,
      ...AuthLayout.bn
    }
  },
  mr: { 
    translation: {
      ...roleSelection.mr,
      ...login.mr,
      ...signup.mr,
      ...otp.mr,
       ...AuthLayout.mr
    }
  },
  gu: { 
    translation: {
      ...roleSelection.gu,
      ...login.gu,
      ...signup.gu,
      ...otp.gu,
       ...AuthLayout.gu
    }
  },
  ta: { 
    translation: {
      ...roleSelection.ta,
      ...login.ta,
      ...signup.ta,
      ...otp.ta,
       ...AuthLayout.ta
    }
  },
  te: { 
    translation: {
      ...roleSelection.te,
      ...login.te,
      ...signup.te,
      ...otp.te,
       ...AuthLayout.te
    }
  },
  ml: { 
    translation: {
      ...roleSelection.ml,
      ...login.ml,
      ...signup.ml,
      ...otp.ml,
       ...AuthLayout.ml
    }
  },
  pa: { 
    translation: {
      ...roleSelection.pa,
      ...login.pa,
      ...signup.pa,
      ...otp.pa,
       ...AuthLayout.pa
    }
  },
  or: { 
    translation: {
      ...roleSelection.or,
      ...login.or,
      ...signup.or,
      ...otp.or,
       ...AuthLayout.or
    }
  },
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