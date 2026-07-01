#!/data/data/com.termux/files/usr/bin/bash
set -e

echo "=== 1) تحديد مجلد المشروع ==="
PROJECT="$HOME/madrasati-dz"

if [ ! -f "$PROJECT/package.json" ]; then
  echo "❌ لم أجد المشروع في: $PROJECT"
  exit 1
fi

cd "$PROJECT"
echo "✅ Project: $PROJECT"

DEST="$PROJECT/public/lessons/v2/lesson16-health"
TMP="/data/data/com.termux/files/usr/tmp/lesson16"
SRC="/sdcard/Pictures"

mkdir -p "$DEST"
mkdir -p "$TMP"

echo ""
echo "=== 2) البحث عن صور lesson16 الموجودة سابقًا ==="
FOUND_DIR=""

for d in \
  "$DEST" \
  "$TMP" \
  "$HOME/project/public/lessons/v2/lesson16-health" \
  "$HOME/project/public/lessons/v2/lesson16-health/" \
  "$HOME/madrasati-dz/public/lessons/v2/lesson16-health" \
  "$SRC"
do
  if [ -d "$d" ]; then
    echo "--- Checking: $d"
    ls -lh "$d" | head -20 || true
  fi
done

echo ""
echo "=== 3) إن كانت S1.png إلى S6.png موجودة في /sdcard/Pictures سنضغطها الآن ==="

MISSING_SRC=0
for i in 1 2 3 4 5 6; do
  if [ ! -f "$SRC/S$i.png" ]; then
    MISSING_SRC=1
  fi
done

if [ "$MISSING_SRC" = "0" ]; then
  echo "✅ وجدت S1.png إلى S6.png في $SRC"
  echo "=== ضغط الصور إلى WebP ==="

  for i in 1 2 3 4 5 6; do
    cwebp -quiet -q 82 "$SRC/S$i.png" -o "$DEST/s$i.webp"
    echo "✅ S$i.png -> s$i.webp"
  done

else
  echo "⚠️ لم أجد كل الصور S1.png إلى S6.png في $SRC"
  echo "سأبحث عن ملفات WebP جاهزة..."

  COPIED=0

  for d in "$TMP" "$HOME/project/public/lessons/v2/lesson16-health" "$HOME/project/public/lessons/v2/lesson16-health/" "$DEST"; do
    if [ -d "$d" ]; then
      for i in 1 2 3 4 5 6; do
        if [ -f "$d/S$i.webp" ]; then
          cp "$d/S$i.webp" "$DEST/s$i.webp"
          COPIED=1
        fi
        if [ -f "$d/s$i.webp" ]; then
          cp "$d/s$i.webp" "$DEST/s$i.webp"
          COPIED=1
        fi
      done
    fi
  done

  if [ "$COPIED" = "0" ]; then
    echo "❌ لم أجد صور الدرس 16 لا كـ PNG ولا WebP."
    echo "ضع الصور في /sdcard/Pictures بالأسماء:"
    echo "S1.png S2.png S3.png S4.png S5.png S6.png"
    exit 1
  fi
fi

echo ""
echo "=== 4) التحقق النهائي من صور الدرس 16 داخل المشروع ==="

for i in 1 2 3 4 5 6; do
  if [ ! -f "$DEST/s$i.webp" ]; then
    echo "❌ ناقصة: $DEST/s$i.webp"
    exit 1
  fi
done

echo "✅ كل الصور موجودة الآن:"
ls -lh "$DEST"

echo ""
echo "=== 5) جاهز للخطوة التالية ==="
echo "يمكن الآن بناء lesson16.ts والصوت."
