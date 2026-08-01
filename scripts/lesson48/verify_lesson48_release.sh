#!/data/data/com.termux/files/usr/bin/bash
set -euo pipefail

cd "${1:-$HOME/madrasati-dz}"

WORLD="src/pages/World2LessonPage.tsx"
APP="src/App.tsx"
PAGE="src/pages/Lesson48ExercisesPage.tsx"
ENGINE="src/features/lesson-v2/exercises-v2/NumbersTo39ExerciseV2.tsx"
REFERENCE="src/features/lesson-v2/exercises-v2/Lesson36PremiumNumbersExercises.tsx"

for file in "$WORLD" "$APP" "$PAGE" "$ENGINE" "$REFERENCE"
do
  [[ -f "$file" ]] || {
    echo "❌ ملف مفقود: $file"
    exit 1
  }
done

grep -Fq '"48": {' "$WORLD"
grep -Fq 'exercisePath: "/lesson-v2/48/exercises"' "$WORLD"
grep -Fq 'lesson_48_numbers_to_39' "$WORLD"
grep -Fq 'lessonId === "48"' "$WORLD"
grep -Fq '"/lesson-v2/48/exercises"' "$WORLD"

grep -Fq 'path="/lesson-v2/48/exercises"' "$APP"
grep -Fq 'path="/lesson-v2/:lessonId/exercises"' "$APP"

if grep -Fq 'path="/world2-lesson/48"' "$APP"
then
  echo "❌ يوجد مسار يتجاوز World2LessonPage"
  exit 1
fi

grep -Fq 'UnifiedExerciseScreenV2' "$ENGINE"
grep -Fq 'UnifiedExerciseAnswersV2' "$ENGINE"
grep -Fq 'revealedValue' "$ENGINE"
grep -Fq 'revealCorrect' "$ENGINE"

if grep -Fq '<strong>١٢٣</strong>' "$ENGINE"
then
  echo "❌ الرقم ١٢٣ ما زال داخل القاطرة"
  exit 1
fi

TOTAL=0

for mission in 1 2 3 4
do
  FILE="src/features/lesson-v2/content/lesson48_exercise${mission}.ts"

  [[ -f "$FILE" ]] || {
    echo "❌ ملف مفقود: $FILE"
    exit 1
  }

  COUNT="$(
    grep -o "l48_e${mission}_q[0-9]*" "$FILE" |
    sort -u |
    wc -l
  )"

  [[ "$COUNT" -eq 4 ]] || {
    echo "❌ المهمة $mission تحتوي $COUNT بدل 4"
    exit 1
  }

  TOTAL=$((TOTAL + COUNT))
done

[[ "$TOTAL" -eq 16 ]] || {
  echo "❌ مجموع الأسئلة $TOTAL بدل 16"
  exit 1
}

echo "✅ تحقق الدرس 48 نجح"

npm run build
