import type {
  TapSelectImageItem,
} from "../exercises-v2/TapSelectImagesV2";

const BASE =
  "/lessons/v2/lesson58/exercises/animals";

export const LESSON_58_EXERCISE_2:
TapSelectImageItem[] = [
  {
    question: "اِخْتَرِ الْحَيَوَانَ اللَّاحِمَ.",
    question_audio_key: "lesson58_ex2_q1",
    options: [
      `${BASE}/s2.webp`,
      `${BASE}/s3.webp`,
      `${BASE}/s4.webp`,
      `${BASE}/s1.webp`,
    ],
    correct_index: 2,
    image_fit: "contain",
  },
  {
    question: "اِخْتَرِ الْحَيَوَانَ الَّذِي يَتَغَذَّى عَلَى اللُّحُومِ.",
    question_audio_key: "lesson58_ex2_q2",
    options: [
      `${BASE}/s5.webp`,
      `${BASE}/s10.webp`,
      `${BASE}/s11.webp`,
      `${BASE}/s6.webp`,
    ],
    correct_index: 0,
    image_fit: "contain",
  },
  {
    question: "أَيُّ هَذِهِ الْحَيَوَانَاتِ لَاحِمٌ؟",
    question_audio_key: "lesson58_ex2_q3",
    options: [
      `${BASE}/s9.webp`,
      `${BASE}/s2.webp`,
      `${BASE}/s1.webp`,
      `${BASE}/s3.webp`
    ],
    correct_index: 0,
    image_fit: "contain",
  },
  {
    question: "اِخْتَرِ حَيَوَانًا لَاحِمًا.",
    question_audio_key: "lesson58_ex2_q4",
    options: [
      `${BASE}/s11.webp`,
      `${BASE}/s3.webp`,
      `${BASE}/s5.webp`,
      `${BASE}/s10.webp`,
    ],
    correct_index: 2,
    image_fit: "contain",
  },
];
