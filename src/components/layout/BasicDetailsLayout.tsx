// import React from "react";
// import { LogoWithContainer } from "../ui/Logo";
// import { LanguageSelector } from "../ui/LanguageSelector";

// interface BasicDetailsLayoutProps {
//   children: React.ReactNode;
// }

// const BasicDetailsLayout: React.FC<BasicDetailsLayoutProps> = ({
//   children,
// }) => {
//   return (
//     <div className="w-screen min-h-screen bg-background flex p-8 gap-6">
//       <div className="w-[70%] flex flex-col">
//         <div className="flex gap-4">
//           <LogoWithContainer />
//           <div className="w-full h-full flex justify-between items-center mb-4 bg-background-box shadow-[0px_0px_32px_rgba(0,0,0,0.05)] rounded-lg px-4">
//             <h1 className="text-xl font-semibold text-gray-800">
//               Hi, <span className="text-green-600">Gagan</span> — Create your
//               profile as <span className="font-semibold">Farmer</span>
//             </h1>
//             <div className="flex flex-col gap-4 ">
//               <LanguageSelector />
//               <p className="text-gray-600 text-sm">10% Completed</p>
//             </div>
//           </div>
//         </div>

//         <div className="flex flex-col">{children}</div>
//       </div>

//       {/* profile */}
//       <div>profile</div>
//     </div>
//   );
// };

// export default BasicDetailsLayout;

import React from "react";
import { LogoWithContainer } from "../ui/Logo";
import { LanguageSelector } from "../ui/LanguageSelector";
import { ArrowRight } from "lucide-react";
import { ProfileCard } from "../screens";

interface BasicDetailsLayoutProps {
  children: React.ReactNode;
  onNext?: () => void;
  onSave?: () => void;
}

const BasicDetailsLayout: React.FC<BasicDetailsLayoutProps> = ({
  children,
  onNext,
  onSave,
}) => {
  return (
    <div className="w-screen min-h-screen bg-background flex p-8 gap-6 relative overflow-hidden mb-20">
      {/* Left section */}
      <div className="w-[80%] flex flex-col">
        {/* Header */}
        <div className="flex gap-4">
          <LogoWithContainer />
          <div className="w-full h-full flex justify-between items-center mb-4 bg-background-box shadow-[0px_0px_32px_rgba(0,0,0,0.05)] rounded-lg px-4">
            <h1 className="text-xl font-semibold text-gray-800">
              Hi, <span className="text-green-600">Gagan</span> — Create your
              profile as <span className="font-semibold">Farmer</span>
            </h1>
            <div className="flex flex-col gap-4">
              <LanguageSelector />
              <p className="text-gray-600 text-sm">10% Completed</p>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-col">{children}</div>
      </div>

      {/* Right Side - Profile Section Placeholder */}
      <div className="flex-1">
        <ProfileCard />
      </div>

      {/* ✅ Fixed Bottom Buttons */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 py-4 px-8 flex justify-between items-center shadow-[0_-2px_8px_rgba(0,0,0,0.05)]">
        <div className="w-full flex justify-between gap-3">
          <button
            onClick={onSave}
            className="w-[160px] px-6 py-2 border border-primary text-primary rounded-lg bg-transparent hover:bg-green-50 transition"
          >
            Save & Submit
          </button>
          <button
            onClick={onNext}
            className="w-[160px] flex justify-center gap-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition"
          >
            Next <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BasicDetailsLayout;
