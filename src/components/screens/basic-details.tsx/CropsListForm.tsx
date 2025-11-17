import React, { useState } from "react";
import { ArrowDown, MoreVertical, Plus } from "lucide-react";
import { AddCropsModal, CropFormData } from "./AddCropsModal";

// ==================== DUMMY DATA ====================
const DUMMY_CROPS = [
  {
    id: 1,
    cropName: "Potato",
    variety: "Vegetable",
    harvestPeriod: "1 months",
    expectedPrice: "Rs.89",
    availability: "Available",
    quantity: "21",
  },
  {
    id: 2,
    cropName: "Carrot",
    variety: "Vegetable",
    harvestPeriod: "3 months",
    expectedPrice: "Rs.78",
    availability: "Unavailable",
    quantity: "-",
  },
];

// ==================== CropsPage Component ====================
const CropsPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [crops, setCrops] = useState(DUMMY_CROPS);

  const handleSaveCrop = (data: CropFormData) => {
    const newCrop = {
      id: crops.length + 1,
      cropName: data.cropName,
      variety: data.variety,
      harvestPeriod: data.harvestPeriod,
      expectedPrice: `Rs.${data.expectedPrice}`,
      availability: data.availability,
      quantity: data.quantity,
    };
    setCrops([...crops, newCrop]);
  };

  return (
    <div className="max-w-7xl mx-auto rounded-md border">
      <div className="bg-white rounded-lg shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Crops List</h2>
            <p className="text-xs text-gray-500 mt-2">
              Add your Crops based on the Availability
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-[14px] text-white rounded-lg text-sm font-medium hover:bg-green-800 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Crops
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-4 text-xs font-medium text-gray-500">
                  <div className="flex items-center gap-1">
                    Crop Name
                    <ArrowDown className="w-4 h-4" />
                  </div>
                </th>
                <th className="text-left py-4 px-4 text-xs font-medium text-gray-500">
                  <div className="flex items-center gap-1">
                    Variety
                    <ArrowDown className="w-4 h-4" />
                  </div>
                </th>
                <th className="text-left py-4 px-4 text-xs font-medium text-gray-500">
                  <div className="flex items-center gap-1">
                    Harvest Period
                    <ArrowDown className="w-4 h-4" />
                  </div>
                </th>
                <th className="text-left py-4 px-4 text-xs font-medium text-gray-500">
                  <div className="flex items-center gap-1">
                    Expected Price (Rs.)
                    <ArrowDown className="w-4 h-4" />
                  </div>
                </th>
                <th className="text-left py-4 px-4 text-xs font-medium text-gray-500">
                  <div className="flex items-center gap-1">
                    Availability
                    <ArrowDown className="w-4 h-4" />
                  </div>
                </th>
                <th className="text-left py-4 px-4 text-xs font-medium text-gray-500">
                  <div className="flex items-center gap-1">
                    Quantity (Kgs)
                    <ArrowDown className="w-4 h-4" />
                  </div>
                </th>
                <th className="py-4 px-4 w-12"></th>
              </tr>
            </thead>
            <tbody>
              {crops.map((crop, index) => (
                <tr
                  key={crop.id}
                  className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                    index === crops.length - 1 ? "border-b-0" : ""
                  }`}
                >
                  <td className="py-3 px-4 text-xs font-medium text-gray-900">
                    {crop.cropName}
                  </td>
                  <td className="py-3 px-4 text-xs text-gray-600">
                    {crop.variety}
                  </td>
                  <td className="py-3 px-4 text-xs text-gray-600">
                    {crop.harvestPeriod}
                  </td>
                  <td className="py-3 px-4 text-xs text-gray-600">
                    {crop.expectedPrice}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                        crop.availability === "Available"
                          ? "bg-green-50 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      <span
                        className={`w-1 h-1 rounded-full ${
                          crop.availability === "Available"
                            ? "bg-primary"
                            : "bg-gray-400"
                        }`}
                      ></span>
                      {crop.availability}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-xs text-gray-600">
                    {crop.quantity}
                  </td>
                  <td className="py-3 px-4">
                    <button className="text-gray-400 hover:text-gray-600 transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <AddCropsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveCrop}
      />
    </div>
  );
};

export default CropsPage;
