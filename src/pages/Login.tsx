import { useState, FormEvent } from 'react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { LanguageSelector } from '../components/ui/LanguageSelector';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { useLanguageStyle } from '../contexts/LanguageStyleContext';

interface LoginProps {
  onSignup: () => void;
  onSuccess: () => void;
}

const welcomeImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect fill='%23f0f0f0' width='400' height='400'/%3E%3Cg fill='%2322c55e' opacity='0.1'%3E%3Cpath d='M200 50 L250 150 L200 130 L150 150 Z'/%3E%3Cpath d='M200 250 L250 350 L200 330 L150 350 Z'/%3E%3Ccircle cx='200' cy='200' r='80' fill='%2322c55e' opacity='0.2'/%3E%3C/g%3E%3C/svg%3E";

export const Login = ({ onSignup, onSuccess }: LoginProps) => {
  const { login } = useAuth();
  const { t, i18n } = useTranslation();
  const { fontClass, textSizeClass, inputFontSize, labelFontSize } = useLanguageStyle();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
  

  // Tamil-specific line height adjustment
  const isTamil = i18n.language === 'ta';
  const lineHeightClass = isTamil ? 'leading-relaxed' : 'leading-normal';

  // const handleSubmit = async (e: FormEvent) => {
  //   e.preventDefault();
  
  //   setIsLoading(true);
  //   try {
  //     await login(email, password);
  //     onSuccess();
  //   } catch (error) {
  //     console.error('Login error:', error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await login(email, password);
      // This will throw an error "OTP verification required"
      // So this line won't be reached
      onSuccess();
    } catch (error) {
      console.error('Login error:', error);
      if (error instanceof Error && error.message === 'OTP verification required') {
        // OTP verification is required, navigate to OTP page
        onSuccess();
      } else {
        // Handle other errors (invalid credentials, etc.)
        setError(error instanceof Error ? error.message : 'Login failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="flex h-screen overflow-hidden bg-white">
      {/* Left Side - Image and Text */}
      <div className="hidden lg:flex lg:w-1/2 bg-gray-50 flex-col items-center justify-center px-12">
        <div className="max-w-sm w-full">
          <div className="bg-white rounded-lg shadow-sm mb-6">
            <img 
              src={welcomeImage}
              alt="Welcome illustration"  
              className="w-full h-auto"
            />
          </div>
          <div className="text-center">
            <h2 className={`text-xl font-semibold text-gray-900 mb-2 ${fontClass} ${lineHeightClass}`}>
              {t('welcome.title')}
            </h2>
            <p className={`text-gray-600 ${textSizeClass} ${fontClass} ${lineHeightClass}`}>
              {t('welcome.subtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8 bg-white">
        <div className="w-full max-w-md">
          {/* Language Selector */}
          <div className="flex justify-end mb-6">
            <LanguageSelector />
          </div>

          {/* Login Form */}
          <div className="bg-white">
            <div className="text-center mb-6">
              <h1 className={`text-2xl font-bold text-gray-900 mb-1 ${fontClass} ${lineHeightClass}`}>
                {t('auth.login.title')}
              </h1>
              <p className={`text-gray-600 ${textSizeClass} ${fontClass} ${lineHeightClass}`}>
                {t('auth.login.subtitle')}
              </p>
            </div>

            {error && (
              <div className={`mb-4 p-3 text-sm text-red-600 bg-red-50 rounded-md ${fontClass}`}>
                {error}
              </div>
            )}


            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className={`block ${labelFontSize} font-medium text-gray-700 mb-2 ${fontClass} ${lineHeightClass}`}>
                  {t('auth.email.label')}
                </label>
                <Input
                  type="text" 
                  placeholder={t('auth.email.placeholder')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={`${fontClass} ${inputFontSize} ${lineHeightClass}`}
                />
              </div>

              <div>
                <label className={`block ${labelFontSize} font-medium text-gray-700 mb-2 ${fontClass} ${lineHeightClass}`}>
                  {t('auth.password.label')}
                </label>
                <Input
                  type="password"
                  placeholder={t('auth.password.placeholder')}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={`${fontClass} ${inputFontSize} ${lineHeightClass}`}
                />
              </div>

              <div className={`flex items-center justify-between ${textSizeClass} ${fontClass} ${lineHeightClass}`}>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="mr-2 h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary-500"
                  />
                  <span className="text-gray-700">{t('auth.remember')}</span>
                </label>
                <button
                  type="button"
                  className="text-gray-700 hover:text-primary transition-colors"
                >
                  {t('auth.forgot')}
                </button>
              </div>

              <Button type="submit" fullWidth disabled={isLoading} className={`${fontClass} ${textSizeClass} ${lineHeightClass}`}>
                {isLoading ? '...' : t('auth.login.button')}
              </Button>
            </form>

            <div className={`mt-5 text-center ${textSizeClass} text-gray-600 ${fontClass} ${lineHeightClass}`}>
              {t('auth.login.footer').split('?')[0]}?
              <button
                onClick={onSignup}
                className="text-primary hover:underline ml-1"
              >
                {t('auth.login.footer').split('?')[1]}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};