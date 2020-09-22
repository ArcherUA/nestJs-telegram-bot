import { getEnv } from '../common/utils/get-env';
import { envSchema } from './required-env.config';

const {
  USD_RATE_ARCHIVE_DB_PORT,
  USD_RATE_ARCHIVE_DB_HOST,
  USD_RATE_ARCHIVE_DB_NAME,
  USD_RATE_ARCHIVE_DB_USER,
  USD_RATE_ARCHIVE_DB_PASSWORD,
} = getEnv(envSchema);

export {
  USD_RATE_ARCHIVE_DB_PORT,
  USD_RATE_ARCHIVE_DB_HOST,
  USD_RATE_ARCHIVE_DB_NAME,
  USD_RATE_ARCHIVE_DB_USER,
  USD_RATE_ARCHIVE_DB_PASSWORD,
};
