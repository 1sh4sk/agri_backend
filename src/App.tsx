// // import { useState, useEffect } from 'react';
// // import { LanguageSelection } from './pages/LanguageSelection';
// // import { RoleSelection } from './pages/RoleSelection';
// // import { Login } from './pages/Login';
// // import { Signup } from './pages/Signup';
// // import { useAuth } from './contexts/AuthContext';
// // import './i18n'; // Import i18n configuration

// // type AppStep = 'language' | 'role' | 'login' | 'signup' | 'dashboard';

// // function App() {
// //   const { isAuthenticated, role } = useAuth();
// //   const [currentStep, setCurrentStep] = useState<AppStep>('language');

// //   useEffect(() => {
// //     const hasSelectedLanguage = localStorage.getItem('language');
// //     const hasSelectedRole = localStorage.getItem('role');

// //     if (isAuthenticated) {
// //       setCurrentStep('dashboard');
// //     } else if (!hasSelectedLanguage) {
// //       setCurrentStep('language');
// //     } else if (!hasSelectedRole) {
// //       setCurrentStep('role');
// //     } else {
// //       setCurrentStep('login');
// //     }
// //   }, [isAuthenticated]);

// //   const renderStep = () => {
// //     switch (currentStep) {
// //       case 'language':
// //         return <LanguageSelection onComplete={() => setCurrentStep('role')} />;
// //       case 'role':
// //         return <RoleSelection onComplete={() => setCurrentStep('login')} />;
// //       case 'login':
// //         return (
// //           <Login
// //             onSignup={() => setCurrentStep('signup')}
// //             onSuccess={() => setCurrentStep('dashboard')}
// //           />
// //         );
// //       case 'signup':
// //         return (
// //           <Signup
// //             onLogin={() => setCurrentStep('login')}
// //             onSuccess={() => setCurrentStep('dashboard')}
// //           />
// //         );
// //       case 'dashboard':
// //         return (
// //           <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
// //             <div className="text-center">
// //               <h1 className="text-4xl font-bold text-gray-900 mb-4">
// //                 Welcome to Agri-Thread!
// //               </h1>
// //               <p className="text-gray-600 mb-4">
// //                 You are logged in as: <span className="font-semibold">{role}</span>
// //               </p>
// //               <p className="text-gray-500">
// //                 Your dashboard will be implemented here.
// //               </p>
// //             </div>
// //           </div>
// //         );
// //       default:
// //         return null;
// //     }
// //   };

// //   return renderStep();
// // }

// // export default App;



// // // import { useState, useEffect } from 'react';
// // // import { LanguageSelection } from './pages/LanguageSelection';
// // // import { RoleSelection } from './pages/RoleSelection';
// // // import { Login } from './pages/Login';
// // // import { Signup } from './pages/Signup';
// // // import { OTPVerification } from './pages/Otp';
// // // import { useAuth } from './contexts/AuthContext';
// // // import './i18n'; // Import i18n configuration

// // // type AppStep = 'language' | 'role' | 'login' | 'signup' | 'otp-verification' | 'dashboard';

// // // function App() {
// // //   const { isAuthenticated, role } = useAuth();
// // //   const [currentStep, setCurrentStep] = useState<AppStep>('language');
// // //   const [previousStep, setPreviousStep] = useState<AppStep>('login');

// // //   useEffect(() => {
// // //     const hasSelectedLanguage = localStorage.getItem('language');
// // //     const hasSelectedRole = localStorage.getItem('role');

// // //     if (isAuthenticated) {
// // //       setCurrentStep('dashboard');
// // //     } else if (!hasSelectedLanguage) {
// // //       setCurrentStep('language');
// // //     } else if (!hasSelectedRole) {
// // //       setCurrentStep('role');
// // //     } else {
// // //       setCurrentStep('login');
// // //     }
// // //   }, [isAuthenticated]);

// // //   const handleLogin = () => {
// // //     setPreviousStep('login');
// // //     setCurrentStep('otp-verification');
// // //   };

// // //   const handleSignup = () => {
// // //     setPreviousStep('signup');
// // //     setCurrentStep('otp-verification');
// // //   };

// // //   const handleBackFromOTP = () => {
// // //     setCurrentStep(previousStep);
// // //   };

