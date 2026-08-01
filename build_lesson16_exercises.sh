#!/data/data/com.termux/files/usr/bin/bash
set -e

PROJECT="$HOME/madrasati-dz"

echo "=== 1) التحقق من المشروع ==="
if [ ! -f "$PROJECT/package.json" ]; then
  echo "❌ لم أجد المشروع: $PROJECT"
  exit 1
fi

cd "$PROJECT"
echo "✅ Project: $PROJECT"

echo ""
echo "=== 2) التحقق من صور الدرس 16 ==="
IMG_DIR="public/lessons/v2/lesson16-health"
for i in 1 2 3 4 5 6; do
  if [ ! -f "$IMG_DIR/s$i.webp" ]; then
    echo "❌ الصورة ناقصة: $IMG_DIR/s$i.webp"
    exit 1
  fi
done
echo "✅ الصور موجودة"

echo ""
echo "=== 3) التحقق من وجود محرك RankOrderExerciseV2 ==="
if [ ! -f "src/features/lesson-v2/exercises-v2/RankOrderExerciseV2.tsx" ]; then
  echo "❌ المحرك RankOrderExerciseV2 غير موجود"
  exit 1
fi
echo "✅ المحرك موجود"

echo ""
echo "=== 4) إنشاء تمرين 1: أختار المكان الآمن للعب ==="
cat > src/features/lesson-v2/content/lesson16_exercise1.ts <<'TS'
import type { RankOrderItem } from "../exercises-v2/RankOrderExerciseV2";

export const LESSON_16_EXERCISE_1_AUDIO_BASE = "/audio/lesson_16_exercise1";

export const LESSON_16_EXERCISE_1: RankOrderItem[] = [
  {
    scene_image: "/lessons/v2/lesson16-health/s4.webp",
    question_audio_key: "q1",
    title: "أَخْتَارُ مَكَانَ اللَّعِبِ الآمِنَ",
    instruction: "اِخْتَرِ المَكَانَ المُنَاسِبَ لِلَّعِبِ.",
    question: "أَيْنَ نَلْعَبُ بِأَمَانٍ؟",
    mode: "pickRank",
    correct: "فِي سَاحَةِ المَدْرَسَةِ",
    options: ["فِي سَاحَةِ المَدْرَسَةِ", "فِي الطَّرِيقِ", "قُرْبَ السَّيَّارَاتِ", "فَوْقَ مَكَانٍ عَالٍ"],
  },
  {
    scene_image: "/lessons/v2/lesson16-health/s4.webp",
    question_audio_key: "q2",
    title: "أَخْتَارُ مَكَانَ اللَّعِبِ الآمِنَ",
    instruction: "نَبْتَعِدُ عَنِ الخَطَرِ.",
    question: "أَيُّ مَكَانٍ لَا نَلْعَبُ فِيهِ؟",
    mode: "pickRank",
    correct: "الطَّرِيقُ",
    options: ["السَّاحَةُ", "الحَدِيقَةُ", "الطَّرِيقُ", "المَلْعَبُ"],
  },
  {
    scene_image: "/lessons/v2/lesson16-health/s4.webp",
    question_audio_key: "q3",
    title: "أَخْتَارُ مَكَانَ اللَّعِبِ الآمِنَ",
    instruction: "اللَّعِبُ الآمِنُ يَكُونُ فِي مَكَانٍ مُنَظَّمٍ.",
    question: "أَيُّ مَكَانٍ أَفْضَلُ لِلَّعِبِ؟",
    mode: "pickRank",
    correct: "المَلْعَبُ",
    options: ["المَلْعَبُ", "الشَّارِعُ", "الدَّرَجُ", "قُرْبَ الطَّرِيقِ"],
  },
  {
    scene_image: "/lessons/v2/lesson16-health/s4.webp",
    question_audio_key: "q4",
    title: "أَخْتَارُ مَكَانَ اللَّعِبِ الآمِنَ",
    instruction: "نَخْتَارُ مَكَانًا وَاسِعًا وَآمِنًا.",
    question: "أَيْنَ يَلْعَبُ الأَطْفَالُ بِسَلَامٍ؟",
    mode: "pickRank",
    correct: "فِي السَّاحَةِ",
    options: ["فِي السَّاحَةِ", "فِي الطَّرِيقِ", "خَلْفَ السَّيَّارَةِ", "فَوْقَ الجِدَارِ"],
  },
  {
    scene_image: "/lessons/v2/lesson16-health/s4.webp",
    question_audio_key: "q5",
    title: "أَخْتَارُ مَكَانَ اللَّعِبِ الآمِنَ",
    instruction: "المَكَانُ الآمِنُ يُسَاعِدُنَا عَلَى اللَّعِبِ بِفَرَحٍ.",
    question: "مَا المَكَانُ الَّذِي نَتَجَنَّبُهُ؟",
    mode: "pickRank",
    correct: "الشَّارِعُ",
    options: ["السَّاحَةُ", "الحَدِيقَةُ", "المَلْعَبُ", "الشَّارِعُ"],
  },
];
TS

