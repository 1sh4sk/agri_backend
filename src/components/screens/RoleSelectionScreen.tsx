import { useState } from 'react';
import { User, Briefcase, Users, Building2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { RadioCard } from '../ui/RadioCard';
import { AuthLayout } from '../layout/AuthLayout';

const roles = [
  {
    value: 'farmer',
    icon: User,
    title: 'Farmer',
    description: 'Cultivate grow sell produce directly to buyers connect community',
  },
  {
    value: 'business',
    icon: Briefcase,
    title: 'Business',
    description: 'Source quality products expand network grow agricultural business',
  },
  {
    value: 'professional',
    icon: Users,
    title: 'Professional',
    description: 'Share expertise offer consulting collaborate agricultural projects',
  },
  {
    value: 'government',
    icon: Building2,
    title: 'Government Official',
    description: 'Connect stakeholders manage policies support agricultural development',
  },
];

interface RoleSelectionScreenProps {
  onNext: () => void;
}

export const RoleSelectionScreen = ({ onNext }: RoleSelectionScreenProps) => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const handleRoleSelect = (role: string | null) => {
    if (role) {
      localStorage.setItem('selectedRole', role);
      setSelectedRole(role);
    }
  };

  return (
    <AuthLayout>
      <div className="space-y-3">
        <div className="text-center">
          <h1 className="text-xl font-bold text-gray-900 mb-2">
            Welcome to AgriThread
          </h1>
          <p className="text-sm text-gray-600">
            Select the role that best describes you
          </p>
        </div>

        <div className="space-y-2">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <RadioCard
                key={role.value}
                id={role.value}
                name="role"
                value={role.value}
                checked={selectedRole === role.value}
                onChange={handleRoleSelect}
                title={role.title}
                description={role.description}
                icon={<Icon className="w-4 h-4" />}
              />
            );
          })}
        </div>

        <Button
          onClick={onNext}
          disabled={!selectedRole}
          variant="outline"
          fullWidth
          className="mt-6"
        >
          Proceed →
        </Button>
      </div>
    </AuthLayout>
  );
};