#!/data/data/com.termux/files/usr/bin/bash
set -e

cd ~/project

echo "==============================="
echo " Building Lesson 16"
echo "==============================="

mkdir -p src/features/lesson-v2/content
mkdir -p public/audio/v2/lesson16
mkdir -p public/lessons/v2/lesson16-health

touch src/features/lesson-v2/content/lesson16.ts
touch src/pages/Lesson16ExercisesPage.tsx

mkdir -p src/features/lesson-v2/content/exercises

touch src/features/lesson-v2/content/lesson16_exercise1.ts
touch src/features/lesson-v2/content/lesson16_exercise2.ts
touch src/features/lesson-v2/content/lesson16_exercise3.ts

echo
echo "========== VERIFY =========="
echo

ls -lh public/lessons/v2/lesson16-health

echo
echo "Lesson files:"
find src/features/lesson-v2/content -maxdepth 1 | grep lesson16

echo
echo "Done."
