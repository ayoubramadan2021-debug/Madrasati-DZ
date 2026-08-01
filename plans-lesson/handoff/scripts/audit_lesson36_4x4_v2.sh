#!/data/data/com.termux/files/usr/bin/bash
set -euo pipefail

cd /data/data/com.termux/files/home/madrasati-dz

FILE="src/features/lesson-v2/exercises-v2/Lesson36PremiumNumbersExercises.tsx"
AUDIO_DIR="public/audio/teachers/khalil/lesson_36_amusement_sorting/exercises"
LOG="${TMPDIR:-$PREFIX/tmp}/lesson36_build.log"

echo "=== فحص 4 × 4 ==="

QUESTIONS="$(grep -c 'key: "m[1-4]_q[1-4]"' "$FILE")"
MISSIONS="$(grep -c 'id: "\(count-tap\|number-choice\|build-number\|representation-match\)"' "$FILE")"

echo "التمارين: $MISSIONS"
echo "الأسئلة: $QUESTIONS"

[ "$MISSIONS" -eq 4 ] || {
  echo "❌ عدد التمارين ليس 4"
  exit 1
}

[ "$QUESTIONS" -eq 16 ] || {
  echo "❌ عدد الأسئلة ليس 16"
  exit 1
}

echo
echo "=== فحص ملفات الصوت المطلوبة ==="

MISSING=0

grep -oE 'audio\("[^"]+"\)' "$FILE" |
  sed -E 's/audio\("([^"]+)"\)/\1/' |
  sort -u |
  while IFS= read -r KEY; do
    if [ -s "$AUDIO_DIR/$KEY.mp3" ] &&
       [ -s "$AUDIO_DIR/$KEY.json" ] &&
       python -m json.tool "$AUDIO_DIR/$KEY.json" >/dev/null 2>&1; then
      echo "✅ $KEY"
    else
      echo "❌ $KEY"
      touch "${TMPDIR:-$PREFIX/tmp}/lesson36_missing"
    fi
  done

if [ -f "${TMPDIR:-$PREFIX/tmp}/lesson36_missing" ]; then
  rm -f "${TMPDIR:-$PREFIX/tmp}/lesson36_missing"
  echo "❌ توجد ملفات صوت أو JSON ناقصة."
  exit 1
fi

echo
echo "=== فحص البناء ==="

rm -f "$LOG"

if npm run build >"$LOG" 2>&1; then
  tail -n 4 "$LOG"
else
  tail -n 50 "$LOG"
  exit 1
fi

rm -f "$LOG"

echo
echo "✅ التمارين الأربعة والأسئلة الستة عشر والصوت والبناء سليمة."
echo "لم يتم تعديل أي ملف."
