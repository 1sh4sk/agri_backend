"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importStar(require("multer"));
const http_status_1 = __importDefault(require("http-status"));
const customError_1 = require("../utils/customError");
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({
    storage,
    // limits: {
    //   fileSize: 5 * 1024 * 1024, // 5MB limit
    //   files: 5 // Maximum 5 files at once
    // },
    // fileFilter: (req, file, cb) => {
    //   const allowedMimes = ["image/jpeg", "image/png", "image/gif"];
    //   if (allowedMimes.includes(file.mimetype)) {
    //     cb(null, true);
    //   } else {
    //     cb(new Error("Invalid file type"));
    //   }
    // },
}).any();
const processFiles = (files) => {
    return files.reduce((acc, file) => {
        if (file.buffer && file.size > 0) {
            if (!acc[file.fieldname]) {
                acc[file.fieldname] = [];
            }
            acc[file.fieldname].push(file);
        }
        return acc;
    }, {});
};
const dynamicUpload = (req, res, next) => {
    upload(req, res, (err) => {
        if (err instanceof multer_1.MulterError) {
            return next(new customError_1.CustomError(`File upload failed: ${err.message}`, http_status_1.default.BAD_REQUEST));
        }
        if (err) {
            return next(new customError_1.CustomError(err.message, http_status_1.default.INTERNAL_SERVER_ERROR));
        }
        const multerReq = req;
        if (multerReq.files?.length) {
            multerReq.uploadedFiles = processFiles(multerReq.files);
        }
        else {
            multerReq.uploadedFiles = {};
        }
        next();
    });
};
exports.default = dynamicUpload;
