import type {
  Lesson32VisualChoiceItem,
} from "../exercises-v2/lesson32/Lesson32VisualChoiceEngineV2";

export const LESSON_32_EXERCISE_2:
  Lesson32VisualChoiceItem[] = [
  {
    question:
      "اِخْتَرِ الوَجْبَةَ الصِّحِّيَّةَ وَالمُتَوَازِنَةَ لِلرِّحْلَةِ.",

    question_audio_key: "ex2_q1",
    correct: "healthy-meal",

    options: [
      {
        id: "healthy-meal",
        emoji: "🍎 🥖 🥛 💧",
        label:
          "فَوَاكِهُ وَخُبْزٌ وَحَلِيبٌ وَمَاءٌ",
        background: "#f2fff6",
      },
      {
        id: "unhealthy-meal",
        emoji: "🍭 🍟 🥤",
        label:
          "حَلْوَى وَبَطَاطَا مَقْلِيَّةٌ وَمَشْرُوبٌ غَازِيٌّ",
        background: "#fff7f3",
      },
    ],
  },
  {
    question:
      "اِخْتَرِ المَشْرُوبَ الصِّحِّيَّ لِلرِّحْلَةِ.",

    question_audio_key: "ex2_q2",
    correct: "water",

    options: [
      {
        id: "water",
        emoji: "💧",
        label: "المَاءُ",
        background: "#effaff",
      },
      {
        id: "soda",
        emoji: "🥤",
        label: "مَشْرُوبٌ غَازِيٌّ",
        background: "#fff5f1",
      },
    ],
  },
  {
    question:
      "اِخْتَرِ السُّلُوكَ الَّذِي يُحَافِظُ عَلَى نَظَافَةِ الحَدِيقَةِ.",

    question_audio_key: "ex2_q3",
    correct: "trash-bin",

    options: [
      {
        id: "trash-bin",
        emoji: "🧒 🗑️",
        label:
          "وَضْعُ النُّفَايَاتِ فِي السَّلَّةِ",
        background: "#f2fff6",
      },
      {
        id: "trash-ground",
        emoji: "🧃 🗞️ 🍂",
        label:
          "رَمْيُ النُّفَايَاتِ عَلَى الأَرْضِ",
        background: "#fff3f3",
      },
    ],
  },
  {
    question:
      "اِخْتَرِ السُّلُوكَ الحَسَنَ نَحْوَ النَّبَاتِ.",

    question_audio_key: "ex2_q4",
    correct: "water-tree",

    options: [
      {
        id: "water-tree",
        emoji: "🌳 💧",
        label: "سَقْيُ الشَّجَرَةِ",
        background: "#f1fff5",
      },
      {
        id: "break-tree",
        emoji: "🌿 💥",
        label: "كَسْرُ أَغْصَانِ الشَّجَرَةِ",
        background: "#fff3f3",
      },
    ],
  },
];
