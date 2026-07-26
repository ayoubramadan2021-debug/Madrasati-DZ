export const LESSON_40_EXERCISE_2_AUDIO_BASE =
  "/audio/teachers/khalil/lesson_40_amusement_compare_order/exercises";

const BASE =
  "/lessons/v2/lesson40/exercises";

export const LESSON_40_EXERCISE_2 = [
  {
    question:
      "اخْتَرِ الصُّورَةَ الَّتِي فِيهَا مَجْمُوعَتَانِ مُتَسَاوِيَتَانِ.",

    question_audio_key:
      "l40_ex2_q1",

    options: [
      `${BASE}/pencils-more.webp`,
      `${BASE}/rulers-equal-sharpeners.webp`,
    ],

    correct_index: 1,

    image_fit:
      "contain" as const,
  },

  {
    question:
      "اخْتَرِ الصُّورَةَ الَّتِي فِيهَا الأَقْلَامُ أَكْثَرَ مِنَ المَبَارِي.",

    question_audio_key:
      "l40_ex2_q2",

    options: [
      `${BASE}/pencils-more.webp`,
      `${BASE}/erasers-more.webp`,
    ],

    correct_index: 0,

    image_fit:
      "contain" as const,
  },

  {
    question:
      "اخْتَرِ الصُّورَةَ الَّتِي فِيهَا المَمَاحِي أَكْثَرَ مِنَ المَبَارِي.",

    question_audio_key:
      "l40_ex2_q3",

    options: [
      `${BASE}/rulers-equal-sharpeners.webp`,
      `${BASE}/erasers-more.webp`,
    ],

    correct_index: 1,

    image_fit:
      "contain" as const,
  },

  {
    question:
      "اخْتَرِ الصُّورَةَ الَّتِي تَحْتَوِي عَلَى ثَلَاثِ مَجْمُوعَاتٍ مُخْتَلِفَةِ العَدَدِ.",

    question_audio_key:
      "l40_ex2_q4",

    options: [
      `${BASE}/three-groups-compare.webp`,
      `${BASE}/rulers-equal-sharpeners.webp`,
    ],

    correct_index: 0,

    image_fit:
      "contain" as const,
  },
];
