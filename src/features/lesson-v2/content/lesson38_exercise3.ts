import type {
  TapSelectImageItem,
} from "../exercises-v2/TapSelectImagesV2";

export const LESSON_38_EXERCISE_3_AUDIO_BASE =
  "/audio/teachers/khalil/lesson_38_amusement_positions/exercises";

const BASE =
  "/lessons/v2/lesson38/exercises";

export const LESSON_38_EXERCISE_3 = [
  {
    question:
      "أَيْنَ أَتَنَفَّسُ هَوَاءً نَقِيًّا؟",
    question_audio_key: "l38_ex3_q1_v2",
    options: [
      `${BASE}/clean-fresh-air.webp`,
      `${BASE}/polluted-smoke-air.webp`,
    ],
    correct_index: 0,
    image_fit: "contain",
  },
  {
    question:
      "أَيُّ مَكَانٍ يَجِبُ أَنْ أَبْتَعِدَ عَنْهُ؟",
    question_audio_key: "l38_ex3_q2",
    options: [
      `${BASE}/polluted-smoke-air.webp`,
      `${BASE}/clean-fresh-air.webp`,
    ],
    correct_index: 0,
    image_fit: "contain",
  },
] satisfies TapSelectImageItem[];
