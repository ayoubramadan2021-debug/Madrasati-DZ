#!/data/data/com.termux/files/usr/bin/bash

FILE="src/features/world-intro/schoolWorldIntro.ts"

echo "Fixing SCHOOL_WORLD_ID..."

sed -i 's/arabic-school-local/83975f07-bdaf-4991-9f96-27d954519f06/g' "$FILE"

grep "SCHOOL_WORLD_ID" "$FILE"

echo "Done"
