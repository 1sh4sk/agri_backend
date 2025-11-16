import React, { useState } from 'react';
import { UseFormRegister, FieldError, FieldValues, Path } from 'react-hook-form';

interface InputsProps<TFieldValues extends FieldValues = FieldValues> 
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name'> {
  label?: string;
  error?: FieldError;
  register?: UseFormRegister<TFieldValues>;
  name?: Path<TFieldValues>;
  fullWidth?: boolean;
  type?: 'text' | 'email' | 'password' | 'tel' | 'number';
  withCountryCode?: boolean;
  countryCode?: string;
  onCountryCodeChange?: (code: string) => void;
}

// Country data with flags
const countries = [
  { code: '+91', country: 'India', flag: '🇮🇳' },
  { code: '+1', country: 'USA', flag: '🇺🇸' },
  { code: '+44', country: 'UK', flag: '🇬🇧' },
  { code: '+61', country: 'Australia', flag: '🇦🇺' },
  { code: '+86', country: 'China', flag: '🇨🇳' },
  { code: '+81', country: 'Japan', flag: '🇯🇵' },
  { code: '+65', country: 'Singapore', flag: '🇸🇬' },
  { code: '+971', country: 'UAE', flag: '🇦🇪' },
  { code: '+33', country: 'France', flag: '🇫🇷' },
  { code: '+49', country: 'Germany', flag: '🇩🇪' },
];

export const Inputs = React.forwardRef<HTMLInputElement, InputsProps>(
  ({ 
    label, 
    error, 
    register, 
    name, 
    fullWidth = true, 
    className = '', 
    type = 'text',
    withCountryCode = false,
    countryCode = '+91',
    onCountryCodeChange,
    ...props 
  }, ref) => {
    
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    
    const baseInputClasses = `
      px-[14px] py-[10px] gap-[10px] w-full text-[14px] h-[44px] 
      bg-[#FFFFFF] border border-[1px] rounded-[4px] 
      focus:outline-none focus:ring-2 focus:ring-primary-500
      ${error ? 'border-red-500' : 'border-gray-300'}
      ${className}
    `;

    const inputProps = register && name ? register(name) : {};

    // Common label styles
    const labelClass = "block text-[12px] font-normal text-gray-700 mb-2";

    // Get selected country
    const selectedCountry = countries.find(c => c.code === countryCode) || countries[0];

    // Filter countries based on search
    const filteredCountries = countries.filter(country => 
      country.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.code.includes(searchTerm)
    );

    // Render phone input with country code
    if (type === 'tel' && withCountryCode) {
      return (
        <div className={fullWidth ? 'w-full' : ''}>
          {label && (
            <label className={labelClass}>
              {label}
            </label>
          )}
          <div className="relative flex items-center">
            {/* Country Code Dropdown Trigger */}
            <div className="absolute left-3 flex items-center z-20">
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1 bg-transparent border-none text-sm font-medium text-gray-700 focus:outline-none cursor-pointer pr-5 hover:bg-gray-50 rounded px-1 py-1 transition-colors"
              >
                {/* <span className="text-base">{selectedCountry.flag}</span> */}
                <span>{selectedCountry.code}</span>
                <svg 
                  className={`w-3 h-3 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2.5} 
                    d="M19 9l-7 7-7-7" 
                  />
                </svg>
              </button>
            </div>
            
            {/* Phone Number Input */}
            <input
              ref={ref}
              type="tel"
              className={`${baseInputClasses} pl-[95px]`}
              {...inputProps}
              {...props}
            />

            {/* Custom Dropdown Menu */}
            {isOpen && (
              <>
                {/* Backdrop */}
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setIsOpen(false)}
                />
                
                {/* Dropdown */}
                <div className="absolute top-full left-0 mt-1 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-30 max-h-80 overflow-hidden">
                  {/* Search Input */}
                  <div className="p-2 border-b border-gray-200">
                    <div className="relative">
                      <svg 
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <input
                        type="text"
                        placeholder="Search country..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Country List */}
                  <div className="overflow-y-auto max-h-64">
                    {filteredCountries.length > 0 ? (
                      filteredCountries.map((country) => (
                        <button
                          key={country.code}
                          type="button"
                          onClick={() => {
                            onCountryCodeChange?.(country.code);
                            setIsOpen(false);
                            setSearchTerm('');
                          }}
                          className={`w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-gray-50 transition-colors ${
                            country.code === countryCode ? 'bg-primary-50 text-primary-600' : 'text-gray-700'
                          }`}
                        >
                          <span className="text-xl">{country.flag}</span>
                          <span className="flex-1 text-sm font-medium">{country.country}</span>
                          <span className="text-sm text-gray-500">{country.code}</span>
                          {country.code === countryCode && (
                            <svg className="w-4 h-4 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </button>
                      ))
                    ) : (
                      <div className="px-4 py-8 text-center text-sm text-gray-500">
                        No countries found
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
          {error?.message && (
            <p className="mt-1 text-xs text-red-600">{error.message}</p>
          )}
        </div>
      );
    }

    // Render regular input
    return (
      <div className={fullWidth ? 'w-full' : ''}>
        {label && (
          <label className={labelClass}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          type={type}
          className={baseInputClasses}
          {...inputProps}
          {...props}
        />
        {error?.message && (
          <p className="mt-1 text-xs text-red-600">{error.message}</p>
        )}
      </div>
    );
  }
) as <TFieldValues extends FieldValues = FieldValues>(
  props: InputsProps<TFieldValues> & React.RefAttributes<HTMLInputElement>
) => React.ReactElement;

Inputs.displayName = 'Inputs';