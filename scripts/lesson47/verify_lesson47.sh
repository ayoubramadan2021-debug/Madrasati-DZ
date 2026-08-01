#!/usr/bin/env bash
set -Eeuo pipefail

ROOT="${1:-$PWD}"
cd "$ROOT"

fail() {
  echo "❌ $*" >&2
  exit 1
}

FILES=(
  "src/App.tsx"
  "src/pages/Lesson47Page.tsx"
  "src/pages/Lesson47ExercisesPage.tsx"
  "src/pages/World2LessonPage.tsx"
  "src/features/lesson-v2/content/lesson47.ts"
  "src/features/lesson-v2/content/lesson47_types.ts"
  "src/features/lesson-v2/content/lesson47_exercise1.ts"
  "src/features/lesson-v2/content/lesson47_exercise2.ts"
  "src/features/lesson-v2/content/lesson47_exercise3.ts"
  "src/features/lesson-v2/content/lesson47_exercise4.ts"
  "src/features/lesson-v2/exercises-v2/GridNavigationExerciseV2.tsx"
  "src/features/lesson-v2/exercises-v2/Lesson46HeartBeats2Exercises.tsx"
)

for file in "${FILES[@]}"; do
  [[ -f "$file" ]] || fail "ملف مفقود: $file"
done

grep -Fq 'path="/lesson-v2/lesson47"' src/App.tsx \
  || fail "مسار الدرس 47 غير مسجل"

grep -Fq 'path="/lesson-v2/lesson47/exercises"' src/App.tsx \
  || fail "مسار تمارين الدرس 47 غير مسجل"

grep -Fq 'exercisePath: "/lesson-v2/lesson47/exercises"' \
  src/features/lesson-v2/content/lesson47.ts \
  || fail "exercisePath غير صحيح"

grep -Fq '/lesson-v2/lesson47' \
  src/features/lesson-v2/exercises-v2/Lesson46HeartBeats2Exercises.tsx \
  || fail "الدرس 46 غير مربوط بالدرس 47"

if grep -Fq '/world2-lesson/47' \
  src/features/lesson-v2/exercises-v2/Lesson46HeartBeats2Exercises.tsx; then
  fail "المسار القديم /world2-lesson/47 ما زال موجودًا"
fi

for n in 1 2 3 4; do
  file="src/features/lesson-v2/content/lesson47_exercise${n}.ts"
  count="$(grep -c 'id: "l47_e' "$file" || true)"
  [[ "$count" == "4" ]] || fail "التمرين $n يحتوي $count أسئلة بدل 4"
  echo "✅ التمرين $n: أربعة أسئلة"
done

python - <<'PY'
import json
from pathlib import Path

lesson_base = Path("public/audio/teachers/taline/lesson_47_grid_navigation")
exercise_base = lesson_base / "exercises"

pairs = [
    (lesson_base, "s1_intro"),
    (lesson_base, "s2_right_left"),
    (lesson_base, "s3_up_down"),
    (lesson_base, "s4_follow_arrows"),
    (lesson_base, "s5_encode_route"),
    (lesson_base, "s6_closing"),
    (exercise_base, "ex1_direction"),
    (exercise_base, "ex2_destination"),
    (exercise_base, "ex3_missing_arrow"),
    (exercise_base, "ex4_route_code"),
]

for base, key in pairs:
    mp3 = base / f"{key}.mp3"
    js = base / f"{key}.json"
    if not mp3.exists() or mp3.stat().st_size == 0:
        raise SystemExit(f"❌ صوت مفقود أو فارغ: {mp3}")
    if not js.exists():
        raise SystemExit(f"❌ WordBoundary مفقود: {js}")
    data = json.loads(js.read_text(encoding="utf-8"))
    if not isinstance(data, list) or not data:
        raise SystemExit(f"❌ WordBoundary فارغ: {js}")
    previous = -1
    for index, item in enumerate(data):
        text = str(item.get("text", item.get("word", ""))).strip()
        offset = int(item.get("offset", item.get("start", -1)))
        duration = int(item.get("duration", max(1, int(item.get("end", 0)) - offset)))
        if not text:
            raise SystemExit(f"❌ كلمة فارغة: {key}[{index}]")
        if offset < 0 or offset < previous:
            raise SystemExit(f"❌ offset غير مرتب: {key}[{index}]")
        if duration <= 0:
            raise SystemExit(f"❌ duration غير صالح: {key}[{index}]")
        previous = offset
    print(f"✅ {key}: {len(data)} كلمة")

for image in ["s1.webp", "s2.webp", "s3.webp", "s4.webp", "s5.webp", "s6.webp"]:
    path = Path("public/lessons/v2/lesson47-grid-navigation") / image
    if not path.exists() or path.stat().st_size == 0:
        raise SystemExit(f"❌ صورة مفقودة أو فارغة: {path}")

print("✅ صور وصوت وكاريوكي الدرس 47 سليمة")
PY

npm run build

echo "✅ تحقق الدرس 47 اكتمل بنجاح"
