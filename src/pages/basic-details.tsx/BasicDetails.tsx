import React, { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import BasicDetailsForm from "../../components/screens/basic-details.tsx/BasicDetailsForm";
import KYCForm from "../../components/screens/basic-details.tsx/KYCForm";
import FarmerDetailsForm from "../../components/screens/basic-details.tsx/FarmerDetailsForm";
import FarmDetailsForm from "../../components/screens/basic-details.tsx/FarmDetailsForm";
import CropsAvailabilityForm from "../../components/screens/basic-details.tsx/CropsAvailabilityForm";

import BasicDetailsLayout from "../../components/layout/BasicDetailsLayout";
import StepTabs, { steps } from "../../components/ui/StepsTab";
import { basicDetailsSchema } from "../../utils/yupValidation";
import { OthersForm } from "../../components/screens";

// global form type
export interface CompleteFormData {
  fullName: string;
  mobileNumber: string;
  location: string;
  referralCode?: string;

  //kyc details
  aadhaar?: string;
  pan?: string;
  govtSchemeProof?: File | null;
  farmerID?: File | null;

  // 🌱 Farmer Detailss
  preferredLanguage?: string;
  dob?: string;
  farmExperience?: number;
  gender?: string;
  email?: string;
  isFPO?: boolean;
  fpoName?: string;
  registrationNumber?: string;

  landSize?: string;

  cropList?: string[];
  availability?: string;
}

const BasicDetails: React.FC = () => {
  const [activeTab, setActiveTab] = useState("basic");

  const activeStep = steps.find((s) => s.id === activeTab);
  const [activeSubTab, setActiveSubTab] = useState(
    activeStep?.subTabs?.[0]?.id || ""
  );

  useEffect(() => {
    setActiveSubTab(activeStep?.subTabs?.[0]?.id || "");
  }, [activeTab]);

  // 🎯 Universal form
  const methods = useForm<CompleteFormData>({
    resolver: yupResolver(basicDetailsSchema),
    mode: "onBlur",
  });

  const currentIndex = steps.findIndex((s) => s.id === activeTab);

  const onNext = () => {
    if (currentIndex < steps.length - 1)
      setActiveTab(steps[currentIndex + 1].id);
  };

  const onPrev = () => {
    if (currentIndex > 0) setActiveTab(steps[currentIndex - 1].id);
  };

  const onSave = methods.handleSubmit(
    (data) => console.log("SUCCESS:", data),
    (err) => console.log("ERRORS:", err)
  );

  // 🎯 Render forms by tab + subtab
  const renderForm = () => {
    if (activeTab === "basic" && activeSubTab === "basic")
      return <BasicDetailsForm methods={methods} />;

    if (activeTab === "kyc") {
      if (activeSubTab === "aadhaar" || activeSubTab === "pan")
        return <KYCForm methods={methods} activeSubTab={activeSubTab} />;
      if (activeSubTab === "others") return <OthersForm methods={methods} />;
    }

    if (activeTab === "farmer") return <FarmerDetailsForm methods={methods} />;

    if (activeTab === "farm") return <FarmDetailsForm methods={methods} />;

    if (activeTab === "crop")
      return (
        <CropsAvailabilityForm methods={methods} activeSubTab={activeSubTab} />
      );

    return <div>Select a section</div>;
  };

  return (
    <FormProvider {...methods}>
      <BasicDetailsLayout
        onPrev={onPrev}
        onNext={onNext}
        onSave={onSave}
        isFirstStep={currentIndex === 0}
      >
        <div className="w-full py-4">
          <StepTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            completedTabs={["basic", "kyc"]}
          />

          {/* SubTabs */}
          <div className="flex gap-3 border-b my-6">
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

          {renderForm()}
        </div>
      </BasicDetailsLayout>
    </FormProvider>
  );
};

export default BasicDetails;
