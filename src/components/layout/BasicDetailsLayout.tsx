import React from "react";
import { LogoWithContainer } from "../ui/Logo";
import { LanguageSelector } from "../ui/LanguageSelector";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ProfileCard } from "../screens";
import { ProgressBar } from "../ui";
import { useNavigate } from "react-router-dom";

interface BasicDetailsLayoutProps {
  children: React.ReactNode;
  onPrev?: () => void;
  onNext?: () => void;
  // onSave?: () => void;
  onSubmit?: () => void;
  isFirstStep?: boolean;
}

const BasicDetailsLayout: React.FC<BasicDetailsLayoutProps> = ({
  children,
  onPrev,
  onNext,
  onSubmit,
  isFirstStep = false,
}) => {
  return (
    <div className="w-screen max-h-screen bg-background flex p-6 gap-6 relative overflow-hidden">
      {/* Left section */}
      <div className="w-[80%] h-full  flex flex-col">
        {/* Header */}
        <div className="flex gap-4">
          <LogoWithContainer />
          <div className="w-full h-full flex justify-between items-center mb-4 bg-background-box shadow-[0px_0px_32px_rgba(0,0,0,0.05)] rounded-lg px-4 py-1">
            <div className="font-light">
              <h1 className="text-lg text-gray-800">
                Hi, <span className="text-primary font-semibold">Gagan</span>
              </h1>
              <p className=" text-lg">
                Create your profile as{" "}
                <span className="font-semibold text-primary">Farmer</span>
              </p>
            </div>

            <div className="w-[250px] flex flex-col gap-2 items-end">
              <LanguageSelector basicDetails />
              <ProgressBar value={10} showLabel={true} />
            </div>
          </div>
        </div>

        {/* Main content */}
        <div>{children}</div>
      </div>

      {/* Right Side - Profile Section Placeholder */}
      <div className="flex-1 overflow-y-scroll ">
        <ProfileCard />
      </div>

      {/* ✅ Fixed Bottom Buttons */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 py-4 px-8 flex justify-between items-center shadow-[0_-2px_8px_rgba(0,0,0,0.05)] z-10">
        <div className="w-full flex justify-between gap-3 z-10">
          <button
            type="submit"
            onClick={onSubmit}
            className="w-[160px] px-6 py-2 border border-primary text-primary rounded-lg bg-transparent hover:bg-green-50 transition"
          >
            Save & Submit
          </button>

          <div className="flex gap-3">
            {/* Only show Previous when NOT first step */}
            {!isFirstStep && (
              <button
                onClick={onPrev}
                className="flex items-center justify-center gap-2 w-[160px] px-6 py-2 border border-primary text-primary rounded-lg bg-transparent hover:bg-green-50 transition"
              >
                <ArrowLeft /> Previous
              </button>
            )}
            <button
              onClick={onNext}
              className="w-[160px] flex justify-center gap-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition"
            >
              Next <ArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicDetailsLayout;
