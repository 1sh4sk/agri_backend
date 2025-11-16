import { ReactNode } from 'react';
import { LogoWithContainer } from '../ui/Logo';
import { LanguageSelector } from '../ui/LanguageSelector';
import { useTranslation } from 'react-i18next';
// Local image import - replace with your actual image path
import authImage from '../../assets/role.png';

interface AuthLayoutProps {
  children: ReactNode;
  imageUrl?: string;
  title?: string;
  subtitle?: string;
  showCarousel?: boolean;
  showGuestButton?: boolean;
  onGuestContinue?: () => void;
}

export const AuthLayout = ({
  children,
  imageUrl = authImage, // Use local image as default
  title,
  subtitle,
  showCarousel = true,
  showGuestButton = true,
  onGuestContinue
}: AuthLayoutProps) => {
  const { t } = useTranslation();

  // Use provided title/subtitle or fallback to translations
  const displayTitle = title || t('authLayout.title');
  const displaySubtitle = subtitle || t('authLayout.subtitle');

  return (
    <div className="h-screen  overflow-hidden bg-[#FBFEFD] flex">
      {/* Image Section - Fixed width */}
      <div className="hidden lg:flex lg:w-[61%] relative">
        <div
          className="absolute inset-0 bg-cover bg-center m-5 rounded-md"
          style={{ backgroundImage: `url(${imageUrl})` }}
        >
          <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black/90 to-transparent rounded-2xl" />
        </div>

        <div className="relative w-full flex flex-col justify-between p-[22px] m-4">
          <LogoWithContainer />
          
          <div className="text-white pb-10">
            <h1 className="text-3xl font-semibold mb-2">{displayTitle}</h1>
            <p className="text-md text-white/90 mb-6">{displaySubtitle}</p>

            {showCarousel && (
              <div className="flex gap-2">
                <div className="w-10 h-1 bg-white rounded-full" />
                <div className="w-10 h-1 bg-white/40 rounded-full" />
                <div className="w-10 h-1 bg-white/40 rounded-full" />
                <div className="w-10 h-1 bg-white/40 rounded-full" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Form Section - Fixed width */}
      <div className="w-full lg:w-[42%] h-screen flex flex-col overflow-hidden">
        <div className="flex mx-4 mt-4 justify-end">
          <LanguageSelector />
        </div>

        <div className="flex-1 flex items-center justify-center px-6 lg:px-8 overflow-y-auto">
          <div className="w-full max-w-md px-12 py-4">
            {children}
          </div>
        </div>
        
        {showGuestButton && (
          <div className="text-center mb-12">
            <button
              type="button"
              onClick={onGuestContinue}
              className="text-[16px] text-primary font-semibold underline hover:text-primary-600"
            >
              {t('authLayout.continueAsGuest')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};