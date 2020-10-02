"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envSchema = void 0;
const Joi = require("joi");
exports.envSchema = Joi.object({
    NODE_ENV: Joi.string()
        .valid(['development', 'production', 'local', 'debug'])
        .required(),
    USD_RATE_ARCHIVE_DB_PORT: Joi.number().default(30879),
    USD_RATE_ARCHIVE_DB_HOST: Joi.string().default('usd_rate_archive_db'),
    USD_RATE_ARCHIVE_DB_NAME: Joi.string().default('usd_rate_archive_db'),
    USD_RATE_ARCHIVE_DB_USER: Joi.string().default('root'),
    USD_RATE_ARCHIVE_DB_PASSWORD: Joi.string().default('root'),
});
//# sourceMappingURL=required-env.config.js.map