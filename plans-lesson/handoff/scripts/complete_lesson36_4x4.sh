#!/data/data/com.termux/files/usr/bin/bash
set -euo pipefail

cd /data/data/com.termux/files/home/madrasati-dz

FILE="src/features/lesson-v2/exercises-v2/Lesson36PremiumNumbersExercises.tsx"
OUT="public/audio/teachers/khalil/lesson_36_amusement_sorting/exercises"
BACKUP="backups/lesson36_complete_4x4_$(date +%Y%m%d_%H%M%S)"
PYFILE="$HOME/generate_lesson36_4x4_audio.py"

mkdir -p "$BACKUP"
cp -p "$FILE" "$BACKUP/"
[ ! -d "$OUT" ] || cp -a "$OUT" "$BACKUP/audio"

cat > "$FILE" <<'TSX'
import PremiumExerciseEngineV2, {
  type PremiumExerciseConfig,
} from "./PremiumExerciseEngineV2";

const AUDIO_BASE =
  "/audio/teachers/khalil/lesson_36_amusement_sorting/exercises";

const audio = (key: string) => `${AUDIO_BASE}/${key}.mp3`;
const karaoke = (key: string) => `${AUDIO_BASE}/${key}.json`;

const numberChoice = (
  id: string,
  label: string,
  accent?: string,
) => ({
  id,
  label,
  accent,
  hideVisual: true,
});

