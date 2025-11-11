// // // import { ReactNode } from 'react';

// // // interface RadioCardProps {
// // //   id: string;
// // //   name: string;
// // //   value: string;
// // //   checked: boolean;
// // //   onChange: (value: string) => void;
// // //   title: string;
// // //   description?: string;
// // //   icon?: ReactNode;
// // // }

// // // export const RadioCard = ({
// // //   id,
// // //   name,
// // //   value,
// // //   checked,
// // //   onChange,
// // //   title,
// // //   description,
// // //   icon,
// // // }: RadioCardProps) => {
// // //   return (
// // //     <div
// // //       className={`relative flex items-start p-6 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
// // //         checked
// // //           ? 'border-primary bg-primary-50'
// // //           : 'border-gray-200 hover:border-gray-300 bg-white'
// // //       }`}
// // //       onClick={() => onChange(value)}
// // //     >
// // //       <div className="flex-1">
// // //         {icon && (
// // //           <div className={`mb-3 ${checked ? 'text-primary' : 'text-gray-400'}`}>
// // //             {icon}
// // //           </div>
// // //         )}
// // //         <div className="font-semibold text-gray-900 mb-1">{title}</div>
// // //         {description && (
// // //           <div className="text-sm text-gray-600 leading-relaxed">{description}</div>
// // //         )}
// // //       </div>
// // //       <div className="ml-4 flex items-center">
// // //         <input
// // //           type="radio"
// // //           id={id}
// // //           name={name}
// // //           value={value}
// // //           checked={checked}
// // //           onChange={() => onChange(value)}
// // //           className="h-5 w-5 text-primary border-gray-300 focus:ring-primary-500"
// // //         />
// // //       </div>
// // //     </div>
// // //   );
// // // };
// // import { ReactNode } from 'react';

// // interface RadioCardProps {
// //   id: string;
// //   name: string;
// //   value: string;
// //   checked: boolean;
// //   onChange: (value: string) => void;
// //   title: string;
// //   description?: string;
// //   icon?: ReactNode;
// // }

// // export const RadioCard = ({
// //   id,
// //   name,
// //   value,
// //   checked,
// //   onChange,
// //   title,
// //   description,
// //   icon,
// // }: RadioCardProps) => {
// //   return (
// //     <div
// //       className={`relative flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
// //         checked
// //           ? 'border-primary bg-primary-50'
// //           : 'border-gray-200 hover:border-gray-300 bg-white'
// //       }`}
// //       onClick={() => onChange(value)}
// //     >
// //       <div className="flex-1">
// //         {icon && (
// //           <div className={`mb-2 ${checked ? 'text-primary' : 'text-gray-400'}`}>
// //             {icon}
// //           </div>
// //         )}
// //         <div className="font-semibold text-sm text-gray-900 mb-1">{title}</div>
// //         {description && (
// //           <div className="text-xs text-gray-600 leading-relaxed">{description}</div>
// //         )}
// //       </div>
// //       <div className="ml-3 flex items-center">
// //         <input
// //           type="radio"
// //           id={id}
// //           name={name}
// //           value={value}
// //           checked={checked}
// //           onChange={() => onChange(value)}
// //           className="h-4 w-4 text-primary border-gray-300 focus:ring-primary-500"
// //         />
// //       </div>
// //     </div>
// //   );
// // };

// // import { ReactNode } from 'react';

// // interface RadioCardProps {
// //   id: string;
// //   name: string;
// //   value: string | null; // Allow null values
// //   checked: boolean;
// //   onChange: (value: string | null) => void; // Allow null returns
// //   title: string;
// //   description?: string;
// //   icon?: ReactNode;
// // }

