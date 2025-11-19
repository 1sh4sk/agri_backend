import React from "react";
import { UseFormReturn } from "react-hook-form";
import FileUpload from "../../ui/FileUpload";

interface OthersFormProps {
  methods: UseFormReturn<any>;
}

const OthersForm: React.FC<OthersFormProps> = ({ methods }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h4 className="text-sm mb-1">
          Professional Verification Document{" "}
          <span className="text-red-600">*</span>
        </h4>
        <p className="text-color-lightgray font-light text-xs mb-3">
          Upload Agronomist License / Consultant ID / Work ID / Professional
          Certificate
        </p>
        <FileUpload
          label="Upload Govt. Scheme Proof"
          name="govtSchemeProof"
          methods={methods}
          accept="image/*"
        />
      </div>

      <div>
        <h4 className="text-sm mb-1">
          Additional Verification Documents{" "}
          <span className="text-red-600">*</span>
        </h4>
        <p className="text-color-lightgray font-light text-xs mb-3">
          Upload any additional certificates, licenses, or verification
          documents (Optional)
        </p>
        <FileUpload
          label="Upload Farmer ID"
          name="farmerID"
          methods={methods}
          accept="image/*"
        />
      </div>
    </div>
  );
};

export default OthersForm;
