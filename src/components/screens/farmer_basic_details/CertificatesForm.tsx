//

import React from "react";
import { UseFormReturn } from "react-hook-form";
import FileUpload from "../../ui/FileUpload";

interface CertificatesFormProps {
  methods: UseFormReturn<any>;
}

const CertificatesForm: React.FC<CertificatesFormProps> = ({ methods }) => {
  const {
    formState: { errors },
  } = methods;

  // console.log("Certificates form data:", methods.watch("certificates"));
  // console.log("Certificates form errors:", errors);

  return (
    <div className="grid grid-cols-1 gap-6">
      <FileUpload
        label="Upload Certificates"
        name="certificates"
        methods={methods}
        multiple
        accept="application/pdf"
      />

      {/* Display any form-level errors */}
      {errors.certificates && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">
            {errors.certificates.message as string}
          </p>
        </div>
      )}
    </div>
  );
};

export default CertificatesForm;
