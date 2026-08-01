import type {
  TapSelectImageItem,
} from "../exercises-v2/TapSelectImagesV2";

export const LESSON_38_EXERCISE_2_AUDIO_BASE =
  "/audio/teachers/khalil/lesson_38_amusement_positions/exercises";

const BASE =
  "/lessons/v2/lesson38/exercises";

export const LESSON_38_EXERCISE_2 = [
  {
    question:
      "بَعْدَ الجَرْيِ، أَيُّ طِفْلٍ يَكُونُ تَنَفُّسُهُ أَسْرَعَ؟",
    question_audio_key: "l38_ex2_q1",
    options: [
      `${BASE}/run-while-tired.webp`,
      `${BASE}/rest-calmly.webp`,
    ],
    correct_index: 0,
    image_fit: "contain",
  },
  {
    question:
      "أَيُّ طِفْلٍ اسْتَعَادَ تَنَفُّسَهُ الهَادِئَ؟",
    question_audio_key: "l38_ex2_q2",
    options: [
      `${BASE}/rest-calmly.webp`,
      `${BASE}/run-while-tired.webp`,
    ],
    correct_index: 0,
    image_fit: "contain",
  },
] satisfies TapSelectImageItem[];
