#!/data/data/com.termux/files/usr/bin/bash
set -e
cd "$HOME/madrasati-dz"

echo "===== 1) تحقق قبل إنشاء تمارين الدرس 20 ====="
[ -f package.json ] || { echo "❌ لست داخل المشروع"; exit 1; }
[ -f src/features/lesson-v2/content/lesson20.ts ] || { echo "❌ lesson20.ts غير موجود"; exit 1; }

for n in 1 2 3 4 5 6; do
  [ -f "public/lessons/v2/lesson20-numbers/s$n.webp" ] || { echo "❌ صورة ناقصة: s$n.webp"; exit 1; }
done

command -v edge-tts >/dev/null || { echo "❌ edge-tts غير مثبت"; exit 1; }

echo "✅ التحقق ناجح"

echo ""
echo "===== 2) إنشاء ملفات التمارين ====="

cat > src/features/lesson-v2/content/lesson20_exercise1.ts <<'TS'
import type { RankOrderItem } from "../exercises-v2/RankOrderExerciseV2";

export const LESSON_20_EXERCISE_1_AUDIO_BASE = "/audio/lesson_20_exercise1";

export const LESSON_20_EXERCISE_1: RankOrderItem[] = [
  {
    scene_image: "/lessons/v2/lesson20-numbers/s3.webp",
    question_audio_key: "q1",
    title: "أَجِدُ العَدَدَ التَّالِي",
    instruction: "أُنْظُرُوا إِلَى العَدَدِ، ثُمَّ اخْتَارُوا العَدَدَ التَّالِي.",
    question: "مَا العَدَدُ التَّالِي لِلْعَدَدِ 3؟",
    mode: "pickRank",
    correct: "4",
    options: ["2", "4", "5", "1"],
  },
  {
    scene_image: "/lessons/v2/lesson20-numbers/s3.webp",
    question_audio_key: "q2",
    title: "أَجِدُ العَدَدَ التَّالِي",
    instruction: "أُنْظُرُوا إِلَى العَدَدِ.",
    question: "مَا العَدَدُ التَّالِي لِلْعَدَدِ 5؟",
    mode: "pickRank",
    correct: "6",
    options: ["6", "4", "7", "3"],
  },
  {
    scene_image: "/lessons/v2/lesson20-numbers/s3.webp",
    question_audio_key: "q3",
    title: "أَجِدُ العَدَدَ التَّالِي",
    instruction: "نَبْحَثُ عَنِ العَدَدِ الَّذِي يَأْتِي بَعْدَهُ.",
    question: "مَا العَدَدُ التَّالِي لِلْعَدَدِ 8؟",
    mode: "pickRank",
    correct: "9",
    options: ["7", "10", "9", "6"],
  },
  {
    scene_image: "/lessons/v2/lesson20-numbers/s2.webp",
    question_audio_key: "q4",
    title: "أَجِدُ العَدَدَ التَّالِي",
    instruction: "أُكْمِلُوا المُتَتَالِيَةَ.",
    question: "أُكْمِلُ: 1، 2، 3، ؟",
    mode: "pickRank",
    correct: "4",
    options: ["5", "2", "1", "4"],
  },
  {
    scene_image: "/lessons/v2/lesson20-numbers/s2.webp",
    question_audio_key: "q5",
    title: "أَجِدُ العَدَدَ التَّالِي",
    instruction: "أُكْمِلُوا المُتَتَالِيَةَ.",
    question: "أُكْمِلُ: 7، 8، 9، ؟",
    mode: "pickRank",
    correct: "10",
    options: ["10", "8", "6", "9"],
  },
];
TS

cat > src/features/lesson-v2/content/lesson20_exercise2.ts <<'TS'
import type { RankOrderItem } from "../exercises-v2/RankOrderExerciseV2";

export const LESSON_20_EXERCISE_2_AUDIO_BASE = "/audio/lesson_20_exercise2";

