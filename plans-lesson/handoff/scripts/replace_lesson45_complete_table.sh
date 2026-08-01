#!/data/data/com.termux/files/usr/bin/bash
set -euo pipefail

PROJECT="$HOME/madrasati-dz"
SOURCE="/sdcard/Pictures"

LESSON_DIR="$PROJECT/public/lessons/v2/lesson45"
AUDIO_TOKEN="lesson_45_complete_table"
AUDIO_BASE="/audio/teachers/taline/$AUDIO_TOKEN"
AUDIO_DIR="$PROJECT/public/audio/teachers/taline/$AUDIO_TOKEN"

PAGE="$PROJECT/src/pages/World2LessonPage.tsx"
BACKUP="$PROJECT/backups/lesson45_before_complete_table_$(date '+%Y%m%d_%H%M%S')"

BUILD_LOG="/sdcard/Download/lesson45_complete_table_build.log"
REPORT="/sdcard/Download/lesson45_complete_table_report.txt"

mkdir -p "$BACKUP"
mkdir -p "$LESSON_DIR"
mkdir -p "$AUDIO_DIR"
mkdir -p "/sdcard/Download"

python -c "from PIL import Image" 2>/dev/null || pip install pillow
python -c "import edge_tts" 2>/dev/null || pip install edge-tts

echo "============================================================"
echo "المرحلة 1: التحقق من الصور الست"
echo "============================================================"

python - "$SOURCE" <<'PY'
from pathlib import Path
from PIL import Image, ImageOps
import sys

source = Path(sys.argv[1])
extensions = [".png", ".jpg", ".jpeg", ".webp"]
errors = []

for i in range(1, 7):
    matches = [
        source / f"s{i}{ext}"
        for ext in extensions
        if (source / f"s{i}{ext}").is_file()
    ]

    if len(matches) == 0:
        errors.append(f"S{i}: الصورة مفقودة")
        continue

    if len(matches) > 1:
        errors.append(
            f"S{i}: توجد أكثر من نسخة: "
            + ", ".join(path.name for path in matches)
        )
        continue

    path = matches[0]

    try:
        with Image.open(path) as image:
            image = ImageOps.exif_transpose(image)
            width, height = image.size
            image.verify()

        print(
            f"✅ S{i}: {path.name} | "
            f"{width}×{height} | سليمة"
        )

    except Exception as error:
        errors.append(
            f"S{i}: الملف غير سليم: {error}"
        )

if errors:
    print("------------------------------------------------------------")

    for error in errors:
        print("❌", error)

    raise SystemExit(1)

print("✅ الصور الست موجودة وسليمة.")
PY

echo "============================================================"
echo "المرحلة 2: أرشفة الدرس القديم"
echo "============================================================"

if [ -d "$LESSON_DIR" ] && [ "$(find "$LESSON_DIR" -mindepth 1 -print -quit)" ]; then
  cp -a "$LESSON_DIR" "$BACKUP/lesson45_old"
  echo "✅ تم حفظ صور وملفات الدرس القديم."
fi

if [ -d "$AUDIO_DIR" ] && [ "$(find "$AUDIO_DIR" -mindepth 1 -print -quit)" ]; then
  cp -a "$AUDIO_DIR" "$BACKUP/audio_old"
  echo "✅ تم حفظ ملفات الصوت القديمة."
fi

rm -rf "$LESSON_DIR"
rm -rf "$AUDIO_DIR"

mkdir -p "$LESSON_DIR"
mkdir -p "$AUDIO_DIR"

echo "============================================================"
echo "المرحلة 3: تثبيت الصور S1 إلى S6"
echo "============================================================"

python - "$SOURCE" "$LESSON_DIR" <<'PY'
from pathlib import Path
from PIL import Image, ImageOps
import hashlib
import sys

source_dir = Path(sys.argv[1])
destination = Path(sys.argv[2])

extensions = [".png", ".jpg", ".jpeg", ".webp"]

