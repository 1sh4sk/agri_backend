import React, { useState } from "react";
import { Camera, Image as ImageIcon } from "lucide-react";

interface ImageUploadProps {
  onImageSelect?: (file: File) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelect }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      if (onImageSelect) {
        onImageSelect(file);
      }
    }
  };

  return (
    <div className="mb-6">
      <div className="relative w-[86px] h-[86px] border border-gray-200 rounded-lg flex items-center justify-center  hover:bg-gray-100 transition-colors cursor-pointer shadow-[1px_1px_3px_0px_rgba(0,0,0,0.1)]">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        {imagePreview ? (
          <img
            src={imagePreview}
            alt="Preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center justify-center">
            <ImageIcon className="w-10 h-10 text-gray-300" />
          </div>
        )}
        <div className="absolute -top-2 -right-2 w-6 h-6 p-1 bg-gray-200 rounded-full flex items-center justify-center text-white z-20 border-2 border-white shadow-md">
          <Camera className="w-3.5 h-3.5 text-primary -pb-1" />
        </div>
      </div>
      <p className="text-xs text-gray-400 mt-2 font-light">
        Add a Clear Image (Max: 5MB)
      </p>
    </div>
  );
};
