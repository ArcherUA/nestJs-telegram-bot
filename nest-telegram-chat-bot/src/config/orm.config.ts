import { ConnectionOptions } from 'typeorm';
import {
  USD_RATE_ARCHIVE_DB_HOST,
  USD_RATE_ARCHIVE_DB_PORT,
  USD_RATE_ARCHIVE_DB_NAME,
  USD_RATE_ARCHIVE_DB_USER,
  USD_RATE_ARCHIVE_DB_PASSWORD,
} from './index';

export const USD_RATE_ARCHIVE_DB_CONFIG = {
  type: 'postgres',
  host: USD_RATE_ARCHIVE_DB_HOST,
  port: USD_RATE_ARCHIVE_DB_PORT,
  username: USD_RATE_ARCHIVE_DB_USER,
  password: USD_RATE_ARCHIVE_DB_PASSWORD,
  database: USD_RATE_ARCHIVE_DB_NAME,
  entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
  synchronize: false,
  migrations: [`${__dirname}/../migrations/**/*.migration.ts`],
  // logging: NODE_ENV !== 'production',
  logging: false,
  cli: {
    migrationsDir: 'src/migration',
  },
} as ConnectionOptions;
