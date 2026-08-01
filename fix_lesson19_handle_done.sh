#!/data/data/com.termux/files/usr/bin/bash
set -e
cd "$HOME/madrasati-dz"

echo "===== إصلاح handleDone للدرس 19 ====="

python - <<'PY'
from pathlib import Path

p = Path("src/pages/LessonV2Page.tsx")
txt = p.read_text(encoding="utf-8")

old = '''        : lessonId === "lesson18"
        ? navigate("/lesson18-exercises")
        : navigate(`/lesson-v2/${lessonId}/exercises`);'''

new = '''        : lessonId === "lesson18"
        ? navigate("/lesson18-exercises")
        : lessonId === "lesson19"
        ? navigate("/lesson19-exercises")
        : navigate(`/lesson-v2/${lessonId}/exercises`);'''

if old not in txt:
    print("❌ لم أجد المقطع المتوقع. أعرض handleDone:")
    start = txt.find("const handleDone")
    print(txt[start:start+1800])
    raise SystemExit(1)

txt = txt.replace(old, new)
p.write_text(txt, encoding="utf-8")
print("✅ تم إصلاح توجيه lesson19")
PY

echo ""
echo "===== تحقق ====="
grep -n "lesson18\|lesson19\|lesson19-exercises" src/pages/LessonV2Page.tsx src/App.tsx

echo ""
echo "===== Build ====="
npm run build

echo ""
echo "===== Git status ====="
git status --short
