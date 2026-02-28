#!/bin/sh
set -e

echo "=== Bellas Glamour - Startup ==="
echo "Environment: $NODE_ENV"

# --- Step 1: Run Prisma migrations ---
echo "Running Prisma migrations..."
if prisma migrate deploy --schema=./prisma/schema.prisma 2>&1; then
  echo "✅ Migrations applied successfully"
else
  echo "⚠️  Migration failed — attempting db push as fallback..."
  if prisma db push --schema=./prisma/schema.prisma --accept-data-loss 2>&1; then
    echo "✅ Schema pushed successfully (fallback)"
  else
    echo "❌ Both migration and push failed. Starting app anyway..."
  fi
fi

# --- Step 2: Start the application ---
echo "Starting Next.js server on port ${PORT:-3000}..."
exec node server.js
