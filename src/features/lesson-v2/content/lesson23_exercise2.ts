import type { PremiumLengthQuestion } from "../exercises-v2/LengthLabPremiumExerciseV2";

export const LESSON_23_EXERCISE_2_AUDIO_BASE = "/audio/teachers/khalil/lesson_23_exercises";

export const LESSON_23_EXERCISE_2: PremiumLengthQuestion[] = [
  {
    mode: "judge",
    question: "أَيُّ الشَّرِيطَيْنِ أَطْوَلُ؟",
    question_audio_key: "l23_final_judge_b1",
    correct_id: "b1_long",
    strips: [
      { id: "b1_short", value: 1, length: 122, color: "#ef4444" },
      { id: "b1_long", value: 2, length: 246, color: "#22c55e" },
    ],
  },
  {
    mode: "judge",
    question: "أَيُّ الشَّرِيطَيْنِ أَقْصَرُ؟",
    question_audio_key: "l23_final_judge_b2",
    correct_id: "b2_short",
    strips: [
      { id: "b2_long", value: 2, length: 250, color: "#ec4899" },
      { id: "b2_short", value: 1, length: 112, color: "#f97316" },
    ],
  },
  {
    mode: "judge",
    question: "أَيُّهُمَا يَصِلُ إِلَى مَسَافَةٍ أَكْبَرَ؟",
    question_audio_key: "l23_final_judge_b3",
    correct_id: "b3_long",
    strips: [
      { id: "b3_long", value: 2, length: 242, color: "#0ea5e9" },
      { id: "b3_short", value: 1, length: 128, color: "#facc15" },
    ],
  },
  {
    mode: "judge",
    question: "أَيُّهُمَا يَنْتَهِي أَوَّلًا؟",
    question_audio_key: "l23_final_judge_b4",
    correct_id: "b4_short",
    strips: [
      { id: "b4_short", value: 1, length: 118, color: "#f43f5e" },
      { id: "b4_long", value: 2, length: 236, color: "#14b8a6" },
    ],
  },
  {
    mode: "judge",
    question: "أَيُّهُمَا يَتَجَاوَزُ الآخَرَ؟",
    question_audio_key: "l23_final_judge_b5",
    correct_id: "b5_long",
    strips: [
      { id: "b5_short", value: 1, length: 110, color: "#16a34a" },
      { id: "b5_long", value: 2, length: 250, color: "#2563eb" },
    ],
  },
];
