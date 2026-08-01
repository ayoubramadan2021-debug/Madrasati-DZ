#!/data/data/com.termux/files/usr/bin/bash
set -e

cd /data/data/com.termux/files/home/madrasati-dz

FILE="src/features/lesson-v2/exercises-v2/Lesson36PremiumNumbersExercises.tsx"

echo "=== آخر أسطر الملف ==="
tail -n 12 "$FILE"

echo
echo "=== فحص TSX منفردًا ==="
npx esbuild "$FILE" \
  --bundle \
  --format=esm \
  --platform=browser \
  --outfile=/tmp/lesson36-check.js

echo
echo "✅ ملف lesson36 سليم وقابل للتجميع."
rm -f /tmp/lesson36-check.js
