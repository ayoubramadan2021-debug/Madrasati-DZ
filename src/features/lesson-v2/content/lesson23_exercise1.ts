import type { PremiumLengthQuestion } from "../exercises-v2/LengthLabPremiumExerciseV2";

export const LESSON_23_EXERCISE_1_AUDIO_BASE = "/audio/teachers/khalil/lesson_23_exercises";

export const LESSON_23_EXERCISE_1: PremiumLengthQuestion[] = [
  {
    mode: "discover",
    question: "أَيْنَ الشَّرِيطُ الأَقْصَرُ؟",
    question_audio_key: "l23_final_find_a1",
    correct_id: "a1_short",
    strips: [
      { id: "a1_long", value: 3, length: 246, color: "#22c55e" },
      { id: "a1_short", value: 1, length: 116, color: "#ef4444" },
      { id: "a1_mid", value: 2, length: 180, color: "#facc15" },
    ],
  },
  {
    mode: "discover",
    question: "أَيْنَ الشَّرِيطُ الأَطْوَلُ؟",
    question_audio_key: "l23_final_find_a2",
    correct_id: "a2_long",
    strips: [
      { id: "a2_mid", value: 2, length: 172, color: "#06b6d4" },
      { id: "a2_short", value: 1, length: 108, color: "#f97316" },
      { id: "a2_long", value: 3, length: 250, color: "#ec4899" },
    ],
  },
  {
    mode: "discover",
    question: "اِخْتَرِ الشَّرِيطَ المُتَوَسِّطَ",
    question_audio_key: "l23_final_find_a3",
    correct_id: "a3_mid",
    strips: [
      { id: "a3_long", value: 3, length: 250, color: "#8b5cf6" },
      { id: "a3_mid", value: 2, length: 178, color: "#14b8a6" },
      { id: "a3_short", value: 1, length: 112, color: "#f43f5e" },
    ],
  },
  {
    mode: "discover",
    question: "مَنْ يَنْتَهِي أَقْرَبَ إِلَى خَطِّ البِدَايَةِ؟",
    question_audio_key: "l23_final_find_a4",
    correct_id: "a4_short",
    strips: [
      { id: "a4_short", value: 1, length: 104, color: "#dc2626" },
      { id: "a4_long", value: 3, length: 240, color: "#2563eb" },
      { id: "a4_mid", value: 2, length: 168, color: "#16a34a" },
    ],
  },
  {
    mode: "discover",
    question: "مَنْ يَبْتَعِدُ أَكْثَرَ عَنْ خَطِّ البِدَايَةِ؟",
    question_audio_key: "l23_final_find_a5",
    correct_id: "a5_long",
    strips: [
      { id: "a5_mid", value: 2, length: 168, color: "#f59e0b" },
      { id: "a5_long", value: 3, length: 248, color: "#0ea5e9" },
      { id: "a5_short", value: 1, length: 110, color: "#e11d48" },
    ],
  },
];
