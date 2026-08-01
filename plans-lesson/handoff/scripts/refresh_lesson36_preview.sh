#!/data/data/com.termux/files/usr/bin/bash
set -euo pipefail

cd /data/data/com.termux/files/home/madrasati-dz

ENGINE="src/features/lesson-v2/exercises-v2/PremiumExerciseEngineV2.tsx"
LESSON="src/features/lesson-v2/exercises-v2/Lesson36PremiumNumbersExercises.tsx"
PID_FILE="$HOME/.lesson36_preview.pid"
LOG_FILE="$HOME/lesson36_preview.log"

echo "=== التحقق من التعديلات ==="

grep -nE \
  'visualEmoji|visualCount|quantityVisual|showPromptBox' \
  "$ENGINE" "$LESSON" || {
    echo "❌ التعديلات غير موجودة في الملفات."
    exit 1
  }

echo
echo "✅ التعديلات موجودة."

if [ -f "$PID_FILE" ]; then
  PID="$(cat "$PID_FILE" 2>/dev/null || true)"
  if [ -n "$PID" ] && kill -0 "$PID" 2>/dev/null; then
    kill "$PID" || true
    sleep 2
  fi
fi

rm -rf node_modules/.vite
rm -f "$LOG_FILE"

npm run dev -- --host 0.0.0.0 --port 5173 \
  >"$LOG_FILE" 2>&1 &

NEW_PID=$!
echo "$NEW_PID" > "$PID_FILE"

sleep 4

if ! kill -0 "$NEW_PID" 2>/dev/null; then
  echo "❌ فشل تشغيل الخادم:"
  cat "$LOG_FILE"
  exit 1
fi

echo
echo "✅ أُعيد تشغيل المعاينة دون كاش."
echo "افتح:"
echo "http://127.0.0.1:5173/lesson-v2/36/exercises?refresh=$(date +%s)"
echo
tail -n 8 "$LOG_FILE"
