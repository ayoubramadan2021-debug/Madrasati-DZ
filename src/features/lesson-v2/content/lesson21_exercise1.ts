import type { NumberChoiceItem } from "../exercises-v2/NumberChoiceExerciseV2";

export const LESSON_21_EXERCISE_1_AUDIO_BASE = "/audio/lesson_21_exercise1";

export const LESSON_21_EXERCISE_1: NumberChoiceItem[] = [
  {
    title: "نَخْتَارُ الأَقْصَرَ",
    instruction: "اِخْتَارُوا الشَّرِيطَ الأَقْصَرَ.",
    question: "أَيُّهُمَا أَقْصَرُ؟",
    question_audio_key: "q1",
    promptNumbers: ["▁▁", "▁▁▁▁▁"],
    correct: "الشَّرِيطُ الأَوَّلُ",
    options: ["الشَّرِيطُ الأَوَّلُ", "الشَّرِيطُ الثَّانِي"],
  },
];
