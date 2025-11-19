"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const globalErrorHandler_1 = require("./middleware/globalErrorHandler");
const morgan_1 = require("./middleware/morgan");
const routes_1 = __importDefault(require("./routes"));
const createApp = () => {
    const app = (0, express_1.default)();
    const server = new http_1.Server(app);
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });
    app.use(morgan_1.successHandler);
    app.use(morgan_1.errorHandler);
    app.use((0, cors_1.default)());
    app.use((0, helmet_1.default)());
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use("/v1", routes_1.default);
    app.use(globalErrorHandler_1.globalErrorHandler);
    return { app, server, io };
};
exports.createApp = createApp;
