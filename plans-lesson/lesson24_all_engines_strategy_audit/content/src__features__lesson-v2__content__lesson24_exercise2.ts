import type { PathQuestion } from "../exercises-v2/PathJourneyExerciseV2";

export const LESSON_24_EXERCISE_2_AUDIO_BASE = "/audio/teachers/khalil/lesson_24_exercises";

export const LESSON_24_EXERCISE_2: PathQuestion[] = [
  {
    mode: "point",
    question: "اِلْمِسْ نُقْطَةَ البِدَايَةِ",
    question_audio_key: "l24_final_point_q1",
    correct_id: "start",
    visual: { id: "point_straight_a", shape: "straight", color: "#1FA463" },
  },
  {
    mode: "point",
    question: "اِلْمِسْ نُقْطَةَ النِّهَايَةِ",
    question_audio_key: "l24_final_point_q2",
    correct_id: "end",
    visual: { id: "point_curve_a", shape: "curve", color: "#2F80ED" },
  },
  {
    mode: "point",
    question: "مِنْ أَيْنَ نَبْدَأُ؟",
    question_audio_key: "l24_final_point_q3",
    correct_id: "start",
    visual: { id: "point_curve_b", shape: "curve", color: "#2F80ED" },
  },
  {
    mode: "point",
    question: "أَيْنَ نَصِلُ فِي النِّهَايَةِ؟",
    question_audio_key: "l24_final_point_q4",
    correct_id: "end",
    visual: { id: "point_straight_b", shape: "straight", color: "#1FA463" },
  },
  {
    mode: "point",
    question: "اِخْتَرِ النُّقْطَةَ الأُولَى",
    question_audio_key: "l24_final_point_q5",
    correct_id: "start",
    visual: { id: "point_straight_c", shape: "straight", color: "#1FA463" },
  },
];
