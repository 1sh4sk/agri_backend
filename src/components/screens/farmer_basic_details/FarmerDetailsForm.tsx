import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Input } from "../../ui/Input";
import SelectField from "../../ui/SelectField";
import { ToggleCheckbox } from "../../ui";

// Example options
const locations = ["Chennai", "Coimbatore", "Madurai"];
const languages = ["Tamil", "English", "Hindi"];
const genders = ["Male", "Female", "Other"];

interface FarmerDetailsFormProps {
  methods: UseFormReturn<any>;
}

const FarmerDetailsForm: React.FC<FarmerDetailsFormProps> = ({ methods }) => {
  const {
    register,
    watch,
    formState: { errors },
  } = methods;

  const isFPO = watch("isFPO"); // TOGGLE WATCH

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Full Name */}
      <Input
        required
        label="Full Name"
        placeholder="Enter full name"
        error={errors.fullName?.message}
        {...register("fullName")}
      />

      {/* Mobile Number */}
      <Input
        required
        label="Mobile Number"
        placeholder="Enter mobile number"
        error={errors.mobileNumber?.message}
        {...register("mobileNumber")}
      />

      {/* Location */}
      <SelectField
        required
        label="Location"
        name="location"
        register={register}
        options={locations}
        error={errors.location?.message}
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

      {/* DOB */}
      <Input
        required
        type="date"
        label="Date of Birth"
        error={errors.dob?.message}
        {...register("dob")}
      />

      {/* Farm Experience */}
      <Input
        required
        type="number"
        label="Farm Experience (in years)"
        placeholder="Eg. 5"
        error={errors.farmExperience?.message}
        {...register("farmExperience")}
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

      {/* Email */}
      <Input
        label="Email"
        placeholder="Enter email"
        type="email"
        error={errors.email?.message}
        {...register("email")}
      />

      {/* Referral Code (span full width) */}
      <Input
        label="Referral Code"
        placeholder="Enter referral code"
        error={errors.referralCode?.message}
        {...register("referralCode")}
        className="md:col-span-3"
      />

      {/* TOGGLE: Are you part of FPO? */}
      <div>
        <ToggleCheckbox
          label="Are you a part of FPO?"
          name="isFPO"
          register={register}
        />
      </div>

      {/* Show FPO fields only if toggle is ON */}

      {/* <Input
        required
        label="FPO Name"
        placeholder="Enter FPO name"
        error={errors.fpoName?.message}
        {...register("fpoName")}
        className="md:col-span-3"
      />

      <Input
        required
        label="Registration Number"
        placeholder="Enter registration number"
        error={errors.registrationNumber?.message}
        {...register("registrationNumber")}
        className="md:col-span-3"
      /> */}
      {/* Conditional fields */}
      {isFPO && (
        <>
          <Input
            required
            label="FPO Name"
            placeholder="Enter FPO name"
            error={errors.fpoName?.message}
            {...register("fpoName")}
            className="md:col-span-3"
          />

          <Input
            required
            label="Registration Number"
            placeholder="Enter registration number"
            error={errors.registrationNumber?.message}
            {...register("registrationNumber")}
            className="md:col-span-3"
          />
        </>
      )}
    </div>
  );
};

export default FarmerDetailsForm;
