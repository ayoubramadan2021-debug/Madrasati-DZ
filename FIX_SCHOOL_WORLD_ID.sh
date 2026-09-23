#!/data/data/com.termux/files/usr/bin/bash

FILE="src/pages/SubjectPage.tsx"

echo "Fixing school world id..."

sed -i 's/const LOCAL_ARABIC_SCHOOL_WORLD_ID = "arabic-school-local";/const LOCAL_ARABIC_SCHOOL_WORLD_ID = "83975f07-bdaf-4991-9f96-27d954519f06";/' "$FILE"

echo "Checking result:"
grep "LOCAL_ARABIC_SCHOOL_WORLD_ID" "$FILE"

echo "Done"
