// import { useState } from 'react';
// import { User, Briefcase, Users, Building2 } from 'lucide-react';
// import { Button } from '../ui/Button';
// import { RadioCard } from '../ui/RadioCard';
// import { AuthLayout } from '../layout/AuthLayout';
// import { useTranslation } from 'react-i18next';
// import { UserRole, USER_ROLES } from '../../constants/userRoles';
// import { useAuth } from '../../contexts/AuthContext';

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

// interface RoleSelectionScreenProps {
//   onNext: () => void;
// }

// export const RoleSelectionScreen = ({ onNext  }: RoleSelectionScreenProps) => {
//   const { setUserRole } = useAuth();
//   const { t } = useTranslation();
//   const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

//   const handleRoleSelect = (role: string | null) => {
//     setSelectedRole(role as UserRole);
//   };

//   const handleNext = () => {
//     if (selectedRole) {
//       localStorage.setItem('selectedRole', selectedRole);
//       setUserRole(selectedRole);
//       onNext();
//     }
//   };


//   return (
//     <AuthLayout  showGuestButton={false} >
//       <div className="space-y-3">
//         <div className="text-start">
//           <h1 className="text-xl font-bold text-gray-900 mb-2">
//             {t('role.select.title')}
//           </h1>
//           <p className="text-xs text-gray-600">
//             {t('role.select.subtitle')}
//           </p>
//         </div>

//         <div className="space-y-2">
//           {roles.map((role) => {
//             const Icon = role.icon;
//             return (
//               <RadioCard
//                 key={role.value}
//                 id={role.value}
//                 name="role"
//                 value={role.value}
//                 checked={selectedRole === role.value}
//                 onChange={() => handleRoleSelect(role.value)}
//                 title={t(role.titleKey)}
//                 description={t(role.descriptionKey)}
//                 icon={<Icon className="w-4 h-4" />}
//               />
//             );
//           })}
//         </div>

//         <Button
//           onClick={handleNext}
//           disabled={!selectedRole}
//           variant="primaryNew"
//           size='md'
         
//           fullWidth
//           className="mt-6"
//         >
//            {t('button.continue')} →
//         </Button>
//       </div>
//     </AuthLayout>
//   );
// };

import { useState } from 'react';
import { User, Briefcase, Users, Building2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { RadioCard } from '../ui/RadioCard';
import { AuthLayout } from '../layout/AuthLayout';
import { useTranslation } from 'react-i18next';
import { UserRole, USER_ROLES } from '../../constants/userRoles';
import { useAuth } from '../../contexts/AuthContext';

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

interface RoleSelectionScreenProps {
  onNext: () => void;
}

export const RoleSelectionScreen = ({ onNext }: RoleSelectionScreenProps) => {
  const { setUserRole } = useAuth();
  const { t } = useTranslation();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  const handleRoleSelect = (role: string | null) => {
    setSelectedRole(role as UserRole);
  };

  const handleNext = () => {
    if (selectedRole) {
      localStorage.setItem('selectedRole', selectedRole);
      setUserRole(selectedRole);
      onNext();
    }
  };

  return (
    <AuthLayout showGuestButton={false}>
      <div className=" flex flex-col items-center justify-center">
        {/* Header Section */}
        <div className="w-full text-start mr-16 mb-4">
          <h1 className="text-[26px] font-semibold text-gray-900 mb-1">
            {t('role.select.title')}
          </h1>
          <p className="text-[14px] font-light text-gray-600 leading-relaxed">
            {t('role.select.subtitle')}
          </p>
        </div>

        {/* Radio Cards Section */}
        <div className="w-[426px] flex flex-col gap-3">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <RadioCard
                key={role.value}
                id={role.value}
                name="role"
                value={role.value}
                checked={selectedRole === role.value}
                onChange={() => handleRoleSelect(role.value)}
                title={t(role.titleKey)}
                description={t(role.descriptionKey)}
                icon={<Icon className="w-5 h-5" />}
                compact={true} // Enable compact mode for role selection
              />
            );
          })}
        </div>

        {/* Button Section */}
        <div className="w-[426px] mt-6">
          <Button
            onClick={handleNext}
            disabled={!selectedRole}
            variant="primaryNew"
            size="md"
            fullWidth
          >
            {t('button.continue')} →
          </Button>
        </div>
      </div>
    </AuthLayout>
  );
};