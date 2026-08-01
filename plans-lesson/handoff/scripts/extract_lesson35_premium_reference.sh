#!/data/data/com.termux/files/usr/bin/bash
set -euo pipefail

PROJECT="$HOME/madrasati-dz"
OUT="/sdcard/Download/lesson35_premium_exact_reference.txt"

cd "$PROJECT"

FILES=(
  "src/features/lesson-v2/exercises-v2/Lesson35PremiumBreathingExercises.tsx"
  "src/features/lesson-v2/components/ExerciseFullscreenShellV2.tsx"
  "src/features/lesson-v2/components/UnifiedExerciseHeaderV2.tsx"
  "src/features/lesson-v2/components/UnifiedExerciseFeedbackV2.tsx"
  "src/features/lesson-v2/components/UnifiedExerciseKaraokeV2.tsx"
  "src/features/lesson-v2/content/lesson35_exercise1.ts"
  "src/features/lesson-v2/content/lesson35_exercise2.ts"
  "src/features/lesson-v2/content/lesson35_exercise3.ts"
  "src/features/lesson-v2/content/lesson35_exercise4.ts"
  "src/pages/LessonV2Page.tsx"
  "src/App.tsx"
)

{
  echo "============================================================"
  echo "LESSON 35 — PREMIUM EXACT REFERENCE"
  echo "============================================================"

  for FILE in "${FILES[@]}"; do
    echo
    echo "############################################################"
    echo "FILE: $FILE"
    echo "############################################################"

    if [ -f "$FILE" ]; then
      nl -ba "$FILE"
    else
      echo "❌ الملف غير موجود"
    fi
  done

  echo
  echo "############################################################"
  echo "RELATED AUDIO AND IMAGE ASSETS"
  echo "############################################################"

  find public -type f \( \
    -iname '*lesson35*' -o \
    -path '*lesson35*' \
  \) -printf '%p | %s bytes\n' 2>/dev/null | sort

  echo
  echo "############################################################"
  echo "IMPORTS AND ROUTES"
  echo "############################################################"

  grep -RInE \
    "Lesson35PremiumBreathingExercises|lesson35_exercise|ExerciseFullscreenShellV2|UnifiedExerciseFeedbackV2|UnifiedExerciseKaraokeV2|lesson-v2/35" \
    src 2>/dev/null || true

  echo
  echo "============================================================"
  echo "انتهى استخراج المرجع الكامل"
  echo "============================================================"
} > "$OUT"

echo "✅ تم استخراج المرجع الكامل للتمرين Premium."
echo "📄 التقرير:"
echo "$OUT"
