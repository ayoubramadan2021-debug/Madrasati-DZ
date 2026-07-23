#!/data/data/com.termux/files/usr/bin/bash
set -Eeuo pipefail

PROJECT="$HOME/madrasati-dz"
DOWNLOAD="/sdcard/Download"
IMAGES_DIR="$DOWNLOAD/images-s1-s60"

PROJECT_ARCHIVE="$DOWNLOAD/madrasati-dz-source.tar.gz"
IMAGES_ARCHIVE="$DOWNLOAD/images-s1-s60.zip"

echo
echo "════════════════════════════════════"
echo "1) التحقق من المجلدات"
echo "════════════════════════════════════"

if [[ ! -d "$PROJECT" ]]; then
  echo "❌ المشروع غير موجود:"
  echo "$PROJECT"
  exit 1
fi

if [[ ! -d "$DOWNLOAD" ]]; then
  echo "❌ لا يمكن الوصول إلى مجلد Download."
  echo "نفذ أولًا: termux-setup-storage"
  exit 1
fi

if [[ ! -d "$IMAGES_DIR" ]]; then
  echo "❌ مجلد الصور غير موجود:"
  echo "$IMAGES_DIR"
  echo
  echo "أنشئ داخل Download مجلدًا اسمه:"
  echo "images-s1-s60"
  echo "ثم ضع داخله الصور النهائية من s1 إلى s60."
  exit 1
fi

echo "✅ المشروع موجود"
echo "✅ مجلد الصور موجود"

echo
echo "════════════════════════════════════"
echo "2) التحقق من عدد الصور"
echo "════════════════════════════════════"

IMAGE_COUNT="$(
  find "$IMAGES_DIR" -maxdepth 1 -type f \
    \( -iname '*.png' -o -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.webp' \) \
    | wc -l
)"

echo "عدد الصور الموجودة: $IMAGE_COUNT"

if [[ "$IMAGE_COUNT" -ne 60 ]]; then
  echo "❌ يجب أن يحتوي المجلد على 60 صورة بالضبط."
  exit 1
fi

echo "✅ عدد الصور صحيح: 60"

echo
echo "════════════════════════════════════"
echo "3) إنشاء نسخة المشروع"
echo "════════════════════════════════════"

rm -f "$PROJECT_ARCHIVE"

tar \
  --exclude='madrasati-dz/node_modules' \
  --exclude='madrasati-dz/.git' \
  --exclude='madrasati-dz/dist' \
  --exclude='madrasati-dz/backups' \
  -czf "$PROJECT_ARCHIVE" \
  -C "$HOME" \
  madrasati-dz

echo "✅ تم إنشاء:"
echo "$PROJECT_ARCHIVE"

echo
echo "════════════════════════════════════"
echo "4) ضغط الصور"
echo "════════════════════════════════════"

if ! command -v zip >/dev/null 2>&1; then
  pkg install zip -y
fi

rm -f "$IMAGES_ARCHIVE"

cd "$DOWNLOAD"
zip -rq "$IMAGES_ARCHIVE" "images-s1-s60"

echo "✅ تم إنشاء:"
echo "$IMAGES_ARCHIVE"

echo
echo "════════════════════════════════════"
echo "5) التحقق النهائي"
echo "════════════════════════════════════"

ls -lh "$PROJECT_ARCHIVE" "$IMAGES_ARCHIVE"

echo
echo "بصمات الملفات:"
sha256sum "$PROJECT_ARCHIVE" "$IMAGES_ARCHIVE"

echo
echo "✅ انتهى التجهيز."
echo "ارفع الملفين من تطبيق ChatGPT:"
echo "1) madrasati-dz-source.tar.gz"
echo "2) images-s1-s60.zip"
