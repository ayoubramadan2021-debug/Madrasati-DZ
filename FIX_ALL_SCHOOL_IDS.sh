#!/data/data/com.termux/files/usr/bin/bash

OLD="arabic-school-local"
NEW="83975f07-bdaf-4991-9f96-27d954519f06"

echo "Replacing old school id..."

sed -i "s/$OLD/$NEW/g" \
src/features/world-intro/schoolWorldIntro.ts \
src/features/lesson-v2/components/LessonCompleteV2.tsx \
src/pages/WorldPage.tsx \
src/pages/SubjectPage.tsx

echo "Done"
