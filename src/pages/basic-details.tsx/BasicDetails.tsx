// import React, { useState } from "react";
// import BasicDetailsForm from "../../components/screens/basic-details.tsx/BasicDetailsForm";
// import KYCForm from "../../components/screens/basic-details.tsx/KYCForm";
// import FarmerDetailsForm from "../../components/screens/basic-details.tsx/FarmerDetailsForm";
// import FarmDetailsForm from "../../components/screens/basic-details.tsx/FarmDetailsForm";
// import CropsAvailabilityForm from "../../components/screens/basic-details.tsx/CropsAvailabilityForm";
// import BasicDetailsLayout from "../../components/layout/BasicDetailsLayout";
// import StepTabs, { steps } from "../../components/ui/StepsTab";

// const BasicDetails: React.FC = () => {
//   const [activeTab, setActiveTab] = useState("basic");

//   const renderForm = () => {
//     switch (activeTab) {
//       case "basic":
//         return <BasicDetailsForm />;
//       case "kyc":
//         return <KYCForm />;
//       case "farmer":
//         return <FarmerDetailsForm />;
//       case "farm":
//         return <FarmDetailsForm />;
//       case "crop":
//         return <CropsAvailabilityForm />;
//       default:
//         return <div>Select a section to continue</div>;
//     }
//   };

//   const activeLabel = steps.find((step) => step.id === activeTab)?.label;

//   return (
//     <BasicDetailsLayout>
//       <div className="max-w-6xl mx-auto w-full py-6">
//         <StepTabs activeTab={activeTab} onTabChange={setActiveTab} />

//         <div className="w-full bg-background-box border border-r-0 border-t-0 border-l-0 border-b-1 my-6  rounded-mdz">
//           <p className="w-fit px-4 py-3 border border-r-0 border-t-0 border-l-0 border-b-2  border-primary text-primary font-medium">
//             {activeLabel}
//           </p>
//         </div>

//         {renderForm()}
//       </div>
//     </BasicDetailsLayout>
//   );
// };

// export default BasicDetails;

import React, { useState } from "react";
import BasicDetailsForm from "../../components/screens/basic-details.tsx/BasicDetailsForm";
import KYCForm from "../../components/screens/basic-details.tsx/KYCForm";
import FarmerDetailsForm from "../../components/screens/basic-details.tsx/FarmerDetailsForm";
import FarmDetailsForm from "../../components/screens/basic-details.tsx/FarmDetailsForm";
import CropsAvailabilityForm from "../../components/screens/basic-details.tsx/CropsAvailabilityForm";
import BasicDetailsLayout from "../../components/layout/BasicDetailsLayout";
import StepTabs, { steps } from "../../components/ui/StepsTab";

const BasicDetails: React.FC = () => {
  const [activeTab, setActiveTab] = useState("basic");

  // Get the current index of the active tab
  const currentIndex = steps.findIndex((step) => step.id === activeTab);

  // Go to the next tab when clicking "Next"
  const handleNext = () => {
    if (currentIndex < steps.length - 1) {
      setActiveTab(steps[currentIndex + 1].id);
    }
  };

  // Handle Save
  const handleSave = () => {
    console.log("Form data saved for:", activeTab);
  };

  const renderForm = () => {
    switch (activeTab) {
      case "basic":
        return <BasicDetailsForm />;
      case "kyc":
        return <KYCForm />;
      case "farmer":
        return <FarmerDetailsForm />;
      case "farm":
        return <FarmDetailsForm />;
      case "crop":
        return <CropsAvailabilityForm />;
      default:
        return <div>Select a section to continue</div>;
    }
  };

  const activeLabel = steps.find((step) => step.id === activeTab)?.label;

  return (
    <BasicDetailsLayout onNext={handleNext} onSave={handleSave}>
      <div className="max-w-6xl mx-auto w-full py-6">
        {/* Steps Tabs */}
        <StepTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Section Label */}
        <div className="w-full bg-background-box border border-r-0 border-t-0 border-l-0 border-b-1 my-6 rounded-md">
          <p className="w-fit px-4 py-3 border border-r-0 border-t-0 border-l-0 border-b-2 border-primary text-primary font-medium">
            {activeLabel}
          </p>
        </div>

        {/* Render current form */}
        {renderForm()}
      </div>
    </BasicDetailsLayout>
  );
};

export default BasicDetails;
