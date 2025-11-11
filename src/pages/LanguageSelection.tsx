// import { useState } from 'react';
// import { RadioCard } from '../components/ui/RadioCard';
// import { Button } from '../components/ui/Button';
// import { useTranslation } from 'react-i18next';
// import { LanguageCode } from '../i18n';

// const languages = [
//   { code: 'hi' as LanguageCode, name: 'हिंदी', subtitle: 'हिन्दीमें नि आपका स्वागत है' },
//   { code: 'bn' as LanguageCode, name: 'বাংলা', subtitle: 'বাংলাভাষায় স্বাগতম' },
//   { code: 'mr' as LanguageCode, name: 'मराठी', subtitle: 'मराठीमध्ये तुमचे स्वागत आहे' },
//   { code: 'gu' as LanguageCode, name: 'ગુજરાતી', subtitle: 'ગુજરાતીમાં આપનું સ્વાગત છે' },
//   { code: 'ta' as LanguageCode, name: 'தமிழ்', subtitle: 'தமிழில் வரவேற்கிறோம்' },
//   { code: 'te' as LanguageCode, name: 'తెలుగు', subtitle: 'తెలుగులోవ స్వాగతం' },
//   { code: 'ml' as LanguageCode, name: 'മലയാളം', subtitle: 'മലയാളത്തിൽ സ്വാഗതം' },
//   { code: 'pa' as LanguageCode, name: 'ਪੰਜਾਬੀ', subtitle: 'ਪੰਜਾਬੀ ਵਿਚ ਜੀ ਆਇਆਂ ਨੂੰ' },
//   { code: 'or' as LanguageCode, name: 'ଓଡ଼ିଆ', subtitle: 'ଓଡ଼ିଆରେ ସ୍ୱାଗତ' },
//   { code: 'en' as LanguageCode, name: 'English', subtitle: 'Welcome to Krushiseva' },
// ];

// interface LanguageSelectionProps {
//   onComplete: () => void;
// }

// export const LanguageSelection = ({ onComplete }: LanguageSelectionProps) => {
//   const { i18n, t } = useTranslation();
//   const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode>(i18n.language as LanguageCode);

//   const handleContinue = () => {
//     i18n.changeLanguage(selectedLanguage);
//     localStorage.setItem('i18nextLng', selectedLanguage);
//     localStorage.setItem('language', selectedLanguage);
//     onComplete();
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
//       <div className="w-full max-w-4xl">
//         <div className="text-center mb-8">
//           <h1 className="text-2xl font-semibold text-gray-900 mb-2">
//             {t('language.select.title')}
//           </h1>
//           <p className="text-sm text-gray-600">{t('language.select.subtitle')}</p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4 mb-6">
//           {languages.map((lang) => (
//             <RadioCard
//               key={lang.code}
//               id={lang.code}
//               name="language"
//               value={lang.code}
//               checked={selectedLanguage === lang.code}
//               onChange={(value) => setSelectedLanguage(value as LanguageCode)}
//               title={lang.name}
//               description={lang.subtitle}
//             />
//           ))}
//         </div>

//         <div className="flex justify-center">
//           <Button
//             onClick={handleContinue}
//             size="md"
//             className="px-12"
//             withArrow={true}
//           >
//             {t('button.continue')}
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

import { useState } from 'react';
import { RadioCard } from '../components/ui/RadioCard';
import { Button } from '../components/ui/Button';
import { useTranslation } from 'react-i18next';
import { LanguageCode } from '../i18n';
// Import logo - place your logo file in src/assets/logo.png
import { LogoWithContainer } from '../components/ui/Logo';

const languages = [
  { code: 'hi' as LanguageCode, name: 'हिंदी', subtitle: 'हिन्दी में आपका स्वागत है' },
  { code: 'bn' as LanguageCode, name: 'বাংলা', subtitle: 'বাংলা ভাষায় স্বাগতম' },
  { code: 'mr' as LanguageCode, name: 'मराठी', subtitle: 'मराठीमध्ये तुमचे स्वागत आहे' },
  { code: 'gu' as LanguageCode, name: 'ગુજરાતી', subtitle: 'ગુજરાતીમાં આપનું સ્વાગત છે' },
  { code: 'ta' as LanguageCode, name: 'தமிழ்', subtitle: 'தமிழில் வரவேற்கிறோம்' },
  { code: 'te' as LanguageCode, name: 'తెలుగు', subtitle: 'తెలుగులో స్వాగతం' },
  { code: 'ml' as LanguageCode, name: 'മലയാളം', subtitle: 'മലയാളത്തിൽ സ്വാഗതം' },
  { code: 'pa' as LanguageCode, name: 'ਪੰਜਾਬੀ', subtitle: 'ਪੰਜਾਬੀ ਵਿਚ ਜੀ ਆਇਆਂ ਨੂੰ' },
  { code: 'or' as LanguageCode, name: 'ଓଡ଼ିଆ', subtitle: 'ଓଡ଼ିଆରେ ସ୍ୱାଗତ' },
  { code: 'en' as LanguageCode, name: 'English', subtitle: 'Welcome to Krushiseva' },
];

interface LanguageSelectionProps {
  onComplete: () => void;
}

export const LanguageSelection = ({ onComplete }: LanguageSelectionProps) => {
  const { i18n} = useTranslation();
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
    <div className="h-screen bg-background flex items-center justify-center p-4 overflow-hidden">
      <div className="w-full max-w-4xl">
        {/* Logo */}
       {/* <div className="flex justify-start items-center">
      <div className="w-[104px] h-[88px] rounded-lg bg-white flex items-center justify-center shadow-[0px_0px_8px_4px_rgba(0,0,0,0.04)]">
        <img 
          src={logo} 
          alt="AgriThread Logo"  
          className="h-12 w-auto" // Adjust this based on your actual logo aspect ratio
        />
      </div>
    </div> */}
    <LogoWithContainer />

        {/* Title Section */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Choose Your Preferred Language
          </h1>
          <p className="text-sm text-gray-600">
            Select a language to continue
          </p>
        </div>

        {/* Language Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
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

        {/* Continue Button */}
        <div className="flex justify-center">
          <Button
            onClick={handleContinue}
            size="md"
            className="px-12 border-[1.2px] border-primary"
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