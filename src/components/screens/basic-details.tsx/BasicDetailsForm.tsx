import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Input } from "../../ui/Input";
import { CompleteFormData } from "../../../pages/basic-details.tsx/BasicDetails";
import SelectField from "../../ui/SelectField";

const locations = ["Chennai", "Coimbatore", "Madurai"];

interface Props {
  methods: UseFormReturn<CompleteFormData>;
}

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
      <SelectField
        required
        label="Location"
        name="location"
        register={register}
        options={locations}
        error={errors.location?.message}
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
