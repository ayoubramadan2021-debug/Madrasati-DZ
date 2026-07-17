import type {
  RankOrderItem,
} from "../exercises-v2/RankOrderExerciseV2";

export const LESSON_35_EXERCISE_2_AUDIO_BASE =
  "/audio/teachers/taline/lesson_35_amusement_breathing/exercises";

const BASE =
  "/lessons/v2/lesson35-amusement-breathing/exercises";

export const LESSON_35_EXERCISE_2 = [
  {
    scene_image: `/lessons/v2/lesson35-amusement-breathing/premium-breathing/quiz/q7.webp`,
    title: "أُرَتِّبُ خُطُوَاتِ التَّنَفُّسِ",
    instruction:
      "رتب خطوات التنفس الهادئ.",
    question:
      "مَا التَّرْتِيبُ الصَّحِيحُ؟",
    question_audio_key: "l35_ex2_q1",
    mode: "pickRank",
    options: [
      "أقف بهدوء، ثم أستنشق من الأنف، ثم أزفر ببطء",
      "أزفر، ثم أجري، ثم أستنشق",
      "أستنشق، ثم أجري، ثم أحبس النفس",
    ],
    correct:
      "أقف بهدوء، ثم أستنشق من الأنف، ثم أزفر ببطء",
  },
  {
    scene_image: `/lessons/v2/lesson35-amusement-breathing/premium-breathing/quiz/q3.webp`,
    title: "بَعْدَ اللَّعِبِ",
    instruction:
      "رتب ما أفعله عندما أتعب.",
    question:
      "أَيُّ تَرْتِيبٍ صَحِيحٌ؟",
    question_audio_key: "l35_ex2_q2",
    mode: "pickRank",
    options: [
      "أتوقف، ثم أهدئ جسمي، ثم أتنفس ببطء",
      "أتنفس بسرعة، ثم أجري، ثم أتوقف",
      "أواصل الجري، ثم أحبس نفسي، ثم أتوقف",
    ],
    correct:
      "أتوقف، ثم أهدئ جسمي، ثم أتنفس ببطء",
  },
  {
    scene_image: `/lessons/v2/lesson35-amusement-breathing/premium-breathing/quiz/q1.webp`,
    title: "دَوْرَةُ تَنَفُّسٍ هَادِئَةٍ",
    instruction:
      "رتب الشهيق والهدوء والزفير.",
    question:
      "مَا التَّرْتِيبُ الصَّحِيحُ؟",
    question_audio_key: "l35_ex2_q3",
    mode: "pickRank",
    options: [
      "شهيق، ثم هدوء قصير، ثم زفير",
      "زفير، ثم جري، ثم شهيق",
      "هدوء، ثم زفير، ثم شهيق سريع",
    ],
    correct:
      "شهيق، ثم هدوء قصير، ثم زفير",
  },
  {
    scene_image: `/lessons/v2/lesson35-amusement-breathing/premium-breathing/quiz/q2.webp`,
    title: "أَبْحَثُ عَنْ هَوَاءٍ نَقِيٍّ",
    instruction:
      "رتب ما أفعله عند وجود الغبار.",
    question:
      "أَيُّ تَرْتِيبٍ صَحِيحٌ؟",
    question_audio_key: "l35_ex2_q4",
    mode: "pickRank",
    options: [
      "أبتعد عن الغبار، ثم أذهب لمكان نقي، ثم أتنفس بهدوء",
      "أبقى في الغبار، ثم أجري، ثم أتنفس بسرعة",
      "أتنفس بسرعة، ثم أقترب من الغبار، ثم أتوقف",
    ],
    correct:
      "أبتعد عن الغبار، ثم أذهب لمكان نقي، ثم أتنفس بهدوء",
  },
] satisfies RankOrderItem[];
