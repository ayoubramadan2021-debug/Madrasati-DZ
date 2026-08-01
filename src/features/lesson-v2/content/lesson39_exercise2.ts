export const LESSON_39_EXERCISE_2_AUDIO_BASE =
  "/audio/teachers/taline/lesson_39_amusement_order/exercises";

const BASE =
  "/lessons/v2/lesson39/exercises";

export const LESSON_39_EXERCISE_2 = [
  {
    question:
      "اخْتَرِ القِطَارَ الَّذِي يَرْكَبُ فِيهِ البَطْرِيقُ.",

    question_audio_key:
      "l39_ex2_q1_v2",

    options: [
      `${BASE}/train-animals-b.webp`,
      `${BASE}/train-children.webp`,
    ],

    correct_index: 0,

    image_fit:
      "cover" as const,
  },

  {
    question:
      "اخْتَرِ القِطَارَ الَّذِي يَرْكَبُ فِيهِ الدُّبُّ.",

    question_audio_key:
      "l39_ex2_q2_v2",

    options: [
      `${BASE}/train-children.webp`,
      `${BASE}/train-animals-a.webp`,
    ],

    correct_index: 1,

    image_fit:
      "cover" as const,
  },

  {
    question:
      "اخْتَرِ الصُّورَةَ الَّتِي يَقِفُ فِيهَا الأَطْفَالُ فِي طَابُورٍ مُرَتَّبٍ لِرُكُوبِ القِطَارِ.",

    question_audio_key:
      "l39_ex2_q3",

    options: [
      `${BASE}/race-side.webp`,
      `${BASE}/train-queue.webp`,
    ],

    correct_index: 1,

    image_fit:
      "cover" as const,
  },

  {
    question:
      "اخْتَرِ الصُّورَةَ الَّتِي يَقِفُ فِيهَا صَاحِبُ الرُّتْبَةِ الأُولَى فَوْقَ أَعْلَى مِنَصَّةٍ.",

    question_audio_key:
      "l39_ex2_q4",

    options: [
      `${BASE}/podium.webp`,
      `${BASE}/race-finish.webp`,
    ],

    correct_index: 1,

    image_fit:
      "cover" as const,
  },
];
