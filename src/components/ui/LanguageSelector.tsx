import { useState } from "react";
import { Languages } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LanguageCode } from "../../i18n";

interface LanguageSelectorProps {
  basicDetails?: boolean; // default false
}

const languages = [
  { code: "en" as LanguageCode, name: "English" },
  { code: "hi" as LanguageCode, name: "हिंदी" },
  { code: "bn" as LanguageCode, name: "বাংলা" },
  { code: "mr" as LanguageCode, name: "मराठी" },
  { code: "gu" as LanguageCode, name: "ગુજરાતી" },
  { code: "ta" as LanguageCode, name: "தமிழ்" },
  { code: "te" as LanguageCode, name: "తెలుగు" },
  { code: "ml" as LanguageCode, name: "മലയാളം" },
  { code: "pa" as LanguageCode, name: "ਪੰਜਾਬੀ" },
  { code: "or" as LanguageCode, name: "ଓଡ଼ିଆ" },
];

export const LanguageSelector = ({
  basicDetails = false,
}: LanguageSelectorProps) => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (lang: LanguageCode) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("i18nextLng", lang);
    setIsOpen(false);
  };

  const currentLanguage =
    languages.find((lang) => lang.code === i18n.language) || languages[0];

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 p-1 bg-white ${
          basicDetails ? "border-none" : "border border-gray-300 px-3 "
        } rounded hover:border-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
      >
        <Languages size={16} className="text-gray-500" />
        <span className="text-sm text-gray-700">{currentLanguage.name}</span>
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-64 overflow-y-auto">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors flex items-center gap-2 ${
                  i18n.language === lang.code
                    ? "bg-green-50 text-green-700 font-medium"
                    : "text-gray-700"
                }`}
              >
                <span>{lang.name}</span>
                {i18n.language === lang.code && (
                  <svg
                    className="w-4 h-4 ml-auto"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
