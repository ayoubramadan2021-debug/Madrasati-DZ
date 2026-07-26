import type {
  TapSelectImageItem,
} from "../exercises-v2/TapSelectImagesV2";

export const LESSON_38_EXERCISE_4_AUDIO_BASE =
  "/audio/teachers/khalil/lesson_38_amusement_positions/exercises";

const BASE =
  "/lessons/v2/lesson38/exercises";

export const LESSON_38_EXERCISE_4 = [
  {
    question:
      "أَيُّ صُورَةٍ تُمَثِّلُ الشَّهِيقَ الصَّحِيحَ؟",
    question_audio_key: "l38_ex4_q1",
    options: [
      `${BASE}/breathe-through-nose.webp`,
      `${BASE}/polluted-smoke-air.webp`,
    ],
    correct_index: 0,
    image_fit: "contain",
  },
  {
    question:
      "أَيُّ صُورَةٍ تُمَثِّلُ الزَّفِيرَ الهَادِئَ؟",
    question_audio_key: "l38_ex4_q2",
    options: [
      `${BASE}/exhale-slowly.webp`,
      `${BASE}/run-while-tired.webp`,
    ],
    correct_index: 0,
    image_fit: "contain",
  },
  {
    question:
      "أَيُّ صُورَةٍ تُمَثِّلُ تَنَفُّسًا هَادِئًا وَمُرِيحًا؟",
    question_audio_key: "l38_ex4_q3",
    options: [
      `${BASE}/rest-calmly.webp`,
      `${BASE}/polluted-smoke-air.webp`,
    ],
    correct_index: 0,
    image_fit: "contain",
  },
] satisfies TapSelectImageItem[];
