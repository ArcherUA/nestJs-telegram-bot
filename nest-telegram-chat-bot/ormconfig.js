const {
  USD_RATE_ARCHIVE_DB_HOST,
  USD_RATE_ARCHIVE_DB_PORT,
  USD_RATE_ARCHIVE_DB_NAME,
  USD_RATE_ARCHIVE_DB_USER,
  USD_RATE_ARCHIVE_DB_PASSWORD,
} = process.env;

module.exports = [
  {
    'type': 'postgres',
    'host': USD_RATE_ARCHIVE_DB_HOST,
    'port': USD_RATE_ARCHIVE_DB_PORT,
    'database': USD_RATE_ARCHIVE_DB_NAME,
    'username': USD_RATE_ARCHIVE_DB_USER,
    'password': USD_RATE_ARCHIVE_DB_PASSWORD,
    'autoSchemaSync': false,
    'entities': ['./src/common/entities/*.entity.ts'],
    'migrations': [
      './src/migrations/*.ts',
    ],
    cli: {
      'migrationsDir': './src/migrations',
    },
  },
];