const config: PremiumExerciseConfig = {
  lessonId: 36,
  minimalLayout: true,
  title: "الأعداد إلى 19",
  returnUrl: "/world2-lesson/36",

  completionTitle: "أَحْسَنْتَ!",
  completionText:
    "أَكْمَلْتَ تَمَارِينَ الْأَعْدَادِ مِنْ 10 إِلَى 19.",
  completionEmoji: "🏆",

  correctSoundUrl: "/audio/v2_feedback/correct.mp3",
  retrySoundUrl: "/audio/v2_feedback/retry.mp3",
  autoAdvanceDelayMs: 1100,
  retryResetDelayMs: 900,

  missions: [
    {
      id: "count-tap",
      title: "أَعُدُّ الْعَنَاصِرَ",
      icon: "🎈",
      questions: [
        {
          key: "m1_q1",
          prompt: "كَمْ بَالُونًا فِي الْمَجْمُوعَةِ؟",
          helper: "ألمس كل بالون وأعده بهدوء.",
          visualEmoji: "🎈",
          visualCount: 12,
          requireVisualTap: true,
          audioUrl: audio("m1_q1_count_12"),
          karaokeUrl: karaoke("m1_q1_count_12"),
          correctChoiceId: "12",
          columns: 3,
          choices: [
            numberChoice("11", "11"),
            numberChoice("12", "12"),
            numberChoice("13", "13"),
          ],
        },
        {
          key: "m1_q2",
          prompt: "كَمْ نَجْمَةً فِي الْمَجْمُوعَةِ؟",
          helper: "ألمس كل نجمة وأعدها بهدوء.",
          visualEmoji: "⭐",
          visualCount: 15,
          requireVisualTap: true,
          audioUrl: audio("m1_q2_count_15"),
          karaokeUrl: karaoke("m1_q2_count_15"),
          correctChoiceId: "15",
          columns: 3,
          choices: [
            numberChoice("14", "14"),
            numberChoice("15", "15"),
            numberChoice("16", "16"),
          ],
        },
        {
          key: "m1_q3",
          prompt: "كَمْ كُرَةً فِي الْمَجْمُوعَةِ؟",
          helper: "ألمس كل كرة وأعدها بهدوء.",
          visualEmoji: "⚽",
          visualCount: 17,
          requireVisualTap: true,
          audioUrl: audio("m1_q3_count_17"),
          karaokeUrl: karaoke("m1_q3_count_17"),
          correctChoiceId: "17",
          columns: 3,
          choices: [
            numberChoice("16", "16"),
            numberChoice("17", "17"),
            numberChoice("18", "18"),
          ],
        },
        {
          key: "m1_q4",
          prompt: "كَمْ هَدِيَّةً فِي الْمَجْمُوعَةِ؟",
          helper: "ألمس كل هدية وأعدها بهدوء.",
          visualEmoji: "🎁",
          visualCount: 19,
          requireVisualTap: true,
          audioUrl: audio("m1_q4_count_19"),
          karaokeUrl: karaoke("m1_q4_count_19"),
          correctChoiceId: "19",
          columns: 3,
          choices: [
            numberChoice("17", "17"),
            numberChoice("18", "18"),
            numberChoice("19", "19"),
          ],
        },
      ],
    },

    {
      id: "number-choice",
      title: "أَخْتَارُ الْعَدَدَ",
      icon: "🔢",
      questions: [
        {
          key: "m2_q1",
          prompt: "أَيْنَ الْعَدَدُ أَحَدَ عَشَرَ؟",
          audioUrl: audio("m2_q1_choose_11"),
          karaokeUrl: karaoke("m2_q1_choose_11"),
          correctChoiceId: "11",
          columns: 3,
          choices: [
            numberChoice("10", "10"),
            numberChoice("11", "11"),
            numberChoice("12", "12"),
          ],
        },
        {
          key: "m2_q2",
          prompt: "أَيْنَ الْعَدَدُ أَرْبَعَةَ عَشَرَ؟",
          audioUrl: audio("m2_q2_choose_14"),
          karaokeUrl: karaoke("m2_q2_choose_14"),
          correctChoiceId: "14",
          columns: 3,
          choices: [
            numberChoice("13", "13"),
            numberChoice("14", "14"),
            numberChoice("15", "15"),
          ],
        },
        {
          key: "m2_q3",
          prompt: "أَيْنَ الْعَدَدُ سَبْعَةَ عَشَرَ؟",
          audioUrl: audio("m2_q3_choose_17"),
          karaokeUrl: karaoke("m2_q3_choose_17"),
          correctChoiceId: "17",
          columns: 3,
          choices: [
            numberChoice("16", "16"),
            numberChoice("17", "17"),
            numberChoice("18", "18"),
          ],
        },
        {
          key: "m2_q4",
          prompt: "أَيْنَ الْعَدَدُ تِسْعَةَ عَشَرَ؟",
          audioUrl: audio("m2_q4_choose_19"),
          karaokeUrl: karaoke("m2_q4_choose_19"),
          correctChoiceId: "19",
          columns: 3,
          choices: [
            numberChoice("17", "17"),
            numberChoice("18", "18"),
            numberChoice("19", "19"),
          ],
        },
      ],
    },

    {
      id: "build-number",
      title: "أَبْنِي الْعَدَدَ",
      icon: "🧱",
      questions: [
        {
          key: "m3_q1",
          prompt: "أَيُّ تَمْثِيلٍ يُكَوِّنُ الْعَدَدَ 12؟",
          audioUrl: audio("m3_q1_build_12"),
          karaokeUrl: karaoke("m3_q1_build_12"),
          correctChoiceId: "10+2",
          columns: 3,
          choices: [
            numberChoice("10+1", "10 + 1"),
            numberChoice("10+2", "10 + 2"),
            numberChoice("10+3", "10 + 3"),
          ],
        },
        {
          key: "m3_q2",
          prompt: "أَيُّ تَمْثِيلٍ يُكَوِّنُ الْعَدَدَ 14؟",
          audioUrl: audio("m3_q2_build_14"),
          karaokeUrl: karaoke("m3_q2_build_14"),
          correctChoiceId: "10+4",
          columns: 3,
          choices: [
            numberChoice("10+3", "10 + 3"),
            numberChoice("10+4", "10 + 4"),
            numberChoice("10+5", "10 + 5"),
          ],
        },
        {
          key: "m3_q3",
          prompt: "أَيُّ تَمْثِيلٍ يُكَوِّنُ الْعَدَدَ 16؟",
          audioUrl: audio("m3_q3_build_16"),
          karaokeUrl: karaoke("m3_q3_build_16"),
          correctChoiceId: "10+6",
          columns: 3,
          choices: [
            numberChoice("10+5", "10 + 5"),
            numberChoice("10+6", "10 + 6"),
            numberChoice("10+7", "10 + 7"),
          ],
        },
        {
          key: "m3_q4",
          prompt: "أَيُّ تَمْثِيلٍ يُكَوِّنُ الْعَدَدَ 18؟",
          audioUrl: audio("m3_q4_build_18"),
          karaokeUrl: karaoke("m3_q4_build_18"),
          correctChoiceId: "10+8",
          columns: 3,
          choices: [
            numberChoice("10+7", "10 + 7"),
            numberChoice("10+8", "10 + 8"),
            numberChoice("10+9", "10 + 9"),
          ],
        },
      ],
    },

    {
      id: "representation-match",
      title: "أُطَابِقُ الْعَدَدَ",
      icon: "🧩",
      questions: [
        {
          key: "m4_q1",
          prompt: "أَيُّ عَدَدٍ يُمَثِّلُ عَشَرَةً وَثَلَاثَ وَحَدَاتٍ؟",
          audioUrl: audio("m4_q1_match_13"),
          karaokeUrl: karaoke("m4_q1_match_13"),
          correctChoiceId: "13",
          columns: 3,
          choices: [
            numberChoice("12", "12"),
            numberChoice("13", "13"),
            numberChoice("14", "14"),
          ],
        },
        {
          key: "m4_q2",
          prompt: "أَيُّ عَدَدٍ يُمَثِّلُ عَشَرَةً وَخَمْسَ وَحَدَاتٍ؟",
          audioUrl: audio("m4_q2_match_15"),
          karaokeUrl: karaoke("m4_q2_match_15"),
          correctChoiceId: "15",
          columns: 3,
          choices: [
            numberChoice("14", "14"),
            numberChoice("15", "15"),
            numberChoice("16", "16"),
          ],
        },
        {
          key: "m4_q3",
          prompt: "أَيُّ عَدَدٍ يُمَثِّلُ عَشَرَةً وَسَبْعَ وَحَدَاتٍ؟",
          audioUrl: audio("m4_q3_match_17"),
          karaokeUrl: karaoke("m4_q3_match_17"),
          correctChoiceId: "17",
          columns: 3,
          choices: [
            numberChoice("16", "16"),
            numberChoice("17", "17"),
            numberChoice("18", "18"),
          ],
        },
        {
          key: "m4_q4",
          prompt: "أَيُّ عَدَدٍ يُمَثِّلُ عَشَرَةً وَتِسْعَ وَحَدَاتٍ؟",
          audioUrl: audio("m4_q4_match_19"),
          karaokeUrl: karaoke("m4_q4_match_19"),
          correctChoiceId: "19",
          columns: 3,
          choices: [
            numberChoice("17", "17"),
            numberChoice("18", "18"),
            numberChoice("19", "19"),
          ],
        },
      ],
    },
  ],
};

