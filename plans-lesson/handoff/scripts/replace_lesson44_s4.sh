#!/data/data/com.termux/files/usr/bin/bash
set -euo pipefail

PROJECT="$HOME/madrasati-dz"
SOURCE_DIR="/sdcard/Pictures"
DEST_DIR="$PROJECT/public/lessons/v2/lesson44"
BACKUP_DIR="$PROJECT/backups/lesson44_s4_$(date '+%Y%m%d_%H%M%S')"

mkdir -p "$DEST_DIR" "$BACKUP_DIR"

python -c "from PIL import Image, ImageOps" 2>/dev/null || pip install pillow

python - "$SOURCE_DIR" "$DEST_DIR" "$BACKUP_DIR" <<'PY'
import sys
from pathlib import Path
from PIL import Image, ImageOps

source_dir = Path(sys.argv[1])
dest_dir = Path(sys.argv[2])
backup_dir = Path(sys.argv[3])

extensions = [".png", ".jpg", ".jpeg", ".webp"]

source = None
for ext in extensions:
    candidate = source_dir / f"s4{ext}"
    if candidate.is_file():
        source = candidate
        break

if source is None:
    raise SystemExit(
        "❌ لم أجد s4.png أو s4.jpg أو s4.webp داخل /sdcard/Pictures"
    )

target = dest_dir / "s4.webp"

if target.is_file():
    backup = backup_dir / "s4_old.webp"
    backup.write_bytes(target.read_bytes())
    print(f"✅ تم حفظ النسخة القديمة في: {backup}")

with Image.open(source) as image:
    image = ImageOps.exif_transpose(image).convert("RGB")

    image = ImageOps.fit(
        image,
        (1024, 1536),
        method=Image.Resampling.LANCZOS,
        centering=(0.5, 0.5),
    )

    image.save(
        target,
        "WEBP",
        quality=95,
        method=6,
    )

print(f"✅ تم استبدال الصورة: {source.name} → s4.webp")
print(f"✅ الحجم النهائي: {target.stat().st_size} bytes")
PY

cd "$PROJECT"

rm -rf dist
rm -rf node_modules/.vite

npm run build

echo "============================================================"
echo "✅ تم استبدال صورة المشهد الرابع s4.webp."
echo "✅ تم حذف dist القديم وكاش Vite."
echo "✅ npm build ناجح."
echo "============================================================"
