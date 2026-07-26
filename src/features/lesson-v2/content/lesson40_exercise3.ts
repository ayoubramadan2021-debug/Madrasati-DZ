import type {
  RankOrderItem,
} from "../exercises-v2/RankOrderExerciseV2";

export const LESSON_40_EXERCISE_3_AUDIO_BASE =
  "/audio/teachers/khalil/lesson_40_amusement_compare_order/exercises";

const BASE =
  "/lessons/v2/lesson40/exercises";

export const LESSON_40_EXERCISE_3 = [
  {
    scene_image:
      `${BASE}/three-groups-compare.webp`,

    title:
      "أُرَتِّبُ المَجْمُوعَاتِ",

    instruction:
      "اِبْدَأْ بِالمَجْمُوعَةِ الأَقَلِّ عَدَدًا.",

    question:
      "مَا التَّرْتِيبُ الصَّحِيحُ مِنَ الأَقَلِّ إِلَى الأَكْثَرِ؟",

    question_audio_key:
      "l40_ex3_q1",

    mode:
      "pickRank",

    options: [
      "المَبَارِي ثُمَّ المَمَاحِي ثُمَّ الأَقْلَامُ",

      "الأَقْلَامُ ثُمَّ المَمَاحِي ثُمَّ المَبَارِي",

      "المَمَاحِي ثُمَّ المَبَارِي ثُمَّ الأَقْلَامُ",
    ],

    correct:
      "المَبَارِي ثُمَّ المَمَاحِي ثُمَّ الأَقْلَامُ",
  },

  {
    scene_image:
      `${BASE}/three-boards-quantities.webp`,

    title:
      "أُرَتِّبُ الأَدَوَاتِ",

    instruction:
      "اِبْدَأْ بِالمَجْمُوعَةِ الأَقَلِّ عَدَدًا.",

    question:
      "مَا التَّرْتِيبُ الصَّحِيحُ مِنَ الأَقَلِّ إِلَى الأَكْثَرِ؟",

    question_audio_key:
      "l40_ex3_q2",

    mode:
      "pickRank",

    options: [
      "المِمْحَاةُ ثُمَّ المِسْطَرَتَانِ ثُمَّ الأَقْلَامُ",

      "الأَقْلَامُ ثُمَّ المِسْطَرَتَانِ ثُمَّ المِمْحَاةُ",

      "المِسْطَرَتَانِ ثُمَّ المِمْحَاةُ ثُمَّ الأَقْلَامُ",
    ],

    correct:
      "المِمْحَاةُ ثُمَّ المِسْطَرَتَانِ ثُمَّ الأَقْلَامُ",
  },

  {
    scene_image:
      `${BASE}/supplies-overview.webp`,

    title:
      "أُقَارِنُ ثَلَاثَ مَجْمُوعَاتٍ",

    instruction:
      "قَارِنْ عَدَدَ المَسَاطِرِ وَالمَبَارِي وَالمَمَاحِي.",

    question:
      "مَا التَّرْتِيبُ الصَّحِيحُ مِنَ الأَقَلِّ إِلَى الأَكْثَرِ؟",

    question_audio_key:
      "l40_ex3_q3",

    mode:
      "pickRank",

    options: [
      "المَسَاطِرُ ثُمَّ المَبَارِي ثُمَّ المَمَاحِي",

      "المَمَاحِي ثُمَّ المَبَارِي ثُمَّ المَسَاطِرُ",

      "المَبَارِي ثُمَّ المَسَاطِرُ ثُمَّ المَمَاحِي",
    ],

    correct:
      "المَسَاطِرُ ثُمَّ المَبَارِي ثُمَّ المَمَاحِي",
  },

  {
    scene_image:
      `${BASE}/erasers-more.webp`,

    title:
      "مِنَ الأَكْثَرِ إِلَى الأَقَلِّ",

    instruction:
      "اِبْدَأْ بِالمَجْمُوعَةِ الأَكْثَرِ عَدَدًا.",

    question:
      "مَا التَّرْتِيبُ الصَّحِيحُ؟",

    question_audio_key:
      "l40_ex3_q4",

    mode:
      "pickRank",

    options: [
      "المَمَاحِي ثُمَّ المَبَارِي",

      "المَبَارِي ثُمَّ المَمَاحِي",

      "المَمَاحِي تُسَاوِي المَبَارِي",
    ],

    correct:
      "المَمَاحِي ثُمَّ المَبَارِي",
  },
] satisfies RankOrderItem[];
