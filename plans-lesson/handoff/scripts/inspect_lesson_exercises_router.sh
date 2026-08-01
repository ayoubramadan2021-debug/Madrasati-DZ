#!/data/data/com.termux/files/usr/bin/bash
set -euo pipefail

cd /data/data/com.termux/files/home/madrasati-dz

FILE="src/pages/LessonExercisesPage.tsx"

echo "=== استيرادات ومكوّنات الدروس 33–35 ==="
grep -nE \
  'Lesson33|Lesson34|Lesson35|Premium|lessonId|useParams' \
  "$FILE" | head -n 120 || true

echo
echo "=== منطق اختيار مكوّن التمرين ==="
grep -nE \
  'switch|case "?(33|34|35)"?|lessonId ===|Number\(lessonId|exerciseComponent|return <' \
  "$FILE" | head -n 160 || true

echo
echo "=== سياق lesson35 إن وُجد ==="
LINE="$(grep -nE 'Lesson35|case "?35"?|lessonId === "?35"?' "$FILE" | head -n 1 | cut -d: -f1 || true)"

if [ -n "$LINE" ]; then
  START=$((LINE > 30 ? LINE - 30 : 1))
  END=$((LINE + 70))
  sed -n "${START},${END}p" "$FILE"
else
  echo "لم يوجد ربط صريح للدرس 35."
fi

echo
echo "لم يتم تعديل أي ملف."
