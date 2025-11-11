import { ReactNode } from 'react';
import { LogoWithContainer } from '../ui/Logo';
import { LanguageSelector } from '../ui/LanguageSelector';
// Local image import - replace with your actual image path
import authImage from '../../assets/role.png';

interface AuthLayoutProps {
  children: ReactNode;
  imageUrl?: string;
  title?: string;
  subtitle?: string;
  showCarousel?: boolean;
}

export const AuthLayout = ({
  children,
  imageUrl = authImage, // Use local image as default
  title = 'Agro, Made simple',
  subtitle = 'Welcome to AgriThread — India\'s digital farming network.',
  showCarousel = true
}: AuthLayoutProps) => {
  return (
    <div className="h-screen overflow-hidden bg-[#FBFEFD] flex">
      {/* Image Section - Fixed width */}
      <div className="hidden lg:flex lg:w-3/5 relative">
        <div
          className="absolute inset-0 bg-cover bg-center m-5 rounded-md"
          style={{ backgroundImage: `url(${imageUrl})` }}
        >
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black/90 to-transparent rounded-2xl" />
</div>

        <div className="relative w-full flex flex-col justify-between p-4 m-4">
          <LogoWithContainer />
          
          <div className="text-white pb-8">
            <h1 className="text-2xl font-semibold mb-2">{title}</h1>
            <p className="text-sm text-white/90 mb-6">{subtitle}</p>

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
      <div className="w-full lg:w-2/5 h-screen flex  flex-col overflow-hidden">
        <div className="flex m-4 justify-end ">
          <LanguageSelector />
        </div>

        <div className="flex-1 flex items-center justify-center px-6 lg:px-8 overflow-y-auto">
          <div className="w-full max-w-md py-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};