import type { PathQuestion } from "../exercises-v2/PathJourneyExerciseV2";

export const LESSON_24_EXERCISE_1_AUDIO_BASE = "/audio/teachers/khalil/lesson_24_exercises";

export const LESSON_24_EXERCISE_1: PathQuestion[] = [
  {
    mode: "type",
    question: "اِخْتَرِ المَسَارَ المُسْتَقِيمَ",
    question_audio_key: "l24_final_type_q1",
    correct_id: "straight_a",
    options: [
      { id: "curve_a", shape: "curve", color: "#2F80ED" },
      { id: "straight_a", shape: "straight", color: "#1FA463" },
    ],
  },
  {
    mode: "type",
    question: "اِخْتَرِ المَسَارَ المُنْحَنِيَ",
    question_audio_key: "l24_final_type_q2",
    correct_id: "curve_b",
    options: [
      { id: "straight_b", shape: "straight", color: "#1FA463" },
      { id: "curve_b", shape: "curve", color: "#2F80ED" },
    ],
  },
  {
    mode: "type",
    question: "أَيْنَ المَسَارُ المُسْتَقِيمُ؟",
    question_audio_key: "l24_final_type_q3",
    correct_id: "straight_c",
    options: [
      { id: "straight_c", shape: "straight", color: "#1FA463" },
      { id: "curve_c", shape: "curve", color: "#2F80ED" },
    ],
  },
  {
    mode: "type",
    question: "أَيْنَ المَسَارُ المُنْحَنِي؟",
    question_audio_key: "l24_final_type_q4",
    correct_id: "curve_d",
    options: [
      { id: "curve_d", shape: "curve", color: "#2F80ED" },
      { id: "straight_d", shape: "straight", color: "#1FA463" },
    ],
  },
  {
    mode: "type",
    question: "اِخْتَرِ المَسَارَ الَّذِي لَا يَنْحَنِي",
    question_audio_key: "l24_final_type_q5",
    correct_id: "straight_e",
    options: [
      { id: "curve_e", shape: "curve", color: "#2F80ED" },
      { id: "straight_e", shape: "straight", color: "#1FA463" },
    ],
  },
];
