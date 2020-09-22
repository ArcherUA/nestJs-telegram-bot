#!/bin/bash

set -e

while ! exec 6<>/dev/tcp/${USD_RATE_ARCHIVE_DB_HOST}/${USD_RATE_ARCHIVE_DB_PORT}; do
  echo "Trying to connect to DB ${USD_RATE_ARCHIVE_DB_HOST}/${USD_RATE_ARCHIVE_DB_PORT}"
  sleep 10
  echo "Retrying..."
done

echo "Running migrations and seeds..."

#yarn migrate:run

echo "Starting the USD rate archive..."

case "$NODE_ENV" in
  "debug")
      npm run start:debug
    ;;
  "local" | "development")
      npm run start:dev
    ;;
  "production")
      npm run start:prod
    ;;
esac
