import type { DragMatchItem } from "../exercises-v2/DragMatchExerciseV2";

export const LESSON_36_EXERCISE_4_AUDIO_BASE =
  "/audio/teachers/khalil/lesson_36_amusement_sorting/exercises";

export const LESSON_36_EXERCISE_4: DragMatchItem[] = [
  {
    question: "أَيُّ تَمْثِيلٍ يُسَاوِي ثَلَاثَةَ عَشَرَ؟",
    question_audio_key: "m4_q1_match_13",
    pairs: [
      {
        match_id: "q1",
        draggable: { kind: "word", value: "10 + 3" },
        target: { kind: "number", value: 13 },
      },
    ],
  },
  {
    question: "أَيُّ تَمْثِيلٍ يُسَاوِي خَمْسَةَ عَشَرَ؟",
    question_audio_key: "m4_q2_match_15",
    pairs: [
      {
        match_id: "q2",
        draggable: { kind: "word", value: "10 + 5" },
        target: { kind: "number", value: 15 },
      },
    ],
  },
  {
    question: "أَيُّ تَمْثِيلٍ يُسَاوِي سَبْعَةَ عَشَرَ؟",
    question_audio_key: "m4_q3_match_17",
    pairs: [
      {
        match_id: "q3",
        draggable: { kind: "word", value: "10 + 7" },
        target: { kind: "number", value: 17 },
      },
    ],
  },
  {
    question: "أَيُّ تَمْثِيلٍ يُسَاوِي تِسْعَةَ عَشَرَ؟",
    question_audio_key: "m4_q4_match_19",
    pairs: [
      {
        match_id: "q4",
        draggable: { kind: "word", value: "10 + 9" },
        target: { kind: "number", value: 19 },
      },
    ],
  },
];
