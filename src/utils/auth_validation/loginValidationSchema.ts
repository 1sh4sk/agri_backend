// validation/loginValidationSchema.ts
import * as yup from 'yup';

export const createLoginSchema = (t: (key: string) => string) => {
  return yup.object({
    email: yup
      .string()
      .email(t('validation.emailInvalid'))
      .optional()
      .default(''),
    mobile: yup
      .string()
      .matches(/^[0-9]{10}$/, t('validation.mobileInvalid'))
      .optional()
      .default(''),
  }).test(
    'at-least-one-field',
    t('validation.atLeastOne'),
    function (value) {
      const { email, mobile } = value;
      return !!(email && email.length > 0) || !!(mobile && mobile.length > 0);
    }
  );
};

export type LoginFormData = yup.InferType<ReturnType<typeof createLoginSchema>>;