// // export const RadioCard = ({
// //   id,
// //   name,
// //   value,
// //   checked,
// //   onChange,
// //   title,
// //   description,
// //   icon,
// // }: RadioCardProps) => {
// //   return (
// //     <div
// //       className={`relative flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
// //         checked
// //           ? 'border-primary bg-primary-50'
// //           : 'border-gray-200 hover:border-gray-300 bg-white'
// //       }`}
// //       onClick={() => onChange(value)}
// //     >
// //       <div className="flex-1">
// //         {icon && (
// //           <div className={`mb-2 ${checked ? 'text-primary' : 'text-gray-400'}`}>
// //             {icon}
// //           </div>
// //         )}
// //         <div className="font-semibold text-sm text-gray-900 mb-1">{title}</div>
// //         {description && (
// //           <div className="text-xs text-gray-600 leading-relaxed">{description}</div>
// //         )}
// //       </div>
// //       <div className="ml-3 flex items-center">
// //         <input
// //           type="radio"
// //           id={id}
// //           name={name}
// //           value={value || ''} // Handle null value
// //           checked={checked}
// //           onChange={() => onChange(value)}
// //           className="h-4 w-4 text-primary border-gray-300 focus:ring-primary-500"
// //         />
// //       </div>
// //     </div>
// //   );
// // };
// import { ReactNode } from 'react';

// interface RadioCardProps {
//   id: string;
//   name: string;
//   value: string | null;
//   checked: boolean;
//   onChange: (value: string | null) => void;
//   title: string;
//   description?: string;
//   icon?: ReactNode;
// }

// export const RadioCard = ({
//   id,
//   name,
//   value,
//   checked,
//   onChange,
//   title,
//   description,
//   icon,
// }: RadioCardProps) => {
//   return (
//     <div
//       className={`relative flex items-start p-3 drop-shadow-sm border-[1.2px] rounded-lg cursor-pointer transition-all duration-300 ${
//         checked
//           ? 'border-primary bg-background-box shadow-custom'
//           : 'border-gray-200 hover:border-primary/30 bg-background-box'
//       }`}
//       onClick={() => onChange(value)}
//     >
//       <div className="flex-1">
//         {icon && (
//           <div className={`mb-1.5 ${checked ? 'text-primary' : 'text-gray-400'}`}>
//             {icon}
//           </div>
//         )}
//         <div className={`font-semibold text-sm mb-0.5 ${checked ? 'text-primary' : 'text-gray-900'}`}>
//           {title}
//         </div>
//         {description && (
//           <div className={`text-xs leading-relaxed ${checked ? 'text-primary/80' : 'text-gray-600'}`}>
//             {description}
//           </div>
//         )}
//       </div>
//     <div className="ml-3 flex items-center">
//   <div className="relative flex items-center justify-center h-4 w-4">
//     <input
//       type="radio"
//       id={id}
//       name={name}
//       value={value || ''}
//       checked={checked}
//       onChange={() => onChange(value)}
//       className="peer appearance-none h-4 w-4 border-[1.5px] border-gray-300 rounded-full cursor-pointer transition-all duration-200 checked:border-primary checked:border-1 focus:outline-none focus:ring-2 focus:ring-primary/20"
//     />
//     <div 
//       className={`absolute inset-0 m-auto h-2 w-2 rounded-full pointer-events-none transition-all duration-200 ${
//         checked 
//           ? 'bg-primary scale-100'  // Inner primary color
//           : 'bg-gray-300 scale-0'   // Gray color when not checked
//       }`}
//     />
//   </div>
// </div>
//     </div>
//   );
// };


// import { ReactNode } from 'react';

// interface RadioCardProps {
//   id: string;
//   name: string;
//   value: string | null;
//   checked: boolean;
//   onChange: (value: string | null) => void;
//   title: string;
//   description?: string;
//   icon?: ReactNode;
// }

