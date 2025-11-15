import React from "react";
import {
  Additional,
  Crops,
  Farm,
  Farmer,
  Fingerprint,
  Profile,
} from "../../assets";

interface StepTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

// export const steps = [
//   { id: "basic", label: "Basic Details", icon: Profile },
//   { id: "kyc", label: "KYC & Verification", icon: Fingerprint },
//   { id: "farmer", label: "Farmer Details", icon: Farmer },
//   { id: "farm", label: "Farm Details", icon: Farm },
//   { id: "crop", label: "Crops & Availability", icon: Crops },
//   { id: "additional", label: "Additional Info", icon: Additional },
// ];

export const steps = [
  {
    id: "basic",
    label: "Basic Details",
    icon: Profile,
    subTabs: [{ id: "basic", label: "Basic Details" }],
  },
  {
    id: "kyc",
    icon: Fingerprint,
    label: "KYC & Verification",
    subTabs: [
      { id: "aadhaar", label: "Aadhaar" },
      { id: "pan", label: "PAN" },
      { id: "others", label: "Others" },
    ],
  },
  {
    id: "farmer",
    icon: Farmer,
    label: "Farmer Details",
    subTabs: [{ id: "farmer", label: "Farmer Details" }],
  },
  {
    id: "farm",
    icon: Farm,
    label: "Farm Details",
    subTabs: [{ id: "landandcropdetails", label: "Land & Crop Details" }],
  },
  {
    id: "crop",
    icon: Crops,
    label: "Crops & Availability",
    subTabs: [
      { id: "croplist", label: "Crop List" },
      { id: "availability", label: "Availability" },
    ],
  },
  {
    id: "additional",
    label: "Additional Info",
    icon: Additional,
    subTabs: [{ id: "additional", label: "Additional Info" }],
  },
];

const StepTabs: React.FC<StepTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex gap-4  mb-4 overflow-x-auto scrollbar-hide">
      {steps.map((step) => {
        const Icon = step.icon;
        const isActive = activeTab === step.id;

        return (
          <button
            key={step.id}
            onClick={() => onTabChange(step.id)}
            className={`w-[350px] px-4 py-2 border rounded-md text-sm whitespace-nowrap transition-colors duration-200 text-left
            ${
              isActive
                ? "bg-primary text-white border-primary "
                : "bg-white text-primary hover:bg-green-50 border-primary/20 border-dashed"
            }`}
          >
            <Icon
              className={`w-5 h-5 mb-3 ${
                isActive ? "text-white " : "text-primary"
              }`}
            />

            {step.label}
          </button>
        );
      })}
    </div>
  );
};

export default StepTabs;
