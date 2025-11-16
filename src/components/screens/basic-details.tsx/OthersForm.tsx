import React from "react";
import { UseFormReturn } from "react-hook-form";
import FileUpload from "../../ui/FileUpload";

interface OthersFormProps {
  methods: UseFormReturn<any>;
}

const OthersForm: React.FC<OthersFormProps> = ({ methods }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FileUpload
        label="Upload Govt. Scheme Proof"
        name="govtSchemeProof"
        methods={methods}
        accept="image/*"
      />

      <FileUpload
        label="Upload Farmer ID"
        name="farmerID"
        methods={methods}
        accept="image/*"
      />
    </div>
  );
};

export default OthersForm;
