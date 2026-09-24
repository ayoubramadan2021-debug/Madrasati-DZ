#!/data/data/com.termux/files/usr/bin/bash

FILE="src/pages/LessonV2Page.tsx"

echo "Searching lesson content resolver..."

grep -n "lesson12\|content/lesson\|arabic/lesson" "$FILE"

echo "Done - inspect resolver"
