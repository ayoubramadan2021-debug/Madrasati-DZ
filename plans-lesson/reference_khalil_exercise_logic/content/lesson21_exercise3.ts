import type { LengthLabItem } from "../exercises-v2/LengthLabExerciseV2";

export const LESSON_21_EXERCISE_3_AUDIO_BASE = "/audio/teachers/taline/lesson_21_exercises";

export const LESSON_21_EXERCISE_3: LengthLabItem[] = [
  {
    title: "محقق الأطوال",
    mission: "اقرأ الجملة ثم اختر: صحيح أم خطأ.",
    question: "الشَّرِيطُ الأَزْرَقُ أَطْوَلُ مِنَ الشَّرِيطِ الأَحْمَرِ.",
    question_audio_key: "l21_tf_q1",
    hint: "قارن النهاية اليمنى للشريطين.",
    options: ["صحيح", "خطأ"],
    correct: "صحيح",
    bars: [
      { label: "الأحمر", color: "#EF4444", width: 46 },
      { label: "الأزرق", color: "#2563EB", width: 88 },
    ],
    view: "bars",
  },
  {
    title: "محقق الأطوال",
    mission: "اقرأ الجملة ثم اختر: صحيح أم خطأ.",
    question: "الشَّرِيطُ الذَّهَبِيُّ أَقْصَرُ مِنَ الشَّرِيطِ الأَزْرَقِ.",
    question_audio_key: "l21_tf_q2",
    hint: "الذهبي ينتهي قبل الأزرق.",
    options: ["صحيح", "خطأ"],
    correct: "صحيح",
    bars: [
      { label: "الذهبي", color: "#E8A020", width: 58 },
      { label: "الأزرق", color: "#2563EB", width: 86 },
    ],
    view: "bars",
  },
  {
    title: "محقق الأطوال",
    mission: "اقرأ الجملة ثم اختر: صحيح أم خطأ.",
    question: "الشَّرِيطُ الأَحْمَرُ أَطْوَلُ مِنَ الشَّرِيطِ الذَّهَبِيِّ.",
    question_audio_key: "l21_tf_q3",
    hint: "من الأطول: الأحمر أم الذهبي؟",
    options: ["صحيح", "خطأ"],
    correct: "خطأ",
    bars: [
      { label: "الأحمر", color: "#EF4444", width: 40 },
      { label: "الذهبي", color: "#E8A020", width: 65 },
    ],
    view: "bars",
  },
  {
    title: "محقق الأطوال",
    mission: "اقرأ الجملة ثم اختر: صحيح أم خطأ.",
    question: "الشَّرِيطَانِ الأَخْضَرُ وَالْبَنَفْسَجِيُّ مُتَسَاوِيَانِ فِي الطُّولِ.",
    question_audio_key: "l21_tf_q4",
    hint: "هل ينتهيان في نفس المكان؟",
    options: ["صحيح", "خطأ"],
    correct: "صحيح",
    bars: [
      { label: "الأخضر", color: "#22C55E", width: 68 },
      { label: "البنفسجي", color: "#A855F7", width: 68 },
    ],
    view: "bars",
  },
  {
    title: "محقق الأطوال",
    mission: "اقرأ الجملة ثم اختر: صحيح أم خطأ.",
    question: "الشَّرِيطُ الأَصْفَرُ أَطْوَلُ مِنَ الشَّرِيطِ الأَخْضَرِ.",
    question_audio_key: "l21_tf_q5",
    hint: "انظر أيهما يصل أبعد.",
    options: ["صحيح", "خطأ"],
    correct: "خطأ",
    bars: [
      { label: "الأصفر", color: "#FACC15", width: 48 },
      { label: "الأخضر", color: "#22C55E", width: 80 },
    ],
    view: "bars",
  },
];
