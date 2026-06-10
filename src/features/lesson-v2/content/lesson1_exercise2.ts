import type { CountTapItem } from "../exercises-v2/CountTapExerciseV2";

// ═══════════════════════════════════════════════════════════════
// تمرين 2 — اختر المجموعة (CountTap)
// count_word_index = index الكلمة العددية في الـtimings (للكاريوكي العددي)
// ═══════════════════════════════════════════════════════════════

export const LESSON_1_EXERCISE_2: CountTapItem[] = [
  // Q1: الرقم 1 — وَاحِدَةٌ (index 5)
  {
    target_number: 1,
    question: "اِخْتَرِ الْمَجْمُوعَةَ الَّتِي بِهَا تُفَّاحَةٌ وَاحِدَةٌ",
    question_audio_key: "ex2_q1",
    count_word_index: 5,
    options: [2, 1, 3],
    correct_index: 1,
    items_emoji: "🍎",
  },
  // Q2: الرقم 2 — اِثْنَتَانِ (index 3)
  {
    target_number: 2,
    question: "أَيْنَ تُوجَدُ تُفَّاحَتَانِ اِثْنَتَانِ؟",
    question_audio_key: "ex2_q2",
    count_word_index: 3,
    options: [3, 1, 2],
    correct_index: 2,
    items_emoji: "🍎",
  },
  // Q3: الرقم 3 — ثَلَاثُ (index 4)
  {
    target_number: 3,
    question: "اِخْتَرِ الصُّورَةَ الَّتِي بِهَا ثَلَاثُ تُفَّاحَاتٍ",
    question_audio_key: "ex2_q3",
    count_word_index: 4,
    options: [3, 2, 4],
    correct_index: 0,
    items_emoji: "🍎",
  },
  // Q4: الرقم 4 — أَرْبَعَ (index 2)
  {
    target_number: 4,
    question: "أَيْنَ نَرَى أَرْبَعَ تُفَّاحَاتٍ؟",
    question_audio_key: "ex2_q4",
    count_word_index: 2,
    options: [5, 4, 3],
    correct_index: 1,
    items_emoji: "🍎",
  },
  // Q5: الرقم 5 — خَمْسِ (index 2)
  {
    target_number: 5,
    question: "اِبْحَثْ عَنْ خَمْسِ تُفَّاحَاتٍ",
    question_audio_key: "ex2_q5",
    count_word_index: 2,
    options: [5, 4, 3],
    correct_index: 0,
    items_emoji: "🍎",
  },
];

export const LESSON_1_EXERCISE_2_AUDIO_BASE = "/audio/lesson_1_exercises";
