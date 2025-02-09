#!/bin/bash

# Wait for Postgres to be ready using telnet
echo "Waiting for Postgres to be ready..."
until telnet postgres-db 5432; do
  sleep 1
done

echo "Postgres is up and running!"

# Run migrations
echo "Running migrations..."
npm run db:migrate

# Run seeds (if any)
echo "Running seeds..."
npm run seed

# Start the Express app
echo "Starting Express app..."
npm start