export const LESSON_20_EXERCISE_2: RankOrderItem[] = [
  {
    scene_image: "/lessons/v2/lesson20-numbers/s4.webp",
    question_audio_key: "q1",
    title: "أَجِدُ العَدَدَ السَّابِق",
    instruction: "أُنْظُرُوا إِلَى العَدَدِ، ثُمَّ اخْتَارُوا العَدَدَ السَّابِق.",
    question: "مَا العَدَدُ السَّابِقُ لِلْعَدَدِ 4؟",
    mode: "pickRank",
    correct: "3",
    options: ["2", "5", "3", "4"],
  },
  {
    scene_image: "/lessons/v2/lesson20-numbers/s4.webp",
    question_audio_key: "q2",
    title: "أَجِدُ العَدَدَ السَّابِق",
    instruction: "نَبْحَثُ عَنِ العَدَدِ الَّذِي يَأْتِي قَبْلَهُ.",
    question: "مَا العَدَدُ السَّابِقُ لِلْعَدَدِ 6؟",
    mode: "pickRank",
    correct: "5",
    options: ["5", "7", "4", "6"],
  },
  {
    scene_image: "/lessons/v2/lesson20-numbers/s4.webp",
    question_audio_key: "q3",
    title: "أَجِدُ العَدَدَ السَّابِق",
    instruction: "أُنْظُرُوا جَيِّدًا.",
    question: "مَا العَدَدُ السَّابِقُ لِلْعَدَدِ 9؟",
    mode: "pickRank",
    correct: "8",
    options: ["10", "7", "9", "8"],
  },
  {
    scene_image: "/lessons/v2/lesson20-numbers/s2.webp",
    question_audio_key: "q4",
    title: "أَجِدُ العَدَدَ السَّابِق",
    instruction: "أُكْمِلُوا المُتَتَالِيَةَ.",
    question: "أُكْمِلُ: ؟، 5، 6",
    mode: "pickRank",
    correct: "4",
    options: ["3", "4", "7", "5"],
  },
  {
    scene_image: "/lessons/v2/lesson20-numbers/s2.webp",
    question_audio_key: "q5",
    title: "أَجِدُ العَدَدَ السَّابِق",
    instruction: "أُكْمِلُوا المُتَتَالِيَةَ.",
    question: "أُكْمِلُ: ؟، 9، 10",
    mode: "pickRank",
    correct: "8",
    options: ["8", "9", "7", "10"],
  },
];
TS

cat > src/features/lesson-v2/content/lesson20_exercise3.ts <<'TS'
import type { RankOrderItem } from "../exercises-v2/RankOrderExerciseV2";

export const LESSON_20_EXERCISE_3_AUDIO_BASE = "/audio/lesson_20_exercise3";

