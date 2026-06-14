import type { DragMatchItem } from "../exercises-v2/DragMatchExerciseV2";

// تمرين 2 — الدرس 3: اسحب كل حاسة إلى عضوها
const W = (value: string) => ({ kind: "word" as const, value });

export const LESSON_3_EXERCISE_2: DragMatchItem[] = [
  {
    question: "اِسْحَبْ كُلَّ حَاسَّةٍ إِلَى عُضْوِهَا",
    question_audio_key: "l3_ex2_q1",
    pairs: [
      { match_id: "p1", draggable: W("السَّمْع"), target: W("الأُذُن") },
      { match_id: "p2", draggable: W("الرُّؤْيَة"), target: W("العَيْن") },
      { match_id: "p3", draggable: W("الشَّمّ"), target: W("الأَنْف") },
    ],
  },
  {
    question: "اِرْبِطْ كُلَّ حَاسَّةٍ بِالعُضْوِ المُنَاسِبِ",
    question_audio_key: "l3_ex2_q2",
    pairs: [
      { match_id: "p1", draggable: W("الذَّوْق"), target: W("اللِّسَان") },
      { match_id: "p2", draggable: W("اللَّمْس"), target: W("اليَد") },
      { match_id: "p3", draggable: W("السَّمْع"), target: W("الأُذُن") },
    ],
  },
  {
    question: "صِلْ كُلَّ حَاسَّةٍ بِعُضْوِهَا",
    question_audio_key: "l3_ex2_q3",
    pairs: [
      { match_id: "p1", draggable: W("الرُّؤْيَة"), target: W("العَيْن") },
      { match_id: "p2", draggable: W("الشَّمّ"), target: W("الأَنْف") },
      { match_id: "p3", draggable: W("الذَّوْق"), target: W("اللِّسَان") },
    ],
  },
  {
    question: "تَحَدِّي. اِسْحَبْ كُلَّ حَاسَّةٍ إِلَى مَكَانِهَا",
    question_audio_key: "l3_ex2_q4",
    pairs: [
      { match_id: "p1", draggable: W("السَّمْع"), target: W("الأُذُن") },
      { match_id: "p2", draggable: W("الرُّؤْيَة"), target: W("العَيْن") },
      { match_id: "p3", draggable: W("اللَّمْس"), target: W("اليَد") },
      { match_id: "p4", draggable: W("الذَّوْق"), target: W("اللِّسَان") },
    ],
  },
  {
    question: "اِبْحَثْ وَاِرْبِطْ كُلَّ حَاسَّةٍ بِعُضْوِهَا",
    question_audio_key: "l3_ex2_q5",
    pairs: [
      { match_id: "p1", draggable: W("الشَّمّ"), target: W("الأَنْف") },
      { match_id: "p2", draggable: W("اللَّمْس"), target: W("اليَد") },
      { match_id: "p3", draggable: W("الرُّؤْيَة"), target: W("العَيْن") },
      { match_id: "p4", draggable: W("السَّمْع"), target: W("الأُذُن") },
    ],
  },
];

export const LESSON_3_EXERCISE_2_AUDIO_BASE = "/audio/lesson_3_exercises";