// // //   const renderStep = () => {
// // //     switch (currentStep) {
// // //       case 'language':
// // //         return <LanguageSelection onComplete={() => setCurrentStep('role')} />;
// // //       case 'role':
// // //         return <RoleSelection onComplete={() => setCurrentStep('login')} />;
// // //       case 'login':
// // //         return (
// // //           <Login
// // //             onSignup={() => setCurrentStep('signup')}
// // //             onSuccess={handleLogin}
// // //           />
// // //         );
// // //       case 'signup':
// // //         return (
// // //           <Signup
// // //             onLogin={() => setCurrentStep('login')}
// // //             onSuccess={handleSignup}
// // //           />
// // //         );
// // //       case 'otp-verification':
// // //         return (
// // //           <OTPVerification
// // //             onSignup={() => setCurrentStep('signup')}
// // //             onSuccess={() => setCurrentStep('dashboard')}
// // //             onBack={handleBackFromOTP}
// // //           />
// // //         );
// // //       case 'dashboard':
// // //         return (
// // //           <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
// // //             <div className="text-center">
// // //               <h1 className="text-4xl font-bold text-gray-900 mb-4">
// // //                 Welcome to Agri-Thread!
// // //               </h1>
// // //               <p className="text-gray-600 mb-4">
// // //                 You are logged in as: <span className="font-semibold">{role}</span>
// // //               </p>
// // //               <p className="text-gray-500">
// // //                 Your dashboard will be implemented here.
// // //               </p>
// // //             </div>
// // //           </div>
// // //         );
// // //       default:
// // //         return null;
// // //     }
// // //   };

// // //   return renderStep();
// // // }

// // // export default App;


// import { useState, useEffect } from 'react';
// import { LanguageSelection } from './components/screens/LanguageSelection';
// // import { RoleSelection } from './pages/RoleSelection';
// // import { Login } from './pages/Login';
// // import { Signup } from './pages/Signup';
// // import { OTPVerification } from './pages/Otp';
// import { useAuth } from './contexts/AuthContext';
// import './i18n';
// import { RoleBasedDashboard } from './pages/RoleBasedDashboard';
// import { RoleSelectionScreen } from './components/screens/RoleSelectionScreen';
// import { LoginScreen } from './components/screens/LoginScreen';
// import { SignUpScreen } from './components/screens/SignUpScreen';
// import { OTPVerificationScreen } from './components/screens/OTPVerificationScreen';
// // import {FarmerProfileCreation} from './components/form/BsicDetails';

// type AppStep = 'language' | 'role' | 'login' | 'signup' | 'otp-verification' | 'dashboard';

// function App() {
//   const { isAuthenticated,  } = useAuth();
//   const [currentStep, setCurrentStep] = useState<AppStep>('language');
//   const [previousStep, setPreviousStep] = useState<AppStep>('login');

//   useEffect(() => {
//     const hasSelectedLanguage = localStorage.getItem('language');
//     const hasSelectedRole = localStorage.getItem('role');

//     if (isAuthenticated) {
//       setCurrentStep('dashboard');
//     } else if (!hasSelectedLanguage) {
//       setCurrentStep('language');
//     } else if (!hasSelectedRole) {
//       setCurrentStep('role');
//     } else {
//       setCurrentStep('login');
//     }
//   }, [isAuthenticated]);

//   const handleLogin = () => {
//     setPreviousStep('login');
//     setCurrentStep('otp-verification');
//   };

//   const handleSignup = () => {
//     setPreviousStep('signup');
//     setCurrentStep('otp-verification');
//   };

//   const handleBackFromOTP = () => {
//     setCurrentStep(previousStep);
//   };

//   // const renderStep = () => {
//   //   switch (currentStep) {
//   //     case 'language':
//   //       return <LanguageSelection onComplete={() => setCurrentStep('role')} />;
//   //     case 'role':
//   //       return <RoleSelection onComplete={() => setCurrentStep('login')} />;
//   //     case 'login':
//   //       return (
//   //         <Login
//   //           onSignup={() => setCurrentStep('signup')}
//   //           onSuccess={handleLogin} // This now goes to OTP
//   //         />
//   //       );
//   //     case 'signup':
//   //       return (
//   //         <Signup
//   //           onLogin={() => setCurrentStep('login')}
//   //           onSuccess={handleSignup} // This now goes to OTP
//   //         />
//   //       );
//   //     case 'otp-verification':
//   //       return (
//   //         <OTPVerification
//   //           onSignup={() => setCurrentStep('signup')}
//   //           onSuccess={() => setCurrentStep('dashboard')}
//   //           onBack={handleBackFromOTP}
//   //         />
//   //       );
//   //     case 'dashboard':
//   //       return (
//   //         // <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
//   //         //   <div className="text-center">
//   //         //     <h1 className="text-4xl font-bold text-gray-900 mb-4">
//   //         //       Welcome to Agri-Thread!
//   //         //     </h1>
//   //         //     <p className="text-gray-600 mb-4">
//   //         //       You are logged in as: <span className="font-semibold">{role}</span>
//   //         //     </p>
//   //         //     <p className="text-gray-500">
//   //         //       Your dashboard will be implemented here.
//   //         //     </p>
//   //         //   </div>
//   //         // </div>m,
//   //         <RoleBasedDashboard />
//   //         // <FarmerProfileCreation />
//   //       );
//   //     default:
//   //       return null;
//   //   }
//   // };


  
//   const renderStep = () => {
//     switch (currentStep) {
//       case 'language':
//         return <LanguageSelection onComplete={() => setCurrentStep('role')} />;
//       case 'role':
//         return <RoleSelectionScreen onNext={() => setCurrentStep('login')} />;
//       case 'login':
//         return (
//           <LoginScreen
//             onSignup={() => setCurrentStep('signup')}
//             onSuccess={handleLogin} // This now goes to OTP
//           />
//         );
//       case 'signup':
//         return (
//           <SignUpScreen
//             onLogin={() => setCurrentStep('login')}
//             onSuccess={handleSignup} // This now goes to OTP
//           />
//         );
//       case 'otp-verification':
//         return (
//           <OTPVerificationScreen
//             onSignup={() => setCurrentStep('signup')}
//             onSuccess={() => setCurrentStep('dashboard')}
//             onBack={handleBackFromOTP}
//           />
//         );
//       case 'dashboard':
//         return (
//           // <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
//           //   <div className="text-center">
//           //     <h1 className="text-4xl font-bold text-gray-900 mb-4">
//           //       Welcome to Agri-Thread!
//           //     </h1>
//           //     <p className="text-gray-600 mb-4">
//           //       You are logged in as: <span className="font-semibold">{role}</span>
//           //     </p>
//           //     <p className="text-gray-500">
//           //       Your dashboard will be implemented here.
//           //     </p>
//           //   </div>
//           // </div>m,
//           <RoleBasedDashboard />
//           // <FarmerProfileCreation />
//         );
//       default:
//         return null;
//     }
//   };
//   return renderStep();
// }

