import type { PremiumLengthQuestion } from "../exercises-v2/LengthLabPremiumExerciseV2";

export const LESSON_23_EXERCISE_3_AUDIO_BASE = "/audio/teachers/khalil/lesson_23_exercises";

export const LESSON_23_EXERCISE_3: PremiumLengthQuestion[] = [
  {
    mode: "arrange",
    question: "رَتِّبْ مِنَ الأَقْصَرِ إِلَى الأَطْوَلِ",
    question_audio_key: "l23_final_order_c1",
    direction: "asc",
    strips: [
      { id: "c1_long", value: 3, length: 246, color: "#22c55e" },
      { id: "c1_short", value: 1, length: 116, color: "#ef4444" },
      { id: "c1_mid", value: 2, length: 180, color: "#facc15" },
    ],
  },
  {
    mode: "arrange",
    question: "ضَعِ الأَطْوَلَ أَوَّلًا ثُمَّ الأَقْصَرَ",
    question_audio_key: "l23_final_order_c2",
    direction: "desc",
    strips: [
      { id: "c2_mid", value: 2, length: 172, color: "#06b6d4" },
      { id: "c2_long", value: 3, length: 250, color: "#ec4899" },
      { id: "c2_short", value: 1, length: 108, color: "#f97316" },
    ],
  },
  {
    mode: "arrange",
    question: "رَتِّبْ الشَّرَائِطَ مِنَ الصَّغِيرِ إِلَى الكَبِيرِ",
    question_audio_key: "l23_final_order_c3",
    direction: "asc",
    strips: [
      { id: "c3_long", value: 3, length: 250, color: "#8b5cf6" },
      { id: "c3_mid", value: 2, length: 178, color: "#14b8a6" },
      { id: "c3_short", value: 1, length: 112, color: "#f43f5e" },
    ],
  },
  {
    mode: "arrange",
    question: "ضَعِ الأَقْصَرَ أَخِيرًا",
    question_audio_key: "l23_final_order_c4",
    direction: "desc",
    strips: [
      { id: "c4_short", value: 1, length: 104, color: "#dc2626" },
      { id: "c4_long", value: 3, length: 240, color: "#2563eb" },
      { id: "c4_mid", value: 2, length: 168, color: "#16a34a" },
    ],
  },
  {
    mode: "arrange",
    question: "رَتِّبْ أَرْبَعَةَ شَرَائِطَ مِنَ الأَقْصَرِ إِلَى الأَطْوَلِ",
    question_audio_key: "l23_final_order_c5",
    direction: "asc",
    strips: [
      { id: "c5_mid1", value: 2, length: 142, color: "#f59e0b" },
      { id: "c5_long", value: 4, length: 248, color: "#0ea5e9" },
      { id: "c5_short", value: 1, length: 98, color: "#e11d48" },
      { id: "c5_mid2", value: 3, length: 194, color: "#84cc16" },
    ],
  },
];
