import React, { useRef, useState } from "react";
import { Upload } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

interface FileUploadProps {
  label: string;
  name: string;
  methods: UseFormReturn<any>;
}

const FileUpload: React.FC<FileUploadProps> = ({ label, name, methods }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const { setValue } = methods;

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    // Save in react-hook-form
    setValue(name, file);

    // Preview
    if (file && file.type.startsWith("image/")) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(null);
    }
  };

  return (
    <div className="w-full border border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-center gap-4 min-h-[200px] relative">
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
        onChange={handleSelect}
        className="hidden"
        accept="image/*"
      />

      {previewUrl && (
        <img
          src={previewUrl}
          className="max-h-32 mt-4 rounded-md object-contain"
        />
      )}
    </div>
  );
};

export default FileUpload;