export default function Lesson36PremiumNumbersExercises() {
  return <PremiumExerciseEngineV2 config={config} />;
}
TSX

cat > "$PYFILE" <<'PY'
import asyncio
import json
from pathlib import Path

import edge_tts

OUT = Path(
    "/data/data/com.termux/files/home/madrasati-dz/"
    "public/audio/teachers/khalil/"
    "lesson_36_amusement_sorting/exercises"
)

VOICE = "ar-SA-HamedNeural"

QUESTIONS = {
    "m1_q1_count_12": "كَمْ بَالُونًا فِي الْمَجْمُوعَةِ؟",
    "m1_q2_count_15": "كَمْ نَجْمَةً فِي الْمَجْمُوعَةِ؟",
    "m1_q3_count_17": "كَمْ كُرَةً فِي الْمَجْمُوعَةِ؟",
    "m1_q4_count_19": "كَمْ هَدِيَّةً فِي الْمَجْمُوعَةِ؟",

    "m2_q1_choose_11": "أَيْنَ الْعَدَدُ أَحَدَ عَشَرَ؟",
    "m2_q2_choose_14": "أَيْنَ الْعَدَدُ أَرْبَعَةَ عَشَرَ؟",
    "m2_q3_choose_17": "أَيْنَ الْعَدَدُ سَبْعَةَ عَشَرَ؟",
    "m2_q4_choose_19": "أَيْنَ الْعَدَدُ تِسْعَةَ عَشَرَ؟",

    "m3_q1_build_12":
        "أَيُّ تَمْثِيلٍ يُكَوِّنُ الْعَدَدَ اثْنَيْ عَشَرَ؟",
    "m3_q2_build_14":
        "أَيُّ تَمْثِيلٍ يُكَوِّنُ الْعَدَدَ أَرْبَعَةَ عَشَرَ؟",
    "m3_q3_build_16":
        "أَيُّ تَمْثِيلٍ يُكَوِّنُ الْعَدَدَ سِتَّةَ عَشَرَ؟",
    "m3_q4_build_18":
        "أَيُّ تَمْثِيلٍ يُكَوِّنُ الْعَدَدَ ثَمَانِيَةَ عَشَرَ؟",

    "m4_q1_match_13":
        "أَيُّ عَدَدٍ يُمَثِّلُ عَشَرَةً وَثَلَاثَ وَحَدَاتٍ؟",
    "m4_q2_match_15":
        "أَيُّ عَدَدٍ يُمَثِّلُ عَشَرَةً وَخَمْسَ وَحَدَاتٍ؟",
    "m4_q3_match_17":
        "أَيُّ عَدَدٍ يُمَثِّلُ عَشَرَةً وَسَبْعَ وَحَدَاتٍ؟",
    "m4_q4_match_19":
        "أَيُّ عَدَدٍ يُمَثِّلُ عَشَرَةً وَتِسْعَ وَحَدَاتٍ؟",
}


