#!/data/data/com.termux/files/usr/bin/bash
set -e
cd "$HOME/madrasati-dz"

echo "===== تحقق قبل الربط ====="
grep -n "LessonCompleteV2\|nextLessonKey" src/pages/Lesson17ExercisesPage.tsx || true
grep -n "lesson18" src/pages/LessonV2Page.tsx src/features/lesson-v2/v2Registry.ts src/App.tsx || true

python - <<'PY'
from pathlib import Path

p = Path("src/pages/Lesson17ExercisesPage.tsx")
txt = p.read_text(encoding="utf-8")

if 'nextLessonKey="lesson18"' not in txt:
    txt = txt.replace(
        '      message="أَحْسَنْتَ! أَصْبَحْتَ تَعْرِفُ كَيْفَ تَسْتَخْرِجُ المَعْلُومَةَ مِنَ الصُّورَةِ وَالبِطَاقَةِ وَالجَدْوَلِ. 🎉"',
        '      message="أَحْسَنْتَ! أَصْبَحْتَ تَعْرِفُ كَيْفَ تَسْتَخْرِجُ المَعْلُومَةَ مِنَ الصُّورَةِ وَالبِطَاقَةِ وَالجَدْوَلِ. 🎉"\n      nextLessonKey="lesson18"'
    )

p.write_text(txt, encoding="utf-8")
PY

echo ""
echo "===== تحقق بعد الربط ====="
grep -n "LessonCompleteV2\|message=\|nextLessonKey" src/pages/Lesson17ExercisesPage.tsx

echo ""
echo "===== Build ====="
npm run build

echo ""
echo "===== Git status ====="
git status --short
