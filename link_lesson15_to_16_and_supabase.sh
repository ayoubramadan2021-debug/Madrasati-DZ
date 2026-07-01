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
echo "=== 2) التحقق من ملفات الدرس 16 ==="

REQUIRED_FILES=(
  "src/features/lesson-v2/content/lesson16.ts"
  "src/pages/Lesson16ExercisesPage.tsx"
  "src/features/lesson-v2/content/lesson16_exercise1.ts"
  "src/features/lesson-v2/content/lesson16_exercise2.ts"
  "src/features/lesson-v2/content/lesson16_exercise3.ts"
  "src/features/lesson-v2/content/lesson16_exercise4.ts"
  "src/pages/Lesson15ExercisesPage.tsx"
  "src/pages/LessonV2Page.tsx"
  "src/features/lesson-v2/v2Registry.ts"
)

for f in "${REQUIRED_FILES[@]}"; do
  if [ ! -f "$f" ]; then
    echo "❌ ملف ناقص: $f"
    exit 1
  fi
done

echo "✅ ملفات الدرس 16 موجودة"

echo ""
echo "=== 3) التحقق من الصور والأصوات ==="

for i in 1 2 3 4 5 6; do
  if [ ! -f "public/lessons/v2/lesson16-health/s$i.webp" ]; then
    echo "❌ صورة ناقصة: public/lessons/v2/lesson16-health/s$i.webp"
    exit 1
  fi
done

for i in 1 2 3 4 5 6; do
  if [ ! -f "public/audio/lesson_16_health_movement/s$i"_*.mp3 ] 2>/dev/null; then
    true
  fi
done

for ex in 1 2 3 4; do
  for q in 1 2 3 4 5; do
    if [ ! -f "public/audio/lesson_16_exercise$ex/q$q.mp3" ]; then
      echo "❌ صوت ناقص: public/audio/lesson_16_exercise$ex/q$q.mp3"
      exit 1
    fi
    if [ ! -f "public/audio/lesson_16_exercise$ex/q$q.json" ]; then
      echo "❌ كاريوكي ناقص: public/audio/lesson_16_exercise$ex/q$q.json"
      exit 1
    fi
  done
done

echo "✅ الصور وأصوات التمارين موجودة"

echo ""
echo "=== 4) ربط نهاية تمارين الدرس 15 بالدرس 16 ==="

python3 - <<'PY'
from pathlib import Path
import re

p = Path("src/pages/Lesson15ExercisesPage.tsx")
txt = p.read_text(encoding="utf-8")
old = txt

if "nextLessonKey" in txt:
    txt = re.sub(r'nextLessonKey=\{?"lesson\d+"\}?', 'nextLessonKey="lesson16"', txt)
else:
    txt = txt.replace(
        '<LessonCompleteV2',
        '<LessonCompleteV2\n      nextLessonKey="lesson16"',
        1
    )

p.write_text(txt, encoding="utf-8")

print("Lesson15ExercisesPage changed:", txt != old)

if 'nextLessonKey="lesson16"' not in txt:
    raise SystemExit("❌ لم يتم ربط lesson15 بـ lesson16")
PY

grep -n "nextLessonKey" src/pages/Lesson15ExercisesPage.tsx || true

echo ""
echo "=== 5) التحقق من ربط الدرس 16 في LessonV2Page و App و Registry ==="

grep -n "LESSON_16_CONTENT\|lesson16" src/pages/LessonV2Page.tsx || {
  echo "❌ lesson16 غير مربوط في LessonV2Page"
  exit 1
}

grep -n "lesson16-exercises" src/App.tsx || {
  echo "❌ lesson16-exercises غير مربوط في App.tsx"
  exit 1
}

grep -n "000000000016\|lesson16" src/features/lesson-v2/v2Registry.ts || {
  echo "❌ lesson16 غير مربوط في v2Registry"
  exit 1
}

echo "✅ الربط المحلي صحيح"

echo ""
echo "=== 6) إنشاء ملف SQL للدرس 16 في Supabase ==="

mkdir -p supabase/manual_sql

cat > supabase/manual_sql/lesson16_health_movement.sql <<'SQL'
-- Lesson 16: أتحرك وأحافظ على صحتي
-- انسخ هذا الملف كاملًا في Supabase SQL Editor ثم Run

insert into public.lessons (
  id,
  world_id,
  title,
  slug,
  sort_order,
  is_published,
  created_at,
  updated_at
)
select
  '11111111-1111-1111-1111-000000000016'::uuid,
  world_id,
  'أَتَحَرَّكُ وَأُحَافِظُ عَلَى صِحَّتِي',
  'lesson16-health-movement',
  16,
  true,
  now(),
  now()
from public.lessons
where id = '11111111-1111-1111-1111-000000000015'::uuid
on conflict (id) do update set
  title = excluded.title,
  slug = excluded.slug,
  sort_order = excluded.sort_order,
  is_published = true,
  updated_at = now();

select *
from public.lessons
where id = '11111111-1111-1111-1111-000000000016'::uuid;
SQL

echo "✅ SQL جاهز هنا:"
echo "supabase/manual_sql/lesson16_health_movement.sql"

echo ""
echo "=== 7) عرض SQL للنسخ إلى Supabase ==="
echo "----------------------------------------"
cat supabase/manual_sql/lesson16_health_movement.sql
echo "----------------------------------------"

echo ""
echo "=== 8) Build للتحقق ==="
rm -rf node_modules/.vite dist
npm run build

echo ""
echo "✅ تم الربط محليًا بنجاح."
echo ""
echo "الآن افتح Supabase SQL Editor وانسخ محتوى الملف:"
echo "supabase/manual_sql/lesson16_health_movement.sql"
echo ""
echo "بعد تشغيل SQL في Supabase، تحقق أن الدرس ظهر بالعنوان:"
echo "أَتَحَرَّكُ وَأُحَافِظُ عَلَى صِحَّتِي"