echo ""
echo "=== 5) إنشاء تمرين 2: أتعرف أعضاء الحركة ==="
cat > src/features/lesson-v2/content/lesson16_exercise2.ts <<'TS'
import type { RankOrderItem } from "../exercises-v2/RankOrderExerciseV2";

export const LESSON_16_EXERCISE_2_AUDIO_BASE = "/audio/lesson_16_exercise2";

export const LESSON_16_EXERCISE_2: RankOrderItem[] = [
  {
    scene_image: "/lessons/v2/lesson16-health/s3.webp",
    question_audio_key: "q1",
    title: "أَتَعَرَّفُ أَعْضَاءَ الحَرَكَةِ",
    instruction: "اِخْتَرِ العُضْوَ الَّذِي نَسْتَعْمِلُهُ فِي الحَرَكَةِ.",
    question: "بِمَاذَا نَجْرِي؟",
    mode: "pickRank",
    correct: "بِالرِّجْلَيْنِ",
    options: ["بِالرِّجْلَيْنِ", "بِالأُذُنَيْنِ", "بِالعَيْنَيْنِ", "بِالشَّعْرِ"],
  },
  {
    scene_image: "/lessons/v2/lesson16-health/s3.webp",
    question_audio_key: "q2",
    title: "أَتَعَرَّفُ أَعْضَاءَ الحَرَكَةِ",
    instruction: "عِنْدَ القَفْزِ نَسْتَعْمِلُ أَعْضَاءَ جِسْمِنَا.",
    question: "بِمَاذَا نَقْفِزُ؟",
    mode: "pickRank",
    correct: "بِالرِّجْلَيْنِ",
    options: ["بِالرِّجْلَيْنِ", "بِالأَسْنَانِ", "بِالشَّعْرِ", "بِالأُذُنَيْنِ"],
  },
  {
    scene_image: "/lessons/v2/lesson16-health/s2.webp",
    question_audio_key: "q3",
    title: "أَتَعَرَّفُ أَعْضَاءَ الحَرَكَةِ",
    instruction: "نُحَرِّكُ جِسْمَنَا عِنْدَ اللَّعِبِ.",
    question: "عِنْدَمَا نَلْعَبُ، مَاذَا نُحَرِّكُ؟",
    mode: "pickRank",
    correct: "أَعْضَاءَ الجِسْمِ",
    options: ["أَعْضَاءَ الجِسْمِ", "الكِتَابَ", "الكُرْسِيَّ", "السَّبُّورَةَ"],
  },
  {
    scene_image: "/lessons/v2/lesson16-health/s2.webp",
    question_audio_key: "q4",
    title: "أَتَعَرَّفُ أَعْضَاءَ الحَرَكَةِ",
    instruction: "الأَيْدِي تُسَاعِدُنَا فِي بَعْضِ الحَرَكَاتِ.",
    question: "بِمَاذَا نُمْسِكُ الكُرَةَ؟",
    mode: "pickRank",
    correct: "بِاليَدَيْنِ",
    options: ["بِاليَدَيْنِ", "بِالقَدَمَيْنِ", "بِالأُذُنَيْنِ", "بِالعَيْنَيْنِ"],
  },
  {
    scene_image: "/lessons/v2/lesson16-health/s3.webp",
    question_audio_key: "q5",
    title: "أَتَعَرَّفُ أَعْضَاءَ الحَرَكَةِ",
    instruction: "نَسْتَعْمِلُ الجِسْمَ كُلَّهُ لِنَتَحَرَّكَ.",
    question: "مَاذَا يُسَاعِدُنَا عَلَى الحَرَكَةِ؟",
    mode: "pickRank",
    correct: "أَعْضَاءُ الجِسْمِ",
    options: ["أَعْضَاءُ الجِسْمِ", "الحَقِيبَةُ", "المِسْطَرَةُ", "السَّبُّورَةُ"],
  },
];
TS

