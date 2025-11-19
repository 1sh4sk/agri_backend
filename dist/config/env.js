"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const joi_1 = __importDefault(require("joi"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, "../../.env") });
const envVarsSchema = joi_1.default.object({
    NODE_ENV: joi_1.default.string().valid("production", "development", "test").required(),
    PORT: joi_1.default.number().default(3000),
    MONGODB_URL: joi_1.default.string().required().description("MongoDB connection URL"),
    SUPABASE_DB_URL: joi_1.default.string()
        .uri()
        .required()
        .description("Supabase PostgreSQL connection URL"),
    SUPABASE_DB_HOST: joi_1.default.string().allow("").description("Supabase DB host"),
    SUPABASE_DB_PORT: joi_1.default.number().allow(null).description("Supabase DB port"),
    SUPABASE_DB_USER: joi_1.default.string().allow("").description("Supabase DB username"),
    SUPABASE_DB_PASSWORD: joi_1.default.string()
        .allow("")
        .description("Supabase DB password"),
    SUPABASE_DB_NAME: joi_1.default.string().allow("").description("Supabase DB name"),
    JWT_ACCESS_SECRET: joi_1.default.string()
        .required()
        .description("JWT accessnsecret key"),
    JWT_REFRESH_SECRET: joi_1.default.string()
        .required()
        .description("JWT refresh secret key"),
    JWT_ACCESS_EXPIRATION_MINUTES: joi_1.default.string()
        .pattern(/^\d+(s|m|h|d)$/)
        .required()
        .description("Access token expiration e.g. 30m, 1h, 7d"),
    JWT_REFRESH_EXPIRATION_DAYS: joi_1.default.string()
        .pattern(/^\d+(s|m|h|d)$/)
        .required()
        .description("Refresh token expiration e.g. 30d, 60d"),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: joi_1.default.number()
        .default(10)
        .description("Minutes after which reset password token expires"),
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: joi_1.default.number()
        .default(10)
        .description("Minutes after which verify email token expires"),
    SMTP_HOST: joi_1.default.string().allow("").description("SMTP server host"),
    SMTP_PORT: joi_1.default.number().allow(null).description("SMTP server port"),
    SMTP_USERNAME: joi_1.default.string().allow("").description("SMTP username"),
    SMTP_PASSWORD: joi_1.default.string().allow("").description("SMTP password"),
    EMAIL_FROM: joi_1.default.string().allow("").description("Sender email address"),
    DO_SPACES_ENDPOINT: joi_1.default.string()
        .required()
        .description("DigitalOcean Spaces endpoint"),
    DO_SPACES_REGION: joi_1.default.string()
        .required()
        .description("DigitalOcean Spaces region"),
    DO_SPACES_ACCESS_KEY_ID: joi_1.default.string()
        .required()
        .description("DigitalOcean Spaces access key ID"),
    DO_SPACES_SECRET_ACCESS_KEY: joi_1.default.string()
        .required()
        .description("DigitalOcean Spaces secret access key"),
    DO_SPACES_FOLDER_PATH: joi_1.default.string()
        .pattern(/^(\w+\/)*$/)
        .required()
        .description("Folder path in DigitalOcean Spaces"),
    DO_SPACES_URL: joi_1.default.string()
        .required()
        .description("DigitalOcean Spaces facesync url"),
}).unknown();
const { value: envVars, error } = envVarsSchema
    .prefs({ errors: { label: "key" } })
    .validate(process.env);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}
const envConfig = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    mongoose: {
        url: envVars.MONGODB_URL + (envVars.NODE_ENV === "test" ? "-test" : ""),
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    },
    postgres: {
        url: envVars.SUPABASE_DB_URL,
        host: envVars.SUPABASE_DB_HOST,
        port: envVars.SUPABASE_DB_PORT,
        user: envVars.SUPABASE_DB_USER,
        password: envVars.SUPABASE_DB_PASSWORD,
        database: envVars.SUPABASE_DB_NAME,
    },
    jwt: {
        accesssecret: envVars.JWT_ACCESS_SECRET,
        refreshsecret: envVars.JWT_REFRESH_SECRET,
        accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
        refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
        resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
        verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
    },
    email: {
        smtp: {
            host: envVars.SMTP_HOST || "",
            port: envVars.SMTP_PORT || 0,
            auth: {
                user: envVars.SMTP_USERNAME || "",
                pass: envVars.SMTP_PASSWORD || "",
            },
        },
        from: envVars.EMAIL_FROM || "",
    },
    doSpaces: {
        endpoint: envVars.DO_SPACES_ENDPOINT,
        region: envVars.DO_SPACES_REGION,
        accessKeyId: envVars.DO_SPACES_ACCESS_KEY_ID,
        secretAccessKey: envVars.DO_SPACES_SECRET_ACCESS_KEY,
        folderPath: envVars.DO_SPACES_FOLDER_PATH,
        spaceUrl: envVars.DO_SPACES_URL,
    },
    cookies: {
        httpOnly: true,
        secure: envVars.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    },
};
exports.default = envConfig;
