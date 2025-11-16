// // import React, { useState } from "react";

// // const BasicDetailsForm: React.FC = () => {
// //   const [formData, setFormData] = useState({
// //     fullName: "",
// //     mobileNumber: "",
// //     location: "",
// //     referralCode: "",
// //   });

// //   const handleChange = (
// //     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
// //   ) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = (e: React.FormEvent) => {
// //     e.preventDefault();
// //     console.log(formData);
// //   };

// //   return (
// //     <form onSubmit={handleSubmit} className="rounded-lg shadow-sm p-6">
// //       <h2 className="text-lg font-semibold text-gray-700 mb-4">
// //         Basic Details
// //       </h2>

// //       <div className="grid md:grid-cols-3 gap-4">
// //         <div>
// //           <label className="block text-sm text-gray-600 mb-1">
// //             Full Name *
// //           </label>
// //           <input
// //             type="text"
// //             name="fullName"
// //             value={formData.fullName}
// //             onChange={handleChange}
// //             placeholder="Enter your full name"
// //             className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
// //             required
// //           />
// //         </div>

// //         <div>
// //           <label className="block text-sm text-gray-600 mb-1">
// //             Mobile Number *
// //           </label>
// //           <input
// //             type="tel"
// //             name="mobileNumber"
// //             value={formData.mobileNumber}
// //             onChange={handleChange}
// //             placeholder="Enter your mobile number"
// //             className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
// //             required
// //           />
// //         </div>

// //         <div>
// //           <label className="block text-sm text-gray-600 mb-1">Location *</label>
// //           <select
// //             name="location"
// //             value={formData.location}
// //             onChange={handleChange}
// //             className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
// //             required
// //           >
// //             <option value="">Select location</option>
// //             <option value="Chennai">Chennai</option>
// //             <option value="Coimbatore">Coimbatore</option>
// //             <option value="Madurai">Madurai</option>
// //           </select>
// //         </div>

// //         <div className="md:col-span-3">
// //           <label className="block text-sm text-gray-600 mb-1">
// //             Referral Code
// //           </label>
// //           <input
// //             type="text"
// //             name="referralCode"
// //             value={formData.referralCode}
// //             onChange={handleChange}
// //             placeholder="Enter referral code"
// //             className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
// //           />
// //         </div>
// //       </div>
// //     </form>
// //   );
// // };

// // export default BasicDetailsForm;

// import React from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { basicDetailsSchema } from "../../../utils/yupValidation";
// import { Input } from "../../ui/Input";

// const locations = ["Chennai", "Coimbatore", "Madurai"];

// interface BasicDetailsFormData {
//   fullName: string;
//   mobileNumber: string;
//   location: string;
//   referralCode?: string;
// }

// const BasicDetailsForm: React.FC = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<BasicDetailsFormData>({
//     resolver: yupResolver(basicDetailsSchema),
//     defaultValues: {
//       fullName: "",
//       mobileNumber: "",
//       location: "",
//       referralCode: "",
//     },
//   });

//   const onSubmit = (data: BasicDetailsFormData) => {
//     console.log("Form Submitted:", data);
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="rounded-lg">
//       <div className="grid md:grid-cols-3 gap-4">
//         {/* Full Name */}
//         <Input
//           label="Full Name *"
//           placeholder="Enter your full name"
//           basicDetails
//           error={errors.fullName?.message}
//           {...register("fullName")}
//         />

//         {/* Mobile Number */}
//         <Input
//           label="Mobile Number *"
//           placeholder="Enter your mobile number"
//           basicDetails
//           error={errors.mobileNumber?.message}
//           {...register("mobileNumber")}
//         />

//         {/* Location Select */}
//         <div>
//           <label className="block text-sm text-gray-700 mb-2">Location *</label>
//           <select
//             {...register("location")}
//             className={`w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none ${
//               errors.location ? "border-red-500" : ""
//             }`}
//           >
//             <option value="">Select location</option>
//             {locations.map((loc) => (
//               <option key={loc} value={loc}>
//                 {loc}
//               </option>
//             ))}
//           </select>
//           {errors.location && (
//             <p className="mt-1 text-sm text-red-500">
//               {errors.location.message}
//             </p>
//           )}
//         </div>

//         {/* Referral Code */}
//         <Input
//           label="Referral Code"
//           placeholder="Enter referral code"
//           basicDetails
//           error={errors.referralCode?.message}
//           {...register("referralCode")}
//           className="md:col-span-3"
//         />
//       </div>
//     </form>
//   );
// };

// export default BasicDetailsForm;

// ---------------- BasicDetailsForm.tsx ----------------
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Input } from "../../ui/Input";
import { CompleteFormData } from "../../../pages/basic-details.tsx/BasicDetails";
import SelectField from "../../ui/SelectField";

const locations = ["Chennai", "Coimbatore", "Madurai"];

interface Props {
  methods: UseFormReturn<CompleteFormData>;
}

const BasicDetailsForm: React.FC<Props> = ({ methods }) => {
  const {
    register,
    formState: { errors },
  } = methods;

  return (
    <div className="grid md:grid-cols-3 gap-4">
      <Input
        basicDetails
        required
        label="Full Name"
        placeholder="Enter your full name"
        error={errors.fullName?.message}
        {...register("fullName")}
      />
      <Input
        basicDetails
        required
        label="Mobile Number"
        placeholder="Enter mobile number"
        error={errors.mobileNumber?.message}
        {...register("mobileNumber")}
      />
      {/* 
      <div>
        <label className="block text-sm text-gray-700 mb-2">Location *</label>
        <select
          {...register("location")}
          className={`w-full border rounded-md px-3 py-3 ${
            errors.location ? "border-red-500" : ""
          }`}
        >
          <option value="">Select location</option>
          {locations.map((loc) => (
            <option key={loc}>{loc}</option>
          ))}
        </select>
        {errors.location && (
          <p className="text-red-500">{errors.location.message}</p>
        )}
      </div> */}
      <SelectField
        required
        label="Location"
        name="location"
        register={register}
        options={locations}
        error={errors.location?.message}
      />
      <Input
        basicDetails
        label="Referral Code"
        placeholder="Enter referral code"
        error={errors.referralCode?.message}
        {...register("referralCode")}
        className="md:col-span-3"
      />
    </div>
  );
};

export default BasicDetailsForm;
