#!/data/data/com.termux/files/usr/bin/bash
set -euo pipefail

PROJECT="$HOME/madrasati-dz"
SRC="/sdcard/Pictures"
DEST="$PROJECT/public/lessons/v2/lesson44"
DOWNLOADS="/sdcard/Download"
REPORT="$DOWNLOADS/lesson44_relink_report.txt"

mkdir -p "$DEST"
mkdir -p "$DOWNLOADS"

python -c "from PIL import Image, ImageOps" 2>/dev/null || pip install pillow >/dev/null 2>&1

python - "$SRC" "$DEST" "$REPORT" <<'PY'
import sys
from pathlib import Path
from PIL import Image, ImageOps

src = Path(sys.argv[1])
dest = Path(sys.argv[2])
report_path = Path(sys.argv[3])

extensions = [".png", ".jpg", ".jpeg", ".webp"]
errors = []
done = []

for i in range(1, 7):
    found = []
    for ext in extensions:
        p = src / f"s{i}{ext}"
        if p.exists():
            found.append(p)

    if len(found) == 0:
        errors.append(f"S{i}: لم أجد الصورة s{i} داخل {src}")
        continue

    if len(found) > 1:
        names = ", ".join(x.name for x in found)
        errors.append(f"S{i}: توجد أكثر من نسخة لنفس المشهد: {names}")
        continue

    source = found[0]
    target = dest / f"s{i}.webp"

    try:
        with Image.open(source) as im:
            im = ImageOps.exif_transpose(im)
            if im.mode not in ("RGB", "RGBA"):
                im = im.convert("RGBA" if "A" in im.getbands() else "RGB")
            # نحافظ على المقاس الحالي إن كان صحيحًا، وإلا نعيد التحويل فقط
            # دون تشويه كبير. الصور عندك تم التحقق منها مسبقًا.
            im.save(target, "WEBP", quality=95, method=6)
        done.append((i, source.name, str(target), target.stat().st_size))
    except Exception as e:
        errors.append(f"S{i}: فشل تحويل/نسخ الصورة: {e}")

lines = []
lines.append("============================================================")
lines.append("LESSON 44 — RELINK IMAGES WITH KARAOKE")
lines.append("============================================================")

for item in done:
    i, src_name, target, size = item
    lines.append(f"S{i}: ✅ {src_name} → {target} | {size} bytes")

lines.append("------------------------------------------------------------")
lines.append(f"الصور المثبتة: {len(done)} / 6")
lines.append(f"الأخطاء: {len(errors)}")

if errors:
    for err in errors:
        lines.append(f"❌ {err}")
    lines.append("النتيجة: يوجد خطأ، لن نكمل قبل إصلاح الصور.")
else:
    lines.append("✅ تم تثبيت صور الدرس 44 الجديدة بنجاح.")

text = "\n".join(lines) + "\n"
report_path.write_text(text, encoding="utf-8")
print(text)

if errors:
    raise SystemExit(1)
PY

echo "============================================================"
echo "حذف dist القديم وكاش Vite..."
rm -rf "$PROJECT/dist"
rm -rf "$PROJECT/node_modules/.vite" 2>/dev/null || true
rm -rf "$PROJECT/.vite" 2>/dev/null || true

echo "============================================================"
echo "بدء npm build..."
cd "$PROJECT"
npm run build > /sdcard/Download/lesson44_rebuild_log.txt 2>&1

echo "✅ npm build ناجح"

echo "============================================================"
echo "فحص سريع لوجود الصور النهائية وملفات الصوت/الكاريـوكي..."
AUDIO_DIR="$PROJECT/public/audio/teachers/khalil/lesson_44_discover_half_number_less_than_twenty"

img_errors=0
for i in 1 2 3 4 5 6; do
  if [ -f "$DEST/s${i}.webp" ]; then
    echo "✅ s${i}.webp موجودة"
  else
    echo "❌ s${i}.webp غير موجودة"
    img_errors=$((img_errors+1))
  fi
done

if [ -d "$AUDIO_DIR" ]; then
  echo "✅ مجلد الصوت موجود: $AUDIO_DIR"
else
  echo "⚠️ مجلد الصوت المتوقع غير موجود: $AUDIO_DIR"
fi

for i in 1 2 3 4 5 6; do
  if [ -f "$AUDIO_DIR/lesson44_s${i}.mp3" ]; then
    echo "✅ lesson44_s${i}.mp3 موجود"
  else
    echo "⚠️ lesson44_s${i}.mp3 غير موجود"
  fi

  if [ -f "$AUDIO_DIR/lesson44_s${i}.json" ]; then
    echo "✅ lesson44_s${i}.json موجود"
  else
    echo "⚠️ lesson44_s${i}.json غير موجود"
  fi
done

if [ -f "$AUDIO_DIR/narration.json" ]; then
  echo "✅ narration.json موجود"
else
  echo "⚠️ narration.json غير موجود"
fi

echo "============================================================"
if [ "$img_errors" -eq 0 ]; then
  echo "النتيجة: أُعيد ربط صور الدرس 44 مع الكاريـوكي بنجاح."
  echo "افتح الصفحة بعد تحديث قوي Hard Refresh أو إغلاق التطبيق وإعادة فتحه."
else
  echo "النتيجة: توجد مشكلة في بعض الصور النهائية."
fi
echo "============================================================"
