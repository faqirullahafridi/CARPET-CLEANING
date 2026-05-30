#!/bin/sh
set -e

if [ -n "$DATABASE_URL" ]; then
  echo "Pushing database schema..."
  pnpm --filter @workspace/db run push
  pnpm --filter @workspace/db run seed || echo "Coupon seed skipped or failed (non-fatal)"
else
  echo "DATABASE_URL not set — skipping database schema push"
fi

pnpm --filter @workspace/api-server run build
pnpm --filter @workspace/freshlux run build
