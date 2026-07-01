#!/data/data/com.termux/files/usr/bin/bash
set -e

echo "=== 1) البحث عن مجلد المشروع ==="

PROJECT=""
for d in "$HOME/madrasati-dz" "$HOME/project" "$PWD"; do
  if [ -f "$d/package.json" ] && [ -d "$d/src" ] && [ -d "$d/public" ]; then
    PROJECT="$d"
    break
  fi
done

if [ -z "$PROJECT" ]; then
  echo "❌ لم أجد مجلد المشروع."
  echo "نفذ: pwd && ls"
  exit 1
fi

cd "$PROJECT"
echo "✅ Project: $PROJECT"

echo ""
echo "=== 2) التحقق من صور الدرس 16 ==="
IMG_DIR="public/lessons/v2/lesson16-health"

if [ ! -d "$IMG_DIR" ]; then
  echo "❌ مجلد الصور غير موجود: $IMG_DIR"
  exit 1
fi

for i in 1 2 3 4 5 6; do
  if [ ! -f "$IMG_DIR/s$i.webp" ]; then
    echo "❌ الصورة ناقصة: $IMG_DIR/s$i.webp"
    exit 1
  fi
done

echo "✅ كل صور الدرس 16 موجودة"
ls -lh "$IMG_DIR"

echo ""
echo "=== 3) إنشاء ملفات الدرس 16 الفارغة فقط للتحضير ==="

mkdir -p src/features/lesson-v2/content
mkdir -p public/audio/lesson_16_health_movement

touch src/features/lesson-v2/content/lesson16.ts
touch src/features/lesson-v2/content/lesson16_exercise1.ts
touch src/features/lesson-v2/content/lesson16_exercise2.ts
touch src/features/lesson-v2/content/lesson16_exercise3.ts
touch src/features/lesson-v2/content/lesson16_exercise4.ts
touch src/pages/Lesson16ExercisesPage.tsx

echo "✅ تم التحضير بنجاح"

echo ""
echo "=== 4) تحقق نهائي ==="
ls -lh src/features/lesson-v2/content/lesson16*
ls -lh src/pages/Lesson16ExercisesPage.tsx
