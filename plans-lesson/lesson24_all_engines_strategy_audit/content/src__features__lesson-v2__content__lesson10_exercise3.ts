// الدرس 10 - التمرين 3: اربط مجموعة الأدوات بالعدد (DragMatchExerciseV2)
import type { DragMatchItem } from "../exercises-v2/DragMatchExerciseV2";

const N = (value: number) => ({ kind: "number" as const, value });
const C = (value: number, emoji: string) => ({ kind: "count" as const, value, emoji });

export const LESSON_10_EXERCISE_3: DragMatchItem[] = [
  {
    question: "اِسْحَبْ كُلَّ رَقَمٍ إِلَى مَجْمُوعَةِ الأَدَواتِ المُنَاسِبَة",
    question_audio_key: "l10_ex3_q1",
    pairs: [
      { match_id: "p1", draggable: N(3), target: C(3, "✏️") },
      { match_id: "p2", draggable: N(4), target: C(4, "📓") },
      { match_id: "p3", draggable: N(5), target: C(5, "📐") },
    ],
  },
  {
    question: "اِسْحَبْ كُلَّ مَجْمُوعَةٍ إِلَى الرَّقَمِ المُنَاسِب",
    question_audio_key: "l10_ex3_q2",
    pairs: [
      { match_id: "p1", draggable: C(6, "✂️"), target: N(6) },
      { match_id: "p2", draggable: C(7, "✏️"), target: N(7) },
      { match_id: "p3", draggable: C(8, "📓"), target: N(8) },
    ],
  },
  {
    question: "اِسْحَبْ كُلَّ رَقَمٍ إِلَى مَجْمُوعَةِ الأَدَواتِ المُنَاسِبَة",
    question_audio_key: "l10_ex3_q3",
    pairs: [
      { match_id: "p1", draggable: N(2), target: C(2, "📐") },
      { match_id: "p2", draggable: N(5), target: C(5, "✏️") },
      { match_id: "p3", draggable: N(9), target: C(9, "📓") },
    ],
  },
];

export const LESSON_10_EXERCISE_3_AUDIO_BASE = "/audio/lesson_10_exercises";
