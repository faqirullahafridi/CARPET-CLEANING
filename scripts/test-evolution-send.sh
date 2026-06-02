#!/bin/sh
set -e

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ENV_FILE="$ROOT/evolution/.env"

if [ -f "$ENV_FILE" ]; then
  set -a
  # shellcheck disable=SC1090
  . "$ENV_FILE"
  set +a
fi

BASE_URL="${EVOLUTION_BASE_URL:-http://localhost:8080}"
API_KEY="${EVOLUTION_API_KEY:-${AUTHENTICATION_API_KEY:-}}"
INSTANCE="${EVOLUTION_INSTANCE:-carpet-cleaning}"
ADMIN_NUMBER="${EVOLUTION_ADMIN_NUMBER:-447533552015}"
TEXT="${1:-Evolution API test from Carpet Cleaning}"

if [ -z "$API_KEY" ]; then
  echo "EVOLUTION_API_KEY not set. Run: pnpm run evolution:setup"
  exit 1
fi

echo "Checking connection state for instance: $INSTANCE"
curl -sS "$BASE_URL/instance/connectionState/$INSTANCE" \
  -H "apikey: $API_KEY" \
  -H "Accept: application/json" | head -c 500
echo ""
echo ""

echo "Sending test message to $ADMIN_NUMBER ..."
curl -sS -X POST "$BASE_URL/message/sendText/$INSTANCE" \
  -H "apikey: $API_KEY" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d "{\"number\":\"$ADMIN_NUMBER\",\"textMessage\":{\"text\":\"$TEXT\"},\"linkPreview\":false}"

echo ""
echo ""
echo "Done. Check WhatsApp on +$ADMIN_NUMBER"
