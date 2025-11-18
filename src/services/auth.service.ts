// // src/services/auth.service.ts
// import apiClient from './api.service';
// import { UserRole } from '../contexts/AuthContext';

// export interface RegisterRequest {
//   userName: string;
//   email: string;
//   phoneNumber: string;
//   role: UserRole;
//   language: string;
// }

// export interface VerifyOTPRequest {
//   phoneNumber: string;
//   otp: string;
// }

// export interface LoginRequest {
//   identifier: string; // email or phone number
// }

// export interface VerifyLoginOTPRequest {
//   identifier: string;
//   otp: string;
// }

// export interface ResendLoginOTPRequest {
//   identifier: string;
// }

// export interface ResendRegistrationOTPRequest {
//   phoneNumber: string;
// }

// export interface AuthResponse {
//   success: boolean;
//   message: string;
//   data?: {
//     accessToken?: string;
//     refreshToken?: string;
//     user?: {
//       id: string;
//       userName: string;
//       email: string;
//       phoneNumber: string;
//       role: UserRole;
//       language: string;
//     };
//   };
// }

// // Define error response type
// interface ErrorResponse {
//   response?: {
//     data?: {
//       message?: string;
//     };
//   };
//   message?: string;
// }

// // Type guard to check if error has response data
// function isErrorWithResponse(error: unknown): error is ErrorResponse {
//   return typeof error === 'object' && error !== null && 'response' in error;
// }

// // Type guard to check if error is an Error object
// function isError(error: unknown): error is Error {
//   return error instanceof Error;
// }

// class AuthService {
//   // Helper method to handle errors
//   private handleError(error: unknown, defaultMessage: string): never {
//     if (isErrorWithResponse(error) && error.response?.data?.message) {
//       throw new Error(error.response.data.message);
//     }
    
//     if (isError(error)) {
//       throw new Error(error.message);
//     }
    
//     throw new Error(defaultMessage);
//   }

//   // Register new user
//   async register(data: RegisterRequest): Promise<AuthResponse> {
//     try {
//       const response = await apiClient.post<AuthResponse>('/auth/register', data);
//       return response.data;
//     } catch (error: unknown) {
//       return this.handleError(error, 'Registration failed');
//     }
//   }

//   // Verify OTP after registration
//   async verifyOTP(data: VerifyOTPRequest): Promise<AuthResponse> {
//     try {
//       const response = await apiClient.post<AuthResponse>('/auth/verify-otp', data);
      
//       // Store tokens if provided
//       if (response.data.data?.accessToken) {
//         localStorage.setItem('accessToken', response.data.data.accessToken);
//       }
//       if (response.data.data?.refreshToken) {
//         localStorage.setItem('refreshToken', response.data.data.refreshToken);
//       }
      
//       return response.data;
//     } catch (error: unknown) {
//       return this.handleError(error, 'OTP verification failed');
//     }
//   }

//   // Login - Send OTP
//   async login(data: LoginRequest): Promise<AuthResponse> {
//     try {
//       const response = await apiClient.post<AuthResponse>('/auth/login', data);
//       return response.data;
//     } catch (error: unknown) {
//       return this.handleError(error, 'Login failed');
//     }
//   }

//   // Verify Login OTP
//   async verifyLoginOTP(data: VerifyLoginOTPRequest): Promise<AuthResponse> {
//     try {
//       const response = await apiClient.post<AuthResponse>('/auth/verify-login-otp', data);
      
//       // Store tokens
//       if (response.data.data?.accessToken) {
//         localStorage.setItem('accessToken', response.data.data.accessToken);
//       }
//       if (response.data.data?.refreshToken) {
//         localStorage.setItem('refreshToken', response.data.data.refreshToken);
//       }
      
//       return response.data;
//     } catch (error: unknown) {
//       return this.handleError(error, 'Login verification failed');
//     }
//   }

//   // Resend Login OTP
//   async resendLoginOTP(data: ResendLoginOTPRequest): Promise<AuthResponse> {
//     try {
//       const response = await apiClient.post<AuthResponse>('/auth/resend-login-otp', data);
//       return response.data;
//     } catch (error: unknown) {
//       return this.handleError(error, 'Resend login OTP failed');
//     }
//   }

