"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
exports.clearSchemaCache = clearSchemaCache;
exports.getCacheStats = getCacheStats;
const joi_1 = __importDefault(require("joi"));
const schemaCache = new Map();
const configHashes = new WeakMap();
function generateCacheKey(config) {
    const cached = configHashes.get(config);
    if (cached)
        return cached;
    const sortedKeys = Object.keys(config).sort();
    const hash = sortedKeys.map(k => `${k}:${JSON.stringify(config[k])}`).join('|');
    configHashes.set(config, hash);
    return hash;
}
const validate = (config, source = 'body', options = {}) => {
    const { allowUnknown = false, stripUnknown = true, cache = true, } = options;
    const schema = cache ? getCachedSchema(config) : buildSchema(config);
    return (req, res, next) => {
        try {
            const dataToValidate = req[source];
            if (!dataToValidate || typeof dataToValidate !== 'object') {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid request data',
                    errors: [{
                            field: source,
                            message: 'Request data must be a valid object',
                            type: 'invalid_type',
                        }],
                });
            }
            if (!allowUnknown) {
                const allowedKeys = Object.keys(config);
                const receivedKeys = Object.keys(dataToValidate);
                const unknownKeys = receivedKeys.filter(key => !allowedKeys.includes(key));
                if (unknownKeys.length > 0) {
                    return res.status(400).json({
                        success: false,
                        message: 'Unknown fields are not allowed',
                        errors: unknownKeys.map(key => ({
                            field: key,
                            message: `Field "${key}" is not allowed`,
                            type: 'not_allowed',
                        })),
                    });
                }
            }
            const { error, value } = schema.validate(dataToValidate, {
                abortEarly: false,
                allowUnknown,
                stripUnknown,
                presence: 'required',
            });
            if (error) {
                const errors = error.details.map((detail) => {
                    if (detail.type === 'object.unknown') {
                        return {
                            field: detail.path.join('.'),
                            message: `Field "${detail.path.join('.')}" is not allowed`,
                            type: 'not_allowed',
                        };
                    }
                    return {
                        field: detail.path.join('.'),
                        message: detail.message.replace(/["]/g, ''),
                        type: detail.type,
                    };
                });
                return res.status(400).json({
                    success: false,
                    message: errors.length === 1 ? errors[0].message : 'Validation failed',
                    errors,
                });
            }
            req[source] = value;
            next();
        }
        catch (err) {
            console.error('Validation middleware error:', err);
            return res.status(500).json({
                success: false,
                message: 'Internal validation error',
            });
        }
    };
};
exports.validate = validate;
function getCachedSchema(config) {
    const cacheKey = generateCacheKey(config);
    let schema = schemaCache.get(cacheKey);
    if (schema)
        return schema;
    schema = buildSchema(config);
    schemaCache.set(cacheKey, schema);
    return schema;
}
function buildSchema(config) {
    const schemaObj = {};
    for (const [key, rules] of Object.entries(config)) {
        schemaObj[key] = buildField(rules);
    }
    return joi_1.default.object(schemaObj).options({
        stripUnknown: true,
        abortEarly: false
    });
}
function buildField(rules) {
    let field;
    switch (rules.type) {
        case 'string':
            field = joi_1.default.string();
            if (rules.trim !== false)
                field = field.trim();
            if (rules.lowercase)
                field = field.lowercase();
            if (rules.uppercase)
                field = field.uppercase();
            if (rules.min !== undefined)
                field = field.min(rules.min);
            if (rules.max !== undefined)
                field = field.max(rules.max);
            if (rules.length !== undefined)
                field = field.length(rules.length);
            if (rules.pattern)
                field = field.pattern(rules.pattern);
            if (rules.email)
                field = field.email();
            if (rules.uri)
                field = field.uri();
            if (rules.uuid)
                field = field.uuid();
            if (rules.alphanum)
                field = field.alphanum();
            if (rules.enum && Array.isArray(rules.enum))
                field = field.valid(...rules.enum);
            if (rules.notEmpty)
                field = field.min(1);
            break;
        case 'number':
            field = joi_1.default.number();
            if (rules.min !== undefined)
                field = field.min(rules.min);
            if (rules.max !== undefined)
                field = field.max(rules.max);
            if (rules.integer)
                field = field.integer();
            if (rules.positive)
                field = field.positive();
            if (rules.negative)
                field = field.negative();
            if (rules.port)
                field = field.port();
            if (rules.greater !== undefined)
                field = field.greater(rules.greater);
            if (rules.less !== undefined)
                field = field.less(rules.less);
            break;
        case 'boolean':
            field = joi_1.default.boolean();
            if (rules.truthy)
                field = field.truthy(...(Array.isArray(rules.truthy) ? rules.truthy : [rules.truthy]));
            if (rules.falsy)
                field = field.falsy(...(Array.isArray(rules.falsy) ? rules.falsy : [rules.falsy]));
            break;
        case 'date':
            field = joi_1.default.date();
            if (rules.min)
                field = field.min(rules.min);
            if (rules.max)
                field = field.max(rules.max);
            if (rules.iso)
                field = field.iso();
            if (rules.greater)
                field = field.greater(rules.greater);
            if (rules.less)
                field = field.less(rules.less);
            break;
        case 'array':
            field = joi_1.default.array();
            if (rules.items)
                field = field.items(buildField(rules.items));
            if (rules.min !== undefined)
                field = field.min(rules.min);
            if (rules.max !== undefined)
                field = field.max(rules.max);
            if (rules.length !== undefined)
                field = field.length(rules.length);
            if (rules.unique)
                field = field.unique();
            break;
        case 'object':
            field = rules.schema ? buildSchema(rules.schema) : joi_1.default.object();
            if (rules.unknown !== true)
                field = field.unknown(false);
            break;
        case 'any':
            field = joi_1.default.any();
            break;
        default:
            field = joi_1.default.any();
    }
    if (rules.required === true) {
        field = field.required();
    }
    else if (rules.optional === true || rules.required === false) {
        field = field.optional();
    }
    if (rules.default !== undefined)
        field = field.default(rules.default);
    if (rules.allow !== undefined) {
        const allowValues = Array.isArray(rules.allow) ? rules.allow : [rules.allow];
        field = field.allow(...allowValues);
    }
    if (rules.forbidden)
        field = field.forbidden();
    if (rules.strip)
        field = field.strip();
    if (rules.messages)
        field = field.messages(rules.messages);
    if (rules.label)
        field = field.label(rules.label);
    if (rules.description)
        field = field.description(rules.description);
    return field;
}
function clearSchemaCache() {
    schemaCache.clear();
}
function getCacheStats() {
    return {
        size: schemaCache.size,
        keys: Array.from(schemaCache.keys()),
    };
}
