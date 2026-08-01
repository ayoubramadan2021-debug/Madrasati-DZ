#!/data/data/com.termux/files/usr/bin/bash
set -euo pipefail

cd /data/data/com.termux/files/home/madrasati-dz

PORT=5173
PID_FILE="$HOME/.lesson36_preview.pid"
LOG_FILE="$HOME/lesson36_preview.log"

if [ -f "$PID_FILE" ]; then
  PID="$(cat "$PID_FILE" 2>/dev/null || true)"
  [ -z "$PID" ] || kill "$PID" 2>/dev/null || true
fi

pkill -f "vite.*--port $PORT" 2>/dev/null || true
rm -rf node_modules/.vite
sleep 2

npm run dev -- --host 0.0.0.0 --port "$PORT" >"$LOG_FILE" 2>&1 &
PID=$!
echo "$PID" > "$PID_FILE"

sleep 4
kill -0 "$PID" 2>/dev/null || {
  cat "$LOG_FILE"
  exit 1
}

URL="http://127.0.0.1:$PORT/lesson-v2/36/exercises?v=$(date +%s)"

echo "✅ المعاينة الجديدة تعمل:"
echo "$URL"

termux-open-url "$URL" 2>/dev/null || true
