import { useState, useRef, KeyboardEvent, ClipboardEvent } from 'react';
import { Button } from '../ui/Button';
import { AuthLayout } from '../layout/AuthLayout';

interface OTPVerificationScreenProps {
  onSignup: () => void;
  onSuccess: () => void;
  onBack: () => void;
}

export const OTPVerificationScreen = ({  onSuccess }: OTPVerificationScreenProps) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }

    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

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

    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess();
  };

  return (
    <AuthLayout imageUrl="https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?auto=compress&cs=tinysrgb&w=1200">
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            OTP Verification
          </h1>
          <p className="text-sm text-gray-600">
            Please enter the verification code sent to Email Id/Mobile No.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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
                className="w-12 h-12 text-center text-xl font-semibold border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            ))}
          </div>

          <div className="text-center text-sm text-gray-600">
            Not received a code?{' '}
            <button type="button" className="text-primary font-semibold underline hover:text-primary-600">
              Resend
            </button>
          </div>

          <Button
            type="submit"
            variant="primary"
            fullWidth
            className="mt-6 bg-primary hover:bg-primary-600"
          >
            Verify OTP
          </Button>

          <div className="text-center">
            <button
              type="button"
              className="text-sm text-primary font-semibold underline hover:text-primary-600"
            >
              Continue as Guest
            </button>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};