echo ""
echo "=== 6) إنشاء تمرين 3: أميز التصرف الخطير ==="
cat > src/features/lesson-v2/content/lesson16_exercise3.ts <<'TS'
import type { RankOrderItem } from "../exercises-v2/RankOrderExerciseV2";

export const LESSON_16_EXERCISE_3_AUDIO_BASE = "/audio/lesson_16_exercise3";

export const LESSON_16_EXERCISE_3: RankOrderItem[] = [
  {
    scene_image: "/lessons/v2/lesson16-health/s5.webp",
    question_audio_key: "q1",
    title: "أُمَيِّزُ التَّصَرُّفَ الخَطِيرَ",
    instruction: "اِخْتَرِ التَّصَرُّفَ الَّذِي يَجِبُ أَنْ نَتَجَنَّبَهُ.",
    question: "أَيُّ تَصَرُّفٍ خَطِيرٌ؟",
    mode: "pickRank",
    correct: "تَسَلُّقُ مَكَانٍ عَالٍ",
    options: ["تَسَلُّقُ مَكَانٍ عَالٍ", "اللَّعِبُ فِي السَّاحَةِ", "المَشْيُ بِهُدُوءٍ", "الجُلُوسُ بِاسْتِقَامَةٍ"],
  },
  {
    scene_image: "/lessons/v2/lesson16-health/s5.webp",
    question_audio_key: "q2",
    title: "أُمَيِّزُ التَّصَرُّفَ الخَطِيرَ",
    instruction: "نَخْتَارُ السُّلُوكَ الآمِنَ وَنَتَجَنَّبُ الخَطَرَ.",
    question: "مَاذَا لَا نَفْعَلُ أَثْنَاءَ اللَّعِبِ؟",
    mode: "pickRank",
    correct: "نَدْفَعُ الأَصْدِقَاءَ",
    options: ["نَلْعَبُ بِهُدُوءٍ", "نَدْفَعُ الأَصْدِقَاءَ", "نَتَبَاعَدُ عَنِ الخَطَرِ", "نَسْمَعُ لِلْمُعَلِّمِ"],
  },
  {
    scene_image: "/lessons/v2/lesson16-health/s5.webp",
    question_audio_key: "q3",
    title: "أُمَيِّزُ التَّصَرُّفَ الخَطِيرَ",
    instruction: "السُّلُوكُ الخَطِيرُ قَدْ يُؤْذِي الجِسْمَ.",
    question: "أَيُّ سُلُوكٍ غَيْرُ آمِنٍ؟",
    mode: "pickRank",
    correct: "اللَّعِبُ فِي الطَّرِيقِ",
    options: ["اللَّعِبُ فِي السَّاحَةِ", "اللَّعِبُ فِي الطَّرِيقِ", "اللَّعِبُ فِي الحَدِيقَةِ", "اللَّعِبُ تَحْتَ المُرَاقَبَةِ"],
  },
  {
    scene_image: "/lessons/v2/lesson16-health/s5.webp",
    question_audio_key: "q4",
    title: "أُمَيِّزُ التَّصَرُّفَ الخَطِيرَ",
    instruction: "نَحْفَظُ سَلَامَتَنَا بِتَجَنُّبِ الخَطَرِ.",
    question: "أَيُّ تَصَرُّفٍ نَتَجَنَّبُهُ؟",
    mode: "pickRank",
    correct: "القَفْزُ مِنْ مَكَانٍ عَالٍ",
    options: ["المَشْيُ بِهُدُوءٍ", "القَفْزُ مِنْ مَكَانٍ عَالٍ", "اللَّعِبُ فِي المَلْعَبِ", "حَمْلُ الكُرَةِ"],
  },
  {
    scene_image: "/lessons/v2/lesson16-health/s5.webp",
    question_audio_key: "q5",
    title: "أُمَيِّزُ التَّصَرُّفَ الخَطِيرَ",
    instruction: "المَكَانُ العَالِي لَيْسَ مَكَانًا لِلَّعِبِ.",
    question: "مَاذَا يَجِبُ أَنْ لَا نَتَسَلَّقَ؟",
    mode: "pickRank",
    correct: "الأَمَاكِنَ العَالِيَةَ",
    options: ["الأَمَاكِنَ العَالِيَةَ", "الكُرَةَ", "الحَقِيبَةَ", "البَابَ"],
  },
];
TS

