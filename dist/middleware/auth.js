"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionalAuth = exports.requireRole = exports.verifyAccessToken = exports.JWTUtils = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = __importDefault(require("../config/env"));
const customError_1 = require("../utils/customError");
class JWTUtils {
    static generateTokenPair(user) {
        const payload = {
            userId: user.id,
            email: user.email,
            userName: user.userName,
            role: user.role,
        };
        const accessToken = jsonwebtoken_1.default.sign({ ...payload, type: "access" }, env_1.default.jwt.accesssecret, { expiresIn: env_1.default.jwt.accessExpirationMinutes });
        const refreshToken = jsonwebtoken_1.default.sign({ ...payload, type: "refresh" }, env_1.default.jwt.refreshsecret, { expiresIn: env_1.default.jwt.refreshExpirationDays });
        return { accessToken, refreshToken };
    }
    static generateAccessToken(user) {
        const payload = {
            userId: user.id,
            email: user.email,
            userName: user.userName,
            role: user.role,
            type: "access",
        };
        return jsonwebtoken_1.default.sign(payload, env_1.default.jwt.accesssecret, {
            expiresIn: env_1.default.jwt.accessExpirationMinutes,
        });
    }
    static verifyAccessToken(token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, env_1.default.jwt.accesssecret);
            if (decoded.type !== "access") {
                throw new customError_1.CustomError("Invalid token type", 401);
            }
            return decoded;
        }
        catch (error) {
            if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
                throw new customError_1.CustomError("Access token expired", 401);
            }
            if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
                throw new customError_1.CustomError("Invalid access token", 401);
            }
            throw error;
        }
    }
    static verifyRefreshToken(token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, env_1.default.jwt.refreshsecret);
            if (decoded.type !== "refresh") {
                throw new customError_1.CustomError("Invalid token type", 401);
            }
            return decoded;
        }
        catch (error) {
            if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
                throw new customError_1.CustomError("Refresh token expired", 401);
            }
            if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
                throw new customError_1.CustomError("Invalid refresh token", 401);
            }
            throw error;
        }
    }
    static decodeToken(token) {
        try {
            return jsonwebtoken_1.default.decode(token);
        }
        catch {
            return null;
        }
    }
}
exports.JWTUtils = JWTUtils;
const verifyAccessToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            res.status(401).json({
                success: false,
                error: "No authorization header provided"
            });
            return;
        }
        if (!authHeader.startsWith("Bearer ")) {
            res.status(401).json({
                success: false,
                error: "Invalid authorization format. Use: Bearer <token>"
            });
            return;
        }
        const token = authHeader.substring(7);
        if (!token) {
            res.status(401).json({
                success: false,
                error: "No token provided"
            });
            return;
        }
        const decoded = JWTUtils.verifyAccessToken(token);
        req.user = {
            id: decoded.userId,
            email: decoded.email,
            userName: decoded.userName,
            role: decoded.role,
        };
        next();
    }
    catch (error) {
        if (error instanceof customError_1.CustomError) {
            res.status(error.statusCode).json({
                success: false,
                error: error.message
            });
            return;
        }
        res.status(401).json({
            success: false,
            error: "Authentication failed"
        });
    }
};
exports.verifyAccessToken = verifyAccessToken;
const requireRole = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            res.status(401).json({
                success: false,
                error: "Authentication required"
            });
            return;
        }
        if (!allowedRoles.includes(req.user.role)) {
            res.status(403).json({
                success: false,
                error: `Access denied. Required roles: ${allowedRoles.join(", ")}`
            });
            return;
        }
        next();
    };
};
exports.requireRole = requireRole;
const optionalAuth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            next();
            return;
        }
        const token = authHeader.substring(7);
        if (token) {
            const decoded = JWTUtils.verifyAccessToken(token);
            req.user = {
                id: decoded.userId,
                email: decoded.email,
                userName: decoded.userName,
                role: decoded.role,
            };
        }
        next();
    }
    catch (error) {
        next();
    }
};
exports.optionalAuth = optionalAuth;