async def generate(key: str, text: str):
    mp3 = OUT / f"{key}.mp3"
    js = OUT / f"{key}.json"

    communicate = edge_tts.Communicate(
        text=text,
        voice=VOICE,
        rate="-8%",
        boundary="WordBoundary",
    )

    words = []

    with mp3.open("wb") as audio:
        async for chunk in communicate.stream():
            if chunk["type"] == "audio":
                audio.write(chunk["data"])
            elif chunk["type"] == "WordBoundary":
                words.append({
                    "text": chunk.get("text", ""),
                    "offset": chunk.get("offset", 0) / 10000,
                    "duration": chunk.get("duration", 0) / 10000,
                })

    if not words:
        raise RuntimeError(f"No WordBoundary: {key}")

    js.write_text(
        json.dumps(words, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )

    print(f"✅ {key}")


async def main():
    OUT.mkdir(parents=True, exist_ok=True)

    for key, text in QUESTIONS.items():
        mp3 = OUT / f"{key}.mp3"
        js = OUT / f"{key}.json"

        if mp3.exists() and mp3.stat().st_size > 0 and js.exists():
            print(f"⏭️ {key}")
            continue

        await generate(key, text)


asyncio.run(main())
PY

python "$PYFILE"
rm -f "$PYFILE"

QUESTION_COUNT="$(grep -c 'key: "m[1-4]_q[1-4]"' "$FILE")"
MP3_COUNT="$(find "$OUT" -maxdepth 1 -type f -name 'm*_q*.mp3' | wc -l)"
JSON_COUNT="$(find "$OUT" -maxdepth 1 -type f -name 'm*_q*.json' | wc -l)"

[ "$QUESTION_COUNT" -eq 16 ] || {
  echo "خطأ: عدد الأسئلة $QUESTION_COUNT بدل 16"
  exit 1
}

npm run build

echo
echo "✅ تم إنشاء 4 تمارين × 4 أسئلة للدرس 36."
echo "الأسئلة: $QUESTION_COUNT"
echo "ملفات MP3 المتاحة: $MP3_COUNT"
echo "ملفات JSON المتاحة: $JSON_COUNT"
echo "النسخة الاحتياطية: $BACKUP"
