// الدرس 8 - التمرين 3: ربط العدد بكتابته وكميته (DragMatchExerciseV2) — 1→9
import type { DragMatchItem } from "../exercises-v2/DragMatchExerciseV2";

const N = (value: number) => ({ kind: "number" as const, value });
const C = (value: number, emoji: string) => ({ kind: "count" as const, value, emoji });
const W = (value: string) => ({ kind: "word" as const, value });

export const LESSON_8_EXERCISE_3: DragMatchItem[] = [
  {
    question: "اِسْحَبْ كُلَّ رَقَمٍ إِلَى الكَمِّيَّةِ المُنَاسِبَة",
    question_audio_key: "l8_ex3_q1",
    pairs: [
      { match_id: "p1", draggable: N(1), target: C(1, "🐠") },
      { match_id: "p2", draggable: N(2), target: C(2, "🐚") },
      { match_id: "p3", draggable: N(3), target: C(3, "🦀") },
    ],
  },
  {
    question: "اِسْحَبْ كُلَّ كَمِّيَّةٍ إِلَى الرَّقَمِ المُنَاسِب",
    question_audio_key: "l8_ex3_q2",
    pairs: [
      { match_id: "p1", draggable: C(4, "🐟"), target: N(4) },
      { match_id: "p2", draggable: C(5, "🐙"), target: N(5) },
      { match_id: "p3", draggable: C(6, "🐠"), target: N(6) },
    ],
  },
  {
    question: "اِسْحَبْ كُلَّ رَقَمٍ إِلَى اسْمِهِ",
    question_audio_key: "l8_ex3_q3",
    pairs: [
      { match_id: "p1", draggable: N(7), target: W("سَبْعَة") },
      { match_id: "p2", draggable: N(8), target: W("ثَمَانِيَة") },
      { match_id: "p3", draggable: N(9), target: W("تِسْعَة") },
    ],
  },
  {
    question: "اِسْحَبْ كُلَّ اسْمٍ إِلَى الكَمِّيَّةِ المُنَاسِبَة",
    question_audio_key: "l8_ex3_q4",
    pairs: [
      { match_id: "p1", draggable: W("وَاحِد"), target: C(1, "🐚") },
      { match_id: "p2", draggable: W("ثَلَاثَة"), target: C(3, "🦀") },
      { match_id: "p3", draggable: W("خَمْسَة"), target: C(5, "🐠") },
    ],
  },
  {
    question: "اِسْحَبْ كُلَّ رَقَمٍ إِلَى اسْمِهِ",
    question_audio_key: "l8_ex3_q5",
    pairs: [
      { match_id: "p1", draggable: N(6), target: W("سِتَّة") },
      { match_id: "p2", draggable: N(7), target: W("سَبْعَة") },
      { match_id: "p3", draggable: N(8), target: W("ثَمَانِيَة") },
      { match_id: "p4", draggable: N(9), target: W("تِسْعَة") },
    ],
  },
];

export const LESSON_8_EXERCISE_3_AUDIO_BASE = "/audio/lesson_8_exercises";
