import type {
  TapSelectImageItem,
} from "../exercises-v2/TapSelectImagesV2";

export const LESSON_38_EXERCISE_1_AUDIO_BASE =
  "/audio/teachers/khalil/lesson_38_amusement_positions/exercises";

const BASE =
  "/lessons/v2/lesson38/exercises";

export const LESSON_38_EXERCISE_1 = [
  {
    question:
      "أَيُّ صُورَةٍ تُظْهِرُ دُخُولَ الهَوَاءِ إِلَى الجِسْمِ عَبْرَ الأَنْفِ؟",
    question_audio_key: "l38_ex1_q1",
    options: [
      `${BASE}/breathe-through-nose.webp`,
      `${BASE}/breathe-through-mouth.webp`,
    ],
    correct_index: 0,
    image_fit: "contain",
  },
  {
    question:
      "أَيُّ صُورَةٍ تُظْهِرُ خُرُوجَ الهَوَاءِ بِبُطْءٍ؟",
    question_audio_key: "l38_ex1_q2",
    options: [
      `${BASE}/exhale-slowly.webp`,
      `${BASE}/breathe-through-nose.webp`,
    ],
    correct_index: 0,
    image_fit: "contain",
  },
] satisfies TapSelectImageItem[];
