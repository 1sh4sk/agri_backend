import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectFieldProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  required?: boolean;
  error?: string;
}

export const SelectField: React.FC<SelectFieldProps> = ({ 
  label, 
  value, 
  onChange, 
  options, 
  placeholder,
  required = false,
  error
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-[#9DA2AB] mb-2">
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={` px-4 py-3 bg-white w-[300px] h-[40px] rounded-[8px] border-[1px] text-[14px] shadow-sm  text-sm ${error ? 'border-red-500' : 'border-gray-300'} rounded-md bg-white text-left focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 flex items-center justify-between text-sm`}
        >
          <span className={value ? 'text-gray-900' : 'text-gray-400'}>
            {value || placeholder}
          </span>
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </button>
        
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
              {options.map((option) => (
                <div
                  key={option}
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-900 text-sm"
                >
                  {option}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};