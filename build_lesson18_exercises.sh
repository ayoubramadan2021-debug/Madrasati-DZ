#!/data/data/com.termux/files/usr/bin/bash
set -e
cd "$HOME/madrasati-dz"

echo "===== تحقق قبل إنشاء التمارين ====="
[ -f package.json ] || { echo "❌ لست داخل المشروع"; exit 1; }
[ -f src/features/lesson-v2/content/lesson18.ts ] || { echo "❌ lesson18.ts غير موجود"; exit 1; }
for n in 1 2 3 4 5 6; do
  [ -f "public/lessons/v2/lesson18-position/s$n.webp" ] || { echo "❌ صورة ناقصة s$n.webp"; exit 1; }
done

echo "✅ التحقق ناجح"

cat > src/features/lesson-v2/content/lesson18_exercise1.ts <<'TS'
import type { RankOrderItem } from "../exercises-v2/RankOrderExerciseV2";

export const LESSON_18_EXERCISE_1_AUDIO_BASE = "/audio/lesson_18_exercise1";

export const LESSON_18_EXERCISE_1: RankOrderItem[] = [
  {
    scene_image: "/lessons/v2/lesson18-position/s2.webp",
    question_audio_key: "q1",
    title: "أُمَيِّزُ اليَمِينَ وَاليَسَارَ",
    instruction: "أُنْظُرُوا إِلَى الطِّفْلِ جَيِّدًا.",
    question: "أَيْنَ يُوجَدُ القِطُّ؟",
    mode: "pickRank",
    correct: "عَنْ يَمِينِ الطِّفْلِ",
    options: ["عَنْ يَسَارِ الطِّفْلِ", "خَلْفَ الطِّفْلِ", "عَنْ يَمِينِ الطِّفْلِ", "فَوْقَ الطِّفْلِ"],
  },
  {
    scene_image: "/lessons/v2/lesson18-position/s2.webp",
    question_audio_key: "q2",
    title: "أُمَيِّزُ اليَمِينَ وَاليَسَارَ",
    instruction: "أُنْظُرُوا إِلَى الطِّفْلِ وَالحَيَوَانَاتِ.",
    question: "أَيْنَ يُوجَدُ الكَلْبُ؟",
    mode: "pickRank",
    correct: "عَنْ يَسَارِ الطِّفْلِ",
    options: ["عَنْ يَسَارِ الطِّفْلِ", "عَنْ يَمِينِ الطِّفْلِ", "تَحْتَ الطِّفْلِ", "دَاخِلَ القِسْمِ"],
  },
  {
    scene_image: "/lessons/v2/lesson18-position/s2.webp",
    question_audio_key: "q3",
    title: "أُمَيِّزُ اليَمِينَ وَاليَسَارَ",
    instruction: "أُنْظُرُوا إِلَى جِهَةِ اليَمِينِ.",
    question: "مَنْ يُوجَدُ عَنْ يَمِينِ الطِّفْلِ؟",
    mode: "pickRank",
    correct: "القِطُّ",
    options: ["الكَلْبُ", "المُعَلِّمَةُ", "الكُرَةُ", "القِطُّ"],
  },
  {
    scene_image: "/lessons/v2/lesson18-position/s2.webp",
    question_audio_key: "q4",
    title: "أُمَيِّزُ اليَمِينَ وَاليَسَارَ",
    instruction: "أُنْظُرُوا إِلَى جِهَةِ اليَسَارِ.",
    question: "مَنْ يُوجَدُ عَنْ يَسَارِ الطِّفْلِ؟",
    mode: "pickRank",
    correct: "الكَلْبُ",
    options: ["القِطُّ", "الكَلْبُ", "الكِتَابُ", "الحَقِيبَةُ"],
  },
  {
    scene_image: "/lessons/v2/lesson18-position/s2.webp",
    question_audio_key: "q5",
    title: "أُمَيِّزُ اليَمِينَ وَاليَسَارَ",
    instruction: "اِخْتَرِ الجُمْلَةَ الصَّحِيحَةَ.",
    question: "أَيُّ جُمْلَةٍ صَحِيحَةٌ؟",
    mode: "pickRank",
    correct: "القِطُّ عَنْ يَمِينِ الطِّفْلِ",
    options: ["الكَلْبُ عَنْ يَمِينِ الطِّفْلِ", "القِطُّ عَنْ يَمِينِ الطِّفْلِ", "القِطُّ تَحْتَ الطَّاوِلَةِ", "الكَلْبُ دَاخِلَ الصُّنْدُوقِ"],
  },
];
TS

