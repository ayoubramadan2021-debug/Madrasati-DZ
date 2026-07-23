#!/data/data/com.termux/files/usr/bin/bash
set -euo pipefail

cd /data/data/com.termux/files/home/madrasati-dz

FILE="src/features/lesson-v2/exercises-v2/Lesson36PremiumNumbersExercises.tsx"
OUTPUT="${TMPDIR:-$PREFIX/tmp}/lesson36-check.js"

[ -f "$FILE" ] || {
  echo "خطأ: ملف النشاط غير موجود."
  exit 1
}

mkdir -p "$(dirname "$OUTPUT")"
rm -f "$OUTPUT"

npx --yes esbuild "$FILE" \
  --bundle \
  --format=esm \
  --platform=browser \
  --outfile="$OUTPUT"

echo
echo "✅ ملف نشاط lesson36 سليم وقابل للتجميع."
echo "الحجم: $(wc -c < "$OUTPUT" | tr -d ' ') bytes"

rm -f "$OUTPUT"
