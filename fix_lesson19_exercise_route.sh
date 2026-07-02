#!/data/data/com.termux/files/usr/bin/bash
set -e
cd "$HOME/madrasati-dz"

echo "===== 1) تحقق قبل الإصلاح ====="
grep -n "lesson19\|lesson19-exercises" src/pages/LessonV2Page.tsx src/App.tsx

echo ""
echo "===== 2) إصلاح توجيه الدرس 19 إلى تمارينه ====="

python - <<'PY'
from pathlib import Path

p = Path("src/pages/LessonV2Page.tsx")
txt = p.read_text(encoding="utf-8")

if 'lessonId === "lesson19" ? navigate("/lesson19-exercises")' not in txt:
    txt = txt.replace(
        'lessonId === "lesson18" ? navigate("/lesson18-exercises") :',
        'lessonId === "lesson18" ? navigate("/lesson18-exercises") : lessonId === "lesson19" ? navigate("/lesson19-exercises") :'
    )

p.write_text(txt, encoding="utf-8")

app = Path("src/App.tsx")
atxt = app.read_text(encoding="utf-8")

route = '        <Route path="/lesson19-exercises" element={lazy(() => import("./pages/Lesson19ExercisesPage"), "تمارين الدرس 19")} />'

if "/lesson19-exercises" not in atxt:
    atxt = atxt.replace(
        '        <Route path="/lesson18-exercises" element={lazy(() => import("./pages/Lesson18ExercisesPage"), "تمارين الدرس 18")} />',
        '        <Route path="/lesson18-exercises" element={lazy(() => import("./pages/Lesson18ExercisesPage"), "تمارين الدرس 18")} />\n' + route
    )

app.write_text(atxt, encoding="utf-8")
PY

echo ""
echo "===== 3) تحقق بعد الإصلاح ====="
grep -n "lesson19\|lesson19-exercises" src/pages/LessonV2Page.tsx src/App.tsx

echo ""
echo "===== 4) Build ====="
npm run build

echo ""
echo "===== 5) Git status ====="
git status --short
