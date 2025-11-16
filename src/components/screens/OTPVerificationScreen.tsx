import { useState, useRef, KeyboardEvent, ClipboardEvent } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '../ui/Button';
import { AuthLayout } from '../layout/AuthLayout';
import { createOtpSchema, OTPFormData } from '../validation/otpSchema';
import otpImg from '../../assets/login.png';
import { useTranslation } from 'react-i18next';

interface OTPVerificationScreenProps {
  contactInfo?: string;
  onSuccess: () => void;
  onBack: () => void;
  onResend?: () => void;
  onGuestContinue?: () => void;
}

export const OTPVerificationScreen = ({ 
  contactInfo,
  onSuccess, 
  onBack,
  onResend,
  onGuestContinue
}: OTPVerificationScreenProps) => {
  const { t } = useTranslation();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpError, setOtpError] = useState('');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const otpSchema = createOtpSchema(t);

  const {
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<OTPFormData>({
    resolver: yupResolver(otpSchema),
  });

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }

    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setOtpError('');

    setValue('otp', newOtp.join(''));

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').slice(0, 6);

    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = pastedData.split('').concat(Array(6 - pastedData.length).fill(''));
    setOtp(newOtp);
    setOtpError('');

    setValue('otp', newOtp.join(''));

    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const onSubmit = async (data: OTPFormData) => {
    const otpValue = otp.join('');
    
    if (otpValue.length !== 6) {
      setOtpError(t('enterAllDigits'));
      return;
    }

    try {
      await otpSchema.validate({ otp: otpValue });
      onSuccess();
    } catch (error: any) {
      setOtpError(error.message || 'Invalid OTP');
    }
  };

  const handleResend = () => {
    setOtp(['', '', '', '', '', '']);
    setOtpError('');
    setValue('otp', '');
    inputRefs.current[0]?.focus();
    onResend?.();
  };

  const handleGuestContinue = () => {
    if (onGuestContinue) {
      onGuestContinue();
    } else {
      console.log('Continuing as guest');
    }
  };

  return (
    <AuthLayout 
      imageUrl={otpImg} 
      showGuestButton={true}
      onGuestContinue={handleGuestContinue}
    >
      <div className="space-y-6">
        <div className="text-center relative">
          <button
            type="button"
            onClick={onBack}
            className="absolute top-0 left-0 text-gray-600 hover:text-gray-900"
          >
            <svg className="w-1 h-61" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <h1 className="text-xl font-semibold text-gray-900 mb-2">
            {t('otpVerification')}
          </h1>
          <p className="text-xs text-gray-500">
            {t('otpSentTo')}{' '}
            {contactInfo ? (
              <span className="font-semibold text-gray-900">{contactInfo}</span>
            ) : (
              t('yourContact')
            )}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mb-6">
          <div>
            <div className="flex gap-3 justify-center">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className={`w-[53px] h-[53px] text-center text-xl font-semibold border-[1px] border-primary rounded-[6px] focus:outline-none focus:ring-2 transition-all ${
                    otpError 
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
                      : 'border-gray-300 focus:border-primary focus:ring-primary/20'
                  }`}
                />
              ))}
            </div>
            {otpError && (
              <p className="mt-2 text-xs text-red-600 text-center">{otpError}</p>
            )}
          </div>

          <div className="text-center text-sm text-gray-600">
            {t('notReceived')}{' '}
            <button 
              type="button" 
              onClick={handleResend}
              className="text-primary font-semibold underline hover:text-primary-600"
            >
              {t('resend')}
            </button>
          </div>

          <Button
            type="submit"
            variant="primary"
            fullWidth
            disabled={isSubmitting}
            // className="mt-6 bg-primary hover:bg-primary-600 disabled:opacity-50 text-white font-medium py-3 rounded-[4px]"
          >
            {isSubmitting ? t('verifying') : t('verifyOTP')}
          </Button>
        </form>
      </div>
    </AuthLayout>
  );
};