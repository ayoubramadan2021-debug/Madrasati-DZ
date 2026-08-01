#!/data/data/com.termux/files/usr/bin/bash
set -e

PROJECT="$HOME/madrasati-dz"

echo "=== 1) التحقق من المشروع ==="
if [ ! -f "$PROJECT/package.json" ]; then
  echo "❌ لم أجد المشروع: $PROJECT"
  exit 1
fi

cd "$PROJECT"
echo "✅ Project: $PROJECT"

echo ""
echo "=== 2) الفرع الحالي ==="
git branch --show-current

echo ""
echo "=== 3) هل ملفات الدرس 16 موجودة؟ ==="
for f in \
  src/features/lesson-v2/content/lesson16.ts \
  src/pages/Lesson16ExercisesPage.tsx \
  public/lessons/v2/lesson16-health/s1.webp \
  public/audio/lesson_16_health_movement/s1_intro.mp3
do
  if [ -f "$f" ]; then
    echo "✅ $f"
  else
    echo "❌ $f"
  fi
done

echo ""
echo "=== 4) هل route الدرس 16 موجود؟ ==="
grep -Rni "lesson16" src/pages/LessonV2Page.tsx src/App.tsx src/features/lesson-v2/v2Registry.ts || true

echo ""
echo "=== 5) البحث عن أماكن lesson15 التي لم نضف بعدها lesson16 ==="
echo "--- ملفات فيها lesson15 ---"
grep -Rni "lesson15" src | head -80 || true

echo ""
echo "--- ملفات فيها lesson16 ---"
grep -Rni "lesson16" src | head -80 || true

echo ""
echo "=== 6) البحث في ملفات القوائم / العوالم / الدروس ==="
find src -type f \( -name "*.ts" -o -name "*.tsx" \) | grep -Ei "world|lesson|home|map|list|card|registry|data|catalog" | sort

echo ""
echo "=== 7) Build للتحقق ==="
npm run build

echo ""
echo "✅ انتهى التحقق."
echo ""
echo "جرّب الرابط المباشر محليًا:"
echo "http://localhost:5173/lesson-v2/lesson16?test=1"
echo ""
echo "وجرّب التمارين:"
echo "http://localhost:5173/lesson16-exercises"
