import type { LengthLabItem } from "../exercises-v2/LengthLabExerciseV2";

export const LESSON_21_EXERCISE_2_AUDIO_BASE = "/audio/teachers/taline/lesson_21_exercises";

const ABC = {
  A: { label: "أ", color: "#EF4444", width: 0 },
  B: { label: "ب", color: "#2563EB", width: 0 },
  C: { label: "ج", color: "#E8A020", width: 0 },
};

export const LESSON_21_EXERCISE_2: LengthLabItem[] = [
  {
    title: "مختبر الحروف الملونة",
    mission: "تذكر دائمًا: أ أحمر، ب أزرق، ج ذهبي.",
    question: "أَيُّ الشَّرَائِطِ أَقْصَرُ؟",
    question_audio_key: "l21_abc_q1",
    hint: "قارن نهاية كل شريط.",
    options: ["أ", "ب", "ج"],
    correct: "أ",
    bars: [
      { ...ABC.A, width: 40 },
      { ...ABC.B, width: 88 },
      { ...ABC.C, width: 62 },
    ],
    view: "bars",
  },
  {
    title: "مختبر الحروف الملونة",
    mission: "تذكر دائمًا: أ أحمر، ب أزرق، ج ذهبي.",
    question: "أَيُّ الشَّرَائِطِ أَطْوَلُ؟",
    question_audio_key: "l21_abc_q2",
    hint: "الأطول يصل إلى أبعد نقطة.",
    options: ["أ", "ب", "ج"],
    correct: "ب",
    bars: [
      { ...ABC.A, width: 52 },
      { ...ABC.B, width: 94 },
      { ...ABC.C, width: 69 },
    ],
    view: "bars",
  },
  {
    title: "مختبر الحروف الملونة",
    mission: "ابحث عن الشريط المتوسط.",
    question: "أَيُّ شَرِيطٍ مُتَوَسِّطٌ فِي الطُّولِ؟",
    question_audio_key: "l21_abc_q3",
    hint: "المتوسط يقع بين الأطول والأقصر.",
    options: ["أ", "ب", "ج"],
    correct: "ج",
    bars: [
      { ...ABC.A, width: 37 },
      { ...ABC.B, width: 92 },
      { ...ABC.C, width: 60 },
    ],
    view: "bars",
  },
  {
    title: "مختبر الحروف الملونة",
    mission: "رتب من الأقصر إلى الأطول.",
    question: "مَا التَّرْتِيبُ الصَّحِيحُ مِنَ الأَقْصَرِ إِلَى الأَطْوَلِ؟",
    question_audio_key: "l21_abc_q4",
    hint: "ابدأ بالشريط الأقصر.",
    options: ["أ، ج، ب", "ب، ج، أ", "ج، أ، ب"],
    correct: "أ، ج، ب",
    bars: [
      { ...ABC.A, width: 35 },
      { ...ABC.B, width: 90 },
      { ...ABC.C, width: 58 },
    ],
    view: "bars",
  },
  {
    title: "مختبر الحروف الملونة",
    mission: "رتب من الأطول إلى الأقصر.",
    question: "مَا التَّرْتِيبُ الصَّحِيحُ مِنَ الأَطْوَلِ إِلَى الأَقْصَرِ؟",
    question_audio_key: "l21_abc_q5",
    hint: "ابدأ بالأطول ثم انزل.",
    options: ["ب، ج، أ", "أ، ب، ج", "ج، أ، ب"],
    correct: "ب، ج، أ",
    bars: [
      { ...ABC.A, width: 42 },
      { ...ABC.B, width: 86 },
      { ...ABC.C, width: 65 },
    ],
    view: "bars",
  },
];