//   // Resend Registration OTP
//   async resendRegistrationOTP(data: ResendRegistrationOTPRequest): Promise<AuthResponse> {
//     try {
//       const response = await apiClient.post<AuthResponse>('/auth/resend-registration-otp', data);
//       return response.data;
//     } catch (error: unknown) {
//       return this.handleError(error, 'Resend registration OTP failed');
//     }
//   }

//   // Generic resend OTP (for backward compatibility)
//   async resendOTP(identifier: string): Promise<AuthResponse> {
//     try {
//       // This is a fallback method - you might want to remove it or handle differently
//       const response = await apiClient.post<AuthResponse>('/auth/resend-otp', {
//         identifier,
//       });
//       return response.data;
//     } catch (error: unknown) {
//       return this.handleError(error, 'Resend OTP failed');
//     }
//   }

//   // Logout
//   logout(): void {
//     localStorage.removeItem('accessToken');
//     localStorage.removeItem('refreshToken');
//     localStorage.removeItem('user');
//     localStorage.removeItem('role');
//     localStorage.removeItem('emailOrMobile');
//     localStorage.removeItem('language');
//   }
// }

// export default new AuthService();











// src/services/auth.service.ts
import apiClient from './api.service';
import { UserRole } from '../contexts/AuthContext';

export interface RegisterRequest {
  userName: string;
  email: string;
  phoneNumber: string;
  role: UserRole;
  language: string;
}

export interface VerifyOTPRequest {
  phoneNumber: string;
  otp: string;
}

export interface LoginRequest {
  identifier: string;
}

export interface VerifyLoginOTPRequest {
  identifier: string;
  otp: string;
}

export interface ResendLoginOTPRequest {
  identifier: string;
}

export interface ResendRegistrationOTPRequest {
  phoneNumber: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    accessToken?: string;
    refreshToken?: string;
    tokens?: {
      accessToken: string;
      refreshToken: string;
      accessTokenExpiresIn: string;
      refreshTokenExpiresIn: string;
    };
    user?: {
      id: string;
      userName: string;
      email: string;
      phoneNumber: string;
      role: UserRole;
      language: string;
      emailVerified?: boolean;
      phoneVerified?: boolean;
    };
    roleData?: any;
  };
}

interface ErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

function isErrorWithResponse(error: unknown): error is ErrorResponse {
  return typeof error === 'object' && error !== null && 'response' in error;
}

function isError(error: unknown): error is Error {
  return error instanceof Error;
}

