// // // src/contexts/AuthContext.tsx
// // import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// // import authService from '../services/auth.service';
// // import { useTranslation } from 'react-i18next';
// // import { LanguageCode } from '../i18n';

// // export type UserRole = 'farmer' | 'business' | 'professional' | 'government';

// // interface User {
// //   id: string;
// //   email: string;
// //   userName: string;
// //   phoneNumber: string;
// //   role: UserRole;
// //   language: string;
// // }

// // interface AuthContextType {
// //   user: User | null;
// //   role: UserRole | null;
// //   language: LanguageCode | null;
// //   isAuthenticated: boolean;
// //   loading: boolean;
// //   login: (identifier: string) => Promise<void>;
// //   signup: (userName: string, email: string, phoneNumber: string, apiRole?: string, apiLanguage?: string) => Promise<void>;
// //   logout: () => void;
// //   setUserRole: (role: UserRole | null) => void;
// //   setLanguage: (language: LanguageCode) => void;
// //   verifyOTP: (otp: string) => Promise<void>;
// //   verifyLoginOTP: (otp: string) => Promise<void>;
// //   resendOTP: () => Promise<void>;
// //   resendLoginOTP: () => Promise<void>;
// //   resendRegistrationOTP: () => Promise<void>;
// //   identifier: string;
// //   setIdentifier: (value: string) => void;
// //   isNewUser: boolean;
// //   setIsNewUser: (value: boolean) => void;
// //   isLoginFlow: boolean;
// //   setIsLoginFlow: (value: boolean) => void;
// // }

// // const AuthContext = createContext<AuthContextType | undefined>(undefined);

// // interface AuthProviderProps {
// //   children: ReactNode;
// // }

// // export const AuthProvider = ({ children }: AuthProviderProps) => {
// //   const { i18n } = useTranslation();
// //   const [user, setUser] = useState<User | null>(null);
// //   const [role, setRole] = useState<UserRole | null>(null);
// //   const [language, setLanguageState] = useState<LanguageCode | null>(null);
// //   const [identifier, setIdentifier] = useState<string>('');
// //   const [loading, setLoading] = useState<boolean>(true);
// //   const [isNewUser, setIsNewUser] = useState<boolean>(false);
// //   const [isLoginFlow, setIsLoginFlow] = useState<boolean>(false);

// //   useEffect(() => {
// //     // Load user data from localStorage on mount
// //     const storedUser = localStorage.getItem('user');
// //     const storedRole = localStorage.getItem('role');
// //     const storedLanguage = localStorage.getItem('language') as LanguageCode | null;
// //     const storedIdentifier = localStorage.getItem('identifier');
// //     const accessToken = localStorage.getItem('accessToken');
// //     const storedIsLoginFlow = localStorage.getItem('isLoginFlow');

// //     if (storedUser && accessToken) {
// //       try {
// //         setUser(JSON.parse(storedUser));
// //       } catch {
// //         localStorage.removeItem('user');
// //       }
// //     }
// //     if (storedRole) {
// //       setRole(storedRole as UserRole);
// //     }
// //     if (storedLanguage) {
// //       setLanguageState(storedLanguage);
// //       i18n.changeLanguage(storedLanguage);
// //     } else {
// //       const currentLanguage = i18n.language as LanguageCode;
// //       setLanguageState(currentLanguage);
// //       localStorage.setItem('language', currentLanguage);
// //     }
// //     if (storedIdentifier) {
// //       setIdentifier(storedIdentifier);
// //     }
// //     if (storedIsLoginFlow) {
// //       setIsLoginFlow(storedIsLoginFlow === 'true');
// //     }

// //     setLoading(false);
// //   }, [i18n]);

// //   // Helper function to handle errors
// //   const handleAuthError = (error: unknown, defaultMessage: string): never => {
// //     if (error instanceof Error) {
// //       throw new Error(error.message);
// //     }
// //     throw new Error(defaultMessage);
// //   };

// //   const login = async (identifierValue: string): Promise<void> => {
// //     try {
// //       setIdentifier(identifierValue);
// //       setIsLoginFlow(true);
// //       localStorage.setItem('identifier', identifierValue);
// //       localStorage.setItem('isLoginFlow', 'true');
// //       await authService.login({ identifier: identifierValue });
// //     } catch (error: unknown) {
// //       handleAuthError(error, 'Login failed');
// //     }
// //   };

