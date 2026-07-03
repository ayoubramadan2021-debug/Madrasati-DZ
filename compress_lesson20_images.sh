#!/data/data/com.termux/files/usr/bin/bash
set -e
cd "$HOME/madrasati-dz"

echo "===== 1) تحقق من صور S1-S6 ====="
for n in 1 2 3 4 5 6; do
  [ -f "/sdcard/Pictures/S$n.png" ] || { echo "❌ ناقصة: /sdcard/Pictures/S$n.png"; exit 1; }
  echo "✅ موجودة: S$n.png"
done

echo ""
echo "===== 2) تحقق من cwebp ====="
command -v cwebp >/dev/null || { echo "❌ cwebp غير مثبت"; exit 1; }
echo "✅ cwebp موجود"

echo ""
echo "===== 3) ضغط الصور إلى webp ====="
mkdir -p public/lessons/v2/lesson20-numbers

for n in 1 2 3 4 5 6; do
  cwebp -q 82 "/sdcard/Pictures/S$n.png" -o "public/lessons/v2/lesson20-numbers/s$n.webp"
  echo "✅ public/lessons/v2/lesson20-numbers/s$n.webp"
done

echo ""
echo "===== 4) تحقق نهائي ====="
ls -lh public/lessons/v2/lesson20-numbers

echo ""
echo "===== Git status ====="
git status --short
