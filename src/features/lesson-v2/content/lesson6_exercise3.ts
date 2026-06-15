// الدرس 6 - التمرين 3: ربط العدد بكتابته وصورته (DragMatchExerciseV2)
import type { DragMatchItem } from "../exercises-v2/DragMatchExerciseV2";

const N = (value: number) => ({ kind: "number" as const, value });
const C = (value: number, emoji: string) => ({ kind: "count" as const, value, emoji });
const W = (value: string) => ({ kind: "word" as const, value });

export const LESSON_6_EXERCISE_3: DragMatchItem[] = [
  {
    question: "اِسْحَبْ كُلَّ رَقَمٍ إِلَى الكَمِّيَّةِ المُنَاسِبَة",
    question_audio_key: "l6_ex3_q1",
    pairs: [
      { match_id: "p1", draggable: N(6), target: C(6, "⚽") },
      { match_id: "p2", draggable: N(7), target: C(7, "🏀") },
      { match_id: "p3", draggable: N(8), target: C(8, "🎈") },
    ],
  },
  {
    question: "اِسْحَبْ كُلَّ كَمِّيَّةٍ إِلَى الرَّقَمِ المُنَاسِب",
    question_audio_key: "l6_ex3_q2",
    pairs: [
      { match_id: "p1", draggable: C(7, "🧸"), target: N(7) },
      { match_id: "p2", draggable: C(8, "🪁"), target: N(8) },
      { match_id: "p3", draggable: C(9, "🎁"), target: N(9) },
    ],
  },
  {
    question: "اِسْحَبْ كُلَّ رَقَمٍ إِلَى اسْمِهِ",
    question_audio_key: "l6_ex3_q3",
    pairs: [
      { match_id: "p1", draggable: N(6), target: W("سِتَّة") },
      { match_id: "p2", draggable: N(7), target: W("سَبْعَة") },
      { match_id: "p3", draggable: N(8), target: W("ثَمَانِيَة") },
    ],
  },
  {
    question: "اِسْحَبْ كُلَّ اسْمٍ إِلَى الكَمِّيَّةِ المُنَاسِبَة",
    question_audio_key: "l6_ex3_q4",
    pairs: [
      { match_id: "p1", draggable: W("سَبْعَة"), target: C(7, "🍪") },
      { match_id: "p2", draggable: W("ثَمَانِيَة"), target: C(8, "⭐") },
      { match_id: "p3", draggable: W("تِسْعَة"), target: C(9, "🌸") },
    ],
  },
  {
    question: "اِسْحَبْ كُلَّ رَقَمٍ إِلَى اسْمِهِ",
    question_audio_key: "l6_ex3_q5",
    pairs: [
      { match_id: "p1", draggable: N(6), target: W("سِتَّة") },
      { match_id: "p2", draggable: N(7), target: W("سَبْعَة") },
      { match_id: "p3", draggable: N(8), target: W("ثَمَانِيَة") },
      { match_id: "p4", draggable: N(9), target: W("تِسْعَة") },
    ],
  },
];

export const LESSON_6_EXERCISE_3_AUDIO_BASE = "/audio/lesson_6_exercises";
