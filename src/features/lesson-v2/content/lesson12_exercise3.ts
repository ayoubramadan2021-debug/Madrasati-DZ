// الدرس 12 - التمرين 3: اربط كل مجموعة بعددها (يشمل 0) — DragMatchExerciseV2
import type { DragMatchItem } from "../exercises-v2/DragMatchExerciseV2";

const N = (value: number) => ({ kind: "number" as const, value });
const C = (value: number, emoji: string) => ({ kind: "count" as const, value, emoji });

export const LESSON_12_EXERCISE_3: DragMatchItem[] = [
  {
    question: "اِسْحَبْ كُلَّ رَقَمٍ إِلَى المَجْمُوعَةِ المُنَاسِبَة",
    question_audio_key: "l12_ex3_q1",
    pairs: [
      { match_id: "p1", draggable: N(0), target: C(0, "⚽") },
      { match_id: "p2", draggable: N(2), target: C(2, "⚽") },
      { match_id: "p3", draggable: N(4), target: C(4, "⚽") },
    ],
  },
  {
    question: "اِسْحَبْ كُلَّ مَجْمُوعَةٍ إِلَى رَقَمِها",
    question_audio_key: "l12_ex3_q2",
    pairs: [
      { match_id: "p1", draggable: C(1, "🎈"), target: N(1) },
      { match_id: "p2", draggable: C(0, "🎈"), target: N(0) },
      { match_id: "p3", draggable: C(5, "🎈"), target: N(5) },
    ],
  },
  {
    question: "اِسْحَبْ كُلَّ رَقَمٍ إِلَى المَجْمُوعَةِ المُنَاسِبَة",
    question_audio_key: "l12_ex3_q3",
    pairs: [
      { match_id: "p1", draggable: N(3), target: C(3, "⭐") },
      { match_id: "p2", draggable: N(0), target: C(0, "⭐") },
      { match_id: "p3", draggable: N(2), target: C(2, "⭐") },
    ],
  },
];

export const LESSON_12_EXERCISE_3_AUDIO_BASE = "/audio/lesson_12_exercises";
