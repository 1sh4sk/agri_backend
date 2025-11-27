"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.panVerificationPayload = exports.aadhaarVerificationPayload = exports.sellingPreferencesPayload = exports.addCropPayload = exports.farmDetailsPayload = exports.farmerDetailsPayload = exports.basicDetailsPayload = void 0;
exports.basicDetailsPayload = {
    userName: {
        type: "string",
        required: true,
        trim: true,
        min: 3,
        max: 100,
        messages: {
            "string.base": "User name must be a string",
            "string.empty": "User name is required",
            "string.min": "User name must be at least 3 characters",
            "string.max": "User name must not exceed 100 characters",
            "any.required": "User name is required",
        },
        label: "User Name",
    },
    phoneNumber: {
        type: "string",
        required: true,
        trim: true,
        pattern: /^[0-9]{10,15}$/,
        messages: {
            "string.base": "Mobile number must be a string",
            "string.empty": "Mobile number is required",
            "string.pattern.base": "Mobile number must be 10-15 digits",
            "any.required": "Mobile number is required",
        },
        label: "Mobile Number",
    },
    location: {
        type: "string",
        required: true,
        trim: true,
        min: 3,
        max: 200,
        messages: {
            "string.base": "Location must be a string",
            "string.empty": "Location is required",
            "string.min": "Location must be at least 3 characters",
            "string.max": "Location must not exceed 200 characters",
            "any.required": "Location is required",
        },
        label: "Location",
    },
    referralCode: {
        type: "string",
        required: false,
        optional: true,
        trim: true,
        max: 50,
        messages: {
            "string.base": "Referral code must be a string",
            "string.max": "Referral code must not exceed 50 characters",
        },
        label: "Referral Code",
    },
};
exports.farmerDetailsPayload = {
    userName: {
        type: "string",
        required: true,
        trim: true,
        min: 3,
        max: 100,
        messages: {
            "string.base": "User name must be a string",
            "string.empty": "User name is required",
            "any.required": "User name is required",
        },
        label: "User Name",
    },
    phoneNumber: {
        type: "string",
        required: true,
        trim: true,
        pattern: /^[0-9]{10,15}$/,
        messages: {
            "string.base": "Mobile number must be a string",
            "string.empty": "Mobile number is required",
            "string.pattern.base": "Mobile number must be 10-15 digits",
            "any.required": "Mobile number is required",
        },
        label: "Mobile Number",
    },
    location: {
        type: "string",
        required: true,
        trim: true,
        messages: {
            "string.base": "Location must be a string",
            "string.empty": "Location is required",
            "any.required": "Location is required",
        },
        label: "Location",
    },
    preferredLanguage: {
        type: "string",
        required: true,
        trim: true,
        messages: {
            "string.base": "Preferred language must be a string",
            "string.empty": "Preferred language is required",
            "any.required": "Preferred language is required",
        },
        label: "Preferred Language",
    },
    dob: {
        type: "string",
        required: true,
        messages: {
            "string.base": "Date of birth must be a valid date",
            "string.empty": "Date of birth is required",
            "any.required": "Date of birth is required",
        },
        label: "Date of Birth",
    },
    farmExperience: {
        type: "number",
        required: true,
        min: 0,
        max: 100,
        messages: {
            "number.base": "Farm experience must be a number",
            "number.min": "Farm experience cannot be negative",
            "number.max": "Farm experience must not exceed 100 years",
            "any.required": "Farm experience is required",
        },
        label: "Farm Experience",
    },
    gender: {
        type: "string",
        required: true,
        enum: ["Male", "Female", "Other"],
        messages: {
            "string.base": "Gender must be a string",
            "string.empty": "Gender is required",
            "any.only": "Gender must be Male, Female, or Other",
            "any.required": "Gender is required",
        },
        label: "Gender",
    },
    email: {
        type: "string",
        required: false,
        optional: true,
        trim: true,
        email: true,
        messages: {
            "string.base": "Email must be a string",
            "string.email": "Please provide a valid email address",
        },
        label: "Email",
    },
    referralCode: {
        type: "string",
        required: false,
        optional: true,
        trim: true,
        messages: {
            "string.base": "Referral code must be a string",
        },
        label: "Referral Code",
    },
    isFpoMember: {
        type: "boolean",
        required: true,
        messages: {
            "boolean.base": "FPO member must be true or false",
            "any.required": "FPO member status is required",
        },
        label: "FPO Member",
    },
    fpoName: {
        type: "string",
        required: false,
        optional: true,
        trim: true,
        messages: {
            "string.base": "FPO name must be a string",
            "string.empty": "FPO name is required when member of FPO",
        },
        label: "FPO Name",
    },
    fpoRegistrationNumber: {
        type: "string",
        required: false,
        optional: true,
        trim: true,
        messages: {
            "string.base": "FPO registration number must be a string",
            "string.empty": "FPO registration number is required when member of FPO",
        },
        label: "FPO Registration Number",
    },
};
exports.farmDetailsPayload = {
    landSize: {
        type: "number",
        required: true,
        min: 0,
        messages: {
            "number.base": "Land size must be a number",
            "number.min": "Land size cannot be negative",
            "any.required": "Land size is required",
        },
        label: "Land Size",
    },
    farmingType: {
        type: "string",
        required: true,
        enum: ["Organic", "Conventional", "Mixed"],
        messages: {
            "string.base": "Farming type must be a string",
            "string.empty": "Farming type is required",
            "any.only": "Farming type must be Organic, Conventional, or Mixed",
            "any.required": "Farming type is required",
        },
        label: "Farming Type",
    },
    cropsGrown: {
        type: "array",
        required: true,
        messages: {
            "array.base": "Crops grown must be an array",
            "any.required": "At least one crop is required",
        },
        label: "Crops Grown",
    },
};
exports.addCropPayload = {
    cropName: {
        type: "string",
        required: true,
        trim: true,
        min: 2,
        max: 100,
        messages: {
            "string.base": "Crop name must be a string",
            "string.empty": "Crop name is required",
            "string.min": "Crop name must be at least 2 characters",
            "string.max": "Crop name must not exceed 100 characters",
            "any.required": "Crop name is required",
        },
        label: "Crop Name",
    },
    variety: {
        type: "string",
        required: true,
        trim: true,
        min: 2,
        max: 100,
        messages: {
            "string.base": "Variety must be a string",
            "string.empty": "Variety is required",
            "string.min": "Variety must be at least 2 characters",
            "string.max": "Variety must not exceed 100 characters",
            "any.required": "Variety is required",
        },
        label: "Variety",
    },
    availabilityStatus: {
        type: "string",
        required: true,
        enum: ["Available", "Not Available"],
        messages: {
            "string.base": "Availability status must be a string",
            "string.empty": "Availability status is required",
            "any.only": "Availability status must be Available or Not Available",
            "any.required": "Availability status is required",
        },
        label: "Availability Status",
    },
    quantity: {
        type: "number",
        required: false,
        optional: true,
        min: 0,
        messages: {
            "number.base": "Quantity must be a number",
            "number.min": "Quantity cannot be negative",
        },
        label: "Quantity (Kgs)",
    },
    harvestPeriod: {
        type: "string",
        required: true,
        trim: true,
        messages: {
            "string.base": "Harvest period must be a string",
            "string.empty": "Harvest period is required",
            "any.required": "Harvest period is required",
        },
        label: "Harvest Period",
    },
    expectedPrice: {
        type: "number",
        required: true,
        min: 0,
        messages: {
            "number.base": "Expected price must be a number",
            "number.min": "Expected price cannot be negative",
            "any.required": "Expected price is required",
        },
        label: "Expected Price",
    },
};
exports.sellingPreferencesPayload = {
    sellingPreference: {
        type: "string",
        required: false,
        optional: true,
        trim: true,
        messages: {
            "string.base": "Selling preference must be a string",
        },
        label: "Selling Preference",
    },
    preferredMarket: {
        type: "string",
        required: false,
        optional: true,
        trim: true,
        messages: {
            "string.base": "Preferred market must be a string",
        },
        label: "Preferred Market",
    },
};
exports.aadhaarVerificationPayload = {
    aadhaarNumber: {
        type: "string",
        required: true,
        trim: true,
        pattern: /^[0-9]{12}$/,
        messages: {
            "string.base": "Aadhaar number must be a string",
            "string.empty": "Aadhaar number is required",
            "string.pattern.base": "Aadhaar number must be exactly 12 digits",
            "any.required": "Aadhaar number is required",
        },
        label: "Aadhaar Number",
    },
};
exports.panVerificationPayload = {
    panNumber: {
        type: "string",
        required: true,
        trim: true,
        pattern: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
        messages: {
            "string.base": "PAN number must be a string",
            "string.empty": "PAN number is required",
            "string.pattern.base": "PAN number must be in valid format (e.g., ABCDE1234F)",
            "any.required": "PAN number is required",
        },
        label: "PAN Number",
    },
};
