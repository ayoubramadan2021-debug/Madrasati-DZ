#!/data/data/com.termux/files/usr/bin/bash
set -euo pipefail

SOURCE="/sdcard/Pictures"
REPORT="/sdcard/Download/lesson44_pictures_verification.txt"

python -c "from PIL import Image" 2>/dev/null || pip install pillow

python - "$SOURCE" "$REPORT" <<'PY'
import hashlib
import sys
from pathlib import Path
from PIL import Image, ImageOps

source_dir = Path(sys.argv[1])
report_path = Path(sys.argv[2])

extensions = [".png", ".jpg", ".jpeg", ".webp"]
results = []
errors = []
found_paths = set()

for scene in range(1, 7):
    matches = []

    for extension in extensions:
        candidate = source_dir / f"s{scene}{extension}"

        if candidate.is_file():
            matches.append(candidate)

    if not matches:
        errors.append(
            f"S{scene}: لا توجد صورة باسم s{scene} داخل Pictures"
        )
        continue

    if len(matches) > 1:
        names = ", ".join(path.name for path in matches)
        errors.append(
            f"S{scene}: توجد نسخ متعددة تحمل الاسم نفسه: {names}"
        )
        continue

    path = matches[0]
    found_paths.add(path.resolve())

    try:
        with Image.open(path) as image:
            image = ImageOps.exif_transpose(image)
            image.verify()

        with Image.open(path) as image:
            image = ImageOps.exif_transpose(image)
            width, height = image.size
            mode = image.mode
            file_format = image.format or path.suffix.lstrip(".").upper()

        digest = hashlib.sha256(path.read_bytes()).hexdigest()

        orientation = (
            "عمودية"
            if height > width
            else "أفقية"
            if width > height
            else "مربعة"
        )

        dimension_status = (
            "✅ مناسبة"
            if (width, height) == (1024, 1536)
            else "⚠️ ستحتاج تحويلًا إلى 1024×1536"
        )

        results.append({
            "scene": scene,
            "name": path.name,
            "path": str(path),
            "format": file_format,
            "mode": mode,
            "width": width,
            "height": height,
            "orientation": orientation,
            "size": path.stat().st_size,
            "sha256": digest,
            "dimension_status": dimension_status,
        })

    except Exception as error:
        errors.append(
            f"S{scene}: الملف تالف أو غير قابل للقراءة: {error}"
        )

duplicate_hashes = {}

for result in results:
    duplicate_hashes.setdefault(
        result["sha256"],
        [],
    ).append(result["scene"])

for digest, scenes in duplicate_hashes.items():
    if len(scenes) > 1:
        errors.append(
            "الصور التالية متطابقة تمامًا وقد يكون هناك خلط: "
            + ", ".join(f"S{scene}" for scene in scenes)
        )

lines = [
    "============================================================",
    "LESSON 44 — PICTURES VERIFICATION",
    "============================================================",
]

for result in results:
    lines.extend([
        f"S{result['scene']}",
        f"  الملف: {result['name']}",
        f"  المسار: {result['path']}",
        f"  الصيغة: {result['format']}",
        f"  الأبعاد: {result['width']}×{result['height']}",
        f"  الاتجاه: {result['orientation']}",
        f"  نمط الصورة: {result['mode']}",
        f"  الحجم: {result['size']} bytes",
        f"  SHA256: {result['sha256'][:16]}",
        f"  التقييم: {result['dimension_status']}",
        "------------------------------------------------------------",
    ])

lines.append(f"الصور السليمة: {len(results)} / 6")
lines.append(f"الأخطاء أو التحذيرات الخطيرة: {len(errors)}")

if errors:
    lines.append("------------------------------------------------------------")

    for error in errors:
        lines.append(f"❌ {error}")

if len(results) == 6 and not errors:
    lines.append(
        "النتيجة: الصور الست موجودة وسليمة ومنفصلة، ويمكن ربطها بالكاريـوكي."
    )
else:
    lines.append(
        "النتيجة: لا يتم تثبيت الصور قبل معالجة الأخطاء المذكورة."
    )

lines.append("============================================================")

report = "\n".join(lines) + "\n"
report_path.write_text(report, encoding="utf-8")
print(report)

if len(results) != 6 or errors:
    raise SystemExit(1)
PY
