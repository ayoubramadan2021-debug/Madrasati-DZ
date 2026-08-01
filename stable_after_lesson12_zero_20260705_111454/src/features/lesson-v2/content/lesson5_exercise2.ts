// الدرس 5 - التمرين 2: مكونات الطبخ (CompareExerciseV2)
// السؤال محايد + خيارات موحّدة: اكثر/اقل/يساوي

import type { CompareItem } from "../exercises-v2/CompareExerciseV2";

export const LESSON_5_EXERCISE_2: CompareItem[] = [
  {
    group_a: ["🥕", "🥕", "🥕", "🥕", "🥕", "🥕", "🥕", "🥕"],
    group_b: ["🍅", "🍅", "🍅", "🍅", "🍅"],
    question: "فِي سَلَطَةِ تَالِين، قَارِنِ الجَزَرَ بِالطَّمَاطِم",
    question_audio_key: "l5_ex2_q1",
    options: ["أَكْثَر", "أَقَلّ", "يُسَاوِي"],
    correct: "أَكْثَر",
  },
  {
    group_a: ["🍞", "🍞", "🍞", "🍞", "🍞", "🍞"],
    group_b: ["🥐", "🥐", "🥐", "🥐", "🥐", "🥐", "🥐", "🥐", "🥐"],
    question: "عَلَى طَاوِلَةِ الفُطُور، قَارِنِ الخُبْزَ بِالفَطَائِر",
    question_audio_key: "l5_ex2_q2",
    options: ["أَكْثَر", "أَقَلّ", "يُسَاوِي"],
    correct: "أَقَلّ",
  },
  {
    group_a: ["🍎", "🍎", "🍎", "🍎", "🍎", "🍎", "🍎"],
    group_b: ["🍌", "🍌", "🍌", "🍌", "🍌", "🍌", "🍌"],
    question: "فِي سَلَّةِ الفَوَاكِه، قَارِنِ التُّفَّاحَ بِالمَوْز",
    question_audio_key: "l5_ex2_q3",
    options: ["أَكْثَر", "أَقَلّ", "يُسَاوِي"],
    correct: "يُسَاوِي",
  },
  {
    group_a: ["🥚", "🥚", "🥚", "🥚", "🥚", "🥚", "🥚", "🥚", "🥚"],
    group_b: ["🧀", "🧀", "🧀", "🧀", "🧀", "🧀"],
    question: "لِتُحَضِّرَ الكَعْكَة، قَارِنِ البَيْضَ بِالجُبْن",
    question_audio_key: "l5_ex2_q4",
    options: ["أَكْثَر", "أَقَلّ", "يُسَاوِي"],
    correct: "أَكْثَر",
  },
  {
    group_a: ["🍓", "🍓", "🍓", "🍓", "🍓", "🍓"],
    group_b: ["🍇", "🍇", "🍇", "🍇", "🍇", "🍇", "🍇", "🍇"],
    question: "لِتُزَيِّنَ الحَلْوَى، قَارِنِ الفَرَاوِلَةَ بِالعِنَب",
    question_audio_key: "l5_ex2_q5",
    options: ["أَكْثَر", "أَقَلّ", "يُسَاوِي"],
    correct: "أَقَلّ",
  },
];

export const LESSON_5_EXERCISE_2_AUDIO_BASE = "/audio/lesson_5_exercises";
