import React, { useState } from "react";
import { Check, Search } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import {
  Carrot,
  Corn,
  MungBeans,
  Peas,
  Potato,
  Pumpkin,
  RedCabbage,
  Tomato,
} from "../../../assets";

interface CropItem {
  name: string;
  image: string;
}

// 👉 Add your crop list & images here
const crops: CropItem[] = [
  { name: "Potato", image: Potato },
  { name: "Carrot", image: Carrot },
  { name: "Peas", image: Peas },
  { name: "Pumpkin", image: Pumpkin },
  { name: "Tomato", image: Tomato },
  { name: "Cabbage", image: RedCabbage },
  { name: "Corn", image: Corn },
  { name: "Beans", image: MungBeans },
];

interface CropSelectorProps {
  methods: UseFormReturn<any>;
}

const CropSearchSelector: React.FC<CropSelectorProps> = ({ methods }) => {
  const [search, setSearch] = useState("");

  const selectedCrops: string[] = methods.watch("cropList") || [];

  const toggleCrop = (cropName: string) => {
    let updated;

    if (selectedCrops.includes(cropName)) {
      updated = selectedCrops.filter((c) => c !== cropName);
    } else {
      updated = [...selectedCrops, cropName];
    }

    methods.setValue("cropList", updated);
  };

  const filteredCrops = crops.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mt-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Crops Grown</h3>
        <p className="text-primary font-medium">
          {selectedCrops.length} Crops Selected
        </p>
      </div>

      {/* Search */}
      <div className="relative w-1/2 mb-5">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-700"
        />

        <input
          type="text"
          placeholder="Search Crops"
          className="w-full border bg-gray-50 rounded-lg text-sm pl-10 pr-4 py-2 
               focus:outline-none font-light"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Crop Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredCrops.map((crop) => {
          const isSelected = selectedCrops.includes(crop.name);

          return (
            <button
              key={crop.name}
              onClick={() => toggleCrop(crop.name)}
              type="button"
              className={`border rounded-xl p-3 bg-white transition relative flex flex-col items-center 
                ${
                  isSelected
                    ? "border-primary"
                    : "border-gray-300 hover:border-black/40"
                }
              `}
            >
              {/* Selected tick */}
              {isSelected && (
                <div className="absolute -top-2 -right-2 bg-primary text-white rounded-md p-1">
                  <Check size={14} />
                </div>
              )}

              <img
                src={crop.image}
                className="w-16 h-16 object-contain mb-2"
                alt={crop.name}
              />

              <p className="text-sm font-medium text-gray-700">{crop.name}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CropSearchSelector;