for i in range(1, 7):
    source = next(
        source_dir / f"s{i}{ext}"
        for ext in extensions
        if (source_dir / f"s{i}{ext}").is_file()
    )

    target = destination / f"s{i}.webp"

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

    digest = hashlib.sha256(
        target.read_bytes()
    ).hexdigest()[:12]

    print(
        f"✅ S{i}: {source.name} → s{i}.webp "
        f"| SHA256: {digest}"
    )
PY

echo "============================================================"
echo "المرحلة 4: إنشاء سيناريو الدرس"
echo "============================================================"

cat > "$AUDIO_DIR/narration.json" <<'JSON'
[
  {
    "scene": 1,
    "key": "lesson45_s1",
    "speaker": "taline",
    "image": "/lessons/v2/lesson45/s1.webp?v=45-table-final",
    "text": "هَذَا جَدْوَلٌ بَسِيطٌ. نَلَاحِظُ عَنَاوِينَ الْخَانَاتِ، ثُمَّ نُكْمِلُ الْمَعْلُومَاتِ النَّاقِصَةَ."
  },
  {
    "scene": 2,
    "key": "lesson45_s2",
    "speaker": "taline",
    "image": "/lessons/v2/lesson45/s2.webp?v=45-table-final",
    "text": "نَلَاحِظُ الْبَضَائِعَ وَأَثْمَانَهَا، ثُمَّ نَكْتُبُ كُلَّ ثَمَنٍ فِي الْخَانَةِ الْمُنَاسِبَةِ."
  },
  {
    "scene": 3,
    "key": "lesson45_s3",
    "speaker": "taline",
    "image": "/lessons/v2/lesson45/s3.webp?v=45-table-final",
    "text": "نَعُدُّ الْمُرَبَّعَاتِ وَالدَّوَائِرَ وَالْمُثَلَّثَاتِ حَسَبَ اللَّوْنِ، ثُمَّ نُسَجِّلُ الْأَعْدَادَ فِي الْجَدْوَلِ."
  },
  {
    "scene": 4,
    "key": "lesson45_s4",
    "speaker": "taline",
    "image": "/lessons/v2/lesson45/s4.webp?v=45-table-final",
    "text": "لِتَعْيِينِ خَانَةٍ، نُلَاحِظُ تَقَاطُعَ السَّطْرِ مَعَ الْعَمُودِ. هُنَا يَتَقَاطَعُ سَطْرُ اللَّوْنِ الْأَصْفَرِ مَعَ عَمُودِ الدَّائِرَةِ."
  },
  {
    "scene": 5,
    "key": "lesson45_s5",
    "speaker": "taline",
    "image": "/lessons/v2/lesson45/s5.webp?v=45-table-final",
    "text": "نُكْمِلُ الْخَانَاتِ بِعَدِّ الْأَشْكَالِ. ثَلَاثَةُ مُرَبَّعَاتٍ خَضْرَاءَ، وَدَائِرَتَانِ خَضْرَاوَانِ، وَمُثَلَّثٌ أَخْضَرُ وَاحِدٌ."
  },
  {
    "scene": 6,
    "key": "lesson45_s6",
    "speaker": "taline",
    "image": "/lessons/v2/lesson45/s6.webp?v=45-table-final",
    "text": "أَحْسَنْتُمْ! نُلَاحِظُ الْبَيَانَاتِ، وَنَقْرَأُ السُّطُورَ وَالْأَعْمِدَةَ، ثُمَّ نُكْمِلُ الْجَدْوَلَ بِشَكْلٍ صَحِيحٍ."
  }
]
JSON

cat > "$LESSON_DIR/lesson-info.json" <<'JSON'
{
  "lesson_number": 45,
  "sort_order": 13,
  "title_ar": "إِتْمَامُ الْجَدْوَلِ",
  "title_fr": "Compléter un tableau",
  "subject": "math",
  "grade": 1,
  "speaker": "taline",
  "audio_base": "/audio/teachers/taline/lesson_45_complete_table",
  "scene_count": 6,
  "estimated_duration_seconds": 300,
  "objectives": [
    "قراءة جدول بسيط.",
    "التعرف على السطر والعمود.",
    "تعيين خانة من خلال تقاطع السطر والعمود.",
    "إكمال الخانات الناقصة انطلاقًا من المعطيات."
  ]
}
JSON