cat > src/features/lesson-v2/content/lesson18_exercise2.ts <<'TS'
import type { RankOrderItem } from "../exercises-v2/RankOrderExerciseV2";

export const LESSON_18_EXERCISE_2_AUDIO_BASE = "/audio/lesson_18_exercise2";

export const LESSON_18_EXERCISE_2: RankOrderItem[] = [
  {
    scene_image: "/lessons/v2/lesson18-position/s3.webp",
    question_audio_key: "q1",
    title: "أُمَيِّزُ فَوْقَ وَتَحْتَ",
    instruction: "أُنْظُرُوا إِلَى الطَّاوِلَةِ.",
    question: "أَيْنَ يُوجَدُ الكِتَابُ؟",
    mode: "pickRank",
    correct: "فَوْقَ الطَّاوِلَةِ",
    options: ["تَحْتَ الطَّاوِلَةِ", "خَلْفَ الطَّاوِلَةِ", "فَوْقَ الطَّاوِلَةِ", "دَاخِلَ الطَّاوِلَةِ"],
  },
  {
    scene_image: "/lessons/v2/lesson18-position/s3.webp",
    question_audio_key: "q2",
    title: "أُمَيِّزُ فَوْقَ وَتَحْتَ",
    instruction: "أُنْظُرُوا إِلَى الكُرَةِ.",
    question: "أَيْنَ تُوجَدُ الكُرَةُ؟",
    mode: "pickRank",
    correct: "تَحْتَ الطَّاوِلَةِ",
    options: ["تَحْتَ الطَّاوِلَةِ", "فَوْقَ الطَّاوِلَةِ", "أَمَامَ الطَّاوِلَةِ", "عَنْ يَمِينِ الطَّاوِلَةِ"],
  },
  {
    scene_image: "/lessons/v2/lesson18-position/s3.webp",
    question_audio_key: "q3",
    title: "أُمَيِّزُ فَوْقَ وَتَحْتَ",
    instruction: "أُنْظُرُوا إِلَى الشَّيْءِ المَوْجُودِ فَوْقَ الطَّاوِلَةِ.",
    question: "مَا الشَّيْءُ المَوْجُودُ فَوْقَ الطَّاوِلَةِ؟",
    mode: "pickRank",
    correct: "الكِتَابُ",
    options: ["الكُرَةُ", "الكِتَابُ", "الحَقِيبَةُ", "الصُّنْدُوقُ"],
  },
  {
    scene_image: "/lessons/v2/lesson18-position/s3.webp",
    question_audio_key: "q4",
    title: "أُمَيِّزُ فَوْقَ وَتَحْتَ",
    instruction: "أُنْظُرُوا إِلَى الشَّيْءِ المَوْجُودِ تَحْتَ الطَّاوِلَةِ.",
    question: "مَا الشَّيْءُ المَوْجُودُ تَحْتَ الطَّاوِلَةِ؟",
    mode: "pickRank",
    correct: "الكُرَةُ",
    options: ["الكِتَابُ", "القِطُّ", "الكَلْبُ", "الكُرَةُ"],
  },
  {
    scene_image: "/lessons/v2/lesson18-position/s3.webp",
    question_audio_key: "q5",
    title: "أُمَيِّزُ فَوْقَ وَتَحْتَ",
    instruction: "اِخْتَرِ الجُمْلَةَ الصَّحِيحَةَ.",
    question: "أَيُّ جُمْلَةٍ صَحِيحَةٌ؟",
    mode: "pickRank",
    correct: "الكِتَابُ فَوْقَ الطَّاوِلَةِ",
    options: ["الكِتَابُ تَحْتَ الطَّاوِلَةِ", "الكُرَةُ فَوْقَ الطَّاوِلَةِ", "الكِتَابُ فَوْقَ الطَّاوِلَةِ", "الكُرَةُ خَلْفَ الطَّاوِلَةِ"],
  },
];
TS

