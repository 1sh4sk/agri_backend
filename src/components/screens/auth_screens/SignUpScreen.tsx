import  { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '../../ui/Button';
import { Inputs } from '../../ui/Inputs';
import { AuthLayout } from '../../layout/AuthLayout';
import { createSignupSchema, SignupFormData } from '../../../utils/auth_validation/signupSchema';
import signUp from '../../../assets/login.png';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
interface SignUpScreenProps {
  // onLogin: () => void;
  // onSuccess: (data: SignupFormData) => void;
  onGuestContinue?: () => void;
}

export const SignUpScreen = ({ 
  // onLogin, onSuccess, 
  onGuestContinue }: SignUpScreenProps) => {
  const { t } = useTranslation();
  const [countryCode, setCountryCode] = useState('+91');
  const { signup, role, language, setIdentifier } = useAuth();
  const navigate = useNavigate();
  const signupSchema = useMemo(() => {
    return createSignupSchema(t);
  }, [t]); // Add i18n.language as dependency
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    // watch,
  } = useForm<SignupFormData>({
    resolver: yupResolver(signupSchema),
    defaultValues: {
      fullName: '',
      email: '',
      mobile: '',
      countryCode: '+91',
    },
    mode: 'onChange'
  });

  // Function to convert language code to lowercase for API
  const getLanguageForAPI = (code: string): string => {
    const languageMap: { [key: string]: string } = {
      'en': 'english',
      'hi': 'hindi', 
      'bn': 'bengali',
      'mr': 'marathi',
      'gu': 'gujarati',
      'ta': 'tamil',
      'te': 'telugu',
      'ml': 'malayalam',
      'pa': 'punjabi',
      'or': 'odia'
    };
    return languageMap[code] || 'english';
  };

  // Function to convert role for API
  const getRoleForAPI = (roleCode: string): string => {
    const roleMap: { [key: string]: string } = {
      'farmer': 'farmer',
      'business': 'business',
      'professional': 'individual', 
      'government': 'government'
    };
    return roleMap[roleCode] || 'former';
  };

  const onSubmit = async (data: SignupFormData): Promise<void> => {
    try {
      if (!role || !language) {
        return;
      }

      // Convert role and language for API
      const apiRole = getRoleForAPI(role);
      const apiLanguage = getLanguageForAPI(language);

      const signupData = {
        userName: data.fullName,
        email: data.email,
        phoneNumber: data.mobile,
        role: apiRole,
        language: apiLanguage,
      };

      console.log('Sending signup data to API:', signupData);

      // Call the signup API with the converted data
      await signup(signupData.userName, signupData.email, signupData.phoneNumber, apiRole, apiLanguage);
      
      // Set identifier for OTP verification
      setIdentifier(signupData.phoneNumber);
      
      // Call the success callback
      // onSuccess(data);
      // navigate('')
      navigate('/otp-verification');
    } catch (error: unknown) {
      console.error('Signup error:', error instanceof Error ? error.message : 'Unknown error');
    }
  };

  const handleGuestContinue = (): void => {
    if (onGuestContinue) {
      onGuestContinue();
    } else {
      console.log('Continuing as guest');
    }
  };

  const handleLoginClick = (): void => {
   
      navigate('/login');
    // }
  };

    // const watchedValues = watch();

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
              disabled={isSubmitting}
          />

          <Inputs
            label={t('emailLabel')}
            type="email"
            placeholder={t('emailPlaceholder')}
            register={register}
            name="email"
            error={errors.email}
            fullWidth
              disabled={isSubmitting}
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
              disabled={isSubmitting}
          />

          <div className='mt-10'>
            <Button
              type="submit"
              variant="primary"
              fullWidth
              disabled={isSubmitting || !language || !role}
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
            onClick={handleLoginClick} 
            className="text-primary font-semibold underline hover:text-primary-600"
              disabled={isSubmitting}
          >
            {t('login')}
          </button>
        </div>
      </div>
    </AuthLayout>
  );
};