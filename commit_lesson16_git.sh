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
echo "=== 2) التحقق من الفرع ==="
BRANCH=$(git branch --show-current)
echo "Current branch: $BRANCH"

if [ "$BRANCH" != "batch-lessons-14-18" ]; then
  echo "❌ أنت لست على الفرع batch-lessons-14-18"
  echo "نفذ:"
  echo "git checkout batch-lessons-14-18"
  exit 1
fi

echo ""
echo "=== 3) التحقق من ملفات الدرس 16 ==="

REQUIRED_FILES=(
  "src/features/lesson-v2/content/lesson16.ts"
  "src/pages/Lesson16ExercisesPage.tsx"
  "src/features/lesson-v2/content/lesson16_exercise1.ts"
  "src/features/lesson-v2/content/lesson16_exercise2.ts"
  "src/features/lesson-v2/content/lesson16_exercise3.ts"
  "src/features/lesson-v2/content/lesson16_exercise4.ts"
  "public/lessons/v2/lesson16-health/s1.webp"
  "public/lessons/v2/lesson16-health/s2.webp"
  "public/lessons/v2/lesson16-health/s3.webp"
  "public/lessons/v2/lesson16-health/s4.webp"
  "public/lessons/v2/lesson16-health/s5.webp"
  "public/lessons/v2/lesson16-health/s6.webp"
  "supabase/manual_sql/lesson16_health_movement.sql"
)

for f in "${REQUIRED_FILES[@]}"; do
  if [ ! -f "$f" ]; then
    echo "❌ ملف ناقص: $f"
    exit 1
  fi
done

echo "✅ ملفات الدرس 16 موجودة"

echo ""
echo "=== 4) التحقق من ربط الدرس 16 ==="

grep -q "LESSON_16_CONTENT" src/pages/LessonV2Page.tsx || {
  echo "❌ lesson16 غير مربوط في LessonV2Page"
  exit 1
}

grep -q "lesson16-exercises" src/App.tsx || {
  echo "❌ تمارين lesson16 غير مربوطة في App.tsx"
  exit 1
}

grep -q "000000000016" src/features/lesson-v2/v2Registry.ts || {
  echo "❌ lesson16 غير مربوط في v2Registry"
  exit 1
}

grep -q 'nextLessonKey="lesson16"' src/pages/Lesson15ExercisesPage.tsx || {
  echo "❌ نهاية الدرس 15 غير مربوطة بالدرس 16"
  exit 1
}

echo "✅ الربط صحيح"

echo ""
echo "=== 5) تحديث RESUME.md ==="

cat >> RESUME.md <<'MD'

---

## Lesson 16 — أَتَحَرَّكُ وَأُحَافِظُ عَلَى صِحَّتِي

### الحالة
- تم بناء الدرس 16 بنجاح على الفرع `batch-lessons-14-18`.
- الدرس يظهر بالرابط المباشر:
  - `/lesson-v2/lesson16?test=1`
- تم بناء تمارين الدرس 16:
  - `/lesson16-exercises`
- تم ربط نهاية تمارين الدرس 15 بالدرس 16.
- تم رفع الدرس 16 إلى Supabase بعد نسخ ديناميكي من الدرس 15 وتغيير:
  - `id`
  - `title`
  - `sort_order`

### الصور
الصور موجودة في:

- `public/lessons/v2/lesson16-health/s1.webp`
- `public/lessons/v2/lesson16-health/s2.webp`
- `public/lessons/v2/lesson16-health/s3.webp`
- `public/lessons/v2/lesson16-health/s4.webp`
- `public/lessons/v2/lesson16-health/s5.webp`
- `public/lessons/v2/lesson16-health/s6.webp`

### الصوت
صوت الدرس موجود في:

- `public/audio/lesson_16_health_movement`

أصوات التمارين موجودة في:

- `public/audio/lesson_16_exercise1`
- `public/audio/lesson_16_exercise2`
- `public/audio/lesson_16_exercise3`
- `public/audio/lesson_16_exercise4`

### الملفات المضافة
- `src/features/lesson-v2/content/lesson16.ts`
- `src/pages/Lesson16ExercisesPage.tsx`
- `src/features/lesson-v2/content/lesson16_exercise1.ts`
- `src/features/lesson-v2/content/lesson16_exercise2.ts`
- `src/features/lesson-v2/content/lesson16_exercise3.ts`
- `src/features/lesson-v2/content/lesson16_exercise4.ts`
- `supabase/manual_sql/lesson16_health_movement.sql`

### ملاحظات مهمة
- لا يتم رفع Netlify الآن.
- نواصل تجميع الدروس على الفرع `batch-lessons-14-18`.
- من الآن فصاعدًا دوال Supabase يجب أن تكون ديناميكية أو مبنية بعد التحقق من الأعمدة، ولا نضيف أعمدة غير مؤكدة مثل `slug` أو `is_published` أو `updated_at`.

MD

echo "✅ RESUME.md updated"

echo ""
echo "=== 6) Build للتحقق النهائي ==="
rm -rf node_modules/.vite dist
npm run build

echo ""
echo "=== 7) Git status قبل الرفع ==="
git status --short

echo ""
echo "=== 8) Git add + commit + push ==="
git add .

git commit -m "Complete lesson 16 movement and health" || {
  echo "⚠️ لا توجد تغييرات جديدة للـ commit"
  exit 0
}

git push origin batch-lessons-14-18

echo ""
echo "✅ تم رفع الدرس 16 إلى GitHub"
echo "✅ الفرع: batch-lessons-14-18"
echo "❌ لم يتم رفع Netlify"