echo "✅ تم إنشاء السيناريو والمعلومات الأساسية."

echo "============================================================"
echo "المرحلة 5: توليد صوت الأستاذة تالين والكاريـوكي"
echo "============================================================"

python - "$AUDIO_DIR" <<'PY'
import asyncio
import json
import re
import sys
from pathlib import Path

import edge_tts

audio_dir = Path(sys.argv[1])
narration_file = audio_dir / "narration.json"

scenes = json.loads(
    narration_file.read_text(encoding="utf-8")
)

VOICE = "ar-DZ-AminaNeural"


def clean_word(value):
    return re.sub(
        r'[،,.!?؟؛:«»"()[\]{}]',
        "",
        str(value or "").strip(),
    )


def ticks_to_ms(value):
    value = int(value or 0)

    if value > 100000:
        return int(value / 10000)

    return value


async def generate(scene):
    key = scene["key"]
    mp3_path = audio_dir / f"{key}.mp3"
    json_path = audio_dir / f"{key}.json"

    audio = bytearray()
    timings = []

    communicate = edge_tts.Communicate(
        text=scene["text"],
        voice=VOICE,
        rate="-6%",
        pitch="+0Hz",
        volume="+0%",
        boundary="WordBoundary",
    )

    async for event in communicate.stream():
        event_type = event.get("type")

        if event_type == "audio":
            audio.extend(event["data"])
            continue

        if event_type != "WordBoundary":
            continue

        word = clean_word(
            event.get("text")
            or event.get("Text")
            or ""
        )

        if not word:
            continue

        timings.append({
            "text": word,
            "offset": ticks_to_ms(
                event.get(
                    "offset",
                    event.get("Offset", 0),
                )
            ),
            "duration": max(
                280,
                ticks_to_ms(
                    event.get(
                        "duration",
                        event.get("Duration", 0),
                    )
                ),
            ),
        })

    if not audio:
        raise RuntimeError(
            f"{key}: لم يتم توليد الصوت."
        )

    if not timings:
        raise RuntimeError(
            f"{key}: لم يتم توليد توقيت الكاريوكي."
        )

    mp3_path.write_bytes(audio)

    json_path.write_text(
        json.dumps(
            timings,
            ensure_ascii=False,
            indent=2,
        ) + "\n",
        encoding="utf-8",
    )

    print(
        f"✅ {key}: "
        f"{len(timings)} كلمة | "
        f"{len(audio)} bytes"
    )


async def main():
    if len(scenes) != 6:
        raise RuntimeError(
            f"عدد المشاهد غير صحيح: {len(scenes)}"
        )

    for scene in scenes:
        await generate(scene)


asyncio.run(main())
PY

echo "============================================================"
echo "المرحلة 6: تحديث صفحة العرض"
echo "============================================================"

python - "$PAGE" <<'PY'
from pathlib import Path
import re
import sys

page_path = Path(sys.argv[1])

if not page_path.is_file():
    raise SystemExit(
        f"❌ صفحة العرض غير موجودة: {page_path}"
    )

text = page_path.read_text(encoding="utf-8")

new_block = '''  "45": {
    title: "إِتْمَامُ الْجَدْوَلِ",
    audioToken: "lesson_45_complete_table",
  },'''

patterns = [
    re.compile(
        r'  ["\']45["\']\s*:\s*\{.*?\n\s*\},',
        re.DOTALL,
    ),
    re.compile(
        r'  45\s*:\s*\{.*?\n\s*\},',
        re.DOTALL,
    ),
]

updated = False

