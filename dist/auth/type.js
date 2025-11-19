"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthError = void 0;
// =====================================================
// ERROR TYPES
// =====================================================
class AuthError extends Error {
    constructor(message, statusCode = 500, code) {
        super(message);
        this.statusCode = statusCode;
        this.code = code;
        this.name = 'AuthError';
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AuthError = AuthError;
