#!/data/data/com.termux/files/usr/bin/bash
set -euo pipefail

cd /data/data/com.termux/files/home/madrasati-dz

FILE="src/features/lesson-v2/exercises-v2/PremiumExerciseEngineV2.tsx"

echo "=== عرض السؤال والكاريـوكي ==="
sed -n '600,685p' "$FILE"

echo
echo "=== عرض بطاقات الإجابة ==="
sed -n '680,770p' "$FILE"

echo
echo "=== أنماط السؤال والبطاقات ==="
sed -n '870,1030p' "$FILE"

echo
echo "لم يتم تعديل أي ملف."
