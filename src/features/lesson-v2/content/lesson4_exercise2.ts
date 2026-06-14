import type { CompareItem } from "../exercises-v2/CompareExerciseV2";
const OPTIONS = ["أَكْثَر", "أَقَلّ", "يُسَاوِي"];

export const LESSON_4_EXERCISE_2: CompareItem[] = [
  { group_a: ["🍎","🍎"], group_b: ["🍊","🍊","🍊","🍊"],
    question: "اِخْتَرِ الإِجَابَةَ الصَّحِيحَة", question_audio_key: "l4_ex_q", options: OPTIONS, correct: "أَقَلّ" },
  { group_a: ["🍒","🍒","🍒","🍒","🍒"], group_b: ["🍓","🍓"],
    question: "اِخْتَرِ الإِجَابَةَ الصَّحِيحَة", question_audio_key: "l4_ex_q", options: OPTIONS, correct: "أَكْثَر" },
  { group_a: ["🍇","🍇","🍇"], group_b: ["🍌","🍌","🍌"],
    question: "اِخْتَرِ الإِجَابَةَ الصَّحِيحَة", question_audio_key: "l4_ex_q", options: OPTIONS, correct: "يُسَاوِي" },
  { group_a: ["🍊","🍊","🍊","🍊","🍊"], group_b: ["🍇","🍇"],
    question: "اِخْتَرِ الإِجَابَةَ الصَّحِيحَة", question_audio_key: "l4_ex_q", options: OPTIONS, correct: "أَكْثَر" },
  { group_a: ["🍎","🍎","🍎"], group_b: ["🍒","🍒","🍒"],
    question: "اِخْتَرِ الإِجَابَةَ الصَّحِيحَة", question_audio_key: "l4_ex_q", options: OPTIONS, correct: "يُسَاوِي" },
];
export const LESSON_4_EXERCISE_2_AUDIO_BASE = "/audio/lesson_4_exercises";
