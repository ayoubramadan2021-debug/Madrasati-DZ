#!/data/data/com.termux/files/usr/bin/bash
set -euo pipefail

PROJECT="/data/data/com.termux/files/home/madrasati-dz"
URL="http://127.0.0.1:5173/lesson-v2/36/exercises"
AUDIO_DIR="$PROJECT/public/audio/teachers/khalil/lesson_36_amusement_sorting/exercises"

echo "=== فحص صفحة النشاط ==="

STATUS="$(curl -s -o /dev/null -w '%{http_code}' "$URL" || true)"

if [ "$STATUS" = "200" ]; then
  echo "✅ الصفحة تعمل: HTTP 200"
else
  echo "❌ الصفحة لا تستجيب بشكل صحيح: HTTP $STATUS"
fi

echo
echo "=== فحص ملفات الصوت والكاريـوكي ==="

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

MISSING=0

for KEY in "${KEYS[@]}"; do
  MP3="$AUDIO_DIR/$KEY.mp3"
  JSON="$AUDIO_DIR/$KEY.json"

  if [ -f "$MP3" ]; then
    MP3_STATE="MP3 ✅"
  else
    MP3_STATE="MP3 ❌"
    MISSING=$((MISSING + 1))
  fi

  if [ -f "$JSON" ]; then
    JSON_STATE="JSON ✅"
  else
    JSON_STATE="JSON ❌"
    MISSING=$((MISSING + 1))
  fi

  echo "$KEY — $MP3_STATE — $JSON_STATE"
done

echo
echo "=== النتيجة ==="

if [ "$MISSING" -eq 0 ]; then
  echo "✅ جميع ملفات الصوت والكاريـوكي موجودة."
else
  echo "⚠️ عدد الملفات الناقصة: $MISSING"
  echo "لن نعتبر اختبار الصوت ناجحًا قبل إنشاء هذه الملفات."
fi

echo
echo "لم يتم تعديل أي ملف."
