import type { NumberChoiceItem } from "../exercises-v2/NumberChoiceExerciseV2";

export const LESSON_20_EXERCISE_1_AUDIO_BASE = "/audio/lesson_20_exercise1";

export const LESSON_20_EXERCISE_1: NumberChoiceItem[] = [
  {
    title: "أَكْمِلُوا المُتَتَالِيَةَ",
    instruction: "اِخْتَارُوا العَدَدَ النَّاقِصَ.",
    question: "أَكْمِلُوا: 1، 2، 3، ؟",
    question_audio_key: "q1",
    promptNumbers: ["1", "2", "3", "?"],
    correct: "4",
    options: ["2", "4", "5", "1"],
  },
  {
    title: "أَكْمِلُوا المُتَتَالِيَةَ",
    instruction: "اِخْتَارُوا العَدَدَ النَّاقِصَ.",
    question: "أَكْمِلُوا: 4، 5، ؟، 7",
    question_audio_key: "q2",
    promptNumbers: ["4", "5", "?", "7"],
    correct: "6",
    options: ["6", "4", "7", "3"],
  },
  {
    title: "أَكْمِلُوا المُتَتَالِيَةَ",
    instruction: "اِخْتَارُوا العَدَدَ النَّاقِصَ.",
    question: "أَكْمِلُوا: ؟، 8، 9، 10",
    question_audio_key: "q3",
    promptNumbers: ["?", "8", "9", "10"],
    correct: "7",
    options: ["6", "10", "7", "9"],
  },
  {
    title: "أَكْمِلُوا المُتَتَالِيَةَ",
    instruction: "اِخْتَارُوا العَدَدَ النَّاقِصَ.",
    question: "أَكْمِلُوا: 6، 7، ؟، 9",
    question_audio_key: "q4",
    promptNumbers: ["6", "7", "?", "9"],
    correct: "8",
    options: ["9", "8", "7", "10"],
  },
  {
    title: "أَكْمِلُوا المُتَتَالِيَةَ",
    instruction: "اِخْتَارُوا العَدَدَ النَّاقِصَ.",
    question: "أَكْمِلُوا: 7، 8، 9، ؟",
    question_audio_key: "q5",
    promptNumbers: ["7", "8", "9", "?"],
    correct: "10",
    options: ["10", "8", "6", "9"],
  },
];
