#!/data/data/com.termux/files/usr/bin/bash

FILE="src/pages/LessonV2Page.tsx"

sed -i '1i import ARABIC_LESSON12 from "../features/lesson-v2/content/arabic/lesson12";\nimport ARABIC_LESSON13 from "../features/lesson-v2/content/arabic/lesson13";\nimport ARABIC_LESSON14 from "../features/lesson-v2/content/arabic/lesson14";\nimport ARABIC_LESSON16 from "../features/lesson-v2/content/arabic/lesson16";\nimport ARABIC_LESSON18 from "../features/lesson-v2/content/arabic/lesson18";\nimport ARABIC_LESSON19 from "../features/lesson-v2/content/arabic/lesson19";\nimport ARABIC_LESSON20 from "../features/lesson-v2/content/arabic/lesson20";' "$FILE"

sed -i '/lesson12: LESSON_12_CONTENT,/c\  lesson12: ARABIC_LESSON12,\n  lesson13: ARABIC_LESSON13,\n  lesson14: ARABIC_LESSON14,\n  lesson16: ARABIC_LESSON16,\n  lesson18: ARABIC_LESSON18,\n  lesson19: ARABIC_LESSON19,\n  lesson20: ARABIC_LESSON20,' "$FILE"

echo "DONE"
