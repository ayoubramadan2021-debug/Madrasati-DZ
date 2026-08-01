#!/data/data/com.termux/files/usr/bin/bash
set -euo pipefail

cd /data/data/com.termux/files/home/madrasati-dz

OUT="public/audio/teachers/khalil/lesson_36_amusement_sorting/exercises"
BACKUP="backups/lesson36_exercise_audio_$(date +%Y%m%d_%H%M%S)"
PYFILE="$HOME/generate_lesson36_exercise_audio.py"

mkdir -p "$BACKUP"

if [ -d "$OUT" ]; then
  cp -a "$OUT" "$BACKUP/"
fi

mkdir -p "$OUT"

cat > "$PYFILE" <<'PY'
import asyncio
import json
from pathlib import Path

import edge_tts

VOICE = "ar-SA-HamedNeural"
RATE = "-8%"
PITCH = "+0Hz"

OUTPUT = Path(
    "/data/data/com.termux/files/home/madrasati-dz/"
    "public/audio/teachers/khalil/"
    "lesson_36_amusement_sorting/exercises"
)

QUESTIONS = {
    "m1_q1_count_12":
        "كَمْ بَالُونًا فِي الْمَجْمُوعَةِ؟",
    "m1_q2_count_15":
        "كَمْ نَجْمَةً فِي الْمَجْمُوعَةِ؟",
    "m2_q1_choose_17":
        "أَيْنَ الْعَدَدُ سَبْعَةَ عَشَرَ؟",
    "m2_q2_choose_19":
        "أَيْنَ الْعَدَدُ تِسْعَةَ عَشَرَ؟",
    "m3_q1_build_14":
        "أَيُّ تَمْثِيلٍ يُكَوِّنُ الْعَدَدَ أَرْبَعَةَ عَشَرَ؟",
    "m3_q2_build_18":
        "أَيُّ تَمْثِيلٍ يُكَوِّنُ الْعَدَدَ ثَمَانِيَةَ عَشَرَ؟",
    "m4_q1_match_16":
        "أَيُّ بَطَاقَةٍ تُمَثِّلُ الْعَدَدَ سِتَّةَ عَشَرَ؟",
    "m4_q2_match_19":
        "أَيُّ عَدَدٍ يُمَثِّلُ عَشَرَةً وَتِسْعَ وَحَدَاتٍ؟",
}


async def generate(key: str, text: str) -> None:
    mp3_path = OUTPUT / f"{key}.mp3"
    json_path = OUTPUT / f"{key}.json"

    communicator = edge_tts.Communicate(
        text=text,
        voice=VOICE,
        rate=RATE,
        pitch=PITCH,
        boundary="WordBoundary",
    )

    words = []

    with mp3_path.open("wb") as audio_file:
        async for chunk in communicator.stream():
            chunk_type = chunk.get("type")

            if chunk_type == "audio":
                audio_file.write(chunk["data"])

            elif chunk_type == "WordBoundary":
                words.append({
                    "text": chunk.get("text", ""),
                    "offset": chunk.get("offset", 0) / 10000,
                    "duration": chunk.get("duration", 0) / 10000,
                })

    if not mp3_path.exists() or mp3_path.stat().st_size == 0:
        raise RuntimeError(f"لم يُنشأ الصوت: {key}")

    if not words:
        raise RuntimeError(f"لم تُنشأ حدود الكلمات: {key}")

    json_path.write_text(
        json.dumps(words, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )

    print(
        f"✅ {key}: "
        f"{mp3_path.stat().st_size // 1024} KB، "
        f"{len(words)} كلمات"
    )


async def main() -> None:
    OUTPUT.mkdir(parents=True, exist_ok=True)

    for key, text in QUESTIONS.items():
        await generate(key, text)


if __name__ == "__main__":
    asyncio.run(main())
PY

python "$PYFILE"

echo
echo "=== التحقق من الملفات ==="

KEYS=(
  m1_q1_count_12
  m1_q2_count_15
  m2_q1_choose_17
  m2_q2_choose_19
  m3_q1_build_14
  m3_q2_build_18
  m4_q1_match_16
  m4_q2_match_19
)

for KEY in "${KEYS[@]}"; do
  test -s "$OUT/$KEY.mp3"
  test -s "$OUT/$KEY.json"

  WORDS="$(python -c \
    "import json; print(len(json.load(open('$OUT/$KEY.json', encoding='utf-8'))))")"

  echo "✅ $KEY — MP3 وJSON — $WORDS كلمات"
done

echo
echo "✅ تم إنشاء 8 ملفات MP3 و8 ملفات WordBoundary JSON."
echo "النسخة الاحتياطية: $BACKUP"

rm -f "$PYFILE"
