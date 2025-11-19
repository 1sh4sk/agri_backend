import React, { useState } from "react";
import { Upload, FileText, AlertCircle } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

interface FileUploadProps {
  label: string;
  name: string;
  methods: UseFormReturn<any>;
  multiple?: boolean;
  accept?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  label,
  name,
  methods,
  multiple = false,
  accept = "*",
}) => {
  const [previewFiles, setPreviewFiles] = useState<File[]>([]);
  const {
    register,
    setValue,
    trigger,
    formState: { errors },
  } = methods;

  // Get error for this specific field
  const error = errors[name];

  // Register the field first
  const { ref, ...rest } = register(name);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;

    const files = multiple ? Array.from(fileList) : [fileList[0]];

    setPreviewFiles(files);

    // Set value in RHF and trigger validation
    setValue(name, multiple ? files : files[0], {
      shouldValidate: true,
      shouldDirty: true,
    });

    // Trigger validation immediately
    await trigger(name);
  };

  const handleRemoveFile = (index: number) => {
    const updatedFiles = previewFiles.filter((_, i) => i !== index);
    setPreviewFiles(updatedFiles);

    // Update form value
    setValue(name, multiple ? updatedFiles : updatedFiles[0] || null, {
      shouldValidate: true,
      shouldDirty: true,
    });

    trigger(name);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Upload Box with Error State */}
      <div
        className={`w-full bg-white border border-dashed rounded-xl p-6 flex flex-col justify-center items-center text-center gap-4 min-h-[180px] transition-colors ${
          error
            ? "border-red-300 bg-red-50"
            : "border-gray-300 hover:border-gray-400"
        }`}
      >
        <p className={`text-sm ${error ? "text-red-600" : "text-gray-500"}`}>
          Choose a file or drag & drop it here
        </p>

        <button
          type="button"
          className={`px-4 py-2 border rounded-md shadow-sm flex items-center justify-center gap-2 text-sm cursor-pointer transition-colors ${
            error
              ? "border-red-300 bg-red-100 text-red-700 hover:bg-red-200"
              : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
          }`}
          onClick={() => document.getElementById(name)?.click()}
        >
          <Upload size={16} />
          {label}
        </button>

        {/* Hidden file input */}
        <input
          id={name}
          type="file"
          accept={accept}
          multiple={multiple}
          className="hidden"
          {...rest}
          ref={ref}
          onChange={handleFileChange}
        />

        {/* Error Message */}
        {error && (
          <div className="flex items-center gap-2 text-red-600 text-sm mt-2">
            <AlertCircle size={16} />
            <span>{error.message as string}</span>
          </div>
        )}
      </div>

      {/* Preview Section */}
      {previewFiles.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-700">
            Selected Files ({previewFiles.length})
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {previewFiles.map((file, index) => {
              const isImage = file.type.startsWith("image/");
              const fileURL = URL.createObjectURL(file);

              return (
                <div
                  key={index}
                  className="border rounded-xl p-3 bg-white shadow-sm flex flex-col gap-2 group relative"
                >
                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => handleRemoveFile(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M18 6L6 18M6 6l12 12"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                  </button>

                  {isImage ? (
                    <>
                      <img
                        src={fileURL}
                        className="w-full h-24 object-cover rounded-md"
                        alt={file.name}
                      />
                      <div className="flex justify-between items-center text-xs text-gray-600">
                        <span className="truncate flex-1">{file.name}</span>
                        <span>{(file.size / 1024 / 1024).toFixed(1)}MB</span>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center gap-3">
                      <FileText
                        size={32}
                        className="text-red-500 flex-shrink-0"
                      />
                      <div className="flex flex-col flex-1 min-w-0">
                        <span className="text-sm font-medium truncate">
                          {file.name}
                        </span>
                        <span className="text-xs text-gray-500">
                          {(file.size / 1024 / 1024).toFixed(1)}MB • {file.type}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Helper Text */}
      {!error && accept.includes("pdf") && (
        <p className="text-xs text-gray-500">
          <span className="text-red-600">*</span> Only PDF files are allowed.
          Maximum file size: 5MB per file.
        </p>
      )}

      {!error && accept.includes("image") && (
        <p className="text-xs text-gray-500">
          <span className="text-red-600">*</span> Only image files are allowed.
        </p>
      )}
    </div>
  );
};

export default FileUpload;
