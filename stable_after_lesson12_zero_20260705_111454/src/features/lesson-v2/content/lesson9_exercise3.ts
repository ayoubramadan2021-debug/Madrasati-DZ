// الدرس 9 - التمرين 3: ربط الكلمة المكانية بالصورة (DragMatchExerciseV2)
import type { DragMatchItem } from "../exercises-v2/DragMatchExerciseV2";

const W = (value: string) => ({ kind: "word" as const, value });
const I = (src: string) => ({ kind: "image" as const, src });

const S2 = "/lessons/v2/lesson9-playground/s2.webp";
const S3 = "/lessons/v2/lesson9-playground/s3.webp";
const S4 = "/lessons/v2/lesson9-playground/s4.webp";
const S5 = "/lessons/v2/lesson9-playground/s5.webp";

export const LESSON_9_EXERCISE_3: DragMatchItem[] = [
  {
    question: "اِسْحَبْ كُلَّ كَلِمَةٍ إِلَى الصُّورَةِ المُنَاسِبَة",
    question_audio_key: "l9_ex3_q1",
    pairs: [
      { match_id: "p1", draggable: W("أَعْلى"), target: I(S4) },
      { match_id: "p2", draggable: W("عَلى"), target: I(S3) },
      { match_id: "p3", draggable: W("أَسْفَلَ"), target: I(S5) },
    ],
  },
  {
    question: "اِسْحَبْ كُلَّ صُورَةٍ إِلَى الكَلِمَةِ المُنَاسِبَة",
    question_audio_key: "l9_ex3_q2",
    pairs: [
      { match_id: "p1", draggable: I(S4), target: W("أَعْلى") },
      { match_id: "p2", draggable: I(S5), target: W("أَسْفَلَ") },
      { match_id: "p3", draggable: I(S2), target: W("فَوْقَ") },
    ],
  },
  {
    question: "اِسْحَبْ كُلَّ كَلِمَةٍ إِلَى الصُّورَةِ المُنَاسِبَة",
    question_audio_key: "l9_ex3_q3",
    pairs: [
      { match_id: "p1", draggable: W("عَلى"), target: I(S3) },
      { match_id: "p2", draggable: W("فَوْقَ"), target: I(S2) },
      { match_id: "p3", draggable: W("أَسْفَلَ"), target: I(S5) },
    ],
  },
];

export const LESSON_9_EXERCISE_3_AUDIO_BASE = "/audio/lesson_9_exercises";
