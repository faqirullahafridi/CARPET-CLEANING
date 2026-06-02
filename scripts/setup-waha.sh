#!/bin/sh
set -e

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
WAHA_DIR="$ROOT/waha"

if ! command -v docker >/dev/null 2>&1; then
  echo "Docker is not installed."
  echo "Install Docker from https://docs.docker.com/get-docker/ then run this script again."
  exit 1
fi

mkdir -p "$WAHA_DIR/sessions"

if [ ! -f "$WAHA_DIR/.env" ]; then
  echo "Initializing WAHA credentials in waha/.env ..."
  docker run --rm -v "$WAHA_DIR:/app/env" devlikeapro/waha init-waha /app/env
  echo ""
  echo "Saved waha/.env — copy WAHA_API_KEY into Vercel / API env as WAHA_API_KEY"
fi

echo "Pulling WAHA image..."
docker pull devlikeapro/waha

echo "Starting WAHA on http://localhost:3000 ..."
docker compose -f "$ROOT/docker-compose.waha.yml" up -d

echo ""
echo "Next steps:"
echo "  1. Open http://localhost:3000/dashboard"
echo "  2. Log in with WAHA_DASHBOARD_USERNAME / WAHA_DASHBOARD_PASSWORD from waha/.env"
echo "  3. Connect using WAHA_API_KEY from waha/.env"
echo "  4. Start session 'default' and scan the WhatsApp QR code"
echo "  5. Set API env vars:"
echo "       WAHA_BASE_URL=http://localhost:3000   (or your public WAHA URL)"
echo "       WAHA_API_KEY=<from waha/.env>"
echo "       WAHA_SESSION=default"
echo "       WAHA_ADMIN_CHAT_ID=923109766610@c.us"
echo ""
echo "Test send:"
echo '  curl -X POST http://localhost:3000/api/sendText \'
echo '    -H "X-Api-Key: YOUR_KEY" -H "Content-Type: application/json" \'
echo '    -d '"'"'{"session":"default","chatId":"923109766610@c.us","text":"WAHA test from Carpet Cleaning"}'"'"
