import type {
  TapSelectImageItem,
} from "../exercises-v2/TapSelectImagesV2";

const BASE =
  "/lessons/v2/lesson58/exercises/animals";

export const LESSON_58_EXERCISE_4:
TapSelectImageItem[] = [
  {
    question: "اِخْتَرِ الْحَيَوَانَ الْوَلُودَ.",
    question_audio_key: "lesson58_ex4_q1",
    options: [
      `${BASE}/s6.webp`,
      `${BASE}/s10.webp`,
      `${BASE}/s11.webp`,
      `${BASE}/s7.webp`,
    ],
    correct_index: 3,
    image_fit: "contain",
  },
  {
    question: "أَيُّ هَذِهِ الْحَيَوَانَاتِ يَلِدُ صِغَارَهُ؟",
    question_audio_key: "lesson58_ex4_q2",
    options: [
      `${BASE}/s11.webp`,
      `${BASE}/s3.webp`,
      `${BASE}/s12.webp`,
      `${BASE}/s6.webp`,
    ],
    correct_index: 1,
    image_fit: "contain",
  },
  {
    question: "اِخْتَرِ حَيَوَانًا وَلُودًا.",
    question_audio_key: "lesson58_ex4_q3",
    options: [
      `${BASE}/s2.webp`,
      `${BASE}/s10.webp`,
      `${BASE}/s6.webp`,
      `${BASE}/s11.webp`,
    ],
    correct_index: 0,
    image_fit: "contain",
  },
  {
    question: "أَيُّ هَذِهِ الْحَيَوَانَاتِ وَلُودٌ؟",
    question_audio_key: "lesson58_ex4_q4",
    options: [
      `${BASE}/s12.webp`,
      `${BASE}/s11.webp`,
      `${BASE}/s8.webp`,
      `${BASE}/s10.webp`,
    ],
    correct_index: 2,
    image_fit: "contain",
  },
];
