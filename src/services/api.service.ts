// // src/services/api.service.ts
// import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';

// // Create axios instance
// const apiClient: AxiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/v1',
//   timeout: 30000,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Request interceptor - Add JWT token to requests
// apiClient.interceptors.request.use(
//   (config: InternalAxiosRequestConfig) => {
//     const token = localStorage.getItem('accessToken');
    
//     if (token && config.headers) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
    
//     return config;
//   },
//   (error: AxiosError) => {
//     return Promise.reject(error);
//   }
// );

// // Response interceptor - Handle token refresh and errors
// apiClient.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error: AxiosError) => {
//     const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

//     // Handle 401 Unauthorized - Token expired
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const refreshToken = localStorage.getItem('refreshToken');
        
//         if (refreshToken) {
//           // Call refresh token endpoint
//           const response = await axios.post(
//             `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/v1'}/auth/refresh-token`,
//             { refreshToken }
//           );

//           const { accessToken } = response.data;
//           localStorage.setItem('accessToken', accessToken);

//           // Retry original request with new token
//           if (originalRequest.headers) {
//             originalRequest.headers.Authorization = `Bearer ${accessToken}`;
//           }
//           return apiClient(originalRequest);
//         }
//       } catch (refreshError) {
//         // Refresh token failed - logout user
//         localStorage.removeItem('accessToken');
//         localStorage.removeItem('refreshToken');
//         localStorage.removeItem('user');
//         localStorage.removeItem('role');
//         window.location.href = '/login';
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default apiClient;




// src/services/api.service.ts
import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/v1',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Flag to prevent multiple refresh token calls
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: AxiosError | null, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Request interceptor - Add JWT token to requests
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('accessToken');
    
    console.log('🚀 API Request:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      hasToken: !!token
    });
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error: AxiosError) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor - Handle token refresh and errors
apiClient.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', {
      status: response.status,
      url: response.config.url
    });
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    
    console.error('❌ API Error:', {
      status: error.response?.status,
      url: error.config?.url,
      message: error.message
    });

    // Handle 401 Unauthorized - Token expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Skip token refresh for auth endpoints
      const authEndpoints = ['/auth/login', '/auth/register', '/auth/verify-otp', '/auth/verify-login-otp'];
      const isAuthEndpoint = authEndpoints.some(endpoint => originalRequest.url?.includes(endpoint));
      
      if (isAuthEndpoint) {
        return Promise.reject(error);
      }

      // If already refreshing, queue this request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return apiClient(originalRequest);
          })
          .catch(err => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = localStorage.getItem('refreshToken');

      if (!refreshToken) {
        console.error('❌ No refresh token found - redirecting to login');
        isRefreshing = false;
        handleLogout();
        return Promise.reject(error);
      }

      try {
        console.log('🔄 Attempting to refresh token...');
        
        // Call refresh token endpoint
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/v1'}/auth/refresh-token`,
          { refreshToken }
        );

        const { accessToken, refreshToken: newRefreshToken } = response.data.data?.tokens || response.data;
        
        if (!accessToken) {
          throw new Error('No access token in refresh response');
        }

        console.log('✅ Token refreshed successfully');
        
        // Store new tokens
        localStorage.setItem('accessToken', accessToken);
        if (newRefreshToken) {
          localStorage.setItem('refreshToken', newRefreshToken);
        }

        // Update the failed request with new token
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        }

        // Process queued requests
        processQueue(null, accessToken);
        isRefreshing = false;

        // Retry original request
        return apiClient(originalRequest);
      } catch (refreshError) {
        console.error('❌ Token refresh failed:', refreshError);
        
        // Process queued requests with error
        processQueue(refreshError as AxiosError, null);
        isRefreshing = false;
        
        // Clear tokens and redirect to login
        handleLogout();
        
        return Promise.reject(refreshError);
      }
    }

    // Handle other errors
    if (error.response?.status === 403) {
      console.error('❌ Forbidden - insufficient permissions');
    }

    return Promise.reject(error);
  }
);

// Helper function to handle logout and redirect
function handleLogout() {
  console.log('🚪 Logging out due to token expiry...');
  
  // Clear all auth data
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
  localStorage.removeItem('role');
  localStorage.removeItem('language');
  localStorage.removeItem('identifier');
  localStorage.removeItem('isLoginFlow');
  
  // Redirect to login page
  window.location.href = '/login';
}

export default apiClient;