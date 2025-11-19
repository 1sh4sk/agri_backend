"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadMultipleFiles = exports.processAndUploadFiles = exports.uploadFile = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const lib_storage_1 = require("@aws-sdk/lib-storage");
const uuid_1 = require("uuid");
const path_1 = __importDefault(require("path"));
const env_1 = __importDefault(require("../config/env"));
const logger_1 = __importDefault(require("./logger"));
const s3Client = new client_s3_1.S3Client({
    region: env_1.default.doSpaces.region,
    endpoint: env_1.default.doSpaces.endpoint,
    credentials: {
        accessKeyId: env_1.default.doSpaces.accessKeyId,
        secretAccessKey: env_1.default.doSpaces.secretAccessKey,
    },
});
const baseUrl = env_1.default.doSpaces.spaceUrl;
const defaultFolderPath = env_1.default.doSpaces.folderPath;
class ConcurrentQueue {
    constructor(concurrency) {
        this.concurrency = concurrency;
        this.queue = [];
        this.running = 0;
    }
    async add(fn) {
        if (this.running >= this.concurrency) {
            await new Promise(resolve => {
                this.queue.push(() => {
                    resolve();
                    return Promise.resolve();
                });
            });
        }
        this.running++;
        try {
            const result = await fn();
            return result;
        }
        finally {
            this.running--;
            if (this.queue.length > 0) {
                const next = this.queue.shift();
                if (next)
                    next();
            }
        }
    }
}
const uploadQueue = new ConcurrentQueue(3);
const getFileExtension = (() => {
    const cache = new Map();
    return (filename) => {
        if (cache.has(filename)) {
            return cache.get(filename);
        }
        const ext = path_1.default.extname(filename);
        cache.set(filename, ext);
        return ext;
    };
})();
const uploadFile = async (file, customFolderPath) => {
    try {
        const fileExtension = getFileExtension(file.originalname);
        const fileName = `${(0, uuid_1.v4)()}${fileExtension}`;
        const folderPath = `${defaultFolderPath}${customFolderPath ?? ''}`;
        const key = `${folderPath}${fileName}`;
        const upload = new lib_storage_1.Upload({
            client: s3Client,
            params: {
                Bucket: "facesync",
                Key: key,
                Body: file.buffer,
                ContentType: file.mimetype,
                ACL: "public-read",
            },
            queueSize: 4,
            partSize: 20 * 1024 * 1024,
            leavePartsOnError: false,
        });
        await upload.done();
        return {
            url: `${baseUrl}${key}`,
            key,
            originalName: file.originalname,
        };
    }
    catch (error) {
        logger_1.default.error("Error uploading file to S3:", error);
        throw new Error(`Failed to upload file ${file.originalname}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
};
exports.uploadFile = uploadFile;
const processAndUploadFiles = async (reqFiles, customFolderPath) => {
    if (!reqFiles?.length)
        return [];
    const files = reqFiles.map((file) => ({
        originalname: file.originalname,
        buffer: file.buffer,
        mimetype: file.mimetype,
        size: file.size,
    }));
    return (0, exports.uploadMultipleFiles)(files, customFolderPath);
};
exports.processAndUploadFiles = processAndUploadFiles;
const uploadMultipleFiles = async (files, customFolderPath) => {
    if (!files?.length)
        return [];
    try {
        const uploadPromises = files.map(file => uploadQueue.add(() => (0, exports.uploadFile)(file, customFolderPath)));
        return Promise.all(uploadPromises);
    }
    catch (error) {
        logger_1.default.error("Error in bulk upload:", error);
        throw new Error(`Failed to upload multiple files: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
};
exports.uploadMultipleFiles = uploadMultipleFiles;
