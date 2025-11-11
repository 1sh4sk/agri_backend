import { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { AuthLayout } from '../layout/AuthLayout';

interface LoginScreenProps {
  onSignup: () => void;
  onSuccess: () => void;
}

export const LoginScreen = ({ onSignup, onSuccess }: LoginScreenProps) => {
  const [formData, setFormData] = useState({
    email: '',
    mobile: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess();
  };

  return (
    <AuthLayout imageUrl="https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?auto=compress&cs=tinysrgb&w=1200">
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
            Welcome 👋
          </h1>
          <p className="text-sm text-gray-600">
            Login to your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Id
            </label>
            <Input
              type="email"
              placeholder="gaganperera@gmail.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="text-center py-2">
            <span className="text-sm text-gray-500 font-medium">Or</span>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mobile No.
            </label>
            <div className="flex gap-2">
              <select className="px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500">
                <option>+91</option>
              </select>
              <Input
                type="tel"
                placeholder="Enter Mobile No."
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            fullWidth
            className="mt-6 bg-primary hover:bg-primary-600"
          >
            Get OTP
          </Button>

          <div className="text-center text-sm text-gray-600">
            Don't have an account yet?{' '}
            <button type="button" onClick={onSignup} className="text-primary font-semibold underline hover:text-primary-600">
              Sign Up
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              className="text-sm text-primary font-semibold underline hover:text-primary-600"
            >
              Continue as Guest
            </button>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};
