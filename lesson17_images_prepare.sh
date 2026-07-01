#!/data/data/com.termux/files/usr/bin/bash
set -e

PROJECT="$HOME/madrasati-dz"
SRC="/sdcard/Pictures"
DEST="$PROJECT/public/lessons/v2/lesson17-info"

echo "=== 1) التحقق من المشروع ==="
[ -f "$PROJECT/package.json" ] || { echo "❌ المشروع غير موجود"; exit 1; }

echo "=== 2) إنشاء مجلد الدرس 17 ==="
mkdir -p "$DEST"

echo "=== 3) التحقق من الصور ==="
for i in 1 2 3 4 5 6; do
  [ -f "$SRC/S$i.png" ] || { echo "❌ ناقصة: $SRC/S$i.png"; exit 1; }
done
echo "✅ كل الصور موجودة"

echo "=== 4) ضغط الصور إلى WebP ==="
for i in 1 2 3 4 5 6; do
  cwebp -q 82 -resize 1024 1536 "$SRC/S$i.png" -o "$DEST/s$i.webp"
  echo "✅ S$i.png -> s$i.webp"
done

echo "=== 5) التحقق النهائي ==="
ls -lh "$DEST"

echo "✅ تم تجهيز صور الدرس 17 بنجاح"
