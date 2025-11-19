import React, { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// component imports
import BasicDetailsLayout from "../../components/layout/BasicDetailsLayout";
import StepTabs, { steps } from "../../components/ui/StepsTab";
import {
  BasicDetailsForm,
  CertificatesForm,
  CropsAvailabilityForm,
  CropsListForm,
  FarmerDetailsForm,
  KYCForm,
  LandAndCropDetailsForm,
  OthersForm,
} from "../../components/screens";
import { schemaMap } from "../../utils/yupValidation";

const BasicDetails: React.FC = () => {
  const [activeTab, setActiveTab] = useState("basic");

  const activeStep = steps.find((s) => s.id === activeTab);
  const [activeSubTab, setActiveSubTab] = useState(
    activeStep?.subTabs?.[0]?.id || ""
  );

  useEffect(() => {
    setActiveSubTab(activeStep?.subTabs?.[0]?.id || "");
  }, [activeTab]);

  const currentIndex = steps.findIndex((s) => s.id === activeTab);

  const onNext = () => {
    if (currentIndex < steps.length - 1)
      setActiveTab(steps[currentIndex + 1].id);
  };

  const onPrev = () => {
    if (currentIndex > 0) setActiveTab(steps[currentIndex - 1].id);
  };

  // get current yup schema

  const getCurrentSchema = () => {
    const step = schemaMap[activeTab];

    if (!step) return null;

    return step[activeSubTab] || step.default || null;
  };

  const currentSchema = getCurrentSchema();

  const methods = useForm({
    resolver: currentSchema ? yupResolver(currentSchema) : undefined,
    mode: "onBlur",
    defaultValues: {
      crops: [],
      certificates: [],
    },
  });

  const handleSubmitCurrent = methods.handleSubmit(async (data) => {
    console.log("Validated Data:", data);

    // build payload per tab
    if (activeTab === "basic") {
      const payload = {
        fullName: data.fullName,
        mobileNumber: data.mobileNumber,
        location: data.location,
        referralCode: data.referralCode,
      };
      console.log("Basic Payload:", payload);
    }

    if (activeTab === "kyc") {
      console.log("KYC data:", data);
    }

    if (activeTab === "farmer") {
      console.log("Farmer details:", data);
    }

    if (activeTab === "farm") {
      console.log("Farm details:", data);
    }

    if (activeTab === "crop") {
      console.log("Crop info:", data.crops);
    }
    if (activeTab === "additional") {
      if (activeSubTab === "certificates") {
        console.log("Certificates:", data);
      }
    }
  });

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

    if (activeTab === "farm")
      return <LandAndCropDetailsForm methods={methods} />;

    if (activeTab === "crop") {
      if (activeSubTab === "croplist")
        return <CropsListForm methods={methods} />;
      if (activeSubTab === "availability")
        return <CropsAvailabilityForm methods={methods} />;
    }

    if (activeTab === "additional") {
      if (activeSubTab === "certificates")
        return <CertificatesForm methods={methods} />;
    }

    return <div>Select a section</div>;
  };

  return (
    <FormProvider {...methods}>
      <BasicDetailsLayout
        onPrev={onPrev}
        onNext={onNext}
        onSubmit={handleSubmitCurrent}
        isFirstStep={currentIndex === 0}
      >
        <div className="w-full h-full py-4">
          <StepTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            completedTabs={["basic", "kyc"]}
          />

          {/* SubTabs */}
          <div className="flex gap-3 border-b my-6 ">
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

          <div className="overflow-y-scrollpb-40 "> {renderForm()}</div>
        </div>
      </BasicDetailsLayout>
    </FormProvider>
  );
};

export default BasicDetails;
