"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const app_1 = require("./app");
const logger_1 = __importDefault(require("./utils/logger"));
const env_1 = __importDefault(require("./config/env"));
const client_1 = require("@prisma/client");
const port = env_1.default.port || 4000;
let serverInstance = null;
let io = null;
let serverStarted = false;
exports.prisma = new client_1.PrismaClient({
    datasources: {
        db: {
            url: env_1.default.postgres.url
        },
    },
    log: ['query', 'error', 'warn'],
});
(async () => {
    try {
        await exports.prisma.$connect();
        logger_1.default.info("✅ Connected to Supabase PostgreSQL via Prisma");
        if (!serverStarted) {
            const { server, io: socketIO } = (0, app_1.createApp)();
            io = socketIO;
            serverInstance = server.listen(port, () => {
                serverStarted = true;
                logger_1.default.info("⚡ Socket.IO server initialized");
                logger_1.default.info(`🚀 Server is running on port ${port}`);
            });
        }
    }
    catch (error) {
        logger_1.default.error("❌ Error connecting to PostgreSQL:", error);
        process.exit(1);
    }
})();
const gracefulShutdown = async () => {
    try {
        if (serverInstance) {
            await new Promise((resolve) => {
                serverInstance?.close(() => {
                    logger_1.default.info("🛑 HTTP server closed");
                    resolve();
                });
            });
        }
        if (io) {
            await new Promise((resolve) => {
                io?.close(() => {
                    logger_1.default.info("🛑 Socket.IO server closed");
                    resolve();
                });
            });
        }
        await exports.prisma.$disconnect();
        logger_1.default.info("🛑 Prisma PostgreSQL connection closed");
        process.exit(0);
    }
    catch (error) {
        logger_1.default.error("Error during graceful shutdown:", error);
        process.exit(1);
    }
};
const unexpectedErrorHandler = (error) => {
    logger_1.default.error("💥 Unexpected error:", error);
    gracefulShutdown();
};
process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);
process.on("SIGTERM", () => {
    logger_1.default.info("SIGTERM received");
    gracefulShutdown();
});
process.on("SIGINT", () => {
    logger_1.default.info("SIGINT received");
    gracefulShutdown();
});
