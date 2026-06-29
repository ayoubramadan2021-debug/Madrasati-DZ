import type { DragMatchItem } from "../exercises-v2/DragMatchExerciseV2";

const W = (value: string) => ({ kind: "word" as const, value });
const I = (src: string) => ({ kind: "image" as const, src });

const S2 = "/lessons/v2/lesson13-counting/s2.webp";
const S3 = "/lessons/v2/lesson13-counting/s3.webp";
const S4 = "/lessons/v2/lesson13-counting/s4.webp";
const S5 = "/lessons/v2/lesson13-counting/s5.webp";

export const LESSON_13_EXERCISE_3: DragMatchItem[] = [
  {
    question: "اِسْحَبِ الرَّقْمَ إِلَى الكَمِّيَّةِ المُنَاسِبَةِ.",
    question_audio_key: "l13_ex3_q1",
    pairs: [
      { match_id: "p1", draggable: W("3"), target: I(S2) },
      { match_id: "p2", draggable: W("5"), target: I(S3) },
      { match_id: "p3", draggable: W("8"), target: I(S4) },
    ],
  },
  {
    question: "اِسْحَبِ الصُّورَةَ إِلَى العَدَدِ المُنَاسِبِ.",
    question_audio_key: "l13_ex3_q2",
    pairs: [
      { match_id: "p1", draggable: I(S3), target: W("5") },
      { match_id: "p2", draggable: I(S4), target: W("8") },
      { match_id: "p3", draggable: I(S5), target: W("10") },
    ],
  },
  {
    question: "اِرْبِطِ الرَّقْمَ بِالكَمِّيَّةِ الصَّحِيحَةِ.",
    question_audio_key: "l13_ex3_q3",
    pairs: [
      { match_id: "p1", draggable: W("10"), target: I(S5) },
      { match_id: "p2", draggable: W("3"), target: I(S2) },
      { match_id: "p3", draggable: W("5"), target: I(S3) },
    ],
  },
];

export const LESSON_13_EXERCISE_3_AUDIO_BASE =
  "/audio/lesson_13_exercises";
