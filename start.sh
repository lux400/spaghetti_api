#!/usr/bin/env bash
set -e

port="$1"
shift
cmd="$@"

npm run migrate
npm run seed
npm start

until lsof -i:"$port"; do
  >&2 echo "Application is not ready - sleeping"
  sleep 1
done

>&2 echo "Application is up - executing command"
exec $cmd