export const LESSON_20_EXERCISE_3: RankOrderItem[] = [
  {
    scene_image: "/lessons/v2/lesson20-numbers/s5.webp",
    question_audio_key: "q1",
    title: "أَرْبِطُ العَدَدَ بِالكَمِّيَّةِ",
    instruction: "عُدُّوا الكُرَاتِ، ثُمَّ اخْتَارُوا العَدَدَ.",
    question: "كَمْ كُرَةً تَرَى؟",
    mode: "pickRank",
    correct: "9",
    options: ["7", "9", "8", "10"],
  },
  {
    scene_image: "/lessons/v2/lesson20-numbers/s5.webp",
    question_audio_key: "q2",
    title: "أَرْبِطُ العَدَدَ بِالكَمِّيَّةِ",
    instruction: "أُنْظُرُوا إِلَى البِطَاقَةِ وَالكُرَاتِ.",
    question: "مَا العَدَدُ المُنَاسِبُ لِتِسْعِ كُرَاتٍ؟",
    mode: "pickRank",
    correct: "9",
    options: ["9", "6", "8", "7"],
  },
  {
    scene_image: "/lessons/v2/lesson20-numbers/s2.webp",
    question_audio_key: "q3",
    title: "أَرْبِطُ العَدَدَ بِالكَمِّيَّةِ",
    instruction: "اِخْتَارُوا عَدَدَ ثَمَانِيَةِ أَشْيَاءٍ.",
    question: "مَا العَدَدُ الَّذِي يَدُلُّ عَلَى ثَمَانِيَةِ أَشْيَاءٍ؟",
    mode: "pickRank",
    correct: "8",
    options: ["6", "10", "8", "7"],
  },
  {
    scene_image: "/lessons/v2/lesson20-numbers/s2.webp",
    question_audio_key: "q4",
    title: "أَرْبِطُ العَدَدَ بِالكَمِّيَّةِ",
    instruction: "اِخْتَارُوا عَدَدَ عَشَرَةِ أَشْيَاءٍ.",
    question: "مَا العَدَدُ الَّذِي يَدُلُّ عَلَى عَشَرَةِ أَشْيَاءٍ؟",
    mode: "pickRank",
    correct: "10",
    options: ["9", "8", "7", "10"],
  },
  {
    scene_image: "/lessons/v2/lesson20-numbers/s6.webp",
    question_audio_key: "q5",
    title: "أَرْبِطُ العَدَدَ بِالكَمِّيَّةِ",
    instruction: "اِخْتَارُوا الجُمْلَةَ الصَّحِيحَةَ.",
    question: "أَيُّ جُمْلَةٍ صَحِيحَةٌ؟",
    mode: "pickRank",
    correct: "العَدَدُ 9 يَدُلُّ عَلَى تِسْعَةِ أَشْيَاءٍ",
    options: [
      "العَدَدُ 6 يَدُلُّ عَلَى عَشَرَةِ أَشْيَاءٍ",
      "العَدَدُ 9 يَدُلُّ عَلَى تِسْعَةِ أَشْيَاءٍ",
      "العَدَدُ 8 يَدُلُّ عَلَى سَبْعَةِ أَشْيَاءٍ",
      "العَدَدُ 10 يَدُلُّ عَلَى تِسْعَةِ أَشْيَاءٍ"
    ],
  },
];
TS

cat > src/features/lesson-v2/content/lesson20_exercise4.ts <<'TS'
import type { RankOrderItem } from "../exercises-v2/RankOrderExerciseV2";

export const LESSON_20_EXERCISE_4_AUDIO_BASE = "/audio/lesson_20_exercise4";

export const LESSON_20_EXERCISE_4: RankOrderItem[] = [
  {
    scene_image: "/lessons/v2/lesson20-numbers/s6.webp",
    question_audio_key: "q1",
    title: "أُرَتِّبُ الأَعْدَادَ",
    instruction: "اِخْتَارُوا العَدَدَ النَّاقِصَ.",
    question: "أُكْمِلُ: 5، 6، ؟",
    mode: "pickRank",
    correct: "7",
    options: ["6", "8", "7", "9"],
  },
  {
    scene_image: "/lessons/v2/lesson20-numbers/s6.webp",
    question_audio_key: "q2",
    title: "أُرَتِّبُ الأَعْدَادَ",
    instruction: "اِخْتَارُوا العَدَدَ النَّاقِصَ.",
    question: "أُكْمِلُ: 6، 7، ؟",
    mode: "pickRank",
    correct: "8",
    options: ["8", "9", "6", "10"],
  },
  {
    scene_image: "/lessons/v2/lesson20-numbers/s6.webp",
    question_audio_key: "q3",
    title: "أُرَتِّبُ الأَعْدَادَ",
    instruction: "اِخْتَارُوا العَدَدَ النَّاقِصَ.",
    question: "أُكْمِلُ: 7، 8، ؟",
    mode: "pickRank",
    correct: "9",
    options: ["10", "7", "9", "6"],
  },
  {
    scene_image: "/lessons/v2/lesson20-numbers/s6.webp",
    question_audio_key: "q4",
    title: "أُرَتِّبُ الأَعْدَادَ",
    instruction: "اِخْتَارُوا العَدَدَ النَّاقِصَ.",
    question: "أُكْمِلُ: 8، 9، ؟",
    mode: "pickRank",
    correct: "10",
    options: ["9", "8", "7", "10"],
  },
  {
    scene_image: "/lessons/v2/lesson20-numbers/s6.webp",
    question_audio_key: "q5",
    title: "أُرَتِّبُ الأَعْدَادَ",
    instruction: "اِخْتَارُوا المُتَتَالِيَةَ الصَّحِيحَةَ.",
    question: "أَيُّ مُتَتَالِيَةٍ صَحِيحَةٌ؟",
    mode: "pickRank",
    correct: "6، 7، 8، 9، 10",
    options: ["6، 7، 8، 9، 10", "6، 8، 7، 9، 10", "10، 9، 8، 7، 6", "7، 6، 8، 10، 9"],
  },
];
TS

