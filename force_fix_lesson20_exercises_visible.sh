#!/data/data/com.termux/files/usr/bin/bash
set -e
cd "$HOME/madrasati-dz"

echo "===== 1) تحقق الملفات ====="
ls -lh src/pages/Lesson20ExercisesPage.tsx
ls -lh src/features/lesson-v2/content/lesson20_exercise*.ts

echo ""
echo "===== 2) إصلاح App route بالقوة ====="
python - <<'PY'
from pathlib import Path

p = Path("src/App.tsx")
txt = p.read_text(encoding="utf-8")

route = '        <Route path="/lesson20-exercises" element={lazy(() => import("./pages/Lesson20ExercisesPage"), "تمارين الدرس 20")} />'

if "/lesson20-exercises" not in txt:
    anchor = '        <Route path="/lesson19-exercises" element={lazy(() => import("./pages/Lesson19ExercisesPage"), "تمارين الدرس 19")} />'
    if anchor not in txt:
        print("❌ لم أجد lesson19 route")
        print(txt[:2000])
        raise SystemExit(1)
    txt = txt.replace(anchor, anchor + "\n" + route)

p.write_text(txt, encoding="utf-8")
PY

echo ""
echo "===== 3) إصلاح handleDone بالقوة ====="
python - <<'PY'
from pathlib import Path
import re

p = Path("src/pages/LessonV2Page.tsx")
txt = p.read_text(encoding="utf-8")

if 'import { LESSON_20_CONTENT }' not in txt:
    txt = txt.replace(
        'import { LESSON_19_CONTENT } from "../features/lesson-v2/content/lesson19";',
        'import { LESSON_19_CONTENT } from "../features/lesson-v2/content/lesson19";\nimport { LESSON_20_CONTENT } from "../features/lesson-v2/content/lesson20";'
    )

if 'lesson20: LESSON_20_CONTENT' not in txt:
    txt = txt.replace(
        '  lesson19: LESSON_19_CONTENT,',
        '  lesson19: LESSON_19_CONTENT,\n  lesson20: LESSON_20_CONTENT,'
    )

start = txt.find("const handleDone")
if start == -1:
    print("❌ لم أجد handleDone")
    raise SystemExit(1)

end = txt.find("};", start)
end = txt.find(";", end) + 1

new_handle = '''const handleDone = () => {
    lessonId === "lesson2" ? navigate("/lesson2-exercises")
      : lessonId === "lesson3" ? navigate("/lesson3-exercises")
      : lessonId === "lesson4" ? navigate("/lesson4-exercises")
      : lessonId === "lesson5" ? navigate("/lesson5-exercises")
      : lessonId === "lesson6" ? navigate("/lesson6-exercises")
      : lessonId === "lesson7" ? navigate("/lesson7-exercises")
      : lessonId === "lesson8" ? navigate("/lesson8-exercises")
      : lessonId === "lesson9" ? navigate("/lesson9-exercises")
      : lessonId === "lesson10" ? navigate("/lesson10-exercises")
      : lessonId === "lesson11" ? navigate("/lesson11-exercises")
      : lessonId === "lesson12" ? navigate("/lesson12-exercises")
      : lessonId === "lesson13" ? navigate("/lesson13-exercises")
      : lessonId === "lesson14" ? navigate("/lesson14-exercises")
      : lessonId === "lesson15" ? navigate("/lesson15-exercises")
      : lessonId === "lesson16" ? navigate("/lesson16-exercises")
      : lessonId === "lesson17" ? navigate("/lesson17-exercises")
      : lessonId === "lesson18" ? navigate("/lesson18-exercises")
      : lessonId === "lesson19" ? navigate("/lesson19-exercises")
      : lessonId === "lesson20" ? navigate("/lesson20-exercises")
      : navigate(`/lesson-v2/${lessonId}/exercises`);
  };'''

txt = txt[:start] + new_handle + txt[end:]
p.write_text(txt, encoding="utf-8")
PY

echo ""
echo "===== 4) تحقق نهائي ====="
grep -n "lesson20-exercises\|Lesson20ExercisesPage" src/App.tsx
grep -n "LESSON_20_CONTENT\|lesson20\|lesson20-exercises" src/pages/LessonV2Page.tsx
grep -n "000000000020\|lesson20" src/features/lesson-v2/v2Registry.ts

echo ""
echo "===== 5) Build ====="
npm run build

echo ""
echo "===== 6) شغل الرابط مباشرة بعد npm run dev ====="
echo "http://127.0.0.1:5173/lesson20-exercises"

echo ""
echo "===== Git status ====="
git status --short
