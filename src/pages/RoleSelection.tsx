import { useState } from 'react';
import { User, Briefcase, Users, Building2, Check } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { UserRole, USER_ROLES } from '../constants/userRoles';

const roles = [
  {
    value: USER_ROLES.FARMER,
    icon: User,
    titleKey: 'role.farmer',
    descriptionKey: 'role.farmerDescription',
  },
  {
    value: USER_ROLES.BUSINESS,
    icon: Briefcase,
    titleKey: 'role.business',
    descriptionKey: 'role.businessDescription',
  },
  {
    value: USER_ROLES.PROFESSIONAL,
    icon: Users,
    titleKey: 'role.professional',
    descriptionKey: 'role.professionalDescription',
  },
  {
    value: USER_ROLES.GOVERNMENT,
    icon: Building2,
    titleKey: 'role.government',
    descriptionKey: 'role.governmentDescription',
  },
];

interface RoleSelectionProps {
  onComplete: () => void;
}

export const RoleSelection = ({ onComplete }: RoleSelectionProps) => {
  const { setUserRole } = useAuth();
  const { t } = useTranslation();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  const handleContinue = () => {
    if (selectedRole) {
      setUserRole(selectedRole);
      onComplete();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-semibold text-gray-900 mb-3">
            {t('role.select.title')}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm">
            {t('role.select.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {roles.map((role) => {
            const Icon = role.icon;
            const isSelected = selectedRole === role.value;
            
            return (
              <button
                key={role.value}
                onClick={() => setSelectedRole(role.value)}
                className={`relative p-6 rounded-lg border-2 transition-all duration-200 text-left h-full flex flex-col ${
                  isSelected
                    ? 'border-gray-500 bg-gray-50 shadow-md'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-3 right-3 w-6 h-6  rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-black" strokeWidth={3} />
                  </div>
                )}
                
                {/* Icon Container - Centered */}
                <div className="flex justify-center mb-4">
                  <Icon 
                    className={`w-10 h-10 ${
                      isSelected ? 'text-gray-600' : 'text-gray-400'
                    }`} 
                    strokeWidth={1.5}
                  />
                </div>
                
                {/* Title */}
                <div className="font-medium text-gray-600 mb-2 text-center">
                  {t(role.titleKey)}
                </div>
                
                {/* Description */}
                <div className="text-xs text-gray-600 leading-relaxed text-center flex-grow">
                  {t(role.descriptionKey)}
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex justify-center">
          <Button
            onClick={handleContinue}
            disabled={!selectedRole}
            size="lg"
            className="px-16 py-3 text-lg font-medium bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {t('button.continue')} →
          </Button>
        </div>
      </div>
    </div>
  );
};


// import { useState } from 'react';
// import { User, Briefcase, Users, Building2 } from 'lucide-react';
// import { Button } from '../components/ui/Button';
// import { useAuth } from '../contexts/AuthContext';
// import { useTranslation } from 'react-i18next';
// import { UserRole, USER_ROLES } from '../constants/userRoles';
// import role from '../assets/role.png'
// import { LogoWithContainer } from '../components/ui/Logo';
// import { LanguageSelector } from '../components/ui/LanguageSelector';

// const roles = [
//   {
//     value: USER_ROLES.FARMER,
//     icon: User,
//     titleKey: 'role.farmer',
//     descriptionKey: 'role.farmerDescription',
//   },
//   {
//     value: USER_ROLES.BUSINESS,
//     icon: Briefcase,
//     titleKey: 'role.business',
//     descriptionKey: 'role.businessDescription',
//   },
//   {
//     value: USER_ROLES.PROFESSIONAL,
//     icon: Users,
//     titleKey: 'role.professional',
//     descriptionKey: 'role.professionalDescription',
//   },
//   {
//     value: USER_ROLES.GOVERNMENT,
//     icon: Building2,
//     titleKey: 'role.government',
//     descriptionKey: 'role.governmentDescription',
//   },
// ];

// interface RoleSelectionProps {
//   onComplete: () => void;
// }

// export const RoleSelection = ({ onComplete }: RoleSelectionProps) => {
//   const { setUserRole } = useAuth();
//   const { t } = useTranslation();
//   const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

//   const handleContinue = () => {
//     if (selectedRole) {
//       setUserRole(selectedRole);
//       onComplete();
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gray-50">
//       {/* Left Side - Hero Section */}
//       <div className="hidden lg:flex lg:w-[57%] relative">
//         {/* Background Image with Overlay */}
//         <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800">
//           {/* Simulated farm image overlay */}
//         <img
//         src={role}
//         />
//         </div>

//         {/* Logo */}
//         <div className="absolute top-8 left-8 z-10">
//          <LogoWithContainer />
//         </div>

//         {/* Content */}
//         <div className="relative z-10 flex flex-col justify-end p-12 pb-16">
//           <h1 className="text-5xl font-bold text-white mb-4">
//             {t('role.hero.tagline') || "Transforming Agriculture Through Technology"}
//           </h1>
//           <p className="text-xl text-gray-200 max-w-lg">
//             {t('role.hero.subtitle') || "Join the platform connecting farmers, businesses, and professionals"}
//           </p>
          
//           {/* Progress Dots */}
//           <div className="flex gap-2 mt-12">
//             <div className="w-12 h-1 bg-white rounded-full"></div>
//             <div className="w-12 h-1 bg-white/30 rounded-full"></div>
//             <div className="w-12 h-1 bg-white/30 rounded-full"></div>
//             <div className="w-12 h-1 bg-white/30 rounded-full"></div>
//           </div>
//         </div>
//       </div>

//       {/* Right Side - Role Selection */}
//       <div className="w-full lg:w-[43%] bg-gray-50 flex flex-col">
//         {/* Language Selector */}
//       <LanguageSelector />

//         {/* Main Content */}
//         <div className="flex-1 flex flex-col justify-center px-8 lg:px-12 max-w-2xl mx-auto w-full">
//           <div className="mb-8">
//             <h2 className="text-3xl font-bold text-gray-900 mb-2">
//               {t('role.welcome') || "Welcome to AgriThread"}
//             </h2>
//             <p className="text-gray-600">
//               {t('role.selectRole') || "Please select your role to continue"}
//             </p>
//           </div>

//           {/* Role Cards */}
//           <div className="space-y-3 mb-8">
//             {roles.map((role) => {
//               const Icon = role.icon;
//               const isSelected = selectedRole === role.value;
              
//               return (
//                 <button
//                   key={role.value}
//                   onClick={() => setSelectedRole(role.value)}
//                   className={`w-full p-5 rounded-xl border-2 transition-all duration-200 text-left ${
//                     isSelected
//                       ? 'border-green-600 bg-green-50 shadow-md'
//                       : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
//                   }`}
//                 >
//                   <div className="flex items-start gap-4">
//                     <div className={`p-3 rounded-lg ${
//                       isSelected ? 'bg-green-100' : 'bg-gray-100'
//                     }`}>
//                       <Icon className={`w-6 h-6 ${
//                         isSelected ? 'text-green-700' : 'text-gray-600'
//                       }`} />
//                     </div>
                    
//                     <div className="flex-1">
//                       <div className="font-semibold text-gray-900 mb-1">
//                         {t(role.titleKey)}
//                       </div>
//                       <div className="text-sm text-gray-600 leading-relaxed">
//                         {t(role.descriptionKey)}
//                       </div>
//                     </div>

//                     <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 ${
//                       isSelected 
//                         ? 'border-green-600 bg-green-600' 
//                         : 'border-gray-300'
//                     }`}>
//                       {isSelected && (
//                         <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
//                           <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
//                         </svg>
//                       )}
//                     </div>
//                   </div>
//                 </button>
//               );
//             })}
//           </div>

//           {/* Proceed Button */}
//           <Button
//             onClick={handleContinue}
//             disabled={!selectedRole}
//             size="lg"
//             className="w-full py-4 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//           >
//             {t('button.continue')} →
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };