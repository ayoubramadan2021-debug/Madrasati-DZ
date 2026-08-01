import type {
  TapSelectImageItem,
} from "../exercises-v2/TapSelectImagesV2";

export const LESSON_34_EXERCISE_4_AUDIO_BASE =
  "/audio/teachers/khalil/lesson_34_amusement_paths/exercises";

const BASE =
  "/lessons/v2/lesson34-amusement-paths/exercises";

export const LESSON_34_EXERCISE_4 = [
  {
    question:
      "اخْتَرِ المَسْلَكَ الآمِنَ الَّذِي لَا يَمُرُّ فَوْقَ البِرْكَةِ.",
    question_audio_key: "l34_ex4_q1",
    options: [
      `${BASE}/path-puddle-blue.svg`,
      `${BASE}/path-safe-green.svg`,
      `${BASE}/safe-barrier.svg`,
      `${BASE}/safe-dead.svg`,
    ],
    correct_index: 1,
    image_fit: "contain",
  },
  {
    question:
      "اخْتَرِ المَسْلَكَ الَّذِي لَا يُوجَدُ فِيهِ حَاجِزُ صِيَانَةٍ.",
    question_audio_key: "l34_ex4_q2",
    options: [
      `${BASE}/path-blocked-red.svg`,
      `${BASE}/map-train-blocked.svg`,
      `${BASE}/safe-no-barrier.svg`,
      `${BASE}/map-slide-blocked.svg`,
    ],
    correct_index: 2,
    image_fit: "contain",
  },
  {
    question:
      "اخْتَرْ أَقْصَرَ مَسْلَكٍ إِلَى الزَّحْلِيقَةِ.",
    question_audio_key: "l34_ex4_q3",
    options: [
      `${BASE}/path-winding-orange.svg`,
      `${BASE}/path-direct-blue.svg`,
      `${BASE}/map-slide-dead.svg`,
      `${BASE}/map-slide-blocked.svg`,
    ],
    correct_index: 1,
    image_fit: "contain",
  },
  {
    question:
      "اخْتَرِ المَسْلَكَ الَّذِي يَبْدَأُ مِنَ الرَّايَةِ وَيَصِلُ إِلَى القِطَارِ.",
    question_audio_key: "l34_ex4_q4",
    options: [
      `${BASE}/path-to-wheel-yellow.svg`,
      `${BASE}/map-slide-correct.svg`,
      `${BASE}/path-to-train-purple.svg`,
      `${BASE}/safe-dead.svg`,
    ],
    correct_index: 2,
    image_fit: "contain",
  },
] satisfies TapSelectImageItem[];
