#!/data/data/com.termux/files/usr/bin/bash
set -euo pipefail

BASE="http://127.0.0.1:5173/audio/teachers/khalil/lesson_36_amusement_sorting/exercises"
DIR="/data/data/com.termux/files/home/madrasati-dz/public/audio/teachers/khalil/lesson_36_amusement_sorting/exercises"

KEYS=(
  m1_q1_count_12
  m1_q2_count_15
  m2_q1_choose_17
  m2_q2_choose_19
  m3_q1_build_14
  m3_q2_build_18
  m4_q1_match_16
  m4_q2_match_19
)

ERRORS=0

echo "=== فحص الصوت والكاريـوكي عبر المعاينة ==="

for KEY in "${KEYS[@]}"; do
  MP3_CODE="$(curl -s -o /dev/null -w '%{http_code}' "$BASE/$KEY.mp3")"
  JSON_CODE="$(curl -s -o /dev/null -w '%{http_code}' "$BASE/$KEY.json")"

  if python -m json.tool "$DIR/$KEY.json" >/dev/null 2>&1; then
    JSON_VALID="صالح"
  else
    JSON_VALID="غير صالح"
    ERRORS=$((ERRORS + 1))
  fi

  if [ "$MP3_CODE" != "200" ] || [ "$JSON_CODE" != "200" ]; then
    ERRORS=$((ERRORS + 1))
  fi

  echo "$KEY — MP3:$MP3_CODE — JSON:$JSON_CODE — $JSON_VALID"
done

echo
if [ "$ERRORS" -eq 0 ]; then
  echo "✅ جميع ملفات الصوت والكاريـوكي متاحة وصالحة."
else
  echo "❌ توجد أخطاء: $ERRORS"
  exit 1
fi

echo "لم يتم تعديل أي ملف."
