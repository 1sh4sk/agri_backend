export type LanguageCode = 'en' | 'hi' | 'bn' | 'mr' | 'gu' | 'ta' | 'te' | 'ml' | 'pa' | 'or';

export interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string) => string;
}