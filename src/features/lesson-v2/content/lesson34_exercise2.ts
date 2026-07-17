import type {
  TapSelectImageItem,
} from "../exercises-v2/TapSelectImagesV2";

export const LESSON_34_EXERCISE_2_AUDIO_BASE =
  "/audio/teachers/khalil/lesson_34_amusement_paths/exercises";

const BASE =
  "/lessons/v2/lesson34-amusement-paths/exercises";

export const LESSON_34_EXERCISE_2 = [
  {
    question:
      "اخْتَرِ الخَرِيطَةَ الَّتِي تُوصِلُ إِلَى الزَّحْلِيقَةِ.",
    question_audio_key: "l34_ex2_q1",
    options: [
      `${BASE}/map-slide-blocked.svg`,
      `${BASE}/map-slide-wrong.svg`,
      `${BASE}/map-slide-correct.svg`,
      `${BASE}/map-slide-dead.svg`,
    ],
    correct_index: 2,
    image_fit: "contain",
  },
  {
    question:
      "اخْتَرِ الخَرِيطَةَ الَّتِي تُوصِلُ إِلَى القِطَارِ.",
    question_audio_key: "l34_ex2_q2",
    options: [
      `${BASE}/map-train-wrong.svg`,
      `${BASE}/map-train-correct.svg`,
      `${BASE}/map-train-blocked.svg`,
      `${BASE}/map-train-dead.svg`,
    ],
    correct_index: 1,
    image_fit: "contain",
  },
  {
    question:
      "اخْتَرِ المَسْلَكَ المَفْتُوحَ دُونَ حَاجِزٍ.",
    question_audio_key: "l34_ex2_q3",
    options: [
      `${BASE}/safe-barrier.svg`,
      `${BASE}/safe-puddle.svg`,
      `${BASE}/safe-no-barrier.svg`,
      `${BASE}/safe-dead.svg`,
    ],
    correct_index: 2,
    image_fit: "contain",
  },
  {
    question:
      "اخْتَرِ المَسْلَكَ الَّذِي يَصِلُ إِلَى العَجَلَةِ دُونَ بَرْكَةٍ.",
    question_audio_key: "l34_ex2_q4",
    options: [
      `${BASE}/path-puddle-blue.svg`,
      `${BASE}/path-safe-green.svg`,
      `${BASE}/path-blocked-red.svg`,
      `${BASE}/safe-dead.svg`,
    ],
    correct_index: 1,
    image_fit: "contain",
  },
] satisfies TapSelectImageItem[];
