import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '../../ui/Button';
import { Inputs } from '../../ui/Inputs';
import { AuthLayout } from '../../layout/AuthLayout';
import { createLoginSchema, LoginFormData } from '../../../utils/auth_validation/loginValidationSchema';
import login from '../../../assets/login.png';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
// import authService from '../../services/auth.service';
import { useAuth } from '../../../contexts/AuthContext';

interface LoginScreenProps {
  // onSignup: () => void;
  onSuccess: (data: LoginFormData) => void;
  onGuestContinue?: () => void;
}

export const LoginScreen = ({ 
  // onSignup,
   onSuccess, onGuestContinue }: LoginScreenProps) => {
  const { t } = useTranslation();
  
  const { login: loginApi, setIdentifier } = useAuth();
  const navigate = useNavigate();
  const loginSchema = React.useMemo(() => createLoginSchema(t), [t]);

    

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      mobile: '',
    }
  });

  const [countryCode, setCountryCode] = React.useState('+91');

  // Watch form values to enable/disable submit button
   const formValues = watch();
  const hasAtLeastOneField = !!(formValues.email || formValues.mobile);

// In LoginScreen.tsx, update the onSubmit function:
const onSubmit = async (data: LoginFormData): Promise<void> => {
  try {
    // Determine identifier (email or phone)
    const identifier = data.email || `${data.mobile}`;
    
    console.log('Sending login request for identifier:', identifier);

    // Call the login API to send OTP
    await loginApi(identifier);
    
    // Store identifier for OTP verification
    setIdentifier(identifier);
    
    // Call the success callback
    onSuccess(data);
    
    // Navigate to login OTP verification
    navigate('/login-otp-verification');
  } catch (error: unknown) {
    console.error('Login error:', error instanceof Error ? error.message : 'Unknown error');
  }
};

  const handleCountryCodeChange = (code: string) => {
    setCountryCode(code);
  };

  const handleGuestContinue = () => {
    if (onGuestContinue) {
      onGuestContinue();
    } else {
      // Default guest behavior - proceed without role selection
      console.log('Continuing as guest');
    }
  };
  const handleSignupClick = () => {
 
   navigate('/language-selection');
    
  
  };

  return (
    <AuthLayout 
      imageUrl={login} 
      showGuestButton={true}
      onGuestContinue={handleGuestContinue} 
    >
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2 flex items-center justify-center gap-2">
            {t('welcome')}
          </h1>
          <p className="text-md font-semibold text-gray-600">
            {t('loginTitle')}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-1">
          {/* Email Input */}
          <Inputs<LoginFormData>
            type="email"
            label={t('emailLabel')}
            placeholder={t('emailPlaceholder')}
            error={errors.email}
            register={register}
            name="email"
          />

          {/* Or separator with shorter lines */}
          <div className="flex items-center px-2 justify-center pt-2">
            <div className="flex-grow border-t border-gray-300 max-w-[140px]"></div>
            <span className="mx-4 text-sm text-gray-500 font-medium">{t('or')}</span>
            <div className="flex-grow border-t border-gray-300 max-w-[140px]"></div>
          </div>

          {/* Phone Input with Country Code */}
          <Inputs<LoginFormData>
            type="tel"
            label={t('mobileLabel')}
            placeholder={t('mobilePlaceholder')}
            error={errors.mobile}
            register={register}
            name="mobile"
            withCountryCode={true}
            countryCode={countryCode}
            onCountryCodeChange={handleCountryCodeChange}
          />

          {/* Show validation error for at least one field */}
          {errors.root && (
            <div className="text-center">
              <p className="text-sm text-red-600">
                {errors.root.message}
              </p>
            </div>
          )}

          <div className='mt-10'>
            <Button
              type="submit"
              variant="primary"
              fullWidth
              disabled={isSubmitting || !hasAtLeastOneField}
              className="mt-6 bg-primary hover:bg-primary-600 disabled:opacity-50 text-white font-medium py-3 rounded-[4px]"
            >
              {isSubmitting ? t('sendingOTP') : t('getOTP')}
            </Button>
          </div>
        </form>

        <div className="text-center text-xs text-black">
          {t('noAccount')}{' '}
          <button 
            type="button" 
            onClick={handleSignupClick} 
            className="text-primary font-semibold underline hover:text-primary-600"
          >
            {t('signUp')}
          </button>
        </div>
      </div>
    </AuthLayout>
  );
};