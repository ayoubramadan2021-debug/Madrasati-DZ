import type { SortQuestion } from "../exercises-v2/SortSequenceExerciseV2";

export const LESSON_36_EXERCISE_3_AUDIO_BASE =
  "/audio/teachers/khalil/lesson_36_amusement_sorting/exercises";

export const LESSON_36_EXERCISE_3: SortQuestion[] = [
  {
    question: "كَوِّنِ الْعَدَدَ اثْنَيْ عَشَرَ.",
    question_audio_key: "m3_q1_build_12",
    direction: "asc",
    items: [
      { kind: "word", value: "2", sort_value: 3 },
      { kind: "word", value: "=", sort_value: 4 },
      { kind: "word", value: "10", sort_value: 1 },
      { kind: "word", value: "12", sort_value: 5 },
      { kind: "word", value: "+", sort_value: 2 },
    ],
  },
  {
    question: "كَوِّنِ الْعَدَدَ أَرْبَعَةَ عَشَرَ.",
    question_audio_key: "m3_q2_build_14",
    direction: "asc",
    items: [
      { kind: "word", value: "14", sort_value: 5 },
      { kind: "word", value: "+", sort_value: 2 },
      { kind: "word", value: "4", sort_value: 3 },
      { kind: "word", value: "10", sort_value: 1 },
      { kind: "word", value: "=", sort_value: 4 },
    ],
  },
  {
    question: "كَوِّنِ الْعَدَدَ سِتَّةَ عَشَرَ.",
    question_audio_key: "m3_q3_build_16",
    direction: "asc",
    items: [
      { kind: "word", value: "=", sort_value: 4 },
      { kind: "word", value: "16", sort_value: 5 },
      { kind: "word", value: "6", sort_value: 3 },
      { kind: "word", value: "+", sort_value: 2 },
      { kind: "word", value: "10", sort_value: 1 },
    ],
  },
  {
    question: "كَوِّنِ الْعَدَدَ ثَمَانِيَةَ عَشَرَ.",
    question_audio_key: "m3_q4_build_18",
    direction: "asc",
    items: [
      { kind: "word", value: "+", sort_value: 2 },
      { kind: "word", value: "18", sort_value: 5 },
      { kind: "word", value: "10", sort_value: 1 },
      { kind: "word", value: "=", sort_value: 4 },
      { kind: "word", value: "8", sort_value: 3 },
    ],
  },
];
