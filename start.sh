#!/usr/bin/env bash
set -e

port="$1"
shift

while !</dev/tcp/postgres/5432; do
  >&2 echo "$port Application is not ready - sleeping"
  sleep 1
done

>&2 echo "Application is up - executing command"

rm -rf node_modules/
npm install
npm run migrate
npm run seed
npm start

