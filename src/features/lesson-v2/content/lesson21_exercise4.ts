import type { LengthMasteryItem } from "../exercises-v2/LengthMasteryExerciseV2";

export const LESSON_21_EXERCISE_4_AUDIO_BASE = "/audio/teachers/taline/lesson_21_exercises";

export const LESSON_21_EXERCISE_4: LengthMasteryItem[] = [
  {
    title: "سباق الترتيب",
    instruction: "رتب من الأطول إلى الأقصر.",
    question: "مَا التَّرْتِيبُ الصَّحِيحُ؟",
    question_audio_key: "l21_ex4_q1",
    bars: [
      { id: "a", label: "أ", width: 92, color: "#2563EB", icon: "🔵" },
      { id: "b", label: "ب", width: 63, color: "#E8A020", icon: "🟡" },
      { id: "c", label: "ج", width: 36, color: "#EF4444", icon: "🔴" },
    ],
    options: ["أ، ب، ج", "ج، ب، أ"],
    correct: "أ، ب، ج",
    hint: "ابدأ بالأطول، ثم المتوسط، ثم الأقصر.",
  },
  {
    title: "سباق الترتيب",
    instruction: "رتب من الأطول إلى الأقصر.",
    question: "اِخْتَرِ التَّرْتِيبَ الصَّحِيحَ.",
    question_audio_key: "l21_ex4_q2",
    bars: [
      { id: "a", label: "أ", width: 55, color: "#20A567", icon: "🟢" },
      { id: "b", label: "ب", width: 88, color: "#2563EB", icon: "🔵" },
      { id: "c", label: "ج", width: 34, color: "#EF4444", icon: "🔴" },
    ],
    options: ["ب، أ، ج", "ج، أ، ب"],
    correct: "ب، أ، ج",
    hint: "ب هو الأطول، وج هو الأقصر.",
  },
  {
    title: "سباق الترتيب",
    instruction: "هذه المرة الفروق قريبة.",
    question: "رَتِّبْ بِدِقَّةٍ.",
    question_audio_key: "l21_ex4_q3",
    bars: [
      { id: "a", label: "أ", width: 70, color: "#7C3AED", icon: "🟣" },
      { id: "b", label: "ب", width: 44, color: "#EC4899", icon: "🌸" },
      { id: "c", label: "ج", width: 90, color: "#E8A020", icon: "🟡" },
    ],
    options: ["ج، أ، ب", "أ، ب، ج"],
    correct: "ج، أ، ب",
    hint: "ج أطول من أ، وأ أطول من ب.",
  },
  {
    title: "سباق الترتيب",
    instruction: "اختر السلسلة الصحيحة.",
    question: "مَا التَّرْتِيبُ المُنَاسِبُ؟",
    question_audio_key: "l21_ex4_q4",
    bars: [
      { id: "a", label: "أ", width: 39, color: "#EF4444", icon: "🔴" },
      { id: "b", label: "ب", width: 92, color: "#2563EB", icon: "🔵" },
      { id: "c", label: "ج", width: 66, color: "#20A567", icon: "🟢" },
    ],
    options: ["ب، ج، أ", "أ، ج، ب"],
    correct: "ب، ج، أ",
    hint: "الأزرق أطول، ثم الأخضر، ثم الأحمر.",
  },
  {
    title: "سباق الترتيب",
    instruction: "آخر تحد في الأطوال.",
    question: "اِخْتَرْ مِنَ الأَطْوَلِ إِلَى الأَقْصَرِ.",
    question_audio_key: "l21_ex4_q5",
    bars: [
      { id: "a", label: "أ", width: 60, color: "#E8A020", icon: "🟡" },
      { id: "b", label: "ب", width: 36, color: "#EF4444", icon: "🔴" },
      { id: "c", label: "ج", width: 84, color: "#2563EB", icon: "🔵" },
    ],
    options: ["ج، أ، ب", "ب، أ، ج"],
    correct: "ج، أ، ب",
    hint: "ج هو الأطول، وب هو الأقصر.",
  },
];
