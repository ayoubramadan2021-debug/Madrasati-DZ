#!/data/data/com.termux/files/usr/bin/bash
set -euo pipefail

PROJECT="$HOME/madrasati-dz"
AUDIO_DIR="$PROJECT/public/audio/teachers/khalil/lesson_44_half_number_under_20"
BACKUP="$PROJECT/backups/lesson44_swap_s3_s4_$(date '+%Y%m%d_%H%M%S')"

mkdir -p "$BACKUP"

for file in \
  lesson44_s3.mp3 \
  lesson44_s3.json \
  lesson44_s4.mp3 \
  lesson44_s4.json
do
  if [ ! -s "$AUDIO_DIR/$file" ]; then
    echo "❌ الملف غير موجود: $AUDIO_DIR/$file"
    exit 1
  fi

  cp "$AUDIO_DIR/$file" "$BACKUP/$file"
done

mv "$AUDIO_DIR/lesson44_s3.mp3" "$AUDIO_DIR/lesson44_s3.tmp.mp3"
mv "$AUDIO_DIR/lesson44_s4.mp3" "$AUDIO_DIR/lesson44_s3.mp3"
mv "$AUDIO_DIR/lesson44_s3.tmp.mp3" "$AUDIO_DIR/lesson44_s4.mp3"

mv "$AUDIO_DIR/lesson44_s3.json" "$AUDIO_DIR/lesson44_s3.tmp.json"
mv "$AUDIO_DIR/lesson44_s4.json" "$AUDIO_DIR/lesson44_s3.json"
mv "$AUDIO_DIR/lesson44_s3.tmp.json" "$AUDIO_DIR/lesson44_s4.json"

cd "$PROJECT"

rm -rf dist
rm -rf node_modules/.vite

npm run build

echo "============================================================"
echo "✅ تم تبديل صوت وكاريوكي المشهد 3 مع المشهد 4."
echo "✅ الصور لم تتغير."
echo "✅ npm build ناجح."
echo "✅ النسخة الاحتياطية: $BACKUP"
echo "============================================================"
