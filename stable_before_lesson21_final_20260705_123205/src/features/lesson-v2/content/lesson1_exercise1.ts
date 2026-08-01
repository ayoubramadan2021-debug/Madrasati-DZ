import type { TapSelectItem } from "../exercises-v2/TapSelectExerciseV2";

// ═══════════════════════════════════════════════════════════════
// تمرين 1 — رؤية الأعداد (TapSelect)
// إعراب صحيح: كل اسم بعد "في" مكسور، بعد "إلى" مكسور، إلخ
// ═══════════════════════════════════════════════════════════════

export const LESSON_1_EXERCISE_1: TapSelectItem[] = [
  {
    items_count: 1,
    items_emoji: "🍎",
    question: "كَمْ تُفَّاحَةً تَرَى؟",
    question_audio_key: "ex1_q1",
    options: [1, 2, 3],
    correct: 1,
  },
  {
    items_count: 3,
    items_emoji: "🍎",
    question: "اِخْتَرِ الْعَدَدَ الْمُنَاسِبَ",
    question_audio_key: "ex1_q2",
    options: [2, 3, 4],
    correct: 3,
  },
  {
    items_count: 2,
    items_emoji: "🍎",
    question: "عُدَّ التُّفَّاحَاتِ وَاخْتَرْ",
    question_audio_key: "ex1_q3",
    options: [1, 2, 4],
    correct: 2,
  },
  {
    items_count: 5,
    items_emoji: "🍎",
    question: "كَمْ تُفَّاحَةً فِي الصُّورَةِ؟",
    question_audio_key: "ex1_q4",
    options: [3, 4, 5],
    correct: 5,
  },
  {
    items_count: 4,
    items_emoji: "🍎",
    question: "اُنْظُرْ جَيِّدًا وَاخْتَرِ الْعَدَدَ",
    question_audio_key: "ex1_q5",
    options: [3, 4, 5],
    correct: 4,
  },
];

export const LESSON_1_EXERCISE_1_AUDIO_BASE = "/audio/lesson_1_exercises";
