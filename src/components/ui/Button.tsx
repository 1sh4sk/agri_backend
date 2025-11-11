// import { ButtonHTMLAttributes, ReactNode } from 'react';

// interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
//   children: ReactNode;
//   variant?: 'primary' | 'secondary' | 'outline' | 'primaryNew';
//   size?: 'sm' | 'md' | 'lg';
//   fullWidth?: boolean;
//   withArrow?: boolean; // New prop to control arrow visibility
// }

// export const Button = ({
//   children,
//   variant = 'primaryNew',
//   size = 'md',
//   fullWidth = false,
//   withArrow = false, // Default to false
//   className = '',
//   disabled,
//   ...props
// }: ButtonProps) => {
//   const baseStyles = 'font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center gap-2';

//   const variantStyles = {
//     primary: 'bg-primary text-white hover:bg-primary-800 focus:ring-primary-500 disabled:bg-gray-400',
//     primaryNew: 'bg-primary text-white border-2 border-gray-600 hover:bg-primary-800 focus:ring-primary-500 disabled:bg-gray-400',
//     secondary: 'bg-secondary text-white hover:bg-secondary-600 focus:ring-secondary-500 disabled:bg-gray-400',
//     outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary-500 disabled:border-gray-400 disabled:text-gray-400',
//   };

//   const sizeStyles = {
//     sm: 'px-4 py-2 text-sm',
//     md: 'px-6 py-3 text-base',
//     lg: 'px-8 py-4 text-lg',
//   };

//   const widthStyle = fullWidth ? 'w-full' : '';

//   return (
//     <button
//       className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className} ${
//         disabled ? 'cursor-not-allowed opacity-60' : ''
//       }`}
//       disabled={disabled}
//       {...props}
//     >
//       {children}
//       {withArrow && (
//         <svg 
//           className="w-4 h-4" 
//           fill="none" 
//           stroke="currentColor" 
//           viewBox="0 0 24 24"
//         >
//           <path 
//             strokeLinecap="round" 
//             strokeLinejoin="round" 
//             strokeWidth={2} 
//             d="M14 5l7 7m0 0l-7 7m7-7H3" 
//           />
//         </svg>
//       )}
//     </button>
//   );
// };


import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'primaryNew';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  withArrow?: boolean;
}

export const Button = ({
  children,
  variant = 'primaryNew',
  size = 'md',
  fullWidth = false,
  withArrow = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) => {
  const baseStyles = 'font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center gap-2';

  const variantStyles = {
    primary: 'bg-primary text-white hover:bg-primary-600 focus:ring-primary/50 disabled:bg-gray-400 disabled:cursor-not-allowed',
    primaryNew: 'bg-white text-primary border-[1.2px] border-primary hover:bg-primary hover:text-white focus:ring-primary/50 disabled:bg-gray-300 disabled:border-gray-300 disabled:cursor-not-allowed disabled:opacity-60',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500 disabled:bg-gray-400 disabled:cursor-not-allowed',
    outline: 'border-[1.2px] border-primary text-primary bg-white hover:bg-primary hover:text-white focus:ring-primary/50 disabled:border-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed',
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'w-36 h-14 rounded-xl px-4 py-4 text-base', // Exact dimensions from specs
    lg: 'px-10 py-4 text-lg rounded-lg',
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
      {withArrow && (
        <svg 
          className="w-5 h-5" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M14 5l7 7m0 0l-7 7m7-7H3" 
          />
        </svg>
      )}
    </button>
  );
};