// export default App;

// src/App.tsx
import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingFallback from './components/LoadingFallBack';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from '../src/routes/PublicRoute';
import FormerDashboard from './components/screens/dashboard/farmer_dashboard/FormerDashboard';

// Lazy load screens with proper default exports
const LoginScreen = lazy(() => import('./components/screens/auth_screens/LoginScreen').then(module => ({ default: module.LoginScreen })));
const LanguageSelection = lazy(() => import('./components/screens/auth_screens/LanguageSelection').then(module => ({ default: module.LanguageSelection })));
const RoleSelectionScreen = lazy(() => import('./components/screens/auth_screens/RoleSelectionScreen').then(module => ({ default: module.RoleSelectionScreen })));
const SignUpScreen = lazy(() => import('./components/screens/auth_screens/SignUpScreen').then(module => ({ default: module.SignUpScreen })));
const OTPVerificationScreen = lazy(() => import('./components/screens/auth_screens/OTPVerificationScreen').then(module => ({ default: module.OTPVerificationScreen })));

// Lazy load pages - using simple imports assuming they have default exports
const BasicDetails = lazy(() => import('./pages/basic-details/BasicDetails'));
// const RoleBasedDashboard = lazy(() => import('./pages/RoleBasedDashboard').then(module => ({ default: module.RoleBasedDashboard })));

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              {/* Default redirect */}
              <Route path="/" element={<Navigate to="/login" replace />} />

              {/* Public routes - redirect to dashboard if authenticated */}
              <Route
                path="/login"
                element={
                  <PublicRoute>
                      <BasicDetails />
                      <FormerDashboard /> 
                    <LoginScreen 
                      // onSignup={() => window.location.href = '/'}
                      onSuccess={() => window.location.href = '/otp-verification'}
                    />
                  </PublicRoute>
                }
              />
              <Route
                path="/language-selection"
                element={
                  <PublicRoute>
                    <LanguageSelection onComplete={() => window.location.href = '/role-selection'} />
                  </PublicRoute>
                }
              />
              <Route
                path="/role-selection"
                element={
                  <PublicRoute>
                    <RoleSelectionScreen
                    //  onNext={() => window.location.href = '/signup'}
                      />
                  </PublicRoute>
                }
              />
              <Route
                path="/signup"
                element={
                  <PublicRoute>
                    <SignUpScreen 
                      onLogin={() => window.location.href = '/login'}
                      onSuccess={() => window.location.href = '/otp-verification'}
                    />
                  </PublicRoute>
                }
              />
              // In your App.tsx, update the OTP verification routes:

// For registration flow (from signup)
<Route
  path="/otp-verification"
  element={
    <PublicRoute>
      <OTPVerificationScreen 
        onSuccess={() => console.log('Registration OTP verified')}
      //  onBack={() => window.history.back()}
        // isLoginFlow={false} // Registration flow
      />
    </PublicRoute>
  }
/>

// For login flow (from login)
<Route
  path="/login-otp-verification"
  element={
    <PublicRoute>
      <OTPVerificationScreen 
        onSuccess={() => console.log('Login OTP verified')}
      // onBack={() => window.history.back()}
        // isLoginFlow={true} // Login flow
      />
    </PublicRoute>
  }
/>

              {/* Protected routes - require authentication */}
              <Route
                path="/basic-details"
                element={
                  <ProtectedRoute>
                    <BasicDetails />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    {/* <RoleBasedDashboard /> */}
                    {/* <BasicDetails /> */}
                    <FormerDashboard /> 
                  </ProtectedRoute>
                }
              />

              {/* Catch all - redirect to login */}
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </Suspense>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;