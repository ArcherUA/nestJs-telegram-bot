"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USD_RATE_ARCHIVE_DB_PASSWORD = exports.USD_RATE_ARCHIVE_DB_USER = exports.USD_RATE_ARCHIVE_DB_NAME = exports.USD_RATE_ARCHIVE_DB_HOST = exports.USD_RATE_ARCHIVE_DB_PORT = void 0;
const get_env_1 = require("../common/utils/get-env");
const required_env_config_1 = require("./required-env.config");
const { USD_RATE_ARCHIVE_DB_PORT, USD_RATE_ARCHIVE_DB_HOST, USD_RATE_ARCHIVE_DB_NAME, USD_RATE_ARCHIVE_DB_USER, USD_RATE_ARCHIVE_DB_PASSWORD, } = get_env_1.getEnv(required_env_config_1.envSchema);
exports.USD_RATE_ARCHIVE_DB_PORT = USD_RATE_ARCHIVE_DB_PORT;
exports.USD_RATE_ARCHIVE_DB_HOST = USD_RATE_ARCHIVE_DB_HOST;
exports.USD_RATE_ARCHIVE_DB_NAME = USD_RATE_ARCHIVE_DB_NAME;
exports.USD_RATE_ARCHIVE_DB_USER = USD_RATE_ARCHIVE_DB_USER;
exports.USD_RATE_ARCHIVE_DB_PASSWORD = USD_RATE_ARCHIVE_DB_PASSWORD;
//# sourceMappingURL=index.js.map