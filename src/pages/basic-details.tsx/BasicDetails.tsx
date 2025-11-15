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

  // Automatically pick first subTab when main tab changes
  const activeStep = steps.find((step) => step.id === activeTab);
  const [activeSubTab, setActiveSubTab] = useState(
    activeStep?.subTabs?.[0]?.id ?? ""
  );

  React.useEffect(() => {
    setActiveSubTab(activeStep?.subTabs?.[0]?.id ?? "");
  }, [activeStep?.subTabs]);

  // INDEX
  const currentIndex = steps.findIndex((step) => step.id === activeTab);

  // Navigation
  const handlePrev = () => {
    if (currentIndex > 0) setActiveTab(steps[currentIndex - 1].id);
  };

  const handleNext = () => {
    if (currentIndex < steps.length - 1)
      setActiveTab(steps[currentIndex + 1].id);
  };

  const handleSave = () => {
    console.log("Saved:", activeTab, activeSubTab);
  };

  // RENDERING FORMS BY MAIN + SUBTAB
  const renderForm = () => {
    if (activeTab === "basic") {
      if (activeSubTab === "basic") return <BasicDetailsForm />;
    }

    if (activeTab === "kyc") {
      if (activeSubTab === "aadhaar") return <KYCForm />;
      if (activeSubTab === "pan") return <KYCForm />;
      if (activeSubTab === "others") return <KYCForm />;
    }

    if (activeTab === "farmer") {
      if (activeSubTab === "farmer") return <FarmerDetailsForm />;
    }

    if (activeTab === "farm") {
      if (activeSubTab === "landandcropdetails") return <FarmDetailsForm />;
    }

    if (activeTab === "crop") {
      if (activeSubTab === "croplist") return <CropsAvailabilityForm />;
      if (activeSubTab === "availability") return <CropsAvailabilityForm />;
    }

    // if (activeTab === "additional") {
    //   if (activeSubTab === "additional") return <AdditionalForm />;
    // }

    return <div>Select a section to continue</div>;
  };

  return (
    <BasicDetailsLayout
      onPrev={handlePrev}
      onNext={handleNext}
      onSave={handleSave}
      isFirstStep={currentIndex === 0}
    >
      <div className="w-full py-4">
        {/* Main Steps */}
        <StepTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Sub Tabs */}
        <div className="w-full px-4 my-6">
          {/* SubTabs mapping */}
          <div className="flex gap-3 border-b ">
            {activeStep?.subTabs?.map((st) => (
              <button
                key={st.id}
                onClick={() => setActiveSubTab(st.id)}
                className={`px-3 pb-2 border-b-2 text-sm ${
                  activeSubTab === st.id
                    ? "border-primary text-primary font-semibold"
                    : "border-transparent text-gray-500"
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>

        {/* Render Selected Form */}
        {renderForm()}
      </div>
    </BasicDetailsLayout>
  );
};

export default BasicDetails;