// //   const signup = async (
// //     userName: string, 
// //     email: string, 
// //     phoneNumber: string, 
// //     apiRole?: string, 
// //     apiLanguage?: string
// //   ): Promise<void> => {
// //     try {
// //       const finalRole = (apiRole as UserRole) || role;
// //       const finalLanguage = (apiLanguage as LanguageCode) || language;

// //       if (!finalRole || !finalLanguage) {
// //         throw new Error('Please select role and language first');
// //       }

// //       const signupData = {
// //         userName,
// //         email,
// //         phoneNumber,
// //         role: finalRole,
// //         language: finalLanguage,
// //       };

// //       console.log('AuthContext sending:', signupData);

// //       setIdentifier(phoneNumber);
// //       setIsLoginFlow(false);
// //       localStorage.setItem('identifier', phoneNumber);
// //       localStorage.setItem('isLoginFlow', 'false');
      
// //       await authService.register(signupData);
// //       setIsNewUser(true);
// //     } catch (error: unknown) {
// //       handleAuthError(error, 'Signup failed');
// //     }
// //   };

// //   const verifyOTP = async (otp: string): Promise<void> => {
// //     try {
// //       if (!identifier) {
// //         throw new Error('No phone number found');
// //       }

// //       const response = await authService.verifyOTP({
// //         phoneNumber: identifier,
// //         otp,
// //       });

// //       if (response.data?.user) {
// //         const userData = response.data.user;
// //         setUser(userData);
// //         setRole(userData.role);
// //         setLanguageState(userData.language as LanguageCode);
        
// //         localStorage.setItem('user', JSON.stringify(userData));
// //         localStorage.setItem('role', userData.role);
// //         localStorage.setItem('language', userData.language);
// //         localStorage.removeItem('isLoginFlow');
        
// //         i18n.changeLanguage(userData.language);
// //       }
// //     } catch (error: unknown) {
// //       handleAuthError(error, 'OTP verification failed');
// //     }
// //   };

// //   const verifyLoginOTP = async (otp: string): Promise<void> => {
// //     try {
// //       if (!identifier) {
// //         throw new Error('No identifier found');
// //       }

// //       const response = await authService.verifyLoginOTP({
// //         identifier,
// //         otp,
// //       });

// //       if (response.data?.user) {
// //         const userData = response.data.user;
// //         setUser(userData);
// //         setRole(userData.role);
// //         setLanguageState(userData.language as LanguageCode);
        
// //         localStorage.setItem('user', JSON.stringify(userData));
// //         localStorage.setItem('role', userData.role);
// //         localStorage.setItem('language', userData.language);
// //         localStorage.removeItem('isLoginFlow');
        
// //         i18n.changeLanguage(userData.language);
// //       }
// //       setIsNewUser(false);
// //     } catch (error: unknown) {
// //       handleAuthError(error, 'Login verification failed');
// //     }
// //   };

// //   // Generic resend OTP (for backward compatibility)
// //   const resendOTP = async (): Promise<void> => {
// //     try {
// //       if (!identifier) {
// //         throw new Error('No identifier found');
// //       }
// //       await authService.resendOTP(identifier);
// //     } catch (error: unknown) {
// //       handleAuthError(error, 'Resend OTP failed');
// //     }
// //   };

// //   // Resend Login OTP
// //   const resendLoginOTP = async (): Promise<void> => {
// //     try {
// //       if (!identifier) {
// //         throw new Error('No identifier found');
// //       }
// //       await authService.resendLoginOTP({ identifier });
// //     } catch (error: unknown) {
// //       handleAuthError(error, 'Resend login OTP failed');
// //     }
// //   };

// //   // Resend Registration OTP
// //   const resendRegistrationOTP = async (): Promise<void> => {
// //     try {
// //       if (!identifier) {
// //         throw new Error('No phone number found');
// //       }
// //       await authService.resendRegistrationOTP({ phoneNumber: identifier });
// //     } catch (error: unknown) {
// //       handleAuthError(error, 'Resend registration OTP failed');
// //     }
// //   };

