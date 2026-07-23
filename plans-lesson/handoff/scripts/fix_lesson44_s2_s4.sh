#!/data/data/com.termux/files/usr/bin/bash
set -euo pipefail

PROJECT="$HOME/madrasati-dz"
SOURCE="/sdcard/Pictures"
DEST="$PROJECT/public/lessons/v2/lesson44"
BACKUP="$PROJECT/backups/lesson44_s2_s4_$(date '+%Y%m%d_%H%M%S')"

mkdir -p "$DEST" "$BACKUP"

python -c "from PIL import Image" 2>/dev/null || pip install pillow

python - "$SOURCE" "$DEST" "$BACKUP" <<'PY'
import sys
from pathlib import Path
from PIL import Image, ImageOps

source_dir = Path(sys.argv[1])
dest_dir = Path(sys.argv[2])
backup_dir = Path(sys.argv[3])

extensions = [".png", ".jpg", ".jpeg", ".webp"]
scenes = [2, 4]
errors = []

for scene in scenes:
    source = None

    for ext in extensions:
        candidate = source_dir / f"s{scene}{ext}"

        if candidate.is_file():
            source = candidate
            break

    if source is None:
        errors.append(
            f"لم أجد s{scene}.png أو s{scene}.jpg أو s{scene}.webp داخل Pictures"
        )
        continue

    target = dest_dir / f"s{scene}.webp"

    if target.is_file():
        backup = backup_dir / f"s{scene}_old.webp"
        backup.write_bytes(target.read_bytes())
        print(f"✅ نسخة احتياطية: {backup.name}")

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

    print(
        f"✅ S{scene}: {source.name} → {target.name} "
        f"({target.stat().st_size} bytes)"
    )

if errors:
    print("============================================================")

    for error in errors:
        print("❌", error)

    raise SystemExit(1)

print("============================================================")
print("✅ تم استبدال s2.webp و s4.webp بنجاح.")
PY

cd "$PROJECT"

rm -rf dist
rm -rf node_modules/.vite

npm run build

echo "============================================================"
echo "✅ تم استبدال الصورتين S2 وS4."
echo "✅ تم حذف dist القديم وكاش Vite."
echo "✅ npm build ناجح."
echo "============================================================"
