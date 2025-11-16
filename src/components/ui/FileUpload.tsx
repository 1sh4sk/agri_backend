import React, { useRef, useState } from "react";
import { Upload, FileText } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

interface FileUploadProps {
  label: string;
  name: string;
  methods: UseFormReturn<any>;
  multiple?: boolean;
  accept?: string; // "image/*", "application/pdf", etc.
}

const FileUpload: React.FC<FileUploadProps> = ({
  label,
  name,
  methods,
  multiple = false,
  accept = "*",
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewFiles, setPreviewFiles] = useState<File[]>([]);

  const { setValue } = methods;

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];

    // Append on multiple uploads
    const updatedFiles = multiple ? [...previewFiles, ...files] : files;

    setPreviewFiles(updatedFiles);

    // Save to React Hook Form
    setValue(name, multiple ? updatedFiles : files[0]);
  };

  return (
    <div className="flex flex-col gap-6 bg-background-box">
      {/* Upload box */}
      <div className="w-full border border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-center gap-4 min-h-[180px]">
        <p className="text-gray-500 text-sm">
          Choose a file or drag & drop it here
        </p>

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="px-4 py-2 border rounded-md bg-white shadow-sm flex items-center gap-2 text-sm"
        >
          <Upload size={16} />
          {label}
        </button>

        <input
          type="file"
          ref={fileInputRef}
          multiple={multiple}
          onChange={handleSelect}
          className="hidden"
          accept={accept}
        />
      </div>

      {/* Preview section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {previewFiles.map((file, index) => {
          const isImage = file.type.startsWith("image/");
          const fileURL = URL.createObjectURL(file);

          return (
            <div
              key={index}
              className="border rounded-xl p-3 flex flex-col gap-2 bg-white shadow-sm"
            >
              {/* IMAGE PREVIEW */}
              {isImage ? (
                <img
                  src={fileURL}
                  className="w-full h-24 object-cover rounded-md"
                />
              ) : (
                // FILE PREVIEW (PDF / DOC / ETC.)
                <div className="flex items-center gap-3">
                  <FileText size={28} className="text-red-500" />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium truncate max-w-[150px]">
                      {file.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(1)}MB
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FileUpload;

// ✔ Accept single image
{
  /* <FileUpload
  label="Upload Profile Photo"
  name="profilePhoto"
  methods={methods}
  accept="image/*"
/> */
}

// ✔ Accept multiple PDFs
{
  /* <FileUpload
  label="Upload Certificates"
  name="certificates"
  methods={methods}
  multiple
  accept="application/pdf"
/> */
}

// ✔ Accept any file
{
  /* <FileUpload
  label="Upload Document"
  name="document"
  methods={methods}
/> */
}