class AuthService {
  private handleError(error: unknown, defaultMessage: string): never {
    if (isErrorWithResponse(error) && error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    
    if (isError(error)) {
      throw new Error(error.message);
    }
    
    throw new Error(defaultMessage);
  }

  // Helper to store tokens
  private storeTokens(response: AuthResponse): void {
    // Check for tokens in data.tokens (new structure from your API)
    if (response.data?.tokens) {
      const { accessToken, refreshToken } = response.data.tokens;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      console.log('✅ Tokens stored from data.tokens');
    } 
    // Fallback to old structure
    else if (response.data?.accessToken) {
      localStorage.setItem('accessToken', response.data.accessToken);
      if (response.data.refreshToken) {
        localStorage.setItem('refreshToken', response.data.refreshToken);
      }
      console.log('✅ Tokens stored from data.accessToken');
    }
  }

  // Register new user - STORES TOKENS IMMEDIATELY
  async register(data: RegisterRequest): Promise<AuthResponse> {
    try {
      console.log('📤 Register API Request:', data);
      const response = await apiClient.post<AuthResponse>('/auth/register', data);
      console.log('📥 Register API Response:', response.data);
      
      // Store tokens immediately after registration
      this.storeTokens(response.data);
      
      // Store user data immediately
      if (response.data.data?.user) {
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        localStorage.setItem('role', response.data.data.user.role);
        localStorage.setItem('language', response.data.data.user.language);
        console.log('✅ User data stored after registration');
      }
      
      return response.data;
    } catch (error: unknown) {
      console.error('❌ Register API Error:', error);
      return this.handleError(error, 'Registration failed');
    }
  }

  // Verify OTP after registration - Updates verification status
  async verifyOTP(data: VerifyOTPRequest): Promise<AuthResponse> {
    try {
      console.log('📤 Verify OTP API Request:', data);
      const response = await apiClient.post<AuthResponse>('/auth/verify-otp', data);
      console.log('📥 Verify OTP API Response:', response.data);
      
      // Store/update tokens if provided
      this.storeTokens(response.data);
      
      // Update user data if provided
      if (response.data.data?.user) {
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        console.log('✅ User data updated after OTP verification');
      }
      
      return response.data;
    } catch (error: unknown) {
      console.error('❌ Verify OTP API Error:', error);
      return this.handleError(error, 'OTP verification failed');
    }
  }

  // Login - Send OTP
  async login(data: LoginRequest): Promise<AuthResponse> {
    try {
      console.log('📤 Login API Request:', data);
      const response = await apiClient.post<AuthResponse>('/auth/login', data);
      console.log('📥 Login API Response:', response.data);
      return response.data;
    } catch (error: unknown) {
      console.error('❌ Login API Error:', error);
      return this.handleError(error, 'Login failed');
    }
  }

  // Verify Login OTP - STORES TOKENS
  async verifyLoginOTP(data: VerifyLoginOTPRequest): Promise<AuthResponse> {
    try {
      console.log('📤 Verify Login OTP API Request:', data);
      const response = await apiClient.post<AuthResponse>('/auth/verify-login-otp', data);
      console.log('📥 Verify Login OTP API Response:', response.data);
      
      // Store tokens
      this.storeTokens(response.data);
      
      // Store user data
      if (response.data.data?.user) {
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        localStorage.setItem('role', response.data.data.user.role);
        localStorage.setItem('language', response.data.data.user.language);
        console.log('✅ User data stored after login OTP verification');
      }
      
      return response.data;
    } catch (error: unknown) {
      console.error('❌ Verify Login OTP API Error:', error);
      return this.handleError(error, 'Login verification failed');
    }
  }

  // Resend Login OTP
  async resendLoginOTP(data: ResendLoginOTPRequest): Promise<AuthResponse> {
    try {
      console.log('📤 Resend Login OTP API Request:', data);
      const response = await apiClient.post<AuthResponse>('/auth/resend-login-otp', data);
      console.log('📥 Resend Login OTP API Response:', response.data);
      return response.data;
    } catch (error: unknown) {
      console.error('❌ Resend Login OTP API Error:', error);
      return this.handleError(error, 'Resend login OTP failed');
    }
  }

  // Resend Registration OTP
  async resendRegistrationOTP(data: ResendRegistrationOTPRequest): Promise<AuthResponse> {
    try {
      console.log('📤 Resend Registration OTP API Request:', data);
      const response = await apiClient.post<AuthResponse>('/auth/resend-registration-otp', data);
      console.log('📥 Resend Registration OTP API Response:', response.data);
      return response.data;
    } catch (error: unknown) {
      console.error('❌ Resend Registration OTP API Error:', error);
      return this.handleError(error, 'Resend registration OTP failed');
    }
  }

  // Generic resend OTP (for backward compatibility)
  async resendOTP(identifier: string): Promise<AuthResponse> {
    try {
      console.log('📤 Resend OTP API Request:', { identifier });
      const response = await apiClient.post<AuthResponse>('/auth/resend-otp', {
        identifier,
      });
      console.log('📥 Resend OTP API Response:', response.data);
      return response.data;
    } catch (error: unknown) {
      console.error('❌ Resend OTP API Error:', error);
      return this.handleError(error, 'Resend OTP failed');
    }
  }

  // Logout
  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    localStorage.removeItem('emailOrMobile');
    localStorage.removeItem('language');
    localStorage.removeItem('identifier');
    console.log('✅ Logout complete - all data cleared');
  }
}

export default new AuthService();