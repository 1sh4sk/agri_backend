import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Input } from '../../ui/Input';
import { SelectField } from '../../ui/Select';
import { ImageUpload } from '../../ui/ImageUpload';

interface AddCropsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (data: CropFormData) => void;
}

export interface CropFormData {
  cropName: string;
  variety: string;
  availability: string;
  quantity: string;
  harvestPeriod: string;
  expectedPrice: string;
  image?: File;
}

export const AddCropsModal: React.FC<AddCropsModalProps> = ({ 
  isOpen, 
  onClose,
  onSave 
}) => {
  const [formData, setFormData] = useState<CropFormData>({
    cropName: '',
    variety: '',
    availability: 'Available',
    quantity: '4',
    harvestPeriod: '',
    expectedPrice: ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CropFormData, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof CropFormData, string>> = {};
    
    if (!formData.cropName.trim()) {
      newErrors.cropName = 'Crop name is required';
    }
    if (!formData.variety) {
      newErrors.variety = 'Variety is required';
    }
    if (!formData.harvestPeriod.trim()) {
      newErrors.harvestPeriod = 'Harvest period is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      if (onSave) {
        onSave(formData);
      }
      console.log('Saving crop data:', formData);
      onClose();
    }
  };

  const handleImageSelect = (file: File) => {
    setFormData({ ...formData, image: file });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-[1000px] max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Add Crops</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Image Upload */}
          <ImageUpload onImageSelect={handleImageSelect} />

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <Input
              crop
              label="Crop Name"
              placeholder="Enter Your Full Name"
              value={formData.cropName}
              onChange={(e) => setFormData({ ...formData, cropName: e.target.value })}
              error={errors.cropName}
              required
            />
            
            <SelectField
              label="Variety"
              value={formData.variety}
              onChange={(value) => setFormData({ ...formData, variety: value })}
              options={['Type 1', 'Type 2', 'Type 3', 'Premium', 'Standard']}
              placeholder="Select Variety"
              error={errors.variety}
              required
            />
            
            <SelectField
              label="Availability"
              value={formData.availability}
              onChange={(value) => setFormData({ ...formData, availability: value })}
              options={['Available', 'Out of Stock', 'Coming Soon']}
              placeholder="Available"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
            crop
              
              label="Available Quantity (Kgs)"
              type="number"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
            />
            
            <Input
              crop
              label="Harvest Period"
              placeholder="Enter Harvest Period"
              value={formData.harvestPeriod}
              onChange={(e) => setFormData({ ...formData, harvestPeriod: e.target.value })}
              error={errors.harvestPeriod}
              required
            />
            
            <Input
              crop
              label="Expected Price (Rs.)"
              placeholder="Enter Price"
              type="number"
              value={formData.expectedPrice}
              onChange={(e) => setFormData({ ...formData, expectedPrice: e.target.value })}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-[8px] px-6 pt-16 pb-4 border-gray-200">
          <button
            onClick={onClose}
            className="px-8 py-3 w-[160px] h-[48px] border-[1.2px] rounded-[12px] border-gray-300 text[16px] text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-8 py-3 bg-primary border-[1.2px] rounded-[12px] text-white text-[16px] font-medium hover:bg-green-800 transition-colors flex items-center gap-2"
          >
            Save
            <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
};