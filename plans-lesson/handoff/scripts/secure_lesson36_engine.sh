#!/data/data/com.termux/files/usr/bin/bash
set -euo pipefail

cd /data/data/com.termux/files/home/madrasati-dz

FILE="src/features/lesson-v2/exercises-v2/PremiumExerciseEngineV2.tsx"
BACKUP="backups/lesson36_engine_$(date +%Y%m%d_%H%M%S)"

[ -f "$FILE" ] || {
  echo "خطأ: المحرك غير موجود."
  exit 1
}

mkdir -p "$BACKUP"
cp -p "$FILE" "$BACKUP/"

echo "=== النسخة الاحتياطية ==="
echo "$BACKUP/PremiumExerciseEngineV2.tsx"

echo
echo "=== فحص TypeScript والبناء الحالي ==="
npm run build

echo
echo "=== حالة المحرك ==="
git status --short -- "$FILE"

echo
echo "لم يتم تعديل أي ملف."
