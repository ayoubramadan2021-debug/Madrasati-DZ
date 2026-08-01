#!/data/data/com.termux/files/usr/bin/bash
set -euo pipefail

cd /data/data/com.termux/files/home/madrasati-dz

PAGE="src/pages/LessonExercisesPage.tsx"
WORLD="src/pages/World2LessonPage.tsx"
COMPONENT="src/features/lesson-v2/exercises-v2/Lesson36PremiumNumbersExercises.tsx"
BACKUP="backups/lesson36_link_$(date +%Y%m%d_%H%M%S)"

[ -f "$PAGE" ] || { echo "خطأ: $PAGE غير موجود"; exit 1; }
[ -f "$WORLD" ] || { echo "خطأ: $WORLD غير موجود"; exit 1; }
[ -f "$COMPONENT" ] || { echo "خطأ: نشاط lesson36 غير موجود"; exit 1; }

mkdir -p "$BACKUP"
cp -p "$PAGE" "$WORLD" "$BACKUP/"

python - <<'PY'
from pathlib import Path

page = Path("src/pages/LessonExercisesPage.tsx")
text = page.read_text(encoding="utf-8")

import_line = (
    'import Lesson36PremiumNumbersExercises from '
    '"../features/lesson-v2/exercises-v2/Lesson36PremiumNumbersExercises";'
)

if import_line not in text:
    marker = 'import { useParams } from "react-router-dom";'
    if marker not in text:
        raise SystemExit("تعذر تحديد موضع الاستيراد في LessonExercisesPage.tsx")
    text = text.replace(marker, marker + "\n" + import_line, 1)

route_block = '''
  if (lessonId === "36") {
    return <Lesson36PremiumNumbersExercises />;
  }
'''

if 'lessonId === "36"' not in text:
    marker = '''  if (lessonId === "35") {
    return <Lesson35Exercises />;
  }
'''
    if marker not in text:
        raise SystemExit("تعذر تحديد موضع ربط lesson35")
    text = text.replace(marker, marker + route_block, 1)

page.write_text(text, encoding="utf-8")

world = Path("src/pages/World2LessonPage.tsx")
text = world.read_text(encoding="utf-8")

old = '''  "36": {
    title: "الْأَعْدَادُ إِلَى 19 (1)",
    audioToken: "lesson_36_amusement_sorting",
  },'''

new = '''  "36": {
    title: "الْأَعْدَادُ إِلَى 19 (1)",
    exercisePath: "/lesson-v2/36/exercises",
    audioToken: "lesson_36_amusement_sorting",
  },'''

if 'exercisePath: "/lesson-v2/36/exercises"' not in text:
    if old not in text:
        raise SystemExit("تعذر تحديد تعريف lesson36 في World2LessonPage.tsx")
    text = text.replace(old, new, 1)

world.write_text(text, encoding="utf-8")
PY

npm run build

echo
echo "=== تم ربط lesson36 ==="
grep -n -A4 -B1 'lessonId === "36"' "$PAGE"
grep -n -A4 -B1 '"36":' "$WORLD"

echo
echo "=== حالة الملفات ==="
git status --short -- "$PAGE" "$WORLD" "$COMPONENT"

echo
echo "النسخة الاحتياطية: $BACKUP"
