import type { DragMatchItem } from "../exercises-v2/DragMatchExerciseV2";

const W = (value: string) => ({ kind: "word" as const, value });
const I = (src: string) => ({ kind: "image" as const, src });

const G6 = "/lessons/v2/lesson14/exercises/group6cubes.svg";
const G7 = "/lessons/v2/lesson14/exercises/group7balls.svg";
const G5 = "/lessons/v2/lesson14/exercises/group5cubes.svg";
const G8 = "/lessons/v2/lesson14/exercises/group8balls.svg";

export const LESSON_14_EXERCISE_3: DragMatchItem[] = [
  {
    question: "اِسْحَبِ الرَّقْمَ إِلَى الكَمِّيَّةِ المُنَاسِبَةِ.",
    question_audio_key: "l14_ex3_q1",
    pairs: [
      { match_id: "p1", draggable: W("5"), target: I(G5) },
      { match_id: "p2", draggable: W("6"), target: I(G6) },
      { match_id: "p3", draggable: W("7"), target: I(G7) },
    ],
  },
  {
    question: "اِسْحَبِ الصُّورَةَ إِلَى العَدَدِ المُنَاسِبِ.",
    question_audio_key: "l14_ex3_q2",
    pairs: [
      { match_id: "p1", draggable: I(G6), target: W("6") },
      { match_id: "p2", draggable: I(G7), target: W("7") },
      { match_id: "p3", draggable: I(G8), target: W("8") },
    ],
  },
  {
    question: "اِرْبِطِ العَدَدَ بِالكَمِّيَّةِ الَّتِي تُذَكِّرُنَا بِهَا.",
    question_audio_key: "l14_ex3_q3",
    pairs: [
      { match_id: "p1", draggable: W("6"), target: I(G6) },
      { match_id: "p2", draggable: W("7"), target: I(G7) },
      { match_id: "p3", draggable: W("8"), target: I(G8) },
    ],
  },
];

export const LESSON_14_EXERCISE_3_AUDIO_BASE = "/audio/lesson_14_exercises";
