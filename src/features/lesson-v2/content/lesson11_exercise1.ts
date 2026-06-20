// الدرس 11 - التمرين 1: انظر للصورة واختر الحركة (TapSelectWordsV2)
import type { TapSelectWordItem } from "../exercises-v2/TapSelectWordsV2";

const WALK = "/lessons/v2/lesson11-move/s2.webp";
const RUN = "/lessons/v2/lesson11-move/s3.webp";
const JUMP = "/lessons/v2/lesson11-move/s4.webp";
const CLIMB = "/lessons/v2/lesson11-move/s5.webp";

const OPTIONS = ["المَشْيُ", "الجَرْيُ", "القَفْزُ", "التَّسَلُّقُ"];

export const LESSON_11_EXERCISE_1: TapSelectWordItem[] = [
  { scene_image: WALK, question: "ما هذِهِ الحَرَكَةُ؟", question_audio_key: "l11_ex1_q1", options: OPTIONS, correct: "المَشْيُ" },
  { scene_image: RUN, question: "ما هذِهِ الحَرَكَةُ؟", question_audio_key: "l11_ex1_q2", options: OPTIONS, correct: "الجَرْيُ" },
  { scene_image: JUMP, question: "ما هذِهِ الحَرَكَةُ؟", question_audio_key: "l11_ex1_q3", options: OPTIONS, correct: "القَفْزُ" },
  { scene_image: CLIMB, question: "ما هذِهِ الحَرَكَةُ؟", question_audio_key: "l11_ex1_q4", options: OPTIONS, correct: "التَّسَلُّقُ" },
  { scene_image: RUN, question: "ما هذِهِ الحَرَكَةُ السَّريعَةُ؟", question_audio_key: "l11_ex1_q5", options: OPTIONS, correct: "الجَرْيُ" },
];

export const LESSON_11_EXERCISE_1_AUDIO_BASE = "/audio/lesson_11_exercises";
