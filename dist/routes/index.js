"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const logger_1 = __importDefault(require("../utils/logger"));
const router = express_1.default.Router();
const baseDir = path_1.default.join(__dirname, "..");
function loadRoutesFromDir(dirPath) {
    const items = fs_1.default.readdirSync(dirPath, { withFileTypes: true });
    items.forEach((item) => {
        const fullPath = path_1.default.join(dirPath, item.name);
        if (item.isDirectory()) {
            loadRoutesFromDir(fullPath);
        }
        else if (item.isFile() &&
            (item.name === "route.ts" || item.name === "route.js")) {
            try {
                const routeModule = require(fullPath);
                const routeBaseName = path_1.default.basename(path_1.default.dirname(fullPath));
                // Handle both default and named exports
                const routerExport = routeModule.default || routeModule;
                if (routerExport && typeof routerExport === "function") {
                    router.use(`/${routeBaseName}`, routerExport);
                    logger_1.default.info(`✓ Loaded route: /v1/${routeBaseName}`);
                }
                else {
                    logger_1.default.warn(`✗ Skipped ${fullPath}: Invalid router export (not a function)`);
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    logger_1.default.error(`✗ Error loading ${fullPath}: ${error.message}`);
                    logger_1.default.error(`Stack: ${error.stack}`);
                }
            }
        }
    });
}
try {
    loadRoutesFromDir(baseDir);
    logger_1.default.info("✅ Route loading completed successfully");
}
catch (error) {
    logger_1.default.error("❌ Failed to initialize routes:", error);
    throw error;
}
exports.default = router;