cat > src/features/lesson-v2/content/lesson18_exercise3.ts <<'TS'
import type { RankOrderItem } from "../exercises-v2/RankOrderExerciseV2";

export const LESSON_18_EXERCISE_3_AUDIO_BASE = "/audio/lesson_18_exercise3";

export const LESSON_18_EXERCISE_3: RankOrderItem[] = [
  {
    scene_image: "/lessons/v2/lesson18-position/s4.webp",
    question_audio_key: "q1",
    title: "أُمَيِّزُ أَمَامَ وَخَلْفَ",
    instruction: "أُنْظُرُوا إِلَى الكُرْسِيِّ.",
    question: "أَيْنَ يَقِفُ الطِّفْلُ؟",
    mode: "pickRank",
    correct: "أَمَامَ الكُرْسِيِّ",
    options: ["خَلْفَ الكُرْسِيِّ", "أَمَامَ الكُرْسِيِّ", "فَوْقَ الكُرْسِيِّ", "دَاخِلَ الكُرْسِيِّ"],
  },
  {
    scene_image: "/lessons/v2/lesson18-position/s4.webp",
    question_audio_key: "q2",
    title: "أُمَيِّزُ أَمَامَ وَخَلْفَ",
    instruction: "أُنْظُرُوا إِلَى الحَقِيبَةِ.",
    question: "أَيْنَ تُوجَدُ الحَقِيبَةُ؟",
    mode: "pickRank",
    correct: "خَلْفَ الكُرْسِيِّ",
    options: ["أَمَامَ الكُرْسِيِّ", "تَحْتَ الكُرْسِيِّ", "خَلْفَ الكُرْسِيِّ", "فَوْقَ الكُرْسِيِّ"],
  },
  {
    scene_image: "/lessons/v2/lesson18-position/s4.webp",
    question_audio_key: "q3",
    title: "أُمَيِّزُ أَمَامَ وَخَلْفَ",
    instruction: "أُنْظُرُوا إِلَى مَا أَمَامَ الكُرْسِيِّ.",
    question: "مَنْ أَمَامَ الكُرْسِيِّ؟",
    mode: "pickRank",
    correct: "الطِّفْلُ",
    options: ["الحَقِيبَةُ", "الكُرَةُ", "القِطُّ", "الطِّفْلُ"],
  },
  {
    scene_image: "/lessons/v2/lesson18-position/s4.webp",
    question_audio_key: "q4",
    title: "أُمَيِّزُ أَمَامَ وَخَلْفَ",
    instruction: "أُنْظُرُوا إِلَى مَا خَلْفَ الكُرْسِيِّ.",
    question: "مَا الشَّيْءُ المَوْجُودُ خَلْفَ الكُرْسِيِّ؟",
    mode: "pickRank",
    correct: "الحَقِيبَةُ",
    options: ["الحَقِيبَةُ", "الطَّاوِلَةُ", "الكِتَابُ", "الدُّمْيَةُ"],
  },
  {
    scene_image: "/lessons/v2/lesson18-position/s4.webp",
    question_audio_key: "q5",
    title: "أُمَيِّزُ أَمَامَ وَخَلْفَ",
    instruction: "اِخْتَرِ الكَلِمَةَ المُنَاسِبَةَ.",
    question: "أَيُّ كَلِمَةٍ نَسْتَعْمِلُ لِلشَّيْءِ المَوْجُودِ وَرَاءَ الكُرْسِيِّ؟",
    mode: "pickRank",
    correct: "خَلْفَ",
    options: ["فَوْقَ", "أَمَامَ", "دَاخِلَ", "خَلْفَ"],
  },
];
TS

