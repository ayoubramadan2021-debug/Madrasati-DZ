import type { TapSelectWordItem } from "../exercises-v2/TapSelectWordsV2";

// تمرين 1 — الدرس 3: شاهد المشهد واختر الحاسة المستعملة
const OPTIONS = ["السَّمْع", "الرُّؤْيَة", "الشَّمّ", "الذَّوْق", "اللَّمْس"];

export const LESSON_3_EXERCISE_1: TapSelectWordItem[] = [
  {
    scene_image: "/lessons/v2/lesson3-senses/scene-3-hearing-birds.webp",
    question: "خَلِيلٌ يَسْتَمِعُ لِتَغْرِيدِ الطُّيُورِ، أَيَّ حَاسَّةٍ يَسْتَعْمِلُ؟",
    question_audio_key: "l3_ex1_q1",
    options: OPTIONS,
    correct: "السَّمْع",
  },
  {
    scene_image: "/lessons/v2/lesson3-senses/scene-2-sight-lake.webp",
    question: "نَنْظُرُ إِلَى البُحَيْرَةِ، أَيَّ حَاسَّةٍ نَسْتَعْمِلُ؟",
    question_audio_key: "l3_ex1_q2",
    options: OPTIONS,
    correct: "الرُّؤْيَة",
  },
  {
    scene_image: "/lessons/v2/lesson3-senses/scene-4-smell-flower.webp",
    question: "نَشُمُّ رَائِحَةَ الأَزْهَارِ, أَيَّ حَاسَّةٍ نَسْتَعْمِلُ؟",
    question_audio_key: "l3_ex1_q3",
    options: OPTIONS,
    correct: "الشَّمّ",
  },
  {
    scene_image: "/lessons/v2/lesson3-senses/scene-5-taste-fruit.webp",
    question: "نَتَذَوَّقُ الثِّمَارَ, أَيَّ حَاسَّةٍ نَسْتَعْمِلُ؟",
    question_audio_key: "l3_ex1_q4",
    options: OPTIONS,
    correct: "الذَّوْق",
  },
  {
    scene_image: "/lessons/v2/lesson3-senses/scene-6-touch-bark.webp",
    question: "نَلْمَسُ لِحَاءَ الشَّجَرَةِ, أَيَّ حَاسَّةٍ نَسْتَعْمِلُ؟",
    question_audio_key: "l3_ex1_q5",
    options: OPTIONS,
    correct: "اللَّمْس",
  },
];

export const LESSON_3_EXERCISE_1_AUDIO_BASE = "/audio/lesson_3_exercises";
