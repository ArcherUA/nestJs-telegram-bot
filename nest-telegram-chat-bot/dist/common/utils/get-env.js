"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnv = void 0;
const Joi = require("joi");
const logger_1 = require("./logger");
exports.getEnv = (envSchema) => {
    const { error, value } = Joi.validate(process.env, envSchema, {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true,
    });
    if (error) {
        error.details.map((e) => logger_1.logger.error(e.message));
        process.exit(1);
    }
    return value;
};
//# sourceMappingURL=get-env.js.map