// export const RadioCard = ({
//   id,
//   name,
//   value,
//   checked,
//   onChange,
//   title,
//   description,
//   icon,
// }: RadioCardProps) => {
//   return (
//     <div
//       className={`relative flex items-start p-3 drop-shadow-sm border-[1.2px] rounded-lg cursor-pointer transition-all duration-300 ${
//         checked
//           ? 'border-primary bg-background-box shadow-custom'
//           : 'border-gray-200 hover:border-primary/30 bg-background-box'
//       }`}
//       onClick={() => onChange(value)}
//     >
//       <div className="flex-1">
//         {icon && (
//           <div className={`mb-1.5 ${checked ? 'text-primary' : 'text-gray-400'}`}>
//             {icon}
//           </div>
//         )}
//         <div className={`font-semibold text-sm mb-0.5 ${checked ? 'text-primary' : 'text-gray-900'}`}>
//           {title}
//         </div>
//         {description && (
//           <div className={`text-xs leading-relaxed ${checked ? 'text-primary/80' : 'text-gray-600'}`}>
//             {description}
//           </div>
//         )}
//       </div>
//       <div className="ml-3 flex items-center">
//         <div className="relative flex items-center justify-center h-4 w-4">
//           <input
//             type="radio"
//             id={id}
//             name={name}
//             value={value || ''}
//             checked={checked}
//             onChange={() => onChange(value)}
//             className="peer appearance-none h-4 w-4 border-[1.5px] border-gray-300 rounded-full cursor-pointer transition-all duration-200 checked:border-primary checked:border-1 focus:outline-none focus:ring-2 focus:ring-primary/20"
//           />
//           <div
//             className={`absolute inset-0 m-auto h-2 w-2 rounded-full pointer-events-none transition-all duration-200 ${
//               checked
//                 ? 'bg-primary scale-100'
//                 : 'bg-gray-300 scale-0'
//             }`}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };
// 
import { ReactNode } from 'react';

interface RadioCardProps {
  id: string;
  name: string;
  value: string | null;
  checked: boolean;
  onChange: (value: string | null) => void;
  title: string;
  description?: string;
  icon?: ReactNode;
}

export const RadioCard = ({
  id,
  name,
  value,
  checked,
  onChange,
  title,
  description,
  icon,
}: RadioCardProps) => {
  return (
    <div
      className={`relative flex items-start p-4 drop-shadow-sm border-[1.2px] rounded-lg cursor-pointer transition-all duration-300 ${
        checked
          ? 'border-primary bg-background-box shadow-custom'
          : 'border-gray-200 hover:border-primary/30 bg-background-box'
      }`}
      onClick={() => onChange(value)}
    >
      {/* Icon with border and padding */}
      {icon && (
        <div className={`p-3 border border-gray-200 rounded-md mr-3 flex-shrink-0 flex items-center justify-center ${
          checked ? 'border-primary bg-primary/5' : 'border-gray-200'
        }`}>
          <div className={`w-6 h-6 flex items-center justify-center ${checked ? 'text-primary' : 'text-gray-400'}`}>
            {icon}
          </div>
        </div>
      )}
      
      <div className="flex-1 min-w-0">
        {/* First row: Title and Radio button */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className={`font-semibold text-sm leading-tight ${
              checked ? 'text-primary' : 'text-gray-900'
            }`}>
              {title}
            </div>
            
            {/* Description with word balancing */}
            {description && (
              <div className={`text-[11px] leading-tight mt-1 ${
                checked ? 'text-primary/80' : 'text-gray-600'
              }`}>
                {description.split(' ').reduce((lines, word, index) => {
                  const currentLine = lines[lines.length - 1];
                  if (index === 0) {
                    return [[word]];
                  }
                  if (lines.length === 1 && currentLine.join(' ').split(' ').length < 8) {
                    currentLine.push(word);
                    return lines;
                  } else {
                    lines.push([word]);
                    return lines;
                  }
                }, [] as string[][]).map((line, index) => (
                  <div key={index} className={index > 0 ? 'mt-0.5' : ''}>
                    {line.join(' ')}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Radio button - properly positioned */}
          <div className="flex-shrink-0 ml-2">
            <div className="relative flex items-center justify-center h-4 w-4">
              <input
                type="radio"
                id={id}
                name={name}
                value={value || ''}
                checked={checked}
                onChange={() => onChange(value)}
                className="peer appearance-none h-4 w-4 border-[1.5px] border-gray-300 rounded-full cursor-pointer transition-all duration-200 checked:border-primary checked:border-1 focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <div
                className={`absolute inset-0 m-auto h-2 w-2 rounded-full pointer-events-none transition-all duration-200 ${
                  checked
                    ? 'bg-primary scale-100'
                    : 'bg-gray-300 scale-0'
                }`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};