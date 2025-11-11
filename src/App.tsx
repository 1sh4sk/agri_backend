// import { useState, useEffect } from 'react';
// import { LanguageSelection } from './pages/LanguageSelection';
// import { RoleSelection } from './pages/RoleSelection';
// import { Login } from './pages/Login';
// import { Signup } from './pages/Signup';
// import { useAuth } from './contexts/AuthContext';
// import './i18n'; // Import i18n configuration

// type AppStep = 'language' | 'role' | 'login' | 'signup' | 'dashboard';

// function App() {
//   const { isAuthenticated, role } = useAuth();
//   const [currentStep, setCurrentStep] = useState<AppStep>('language');

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

//   const renderStep = () => {
//     switch (currentStep) {
//       case 'language':
//         return <LanguageSelection onComplete={() => setCurrentStep('role')} />;
//       case 'role':
//         return <RoleSelection onComplete={() => setCurrentStep('login')} />;
//       case 'login':
//         return (
//           <Login
//             onSignup={() => setCurrentStep('signup')}
//             onSuccess={() => setCurrentStep('dashboard')}
//           />
//         );
//       case 'signup':
//         return (
//           <Signup
//             onLogin={() => setCurrentStep('login')}
//             onSuccess={() => setCurrentStep('dashboard')}
//           />
//         );
//       case 'dashboard':
//         return (
//           <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
//             <div className="text-center">
//               <h1 className="text-4xl font-bold text-gray-900 mb-4">
//                 Welcome to Agri-Thread!
//               </h1>
//               <p className="text-gray-600 mb-4">
//                 You are logged in as: <span className="font-semibold">{role}</span>
//               </p>
//               <p className="text-gray-500">
//                 Your dashboard will be implemented here.
//               </p>
//             </div>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return renderStep();
// }

// export default App;



// // import { useState, useEffect } from 'react';
// // import { LanguageSelection } from './pages/LanguageSelection';
// // import { RoleSelection } from './pages/RoleSelection';
// // import { Login } from './pages/Login';
// // import { Signup } from './pages/Signup';
// // import { OTPVerification } from './pages/Otp';
// // import { useAuth } from './contexts/AuthContext';
// // import './i18n'; // Import i18n configuration

// // type AppStep = 'language' | 'role' | 'login' | 'signup' | 'otp-verification' | 'dashboard';

// // function App() {
// //   const { isAuthenticated, role } = useAuth();
// //   const [currentStep, setCurrentStep] = useState<AppStep>('language');
// //   const [previousStep, setPreviousStep] = useState<AppStep>('login');

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

// //   const handleLogin = () => {
// //     setPreviousStep('login');
// //     setCurrentStep('otp-verification');
// //   };

// //   const handleSignup = () => {
// //     setPreviousStep('signup');
// //     setCurrentStep('otp-verification');
// //   };

// //   const handleBackFromOTP = () => {
// //     setCurrentStep(previousStep);
// //   };

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
// //             onSuccess={handleLogin}
// //           />
// //         );
// //       case 'signup':
// //         return (
// //           <Signup
// //             onLogin={() => setCurrentStep('login')}
// //             onSuccess={handleSignup}
// //           />
// //         );
// //       case 'otp-verification':
// //         return (
// //           <OTPVerification
// //             onSignup={() => setCurrentStep('signup')}
// //             onSuccess={() => setCurrentStep('dashboard')}
// //             onBack={handleBackFromOTP}
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


import { useState, useEffect } from 'react';
import { LanguageSelection } from './pages/LanguageSelection';
// import { RoleSelection } from './pages/RoleSelection';
// import { Login } from './pages/Login';
// import { Signup } from './pages/Signup';
// import { OTPVerification } from './pages/Otp';
import { useAuth } from './contexts/AuthContext';
import './i18n';
import { RoleBasedDashboard } from './pages/RoleBasedDashboard';
import { RoleSelectionScreen } from './components/screens/RoleSelectionScreen';
import { LoginScreen } from './components/screens/LoginScreen';
import { SignUpScreen } from './components/screens/SignUpScreen';
import { OTPVerificationScreen } from './components/screens/OTPVerificationScreen';
// import {FarmerProfileCreation} from './components/form/BsicDetails';

