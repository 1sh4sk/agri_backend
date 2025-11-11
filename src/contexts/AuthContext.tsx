import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'farmer' | 'business' | 'professional' | 'government';

interface User {
  id: string;
  email: string;
  fullName: string;
  role: UserRole | null;
}

interface AuthContextType {
  user: User | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (fullName: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  setUserRole: (role: UserRole | null) => void;
  verifyOTP: (otp: string) => Promise<void>;
  resendOTP: () => Promise<void>;
  emailOrMobile: string;
  setEmailOrMobile: (value: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [emailOrMobile, setEmailOrMobile] = useState<string>('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedRole = localStorage.getItem('role');
    const storedEmailOrMobile = localStorage.getItem('emailOrMobile');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedRole) {
      setRole(storedRole as UserRole);
    }
    if (storedEmailOrMobile) {
      setEmailOrMobile(storedEmailOrMobile);
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Actually use the password parameter to avoid ESLint warning
    if (!email || !password) {
      throw new Error('Email and password are required');
    }
    
    // Store email/mobile for OTP verification
    setEmailOrMobile(email);
    localStorage.setItem('emailOrMobile', email);

    // In real implementation, you would call your API here
    // For now, we'll simulate the login process stopping at OTP verification
    throw new Error('OTP verification required');
  };

  const signup = async (fullName: string, email: string, password: string) => {
    // Actually use the password parameter to avoid ESLint warning
    if (!fullName || !email || !password) {
      throw new Error('All fields are required');
    }

    // Store email/mobile for OTP verification
    setEmailOrMobile(email);
    localStorage.setItem('emailOrMobile', email);

    // In real implementation, you would call your API here
    // For now, we'll simulate the signup process stopping at OTP verification
    throw new Error('OTP verification required');
  };

  const verifyOTP = async (otp: string) => {
    if (!otp || otp.length !== 6) {
      throw new Error('Please enter a valid 6-digit OTP');
    }

    // Mock OTP verification - in real app, call your API
    if (otp === '123456') { // Mock valid OTP
      const mockUser: User = {
        id: '1',
        email: emailOrMobile,
        fullName: 'User Name', // This would come from signup or user profile
        role: role,
      };
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.removeItem('emailOrMobile'); // Clean up after successful verification
    } else {
      throw new Error('Invalid OTP. Please try again.');
    }
  };

  const resendOTP = async () => {
    if (!emailOrMobile) {
      throw new Error('No email or mobile number found');
    }

    // Mock resend OTP - in real app, call your API
    console.log(`Resending OTP to: ${emailOrMobile}`);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In real implementation, you would handle the API response
    return Promise.resolve();
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    setEmailOrMobile('');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    localStorage.removeItem('emailOrMobile');
  };

  const setUserRole = (newRole: UserRole | null) => {
    setRole(newRole);
    if (newRole) {
      localStorage.setItem('role', newRole);
    }
  };

  const value: AuthContextType = {
    user,
    role,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
    setUserRole,
    verifyOTP,
    resendOTP,
    emailOrMobile,
    setEmailOrMobile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};