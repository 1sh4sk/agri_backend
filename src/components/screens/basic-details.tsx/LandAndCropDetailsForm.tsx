import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Input } from "../../ui/Input";
import { CompleteFormData } from "../../../pages/basic-details/BasicDetails";
import SelectField from "../../ui/SelectField";
import CropSearchSelector from "./CropsSearchSelector";

const farmTypes = [
  "Subsistence Farming",
  "Commercial Farming",
  "Intensive Farming",
  "Extensive Farming",
  "Organic Farming",
  "Mixed Farming",
  "Arable Farming",
  "Pastoral Farming",
  "Plantation Farming",
  "Shifting Cultivation",
  "Nomadic Herding",
  "Aquaculture (Fish Farming)",
  "Horticulture",
  "Industrial Agriculture",
  "Agroforestry",
];
interface LandAndCropDetailsFormProps {
  methods: UseFormReturn<CompleteFormData>;
}

const LandAndCropDetailsForm: React.FC<LandAndCropDetailsFormProps> = ({
  methods,
}) => {
  const {
    register,
    formState: { errors },
  } = methods;

  return (
    <>
      <div className="grid md:grid-cols-3 gap-4">
        <Input
          basicDetails
          required
          label="Total Land Size (Sq.Mtr)"
          placeholder="Enter Your Total Land Size"
          error={errors.landSize?.message}
          {...register("landSize")}
        />
        <SelectField
          required
          label="Type of Farming"
          name="FarmingType"
          register={register}
          options={farmTypes}
        />
      </div>

      <CropSearchSelector methods={methods} />
    </>
  );
};

export default LandAndCropDetailsForm;
