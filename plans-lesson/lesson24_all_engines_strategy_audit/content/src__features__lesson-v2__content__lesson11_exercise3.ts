// الدرس 11 - التمرين 3: اربط الحركة بصورتها (DragMatchExerciseV2)
import type { DragMatchItem } from "../exercises-v2/DragMatchExerciseV2";

const W = (value: string) => ({ kind: "word" as const, value });
const I = (src: string) => ({ kind: "image" as const, src });

const WALK = "/lessons/v2/lesson11-move/s2.webp";
const RUN = "/lessons/v2/lesson11-move/s3.webp";
const JUMP = "/lessons/v2/lesson11-move/s4.webp";
const CLIMB = "/lessons/v2/lesson11-move/s5.webp";

export const LESSON_11_EXERCISE_3: DragMatchItem[] = [
  {
    question: "اِسْحَبْ كُلَّ كَلِمَةٍ إِلَى الصُّورَةِ المُنَاسِبَة",
    question_audio_key: "l11_ex3_q1",
    pairs: [
      { match_id: "p1", draggable: W("يَجْري"), target: I(RUN) },
      { match_id: "p2", draggable: W("يَقْفِزُ"), target: I(JUMP) },
      { match_id: "p3", draggable: W("يَتَسَلَّقُ"), target: I(CLIMB) },
    ],
  },
  {
    question: "اِسْحَبْ كُلَّ صُورَةٍ إِلَى الكَلِمَةِ المُنَاسِبَة",
    question_audio_key: "l11_ex3_q2",
    pairs: [
      { match_id: "p1", draggable: I(WALK), target: W("يَمْشي") },
      { match_id: "p2", draggable: I(RUN), target: W("يَجْري") },
      { match_id: "p3", draggable: I(JUMP), target: W("يَقْفِزُ") },
    ],
  },
  {
    question: "اِسْحَبْ كُلَّ كَلِمَةٍ إِلَى الصُّورَةِ المُنَاسِبَة",
    question_audio_key: "l11_ex3_q3",
    pairs: [
      { match_id: "p1", draggable: W("يَمْشي"), target: I(WALK) },
      { match_id: "p2", draggable: W("يَتَسَلَّقُ"), target: I(CLIMB) },
      { match_id: "p3", draggable: W("يَقْفِزُ"), target: I(JUMP) },
    ],
  },
];

export const LESSON_11_EXERCISE_3_AUDIO_BASE = "/audio/lesson_11_exercises";
