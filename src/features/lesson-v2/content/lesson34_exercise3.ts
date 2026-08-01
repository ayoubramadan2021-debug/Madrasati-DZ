import type {
  RankOrderItem,
} from "../exercises-v2/RankOrderExerciseV2";

export const LESSON_34_EXERCISE_3_AUDIO_BASE =
  "/audio/teachers/khalil/lesson_34_amusement_paths/exercises";

const BASE =
  "/lessons/v2/lesson34-amusement-paths/exercises";

export const LESSON_34_EXERCISE_3 = [
  {
    scene_image: `${BASE}/rank-amusement-paths-1.svg`,
    title: "أُرَتِّبُ خُطُوَاتِ المَسْلَكِ",
    instruction:
      "رتب خطوات الوصول إلى الزحليقة.",
    question:
      "مَا التَّرْتِيبُ الصَّحِيحُ؟",
    question_audio_key: "l34_ex3_q1",
    mode: "pickRank",
    options: [
      "الانطلاق، ثم اتباع السهم، ثم الوصول",
      "الوصول، ثم الانطلاق، ثم اتباع السهم",
      "اتباع السهم، ثم الوصول، ثم الانطلاق",
    ],
    correct:
      "الانطلاق، ثم اتباع السهم، ثم الوصول",
  },
  {
    scene_image: `${BASE}/rank-amusement-paths-2.svg`,
    title: "أَتَّبِعُ التَّعْلِيمَاتِ",
    instruction:
      "رتب تعليمات الوصول إلى القطار.",
    question:
      "أَيُّ تَرْتِيبٍ صَحِيحٌ؟",
    question_audio_key: "l34_ex3_q2",
    mode: "pickRank",
    options: [
      "تقدم مستقيمًا، ثم انعطف يمينًا، ثم صل إلى القطار",
      "صل إلى القطار، ثم انعطف يمينًا، ثم تقدم",
      "انعطف يمينًا، ثم صل إلى القطار، ثم تقدم",
    ],
    correct:
      "تقدم مستقيمًا، ثم انعطف يمينًا، ثم صل إلى القطار",
  },
  {
    scene_image: `${BASE}/rank-amusement-paths-3.svg`,
    title: "مِنَ البَوَّابَةِ إِلَى اللُّعْبَةِ",
    instruction:
      "رتب خطوات الوصول إلى العجلة.",
    question:
      "مَا الخُطُوَاتُ الصَّحِيحَةُ؟",
    question_audio_key: "l34_ex3_q3",
    mode: "pickRank",
    options: [
      "ابدأ، ثم انعطف يسارًا، ثم صل إلى العجلة",
      "صل إلى العجلة، ثم ابدأ، ثم انعطف يسارًا",
      "انعطف يسارًا، ثم صل، ثم ابدأ",
    ],
    correct:
      "ابدأ، ثم انعطف يسارًا، ثم صل إلى العجلة",
  },
  {
    scene_image: `${BASE}/rank-amusement-paths-4.svg`,
    title: "أَخْتَارُ المَسْلَكَ",
    instruction:
      "رتب ما أفعله قبل متابعة الطريق.",
    question:
      "أَيُّ تَرْتِيبٍ صَحِيحٌ؟",
    question_audio_key: "l34_ex3_q4",
    mode: "pickRank",
    options: [
      "اقرأ اللافتة، ثم اختر الاتجاه، ثم تابع إلى المخرج",
      "تابع إلى المخرج، ثم اقرأ اللافتة، ثم اختر الاتجاه",
      "اختر الاتجاه، ثم تابع، ثم اقرأ اللافتة",
    ],
    correct:
      "اقرأ اللافتة، ثم اختر الاتجاه، ثم تابع إلى المخرج",
  },
] satisfies RankOrderItem[];
