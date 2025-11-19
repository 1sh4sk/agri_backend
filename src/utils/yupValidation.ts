import * as yup from "yup";

export interface CompleteFormData {
  fullName: string;
  mobileNumber: string;
  location: string;
  referralCode?: string;

  //kyc details
  aadhaar?: string;
  pan?: string;
  govtSchemeProof?: File | null;
  farmerID?: File | null;

  // 🌱 Farmer Details
  preferredLanguage?: string;
  dob?: string;
  farmExperience?: number;
  gender?: string;
  email?: string;
  isFPO?: boolean;
  fpoName?: string;
  registrationNumber?: string;

  // Farm Details
  cropList?: string[];
  farmingType?: string;
  landSize?: number;

  //additional Details
  certificates?: File[] | null;
}

export const basicDetailsFormSchema = yup.object({
  fullName: yup.string().required("Full Name is required"),
  mobileNumber: yup
    .string()
    .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
    .required("Mobile number is required"),
  location: yup.string().required("Location is required"),
  referralCode: yup.string().optional(),
});

export const KYCAadhaarFormSchema = yup.object({});

export const KYCPANFormSchema = yup.object({});

export const KYCOtherFormSchema = yup.object({
  govtSchemeProof: yup.mixed().nullable(),
  farmerID: yup.mixed().nullable(),
});

export const farmerDetailsFormSchema = yup.object({
  fullName: yup.string().required("Full Name is required"),
  mobileNumber: yup
    .string()
    .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
    .required("Mobile number is required"),
  location: yup.string().required("Location is required"),
  preferredLanguage: yup.string().required(),
  dob: yup.string().required(),
  farmExperience: yup.number().required(),
  gender: yup.string().required(),
  email: yup.string().email().optional(),
  referralCode: yup.string().optional(),
  isFPO: yup.boolean(),
  fpoName: yup.string().when("isFPO", {
    is: true,
    then: (schema) => schema.required(),
  }),
});

export const LandAndCropDetailsFormSchema = yup.object().shape({
  landSize: yup
    .number()
    .typeError("Land size must be a number")
    .positive("Land size must be greater than 0")
    .required("Land size is required"),

  farmingType: yup.string().required("Please select your farming type"),

  cropList: yup
    .array()
    .of(yup.string())
    .min(1, "Please select at least one crop")
    .required("Crop list is required"),
});

export const cropListFormSchema = yup.object().shape({
  cropName: yup.string().trim().required("Crop name is required"),

  variety: yup.string().trim().required("Variety is required"),

  availability: yup.string().trim().optional(),

  quantity: yup
    .number()
    .typeError("Quantity must be a number")
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value
    )
    .positive("Quantity must be greater than 0")
    .nullable(),

  harvestPeriod: yup.string().trim().required("Harvest period is required"),

  expectedPrice: yup
    .number()
    .typeError("Expected price must be a number")
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value
    )
    .positive("Expected price must be greater than 0")
    .nullable(),

  image: yup.mixed<File>().nullable(),
});

export const cropAvailabilityFormSchema = yup.object({});

export const certificatesFormSchema = yup.object().shape({
  certificates: yup
    .mixed()
    .test("file-type", "Only PDF files are allowed", (value) => {
      if (!value) return true; // Optional field

      const files = Array.isArray(value) ? value : [value];

      return files.every((file) => {
        if (!(file instanceof File)) return true; // Skip if not a File object
        return file.type === "application/pdf";
      });
    })
    .test("file-size", "File size must be less than 5MB", (value) => {
      if (!value) return true; // Optional field

      const files = Array.isArray(value) ? value : [value];

      return files.every((file) => {
        if (!(file instanceof File)) return true; // Skip if not a File object
        return file.size <= 5 * 1024 * 1024;
      });
    })
    .nullable()
    .optional(),
});

export const awardsFormSchema = yup.object({});
export const sellingPreferencesFormSchema = yup.object({});
export const mediaUploadFormSchema = yup.object({});

export const schemaMap: any = {
  basic: {
    basic: basicDetailsFormSchema,
  },

  kyc: {
    aadhaar: KYCAadhaarFormSchema,
    pan: KYCPANFormSchema,
    others: KYCOtherFormSchema,
  },

  farmer: {
    default: farmerDetailsFormSchema,
  },

  farm: {
    default: LandAndCropDetailsFormSchema,
  },

  crop: {
    croplist: cropListFormSchema,
    availability: cropAvailabilityFormSchema,
  },

  additional: {
    certificates: certificatesFormSchema,
  },
};