// //   const logout = (): void => {
// //     setUser(null);
// //     setRole(null);
// //     setLanguageState(null);
// //     setIdentifier('');
// //     setIsNewUser(false);
// //     setIsLoginFlow(false);
// //     authService.logout();
// //     localStorage.removeItem('isLoginFlow');
// //   };

// //   const setUserRole = (newRole: UserRole | null): void => {
// //     setRole(newRole);
// //     if (newRole) {
// //       localStorage.setItem('role', newRole);
// //     } else {
// //       localStorage.removeItem('role');
// //     }
// //   };

// //   const setLanguage = (newLanguage: LanguageCode): void => {
// //     setLanguageState(newLanguage);
// //     localStorage.setItem('language', newLanguage);
// //     i18n.changeLanguage(newLanguage);
// //   };

// //   const value: AuthContextType = {
// //     user,
// //     role,
// //     language,
// //     isAuthenticated: !!user,
// //     loading,
// //     login,
// //     signup,
// //     logout,
// //     setUserRole,
// //     setLanguage,
// //     verifyOTP,
// //     verifyLoginOTP,
// //     resendOTP,
// //     resendLoginOTP,
// //     resendRegistrationOTP,
// //     identifier,
// //     setIdentifier,
// //     isNewUser,
// //     setIsNewUser,
// //     isLoginFlow,
// //     setIsLoginFlow,
// //   };

// //   return (
// //     <AuthContext.Provider value={value}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };

// // export const useAuth = (): AuthContextType => {
// //   const context = useContext(AuthContext);
// //   if (context === undefined) {
// //     throw new Error('useAuth must be used within an AuthProvider');
// //   }
// //   return context;
// // };



// // src/contexts/AuthContext.tsx
// import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// import authService from '../services/auth.service';
// import { useTranslation } from 'react-i18next';
// import { LanguageCode } from '../i18n';

// export type UserRole = 'farmer' | 'business' | 'professional' | 'government';

// interface User {
//   id: string;
//   email: string;
//   userName: string;
//   phoneNumber: string;
//   role: UserRole;
//   language: string;
// }

// interface AuthContextType {
//   user: User | null;
//   role: UserRole | null;
//   language: LanguageCode | null;
//   isAuthenticated: boolean;
//   loading: boolean;
//   login: (identifier: string) => Promise<void>;
//   signup: (userName: string, email: string, phoneNumber: string, apiRole?: string, apiLanguage?: string) => Promise<void>;
//   logout: () => void;
//   setUserRole: (role: UserRole | null) => void;
//   setLanguage: (language: LanguageCode) => void;
//   verifyOTP: (otp: string) => Promise<void>;
//   verifyLoginOTP: (otp: string) => Promise<void>;
//   resendOTP: () => Promise<void>;
//   resendLoginOTP: () => Promise<void>;
//   resendRegistrationOTP: () => Promise<void>;
//   identifier: string;
//   setIdentifier: (value: string) => void;
//   isNewUser: boolean;
//   setIsNewUser: (value: boolean) => void;
//   isLoginFlow: boolean;
//   setIsLoginFlow: (value: boolean) => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// interface AuthProviderProps {
//   children: ReactNode;
// }

// export const AuthProvider = ({ children }: AuthProviderProps) => {
//   const { i18n } = useTranslation();
//   const [user, setUser] = useState<User | null>(null);
//   const [role, setRole] = useState<UserRole | null>(null);
//   const [language, setLanguageState] = useState<LanguageCode | null>(null);
//   const [identifier, setIdentifier] = useState<string>('');
//   const [loading, setLoading] = useState<boolean>(true);
//   const [isNewUser, setIsNewUser] = useState<boolean>(false);
//   const [isLoginFlow, setIsLoginFlow] = useState<boolean>(false);

//   useEffect(() => {
//     // Load user data from localStorage on mount
//     const storedUser = localStorage.getItem('user');
//     const storedRole = localStorage.getItem('role');
//     const storedLanguage = localStorage.getItem('language') as LanguageCode | null;
//     const storedIdentifier = localStorage.getItem('identifier');
//     const accessToken = localStorage.getItem('accessToken');
//     const storedIsLoginFlow = localStorage.getItem('isLoginFlow');