echo ""
echo "===== 3) إنشاء صفحة تمارين الدرس 20 ====="

cat > src/pages/Lesson20ExercisesPage.tsx <<'TSX'
import { useState } from "react";
import LessonCompleteV2 from "../features/lesson-v2/components/LessonCompleteV2";
import RankOrderExerciseV2 from "../features/lesson-v2/exercises-v2/RankOrderExerciseV2";

import {
  LESSON_20_EXERCISE_1,
  LESSON_20_EXERCISE_1_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson20_exercise1";

import {
  LESSON_20_EXERCISE_2,
  LESSON_20_EXERCISE_2_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson20_exercise2";

import {
  LESSON_20_EXERCISE_3,
  LESSON_20_EXERCISE_3_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson20_exercise3";

import {
  LESSON_20_EXERCISE_4,
  LESSON_20_EXERCISE_4_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson20_exercise4";

type Stage = "ex1" | "ex2" | "ex3" | "ex4" | "done";

export default function Lesson20ExercisesPage() {
  const [stage, setStage] = useState<Stage>("ex1");

  if (stage === "ex1")
    return (
      <RankOrderExerciseV2
        key="ex1"
        items={LESSON_20_EXERCISE_1}
        audio_base={LESSON_20_EXERCISE_1_AUDIO_BASE}
        onComplete={() => setStage("ex2")}
      />
    );

  if (stage === "ex2")
    return (
      <RankOrderExerciseV2
        key="ex2"
        items={LESSON_20_EXERCISE_2}
        audio_base={LESSON_20_EXERCISE_2_AUDIO_BASE}
        onComplete={() => setStage("ex3")}
      />
    );

  if (stage === "ex3")
    return (
      <RankOrderExerciseV2
        key="ex3"
        items={LESSON_20_EXERCISE_3}
        audio_base={LESSON_20_EXERCISE_3_AUDIO_BASE}
        onComplete={() => setStage("ex4")}
      />
    );

  if (stage === "ex4")
    return (
      <RankOrderExerciseV2
        key="ex4"
        items={LESSON_20_EXERCISE_4}
        audio_base={LESSON_20_EXERCISE_4_AUDIO_BASE}
        onComplete={() => setStage("done")}
      />
    );

  return (
    <LessonCompleteV2
      message="أَحْسَنْتَ! أَصْبَحْتَ تَعْرِفُ مُتَتَالِيَةَ الأَعْدَادِ إِلَى عَشَرَةٍ. 🎉"
      onReplay={() => setStage("ex1")}
    />
  );
}
TSX

echo ""
echo "===== 4) توليد صوت خليل وكاريوكي التمارين ====="

python - <<'PY'
import asyncio, json, pathlib, subprocess, sys

VOICE = "ar-DZ-IsmaelNeural"
RATE = "+10%"
BASE = pathlib.Path("public/audio")

texts = {
"lesson_20_exercise1": {
"q1": "مَا العَدَدُ التَّالِي لِلْعَدَدِ ثَلَاثَة؟",
"q2": "مَا العَدَدُ التَّالِي لِلْعَدَدِ خَمْسَة؟",
"q3": "مَا العَدَدُ التَّالِي لِلْعَدَدِ ثَمَانِيَة؟",
"q4": "أُكْمِلُ: وَاحِد، اِثْنَان، ثَلَاثَة، مَاذَا بَعْدَهَا؟",
"q5": "أُكْمِلُ: سَبْعَة، ثَمَانِيَة، تِسْعَة، مَاذَا بَعْدَهَا؟",
},
"lesson_20_exercise2": {
"q1": "مَا العَدَدُ السَّابِقُ لِلْعَدَدِ أَرْبَعَة؟",
"q2": "مَا العَدَدُ السَّابِقُ لِلْعَدَدِ سِتَّة؟",
"q3": "مَا العَدَدُ السَّابِقُ لِلْعَدَدِ تِسْعَة؟",
"q4": "أُكْمِلُ: مَاذَا يَأْتِي قَبْلَ خَمْسَة، سِتَّة؟",
"q5": "أُكْمِلُ: مَاذَا يَأْتِي قَبْلَ تِسْعَة، عَشَرَة؟",
},
"lesson_20_exercise3": {
"q1": "كَمْ كُرَةً تَرَى؟",
"q2": "مَا العَدَدُ المُنَاسِبُ لِتِسْعِ كُرَاتٍ؟",
"q3": "مَا العَدَدُ الَّذِي يَدُلُّ عَلَى ثَمَانِيَةِ أَشْيَاءٍ؟",
"q4": "مَا العَدَدُ الَّذِي يَدُلُّ عَلَى عَشَرَةِ أَشْيَاءٍ؟",
"q5": "أَيُّ جُمْلَةٍ صَحِيحَةٌ؟",
},
"lesson_20_exercise4": {
"q1": "أُكْمِلُ: خَمْسَة، سِتَّة، مَا العَدَدُ النَّاقِصُ؟",
"q2": "أُكْمِلُ: سِتَّة، سَبْعَة، مَا العَدَدُ النَّاقِصُ؟",
"q3": "أُكْمِلُ: سَبْعَة، ثَمَانِيَة، مَا العَدَدُ النَّاقِصُ؟",
"q4": "أُكْمِلُ: ثَمَانِيَة، تِسْعَة، مَا العَدَدُ النَّاقِصُ؟",
"q5": "أَيُّ مُتَتَالِيَةٍ صَحِيحَةٌ؟",
},
}

try:
    import edge_tts
except Exception:
    subprocess.check_call([sys.executable, "-m", "pip", "install", "edge-tts"])
    import edge_tts

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

    js.write_text(json.dumps(words, ensure_ascii=False, indent=2), encoding="utf-8")
    print("✅", folder, key)

async def main():
    for folder, qs in texts.items():
        for key, text in qs.items():
            await make_one(folder, key, text)

asyncio.run(main())
PY

echo ""
echo "===== 5) ربط Route التمارين في App وLessonV2Page ====="

python - <<'PY'
from pathlib import Path

app = Path("src/App.tsx")
txt = app.read_text(encoding="utf-8")

route = '        <Route path="/lesson20-exercises" element={lazy(() => import("./pages/Lesson20ExercisesPage"), "تمارين الدرس 20")} />'

if "/lesson20-exercises" not in txt:
    txt = txt.replace(
        '        <Route path="/lesson19-exercises" element={lazy(() => import("./pages/Lesson19ExercisesPage"), "تمارين الدرس 19")} />',
        '        <Route path="/lesson19-exercises" element={lazy(() => import("./pages/Lesson19ExercisesPage"), "تمارين الدرس 19")} />\n' + route
    )

app.write_text(txt, encoding="utf-8")

p = Path("src/pages/LessonV2Page.tsx")
lt = p.read_text(encoding="utf-8")

if 'lessonId === "lesson20"' not in lt:
    lt = lt.replace(
        ': lessonId === "lesson19"\n        ? navigate("/lesson19-exercises")',
        ': lessonId === "lesson19"\n        ? navigate("/lesson19-exercises")\n        : lessonId === "lesson20"\n        ? navigate("/lesson20-exercises")'
    )

p.write_text(lt, encoding="utf-8")
PY

echo ""
echo "===== 6) تحقق ====="
ls -lh src/features/lesson-v2/content/lesson20_exercise*.ts
ls -lh src/pages/Lesson20ExercisesPage.tsx
ls -lh public/audio/lesson_20_exercise1 | head
grep -n "lesson20-exercises\|Lesson20ExercisesPage" src/App.tsx src/pages/LessonV2Page.tsx

echo ""
echo "===== 7) Build ====="
npm run build

echo ""
echo "===== Git status ====="
git status --short