for pattern in patterns:
    if pattern.search(text):
        text = pattern.sub(
            new_block,
            text,
            count=1,
        )
        updated = True
        break

if not updated:
    anchors = [
        re.compile(
            r'(  ["\']44["\']\s*:\s*\{.*?\n\s*\},)',
            re.DOTALL,
        ),
        re.compile(
            r'(  44\s*:\s*\{.*?\n\s*\},)',
            re.DOTALL,
        ),
    ]

    for anchor in anchors:
        match = anchor.search(text)

        if match:
            text = (
                text[:match.end()]
                + "\n"
                + new_block
                + text[match.end():]
            )
            updated = True
            break

if not updated:
    raise SystemExit(
        "❌ لم أجد تعريف الدرس 44 أو 45 في صفحة العرض."
    )

text = re.sub(
    r'/lessons/v2/lesson45/s([1-6])\.webp'
    r'(?:\?v=[^"\']+)?',
    r'/lessons/v2/lesson45/s\1.webp?v=45-table-final',
    text,
)

page_path.write_text(
    text,
    encoding="utf-8",
)

print("✅ تم تحديث عنوان الدرس ومسار الصوت.")
PY

echo "============================================================"
echo "المرحلة 7: التحقق وإعادة البناء"
echo "============================================================"

ERRORS=0

{
  echo "============================================================"
  echo "LESSON 45 — COMPLETE TABLE FINAL REPORT"
  echo "============================================================"
} > "$REPORT"

for i in 1 2 3 4 5 6; do
  IMAGE="$LESSON_DIR/s${i}.webp"
  MP3="$AUDIO_DIR/lesson45_s${i}.mp3"
  JSON="$AUDIO_DIR/lesson45_s${i}.json"

  if [ -s "$IMAGE" ]; then
    echo "✅ s${i}.webp موجودة" >> "$REPORT"
  else
    echo "❌ s${i}.webp مفقودة" >> "$REPORT"
    ERRORS=$((ERRORS + 1))
  fi

  if [ -s "$MP3" ]; then
    echo "✅ lesson45_s${i}.mp3 موجود" >> "$REPORT"
  else
    echo "❌ lesson45_s${i}.mp3 مفقود" >> "$REPORT"
    ERRORS=$((ERRORS + 1))
  fi

  if [ -s "$JSON" ]; then
    echo "✅ lesson45_s${i}.json موجود" >> "$REPORT"
  else
    echo "❌ lesson45_s${i}.json مفقود" >> "$REPORT"
    ERRORS=$((ERRORS + 1))
  fi
done

if [ -s "$AUDIO_DIR/narration.json" ]; then
  echo "✅ narration.json موجود" >> "$REPORT"
else
  echo "❌ narration.json مفقود" >> "$REPORT"
  ERRORS=$((ERRORS + 1))
fi

cd "$PROJECT"

rm -rf dist
rm -rf node_modules/.vite

if npm run build > "$BUILD_LOG" 2>&1; then
  echo "✅ npm build ناجح" >> "$REPORT"
else
  echo "❌ npm build فشل" >> "$REPORT"
  ERRORS=$((ERRORS + 1))
fi

{
  echo "------------------------------------------------------------"
  echo "العنوان: إِتْمَامُ الْجَدْوَلِ"
  echo "المتحدثة: الأستاذة تالين"
  echo "الصوت: ar-DZ-AminaNeural"
  echo "الصور: 6 / 6"
  echo "أخطاء التحقق والبناء: $ERRORS"
  echo "النسخة الاحتياطية: $BACKUP"

  if [ "$ERRORS" -eq 0 ]; then
    echo "النتيجة: تم استبدال الدرس القديم بدرس إتمام الجدول بنجاح."
  else
    echo "النتيجة: توجد أخطاء ويجب مراجعة سجل البناء."
  fi

  echo "============================================================"
} >> "$REPORT"

cat "$REPORT"

if [ "$ERRORS" -ne 0 ]; then
  tail -n 60 "$BUILD_LOG"
  exit 1
fi