//     if (storedUser && accessToken) {
//       try {
//         setUser(JSON.parse(storedUser));
//       } catch {
//         localStorage.removeItem('user');
//       }
//     }
//     if (storedRole) {
//       setRole(storedRole as UserRole);
//     }
//     if (storedLanguage) {
//       setLanguageState(storedLanguage);
//       i18n.changeLanguage(storedLanguage);
//     } else {
//       const currentLanguage = i18n.language as LanguageCode;
//       setLanguageState(currentLanguage);
//       localStorage.setItem('language', currentLanguage);
//     }
//     if (storedIdentifier) {
//       setIdentifier(storedIdentifier);
//     }
//     if (storedIsLoginFlow) {
//       setIsLoginFlow(storedIsLoginFlow === 'true');
//     }

//     setLoading(false);
//   }, [i18n]);

//   // Helper function to handle errors
//   const handleAuthError = (error: unknown, defaultMessage: string): never => {
//     if (error instanceof Error) {
//       throw new Error(error.message);
//     }
//     throw new Error(defaultMessage);
//   };

//   const login = async (identifierValue: string): Promise<void> => {
//     try {
//       setIdentifier(identifierValue);
//       setIsLoginFlow(true);
//       localStorage.setItem('identifier', identifierValue);
//       localStorage.setItem('isLoginFlow', 'true');
      
//       console.log('🔵 Login API call starting...', identifierValue);
//       const response = await authService.login({ identifier: identifierValue });
//       console.log('✅ Login API call completed', response);
      
//       // Add a small delay to ensure network tab capture
//       await new Promise(resolve => setTimeout(resolve, 100));
//     } catch (error: unknown) {
//       console.error('❌ Login API call failed', error);
//       handleAuthError(error, 'Login failed');
//     }
//   };

//   const signup = async (
//     userName: string, 
//     email: string, 
//     phoneNumber: string, 
//     apiRole?: string, 
//     apiLanguage?: string
//   ): Promise<void> => {
//     try {
//       const finalRole = (apiRole as UserRole) || role;
//       const finalLanguage = (apiLanguage as LanguageCode) || language;

//       if (!finalRole || !finalLanguage) {
//         throw new Error('Please select role and language first');
//       }

//       const signupData = {
//         userName,
//         email,
//         phoneNumber,
//         role: finalRole,
//         language: finalLanguage,
//       };

//       console.log('🔵 Signup API call starting...', signupData);

//       setIdentifier(phoneNumber);
//       setIsLoginFlow(false);
//       localStorage.setItem('identifier', phoneNumber);
//       localStorage.setItem('isLoginFlow', 'false');
      
//       const response = await authService.register(signupData);
//       console.log('✅ Signup API call completed', response);
      
//       setIsNewUser(true);
      
//       // Add a small delay to ensure network tab capture
//       await new Promise(resolve => setTimeout(resolve, 100));
//     } catch (error: unknown) {
//       console.error('❌ Signup API call failed', error);
//       handleAuthError(error, 'Signup failed');
//     }
//   };

//   const verifyOTP = async (otp: string): Promise<void> => {
//     try {
//       if (!identifier) {
//         throw new Error('No phone number found');
//       }

//       console.log('🔵 Verify OTP API call starting...', { identifier, otp });
//       const response = await authService.verifyOTP({
//         phoneNumber: identifier,
//         otp,
//       });
//       console.log('✅ Verify OTP API call completed', response);

//       if (response.data?.user) {
//         const userData = response.data.user;
//         setUser(userData);
//         setRole(userData.role);
//         setLanguageState(userData.language as LanguageCode);
        
//         localStorage.setItem('user', JSON.stringify(userData));
//         localStorage.setItem('role', userData.role);
//         localStorage.setItem('language', userData.language);
//         localStorage.removeItem('isLoginFlow');
        
//         i18n.changeLanguage(userData.language);
//       }
      
//       // Add a small delay to ensure network tab capture
//       await new Promise(resolve => setTimeout(resolve, 100));
//     } catch (error: unknown) {
//       console.error('❌ Verify OTP API call failed', error);
//       handleAuthError(error, 'OTP verification failed');
//     }
//   };

//   const verifyLoginOTP = async (otp: string): Promise<void> => {
//     try {
//       if (!identifier) {
//         throw new Error('No identifier found');
//       }

//       console.log('🔵 Verify Login OTP API call starting...', { identifier, otp });
//       const response = await authService.verifyLoginOTP({
//         identifier,
//         otp,
//       });
//       console.log('✅ Verify Login OTP API call completed', response);

