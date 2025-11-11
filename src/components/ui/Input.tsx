// import { InputHTMLAttributes, forwardRef } from 'react';

// interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
//   label?: string;
//   error?: string;
//   fullWidth?: boolean;
// }

// export const Input = forwardRef<HTMLInputElement, InputProps>(
//   ({ label, error, fullWidth = true, className = '', ...props }, ref) => {
//     const baseStyles = 'px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200';
//     const errorStyles = error ? 'border-red-500 focus:ring-red-500' : '';
//     const widthStyle = fullWidth ? 'w-full' : '';

//     return (
//       <div className={fullWidth ? 'w-full' : ''}>
//         {label && (
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             {label}
//           </label>
//         )}
//         <input
//           ref={ref}
//           className={`${baseStyles} ${errorStyles} ${widthStyle} ${className}`}
//           {...props}
//         />
//         {error && (
//           <p className="mt-1 text-sm text-red-500">{error}</p>
//         )}
//       </div>
//     );
//   }
// );

// Input.displayName = 'Input';


import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, fullWidth = true, className = '', ...props }, ref) => {
    const baseStyles = 'px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200';
    const errorStyles = error ? 'border-red-500 focus:ring-red-500' : '';
    const widthStyle = fullWidth ? 'w-full' : '';

    return (
      <div className={fullWidth ? 'w-full' : ''}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`${baseStyles} ${errorStyles} ${widthStyle} ${className}`}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
