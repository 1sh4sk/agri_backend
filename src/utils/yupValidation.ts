import * as yup from "yup";

export const basicDetailsSchema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  mobileNumber: yup
    .string()
    .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
    .required("Mobile number is required"),
  location: yup.string().required("Location is required"),
  referralCode: yup.string().optional(),
});
