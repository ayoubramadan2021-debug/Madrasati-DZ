#!/data/data/com.termux/files/usr/bin/bash
set -e
cd "$HOME/madrasati-dz"

echo "===== إصلاح await في المحركات الجديدة ====="

python - <<'PY'
from pathlib import Path

files = [
  Path("src/features/lesson-v2/exercises-v2/NumberChoiceExerciseV2.tsx"),
  Path("src/features/lesson-v2/exercises-v2/NumberSortExerciseV2.tsx"),
]

old = 'if (r.ok) setTimings(p => ({ ...p, [it.question_audio_key]: await r.json() }));'
new = '''if (r.ok) {
        const data = await r.json();
        setTimings(p => ({ ...p, [it.question_audio_key]: data }));
      }'''

for p in files:
    txt = p.read_text(encoding="utf-8")
    txt = txt.replace(old, new)
    p.write_text(txt, encoding="utf-8")
    print("✅", p)
PY

echo ""
echo "===== تحقق ====="
grep -n "const data = await r.json" src/features/lesson-v2/exercises-v2/NumberChoiceExerciseV2.tsx src/features/lesson-v2/exercises-v2/NumberSortExerciseV2.tsx

echo ""
echo "===== Build ====="
npm run build

echo ""
echo "===== Git status ====="
git status --short
