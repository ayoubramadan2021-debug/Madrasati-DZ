import type { PathQuestion } from "../exercises-v2/PathJourneyExerciseV2";

export const LESSON_24_EXERCISE_1_AUDIO_BASE = "/audio/teachers/khalil/lesson_24_exercises";

export const LESSON_24_EXERCISE_1: PathQuestion[] = [
  {
    mode: "type",
    question: "اِخْتَرِ المَسَارَ المُسْتَقِيمَ",
    question_audio_key: "l24_clean_type_q1",
    correct_id: "straight_1",
    options: [
      { id: "curve_1", shape: "curve", color: "#2F80ED" },
      { id: "straight_1", shape: "straight", color: "#1FA463" },
    ],
  },
  {
    mode: "type",
    question: "اِخْتَرِ المَسَارَ المُنْحَنِيَ",
    question_audio_key: "l24_clean_type_q2",
    correct_id: "curve_2",
    options: [
      { id: "straight_2", shape: "straight", color: "#1FA463" },
      { id: "curve_2", shape: "curve", color: "#2F80ED" },
    ],
  },
  {
    mode: "type",
    question: "أَيُّ مَسَارٍ لَا يَنْحَنِي؟",
    question_audio_key: "l24_clean_type_q3",
    correct_id: "straight_3",
    options: [
      { id: "straight_3", shape: "straight", color: "#1FA463" },
      { id: "curve_3", shape: "curve", color: "#2F80ED" },
    ],
  },
  {
    mode: "type",
    question: "أَيُّ مَسَارٍ فِيهِ اِنْحِنَاءٌ؟",
    question_audio_key: "l24_clean_type_q4",
    correct_id: "curve_4",
    options: [
      { id: "curve_4", shape: "curve", color: "#2F80ED" },
      { id: "straight_4", shape: "straight", color: "#1FA463" },
    ],
  },
  {
    mode: "type",
    question: "اِخْتَرِ المَسَارَ الَّذِي نَسِيرُ فِيهِ مُبَاشَرَةً",
    question_audio_key: "l24_clean_type_q5",
    correct_id: "straight_5",
    options: [
      { id: "curve_5", shape: "curve", color: "#2F80ED" },
      { id: "straight_5", shape: "straight", color: "#1FA463" },
    ],
  },
];
