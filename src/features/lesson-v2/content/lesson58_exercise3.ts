import type {
  TapSelectImageItem,
} from "../exercises-v2/TapSelectImagesV2";

const BASE =
  "/lessons/v2/lesson58/exercises/animals";

export const LESSON_58_EXERCISE_3:
TapSelectImageItem[] = [
  {
    question: "اِخْتَرِ الْحَيَوَانَ الَّذِي يَضَعُ الْبَيْضَ.",
    question_audio_key: "lesson58_ex3_q1",
    options: [
      `${BASE}/s3.webp`,
      `${BASE}/s1.webp`,
      `${BASE}/s2.webp`,
      `${BASE}/s6.webp`,
    ],
    correct_index: 3,
    image_fit: "contain",
  },
  {
    question: "اِخْتَرِ حَيَوَانًا بَيُوضًا.",
    question_audio_key: "lesson58_ex3_q2",
    options: [
      `${BASE}/s10.webp`,
      `${BASE}/s7.webp`,
      `${BASE}/s3.webp`,
      `${BASE}/s1.webp`,
    ],
    correct_index: 0,
    image_fit: "contain",
  },
  {
    question: "أَيُّ هَذِهِ الْحَيَوَانَاتِ بَيُوضٌ؟",
    question_audio_key: "lesson58_ex3_q3",
    options: [
      `${BASE}/s2.webp`,
      `${BASE}/s6.webp`,
      `${BASE}/s7.webp`,
      `${BASE}/s8.webp`,
    ],
    correct_index: 1,
    image_fit: "contain",
  },
  {
    question: "مَا الَّذِي يَخْرُجُ مِنْ بَيْضِ الدَّجَاجَةِ؟",
    question_audio_key: "lesson58_ex3_q4",
    options: [
      `${BASE}/s11.webp`,
      `${BASE}/s12.webp`,
      `${BASE}/s3.webp`,
      `${BASE}/s7.webp`,
    ],
    correct_index: 1,
    image_fit: "contain",
  },
];
