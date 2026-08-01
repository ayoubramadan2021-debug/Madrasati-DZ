#!/data/data/com.termux/files/usr/bin/bash

set -e

PROJECT=~/project
SRC=/sdcard/Pictures
TMP=/data/data/com.termux/files/usr/tmp/lesson16
DEST=$PROJECT/public/lessons/v2/lesson16-health

mkdir -p "$TMP"
mkdir -p "$DEST"

echo "=== Compressing images ==="
for i in "$SRC"/S*.png; do
    [ -f "$i" ] || continue
    name=$(basename "${i%.png}")
    cwebp -quiet -q 82 "$i" -o "$TMP/$name.webp"
done

echo "=== Copying to project ==="
cp "$TMP"/S1.webp "$DEST"/s1.webp
cp "$TMP"/S2.webp "$DEST"/s2.webp
cp "$TMP"/S3.webp "$DEST"/s3.webp
cp "$TMP"/S4.webp "$DEST"/s4.webp
cp "$TMP"/S5.webp "$DEST"/s5.webp
cp "$TMP"/S6.webp "$DEST"/s6.webp

echo
echo "=== Lesson 16 images ==="
ls -lh "$DEST"
echo
echo "Done."
