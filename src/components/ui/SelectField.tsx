import React from "react";

interface SelectFieldProps {
  label: string;
  name: string;
  register: any;
  options: string[];
  error?: string;
  className?: string;
  required?: boolean;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  name,
  register,
  options,
  error,
  className,
  required = false,
}) => {
  return (
    <div>
      <label className="block text-sm text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>

      <select
        {...register(name)}
        className={`w-full border rounded-md px-3 py-3 ${
          error ? "border-red-500" : ""
        } ${className}`}
      >
        <option value="">Select {label.toLowerCase()}</option>

        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default SelectField;
