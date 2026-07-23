#!/data/data/com.termux/files/usr/bin/bash
set -euo pipefail

cd /data/data/com.termux/files/home/madrasati-dz

PID_FILE="$HOME/.lesson36_preview.pid"
LOG_FILE="$HOME/lesson36_preview.log"
PORT="5173"

if [ -f "$PID_FILE" ]; then
  OLD_PID="$(cat "$PID_FILE" 2>/dev/null || true)"
  if [ -n "$OLD_PID" ] && kill -0 "$OLD_PID" 2>/dev/null; then
    kill "$OLD_PID" 2>/dev/null || true
    sleep 1
  fi
  rm -f "$PID_FILE"
fi

npm run dev -- --host 0.0.0.0 --port "$PORT" >"$LOG_FILE" 2>&1 &
PID=$!
echo "$PID" > "$PID_FILE"

sleep 3

if ! kill -0 "$PID" 2>/dev/null; then
  echo "فشل تشغيل المعاينة:"
  cat "$LOG_FILE"
  exit 1
fi

echo "=== معاينة نشاط الدرس 36 ==="
echo "الرابط:"
echo "http://127.0.0.1:$PORT/lesson-v2/36/exercises"
echo
echo "PID: $PID"
echo "السجل: $LOG_FILE"
echo
tail -n 12 "$LOG_FILE"
