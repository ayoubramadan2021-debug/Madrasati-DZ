#!/data/data/com.termux/files/usr/bin/bash
set -euo pipefail

PROJECT="$HOME/madrasati-dz"
AUDIO_DIR="$PROJECT/public/audio/teachers/taline/lesson_45_complete_table"
NARRATION="$AUDIO_DIR/narration.json"
BACKUP="$PROJECT/backups/lesson45_nulahizu_$(date '+%Y%m%d_%H%M%S')"
BUILD_LOG="/sdcard/Download/lesson45_nulahizu_build.log"

mkdir -p "$BACKUP"

for file in narration.json lesson45_s1.mp3 lesson45_s1.json lesson45_s2.mp3 lesson45_s2.json; do
  if [ ! -s "$AUDIO_DIR/$file" ]; then
    echo "❌ الملف مفقود: $AUDIO_DIR/$file"
    exit 1
  fi

  cp "$AUDIO_DIR/$file" "$BACKUP/$file"
done

python - "$NARRATION" <<'PY'
import json
import sys
from pathlib import Path

path = Path(sys.argv[1])
scenes = json.loads(path.read_text(encoding="utf-8"))

if len(scenes) != 6:
    raise SystemExit(f"❌ عدد المشاهد غير صحيح: {len(scenes)}")

scenes[0]["text"] = (
    "هَذَا جَدْوَلٌ بَسِيطٌ. "
    "نُلاحِظُ عَنَاوِينَ الْخَانَاتِ، "
    "ثُمَّ نُكْمِلُ الْمَعْلُومَاتِ النَّاقِصَةَ."
)

scenes[1]["text"] = (
    "نُلاحِظُ الْبَضَائِعَ وَأَثْمَانَهَا، "
    "ثُمَّ نَكْتُبُ كُلَّ ثَمَنٍ فِي الْخَانَةِ الْمُنَاسِبَةِ."
)

path.write_text(
    json.dumps(scenes, ensure_ascii=False, indent=2) + "\n",
    encoding="utf-8",
)

print("✅ تم تصحيح نُلاحِظُ في نصي المشهدين S1 وS2.")
PY

python -c "import edge_tts" 2>/dev/null || pip install edge-tts

python - "$AUDIO_DIR" <<'PY'
import asyncio
import json
import re
import sys
from pathlib import Path

import edge_tts

audio_dir = Path(sys.argv[1])
scenes = json.loads(
    (audio_dir / "narration.json").read_text(encoding="utf-8")
)

VOICE = "ar-DZ-AminaNeural"


def clean_word(value):
    return re.sub(
        r'[،,.!?؟؛:«»"()[\]{}]',
        "",
        str(value or "").strip(),
    )


def to_ms(value):
    value = int(value or 0)
    return int(value / 10000) if value > 100000 else value


async def generate(scene):
    key = scene["key"]
    audio_data = bytearray()
    timings = []

    communicator = edge_tts.Communicate(
        text=scene["text"],
        voice=VOICE,
        rate="-6%",
        pitch="+0Hz",
        volume="+0%",
        boundary="WordBoundary",
    )

    async for event in communicator.stream():
        event_type = event.get("type")

        if event_type == "audio":
            audio_data.extend(event["data"])
            continue

        if event_type != "WordBoundary":
            continue

        word = clean_word(
            event.get("text")
            or event.get("Text")
            or ""
        )

        if word:
            timings.append({
                "text": word,
                "offset": to_ms(
                    event.get("offset", event.get("Offset", 0))
                ),
                "duration": max(
                    280,
                    to_ms(
                        event.get(
                            "duration",
                            event.get("Duration", 0),
                        )
                    ),
                ),
            })

    if not audio_data:
        raise RuntimeError(f"{key}: لم يتم توليد الصوت.")

    if not timings:
        raise RuntimeError(f"{key}: لم يتم توليد الكاريوكي.")

    (audio_dir / f"{key}.mp3").write_bytes(audio_data)

    (audio_dir / f"{key}.json").write_text(
        json.dumps(timings, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )

    print(f"✅ {key}: {len(timings)} كلمة")


async def main():
    await generate(scenes[0])
    await generate(scenes[1])


asyncio.run(main())
PY

cd "$PROJECT"

rm -rf dist
rm -rf node_modules/.vite

if npm run build > "$BUILD_LOG" 2>&1; then
  echo "============================================================"
  echo "✅ تم تصحيح الكلمة إلى نُلاحِظُ في S1 وS2."
  echo "✅ أُعيد توليد الصوت والكاريـوكي للمشهدين."
  echo "✅ npm build ناجح."
  echo "✅ النسخة الاحتياطية: $BACKUP"
  echo "============================================================"
else
  echo "❌ npm build فشل."
  tail -n 60 "$BUILD_LOG"
  exit 1
fi
