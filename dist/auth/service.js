"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
const repository_1 = require("./repository");
const customError_1 = require("../utils/customError");
const auth_1 = require("../middleware/auth");
class Service {
  constructor() {
    this.repository = new repository_1.Repository();
  }
  generateOtp() {
    // return Math.floor(100000 + Math.random() * 900000).toString();
    return "000000";
  }
  async sendEmailOtp(email, otp) {
    console.log(`📧 MOCK EMAIL OTP: Sending to ${email}`);
    console.log(`OTP Code: ${otp}`);
    console.log("----------------------------");
  }
  async sendSmsOtp(phoneNumber, otp) {
    console.log(`📱 MOCK SMS OTP: Sending to ${phoneNumber}`);
    console.log(`OTP Code: ${otp}`);
    console.log("----------------------------");
  }
  validateRole(role) {
    const validRoles = [
      "farmer",
      "individual",
      "business",
      "professionals",
      "government officials",
    ];
    if (!validRoles.includes(role)) {
      throw new customError_1.CustomError(
        `Invalid role. Must be one of: ${validRoles.join(", ")}`,
        400
      );
    }
  }
  async register(payload) {
    const { email, phoneNumber, userName, role, language } = payload;
    this.validateRole(role);
    const existingByPhone = await this.repository.findAuthByPhone(phoneNumber);
    if (existingByPhone) {
      throw new customError_1.CustomError(
        "User already registered with this phone number.",
        409
      );
    }
    if (email) {
      const existingByEmail = await this.repository.findAuthByEmail(email);
      if (existingByEmail) {
        throw new customError_1.CustomError(
          "User already registered with this email.",
          409
        );
      }
    }
    const smsOtp = this.generateOtp();
    await this.repository.createTempAuth({
      userName,
      email: email || null,
      phoneNumber,
      role,
      language,
      smsOtp,
      verified: false,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    });
    await this.sendSmsOtp(phoneNumber, smsOtp);
    return {
      success: true,
      message: "OTP sent successfully to your phone number.",
      data: {
        phoneNumber,
        expiresIn: "10 minutes",
      },
    };
  }
  async verifyOtp(payload) {
    const { phoneNumber, otp } = payload;
    const tempAuth = await this.repository.findTempByPhone(phoneNumber);
    if (!tempAuth) {
      throw new customError_1.CustomError(
        "No registration request found for this phone number.",
        404
      );
    }
    if (tempAuth.expiresAt && tempAuth.expiresAt < new Date()) {
      await this.repository.deleteTempAuth(tempAuth.phoneNumber);
      throw new customError_1.CustomError(
        "OTP has expired. Please request a new one.",
        400
      );
    }
    if (tempAuth.smsOtp !== otp) {
      throw new customError_1.CustomError("Invalid OTP.", 400);
    }
    const auth = await this.repository.createAuth({
      userName: tempAuth.userName,
      email: tempAuth.email || null,
      phoneNumber: tempAuth.phoneNumber,
      role: tempAuth.role,
      language: tempAuth.language,
      emailVerified: false, // Email not verified
      phoneVerified: true, // Phone verified
    });
    const roleUser = await this.repository.createRoleBasedUser(tempAuth.role, {
      authId: auth.id,
      userName: tempAuth.userName,
      email: tempAuth.email,
      phoneNumber: tempAuth.phoneNumber,
      language: tempAuth.language,
    });
    await this.repository.deleteTempAuth(tempAuth.phoneNumber);
    const tokens = auth_1.JWTUtils.generateTokenPair({
      id: auth.id,
      email: auth.email || "",
      userName: auth.userName,
      role: auth.role,
    });
    return {
      success: true,
      message: "User registered successfully. You can verify your email later.",
      data: {
        user: {
          id: auth.id,
          userName: auth.userName,
          email: auth.email,
          phoneNumber: auth.phoneNumber,
          role: auth.role,
          language: auth.language,
          emailVerified: false,
          phoneVerified: true,
        },
        roleData: roleUser,
        tokens: {
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
          accessTokenExpiresIn: "15m",
          refreshTokenExpiresIn: "7d",
        },
      },
    };
  }
  async sendEmailOtpForVerification(payload, userId) {
    const { email } = payload;
    const auth = await this.repository.findAuthById(userId);
    if (!auth) {
      throw new customError_1.CustomError("User not found.", 404);
    }
    if (auth.emailVerified) {
      throw new customError_1.CustomError("Email is already verified.", 400);
    }
    const existingEmail = await this.repository.findAuthByEmail(email);
    if (existingEmail && existingEmail.id !== userId) {
      throw new customError_1.CustomError(
        "Email is already registered by another user.",
        409
      );
    }
    const emailOtp = this.generateOtp();
    await this.repository.updateEmailOtp(userId, email, emailOtp);
    await this.sendEmailOtp(email, emailOtp);
    return {
      success: true,
      message: "OTP sent successfully to your email.",
      data: {
        email,
        expiresIn: "10 minutes",
      },
    };
  }
  async verifyEmailOtp(payload, userId) {
    const { email, otp } = payload;
    const auth = await this.repository.findAuthById(userId);
    if (!auth) {
      throw new customError_1.CustomError("User not found.", 404);
    }
    if (auth.email !== email) {
      throw new customError_1.CustomError("Email does not match.", 400);
    }
    if (auth.emailVerified) {
      throw new customError_1.CustomError("Email is already verified.", 400);
    }
    if (!auth.emailOtp) {
      throw new customError_1.CustomError(
        "No email OTP found. Please request a new one.",
        400
      );
    }
    if (auth.emailOtpExpiry && auth.emailOtpExpiry < new Date()) {
      await this.repository.clearEmailOtp(userId);
      throw new customError_1.CustomError(
        "OTP has expired. Please request a new one.",
        400
      );
    }
    if (auth.emailOtp !== otp) {
      throw new customError_1.CustomError("Invalid OTP.", 400);
    }
    await this.repository.verifyEmail(userId);
    return {
      success: true,
      message: "Email verified successfully.",
      data: {
        email,
        emailVerified: true,
      },
    };
  }
  async login(payload) {
    const { identifier } = payload;
    const auth = await this.repository.findAuthByIdentifier(identifier);
    if (!auth) {
      throw new customError_1.CustomError(
        "User not found. Please register first.",
        404
      );
    }
    const otp = this.generateOtp();
    await this.repository.updateLoginOtp(auth.id, otp);
    const isEmail = identifier.includes("@");
    if (isEmail) {
      await this.sendEmailOtp(identifier, otp);
      return {
        success: true,
        message: "OTP sent successfully to your email.",
        data: {
          method: "email",
          identifier,
          expiresIn: "10 minutes",
        },
      };
    } else {
      await this.sendSmsOtp(identifier, otp);
      return {
        success: true,
        message: "OTP sent successfully to your phone number.",
        data: {
          method: "sms",
          identifier,
          expiresIn: "10 minutes",
        },
      };
    }
  }
  async verifyLoginOtp(payload) {
    const { identifier, otp } = payload;
    const auth = await this.repository.findAuthByIdentifier(identifier);
    if (!auth) {
      throw new customError_1.CustomError("User not found.", 404);
    }
    if (!auth.loginOtp) {
      throw new customError_1.CustomError(
        "No login OTP found. Please request a new one.",
        400
      );
    }
    if (auth.loginOtpExpiry && auth.loginOtpExpiry < new Date()) {
      await this.repository.clearLoginOtp(auth.id);
      throw new customError_1.CustomError(
        "OTP has expired. Please request a new one.",
        400
      );
    }
    if (auth.loginOtp !== otp) {
      throw new customError_1.CustomError("Invalid OTP.", 400);
    }
    await this.repository.clearLoginOtp(auth.id);
    const roleUser = await this.repository.findRoleBasedUser(
      auth.role,
      auth.id
    );
    const tokens = auth_1.JWTUtils.generateTokenPair({
      id: auth.id,
      email: auth.email || "",
      userName: auth.userName,
      role: auth.role,
    });
    return {
      success: true,
      message: "Login successful.",
      data: {
        user: {
          id: auth.id,
          userName: auth.userName,
          email: auth.email,
          phoneNumber: auth.phoneNumber,
          role: auth.role,
          language: auth.language,
          emailVerified: auth.emailVerified,
          phoneVerified: auth.phoneVerified,
          roleData: roleUser,
        },
        tokens: {
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
          accessTokenExpiresIn: "15m",
          refreshTokenExpiresIn: "7d",
        },
      },
    };
  }
  async refreshAccessToken(payload) {
    const { refreshToken } = payload;
    const decoded = auth_1.JWTUtils.verifyRefreshToken(refreshToken);
    const auth = await this.repository.findAuthById(decoded.userId);
    if (!auth) {
      throw new customError_1.CustomError(
        "User not found or has been deleted.",
        404
      );
    }
    const accessToken = auth_1.JWTUtils.generateAccessToken({
      id: auth.id,
      email: auth.email || "",
      userName: auth.userName,
      role: auth.role,
    });
    return {
      success: true,
      message: "Access token refreshed successfully.",
      data: {
        accessToken,
        expiresIn: "15m",
      },
    };
  }
  async getCurrentUser(userId) {
    const auth = await this.repository.findAuthById(userId);
    if (!auth) {
      throw new customError_1.CustomError("User not found.", 404);
    }
    const roleUser = await this.repository.findRoleBasedUser(
      auth.role,
      auth.id
    );
    return {
      success: true,
      data: {
        user: {
          id: auth.id,
          userName: auth.userName,
          email: auth.email,
          phoneNumber: auth.phoneNumber,
          role: auth.role,
          language: auth.language,
          emailVerified: auth.emailVerified,
          phoneVerified: auth.phoneVerified,
          createdAt: auth.createdAt,
          updatedAt: auth.updatedAt,
        },
        roleData: roleUser,
      },
    };
  }
  async resendRegistrationOtp(phoneNumber) {
    const tempAuth = await this.repository.findTempByPhone(phoneNumber);
    if (!tempAuth) {
      throw new customError_1.CustomError(
        "No registration request found for this phone number. Please register first.",
        404
      );
    }
    const existingUser = await this.repository.findAuthByPhone(phoneNumber);
    if (existingUser) {
      throw new customError_1.CustomError(
        "User already registered. Please login instead.",
        409
      );
    }
    const smsOtp = this.generateOtp();
    await this.repository.updateTempAuthOtp(phoneNumber, smsOtp);
    await this.sendSmsOtp(phoneNumber, smsOtp);
    return {
      success: true,
      message: "OTP resent successfully to your phone number.",
      data: {
        phoneNumber,
        expiresIn: "10 minutes",
      },
    };
  }
  async resendLoginOtp(identifier) {
    const auth = await this.repository.findAuthByIdentifier(identifier);
    if (!auth) {
      throw new customError_1.CustomError(
        "User not found. Please register first.",
        404
      );
    }
    const otp = this.generateOtp();
    await this.repository.updateLoginOtp(auth.id, otp);
    const isEmail = identifier.includes("@");
    if (isEmail) {
      await this.sendEmailOtp(identifier, otp);
      return {
        success: true,
        message: "Login OTP resent successfully to your email.",
        data: {
          method: "email",
          identifier,
          expiresIn: "10 minutes",
        },
      };
    } else {
      await this.sendSmsOtp(identifier, otp);
      return {
        success: true,
        message: "Login OTP resent successfully to your phone number.",
        data: {
          method: "sms",
          identifier,
          expiresIn: "10 minutes",
        },
      };
    }
  }
  async resendEmailVerificationOtp(userId) {
    const auth = await this.repository.findAuthById(userId);
    if (!auth) {
      throw new customError_1.CustomError("User not found.", 404);
    }
    if (!auth.email) {
      throw new customError_1.CustomError(
        "No email found for this user. Please add an email first.",
        400
      );
    }
    if (auth.emailVerified) {
      throw new customError_1.CustomError("Email is already verified.", 400);
    }
    const emailOtp = this.generateOtp();
    await this.repository.updateEmailOtp(userId, auth.email, emailOtp);
    await this.sendEmailOtp(auth.email, emailOtp);
    return {
      success: true,
      message: "Email verification OTP resent successfully.",
      data: {
        email: auth.email,
        expiresIn: "10 minutes",
      },
    };
  }
  async logout(userId) {
    return {
      success: true,
      message: "Logged out successfully.",
    };
  }
}
exports.Service = Service;
