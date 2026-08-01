#!/data/data/com.termux/files/usr/bin/bash
set -euo pipefail

PROJECT="$HOME/madrasati-dz"
SRC="/sdcard/Download/images-s1-s60-webp"

if [ ! -d "$PROJECT" ]; then
    echo "❌ المشروع غير موجود:"
    echo "$PROJECT"
    exit 1
fi

if [ ! -d "$SRC" ]; then
    echo "❌ مجلد الصور غير موجود:"
    echo "$SRC"
    exit 1
fi

LESSON=36
INDEX=1

while [ $LESSON -le 45 ]; do

    DEST="$PROJECT/public/lessons/v2/lesson${LESSON}"

    mkdir -p "$DEST"

    for SCENE in 1 2 3 4 5 6
    do
        cp "$SRC/s${INDEX}.webp" "$DEST/s${SCENE}.webp"
        echo "✅ lesson${LESSON}/s${SCENE}.webp"
        INDEX=$((INDEX+1))
    done

    LESSON=$((LESSON+1))

done

echo
echo "===================================="
echo "✅ تم نسخ جميع الصور."
echo "===================================="

find "$PROJECT/public/lessons/v2" \
-type f \
-name "*.webp" | wc -l