echo ""
echo "=== 7) إنشاء تمرين 4: أختار السلوك الصحيح ==="
cat > src/features/lesson-v2/content/lesson16_exercise4.ts <<'TS'
import type { RankOrderItem } from "../exercises-v2/RankOrderExerciseV2";

export const LESSON_16_EXERCISE_4_AUDIO_BASE = "/audio/lesson_16_exercise4";

export const LESSON_16_EXERCISE_4: RankOrderItem[] = [
  {
    scene_image: "/lessons/v2/lesson16-health/s6.webp",
    question_audio_key: "q1",
    title: "أَخْتَارُ السُّلُوكَ الصَّحِيحَ",
    instruction: "اِخْتَرِ السُّلُوكَ الَّذِي يُحَافِظُ عَلَى الصِّحَّةِ.",
    question: "مَاذَا أَفْعَلُ لِأُحَافِظَ عَلَى صِحَّتِي؟",
    mode: "pickRank",
    correct: "أَتَحَرَّكُ بِأَمَانٍ",
    options: ["أَتَحَرَّكُ بِأَمَانٍ", "أَلْعَبُ فِي الطَّرِيقِ", "أَتَسَلَّقُ مَكَانًا عَالِيًا", "أَدْفَعُ زَمِيلِي"],
  },
  {
    scene_image: "/lessons/v2/lesson16-health/s6.webp",
    question_audio_key: "q2",
    title: "أَخْتَارُ السُّلُوكَ الصَّحِيحَ",
    instruction: "الصِّحَّةُ تَحْتَاجُ حَرَكَةً وَسَلَامَةً.",
    question: "أَيُّ سُلُوكٍ صَحِيحٌ؟",
    mode: "pickRank",
    correct: "أَلْعَبُ فِي مَكَانٍ آمِنٍ",
    options: ["أَلْعَبُ فِي مَكَانٍ آمِنٍ", "أَجْرِي فِي الطَّرِيقِ", "أَتَسَلَّقُ الجِدَارَ", "أَقْفِزُ مِنْ مَكَانٍ عَالٍ"],
  },
  {
    scene_image: "/lessons/v2/lesson16-health/s6.webp",
    question_audio_key: "q3",
    title: "أَخْتَارُ السُّلُوكَ الصَّحِيحَ",
    instruction: "نَسْمَعُ لِلْمُعَلِّمِ وَنَتَصَرَّفُ بِهُدُوءٍ.",
    question: "مَاذَا نَفْعَلُ عِنْدَ اللَّعِبِ؟",
    mode: "pickRank",
    correct: "نَلْعَبُ بِهُدُوءٍ",
    options: ["نَلْعَبُ بِهُدُوءٍ", "نَدْفَعُ الأَصْدِقَاءَ", "نَجْرِي نَحْوَ الطَّرِيقِ", "نَتَسَلَّقُ الشَّجَرَةَ"],
  },
  {
    scene_image: "/lessons/v2/lesson16-health/s6.webp",
    question_audio_key: "q4",
    title: "أَخْتَارُ السُّلُوكَ الصَّحِيحَ",
    instruction: "نَخْتَارُ الحَرَكَةَ الآمِنَةَ.",
    question: "أَيُّ حَرَكَةٍ مُنَاسِبَةٌ؟",
    mode: "pickRank",
    correct: "القَفْزُ فِي المَلْعَبِ",
    options: ["القَفْزُ فِي المَلْعَبِ", "القَفْزُ مِنَ الجِدَارِ", "اللَّعِبُ فِي الشَّارِعِ", "الرَّكْضُ خَلْفَ سَيَّارَةٍ"],
  },
  {
    scene_image: "/lessons/v2/lesson16-health/s6.webp",
    question_audio_key: "q5",
    title: "أَخْتَارُ السُّلُوكَ الصَّحِيحَ",
    instruction: "السُّلُوكُ الصَّحِيحُ يُحَافِظُ عَلَى الجِسْمِ.",
    question: "أَيُّ جُمْلَةٍ صَحِيحَةٌ؟",
    mode: "pickRank",
    correct: "أَخْتَارُ مَكَانًا آمِنًا",
    options: ["أَخْتَارُ مَكَانًا آمِنًا", "أَلْعَبُ فِي الطَّرِيقِ", "أَتَسَلَّقُ الأَمَاكِنَ العَالِيَةَ", "أُخَاطِرُ عِنْدَ اللَّعِبِ"],
  },
];
TS

