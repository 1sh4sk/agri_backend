import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '../ui/Button';
import { Inputs } from '../ui/Inputs';
import { AuthLayout } from '../layout/AuthLayout';
import { createSignupSchema, SignupFormData } from '../validation/signupSchema';
import signUp from '../../assets/login.png';
import { useTranslation } from 'react-i18next';

interface SignUpScreenProps {
  onLogin: () => void;
  onSuccess: (data: SignupFormData) => void;
  onGuestContinue?: () => void;
}

export const SignUpScreen = ({ onLogin, onSuccess, onGuestContinue }: SignUpScreenProps) => {
  const { t } = useTranslation();
  const [countryCode, setCountryCode] = useState('+91');

  const signupSchema = createSignupSchema(t);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: yupResolver(signupSchema),
    defaultValues: {
      fullName: '',
      email: '',
      mobile: '',
      countryCode: '+91',
    },
  });

  const onSubmit = (data: SignupFormData) => {
    // Add country code to the data
    const formData = { ...data, countryCode };
    onSuccess(formData);
  };

  const handleGuestContinue = () => {
    if (onGuestContinue) {
      onGuestContinue();
    } else {
      // Default guest behavior - proceed without role selection
      console.log('Continuing as guest');
    }
  };

  return (
    <AuthLayout 
      imageUrl={signUp} 
      showGuestButton={true}
      onGuestContinue={handleGuestContinue}
    >
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-gray-900 mb-2 flex items-center justify-center gap-2">
            {t('welcome')}
          </h1>
          <p className="text-xs font-semibold text-gray-600">
            {t('signupTitle')}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <Inputs
            label={t('fullNameLabel')}
            type="text"
            placeholder={t('fullNamePlaceholder')}
            register={register}
            name="fullName"
            error={errors.fullName}
            fullWidth
          />

          <Inputs
            label={t('emailLabel')}
            type="email"
            placeholder={t('emailPlaceholder')}
            register={register}
            name="email"
            error={errors.email}
            fullWidth
          />

          <Inputs
            label={t('mobileLabel')}
            type="tel"
            placeholder={t('mobilePlaceholder')}
            register={register}
            name="mobile"
            error={errors.mobile}
            fullWidth
            withCountryCode
            countryCode={countryCode}
            onCountryCodeChange={setCountryCode}
          />

          <div className='mt-10'>
            <Button
              type="submit"
              variant="primary"
              fullWidth
              disabled={isSubmitting}
              className="mt-6 bg-primary hover:bg-primary-600 disabled:opacity-50 text-white font-medium py-3 rounded-[4px]"
            >
              {isSubmitting ? t('processing') : t('getOTP')}
            </Button>
          </div>
        </form>

        <div className="text-center text-sm text-gray-600">
          {t('alreadyAccount')}{' '}
          <button 
            type="button" 
            onClick={onLogin} 
            className="text-primary font-semibold underline hover:text-primary-600"
          >
            {t('login')}
          </button>
        </div>
      </div>
    </AuthLayout>
  );
};