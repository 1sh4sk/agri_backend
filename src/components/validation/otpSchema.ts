// validation/otpSchema.ts
import * as yup from 'yup';

export const createOtpSchema = (t: (key: string) => string) => {
  return yup.object({
    otp: yup
      .string()
      .required(t('validation.otpRequired'))
      .matches(/^[0-9]{6}$/, t('validation.otpInvalid'))
      .length(6, t('validation.otpLength')),
  });
};

export type OTPFormData = yup.InferType<ReturnType<typeof createOtpSchema>>;