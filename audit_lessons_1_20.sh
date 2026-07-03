#!/data/data/com.termux/files/usr/bin/bash
set -e
cd "$HOME/madrasati-dz"

echo "===== 1) Project ====="
pwd
[ -f package.json ] && echo "✅ package.json موجود" || { echo "❌ لست داخل المشروع"; exit 1; }

echo ""
echo "===== 2) Git status ====="
git status --short

echo ""
echo "===== 3) Lesson content files ====="
for n in $(seq 1 20); do
  f="src/features/lesson-v2/content/lesson${n}.ts"
  if [ -f "$f" ]; then
    echo "✅ lesson$n.ts"
  else
    echo "❌ lesson$n.ts غير موجود"
  fi
done

echo ""
echo "===== 4) Exercise pages ====="
for n in $(seq 1 20); do
  f="src/pages/Lesson${n}ExercisesPage.tsx"
  if [ -f "$f" ]; then
    echo "✅ Lesson${n}ExercisesPage.tsx"
  else
    echo "❌ Lesson${n}ExercisesPage.tsx غير موجود"
  fi
done

echo ""
echo "===== 5) Registered routes in App.tsx ====="
grep -n "lesson[0-9][0-9]*-exercises\|Lesson[0-9][0-9]*ExercisesPage" src/App.tsx || true

echo ""
echo "===== 6) LessonV2Page imports/map/handleDone ====="
grep -n "LESSON_[0-9][0-9]*_CONTENT\|lesson[0-9][0-9]*:" src/pages/LessonV2Page.tsx || true
grep -n "lessonId === \"lesson" src/pages/LessonV2Page.tsx || true

echo ""
echo "===== 7) Registry ====="
grep -n "0000000000[0-9][0-9]\|lesson[0-9][0-9]*" src/features/lesson-v2/v2Registry.ts || true

echo ""
echo "===== 8) Exercise engines used by pages ====="
for n in $(seq 1 20); do
  f="src/pages/Lesson${n}ExercisesPage.tsx"
  if [ -f "$f" ]; then
    echo "--- Lesson$n ---"
    grep -o "features/lesson-v2/exercises-v2/[A-Za-z0-9_]*" "$f" | sed 's|features/lesson-v2/exercises-v2/||' | sort -u || true
    grep -o "from \"../features/lesson-v2/exercises-v2/[^\"]*" "$f" | sed 's|from "../features/lesson-v2/exercises-v2/||' | sort -u || true
  fi
done

echo ""
echo "===== 9) Existing exercise engines ====="
ls -1 src/features/lesson-v2/exercises-v2

echo ""
echo "===== 10) LessonComplete links ====="
for n in $(seq 1 20); do
  f="src/pages/Lesson${n}ExercisesPage.tsx"
  if [ -f "$f" ]; then
    echo "--- Lesson$n ---"
    grep -n "LessonCompleteV2\|nextLessonKey" "$f" || true
  fi
done

echo ""
echo "===== 11) Audio folders summary ====="
find public/audio -maxdepth 1 -type d | grep -E "lesson_([0-9]+|[0-9]+_)" | sort | tail -80

echo ""
echo "===== 12) Build check ====="
npm run build

echo ""
echo "===== 13) DONE ====="