type AppStep = 'language' | 'role' | 'login' | 'signup' | 'otp-verification' | 'dashboard';

function App() {
  const { isAuthenticated,  } = useAuth();
  const [currentStep, setCurrentStep] = useState<AppStep>('language');
  const [previousStep, setPreviousStep] = useState<AppStep>('login');

  useEffect(() => {
    const hasSelectedLanguage = localStorage.getItem('language');
    const hasSelectedRole = localStorage.getItem('role');

    if (isAuthenticated) {
      setCurrentStep('dashboard');
    } else if (!hasSelectedLanguage) {
      setCurrentStep('language');
    } else if (!hasSelectedRole) {
      setCurrentStep('role');
    } else {
      setCurrentStep('login');
    }
  }, [isAuthenticated]);

  const handleLogin = () => {
    setPreviousStep('login');
    setCurrentStep('otp-verification');
  };

  const handleSignup = () => {
    setPreviousStep('signup');
    setCurrentStep('otp-verification');
  };

  const handleBackFromOTP = () => {
    setCurrentStep(previousStep);
  };

  // const renderStep = () => {
  //   switch (currentStep) {
  //     case 'language':
  //       return <LanguageSelection onComplete={() => setCurrentStep('role')} />;
  //     case 'role':
  //       return <RoleSelection onComplete={() => setCurrentStep('login')} />;
  //     case 'login':
  //       return (
  //         <Login
  //           onSignup={() => setCurrentStep('signup')}
  //           onSuccess={handleLogin} // This now goes to OTP
  //         />
  //       );
  //     case 'signup':
  //       return (
  //         <Signup
  //           onLogin={() => setCurrentStep('login')}
  //           onSuccess={handleSignup} // This now goes to OTP
  //         />
  //       );
  //     case 'otp-verification':
  //       return (
  //         <OTPVerification
  //           onSignup={() => setCurrentStep('signup')}
  //           onSuccess={() => setCurrentStep('dashboard')}
  //           onBack={handleBackFromOTP}
  //         />
  //       );
  //     case 'dashboard':
  //       return (
  //         // <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
  //         //   <div className="text-center">
  //         //     <h1 className="text-4xl font-bold text-gray-900 mb-4">
  //         //       Welcome to Agri-Thread!
  //         //     </h1>
  //         //     <p className="text-gray-600 mb-4">
  //         //       You are logged in as: <span className="font-semibold">{role}</span>
  //         //     </p>
  //         //     <p className="text-gray-500">
  //         //       Your dashboard will be implemented here.
  //         //     </p>
  //         //   </div>
  //         // </div>m,
  //         <RoleBasedDashboard />
  //         // <FarmerProfileCreation />
  //       );
  //     default:
  //       return null;
  //   }
  // };


  
  const renderStep = () => {
    switch (currentStep) {
      case 'language':
        return <LanguageSelection onComplete={() => setCurrentStep('role')} />;
      case 'role':
        return <RoleSelectionScreen onNext={() => setCurrentStep('login')} />;
      case 'login':
        return (
          <LoginScreen
            onSignup={() => setCurrentStep('signup')}
            onSuccess={handleLogin} // This now goes to OTP
          />
        );
      case 'signup':
        return (
          <SignUpScreen
            onLogin={() => setCurrentStep('login')}
            onSuccess={handleSignup} // This now goes to OTP
          />
        );
      case 'otp-verification':
        return (
          <OTPVerificationScreen
            onSignup={() => setCurrentStep('signup')}
            onSuccess={() => setCurrentStep('dashboard')}
            onBack={handleBackFromOTP}
          />
        );
      case 'dashboard':
        return (
          // <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
          //   <div className="text-center">
          //     <h1 className="text-4xl font-bold text-gray-900 mb-4">
          //       Welcome to Agri-Thread!
          //     </h1>
          //     <p className="text-gray-600 mb-4">
          //       You are logged in as: <span className="font-semibold">{role}</span>
          //     </p>
          //     <p className="text-gray-500">
          //       Your dashboard will be implemented here.
          //     </p>
          //   </div>
          // </div>m,
          <RoleBasedDashboard />
          // <FarmerProfileCreation />
        );
      default:
        return null;
    }
  };
  return renderStep();
}

export default App;
