import { useState } from 'react';
import { RadioCard } from '../ui/RadioCard';
import { Button } from '../ui/Button';
import { useTranslation } from 'react-i18next';
import { LanguageCode } from '../../i18n';
import { LogoWithContainer } from '../ui/Logo';

const languages = [
  { code: 'hi' as LanguageCode, name: 'हिंदी', subtitle: 'source quality products, expand your networkand grow your agricultural business.' },
  { code: 'bn' as LanguageCode, name: 'बাংলা', subtitle: 'source quality products, expand your networkand grow your agricultural business.' },
  { code: 'mr' as LanguageCode, name: 'मराठी', subtitle: 'source quality products, expand your networkand grow your agricultural business.' },
  { code: 'gu' as LanguageCode, name: 'ગુજરાતી', subtitle: 'source quality products, expand your networkand grow your agricultural business.' },
  { code: 'ta' as LanguageCode, name: 'தமிழ்', subtitle: 'source quality products, expand your networkand grow your agricultural business.' },
  { code: 'te' as LanguageCode, name: 'తెలుగు', subtitle: 'source quality products, expand your networkand grow your agricultural business.' },
  { code: 'ml' as LanguageCode, name: 'മലയാളം', subtitle: 'source quality products, expand your networkand grow your agricultural business.' },
  { code: 'pa' as LanguageCode, name: 'ਪੰਜਾਬੀ', subtitle: 'source quality products, expand your networkand grow your agricultural business.' },
  { code: 'or' as LanguageCode, name: 'ଓଡ଼ିଆ', subtitle: 'source quality products, expand your networkand grow your agricultural business.'},
  { code: 'en' as LanguageCode, name: 'English', subtitle: 'source quality products, expand your networkand grow your agricultural business.' },
];

interface LanguageSelectionProps {
  onComplete: () => void;
}

export const LanguageSelection = ({ onComplete }: LanguageSelectionProps) => {
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode | null>(null);

  const handleContinue = () => {
    if (selectedLanguage) {
      i18n.changeLanguage(selectedLanguage);
      localStorage.setItem('i18nextLng', selectedLanguage);
      localStorage.setItem('language', selectedLanguage);
      onComplete();
    }
  };

  return (
    <div className="h-screen bg-background flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-[1110px] h-full flex flex-col">
        {/* Logo */}
        <div className="flex-shrink-0 mt-2">
          <LogoWithContainer size="small" />
        </div>

        {/* Title Section */}
        <div className="flex-shrink-0 text-center mb-4">
          <h1 className="text-[28px] font-semibold text-gray-900 mb-2">
            Choose Your Preferred Language
          </h1>
          <p className="text-[18px] text-gray-600">
            Select a language to continue
          </p>
        </div>

        {/* Scrollable Language Cards Container */}
        <div className="flex-1 min-h-[55%] mb-3"> {/* flex-1 min-h-0 allows this container to grow and shrink */}
          <div className="h-full overflow-y-auto scrollbar-hide"> {/* scrollbar-hide class to hide scrollbar */}
            <div className="grid grid-cols-1 md:grid-cols-3 p-1 gap-4 pb-4">
              {languages.map((lang) => (
                <RadioCard
                  key={lang.code}
                  id={lang.code}
                  name="language"
                  value={lang.code}
                  checked={selectedLanguage === lang.code}
                  onChange={(value) => setSelectedLanguage(value as LanguageCode)}
                  title={lang.name}
                  description={lang.subtitle}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Fixed Continue Button */}
        <div className="flex-shrink-0 mb-2 flex justify-center">
          <Button
            onClick={handleContinue}
            size="md"
            variant="primaryNew"
            withArrow={true}
            disabled={!selectedLanguage}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};