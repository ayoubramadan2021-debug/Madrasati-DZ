#!/data/data/com.termux/files/usr/bin/bash
set -e

SRC_DIR="/sdcard/Pictures"
OUT_DIR="$HOME/madrasati-dz/public/lessons/v2/lesson15-order"

mkdir -p "$OUT_DIR"

echo "=== تحويل صور الدرس 15 إلى WebP ==="

for i in 1 2 3 4 5 6; do
  IN="$SRC_DIR/S${i}.png"
  OUT="$OUT_DIR/s${i}.webp"

  if [ ! -f "$IN" ]; then
    echo "❌ غير موجود: $IN"
    exit 1
  fi

  cwebp -q 84 "$IN" -o "$OUT"
  echo "✅ S${i}.png -> s${i}.webp"
done

echo ""
echo "=== النتيجة ==="
ls -lh "$OUT_DIR"
