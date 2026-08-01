#!/data/data/com.termux/files/usr/bin/bash
set -e
cd "$HOME/madrasati-dz"

echo "===== 1) إزالة route المكرر للدرس 5 ====="

python - <<'PY'
from pathlib import Path

p = Path("src/App.tsx")
txt = p.read_text(encoding="utf-8")

line = '        <Route path="/lesson5-exercises" element={lazy(() => import("./pages/Lesson5ExercisesPage"), "تمارين الدرس 5")} />'
parts = txt.split(line)

if len(parts) > 2:
    txt = line.join(parts[:2]) + "".join(parts[2:])
    p.write_text(txt, encoding="utf-8")
    print("✅ تم حذف التكرار")
else:
    print("✅ لا يوجد تكرار")
PY

echo ""
echo "===== 2) تحقق Routes ====="
grep -n "lesson5-exercises\|lesson20-exercises" src/App.tsx

echo ""
echo "===== 3) Build ====="
npm run build

echo ""
echo "===== 4) Git status ====="
git status --short