cat > src/features/lesson-v2/content/lesson18_exercise4.ts <<'TS'
import type { RankOrderItem } from "../exercises-v2/RankOrderExerciseV2";

export const LESSON_18_EXERCISE_4_AUDIO_BASE = "/audio/lesson_18_exercise4";

export const LESSON_18_EXERCISE_4: RankOrderItem[] = [
  {
    scene_image: "/lessons/v2/lesson18-position/s5.webp",
    question_audio_key: "q1",
    title: "أُمَيِّزُ دَاخِلَ وَخَارِجَ",
    instruction: "أُنْظُرُوا إِلَى الصُّنْدُوقِ.",
    question: "أَيْنَ تُوجَدُ الكُرَةُ؟",
    mode: "pickRank",
    correct: "دَاخِلَ الصُّنْدُوقِ",
    options: ["خَارِجَ الصُّنْدُوقِ", "فَوْقَ الصُّنْدُوقِ", "دَاخِلَ الصُّنْدُوقِ", "خَلْفَ الصُّنْدُوقِ"],
  },
  {
    scene_image: "/lessons/v2/lesson18-position/s5.webp",
    question_audio_key: "q2",
    title: "أُمَيِّزُ دَاخِلَ وَخَارِجَ",
    instruction: "أُنْظُرُوا إِلَى الدُّمْيَةِ.",
    question: "أَيْنَ تُوجَدُ الدُّمْيَةُ؟",
    mode: "pickRank",
    correct: "خَارِجَ الصُّنْدُوقِ",
    options: ["خَارِجَ الصُّنْدُوقِ", "دَاخِلَ الصُّنْدُوقِ", "تَحْتَ الصُّنْدُوقِ", "عَنْ يَمِينِ الصُّنْدُوقِ"],
  },
  {
    scene_image: "/lessons/v2/lesson18-position/s5.webp",
    question_audio_key: "q3",
    title: "أُمَيِّزُ دَاخِلَ وَخَارِجَ",
    instruction: "أُنْظُرُوا إِلَى مَا دَاخِلَ الصُّنْدُوقِ.",
    question: "مَا الشَّيْءُ المَوْجُودُ دَاخِلَ الصُّنْدُوقِ؟",
    mode: "pickRank",
    correct: "الكُرَةُ",
    options: ["الدُّمْيَةُ", "الحَقِيبَةُ", "الكُرَةُ", "الكِتَابُ"],
  },
  {
    scene_image: "/lessons/v2/lesson18-position/s5.webp",
    question_audio_key: "q4",
    title: "أُمَيِّزُ دَاخِلَ وَخَارِجَ",
    instruction: "أُنْظُرُوا إِلَى مَا خَارِجَ الصُّنْدُوقِ.",
    question: "مَا الشَّيْءُ المَوْجُودُ خَارِجَ الصُّنْدُوقِ؟",
    mode: "pickRank",
    correct: "الدُّمْيَةُ",
    options: ["الصُّنْدُوقُ", "الدُّمْيَةُ", "الكُرَةُ", "الطَّاوِلَةُ"],
  },
  {
    scene_image: "/lessons/v2/lesson18-position/s5.webp",
    question_audio_key: "q5",
    title: "أُمَيِّزُ دَاخِلَ وَخَارِجَ",
    instruction: "اِخْتَرِ الجُمْلَةَ الصَّحِيحَةَ.",
    question: "أَيُّ جُمْلَةٍ صَحِيحَةٌ؟",
    mode: "pickRank",
    correct: "الكُرَةُ دَاخِلَ الصُّنْدُوقِ",
    options: ["الدُّمْيَةُ دَاخِلَ الصُّنْدُوقِ", "الكُرَةُ خَارِجَ الصُّنْدُوقِ", "الدُّمْيَةُ فَوْقَ الصُّنْدُوقِ", "الكُرَةُ دَاخِلَ الصُّنْدُوقِ"],
  },
];
TS

cat > src/pages/Lesson18ExercisesPage.tsx <<'TSX'
import { useState } from "react";
import LessonCompleteV2 from "../features/lesson-v2/components/LessonCompleteV2";
import RankOrderExerciseV2 from "../features/lesson-v2/exercises-v2/RankOrderExerciseV2";

