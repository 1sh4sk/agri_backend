// validation/signupSchema.ts
import * as yup from 'yup';

export const createSignupSchema = (t: (key: string) => string) => {
  return yup.object({
    fullName: yup
      .string()
      .required(t('validation.fullNameRequired'))
      .min(2, t('validation.fullNameMin'))
      .max(50, t('validation.fullNameMax'))
      .matches(/^[a-zA-Z\s]+$/, t('validation.fullNameInvalid')),
    email: yup
      .string()
      .email(t('validation.emailInvalid'))
      .required(t('validation.emailRequired')),
    mobile: yup
      .string()
      .matches(/^[0-9]{10}$/, t('validation.mobileInvalid'))
      .required(t('validation.mobileRequired')),
    countryCode: yup
      .string()
      .required(t('validation.countryCodeRequired'))
      .default('+91'),
  });
};

export type SignupFormData = yup.InferType<ReturnType<typeof createSignupSchema>>;