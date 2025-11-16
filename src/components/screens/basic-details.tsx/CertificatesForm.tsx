import React from "react";
import { UseFormReturn } from "react-hook-form";
import FileUpload from "../../ui/FileUpload";

interface CertificatesFormProps {
  methods: UseFormReturn<any>;
}

const CertificatesForm: React.FC<CertificatesFormProps> = ({ methods }) => {
  return (
    <div className="grid grid-cols-1  gap-6">
      <FileUpload
        label="Upload Certificates"
        name="certificates"
        methods={methods}
        multiple
        accept="application/pdf"
      />
    </div>
  );
};

export default CertificatesForm;
