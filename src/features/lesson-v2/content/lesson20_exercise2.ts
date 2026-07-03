import type { NumberChoiceItem } from "../exercises-v2/NumberChoiceExerciseV2";

export const LESSON_20_EXERCISE_2_AUDIO_BASE = "/audio/lesson_20_exercise2";

export const LESSON_20_EXERCISE_2: NumberChoiceItem[] = [
  {
    title: "مَا العَدَدُ الَّذِي يَسْبِقُ؟",
    instruction: "اِخْتَارُوا العَدَدَ الَّذِي يَأْتِي قَبْلَهُ.",
    question: "مَا العَدَدُ الَّذِي يَسْبِقُ العَدَدَ 4؟",
    question_audio_key: "q1",
    centerNumber: "4",
    correct: "3",
    options: ["2", "5", "3", "4"],
  },
  {
    title: "مَا العَدَدُ الَّذِي يَسْبِقُ؟",
    instruction: "اِخْتَارُوا العَدَدَ الَّذِي يَأْتِي قَبْلَهُ.",
    question: "مَا العَدَدُ الَّذِي يَسْبِقُ العَدَدَ 6؟",
    question_audio_key: "q2",
    centerNumber: "6",
    correct: "5",
    options: ["5", "7", "4", "6"],
  },
  {
    title: "مَا العَدَدُ الَّذِي يَسْبِقُ؟",
    instruction: "اِخْتَارُوا العَدَدَ الَّذِي يَأْتِي قَبْلَهُ.",
    question: "مَا العَدَدُ الَّذِي يَسْبِقُ العَدَدَ 9؟",
    question_audio_key: "q3",
    centerNumber: "9",
    correct: "8",
    options: ["10", "7", "9", "8"],
  },
  {
    title: "مَا العَدَدُ الَّذِي يَسْبِقُ؟",
    instruction: "اِخْتَارُوا العَدَدَ النَّاقِصَ.",
    question: "مَاذَا يَأْتِي قَبْلَ العَدَدَيْنِ 5 وَ6؟",
    question_audio_key: "q4",
    promptNumbers: ["?", "5", "6"],
    correct: "4",
    options: ["3", "4", "7", "5"],
  },
  {
    title: "مَا العَدَدُ الَّذِي يَسْبِقُ؟",
    instruction: "اِخْتَارُوا العَدَدَ النَّاقِصَ.",
    question: "مَاذَا يَأْتِي قَبْلَ العَدَدَيْنِ 9 وَ10؟",
    question_audio_key: "q5",
    promptNumbers: ["?", "9", "10"],
    correct: "8",
    options: ["8", "9", "7", "10"],
  },
];
