#!/bin/sh
set -e

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
EVOLUTION_DIR="$ROOT/evolution"
ENV_FILE="$EVOLUTION_DIR/.env"
INSTANCE="${EVOLUTION_INSTANCE:-carpet-cleaning}"

if ! command -v docker >/dev/null 2>&1; then
  echo "Docker is not installed. Install Docker Desktop or use a VPS with Docker."
  exit 1
fi

mkdir -p "$EVOLUTION_DIR"

if [ ! -f "$ENV_FILE" ]; then
  API_KEY="$(openssl rand -hex 16 2>/dev/null || head -c 16 /dev/urandom | xxd -p)"
  cat > "$ENV_FILE" <<EOF
SERVER_URL=http://localhost:8080
AUTHENTICATION_API_KEY=${API_KEY}
AUTHENTICATION_EXPOSE_IN_FETCH_INSTANCES=true
DATABASE_PROVIDER=postgresql
DATABASE_CONNECTION_URI=postgresql://evolution:evolution@postgres:5432/evolution?schema=evolution_api
CACHE_REDIS_ENABLED=true
CACHE_REDIS_URI=redis://redis:6379/6
DEL_INSTANCE=false
TELEMETRY_ENABLED=false
EOF
  echo "Created evolution/.env with a new API key."
  echo "Copy AUTHENTICATION_API_KEY to Vercel as EVOLUTION_API_KEY"
else
  set -a
  # shellcheck disable=SC1090
  . "$ENV_FILE"
  set +a
  API_KEY="${AUTHENTICATION_API_KEY:-}"
fi

echo "Pulling Evolution API image..."
docker pull evoapicloud/evolution-api:latest

echo "Starting Evolution API on http://localhost:8080 ..."
docker compose -f "$ROOT/docker-compose.evolution.yml" up -d

echo "Waiting for Evolution API to start..."
sleep 8

if [ -n "$API_KEY" ]; then
  echo "Creating WhatsApp instance: $INSTANCE"
  curl -sS -X POST "http://localhost:8080/instance/create" \
    -H "apikey: $API_KEY" \
    -H "Content-Type: application/json" \
    -d "{\"instanceName\":\"$INSTANCE\",\"qrcode\":true,\"integration\":\"WHATSAPP-BAILEYS\"}" \
    || echo "Instance may already exist — continuing."
  echo ""
fi

echo ""
echo "Next steps:"
echo "  1. Open http://localhost:8080/manager"
echo "  2. Log in with apikey from evolution/.env (AUTHENTICATION_API_KEY)"
echo "  3. Connect instance '$INSTANCE' — scan QR with WhatsApp"
echo ""
echo "  4. Add to your API / Vercel env:"
echo "       EVOLUTION_BASE_URL=http://localhost:8080   (or your public VPS URL)"
echo "       EVOLUTION_API_KEY=<AUTHENTICATION_API_KEY from evolution/.env>"
echo "       EVOLUTION_INSTANCE=$INSTANCE"
echo "       EVOLUTION_ADMIN_NUMBER=447533552015"
echo ""
echo "  5. Test: pnpm run evolution:test"
