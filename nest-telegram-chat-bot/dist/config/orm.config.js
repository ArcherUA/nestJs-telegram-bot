"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USD_RATE_ARCHIVE_DB_CONFIG = void 0;
const index_1 = require("./index");
exports.USD_RATE_ARCHIVE_DB_CONFIG = {
    type: 'postgres',
    host: index_1.USD_RATE_ARCHIVE_DB_HOST,
    port: index_1.USD_RATE_ARCHIVE_DB_PORT,
    username: index_1.USD_RATE_ARCHIVE_DB_USER,
    password: index_1.USD_RATE_ARCHIVE_DB_PASSWORD,
    database: index_1.USD_RATE_ARCHIVE_DB_NAME,
    entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
    synchronize: false,
    migrations: [`${__dirname}/../migrations/**/*.migration.ts`],
    logging: false,
    cli: {
        migrationsDir: 'src/migration',
    },
};
//# sourceMappingURL=orm.config.js.map