//       if (response.data?.user) {
//         const userData = response.data.user;
//         setUser(userData);
//         setRole(userData.role);
//         setLanguageState(userData.language as LanguageCode);
        
//         localStorage.setItem('user', JSON.stringify(userData));
//         localStorage.setItem('role', userData.role);
//         localStorage.setItem('language', userData.language);
//         localStorage.removeItem('isLoginFlow');
        
//         i18n.changeLanguage(userData.language);
//       }
//       setIsNewUser(false);
      
//       // Add a small delay to ensure network tab capture
//       await new Promise(resolve => setTimeout(resolve, 100));
//     } catch (error: unknown) {
//       console.error('❌ Verify Login OTP API call failed', error);
//       handleAuthError(error, 'Login verification failed');
//     }
//   };

//   const resendOTP = async (): Promise<void> => {
//     try {
//       if (!identifier) {
//         throw new Error('No identifier found');
//       }
//       console.log('🔵 Resend OTP API call starting...', identifier);
//       await authService.resendOTP(identifier);
//       console.log('✅ Resend OTP API call completed');
//     } catch (error: unknown) {
//       console.error('❌ Resend OTP API call failed', error);
//       handleAuthError(error, 'Resend OTP failed');
//     }
//   };

//   const resendLoginOTP = async (): Promise<void> => {
//     try {
//       if (!identifier) {
//         throw new Error('No identifier found');
//       }
//       console.log('🔵 Resend Login OTP API call starting...', identifier);
//       await authService.resendLoginOTP({ identifier });
//       console.log('✅ Resend Login OTP API call completed');
//     } catch (error: unknown) {
//       console.error('❌ Resend Login OTP API call failed', error);
//       handleAuthError(error, 'Resend login OTP failed');
//     }
//   };

//   const resendRegistrationOTP = async (): Promise<void> => {
//     try {
//       if (!identifier) {
//         throw new Error('No phone number found');
//       }
//       console.log('🔵 Resend Registration OTP API call starting...', identifier);
//       await authService.resendRegistrationOTP({ phoneNumber: identifier });
//       console.log('✅ Resend Registration OTP API call completed');
//     } catch (error: unknown) {
//       console.error('❌ Resend Registration OTP API call failed', error);
//       handleAuthError(error, 'Resend registration OTP failed');
//     }
//   };

//   const logout = (): void => {
//     setUser(null);
//     setRole(null);
//     setLanguageState(null);
//     setIdentifier('');
//     setIsNewUser(false);
//     setIsLoginFlow(false);
//     authService.logout();
//     localStorage.removeItem('isLoginFlow');
//   };

//   const setUserRole = (newRole: UserRole | null): void => {
//     setRole(newRole);
//     if (newRole) {
//       localStorage.setItem('role', newRole);
//     } else {
//       localStorage.removeItem('role');
//     }
//   };

//   const setLanguage = (newLanguage: LanguageCode): void => {
//     setLanguageState(newLanguage);
//     localStorage.setItem('language', newLanguage);
//     i18n.changeLanguage(newLanguage);
//   };

//   const value: AuthContextType = {
//     user,
//     role,
//     language,
//     isAuthenticated: !!user,
//     loading,
//     login,
//     signup,
//     logout,
//     setUserRole,
//     setLanguage,
//     verifyOTP,
//     verifyLoginOTP,
//     resendOTP,
//     resendLoginOTP,
//     resendRegistrationOTP,
//     identifier,
//     setIdentifier,
//     isNewUser,
//     setIsNewUser,
//     isLoginFlow,
//     setIsLoginFlow,
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };


// src/contexts/AuthContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import authService from '../services/auth.service';
import { useTranslation } from 'react-i18next';
import { LanguageCode } from '../i18n';

export type UserRole = 'farmer' | 'business' | 'professional' | 'government';

interface User {
  id: string;
  email: string;
  userName: string;
  phoneNumber: string;
  role: UserRole;
  language: string;
}

