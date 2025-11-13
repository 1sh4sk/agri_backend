// import React, { useState } from "react";

// const BasicDetailsForm: React.FC = () => {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     mobileNumber: "",
//     location: "",
//     referralCode: "",
//   });

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log(formData);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
//       <h2 className="text-lg font-semibold text-gray-700 mb-4">
//         Basic Details
//       </h2>

//       <div className="grid md:grid-cols-3 gap-4">
//         <div>
//           <label className="block text-sm text-gray-600 mb-1">
//             Full Name *
//           </label>
//           <input
//             type="text"
//             name="fullName"
//             value={formData.fullName}
//             onChange={handleChange}
//             placeholder="Enter your full name"
//             className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm text-gray-600 mb-1">
//             Mobile Number *
//           </label>
//           <input
//             type="tel"
//             name="mobileNumber"
//             value={formData.mobileNumber}
//             onChange={handleChange}
//             placeholder="Enter your mobile number"
//             className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm text-gray-600 mb-1">Location *</label>
//           <select
//             name="location"
//             value={formData.location}
//             onChange={handleChange}
//             className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
//             required
//           >
//             <option value="">Select location</option>
//             <option value="Chennai">Chennai</option>
//             <option value="Coimbatore">Coimbatore</option>
//             <option value="Madurai">Madurai</option>
//           </select>
//         </div>

//         <div className="md:col-span-3">
//           <label className="block text-sm text-gray-600 mb-1">
//             Referral Code
//           </label>
//           <input
//             type="text"
//             name="referralCode"
//             value={formData.referralCode}
//             onChange={handleChange}
//             placeholder="Enter referral code"
//             className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
//           />
//         </div>
//       </div>

//       <div className="flex justify-end mt-6 gap-4">
//         <button
//           type="submit"
//           className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
//         >
//           Save & Submit
//         </button>
//       </div>
//     </form>
//   );
// };

// export default BasicDetailsForm;

import React, { useState } from "react";

const BasicDetailsForm: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    location: "",
    referralCode: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        Basic Details
      </h2>

      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Mobile Number *
          </label>
          <input
            type="tel"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            placeholder="Enter your mobile number"
            className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Location *</label>
          <select
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
            required
          >
            <option value="">Select location</option>
            <option value="Chennai">Chennai</option>
            <option value="Coimbatore">Coimbatore</option>
            <option value="Madurai">Madurai</option>
          </select>
        </div>

        <div className="md:col-span-3">
          <label className="block text-sm text-gray-600 mb-1">
            Referral Code
          </label>
          <input
            type="text"
            name="referralCode"
            value={formData.referralCode}
            onChange={handleChange}
            placeholder="Enter referral code"
            className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>
      </div>
    </form>
  );
};

export default BasicDetailsForm;
