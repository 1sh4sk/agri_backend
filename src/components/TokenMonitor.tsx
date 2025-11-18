// src/components/TokenMonitor.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

/**
 * TokenMonitor - Monitors token expiry and handles logout
 * This component should be placed at the root level of your app
 */
export const TokenMonitor = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const checkTokenExpiry = () => {
      const accessToken = localStorage.getItem('accessToken');
      
      if (!accessToken) {
        return;
      }

      try {
        // Decode JWT token to check expiry
        const tokenPayload = JSON.parse(atob(accessToken.split('.')[1]));
        const expiryTime = tokenPayload.exp * 1000; // Convert to milliseconds
        const currentTime = Date.now();
        const timeUntilExpiry = expiryTime - currentTime;

        console.log('⏰ Token check:', {
          expiresAt: new Date(expiryTime).toLocaleString(),
          timeUntilExpiry: `${Math.floor(timeUntilExpiry / 1000 / 60)} minutes`,
          isExpired: timeUntilExpiry <= 0
        });

        // If token is expired or will expire in less than 1 minute
        if (timeUntilExpiry <= 60000) {
          console.log('⚠️ Token expired or expiring soon - logging out');
          handleTokenExpiry();
        }
      } catch (error) {
        console.error('❌ Error parsing token:', error);
      }
    };

    const handleTokenExpiry = () => {
      logout();
      navigate('/login', { 
        replace: true,
        state: { message: 'Your session has expired. Please login again.' }
      });
    };

    // Check token expiry every minute
    const interval = setInterval(checkTokenExpiry, 60000);

    // Check immediately on mount
    checkTokenExpiry();

    return () => {
      clearInterval(interval);
    };
  }, [logout, navigate]);

  return null; // This component doesn't render anything
};

export default TokenMonitor;