interface AuthContextType {
  user: User | null;
  role: UserRole | null;
  language: LanguageCode | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (identifier: string) => Promise<void>;
  signup: (userName: string, email: string, phoneNumber: string, apiRole?: string, apiLanguage?: string) => Promise<void>;
  logout: () => void;
  setUserRole: (role: UserRole | null) => void;
  setLanguage: (language: LanguageCode) => void;
  verifyOTP: (otp: string) => Promise<void>;
  verifyLoginOTP: (otp: string) => Promise<void>;
  resendOTP: () => Promise<void>;
  resendLoginOTP: () => Promise<void>;
  resendRegistrationOTP: () => Promise<void>;
  identifier: string;
  setIdentifier: (value: string) => void;
  isNewUser: boolean;
  setIsNewUser: (value: boolean) => void;
  isLoginFlow: boolean;
  setIsLoginFlow: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { i18n } = useTranslation();
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [language, setLanguageState] = useState<LanguageCode | null>(null);
  const [identifier, setIdentifier] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [isNewUser, setIsNewUser] = useState<boolean>(false);
  const [isLoginFlow, setIsLoginFlow] = useState<boolean>(false);

  useEffect(() => {
    // Load user data from localStorage on mount
    const storedUser = localStorage.getItem('user');
    const storedRole = localStorage.getItem('role');
    const storedLanguage = localStorage.getItem('language') as LanguageCode | null;
    const storedIdentifier = localStorage.getItem('identifier');
    const accessToken = localStorage.getItem('accessToken');
    const storedIsLoginFlow = localStorage.getItem('isLoginFlow');

    if (storedUser && accessToken) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem('user');
      }
    }
    if (storedRole) {
      setRole(storedRole as UserRole);
    }
    if (storedLanguage) {
      setLanguageState(storedLanguage);
      i18n.changeLanguage(storedLanguage);
    } else {
      const currentLanguage = i18n.language as LanguageCode;
      setLanguageState(currentLanguage);
      localStorage.setItem('language', currentLanguage);
    }
    if (storedIdentifier) {
      setIdentifier(storedIdentifier);
    }
    if (storedIsLoginFlow) {
      setIsLoginFlow(storedIsLoginFlow === 'true');
    }

