import React from "react";
import {
  Additional,
  Crops,
  Farm,
  Farmer,
  Fingerprint,
  Profile,
  StepBG,
  Tick,
} from "../../assets";
import { Check } from "lucide-react";

interface StepTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  completedTabs?: string[]; // ← NEW
}

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
    subTabs: [
      { id: "certificates", label: "Certificates" },
      { id: "awards", label: "Awards" },
      { id: "sellingpreferences", label: "Selling Preferences" },
      { id: "mediaupload", label: "Media Upload" },
    ],
  },
];

const StepTabs: React.FC<StepTabsProps> = ({
  activeTab,
  onTabChange,
  completedTabs = [],
}) => {
  return (
    <div className="flex gap-4 mb-4 overflow-x-auto scrollbar-hide">
      {steps.map((step) => {
        const Icon = step.icon;
        const isActive = activeTab === step.id;
        const isCompleted = completedTabs.includes(step.id);

        return (
          <button
            key={step.id}
            onClick={() => onTabChange(step.id)}
            className={`relative w-[350px] px-4 py-2 border rounded-md text-sm whitespace-nowrap 
              transition-colors duration-200 text-left  bg-no-repeat
              ${
                isActive
                  ? "bg-primary text-white"
                  : isCompleted
                  ? "bg-white text-primary hover:bg-green-50 border-2 border-primary"
                  : " border-primary/20 border-dashed"
              }
              
            `}
            style={{
              backgroundImage: isActive ? `url(${StepBG})` : "none",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            {/* Top-right Tick Badge */}
            {isCompleted && (
              <div className="absolute top-2 right-2  flex items-center justify-center ">
                <Tick className="w-5 h-5" />
              </div>
            )}

            <Icon
              className={`w-5 h-5 mb-3 ${
                isActive ? "text-white" : "text-primary"
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
