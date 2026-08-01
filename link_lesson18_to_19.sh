#!/data/data/com.termux/files/usr/bin/bash
set -e
cd "$HOME/madrasati-dz"

echo "===== 1) تحقق قبل الربط ====="
grep -n "LessonCompleteV2\|nextLessonKey" src/pages/Lesson18ExercisesPage.tsx || true
grep -n "lesson19" src/pages/LessonV2Page.tsx src/features/lesson-v2/v2Registry.ts src/App.tsx || true

echo ""
echo "===== 2) ربط الدرس 18 بالدرس 19 ====="
python - <<'PY'
from pathlib import Path

p = Path("src/pages/Lesson18ExercisesPage.tsx")
txt = p.read_text(encoding="utf-8")

if 'nextLessonKey="lesson19"' not in txt:
    txt = txt.replace(
        '      message="أَحْسَنْتَ! أَصْبَحْتَ تَعْرِفُ كَيْفَ تُحَدِّدُ مَكَانَ الشَّيْءِ فِي الفَضَاءِ. 🎉"',
        '      message="أَحْسَنْتَ! أَصْبَحْتَ تَعْرِفُ كَيْفَ تُحَدِّدُ مَكَانَ الشَّيْءِ فِي الفَضَاءِ. 🎉"\n      nextLessonKey="lesson19"'
    )

p.write_text(txt, encoding="utf-8")
PY

echo ""
echo "===== 3) تحقق بعد الربط ====="
grep -n "LessonCompleteV2\|message=\|nextLessonKey" src/pages/Lesson18ExercisesPage.tsx

echo ""
echo "===== 4) Build ====="
npm run build

echo ""
echo "===== 5) Git status ====="
git status --short
