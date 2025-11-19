"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const library_1 = require("@prisma/client/runtime/library");
const customError_1 = require("../utils/customError");
const logger_1 = __importDefault(require("../utils/logger"));
const globalErrorHandler = (err, req, res, next) => {
    let error = err;
    // Handle Prisma errors
    if (err instanceof library_1.PrismaClientKnownRequestError) {
        error = handlePrismaError(err);
    }
    if (error instanceof customError_1.CustomError) {
        return res.status(error.statusCode).json({
            success: false,
            message: error.message,
            errors: error.errors,
            ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
        });
    }
    // Unhandled errors
    logger_1.default.error('Unhandled error:', error);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        ...(process.env.NODE_ENV === 'development' && {
            error: error.message,
            stack: error.stack
        })
    });
};
exports.globalErrorHandler = globalErrorHandler;
function handlePrismaError(error) {
    switch (error.code) {
        case 'P2002':
            return new customError_1.CustomError('A record with this value already exists', 409, [{ field: error.meta?.target, message: 'Must be unique' }]);
        case 'P2025':
            return new customError_1.CustomError('Record not found', 404);
        case 'P2003':
            return new customError_1.CustomError('Invalid reference', 400);
        default:
            return new customError_1.CustomError('Database operation failed', 500);
    }
}
