import * as yup from 'yup';

export const createSignupSchema = (t: (key: string) => string) => {
  return yup.object({
    fullName: yup
      .string()
      .required(t('validation.fullNameRequired') || 'Full name is required')
      .min(2, t('validation.fullNameMin') || 'Full name must be at least 2 characters')
      .max(50, t('validation.fullNameMax') || 'Full name must not exceed 50 characters')
      .matches(/^[a-zA-Z\s]+$/, t('validation.fullNameInvalid') || 'Full name can only contain letters and spaces'),
    email: yup
      .string()
      .email(t('validation.emailInvalid') || 'Please enter a valid email address')
      .required(t('validation.emailRequired') || 'Email is required'),
    mobile: yup
      .string()
      .matches(/^[0-9]{10}$/, t('validation.mobileInvalid') || 'Mobile number must be exactly 10 digits')
      .required(t('validation.mobileRequired') || 'Mobile number is required'),
    countryCode: yup
      .string()
      .required(t('validation.countryCodeRequired') || 'Country code is required')
      .default('+91'),
  });
};

export type SignupFormData = yup.InferType<ReturnType<typeof createSignupSchema>>;