import {
  LESSON_18_EXERCISE_1,
  LESSON_18_EXERCISE_1_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson18_exercise1";

import {
  LESSON_18_EXERCISE_2,
  LESSON_18_EXERCISE_2_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson18_exercise2";

import {
  LESSON_18_EXERCISE_3,
  LESSON_18_EXERCISE_3_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson18_exercise3";

import {
  LESSON_18_EXERCISE_4,
  LESSON_18_EXERCISE_4_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson18_exercise4";

type Stage = "ex1" | "ex2" | "ex3" | "ex4" | "done";

export default function Lesson18ExercisesPage() {
  const [stage, setStage] = useState<Stage>("ex1");

  if (stage === "ex1")
    return (
      <RankOrderExerciseV2
        key="ex1"
        items={LESSON_18_EXERCISE_1}
        audio_base={LESSON_18_EXERCISE_1_AUDIO_BASE}
        onComplete={() => setStage("ex2")}
      />
    );

  if (stage === "ex2")
    return (
      <RankOrderExerciseV2
        key="ex2"
        items={LESSON_18_EXERCISE_2}
        audio_base={LESSON_18_EXERCISE_2_AUDIO_BASE}
        onComplete={() => setStage("ex3")}
      />
    );

  if (stage === "ex3")
    return (
      <RankOrderExerciseV2
        key="ex3"
        items={LESSON_18_EXERCISE_3}
        audio_base={LESSON_18_EXERCISE_3_AUDIO_BASE}
        onComplete={() => setStage("ex4")}
      />
    );

  if (stage === "ex4")
    return (
      <RankOrderExerciseV2
        key="ex4"
        items={LESSON_18_EXERCISE_4}
        audio_base={LESSON_18_EXERCISE_4_AUDIO_BASE}
        onComplete={() => setStage("done")}
      />
    );

  return (
    <LessonCompleteV2
      message="أَحْسَنْتَ! أَصْبَحْتَ تَعْرِفُ كَيْفَ تُحَدِّدُ مَكَانَ الشَّيْءِ فِي الفَضَاءِ. 🎉"
      onReplay={() => setStage("ex1")}
    />
  );
}
TSX

cat > make_lesson18_exercises_audio.sh <<'AUD'
#!/data/data/com.termux/files/usr/bin/bash
set -e
cd "$HOME/madrasati-dz"

python - <<'PY'
import asyncio, json, pathlib, re, subprocess, sys

VOICE = "ar-DZ-AminaNeural"
RATE = "+10%"
BASE = pathlib.Path("public/audio")

texts = {
"lesson_18_exercise1": {
"q1": "أَيْنَ يُوجَدُ القِطُّ؟",
"q2": "أَيْنَ يُوجَدُ الكَلْبُ؟",
"q3": "مَنْ يُوجَدُ عَنْ يَمِينِ الطِّفْلِ؟",
"q4": "مَنْ يُوجَدُ عَنْ يَسَارِ الطِّفْلِ؟",
"q5": "أَيُّ جُمْلَةٍ صَحِيحَةٌ؟",
},
"lesson_18_exercise2": {
"q1": "أَيْنَ يُوجَدُ الكِتَابُ؟",
"q2": "أَيْنَ تُوجَدُ الكُرَةُ؟",
"q3": "مَا الشَّيْءُ المَوْجُودُ فَوْقَ الطَّاوِلَةِ؟",
"q4": "مَا الشَّيْءُ المَوْجُودُ تَحْتَ الطَّاوِلَةِ؟",
"q5": "أَيُّ جُمْلَةٍ صَحِيحَةٌ؟",
},
"lesson_18_exercise3": {
"q1": "أَيْنَ يَقِفُ الطِّفْلُ؟",
"q2": "أَيْنَ تُوجَدُ الحَقِيبَةُ؟",
"q3": "مَنْ أَمَامَ الكُرْسِيِّ؟",
"q4": "مَا الشَّيْءُ المَوْجُودُ خَلْفَ الكُرْسِيِّ؟",
"q5": "أَيُّ كَلِمَةٍ نَسْتَعْمِلُ لِلشَّيْءِ المَوْجُودِ وَرَاءَ الكُرْسِيِّ؟",
},
"lesson_18_exercise4": {
"q1": "أَيْنَ تُوجَدُ الكُرَةُ؟",
"q2": "أَيْنَ تُوجَدُ الدُّمْيَةُ؟",
"q3": "مَا الشَّيْءُ المَوْجُودُ دَاخِلَ الصُّنْدُوقِ؟",
"q4": "مَا الشَّيْءُ المَوْجُودُ خَارِجَ الصُّنْدُوقِ؟",
"q5": "أَيُّ جُمْلَةٍ صَحِيحَةٌ؟",
},
}

try:
    import edge_tts
except Exception:
    subprocess.check_call([sys.executable, "-m", "pip", "install", "edge-tts"])
    import edge_tts

def fallback_words(text):
    words = re.findall(r"[\u0600-\u06FF\u064B-\u0652ٰ]+", text)
    out, offset = [], 60
    for w in words:
        dur = max(260, min(760, len(w) * 90))
        out.append({"text": w, "offset": offset, "duration": dur})
        offset += dur + 25
    return out

async def make_one(folder, key, text):
    outdir = BASE / folder
    outdir.mkdir(parents=True, exist_ok=True)
    mp3 = outdir / f"{key}.mp3"
    js = outdir / f"{key}.json"

    communicate = edge_tts.Communicate(text, VOICE, rate=RATE)
    words = []
    with open(mp3, "wb") as f:
        async for chunk in communicate.stream():
            if chunk["type"] == "audio":
                f.write(chunk["data"])
            elif chunk["type"] == "WordBoundary":
                words.append({
                    "text": chunk.get("text", ""),
                    "offset": int(chunk["offset"] / 10000) + 60,
                    "duration": int(chunk["duration"] / 10000),
                })

    if not words:
        words = fallback_words(text)

    js.write_text(json.dumps(words, ensure_ascii=False, indent=2), encoding="utf-8")
    print("✅", folder, key)

async def main():
    for folder, qs in texts.items():
        for key, text in qs.items():
            await make_one(folder, key, text)

asyncio.run(main())
PY

echo "✅ تم توليد صوت وكاريوكي تمارين الدرس 18"
AUD

chmod +x make_lesson18_exercises_audio.sh
./make_lesson18_exercises_audio.sh

python - <<'PY'
from pathlib import Path

app = Path("src/App.tsx")
txt = app.read_text(encoding="utf-8")
route = '        <Route path="/lesson18-exercises" element={lazy(() => import("./pages/Lesson18ExercisesPage"), "تمارين الدرس 18")} />'
if "/lesson18-exercises" not in txt:
    txt = txt.replace(
        '        <Route path="/lesson17-exercises" element={lazy(() => import("./pages/Lesson17ExercisesPage"), "تمارين الدرس 17")} />',
        '        <Route path="/lesson17-exercises" element={lazy(() => import("./pages/Lesson17ExercisesPage"), "تمارين الدرس 17")} />\n' + route
    )
app.write_text(txt, encoding="utf-8")

p = Path("src/pages/LessonV2Page.tsx")
txt = p.read_text(encoding="utf-8")
txt = txt.replace('navigate("/lesson-v2/lesson18/exercises")', 'navigate("/lesson18-exercises")')
p.write_text(txt, encoding="utf-8")
PY

echo ""
echo "===== تحقق الملفات ====="
ls -lh src/features/lesson-v2/content/lesson18_exercise*.ts
ls -lh src/pages/Lesson18ExercisesPage.tsx
ls -lh public/audio/lesson_18_exercise1 | head

echo ""
echo "===== تحقق الربط ====="
grep -n "lesson18-exercises\|Lesson18ExercisesPage" src/App.tsx src/pages/LessonV2Page.tsx

echo ""
echo "===== Build ====="
npm run build
