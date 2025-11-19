import React from "react";
import { Input } from "../../ui/Input";
import SelectField from "../../ui/SelectField";

const locations = ["Chennai", "Coimbatore", "Madurai"];
const languages = ["Tamil", "English", "Hindi"];
const genders = ["Male", "Female", "Other"];

const BasicDetailsForm: React.FC<Props> = ({ methods }) => {
  const {
    register,
    formState: { errors },
  } = methods;

  return (
    <div className="grid md:grid-cols-3 gap-4">
      <Input
        basicDetails
        required
        label="Full Name"
        placeholder="Enter your full name"
        error={errors.fullName?.message}
        {...register("fullName")}
      />
      <Input
        basicDetails
        required
        label="Mobile Number"
        placeholder="Enter mobile number"
        error={errors.mobileNumber?.message}
        {...register("mobileNumber")}
      />

      {/* Email */}
      <Input
        basicDetails
        label="Email"
        placeholder="Enter email"
        type="email"
        error={errors.email?.message}
        {...register("email")}
      />

      <SelectField
        required
        label="Location"
        name="location"
        register={register}
        options={locations}
        error={errors.location?.message}
      />

      {/* DOB */}
      <Input
        required
        type="date"
        label="Date of Birth"
        error={errors.dob?.message}
        {...register("dob")}
      />

      {/* Gender */}
      <SelectField
        required
        label="Gender"
        name="gender"
        register={register}
        options={genders}
        error={errors.gender?.message}
      />

      {/* Preferred Language */}
      <SelectField
        required
        label="Preferred Language"
        name="preferredLanguage"
        register={register}
        options={languages}
        error={errors.preferredLanguage?.message}
      />

      <Input
        basicDetails
        label="Referral Code"
        placeholder="Enter referral code"
        error={errors.referralCode?.message}
        {...register("referralCode")}
        className="md:col-span-3"
      />
    </div>
  );
};

export default BasicDetailsForm;
