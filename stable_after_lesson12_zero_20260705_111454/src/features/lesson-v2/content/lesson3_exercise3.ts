import type { TapSelectWordItem } from "../exercises-v2/TapSelectWordsV2";

// تمرين 3 — الدرس 3: اقرأ الجملة واختر اسم الحاسة
const OPTIONS = ["السَّمْع", "الرُّؤْيَة", "الشَّمّ", "الذَّوْق", "اللَّمْس"];

export const LESSON_3_EXERCISE_3: TapSelectWordItem[] = [
  {
    scene_image: "/lessons/v2/lesson3-senses/senses-organs.webp",
    question: "أَسْمَعُ بِأُذُنِي، هَذِهِ حَاسَّةُ مَاذَا؟",
    question_audio_key: "l3_ex3_q1",
    options: OPTIONS,
    correct: "السَّمْع",
  },
  {
    scene_image: "/lessons/v2/lesson3-senses/senses-organs.webp",
    question: "أَرَى بِعَيْنِي، هَذِهِ حَاسَّةُ مَاذَا؟",
    question_audio_key: "l3_ex3_q2",
    options: OPTIONS,
    correct: "الرُّؤْيَة",
  },
  {
    scene_image: "/lessons/v2/lesson3-senses/senses-organs.webp",
    question: "أَشُمُّ بِأَنْفِي، هَذِهِ حَاسَّةُ مَاذَا؟",
    question_audio_key: "l3_ex3_q3",
    options: OPTIONS,
    correct: "الشَّمّ",
  },
  {
    scene_image: "/lessons/v2/lesson3-senses/senses-organs.webp",
    question: "أَتَذَوَّقُ بِلِسَانِي، هَذِهِ حَاسَّةُ مَاذَا؟",
    question_audio_key: "l3_ex3_q4",
    options: OPTIONS,
    correct: "الذَّوْق",
  },
  {
    scene_image: "/lessons/v2/lesson3-senses/senses-organs.webp",
    question: "أَلْمَسُ بِيَدِي، هَذِهِ حَاسَّةُ مَاذَا؟",
    question_audio_key: "l3_ex3_q5",
    options: OPTIONS,
    correct: "اللَّمْس",
  },
];

export const LESSON_3_EXERCISE_3_AUDIO_BASE = "/audio/lesson_3_exercises";
