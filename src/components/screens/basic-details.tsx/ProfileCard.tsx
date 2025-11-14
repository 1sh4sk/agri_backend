import React from "react";
import {
  Credits,
  Fingerprint,
  ProfileCardBg,
  ProfileIcon,
} from "../../../assets";
import { ProgressCircle, ProgressSteps } from "../../ui";

const ProfileCard: React.FC = () => {
  const completionPercentage = 40;

  const stepsData = [
    { label: "Basic Details", credit: "+20 Cr", completed: true },
    { label: "KYC & Verification", credit: "+30 Cr" },
    { label: "Farmer Details", credit: "+20 Cr" },
    { label: "Farm Details", credit: "+20 Cr" },
    { label: "Crops & Availability", credit: "+20 Cr" },
  ];

  return (
    <div>
      <div className="w-full bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] flex flex-col items-center relative overflow-auto pb-10">
        {/* Profile Header */}
        <div className="w-full flex flex-col items-center">
          <div
            className="w-full h-32 mb-8 relative bg-no-repeat bg-cover"
            style={{ backgroundImage: `url(${ProfileCardBg})` }}
          >
            <div className="absolute left-1/2 -bottom-10 transform -translate-x-1/2 w-24 h-24 bg-white rounded-full flex items-center justify-center shadow border-4 border-gray-200">
              <ProfileIcon />
            </div>
          </div>

          <div className="mt-5 text-center">
            <h2 className="text-lg font-medium text-primary">Gagan Perera</h2>
            <p className="text-xs font-light text-color-lightgray my-1">
              Level 0
            </p>
            <p className="text-xs text-gray-500 flex gap-1 items-center">
              <Credits className="text-7xl" /> Credits Earned: 10
            </p>
          </div>
        </div>

        {/* Progress Circle */}
        <div className="mt-6 mb-5">
          <ProgressCircle percentage={completionPercentage} />
        </div>
        <p className="text-gray-500 text-xs">Great start! Keep going 💪</p>

        {/* Progress Steps*/}

        <div className="w-full  px-6">
          <ProgressSteps steps={stepsData} />
        </div>

        {/* Auto-saved */}
        <div className="mt-3 text-xs text-color-lightgray flex items-center justify-center gap-1 w-[90%] border-b py-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Auto-saved
        </div>

        {/* Status Cards */}
        <div className="mt-6 w-full flex flex-col gap-3 px-6">
          <div className="border border-color-yellow rounded-xl px-4 py-3 text-sm text-yellow-600 bg-yellow-50 flex items-center gap-2">
            <div className="rounded-full border border-color-yellow p-3">
              <Fingerprint />
            </div>
            <div className="text-color-indigo">
              <p className="font-medium">KYC Pending</p>
              <p className="text-xs font-light">Verification Pending</p>
            </div>
          </div>

          <div className="border border-color-yellow rounded-xl px-4 py-3 text-sm text-yellow-600 bg-yellow-50">
            <p className="font-medium">Verification Pending</p>
            <p className="text-xs text-color-yellow">Complete 4 more steps</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
