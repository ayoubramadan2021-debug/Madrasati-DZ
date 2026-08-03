import type {
  TapSelectImageItem,
} from "../exercises-v2/TapSelectImagesV2";

const BASE =
  "/lessons/v2/lesson58/exercises/animals";

export const LESSON_58_EXERCISE_1:
TapSelectImageItem[] = [
  {
    question: "اِخْتَرِ الْحَيَوَانَ الْعَاشِبَ.",
    question_audio_key: "lesson58_ex1_q1",
    options: [
      `${BASE}/s4.webp`,
      `${BASE}/s1.webp`,
      `${BASE}/s5.webp`,
      `${BASE}/s9.webp`,
    ],
    correct_index: 1,
    image_fit: "contain",
  },
  {
    question: "اِخْتَرِ الْحَيَوَانَ الَّذِي يَتَغَذَّى عَلَى الْأَعْشَابِ.",
    question_audio_key: "lesson58_ex1_q2",
    options: [
      `${BASE}/s8.webp`,
      `${BASE}/s7.webp`,
      `${BASE}/s3.webp`,
      `${BASE}/s4.webp`,
    ],
    correct_index: 2,
    image_fit: "contain",
  },
  {
    question: "اِخْتَرِ حَيَوَانًا عَاشِبًا.",
    question_audio_key: "lesson58_ex1_q3",
    options: [
      `${BASE}/s5.webp`,
      `${BASE}/s9.webp`,
      `${BASE}/s8.webp`,
      `${BASE}/s2.webp`,
    ],
    correct_index: 3,
    image_fit: "contain",
  },
  {
    question: "أَيُّ هَذِهِ الْحَيَوَانَاتِ عَاشِبٌ؟",
    question_audio_key: "lesson58_ex1_q4",
    options: [
      `${BASE}/s3.webp`,
      `${BASE}/s10.webp`,
      `${BASE}/s9.webp`,
      `${BASE}/s8.webp`,
    ],
    correct_index: 0,
    image_fit: "contain",
  },
];