echo ""
echo "=== 8) إنشاء صفحة تمارين الدرس 16 ==="
cat > src/pages/Lesson16ExercisesPage.tsx <<'TSX'
import { useState } from "react";
import LessonCompleteV2 from "../features/lesson-v2/components/LessonCompleteV2";
import RankOrderExerciseV2 from "../features/lesson-v2/exercises-v2/RankOrderExerciseV2";

import {
  LESSON_16_EXERCISE_1,
  LESSON_16_EXERCISE_1_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson16_exercise1";

import {
  LESSON_16_EXERCISE_2,
  LESSON_16_EXERCISE_2_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson16_exercise2";

import {
  LESSON_16_EXERCISE_3,
  LESSON_16_EXERCISE_3_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson16_exercise3";

import {
  LESSON_16_EXERCISE_4,
  LESSON_16_EXERCISE_4_AUDIO_BASE,
} from "../features/lesson-v2/content/lesson16_exercise4";

type Stage = "ex1" | "ex2" | "ex3" | "ex4" | "done";

export default function Lesson16ExercisesPage() {
  const [stage, setStage] = useState<Stage>("ex1");

  if (stage === "ex1")
    return (
      <RankOrderExerciseV2
        key="ex1"
        items={LESSON_16_EXERCISE_1}
        audio_base={LESSON_16_EXERCISE_1_AUDIO_BASE}
        onComplete={() => setStage("ex2")}
      />
    );

  if (stage === "ex2")
    return (
      <RankOrderExerciseV2
        key="ex2"
        items={LESSON_16_EXERCISE_2}
        audio_base={LESSON_16_EXERCISE_2_AUDIO_BASE}
        onComplete={() => setStage("ex3")}
      />
    );

  if (stage === "ex3")
    return (
      <RankOrderExerciseV2
        key="ex3"
        items={LESSON_16_EXERCISE_3}
        audio_base={LESSON_16_EXERCISE_3_AUDIO_BASE}
        onComplete={() => setStage("ex4")}
      />
    );

  if (stage === "ex4")
    return (
      <RankOrderExerciseV2
        key="ex4"
        items={LESSON_16_EXERCISE_4}
        audio_base={LESSON_16_EXERCISE_4_AUDIO_BASE}
        onComplete={() => setStage("done")}
      />
    );

  return (
    <LessonCompleteV2
      message="أَحْسَنْتَ! أَصْبَحْتَ تَعْرِفُ كَيْفَ تَتَحَرَّكُ وَتُحَافِظُ عَلَى صِحَّتِكَ. 🎉"
      onReplay={() => setStage("ex1")}
    />
  );
}
TSX

echo ""
echo "=== 9) إنشاء مولد صوت تمارين الدرس 16 ==="
cat > gen_audio_lesson16_exercises.py <<'PY'
import asyncio
import json
import subprocess
from pathlib import Path
import edge_tts

VOICE = "ar-DZ-IsmaelNeural"

GROUPS = {
    "public/audio/lesson_16_exercise1": {
        "q1": "أَيْنَ نَلْعَبُ بِأَمَانٍ؟",
        "q2": "أَيُّ مَكَانٍ لَا نَلْعَبُ فِيهِ؟",
        "q3": "أَيُّ مَكَانٍ أَفْضَلُ لِلَّعِبِ؟",
        "q4": "أَيْنَ يَلْعَبُ الأَطْفَالُ بِسَلَامٍ؟",
        "q5": "مَا المَكَانُ الَّذِي نَتَجَنَّبُهُ؟",
    },
    "public/audio/lesson_16_exercise2": {
        "q1": "بِمَاذَا نَجْرِي؟",
        "q2": "بِمَاذَا نَقْفِزُ؟",
        "q3": "عِنْدَمَا نَلْعَبُ، مَاذَا نُحَرِّكُ؟",
        "q4": "بِمَاذَا نُمْسِكُ الكُرَةَ؟",
        "q5": "مَاذَا يُسَاعِدُنَا عَلَى الحَرَكَةِ؟",
    },
    "public/audio/lesson_16_exercise3": {
        "q1": "أَيُّ تَصَرُّفٍ خَطِيرٌ؟",
        "q2": "مَاذَا لَا نَفْعَلُ أَثْنَاءَ اللَّعِبِ؟",
        "q3": "أَيُّ سُلُوكٍ غَيْرُ آمِنٍ؟",
        "q4": "أَيُّ تَصَرُّفٍ نَتَجَنَّبُهُ؟",
        "q5": "مَاذَا يَجِبُ أَنْ لَا نَتَسَلَّقَ؟",
    },
    "public/audio/lesson_16_exercise4": {
        "q1": "مَاذَا أَفْعَلُ لِأُحَافِظَ عَلَى صِحَّتِي؟",
        "q2": "أَيُّ سُلُوكٍ صَحِيحٌ؟",
        "q3": "مَاذَا نَفْعَلُ عِنْدَ اللَّعِبِ؟",
        "q4": "أَيُّ حَرَكَةٍ مُنَاسِبَةٌ؟",
        "q5": "أَيُّ جُمْلَةٍ صَحِيحَةٌ؟",
    },
}

def clean_words(text: str):
    for ch in ["،", ".", ":", "!", "؟", "؛"]:
        text = text.replace(ch, "")
    return text.split()

def duration_ms(path: Path) -> int:
    try:
        out = subprocess.check_output([
            "ffprobe", "-v", "error",
            "-show_entries", "format=duration",
            "-of", "default=noprint_wrappers=1:nokey=1",
            str(path)
        ], text=True).strip()
        return int(float(out) * 1000)
    except Exception:
        return 5000

def fallback_json(text: str, mp3: Path):
    words = clean_words(text)
    total = max(1200, int(duration_ms(mp3) * 0.95))
    weights = [max(1.0, len(w) ** 0.65) for w in words]
    s = sum(weights) or 1
    out = []
    offset = 0
    for w, wt in zip(words, weights):
        dur = max(260, min(900, int(total * wt / s) - 25))
        out.append({"text": w, "offset": offset, "duration": dur})
        offset += dur + 25
    return out

async def gen_one(folder: Path, key: str, text: str):
    folder.mkdir(parents=True, exist_ok=True)
    mp3 = folder / f"{key}.mp3"
    js = folder / f"{key}.json"

    communicate = edge_tts.Communicate(text=text, voice=VOICE, rate="+4%", pitch="+4Hz")
    words = []

    with open(mp3, "wb") as f:
        async for chunk in communicate.stream():
            if chunk["type"] == "audio":
                f.write(chunk["data"])
            elif chunk["type"] == "WordBoundary":
                words.append({
                    "text": chunk["text"],
                    "offset": int(chunk["offset"] / 10000),
                    "duration": int(chunk["duration"] / 10000),
                })

    if not words:
        words = fallback_json(text, mp3)

    js.write_text(json.dumps(words, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"✅ {folder.name}/{key}: {len(words)} words")

async def main():
    for folder_name, texts in GROUPS.items():
        folder = Path(folder_name)
        if folder.exists():
            for f in folder.glob("*"):
                f.unlink()
        folder.mkdir(parents=True, exist_ok=True)
        for key, text in texts.items():
            await gen_one(folder, key, text)

asyncio.run(main())
PY

echo ""
echo "=== 10) توليد صوت التمارين ==="
command -v ffprobe >/dev/null 2>&1 || pkg install ffmpeg -y
python3 gen_audio_lesson16_exercises.py

echo ""
echo "=== 11) ربط Route تمارين الدرس 16 في App.tsx ==="
python3 - <<'PY'
from pathlib import Path

p = Path("src/App.tsx")
txt = p.read_text(encoding="utf-8")
old = txt

route16 = '        <Route path="/lesson16-exercises" element={lazy(() => import("./pages/Lesson16ExercisesPage"), "تمارين الدرس 16")} />'

if route16 not in txt:
    route15 = '        <Route path="/lesson15-exercises" element={lazy(() => import("./pages/Lesson15ExercisesPage"), "تمارين الدرس 15")} />'
    if route15 not in txt:
        raise SystemExit("❌ لم أجد Route الدرس 15")
    txt = txt.replace(route15, route15 + "\n" + route16)

p.write_text(txt, encoding="utf-8")
print("App changed:", txt != old)
PY

echo ""
echo "=== 12) فحص الأصوات والربط ==="
python3 - <<'PY'
from pathlib import Path

missing = []
for ex in range(1, 5):
    base = Path(f"public/audio/lesson_16_exercise{ex}")
    for q in range(1, 6):
        for ext in ["mp3", "json"]:
            p = base / f"q{q}.{ext}"
            if not p.exists() or p.stat().st_size < 100:
                missing.append(str(p))

if missing:
    print("❌ ملفات ناقصة:")
    print("\n".join(missing))
    raise SystemExit(1)

print("✅ كل ملفات صوت تمارين الدرس 16 موجودة")
PY

grep -n "lesson16-exercises\|Lesson16ExercisesPage" src/App.tsx || true
ls -lh public/audio/lesson_16_exercise1 | head

echo ""
echo "=== 13) Build ==="
rm -rf node_modules/.vite dist
npm run build

echo ""
echo "✅ تمارين الدرس 16 جاهزة للاختبار:"
echo "http://localhost:5173/lesson16-exercises"
