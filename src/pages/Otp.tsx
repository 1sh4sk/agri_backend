import { useState, FormEvent, useEffect } from 'react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { LanguageSelector } from '../components/ui/LanguageSelector';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { useLanguageStyle } from '../contexts/LanguageStyleContext';

interface OTPVerificationProps {
  onSignup: () => void;
  onSuccess: () => void;
  onBack: () => void;
}

const welcomeImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect fill='%23f0f0f0' width='400' height='400'/%3E%3Cg fill='%2322c55e' opacity='0.1'%3E%3Cpath d='M200 50 L250 150 L200 130 L150 150 Z'/%3E%3Cpath d='M200 250 L250 350 L200 330 L150 350 Z'/%3E%3Ccircle cx='200' cy='200' r='80' fill='%2322c55e' opacity='0.2'/%3E%3C/g%3E%3C/svg%3E";

export const OTPVerification = ({ onSignup, onSuccess, onBack }: OTPVerificationProps) => {
  const { verifyOTP, resendOTP, emailOrMobile, setEmailOrMobile } = useAuth();
  const { t, i18n } = useTranslation();
  const { fontClass, textSizeClass, inputFontSize, labelFontSize } = useLanguageStyle();
  const [emailMobile, setEmailMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [error, setError] = useState('');

  // Language-specific line height adjustments
  const isTamil = i18n.language === 'ta';
  const isBangla = i18n.language === 'bn';
  const isHindi = i18n.language === 'hi';
  const isMarathi = i18n.language === 'mr';
  const isGujarati = i18n.language === 'gu';
  const isTelugu = i18n.language === 'te';
  const isMalayalam = i18n.language === 'ml';
  const isPunjabi = i18n.language === 'pa';
  const isOdia = i18n.language === 'or';
  
  // Set line height based on language
  const getLineHeightClass = () => {
    if (isTamil || isMalayalam) return 'leading-loose';
    if (isBangla || isHindi || isMarathi || isGujarati || isTelugu || isPunjabi || isOdia) return 'leading-relaxed';
    return 'leading-normal';
  };

  const lineHeightClass = getLineHeightClass();

  useEffect(() => {
    // If email/mobile is already set from previous step, use it
    if (emailOrMobile) {
      setEmailMobile(emailOrMobile);
    }
    
    // Start resend timer
    setResendTimer(30);
    const timer = setInterval(() => {
      setResendTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [emailOrMobile]);

  const handleOtpChange = (value: string) => {
    setError(''); // Clear error when user starts typing
    
    // Only allow numbers and limit to 6 digits
    const numericValue = value.replace(/\D/g, '').slice(0, 6);
    setOtp(numericValue);
  };

  const handleResendOTP = async () => {
    if (resendTimer === 0) {
      if (!emailMobile) {
        setError(t('auth.otp.enterEmailMobileFirst'));
        return;
      }
      
      setIsLoading(true);
      try {
        setEmailOrMobile(emailMobile);
        await resendOTP();
        setResendTimer(30);
        setError('');
      } catch (error) {
        console.error('Resend OTP error:', error);
        setError(t('auth.otp.resendError'));
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!emailMobile) {
      setError(t('auth.otp.enterEmailMobile'));
      return;
    }

    if (otp.length !== 6) {
      setError(t('auth.otp.invalidLength'));
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      // Set email/mobile first
      setEmailOrMobile(emailMobile);
      // Then verify OTP
      await verifyOTP(otp);
      onSuccess();
    } catch (error) {
      console.error('OTP verification error:', error);
      handleResendOTP()
      setError(error instanceof Error ? error.message : t('auth.otp.verificationError'));
      // Clear OTP on error
      setOtp('');
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

      {/* Right Side - OTP Verification Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8 bg-white">
        <div className="w-full max-w-md">
          {/* Language Selector */}
          <div className="flex justify-end mb-6">
            <LanguageSelector />
          </div>

          {/* OTP Verification Form */}
          <div className="bg-white">
            <div className="text-center mb-6">
              <h1 className={`text-2xl font-bold text-gray-900 mb-1 ${fontClass} ${lineHeightClass}`}>
                {t('auth.otp.title')}
              </h1>
              <p className={`text-gray-600 ${textSizeClass} ${fontClass} ${lineHeightClass}`}>
                {t('auth.otp.subtitle')}
              </p>
            </div>

          {error&&  <></>}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email/Mobile Input */}
              <div>
                <label className={`block ${labelFontSize} font-medium text-gray-700 mb-2 ${fontClass} ${lineHeightClass}`}>
                  {t('auth.otp.emailMobileLabel')}
                </label>
                <Input
                  type="text"
                  placeholder={t('auth.otp.emailMobilePlaceholder')}
                  value={emailMobile}
                  onChange={(e) => setEmailMobile(e.target.value)}
                  required
                  className={`${fontClass} ${inputFontSize} ${lineHeightClass}`}
                  disabled={isLoading}
                />
              </div>

              {/* Single OTP Input Field */}
              <div>
                <label className={`block ${labelFontSize} font-medium text-gray-700 mb-2 ${fontClass} ${lineHeightClass}`}>
                  {t('auth.otp.enterOtp')}
                </label>
                <Input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder={t('auth.otp.otpPlaceholder')}
                  value={otp}
                  onChange={(e) => handleOtpChange(e.target.value)}
                  required
                  className={`${fontClass} ${inputFontSize} ${lineHeightClass}`}
                  disabled={isLoading}
                  maxLength={6}
                />
                <div className={`mt-1 text-xs text-gray-500 ${fontClass} ${lineHeightClass}`}>
                  {t('auth.otp.instructions')}
                </div>
              </div>

              {/* OTP Sent Message */}
              {/* {emailMobile && (
                <div className={`text-center ${textSizeClass} text-gray-600 ${fontClass} ${lineHeightClass} bg-blue-50 p-3 rounded-lg border border-blue-200`}>
                  <span className="font-medium text-blue-700">📧</span> {t('auth.otp.sentTo')}{' '}
                  <span className="font-medium text-blue-800">{emailMobile}</span>
                </div>
              )} */}

              {/* Resend OTP */}
              {/* <div className={`text-center ${textSizeClass} ${fontClass} ${lineHeightClass}`}>
                <span className="text-gray-600">{t('auth.otp.didNotReceive')} </span>
                <button
                  type="button"
                  onClick={handleResendOTP}
                  disabled={resendTimer > 0 || isLoading}
                  className={`${
                    resendTimer > 0 || isLoading 
                      ? 'text-gray-400 cursor-not-allowed' 
                      : 'text-primary-600 hover:text-primary-700 underline font-medium'
                  } transition-colors duration-200`}
                >
                  {resendTimer > 0 
                    ? `${t('auth.otp.resendIn')} ${resendTimer}s` 
                    : t('auth.otp.resend')
                  }
                </button>
              </div> */}

              <Button 
                type="submit" 
                fullWidth 
                disabled={isLoading || otp.length !== 6 || !emailMobile}
                className={`
                  ${fontClass} ${textSizeClass} ${lineHeightClass}
                  py-3 text-lg font-semibold
                  transition-all duration-200
                  ${(isLoading || otp.length !== 6 || !emailMobile) 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:shadow-lg'
                  }
                `}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    {t('auth.otp.verifying')}
                  </div>
                ) : (
                  t('auth.otp.verifyContinue')
                )}
              </Button>
            </form>

            {/* Back to previous step */}
            <div className=' flex justify-between'>
                  <div className={`mt-6 text-center ${textSizeClass} text-gray-600 ${fontClass} ${lineHeightClass}`}>
              <button
                onClick={onBack}
                className="text-primary-600 hover:text-primary-700 underline font-medium transition-colors duration-200"
                disabled={isLoading}
              >
                ← {t('auth.otp.back')}
              </button>
            </div>

            {/* Signup link */}
            <div className={`mt-5 text-center ${textSizeClass} text-gray-600 ${fontClass} ${lineHeightClass}`}>
              {t('auth.otp.newHere')}
              <button
                onClick={onSignup}
                className="text-primary-600 hover:text-primary-700 underline font-medium ml-1 transition-colors duration-200"
                disabled={isLoading}
              >
                {t('auth.otp.createAccount')}
              </button>
            </div>
            </div>
          
          </div>
        </div>
      </div>
    </div>
  );
};