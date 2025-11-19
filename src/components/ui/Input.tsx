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

// ---------------------- Input.tsx -------------------------
import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  basicDetails?: boolean; // <---- optional style modifier
  required?: boolean;
  crop?: boolean;
  type?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      fullWidth = true,
      basicDetails = false,
      crop = false,
      className = "",
      required = false,
      type,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200";

    const errorStyles = error ? "border-red-500 focus:ring-red-500" : "";
    const widthStyle = fullWidth ? "w-full" : "";

    // Extra styling only for Basic Details section (if needed)
    const basicDetailsStyles = basicDetails
      ? "bg-white shadow-sm  text-sm"
      : "";
    const cropStyle = crop
      ? "bg-white w-[300px] h-[40px] rounded-[8px] border-[1px] text-[14px] shadow-sm "
      : "";

    // Specific styling for date inputs
    const dateStyles = type === "date" ? "py-[10px] text-sm" : "";

    return (
      <div className={fullWidth ? "w-full" : ""}>
        {label && (
          <label className="block text-sm font-medium text-[#9DA2AB] mb-2">
            {label}
            {required && <span className="text-red-500"> *</span>}
          </label>
        )}

        <input
          type={type}
          ref={ref}
          className={`${baseStyles}  ${errorStyles} ${widthStyle} ${basicDetailsStyles} ${cropStyle} ${className} ${dateStyles}`}
          {...props}
        />

        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