    setLoading(false);
  }, [i18n]);

  // Helper function to handle errors
  const handleAuthError = (error: unknown, defaultMessage: string): never => {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error(defaultMessage);
  };

  const login = async (identifierValue: string): Promise<void> => {
    try {
      setIdentifier(identifierValue);
      setIsLoginFlow(true);
      localStorage.setItem('identifier', identifierValue);
      localStorage.setItem('isLoginFlow', 'true');
      
      console.log('🔵 Login API call starting...', identifierValue);
      const response = await authService.login({ identifier: identifierValue });
      console.log('✅ Login API call completed', response);
      
      // Add a small delay to ensure network tab capture
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (error: unknown) {
      console.error('❌ Login API call failed', error);
      handleAuthError(error, 'Login failed');
    }
  };

  const signup = async (
    userName: string, 
    email: string, 
    phoneNumber: string, 
    apiRole?: string, 
    apiLanguage?: string
  ): Promise<void> => {
    try {
      const finalRole = (apiRole as UserRole) || role;
      const finalLanguage = (apiLanguage as LanguageCode) || language;

      if (!finalRole || !finalLanguage) {
        throw new Error('Please select role and language first');
      }

      const signupData = {
        userName,
        email,
        phoneNumber,
        role: finalRole,
        language: finalLanguage,
      };

      console.log('🔵 Signup API call starting...', signupData);

      setIdentifier(phoneNumber);
      setIsLoginFlow(false);
      localStorage.setItem('identifier', phoneNumber);
      localStorage.setItem('isLoginFlow', 'false');
      
      const response = await authService.register(signupData);
      console.log('✅ Signup API call completed', response);
      
      // Set user data immediately from registration response
      if (response.data?.user) {
        const userData = response.data.user;
        setUser(userData);
        setRole(userData.role);
        setLanguageState(userData.language as LanguageCode);
        i18n.changeLanguage(userData.language);
        console.log('✅ User data set from registration response');
      }
      
      setIsNewUser(true);
      
      // Add a small delay to ensure network tab capture
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (error: unknown) {
      console.error('❌ Signup API call failed', error);
      handleAuthError(error, 'Signup failed');
    }
  };

  const verifyOTP = async (otp: string): Promise<void> => {
    try {
      if (!identifier) {
        throw new Error('No phone number found');
      }

      console.log('🔵 Verify OTP API call starting...', { identifier, otp });
      const response = await authService.verifyOTP({
        phoneNumber: identifier,
        otp,
      });
      console.log('✅ Verify OTP API call completed', response);

      if (response.data?.user) {
        const userData = response.data.user;
        setUser(userData);
        setRole(userData.role);
        setLanguageState(userData.language as LanguageCode);
        
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('role', userData.role);
        localStorage.setItem('language', userData.language);
        localStorage.removeItem('isLoginFlow');
        
        i18n.changeLanguage(userData.language);
      }
      
      // Add a small delay to ensure network tab capture
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (error: unknown) {
      console.error('❌ Verify OTP API call failed', error);
      handleAuthError(error, 'OTP verification failed');
    }
  };

  const verifyLoginOTP = async (otp: string): Promise<void> => {
    try {
      if (!identifier) {
        throw new Error('No identifier found');
      }

      console.log('🔵 Verify Login OTP API call starting...', { identifier, otp });
      const response = await authService.verifyLoginOTP({
        identifier,
        otp,
      });
      console.log('✅ Verify Login OTP API call completed', response);

      if (response.data?.user) {
        const userData = response.data.user;
        setUser(userData);
        setRole(userData.role);
        setLanguageState(userData.language as LanguageCode);
        
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('role', userData.role);
        localStorage.setItem('language', userData.language);
        localStorage.removeItem('isLoginFlow');
        
        i18n.changeLanguage(userData.language);
      }
      setIsNewUser(false);
      
      // Add a small delay to ensure network tab capture
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (error: unknown) {
      console.error('❌ Verify Login OTP API call failed', error);
      handleAuthError(error, 'Login verification failed');
    }
  };

  const resendOTP = async (): Promise<void> => {
    try {
      if (!identifier) {
        throw new Error('No identifier found');
      }
      console.log('🔵 Resend OTP API call starting...', identifier);
      await authService.resendOTP(identifier);
      console.log('✅ Resend OTP API call completed');
    } catch (error: unknown) {
      console.error('❌ Resend OTP API call failed', error);
      handleAuthError(error, 'Resend OTP failed');
    }
  };

  const resendLoginOTP = async (): Promise<void> => {
    try {
      if (!identifier) {
        throw new Error('No identifier found');
      }
      console.log('🔵 Resend Login OTP API call starting...', identifier);
      await authService.resendLoginOTP({ identifier });
      console.log('✅ Resend Login OTP API call completed');
    } catch (error: unknown) {
      console.error('❌ Resend Login OTP API call failed', error);
      handleAuthError(error, 'Resend login OTP failed');
    }
  };

  const resendRegistrationOTP = async (): Promise<void> => {
    try {
      if (!identifier) {
        throw new Error('No phone number found');
      }
      console.log('🔵 Resend Registration OTP API call starting...', identifier);
      await authService.resendRegistrationOTP({ phoneNumber: identifier });
      console.log('✅ Resend Registration OTP API call completed');
    } catch (error: unknown) {
      console.error('❌ Resend Registration OTP API call failed', error);
      handleAuthError(error, 'Resend registration OTP failed');
    }
  };

  const logout = (): void => {
    setUser(null);
    setRole(null);
    setLanguageState(null);
    setIdentifier('');
    setIsNewUser(false);
    setIsLoginFlow(false);
    authService.logout();
    localStorage.removeItem('isLoginFlow');
  };

  const setUserRole = (newRole: UserRole | null): void => {
    setRole(newRole);
    if (newRole) {
      localStorage.setItem('role', newRole);
    } else {
      localStorage.removeItem('role');
    }
  };

  const setLanguage = (newLanguage: LanguageCode): void => {
    setLanguageState(newLanguage);
    localStorage.setItem('language', newLanguage);
    i18n.changeLanguage(newLanguage);
  };

  const value: AuthContextType = {
    user,
    role,
    language,
    isAuthenticated: !!user,
    loading,
    login,
    signup,
    logout,
    setUserRole,
    setLanguage,
    verifyOTP,
    verifyLoginOTP,
    resendOTP,
    resendLoginOTP,
    resendRegistrationOTP,
    identifier,
    setIdentifier,
    isNewUser,
    setIsNewUser,
    isLoginFlow,
    setIsLoginFlow,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};