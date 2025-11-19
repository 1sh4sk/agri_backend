"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const service_1 = require("./service");
const asyncHandler_1 = require("../utils/asyncHandler");
class Controller {
    constructor() {
        this.register = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
            const result = await this.service.register(req.body);
            res.status(200).json(result);
        });
        this.verifyOtp = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
            const result = await this.service.verifyOtp(req.body);
            res.status(201).json(result);
        });
        this.sendEmailOtp = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
            const userId = req.user?.id; // From auth middleware
            if (!userId) {
                return res.status(401).json({
                    success: false,
                    error: "Unauthorized"
                });
            }
            const result = await this.service.sendEmailOtpForVerification(req.body, userId);
            res.status(200).json(result);
        });
        this.verifyEmailOtp = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
            const userId = req.user?.id; // From auth middleware
            if (!userId) {
                return res.status(401).json({
                    success: false,
                    error: "Unauthorized"
                });
            }
            const result = await this.service.verifyEmailOtp(req.body, userId);
            res.status(200).json(result);
        });
        this.login = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
            const result = await this.service.login(req.body);
            res.status(200).json(result);
        });
        this.verifyLoginOtp = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
            const result = await this.service.verifyLoginOtp(req.body);
            res.status(200).json(result);
        });
        this.refreshToken = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
            const { refreshToken } = req.body;
            if (!refreshToken) {
                return res.status(400).json({
                    success: false,
                    error: "Refresh token is required"
                });
            }
            const result = await this.service.refreshAccessToken({ refreshToken });
            res.status(200).json(result);
        });
        this.getCurrentUser = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
            const userId = req.user?.id;
            if (!userId) {
                return res.status(401).json({
                    success: false,
                    error: "Unauthorized"
                });
            }
            const result = await this.service.getCurrentUser(userId);
            res.status(200).json(result);
        });
        this.logout = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
            const userId = req.user?.id;
            if (!userId) {
                return res.status(401).json({
                    success: false,
                    error: "Unauthorized"
                });
            }
            const result = await this.service.logout(userId);
            res.status(200).json(result);
        });
        this.resendRegistrationOtp = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
            const { phoneNumber } = req.body;
            if (!phoneNumber) {
                return res.status(400).json({
                    success: false,
                    error: "Phone number is required"
                });
            }
            const result = await this.service.resendRegistrationOtp(phoneNumber);
            res.status(200).json(result);
        });
        this.resendLoginOtp = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
            const { identifier } = req.body;
            if (!identifier) {
                return res.status(400).json({
                    success: false,
                    error: "Email or phone number is required"
                });
            }
            const result = await this.service.resendLoginOtp(identifier);
            res.status(200).json(result);
        });
        this.resendEmailVerificationOtp = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
            const userId = req.user?.id;
            if (!userId) {
                return res.status(401).json({
                    success: false,
                    error: "Unauthorized"
                });
            }
            const result = await this.service.resendEmailVerificationOtp(userId);
            res.status(200).json(result);
        });
        this.service = new service_1.Service();
    }
}
exports.Controller = Controller;
