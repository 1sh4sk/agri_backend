import React, { createContext, useContext, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

interface LanguageStyleContextType {
  fontClass: string;
  textSizeClass: string;
  isIndicLanguage: boolean;
  inputFontSize: string;
  labelFontSize: string;
  direction: 'ltr' | 'rtl';
}

const LanguageStyleContext = createContext<LanguageStyleContextType | undefined>(undefined);

export const LanguageStyleProvider = ({ children }: { children: ReactNode }) => {
  const { i18n } = useTranslation();
  
  const indicLanguages = ['ml', 'ta', 'te', 'hi', 'bn', 'gu', 'mr', 'pa', 'or'];
  const isIndicLanguage = indicLanguages.includes(i18n.language);
  
  // RTL languages
  const rtlLanguages = ['ar', 'he', 'fa', 'ur'];
  const direction = rtlLanguages.includes(i18n.language) ? 'rtl' : 'ltr';
  
  // Tamil-specific adjustments
  const isTamil = i18n.language === 'ta';
  const isMalayalam = i18n.language === 'ml';
  
  const fontClass = isIndicLanguage ? 'font-indic' : 'font-sans';
  
  // Adjust text sizes for better readability
  const textSizeClass = isTamil ? 'text-[13px]' : 
                       isMalayalam ? 'text-[15px]' : 
                       isIndicLanguage ? 'text-base' : 'text-sm';
  
  // Input field specific sizes
  const inputFontSize = isTamil ? 'text-[12px]' : 
                       isMalayalam ? 'text-[15px]' : 
                       isIndicLanguage ? 'text-base' : 'text-sm';
  
  const labelFontSize = isTamil ? 'text-[15px]' : 
                       isMalayalam ? 'text-[15px]' : 
                       isIndicLanguage ? 'text-base' : 'text-sm';

  return (
    <LanguageStyleContext.Provider value={{ 
      fontClass, 
      textSizeClass, 
      isIndicLanguage,
      inputFontSize,
      labelFontSize,
      direction
    }}>
      {children}
    </LanguageStyleContext.Provider>
  );
};

export const useLanguageStyle = () => {
  const context = useContext(LanguageStyleContext);
  if (context === undefined) {
    throw new Error('useLanguageStyle must be used within a LanguageStyleProvider');
  }
  return context;
};