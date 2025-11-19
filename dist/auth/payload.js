"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resendLoginOtpPayload = exports.resendRegistrationOtpPayload = exports.resendOtpPayload = exports.changePhonePayload = exports.updateProfilePayload = exports.refreshTokenPayload = exports.verifyLoginOtpPayload = exports.loginPayload = exports.verifyEmailOtpPayload = exports.sendEmailOtpPayload = exports.verifyOtpPayload = exports.registerPayload = void 0;
exports.registerPayload = {
    userName: {
        type: 'string',
        required: true,
        trim: true,
        min: 3,
        max: 50,
        messages: {
            'string.base': 'Username must be a string',
            'string.empty': 'Username is required',
            'string.min': 'Username must be at least 3 characters',
            'string.max': 'Username must not exceed 50 characters',
            'any.required': 'Username is required'
        },
        label: 'Username'
    },
    email: {
        type: 'string',
        required: false,
        optional: true,
        trim: true,
        email: true,
        allowNull: true,
        allowEmpty: true,
        messages: {
            'string.base': 'Email must be a string',
            'string.email': 'Please provide a valid email address'
        },
        label: 'Email'
    },
    phoneNumber: {
        type: 'string',
        required: true,
        trim: true,
        pattern: /^[0-9]{10,15}$/,
        messages: {
            'string.base': 'Phone number must be a string',
            'string.empty': 'Phone number is required',
            'string.pattern.base': 'Phone number must be 10-15 digits',
            'any.required': 'Phone number is required'
        },
        label: 'Phone Number'
    },
    role: {
        type: 'string',
        required: true,
        trim: true,
        enum: ['farmer', 'individual', 'business', 'professionals', 'government officials'],
        messages: {
            'string.base': 'Role must be a string',
            'string.empty': 'Role is required',
            'any.only': 'Role must be one of: farmer, individual, business, professionals, government officials',
            'any.required': 'Role is required'
        },
        label: 'User Role'
    },
    language: {
        type: 'string',
        required: true,
        trim: true,
        min: 2,
        max: 10,
        messages: {
            'string.base': 'Language must be a string',
            'string.empty': 'Language is required',
            'string.min': 'Language code must be at least 2 characters',
            'string.max': 'Language code must not exceed 10 characters',
            'any.required': 'Language is required'
        },
        label: 'Language'
    }
};
exports.verifyOtpPayload = {
    phoneNumber: {
        type: 'string',
        required: true,
        trim: true,
        pattern: /^[0-9]{10,15}$/,
        messages: {
            'string.base': 'Phone number must be a string',
            'string.empty': 'Phone number is required',
            'string.pattern.base': 'Phone number must be 10-15 digits',
            'any.required': 'Phone number is required'
        },
        label: 'Phone Number'
    },
    otp: {
        type: 'string',
        required: true,
        trim: true,
        length: 6,
        pattern: /^[0-9]{6}$/,
        messages: {
            'string.base': 'OTP must be a string',
            'string.empty': 'OTP is required',
            'string.length': 'OTP must be exactly 6 digits',
            'string.pattern.base': 'OTP must contain only numbers',
            'any.required': 'OTP is required'
        },
        label: 'Registration OTP'
    }
};
exports.sendEmailOtpPayload = {
    email: {
        type: 'string',
        required: true,
        trim: true,
        email: true,
        messages: {
            'string.base': 'Email must be a string',
            'string.empty': 'Email is required',
            'string.email': 'Please provide a valid email address',
            'any.required': 'Email is required'
        },
        label: 'Email Address'
    }
};
exports.verifyEmailOtpPayload = {
    email: {
        type: 'string',
        required: true,
        trim: true,
        email: true,
        messages: {
            'string.base': 'Email must be a string',
            'string.empty': 'Email is required',
            'string.email': 'Please provide a valid email address',
            'any.required': 'Email is required'
        },
        label: 'Email Address'
    },
    otp: {
        type: 'string',
        required: true,
        trim: true,
        length: 6,
        pattern: /^[0-9]{6}$/,
        messages: {
            'string.base': 'OTP must be a string',
            'string.empty': 'OTP is required',
            'string.length': 'OTP must be exactly 6 digits',
            'string.pattern.base': 'OTP must contain only numbers',
            'any.required': 'OTP is required'
        },
        label: 'Email OTP'
    }
};
exports.loginPayload = {
    identifier: {
        type: 'string',
        required: true,
        trim: true,
        notEmpty: true,
        custom: (value) => {
            const isEmail = value.includes('@');
            const isPhone = /^[0-9]{10,15}$/.test(value);
            if (!isEmail && !isPhone) {
                throw new Error('Please provide a valid email or phone number');
            }
            return true;
        },
        messages: {
            'string.base': 'Email or phone number must be a string',
            'string.empty': 'Email or phone number is required',
            'any.required': 'Email or phone number is required'
        },
        label: 'Email or Phone Number'
    }
};
exports.verifyLoginOtpPayload = {
    identifier: {
        type: 'string',
        required: true,
        trim: true,
        notEmpty: true,
        messages: {
            'string.base': 'Email or phone number must be a string',
            'string.empty': 'Email or phone number is required',
            'any.required': 'Email or phone number is required'
        },
        label: 'Email or Phone Number'
    },
    otp: {
        type: 'string',
        required: true,
        trim: true,
        length: 6,
        pattern: /^[0-9]{6}$/,
        messages: {
            'string.base': 'OTP must be a string',
            'string.empty': 'OTP is required',
            'string.length': 'OTP must be exactly 6 digits',
            'string.pattern.base': 'OTP must contain only numbers',
            'any.required': 'OTP is required'
        },
        label: 'Login OTP'
    }
};
exports.refreshTokenPayload = {
    refreshToken: {
        type: 'string',
        required: true,
        trim: true,
        notEmpty: true,
        messages: {
            'string.base': 'Refresh token must be a string',
            'string.empty': 'Refresh token is required',
            'any.required': 'Refresh token is required'
        },
        label: 'Refresh Token'
    }
};
exports.updateProfilePayload = {
    userName: {
        type: 'string',
        required: false,
        optional: true,
        trim: true,
        min: 3,
        max: 50,
        messages: {
            'string.base': 'Username must be a string',
            'string.min': 'Username must be at least 3 characters',
            'string.max': 'Username must not exceed 50 characters'
        },
        label: 'Username'
    },
    language: {
        type: 'string',
        required: false,
        optional: true,
        trim: true,
        min: 2,
        max: 10,
        messages: {
            'string.base': 'Language must be a string',
            'string.min': 'Language code must be at least 2 characters',
            'string.max': 'Language code must not exceed 10 characters'
        },
        label: 'Language'
    }
};
exports.changePhonePayload = {
    newPhoneNumber: {
        type: 'string',
        required: true,
        trim: true,
        pattern: /^[0-9]{10,15}$/,
        messages: {
            'string.base': 'Phone number must be a string',
            'string.empty': 'Phone number is required',
            'string.pattern.base': 'Phone number must be 10-15 digits',
            'any.required': 'Phone number is required'
        },
        label: 'New Phone Number'
    }
};
exports.resendOtpPayload = {
    identifier: {
        type: 'string',
        required: true,
        trim: true,
        notEmpty: true,
        messages: {
            'string.base': 'Email or phone number must be a string',
            'string.empty': 'Email or phone number is required',
            'any.required': 'Email or phone number is required'
        },
        label: 'Email or Phone Number'
    },
    otpType: {
        type: 'string',
        required: true,
        enum: ['registration', 'login', 'email_verification'],
        messages: {
            'string.base': 'OTP type must be a string',
            'string.empty': 'OTP type is required',
            'any.only': 'OTP type must be one of: registration, login, email_verification',
            'any.required': 'OTP type is required'
        },
        label: 'OTP Type'
    }
};
exports.resendRegistrationOtpPayload = {
    phoneNumber: {
        type: 'string',
        required: true,
        trim: true,
        pattern: /^[0-9]{10,15}$/,
        messages: {
            'string.base': 'Phone number must be a string',
            'string.empty': 'Phone number is required',
            'string.pattern.base': 'Phone number must be 10-15 digits',
            'any.required': 'Phone number is required'
        },
        label: 'Phone Number'
    }
};
exports.resendLoginOtpPayload = {
    identifier: {
        type: 'string',
        required: true,
        trim: true,
        notEmpty: true,
        custom: (value) => {
            const isEmail = value.includes('@');
            const isPhone = /^[0-9]{10,15}$/.test(value);
            if (!isEmail && !isPhone) {
                throw new Error('Please provide a valid email or phone number');
            }
            return true;
        },
        messages: {
            'string.base': 'Email or phone number must be a string',
            'string.empty': 'Email or phone number is required',
            'any.required': 'Email or phone number is required'
        },
        label: 'Email or Phone Number'
    }
};
